import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import JsonLd from "@/components/JsonLd";
import AreaPageTemplate from "@/components/pages/areas/AreaPageTemplate";
import { getState, getFrontRangeCity, buildFrontRangeCityContent } from "@/content/national-data";
import { buildFrontRangeCityJsonLd } from "@/lib/national-jsonld";
import { cmsMetadata } from "@/lib/cms/metadata";
import { SITE_URL } from "@/lib/site";

/**
 * Only Denver remains as a live [topic] page. Former state×condition URLs
 * 301 to flagship condition pages via next.config.ts.
 */
export async function generateStaticParams() {
  return [{ state: "colorado", topic: "denver" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; topic: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, topic } = await params;
  const state = getState(stateSlug);
  if (!state || state.slug !== "colorado") return {};

  const city = getFrontRangeCity(topic);
  if (city?.slug !== "denver") return {};

  const page = buildFrontRangeCityContent(city);
  const canonical = `${SITE_URL}/areas-we-serve/colorado/${city.slug}/`;
  return cmsMetadata(`/areas-we-serve/colorado/${city.slug}`, {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: { title: page.title, description: page.metaDescription, url: canonical, type: "website" },
  });
}

export default async function StateTopicPage({
  params,
}: {
  params: Promise<{ state: string; topic: string }>;
}) {
  const { state: stateSlug, topic } = await params;
  const state = getState(stateSlug);
  if (!state || state.slug !== "colorado") notFound();

  const city = getFrontRangeCity(topic);
  if (city?.slug !== "denver") notFound();

  const page = buildFrontRangeCityContent(city);
  return (
    <CMSRoute path={`/areas-we-serve/colorado/${city.slug}`}>
      <>
        <JsonLd blocks={buildFrontRangeCityJsonLd(city, page)} />
        <AreaPageTemplate
          content={{
            eyebrow: "Telehealth Service Area",
            h1: page.h1,
            accent: page.accent,
            heroSubhead: page.heroSubhead,
            intro: page.intro,
            sections: page.sections,
            faqs: page.faqs,
            breadcrumb: [
              { label: "Home", href: "/" },
              { label: "Areas We Serve", href: "/areas-we-serve/" },
              { label: state.name, href: `/areas-we-serve/${state.slug}/` },
              { label: city.name },
            ],
          }}
        />
      </>
    </CMSRoute>
  );
}
