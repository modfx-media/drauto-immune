/**
 * Generates content/matrix-variant-plan.ts, a committed table of paragraph / list / FAQ / heading
 * choices for each state × condition page.
 *
 * Why a table: hashing alone picks variants independently per page, so some pairs in the same
 * condition end up sharing many identical paragraphs. This script runs a seeded local search that
 * keeps the word-set Jaccard similarity low for pages in the same condition and pages in the same
 * state. The result is deterministic; pages missing from the table fall back to hash selection.
 *
 * Run: npx tsx scripts/generate-matrix-variant-plan.ts [rounds]
 */

import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { STATES, STATE_CONDITIONS } from "../content/national-data";
import {
  LIST_PICK_SIZE,
  buildPageFromAssignment,
  encodeAssignment,
  faqCountFor,
  hashAssignment,
  pagePlainText,
  variantSchema,
  type VariantAssignment,
} from "../content/matrix-page-builder";

const ROUNDS = Number(process.argv[2] ?? 6);
const MUTATIONS_PER_ROUND = 70;
const COST_POWER = 10;
const CROSS_NEIGHBORS = 24;

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260929);
const randInt = (n: number) => Math.floor(rand() * n);

const vocabulary = new Map<string, number>();
function wordIds(text: string): Int32Array {
  const ids = new Set<number>();
  for (const word of text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) ?? []) {
    let id = vocabulary.get(word);
    if (id === undefined) {
      id = vocabulary.size;
      vocabulary.set(word, id);
    }
    ids.add(id);
  }
  return Int32Array.from(ids).sort();
}

function jaccard(a: Int32Array, b: Int32Array): number {
  let i = 0;
  let j = 0;
  let shared = 0;
  while (i < a.length && j < b.length) {
    if (a[i] === b[j]) {
      shared++;
      i++;
      j++;
    } else if (a[i] < b[j]) i++;
    else j++;
  }
  return shared / (a.length + b.length - shared);
}

type PageState = { stateIndex: number; conditionIndex: number; assignment: VariantAssignment; ids: Int32Array };

function render(stateIndex: number, conditionIndex: number, assignment: VariantAssignment): Int32Array {
  const page = buildPageFromAssignment(STATES[stateIndex], STATE_CONDITIONS[conditionIndex], assignment);
  return wordIds(pagePlainText(page));
}

const pages: PageState[] = [];
for (let s = 0; s < STATES.length; s++) {
  for (let c = 0; c < STATE_CONDITIONS.length; c++) {
    const assignment = hashAssignment(STATES[s].slug, STATE_CONDITIONS[c].slug, 0);
    pages.push({ stateIndex: s, conditionIndex: c, assignment, ids: render(s, c, assignment) });
  }
}

const byCondition = STATE_CONDITIONS.map((_, c) => pages.filter((p) => p.conditionIndex === c));
const byState = STATES.map((_, s) => pages.filter((p) => p.stateIndex === s));

const crossNeighbors = new Map<PageState, PageState[]>();

function refreshCrossNeighbors() {
  for (const page of pages) {
    const scored: { other: PageState; sim: number }[] = [];
    for (const other of pages) {
      if (other.conditionIndex === page.conditionIndex || other.stateIndex === page.stateIndex) continue;
      scored.push({ other, sim: jaccard(page.ids, other.ids) });
    }
    scored.sort((a, b) => b.sim - a.sim);
    crossNeighbors.set(
      page,
      scored.slice(0, CROSS_NEIGHBORS).map((entry) => entry.other),
    );
  }
}

function costAgainst(page: PageState, ids: Int32Array): number {
  let cost = 0;
  for (const other of crossNeighbors.get(page) ?? []) {
    cost += Math.pow(jaccard(ids, other.ids), COST_POWER);
  }
  for (const other of byCondition[page.conditionIndex]) {
    if (other === page) continue;
    cost += Math.pow(jaccard(ids, other.ids), COST_POWER);
  }
  for (const other of byState[page.stateIndex]) {
    if (other === page) continue;
    cost += Math.pow(jaccard(ids, other.ids), COST_POWER);
  }
  return cost;
}

function cloneAssignment(a: VariantAssignment): VariantAssignment {
  return { slots: [...a.slots], heads: [...a.heads], climate: [...a.climate], faqs: [...a.faqs], lists: a.lists.map((l) => [...l]) };
}

