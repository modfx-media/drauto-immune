import indexManifest from "../../content/data/index.json";
import { isBlogPostSlug } from "../blog-posts";
import { LEARN_PAGES } from "../../content/learn-data";
import { STATE_CONDITIONS, STATES } from "../../content/national-data";
import { normalizeCmsPath } from "./url";

export type CmsTemplate =
  | "home"
  | "marketing"
  | "condition"
  | "blog"
  | "learn"
  | "area"
  | "area-matrix";

export type InventoryRecord = {
  collection: "pages" | "posts";
  legacyId: string;
  path: string;
  slug: string;
  title: string;
  template: CmsTemplate;
  sourceUrl: string;
  excerpt?: string | null;
  bodyMarkdown?: string | null;
  sourceUpdatedAt?: string | null;
  noIndex?: boolean;
  noFollow?: boolean;
  excludeFromSitemap?: boolean;
  canonicalUrl?: string;
};

const CONDITION_SLUGS = new Set([
  "thyroid-conditions",
  "hashimotos-thyroiditis-graves",
  "graves-disease",
  "rheumatoid-arthritis",
  "type-1-diabetes",
  "inflammatory-bowel-disease",
  "celiac-disease-and-gluten-intolerance",
  "multiple-sclerosis",
  "lupus",
  "sjogrens-syndrome",
  "anxiety-depression",
  "adhd-add",
  "other-autoimmune-conditions",
  "raynauds-phenomenon",
]);

const MARKETING_KEYS = new Set([
  "contact-us",
  "store",
  "wellness-services",
  "about-us",
  "blog",
  "book-an-appointment",
  "book-new-patient-evaluation",
  "conditions-we-support",
  "featured-interviews",
  "discovery-call",
  "live-webinar-schedule",
  "patient-portal",
  "patient-stories",
  "services",
]);

export function inventoryPublicUrls(): InventoryRecord[] {
  const records: InventoryRecord[] = [];
  const seen = new Set<string>();

  const add = (record: InventoryRecord) => {
    if (seen.has(record.path)) return;
    seen.add(record.path);
    records.push(record);
  };

  for (const entry of indexManifest) {
    const path = normalizeCmsPath(entry.path);
    if (!path) continue;
    const isPost = isBlogPostSlug(entry.key);
    add({
      collection: isPost ? "posts" : "pages",
      legacyId: entry.key,
      path,
      slug: entry.key,
      title: entry.title,
      template: isPost
        ? "blog"
        : entry.key === "home"
          ? "home"
          : CONDITION_SLUGS.has(entry.key)
            ? "condition"
            : MARKETING_KEYS.has(entry.key)
              ? "marketing"
              : "marketing",
      sourceUrl: `https://drautoimmune.com${entry.path}`,
    });
  }

  add({
    collection: "pages",
    legacyId: "learn",
    path: "/learn",
    slug: "learn",
    title: "Learn — Autoimmune Health Education | Dr. Autoimmune",
    template: "learn",
    sourceUrl: "https://drautoimmune.com/learn/",
  });

  for (const page of LEARN_PAGES) {
    add({
      collection: "pages",
      legacyId: `learn:${page.slug}`,
      path: `/learn/${page.slug}`,
      slug: page.slug,
      title: page.title,
      template: "learn",
      sourceUrl: `https://drautoimmune.com/learn/${page.slug}/`,
      excerpt: page.metaDescription,
      sourceUpdatedAt: page.dateModified,
    });
  }

  add({
    collection: "pages",
    legacyId: "areas-we-serve",
    path: "/areas-we-serve",
    slug: "areas-we-serve",
    title: "Areas We Serve | Dr. Autoimmune",
    template: "area",
    sourceUrl: "https://drautoimmune.com/areas-we-serve/",
  });

  add({
    collection: "pages",
    legacyId: "areas-we-serve:colorado",
    path: "/areas-we-serve/colorado",
    slug: "colorado",
    title: "Colorado Telehealth | Dr. Autoimmune",
    template: "area",
    sourceUrl: "https://drautoimmune.com/areas-we-serve/colorado/",
  });

  add({
    collection: "pages",
    legacyId: "areas-we-serve:colorado:denver",
    path: "/areas-we-serve/colorado/denver",
    slug: "denver",
    title: "Denver Telehealth | Dr. Autoimmune",
    template: "area",
    sourceUrl: "https://drautoimmune.com/areas-we-serve/colorado/denver/",
  });

  for (const state of STATES) {
    for (const condition of STATE_CONDITIONS) {
      add({
        collection: "pages",
        legacyId: `areas-we-serve:${state.slug}:${condition.slug}`,
        path: `/areas-we-serve/${state.slug}/${condition.slug}`,
        slug: `${state.slug}-${condition.slug}`,
        title: `${condition.name} care in ${state.name} | Dr. Autoimmune`,
        template: "area-matrix",
        sourceUrl: `https://drautoimmune.com/areas-we-serve/${state.slug}/${condition.slug}/`,
        noIndex: true,
        noFollow: false,
        excludeFromSitemap: true,
      });
    }
  }

  add({
    collection: "pages",
    legacyId: "site-map",
    path: "/site-map",
    slug: "site-map",
    title: "Site Directory | Dr. Autoimmune",
    template: "marketing",
    sourceUrl: "https://drautoimmune.com/site-map/",
  });

  return records;
}

export function sitemapInventoryPaths(): string[] {
  return inventoryPublicUrls()
    .filter((record) => !record.excludeFromSitemap && !record.noIndex)
    .map((record) => record.path);
}
