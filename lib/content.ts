import fs from "node:fs";
import path from "node:path";
import type { Metadata } from "next";

export interface JsonLdBlock {
  /** The `class` attribute the script tag carried on the live site, if any
   * (e.g. "rank-math-schema", "yoast-schema-graph"), for traceability. */
  source: string | null;
  data: Record<string, unknown>;
}

export interface MigratedImage {
  src: string;
  alt: string;
  originalUrl: string;
  originalFilename: string;
}

export interface MigratedVideo {
  provider: "youtube" | "vimeo" | "wistia";
  src: string;
  title: string | null;
}

export interface PageContent {
  key: string;
  path: string;
  liveUrl: string;
  isPost: boolean;
  title: string;
  metaDescription: string | null;
  canonical: string;
  robots: string | null;
  openGraph: Record<string, string | string[]>;
  twitter: Record<string, string>;
  jsonLd: JsonLdBlock[];
  videos: MigratedVideo[];
  images: MigratedImage[];
  bodyMarkdown: string;
  /** Blog posts only — backfilled by `scripts/migrate-blog-images.mjs`. */
  featuredImage?: MigratedImage | null;
  datePublished?: string | null;
  dateModified?: string | null;
  readingTime?: string | null;
}

const CONTENT_DIR = path.join(process.cwd(), "content", "data");
const cache = new Map<string, PageContent | null>();

/** Reads the migrated content record for a route (see scripts/migrate-content.mjs). */
export function getPageContent(key: string): PageContent | null {
  if (cache.has(key)) return cache.get(key)!;
  const file = path.join(CONTENT_DIR, `${key}.json`);
  let record: PageContent | null = null;
  if (fs.existsSync(file)) {
    record = JSON.parse(fs.readFileSync(file, "utf8")) as PageContent;
  }
  cache.set(key, record);
  return record;
}

function first(value: string | string[] | undefined): string | undefined {
  return Array.isArray(value) ? value[0] : value;
}

function toNumber(value: string | string[] | undefined): number | undefined {
  const v = first(value);
  const n = v ? Number(v) : NaN;
  return Number.isFinite(n) ? n : undefined;
}

/**
 * Builds a Next.js `generateMetadata` result from the migrated record so
 * the title tag, meta description, canonical, and Open Graph/Twitter tags
 * match the live drautoimmune.com page exactly.
 */
export function buildMetadata(key: string): Metadata {
  const page = getPageContent(key);
  if (!page) return {};

  const ogTitle = first(page.openGraph.title) ?? page.title;
  // Prefer the canonical meta description over `openGraph.description`: on
  // ~34 migrated pages the live site emitted two conflicting og:description
  // tags (a duplicate SEO plugin/theme tag), and `first()` would otherwise
  // pick the wrong one (raw page body text) instead of the real description.
  const ogDescription = page.metaDescription ?? first(page.openGraph.description) ?? undefined;
  const ogImage = first(page.openGraph.image);
  const ogType = first(page.openGraph.type);

  return {
    title: page.title,
    description: page.metaDescription ?? undefined,
    alternates: { canonical: page.canonical },
    openGraph: {
      title: ogTitle,
      description: ogDescription,
      url: page.canonical,
      siteName: first(page.openGraph.site_name),
      type: ogType === "article" ? "article" : "website",
      images: ogImage
        ? [
            {
              url: ogImage,
              width: toNumber(page.openGraph["image:width"]),
              height: toNumber(page.openGraph["image:height"]),
              alt: first(page.openGraph["image:alt"]) || ogTitle,
            },
          ]
        : undefined,
      ...(ogType === "article" && page.isPost
        ? {
            publishedTime: page.datePublished ?? undefined,
            modifiedTime: page.dateModified ?? undefined,
          }
        : {}),
    },
    twitter: {
      card:
        page.twitter.card === "summary"
          ? "summary"
          : "summary_large_image",
      title: page.twitter.title ?? ogTitle,
      description: page.twitter.description ?? ogDescription,
      images: page.twitter.image ? [page.twitter.image] : undefined,
    },
    robots: page.robots ?? undefined,
  };
}
