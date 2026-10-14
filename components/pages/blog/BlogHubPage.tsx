"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "motion/react";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import InnerPageHero from "@/components/ui/InnerPageHero";
import SectionAmbient from "@/components/home/SectionAmbient";
import Reveal from "@/components/home/Reveal";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import BlogCard from "./BlogCard";
import type { BlogPostSummary } from "@/lib/blog-posts";

const EASE = [0.22, 1, 0.36, 1] as const;
const PAGE_SIZE = 9;

const TOPIC_GUIDES = [
  {
    title: "Gut health and autoimmunity",
    body: "Articles on intestinal permeability, dysbiosis, food reactions, and how digestive patterns can amplify immune symptoms — written to help you ask better questions of your care team.",
  },
  {
    title: "Thyroid labs beyond a single TSH",
    body: "Explainers on normal-TSH symptoms, antibody context, and why thyroid stories often need a wider panel and gut-immune lens — themes that also appear on our thyroid condition pages.",
  },
  {
    title: "Inflammation, ANA, and confusing labs",
    body: "Guides that unpack positive ANA results, CRP, and other markers patients often see without enough context — always with the reminder that labs need clinical interpretation.",
  },
  {
    title: "Fatigue, skin, and multi-system clues",
    body: "Pieces on chronic fatigue patterns, autoimmune skin clues, POTS-related questions, and other cross-system signals that show up in functional medicine evaluations.",
  },
];

const FAQS = [
  {
    question: "Who writes these articles?",
    answer: [
      "Articles are published by the Dr. Autoimmune team to educate patients and visitors about root-cause functional medicine themes. They are educational — not a diagnosis or personalized treatment plan.",
    ],
  },
  {
    question: "Can I use the blog instead of booking a visit?",
    answer: [
      "The blog helps you understand patterns and prepare better questions. Care decisions still require a clinical conversation. Start with a discovery call if you want to explore working with the practice.",
    ],
  },
  {
    question: "How do I find an article on a specific topic?",
    answer: [
      "Use the search box on this page to filter by words in titles and excerpts. You can also browse related reading links from condition pages and learn guides across the site.",
    ],
  },
];

const gridVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: EASE } },
};

/**
 * `/blog/` hub — a searchable, paginated grid of every migrated post
 * preview. The grid stagger-fades in on scroll and each `BlogCard`
 * hover-lifts with an image scale-up (see `BlogCard`). No live taxonomy
 * data was captured for the posts, so filtering is a simple client-side
 * title/excerpt search rather than fabricated categories.
 */
