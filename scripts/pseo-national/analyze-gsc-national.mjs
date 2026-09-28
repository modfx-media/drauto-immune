#!/usr/bin/env node
/**
 * Step 1 (nationwide brief) — re-parses gsc-report/Queries.csv + Pages.csv
 * scanning for EVERY US state (name + abbreviation) and top-40 metro area,
 * not just the Colorado-area terms the original scripts/pseo/analyze-gsc.mjs
 * checked. Reuses the same clustering logic for conditions/symptoms/
 * treatments/questions; only the location detection is expanded. Writes
 * /data/pseo-national/gsc-analysis.json.
 */
import fs from "node:fs";
import path from "node:path";

const ROOT = path.join(import.meta.dirname, "..", "..");
const GSC_DIR = path.join(ROOT, "gsc-report");
const OUT_DIR = path.join(ROOT, "data", "pseo-national");

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
  psoriasis: ["psoriasis", "psoriatic"],
  pcos: ["pcos"],
  "type-1-diabetes": ["type 1 diabetes"],
  eczema: ["eczema"],
  "chronic-fatigue": ["chronic fatigue", "cfs "],
  "anxiety-depression": ["anxiety", "depression"],
  adhd: ["adhd", "add "],
};

const SYMPTOM_TERMS = ["fatigue", "brain fog", "joint pain", "bloating", "hair loss", "weight loss", "weight gain", "chronic fatigue", "gas after eating", "stomach pain", "tired"];

const APPROACH_TERMS = [
  "functional medicine", "holistic", "root cause", "natural doctor", "gut health",
  "online functional medicine", "virtual functional medicine", "telehealth", "online doctor",
  "virtual doctor", "online autoimmune", "virtual autoimmune", "lab testing", "lab work",
  "diet", "nutrition", "elimination diet", "aip diet",
];

// --- Nationwide location detection --------------------------------------
const US_STATES = {
  alabama: "AL", alaska: "AK", arizona: "AZ", arkansas: "AR", california: "CA",
  colorado: "CO", connecticut: "CT", delaware: "DE", florida: "FL", georgia: "GA",
  hawaii: "HI", idaho: "ID", illinois: "IL", indiana: "IN", iowa: "IA",
  kansas: "KS", kentucky: "KY", louisiana: "LA", maine: "ME", maryland: "MD",
  massachusetts: "MA", michigan: "MI", minnesota: "MN", mississippi: "MS", missouri: "MO",
  montana: "MT", nebraska: "NE", nevada: "NV", "new hampshire": "NH", "new jersey": "NJ",
  "new mexico": "NM", "new york": "NY", "north carolina": "NC", "north dakota": "ND", ohio: "OH",
  oklahoma: "OK", oregon: "OR", pennsylvania: "PA", "rhode island": "RI", "south carolina": "SC",
  "south dakota": "SD", tennessee: "TN", texas: "TX", utah: "UT", vermont: "VT",
  virginia: "VA", washington: "WA", "west virginia": "WV", wisconsin: "WI", wyoming: "WY",
};

const TOP_METROS = [
  "new york city", "new york", "nyc", "los angeles", "chicago", "houston", "dallas",
  "phoenix", "atlanta", "miami", "seattle", "denver", "austin", "boston", "san francisco",
  "san diego", "philadelphia", "san antonio", "charlotte", "columbus", "indianapolis",
  "fort worth", "jacksonville", "nashville", "portland", "oklahoma city", "las vegas",
  "memphis", "louisville", "milwaukee", "albuquerque", "tucson", "sacramento", "kansas city",
  "mesa", "omaha", "raleigh", "long beach", "virginia beach", "colorado springs",
  "minneapolis", "tulsa", "boulder", "fort collins",
];

const LOCATION_TERMS = ["near me", ...Object.keys(US_STATES), ...TOP_METROS];

const QUESTION_PREFIXES = ["what ", "why ", "how ", "can ", "is ", "are ", "does ", "do "];

