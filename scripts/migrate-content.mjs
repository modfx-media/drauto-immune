#!/usr/bin/env node
/**
 * One-off content & metadata migration script.
 *
 * For every route scaffolded in step 1, fetches the LIVE page from
 * drautoimmune.com (via the r.jina.ai reader proxy, since the origin's
 * bot-protection WAF blocks direct/scripted requests) and extracts:
 *   - title, meta description, canonical, Open Graph + Twitter tags
 *   - every <script type="application/ld+json"> block, verbatim
 *   - the main body content (as markdown), with images downloaded locally
 *     and internal links rewritten to the new route structure
 *   - any embedded video iframes (YouTube/Vimeo/Wistia)
 *
 * Output: one JSON file per route in content/data/, images saved under
 * public/images/migrated/<key>/, plus content/data/index.json listing all
 * generated routes for the Next.js content loader (lib/content.ts).
 *
 * Usage: node scripts/migrate-content.mjs [--only=slug1,slug2]
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";
import * as cheerio from "cheerio";

// Kept in sync with the readonly array in lib/blog-posts.ts (source of truth
// for the [slug] dynamic route's generateStaticParams).
const blogPostSlugs = [
  "root-causes-of-anemia-and-low-ferritin",
  "leaky-gut-signs-causes-and-functional-fixes",
  "pots-treatment-looking-beyond-salt-and-medications-with-functional-medicine",
  "autoimmune-thyroid-symptoms-when-tsh-looks-normal",
  "the-hidden-link-between-gut-health-and-autoimmune-disease",
  "if-my-ana-is-positive-do-i-have-an-autoimmune-disease",
  "i-eat-clean-why-do-i-still-feel-sick",
  "why-do-i-still-have-symptoms-when-my-tsh-is-normal",
  "why-your-pots-symptoms-still-dont-make-sense-and-what-your-body-may-be-trying-to-tell-you",
  "autoimmune-skin-clues-gut-health-trouble",
  "what-chronic-fatigue-reveals-about-thyroid-health",
  "hello-my-valued-subscriber",
  "what-high-tsh-levels-actually-mean-why-thyroid-medication-isnt-always-the-answer",
  "are-you-testing-your-inflammatory-markers-heres-why-you-should-be",
  "nutritional-deficiencies-in-hashimotos-understanding-prevention-support",
  "understanding-gluten-disorders-celiac-disease-allergy-and-sensitivity",
  "understanding-leaky-gut-with-a-functional-medicine-doctor",
  "first-autoimmune-functional-medicine-visit-guide",
  "functional-medicine-doctor-help-autoimmune-flares",
  "mold-illness-often-mimics-autoimmune-disease-symptoms",
  "signs-gut-may-be-driving-autoimmune-flares",
  "secrets-that-nourish-your-gut-ease-endometriosis",
  "how-functional-medicine-can-heal-your-eczema",
  "top-5-most-common-autoimmune-diseases-that-affect-women",
  "subject-line-unveiling-the-hidden-effects-of-birth-control-pills",
  "unveiling-the-7-mechanisms-of-leaky-gut",
  "unmasking-the-link-between-covid-19-and-gut-issues",
  "5-common-autoimmune-diseases-in-men",
  "how-autoimmune-diseases-can-affect-your-skin",
  "healing-crohns-disease-with-functional-medicine",
  "a-guide-to-dysbiosis-autoimmunity",
];

const SITE = "https://drautoimmune.com";
const READER = "https://r.jina.ai/";
const IMAGE_PROXY = "https://images.weserv.nl/?url=";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA_DIR = path.join(ROOT, "content", "data");
const CACHE_DIR = path.join(ROOT, "content", "cache");
const IMAGES_DIR = path.join(ROOT, "public", "images", "migrated");

const STATIC_PAGES = [
  "about-us",
  "adhd-add",
  "anxiety-depression",
  "blog",
  "book-an-appointment",
  "book-new-patient-evaluation",
  "celiac-disease-and-gluten-intolerance",
  "conditions-we-support",
  "contact-us",
  "featured-interviews",
  "free-discovery-call",
  "graves-disease",
  "hashimotos-thyroiditis-graves",
  "inflammatory-bowel-disease",
  "lupus",
  "multiple-sclerosis",
  "other-autoimmune-conditions",
  "patient-portal",
  "patient-stories",
  "raynauds-phenomenon",
  "rheumatoid-arthritis",
  "sample-page",
  "services",
  "sjogrens-syndrome",
  "store",
  "thyroid-conditions",
  "type-1-diabetes",
  "wellness-services",
];

const ROUTES = [
  { key: "home", routePath: "/", liveUrl: `${SITE}/` },
  ...STATIC_PAGES.map((slug) => ({
    key: slug,
    routePath: `/${slug}/`,
    liveUrl: `${SITE}/${slug}/`,
  })),
  ...blogPostSlugs.map((slug) => ({
    key: slug,
    routePath: `/${slug}/`,
    liveUrl: `${SITE}/${slug}/`,
    isPost: true,
  })),
];

const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const only = onlyArg ? onlyArg.slice("--only=".length).split(",") : null;
const targets = only ? ROUTES.filter((r) => only.includes(r.key)) : ROUTES;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url, options, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url, options);
      if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
      return res;
    } catch (err) {
      lastErr = err;
      await sleep(1000 * (i + 1));
    }
  }
  throw lastErr;
}

async function fetchHtml(liveUrl) {
  const res = await fetchWithRetry(READER + liveUrl, {
    headers: { "X-Return-Format": "html" },
  });
  return res.text();
}

async function fetchMarkdown(liveUrl) {
  const res = await fetchWithRetry(READER + liveUrl);
  return res.text();
}

function absolutize(url) {
  if (!url) return url;
  if (url.startsWith("//")) return `https:${url}`;
  if (url.startsWith("/")) return `${SITE}${url}`;
  return url;
}

/** Parse <head> metadata + every JSON-LD block from the raw HTML. */
function extractHead($, liveUrl) {
  const title = $("title").first().text().trim();
  const metaDescription =
    $('meta[name="description"]').attr("content")?.trim() || null;
  const canonical = absolutize($('link[rel="canonical"]').attr("href")) || liveUrl;
  const robots = $('meta[name="robots"]').attr("content") || null;

  const openGraph = {};
  $('meta[property^="og:"]').each((_, el) => {
    const prop = $(el).attr("property").slice("og:".length);
    const content = $(el).attr("content");
    if (!content) return;
    if (openGraph[prop] !== undefined) {
      openGraph[prop] = Array.isArray(openGraph[prop])
        ? [...openGraph[prop], content]
        : [openGraph[prop], content];
    } else {
      openGraph[prop] = content;
    }
  });

  const twitter = {};
  $('meta[name^="twitter:"]').each((_, el) => {
    const prop = $(el).attr("name").slice("twitter:".length);
    const content = $(el).attr("content");
    if (content) twitter[prop] = content;
  });

  const jsonLd = [];
  $('script[type="application/ld+json"]').each((_, el) => {
    const raw = $(el).contents().text();
    try {
      jsonLd.push({
        source: $(el).attr("class") || null,
        data: JSON.parse(raw),
      });
    } catch {
      // Skip malformed JSON-LD rather than failing the whole migration.
    }
  });

  // The markdown reader invents generic "Image N" alt labels when it can't
  // read one, so build a lookup of the *real* alt attributes from the raw
  // HTML <img> tags to use instead when localizing images.
  const imageAltByUrl = new Map();
  $("img").each((_, el) => {
    const src = absolutize($(el).attr("src"));
    if (src) imageAltByUrl.set(src, $(el).attr("alt") ?? "");
  });

  const videos = [];
  $("iframe").each((_, el) => {
    const src = $(el).attr("src") || "";
    if (/youtube|youtu\.be|vimeo|wistia/i.test(src)) {
      videos.push({
        provider: /youtube|youtu\.be/i.test(src)
          ? "youtube"
          : /vimeo/i.test(src)
            ? "vimeo"
            : "wistia",
        src: absolutize(src),
        title: $(el).attr("title") || null,
      });
    }
  });

  return { title, metaDescription, canonical, robots, openGraph, twitter, jsonLd, videos, imageAltByUrl };
}

