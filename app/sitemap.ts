import type { MetadataRoute } from "next";
import indexManifest from "@/content/data/index.json";
import { isBlogPostSlug } from "@/lib/blog-posts";
import { getPageContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { LEARN_PAGES } from "@/content/learn-data";

const NATIONAL_DATE_PUBLISHED = new Date("2026-09-29");

/**
 * Site-wide sitemap covering every migrated route in `content/data/index.json`
 * (home, all static/condition/utility pages, the `/blog/` hub, and all 27
 * blog posts), plus the pSEO `/learn/[slug]` articles and the nationwide
 * `/areas-we-serve` hub + 50 state hubs + state x condition matrix (see
 * data/pseo-national/keywords.json). Blog posts use their captured
 * `dateModified` (from the live post's JSON-LD) as `lastModified`; other
 * migrated routes omit it since no modified-date was captured for them.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const migrated: MetadataRoute.Sitemap = indexManifest.map((entry) => {
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

  const areasHub: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/areas-we-serve/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    // The other 49 state hubs 308 to this hub. Only Colorado stays,
    // because that is where the practice is based.
    {
      url: `${SITE_URL}/areas-we-serve/colorado/`,
      lastModified: NATIONAL_DATE_PUBLISHED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
    // Note: the 400 `/areas-we-serve/[state]/[condition]/` pages are
    // intentionally EXCLUDED from the sitemap — they're noindexed (see
    // app/areas-we-serve/[state]/[topic]/page.tsx). The other Front Range
    // city URLs 308 to Denver, the only city page with search demand.
    {
      url: `${SITE_URL}/areas-we-serve/colorado/denver/`,
      lastModified: NATIONAL_DATE_PUBLISHED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ];

  const learn: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/learn/`, changeFrequency: "weekly", priority: 0.6 },
    ...LEARN_PAGES.map((page) => ({
      url: `${SITE_URL}/learn/${page.slug}/`,
      lastModified: new Date(page.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];

  return [...migrated, ...areasHub, ...learn];
}
