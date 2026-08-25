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

const INTERVIEWS = [
  {
    show: "The Evan Brand Show",
    title: "Top 8 Influencers of Leaky Gut and Autoimmunity",
    description:
      "Dr. Ian joins Evan Brand to break down the top drivers of leaky gut and autoimmune activity, sharing practical insights on inflammation, immune triggers, and how gut dysfunction evolves into chronic symptoms.",
    image: "/images/migrated/featured-interviews/original-1-2.webp",
    cta: "Listen Now",
    href: "https://podcasters.spotify.com/pod/show/evan-brand-show/episodes/Top-8-Influencers-of-Leaky-Gut-and-Autoimmunity-with-Dr--Ian-Hollaman-e2jfb1c",
  },
  {
    show: "The Autoimmune Hour with Sharon Sayler",
    title: "Understanding Root Causes Behind Autoimmune Symptoms",
    description:
      "In this conversation with Sharon Sayler, Dr. Ian explains how stress, diet, toxins, mold and blood sugar imbalances contribute to autoimmune issues, and why intestinal permeability is often overlooked.",
    image: "/images/migrated/featured-interviews/original.webp",
    cta: "Listen Now",
    href: "https://www.spreaker.com/episode/uncovering-the-root-causes-of-your-autoimmune-issues--43857027",
  },
  {
    show: "The Perfect Stool with Lindsey Parsons",
    title: "Gut Health, Autoimmunity & Intestinal Hyperpermeability",
    description:
      "Dr. Ian discusses the connection between gut health, hormones, anemia, gluten sensitivity, estrogen detox, adrenal function and autoimmune expression, offering a clear look at how gut-driven patterns develop.",
    image: "/images/migrated/featured-interviews/large.webp",
    cta: "Listen Now",
    href: "https://open.spotify.com/episode/6HUdnQ7dWOdQVP3L4eJqIl",
  },
  {
    show: "Christian Natural Health with Dr. Lauren Deville",
    title: "Natural Strategies for Supporting Chronic Health Concerns",
    description:
      "Dr. Ian joins Dr. Deville to explore natural approaches to supporting thyroid, gut, and immune balance through evidence-informed functional medicine and lifestyle support.",
    image: "/images/migrated/featured-interviews/large-2.webp",
    cta: "Audio 2",
    href: "https://drautoimmune.com/podcasts/Dr_Ian_Hollaman.mp3",
  },
];

const FOCUS_AREAS: { title: string; icon: IconName }[] = [
  { title: "Autoimmune drivers and inflammatory patterns", icon: "shield" },
  { title: "Thyroid function and Hashimoto's", icon: "target" },
  { title: "Gut health, microbiome imbalance and intestinal hyperpermeability", icon: "leaf" },
  { title: "Chronic inflammation and immune dysregulation", icon: "heart-pulse" },
  { title: "Functional blood chemistry analysis", icon: "stethoscope" },
  { title: "Hormone and adrenal imbalances", icon: "compass" },
];

