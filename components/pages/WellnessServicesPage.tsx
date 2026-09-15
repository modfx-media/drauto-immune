"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";

const EASE = [0.22, 1, 0.36, 1] as const;

const SUPPORT_AREAS: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Nutrition and Lifestyle Support",
    description: "Personalized nutrition and lifestyle recommendations designed around your specific needs and goals.",
    icon: "leaf",
  },
  {
    title: "Ongoing Care and Guidance",
    description: "Consistent follow-up so your plan can be adjusted as your body responds and your needs evolve.",
    icon: "heart-pulse",
  },
  {
    title: "Advanced Testing Options",
    description: "Access to functional lab testing that helps identify what is really driving your symptoms.",
    icon: "stethoscope",
  },
  {
    title: "Therapeutic Supplement Guidance",
    description: "Clinically informed supplement recommendations chosen to support your specific findings.",
    icon: "clipboard",
  },
  {
    title: "Remote Support",
    description: "Convenient, secure telehealth visits so you can receive thorough care from anywhere in the country.",
    icon: "globe",
  },
];

const WHY_IT_WORKS: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Clarity and Education",
    description: "You leave every visit understanding what is happening in your body and why.",
    icon: "target",
  },
  {
    title: "Personalization",
    description: "Your care plan reflects your history, your labs, and your day-to-day life.",
    icon: "compass",
  },
  {
    title: "Consistency and Support",
    description: "Ongoing check-ins keep your plan on track and responsive as things change.",
    icon: "users",
  },
  {
    title: "Whole-Body Approach",
    description: "We look at how your systems interact rather than treating symptoms in isolation.",
    icon: "shield",
  },
  {
    title: "Telehealth Convenience",
    description: "Comprehensive support delivered securely, wherever you are.",
    icon: "globe",
  },
];

export default function WellnessServicesPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Wellness Services"
        title="Your Personalized Functional Medicine Support"
        accent="Functional Medicine"
        subhead="Ongoing, root-cause care built around your body, your history, and your goals."
        image={{
          src: "/images/services/wellness-services.jpg",
          alt: "Couple enjoying improved wellness outdoors",
          position: "center 20%",
        }}
      />

      {/* Intro */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <Badge className="mb-2 inline-flex">Ongoing Support</Badge>
            <p className="text-lg leading-relaxed text-ink-soft">
              Getting well is rarely a single appointment. It is a process of testing, adjusting, and learning
              what your body responds to. Our wellness services are built to support that process from start to
              finish, with a care team that stays engaged with you at every step.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              Whether you are just beginning to investigate your symptoms or already have a diagnosis and want a
              more comprehensive approach, our services are designed to meet you where you are.
            </p>
            <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="uppercase tracking-wide">
              Book your Discovery Call
            </Button>
          </Reveal>
        </Container>
      </Section>

      {/* Led by Dr. Ian + 5 support areas */}
      <Section bg="cream-wash">
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 inline-flex">Led by Dr. Ian Hollaman, DC, MSc, FMCP</Badge>
            <p className="text-lg leading-relaxed text-ink-soft">
              Every plan is guided by Dr. Ian&rsquo;s clinical experience with autoimmune, thyroid, gastrointestinal,
              and chronic conditions, translated into practical, personalized support.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SUPPORT_AREAS.map((area, i) => (
              <IconStaggerCard key={area.title} item={area} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* How ongoing care works */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="primary" variant="orbs" />
        <Container className="relative">
          <div className="flex flex-col items-center gap-12 lg:flex-row">
            <Reveal className="flex-1">
              <div className="flex items-center gap-3">
                <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
                <Badge className="inline-flex">How It Works</Badge>
              </div>
              <h2 className="mt-3">
                How Ongoing Care <Accent>Works</Accent>
              </h2>
              <p className="mt-6 text-lg leading-relaxed text-ink-soft">
                After your initial evaluation, care continues through scheduled follow-ups where we review your
                progress, adjust your plan, and discuss any new findings. This rhythm allows your plan to evolve
                alongside your body rather than staying static.
              </p>
              <p className="mt-4 text-lg leading-relaxed text-ink-soft">
                Testing, nutrition, supplementation, and lifestyle strategies all work together, and ongoing
                care is what keeps them aligned as you move forward.
              </p>
            </Reveal>
            <Reveal delay={0.15} className="w-full max-w-md flex-1">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -bottom-4 -right-4 h-full w-full rounded-card bg-primary/12"
                />
                <div className="relative aspect-square overflow-hidden rounded-card border border-gray bg-sage shadow-card">
                  <Image
                    src="/images/migrated/wellness-services/BLC-Functional-Medicine-Wheel-1-1030x1030-1.webp"
                    alt="Functional Medicine Wheel"
                    fill
                    sizes="(min-width: 1024px) 448px, 90vw"
                    className="object-contain p-4"
                  />
                </div>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Why our wellness care works */}
      <Section bg="sage-mesh">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2>
              Why Our Wellness Care <Accent>Works</Accent>
            </h2>
          </Reveal>
          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {WHY_IT_WORKS.map((item, i) => (
              <IconStaggerCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section bg="primary" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Ready to Feel Supported Every Step of the Way?</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              A discovery call is the easiest way to see how our wellness services could fit your specific
              situation, no pressure, just a conversation about what moving forward could look like.
            </p>
            <div className="mt-8">
              <Button href={DISCOVERY_CALL_HREF} variant="secondary" size="lg" className="uppercase tracking-wide">
                Book your Discovery Call
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function IconStaggerCard({
  item,
  index,
}: {
  item: { title: string; description: string; icon: IconName };
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal delay={index * 0.08} className="group relative overflow-hidden rounded-card border border-gray bg-white p-6 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <span aria-hidden="true" className="accent-serif absolute right-4 top-2 text-3xl text-primary/10">
        {String(index + 1).padStart(2, "0")}
      </span>
      <motion.div
        initial={reduce ? undefined : { scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.08 + 0.15, ease: EASE }}
        className="relative flex h-12 w-12 items-center justify-center rounded-lg bg-sage text-primary transition-all group-hover:-rotate-6 group-hover:bg-primary group-hover:text-white"
      >
        <Icon name={item.icon} className="h-6 w-6" />
      </motion.div>
      <h3 className="relative mt-4 text-lg font-extrabold text-ink">{item.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">{item.description}</p>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
      />
    </Reveal>
  );
}
