/**
 * Canonical production origin for the site, used to build absolute URLs
 * (sitemap, robots.txt, metadataBase). Configurable via `NEXT_PUBLIC_SITE_URL`
 * so staging/preview deploys can override it; falls back to the production
 * domain so local dev/builds work without a `.env.local` file.
 */
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://drautoimmune.com";

/** Condition pages that already have a 1200×630 image in `public/images/og/`. */
const AREA_CONDITION_OG_SLUGS = new Set([
  "celiac-disease-and-gluten-intolerance",
  "hashimotos-thyroiditis-graves",
  "inflammatory-bowel-disease",
  "lupus",
  "raynauds-phenomenon",
  "rheumatoid-arthritis",
  "sjogrens-syndrome",
  "thyroid-conditions",
]);

export function areaOgImage(topicSlug?: string, alt = "Dr. Autoimmune") {
  const file =
    topicSlug && AREA_CONDITION_OG_SLUGS.has(topicSlug)
      ? `/images/og/${topicSlug}.jpg`
      : "/images/og/default.jpg";
  return {
    url: `${SITE_URL}${file}`,
    width: 1200,
    height: 630,
    alt,
  };
}
