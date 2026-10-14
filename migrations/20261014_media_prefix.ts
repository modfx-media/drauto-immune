import { type MigrateDownArgs, type MigrateUpArgs, sql } from "@payloadcms/db-vercel-postgres";

/**
 * `@payloadcms/plugin-cloud-storage` (via Vercel Blob) persists `prefix` and
 * `_objectKey` on media. Production has `push: false`, so add them idempotently.
 */
export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "prefix" varchar
  `);
  await db.execute(sql`
    ALTER TABLE "media" ADD COLUMN IF NOT EXISTS "_objectKey" varchar
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "_objectKey"
  `);
  await db.execute(sql`
    ALTER TABLE "media" DROP COLUMN IF EXISTS "prefix"
  `);
}
