import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import BlogPostTemplate from "@/components/pages/blog/BlogPostTemplate";
import { cmsMetadata } from "@/lib/cms/metadata";
import { buildMetadata, getPageContent } from "@/lib/content";
import { withUnifiedMedicalClinic } from "@/lib/organization-jsonld";
import { blogPostSlugs, isBlogPostSlug } from "@/lib/blog-posts";
import { getRecentBlogPosts } from "@/lib/blog-posts-server";

/** CMS-only posts resolve at request time — do not hit the DB in generateStaticParams (Vercel build). */
export const dynamicParams = true;
export const revalidate = 300;

export async function generateStaticParams() {
  return blogPostSlugs.map((slug) => ({ slug }));
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
  const safePage = { ...page, jsonLd: withUnifiedMedicalClinic(page.jsonLd) };

  return (
    <CMSRoute path={path}>
      <BlogPostTemplate page={safePage} recentPosts={recentPosts} />
    </CMSRoute>
  );
}
