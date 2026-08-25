import Icon from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import Button from "@/components/ui/Button";
import { CONSULTATION } from "@/content/home-content";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

const QUICK_FACTS = [
  { icon: "clock" as const, label: "Response in < 1 business day" },
  { icon: "globe" as const, label: "100% Remote · Nationwide" },
  { icon: "check-circle" as const, label: "No obligation" },
];

/**
 * Closing consultation band — same content as the original homepage's
 * consultation section (`CONSULTATION`), restyled with no dark gradient
 * background.
 */
export default function ContactBand2() {
  return (
    <section className={`${SECTION_PADDING} bg-sage/30`}>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <p className={TEXT.caption}>Get In Touch</p>
          <h3 className={`mt-3 ${TEXT.h2}`}>Real people, real care</h3>
          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Book a discovery call, drop us a note, or just say hi, our care team responds within one business day.
          </p>
          <ul className="mt-6 flex flex-wrap items-center justify-center gap-2">
            {QUICK_FACTS.map((p) => (
              <li key={p.label}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-gray bg-white px-3 py-1.5 text-xs font-medium text-ink-soft shadow-sm">
                  <Icon name={p.icon} className="h-3.5 w-3.5 text-primary" />
                  {p.label}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Get Started" heading={CONSULTATION.heading} intro={CONSULTATION.intro} align="center" />
        </div>

        <ul className="mx-auto mt-14 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-2">
          {CONSULTATION.items.map((item) => (
            <li key={item.title} className="flex gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon name="check-circle" className="h-5 w-5" />
              </span>
              <div>
                <p className="font-semibold text-ink">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex justify-center">
          <Button href={CONSULTATION.cta.href} variant="primary" size="lg" className="uppercase tracking-wide">
            {CONSULTATION.cta.label}
          </Button>
        </div>
      </Container>
    </section>
  );
}

