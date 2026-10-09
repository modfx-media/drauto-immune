import indexManifest from "../content/data/index.json";
import { inventoryPublicUrls, sitemapInventoryPaths } from "../lib/cms/inventory";
import { normalizeCmsPath } from "../lib/cms/url";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";

const exportFile = path.join(process.cwd(), "data", "content-export.json");
if (!existsSync(exportFile)) {
  console.error("Missing data/content-export.json — run npm run cms:export first.");
  process.exit(1);
}

const exported = JSON.parse(readFileSync(exportFile, "utf8")) as {
  records: { path: string; sourceUrl?: string }[];
};

const exportPaths = new Set(
  exported.records.map((record) => normalizeCmsPath(record.path)).filter(Boolean),
);

const expected = inventoryPublicUrls();
const missing = expected.filter((record) => !exportPaths.has(record.path));

const sitemapPaths = new Set(sitemapInventoryPaths());
const missingSitemap = [...sitemapPaths].filter((item) => !exportPaths.has(item));

const indexPaths = indexManifest
  .map((entry) => normalizeCmsPath(entry.path))
  .filter((item): item is string => Boolean(item));
const missingIndex = indexPaths.filter((item) => !exportPaths.has(item));

if (missing.length || missingSitemap.length || missingIndex.length) {
  console.error("Export coverage gaps:");
  if (missing.length) console.error("  inventory", missing.map((row) => row.path));
  if (missingSitemap.length) console.error("  sitemap", missingSitemap);
  if (missingIndex.length) console.error("  index.json", missingIndex);
  process.exit(1);
}

console.log(
  `Export covers ${exported.records.length} records, including every sitemap path and index.json route.`,
);
