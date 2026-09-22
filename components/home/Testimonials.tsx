"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Link from "next/link";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import Section from "@/components/ui/Section";
import type { GoogleReview } from "@/lib/reviews";
import { TESTIMONIALS } from "@/content/home-content";
import SectionAmbient from "./SectionAmbient";
import Reveal from "./Reveal";

interface TestimonialsProps {
  /** Real 5-star Google reviews, already filtered (`isFiveStarReview`). */
  items: GoogleReview[];
  /** Google's overall rating (all stars) — 0 when unverified/unknown. */
  rating: number;
  /** Google's total review count (all stars) — 0 when unverified/unknown. */
  reviewCount: number;
  /** "View all Google reviews" destination — the business's Google Maps URI. */
  reviewsUrl: string;
}

/** Quotes longer than this get clamped on the card, with a "Read more" link. */
const QUOTE_CLAMP_CHARS = 130;

/**
 * Testimonials — Google-review-style cards, two marquee rows scrolling
 * in opposite directions. Each compact card has: reviewer avatar (initials
 * on a primary-tint disc), name + "N months ago" + verified check, a
 * 5-star row, a clamped quote with a "Read more" link for longer reviews
 * (opens the full text in a modal), and a subtle "Google" mark in the
 * corner. The marquee animation respects `useReducedMotion` (stops the
 * loop and lets the CSS scroll-snap behavior take over for keyboard users).
 *
 * Data is passed in from `app/page.tsx` via `getDisplayedGoogleReviews()`
 * (see `lib/google-reviews.ts`) — every card here already passed
 * `isFiveStarReview`. Returns `null` when there are no 5-star reviews to
 * show, per the "empty list hides the section" rule.
 */
export default function Testimonials({ items, rating, reviewCount, reviewsUrl }: TestimonialsProps) {
  const reduce = useReducedMotion();
  const [activeReview, setActiveReview] = useState<GoogleReview | null>(null);

  if (items.length === 0) return null;

  // Below this many reviews, a scrolling marquee has too short a loop —
  // on a wide viewport you'd see a card and its looped clone on screen at
  // the same time, which reads as a duplicate review. Fall back to a
  // plain static grid instead (no cloning, no chance of a visible repeat).
  const useMarquee = items.length >= 5;

  // Each row uses the FULL, unique review set (never split into disjoint
  // halves) so every card appears exactly once per row before the loop
  // repeats — rowB reuses the same reviews in reverse order purely for
  // visual variety, not different data. `MarqueeRow` internally clones
  // this once (industry-standard technique for a seamless CSS loop), but
  // because the unique segment is the full list, the clone only becomes
  // visible after scrolling past every review — not while sitting still.
  const rowA = items;
  const rowB = [...items].reverse();
  const displayCount = reviewCount || items.length;

  return (
    <Section bg="sage-mesh" className="relative overflow-hidden">
      <SectionAmbient tone="sage" variant="orbs" />

      <Container className="relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge className="mb-4 inline-flex">Patient Reviews</Badge>
          <h2>
            {TESTIMONIALS.heading.split("Real Patients")[0]}
            <Accent>Real Patients</Accent>
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink-soft">
            {TESTIMONIALS.intro}
          </p>

          {/* Aggregate rating pill row (Google's real overall numbers) */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-pill border border-gray bg-white px-4 py-2 shadow-card transition-shadow hover:shadow-card-hover"
            >
              <GoogleGlyph className="h-4 w-4" />
              {rating > 0 && (
                <>
                  <span className="text-sm font-semibold text-ink">{rating.toFixed(1)}</span>
                  <StarRow rating={Math.round(rating)} className="h-3.5 w-3.5" />
                </>
              )}
              <span className="text-xs text-ink-soft">
                {displayCount} Google review{displayCount === 1 ? "" : "s"}
              </span>
            </a>
            <a
              href={reviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-pill border border-gray bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-card transition-shadow hover:shadow-card-hover"
            >
              <Icon name="check-circle" className="h-3.5 w-3.5 text-primary" />
              View all Google reviews
            </a>
          </div>
        </Reveal>
      </Container>

      {useMarquee ? (
        /* Two marquee rows, full-bleed (escape the container to give a
           true infinite-scroll feel; edge fades on the container edges
           keep the effect polished). */
        <div className="relative mt-14 space-y-5">
          <MarqueeRow items={rowA} direction="left" reduce={!!reduce} onReadMore={setActiveReview} />
          <MarqueeRow
            items={rowB}
            direction="right"
            reduce={!!reduce}
            delayOffset={-15}
            onReadMore={setActiveReview}
          />

          {/* Left / right fade masks so cards ease off-screen instead of
              hard-cropping at the viewport edge. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-sage to-transparent"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-sage to-transparent"
          />
        </div>
      ) : (
        /* Too few reviews for a seamless marquee loop — a static grid
           avoids cloning cards (and therefore any chance of a visible
           duplicate) entirely. */
        <Container className="relative mt-14">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <ReviewCard key={item.name + item.quote} item={item} onReadMore={setActiveReview} />
            ))}
          </div>
        </Container>
      )}

      <Container className="relative mt-14">
        <Reveal className="flex flex-col items-center gap-4 text-center">
          <p className="max-w-md text-base italic text-ink-soft">
            {TESTIMONIALS.cta.label}
          </p>
          <Button href={TESTIMONIALS.cta.href} variant="primary" size="md" className="uppercase tracking-wide">
            Book your Discovery Call
          </Button>
        </Reveal>
      </Container>

      <ReviewModal review={activeReview} onClose={() => setActiveReview(null)} />
    </Section>
  );
}

