import path from "path";
import { fileURLToPath } from "url";
import { buildConfig } from "payload";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import { vercelPostgresAdapter } from "@payloadcms/db-vercel-postgres";
import { searchPlugin } from "@payloadcms/plugin-search";
import { seoPlugin } from "@payloadcms/plugin-seo";
import { vercelBlobStorage } from "@payloadcms/storage-vercel-blob";
import sharp from "sharp";
import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Pages } from "./collections/Pages";
import { Posts } from "./collections/Posts";
import { Header } from "./globals/Header";
import { Footer } from "./globals/Footer";
import { SiteSettings } from "./globals/SiteSettings";
import { getCorsOrigins, getServerURL, publicUrlFromCmsPath } from "./lib/cms/url";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

const pushSchema =
  process.env.VERCEL !== "1" && process.env.CMS_IMPORT_APPLY !== "1";

const blobToken = process.env.BLOB_READ_WRITE_TOKEN;

export default buildConfig({
  secret: process.env.PAYLOAD_SECRET || "",
  serverURL: getServerURL(),
  csrf: getCorsOrigins(),
  cors: getCorsOrigins(),
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    livePreview: {
      breakpoints: [
        { label: "Mobile", name: "mobile", width: 375, height: 667 },
        { label: "Tablet", name: "tablet", width: 768, height: 1024 },
        { label: "Desktop", name: "desktop", width: 1440, height: 900 },
      ],
    },
  },
  editor: lexicalEditor(),
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || "",
    },
    forceUseVercelPostgres: true,
    push: pushSchema,
  }),
  collections: [Users, Media, Pages, Posts],
  globals: [Header, Footer, SiteSettings],
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  plugins: [
    seoPlugin({
      collections: ["pages", "posts"],
      uploadsCollection: "media",
      generateTitle: ({ doc }) => (typeof doc?.title === "string" ? doc.title : ""),
      generateDescription: ({ doc }) =>
        typeof doc?.excerpt === "string" ? doc.excerpt : "",
      generateURL: ({ doc }) => {
        const pathValue = typeof doc?.path === "string" ? doc.path : null;
        if (!pathValue) return "";
        return publicUrlFromCmsPath(pathValue);
      },
    }),
    searchPlugin({
      collections: ["pages", "posts"],
      syncDrafts: true,
      skipSync: () => process.env.CMS_IMPORT_APPLY === "1",
      defaultPriorities: {
        pages: 10,
        posts: 40,
      },
      searchOverrides: {
        fields: ({ defaultFields }) => [
          ...defaultFields,
          { name: "excerpt", type: "textarea" },
          { name: "path", type: "text" },
        ],
      },
      beforeSync: ({ originalDoc, searchDoc }) => ({
        ...searchDoc,
        excerpt: typeof originalDoc.excerpt === "string" ? originalDoc.excerpt : "",
        path: typeof originalDoc.path === "string" ? originalDoc.path : "",
      }),
    }),
    ...(blobToken
      ? [
          vercelBlobStorage({
            collections: {
              media: true,
            },
            token: blobToken,
          }),
        ]
      : []),
  ],
});
