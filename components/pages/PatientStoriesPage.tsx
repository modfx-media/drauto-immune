"use client";

import { motion } from "motion/react";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";

const TESTIMONIALS = [
  {
    quote: "They see what other doctors miss; their thorough, evidence-based care gave me hope again.",
    name: "Devin P.",
    condition: "Complex Chronic History",
  },
  {
    quote: "Every visit felt respectful and compassionate, even for hard to treat issues, I finally had a doctor who listened.",
    name: "Yulia L.",
    condition: "Musculoskeletal / Pain Issues",
  },
  {
    quote: "After frustration with traditional care, I found talented, caring support that helped my recovery, and I recommend them wholeheartedly.",
    name: "Colton W.",
    condition: "Injury Recovery / Chronic Pain",
  },
  {
    quote: "After five years of chronic inflammation and joint pain, I'm finally pain free.",
    name: "Jennifer D.",
    condition: "Polymyalgia Rheumatica",
  },
  {
    quote: "I lost 25 lbs, my joints stopped hurting, and I finally have real energy again.",
    name: "Lisa H.",
    condition: "Thyroid + Neuropathy",
  },
  {
    quote: "Within a month of supplements and diet I dropped 20 lbs, and the brain fog and bloating vanished.",
    name: "John G.",
    condition: "Autoimmune / Chronic Issues",
  },
  {
    quote: "My digestion improved, my energy returned, and I finally felt like I was healing.",
    name: "Megan K.",
    condition: "Hashimoto's / Thyroid Dysfunction",
  },
  {
    quote: "For the first time, I felt heard, understood, and truly supported by someone who cared.",
    name: "Tammy C.",
    condition: "Autoimmune / Chronic Symptoms",
  },
  {
    quote: "I found hope again. After years of unexplained symptoms, I'm finally seeing clarity and progress.",
    name: "Marc M.",
    condition: "Lyme & Complex Health History",
  },
  {
    quote: "Even working overseas, their remote care felt personal, professional and life-changing.",
    name: "Frances G.",
    condition: "Remote / Telehealth Patient",
  },
  {
    quote: "After years of acne and hormonal imbalance, my skin cleared up and I started feeling like myself.",
    name: "Monica C.",
    condition: "Hormonal & Skin Issues",
  },
  {
    quote: "After exhaustive conventional testing, Dr. Autoimmune identified the root cause, and I finally got relief.",
    name: "Kara W.",
    condition: "Digestive / Gut Health Issues",
  },
  {
    quote: "Two years in, and I still rely on their personalized care. I know my health is stable because I understand my body.",
    name: "Debbie C.",
    condition: "Long-Term Patient",
  },
];

const VIDEOS = [
  { id: "gQqdbea0WmE", title: "Patients Share How Dr. Ian Helped Them Find Answers" },
  { id: "hXaRVdGnjP4", title: "Jennifer's Polymyalgia Rheumatica Testimonial" },
  { id: "ynnhLAQ89a8", title: "John's Testimonial" },
  { id: "1lON3qtFem0", title: "How I Got My Life Back After Months of Being Sick" },
  { id: "wshDrbMJyJM", title: "7 Years of No Answers: Until Dr. Ian | Real Family Story" },
  { id: "m4e7Mcq7MvQ", title: "\u201cDr. Ian Changed My Life\u201d | Real Patient Story" },
  { id: "DGQQSby21mM", title: "Diagnosed With MS: Then Everything Changed | Dr. Ian" },
  { id: "puLRCDWdZ6M", title: "Chronic GI Issues Nearly Ended Her Career" },
  { id: "hmmI1TawGxQ", title: "Pain Took My Life Away: Dr. Ian Gave It Back" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export default function PatientStoriesPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Patient Stories"
        title="Real Patient Stories and Testimonials"
        accent="Patient Stories"
        subhead="Honest experiences from patients across the United States who finally found answers, clarity, and meaningful improvement."
        image={{ src: "/images/migrated/conditions-we-support/istockphoto-2007887786-612x612-1.jpg", alt: "Smiling patient reviewing her care plan" }}
      />

      {/* Intro */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-3xl space-y-6 text-center">
            <Badge className="mb-2 inline-flex">Real Results</Badge>
            <p className="text-lg leading-relaxed text-ink-soft">
              Many people who come to us have felt unheard, dismissed, or stuck for years. They&rsquo;ve seen
              multiple providers, collected disconnected information, and still do not feel like themselves.
            </p>
            <p className="text-lg leading-relaxed text-ink-soft">
              These stories reflect what becomes possible when someone is finally met with a team that listens,
              understands, and looks deeper to find what is driving their symptoms. Every transformation you see
              here began with a simple conversation.
            </p>
          </Reveal>
        </Container>
      </Section>

      {/* Video testimonials */}
      <Section bg="cream-wash">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">What Patients Share About Their Journey</Badge>
            <h2>
              Watch Their <Accent>Stories</Accent>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Check out our patient testimonials below to hear how we&rsquo;ve impacted their health journeys.
            </p>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEOS.map((video, i) => (
              <Reveal key={video.id} delay={i * 0.06}>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="overflow-hidden rounded-card border border-gray bg-white shadow-card transition-shadow duration-300 hover:shadow-card-hover"
                >
                  <div className="relative aspect-video">
                    <iframe
                      src={`https://www.youtube.com/embed/${video.id}?rel=0`}
                      title={video.title}
                      loading="lazy"
                      allowFullScreen
                      className="absolute inset-0 h-full w-full"
                    />
                  </div>
                  <p className="p-4 text-sm font-medium text-ink">{video.title}</p>
                </motion.div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Testimonial cards — staggered grid with hover-lift */}
      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="primary" variant="orbs" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2>
              Stories from Patients Who Discovered <Accent>Answers</Accent> They&rsquo;d Been Searching For
            </h2>
          </Reveal>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <Reveal key={t.name} delay={i * 0.05} className="group h-full">
                <div className="relative flex h-full flex-col overflow-hidden rounded-card border border-gray bg-sage p-6 shadow-card transition-all duration-300 hover:-translate-y-1.5 hover:shadow-card-hover">
                  <Icon name="quote" className="absolute right-5 top-5 h-8 w-8 text-primary/10" />
                  <div className="relative flex gap-0.5 text-primary">
                    {Array.from({ length: 5 }).map((_, s) => (
                      <Icon key={s} name="star" className="h-4 w-4" />
                    ))}
                  </div>
                  <p className="relative mt-4 flex-1 text-base leading-relaxed text-ink">&ldquo;{t.quote}&rdquo;</p>
                  <div className="relative mt-5 border-t border-primary/15 pt-4">
                    <p className="text-sm font-semibold text-ink">{t.name}</p>
                    <p className="text-xs text-ink-soft">{t.condition}</p>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-1 w-full origin-left scale-x-0 bg-primary transition-transform duration-300 group-hover:scale-x-100"
                  />
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Closing CTA */}
      <Section bg="primary" className="relative overflow-hidden">
        <div aria-hidden="true" className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-white/[0.06] blur-3xl" />
        <div aria-hidden="true" className="pointer-events-none absolute -right-16 bottom-0 h-64 w-64 rounded-full bg-white/[0.05] blur-3xl" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <h2 className="text-white">Ready to Write Your Own Story?</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/85">
              A discovery call is a no-pressure way to see whether our approach feels right for you.
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
