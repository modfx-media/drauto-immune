"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
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
    description: "Start with a comprehensive intake so our team can understand your full history before building your plan.",
    href: "/book-new-patient-evaluation/",
    icon: "clipboard",
    image: "/images/services/new-patient-evaluation.jpg",
  },
  {
    title: "Conditions We Support",
    description: "Explore the autoimmune, thyroid, and chronic conditions our functional medicine team regularly treats.",
    href: "/conditions-we-support/",
    icon: "shield",
    image: "/images/migrated/conditions-we-support/large-7.webp",
  },
  {
    title: "Wellness Services",
    description: "Ongoing nutrition, testing, and supplement support designed to keep your plan moving forward.",
    href: "/wellness-services/",
    icon: "heart-pulse",
    image: "/images/services/wellness-services.jpg",
  },
  {
    title: "Patient Portal",
    description: "Securely access your records, lab results, and care plan between visits.",
    href: "/patient-portal/",
    icon: "users",
    image: "/images/approach/main.webp",
  },
];

export default function ServicesPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Services"
        title="Personalized Functional Medicine Services"
        accent="Functional Medicine"
        subhead="Every pathway into care, from your first evaluation to ongoing wellness support."
        image={{ src: "/images/services/new-patient-evaluation.jpg", alt: "Doctor listening to a patient's heartbeat with a stethoscope" }}
      />

      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge className="mb-4 inline-flex">Our Services</Badge>
            <p className="text-lg leading-relaxed text-ink-soft">
              Whether you&rsquo;re beginning your first evaluation or looking for ongoing wellness support, our
              services are built around one goal: understanding what&rsquo;s really driving your symptoms and
              giving you a clear, personalized plan to address it &mdash; all through secure, convenient
              telehealth.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-8 sm:grid-cols-2">
            {SERVICE_PATHWAYS.map((item, i) => (
              <ServiceCard key={item.title} item={item} index={i} />
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="primary" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Not Sure Where to Start?</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              A discovery call is the easiest way to talk through your history and find the right starting
              point for your care.
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
  return (
    <Reveal delay={index * 0.1} y={28}>
      <a
        href={item.href}
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
        {/* Bottom accent line drawn in on hover */}
        <span
          aria-hidden="true"
          className="h-1 origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
        />
      </a>
    </Reveal>
  );
}
