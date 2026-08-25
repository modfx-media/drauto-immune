"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import { APPROACH } from "@/content/home-content";
import Reveal from "./Reveal";

/**
 * "Our Approach" welcome section — asymmetric collage on the left
 * (three real photos + a floating leaf badge + a trust card overlay + a
 * decorative dot grid) paired with a content column on the right
 * (eyebrow, headline with italic-serif emphasis + underline stroke, two
 * intro paragraphs, a 2×2 feature-pill grid, and a CTA + phone). Layout
 * pattern inspired by the reference the user shared, adapted to the
 * brand's sage/primary palette and existing motion language.
 */
export default function ApproachSection() {
  return (
    <Section className="relative overflow-hidden">
      {/* Very soft sage wash on the collage side for depth */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 -z-10 w-full bg-gradient-to-br from-sage/50 via-transparent to-transparent lg:w-2/3"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gray to-transparent"
      />

      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20">
          <Reveal>
            <ApproachCollage />
          </Reveal>

          <Reveal delay={0.1}>
            <ApproachContent />
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <ul className="mt-14 grid grid-cols-1 gap-6 border-t border-gray pt-12 md:grid-cols-3">
            {APPROACH.items.map((item) => (
              <li
                key={item.title}
                className="rounded-card border border-gray bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-0.5 hover:shadow-card-hover"
              >
                <h3 className="text-lg text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </Section>
  );
}

function ApproachCollage() {
  const reduce = useReducedMotion();
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* Decorative dot grid — top-right, matches the reference. */}
      <div
        aria-hidden="true"
        className="absolute -right-4 -top-4 hidden h-24 w-24 opacity-60 sm:block"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(63,128,106,0.35) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <div className="grid grid-cols-3 grid-rows-[auto_auto] gap-3 sm:gap-4">
        {/* Main image — spans 2/3 width, top row */}
        <div className="relative col-span-2 row-span-1 aspect-[4/3] overflow-hidden rounded-card">
          <Image
            src="/images/approach/telehealth-consultation.png"
            alt="A couple reviewing their telehealth appointment together on a laptop"
            fill
            sizes="(min-width: 1024px) 340px, (min-width: 640px) 60vw, 66vw"
            className="object-cover"
          />
          {/* Floating leaf badge — bounces gently on desktop */}
          <motion.div
            aria-hidden="true"
            className="absolute -left-4 -top-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-white shadow-card-hover"
            animate={reduce ? undefined : { y: [0, -4, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
          >
            <Icon name="leaf" className="h-6 w-6" />
          </motion.div>
        </div>

        {/* Small square image — top-right */}
        <div className="relative col-span-1 row-span-1 aspect-square overflow-hidden rounded-card">
          <Image
            src="/images/approach/wellness.avif"
            alt="Wellness and mind-body movement"
            fill
            sizes="(min-width: 1024px) 165px, 33vw"
            className="object-cover"
          />
        </div>

        {/* Small image — bottom-left */}
        <div className="relative col-span-1 row-span-1 aspect-square overflow-hidden rounded-card">
          <Image
            src="/images/approach/lifestyle.avif"
            alt="Everyday lifestyle and preventive care"
            fill
            sizes="(min-width: 1024px) 165px, 33vw"
            className="object-cover"
          />
        </div>

        {/* Trust card overlay — bottom-right, spans 2/3 width */}
        <motion.div
          className="col-span-2 flex items-center gap-4 rounded-card bg-white p-4 shadow-card sm:p-5"
          whileHover={reduce ? undefined : { y: -3 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
        >
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary text-white sm:h-12 sm:w-12">
            <Icon name="heart-pulse" className="h-5 w-5" />
          </span>
          <div className="min-w-0 flex-1">
            <p className="accent-serif text-xl leading-none text-ink">100%</p>
            <p className="mt-1 text-xs leading-tight text-ink-soft">
              Remote functional-medicine care, nationwide
            </p>
          </div>
          <div className="hidden shrink-0 border-l border-gray pl-4 sm:block">
            <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-ink-soft">
              FMCP
            </p>
            <p className="mt-0.5 flex items-center gap-1 text-sm font-medium text-ink">
              Certified <Icon name="check-circle" className="h-3.5 w-3.5 text-primary" />
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function ApproachContent() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
        <Badge className="inline-flex">Our Approach</Badge>
      </div>

      <h2>
        Where Medical Expertise Meets{" "}
        <Accent>Personalized Healing</Accent>
      </h2>

      <p className="text-base leading-relaxed text-ink-soft">{APPROACH.intro}</p>

      <p className="text-base leading-relaxed text-ink-soft">
        Every plan starts with listening: a comprehensive look at your history,
        labs, and lifestyle, so care fits your biology, not a template. We
        translate advanced testing into a clear roadmap and stay alongside you
        as your body responds.
      </p>

      <ul className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
        {APPROACH.pills.map((pill) => (
          <li
            key={pill.label}
            className="group flex items-center gap-3 rounded-card border border-gray bg-white px-4 py-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:shadow-card"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-sage text-primary transition-transform duration-300 group-hover:rotate-6">
              <Icon name={pill.icon as IconName} className="h-4 w-4" />
            </span>
            <span className="text-sm font-medium leading-tight text-ink">
              {pill.label}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-4 flex flex-wrap items-center gap-5">
        <Link
          href="/about-us/"
          className="group inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-medium text-white shadow-[0_4px_14px_rgba(63,128,106,0.25)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary-hover"
        >
          Learn more about us
          <Icon
            name="arrow-right"
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          />
        </Link>
        <a
          href={SITE_CONTACT.phoneHref}
          className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-primary"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray text-primary">
            <Icon name="phone-call" className="h-4 w-4" />
          </span>
          {SITE_CONTACT.phone}
        </a>
      </div>
    </div>
  );
}

