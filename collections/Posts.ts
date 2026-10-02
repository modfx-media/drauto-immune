import type { CollectionConfig } from "payload";
import { emptyToNull } from "@/lib/cms/empty-to-null";
import { previewFromPath } from "@/lib/cms/preview";
import { generatePathFromSlug } from "./generatePath";
import { identityFields, seoFields } from "./seoFields";

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "path", "_status", "updatedAt"],
    preview: (doc) => previewFromPath(doc),
    livePreview: {
      url: ({ data }) => previewFromPath(data) ?? undefined,
    },
  },
  versions: {
    drafts: {
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
  access: {
    read: () => true,
  },
  hooks: {
    beforeChange: [generatePathFromSlug],
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyToNull] },
      admin: { position: "sidebar" },
    },
    {
      name: "path",
      type: "text",
      unique: true,
      index: true,
      hooks: { beforeValidate: [emptyToNull] },
      admin: {
        position: "sidebar",
        description: "Public path starting with `/`, no trailing slash.",
      },
    },
    {
      name: "template",
      type: "select",
      defaultValue: "blog",
      options: [{ label: "Blog", value: "blog" }],
      admin: { position: "sidebar" },
    },
    {
      name: "excerpt",
      type: "textarea",
    },
    {
      name: "bodyMarkdown",
      type: "textarea",
    },
    {
      name: "publishedAt",
      type: "date",
      admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
    },
    ...identityFields,
    ...seoFields,
  ],
};
