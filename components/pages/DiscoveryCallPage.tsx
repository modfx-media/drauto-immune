import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Container from "@/components/ui/Container";
import GhlBookingWidget from "@/components/ui/GhlBookingWidget";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import FaqAccordion from "@/components/ui/FaqAccordion";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

const REASONS: { label: string; icon: IconName }[] = [
  { label: "20 minutes, no obligation", icon: "clock" },
  { label: "100% telehealth, nationwide", icon: "globe" },
  { label: "Meet our care team first", icon: "users" },
];

const WHAT_HAPPENS = [
  {
    title: "Share your story",
    body: "You talk openly about symptoms, health history, and what you have already tried. This is often the first time people feel truly heard.",
  },
  {
    title: "Learn our approach",
    body: "We explain how functional medicine looks for root causes — including gut, immune, nutrient, and lifestyle drivers — and how telehealth visits work from our Boulder-based practice.",
  },
  {
    title: "Decide on a next step",
    body: "By the end of the call you should know whether our care is a good fit and what an evaluation would involve. There is no pressure to book on the spot.",
  },
];

const FAQS = [
  {
    question: "Who is the discovery call for?",
    answer: [
      "People with chronic or autoimmune concerns who want to understand whether Dr. Autoimmune’s root-cause, telehealth model is appropriate before committing to a full evaluation. USA patients only.",
    ],
  },
  {
    question: "Is the discovery call a medical appointment?",
    answer: [
      "It is an introductory conversation with our New Patient Coordinator — not a full clinical evaluation or a diagnosis. The new patient evaluation is where detailed history and labs are reviewed.",
    ],
  },
  {
    question: "What if I already know I want an evaluation?",
    answer: [
      "You can go directly to the new patient evaluation booking page. Many people still prefer the discovery call first to confirm fit.",
    ],
  },
];

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
                <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Dr. Autoimmune Discovery Call</h2>
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

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">What Happens on the Call</h2>
            <p className="mt-3 text-base text-ink-soft">
              The discovery call is designed to be useful even if you decide another path is better for you.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {WHAT_HAPPENS.map((step, i) => (
              <Reveal key={step.title} className={`${CARD_CLASSES} p-6`}>
                <p className="font-mono text-xs font-medium uppercase tracking-wide text-primary">Step {i + 1}</p>
                <h3 className="mt-2 text-xl font-extrabold text-ink">{step.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{step.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-base leading-relaxed text-ink-soft">
            <p>
              Ready for a full clinical review instead?{" "}
              <Link href="/book-new-patient-evaluation/" className="font-medium text-primary hover:underline">
                Book a new patient evaluation
              </Link>
              . Prefer to browse first? See{" "}
              <Link href="/services/" className="font-medium text-primary hover:underline">
                services
              </Link>{" "}
              and{" "}
              <Link href="/conditions-we-support/" className="font-medium text-primary hover:underline">
                conditions we support
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Discovery Call FAQ</h2>
            <div className="mt-6">
              <FaqAccordion items={FAQS} />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
