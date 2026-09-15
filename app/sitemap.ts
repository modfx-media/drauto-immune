import type { MetadataRoute } from "next";
import indexManifest from "@/content/data/index.json";
import { isBlogPostSlug } from "@/lib/blog-posts";
import { getPageContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

/**
 * Site-wide sitemap covering every migrated route in `content/data/index.json`
 * (home, all static/condition/utility pages, the `/blog/` hub, and all 27
 * blog posts). Blog posts use their captured `dateModified` (from the
 * live post's JSON-LD) as `lastModified`; other routes omit it since no
 * modified-date was captured for them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return indexManifest.map((entry) => {
    const page = getPageContent(entry.key);
    const isPost = isBlogPostSlug(entry.key);
    const lastModified = page?.dateModified ? new Date(page.dateModified) : undefined;

    return {
      url: `${SITE_URL}${entry.path}`,
      ...(lastModified ? { lastModified } : {}),
      changeFrequency: isPost || entry.key === "blog" ? "weekly" : "monthly",
      priority: entry.path === "/" ? 1 : isPost ? 0.6 : 0.7,
    };
  });
}
