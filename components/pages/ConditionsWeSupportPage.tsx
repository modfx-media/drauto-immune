"use client";

import Image from "next/image";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import StaggerList from "@/components/ui/StaggerList";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF, NAV_LINKS } from "@/components/layout/nav-links";

const CONDITION_LINKS = NAV_LINKS.find((item) => item.label === "Conditions")?.children ?? [];

const CARE_STEPS = [
  {
    title: "Discovery Call",
    description:
      "A personal conversation where you can share your symptoms, ask questions, and determine if our approach is the right fit for your health goals.",
  },
  {
    title: "New Patient Evaluation",
    description:
      "A personalized, in depth evaluation where our team reviews your health history, symptoms, and advanced bloodwork to identify patterns and better understand what may be contributing to how you feel.",
  },
  {
    title: "Personalized Care Plan",
    description:
      "A structured plan designed around your needs, including guidance on nutrition, lifestyle, supplementation, and next steps, along with ongoing support and communication from our team.",
  },
];

const SERVICE_CATEGORIES: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Autoimmune and Chronic Condition Support",
    description:
      "Root-cause evaluation and ongoing care for autoimmune, inflammatory, and complex chronic health concerns. We help identify underlying patterns and guide your body toward improved balance and function.",
    icon: "shield",
  },
  {
    title: "Thyroid and Hormone Health",
    description:
      "Comprehensive support for Hashimoto's, hypothyroidism, hormone imbalances, fatigue, and metabolic challenges. We assess patterns often missed in standard care and build a plan tailored to your physiology.",
    icon: "heart-pulse",
  },
  {
    title: "Gut and Digestive Health",
    description:
      "Targeted evaluation and guidance for microbiome issues, intestinal hyperpermeability, chronic bloating, reflux, IBS, and related symptoms. We use advanced testing and nutrition strategies to support gut repair and immune balance.",
    icon: "leaf",
  },
  {
    title: "Functional Blood Chemistry Analysis",
    description:
      "Deep analysis of your 83+ marker blood panel to uncover inflammation, immune dysregulation, nutrient status, thyroid patterns, metabolic concerns, and more using functional ranges to connect the dots that are often overlooked.",
    icon: "trending-up",
  },
  {
    title: "Functional Nutrition Support",
    description:
      "Personalized nutrition sessions focused on improving digestion, energy, inflammation, and metabolic stability. Every recommendation is practical, sustainable, and aligned with your lifestyle.",
    icon: "sparkles",
  },
  {
    title: "Therapeutic Supplementation Guidance",
    description:
      "A structured approach to selecting high-quality supplements that support your care plan. Dr. Hollaman recommends targeted formulations based on your lab findings and symptoms, helping you take only what your body needs.",
    icon: "clipboard",
  },
  {
    title: "Specialty and Advanced Testing",
    description:
      "When indicated, we use additional assessments such as stool testing, specialty hormone tests, and targeted metabolic evaluations to gain deeper insight into what may be contributing to your symptoms.",
    icon: "compass",
  },
];

const WHY_US = ["Root Cause Focus", "Personalized Care", "Thoughtful, Evidence-Informed Approach", "Fully Remote Support"];

const TESTIMONIALS = [
  {
    quote:
      "I went to one of Dr. Ian's thyroid seminars because I had been working with an Endocrinologist for hyperthyroid and was unhappy with my progress\u2026 6 months later, I have lost about 25 lbs, my joints don't hurt anymore and I feel much better and have more energy.",
    name: "Lisa Hansen Wade",
  },
  {
    quote:
      "Within a month of just supplements and diet I lost 20 pounds and am still continuing to lose weight. I no longer have brain fog or bloating. My energy is back and I feel like I am finally healing.",
    name: "Megan Kowsky",
  },
  {
    quote:
      "For the first time, a professional actually listened to my experience and validated my feelings and treated me like I was actually worthy of getting the help I was looking for\u2026 I can't say enough about how positive and life changing working with them was for me.",
    name: "Frances Giron",
  },
];

