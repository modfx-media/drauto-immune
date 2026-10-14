"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Accent from "./Accent";
import Container from "./Container";

const EASE = [0.22, 1, 0.36, 1] as const;

interface InnerPageHeroProps {
  /** Small uppercase caption under the headline, e.g. "Conditions We Support". */
  eyebrow?: string;
  title: string;
  /**
   * A contiguous substring of `title` to render in the italic serif
   * "accent" style (matches the homepage Hero's "Autoimmune Wellness"
   * treatment). Must match `title` exactly; omit to render the whole
   * title in the plain white style.
   */
  accent?: string;
  /** Optional single-line supporting copy under the headline. */
  subhead?: string;
  /**
   * Optional decorative photo (e.g. a condition page's intro image) shown
   * as a duotone background instead of the flat gradient — consolidates
   * what used to be a separate photo banner directly under the hero into
   * one hero band, matching the live site's single-hero layout.
   */
  image?: {
    src: string;
    alt: string;
    /** CSS `object-position` override — use for portraits where the subject isn't centered in the source frame. */
    position?: string;
    /** Pre-darken scrim strength (0–1) over the photo, before the duotone tint. Defaults to 0.45; raise for busy/bright photos that need more contrast behind the headline. */
    dim?: number;
  };
  /** Renders the site wordmark as a centered white watermark in the background instead of a photo. Ignored if `image` is set. */
  logo?: boolean;
}

/** Renders `title` with the `accent` substring (if present) styled via `Accent`. */
function Headline({ title, accent }: { title: string; accent?: string }) {
  if (!accent) return <>{title}</>;
  const index = title.indexOf(accent);
  if (index === -1) return <>{title}</>;
  const before = title.slice(0, index);
  const after = title.slice(index + accent.length);
  return (
    <>
      {before}
      <Accent tone="sage" as="span">
        {accent}
      </Accent>
      {after}
    </>
  );
}

/**
 * Shared full-width inner-page hero band — dark charcoal/sage gradient
 * with a subtle checkered grid pattern overlay, large centered headline
 * (optionally with an italic serif `accent` phrase, matching the homepage
 * Hero's "Autoimmune Wellness" treatment) and a mono-caps caption below
 * it, + optional one-line subhead. Fades/slides up on load with Framer
 * Motion; respects `prefers-reduced-motion` by rendering in its final,
 * settled state immediately instead of animating.
 */
export default function InnerPageHero({ eyebrow, title, accent, subhead, image, logo }: InnerPageHeroProps) {
  const reduce = useReducedMotion();

  return (
    <section className="relative overflow-hidden py-section-xl md:py-section-2xl">
      {image && (
        <div
          // Decorative when alt is empty; otherwise expose the image to AT/SEO.
          aria-hidden={image.alt ? undefined : true}
          className="absolute inset-0"
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="100vw"
            className="object-cover"
            style={{ objectPosition: image.position ?? "center" }}
            priority
          />
          {/* Pre-darkens the photo (independent of the tint below) so text stays legible regardless of how bright the source photo is. */}
          <div className="absolute inset-0 bg-black" style={{ opacity: image.dim ?? 0.45 }} />
        </div>
      )}

      {/* Base gradient — doubles as a duotone tint over `image` (`color`
          blend keeps the photo's own luminosity so bright/high-key photos
          stay visible, unlike `multiply` which washes bright areas out to
          a flat gradient) so a supplied photo reads as an on-brand tinted
          backdrop instead of a separate banner stacked below the hero. */}
      <div
        aria-hidden="true"
        className={`absolute inset-0 bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)] ${
          image ? "mix-blend-color" : ""
        }`}
      />

      {/* Rendered above the opaque base gradient (not below it) so the
          watermark isn't fully painted over — the gradient has no blend
          mode of its own in logo mode, so it would otherwise hide anything
          stacked beneath it. */}
      {!image && logo && (
        <div aria-hidden="true" className="absolute inset-0 flex items-center justify-center opacity-25">
          <Image
            src="/images/logo/logo-png.webp"
            alt=""
            width={441}
            height={79}
            priority
            className="h-auto w-2/3 max-w-md brightness-0 invert"
          />
        </div>
      )}

      {/* Checkered grid pattern overlay — a clean, modern alternative to a
          photo background. Blended with `mix-blend-overlay` (instead of a
          flat white layer) and faded out toward the edges with a radial
          mask so it reads as a soft texture merging into the gradient
          rather than a hard, uniformly-visible grid of boxes. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 85%)",
        }}
      />

      {/* Ambient glow orbs — purely decorative, matches the homepage's glow language. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
      />

      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            <Headline title={title} accent={accent} />
          </h1>
          {eyebrow && (
            <p className="mt-4 font-mono text-xs font-medium uppercase tracking-[0.12em] text-white/70 sm:text-sm">
              {eyebrow}
            </p>
          )}
          {subhead && <p className="mx-auto mt-5 max-w-2xl text-lg text-white/80 md:text-xl">{subhead}</p>}
        </motion.div>
      </Container>
    </section>
  );
}

