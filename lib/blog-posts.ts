/**
 * The 27 blog post slugs pulled from drautoimmune.com/post-sitemap.xml.
 * Backs the `app/[slug]` dynamic route so the URL structure matches 1:1.
 *
 * Kept free of any `node:fs`-backed imports (unlike `lib/blog-posts-server.ts`)
 * so it can be safely imported from client components too.
 */
export const blogPostSlugs = [
  "root-causes-of-anemia-and-low-ferritin",
  "leaky-gut-signs-causes-and-functional-fixes",
  "pots-treatment-looking-beyond-salt-and-medications-with-functional-medicine",
  "autoimmune-thyroid-symptoms-when-tsh-looks-normal",
  "the-hidden-link-between-gut-health-and-autoimmune-disease",
  "if-my-ana-is-positive-do-i-have-an-autoimmune-disease",
  "i-eat-clean-why-do-i-still-feel-sick",
  "why-do-i-still-have-symptoms-when-my-tsh-is-normal",
  "why-your-pots-symptoms-still-dont-make-sense-and-what-your-body-may-be-trying-to-tell-you",
  "autoimmune-skin-clues-gut-health-trouble",
  "what-chronic-fatigue-reveals-about-thyroid-health",
  "hello-my-valued-subscriber",
  "what-high-tsh-levels-actually-mean-why-thyroid-medication-isnt-always-the-answer",
  "are-you-testing-your-inflammatory-markers-heres-why-you-should-be",
  "nutritional-deficiencies-in-hashimotos-understanding-prevention-support",
  "understanding-gluten-disorders-celiac-disease-allergy-and-sensitivity",
  "understanding-leaky-gut-with-a-functional-medicine-doctor",
  "first-autoimmune-functional-medicine-visit-guide",
  "functional-medicine-doctor-help-autoimmune-flares",
  "mold-illness-often-mimics-autoimmune-disease-symptoms",
  "signs-gut-may-be-driving-autoimmune-flares",
  "secrets-that-nourish-your-gut-ease-endometriosis",
  "how-functional-medicine-can-heal-your-eczema",
  "top-5-most-common-autoimmune-diseases-that-affect-women",
  "subject-line-unveiling-the-hidden-effects-of-birth-control-pills",
  "unveiling-the-7-mechanisms-of-leaky-gut",
  "unmasking-the-link-between-covid-19-and-gut-issues",
  "5-common-autoimmune-diseases-in-men",
  "how-autoimmune-diseases-can-affect-your-skin",
  "healing-crohns-disease-with-functional-medicine",
  "a-guide-to-dysbiosis-autoimmunity",
] as const;

export type BlogPostSlug = (typeof blogPostSlugs)[number];

export function isBlogPostSlug(slug: string): slug is BlogPostSlug {
  return (blogPostSlugs as readonly string[]).includes(slug);
}

export function slugToTitle(slug: string): string {
  return slug
    .split("-")
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(" ");
}

/** Strips the "- Dr. Autoimmune" SEO-title suffix for on-page display (the
 * raw `<title>` tag value is kept as-is for `<head>` metadata via `buildMetadata`). */
export function stripSiteSuffix(title: string): string {
  return title.replace(/\s*[-|]\s*Dr\.?\s*Autoimmune\s*$/i, "").trim();
}

export interface BlogPostSummary {
  slug: BlogPostSlug;
  title: string;
  excerpt: string;
  image: { src: string; alt: string } | null;
  datePublished: string | null;
  readingTime: string | null;
}

export function formatBlogDate(iso: string | null): string | null {
  if (!iso) return null;
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return null;
  return date.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
