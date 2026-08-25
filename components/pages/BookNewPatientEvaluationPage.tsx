import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import FaqAccordion, { type FaqItem } from "@/components/ui/FaqAccordion";
import Icon from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import AnimatedCheckmark from "@/components/ui/AnimatedCheckmark";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

/** Real external GoHighLevel scheduling link used by every CTA on the live page (opens in a new tab there too). */
const BOOKING_URL = "https://link.drautoimmune.com/widget/bookings/newpatientdc";

const INTRO_TESTIMONIALS: { quote: string; name: string }[] = [
  { quote: "For the first time, someone actually explained what was going on.", name: "Sarah M." },
  { quote: "Dr. Ian connected dots that every other doctor missed.", name: "Jennifer R." },
];

const EVALUATION_STEPS: { title: string; description: string }[] = [
  {
    title: "Comprehensive Case Review",
    description:
      "We take the time to carefully review your symptoms, health history, and timeline so we can understand your unique situation, not just a diagnosis, but the full picture.",
  },
  {
    title: "In-Depth Blood Panel Analysis",
    description:
      "We analyze your 83+ marker functional blood panel through our partner laboratory, Evexia. Your blood draw is completed locally through LabCorp, and your results are securely shared in your patient portal for a detailed review.",
  },
  {
    title: "Personalized Care Plan",
    description:
      "Following your evaluation, our team will guide you through a customized plan tailored to your needs, outlining clear next steps to help support balance, energy, and overall wellness.",
  },
];

const STORY_TESTIMONIALS: { quote: string; name: string }[] = [
  {
    quote:
      "For the first time, someone explained what my labs meant and why I was feeling this way. I left the call with answers, and hope.",
    name: "Alyssa D.",
  },
  {
    quote: "Dr. Ian took time to understand me, not just my symptoms. After my exam, I finally had a plan that made sense.",
    name: "Lauren T.",
  },
  {
    quote:
      "I was skeptical at first, but after seeing my detailed bloodwork and how everything connected, I felt empowered for the first time in years.",
    name: "Mike W.",
  },
];

const FAQ_ITEMS: FaqItem[] = [
  {
    question: "What makes this evaluation different from a typical doctor visit?",
    answer: [
      "Most traditional visits are brief and focused on individual symptoms. Our process is designed to take a broader, more personalized look at your health by exploring how different systems in the body may be connected and where deeper imbalances may be contributing to what you are experiencing.",
      "During your New Patient Evaluation, our team reviews your health history, current symptoms, and comprehensive bloodwork to uncover patterns that may be missed when concerns are looked at one at a time. Your evaluation follows a clinical framework developed by Dr. Ian, with our care team guiding you through each step.",
      "Rather than focusing only on short term symptom management, this evaluation is designed to create a clearer, more complete picture of your health so you can better understand what may be driving your symptoms and what the next steps may be.",
    ],
  },
  {
    question: "Where do appointments take place?",
    answer: [
      "All appointments are completed virtually through secure telehealth. You can meet with our care team from anywhere in the United States, right from the comfort and privacy of your home.",
    ],
  },
  {
    question: "How do I complete my blood work?",
    answer: [
      "During your Discovery Call, our coordinator will guide you through the setup process. They will help you schedule your blood draw at a LabCorp location that is convenient for you and provide your new patient paperwork to complete in advance.",
      "This paperwork allows our team to understand your health history, symptoms, and timeline ahead of time so your evaluation can be focused, personalized, and productive.",
      "Once your bloodwork is complete, your results are securely uploaded to your patient portal and prepared for review as part of your New Patient Evaluation.",
    ],
  },
  {
    question: "Is this covered by insurance?",
    answer: [
      "Functional medicine is not typically covered by insurance because it focuses on a deeper, more comprehensive level of evaluation and care than standard medical visits. We recognize that investing in your health is a significant decision, and we are committed to making this process as accessible as possible.",
      "Many patients use HSA or FSA funds for the exam and labs, and we also partner with Care Credit and Affirm to offer flexible financing options. Our team will work with you to find a plan that fits your budget and timeline.",
      "When considering cost, it can help to think about what it takes to stay unwell: time, frustration, missed opportunities, and uncertainty. Our goal is to help you gain clarity and direction so you can make informed choices that truly support your well-being.",
    ],
  },
  {
    question: "What happens after my evaluation?",
    answer: [
      "At the end of your evaluation, our team will walk you through a personalized care plan based on your results, symptoms, and goals. You will leave with clear next steps, supportive guidance, and a better understanding of what your body may need so you are not left guessing about what to do next.",
      "Many patients choose to continue with one of our structured programs because they want consistent direction, support, and accountability as they begin applying their plan. These programs provide step by step guidance, educational resources, and ongoing communication with our team.",
      "You are always in control of your pace and your path, but for those ready to continue, your plan becomes a clear roadmap forward and a reminder that there is a path toward feeling better.",
    ],
  },
  {
    question: "What if I need to reschedule?",
    answer: ["We understand that life happens. Simply contact our coordinator at least 24 hours in advance and we will find a new time that works for you."],
  },
  {
    question: "What if I still have questions?",
    answer: [
      "We are here for you. Our team is happy to answer any questions you have before or after your Discovery Call. You can reach us at npc@drautoimmune.com, and a member of our team will respond as soon as possible.",
      "Whether you are curious about the process, logistics, or what to expect, we are glad to help you feel informed and supported every step of the way.",
    ],
  },
];

