import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import JsonLd from "@/components/JsonLd";
import AreaPageTemplate from "@/components/pages/areas/AreaPageTemplate";
import { AREA_HUB } from "@/content/areas-data";
import { buildAreaHubJsonLd } from "@/lib/areas-jsonld";
import { cmsMetadata } from "@/lib/cms/metadata";
import { SITE_URL } from "@/lib/site";

const CANONICAL = `${SITE_URL}/areas-we-serve/`;

const AREA_HUB_METADATA: Metadata = {
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

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/areas-we-serve", AREA_HUB_METADATA);
}

export default function AreasWeServePage() {
  return (
    <CMSRoute path="/areas-we-serve">
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
    </CMSRoute>
  );
}

