"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { DISCOVERY_CALL_HREF, SITE_CONTACT } from "@/components/layout/nav-links";

const EASE = [0.22, 1, 0.36, 1] as const;

const SERVICE_PATHWAYS: {
  title: string;
  description: string;
  href: string;
  icon: IconName;
  image: string;
}[] = [
  {
    title: "Book New Patient Evaluation",
    description:
      "A guided health review with Dr. Ian Hollaman’s clinical team covering history, symptoms, and lab patterns before a personalized plan.",
    href: "/book-new-patient-evaluation/",
    icon: "clipboard",
    image: "/images/services/new-patient-evaluation.jpg",
  },
  {
    title: "Conditions We Support",
    description:
      "Autoimmune, thyroid, gut, and complex chronic conditions we regularly evaluate with a root-cause functional medicine lens.",
    href: "/conditions-we-support/",
    icon: "shield",
    image: "/images/migrated/conditions-we-support/large-7.webp",
  },
  {
    title: "Patient Stories",
    description: "Hear how patients describe working with the Dr. Autoimmune team on chronic and autoimmune concerns.",
    href: "/patient-stories/",
    icon: "heart-pulse",
    image: "/images/services/wellness-services.jpg",
  },
  {
    title: "Patient Portal",
    description: "Securely access records, lab results, and care-plan details between visits.",
    href: "https://drautoimmune.md-hq.com/",
    icon: "users",
    image: "/images/approach/main.webp",
  },
];

const CARE_DETAILS = [
  {
    title: "Discovery Call",
    body: "A short, no-obligation conversation (about 20 minutes) with our New Patient Coordinator. You share your story; we explain how root-cause care works and whether it is a fit. USA patients only.",
    href: "/discovery-call/",
  },
  {
    title: "New Patient Evaluation",
    body: "A thorough telehealth evaluation reviewing clinical history, symptom patterns, and blood analysis. Lab requisitions for an extensive marker panel can be coordinated through LabCorp locations near you.",
    href: "/book-new-patient-evaluation/",
  },
  {
    title: "Ongoing Functional Medicine Support",
    body: "Follow-up visits, nutrition guidance, supplement recommendations when appropriate, and plan adjustments based on symptoms and labs — all by secure video from our Boulder-based practice.",
    href: "/book-an-appointment/",
  },
  {
    title: "Neurofeedback (when indicated)",
    body: "For attention, mood, and brain-based symptoms, the team may incorporate neurofeedback brain training as part of a broader plan. Session needs are individualized.",
    href: "/adhd-add/",
  },
];

const WHO_WE_HELP = [
  {
    title: "Autoimmune and immune-driven conditions",
    body: "Patients navigating Hashimoto’s, Graves’, rheumatoid arthritis, lupus, Sjögren’s, IBD, multiple sclerosis, and related immune concerns who want root-cause context alongside specialty care.",
  },
  {
    title: "Thyroid and metabolic patterns",
    body: "People who still feel unwell with a “normal” TSH, antibody-positive thyroid disease, or overlapping fatigue, brain fog, and gut symptoms that standard panels leave unexplained.",
  },
  {
    title: "Gut-immune and chronic symptom clusters",
    body: "History of digestive issues, food reactions, inflammation markers, skin clues, or multi-system symptoms that have not improved with symptom-only approaches.",
  },
  {
    title: "Brain-based concerns with physical drivers",
    body: "ADHD, anxiety, and related brain-based symptoms where gut, nutrient, thyroid, and inflammatory factors may matter — with neurofeedback available when clinically appropriate.",
  },
];

const CARE_JOURNEY = [
  {
    title: "Start with clarity, not pressure",
    body: "Most people begin with a discovery call — about 20 minutes with our New Patient Coordinator. You describe what you have tried; we explain how telehealth functional medicine works from Boulder and whether an evaluation is a sensible next step. USA patients only.",
  },
  {
    title: "Evaluation that connects history and labs",
    body: "A comprehensive new patient evaluation reviews your timeline, prior workups, and symptom patterns. When indicated, an extensive blood panel (the practice describes an 83+ marker panel coordinated through partners such as Evexia, with draws at LabCorp near you) helps map drivers that a narrow standard panel can miss.",
  },
  {
    title: "A plan you can actually follow",
    body: "Ongoing care includes clinical check-ins, dedicated Metabolic Coordinator visits, nutrition and lifestyle guidance, and supplement recommendations when they fit your picture. Plans adjust as symptoms and labs change — not a one-size template.",
  },
];

