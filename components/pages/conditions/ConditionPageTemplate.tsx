"use client";

import Image from "next/image";
import Link from "next/link";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import Card from "@/components/ui/Card";
import StaggerList from "@/components/ui/StaggerList";
import ConditionSidebar from "@/components/ui/ConditionSidebar";
import StickyDiscoveryCTA from "@/components/ui/StickyDiscoveryCTA";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import { getConditionData, getRelatedConditions, type ConditionImage } from "@/content/conditions-data";
import { getConditionEnrichment } from "@/content/condition-enrichment";
import FindCareByState from "@/components/pages/conditions/FindCareByState";
import { STATE_CONDITIONS } from "@/content/national-data";

const ROOT_CAUSE_ITEMS = [
  "Genetic predisposition",
  "Leaky gut (a.k.a intestinal permeability)",
  "An environmental trigger",
];

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

function MidCta({ image }: { image?: ConditionImage }) {
  return (
    <Reveal
      className={`relative ${CARD_CLASSES} overflow-hidden bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)] p-8 text-white sm:p-10 ${
        image ? "sm:flex sm:items-center sm:gap-10" : "text-center"
      }`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />
      <div aria-hidden="true" className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl" />

      <div className={`relative ${image ? "sm:flex-1" : "mx-auto max-w-xl"}`}>
        <h2 className="text-2xl font-extrabold text-sage sm:text-3xl">Start Your Health Consultation</h2>
        <p className="mt-3 text-base text-white/75">
          Take the first step toward better health. Personalized care, real answers, and lasting wellness start here.
        </p>
        <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="mt-6 uppercase tracking-wide">
          Book your Discovery Call
        </Button>
      </div>
      {image && (
        <div className="relative mx-auto mt-8 w-40 shrink-0 sm:mx-0 sm:mt-0 sm:w-48">
          <div aria-hidden="true" className="absolute -inset-3 rounded-full bg-white/10 blur-2xl" />
          <div className="relative aspect-square overflow-hidden rounded-full shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-4 ring-white/15">
            <Image src={image.src} alt={image.alt} fill sizes="192px" className="object-cover" />
          </div>
        </div>
      )}
    </Reveal>
  );
}

export default function ConditionPageTemplate({ slug }: { slug: string }) {
  const data = getConditionData(slug);
  if (!data) return null;

  const enrichment = getConditionEnrichment(slug);
  const {
    name,
    heroDescription,
    introImage,
    whatIsHeading,
    whatIsParagraphs,
    whatIsBullets,
    leadInBullets,
    symptoms,
    triggers,
    helpHeading,
    helpParagraphs,
    gutHeading,
    gutParagraphs,
    showRootCause = true,
    ctaImage,
    ctaAfterGut,
  } = data;

  const related = getRelatedConditions(slug);
  const displayName = enrichment?.displayName ?? name;

  const helpCard = (
    <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{helpHeading}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
        {helpParagraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </Reveal>
  );

  const rootCauseCard = showRootCause && (
    <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Finding the Root Cause</h2>
      <p className="mt-3 text-base text-ink-soft">We know that autoimmunity requires 3 things to develop:</p>
      <StaggerList ordered columns={1} items={ROOT_CAUSE_ITEMS} />
    </Reveal>
  );

  const gutCard = (
    <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{gutHeading}</h2>
      <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
        {gutParagraphs.map((p) => (
          <p key={p.slice(0, 40)}>{p}</p>
        ))}
      </div>
    </Reveal>
  );

  return (
    <>
      <InnerPageHero
        eyebrow="Conditions We Support"
        title={displayName}
        accent={displayName.includes("Functional") ? "Functional Medicine" : name}
        subhead={heroDescription}
        image={{ ...(ctaImage ?? introImage), dim: 0.15 }}
      />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-10">
            <ConditionSidebar />

            <div className="min-w-0 flex-1 space-y-6">
              <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
                  <div className="min-w-0 flex-1">
                    <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{whatIsHeading}</h2>
                    <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                      {whatIsParagraphs.map((p) => (
                        <p key={p.slice(0, 40)}>{p}</p>
                      ))}
                    </div>
                    {whatIsBullets && <StaggerList items={whatIsBullets} />}
                  </div>
                  <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden rounded-card shadow-card lg:w-72">
                    <Image
                      src={introImage.src}
                      alt={introImage.alt}
                      fill
                      sizes="(min-width: 1024px) 288px, 100vw"
                      className="object-cover"
                    />
                  </div>
                </div>
              </Reveal>

              {leadInBullets && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h3 className="text-xl font-extrabold text-ink">{leadInBullets.heading}</h3>
                  <StaggerList items={leadInBullets.items} />
                </Reveal>
              )}

              {symptoms && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{symptoms.heading}</h2>
                  {symptoms.lead && <p className="mt-3 text-base text-ink-soft">{symptoms.lead}</p>}
                  <StaggerList items={symptoms.items} />
                </Reveal>
              )}

              {triggers && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{triggers.heading}</h2>
                  {triggers.lead && <p className="mt-3 text-base text-ink-soft">{triggers.lead}</p>}
                  <StaggerList items={triggers.items} />
                </Reveal>
              )}

              {enrichment?.labs && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{enrichment.labs.heading}</h2>
                  {enrichment.labs.lead && (
                    <p className="mt-3 text-base text-ink-soft">{enrichment.labs.lead}</p>
                  )}
                  <StaggerList items={enrichment.labs.items} />
                </Reveal>
              )}

              {enrichment?.conventional && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                    {enrichment.conventional.heading}
                  </h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                    {enrichment.conventional.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              )}

              {enrichment?.approach && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{enrichment.approach.heading}</h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                    {enrichment.approach.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              )}

              {ctaAfterGut ? (
                <>
                  {helpCard}
                  {rootCauseCard}
                  {gutCard}
                  <MidCta image={ctaImage} />
                </>
              ) : (
                <>
                  {helpCard}
                  <MidCta image={ctaImage} />
                  {rootCauseCard}
                  {gutCard}
                </>
              )}

              {enrichment?.boulder && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">{enrichment.boulder.heading}</h2>
                  <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                    {enrichment.boulder.paragraphs.map((p) => (
                      <p key={p.slice(0, 40)}>{p}</p>
                    ))}
                  </div>
                </Reveal>
              )}

              {enrichment?.faqs?.length ? (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Frequently Asked Questions</h2>
                  <div className="mt-6">
                    <FaqAccordion
                      items={enrichment.faqs.map((faq) => ({
                        question: faq.question,
                        answer: faq.answer,
                      }))}
                    />
                  </div>
                </Reveal>
              ) : null}

              {(enrichment?.relatedLearn?.length || enrichment?.relatedBlog?.length) && (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Related Reading</h2>
                  <div className="mt-6 grid gap-6 sm:grid-cols-2">
                    {enrichment.relatedLearn?.length ? (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">Learn</h3>
                        <ul className="mt-3 space-y-2">
                          {enrichment.relatedLearn.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className="font-medium text-primary hover:underline">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                    {enrichment.relatedBlog?.length ? (
                      <div>
                        <h3 className="text-sm font-bold uppercase tracking-wide text-ink-soft">
                          Articles &amp; Guides
                        </h3>
                        <ul className="mt-3 space-y-2">
                          {enrichment.relatedBlog.map((link) => (
                            <li key={link.href}>
                              <Link href={link.href} className="font-medium text-primary hover:underline">
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ) : null}
                  </div>
                </Reveal>
              )}

              {STATE_CONDITIONS.some((c) => c.slug === slug) ? (
                <Reveal className={`${CARD_CLASSES} p-6 sm:p-10`}>
                  <FindCareByState conditionSlug={slug} />
                </Reveal>
              ) : null}

              <p className="border-t border-gray pt-8 text-center text-sm text-ink-soft">
                At <strong className="text-ink">Dr. Autoimmune</strong>, we provide personalized, root-cause care to
                uncover the source of your symptoms and support long-term wellness. This page is educational and is
                not a diagnosis or a substitute for specialty care when it is needed.
              </p>
            </div>
          </div>

          {related.length > 0 && (
            <div className="mt-16 border-t border-gray pt-16">
              <Reveal className="mx-auto max-w-2xl text-center">
                <Badge className="mb-4 inline-flex">Explore More</Badge>
                <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Related Conditions</h2>
                <p className="mt-3 text-base text-ink-soft">
                  Explore other conditions we regularly treat with the same root-cause approach.
                </p>
              </Reveal>
              <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
                {related.map((condition) => (
                  <li key={condition.slug}>
                    <Card
                      href={`/${condition.slug}/`}
                      image={condition.introImage}
                      title={condition.name}
                      footer={<span className="text-sm font-medium text-primary">Learn more →</span>}
                      className="h-full"
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </Container>
      </Section>

      <StickyDiscoveryCTA />
    </>
  );
}
