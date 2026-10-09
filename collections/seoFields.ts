import type { Field } from "payload";
import { emptyToNull } from "@/lib/cms/empty-to-null";

export const seoFields: Field[] = [
  {
    name: "canonicalUrl",
    type: "text",
    admin: {
      description: "Must match the public URL for this document.",
    },
  },
  {
    type: "row",
    fields: [
      {
        name: "noIndex",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "noFollow",
        type: "checkbox",
        defaultValue: false,
      },
      {
        name: "excludeFromSitemap",
        type: "checkbox",
        defaultValue: false,
      },
    ],
  },
];

export const identityFields: Field[] = [
  {
    name: "legacyId",
    type: "text",
    unique: true,
    index: true,
    hooks: { beforeValidate: [emptyToNull] },
    admin: { position: "sidebar" },
  },
  {
    name: "sourceUrl",
    type: "text",
    index: true,
    admin: { position: "sidebar" },
  },
  {
    name: "sourceUpdatedAt",
    type: "date",
    admin: { position: "sidebar", date: { pickerAppearance: "dayAndTime" } },
  },
];
