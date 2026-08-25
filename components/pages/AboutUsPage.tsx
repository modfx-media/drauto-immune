"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Counter from "@/components/ui/Counter";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";

const EASE = [0.22, 1, 0.36, 1] as const;

const APPROACH_PILLARS: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Personalized Care",
    description: "Your plan is designed around your specific physiology, not a standard protocol.",
    icon: "target",
  },
  {
    title: "Root Cause Insight",
    description: "We work to understand what is driving imbalance instead of focusing only on symptom relief.",
    icon: "compass",
  },
  {
    title: "Thoughtful, Evidence-Informed Strategy",
    description: "Every recommendation is guided by both research and clinical experience.",
    icon: "clipboard",
  },
  {
    title: "Lifestyle Integration",
    description: "Nutrition, stress, sleep, and movement are incorporated in a way so improvement is actually sustainable.",
    icon: "leaf",
  },
  {
    title: "Patient Understanding",
    description: "We explain your findings clearly so you know what is happening in your body and why the plan makes sense.",
    icon: "heart-pulse",
  },
];

const STATS: { value: number; suffix: string; label: string; icon: IconName }[] = [
  { value: 16, suffix: "+", label: "Years of Clinical Experience", icon: "clock" },
  { value: 100, suffix: "%", label: "Remote, Telehealth-Based Care", icon: "globe" },
  { value: 5, suffix: "", label: "Pillars of Our Care Approach", icon: "compass" },
];

