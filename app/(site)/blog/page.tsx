import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import BlogHubPage from "@/components/pages/blog/BlogHubPage";
import { buildMetadata } from "@/lib/content";
import { getAllBlogPosts } from "@/lib/blog-posts-server";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/blog", () => buildMetadata("blog"));
}

export default function Page() {
  const posts = getAllBlogPosts();
  return (
    <CMSRoute path="/blog">
      <BlogHubPage posts={posts} />
    </CMSRoute>
  );
}
