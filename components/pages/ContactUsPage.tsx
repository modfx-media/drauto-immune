"use client";

import Accent from "@/components/ui/Accent";
import Container from "@/components/ui/Container";
import GhlFormEmbed from "@/components/ui/GhlFormEmbed";
import Icon from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { MapPinIcon, MailIcon } from "@/components/layout/ClinicMap";
import { CLINIC_LOCATION } from "@/components/layout/footer-links";
import { SITE_CONTACT } from "@/components/layout/nav-links";

export default function ContactUsPage() {

  return (
    <>
      <InnerPageHero
        eyebrow="Contact Us"
        title="We're Here to Help"
        accent="Here to Help"
        subhead="Send us a message using this form and our team will get back to you within 1 business day."
        image={{ src: "/images/contact-us/office-desk-antibody.png", alt: "Desk with a notebook, pen, and plant beside an antibody illustration" }}
      />

      <Section bg="white" className="relative overflow-hidden">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[0.9fr_1.1fr]">
            {/* Text + contact info */}
            <Reveal>
              <h2>
                Send Us a <Accent>Message</Accent>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Whether you have a question about our services, the discovery call, or how functional medicine
                works, we&rsquo;re here to support you. Share whatever you&rsquo;d like us to know, and a member
                of our care team will respond personally.
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
            </Reveal>

            {/* Form */}
            <Reveal delay={0.15}>
              <GhlFormEmbed
                src="https://api.leadconnectorhq.com/widget/form/YGDEtjRNZafzDQqUtq8Q"
                formId="YGDEtjRNZafzDQqUtq8Q"
                formName="🟢 Main Site Contact Us"
                title="🟢 Main Site Contact Us"
                height={428}
              />
            </Reveal>
          </div>
        </Container>
      </Section>
    </>
  );
}
