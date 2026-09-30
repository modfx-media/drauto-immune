import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AreaPageTemplate from "@/components/pages/areas/AreaPageTemplate";
import { AREA_HUB } from "@/content/areas-data";
import { buildAreaHubJsonLd } from "@/lib/areas-jsonld";
import { SITE_URL } from "@/lib/site";

const CANONICAL = `${SITE_URL}/areas-we-serve/`;

export const metadata: Metadata = {
  title: AREA_HUB.title,
  description: AREA_HUB.metaDescription,
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: AREA_HUB.title,
    description: AREA_HUB.metaDescription,
    url: CANONICAL,
    type: "website",
  },
};

export default function AreasWeServePage() {
  return (
    <>
      <JsonLd blocks={buildAreaHubJsonLd()} />
      <AreaPageTemplate
        content={{
          eyebrow: "Telehealth Service Area",
          h1: AREA_HUB.h1,
          accent: AREA_HUB.accent,
          heroSubhead: AREA_HUB.heroSubhead,
          intro: AREA_HUB.intro,
          sections: AREA_HUB.sections,
          faqs: AREA_HUB.faqs,
          breadcrumb: [{ label: "Home", href: "/" }, { label: "Areas We Serve" }],
        }}
      />
    </>
  );
}

