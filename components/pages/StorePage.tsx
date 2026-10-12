"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import { PRODUCTS, PRODUCTS_CATALOG } from "@/content/home-content";

const EASE = [0.22, 1, 0.36, 1] as const;

const HOW_PRODUCTS_FIT = [
  {
    title: "Selected to support common foundations",
    body: "The products highlighted here — including gut mucosa support, collagen peptides, immune complexes, NAC, and a leaky-gut bundle — reflect categories the practice discusses in root-cause care: digestion, barrier integrity, immune signaling, and antioxidant pathways.",
  },
  {
    title: "Not a substitute for evaluation",
    body: "Supplements can support a plan; they cannot replace a discovery call, new patient evaluation, specialty care, or lab interpretation. If you have a complex autoimmune or chronic history, start with clinical guidance rather than self-selecting a full stack.",
  },
  {
    title: "Shop online when you are ready",
    body: "Browse the featured items below or open the full catalog on shop.drautoimmune.com. Product pages on Shopify carry the current details for each formula.",
  },
];

const FAQS = [
  {
    question: "Is the store the same as clinical care?",
    answer: [
      "No. The store and Shopify shop offer wellness products. Clinical services — discovery calls, evaluations, and ongoing functional medicine care — are scheduled separately through our booking pages.",
    ],
  },
  {
    question: "Do you publish supplement prices on this page?",
    answer: [
      "Current pricing lives on shop.drautoimmune.com so it stays accurate as inventory updates. Use the Shop Now links to see live details.",
    ],
  },
  {
    question: "Can I buy products if I am not yet a patient?",
    answer: [
      "Yes. The online shop is available to visitors. If you want products integrated into a personalized plan with lab context, book a discovery call to discuss care.",
    ],
  },
  {
    question: "How do these products relate to gut and autoimmune support?",
    answer: [
      "Many patients exploring root-cause care ask about gut barrier, digestion, and immune foundations. Featured formulas such as GutPower and the Leaky Gut Trio sit in that educational context. Individual needs vary — use clinical guidance when symptoms are complex.",
    ],
  },
];

