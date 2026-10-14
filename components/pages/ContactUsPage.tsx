"use client";

import Link from "next/link";
import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import GhlFormEmbed from "@/components/ui/GhlFormEmbed";
import Icon from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import FaqAccordion from "@/components/ui/FaqAccordion";
import { MapPinIcon, MailIcon } from "@/components/layout/ClinicMap";
import { CLINIC_LOCATION } from "@/components/layout/footer-links";
import { DISCOVERY_CALL_HREF, SITE_CONTACT } from "@/components/layout/nav-links";

const WHEN_TO_CONTACT = [
  {
    title: "General questions about care",
    body: "Ask about telehealth visits, how labs are coordinated, what a discovery call covers, or whether your type of concern is something we commonly evaluate.",
  },
  {
    title: "Help choosing a next step",
    body: "If you are unsure whether to book a discovery call or a new patient evaluation, send a short note and we can point you to the right path.",
  },
  {
    title: "Administrative or portal questions",
    body: "Existing patients can often resolve records and messaging needs through the patient portal. If you are locked out or need a hand getting started, contact us and we will help you reconnect.",
  },
];

const FAQS = [
  {
    question: "How quickly will someone respond?",
    answer: [
      "Our team aims to reply to contact-form messages within one business day. For scheduling a visit, you can also book a discovery call online.",
    ],
  },
  {
    question: "Do you have a walk-in clinic in Boulder?",
    answer: [
      "Care is delivered by telehealth. The practice is based in Boulder, Colorado, and serves patients remotely across the United States. Lab draws are arranged at locations convenient to you.",
    ],
  },
  {
    question: "Should I contact you or book a discovery call?",
    answer: [
      "Use this form for general questions. If you are ready to talk about whether functional medicine is a fit, book a discovery call — a short, no-obligation conversation with our care team.",
    ],
  },
  {
    question: "Do you publish office hours here?",
    answer: [
      "Scheduling availability is shown in the online booking calendars for discovery calls and evaluations. Reach out by phone or form if you need help finding a time.",
    ],
  },
  {
    question: "Is email or phone better for urgent clinical issues?",
    answer: [
      "This contact page is for practice questions and scheduling help — not emergency care. For medical emergencies, use local emergency services. Existing patients with care-plan questions should use the secure patient portal or the channels provided during care.",
    ],
  },
  {
    question: "Do you serve patients outside Colorado?",
    answer: [
      "Yes. Discovery calls and clinical telehealth visits are available for USA patients. International inquiries are outside the discovery-call eligibility described on our booking pages.",
    ],
  },
];

