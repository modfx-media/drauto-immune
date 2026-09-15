import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import GhlBookingWidget from "@/components/ui/GhlBookingWidget";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

const REASONS: { label: string; icon: IconName }[] = [
  { label: "20 minutes, no obligation", icon: "clock" },
  { label: "100% telehealth, nationwide", icon: "globe" },
  { label: "Meet our care team first", icon: "users" },
];

/**
 * `/discovery-call/` — clones the live page's real content: a single
 * embedded GoHighLevel booking widget (the exact iframe used live,
 * `link.drautoimmune.com/widget/booking/tJKXoDdUiNVIbNXTR5yA`), restyled
 * only at the container level to match the brand palette. This is the
 * site-wide primary conversion page (`DISCOVERY_CALL_HREF`), so the layout
 * stays deliberately simple and fast — no decorative content competing
 * with the calendar itself.
 */
export default function DiscoveryCallPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Discovery Call"
        title="Let's Talk About Your Health"
        accent="Your Health"
        subhead="A no-obligation call with our care team to see if functional medicine is the right next step for you."
        image={{
          src: "/images/discovery-call/dr-ian-consultation.png",
          alt: "Doctor writing notes at a desk next to an open laptop",
          position: "center 40%",
        }}
      />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <div className="mx-auto max-w-3xl">
            <Reveal className={`${CARD_CLASSES} overflow-hidden p-6 sm:p-10`}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h1 className="text-xl font-extrabold text-ink sm:text-2xl">Dr. Autoimmune Discovery Call</h1>
                <Badge>20 min</Badge>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                <strong className="text-ink">USA patients only.</strong> Share your story and symptoms, discover our
                root-cause approach, and plan your next step with Dr. Autoimmune.
              </p>

              <div className="mt-6">
                <GhlBookingWidget
                  src="https://link.drautoimmune.com/widget/booking/tJKXoDdUiNVIbNXTR5yA"
                  title="Dr. Autoimmune Discovery Call: booking calendar"
                />
              </div>
            </Reveal>

            <Reveal delay={0.1} className="mt-8">
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {REASONS.map((reason) => (
                  <li
                    key={reason.label}
                    className="flex items-center gap-3 rounded-xl border border-gray bg-cream-wash/60 px-4 py-3.5"
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                      <Icon name={reason.icon} className="h-4 w-4" />
                    </span>
                    <span className="text-sm font-medium leading-snug text-ink">{reason.label}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