const FAQS = [
  {
    question: "Is care fully remote?",
    answer: [
      "Yes. Dr. Autoimmune delivers care through telehealth. Lab draws are done at facilities convenient to where you live, and visits happen by secure video.",
    ],
  },
  {
    question: "What is the difference between a discovery call and a new patient evaluation?",
    answer: [
      "The discovery call is a brief fit conversation. The new patient evaluation is a comprehensive clinical review used to understand drivers of your symptoms and outline next steps.",
    ],
  },
  {
    question: "Do you publish prices on this page?",
    answer: [
      "Package details are discussed during scheduling so they match the visit type you need. Start with a discovery call or the new patient evaluation page to begin.",
    ],
  },
  {
    question: "Who leads care at Dr. Autoimmune?",
    answer: [
      "Care is led by Dr. Ian Hollaman, DC, MSc, FMCP — a board-certified chiropractic physician in Colorado, Institute of Functional Medicine–certified practitioner, with a Master’s in Nutrition and Functional Medicine and functional neurology/neurofeedback credentials through the American Functional Neurology Institute. Patients also work with the clinical team and a dedicated Metabolic Coordinator.",
    ],
  },
  {
    question: "Can Denver or Front Range patients use these services?",
    answer: [
      "Yes. The practice is based in Boulder and serves Denver metro and Front Range patients by telehealth, with local lab draws. Nationwide USA patients use the same remote model. See our Denver area page for how visits work for Front Range patients.",
    ],
  },
  {
    question: "Do you replace rheumatologists, endocrinologists, or neurologists?",
    answer: [
      "No. When specialty care is indicated — for example rheumatology for inflammatory arthritis or lupus, endocrinology for insulin-dependent diabetes, or neurology for MS disease-modifying therapy — that care remains essential. Functional medicine investigates root-cause drivers alongside those teams.",
    ],
  },
];

