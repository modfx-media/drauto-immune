"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from "react";
import { motion, useInView, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import Accent from "@/components/ui/Accent";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import { HERO } from "@/content/home-content";
import GlowOrb from "./GlowOrb";

const EASE = [0.16, 1, 0.3, 1] as const;

// Position-only reveal (no opacity dip) — above-the-fold text must never be
// able to render invisible if a mount animation stalls (e.g. a throttled
// requestAnimationFrame on a backgrounded tab), so only `y` ever animates.
const fadeUp = {
  hidden: { y: 22 },
  visible: (delay = 0) => ({
    y: 0,
    transition: { duration: 0.7, delay, ease: EASE },
  }),
};

const headlineContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.045, delayChildren: 0.3 },
  },
};

// Small-offset word cascade (no opacity change, no clipping mask) — a full
// opacity/mask reveal can leave critical text invisible or clipped if a
// mount animation stalls, so only a small `y` offset is used here.
const wordVariant = {
  hidden: { y: 10 },
  visible: {
    y: 0,
    transition: { duration: 0.5, ease: EASE },
  },
};

/** Splits a string into motion-staggered word spans for a headline reveal. */
function AnimatedWords({ text, className = "" }: { text: string; className?: string }) {
  return (
    <>
      {text.split(" ").map((word, i) => (
        <motion.span key={`${word}-${i}`} variants={wordVariant} className={`inline-block ${className}`}>
          {word}
          {i < text.split(" ").length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </>
  );
}

/** A stat value that count-up animates its leading number when scrolled into view. */
function AnimatedStat({ value, delay }: { value: string; delay: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? Number(match[1]) : null;
  const suffix = match ? match[2] : "";

  const count = useMotionValue(0);
  const spring = useSpring(count, reduce ? { stiffness: 1000, damping: 100 } : { stiffness: 90, damping: 20 });
  const [display, setDisplay] = useState(target !== null ? 0 : null);

  useEffect(() => {
    if (target === null || !inView) return;
    count.set(target);
  }, [inView, target, count]);

  useEffect(() => {
    if (target === null) return undefined;
    const unsub = spring.on("change", (v) => setDisplay(Math.round(v)));
    return () => unsub();
  }, [spring, target]);

  return (
    <motion.span
      ref={ref}
      initial={{ scale: 0.85 }}
      animate={inView ? { scale: 1 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="accent-serif text-xl text-white sm:text-2xl"
    >
      {target !== null ? `${display}${suffix}` : value}
    </motion.span>
  );
}

/** Primary CTA with a subtle magnetic pull toward the cursor on hover. */
function MagneticCta() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 150, damping: 12, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 150, damping: 12, mass: 0.4 });
  const reduce = useReducedMotion();

  function handleMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.35);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.35);
  }

  function handleLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      className="inline-block"
    >
      <Button href={HERO.primaryCta.href} variant="primary" size="lg" className="uppercase tracking-wide">
        {HERO.primaryCta.label}
        <Icon name="arrow-right" className="h-4 w-4" />
      </Button>
    </motion.div>
  );
}

/** Icon shown on each floating badge around the video frame, keyed by tag text. */
const TAG_ICON: Record<string, IconName> = {
  "Wellness Services": "leaf",
  "Conditions We Support": "shield",
  "Thyroid Conditions": "target",
};

/** Destination page for each floating badge, keyed by tag text. */
const TAG_HREF: Record<string, string> = {
  "Wellness Services": "/wellness-services/",
  "Conditions We Support": "/conditions-we-support/",
  "Thyroid Conditions": "/thyroid-conditions/",
};

const BADGE_POSITION = [
  "-left-6 top-10 sm:-left-10",
  "-right-12 top-1/2 -translate-y-1/2 sm:-right-28",
  "-left-4 bottom-40 sm:-left-8",
] as const;

/**
 * A small glass badge that floats in near an edge of the video frame, then
 * gently bobs in place — a "science actively working" motion accent. Links
 * through to the relevant page. Position-only entrance (no opacity) so the
 * tag label is never invisible if the mount animation stalls; the idle bob
 * is decorative and loops indefinitely once settled.
 */