export default function AboutUsPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="About Us"
        title="A Different Kind of Functional Medicine"
        accent="Functional Medicine"
        subhead="Born from lived experience. Built for people searching for answers."
        image={{ src: "/images/about-us/provide-healthy-eating-information.jpg", alt: "Healthy meal prep with fresh produce and a wellness journal" }}
      />

      {/* Intro */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <Badge className="mb-2 inline-flex">Our Story</Badge>
            <p className="text-lg leading-relaxed text-ink-soft">
              Most of the people who find their way to Dr. Autoimmune have already been through a long and
              difficult journey. They have seen multiple providers, received conflicting information, and still
              do not feel well. Our practice was created for them, for the people who know something deeper is
              going on and want a team who will finally take the time to understand it.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              We believe that every patient deserves clarity, connection, and care that looks beyond symptoms.
              That belief shapes everything we do.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              Our care is delivered entirely through telehealth, making it possible for patients across the
              United States to receive thoughtful, comprehensive support from wherever they live.
            </p>
          </Reveal>

          {/* Stat strip — single glass card row with icon + counter + divider, modeled on the homepage's DoctorSpotlight stat strip */}
          <Reveal delay={0.1} className="mx-auto mt-14 max-w-3xl">
            <ul className="grid grid-cols-1 gap-6 rounded-card border border-gray bg-sage/60 p-6 shadow-card backdrop-blur-sm sm:grid-cols-3 sm:gap-4 sm:p-8">
              {STATS.map((stat, i) => (
                <li key={stat.label} className={`flex flex-col items-center gap-2 text-center ${i > 0 ? "sm:border-l sm:border-primary/15 sm:pl-4" : ""}`}>
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-primary shadow-card">
                    <Icon name={stat.icon} className="h-5 w-5" />
                  </span>
                  <p className="font-serif text-4xl font-semibold text-primary">
                    <Counter value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-sm text-ink-soft">{stat.label}</p>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Dr. Ian Hollaman */}
      <Section bg="cream-wash">
        <Container>
          <BioCard
            image={{ src: "/images/migrated/about-us/Untitled-design-29.png", alt: "Dr. Ian Hollaman" }}
            name="Meet Dr. Ian Hollaman"
            credentials="DC, MSc, FMCP"
            paragraphs={[
              "Dr. Ian Hollaman became passionate about functional medicine after facing his own health challenges during graduate school. After months of worsening symptoms and little clarity from multiple providers, he finally found a functional medicine doctor who looked deeper, connected the dots, and helped him understand what was truly going on. That experience reshaped both his health and his career path.",
              "For more than 16 years, Dr. Ian has helped patients with autoimmune, gastrointestinal, thyroid, and chronic conditions that have not improved with standard care. His approach combines advanced functional medicine, nutrition, supplementation, and lifestyle strategies to create personalized plans that match each patient's unique needs.",
              "Dr. Ian provides all care through virtual visits, allowing patients nationwide to access thorough, personalized support without leaving home.",
              "Dr. Ian is a chiropractic physician, holds a Master of Science in Human Nutrition and Functional Medicine, and earned his functional medicine certification through the Institute for Functional Medicine. He has lectured nationally and contributed to supplement product formulation, but patients most appreciate his ability to listen, explain clearly, and uncover what others have overlooked.",
              "Outside of practice, Dr. Ian enjoys life with his wife and four children west of Boulder, Colorado, and spends his free time in falconry, hunting, gardening, and soccer.",
            ]}
            reverse={false}
            badge="FMCP Certified"
          />
        </Container>
      </Section>

      {/* Stevie Chaddock */}
      <Section bg="white">
        <Container>
          <BioCard
            image={{ src: "/images/migrated/about-us/Untitled-design-28.png", alt: "Stevie Chaddock" }}
            name="Meet Stevie Chaddock"
            credentials="Metabolic Coordinator / Functional Nutritionist"
            paragraphs={[
              "Stevie Chaddock is a Functional Nutritional Therapy Practitioner and Clinical Nutritionist with a master's degree in Nutrition Science. She specializes in gut microbiome dysfunction and autoimmune conditions, bringing both clinical insight and genuine warmth to every patient interaction.",
              "Stevie believes that food is information, a reflection of physiology, habits, emotions, and lived experiences. With this perspective, she takes the time to understand not just what patients eat, but how and why they eat. Stevie uses this insight to create personalized nutrition strategies that feel supportive and realistic. Her approach is encouraging, practical, and compassionate, helping patients make steady progress with confidence. All of Stevie's nutrition visits are conducted remotely, giving patients flexible, convenient support throughout their care plan.",
              "Originally from the Midwest, Stevie now lives in Oregon with her husband and two children.",
            ]}
            reverse
            badge="FNTP Certified"
          />
        </Container>
      </Section>

      {/* Mission */}
      <Section bg="sage-mesh" className="relative overflow-hidden">
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 inline-flex">Our Mission</Badge>
            <h2>
              Our <Accent>Mission</Accent>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Our mission is to elevate how autoimmune, thyroid, and chronic conditions are understood and cared
              for. We believe patients deserve more time, deeper investigation, and personalized plans that
              reflect their unique physiology. Our focus is on providing clarity, connection, and long-term
              support, so you can finally understand what is driving your symptoms and what meaningful progress
              looks like for you.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Through our fully remote model, we make this level of support accessible to patients across the
              country.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Approach */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="primary" variant="orbs" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 inline-flex">Our Approach</Badge>
            <h2>
              Our Approach to <Accent>Functional Medicine</Accent>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              While our mission explains why we do this work, functional medicine is how we do it. Our approach
              is straightforward: we look at how your body is functioning as a whole system. This helps us
              understand why symptoms are appearing and what may be influencing them beneath the surface.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              We take into account your history, your lab findings, your daily habits, and the way your systems
              interact with one another. This gives us a clearer picture of what your body needs and helps us
              create a plan that is targeted, practical, and built specifically for you.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Because our care is fully virtual, we are able to evaluate complex cases and support patients
              consistently no matter where they are located.
            </p>
          </Reveal>

          {/* What makes our approach effective — icon draw-in stagger grid */}
          <div className="mx-auto mt-16 max-w-2xl text-center">
            <h3 className="text-2xl font-extrabold text-ink">What Makes Our Approach Effective</h3>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {APPROACH_PILLARS.map((pillar, i) => (
              <PillarCard key={pillar.title} pillar={pillar} index={i} />
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
            <h2 className="text-white">Meaningful Change Begins With a Conversation Grounded in Understanding</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              If you&rsquo;re ready to explore a path that looks at your health in a clearer, more comprehensive way,
              our team is here to listen, answer your questions, and help you understand what moving forward
              could look like. You do not have to navigate this alone &mdash; and this call is the easiest way to
              see whether our approach is the right fit for your needs and goals.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-white/85">
              Every step of this process takes place through secure telehealth visits, giving you access to a
              comprehensive team from the comfort of home.
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

function BioCard({
  image,
  name,
  credentials,
  paragraphs,
  reverse,
  badge,
}: {
  image: { src: string; alt: string };
  name: string;
  credentials: string;
  paragraphs: string[];
  reverse: boolean;
  badge: string;
}) {
  const reduce = useReducedMotion();
  return (
    <div className={`flex flex-col items-center gap-10 md:gap-14 lg:flex-row ${reverse ? "lg:flex-row-reverse" : ""}`}>
      <Reveal className="relative w-full max-w-xs shrink-0 lg:max-w-sm" y={reverse ? -20 : 20}>
        {/* Soft primary rectangle offset behind the portrait for depth — matches DoctorSpotlight's PortraitCard */}
        <div
          aria-hidden="true"
          className={`absolute -bottom-4 h-full w-full rounded-card bg-primary/12 ${reverse ? "-left-4" : "-right-4"}`}
        />
        {/* Dot grid accent */}
        <div
          aria-hidden="true"
          className={`absolute -top-4 h-24 w-24 rounded-full opacity-60 ${reverse ? "-right-4" : "-left-4"}`}
          style={{
            backgroundImage: "radial-gradient(circle, rgba(63,128,106,0.3) 1px, transparent 1px)",
            backgroundSize: "12px 12px",
          }}
        />
        <motion.div
          className="relative aspect-square overflow-hidden rounded-card border border-gray bg-sage shadow-card"
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 240, damping: 22 }}
        >
          <Image src={image.src} alt={image.alt} fill sizes="(min-width: 1024px) 384px, 320px" className="object-cover" />
        </motion.div>
        {/* Floating credential pill — bobs gently */}
        <motion.div
          aria-hidden="true"
          className={`glass absolute top-6 flex items-center gap-2 rounded-pill px-4 py-2 shadow-card ${reverse ? "-left-4 sm:-left-6" : "-right-4 sm:-right-6"}`}
          animate={reduce ? undefined : { y: [0, -5, 0] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Icon name="shield" className="h-4 w-4 text-primary" />
          <span className="text-xs font-medium text-ink">{badge}</span>
        </motion.div>
      </Reveal>
      <Reveal delay={0.1} className="flex-1">
        <div className="flex items-center gap-3">
          <span aria-hidden="true" className="h-px w-8 bg-primary/40" />
          <p className="font-mono text-sm uppercase tracking-[0.08em] text-primary">{credentials}</p>
        </div>
        <h2 className="mt-3">{name}</h2>
        <div className="mt-5 space-y-4">
          {paragraphs.map((p, i) => (
            <p key={i} className="text-base leading-relaxed text-ink-soft">
              {p}
            </p>
          ))}
        </div>
      </Reveal>
    </div>
  );
}

function PillarCard({ pillar, index }: { pillar: (typeof APPROACH_PILLARS)[number]; index: number }) {
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
        <Icon name={pillar.icon} className="h-6 w-6" />
      </motion.div>
      <h3 className="relative mt-4 text-lg font-extrabold text-ink">{pillar.title}</h3>
      <p className="relative mt-2 text-sm leading-relaxed text-ink-soft">{pillar.description}</p>
      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
      />
    </Reveal>
  );
}
