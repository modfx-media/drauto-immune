import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";

const CARD_CLASSES = "rounded-card border border-gray bg-white shadow-card";

/** Real external patient portal / EHR system used site-wide (matches the live header/footer link). */
const PORTAL_URL = "https://drautoimmune.md-hq.com/";

const PORTAL_FEATURES: { title: string; description: string; icon: IconName }[] = [
  {
    title: "Message Your Care Team",
    description: "Send secure messages to your care team between visits and get guidance on your plan.",
    icon: "users",
  },
  {
    title: "View Lab Results",
    description: "Review your blood panel and lab results as soon as they're ready, from anywhere.",
    icon: "clipboard",
  },
  {
    title: "Manage Appointments",
    description: "See upcoming visits, reschedule when life happens, and keep your intake paperwork up to date.",
    icon: "clock",
  },
];

/**
 * `/patient-portal/` — the live equivalent page has no real content of its
 * own (just boilerplate logo + tagline); the site's actual "Patient
 * Portal" functionality is an external MD-HQ system linked from every
 * header/footer nav (`https://drautoimmune.md-hq.com/`). This page is
 * therefore built as a short, honest bridge page explaining what the
 * portal is for, with a clear CTA out to that real external system rather
 * than fabricating content that doesn't exist live.
 */
export default function PatientPortalPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Patient Portal"
        title="Your Health Records, Always Within Reach"
        accent="Always Within Reach"
        subhead="Securely message your care team, review lab results, and manage your visits, all in one place."
        image={{ src: "/images/approach/main.webp", alt: "Doctor reviewing a patient's chart" }}
      />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <Reveal className={`mx-auto max-w-2xl ${CARD_CLASSES} p-8 text-center sm:p-12`}>
            <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Access Your Patient Portal</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Our secure patient portal keeps your care in one place, message your team, review your results, and
              stay on top of your appointments, wherever you are.
            </p>
            <Button href={PORTAL_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" className="mt-6">
              Go to Patient Portal
            </Button>
          </Reveal>

          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-1 gap-6 sm:grid-cols-3">
            {PORTAL_FEATURES.map((feature, i) => (
              <Reveal key={feature.title} delay={Math.min(i * 0.08, 0.24)} className={`${CARD_CLASSES} h-full p-6`}>
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white">
                  <Icon name={feature.icon} className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-extrabold text-ink">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-soft">{feature.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
