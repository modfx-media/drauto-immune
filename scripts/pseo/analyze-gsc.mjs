#!/usr/bin/env node
/**
 * Step 1 — parses gsc-report/Queries.csv + Pages.csv into
 * /data/pseo/gsc-analysis.json: clustered queries, striking-distance
 * opportunities (position 8-40), content gaps (impressions but poor
 * position / no matching page), and location signal actually present
 * in the data (no invented cities).
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..", "..");
const GSC_DIR = path.join(ROOT, "gsc-report");
const OUT_DIR = path.join(ROOT, "data", "pseo");

/** Minimal RFC4180 CSV parser (handles quoted fields with commas/newlines). */
function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field);
      field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== "" || row.length) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function readCsv(file) {
  const text = fs.readFileSync(path.join(GSC_DIR, file), "utf8");
  const rows = parseCsv(text);
  const header = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i]])));
}

const queries = readCsv("Queries.csv").map((r) => ({
  query: r["Top queries"],
  clicks: Number(r["Clicks"]) || 0,
  impressions: Number(r["Impressions"]) || 0,
  ctr: r["CTR"],
  position: Number(r["Position"]) || 0,
}));

const pages = readCsv("Pages.csv").map((r) => ({
  url: r["Top pages"],
  clicks: Number(r["Clicks"]) || 0,
  impressions: Number(r["Impressions"]) || 0,
  position: Number(r["Position"]) || 0,
}));

// --- Cluster definitions -----------------------------------------------
// Each cluster matches on whole-word-ish substrings against the lowercased
// query. Order matters only for reporting; a query can land in multiple
// clusters (kept — e.g. "hashimoto's specialist boulder" is both a
// condition and a location signal).
const CONDITION_CLUSTERS = {
  hashimotos: ["hashimoto"],
  graves: ["graves"],
  lupus: ["lupus"],
  sjogrens: ["sjogren", "sjögren", "showgren"],
  celiac: ["celiac", "gluten"],
  "multiple-sclerosis": ["multiple sclerosis", " ms ", "ms olive oil"],
  "rheumatoid-arthritis": ["rheumatoid", "seropositive", "seronegative"],
  raynauds: ["raynaud"],
  pots: [" pots", "pots "],
  ibd: ["crohn", "irritable bowel", "ibs", "ibd"],
  thyroid: ["thyroid", "hypothyroid", "hyperthyroid", "tsh"],
  "leaky-gut": ["leaky gut", "gut health", "dysbiosis", "intestinal hyperpermeability"],
  "ana-patterns": ["ana pattern", "ana positive", "ana test", "positive ana", "antinuclear", "ana screen", "ana titer", "ana blood", "ana lab"],
  "ferritin-anemia": ["ferritin", "anemia", "anaemia", "low iron", "iron deficiency", "iron level"],
  "autoimmune-skin": ["autoimmune skin", "skin rash", "autoimmune rash", "rash on", "rash face", "skin disorder", "skin lesion", "dry skin"],
  pcos: ["pcos"],
  "type-1-diabetes": ["type 1 diabetes"],
  eczema: ["eczema"],
  "anxiety-depression": ["anxiety", "depression"],
  adhd: ["adhd", "add "],
};

const SYMPTOM_TERMS = ["fatigue", "brain fog", "joint pain", "bloating", "hair loss", "weight loss", "weight gain", "chronic fatigue", "gas after eating", "stomach pain", "tired"];

const TREATMENT_TERMS = [
  "functional medicine", "holistic", "root cause", "natural doctor", "gut health",
  "methylated", "nac ", "n-acetylcysteine", "n acetylcysteine", "n acetyl cysteine", "magnesium", "zinc carnosine",
  "black seed oil", "black cumin", "dhea", "bone broth", "meat stock", "collagen", "probiotic",
  "pmf ", "cold laser", "stem cell", "cupping", "dirty dozen", "birth control", "antihistamine", "benadryl",
  "diphenhydramine", "nad ", "nad+", "theia", "olive oil", "vitamin d",
];

const LOCATION_TERMS = ["boulder", "denver", "fort collins", "near me", "colorado"];

const QUESTION_PREFIXES = ["what ", "why ", "how ", "can ", "is ", "are ", "does ", "do "];

