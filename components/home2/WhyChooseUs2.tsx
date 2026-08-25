import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import { WHY_CHOOSE_US } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

const QUICK_FACTS = [
  { icon: "target" as const, label: "Root-cause driven" },
  { icon: "globe" as const, label: "100% remote" },
  { icon: "users" as const, label: "Dedicated care team" },
  { icon: "trending-up" as const, label: "Data-guided care" },
];

/**
 * A numbered divider list rather than another icon-card grid — Pillars2,
 * ServicesHighlight2, and Products2 already share that pattern, so this
 * section reads visually distinct while still reusing the same tokens.
 */
export default function WhyChooseUs2() {
  return (
    <section className={`${SECTION_PADDING} bg-white`}>
      <Container>
        <SectionHeading eyebrow="Why Us" heading={WHY_CHOOSE_US.heading} align="center" />

        <p className="mx-auto mt-6 max-w-2xl text-center text-base leading-relaxed text-ink-soft">
          A different kind of practice, built around your body, your history, and your goals.
        </p>

        <ul className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-2">
          {QUICK_FACTS.map((p) => (
            <li key={p.label}>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm">
                <Icon name={p.icon} className="h-3.5 w-3.5 text-primary" />
                {p.label}
              </span>
            </li>
          ))}
        </ul>

        <ol className="mx-auto mt-14 max-w-3xl divide-y divide-gray border-y border-gray">
          {WHY_CHOOSE_US.items.map((item, i) => (
            <li key={item.title} className="flex flex-col gap-4 py-8 sm:flex-row sm:items-start sm:gap-8">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-primary/20 font-mono text-lg font-semibold text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div>
                <h3 className={TEXT.h3}>{item.title}</h3>
                <p className={`mt-2 ${TEXT.body}`}>{item.description}</p>
              </div>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
