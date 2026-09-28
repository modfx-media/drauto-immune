// Analysis pass over data/pseo-audit/raw-crawl.json — computes on-page SEO
// issues, internal-link graph / orphan detection, JSON-LD validation, NAP
// consistency, risky-phrase scan, and near-duplicate content detection.
// Read-only / audit-only: writes findings to data/pseo-audit/findings.json.
import { readFileSync, writeFileSync } from "node:fs";

const { results } = JSON.parse(readFileSync(new URL("../../data/pseo-audit/raw-crawl.json", import.meta.url)));

function classify(path) {
  if (path === "/learn/" ) return "learn-hub";
  if (path.startsWith("/learn/")) return "learn";
  if (path === "/areas-we-serve/") return "areas-hub";
  if (/^\/areas-we-serve\/colorado\/(denver|longmont|fort-collins|louisville|lafayette|broomfield|westminster|arvada|aurora|colorado-springs)\/$/.test(path)) return "front-range-city";
  if (/^\/areas-we-serve\/[a-z-]+\/[a-z-]+\/$/.test(path)) return "state-condition";
  if (/^\/areas-we-serve\/[a-z-]+\/$/.test(path)) return "state-hub";
  return "other-migrated";
}

const pages = results.map((r) => ({ ...r, pageType: classify(r.path) }));
const byType = {};
for (const p of pages) (byType[p.pageType] ??= []).push(p);

console.log("Page type counts:", Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, v.length])));

// ---------- Step 1: technical ----------
const nonOkStatus = pages.filter((p) => p.status !== 200);
const missingCanonical = pages.filter((p) => !p.canonical);
const badCanonical = pages.filter((p) => p.canonical && !p.canonical.startsWith("https://drautoimmune.com"));
const selfMismatchCanonical = pages.filter((p) => p.canonical && p.canonical !== p.url);
const noindexed = pages.filter((p) => p.robotsMeta && /noindex/i.test(p.robotsMeta));

// ---------- Step 2: on-page ----------
const titleIssues = [];
const descIssues = [];
const h1Issues = [];
const titleMap = {};
const descMap = {};
for (const p of pages) {
  if (!p.title) titleIssues.push({ path: p.path, issue: "missing title" });
  else if (p.title.length > 60) titleIssues.push({ path: p.path, issue: `title ${p.title.length} chars (>60)`, title: p.title });
  if (p.title) (titleMap[p.title] ??= []).push(p.path);

  if (!p.metaDescription) descIssues.push({ path: p.path, issue: "missing meta description" });
  else if (p.metaDescription.length > 155) descIssues.push({ path: p.path, issue: `meta description ${p.metaDescription.length} chars (>155)` });
  if (p.metaDescription) (descMap[p.metaDescription] ??= []).push(p.path);

  if (p.h1Count === 0) h1Issues.push({ path: p.path, issue: "missing H1" });
  else if (p.h1Count > 1) h1Issues.push({ path: p.path, issue: `${p.h1Count} H1s`, h1s: p.h1All });
}
const duplicateTitles = Object.entries(titleMap).filter(([, v]) => v.length > 1);
const duplicateDescriptions = Object.entries(descMap).filter(([, v]) => v.length > 1);

const wordCountThresholds = { "state-condition": 700, "state-hub": 700, "front-range-city": 600, "areas-hub": 600, learn: 700, "learn-hub": 300, "other-migrated": 300 };
const thinPages = pages
  .filter((p) => p.wordCount !== undefined && p.wordCount < (wordCountThresholds[p.pageType] ?? 600))
  .map((p) => ({ path: p.path, pageType: p.pageType, wordCount: p.wordCount, threshold: wordCountThresholds[p.pageType] ?? 600 }));

const missingAltImages = pages.filter((p) => p.imagesMissingAlt > 0).map((p) => ({ path: p.path, imagesMissingAlt: p.imagesMissingAlt, imageCount: p.imageCount }));
const missingOg = pages.filter((p) => !p.ogTitle || !p.ogDescription || !p.ogUrl).map((p) => p.path);