function BookingCta({
  label,
  variant = "primary",
  className = "",
}: {
  label: string;
  variant?: "primary" | "secondary";
  className?: string;
}) {
  return (
    <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" variant={variant} size="lg" className={className}>
      {label}
    </Button>
  );
}

function StarRow() {
  return (
    <div className="flex gap-0.5 text-primary" aria-hidden="true">
      {Array.from({ length: 5 }).map((_, i) => (
        <Icon key={i} name="star" className="h-4 w-4" />
      ))}
    </div>
  );
}

/**
 * `/book-new-patient-evaluation/` — clones the live page's rich landing-page
 * content (video, testimonials, "what to expect" evaluation steps, FAQ)
 * verbatim, including every CTA's exact external booking URL
 * (`link.drautoimmune.com/widget/bookings/newpatientdc`, opened in a new
 * tab, matching the live site's own `target="_blank"` behavior).
 */
export default function BookNewPatientEvaluationPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Nationwide Functional Medicine Care, from the Privacy of Your Own Home"
        title="Get Answers that Finally Make Sense"
        accent="Make Sense"
        subhead="A guided health review with a member of Dr. Ian Hollaman's clinical team, designed to uncover the patterns behind your symptoms."
        image={{ src: "/images/approach/main.webp", alt: "Doctor reviewing a patient's evaluation notes" }}
      />

      {/* Intro + video */}
      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <p className="text-lg leading-relaxed text-ink-soft">
              The Dr. Autoimmune New Patient Evaluation is a guided health review with a member of Dr. Ian
              Hollaman&rsquo;s clinical team designed to uncover the patterns behind your symptoms and help you
              understand the root causes affecting your health.
            </p>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Together, we review your history, symptoms, and lab data so you can gain clarity on what may be driving
              your condition and what the most effective path forward could look like.
            </p>
          </Reveal>

          <Reveal delay={0.1} className="mx-auto mt-12 max-w-3xl">
            <Badge className="mb-4 inline-flex">What Makes Our Evaluation Different</Badge>
            <div className={`${CARD_CLASSES} overflow-hidden`}>
              <div className="relative aspect-video w-full bg-ink">
                <iframe
                  src="https://www.youtube.com/embed/Y6Y5dY2fDUI"
                  title="What Makes Our Evaluation Different"
                  loading="lazy"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 h-full w-full"
                />
              </div>
              <div className="p-6 text-center sm:p-8">
                <p className="text-base leading-relaxed text-ink-soft">
                  Every patient plan is designed using Dr. Ian Hollaman&rsquo;s functional medicine framework and
                  clinical oversight, with guidance from his trained clinical team.
                </p>
                <BookingCta label="Book Your New Patient Evaluation" className="mt-6" />
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto mt-10 max-w-3xl text-center">
            <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">
              ⭐ 4.9/5 Rated by Patients Nationwide · Licensed Functional Medicine Provider · 100% Telehealth ·
              Private, HIPAA-Compliant Care
            </p>
          </Reveal>

          <div className="mx-auto mt-8 grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
            {INTRO_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i * 0.1, 0.2)} className={`${CARD_CLASSES} p-6`}>
                <h3 className="text-base font-extrabold text-ink">{t.name}</h3>
                <p className="mt-2 text-sm italic leading-relaxed text-ink-soft">&ldquo;{t.quote}&rdquo;</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* When no one else has given you answers */}
      <Section bg="cream-wash">
        <Container>
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14">
            <Reveal>
              <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
                When No One Else Has Given You Answers, We Will
              </h2>
              <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
                <p>
                  Most of our patients come to us after years of frustration. They&rsquo;ve seen multiple providers,
                  tried medications and diets, yet still don&rsquo;t feel like themselves.
                </p>
                <p>That&rsquo;s where functional medicine is different.</p>
                <p>
                  Instead of managing symptoms, we look deeper to understand why your body is out of balance. By
                  connecting your history, lab data, and lifestyle, we identify the underlying patterns driving
                  fatigue, pain, inflammation, and autoimmunity.
                </p>
                <p>
                  Our goal is to give you more than temporary relief, we give you clarity, direction, and a plan
                  that fits your life, all from the comfort of your home.
                </p>
              </div>
              <BookingCta label="Book Your New Patient Evaluation" className="mt-6" />
            </Reveal>
            <Reveal delay={0.1} className="relative aspect-[4/3] overflow-hidden rounded-card bg-sage">
              <Image
                src="/images/migrated/book-new-patient-evaluation/In-Depth-Personalized-Evaluation-2-e1774885374262.png"
                alt="A poster about the difference of conventional medicine vs functional medicine"
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="object-cover"
              />
            </Reveal>
          </div>

          <Reveal delay={0.15} className={`mx-auto mt-12 max-w-2xl ${CARD_CLASSES} p-6 sm:p-8`}>
            <Icon name="quote" className="h-6 w-6 text-primary/40" />
            <p className="mt-3 text-base italic leading-relaxed text-ink">
              &ldquo;I&rsquo;ve been a patient for over two years. Dr Hollaman has helped me get healthy again.
              Through all I&rsquo;ve learned from him, I have learned what to look for if my health starts to slide
              so that it can be more easily corrected. I would recommend him to anyone who needs to work on their
              health.&rdquo;
            </p>
            <p className="mt-4 text-sm font-medium text-ink-soft">Debbie Crume</p>
          </Reveal>
        </Container>
      </Section>

      {/* Comprehensive, compassionate, 100% telehealth — evaluation steps */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="orbs" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">100% Telehealth</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">
              Comprehensive, Compassionate, and 100% Telehealth
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                At Dr. Autoimmune, we believe everyone deserves access to expert, compassionate care no matter where
                they live.
              </p>
              <p>
                That&rsquo;s why your New Patient Evaluation is delivered entirely through secure telehealth, so you
                can connect with our care team from the comfort and privacy of your home.
              </p>
              <p>
                This is not a rushed appointment or surface-level conversation. It is a thoughtful, structured
                evaluation designed to understand your full health story and uncover what may be driving your
                symptoms.
              </p>
            </div>
          </Reveal>

          <ol className="relative mx-auto mt-14 max-w-3xl space-y-8">
            <div aria-hidden="true" className="absolute left-[19px] top-2 bottom-2 w-px bg-gray sm:left-[23px]" />
            {EVALUATION_STEPS.map((step, i) => (
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

          <Reveal delay={0.2} className="mx-auto mt-12 max-w-2xl text-center">
            <p className="text-base leading-relaxed text-ink-soft">
              Whether you&rsquo;re across town or across the country, this process brings functional medicine to you
              in a way that is accessible, thorough, and completely virtual.
            </p>
            <BookingCta label="Start My Path to Clarity" className="mt-6" />
            <p className="mt-4 text-sm italic text-ink-soft">
              Your Discovery Call is an important first step, it allows our team to prepare your background and
              labs so your visit can stay fully focused on you.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Real patients, real progress */}
      <Section bg="cream-wash">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Patient Stories</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Real Patients. Real Progress. Real Hope.</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Every patient story is unique, yet most share a familiar beginning. They have searched for answers and
              have felt overlooked or unheard. Through our fully telehealth model, patients connect with Dr. Ian
              from wherever they live to gain insight, education, and a clear path forward.
            </p>
          </Reveal>

          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {STORY_TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={Math.min(i * 0.1, 0.3)} className={`${CARD_CLASSES} h-full p-6`}>
                <StarRow />
                <p className="mt-3 text-sm italic leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-4 text-sm font-medium text-ink-soft">{t.name}</p>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.15} className="mx-auto mt-12 max-w-2xl text-center">
            <p className="accent-serif text-lg italic text-primary">
              🌎 Patients seen in 50 states &nbsp;|&nbsp; ⭐ 4.9/5 average satisfaction &nbsp;|&nbsp; 10,000+
              consultations delivered via secure telehealth
            </p>
            <BookingCta label="Start My Path to Clarity" className="mt-6" />
            <p className="mt-4 text-sm leading-relaxed text-ink-soft">
              Your Discovery Call is the first step toward real answers. It allows our team to prepare your labs and
              health history in advance so your evaluation is fully focused on you and what your body needs.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* FAQ */}
      <Section bg="white">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Common Questions</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Still Have Questions? Here&rsquo;s What to Expect</h2>
          </Reveal>
          <div className="mx-auto mt-10 max-w-3xl">
            <FaqAccordion items={FAQ_ITEMS} />
          </div>
        </Container>
      </Section>

      {/* Final CTA */}
      <Section bg="cream-wash" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal
            className={`mx-auto max-w-2xl ${CARD_CLASSES} overflow-hidden bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)] p-8 text-center sm:p-12`}
          >
            <h2 className="text-2xl font-extrabold text-sage sm:text-3xl">Take the Next Step Toward Answers</h2>
            <p className="mt-3 text-base text-white/75">
              Book your New Patient Evaluation and start your path to clarity today.
            </p>
            <BookingCta label="Take the Next Step Toward Answers" className="mt-6" />
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
