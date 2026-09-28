import type { JsonLdBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import { AREA_HUB } from "@/content/areas-data";

function medicalClinicBlock() {
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
    // Telehealth-first: no physical office is open to walk-in patients.
    availableService: {
      "@type": "MedicalTherapy",
      name: "Telehealth Functional Medicine Consultation",
    },
  };
}

export function buildAreaHubJsonLd(): JsonLdBlock[] {
  const url = `${SITE_URL}/areas-we-serve/`;
  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Areas We Serve" },
        ],
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: AREA_HUB.title,
        url,
        description: AREA_HUB.metaDescription,
        about: medicalClinicBlock(),
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: AREA_HUB.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: { "@type": "Answer", text: faq.answer.join(" ") },
        })),
      },
    },
  ];
}
