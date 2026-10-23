/**
 * Server-only blog data helpers — these read `content/data/<slug>.json`
 * via `getPageContent` (which uses `node:fs`), so this module must only
 * ever be imported from server components/route files, never from a
 * `"use client"` component (see `lib/blog-posts.ts` for the client-safe
 * slug/formatting utilities used by `BlogCard`/`BlogPostTemplate`/`BlogHubPage`).
 */
import { getPageContent } from "./content";
import { queryPublishedPosts } from "@/lib/cms/queries";
import {
  blogFeaturedImageFallbacks,
  blogPostSlugs,
  stripSiteSuffix,
  type BlogPostSlug,
  type BlogPostSummary,
} from "./blog-posts";

function toSummary(slug: BlogPostSlug): BlogPostSummary | null {
  const page = getPageContent(slug);
  if (!page) return null;
  return {
    slug,
    title: stripSiteSuffix(page.title),
    excerpt: page.metaDescription ?? "",
    image: page.featuredImage ? { src: page.featuredImage.src, alt: page.featuredImage.alt } : null,
    datePublished: page.datePublished ?? null,
    readingTime: page.readingTime ?? null,
  };
}

function sortNewestFirst(posts: BlogPostSummary[]): BlogPostSummary[] {
  return [...posts].sort((a, b) => {
    if (!a.datePublished && !b.datePublished) return 0;
    if (!a.datePublished) return 1;
    if (!b.datePublished) return -1;
    return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
  });
}

/** Every blog post, newest first. Hardcoded JSON merged with published CMS posts. */
export async function getAllBlogPosts(): Promise<BlogPostSummary[]> {
  const hardcoded = blogPostSlugs
    .map(toSummary)
    .filter((post): post is BlogPostSummary => post !== null);

  const bySlug = new Map<string, BlogPostSummary>(hardcoded.map((post) => [post.slug, post]));
  const cms = await queryPublishedPosts();
  if (cms) {
    for (const post of cms) {
      const existing = bySlug.get(post.slug);
      bySlug.set(post.slug, {
        slug: post.slug,
        title: existing?.title || stripSiteSuffix(post.title || post.slug),
        excerpt: existing?.excerpt || post.excerpt || "",
        image:
          existing?.image ||
          (post.metaImageUrl
            ? { src: post.metaImageUrl, alt: post.metaImageAlt || post.title }
            : null) ||
          blogFeaturedImageFallbacks[post.slug] ||
          null,
        datePublished: existing?.datePublished || post.publishedAt || null,
        readingTime: existing?.readingTime ?? null,
      });
    }
  }

  // That CMS draft has no photo of its own and was repeating another card.
  return sortNewestFirst([...bySlug.values()]).filter(
    (post) => post.slug !== "break-through-weight-and-fatigue-plateaus",
  );
}

/** The `count` most recent posts excluding `excludeSlug` — backs the post template's "Recent Blogs" sidebar. */
export async function getRecentBlogPosts(excludeSlug: string, count = 5): Promise<BlogPostSummary[]> {
  const all = await getAllBlogPosts();
  return all.filter((post) => post.slug !== excludeSlug).slice(0, count);
}
