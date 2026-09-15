/**
 * Canonical production origin for the site, used to build absolute URLs
 * (sitemap, robots.txt, metadataBase). Configurable via `NEXT_PUBLIC_SITE_URL`
 * so staging/preview deploys can override it; falls back to the production
 * domain so local dev/builds work without a `.env.local` file.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drautoimmune.com";
