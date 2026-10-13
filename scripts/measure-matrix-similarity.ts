/**
 * Measures word counts and pairwise Jaccard similarity across all state × condition matrix pages.
 *
 * Run: npx tsx scripts/measure-matrix-similarity.ts
 * Exits non-zero if any page is under MIN_WORDS, any pair reaches MAX_SIMILARITY,
 * or titles / H1s / meta descriptions / state notes are not unique.
 */

import { STATES, STATE_CONDITIONS } from "../content/national-data";
import { buildEnrichedStateConditionContent, pagePlainText } from "../content/matrix-page-builder";
import { STATE_PROFILES } from "../content/state-profiles";

const MIN_WORDS = 900;
const MAX_SIMILARITY = 0.4;
const META_MAX_LENGTH = 160;

type Entry = {
  state: string;
  condition: string;
  url: string;
  title: string;
  h1: string;
  metaDescription: string;
  words: number;
  wordSet: Set<string>;
};

function tokenize(text: string): string[] {
  return text.toLowerCase().match(/[\p{L}\p{N}]+(?:['’][\p{L}]+)?/gu) ?? [];
}

function median(sorted: number[]): number {
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
}

function stats(values: number[]) {
  const sorted = [...values].sort((a, b) => a - b);
  const mean = sorted.reduce((sum, v) => sum + v, 0) / sorted.length;
  return { min: sorted[0], median: median(sorted), mean, max: sorted[sorted.length - 1] };
}

function jaccard(a: Set<string>, b: Set<string>): number {
  const [small, large] = a.size <= b.size ? [a, b] : [b, a];
  let intersection = 0;
  for (const word of small) if (large.has(word)) intersection++;
  return intersection / (a.size + b.size - intersection);
}

function fmt(n: number, digits = 3): string {
  return n.toFixed(digits);
}

const problems: string[] = [];
const entries: Entry[] = [];

for (const state of STATES) {
  if (!STATE_PROFILES[state.slug]) problems.push(`Missing state profile: ${state.slug}`);
  for (const condition of STATE_CONDITIONS) {
    const page = buildEnrichedStateConditionContent(state, condition);
    const again = buildEnrichedStateConditionContent(state, condition);
    if (JSON.stringify(page) !== JSON.stringify(again)) {
      problems.push(`Non-deterministic output: ${state.slug}/${condition.slug}`);
    }
    const text = pagePlainText(page);
    const tokens = tokenize(text);
    entries.push({
      state: state.slug,
      condition: condition.slug,
      url: `/areas-we-serve/${state.slug}/${condition.slug}/`,
      title: page.title,
      h1: page.h1,
      metaDescription: page.metaDescription,
      words: tokens.length,
      wordSet: new Set(tokens),
    });
    if (tokens.length < MIN_WORDS) {
      problems.push(`Under ${MIN_WORDS} words (${tokens.length}): ${state.slug}/${condition.slug}`);
    }
    if (page.metaDescription.length > META_MAX_LENGTH) {
      problems.push(`Meta description ${page.metaDescription.length} chars: ${state.slug}/${condition.slug}`);
    }
    if (page.intro.length < 3) problems.push(`Intro under 3 paragraphs: ${state.slug}/${condition.slug}`);
    if (page.faqs.length < 4 || page.faqs.length > 6) {
      problems.push(`FAQ count ${page.faqs.length}: ${state.slug}/${condition.slug}`);
    }
  }
}

function requireUnique(label: string, values: string[]) {
  const seen = new Map<string, number>();
  for (const v of values) seen.set(v, (seen.get(v) ?? 0) + 1);
  const dupes = [...seen.entries()].filter(([, n]) => n > 1);
  if (dupes.length) problems.push(`${label}: ${dupes.length} duplicated values (e.g. "${dupes[0][0].slice(0, 80)}")`);
}

requireUnique("title", entries.map((e) => e.title));
requireUnique("h1", entries.map((e) => e.h1));
requireUnique("metaDescription", entries.map((e) => e.metaDescription));
requireUnique("geographyNote", Object.values(STATE_PROFILES).map((p) => p.geographyNote));
requireUnique("intakeNote", Object.values(STATE_PROFILES).map((p) => p.intakeNote));
requireUnique("labNote", Object.values(STATE_PROFILES).map((p) => p.labNote));

const wordStats = stats(entries.map((e) => e.words));

const sims: number[] = [];
let worst: { a: Entry; b: Entry; sim: number }[] = [];
let sameCondMax = 0;
let sameStateMax = 0;
let crossMax = 0;
let pairsAtOrOverLimit = 0;

for (let i = 0; i < entries.length; i++) {
  for (let j = i + 1; j < entries.length; j++) {
    const sim = jaccard(entries[i].wordSet, entries[j].wordSet);
    sims.push(sim);
    if (sim >= MAX_SIMILARITY) pairsAtOrOverLimit++;
    if (entries[i].condition === entries[j].condition) sameCondMax = Math.max(sameCondMax, sim);
    else if (entries[i].state === entries[j].state) sameStateMax = Math.max(sameStateMax, sim);
    else crossMax = Math.max(crossMax, sim);
    if (worst.length < 5 || sim > worst[worst.length - 1].sim) {
      worst.push({ a: entries[i], b: entries[j], sim });
      worst.sort((x, y) => y.sim - x.sim);
      worst = worst.slice(0, 5);
    }
  }
}

const simStats = stats(sims);

console.log(`Pages generated: ${entries.length} (${STATES.length} states x ${STATE_CONDITIONS.length} conditions)`);
console.log(
  `Word counts  min ${wordStats.min} | median ${wordStats.median} | mean ${Math.round(wordStats.mean)} | max ${wordStats.max}`,
);
console.log(`Pairs compared: ${sims.length}`);
console.log(
  `Jaccard      min ${fmt(simStats.min)} | median ${fmt(simStats.median)} | mean ${fmt(simStats.mean)} | max ${fmt(simStats.max)}`,
);
console.log(
  `Max by pair type: same condition ${fmt(sameCondMax)} | same state ${fmt(sameStateMax)} | different both ${fmt(crossMax)}`,
);
console.log(`Pairs at or above ${MAX_SIMILARITY}: ${pairsAtOrOverLimit}`);
console.log("\nHighest-similarity pairs:");
for (const w of worst) console.log(`  ${fmt(w.sim)}  ${w.a.url}  <->  ${w.b.url}`);

if (pairsAtOrOverLimit > 0) problems.push(`${pairsAtOrOverLimit} pairs at or above similarity ${MAX_SIMILARITY}`);

console.log("\nSample titles:");
const sampleIndexes = [0, 83, 167, 251, 399].map((i) => Math.min(i, entries.length - 1));
for (const idx of sampleIndexes) {
  const e = entries[idx];
  console.log(`  ${e.url}\n    ${e.title}\n    H1: ${e.h1}\n    Meta (${e.metaDescription.length}): ${e.metaDescription}`);
}

if (problems.length) {
  console.error(`\nFAILED (${problems.length} problems):`);
  for (const p of problems.slice(0, 40)) console.error(`  - ${p}`);
  if (problems.length > 40) console.error(`  ...and ${problems.length - 40} more`);
  process.exit(1);
}
console.log("\nPASS: all pages >= 900 words, all pairs < 0.40, titles/H1s/meta unique.");