function FloatingBadge({ tag, index }: { tag: string; index: number }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={`absolute z-10 hidden sm:block ${BADGE_POSITION[index]}`}
      initial={{ y: 30, scale: 0.85 }}
      animate={{ y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay: 1.5 + index * 0.12, ease: EASE }}
    >
      <Link
        href={TAG_HREF[tag] ?? "/conditions-we-support/"}
        className="flex items-center gap-2 rounded-pill border border-white/60 bg-white/90 px-4 py-2.5 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/30 hover:bg-white hover:shadow-card-hover"
      >
        <motion.span
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
          animate={reduce ? {} : { y: [0, -5, 0] }}
          transition={{ duration: 3.2 + index * 0.4, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }}
        >
          <Icon name={TAG_ICON[tag] ?? "sparkles"} className="h-3.5 w-3.5" />
        </motion.span>
        <span className="whitespace-nowrap font-mono text-xs font-medium uppercase tracking-[0.06em] text-ink">
          {tag}
        </span>
      </Link>
    </motion.div>
  );
}

/**
 * Framed portrait panel: a rounded "specimen window" holding Dr. Ian
 * Hollaman's portrait, with a subtle cursor-reactive 3D tilt, a looping
 * glow-border pulse, and a floating years-of-experience badge. Contained
 * (not full-bleed) so the left copy column always sits on a clean,
 * legible solid background instead of competing with a busy image.
 */
function PortraitFrame() {
  const reduce = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springRotateX = useSpring(rotateX, { stiffness: 120, damping: 16 });
  const springRotateY = useSpring(rotateY, { stiffness: 120, damping: 16 });

  function handleMove(e: ReactMouseEvent<HTMLDivElement>) {
    if (reduce) return;
    const rect = e.currentTarget.getBoundingClientRect();
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
    rotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
  }

  function handleLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="relative w-full max-w-md">
      {/* Glow backdrop — purely decorative, safe to fade/pulse */}
      <motion.div
        aria-hidden="true"
        className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-primary/50 via-sage/30 to-primary/50 blur-2xl"
        animate={reduce ? { opacity: 0.5 } : { opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        style={{ rotateX: springRotateX, rotateY: springRotateY, transformPerspective: 800 }}
        initial={{ y: 28, scale: 0.94 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
        className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] border border-white/15 shadow-2xl"
      >
        <Image
          src="/images/team/ian-hollaman-hero-portrait.webp"
          alt="Dr. Ian Hollaman, DC, MSc, FMCP"
          fill
          sizes="(min-width: 1024px) 448px, 100vw"
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/15 to-transparent" />
        <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10" />

        {/* Name, title, credentials, and years-of-experience — highlights who he is and his experience */}
        <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-3">
          <div>
            <p className="font-mono text-[0.65rem] font-medium uppercase tracking-[0.14em] text-sage">
              Founder &middot; Lead Practitioner
            </p>
            <p className="mt-1 text-lg font-medium leading-tight text-white sm:text-xl">Dr. Ian Hollaman</p>
            <p className="text-xs text-white/70">DC, MSc, FMCP</p>
          </div>
          <div className="flex shrink-0 items-center gap-2 rounded-pill border border-white/60 bg-white/90 px-3.5 py-2 shadow-card backdrop-blur-md">
            <span className="accent-serif text-lg leading-none text-primary">17+</span>
            <span className="text-[0.65rem] font-medium leading-tight text-ink">
              Years
              <br />
              Experience
            </span>
          </div>
        </div>
      </motion.div>

      {/* Floating credential pill — reinforces his experience alongside the tag badges */}
      <motion.div
        className="absolute -top-4 right-8 hidden items-center gap-2 rounded-pill border border-white/60 bg-white/90 px-4 py-2 shadow-card backdrop-blur-md sm:flex"
        initial={{ y: 20, scale: 0.85 }}
        animate={reduce ? { y: 0, scale: 1 } : { y: [0, -5, 0], scale: 1 }}
        transition={
          reduce
            ? { duration: 0.6, delay: 0.9, ease: EASE }
            : { y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay: 1.1 }, scale: { duration: 0.6, delay: 0.9, ease: EASE } }
        }
      >
        <Icon name="shield" className="h-3.5 w-3.5 text-primary" />
        <span className="text-xs font-medium text-ink">FMCP Certified</span>
      </motion.div>

      {HERO.tags.map((tag, i) => (
        <FloatingBadge key={tag} tag={tag} index={i} />
      ))}
    </div>
  );
}

/**
 * Full-bleed, continuously looping ambient background video for the whole
 * hero section (behind both columns). Dimmed with a dark gradient overlay
 * so the white copy column and the specimen-window video on the right both
 * stay legible/uncompeted-with. Paused for `prefers-reduced-motion`; the
 * poster frame covers the paint before the video is ready either way.
 */
function HeroBackgroundVideo() {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    if (reduce) {
      video.pause();
    } else {
      video.play().catch(() => {
        // Autoplay can be blocked by the browser — the poster frame still
        // renders, so there's no broken/empty state either way.
      });
    }
  }, [reduce]);

  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        poster="/images/hero-bg-poster.jpg"
        autoPlay={!reduce}
        muted
        loop
        playsInline
        preload="auto"
      >
        <source src="/videos/home-bg-video.mp4" type="video/mp4" />
      </video>
      {/* Side-weighted scrim: dark under the copy column on the left,
          nearly transparent on the right so the video texture is clearly
          visible behind/around the specimen-window panel. */}
      <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/55 to-ink/15" />
      {/* Very light top/bottom vignette for depth — does not obscure the video. */}
      <div className="absolute inset-0 bg-gradient-to-b from-ink/25 via-transparent to-ink/35" />
    </div>
  );
}

