import type { JsonLdBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import type { ConditionPageData } from "@/content/conditions-data";
import { getConditionEnrichment } from "@/content/condition-enrichment";

export function buildConditionFaqJsonLd(condition: ConditionPageData): JsonLdBlock[] {
  const enrichment = getConditionEnrichment(condition.slug);
  if (!enrichment?.faqs.length) return [];

  const url = `${SITE_URL}/${condition.slug}/`;

  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: enrichment.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: faq.answer.join(" "),
          },
        })),
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "MedicalWebPage",
        name: enrichment.pageTitle ?? `${condition.name} | Dr. Autoimmune`,
        url,
        description: enrichment.metaDescription ?? condition.heroDescription,
        about: {
          "@type": "MedicalCondition",
          name: condition.name,
        },
        publisher: {
          "@type": "MedicalClinic",
          name: "Dr. Autoimmune",
          url: `${SITE_URL}/`,
          telephone: SITE_CONTACT.phone,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Boulder",
            addressRegion: "CO",
            addressCountry: "US",
          },
        },
      },
    },
  ];
}