function matchesAny(q, terms) {
  return terms.some((t) => q.includes(t));
}

function classify(q) {
  const lower = ` ${q.query.toLowerCase()} `;
  const conditions = Object.entries(CONDITION_CLUSTERS)
    .filter(([, terms]) => matchesAny(lower, terms))
    .map(([key]) => key);
  const isSymptom = matchesAny(lower, SYMPTOM_TERMS);
  const isApproach = matchesAny(lower, APPROACH_TERMS);
  const states = Object.keys(US_STATES).filter((s) => lower.includes(` ${s} `) || lower.includes(`${s} `));
  const metros = TOP_METROS.filter((m) => lower.includes(m));
  const isQuestion = QUESTION_PREFIXES.some((p) => lower.trim().startsWith(p)) || lower.includes("what's") || lower.includes("whats ");
  return { conditions, isSymptom, isApproach, states, metros, isQuestion };
}

const enriched = queries.map((q) => ({ ...q, ...classify(q) }));

const strikingDistance = enriched
  .filter((q) => q.position >= 8 && q.position <= 40 && q.impressions >= 30)
  .sort((a, b) => b.impressions - a.impressions);

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
const approachQueries = enriched.filter((q) => q.isApproach).sort((a, b) => b.impressions - a.impressions);
const questionQueries = enriched.filter((q) => q.isQuestion).sort((a, b) => b.impressions - a.impressions);

const stateQueries = enriched.filter((q) => q.states.length > 0).sort((a, b) => b.impressions - a.impressions);
const metroQueries = enriched.filter((q) => q.metros.length > 0).sort((a, b) => b.impressions - a.impressions);

const statesFound = [...new Set(stateQueries.flatMap((q) => q.states))];
const metrosFound = [...new Set(metroQueries.flatMap((q) => q.metros))];

// Content gaps that have no matching migrated/existing page at all (by URL slug heuristic).
const existingPageSlugs = new Set(pages.map((p) => p.url));

const output = {
  generatedAt: new Date().toISOString(),
  source: "gsc-report/Queries.csv + Pages.csv (Search Console export, all rows) — nationwide location scan (50 states + 40 metros)",
  totals: {
    queryRows: queries.length,
    pageRows: pages.length,
    totalImpressions: queries.reduce((s, q) => s + q.impressions, 0),
    totalClicks: queries.reduce((s, q) => s + q.clicks, 0),
  },
  statesFound,
  metrosFound,
  stateQueries: topN(stateQueries, 60),
  metroQueries: topN(metroQueries, 60),
  strikingDistance: topN(strikingDistance, 80),
  contentGaps: topN(contentGaps, 150),
  clusters,
  symptomQueries: topN(symptomQueries, 60),
  approachQueries: topN(approachQueries, 80),
  questionQueries: topN(questionQueries, 150),
  topPages: pages
    .sort((a, b) => b.impressions - a.impressions)
    .slice(0, 80)
    .map(({ url, clicks, impressions, position }) => ({ url, clicks, impressions, position })),
};

fs.mkdirSync(OUT_DIR, { recursive: true });
fs.writeFileSync(path.join(OUT_DIR, "gsc-analysis.json"), JSON.stringify(output, null, 2));

console.log(`Wrote ${path.join("data", "pseo-national", "gsc-analysis.json")}`);
console.log(`  statesFound (${statesFound.length}): ${statesFound.join(", ") || "(none)"}`);
console.log(`  metrosFound (${metrosFound.length}): ${metrosFound.join(", ") || "(none)"}`);
console.log(`  strikingDistance: ${strikingDistance.length} queries (pos 8-40)`);
console.log(`  contentGaps: ${contentGaps.length} queries (pos >40, 0 clicks, >=40 impr)`);
for (const [key, v] of Object.entries(clusters)) {
  console.log(`  cluster ${key}: ${v.totalQueries} queries, ${v.totalImpressions} impressions`);
}