export default function ContactUsPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Contact Us"
        title="Contact Our Boulder Autoimmune Clinic"
        accent="Boulder Autoimmune Clinic"
        subhead="Send a message, call, or book a discovery call — our telehealth team serves Boulder, Denver, Colorado, and patients nationwide."
        image={{
          src: "/images/contact-us/office-desk-antibody.png",
          alt: "Desk with a notebook, pen, and plant beside an antibody illustration",
        }}
      />

      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            <Reveal>
              <h2>
                Send Us a <Accent>Message</Accent>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Whether you have a question about our services, the discovery call, or how functional medicine works,
                we are here to support you. Share whatever you would like us to know, and a member of our care team
                will respond personally.
              </p>

              <div className="relative mt-8 overflow-hidden rounded-card border border-gray bg-sage p-8 shadow-card">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl"
                />
                <div className="relative flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-primary shadow-card">
                    <Icon name="users" className="h-5 w-5" />
                  </span>
                  <h3 className="text-xl font-extrabold text-ink">Get in Touch</h3>
                </div>
                <ul className="relative mt-6 space-y-4">
                  <li>
                    <a
                      href={SITE_CONTACT.phoneHref}
                      className="group flex items-center gap-3 text-base font-medium text-ink transition-colors hover:text-primary"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-card transition-transform group-hover:-rotate-6">
                        <Icon name="phone-call" className="h-5 w-5" />
                      </span>
                      {SITE_CONTACT.phone}
                    </a>
                  </li>
                  <li>
                    <a
                      href={SITE_CONTACT.emailHref}
                      className="group flex items-center gap-3 text-base font-medium text-ink transition-colors hover:text-primary"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-card transition-transform group-hover:-rotate-6">
                        <MailIcon className="h-5 w-5" />
                      </span>
                      {SITE_CONTACT.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-base font-medium text-ink">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-primary shadow-card">
                      <MapPinIcon className="h-5 w-5" />
                    </span>
                    {CLINIC_LOCATION} · Remote &amp; Telehealth Nationwide
                  </li>
                </ul>
              </div>

              <div className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
                <h3 className="text-lg font-extrabold text-ink">Serving Boulder, Denver &amp; Beyond</h3>
                <p>
                  Dr. Autoimmune is based in Boulder, Colorado, roughly 30 minutes from central Denver in ordinary
                  traffic. Because visits are telehealth, Denver-metro and Front Range patients can work with the
                  team without driving in for every appointment. Lab work is coordinated at a draw site near you.
                </p>
                <p>
                  Prefer to talk live?{" "}
                  <Link href={DISCOVERY_CALL_HREF} className="font-medium text-primary hover:underline">
                    Book a discovery call
                  </Link>{" "}
                  or review{" "}
                  <Link href="/services/" className="font-medium text-primary hover:underline">
                    our services
                  </Link>
                  . For how we handle personal information, see our{" "}
                  <Link href="/privacy-policy/" className="font-medium text-primary hover:underline">
                    privacy policy
                  </Link>
                  . Front Range patients can also read{" "}
                  <Link
                    href="/areas-we-serve/colorado/denver/"
                    className="font-medium text-primary hover:underline"
                  >
                    how care works for Denver patients
                  </Link>
                  .
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              <GhlFormEmbed
                src="https://api.leadconnectorhq.com/widget/form/YGDEtjRNZafzDQqUtq8Q"
                formId="YGDEtjRNZafzDQqUtq8Q"
                formName="Main Site Contact Us"
                title="Main Site Contact Us"
                height={428}
              />
            </Reveal>
          </div>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">When to Use This Contact Page</h2>
            <p className="mt-3 text-base leading-relaxed text-ink-soft">
              Dr. Autoimmune provides root-cause functional medicine by telehealth under the clinical leadership of
              Dr. Ian Hollaman, DC, MSc, FMCP. This page is the simplest way to reach the practice when you are not
              ready to book — or when you need a human answer before you choose a calendar slot.
            </p>
          </Reveal>
          <div className="mt-8 space-y-4">
            {WHEN_TO_CONTACT.map((item) => (
              <Reveal key={item.title} className="rounded-card border border-gray bg-white p-6 shadow-card">
                <h3 className="text-lg font-extrabold text-ink">{item.title}</h3>
                <p className="mt-2 text-base leading-relaxed text-ink-soft">{item.body}</p>
              </Reveal>
            ))}
          </div>
          <Reveal className="mt-8 space-y-4 text-base leading-relaxed text-ink-soft">
            <p>
              If you already know you want a fit conversation, skip the form and{" "}
              <Link href={DISCOVERY_CALL_HREF} className="font-medium text-primary hover:underline">
                schedule a discovery call
              </Link>{" "}
              (about 20 minutes, USA patients only). If you are further along and ready for a clinical review, go to
              the{" "}
              <Link href="/book-new-patient-evaluation/" className="font-medium text-primary hover:underline">
                new patient evaluation
              </Link>{" "}
              booking page.
            </p>
            <p>
              Existing patients: the{" "}
              <Link href="/patient-portal/" className="font-medium text-primary hover:underline">
                patient portal
              </Link>{" "}
              at md-hq is the primary place for secure messaging, lab results, and appointment details. Use phone or
              this form when portal access itself is the problem.
            </p>
          </Reveal>
        </Container>
      </Section>

      <Section bg="white" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">What to Include in Your Message</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                A useful message does not need to be long. A few specifics help the team respond accurately: your
                location (so we can confirm USA telehealth eligibility), the condition or symptom cluster you are
                dealing with, whether you already see a specialist, and whether you are asking about discovery calls,
                evaluations, or something else.
              </p>
              <p>
                Please avoid sending highly sensitive records through the public contact form when a more secure
                channel is available. Once you are a patient, clinical documents and detailed histories belong in the
                pathways we provide for care — including the portal and evaluation process.
              </p>
              <p>
                We aim to reply within one business day. Scheduling availability for discovery calls and evaluations
                is shown in the online calendars; if you need help finding a time, say so in your note or call{" "}
                <a href={SITE_CONTACT.phoneHref} className="font-medium text-primary hover:underline">
                  {SITE_CONTACT.phone}
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>

      <Section bg="cream-wash" className="relative">
        <Container className="relative mx-auto max-w-3xl">
          <Reveal>
            <h2 className="text-3xl font-extrabold text-ink">Contact FAQ</h2>
            <div className="mt-6">
              <FaqAccordion items={FAQS} />
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
