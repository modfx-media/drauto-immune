/**
 * Targeted mutations for pairs still at/above Jaccard 0.4 after the main plan search.
 * Run: npx tsx scripts/force-matrix-similarity.ts
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { STATES, STATE_CONDITIONS } from "../content/national-data";
import {
  LIST_PICK_SIZE,
  buildPageFromAssignment,
  encodeAssignment,
  faqCountFor,
  pagePlainText,
  resolveAssignment,
  variantSchema,
  type VariantAssignment,
} from "../content/matrix-page-builder";

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
const rand = mulberry32(99);
const randInt = (n: number) => Math.floor(rand() * n);

function tokenize(text: string): Set<string> {
  return new Set(text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) ?? []);
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  let intersection = 0;
  for (const word of small) if (large.has(word)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

type Page = {
  key: string;
  stateIndex: number;
  conditionIndex: number;
  assignment: VariantAssignment;
  words: Set<string>;
};

function mutate(a: VariantAssignment, conditionSlug: string): VariantAssignment {
  const schema = variantSchema(conditionSlug);
  const next: VariantAssignment = {
    slots: [...a.slots],
    heads: [...a.heads],
    climate: [...a.climate],
    faqs: [...a.faqs],
    lists: a.lists.map((l) => [...l]),
  };
  const replaceMember = (arr: number[], pool: number) => {
    const idx = randInt(arr.length);
    const used = new Set(arr);
    let v = randInt(pool);
    let guard = 0;
    while (used.has(v) && guard++ < 50) v = randInt(pool);
    arr[idx] = v;
  };
  const kind = randInt(8);
  if (kind < 3) {
    const i = randInt(next.slots.length);
    next.slots[i] = randInt(schema.slotSizes[i]);
  } else if (kind < 4) {
    const i = randInt(next.heads.length);
    next.heads[i] = randInt(schema.headSizes[i]);
  } else if (kind < 5) {
    const i = randInt(next.climate.length);
    next.climate[i] = randInt(schema.climateSizes[i]);
  } else if (kind < 6) {
    replaceMember(next.faqs, schema.faqPool);
  } else {
    const i = randInt(next.lists.length);
    replaceMember(next.lists[i], schema.listPools[i]);
  }
  return next;
}

const pages: Page[] = [];
for (let si = 0; si < STATES.length; si++) {
  for (let ci = 0; ci < STATE_CONDITIONS.length; ci++) {
    const state = STATES[si];
    const cond = STATE_CONDITIONS[ci];
    const assignment = resolveAssignment(state.slug, cond.slug);
    const built = buildPageFromAssignment(state, cond, assignment);
    pages.push({
      key: `${state.slug}|${cond.slug}`,
      stateIndex: si,
      conditionIndex: ci,
      assignment,
      words: tokenize(pagePlainText(built)),
    });
  }
}

function maxVsPeers(page: Page, words: Set<string>): number {
  let max = 0;
  for (const peer of pages) {
    if (peer === page) continue;
    if (peer.conditionIndex === page.conditionIndex || peer.stateIndex === page.stateIndex) {
      max = Math.max(max, jaccard(words, peer.words));
    }
  }
  return max;
}

for (let round = 0; round < 50; round++) {
  const bad: [number, number, number][] = [];
  for (let i = 0; i < pages.length; i++) {
    for (let j = i + 1; j < pages.length; j++) {
      const sim = jaccard(pages[i].words, pages[j].words);
      if (sim >= 0.4) bad.push([i, j, sim]);
    }
  }
  console.log(`round ${round}: pairs>=0.4 = ${bad.length}${bad[0] ? ` (top ${bad[0][2].toFixed(3)})` : ""}`);
  if (bad.length === 0) break;

  const touched = new Set<number>();
  for (const [i, j] of bad) {
    touched.add(i);
    touched.add(j);
  }

  for (const idx of touched) {
    const page = pages[idx];
    const condSlug = STATE_CONDITIONS[page.conditionIndex].slug;
    let best = page.assignment;
    let bestWords = page.words;
    let bestMax = maxVsPeers(page, page.words);
    for (let m = 0; m < 200; m++) {
      const candidate = mutate(best, condSlug);
      const built = buildPageFromAssignment(
        STATES[page.stateIndex],
        STATE_CONDITIONS[page.conditionIndex],
        candidate,
      );
      const words = tokenize(pagePlainText(built));
      const score = maxVsPeers(page, words);
      if (score < bestMax) {
        bestMax = score;
        best = candidate;
        bestWords = words;
      }
    }
    page.assignment = best;
    page.words = bestWords;
  }
}

const finalBad: [string, string, number][] = [];
for (let i = 0; i < pages.length; i++) {
  for (let j = i + 1; j < pages.length; j++) {
    const sim = jaccard(pages[i].words, pages[j].words);
    if (sim >= 0.4) finalBad.push([pages[i].key, pages[j].key, sim]);
  }
}
console.log("final bad", finalBad.length, finalBad.slice(0, 5));

for (const page of pages) {
  const expectedFaqs = faqCountFor(STATES[page.stateIndex].slug, STATE_CONDITIONS[page.conditionIndex].slug);
  if (page.assignment.faqs.length !== expectedFaqs) throw new Error(`FAQ count drifted: ${page.key}`);
  if (page.assignment.lists.some((l) => l.length !== LIST_PICK_SIZE)) throw new Error(`List size drifted: ${page.key}`);
}

const lines = pages
  .map((p) => ({ key: p.key, value: encodeAssignment(p.assignment) }))
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
