import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import BlogPostTemplate from "@/components/pages/blog/BlogPostTemplate";
import { cmsMetadata } from "@/lib/cms/metadata";
import { queryPublishedPostSlugs } from "@/lib/cms/queries";
import { buildMetadata, getPageContent } from "@/lib/content";
import { blogPostSlugs, isBlogPostSlug } from "@/lib/blog-posts";
import { getRecentBlogPosts } from "@/lib/blog-posts-server";

/** CMS-only posts must resolve at request time (not only generateStaticParams). */
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
  return cmsMetadata(`/${slug}`, () => (isBlogPostSlug(slug) ? buildMetadata(slug) : {}));
}

/** Fallback when CMS overlay has nothing — forces a real 404 for unknown slugs. */
function PostNotFound(): never {
  notFound();
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const path = `/${slug}`;

  // CMS-only published posts (not in the hardcoded slug list) must still render.
  // CMSRoute overlays published CMS docs; PostNotFound runs only when CMS misses.
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
