import Link from "next/link";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { DISCOVERY_CALL_HREF, SITE_CONTACT } from "@/components/layout/nav-links";
import { WEBINAR_SCHEDULE } from "@/content/webinar-schedule";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

const WHAT_TO_EXPECT = [
  {
    title: "Live teaching with clinical context",
    body: "Sessions are hosted live and framed around root-cause approaches to autoimmune and thyroid health — themes that also appear across our blog, learn articles, and condition pages.",
  },
  {
    title: "Time for questions",
    body: "Each listed session includes time for live Q&A so you can clarify concepts that never fit into a short social-media clip.",
  },
  {
    title: "Education first, care second",
    body: "Webinars are educational. They do not replace a discovery call, new patient evaluation, or specialty care. If you want individualized support afterward, booking paths remain available on the site.",
  },
];

const TOPIC_CONTEXT = [
  {
    title: "Autoimmune thyroid beyond TSH",
    body: "Thyroid sessions expand on why a single TSH result rarely tells the whole story — a theme also covered on our thyroid condition hubs and related blog explainers.",
  },
  {
    title: "POTS, inflammation, and gut themes",
    body: "Other scheduled titles address POTS when salt and medications are not enough, leaky gut patterns clinicians often under-discuss, immune “rehab” framing, and CRP as a window into hidden inflammation.",
  },
  {
    title: "How this relates to care at Dr. Autoimmune",
    body: "The same Boulder-based telehealth practice that hosts education also offers discovery calls (about 20 minutes, USA only), evaluations that may include extensive marker panels coordinated through partners such as Evexia with LabCorp draws, and ongoing plans with the clinical team and Metabolic Coordinator.",
  },
];

const FAQS = [
  {
    question: "How do I register?",
    answer: [
      "Open a session with an active Register button. You will be taken to that date’s Zoom registration page. Sessions marked Coming Soon do not have a public registration link yet.",
    ],
  },
  {
    question: "Are past sessions still available?",
    answer: [
      "Past dates remain listed for transparency but registration is closed. Watch this page for future live dates, or browse the blog and learn library for related written education.",
    ],
  },
  {
    question: "Is a webinar the same as becoming a patient?",
    answer: [
      "No. Webinars are group education. To explore care with Dr. Ian Hollaman, DC, MSc, FMCP and the team, book a discovery call or use the contact form.",
    ],
  },
  {
    question: "Do you publish webinar fees here?",
    answer: [
      "Registration details live on each Zoom registration page linked from the schedule. This page does not invent prices; follow the Register link for the current offering on that date.",
    ],
  },
];

function formatSessionDate(iso: string) {
  const date = new Date(`${iso}T00:00:00`);
  return {
    month: date.toLocaleDateString("en-US", { month: "short" }).toUpperCase(),
    day: date.toLocaleDateString("en-US", { day: "2-digit" }),
    full: date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" }),
    isPast: date < new Date(new Date().toDateString()),
  };
}

/**
 * `/live-webinar-schedule/` — a real schedule page listing upcoming live
 * webinar sessions with individual registration links per date.
 */