// Internal link graph / orphan detection
const allPaths = new Set(pages.map((p) => p.path));
const inbound = {};
const brokenLinks = [];
for (const p of pages) {
  for (const href of p.internalLinkHrefs) {
    const clean = href.split("#")[0].split("?")[0];
    if (!clean || clean === "/") continue;
    const normalized = clean.endsWith("/") ? clean : clean + "/";
    if (!allPaths.has(normalized) && !allPaths.has(clean)) {
      // only flag as broken if it looks like one of our own generated page families
      if (/^\/(areas-we-serve|learn)\//.test(clean)) {
        brokenLinks.push({ from: p.path, to: clean });
      }
      continue;
    }
    inbound[normalized] = (inbound[normalized] ?? 0) + 1;
  }
}
const orphanPages = pages
  .filter((p) => p.pageType !== "other-migrated" && !inbound[p.path])
  .map((p) => p.path);

// ---------- Step 3: content quality ----------
const riskyPhrasePages = pages.filter((p) => p.riskyPhrases?.length).map((p) => ({ path: p.path, riskyPhrases: p.riskyPhrases }));
const noDisclaimer = pages.filter((p) => ["learn", "state-condition", "state-hub", "front-range-city", "areas-hub"].includes(p.pageType) && !p.mentionsDisclaimer).map((p) => p.path);
const noCta = pages.filter((p) => ["learn", "state-condition", "state-hub", "front-range-city", "areas-hub"].includes(p.pageType) && !p.hasDiscoveryCallLink).map((p) => p.path);
const noPhone = pages.filter((p) => ["learn", "state-condition", "state-hub", "front-range-city", "areas-hub"].includes(p.pageType) && !p.hasPhoneLink).map((p) => p.path);

// ---------- Near-duplicate detection (3-word shingles, Jaccard) within same pageType ----------
function shingles(text, n = 5) {
  const words = text.toLowerCase().split(/\s+/).filter(Boolean);
  const set = new Set();
  for (let i = 0; i + n <= words.length; i++) set.add(words.slice(i, i + n).join(" "));
  return set;
}
function jaccard(a, b) {
  let inter = 0;
  const [small, big] = a.size < b.size ? [a, b] : [b, a];
  for (const s of small) if (big.has(s)) inter++;
  const union = a.size + b.size - inter;
  return union === 0 ? 0 : inter / union;
}

const dupPairs = [];
for (const [type, list] of Object.entries(byType)) {
  if (list.length < 2 || list.length > 460) continue; // skip absurd cross-compare only if huge; we chunk state-condition below
  const shingleSets = list.map((p) => ({ path: p.path, set: shingles(p.bodyText || "") }));
  for (let i = 0; i < shingleSets.length; i++) {
    for (let j = i + 1; j < shingleSets.length; j++) {
      const sim = jaccard(shingleSets[i].set, shingleSets[j].set);
      if (sim > 0.6) dupPairs.push({ type, a: shingleSets[i].path, b: shingleSets[j].path, similarity: Math.round(sim * 1000) / 10 });
    }
  }
}
// state-condition is 400 pages -> group by condition slug (8 groups of 50) for tractable + meaningful comparison
const stateConditionPages = byType["state-condition"] ?? [];
const byCondition = {};
for (const p of stateConditionPages) {
  const cond = p.path.split("/").filter(Boolean)[2];
  (byCondition[cond] ??= []).push(p);
}
for (const [cond, list] of Object.entries(byCondition)) {
  const shingleSets = list.map((p) => ({ path: p.path, set: shingles(p.bodyText || "") }));
  for (let i = 0; i < shingleSets.length; i++) {
    for (let j = i + 1; j < shingleSets.length; j++) {
      const sim = jaccard(shingleSets[i].set, shingleSets[j].set);
      if (sim > 0.6) dupPairs.push({ type: `state-condition:${cond}`, a: shingleSets[i].path, b: shingleSets[j].path, similarity: Math.round(sim * 1000) / 10 });
    }
  }
}
dupPairs.sort((a, b) => b.similarity - a.similarity);

