"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Button from "@/components/ui/Button";
import FaqAccordion from "@/components/ui/FaqAccordion";
import StickyDiscoveryCTA from "@/components/ui/StickyDiscoveryCTA";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import { getConditionData } from "@/content/conditions-data";
import { LEARN_AUTHOR, MEDICAL_DISCLAIMER, type LearnPageData } from "@/content/learn-data";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

/** Falls back to a readable label for related links that aren't condition pages. */
const FALLBACK_LABELS: Record<string, string> = {
  "conditions-we-support": "Conditions We Support",
};

function relatedLinkLabel(slug: string): string {
  return getConditionData(slug)?.name ?? FALLBACK_LABELS[slug] ?? slug;
}

/**
 * Shared template for every `/learn/[slug]` educational article. Mirrors
 * the visual language of `ConditionPageTemplate` (card-stacked content in
 * an `InnerPageHero` band) but without the conditions sidebar, since these
 * are standalone informational articles rather than condition pillar pages.
 */
export default function LearnPageTemplate({ page }: { page: LearnPageData }) {
  return (
    <>
      <InnerPageHero eyebrow={page.eyebrow} title={page.h1} accent={page.accent} subhead={page.heroSubhead} />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-xs text-ink-soft">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            <Link href="/learn/" className="hover:text-primary">
              Learn
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-ink">{page.h1}</span>
          </nav>

          <div className="mx-auto max-w-3xl space-y-6">
            <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
              <p className="text-sm leading-relaxed text-ink-soft">
                Reviewed by{" "}
                <Link href={LEARN_AUTHOR.href} className="font-semibold text-primary-active hover:text-primary">
                  {LEARN_AUTHOR.name}, {LEARN_AUTHOR.credentials}
                </Link>
                <span className="text-ink-soft/70"> · Updated {page.dateModified}</span>
              </p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{LEARN_AUTHOR.note}</p>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                {page.intro.map((p) => (
                  <p key={p.slice(0, 48)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {page.sections.map((section) => (
              <Reveal key={section.heading} className={`${CARD_CLASSES} p-6 sm:p-10`}>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {section.bullets && (
                  <ul className="mt-4 space-y-2">
                    {section.bullets.map((item) => (
                      <li key={item.slice(0, 40)} className="flex gap-3 text-base leading-relaxed text-ink-soft">
                        <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            ))}

            <Reveal
              className={`relative ${CARD_CLASSES} overflow-hidden bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)] p-8 text-center text-white sm:p-10`}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
              />
              <div className="relative mx-auto max-w-xl">
                <h2 className="text-2xl font-extrabold text-sage sm:text-3xl">Ready for Personalized Answers?</h2>
                <p className="mt-3 text-base text-white/75">
                  General information is a starting point — a Discovery Call helps us look at your specific labs,
                  symptoms, and history to build a plan that&apos;s actually yours.
                </p>
                <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="mt-6 uppercase tracking-wide">
                  Book your Discovery Call
                </Button>
              </div>
            </Reveal>

            <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Frequently Asked Questions</h2>
              <div className="mt-2">
                <FaqAccordion items={page.faqs} />
              </div>
            </Reveal>

            {page.relatedConditionSlugs.length > 0 && (
              <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                <h2 className="text-lg font-extrabold text-ink">Related Reading</h2>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {page.relatedConditionSlugs.map((slug) => (
                    <li key={slug}>
                      <Link
                        href={`/${slug}/`}
                        className="inline-flex items-center rounded-pill border border-primary/30 bg-sage px-4 py-2 text-sm font-medium text-primary-active transition-colors hover:bg-sage-hover"
                      >
                        {relatedLinkLabel(slug)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {page.citations.length > 0 && (
              <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                <h2 className="text-lg font-extrabold text-ink">Sources</h2>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-ink-soft">
                  {page.citations.map((citation) => (
                    <li key={citation.url}>
                      <a href={citation.url} className="text-primary-active underline-offset-2 hover:underline" rel="noopener noreferrer">
                        {citation.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            <p className="text-xs leading-relaxed text-ink-soft/80">{MEDICAL_DISCLAIMER}</p>
          </div>
        </Container>
      </Section>

      <StickyDiscoveryCTA />
    </>
  );
}