export default function ConditionsWeSupportPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Services"
        title="Conditions We Support"
        accent="We Support"
        subhead="A comprehensive functional medicine approach designed to uncover root causes, elevate wellbeing, and help you feel and function at your best, all delivered through 100% remote telehealth care."
        image={{ src: "/images/migrated/conditions-we-support/large-7.webp", alt: "Doctor reviewing notes at her desk" }}
      />

      {/* Intro */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-lg leading-relaxed text-ink-soft">
              Whether you are managing an autoimmune diagnosis, struggling with chronic symptoms, or simply wanting
              to optimize your health, functional medicine gives you a deeper way to understand what is happening in
              your body. Our care is designed to meet you wherever you are in your health journey. By taking the
              time to connect the dots between your symptoms, health history, labs, and daily patterns, we help you
              gain clarity, build a plan that makes sense, and move toward meaningful progress. Below, you&rsquo;ll
              find the key services and areas we most often support.
            </p>
            <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="uppercase tracking-wide">
              Book your Discovery Call
            </Button>
          </Reveal>

          {/* Three Part Care Process */}
          <Reveal delay={0.1} className="mx-auto mt-16 max-w-4xl">
            <h2 className="text-center text-2xl font-extrabold text-ink sm:text-3xl">The Three Part Care Process</h2>
            <ul className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
              {CARE_STEPS.map((step, i) => (
                <li key={step.title} className="rounded-card border border-gray bg-cream-wash p-6 shadow-card">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-semibold text-white">
                    {i + 1}
                  </span>
                  <p className="mt-4 font-semibold text-ink">{step.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.description}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.15} className="mx-auto mt-16 max-w-3xl overflow-hidden rounded-card shadow-card">
            <Image
              src="/images/migrated/conditions-we-support/large-7.webp"
              alt="Functional medicine consultation for chronic and autoimmune conditions"
              width={900}
              height={520}
              className="h-auto w-full object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      {/* Service categories */}
      <Section bg="cream-wash">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">What We Support</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Areas of Focus</h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_CATEGORIES.map((category, i) => (
              <Reveal key={category.title} delay={i * 0.05}>
                <li className="h-full rounded-card border border-gray bg-white p-6 shadow-card">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-sage text-primary">
                    <Icon name={category.icon} className="h-5 w-5" />
                  </span>
                  <p className="mt-4 font-semibold text-ink">{category.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-soft">{category.description}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.2} className="mx-auto mt-14 max-w-3xl overflow-hidden rounded-card shadow-card">
            <Image
              src="/images/migrated/conditions-we-support/istockphoto-2007887786-612x612-1.jpg"
              alt="Functional medicine lab testing and blood chemistry analysis"
              width={900}
              height={520}
              className="h-auto w-full object-cover"
            />
          </Reveal>
        </Container>
      </Section>

      {/* Browse conditions */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="primary" variant="orbs" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Conditions</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Browse Conditions We Support</h2>
            <p className="mt-3 text-base text-ink-soft">
              Explore how our root-cause approach applies to each condition we regularly treat.
            </p>
          </Reveal>
          <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONDITION_LINKS.map((condition) => (
              <li key={condition.href}>
                <Card
                  href={condition.href}
                  title={condition.label}
                  footer={<span className="text-sm font-medium text-primary">Learn more →</span>}
                  className="h-full"
                />
              </li>
            ))}
          </ul>
        </Container>
      </Section>

      {/* Why patients choose us */}
      <Section bg="cream-wash">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Why Patients Chose Our Care</h2>
          </Reveal>
          <div className="mx-auto mt-8 max-w-2xl">
            <StaggerList items={WHY_US} />
          </div>
        </Container>
      </Section>

      {/* Testimonials */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Patient Stories</Badge>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">What Our Patients Are Saying</h2>
          </Reveal>
          <ul className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.08}>
                <li className="h-full rounded-card border border-gray bg-cream-wash p-6 shadow-card">
                  <Icon name="quote" className="h-6 w-6 text-primary/50" />
                  <p className="mt-4 text-sm leading-relaxed text-ink-soft">“{t.quote}”</p>
                  <p className="mt-4 font-semibold text-ink">{t.name}</p>
                </li>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.15} className="mx-auto mt-16 max-w-3xl rounded-card border border-primary/15 bg-sage/60 p-8 text-center shadow-card sm:p-10">
            <p className="text-lg font-medium text-ink">
              These stories began with a simple conversation. Yours can too.
            </p>
            <p className="mt-2 text-base text-ink-soft">
              If you&rsquo;re wondering whether this kind of support could help you, we would love to talk.
            </p>
            <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="mt-6 uppercase tracking-wide">
              Book your Discovery Call
            </Button>
          </Reveal>

          <Reveal className="mt-14 border-t border-gray pt-8 text-center text-sm text-ink-soft">
            At <strong className="text-ink">Dr. Autoimmune</strong>, we provide personalized, root-cause care to
            uncover the source of your symptoms and support long-term wellness.
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
