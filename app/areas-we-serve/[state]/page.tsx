import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import AreaPageTemplate from "@/components/pages/areas/AreaPageTemplate";
import { getState, getStateSlugs, buildStateHubContent, FRONT_RANGE_CITIES } from "@/content/national-data";
import { buildStateHubJsonLd } from "@/lib/national-jsonld";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return getStateSlugs().map((state) => ({ state }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ state: string }>;
}): Promise<Metadata> {
  const { state: stateSlug } = await params;
  const state = getState(stateSlug);
  if (!state) return {};
  const page = buildStateHubContent(state);
  const canonical = `${SITE_URL}/areas-we-serve/${state.slug}/`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonical,
      type: "website",
    },
  };
}

/** Colorado gets a bonus links section to its dedicated Front Range city pages (see content/national-data.ts). */
const FRONT_RANGE_SECTION = {
  heading: "Front Range Cities",
  paragraphs: [
    "A large share of our patients live along the Front Range, from Boulder and Denver north through Longmont and Fort Collins, and south toward Colorado Springs. Because every visit is conducted by telehealth, there's no commute, no waiting room, and no need to take extra time off work for an in-office visit.",
  ],
  links: FRONT_RANGE_CITIES.map((c) => ({ label: c.name, href: `/areas-we-serve/colorado/${c.slug}/` })),
};

export default async function StateHubPage({
  params,
}: {
  params: Promise<{ state: string }>;
}) {
  const { state: stateSlug } = await params;
  const state = getState(stateSlug);
  if (!state) notFound();

  const page = buildStateHubContent(state);
  const isColorado = state.slug === "colorado";
  const sections = isColorado ? [...page.sections, FRONT_RANGE_SECTION] : page.sections;

  return (
    <>
      <JsonLd blocks={buildStateHubJsonLd(state, page)} />
      <AreaPageTemplate
        content={{
          eyebrow: "Telehealth Service Area",
          h1: page.h1,
          accent: page.accent,
          heroSubhead: page.heroSubhead,
          intro: page.intro,
          sections,
          faqs: page.faqs,
          breadcrumb: [
            { label: "Home", href: "/" },
            { label: "Areas We Serve", href: "/areas-we-serve/" },
            { label: state.name },
          ],
        }}
      />
    </>
  );
}
