import BlogPostTemplate from "@/components/pages/blog/BlogPostTemplate";
import type { RoutedDoc } from "@/lib/cms/queries";
import { getRecentBlogPosts } from "@/lib/blog-posts-server";
import { getPageContent, type PageContent } from "@/lib/content";
import { normalizeCmsPath } from "@/lib/cms/url";

function slugFromDoc(doc: Record<string, unknown>): string | null {
  if (typeof doc.slug === "string" && doc.slug.trim()) return doc.slug.trim();
  const path = normalizeCmsPath(typeof doc.path === "string" ? doc.path : null);
  if (!path || path === "/") return null;
  const parts = path.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? null;
}

function pageFromCmsDoc(doc: Record<string, unknown>): PageContent | null {
  const slug = slugFromDoc(doc);
  if (!slug) return null;

  const hardcoded = getPageContent(slug);
  const bodyMarkdown =
    typeof doc.bodyMarkdown === "string" && doc.bodyMarkdown.trim()
      ? doc.bodyMarkdown
      : hardcoded?.bodyMarkdown;
  if (!bodyMarkdown?.trim()) return null;

  const title =
    (typeof doc.title === "string" && doc.title) || hardcoded?.title || slug;
  const excerpt =
    (typeof doc.excerpt === "string" && doc.excerpt) || hardcoded?.metaDescription || null;
  const path = normalizeCmsPath(typeof doc.path === "string" ? doc.path : `/${slug}`) ?? `/${slug}`;
  const publishedAt =
    (typeof doc.publishedAt === "string" && doc.publishedAt) ||
    hardcoded?.datePublished ||
    null;

  return {
    key: slug,
    path: path === "/" ? "/" : `${path}/`,
    liveUrl: hardcoded?.liveUrl ?? `https://drautoimmune.com${path === "/" ? "/" : `${path}/`}`,
    isPost: true,
    title,
    metaDescription: excerpt,
    canonical:
      (typeof doc.canonicalUrl === "string" && doc.canonicalUrl) ||
      hardcoded?.canonical ||
      `https://drautoimmune.com${path === "/" ? "/" : `${path}/`}`,
    robots: hardcoded?.robots ?? null,
    openGraph: hardcoded?.openGraph ?? {},
    twitter: hardcoded?.twitter ?? {},
    jsonLd: hardcoded?.jsonLd ?? [],
    videos: hardcoded?.videos ?? [],
    images: hardcoded?.images ?? [],
    bodyMarkdown,
    featuredImage: hardcoded?.featuredImage ?? null,
    datePublished: publishedAt,
    dateModified:
      (typeof doc.sourceUpdatedAt === "string" && doc.sourceUpdatedAt) ||
      hardcoded?.dateModified ||
      null,
    readingTime: hardcoded?.readingTime ?? null,
  };
}

/**
 * Published CMS doc wins when we can render it through a designed template.
 * Otherwise keep the hardcoded `fallback` so bespoke React pages never get
 * swapped for a generic markdown shell.
 */
export function RenderRoutedContent({
  routed,
  fallback,
}: {
  routed: RoutedDoc;
  fallback: React.ReactNode;
}) {
  const { collection, doc } = routed;
  const template = typeof doc.template === "string" ? doc.template : null;

  if (collection === "posts" || template === "blog") {
    const page = pageFromCmsDoc(doc);
    if (!page) return fallback;
    const recentPosts = getRecentBlogPosts(page.key, 4);
    return <BlogPostTemplate page={page} recentPosts={recentPosts} />;
  }

  // Home, marketing, condition, learn, and area routes keep their designed
  // React compositions. CMS still owns metadata, drafts, and search via
  // cmsMetadata / query helpers — without a visual regression on publish.
  return fallback;
}
