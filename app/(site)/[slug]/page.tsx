import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import BlogPostTemplate from "@/components/pages/blog/BlogPostTemplate";
import { cmsMetadata } from "@/lib/cms/metadata";
import { buildMetadata, getPageContent } from "@/lib/content";
import { blogPostSlugs, isBlogPostSlug } from "@/lib/blog-posts";
import { getRecentBlogPosts } from "@/lib/blog-posts-server";

export async function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  if (!isBlogPostSlug(slug)) return {};
  return cmsMetadata(`/${slug}`, () => buildMetadata(slug));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  if (!isBlogPostSlug(slug)) {
    notFound();
  }

  const page = getPageContent(slug);
  if (!page) {
    notFound();
  }

  const recentPosts = getRecentBlogPosts(slug, 4);

  return (
    <CMSRoute path={`/${slug}`}>
      <BlogPostTemplate page={page} recentPosts={recentPosts} />
    </CMSRoute>
  );
}
