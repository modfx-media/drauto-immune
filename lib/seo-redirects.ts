/**
 * Permanent (301) redirects for cannibalization consolidation and
 * reconstructed broken-backlink targets. Consumed by next.config.ts and
 * filtered out of the sitemap.
 *
 * Sources without a trailing slash are also registered in next.config so
 * both permalink styles resolve.
 */

export type SeoRedirect = {
  source: string;
  destination: string;
  /** When true, listed in the PR as needing client confirmation. */
  uncertain?: boolean;
};

/** Cannibalization consolidations — unique content is merged into the destination. */
export const CANNIBALIZATION_REDIRECTS: SeoRedirect[] = [
  {
    source: "/understanding-leaky-gut-with-a-functional-medicine-doctor/",
    destination: "/leaky-gut-signs-causes-and-functional-fixes/",
  },
  {
    source: "/unveiling-the-7-mechanisms-of-leaky-gut/",
    destination: "/leaky-gut-signs-causes-and-functional-fixes/",
  },
  {
    source: "/understanding-gluten-disorders-celiac-disease-allergy-and-sensitivity/",
    destination: "/celiac-disease-and-gluten-intolerance/",
  },
  {
    source: "/how-autoimmune-diseases-can-affect-your-skin/",
    destination: "/autoimmune-skin-clues-gut-health-trouble/",
  },
  {
    source: "/are-you-testing-your-inflammatory-markers-heres-why-you-should-be/",
    destination: "/what-high-crp-reveals-about-chronic-inflammation/",
  },
  {
    source: "/autoimmune-thyroid-symptoms-when-tsh-looks-normal/",
    destination: "/why-do-i-still-have-symptoms-when-my-tsh-is-normal/",
  },
  {
    source: "/wellness-services/",
    destination: "/services/",
  },
  {
    source: "/hello-my-valued-subscriber/",
    destination: "/blog/",
  },
];

/**
 * Reconstructed broken-backlink targets from the Oct 2026 SEO research.
 * Clear destinations only — uncertain ones stay out of this list and are
 * documented in the PR body instead.
 */
export const BROKEN_BACKLINK_REDIRECTS: SeoRedirect[] = [
  {
    source: "/service/neurologic-rehabilitation/",
    destination: "/services/",
  },
  {
    source: "/there-is-nothing-sweet-about-artificial-sweeteners-and-leaky-gut/",
    destination: "/leaky-gut-signs-causes-and-functional-fixes/",
  },
  {
    source: "/autoimmune-doctor-in-boulder-for-chronic-fatigue/",
    destination: "/what-chronic-fatigue-reveals-about-thyroid-health/",
  },
  {
    source: "/autoimmune-brain-fog-and-fatigue/",
    destination: "/what-chronic-fatigue-reveals-about-thyroid-health/",
  },
  {
    source: "/autoimmune-fatigue-high-altitude-lifestyle/",
    destination: "/what-chronic-fatigue-reveals-about-thyroid-health/",
  },
  {
    source: "/hidden-thyroid-triggers/",
    destination: "/thyroid-conditions/",
  },
  {
    source: "/signs-your-gut-may-be-driving-autoimmune-flares/",
    destination: "/signs-gut-may-be-driving-autoimmune-flares/",
  },
  {
    source: "/living-with-mold-illness-autoimmune-fatigue/",
    destination: "/mold-illness-often-mimics-autoimmune-disease-symptoms/",
  },
  {
    source: "/autoimmune-friendly-nutrition-functional-medicine-doctor/",
    destination: "/learn/autoimmune-protocol-diet/",
  },
  {
    source: "/category/gut-health/",
    destination: "/blog/",
  },
  {
    source: "/Graves-disease/",
    destination: "/graves-disease/",
  },
  {
    source: "/graves-disease",
    destination: "/graves-disease/",
  },
];

/** Destinations we intentionally did NOT redirect (uncertain / leave 404). */
export const UNCERTAIN_BROKEN_BACKLINKS = [
  {
    source: "/immunoxym-the-best-way-to-get-the-benefits-of-green-tea/",
    note: "Product/supplement page — unclear whether /store/ or /blog/ is correct; confirm with client before redirecting.",
  },
  {
    source: "/sample-page/",
    note: "WordPress placeholder — leave 404/410.",
  },
] as const;

export const ALL_SEO_REDIRECTS: SeoRedirect[] = [
  ...CANNIBALIZATION_REDIRECTS,
  ...BROKEN_BACKLINK_REDIRECTS,
];

/** Normalized paths (no trailing slash, leading slash) that must leave the sitemap. */
export function redirectedSitemapPaths(): Set<string> {
  const paths = new Set<string>();
  for (const redirect of ALL_SEO_REDIRECTS) {
    const normalized = redirect.source.replace(/\/$/, "") || "/";
    paths.add(normalized.startsWith("/") ? normalized : `/${normalized}`);
  }
  return paths;
}