export default function ServicesPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Services"
        title="Personalized Functional Medicine Services"
        accent="Functional Medicine"
        subhead="Telehealth root-cause care from Boulder, Colorado — from your first conversation through ongoing autoimmune and wellness support."
        image={{
          src: "/images/services/new-patient-evaluation.jpg",
          alt: "Doctor listening to a patient's heartbeat with a stethoscope",
        }}
      />

      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 inline-flex">Our Services</Badge>
            <p className="text-lg leading-relaxed text-ink-soft">
              Whether you are beginning your first evaluation or looking for ongoing support, our services are built
              around one goal: understanding what is driving your symptoms and giving you a clear, personalized plan
              — delivered through secure, convenient telehealth.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SERVICE_PATHWAYS.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative overflow-hidden">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink sm:text-4xl">
              Functional Medicine Services Designed Around Root Causes
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Dr. Autoimmune is a Boulder-based functional medicine practice serving patients across Colorado and
                the United States by telehealth. The services on this page are not a menu of unrelated add-ons —
                they are the steps of one continuous care model: listen carefully, test thoughtfully, interpret
                patterns in context, and refine a plan as your body responds.
              </p>
              <p>
                Many people arrive after years of feeling dismissed, partially treated, or told that labs look
                “fine” while symptoms continue. Our clinical work focuses on connections that standard visits often
                separate: gut barrier function and immune activity, thyroid antibodies and nutrient status,
                inflammation markers and daily energy, brain-based symptoms and physical drivers. We do not claim
                cures. We do claim a structured process for asking better questions.
              </p>
              <p>
                Care is led by Dr. Ian Hollaman, DC, MSc, FMCP, with support from the clinical team and a dedicated
                Metabolic Coordinator. Visits happen by secure video. Lab draws happen near you. Between
                appointments, the{" "}
                <Link href="/patient-portal/" className="font-medium text-primary hover:underline">
                  patient portal
                </Link>{" "}
                keeps messaging, results, and paperwork in one place.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative overflow-hidden">
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl">
            <h2 className="text-center text-3xl font-extrabold text-ink sm:text-4xl">What Working With Us Includes</h2>
            <p className="mt-4 text-center text-base text-ink-soft">
              Drawn from how care actually runs at Dr. Autoimmune — not a menu of invented add-ons.
            </p>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            {CARE_DETAILS.map((item) => (
              <Reveal key={item.title} className="rounded-card border border-gray bg-white p-6 shadow-card sm:p-8">
                <h3 className="text-xl font-extrabold text-ink">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-ink-soft">{item.body}</p>
                <Link href={item.href} className="mt-4 inline-flex font-semibold text-primary hover:underline">
                  Learn more →
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Who These Services Are For</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              You do not need a perfect diagnosis to start a conversation. You do need curiosity about drivers —
              and willingness to coordinate with specialists when organ involvement or disease-modifying therapy
              requires it.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {WHO_WE_HELP.map((item) => (
              <Reveal key={item.title} className="rounded-card border border-gray bg-white p-6 shadow-card">
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-6 text-base leading-relaxed text-ink-soft">
            <p>
              Browse the full list on{" "}
              <Link href="/conditions-we-support/" className="font-medium text-primary hover:underline">
                conditions we support
              </Link>
              , or start with hubs such as{" "}
              <Link href="/thyroid-conditions/" className="font-medium text-primary hover:underline">
                thyroid conditions
              </Link>{" "}
              and educational articles on the{" "}
              <Link href="/blog/" className="font-medium text-primary hover:underline">
                blog
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">How Care Typically Unfolds</h2>
            <p className="mt-3 text-base text-ink-soft">
              The sequence below reflects the process described across our discovery call, evaluation, and ongoing
              care pages — so you know what “services” actually means in practice.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {CARE_JOURNEY.map((step, i) => (
              <Reveal key={step.title} className="rounded-card border border-gray bg-cream-wash/60 p-6">
                <p className="font-mono text-xs font-medium uppercase tracking-wide text-primary">
                  Phase {i + 1}
                </p>
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
            <h2 className="text-3xl font-extrabold text-ink">Testing &amp; Nutrition Support</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Evaluations often include review of an extensive blood panel (the practice describes an 83+ marker
                panel coordinated through partners such as Evexia, with draws at LabCorp locations). Results are
                interpreted in context of your history — not in isolation. Requisitions and results can flow through
                your secure patient portal so you are not chasing paperwork between visits.
              </p>
              <p>
                Nutrition guidance, gut-focused dietary strategies (including patterns such as the{" "}
                <Link href="/learn/autoimmune-protocol-diet/" className="font-medium text-primary hover:underline">
                  autoimmune protocol diet
                </Link>{" "}
                when appropriate), and supplement recommendations are individualized. Wellness products are also
                available through our{" "}
                <Link href="/store/" className="font-medium text-primary hover:underline">
                  store
                </Link>{" "}
                and{" "}
                <a
                  href="https://shop.drautoimmune.com/"
                  className="font-medium text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  online shop
                </a>
                . Supplements are tools within a plan — not a substitute for evaluation or specialty care when those
                are needed.
              </p>
              <p>
                For attention, mood, and related brain-based symptoms, the team may incorporate neurofeedback brain
                training as part of a broader functional medicine plan. Session needs are individualized; see our{" "}
                <Link href="/adhd-add/" className="font-medium text-primary hover:underline">
                  ADHD / ADD
                </Link>{" "}
                and{" "}
                <Link href="/anxiety-depression/" className="font-medium text-primary hover:underline">
                  anxiety &amp; depression
                </Link>{" "}
                pages for how that fits.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Serving Boulder, Denver &amp; Patients Nationwide</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Our practice is based in Boulder, Colorado. Because visits are telehealth, patients in Denver and
                across the Front Range can work with the team without commuting for every appointment. Lab work is
                coordinated at a draw site convenient to you. The same remote model serves USA patients outside
                Colorado.
              </p>
              <p>
                If you are comparing local options, start with our{" "}
                <Link
                  href="/areas-we-serve/colorado/denver/"
                  className="font-medium text-primary hover:underline"
                >
                  Denver patients page
                </Link>{" "}
                for how Boulder-based telehealth works for metro patients, then book a{" "}
                <Link href={DISCOVERY_CALL_HREF} className="font-medium text-primary hover:underline">
                  discovery call
                </Link>{" "}
                to confirm fit. Questions before you book? Call{" "}
                <a href={SITE_CONTACT.phoneHref} className="font-medium text-primary hover:underline">
                  {SITE_CONTACT.phone}
                </a>{" "}
                or use the{" "}
                <Link href="/contact-us/" className="font-medium text-primary hover:underline">
                  contact form
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-3xl font-extrabold text-ink">Frequently Asked Questions</h2>
            <div className="mt-6">
              <FaqAccordion items={FAQS} />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="primary" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Not Sure Where to Start?</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              A discovery call is the easiest way to talk through your history and find the right starting point.
            </p>
            <div className="mt-8">
              <Button href={DISCOVERY_CALL_HREF} variant="secondary" size="lg" className="uppercase tracking-wide">
                Book your Discovery Call
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function ServiceCard({
  item,
  index,
}: {
  item: (typeof SERVICE_PATHWAYS)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  const external = item.href.startsWith("http");
  return (
    <Reveal delay={index * 0.1} y={28}>
      <a
        href={item.href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className="group flex h-full flex-col overflow-hidden rounded-card border border-gray bg-white shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-card-hover"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/5 to-transparent" />
          <motion.span
            initial={reduce ? undefined : { scale: 0, rotate: -25 }}
            whileInView={{ scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: index * 0.1 + 0.15, ease: EASE }}
            className="absolute left-4 top-4 flex h-12 w-12 items-center justify-center rounded-lg bg-white text-primary shadow-card transition-colors group-hover:bg-primary group-hover:text-white"
          >
            <Icon name={item.icon} className="h-6 w-6" />
          </motion.span>
        </div>
        <div className="flex flex-1 flex-col p-7">
          <h3 className="text-xl font-extrabold text-ink">{item.title}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{item.description}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Learn More
            <Icon name="arrow-right" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </span>
        </div>
        <span
          aria-hidden="true"
          className="h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
        />
      </a>
    </Reveal>
  );
}