function matchesAny(q, terms) {
  return terms.some((t) => q.includes(t));
}

function classify(q) {
  const lower = q.query.toLowerCase();
  const conditions = Object.entries(CONDITION_CLUSTERS)
    .filter(([, terms]) => matchesAny(lower, terms))
    .map(([key]) => key);
  const isSymptom = matchesAny(lower, SYMPTOM_TERMS);
  const isTreatment = matchesAny(lower, TREATMENT_TERMS);
  const locations = LOCATION_TERMS.filter((t) => lower.includes(t));
  const isQuestion = QUESTION_PREFIXES.some((p) => lower.startsWith(p)) || lower.includes("what's") || lower.includes("whats ");
  return { conditions, isSymptom, isTreatment, locations, isQuestion };
}

const enriched = queries.map((q) => ({ ...q, ...classify(q) }));

// Striking distance: real position signal (1-40), not top-3 branded, some impressions.
const strikingDistance = enriched
  .filter((q) => q.position >= 8 && q.position <= 40 && q.impressions >= 30)
  .sort((a, b) => b.impressions - a.impressions);

// Content gaps: high impressions, effectively no clicks, poor position (>40) —
// informational demand the site doesn't currently satisfy.
const contentGaps = enriched
  .filter((q) => q.position > 40 && q.impressions >= 40 && q.clicks === 0)
  .sort((a, b) => b.impressions - a.impressions);

function topN(list, n) {
  return list.slice(0, n).map(({ query, clicks, impressions, ctr, position }) => ({ query, clicks, impressions, ctr, position }));
}

const clusters = {};
for (const key of Object.keys(CONDITION_CLUSTERS)) {
  const items = enriched.filter((q) => q.conditions.includes(key)).sort((a, b) => b.impressions - a.impressions);
  clusters[key] = {
    totalQueries: items.length,
    totalImpressions: items.reduce((s, q) => s + q.impressions, 0),
    topQueries: topN(items, 25),
  };
}

const symptomQueries = enriched.filter((q) => q.isSymptom).sort((a, b) => b.impressions - a.impressions);
const treatmentQueries = enriched.filter((q) => q.isTreatment).sort((a, b) => b.impressions - a.impressions);
const locationQueries = enriched.filter((q) => q.locations.length > 0).sort((a, b) => b.impressions - a.impressions);
const questionQueries = enriched.filter((q) => q.isQuestion).sort((a, b) => b.impressions - a.impressions);

// Locations that actually appear anywhere in the 1001-row export (not invented).
const locationsFound = [...new Set(locationQueries.flatMap((q) => q.locations))].filter((l) => l !== "near me" && l !== "colorado");

const output = {
  generatedAt: new Date().toISOString(),
  source: "gsc-report/Queries.csv + Pages.csv (Search Console export, all rows)",
  totals: {
    queryRows: queries.length,
    pageRows: pages.length,
    totalImpressions: queries.reduce((s, q) => s + q.impressions, 0),
    totalClicks: queries.reduce((s, q) => s + q.clicks, 0),
  },
  locationsFound,
  strikingDistance: topN(strikingDistance, 60),
  contentGaps: topN(contentGaps, 150),
  clusters,
  symptomQueries: topN(symptomQueries, 60),
  treatmentQueries: topN(treatmentQueries, 60),
  locationQueries: topN(locationQueries, 40),
  questionQueries: topN(questionQueries, 150),
  topPages: pages
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 60)
    .map(({ url, clicks, impressions, position }) => ({ url, clicks, impressions, position })),
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "gsc-analysis.json"), JSON.stringify(output, null, 2));

console.log(`Wrote ${path.join("data", "pseo", "gsc-analysis.json")}`);
console.log(`  locationsFound: ${locationsFound.join(", ") || "(none)"}`);
console.log(`  strikingDistance: ${strikingDistance.length} queries (pos 8-40)`);
console.log(`  contentGaps: ${contentGaps.length} queries (pos >40, 0 clicks, >=40 impr)`);
for (const [key, v] of Object.entries(clusters)) {
  console.log(`  cluster ${key}: ${v.totalQueries} queries, ${v.totalImpressions} impressions`);
}
