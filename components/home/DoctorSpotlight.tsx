"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { DOCTOR } from "@/content/home-content";
import GlowOrb from "./GlowOrb";
import Reveal from "./Reveal";

const DOCTOR_STATS = [
  { value: "17+", label: "Years in functional medicine" },
  { value: "100%", label: "Remote care, nationwide" },
  { value: "IFM", label: "Institute of Functional Medicine" },
] as const;

/**
 * Doctor bio spotlight — asymmetric two-column layout with the new
 * client-supplied portrait on the left inside a sage-tinted card with
 * a soft primary halo and floating credential badges, and content on
 * the right (eyebrow + italic-serif emphasis heading + paragraphs +
 * numbered stat strip + credential checklist + CTA). Motion graphics:
 * gently drifting decorative shapes behind the portrait, staggered
 * credential reveal, hover-lift on the portrait card, and a subtle
 * floating "signature" badge that bobs.
 */
export default function DoctorSpotlight() {
  const reduce = useReducedMotion();
  return (
    <Section className="relative overflow-hidden">
      <GlowOrb className="-left-32 top-8 hidden lg:block" color="sage" size={400} />
      <GlowOrb className="right-0 bottom-8 hidden lg:block" color="primary" size={320} delay={0.6} />

      <Container className="relative">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
          {/* Left — portrait card with floating badges */}
          <Reveal className="flex justify-center lg:justify-start">
            <PortraitCard reduce={!!reduce} />
          </Reveal>

          {/* Right — content */}
          <Reveal delay={0.12} className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
              <Badge className="inline-flex">Meet Your Doctor</Badge>
            </div>

            <h2>
              Meet <Accent>Dr. Ian Hollaman</Accent>, DC, MSc, FMCP
            </h2>

            {DOCTOR.paragraphs.map((p) => (
              <p key={p.slice(0, 24)} className="text-base leading-relaxed text-ink-soft">
                {p}
              </p>
            ))}

            {/* Stat strip — three quick trust-signals with dividers */}
            <ul className="mt-2 grid grid-cols-3 gap-3 rounded-card border border-gray bg-white/70 p-4 shadow-card backdrop-blur-sm sm:gap-6 sm:p-5">
              {DOCTOR_STATS.map((s, i) => (
                <motion.li
                  key={s.label}
                  initial={reduce ? undefined : { y: 12 }}
                  whileInView={reduce ? undefined : { y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className={`flex flex-col gap-1 ${i > 0 ? "border-l border-gray pl-3 sm:pl-6" : ""}`}
                >
                  <span className="accent-serif text-xl leading-none text-primary sm:text-2xl">{s.value}</span>
                  <span className="text-xs leading-tight text-ink-soft">{s.label}</span>
                </motion.li>
              ))}
            </ul>

            <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {DOCTOR.credentials.map((credential, i) => (
                <motion.li
                  key={credential}
                  initial={reduce ? undefined : { y: 10 }}
                  whileInView={reduce ? undefined : { y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: 0.15 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  className="flex items-start gap-2.5 text-sm text-ink-soft"
                >
                  <Icon name="check-circle" className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                  <span>{credential}</span>
                </motion.li>
              ))}
            </ul>

            <div className="mt-2">
              <Button href={DOCTOR.cta.href} variant="primary" size="md">
                {DOCTOR.cta.label}
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </Section>
  );
}

/**
 * Portrait card — sage-tinted rounded-card frame around the full
 * headshot with decorative side-glyphs, a floating FMCP Certified pill,
 * and a "Boulder, CO" location pill at the bottom.
 */
function PortraitCard({ reduce }: { reduce: boolean }) {
  return (
    <div className="relative w-full max-w-[420px]">
      {/* Soft primary/sage rectangle offset behind the portrait for depth */}
      <div
        aria-hidden="true"
        className="absolute -bottom-4 -right-4 h-full w-full rounded-card bg-primary/12"
      />

      {/* Dot grid — decorative */}
      <div
        aria-hidden="true"
        className="absolute -left-4 -top-4 h-24 w-24 rounded-full opacity-60"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(63,128,106,0.3) 1px, transparent 1px)",
          backgroundSize: "12px 12px",
        }}
      />

      <motion.div
        className="relative overflow-hidden rounded-card bg-sage/40 shadow-card-hover"
        whileHover={reduce ? undefined : { y: -4 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
      >
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/images/team/ian-hollaman-portrait.png"
            alt="Dr. Ian Hollaman, DC, MSc, FMCP"
            fill
            sizes="(min-width: 1024px) 420px, 100vw"
            className="object-cover"
            preload={true}
          />
          {/* Bottom scrim + location pill */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/60 via-transparent to-transparent" />
          <div className="absolute inset-x-5 bottom-5 flex items-end justify-between">
            <div>
              <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-sage">
                Founder · Lead Practitioner
              </p>
              <p className="mt-1 text-lg font-medium leading-tight text-white sm:text-xl">
                Dr. Ian Hollaman
              </p>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-pill bg-white/90 px-3 py-1.5 text-xs font-medium text-ink shadow-card backdrop-blur-sm">
              <Icon name="globe" className="h-3.5 w-3.5 text-primary" />
              Boulder, CO
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating FMCP Certified pill — bobs on desktop */}
      <motion.div
        aria-hidden="true"
        className="glass absolute -right-4 top-8 flex items-center gap-2 rounded-pill px-4 py-2 shadow-card sm:-right-6"
        animate={reduce ? undefined : { y: [0, -5, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
      >
        <Icon name="shield" className="h-4 w-4 text-primary" />
        <span className="text-xs font-medium text-ink">FMCP Certified</span>
      </motion.div>
    </div>
  );
}

