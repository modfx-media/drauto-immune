import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AreaPageTemplate from "@/components/pages/areas/AreaPageTemplate";
import {
  getState,
  getStateSlugs,
  getStateCondition,
  getStateConditionSlugs,
  getFrontRangeCity,
  buildStateConditionContent,
  buildFrontRangeCityContent,
} from "@/content/national-data";
import { buildStateConditionJsonLd, buildFrontRangeCityJsonLd } from "@/lib/national-jsonld";
import { SITE_URL } from "@/lib/site";

/** Colorado also serves Front Range city pages at this same route position (see content/national-data.ts FRONT_RANGE_CITIES). */
export async function generateStaticParams() {
  const params: { state: string; topic: string }[] = [];
  for (const state of getStateSlugs()) {
    for (const condition of getStateConditionSlugs()) {
      params.push({ state, topic: condition });
    }
    if (state === "colorado") {
      params.push({ state, topic: "denver" });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string; topic: string }>;
}): Promise<Metadata> {
  const { state: stateSlug, topic } = await params;
  const state = getState(stateSlug);
  if (!state) return {};

  const condition = getStateCondition(topic);
  if (condition) {
    const page = buildStateConditionContent(state, condition);
    const canonical = `${SITE_URL}/areas-we-serve/${state.slug}/${condition.slug}/`;
    return {
      title: page.title,
      description: page.metaDescription,
      alternates: { canonical },
      openGraph: { title: page.title, description: page.metaDescription, url: canonical, type: "website" },
      // Noindexed per 2025 SEO audit (reports/pseo-audit.md): this state x
      // condition combinatorial matrix scored 1/5 on Net-Info-Gain with
      // ~75-80% near-duplicate content across all 400 pages ("High"
      // scaled-content-abuse cluster-fingerprint risk) and has zero
      // measurable search-volume support. `follow` is kept so link equity
      // still flows from these pages to the flagship condition pages and
      // state hubs; pages stay live/linkable for direct navigation, just
      // excluded from Google's index rather than deleted outright.
      robots: { index: false, follow: true },
    };
  }

  const city = state.slug === "colorado" ? getFrontRangeCity(topic) : undefined;
  if (city?.slug === "denver") {
    const page = buildFrontRangeCityContent(city);
    const canonical = `${SITE_URL}/areas-we-serve/colorado/${city.slug}/`;
    return {
      title: page.title,
      description: page.metaDescription,
      alternates: { canonical },
      openGraph: { title: page.title, description: page.metaDescription, url: canonical, type: "website" },
    };
  }

  return {};
}

export default async function StateTopicPage({
  params,
}: {
  params: Promise<{ state: string; topic: string }>;
}) {
  const { state: stateSlug, topic } = await params;
  const state = getState(stateSlug);
  if (!state) notFound();

  const condition = getStateCondition(topic);
  if (condition) {
    const page = buildStateConditionContent(state, condition);
    return (
      <>
        <JsonLd blocks={buildStateConditionJsonLd(state, condition, page)} />
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
              ...(state.slug === "colorado"
                ? [{ label: state.name, href: `/areas-we-serve/${state.slug}/` }]
                : []),
              { label: condition.name },
            ],
          }}
        />
      </>
    );
  }

  const city = state.slug === "colorado" ? getFrontRangeCity(topic) : undefined;
  if (city?.slug === "denver") {
    const page = buildFrontRangeCityContent(city);
    return (
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
    );
  }

  notFound();
}

