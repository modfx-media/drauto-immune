// Audit-only crawler: fetches every URL from the local sitemap and every
// pSEO route enumerated directly from content data (belt + suspenders,
// since the sitemap itself is one of the things being audited), then
// extracts on-page SEO / schema / content signals from the rendered HTML.
// Writes raw findings to data/pseo-audit/*.json for the report step.
import { load } from "cheerio";
import { writeFileSync, mkdirSync } from "node:fs";

const BASE = "http://localhost:3100";
const OUT_DIR = new URL("../../data/pseo-audit/", import.meta.url);
mkdirSync(OUT_DIR, { recursive: true });

async function getSitemapUrls() {
  const res = await fetch(`${BASE}/sitemap.xml`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
  return urls;
}

function textWordCount($) {
  const clone = $("body").clone();
  clone.find("script,style,noscript,svg").remove();
  const text = clone.text().replace(/\s+/g, " ").trim();
  return { text, wordCount: text.split(" ").filter(Boolean).length };
}

async function auditUrl(url) {
  const path = url.replace(/^https?:\/\/[^/]+/, "");
  const localUrl = `${BASE}${path}`;
  const result = { url, path, status: null, error: null };
  try {
    const res = await fetch(localUrl, { redirect: "manual" });
    result.status = res.status;
    if (res.status >= 300 && res.status < 400) {
      result.redirectLocation = res.headers.get("location");
      return result;
    }
    const html = await res.text();
    const $ = load(html);

    result.title = $("title").first().text().trim();
    result.metaDescription = $('meta[name="description"]').attr("content") ?? null;
    result.canonical = $('link[rel="canonical"]').attr("href") ?? null;
    result.ogTitle = $('meta[property="og:title"]').attr("content") ?? null;
    result.ogDescription = $('meta[property="og:description"]').attr("content") ?? null;
    result.ogUrl = $('meta[property="og:url"]').attr("content") ?? null;
    result.twitterCard = $('meta[name="twitter:card"]').attr("content") ?? null;
    result.robotsMeta = $('meta[name="robots"]').attr("content") ?? null;

    const h1s = $("h1").map((_, el) => $(el).text().trim()).get();
    result.h1Count = h1s.length;
    result.h1 = h1s[0] ?? null;
    result.h1All = h1s;

    const h2s = $("h2").map((_, el) => $(el).text().trim()).get();
    result.h2Count = h2s.length;

    const imgs = $("img").toArray();
    result.imageCount = imgs.length;
    result.imagesMissingAlt = imgs.filter((el) => !$(el).attr("alt")?.trim()).length;

    const internalLinks = $('a[href^="/"]')
      .map((_, el) => $(el).attr("href"))
      .get()
      .filter(Boolean);
    result.internalLinkCount = internalLinks.length;
    result.internalLinkHrefs = [...new Set(internalLinks)];

    const jsonLdBlocks = $('script[type="application/ld+json"]')
      .map((_, el) => $(el).html())
      .get();
    result.jsonLdRaw = jsonLdBlocks;
    result.jsonLdParsed = [];
    result.jsonLdParseErrors = [];
    for (const raw of jsonLdBlocks) {
      try {
        result.jsonLdParsed.push(JSON.parse(raw));
      } catch (e) {
        result.jsonLdParseErrors.push(String(e.message ?? e));
      }
    }

    const { text, wordCount } = textWordCount($);
    result.bodyText = text;
    result.wordCount = wordCount;

    result.hasDiscoveryCallLink = internalLinks.some((h) => h.includes("/discovery-call"));
    result.hasPhoneLink = html.includes("tel:+13038828447") || html.includes("tel:303-882-8447") || html.includes("tel:%20303-882-8447");
    result.mentionsDisclaimer = /for general educational purposes only|not a substitute for professional medical/i.test(text);
    const riskyPhraseList = [
      "cure", "cures", "cured", "curing", "guaranteed", "guarantee", "100% effective",
      "proven to reverse", "reverses autoimmune", "will cure", "miracle", "risk-free",
      "no side effects", "eliminate your symptoms", "completely eliminate",
    ];
    result.riskyPhrases = riskyPhraseList.filter((p) => {
      const escaped = p.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      const re = new RegExp(`(?<![a-z])${escaped}(?![a-z])`, "i");
      return re.test(text);
    });
  } catch (e) {
    result.error = String(e.message ?? e);
  }
  return result;
}

async function main() {
  const sitemapUrls = await getSitemapUrls();
  console.log(`Sitemap URL count: ${sitemapUrls.length}`);

  const results = [];
  const concurrency = 20;
  let idx = 0;
  async function worker() {
    while (idx < sitemapUrls.length) {
      const i = idx++;
      const url = sitemapUrls[i];
      const r = await auditUrl(url);
      results.push(r);
      if (results.length % 50 === 0) console.log(`  audited ${results.length}/${sitemapUrls.length}`);
    }
  }
  await Promise.all(Array.from({ length: concurrency }, worker));

  writeFileSync(new URL("raw-crawl.json", OUT_DIR), JSON.stringify({ sitemapUrls, results }, null, 2));
  console.log(`Done. Wrote ${results.length} page records to data/pseo-audit/raw-crawl.json`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