// ---------- Step 4: JSON-LD schema ----------
const jsonLdIssues = [];
const NAP_PHONE = "+13038828447";
for (const p of pages) {
  if (p.jsonLdParseErrors?.length) jsonLdIssues.push({ path: p.path, issue: "invalid JSON-LD (parse error)", detail: p.jsonLdParseErrors });
  if (!p.jsonLdParsed || p.jsonLdParsed.length === 0) {
    if (p.pageType !== "other-migrated") jsonLdIssues.push({ path: p.path, issue: "no JSON-LD found" });
    continue;
  }
  const types = p.jsonLdParsed.map((b) => b["@type"]);
  if (["learn", "state-condition", "state-hub", "front-range-city"].includes(p.pageType)) {
    if (!types.includes("BreadcrumbList")) jsonLdIssues.push({ path: p.path, issue: "missing BreadcrumbList schema" });
    if (!types.includes("FAQPage")) jsonLdIssues.push({ path: p.path, issue: "missing FAQPage schema" });
    const webPageBlock = p.jsonLdParsed.find((b) => b["@type"] === "WebPage" || b["@type"] === "MedicalWebPage");
    if (!webPageBlock) jsonLdIssues.push({ path: p.path, issue: "missing WebPage/MedicalWebPage schema" });
    else {
      const tel = webPageBlock.about?.telephone ?? webPageBlock.publisher?.telephone;
      if (tel && tel.replace(/[^\d+]/g, "") !== NAP_PHONE) {
        jsonLdIssues.push({ path: p.path, issue: `NAP phone mismatch in JSON-LD: ${tel}` });
      }
    }
    // FAQPage visible-vs-schema match
    const faqBlock = p.jsonLdParsed.find((b) => b["@type"] === "FAQPage");
    if (faqBlock) {
      const schemaQCount = faqBlock.mainEntity?.length ?? 0;
      if (schemaQCount === 0) jsonLdIssues.push({ path: p.path, issue: "FAQPage schema has zero questions" });
    }
  }
}

const findings = {
  pageTypeCounts: Object.fromEntries(Object.entries(byType).map(([k, v]) => [k, v.length])),
  step1Technical: { nonOkStatus, missingCanonical, badCanonical, selfMismatchCanonical: selfMismatchCanonical.length, noindexed },
  step2OnPage: {
    titleIssuesCount: titleIssues.length,
    titleIssuesSample: titleIssues.slice(0, 20),
    duplicateTitlesCount: duplicateTitles.length,
    duplicateTitlesSample: duplicateTitles.slice(0, 10),
    descIssuesCount: descIssues.length,
    descIssuesSample: descIssues.slice(0, 20),
    duplicateDescriptionsCount: duplicateDescriptions.length,
    duplicateDescriptionsSample: duplicateDescriptions.slice(0, 10),
    h1IssuesCount: h1Issues.length,
    h1IssuesSample: h1Issues.slice(0, 20),
    thinPagesCount: thinPages.length,
    thinPagesSample: thinPages.slice(0, 30),
    missingAltImagesCount: missingAltImages.length,
    missingAltSample: missingAltImages.slice(0, 10),
    missingOgCount: missingOg.length,
    brokenLinksCount: brokenLinks.length,
    brokenLinksSample: brokenLinks.slice(0, 20),
    orphanPagesCount: orphanPages.length,
    orphanPagesSample: orphanPages.slice(0, 30),
  },
  step3Content: {
    riskyPhrasePagesCount: riskyPhrasePages.length,
    riskyPhrasePages,
    noDisclaimerCount: noDisclaimer.length,
    noDisclaimerSample: noDisclaimer.slice(0, 10),
    noDisclaimerAllAreas: noDisclaimer.filter((p) => p.startsWith("/areas-we-serve")).length,
    noCtaCount: noCta.length,
    noPhoneCount: noPhone.length,
    topDuplicatePairs: dupPairs.slice(0, 25),
    totalDuplicatePairsOver60: dupPairs.length,
  },
  step4Schema: {
    jsonLdIssuesCount: jsonLdIssues.length,
    jsonLdIssuesSample: jsonLdIssues.slice(0, 30),
    napPhoneUsedInPseo: NAP_PHONE,
  },
};

writeFileSync(new URL("../../data/pseo-audit/findings.json", import.meta.url), JSON.stringify(findings, null, 2));
console.log(JSON.stringify(findings.pageTypeCounts, null, 2));
console.log("Findings written to data/pseo-audit/findings.json");
