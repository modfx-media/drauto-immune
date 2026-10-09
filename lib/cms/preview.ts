import { getServerURL, normalizeCmsPath } from "@/lib/cms/url";

type PreviewDoc = {
  path?: unknown;
  slug?: unknown;
};

/**
 * Live preview / admin preview must open a real public path.
 * Missing or invalid segments return null so Payload never links to `/blog/null`.
 */
export function previewFromPath(doc: PreviewDoc): string | null {
  const secret = process.env.PREVIEW_SECRET;
  if (!secret) return null;

  const rawPath =
    typeof doc.path === "string"
      ? doc.path
      : typeof doc.slug === "string" && doc.slug
        ? doc.slug === "home"
          ? "/"
          : `/${doc.slug}`
        : null;

  const path = normalizeCmsPath(rawPath);
  if (!path) return null;
  if (path.split("/").some((segment) => segment === "null" || segment === "undefined")) {
    return null;
  }

  const previewPath = path === "/" ? "/" : `${path}/`;
  return `${getServerURL()}/next/preview/?path=${encodeURIComponent(previewPath)}&secret=${encodeURIComponent(secret)}`;
}
