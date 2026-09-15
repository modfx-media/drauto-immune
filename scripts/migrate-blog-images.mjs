#!/usr/bin/env node
/**
 * One-off backfill: downloads each blog post's featured/OG image (not
 * captured by the original `migrate-content.mjs`, which only localizes
 * images referenced inline in the body markdown) and enriches each post's
 * `content/data/<slug>.json` with a few small derived fields used by the
 * new `BlogPostTemplate`/blog hub design:
 *   - `featuredImage`: { src, alt, originalUrl, originalFilename } (local copy)
 *   - `datePublished` / `dateModified`: pulled from whichever JSON-LD node
 *     in the page's `@graph` has them (schema shape varies: some older
 *     posts have a Yoast "Article" node, newer ones a Rank Math
 *     "BlogPosting" node — this searches generically instead of assuming
 *     one shape)
 *   - `readingTime`: reuses the live site's own "Time to read" Twitter
 *     card label/data pair when present, otherwise estimated from word
 *     count (~200 wpm)
 *
 * Usage: node scripts/migrate-blog-images.mjs
 */

import { mkdir, writeFile, readFile } from "node:fs/promises";
import path from "node:path";

// Kept in sync with the readonly array in lib/blog-posts.ts (a plain .mjs
// script can't import a .ts module directly without a transpile step, same
// reason migrate-content.mjs keeps its own copy).
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

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA_DIR = path.join(ROOT, "content", "data");
const IMAGES_DIR = path.join(ROOT, "public", "images", "migrated");
const IMAGE_PROXY = "https://images.weserv.nl/?url=";

// Once a post's openGraph.image has already been localized (by this script or
// migrate-og-images.mjs), re-running against the full slug list 404s on the
// now-local/absolute-prod URL and wipes its featuredImage — always scope
// re-runs to just-added slugs via --only=slug1,slug2.
const onlyArg = process.argv.find((a) => a.startsWith("--only="));
const targetSlugs = onlyArg
  ? onlyArg.slice("--only=".length).split(",")
  : blogPostSlugs;

function basenameFromUrl(url) {
  try {
    const u = new URL(url);
    return decodeURIComponent(path.basename(u.pathname)) || "image";
  } catch {
    return "image";
  }
}

async function fetchWithRetry(url, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res;
    } catch (err) {
      lastErr = err;
      await new Promise((r) => setTimeout(r, 500 * (i + 1)));
    }
  }
  throw lastErr;
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

/** Finds the first node anywhere in the JSON-LD @graph(s) that has a `datePublished` string. */
function findDates(jsonLd) {
  for (const block of jsonLd ?? []) {
    const graph = block?.data?.["@graph"];
    if (!Array.isArray(graph)) continue;
    for (const node of graph) {
      if (typeof node?.datePublished === "string") {
        return { datePublished: node.datePublished, dateModified: node.dateModified ?? node.datePublished };
      }
    }
  }
  return { datePublished: null, dateModified: null };
}

function estimateReadingTime(markdown) {
  const words = markdown.trim().split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 200))} min read`;
}

function findReadingTime(twitter, bodyMarkdown) {
  if (twitter?.label2 === "Time to read" && twitter?.data2) return twitter.data2;
  if (twitter?.label1 === "Time to read" && twitter?.data1) return twitter.data1;
  return estimateReadingTime(bodyMarkdown);
}

async function run() {
  for (const slug of targetSlugs) {
    const file = path.join(DATA_DIR, `${slug}.json`);
    const record = JSON.parse(await readFile(file, "utf8"));

    const ogImageUrl = Array.isArray(record.openGraph?.image) ? record.openGraph.image[0] : record.openGraph?.image;
    const ogAlt = Array.isArray(record.openGraph?.["image:alt"])
      ? record.openGraph["image:alt"][0]
      : record.openGraph?.["image:alt"];

    let featuredImage = null;
    if (ogImageUrl) {
      try {
        const filename = await downloadImage(ogImageUrl, path.join(IMAGES_DIR, slug));
        featuredImage = {
          src: `/images/migrated/${slug}/${filename}`,
          alt: ogAlt || record.title,
          originalUrl: ogImageUrl,
          originalFilename: filename,
        };
        console.log(`✓ ${slug} -> ${featuredImage.src}`);
      } catch (err) {
        console.warn(`! ${slug}: featured image failed (${err.message})`);
      }
    } else {
      console.warn(`! ${slug}: no openGraph.image`);
    }

    const { datePublished, dateModified } = findDates(record.jsonLd);
    const readingTime = findReadingTime(record.twitter, record.bodyMarkdown);

    const updated = { ...record, featuredImage, datePublished, dateModified, readingTime };
    await writeFile(file, JSON.stringify(updated, null, 2) + "\n", "utf8");
  }
  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
