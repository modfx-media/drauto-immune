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
];

function normalizeTitle(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/\s+/g, " ");
}

export function isBoilerplateSeoTitle(value: string | null | undefined): boolean {
  if (!value) return true;
  const trimmed = value.trim();
  if (SHORT_TITLE_RE.test(trimmed)) return true;
  const normalized = normalizeTitle(trimmed);
  return STALE_TITLE_RES.some((pattern) => pattern.test(normalized));
}

export function isBoilerplateSeoDescription(value: string | null | undefined): boolean {
  if (!value) return true;
  return value.includes(GENERIC_BLOG_DESCRIPTION);
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
