"use client";

import { useState } from "react";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import { FAQ } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

/**
 * FAQ accordion matching the real `FAQ.items` data shape (`answer: string`
 * plus an optional `list: string[]`) — a Home2-local component since the
 * shared `FaqAccordion` expects `answer: string[]`, a different shape.
 * Two-column layout mirroring the Home1 FAQ section: a sticky heading on
 * the left, a numbered accordion list on the right (no supporting image).
 */
export default function Faq2() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div className="lg:sticky lg:top-32 lg:self-start">
            <SectionHeading
              eyebrow="Common Questions"
              heading={FAQ.heading}
              intro="Straightforward answers about our root-cause, functional medicine approach."
            />
          </div>

          <div className="divide-y divide-gray">
            {FAQ.items.map((item, i) => {
              const isOpen = openIndex === i;
              return (
                <div key={item.question}>
                  <button
                    type="button"
                    onClick={() => setOpenIndex(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="group flex w-full items-center justify-between gap-4 rounded-lg py-5 text-left transition-colors duration-200 hover:bg-sage/40"
                  >
                    <span className="flex items-center gap-3">
                      <span
                        className={`font-mono text-xs transition-colors duration-200 ${isOpen ? "text-primary" : "text-primary/40 group-hover:text-primary/70"}`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`${TEXT.h3} text-lg`}>{item.question}</span>
                    </span>
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}
                    >
                      <Icon name="plus" className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="pb-5 pl-8">
                      <p className={TEXT.body}>{item.answer}</p>
                      {item.list && (
                        <ul className="mt-3 space-y-2">
                          {item.list.map((li) => (
                            <li key={li} className="flex items-start gap-2 text-sm text-ink-soft">
                              <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                              {li}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </Container>
    </section>
  );
}