/**
 * The reader's markdown output repeats the site header/nav (twice) before
 * the real content, and always ends with a "Quick Links" style footer.
 * Slice those off using the shared header CTA / footer heading as anchors.
 */
function extractBodyMarkdown(markdown) {
  // Every reader response starts with its own "Title: / URL Source: /
  // Published Time: / Markdown Content:" preamble — strip that first.
  const contentMarker = "Markdown Content:\n";
  const markerIndex = markdown.indexOf(contentMarker);
  const stripped =
    markerIndex === -1 ? markdown : markdown.slice(markerIndex + contentMarker.length);

  const lines = stripped.split("\n");

  const headerAnchorRe = /^\[Book Free Discovery Call\]/;
  let start = 0;
  for (let i = lines.length - 1; i >= 0; i--) {
    if (headerAnchorRe.test(lines[i].trim())) {
      start = i + 1;
      break;
    }
  }

  const footerAnchorRe = /^## Quick Links|^\[Facebook\]|^## \[© \d{4} Dr\. Autoimmune/;
  let end = lines.length;
  for (let i = start; i < lines.length; i++) {
    if (footerAnchorRe.test(lines[i].trim())) {
      end = i;
      break;
    }
  }

  return lines
    .slice(start, end)
    .join("\n")
    .replace(/^\s*\n+/, "")
    .replace(/\n+\s*$/, "");
}

function basenameFromUrl(url) {
  try {
    const u = new URL(url);
    return decodeURIComponent(path.basename(u.pathname)) || "image";
  } catch {
    return "image";
  }
}

