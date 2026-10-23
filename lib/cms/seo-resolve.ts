/**
 * Helpers so hardcoded SEO improvements still render when Payload has
 * published docs carrying migrated boilerplate (short titles / generic
 * blog descriptions), while still letting intentional CMS overrides win.
 */

const GENERIC_BLOG_DESCRIPTION =
  "Discover expert advice from Boulder's most trusted gut health specialist";

const SHORT_TITLE_RE =
  /^(Store|About Us|Contact Us|ADHD\s*\/\s*ADD)\s*[-–—]\s*Dr\.?\s*Autoimmune\s*$/i;

/**
 * Titles already published in Payload from the WordPress migration. Code
 * fallbacks replace them until an editor saves a different title. Matched
 * loosely so curly apostrophes and the optional brand suffix still count.
 */
const STALE_TITLE_RES = [
  /^patient stories(\s*&\s*testimonials)?\s*[-–—|]\s*dr\.?\s*autoimmune$/,
  /^signs your gut may be driving autoimmune flares(\s*[-–—|]\s*dr\.?\s*autoimmune)?$/,
  /^why your pots symptoms still don't make sense and what your body may be trying to tell you(\s*[-–—|]\s*dr\.?\s*autoimmune)?$/,
  /^autoimmune doctor boulder co\s*\|\s*telehealth functional medicine\s*\|\s*dr\.?\s*autoimmune$/,
  /^book an appointment\s*[-–—|]\s*(dr\.?\s*autoimmune|boulder autoimmune specialist)$/,
  /^book new patient evaluation\s*[-–—|]\s*dr\.?\s*autoimmune$/,
];

/** Homepage descriptions already published from the WordPress migration. */
const STALE_DESCRIPTION_RES = [
  /^looking for an autoimmune doctor in boulder, co\? dr\.?\s*autoimmune offers root-cause functional medicine by telehealth for hashimoto's, gut, and chronic autoimmune concerns - boulder-based, serving denver and patients nationwide\.?$/,
  /^see an autoimmune doctor via telehealth from boulder, co\. dr\.?\s*autoimmune offers root-cause functional medicine for chronic and autoimmune conditions nationwide\.?$/,
];

function normalizeCopy(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[—–]/g, "-")
    .replace(/\s+/g, " ");
}

export function isBoilerplateSeoTitle(value: string | null | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  if (SHORT_TITLE_RE.test(trimmed)) return true;
  const normalized = normalizeCopy(trimmed);
  return STALE_TITLE_RES.some((pattern) => pattern.test(normalized));
}

export function isBoilerplateSeoDescription(value: string | null | undefined): boolean {
  if (!value) return true;
  if (value.includes(GENERIC_BLOG_DESCRIPTION)) return true;
  const normalized = normalizeCopy(value);
  return STALE_DESCRIPTION_RES.some((pattern) => pattern.test(normalized));
}

export function resolveSeoTitle(
  cmsValue: string | null | undefined,
  fallback: string | null | undefined,
): string | undefined {
  if (cmsValue && !isBoilerplateSeoTitle(cmsValue)) return cmsValue;
  return fallback ?? cmsValue ?? undefined;
}

export function resolveSeoDescription(
  cmsValue: string | null | undefined,
  fallback: string | null | undefined,
): string | undefined {
  if (cmsValue && !isBoilerplateSeoDescription(cmsValue)) return cmsValue;
  return fallback ?? cmsValue ?? undefined;
}
