import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { DISCOVERY_CALL_HREF } from "@/components/layout/nav-links";
import { WEBINAR_SCHEDULE } from "@/content/webinar-schedule";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

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

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>2026 Webinar Schedule</Badge>
            <h2 className="mt-4 text-2xl font-extrabold text-ink sm:text-3xl">Upcoming Sessions</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Each session is hosted live and includes time for live Q&amp;A.
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