async function downloadImage(originalUrl, destDir) {
  await mkdir(destDir, { recursive: true });
  const filename = basenameFromUrl(originalUrl);
  const dest = path.join(destDir, filename);
  const proxied = IMAGE_PROXY + encodeURIComponent(originalUrl.replace(/^https?:\/\//, ""));
  const res = await fetchWithRetry(proxied);
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  return filename;
}

/** Download every drautoimmune.com wp-content image referenced in the body,
 * then rewrite the markdown to point at the local copy. Real `alt` text is
 * pulled from the raw HTML (the markdown reader invents "Image N" labels). */
async function localizeImages(bodyMarkdown, key, imageAltByUrl) {
  const imgRe = /!\[([^\]]*)\]\((https:\/\/drautoimmune\.com\/wp-content\/[^)]+)\)/g;
  const images = [];
  const downloaded = new Map(); // originalUrl -> localPath (avoids re-downloading repeated images)
  let match;
  let rewritten = bodyMarkdown;

  while ((match = imgRe.exec(bodyMarkdown))) {
    const [full, markdownAlt, url] = match;
    const realAlt = imageAltByUrl.get(url);
    const alt = realAlt !== undefined ? realAlt : markdownAlt || "";

    let localPath = downloaded.get(url);
    if (!localPath) {
      try {
        const filename = await downloadImage(url, path.join(IMAGES_DIR, key));
        localPath = `/images/migrated/${key}/${filename}`;
        downloaded.set(url, localPath);
        images.push({ src: localPath, alt, originalUrl: url, originalFilename: filename });
      } catch (err) {
        console.warn(`  ! image failed (${url}): ${err.message}`);
        continue;
      }
    }
    // Some pages (e.g. duplicated toggle/tab sections) repeat the same image
    // with a different reader-generated alt each time — replace every
    // occurrence, not just the first, so nothing is left pointing at the
    // dead drautoimmune.com wp-content URL.
    rewritten = rewritten.split(full).join(`![${alt}](${localPath})`);
  }

  return { bodyMarkdown: rewritten, images };
}

/** Rewrite remaining internal drautoimmune.com links to relative paths that
 * match the new Next.js route structure (trailing slash preserved). Some
 * older post bodies still link with a stale "/blog/<slug>/" prefix left
 * over from a previous permalink structure — normalize those to the actual
 * scaffolded route (blog posts live at the root, per the sitemap). */
function localizeLinks(markdown) {
  const rewritten = markdown.replace(
    /\((https:\/\/drautoimmune\.com)(\/[^)#]*)?(#[^)]*)?\)/g,
    (_m, _domain, p, hash) => `(${p || "/"}${hash || ""})`
  );
  return rewritten.replace(/\(\/blog\/([^/)#]+)\/([^)]*)\)/g, (m, slug, rest) =>
    blogPostSlugs.includes(slug) ? `(/${slug}/${rest})` : m
  );
}

async function migrateRoute(route) {
  console.log(`Fetching ${route.liveUrl} ...`);
  const [html, markdown] = await Promise.all([
    fetchHtml(route.liveUrl),
    fetchMarkdown(route.liveUrl),
  ]);

  await mkdir(CACHE_DIR, { recursive: true });
  await writeFile(path.join(CACHE_DIR, `${route.key}.html`), html);
  await writeFile(path.join(CACHE_DIR, `${route.key}.md`), markdown);

  const $ = cheerio.load(html);
  const head = extractHead($, route.liveUrl);

  const rawBody = extractBodyMarkdown(markdown);
  const { bodyMarkdown: localizedImages, images } = await localizeImages(
    rawBody,
    route.key,
    head.imageAltByUrl
  );
  const bodyMarkdown = localizeLinks(localizedImages);
  const { imageAltByUrl, ...headWithoutAltMap } = head;

  const record = {
    key: route.key,
    path: route.routePath,
    liveUrl: route.liveUrl,
    isPost: Boolean(route.isPost),
    ...headWithoutAltMap,
    images,
    bodyMarkdown,
  };

  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(path.join(DATA_DIR, `${route.key}.json`), JSON.stringify(record, null, 2));
  console.log(`  -> saved content/data/${route.key}.json (${images.length} images, ${head.jsonLd.length} JSON-LD blocks)`);
  return record;
}

async function main() {
  const results = [];
  for (const route of targets) {
    try {
      const record = await migrateRoute(route);
      results.push({ key: record.key, path: record.path, title: record.title });
    } catch (err) {
      console.error(`FAILED ${route.key}: ${err.message}`);
      results.push({ key: route.key, path: route.routePath, error: err.message });
    }
    // Be polite to the reader proxy between requests.
    await sleep(Number(process.env.MIGRATE_SLEEP_MS) || 400);
  }

  const indexPath = path.join(DATA_DIR, "index.json");
  let existingIndex = [];
  try {
    existingIndex = JSON.parse(await readFile(indexPath, "utf8"));
  } catch {
    // no existing index yet
  }
  const merged = new Map(existingIndex.map((r) => [r.key, r]));
  for (const r of results) merged.set(r.key, r);
  await writeFile(indexPath, JSON.stringify([...merged.values()], null, 2));

  const failed = results.filter((r) => r.error);
  console.log(`\nDone. ${results.length - failed.length}/${results.length} succeeded.`);
  if (failed.length) {
    console.log("Failed routes:", failed.map((f) => f.key).join(", "));
  }
}

main();
