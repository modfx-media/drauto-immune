import Link from "next/link";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { DISCOVERY_CALL_HREF, SITE_CONTACT } from "@/components/layout/nav-links";

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

const PORTAL_USES = [
  {
    title: "Lab requisitions and results",
    body: "When evaluations include an extensive blood panel — the practice describes an 83+ marker panel coordinated through partners such as Evexia — requisitions can be provided through the portal, and draws happen at LabCorp locations near you. Results return to the same secure place for review with your care team.",
  },
  {
    title: "Between-visit questions",
    body: "Telehealth care still needs a private channel for follow-ups. Portal messaging keeps plan questions, supplement clarifications, and logistics out of ordinary email when possible.",
  },
  {
    title: "Visit and paperwork coordination",
    body: "Upcoming appointments, rescheduling needs, and intake forms belong in one login so you are not hunting through inboxes before a Zoom visit.",
  },
];

const FAQS = [
  {
    question: "Is this page the portal itself?",
    answer: [
      "No. This page explains what the portal is for. The live patient portal is the external MD-HQ system at drautoimmune.md-hq.com, linked from the header and footer across the site.",
    ],
  },
  {
    question: "I am not a patient yet — should I create a portal account?",
    answer: [
      "Portal access is for people enrolled in care. If you are exploring whether Dr. Autoimmune is a fit, start with a discovery call or the contact form instead.",
    ],
  },
  {
    question: "I cannot log in. What should I do?",
    answer: [
      "Try the password-reset options on the MD-HQ login screen first. If you remain locked out, call +1 (303) 882-8447 or use the contact form so the team can help you reconnect.",
    ],
  },
  {
    question: "Is the portal appropriate for emergencies?",
    answer: [
      "No. Use local emergency services for urgent medical problems. The portal supports routine care communication between scheduled telehealth visits.",
    ],
  },
];

/**
 * `/patient-portal/` — the live equivalent page has no real content of its
 * own (just boilerplate logo + tagline); the site's actual "Patient
 * Portal" functionality is an external MD-HQ system linked from every
 * header/footer nav (`https://drautoimmune.md-hq.com/`). This page is
 * therefore built as a bridge page explaining what the portal is for,
 * with a clear CTA out to that real external system rather than fabricating
 * content that doesn't exist live.
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

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Why Telehealth Care Needs a Portal</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Dr. Autoimmune is based in Boulder, Colorado, and delivers functional medicine care by secure video to
                patients across the United States. That model only works well when labs, messages, and scheduling live
                somewhere more private and organized than a scattered email thread. The patient portal — hosted on
                MD-HQ at{" "}
                <a
                  href={PORTAL_URL}
                  className="font-medium text-primary hover:underline"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  drautoimmune.md-hq.com
                </a>{" "}
                — is that home base.
              </p>
              <p>
                Care is led by Dr. Ian Hollaman, DC, MSc, FMCP, with support from the clinical team and a dedicated
                Metabolic Coordinator. Between visits, portal access helps you stay aligned with the plan without
                waiting for the next Zoom window for every small question. It also keeps lab logistics clear when
                requisitions need to reach a local draw site.
              </p>
              <p>
                This website page does not store your chart. It exists so new and returning patients know where to
                click, what to expect, and how the portal fits alongside discovery calls, evaluations, and ongoing
                support described on our{" "}
                <Link href="/services/" className="font-medium text-primary hover:underline">
                  services
                </Link>{" "}
                pages.
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">What Patients Typically Use the Portal For</h2>
            <p className="mt-3 text-base text-ink-soft">
              Exact screens can change as MD-HQ updates its interface, but the jobs below reflect how the practice
              describes portal use across booking and care pages.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {PORTAL_USES.map((item) => (
              <Reveal key={item.title} className={`${CARD_CLASSES} p-6`}>
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Getting Started &amp; Staying Secure</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Existing patients receive portal credentials as part of onboarding. Use a unique password, enable any
                security options MD-HQ offers, and avoid sharing logins. Complete telehealth visits from a private
                space, and treat portal messages with the same care you would any medical record.
              </p>
              <p>
                If you are not yet a patient, do not expect a public self-serve chart. Start with a{" "}
                <Link href={DISCOVERY_CALL_HREF} className="font-medium text-primary hover:underline">
                  discovery call
                </Link>{" "}
                (about 20 minutes, USA only) or the{" "}
                <Link href="/book-an-appointment/" className="font-medium text-primary hover:underline">
                  book an appointment
                </Link>{" "}
                page. Denver and Front Range patients can also review{" "}
                <Link
                  href="/areas-we-serve/colorado/denver/"
                  className="font-medium text-primary hover:underline"
                >
                  how Boulder telehealth works for Denver
                </Link>{" "}
                before enrolling.
              </p>
              <p>
                Privacy practices for the website and care relationship are summarized on our{" "}
                <Link href="/privacy-policy/" className="font-medium text-primary hover:underline">
                  privacy policy
                </Link>
                . For access problems after you are enrolled, call{" "}
                <a href={SITE_CONTACT.phoneHref} className="font-medium text-primary hover:underline">
                  {SITE_CONTACT.phone}
                </a>{" "}
                or email{" "}
                <a href={SITE_CONTACT.emailHref} className="font-medium text-primary hover:underline">
                  {SITE_CONTACT.email}
                </a>
                .
              </p>
              <p>
                Think of the portal as the operational layer of root-cause care: it does not diagnose, and it does not
                replace Zoom visits with Dr. Hollaman&rsquo;s clinical team, but it keeps the paperwork and results that
                make those visits productive. When a requisition is ready, when a Metabolic Coordinator follow-up needs
                a quick clarification, or when you need to confirm what was discussed after an evaluation, start here
                before sending sensitive details through public website forms.
              </p>
            </div>
          </Reveal>

          <Reveal className="mt-12">
            <h2 className="text-3xl font-extrabold text-ink">Portal FAQ</h2>
            <div className="mt-6">
              <FaqAccordion items={FAQS} />
            </div>
          </Reveal>

          <Reveal className="mt-10 text-center">
            <Button href={PORTAL_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg">
              Open Patient Portal
            </Button>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