/**
 * Asymmetric split hero: a clean solid-brand copy column on the left
 * (headline, mission, CTAs, stat list) paired with a contained, glowing
 * "specimen window" video panel on the right showing an antibody/virus
 * particle animation, with floating tag badges orbiting its frame — built
 * so the busy video stays contained instead of full-bleed, keeping the
 * copy on a clean, legible background. All entrance motion respects
 * `prefers-reduced-motion`.
 */
export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-ink">
      {/* Continuous ambient background video, dimmed behind the whole section */}
      <HeroBackgroundVideo />
      {/* Decorative atmosphere — grid texture + soft glow orbs, all decorative-only */}
      <div aria-hidden="true" className="absolute inset-0 bg-grid-pattern opacity-[0.05]" />
      <GlowOrb className="-left-32 -top-32" color="primary" size={480} delay={0.2} />
      <GlowOrb className="-bottom-40 -right-20 hidden lg:block" color="sage" size={380} delay={0.4} />

      <Container className="relative flex flex-col gap-14 py-20 lg:flex-row lg:items-center lg:gap-10 lg:py-28 xl:gap-16">
        {/* Left: copy column */}
        <div className="flex flex-col items-start gap-6 text-left lg:w-[54%]">
          <motion.div
            className="flex flex-wrap gap-2"
            initial="hidden"
            animate="visible"
            variants={{ visible: { transition: { staggerChildren: 0.08 } } }}
          >
            {HERO.tags.map((tag) => (
              <motion.span
                key={tag}
                variants={fadeUp}
                className="inline-flex items-center rounded-pill border border-white/25 bg-white/10 px-3 py-1 font-mono text-xs font-medium uppercase tracking-[0.08em] text-white backdrop-blur-sm"
              >
                {tag}
              </motion.span>
            ))}
          </motion.div>

          <motion.h1
            className="text-4xl text-white sm:text-5xl xl:text-6xl"
            initial="hidden"
            animate="visible"
            variants={headlineContainer}
          >
            <AnimatedWords text="We Are" />{" "}
            <Accent tone="sage" as="span">
              <AnimatedWords text="Autoimmune Wellness" />
            </Accent>{" "}
            <AnimatedWords text="Specialists" />
          </motion.h1>

          <motion.p
            className="font-mono text-sm font-medium uppercase tracking-[0.1em] text-white/70"
            custom={0.55}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {HERO.eyebrow}
          </motion.p>

          <motion.p
            className="max-w-lg text-lg text-white/85"
            custom={0.65}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            {HERO.mission}
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            custom={0.78}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
          >
            <MagneticCta />
            <Link
              href={HERO.secondaryCta.href}
              className="inline-flex items-center justify-center gap-2 rounded-pill border border-white/40 px-8 py-4 text-base font-medium text-white transition-all duration-300 hover:-translate-y-0.5 hover:border-white hover:bg-white/10"
            >
              {HERO.secondaryCta.label}
            </Link>
          </motion.div>

          {/* Stat list — minimalist, divided by a top rule, no card chrome */}
          <motion.div
            className="mt-4 flex w-full flex-wrap gap-x-8 gap-y-5 border-t border-white/15 pt-6"
            initial={{ y: 20 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, amount: 0.6 }}
            transition={{ duration: 0.6, delay: 0.1, ease: EASE }}
          >
            {HERO.stats.map((stat, i) => (
              <div key={stat.label} className="flex flex-col gap-0.5">
                <AnimatedStat value={stat.value} delay={0.15 + i * 0.08} />
                <span className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-white/55">
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: framed portrait panel */}
        <div className="flex w-full justify-center lg:w-[46%] lg:justify-end">
          <PortraitFrame />
        </div>
      </Container>
    </section>
  );
}

