import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import BlogPostTemplate from "@/components/pages/blog/BlogPostTemplate";
import { cmsMetadata } from "@/lib/cms/metadata";
import { queryPublishedPostSlugs } from "@/lib/cms/queries";
import { buildMetadata, getPageContent } from "@/lib/content";
import { blogPostSlugs, isBlogPostSlug } from "@/lib/blog-posts";
import { getRecentBlogPosts } from "@/lib/blog-posts-server";

/** CMS-only posts under /blog/:slug must resolve at request time. */
export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  const cmsSlugs = await queryPublishedPostSlugs();
  const slugs = new Set<string>([...blogPostSlugs, ...cmsSlugs]);
  return [...slugs].map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  // Prefer /blog/:slug metadata; cmsMetadata falls back when CMS path is /:slug.
  return cmsMetadata(`/blog/${slug}`, () =>
    isBlogPostSlug(slug) ? buildMetadata(slug) : {},
  );
}

function PostNotFound(): never {
  notFound();
}

/**
 * Canonical public blog post URLs live under `/blog/:slug/`.
 * CMS docs may still store `path` as `/:slug` — queryRoutedContentByPath aliases both.
 */
export default async function BlogSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = `/blog/${slug}`;

  if (!isBlogPostSlug(slug)) {
    return (
      <CMSRoute path={path}>
        <PostNotFound />
      </CMSRoute>
    );
  }

  const page = getPageContent(slug);
  if (!page) {
    notFound();
  }

  const recentPosts = await getRecentBlogPosts(slug, 4);

  return (
    <CMSRoute path={path}>
      <BlogPostTemplate page={page} recentPosts={recentPosts} />
    </CMSRoute>
  );
}
