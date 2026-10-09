import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { inventoryPublicUrls } from "../lib/cms/inventory";
import { getPageContent } from "../lib/content";
import { NAV_LINKS } from "../components/layout/nav-links";
import {
  CONDITIONS_LINKS,
  QUICK_LINKS,
  SERVICES_LINKS,
} from "../components/layout/footer-links";
import { publicUrlFromCmsPath } from "../lib/cms/url";

const records = inventoryPublicUrls().map((record) => {
  const page = getPageContent(record.legacyId);
  return {
    ...record,
    excerpt: record.excerpt ?? page?.metaDescription ?? null,
    bodyMarkdown: record.bodyMarkdown ?? page?.bodyMarkdown ?? null,
    sourceUpdatedAt: record.sourceUpdatedAt ?? page?.dateModified ?? null,
    canonicalUrl: record.canonicalUrl ?? page?.canonical ?? publicUrlFromCmsPath(record.path),
  };
});

const payload = {
  version: 1,
  records,
  globals: {
    header: {
      nav: NAV_LINKS.map((item) => ({
        label: item.label,
        href: item.href,
        external: Boolean(item.external),
        mega: Boolean(item.mega),
        children: item.children?.map((child) => ({
          label: child.label,
          href: child.href,
          external: Boolean(child.external),
        })),
      })),
    },
    footer: {
      quickLinks: [...QUICK_LINKS],
      servicesLinks: [...SERVICES_LINKS],
      conditionsLinks: [...CONDITIONS_LINKS],
    },
    "site-settings": {
      siteName: "Dr. Autoimmune",
      tagline: "Functional medicine care for autoimmune conditions.",
    },
  },
};

const outDir = path.join(process.cwd(), "data");
mkdirSync(outDir, { recursive: true });
const outFile = path.join(outDir, "content-export.json");
writeFileSync(outFile, JSON.stringify(payload, null, 2));
console.log(`Wrote ${records.length} records to ${outFile}`);