function replaceMember(values: number[], pool: number): void {
  if (values.length >= pool) return;
  const position = randInt(values.length);
  let candidate = randInt(pool);
  while (values.includes(candidate)) candidate = randInt(pool);
  values[position] = candidate;
}

function mutate(base: VariantAssignment, conditionSlug: string): VariantAssignment {
  const schema = variantSchema(conditionSlug);
  const next = cloneAssignment(base);
  const changes = 1 + randInt(3);
  for (let n = 0; n < changes; n++) {
    const kind = randInt(10);
    if (kind < 4) {
      const i = randInt(next.slots.length);
      next.slots[i] = randInt(schema.slotSizes[i]);
    } else if (kind < 5) {
      if (rand() < 0.5) {
        const i = randInt(next.heads.length);
        next.heads[i] = randInt(schema.headSizes[i]);
      } else {
        const i = randInt(next.climate.length);
        next.climate[i] = randInt(schema.climateSizes[i]);
      }
    } else if (kind < 6) {
      replaceMember(next.faqs, schema.faqPool);
    } else {
      const i = randInt(next.lists.length);
      replaceMember(next.lists[i], schema.listPools[i]);
    }
  }
  return next;
}

function reportMax(label: string) {
  let sameCondition = 0;
  let sameState = 0;
  let cross = 0;
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const sim = jaccard(pages[i].ids, pages[j].ids);
      if (pages[i].conditionIndex === pages[j].conditionIndex) sameCondition = Math.max(sameCondition, sim);
      else if (pages[i].stateIndex === pages[j].stateIndex) sameState = Math.max(sameState, sim);
      else cross = Math.max(cross, sim);
    }
  }
  console.log(
    `${label}: max same-condition ${sameCondition.toFixed(3)} | same-state ${sameState.toFixed(3)} | cross ${cross.toFixed(3)}`,
  );
}

reportMax("start");
for (let round = 1; round <= ROUNDS; round++) {
  refreshCrossNeighbors();
  const order = pages
    .map((page) => ({ page, key: rand() }))
    .sort((a, b) => a.key - b.key)
    .map((entry) => entry.page);
  for (const page of order) {
    const conditionSlug = STATE_CONDITIONS[page.conditionIndex].slug;
    let bestCost = costAgainst(page, page.ids);
    for (let m = 0; m < MUTATIONS_PER_ROUND; m++) {
      const candidate = mutate(page.assignment, conditionSlug);
      const ids = render(page.stateIndex, page.conditionIndex, candidate);
      const cost = costAgainst(page, ids);
      if (cost < bestCost) {
        bestCost = cost;
        page.assignment = candidate;
        page.ids = ids;
      }
    }
  }
  reportMax(`round ${round}`);
}

for (const page of pages) {
  const expectedFaqs = faqCountFor(STATES[page.stateIndex].slug, STATE_CONDITIONS[page.conditionIndex].slug);
  if (page.assignment.faqs.length !== expectedFaqs) throw new Error("FAQ count drifted");
  if (page.assignment.lists.some((l) => l.length !== LIST_PICK_SIZE)) throw new Error("List size drifted");
}

const lines = pages
  .map((p) => ({
    key: `${STATES[p.stateIndex].slug}|${STATE_CONDITIONS[p.conditionIndex].slug}`,
    value: encodeAssignment(p.assignment),
  }))
  .sort((a, b) => a.key.localeCompare(b.key))
  .map((entry) => `  "${entry.key}": [${entry.value.join(",")}],`);

const output = `/**
 * Generated by scripts/generate-matrix-variant-plan.ts. Do not edit by hand.
 *
 * Each entry lists variant indexes for one state × condition page: paragraph slots, heading
 * variants, FAQ picks, then list picks. Entries that no longer fit the current banks are ignored
 * and the page falls back to hash selection.
 */
export const MATRIX_VARIANT_PLAN: Record<string, readonly number[]> = {
${lines.join("\n")}
};
`;

const target = fileURLToPath(new URL("../content/matrix-variant-plan.ts", import.meta.url));
writeFileSync(target, output);
console.log(`Wrote ${lines.length} entries to content/matrix-variant-plan.ts`);
