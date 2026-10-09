import type { MetadataRoute } from "next";
import indexManifest from "@/content/data/index.json";
import { isBlogPostSlug } from "@/lib/blog-posts";
import { querySitemapEntries } from "@/lib/cms/queries";
import { normalizeCmsPath, publicUrlFromCmsPath } from "@/lib/cms/url";
import { getPageContent } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { LEARN_PAGES } from "@/content/learn-data";

const NATIONAL_DATE_PUBLISHED = new Date("2026-09-29");

function pathFromSitemapUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    return normalizeCmsPath(parsed.pathname);
  } catch {
    return null;
  }
}

function hardcodedSitemap(): MetadataRoute.Sitemap {
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
    {
      url: `${SITE_URL}/areas-we-serve/colorado/`,
      lastModified: NATIONAL_DATE_PUBLISHED,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
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

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fallback = hardcodedSitemap();
  const cms = await querySitemapEntries();
  if (!cms) return fallback;

  const byPath = new Map(cms.map((doc) => [doc.path, doc]));
  const kept = fallback.filter((entry) => {
    const path = pathFromSitemapUrl(entry.url);
    if (!path) return true;
    const doc = byPath.get(path);
    if (!doc) return true;
    return !doc.noIndex && !doc.excludeFromSitemap;
  });

  const present = new Set(
    kept.map((entry) => pathFromSitemapUrl(entry.url)).filter((path): path is string => Boolean(path)),
  );

  const merged = kept.map((entry) => {
    const path = pathFromSitemapUrl(entry.url);
    const doc = path ? byPath.get(path) : undefined;
    const stamp = doc?.sourceUpdatedAt || doc?.updatedAt;
    if (!stamp) return entry;
    return { ...entry, lastModified: new Date(stamp) };
  });

  for (const doc of cms) {
    if (doc.noIndex || doc.excludeFromSitemap) continue;
    if (present.has(doc.path)) continue;
    merged.push({
      url: publicUrlFromCmsPath(doc.path),
      lastModified: doc.sourceUpdatedAt || doc.updatedAt ? new Date(doc.sourceUpdatedAt || doc.updatedAt || "") : undefined,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return merged;
}
