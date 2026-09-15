"use client";

import { useRef, useState, type ReactNode } from "react";
import Icon from "@/components/ui/Icon";

interface CarouselProps {
  /** Pre-rendered slide elements (built by the server-component caller) —
   * a plain function `renderItem` prop can't cross the server/client
   * boundary into this `"use client"` component, so callers render their
   * cards up front and just hand this component the resulting nodes. */
  slides: ReactNode[];
  ariaLabel: string;
  /** Tailwind width classes applied to each slide wrapper. */
  itemClassName?: string;
}

/**
 * Shared prev/next + dot-indicator carousel, reused across the homepage
 * (Testimonials, Wellness Products, TikTok videos, etc.) for a consistent
 * scroll-snap carousel interaction.
 */
export default function Carousel({ slides, ariaLabel, itemClassName = "" }: CarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  /** Each child's scroll-left offset within the track, computed via
   * `getBoundingClientRect` (not `offsetLeft`, which is relative to the
   * nearest *positioned* ancestor rather than the scroll container
   * itself, and gives wrong results here since the track isn't
   * position-relative). */
  function getChildOffsets(track: HTMLElement) {
    const trackLeft = track.getBoundingClientRect().left;
    return Array.from(track.children).map(
      (child) => child.getBoundingClientRect().left - trackLeft + track.scrollLeft,
    );
  }

  function scrollToIndex(index: number) {
    const track = trackRef.current;
    if (!track) return;
    const target = getChildOffsets(track)[index];
    if (target === undefined) return;
    track.scrollTo({ left: target, behavior: "smooth" });
    setActive(index);
  }

  function handleScroll() {
    const track = trackRef.current;
    if (!track) return;
    let closest = 0;
    let minDist = Infinity;
    getChildOffsets(track).forEach((offset, i) => {
      const dist = Math.abs(offset - track.scrollLeft);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActive(closest);
  }

  const atStart = active === 0;
  const atEnd = active === slides.length - 1;

  return (
    <div>
      <div
        ref={trackRef}
        onScroll={handleScroll}
        role="region"
        aria-label={ariaLabel}
        className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {slides.map((slide, i) => (
          <div key={i} className={["shrink-0 snap-start", itemClassName].join(" ")}>
            {slide}
          </div>
        ))}
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous slide"
          disabled={atStart}
          onClick={() => scrollToIndex(Math.max(0, active - 1))}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray bg-white text-ink transition-colors hover:bg-sage disabled:opacity-30 disabled:pointer-events-none"
        >
          <Icon name="arrow-right" className="h-4 w-4 rotate-180" />
        </button>

        <div className="flex items-center gap-2" role="tablist" aria-label={`${ariaLabel} pagination`}>
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === active}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => scrollToIndex(i)}
              className={[
                "h-2 rounded-full transition-all duration-200",
                i === active ? "w-6 bg-primary" : "w-2 bg-gray hover:bg-primary/40",
              ].join(" ")}
            />
          ))}
        </div>

        <button
          type="button"
          aria-label="Next slide"
          disabled={atEnd}
          onClick={() => scrollToIndex(Math.min(slides.length - 1, active + 1))}
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gray bg-white text-ink transition-colors hover:bg-sage disabled:opacity-30 disabled:pointer-events-none"
        >
          <Icon name="arrow-right" className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
