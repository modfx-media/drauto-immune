import type { GlobalConfig } from "payload";

const linkFields = [
  {
    name: "label",
    type: "text" as const,
  },
  {
    name: "href",
    type: "text" as const,
  },
  {
    name: "external",
    type: "checkbox" as const,
    defaultValue: false,
  },
];

export const Footer: GlobalConfig = {
  slug: "footer",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "quickLinks",
      type: "array",
      fields: linkFields,
    },
    {
      name: "servicesLinks",
      type: "array",
      fields: linkFields,
    },
    {
      name: "conditionsLinks",
      type: "array",
      fields: linkFields,
    },
  ],
};
