import { draftMode } from "next/headers";
import { withCMS } from "@/lib/cms/safe";
import { normalizeCmsPath } from "@/lib/cms/url";

export type RoutedDoc = {
  collection: "pages" | "posts";
  doc: Record<string, unknown>;
};

export async function queryRoutedContentByPath(path: string): Promise<RoutedDoc | null> {
  return withCMS(async () => {
    const normalized = normalizeCmsPath(path);
    if (!normalized) return null;

    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const { isEnabled } = await draftMode();

    const findArgs = {
      where: { path: { equals: normalized } },
      limit: 1,
      pagination: false as const,
      draft: isEnabled,
      overrideAccess: isEnabled,
    };

    const pages = await payload.find({ collection: "pages", ...findArgs });
    const page = pages.docs[0];
    if (page) return { collection: "pages", doc: page as unknown as Record<string, unknown> };

    const posts = await payload.find({ collection: "posts", ...findArgs });
    const post = posts.docs[0];
    if (post) return { collection: "posts", doc: post as unknown as Record<string, unknown> };

    return null;
  }, null);
}

export type SitemapDoc = {
  path: string;
  updatedAt?: string;
  sourceUpdatedAt?: string;
  noIndex: boolean;
  excludeFromSitemap: boolean;
};

export async function querySitemapEntries(): Promise<SitemapDoc[] | null> {
  return withCMS(async () => {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const where = {
      and: [{ path: { exists: true } }],
    };

    const [pages, posts] = await Promise.all([
      payload.find({
        collection: "pages",
        where,
        limit: 10000,
        pagination: false,
        draft: false,
        depth: 0,
      }),
      payload.find({
        collection: "posts",
        where,
        limit: 10000,
        pagination: false,
        draft: false,
        depth: 0,
      }),
    ]);

    const mapDoc = (doc: Record<string, unknown>): SitemapDoc | null => {
      const path = typeof doc.path === "string" ? doc.path : null;
      if (!path) return null;
      return {
        path,
        updatedAt: typeof doc.updatedAt === "string" ? doc.updatedAt : undefined,
        sourceUpdatedAt:
          typeof doc.sourceUpdatedAt === "string" ? doc.sourceUpdatedAt : undefined,
        noIndex: Boolean(doc.noIndex),
        excludeFromSitemap: Boolean(doc.excludeFromSitemap),
      };
    };

    return [...pages.docs, ...posts.docs]
      .map((doc) => mapDoc(doc as unknown as Record<string, unknown>))
      .filter((entry): entry is SitemapDoc => Boolean(entry));
  }, null);
}
