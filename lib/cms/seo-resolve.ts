/**
 * Helpers so hardcoded SEO improvements still render when Payload has
 * published docs carrying migrated boilerplate (short titles / generic
 * blog descriptions), while still letting intentional CMS overrides win.
 */

const GENERIC_BLOG_DESCRIPTION =
  "Discover expert advice from Boulder's most trusted gut health specialist";

const SHORT_TITLE_RE =
  /^(Store|About Us|Contact Us|ADHD\s*\/\s*ADD)\s*[-–—]\s*Dr\.?\s*Autoimmune\s*$/i;

export function isBoilerplateSeoTitle(value: string | null | undefined): boolean {
  if (!value) return true;
  return SHORT_TITLE_RE.test(value.trim());
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