export default function LiveWebinarSchedulePage() {
  // Upcoming sessions (soonest first) on top, past sessions sink to the bottom.
  const sortedSessions = [...WEBINAR_SCHEDULE].sort((a, b) => {
    const aPast = formatSessionDate(a.date).isPast;
    const bPast = formatSessionDate(b.date).isPast;
    if (aPast !== bPast) return aPast ? 1 : -1;
    return a.date.localeCompare(b.date);
  });

  return (
    <>
      <InnerPageHero
        eyebrow="Live Webinars"
        title="Join Our Live Webinar Schedule"
        accent="Live Webinar Schedule"
        subhead="Live educational sessions with Dr. Ian on root-cause approaches to autoimmune and thyroid health, reserve your seat below."
        image={{ src: "/images/live-webinar-schedule/laptop-video-call.jpg", alt: "Person joining a video call webinar on a laptop", dim: 0.7 }}
      />

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Learn Live With Dr. Autoimmune</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Live webinars give Dr. Ian Hollaman, DC, MSc, FMCP room to teach the patterns patients ask about most:
                thyroid autoimmunity beyond TSH, gut barrier dysfunction, inflammation markers, immune resilience, and
                complex symptom clusters such as POTS. Sessions are educational gatherings — not one-on-one medical
                visits — and they include time for live Q&amp;A.
              </p>
              <p>
                Dr. Autoimmune is a Boulder-based functional medicine practice serving patients nationwide by
                telehealth. The webinar schedule is one more way to engage with root-cause ideas before or alongside
                care. Front Range attendees can also read how clinical visits work for{" "}
                <Link
                  href="/areas-we-serve/colorado/denver/"
                  className="font-medium text-primary hover:underline"
                >
                  Denver patients
                </Link>{" "}
                if they decide to book individually later.
              </p>
              <p>
                Registration happens on Zoom for dates that have an open link. Dates labeled Coming Soon are reserved
                on the calendar while details are finalized — we do not invent registration URLs or prices here.
              </p>
              <p>
                Come prepared with one or two questions you have already asked other clinicians without a satisfying
                answer. Live Q&amp;A works best when you can state the pattern briefly — for example, symptoms with a
                “normal” TSH, gut flares that track stress, or confusion after a high CRP or positive ANA. Take notes,
                then use the blog, learn guides, or a discovery call if you want those ideas applied to your own
                history.
              </p>
            </div>
          </Reveal>
          <div className="mt-8 space-y-4">
            {WHAT_TO_EXPECT.map((item) => (
              <Reveal key={item.title} className={`${CARD_CLASSES} p-6`}>
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>2026 Webinar Schedule</Badge>
            <h2 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">Upcoming Sessions</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Each session is hosted live and includes time for live Q&amp;A. Past dates remain visible so you can see
              what has already run.
            </p>
          </Reveal>

          <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-5">
            {sortedSessions.map((session, index) => {
              const { month, day, full, isPast } = formatSessionDate(session.date);
              const isPending = session.registrationHref === null;
              const isMuted = isPast || isPending;

              return (
                <Reveal key={session.date} delay={index * 0.08}>
                  <div
                    className={`${CARD_CLASSES} flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:gap-6 sm:p-8 ${
                      isMuted ? "opacity-60 grayscale" : ""
                    }`}
                  >
                    <div className="flex shrink-0 flex-col items-center justify-center rounded-2xl bg-sage px-5 py-3 text-primary sm:w-24">
                      <span className="text-xs font-semibold tracking-wide uppercase">{month}</span>
                      <span className="text-3xl font-semibold leading-none">{day}</span>
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-primary">{full}</p>
                        {isPast && <Badge tone="neutral">Past</Badge>}
                        {isPending && <Badge tone="neutral">Coming Soon</Badge>}
                      </div>
                      <h3 className="mt-1 text-lg font-extrabold text-ink">{session.title}</h3>
                      {isPending && (
                        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                          Details to be announced. Registration isn&apos;t open yet.
                        </p>
                      )}
                    </div>

                    {isPast ? (
                      <span className="shrink-0 text-sm font-medium text-ink-soft">This session has passed</span>
                    ) : isPending ? null : (
                      <Button
                        href={session.registrationHref!}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Register for ${session.title}`}
                        variant="primary"
                        size="md"
                        className="sm:shrink-0"
                      >
                        Register
                      </Button>
                    )}
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Topics on This Season&rsquo;s Calendar</h2>
            <p className="mt-3 text-base text-ink-soft">
              Titles below match the sessions listed above. Use them as a reading map into related site content.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {TOPIC_CONTEXT.map((item) => (
              <Reveal key={item.title} className={`${CARD_CLASSES} p-6`}>
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 text-base leading-relaxed text-ink-soft">
            <p>
              Continue with written deep-dives on the{" "}
              <Link href="/blog/" className="font-medium text-primary hover:underline">
                blog
              </Link>
              , structured guides in the{" "}
              <Link href="/learn/" className="font-medium text-primary hover:underline">
                learn library
              </Link>
              , or podcast conversations on{" "}
              <Link href="/featured-interviews/" className="font-medium text-primary hover:underline">
                featured interviews
              </Link>
              . Questions about registration logistics can go to{" "}
              <a href={SITE_CONTACT.phoneHref} className="font-medium text-primary hover:underline">
                {SITE_CONTACT.phone}
              </a>{" "}
              or the{" "}
              <Link href="/contact-us/" className="font-medium text-primary hover:underline">
                contact form
              </Link>
              .
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Webinar FAQ</h2>
            <div className="mt-6">
              <FaqAccordion items={FAQS} />
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="sage" className="relative">
        <SectionAmbient tone="primary" variant="orbs" />
        <Container className="relative">
          <Reveal className={`mx-auto max-w-2xl ${CARD_CLASSES} p-8 text-center sm:p-12`}>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Prefer Individual Care?</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              If a live group session isn&apos;t the right fit, book a discovery call to talk through your
              situation directly with our team.
            </p>
            <Button href={DISCOVERY_CALL_HREF} variant="primary" size="lg" className="mt-6">
              Book a Discovery Call
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
