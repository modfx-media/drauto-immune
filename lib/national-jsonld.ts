import type { JsonLdBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import type { StateData, FrontRangeCity, GeneratedPage } from "@/content/national-data";
import { medicalClinicEntity, medicalClinicRef } from "@/lib/organization-jsonld";

export function buildStateHubJsonLd(state: StateData, page: GeneratedPage): JsonLdBlock[] {
  const url = `${SITE_URL}/areas-we-serve/${state.slug}/`;
  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve/` },
          { "@type": "ListItem", position: 3, name: state.name },
        ],
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        ...medicalClinicEntity(),
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.title,
        url,
        description: page.metaDescription,
        datePublished: page.datePublished,
        dateModified: page.datePublished,
        about: medicalClinicRef(),
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
          acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
        })),
      },
    },
  ];
}

export function buildFrontRangeCityJsonLd(city: FrontRangeCity, page: GeneratedPage): JsonLdBlock[] {
  const url = `${SITE_URL}/areas-we-serve/colorado/${city.slug}/`;
  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve/` },
          { "@type": "ListItem", position: 3, name: "Colorado", item: `${SITE_URL}/areas-we-serve/colorado/` },
          {
            "@type": "ListItem",
            position: 4,
            name: city.name || "Denver",
            item: url,
          },
        ],
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        ...medicalClinicEntity(),
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: page.title,
        url,
        description: page.metaDescription,
        datePublished: page.datePublished,
        dateModified: page.datePublished,
        about: medicalClinicRef(),
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
          acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
        })),
      },
    },
  ];
}
