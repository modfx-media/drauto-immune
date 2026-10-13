import type { MetadataRoute } from "next";
import indexManifest from "@/content/data/index.json";
import { blogPostSlugs, isBlogPostSlug } from "@/lib/blog-posts";
import { querySitemapEntries } from "@/lib/cms/queries";
import { normalizeCmsPath, publicUrlFromCmsPath } from "@/lib/cms/url";
import { getPageContent } from "@/lib/content";
import { redirectedSitemapPaths } from "@/lib/seo-redirects";
import { SITE_URL } from "@/lib/site";
import { LEARN_PAGES } from "@/content/learn-data";
import { STATE_CONDITIONS, STATES } from "@/content/national-data";

const NATIONAL_DATE_PUBLISHED = new Date("2026-09-29");
const REDIRECTED = redirectedSitemapPaths();

function pathFromSitemapUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    return normalizeCmsPath(parsed.pathname);
  } catch {
    return null;
  }
}

function isRedirectedPath(path: string | null | undefined): boolean {
  if (!path) return false;
  const normalized = path.replace(/\/$/, "") || "/";
  return REDIRECTED.has(normalized);
}

function hardcodedSitemap(): MetadataRoute.Sitemap {
  const seen = new Set<string>();
  const entries: MetadataRoute.Sitemap = [];

  const push = (entry: MetadataRoute.Sitemap[number], keyPath: string) => {
    const normalized = keyPath.replace(/\/$/, "") || "/";
    if (isRedirectedPath(normalized) || seen.has(normalized)) return;
    seen.add(normalized);
    entries.push(entry);
  };

  for (const entry of indexManifest) {
    const path = normalizeCmsPath(entry.path) ?? entry.path.replace(/\/$/, "");
    if (isRedirectedPath(path)) continue;
    const page = getPageContent(entry.key);
    const isPost = isBlogPostSlug(entry.key);
    const lastModified = page?.dateModified ? new Date(page.dateModified) : undefined;
    push(
      {
        url: `${SITE_URL}${entry.path.endsWith("/") ? entry.path : `${entry.path}/`}`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: isPost || entry.key === "blog" ? "weekly" : "monthly",
        priority: entry.path === "/" ? 1 : isPost ? 0.6 : 0.7,
      },
      path,
    );
  }

  // Ensure every live blog post is listed (including posts missing from index.json).
  for (const slug of blogPostSlugs) {
    if (isRedirectedPath(`/${slug}`)) continue;
    const page = getPageContent(slug);
    const lastModified = page?.dateModified ? new Date(page.dateModified) : undefined;
    push(
      {
        url: `${SITE_URL}/${slug}/`,
        ...(lastModified ? { lastModified } : {}),
        changeFrequency: "weekly",
        priority: 0.6,
      },
      `/${slug}`,
    );
  }

  // Privacy policy and other hardcoded marketing pages not always in the crawl index.
  push(
    {
      url: `${SITE_URL}/privacy-policy/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    "/privacy-policy",
  );

  push(
    {
      url: `${SITE_URL}/areas-we-serve/`,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    "/areas-we-serve",
  );
  push(
    {
      url: `${SITE_URL}/areas-we-serve/colorado/`,
      lastModified: NATIONAL_DATE_PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    "/areas-we-serve/colorado",
  );
  push(
    {
      url: `${SITE_URL}/areas-we-serve/colorado/denver/`,
      lastModified: NATIONAL_DATE_PUBLISHED,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    "/areas-we-serve/colorado/denver",
  );

  for (const state of STATES) {
    for (const condition of STATE_CONDITIONS) {
      push(
        {
          url: `${SITE_URL}/areas-we-serve/${state.slug}/${condition.slug}/`,
          lastModified: NATIONAL_DATE_PUBLISHED,
          changeFrequency: "monthly",
          priority: 0.55,
        },
        `/areas-we-serve/${state.slug}/${condition.slug}`,
      );
    }
  }

  push({ url: `${SITE_URL}/learn/`, changeFrequency: "weekly", priority: 0.6 }, "/learn");
  for (const page of LEARN_PAGES) {
    push(
      {
        url: `${SITE_URL}/learn/${page.slug}/`,
        lastModified: new Date(page.dateModified),
        changeFrequency: "monthly",
        priority: 0.6,
      },
      `/learn/${page.slug}`,
    );
  }

  return entries;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const fallback = hardcodedSitemap();
  const cms = await querySitemapEntries();
  if (!cms) return fallback;

  const byPath = new Map(cms.map((doc) => [doc.path, doc]));
  const kept = fallback.filter((entry) => {
    const path = pathFromSitemapUrl(entry.url);
    if (isRedirectedPath(path)) return false;
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
    if (isRedirectedPath(doc.path)) continue;
    if (present.has(doc.path)) continue;
    merged.push({
      url: publicUrlFromCmsPath(doc.path),
      lastModified:
        doc.sourceUpdatedAt || doc.updatedAt
          ? new Date(doc.sourceUpdatedAt || doc.updatedAt || "")
          : undefined,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return merged;
}
