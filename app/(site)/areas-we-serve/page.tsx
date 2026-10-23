import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import JsonLd from "@/components/JsonLd";
import AreaPageTemplate from "@/components/pages/areas/AreaPageTemplate";
import StateConditionDirectory from "@/components/pages/areas/StateConditionDirectory";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { AREA_HUB } from "@/content/areas-data";
import { buildAreaHubJsonLd } from "@/lib/areas-jsonld";
import { cmsMetadata } from "@/lib/cms/metadata";
import { areaOgImage, SITE_URL } from "@/lib/site";

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
    images: [areaOgImage(undefined, AREA_HUB.title)],
  },
  twitter: {
    card: "summary_large_image",
    title: AREA_HUB.title,
    description: AREA_HUB.metaDescription,
    images: [areaOgImage().url],
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
        <Section bg="cream-wash" className="relative">
          <Container className="relative mx-auto max-w-5xl">
            <h2 className="text-3xl font-extrabold text-ink">State &amp; Condition Directory</h2>
            <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink-soft">
              Every state has dedicated telehealth pages for the conditions below. Pick your state,
              then your condition. Confirm availability with the office before booking.
            </p>
            <StateConditionDirectory />
          </Container>
        </Section>
      </>
    </CMSRoute>
  );
}

