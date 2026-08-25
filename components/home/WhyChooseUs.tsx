"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import { WHY_CHOOSE_US } from "@/content/home-content";
import Reveal from "./Reveal";

const EASE = [0.22, 1, 0.36, 1] as const;
const ICON_BY_INDEX: readonly IconName[] = [
  "target",
  "heart-pulse",
  "users",
  "globe",
  "trending-up",
];

/**
 * Why Choose Us — a vertical timeline that visually connects the five
 * differentiators with a central animated rail. On desktop the rail
 * sits down the middle and cards alternate left/right; on mobile a
 * single left-rail lets cards flow down the right side. Rail fills as
 * you scroll through the section (Framer `useScroll` +
 * `useTransform`); each node scales in and its card slides in from the
 * matching side. Ambient drift-blobs behind everything for atmosphere.
 */
export default function WhyChooseUs() {
  const items = WHY_CHOOSE_US.items;
  const reduce = useReducedMotion();

  // Scroll-driven fill for the rail: 0 → 1 as the timeline
  // section moves through the middle of the viewport.
  const timelineRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 80%", "end 20%"],
  });
  const railFill = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section bg="sage-mesh" className="relative overflow-hidden">
      {/* Ambient tint blobs */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 top-24 h-72 w-72 rounded-full blur-3xl"
        style={{ background: "rgba(63,128,106,0.14)" }}
        animate={reduce ? undefined : { y: [0, 20, 0], x: [0, 8, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute -right-16 bottom-16 h-80 w-80 rounded-full blur-3xl"
        style={{ background: "rgba(63,128,106,0.10)" }}
        animate={reduce ? undefined : { y: [0, -22, 0], x: [0, -10, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 inline-flex">Why Us</Badge>
          <h2>
            Why <Accent>Choose Us</Accent>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            A different kind of practice, built around your body, your history, and your goals.
          </p>
          {/* Quick-fact pills */}
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {[
              { icon: "target" as const, label: "Root-cause driven" },
              { icon: "globe" as const, label: "100% remote" },
              { icon: "users" as const, label: "Dedicated care team" },
              { icon: "trending-up" as const, label: "Data-guided care" },
            ].map((p) => (
              <li key={p.label}>
                <span className="inline-flex items-center gap-1.5 rounded-pill border border-primary/20 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-card">
                  <Icon name={p.icon} className="h-3.5 w-3.5 text-primary" />
                  {p.label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Timeline */}
        <div ref={timelineRef} className="relative mx-auto mt-16 max-w-4xl">
          {/*
            Rail — a thin vertical track down the middle on desktop and
            offset to the left on mobile. Two layers: a dim static rail
            + an overlaid animated fill whose height maps to scroll
            progress through this section.
          */}
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-6 w-[2px] rounded-full bg-primary/15 md:left-1/2 md:-translate-x-1/2"
          />
          <motion.div
            aria-hidden="true"
            className="absolute inset-y-0 left-6 w-[2px] origin-top rounded-full bg-gradient-to-b from-primary via-primary to-primary/40 md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: railFill }}
          />

          <ul className="flex flex-col gap-14 md:gap-16">
            {items.map((item, i) => (
              <TimelineNode
                key={item.title}
                index={i}
                total={items.length}
                item={item}
                iconName={ICON_BY_INDEX[i % ICON_BY_INDEX.length]}
                reduce={!!reduce}
              />
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}

function TimelineNode({
  index,
  total,
  item,
  iconName,
  reduce,
}: {
  index: number;
  total: number;
  item: (typeof WHY_CHOOSE_US.items)[number];
  iconName: IconName;
  reduce: boolean;
}) {
  const num = String(index + 1).padStart(2, "0");
  // Alternate sides on desktop; mobile always flows to the right of the rail.
  const isLeft = index % 2 === 0;

  return (
    <li className="relative flex items-start pl-16 md:pl-0">
      {/* Node marker — sits ON the rail */}
      <motion.span
        initial={reduce ? undefined : { scale: 0.4, opacity: 0 }}
        whileInView={reduce ? undefined : { scale: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.45, delay: 0.05, type: "spring", stiffness: 220 }}
        className="absolute left-6 top-6 z-10 flex h-12 w-12 -translate-x-1/2 items-center justify-center rounded-full bg-white text-primary shadow-card ring-[6px] ring-sage md:left-1/2"
      >
        <Icon name={iconName} className="h-5 w-5" />
      </motion.span>

      {/* Number label alongside the node */}
      <span
        aria-hidden="true"
        className={`absolute top-6 hidden accent-serif text-2xl leading-none text-primary/40 md:block ${
          isLeft ? "left-[calc(50%+2.75rem)]" : "right-[calc(50%+2.75rem)]"
        }`}
      >
        {num}
      </span>

      {/* Content card — alternates sides on desktop, single-column on mobile */}
      <motion.div
        initial={reduce ? undefined : { x: isLeft ? -24 : 24 }}
        whileInView={reduce ? undefined : { x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.55, delay: 0.15, ease: EASE }}
        className={`w-full md:w-[calc(50%-3.5rem)] ${isLeft ? "md:mr-auto md:pr-4" : "md:ml-auto md:pl-4"}`}
      >
        <motion.div
          whileHover={reduce ? undefined : { y: -4 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="group relative overflow-hidden rounded-card border border-gray bg-white p-6 shadow-card sm:p-7"
        >
          {/* Small number pill visible on mobile (where the side-number
              is hidden) */}
          <span className="mb-3 inline-flex items-center gap-2 rounded-pill bg-primary/10 px-3 py-1 font-mono text-[0.6rem] font-medium uppercase tracking-[0.12em] text-primary md:hidden">
            Step {num} · of {String(total).padStart(2, "0")}
          </span>

          <h3 className="text-xl font-extrabold leading-tight text-ink sm:text-2xl">
            {item.title}
          </h3>
          <p className="mt-3 text-sm leading-relaxed text-ink-soft">{item.description}</p>

          {/* Bottom accent line drawn in on hover */}
          <span
            aria-hidden="true"
            className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
          />

          {/* Faint connector chip on the card side matching the rail */}
          <span
            aria-hidden="true"
            className={`absolute top-8 hidden h-px w-6 bg-primary/25 md:block ${
              isLeft ? "right-0 translate-x-full" : "left-0 -translate-x-full"
            }`}
          />
        </motion.div>
      </motion.div>
    </li>
  );
}

