import type { Metadata } from "next";
import { queryRoutedContentByPath } from "@/lib/cms/queries";
import { publicUrlFromCmsPath } from "@/lib/cms/url";

function metaFromDoc(doc: Record<string, unknown>, fallback: Metadata): Metadata {
  const title = typeof doc.title === "string" ? doc.title : undefined;
  const excerpt = typeof doc.excerpt === "string" ? doc.excerpt : undefined;
  const path = typeof doc.path === "string" ? doc.path : undefined;
  const canonical =
    typeof doc.canonicalUrl === "string" && doc.canonicalUrl
      ? doc.canonicalUrl
      : path
        ? publicUrlFromCmsPath(path)
        : undefined;
  const noIndex = Boolean(doc.noIndex);
  const noFollow = Boolean(doc.noFollow);
  const seo = doc.meta && typeof doc.meta === "object" ? (doc.meta as Record<string, unknown>) : {};
  const seoTitle = typeof seo.title === "string" ? seo.title : title;
  const seoDescription = typeof seo.description === "string" ? seo.description : excerpt;

  return {
    ...fallback,
    title: seoTitle ?? fallback.title,
    description: seoDescription ?? fallback.description,
    alternates: {
      ...fallback.alternates,
      canonical: canonical ?? fallback.alternates?.canonical,
    },
    openGraph: {
      ...fallback.openGraph,
      title: seoTitle ?? fallback.openGraph?.title,
      description: seoDescription ?? fallback.openGraph?.description,
      url: canonical ?? fallback.openGraph?.url,
    },
    robots: {
      index: !noIndex,
      follow: !noFollow,
    },
  };
}

export async function cmsMetadata(
  path: string,
  fallback: Metadata | (() => Metadata | Promise<Metadata>),
): Promise<Metadata> {
  const resolved = typeof fallback === "function" ? await fallback() : fallback;
  const routed = await queryRoutedContentByPath(path);
  if (!routed) return resolved;
  return metaFromDoc(routed.doc, resolved);
}
