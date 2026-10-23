import { getStateCondition } from "@/content/national-data";
import { normalizeCmsPath } from "@/lib/cms/url";

/**
 * State×condition URLs rendered from code (`content/matrix-page-builder`),
 * not from the empty Payload stubs. Those stubs were imported with
 * `noIndex` and `excludeFromSitemap` set, which dropped them from the
 * sitemap even though the pages return 200 and are indexable.
 */
export function isCodeOwnedMatrixPath(path: string | null | undefined): boolean {
  const normalized = normalizeCmsPath(path);
  if (!normalized) return false;
  const parts = normalized.split("/").filter(Boolean);
  if (parts.length !== 3 || parts[0] !== "areas-we-serve") return false;
  return Boolean(getStateCondition(parts[2]));
}
