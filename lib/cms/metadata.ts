import type { Metadata } from "next";
import { isCodeOwnedMatrixPath } from "@/lib/cms/matrix-paths";
import { queryRoutedContentByPath } from "@/lib/cms/queries";
import { normalizeCmsPath, publicUrlFromCmsPath } from "@/lib/cms/url";
import { resolveSeoDescription, resolveSeoTitle } from "@/lib/cms/seo-resolve";

function metaFromDoc(
  doc: Record<string, unknown>,
  fallback: Metadata,
  requestPath: string,
): Metadata {
  const title = typeof doc.title === "string" ? doc.title : undefined;
  const excerpt = typeof doc.excerpt === "string" ? doc.excerpt : undefined;
  const path = typeof doc.path === "string" ? doc.path : undefined;
  const canonical =
    typeof doc.canonicalUrl === "string" && doc.canonicalUrl
      ? doc.canonicalUrl
      : path
        ? publicUrlFromCmsPath(path)
        : undefined;
  const docPath = typeof doc.path === "string" ? doc.path : requestPath;
  // Empty area-matrix stubs were imported noindex. The live page is the
  // code template, which stays indexable. A real CMS title can still win.
  const indexableMatrix = isCodeOwnedMatrixPath(normalizeCmsPath(docPath) ?? requestPath);
  const noIndex = indexableMatrix ? false : Boolean(doc.noIndex);
  const noFollow = Boolean(doc.noFollow);
  const seo = doc.meta && typeof doc.meta === "object" ? (doc.meta as Record<string, unknown>) : {};
  const rawTitle = typeof seo.title === "string" ? seo.title : title;
  const rawDescription = typeof seo.description === "string" ? seo.description : excerpt;
  const seoTitle = resolveSeoTitle(
    rawTitle,
    typeof fallback.title === "string" ? fallback.title : undefined,
  );
  const seoDescription = resolveSeoDescription(
    rawDescription,
    typeof fallback.description === "string" ? fallback.description : undefined,
  );

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
  return metaFromDoc(routed.doc, resolved, path);
}
