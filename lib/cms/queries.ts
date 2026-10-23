import { draftMode } from "next/headers";
import { withCMS } from "@/lib/cms/safe";
import { normalizeCmsPath } from "@/lib/cms/url";

export type RoutedDoc = {
  collection: "pages" | "posts";
  doc: Record<string, unknown>;
};

export type CmsPostSummary = {
  slug: string;
  path: string;
  title: string;
  excerpt: string;
  publishedAt: string | null;
  metaImageUrl: string | null;
  metaImageAlt: string | null;
};

export async function queryRoutedContentByPath(path: string): Promise<RoutedDoc | null> {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return null;

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

    // Public blog URLs are /blog/:slug, but some CMS docs still store path as /:slug.
    const blogSlug = normalized.match(/^\/blog\/([^/]+)$/)?.[1];
    if (blogSlug) {
      const aliased = await payload.find({
        collection: "posts",
        where: {
          or: [
            { slug: { equals: blogSlug } },
            { path: { equals: `/${blogSlug}` } },
            { path: { equals: `/blog/${blogSlug}` } },
          ],
        },
        limit: 1,
        pagination: false,
        draft: isEnabled,
        overrideAccess: isEnabled,
      });
      const aliasedPost = aliased.docs[0];
      if (aliasedPost) {
        return { collection: "posts", doc: aliasedPost as unknown as Record<string, unknown> };
      }
    }

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

/** Published posts for the blog hub + generateStaticParams (future-dated filtered by plugin). */
export async function queryPublishedPosts(): Promise<CmsPostSummary[] | null> {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return null;

  return withCMS(async () => {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    const result = await payload.find({
      collection: "posts",
      where: {
        and: [{ path: { exists: true } }, { _status: { equals: "published" } }],
      },
      sort: "-publishedAt",
      limit: 1000,
      pagination: false,
      draft: false,
      depth: 1,
      overrideAccess: false,
    });

    return result.docs
      .map((raw) => {
        const doc = raw as unknown as Record<string, unknown>;
        const path = normalizeCmsPath(typeof doc.path === "string" ? doc.path : null);
        if (!path || path === "/") return null;
        const slug =
          (typeof doc.slug === "string" && doc.slug.trim()) ||
          path.split("/").filter(Boolean).pop() ||
          "";
        if (!slug) return null;

        const meta =
          doc.meta && typeof doc.meta === "object"
            ? (doc.meta as Record<string, unknown>)
            : {};
        const image = meta.image;
        let metaImageUrl: string | null = null;
        let metaImageAlt: string | null = null;
        if (image && typeof image === "object") {
          const media = image as Record<string, unknown>;
          metaImageUrl = typeof media.url === "string" ? media.url : null;
          metaImageAlt = typeof media.alt === "string" ? media.alt : null;
        }

        return {
          slug,
          path,
          title: typeof doc.title === "string" ? doc.title : slug,
          excerpt: typeof doc.excerpt === "string" ? doc.excerpt : "",
          publishedAt: typeof doc.publishedAt === "string" ? doc.publishedAt : null,
          metaImageUrl,
          metaImageAlt,
        } satisfies CmsPostSummary;
      })
      .filter((entry): entry is CmsPostSummary => Boolean(entry));
  }, null);
}

export async function queryPublishedPostSlugs(): Promise<string[]> {
  const posts = await queryPublishedPosts();
  if (!posts) return [];
  return posts.map((post) => post.slug);
}

export async function querySitemapEntries(): Promise<SitemapDoc[] | null> {
  if (!process.env.DATABASE_URL || !process.env.PAYLOAD_SECRET) return null;

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
      const path = normalizeCmsPath(typeof doc.path === "string" ? doc.path : null);
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
