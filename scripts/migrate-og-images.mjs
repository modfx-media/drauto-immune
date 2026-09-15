#!/usr/bin/env node
/**
 * Localizes every migrated page's `openGraph.image` (currently still
 * pointing at the old WordPress media library, `drautoimmune.com/wp-content/
 * uploads/...`, which will 404 once this app replaces that backend) into a
 * same-size (1200x630, the OG-recommended minimum) local JPEG under
 * `public/images/og/<key>.jpg`, and rewrites `openGraph.image` /
 * `openGraph["image:*"]` / `twitter.image` / any matching JSON-LD image URLs
 * in `content/data/<key>.json` to point at it.
 *
 * Pages that never had an `openGraph.image` at all (home, contact-us,
 * services, store, discovery-call, patient-portal, sample-page) get a
 * generated branded default (`public/images/og/default.jpg`) instead of
 * shipping with no social-share image.
 *
 * Usage: node scripts/migrate-og-images.mjs
 */

import { mkdir, writeFile, readFile, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const DATA_DIR = path.join(ROOT, "content", "data");
const OG_DIR = path.join(ROOT, "public", "images", "og");
const SITE_URL = "https://drautoimmune.com";
const IMAGE_PROXY = "https://images.weserv.nl/?url=";
const OG_WIDTH = 1200;
const OG_HEIGHT = 630;

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

async function downloadAndResize(originalUrl, destFile) {
  const proxied = IMAGE_PROXY + encodeURIComponent(originalUrl.replace(/^https?:\/\//, ""));
  const res = await fetchWithRetry(proxied);
  const buf = Buffer.from(await res.arrayBuffer());
  await sharp(buf)
    .resize(OG_WIDTH, OG_HEIGHT, { fit: "cover", position: "attention" })
    .jpeg({ quality: 82 })
    .toFile(destFile);
}

/** Brand-gradient card with the wordmark centered — used for pages with no source photo to crop from. */
async function generateDefaultOgImage(destFile) {
  const logo = await sharp(path.join(ROOT, "public/images/logo/logo-png.webp"))
    .resize(560)
    .negate({ alpha: false })
    .linear(-1, 255) // invert to white (matches the site's own white-watermark treatment)
    .toBuffer();

  const svgBg = Buffer.from(
    `<svg width="${OG_WIDTH}" height="${OG_HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stop-color="#1a1a1a"/>
          <stop offset="60%" stop-color="#2c4f43"/>
          <stop offset="100%" stop-color="#306151"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#bg)"/>
      <text x="50%" y="82%" text-anchor="middle" font-family="Helvetica, Arial, sans-serif"
        font-size="30" fill="#ffffff" opacity="0.85">Functional Medicine for Autoimmune Conditions</text>
    </svg>`
  );

  await sharp(svgBg)
    .composite([{ input: logo, gravity: "center" }])
    .jpeg({ quality: 88 })
    .toFile(destFile);
}

function firstOf(value) {
  return Array.isArray(value) ? value[0] : value;
}

/** Recursively replaces every occurrence of any `oldUrls` string with `newUrl` anywhere in a JSON value. */
function replaceUrlsDeep(value, oldUrls, newUrl) {
  if (typeof value === "string") return oldUrls.has(value) ? newUrl : value;
  if (Array.isArray(value)) return value.map((v) => replaceUrlsDeep(v, oldUrls, newUrl));
  if (value && typeof value === "object") {
    const out = {};
    for (const [k, v] of Object.entries(value)) out[k] = replaceUrlsDeep(v, oldUrls, newUrl);
    return out;
  }
  return value;
}

async function run() {
  await mkdir(OG_DIR, { recursive: true });

  const defaultDest = path.join(OG_DIR, "default.jpg");
  await generateDefaultOgImage(defaultDest);
  const defaultUrl = `${SITE_URL}/images/og/default.jpg`;
  console.log(`✓ generated default OG image -> ${defaultUrl}`);

  const files = (await readdir(DATA_DIR)).filter((f) => f.endsWith(".json") && f !== "index.json");

  for (const file of files) {
    const filePath = path.join(DATA_DIR, file);
    const record = JSON.parse(await readFile(filePath, "utf8"));
    const key = record.key;

    const rawImage = record.openGraph?.image;
    const rawTwitterImage = record.twitter?.image;
    const oldUrls = new Set(
      [...(Array.isArray(rawImage) ? rawImage : rawImage ? [rawImage] : []), rawTwitterImage].filter(
        (u) => typeof u === "string" && u.includes("wp-content/uploads")
      )
    );

    let newUrl;
    if (oldUrls.size > 0) {
      const sourceUrl = firstOf(rawImage) ?? rawTwitterImage;
      const destFile = path.join(OG_DIR, `${key}.jpg`);
      try {
        await downloadAndResize(sourceUrl, destFile);
        newUrl = `${SITE_URL}/images/og/${key}.jpg`;
        console.log(`✓ ${key} -> ${newUrl}`);
      } catch (err) {
        console.warn(`! ${key}: OG image download failed (${err.message}), using default`);
        newUrl = defaultUrl;
      }
    } else if (!rawImage) {
      newUrl = defaultUrl;
      console.log(`- ${key}: no source image, using default`);
    } else {
      // Already a local/non-WordPress URL — leave untouched.
      continue;
    }

    let updated = replaceUrlsDeep(record, oldUrls, newUrl);
    updated = {
      ...updated,
      openGraph: {
        ...updated.openGraph,
        image: newUrl,
        "image:secure_url": newUrl,
        "image:width": String(OG_WIDTH),
        "image:height": String(OG_HEIGHT),
        "image:type": "image/jpeg",
      },
      twitter: { ...updated.twitter, image: newUrl },
    };

    await writeFile(filePath, JSON.stringify(updated, null, 2) + "\n", "utf8");
  }

  console.log("Done.");
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
