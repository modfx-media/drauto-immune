import type { CollectionBeforeChangeHook } from "payload";
import { normalizeCmsPath } from "@/lib/cms/url";

export const generatePathFromSlug: CollectionBeforeChangeHook = ({ data }) => {
  const next = data ?? {};
  const existing = normalizeCmsPath(typeof next.path === "string" ? next.path : null);
  if (existing) {
    next.path = existing;
    return next;
  }
  const slug = typeof next.slug === "string" ? next.slug.trim() : "";
  if (!slug) return next;
  next.path = slug === "home" ? "/" : `/${slug}`;
  return next;
};
