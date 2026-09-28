import type { Metadata } from "next";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import JsonLd from "@/components/JsonLd";
import { LEARN_PAGES } from "@/content/learn-data";
import { buildLearnHubJsonLd } from "@/lib/learn-jsonld";
import { SITE_URL } from "@/lib/site";

const CANONICAL = `${SITE_URL}/learn/`;

export const metadata: Metadata = {
  title: "Learn — Autoimmune Health Education | Dr. Autoimmune",
  description:
    "Plain-language answers to common questions about autoimmune lab results, root causes, and choosing the right specialist — from the Dr. Autoimmune team.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "Learn — Autoimmune Health Education | Dr. Autoimmune",
    description:
      "Plain-language answers to common questions about autoimmune lab results, root causes, and choosing the right specialist.",
    url: CANONICAL,
    type: "website",
  },
};

/**
 * Index/hub page for the `/learn/[slug]` educational article series —
 * lists every article for discoverability and internal linking. Not part
 * of the migrated `content/data/index.json` set since this is a new
 * programmatic-SEO content type (see data/pseo/pages.json).
 */
export default function LearnHubPage() {
  return (
    <>
      <JsonLd blocks={buildLearnHubJsonLd()} />
      <InnerPageHero
        eyebrow="Education"
        title="Learn: Autoimmune Health Answers"
        accent="Autoimmune Health Answers"
        subhead="Clear, practical explainers on lab results, root causes, and finding the right kind of care."
      />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {LEARN_PAGES.map((page) => (
              <Reveal key={page.slug}>
                <Link
                  href={`/learn/${page.slug}/`}
                  className="group flex h-full flex-col rounded-card border border-gray bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover"
                >
                  <span className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary/70">
                    {page.eyebrow}
                  </span>
                  <h2 className="mt-2 text-lg font-extrabold text-ink group-hover:text-primary">{page.h1}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{page.heroSubhead}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
