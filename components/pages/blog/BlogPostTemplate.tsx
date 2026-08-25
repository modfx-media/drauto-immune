"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import JsonLd from "@/components/JsonLd";
import ReadingProgressBar from "@/components/ui/ReadingProgressBar";
import BlogMarkdown from "./BlogMarkdown";
import BlogCard from "./BlogCard";
import type { PageContent } from "@/lib/content";
import { formatBlogDate, stripSiteSuffix, type BlogPostSummary } from "@/lib/blog-posts";
import { splitMarkdownSections } from "@/lib/markdown-sections";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";

const EASE = [0.22, 1, 0.36, 1] as const;

/** Featured image band with a "Ken Burns" zoom-out on mount — starts
 * slightly zoomed in and settles to its natural scale. */
function FeaturedImage({ src, alt }: { src: string; alt: string }) {
  const reduce = useReducedMotion();
  return (
    <div className="relative aspect-[16/9] w-full overflow-hidden rounded-card bg-sage shadow-card sm:aspect-[21/9]">
      <motion.div
        className="absolute inset-0"
        initial={reduce ? undefined : { scale: 1.16 }}
        animate={{ scale: 1 }}
        transition={{ duration: 5, ease: EASE }}
      >
        <Image
          src={src}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 900px, 100vw"
          className="object-cover"
          priority
        />
      </motion.div>
    </div>
  );
}

/** Dark gradient hero band matching `InnerPageHero`'s visual language, with
 * an added byline row (publish date + reading time) specific to posts. */
function PostHero({
  title,
  date,
  readingTime,
}: {
  title: string;
  date: string | null;
  readingTime: string | null;
}) {
  const reduce = useReducedMotion();
  return (
    <section className="relative overflow-hidden py-section-xl md:py-section-2xl">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          maskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(ellipse 75% 75% at 50% 45%, black 20%, transparent 85%)",
        }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-primary/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 bottom-0 h-64 w-64 rounded-full bg-white/5 blur-3xl"
      />

      <Container className="relative">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-mono text-xs font-medium uppercase tracking-[0.12em] text-white/70 sm:text-sm">Blog</p>
          <h1 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl md:text-5xl">{title}</h1>
          {(date || readingTime) && (
            <div className="mt-5 flex items-center justify-center gap-3 text-sm text-white/75">
              {date && <span>{date}</span>}
              {date && readingTime && <span aria-hidden="true">•</span>}
              {readingTime && <span>{readingTime}</span>}
            </div>
          )}
        </motion.div>
      </Container>
    </section>
  );
}

function MidCta() {
  return (
    <Reveal className="relative mt-10 overflow-hidden rounded-card bg-[linear-gradient(135deg,var(--ink)_0%,color-mix(in_srgb,var(--ink)_42%,var(--primary))_58%,var(--primary-active)_100%)] p-8 text-center text-white sm:p-10">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-16 -top-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-10 -bottom-16 h-56 w-56 rounded-full bg-white/10 blur-3xl"
      />
      <div className="relative mx-auto max-w-xl">
        <h2 className="text-2xl font-extrabold text-sage sm:text-3xl">Ready to Find Your Root Cause?</h2>
        <p className="mt-3 text-base text-white/75">
          Book a discovery call and talk through your symptoms with our team, no obligation.
        </p>
        <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="mt-6 uppercase tracking-wide">
          Book your Discovery Call
        </Button>
      </div>
    </Reveal>
  );
}

function RecentBlogsSidebar({ posts: recent }: { posts: BlogPostSummary[] }) {
  if (recent.length === 0) return null;

  return (
    <aside className="w-full shrink-0 lg:sticky lg:top-28 lg:w-80">
      <Reveal className="rounded-card border border-gray bg-white p-6 shadow-card">
        <Badge>Recent Blogs</Badge>
        <div className="mt-4 flex flex-col divide-y divide-gray">
          {recent.map((post, i) => (
            <motion.div
              key={post.slug}
              className="py-2 first:pt-0 last:pb-0"
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: EASE }}
            >
              <BlogCard post={post} variant="compact" />
            </motion.div>
          ))}
        </div>
        <Button href="/blog/" variant="secondary" size="sm" className="mt-5 w-full">
          View All Posts
        </Button>
      </Reveal>
    </aside>
  );
}

/**
 * Shared bespoke template for all 27 migrated blog posts. Renders a dark
 * gradient title hero (date + reading time byline), a Ken-Burns featured
 * image, the post body (split into `##`-bounded sections, each its own
 * scroll-triggered fade-up), a "Recent Blogs" sidebar with a staggered
 * entrance, a mid-article CTA banner, and a top reading-progress bar.
 * Preserves every JSON-LD block captured from the live post verbatim.
 */
export default function BlogPostTemplate({
  page,
  recentPosts,
}: {
  page: PageContent;
  recentPosts: BlogPostSummary[];
}) {
  const title = stripSiteSuffix(page.title);
  const date = formatBlogDate(page.datePublished ?? null);
  const readingTime = page.readingTime ?? null;
  const sections = splitMarkdownSections(page.bodyMarkdown);

  return (
    <>
      <JsonLd blocks={page.jsonLd} />
      <ReadingProgressBar />
      <PostHero title={title} date={date} readingTime={readingTime} />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          {page.featuredImage && <FeaturedImage src={page.featuredImage.src} alt={page.featuredImage.alt} />}

          <div className="mt-10 flex flex-col gap-10 lg:flex-row lg:items-start">
            <article className="min-w-0 flex-1">
              {sections.map((section, i) => (
                <Reveal key={i} delay={Math.min(i * 0.04, 0.24)}>
                  <BlogMarkdown markdown={section} />
                </Reveal>
              ))}
              <MidCta />
            </article>

            <RecentBlogsSidebar posts={recentPosts} />
          </div>
        </Container>
      </Section>
    </>
  );
}
