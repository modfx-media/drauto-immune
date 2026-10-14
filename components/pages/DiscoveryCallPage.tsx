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
import { SITE_CONTACT } from "@/components/layout/nav-links";

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

const PREPARE = [
  {
    title: "A short symptom timeline",
    body: "When symptoms started, what has changed, and which specialists or tests you have already completed. Exact dates help, but a rough chronology is enough.",
  },
  {
    title: "Current medications and supplements",
    body: "A quick list helps the coordinator understand what you are already managing — especially thyroid medication, rheumatology therapies, or gut-focused protocols.",
  },
  {
    title: "Your top questions",
    body: "Many people ask whether telehealth can work for their situation, how labs are drawn locally, or how we coordinate with rheumatologists, endocrinologists, or neurologists. Bring the questions that matter most to you.",
  },
];

const AFTER_CALL = [
  {
    title: "If care looks like a fit",
    body: "The usual next step is a comprehensive new patient evaluation with a member of Dr. Hollaman’s clinical team — reviewing history, symptom patterns, and blood analysis to begin identifying root drivers.",
  },
  {
    title: "If another path is better",
    body: "Sometimes the honest answer is that another type of care should come first, or that specialty management needs to be in place before a root-cause plan makes sense. The discovery call is designed to surface that clearly.",
  },
  {
    title: "If you want to learn more first",
    body: "You can browse conditions we support, read patient stories, explore the blog, or return to book when you are ready. The calendar stays available for USA patients.",
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
  {
    question: "How long is the call, and who will I speak with?",
    answer: [
      "The discovery call is about 20 minutes with our New Patient Coordinator. You will talk about your symptoms and history, learn how functional medicine targets root causes, and leave with clarity on whether care is a good fit.",
    ],
  },
  {
    question: "I live in Denver — can I still book?",
    answer: [
      "Yes. The practice is based in Boulder and serves Denver metro and Front Range patients by telehealth, with lab draws coordinated locally. Nationwide USA patients use the same remote model. See our Denver patients page for more on how Front Range visits work.",
    ],
  },
  {
    question: "What if I need to ask a quick question before booking?",
    answer: [
      "Call us at +1 (303) 882-8447, email npc@drautoimmune.com, or use the contact form. For scheduling fit conversations, this discovery call calendar is the most direct path.",
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
            <h2 className="text-3xl font-extrabold text-ink">Why Start With a Discovery Call</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Choosing a functional medicine practice is a meaningful decision — especially when you have already
                spent years collecting partial answers. The discovery call exists so you can hear how Dr. Autoimmune
                works before you invest in a full evaluation. It is short by design: about 20 minutes, no obligation,
                and focused on fit rather than a rushed sales pitch.
              </p>
              <p>
                During the call with our New Patient Coordinator, you describe what you have been experiencing. We
                explain how root-cause care looks at gut, immune, nutrient, and lifestyle drivers, and how telehealth
                visits work from our Boulder-based practice. By the end, you should know whether an evaluation is a
                sensible next step — or whether another path is a better match right now.
              </p>
              <p>
                Care at Dr. Autoimmune is led by Dr. Ian Hollaman, DC, MSc, FMCP, and delivered entirely by
                telehealth for USA patients. Lab draws are coordinated at facilities near you. That model is
                intentional: chronic and autoimmune concerns often need careful history and pattern recognition more
                than frequent in-office travel.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
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
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">How to Prepare (Optional but Helpful)</h2>
            <p className="mt-3 text-base text-ink-soft">
              You do not need a binder of records for this conversation. A little preparation simply makes the 20
              minutes more useful.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {PREPARE.map((item) => (
              <Reveal key={item.title} className={`${CARD_CLASSES} p-6`}>
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">What Happens After the Call</h2>
            <p className="mt-3 text-base text-ink-soft">
              There is no single “right” outcome — only a clearer next step based on your story and our model.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {AFTER_CALL.map((item) => (
              <Reveal key={item.title} className={`${CARD_CLASSES} p-6`}>
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              Ready for a full clinical review instead?{" "}
              <Link href="/book-new-patient-evaluation/" className="font-medium text-primary hover:underline">
                Book a new patient evaluation
              </Link>
              . Prefer to browse first? See{" "}
              <Link href="/services/" className="font-medium text-primary hover:underline">
                services
              </Link>
              ,{" "}
              <Link href="/conditions-we-support/" className="font-medium text-primary hover:underline">
                conditions we support
              </Link>
              , or how telehealth works for{" "}
              <Link
                href="/areas-we-serve/colorado/denver/"
                className="font-medium text-primary hover:underline"
              >
                Denver patients
              </Link>
              .
            </p>
            <p>
              Prefer to reach someone directly? Call{" "}
              <a href={SITE_CONTACT.phoneHref} className="font-medium text-primary hover:underline">
                {SITE_CONTACT.phone}
              </a>{" "}
              or email{" "}
              <a href={SITE_CONTACT.emailHref} className="font-medium text-primary hover:underline">
                {SITE_CONTACT.email}
              </a>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
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
