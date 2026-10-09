import type { GlobalConfig } from "payload";

const navItemFields = [
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

export const Header: GlobalConfig = {
  slug: "header",
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "nav",
      type: "array",
      fields: [
        ...navItemFields,
        {
          name: "mega",
          type: "checkbox",
          defaultValue: false,
        },
        {
          name: "children",
          type: "array",
          fields: navItemFields,
        },
      ],
    },
  ],
};
