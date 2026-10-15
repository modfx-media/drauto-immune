import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from "payload";
import { normalizeCmsPath } from "@/lib/cms/url";

/**
 * On publish/update/delete, bust the public post path, blog hub, and sitemap
 * so ISR does not wait for the 300s window (and so new CMS-only slugs appear).
 */
async function revalidateCmsPaths(paths: string[]) {
  if (process.env.CMS_IMPORT_APPLY === "1") return;
  try {
    const { revalidatePath } = await import("next/cache");
    for (const path of paths) {
      revalidatePath(path);
    }
  } catch (error) {
    console.error("[cms] revalidatePath failed", error);
  }
}

function pathsForDoc(doc: Record<string, unknown> | undefined | null): string[] {
  const paths = new Set<string>(["/blog", "/sitemap.xml"]);
  const slug = typeof doc?.slug === "string" ? doc.slug.trim() : "";
  if (slug) {
    paths.add(`/blog/${slug}`);
    paths.add(`/${slug}`);
  }
  const raw = typeof doc?.path === "string" ? doc.path : null;
  const normalized = normalizeCmsPath(raw);
  if (normalized && normalized !== "/") {
    paths.add(normalized);
  }
  return [...paths];
}

export const revalidatePostAfterChange: CollectionAfterChangeHook = async ({
  doc,
  previousDoc,
  req,
}) => {
  // Draft-only edits should not thrash the public cache.
  if (doc?._status !== "published" && previousDoc?._status !== "published") {
    return doc;
  }
  // Local API / jobs may not have a full Next.js cache context; still try.
  if (req?.context?.skipRevalidate) return doc;
  await revalidateCmsPaths([...pathsForDoc(doc), ...pathsForDoc(previousDoc)]);
  return doc;
};

export const revalidatePostAfterDelete: CollectionAfterDeleteHook = async ({ doc, req }) => {
  if (req?.context?.skipRevalidate) return doc;
  await revalidateCmsPaths(pathsForDoc(doc as Record<string, unknown>));
  return doc;
};
