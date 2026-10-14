import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import BlogHubPage from "@/components/pages/blog/BlogHubPage";
import { buildMetadata } from "@/lib/content";
import { getAllBlogPosts } from "@/lib/blog-posts-server";
import { buildBlogHubJsonLd } from "@/lib/marketing-jsonld";


export const revalidate = 300;
export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/blog", () => buildMetadata("blog"));
}

export default function Page() {
  const posts = getAllBlogPosts();
  return (
    <CMSRoute path="/blog">
      <>
        <JsonLd blocks={buildBlogHubJsonLd(posts)} />
        <BlogHubPage posts={posts} />
      </>
    </CMSRoute>
  );
}
