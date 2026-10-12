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
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";

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

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Testing &amp; Nutrition Support</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Evaluations often include review of an extensive blood panel (the practice describes an 83+ marker
                panel coordinated through partners such as Evexia, with draws at LabCorp locations). Results are
                interpreted in context of your history — not in isolation.
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