function MarqueeRow({
  items,
  direction,
  reduce,
  delayOffset = 0,
  onReadMore,
}: {
  items: readonly GoogleReview[];
  direction: "left" | "right";
  reduce: boolean;
  delayOffset?: number;
  onReadMore: (review: GoogleReview) => void;
}) {
  // Duplicate the items so the marquee can loop seamlessly.
  const doubled = [...items, ...items];
  // Slow, unhurried loop — long duration relative to the row's width.
  // `delayOffset` gives each row a slightly different speed so the two
  // rows don't drift in perfect sync.
  const duration = 95 + delayOffset;

  // Plain CSS animation (not framer's `animate` prop): this lets the
  // hover pause freeze the row at its exact current position via
  // `animation-play-state: paused`, then resume from that same spot —
  // no restart, no snap-back to the start of the loop. The duration is a
  // JS value, so it's passed through a CSS variable (Tailwind's arbitrary
  // classes are statically scanned and can't contain interpolated text).
  const animationClass = reduce
    ? ""
    : direction === "left"
      ? "animate-[marquee-scroll_var(--marquee-duration)_linear_infinite]"
      : "animate-[marquee-scroll_var(--marquee-duration)_linear_infinite_reverse]";

  return (
    <div className="group relative overflow-hidden">
      <ul
        className={`flex w-max gap-4 ${animationClass} hover:[animation-play-state:paused] focus-within:[animation-play-state:paused]`}
        style={{ "--marquee-duration": `${duration}s` } as CSSProperties}
      >
        {doubled.map((item, i) => (
          <li key={`${item.name}-${i}`} className="w-[240px] shrink-0 sm:w-[260px]">
            <ReviewCard item={item} onReadMore={onReadMore} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function ReviewCard({
  item,
  onReadMore,
}: {
  item: GoogleReview;
  onReadMore: (review: GoogleReview) => void;
}) {
  const initials = item.name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const isLong = item.quote.length > QUOTE_CLAMP_CHARS;

  return (
    <article className="relative flex h-full flex-col gap-3 rounded-card border border-gray bg-white p-4 shadow-card transition-[transform,box-shadow] duration-300 hover:-translate-y-1.5 hover:scale-[1.04] hover:shadow-card-hover hover:z-10">
      {/* Header row: avatar + name/date + Google glyph */}
      <div className="flex items-start gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-xs font-semibold text-primary">
          {initials}
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="truncate text-sm font-semibold text-ink">{item.name}</p>
            <span aria-label="Verified Google review" title="Verified Google review">
              <VerifiedGlyph className="h-3.5 w-3.5 text-primary" />
            </span>
          </div>
          <p className="text-xs text-ink-soft">{item.relativeTime ?? "Posted on Google"}</p>
        </div>
        <GoogleGlyph className="h-3.5 w-3.5 shrink-0 opacity-60" />
      </div>

      {/* Star row + explicit numeric rating */}
      <div className="flex items-center gap-1.5">
        <StarRow rating={item.rating} className="h-3.5 w-3.5" />
        <span className="text-xs font-semibold text-ink-soft">{item.rating.toFixed(1)}</span>
      </div>

      {/* Quote — clamped to keep cards small; "Read more" opens the modal */}
      <p className="line-clamp-4 text-sm leading-relaxed text-ink">
        {item.quote}
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => onReadMore(item)}
          className="-mt-1 self-start text-xs font-semibold text-primary underline-offset-2 hover:underline"
        >
          Read more
        </button>
      )}
    </article>
  );
}

/** Full-review modal opened from a card's "Read more" link. */
function ReviewModal({
  review,
  onClose,
}: {
  review: GoogleReview | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!review) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [review, onClose]);

  const initials = review
    ? review.name
        .split(" ")
        .map((w) => w[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "";

  return (
    <AnimatePresence>
      {review && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <button
            type="button"
            aria-label="Close review"
            onClick={onClose}
            className="absolute inset-0 bg-ink/50 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Full review from ${review.name}`}
            className="relative z-10 max-h-[85vh] w-full max-w-lg overflow-y-auto rounded-card bg-white p-6 shadow-card-hover sm:p-7"
            initial={{ opacity: 0, scale: 0.94, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              aria-label="Close"
              onClick={onClose}
              className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full text-ink-soft transition-colors hover:bg-gray hover:text-ink"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" className="h-4 w-4">
                <path
                  d="M6 6l12 12M18 6 6 18"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </button>

            <div className="flex items-start gap-3 pr-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/12 font-mono text-base font-semibold text-primary">
                {initials}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5">
                  <p className="truncate text-base font-semibold text-ink">{review.name}</p>
                  <span aria-label="Verified Google review" title="Verified Google review">
                    <VerifiedGlyph className="h-4 w-4 text-primary" />
                  </span>
                </div>
                <p className="text-xs text-ink-soft">{review.relativeTime ?? "Posted on Google"}</p>
              </div>
              <GoogleGlyph className="h-5 w-5 shrink-0" />
            </div>

            <div className="mt-4 flex items-center gap-1.5">
              <StarRow rating={review.rating} />
              <span className="text-sm font-semibold text-ink-soft">{review.rating.toFixed(1)}</span>
            </div>

            <p className="mt-4 whitespace-pre-line text-[0.95rem] leading-relaxed text-ink">
              {review.quote}
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function StarRow({
  rating,
  className = "h-4 w-4",
}: {
  rating: number;
  className?: string;
}) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <StarGlyph
          key={i}
          filled={i < rating}
          className={`${className} ${i < rating ? "text-[#fbbc04]" : "text-gray"}`}
        />
      ))}
    </div>
  );
}

function StarGlyph({ filled, className = "" }: { filled: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 3l2.6 5.5 6 .8-4.4 4.2 1.1 6-5.3-2.9-5.3 2.9 1.1-6-4.4-4.2 6-.8L12 3Z"
        fill={filled ? "currentColor" : "none"}
        stroke={filled ? "none" : "currentColor"}
        strokeWidth="1.5"
      />
    </svg>
  );
}

/** Google "G" glyph — small colored SVG used as the review source marker. */
function GoogleGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={className}>
      <path fill="#EA4335" d="M24 9.5c3.5 0 6.6 1.2 9 3.6l6.7-6.7C35.4 2.7 30 0 24 0 14.9 0 7 5.4 3.1 13.3l7.9 6.1C13 13.6 18 9.5 24 9.5Z" />
      <path fill="#4285F4" d="M46.5 24.6c0-1.6-.1-3.1-.4-4.6H24v9h12.7c-.6 3-2.3 5.4-4.9 7.1l7.6 5.9c4.4-4.1 7.1-10.1 7.1-17.4Z" />
      <path fill="#FBBC05" d="M11 28.6c-.5-1.4-.8-2.9-.8-4.6s.3-3.2.8-4.6l-7.9-6.1C1.1 16.6 0 20.2 0 24s1.1 7.4 3.1 10.7L11 28.6Z" />
      <path fill="#34A853" d="M24 48c6.5 0 11.9-2.1 15.9-5.8l-7.6-5.9c-2.1 1.4-4.8 2.3-8.3 2.3-6 0-11.1-4.1-13-9.6l-7.9 6.1C7 42.6 14.9 48 24 48Z" />
    </svg>
  );
}

/** Small "verified" checkmark badge shown next to the reviewer name. */
function VerifiedGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className}>
      <path
        d="M12 2 14.5 5l3.7-.4 1 3.6L21.8 10 20 13l1.8 3-2.6 2.7-3.7-.4L14.5 21 12 18l-2.5 3-2-2.7-3.7.4L1.6 16 3.5 13 1.6 10l2.6-2.8L4 3.6 7.7 4l1.8-3L12 3.6Z"
        fill="currentColor"
      />
      <path d="M8.5 12.5 11 15l5-6" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Preserve the Link import for the top-CTA button (Button uses it internally
// but explicit reference here prevents future edits from breaking imports).
void Link;