export default function StorePage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Store"
        title="Explore Our Wellness Products"
        accent="Wellness Products"
        subhead={PRODUCTS.intro}
        image={{
          src: "/images/services/wellness-services.jpg",
          alt: "Couple enjoying improved wellness outdoors",
          position: "center 20%",
        }}
      />

      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto mb-12 max-w-3xl text-center">
            <Badge className="mb-4 inline-flex">Clinically Selected</Badge>
            <h2>Products We Recommend</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              These featured formulas are drawn from the Dr. Autoimmune Shopify catalog. They are offered as
              wellness tools that can sit alongside nutrition, lifestyle, and clinical guidance — not as standalone
              treatments or cure claims.
            </p>
          </Reveal>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PRODUCTS_CATALOG.map((product, i) => (
              <ProductCard key={product.slug} product={product} index={i} />
            ))}
          </div>

          <Reveal delay={0.15} className="mx-auto mt-14 max-w-xl text-center">
            <p className="text-base leading-relaxed text-ink-soft">
              Browse our full catalog of clinically selected supplements on our Shopify store.
            </p>
            <div className="mt-6">
              <Button href={PRODUCTS.cta.href} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
                {PRODUCTS.cta.label}
              </Button>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">How the Wellness Store Fits Root-Cause Care</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Dr. Autoimmune is a Boulder-based functional medicine practice delivering telehealth care across the
                United States. Nutrition guidance and supplement recommendations, when appropriate, are part of how
                personalized plans are built after evaluation — alongside history review, lab interpretation, and
                lifestyle support.
              </p>
              <p>
                This store page highlights products available through{" "}
                <a
                  href="https://shop.drautoimmune.com/"
                  className="font-medium text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  shop.drautoimmune.com
                </a>
                . It is a convenience layer for people who already know what they need, and an educational window
                into the kinds of foundations the practice often discusses: mucosal and digestive support, connective
                tissue and skin resilience, immune signaling support, and antioxidant pathways such as those supported
                by N-acetyl cysteine.
              </p>
              <p>
                If you are early in your journey — still sorting thyroid antibodies, gut flares, or multi-system
                symptoms — consider starting with a{" "}
                <Link href={DISCOVERY_CALL_HREF} className="font-medium text-primary hover:underline">
                  discovery call
                </Link>{" "}
                or reviewing{" "}
                <Link href="/services/" className="font-medium text-primary hover:underline">
                  services
                </Link>{" "}
                before building a supplement routine on your own.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {HOW_PRODUCTS_FIT.map((item) => (
              <Reveal key={item.title} className="rounded-card border border-gray bg-white p-6 shadow-card">
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
            <h2 className="text-3xl font-extrabold text-ink">Featured Formulas at a Glance</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                <strong className="text-ink">GutPower</strong> combines hydrochloric acid and zinc carnosine support
                aimed at stomach acid, mucosal lining, and healthy digestion — a common foundation when patients
                describe bloating, low appetite for protein, or gut discomfort alongside immune concerns.
              </p>
              <p>
                <strong className="text-ink">Collagen Power</strong> provides collagen peptides positioned for bone,
                joint, and skin support. Connective tissue resilience often comes up in conversations about recovery,
                training, and aging skin — always within a broader lifestyle picture.
              </p>
              <p>
                <strong className="text-ink">ImmunoPower</strong> is described as a comprehensive immune complex for
                immune signaling, T-cell function, and resilience. It is a wellness product, not a disease treatment,
                and belongs in individualized plans when the clinical team recommends it.
              </p>
              <p>
                <strong className="text-ink">NAC Power</strong> supplies N-acetyl cysteine to support glutathione,
                respiratory, and antioxidant pathways — areas patients frequently ask about when discussing oxidative
                stress and recovery capacity.
              </p>
              <p>
                <strong className="text-ink">Leaky Gut Trio</strong> is a curated three-supplement bundle oriented
                toward intestinal barrier integrity and gut healing themes that appear throughout our educational
                content on intestinal permeability and autoimmune flares.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Shopping Tips &amp; Next Steps</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Use Shopify for live inventory, shipping details, and product-specific information. This marketing
                page does not list prices so we never show outdated numbers. If a product is out of stock online,
                check back on the shop or ask the care team during a visit whether an alternative fits your plan.
              </p>
              <p>
                Patients already in care can discuss supplement timing and combinations with the clinical team and
                Metabolic Coordinator during follow-ups. Portal messaging is the secure channel for plan questions
                once you are enrolled.
              </p>
              <p>
                Want education before you buy? Explore gut and immune articles on the{" "}
                <Link href="/blog/" className="font-medium text-primary hover:underline">
                  blog
                </Link>
                , our{" "}
                <Link href="/learn/autoimmune-protocol-diet/" className="font-medium text-primary hover:underline">
                  autoimmune protocol diet guide
                </Link>
                , or condition pages under{" "}
                <Link href="/conditions-we-support/" className="font-medium text-primary hover:underline">
                  conditions we support
                </Link>
                .
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-3xl font-extrabold text-ink">Store FAQ</h2>
            <div className="mt-6">
              <FaqAccordion items={FAQS} />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof PRODUCTS_CATALOG)[number];
  index: number;
}) {
  const reduce = useReducedMotion();
  return (
    <Reveal delay={index * 0.08} y={28}>
      <a
        href={product.href}
        target="_blank"
        rel="noopener noreferrer"
        className="group flex h-full flex-col overflow-hidden rounded-card border border-gray bg-white shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-card-hover"
      >
        <div className="relative aspect-square overflow-hidden bg-sage">
          <span className="absolute right-4 top-2 z-10 accent-serif text-3xl text-primary/10">
            {String(index + 1).padStart(2, "0")}
          </span>
          <motion.div
            initial={reduce ? undefined : { scale: 0.85, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: index * 0.08 + 0.1, ease: EASE }}
            className="relative h-full w-full"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
              className="object-contain p-8 transition-transform duration-300 group-hover:scale-105"
            />
          </motion.div>
        </div>
        <div className="flex flex-1 flex-col p-6">
          <p className="font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary">{product.tagline}</p>
          <h3 className="mt-2 text-lg font-extrabold text-ink">{product.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-soft">{product.description}</p>
          <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            Shop Now
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
