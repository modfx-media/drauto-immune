import { config as loadEnv } from "dotenv";
import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { getPayload } from "payload";
import config from "../payload.config";
import type { Page, Post } from "../payload-types";

loadEnv({ path: ".env.local" });
loadEnv({ path: ".env" });

type ExportRecord = {
  collection: "pages" | "posts";
  legacyId: string;
  path: string;
  slug: string;
  title: string;
  template: Page["template"] | Post["template"];
  sourceUrl: string;
  excerpt?: string | null;
  bodyMarkdown?: string | null;
  sourceUpdatedAt?: string | null;
  noIndex?: boolean;
  noFollow?: boolean;
  excludeFromSitemap?: boolean;
  canonicalUrl?: string;
};

type ExportFile = {
  version: number;
  records: ExportRecord[];
  globals: {
    header?: Record<string, unknown>;
    footer?: Record<string, unknown>;
    "site-settings"?: Record<string, unknown>;
  };
};

if (process.argv.includes("--publish")) {
  console.error(
    "Refusing --publish. Imports always write drafts. Publish one URL at a time in /admin after review.",
  );
  process.exit(1);
}

const apply = process.argv.includes("--apply") || process.env.CMS_IMPORT_APPLY === "1";
const fileArg = process.argv.find((arg) => arg.endsWith(".json"));
const filePath = fileArg
  ? path.resolve(fileArg)
  : path.join(process.cwd(), "data", "content-export.json");

if (!existsSync(filePath)) {
  console.error(`Missing export file: ${filePath}`);
  process.exit(1);
}

const exported = JSON.parse(readFileSync(filePath, "utf8")) as ExportFile;

async function findExisting(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: "pages" | "posts",
  record: ExportRecord,
) {
  const byLegacy = await payload.find({
    collection,
    where: { legacyId: { equals: record.legacyId } },
    limit: 1,
    pagination: false,
    draft: true,
    overrideAccess: true,
  });
  if (byLegacy.docs[0]) return byLegacy.docs[0];

  const bySource = await payload.find({
    collection,
    where: { sourceUrl: { equals: record.sourceUrl } },
    limit: 1,
    pagination: false,
    draft: true,
    overrideAccess: true,
  });
  return bySource.docs[0] ?? null;
}

async function main() {
  if (!apply) {
    console.log(`Dry run: ${exported.records.length} records from ${filePath}`);
    console.log("Pass --apply (or CMS_IMPORT_APPLY=1) to write drafts.");
    return;
  }

  process.env.CMS_IMPORT_APPLY = "1";
  const payload = await getPayload({ config });

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const record of exported.records) {
    try {
      const data = {
        title: record.title,
        slug: record.slug || null,
        path: record.path,
        template: record.template,
        excerpt: record.excerpt ?? undefined,
        bodyMarkdown: record.bodyMarkdown ?? undefined,
        legacyId: record.legacyId || null,
        sourceUrl: record.sourceUrl,
        sourceUpdatedAt: record.sourceUpdatedAt ?? undefined,
        noIndex: Boolean(record.noIndex),
        noFollow: Boolean(record.noFollow),
        excludeFromSitemap: Boolean(record.excludeFromSitemap),
        canonicalUrl: record.canonicalUrl,
        _status: "draft" as const,
      };

      const existing = await findExisting(payload, record.collection, record);
      if (existing) {
        await payload.update({
          collection: record.collection,
          id: existing.id,
          data: data as never,
          draft: true,
          overrideAccess: true,
        });
        updated += 1;
      } else {
        await payload.create({
          collection: record.collection,
          data: data as never,
          draft: true,
          overrideAccess: true,
        });
        created += 1;
      }
    } catch (error) {
      skipped += 1;
      console.error(`[cms:import] skip ${record.path}`, error);
    }
  }

  if (exported.globals.header) {
    await payload.updateGlobal({
      slug: "header",
      data: exported.globals.header,
      overrideAccess: true,
    });
  }
  if (exported.globals.footer) {
    await payload.updateGlobal({
      slug: "footer",
      data: exported.globals.footer,
      overrideAccess: true,
    });
  }
  if (exported.globals["site-settings"]) {
    await payload.updateGlobal({
      slug: "site-settings",
      data: exported.globals["site-settings"],
      overrideAccess: true,
    });
  }

  console.log(`Import complete. created=${created} updated=${updated} skipped=${skipped}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