export default function FeaturedInterviewsPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Featured Interviews"
        title="Featured Interviews with Dr. Ian Hollaman, DC, MSc, FMCP"
        accent="Featured Interviews"
        subhead="Conversations on autoimmunity, gut health, thyroid function, chronic inflammation, and root-cause care."
        image={{ src: "/images/team/ian-hollaman-portrait.png", alt: "Dr. Ian Hollaman portrait", position: "center 20%" }}
      />

      {/* Intro */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <Badge className="mb-2 inline-flex">Media &amp; Podcasts</Badge>
            <p className="text-lg leading-relaxed text-ink-soft">
              Dr. Ian is regularly invited onto podcasts and health programs across the country to share his
              clinical insight and experience working with complex autoimmune and chronic conditions. These
              interviews offer a deeper look into the patterns, drivers, and practical steps that patients and
              providers often overlook. Explore his most recent conversations below.
            </p>
            <p className="text-base italic text-ink-soft">All interviews are available to listen to directly from this page.</p>
          </Reveal>
        </Container>
      </Section>

      {/* Interview timeline — alternating zig-zag cards along a center rail */}
      <Section bg="cream-wash" className="relative overflow-hidden">
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Latest Conversations</Badge>
            <h2>
              Featured <Accent>Interviews</Accent> Timeline
            </h2>
          </Reveal>

          <div className="relative mt-16">
            <TimelineRail count={INTERVIEWS.length} />
            <div className="space-y-16 md:space-y-24">
              {INTERVIEWS.map((item, i) => (
                <TimelineItem key={item.title} item={item} index={i} />
              ))}
            </div>
          </div>
        </Container>
      </Section>


      {/* Topics */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="primary" variant="orbs" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 inline-flex">Key Areas of Focus</Badge>
            <h2>
              Topics Dr. Ian Often <Accent>Discusses</Accent>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ink-soft">
              Across his interviews, Dr. Ian explores a range of topics that help listeners understand the
              deeper patterns behind chronic and autoimmune concerns.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {FOCUS_AREAS.map((area, i) => (
              <FocusCard key={area.title} area={area} index={i} />
            ))}
          </div>

          <Reveal className="mx-auto mt-10 max-w-xl rounded-card border border-gray bg-sage p-6 text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">Our Methodology</p>
            <p className="mt-2 text-base font-medium text-ink">Nutrition, lifestyle and root-cause strategies</p>
          </Reveal>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section bg="primary" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Ready to Explore Your Next Step?</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              If these conversations helped you see your health in a new light, a discovery call can help you
              understand what moving forward might look like. It is a no-pressure chance to meet our remote
              care team, ask questions, and explore whether our approach feels right for you.
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

/** Dashed vertical rail running behind the timeline items — draws in top-to-bottom on scroll. */
function TimelineRail({ count }: { count: number }) {
  const reduce = useReducedMotion();
  return (
    <div
      aria-hidden="true"
      className="absolute left-6 top-0 bottom-0 w-px md:left-1/2 md:-translate-x-1/2"
      style={{ display: count > 0 ? undefined : "none" }}
    >
      <motion.div
        className="h-full w-full origin-top"
        style={{
          background:
            "repeating-linear-gradient(to bottom, rgba(63,128,106,0.35) 0 6px, transparent 6px 12px)",
        }}
        initial={{ scaleY: reduce ? 1 : 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.4, ease: EASE }}
      />
    </div>
  );
}

/** One zig-zag timeline entry: numbered marker on the rail + thumbnail + content card, alternating sides on desktop. */
function TimelineItem({ item, index }: { item: (typeof INTERVIEWS)[number]; index: number }) {
  const reduce = useReducedMotion();
  const isEven = index % 2 === 0;

  return (
    <Reveal delay={index * 0.1} className="relative pl-20 md:pl-0">
      {/* Numbered marker on the rail */}
      <motion.span
        className="absolute left-6 top-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-primary shadow-card ring-[6px] ring-[color-mix(in_srgb,var(--sage)_18%,var(--white))] md:left-1/2 md:top-1/2 md:-translate-y-1/2"
        initial={reduce ? undefined : { scale: 0.6 }}
        whileInView={reduce ? undefined : { scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 + 0.15, type: "spring", stiffness: 220 }}
      >
        <span className="accent-serif text-lg leading-none">{index + 1}</span>
      </motion.span>

      <div className="md:grid md:grid-cols-2 md:items-center md:gap-16">
        {/* Thumbnail */}
        <div className={isEven ? "md:order-1" : "md:order-2"}>
          <div className="group relative aspect-[16/10] overflow-hidden rounded-card border border-gray shadow-card">
            <motion.div
              whileHover={{ scale: 1.06 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="relative h-full w-full"
            >
              <Image src={item.image} alt={item.show} fill sizes="(min-width: 768px) 40vw, 100vw" className="object-cover" />
            </motion.div>
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/15 to-transparent" />
            <span className="absolute left-4 top-4 rounded-pill bg-primary/90 px-3 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-white backdrop-blur-sm">
              Episode {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        </div>

        {/* Content card */}
        <div className={isEven ? "mt-6 md:order-2 md:mt-0" : "mt-6 md:order-1 md:mt-0"}>
          <div className="rounded-card border border-gray bg-white p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">{item.show}</p>
            <h3 className="mt-2 text-lg font-extrabold text-ink">{item.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>
            <div className="mt-5">
              <Button href={item.href} target="_blank" rel="noopener noreferrer" variant="secondary" size="sm">
                {item.cta}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function FocusCard({ area, index }: { area: { title: string; icon: IconName }; index: number }) {
  const reduce = useReducedMotion();
  return (
    <Reveal delay={index * 0.06} className="group flex items-center gap-4 rounded-card border border-gray bg-white p-5 shadow-card transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover">
      <motion.div
        initial={reduce ? undefined : { scale: 0, rotate: -20 }}
        whileInView={{ scale: 1, rotate: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.5, delay: index * 0.06 + 0.1, ease: EASE }}
        className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-sage text-primary transition-colors group-hover:bg-primary group-hover:text-white"
      >
        <Icon name={area.icon} className="h-5 w-5" />
      </motion.div>
      <p className="text-sm font-medium text-ink">{area.title}</p>
    </Reveal>
  );
}
