"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { PRODUCTS, PRODUCTS_CATALOG } from "@/content/home-content";

const EASE = [0.22, 1, 0.36, 1] as const;

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
          <Reveal className="mx-auto mb-12 max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Clinically Selected</Badge>
            <h2>Products We Recommend</h2>
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
