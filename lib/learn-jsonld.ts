import type { JsonLdBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import { LEARN_PAGES, type LearnPageData } from "@/content/learn-data";

/**
 * Builds the JSON-LD graph for the `/learn/` hub page: a BreadcrumbList
 * (Home > Learn), a CollectionPage block describing the index, and an
 * ItemList enumerating every article — mirrors the pattern used for the
 * `/areas-we-serve/` hub (see lib/areas-jsonld.ts buildAreaHubJsonLd).
 */
export function buildLearnHubJsonLd(): JsonLdBlock[] {
  const url = `${SITE_URL}/learn/`;

  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Learn" },
        ],
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Learn: Autoimmune Health Answers",
        url,
        description:
          "Plain-language answers to common questions about autoimmune lab results, root causes, and choosing the right specialist.",
        hasPart: {
          "@type": "ItemList",
          itemListElement: LEARN_PAGES.map((page, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: page.h1,
            url: `${SITE_URL}/learn/${page.slug}/`,
          })),
        },
      },
    },
  ];
}

/**
 * Builds the JSON-LD graph for a `/learn/[slug]` article: a BreadcrumbList
 * (Home > Learn > Title), a MedicalWebPage block describing the article,
 * and an FAQPage block generated from the page's FAQ entries — modeled on
 * the structured-data pattern used by the migrated condition pages
 * (see content/data/rheumatoid-arthritis.json) for consistency.
 */
export function buildLearnJsonLd(page: LearnPageData): JsonLdBlock[] {
  const url = `${SITE_URL}/learn/${page.slug}/`;

  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Learn", item: `${SITE_URL}/learn/` },
          { "@type": "ListItem", position: 3, name: page.h1 },
        ],
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: page.title,
        url,
        description: page.metaDescription,
        datePublished: page.datePublished,
        dateModified: page.dateModified,
        inLanguage: "en-US",
        lastReviewed: page.dateModified,
        author: {
          "@type": "Person",
          name: "Dr. Ian Hollaman",
          honorificSuffix: "DC, MSc, FMCP",
          jobTitle: "Functional Medicine Practitioner",
          url: `${SITE_URL}/about-us/`,
        },
        reviewedBy: {
          "@type": "Person",
          name: "Dr. Ian Hollaman",
          honorificSuffix: "DC, MSc, FMCP",
          url: `${SITE_URL}/about-us/`,
        },
        citation: page.citations.map((citation) => ({
          "@type": "CreativeWork",
          name: citation.name,
          url: citation.url,
        })),
        publisher: {
          "@type": "MedicalClinic",
          name: "Dr. Autoimmune",
          url: `${SITE_URL}/`,
          telephone: SITE_CONTACT.phone,
          location: {
            "@type": "Place",
            address: {
              "@type": "PostalAddress",
              addressLocality: "Boulder",
              addressRegion: "CO",
              addressCountry: "US",
            },
          },
        },
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: page.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer.join(" "),
          },
        })),
      },
    },
  ];
}