export default function BlogHubPage({ posts: allPosts }: { posts: BlogPostSummary[] }) {
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allPosts;
    return allPosts.filter(
      (post) => post.title.toLowerCase().includes(q) || post.excerpt.toLowerCase().includes(q)
    );
  }, [allPosts, query]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const paged = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <>
      <InnerPageHero
        eyebrow={`${allPosts.length} Articles`}
        title="Insights for Autoimmune & Gut Health"
        accent="Autoimmune & Gut Health"
        subhead="Root-cause explainers, symptom deep-dives, and practical guidance from our functional medicine team."
        image={{ src: "/images/blog/blog-hub-banner.png", alt: "Desk with a laptop and notebook, wellness graphic overlay" }}
      />

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Better Answers Begin with Better Understanding</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                The Dr. Autoimmune blog collects educational articles on immune health, gut function, thyroid
                patterns, inflammation markers, and the practical questions patients ask before and during root-cause
                care. Posts are written to clarify — not to replace — clinical evaluation with Dr. Ian Hollaman, DC,
                MSc, FMCP and the care team.
              </p>
              <p>
                If you have been living with autoimmune symptoms, unexplained fatigue, confusing labs, or gut issues
                that never quite resolve, these articles are meant to help you see connections and prepare for a more
                productive conversation with a clinician. They reflect the same voice used across our{" "}
                <Link href="/services/" className="font-medium text-primary hover:underline">
                  services
                </Link>{" "}
                and{" "}
                <Link href="/conditions-we-support/" className="font-medium text-primary hover:underline">
                  conditions
                </Link>{" "}
                pages: direct, educational, and careful about what functional medicine can and cannot claim.
              </p>
              <p>
                Care itself is delivered by telehealth from our Boulder, Colorado practice to patients across the
                United States. When reading sparks a next step, you can{" "}
                <Link href={DISCOVERY_CALL_HREF} className="font-medium text-primary hover:underline">
                  book a discovery call
                </Link>{" "}
                (about 20 minutes, USA only) or explore how Front Range visits work on our{" "}
                <Link
                  href="/areas-we-serve/colorado/denver/"
                  className="font-medium text-primary hover:underline"
                >
                  Denver patients page
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Topics You Will Find Here</h2>
            <p className="mt-3 text-base text-ink-soft">
              Use search below to jump to a specific phrase, or browse with these themes in mind.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {TOPIC_GUIDES.map((topic) => (
              <Reveal key={topic.title} className="rounded-card border border-gray bg-cream-wash/60 p-6">
                <h3 className="text-lg font-extrabold text-ink">{topic.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{topic.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-base leading-relaxed text-ink-soft">
            <p>
              For structured deep-dives outside the blog grid, see our{" "}
              <Link href="/learn/" className="font-medium text-primary hover:underline">
                learn library
              </Link>{" "}
              and{" "}
              <Link href="/featured-interviews/" className="font-medium text-primary hover:underline">
                featured interviews
              </Link>{" "}
              with Dr. Hollaman on podcasts covering leaky gut, autoimmunity, and thyroid themes.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-extrabold text-ink">All Articles</h2>
            <p className="mt-3 text-base text-ink-soft">
              Search titles and excerpts, then open any post for the full explainer.
            </p>
          </Reveal>

          <div className="mx-auto mt-8 max-w-xl">
            <label htmlFor="blog-search" className="sr-only">
              Search articles
            </label>
            <input
              id="blog-search"
              type="search"
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Search articles…"
              className="w-full rounded-pill border border-gray bg-white px-5 py-3 text-sm text-ink shadow-card transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/30"
            />
          </div>

          {paged.length === 0 ? (
            <p className="mt-16 text-center text-ink-soft">No articles match &ldquo;{query}&rdquo;.</p>
          ) : (
            <motion.ul
              key={`${currentPage}-${query}`}
              className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
              variants={gridVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              {paged.map((post) => (
                <motion.li key={post.slug} variants={cardVariants}>
                  <BlogCard post={post} />
                </motion.li>
              ))}
            </motion.ul>
          )}

          {totalPages > 1 && (
            <nav aria-label="Blog pagination" className="mt-14 flex flex-wrap items-center justify-center gap-2">
              <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                className="rounded-pill border border-gray px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sage disabled:pointer-events-none disabled:opacity-40"
              >
                Prev
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setPage(n)}
                  aria-current={n === currentPage ? "page" : undefined}
                  className={[
                    "h-9 w-9 rounded-full text-sm font-medium transition-colors",
                    n === currentPage ? "bg-primary text-white" : "text-ink hover:bg-sage",
                  ].join(" ")}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                className="rounded-pill border border-gray px-4 py-2 text-sm font-medium text-ink transition-colors hover:bg-sage disabled:pointer-events-none disabled:opacity-40"
              >
                Next
              </button>
            </nav>
          )}
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">How to Use These Articles Well</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Read for patterns, not for self-diagnosis. A positive ANA, a high CRP, a “normal” TSH with ongoing
                symptoms, or a gut flare after clean eating each deserves clinical context. Our posts explain why
                those moments feel confusing and what kinds of follow-up questions are reasonable to ask.
              </p>
              <p>
                Pair articles with condition pages when you have a named diagnosis, and with{" "}
                <Link href="/patient-stories/" className="font-medium text-primary hover:underline">
                  patient stories
                </Link>{" "}
                when you want to hear how others describe working with the team. Educational webinars on the{" "}
                <Link href="/live-webinar-schedule/" className="font-medium text-primary hover:underline">
                  live webinar schedule
                </Link>{" "}
                offer another way to learn in a group setting with live Q&amp;A.
              </p>
              <p>
                When you are ready for individualized care, the path is the same as elsewhere on the site: discovery
                call for fit, new patient evaluation for deeper history and labs (including extensive marker panels
                coordinated through partners such as Evexia with LabCorp draws when indicated), then ongoing support
                with the clinical team and Metabolic Coordinator.
              </p>
              <p>
                New posts appear at the top of the grid as they are published. Older explainers stay available because
                autoimmune and gut questions rarely expire overnight — a piece on leaky gut, ANA confusion, or thyroid
                symptoms with a normal TSH can still be the right starting point months later. Bookmark this hub, use
                search when you remember a phrase, and bring the article that resonated most into your discovery call
                so the New Patient Coordinator understands what already made sense to you.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-3xl font-extrabold text-ink">Blog FAQ</h2>
            <div className="mt-6">
              <FaqAccordion items={FAQS} />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
