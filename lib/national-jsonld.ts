import type { JsonLdBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import type { StateData, StateConditionSummary, FrontRangeCity, GeneratedPage } from "@/content/national-data";

function medicalClinicBlock(state: StateData) {
  return {
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
    areaServed: {
      "@type": "State",
      name: state.name,
    },
    // Telehealth-first: no physical office in this state, no licensure claim.
    availableService: {
      "@type": "MedicalTherapy",
      name: "Telehealth Functional Medicine Consultation",
    },
  };
}

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
        "@type": "WebPage",
        name: page.title,
        url,
        description: page.metaDescription,
        datePublished: page.datePublished,
        dateModified: page.datePublished,
        about: medicalClinicBlock(state),
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

export function buildStateConditionJsonLd(
  state: StateData,
  condition: StateConditionSummary,
  page: GeneratedPage,
): JsonLdBlock[] {
  const url = `${SITE_URL}/areas-we-serve/${state.slug}/${condition.slug}/`;
  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve", item: `${SITE_URL}/areas-we-serve/` },
          { "@type": "ListItem", position: 3, name: state.name, item: `${SITE_URL}/areas-we-serve/${state.slug}/` },
          { "@type": "ListItem", position: 4, name: condition.name },
        ],
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
        about: medicalClinicBlock(state),
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
          { "@type": "ListItem", position: 4, name: city.name },
        ],
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
        about: {
          "@type": "MedicalClinic",
          name: "Dr. Autoimmune",
          url: `${SITE_URL}/`,
          telephone: SITE_CONTACT.phone,
          location: {
            "@type": "Place",
            address: { "@type": "PostalAddress", addressLocality: "Boulder", addressRegion: "CO", addressCountry: "US" },
          },
          areaServed: { "@type": "City", name: city.name },
          availableService: { "@type": "MedicalTherapy", name: "Telehealth Functional Medicine Consultation" },
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
          acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
        })),
      },
    },
  ];
}
