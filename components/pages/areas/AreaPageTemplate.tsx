"use client";

import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import FaqAccordion from "@/components/ui/FaqAccordion";
import StickyDiscoveryCTA from "@/components/ui/StickyDiscoveryCTA";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import { AREA_MEDICAL_DISCLAIMER, type AreaFaq, type AreaSection } from "@/content/areas-data";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

export interface AreaPageContent {
  eyebrow: string;
  h1: string;
  accent: string;
  heroSubhead: string;
  intro: string[];
  sections: AreaSection[];
  faqs: AreaFaq[];
  breadcrumb: { label: string; href?: string }[];
}

/**
 * Shared template for the `/areas-we-serve` hub and its dedicated city
 * page(s). Same card-stacked visual language as `LearnPageTemplate` and
 * `ConditionPageTemplate`, with a telehealth-first framing throughout
 * (no drive-time or physical-office claims — see content/areas-data.ts).
 */
export default function AreaPageTemplate({ content }: { content: AreaPageContent }) {
  return (
    <>
      <InnerPageHero eyebrow={content.eyebrow} title={content.h1} accent={content.accent} subhead={content.heroSubhead} />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <nav aria-label="Breadcrumb" className="mb-6 flex flex-wrap items-center gap-1.5 text-xs text-ink-soft">
            {content.breadcrumb.map((crumb, i) => (
              <span key={crumb.label} className="flex items-center gap-1.5">
                {i > 0 && <span aria-hidden="true">/</span>}
                {crumb.href ? (
                  <Link href={crumb.href} className="hover:text-primary">
                    {crumb.label}
                  </Link>
                ) : (
                  <span className="text-ink">{crumb.label}</span>
                )}
              </span>
            ))}
          </nav>

          <div className="mx-auto max-w-3xl space-y-6">
            <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
              <div className="space-y-4 text-base leading-relaxed text-ink-soft">
                {content.intro.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </Reveal>

            {content.sections.map((section) => (
              <Reveal key={section.heading} className={`${CARD_CLASSES} p-6 sm:p-10`}>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{section.heading}</h2>
                <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                  {section.paragraphs.map((p) => (
                    <p key={p.slice(0, 40)}>{p}</p>
                  ))}
                </div>
                {section.bullets && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {section.bullets.map((item) => (
                      <Badge key={item} tone="neutral">
                        {item}
                      </Badge>
                    ))}
                  </div>
                )}
                {section.links && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {section.links.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        className="inline-flex items-center rounded-pill bg-gray px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.08em] text-ink-soft transition-colors hover:bg-sage hover:text-primary-active"
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
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
                <h2 className="text-2xl font-extrabold text-sage sm:text-3xl">Start Your Telehealth Evaluation</h2>
                <p className="mt-3 text-base text-white/75">
                  Book a Discovery Call to see if our root-cause, 100% telehealth approach is right for you — wherever
                  you&apos;re located.
                </p>
                <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="mt-6 uppercase tracking-wide">
                  Book your Discovery Call
                </Button>
              </div>
            </Reveal>

            <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Frequently Asked Questions</h2>
              <div className="mt-2">
                <FaqAccordion items={content.faqs} />
              </div>
            </Reveal>

            <p className="text-xs leading-relaxed text-ink-soft/80">{AREA_MEDICAL_DISCLAIMER}</p>
          </div>
        </Container>
      </Section>

      <StickyDiscoveryCTA />
    </>
  );
}
