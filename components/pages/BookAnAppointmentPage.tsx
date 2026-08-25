import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import GhlBookingWidget from "@/components/ui/GhlBookingWidget";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import AnimatedCheckmark from "@/components/ui/AnimatedCheckmark";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

const CONSULT_STEPS: { title: string; description: string }[] = [
  {
    title: "Comprehensive Case Review",
    description:
      "We'll carefully review your symptoms, medical history, and timeline to understand your unique health situation.",
  },
  {
    title: "In-Depth Blood Panel Analysis",
    description:
      "We'll interpret your 83+ marker blood panel results from Evexia. You can easily get your blood drawn at any LabCorp location near you, and the requisition will be provided directly through your secure patient portal.",
  },
  {
    title: "Custom Care Plan",
    description:
      "After a thorough evaluation, Dr. Autoimmune will create a personalized care plan tailored to your specific needs, guiding you on your path toward better health.",
  },
];

const CARE_FEATURES: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Autoimmune Specialists",
    description: "Our unique approach: no stone is left unturned to determine the true cause of your autoimmune condition.",
    icon: "shield",
  },
  {
    title: "Discover the Root Cause",
    description:
      "Many of our patients come to us as a last resort. By identifying the root cause of your condition, we develop a plan that finally gets results.",
    icon: "compass",
  },
  {
    title: "Comprehensive Approach",
    description:
      "Using the latest in neuro-feedback, clinical nutrition, functional medicine and a variety of different avenues, we work with you to customize your care and minimize symptoms.",
    icon: "target",
  },
];

const TESTIMONIALS: { quote: string; name: string }[] = [
  { quote: "I came in 4 months ago for Fibromyalgia and all I can say is I wish I came 9 years ago...", name: "Sarah M." },
  { quote: "Coming Here Has Given Me My Life Back", name: "Robin C." },
];

/**
 * `/book-an-appointment/` — clones the live page's marketing copy (90-min
 * consultation breakdown, "Finest Autoimmune Care" feature grid, $399
 * package CTA, testimonials) verbatim. The live page's own primary action
 * is a native WordPress/Elementor form with no portable backend on this
 * static Next.js site, and the live site's own footer already treats
 * "Book An Appointment" as an alias for the Discovery Call — so the
 * real booking action here is the same functional GHL calendar widget used
 * on `/discovery-call/`, keeping the conversion path fully working.
 */
export default function BookAnAppointmentPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Book An Appointment"
        title="The Dr. Autoimmune Solution"
        accent="Solution"
        subhead="Nationwide functional medicine care, from the privacy of your own home."
        image={{ src: "/images/services/new-patient-evaluation.jpg", alt: "Doctor listening to a patient's heartbeat with a stethoscope" }}
      />

      {/* Booking widget */}
      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className={`mx-auto max-w-3xl ${CARD_CLASSES} overflow-hidden p-6 sm:p-10`}>
            <h2 className="text-xl font-extrabold text-ink sm:text-2xl">Book Your Discovery Call</h2>
            <p className="mt-3 text-sm leading-relaxed text-ink-soft">
              Take the first step toward healing, wherever you may be.
            </p>
            <div className="mt-6">
              <GhlBookingWidget
                src="https://link.drautoimmune.com/widget/booking/tJKXoDdUiNVIbNXTR5yA"
                title="Dr. Autoimmune Discovery Call: booking calendar"
              />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* 90-minute consultation step indicator */}
      <Section bg="cream-wash">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Nationwide Care</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              What to Expect During Your Initial 90-Minute Zoom Consultation
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              At Dr. Autoimmune, we believe in accessible, compassionate care for all individuals seeking healing and
              support. No matter where you live, we offer remote telehealth consultations so you can receive expert
              guidance from the comfort of your home.
            </p>
          </Reveal>

          <ol className="relative mx-auto mt-14 max-w-3xl space-y-8">
            <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-gray sm:left-[23px]" />
            {CONSULT_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={Math.min(i * 0.1, 0.3)}>
                <li className="relative flex gap-5">
                  <span className="relative z-10 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-primary shadow-card sm:h-12 sm:w-12">
                    <AnimatedCheckmark className="h-6 w-6" delay={i * 0.1} />
                  </span>
                  <div className={`flex-1 ${CARD_CLASSES} p-5 sm:p-6`}>
                    <h3 className="text-lg font-extrabold text-ink">{step.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* The Finest Autoimmune Care */}
      <Section bg="white">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">The Finest Autoimmune Care</h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                No matter where you live, remote care is now available. We also have telehealth options available. We
                are here to offer help to anyone, including those who are unable to come into the office.
              </p>
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-card bg-sage">
              <Image
                src="/images/migrated/book-an-appointment/xlarge-1-e1763121534187.webp"
                alt="The Finest Autoimmune Care"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {CARE_FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={Math.min(i * 0.08, 0.24)} className={`${CARD_CLASSES} h-full p-6`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Blood markers */}
      <Section bg="cream-wash" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="orbs" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">83+ Markers</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              We Measure Over 83 Unique Blood Markers to Find Conditions Missed by Most Standard Blood Panels
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              These are just a few of the hundreds of success stories we&rsquo;ve helped amazing individuals
              create&hellip; You deserve to let your health soar!
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* $399 package CTA + testimonials */}
      <Section bg="white">
        <Container>
          <Reveal
            className={`relative ${CARD_CLASSES} overflow-hidden bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)] p-8 text-center sm:p-12`}
          >
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
            />
            <div
              aria-hidden="true"
              className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
            />
            <h2 className="relative text-2xl font-extrabold text-sage sm:text-3xl">
              Claim Your $399 New Patient Package NOW!
            </h2>
            <p className="relative mx-auto mt-3 max-w-xl text-base text-white/75">
              Are you ready to get the answers you deserve to all your health questions? Turn to Dr. Autoimmune for
              solutions tailored specifically to you and your health needs.
            </p>
            <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="relative mt-6 uppercase tracking-wide">
              Book your Discovery Call
            </Button>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {TESTIMONIALS.map((testimonial, i) => (
              <Reveal key={testimonial.name} delay={Math.min(i * 0.1, 0.2)} className={`${CARD_CLASSES} p-6 sm:p-8`}>
                <Icon name="quote" className="h-6 w-6 text-primary/40" />
                <p className="mt-3 text-base italic leading-relaxed text-ink">&ldquo;{testimonial.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-ink-soft">&mdash; {testimonial.name}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
