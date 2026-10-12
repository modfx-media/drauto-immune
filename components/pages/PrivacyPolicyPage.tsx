import Container from "@/components/ui/Container";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import { CLINIC_LOCATION } from "@/components/layout/footer-links";

const CARD = "rounded-card border border-gray bg-white p-6 shadow-card sm:p-10";

/**
 * Standard medical-practice privacy policy using only facts present on the
 * public site (Boulder, CO base; telehealth; published phone/email). Legal
 * specifics that need client counsel review are called out in the PR body.
 */
export default function PrivacyPolicyPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Legal"
        title="Privacy Policy"
        accent="Privacy Policy"
        subhead="How Dr. Autoimmune handles personal and health-related information."
      />

      <Section bg="white" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative mx-auto max-w-3xl space-y-6">
          <Reveal className={CARD}>
            <p className="text-sm text-ink-soft">Last updated: October 12, 2026</p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Dr. Autoimmune (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is a functional medicine
              practice based in {CLINIC_LOCATION}. We provide care primarily through secure telehealth. This
              Privacy Policy describes how we collect, use, share, and protect information when you visit{" "}
              <a href="https://drautoimmune.com/" className="font-medium text-primary hover:underline">
                drautoimmune.com
              </a>
              , contact us, book a discovery call or evaluation, use our patient portal, or otherwise interact
              with our practice online.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Information We Collect</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>Depending on how you interact with us, we may collect:</p>
              <ul className="list-disc space-y-2 pl-5">
                <li>
                  <strong className="text-ink">Contact details</strong> such as name, email address, phone
                  number, and mailing address when you submit a form, book online, or email us.
                </li>
                <li>
                  <strong className="text-ink">Health-related information</strong> you choose to share in
                  discovery calls, evaluations, messages, questionnaires, or through our patient portal —
                  including symptoms, history, and lab results needed for care.
                </li>
                <li>
                  <strong className="text-ink">Technical data</strong> such as IP address, browser type, device
                  information, and pages visited, collected through standard website logs and analytics tools.
                </li>
                <li>
                  <strong className="text-ink">Communications</strong> you send to us by phone, email, or
                  website forms, including{" "}
                  <a href={SITE_CONTACT.emailHref} className="font-medium text-primary hover:underline">
                    {SITE_CONTACT.email}
                  </a>{" "}
                  and {SITE_CONTACT.phone}.
                </li>
              </ul>
            </div>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">How We Use Information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              <li>To schedule and provide telehealth consultations and ongoing care</li>
              <li>To respond to inquiries and coordinate labs or referrals when appropriate</li>
              <li>To operate, secure, and improve our website and booking tools</li>
              <li>To send practice updates you request (for example, newsletter signup)</li>
              <li>To meet legal, regulatory, and professional recordkeeping obligations</li>
            </ul>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">How We Share Information</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                We do not sell your personal information. We may share information with trusted service
                providers who help us operate the practice (for example, secure telehealth or booking
                platforms, laboratory partners, payment processors, and our patient portal vendor), only as
                needed to perform those services.
              </p>
              <p>
                We may also disclose information when required by law, to protect the rights or safety of
                patients or others, or in connection with a professional consultation you authorize.
              </p>
            </div>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Health Information &amp; Telehealth</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Because we provide clinical care, some information we maintain may be protected health
              information under applicable U.S. health privacy laws (including HIPAA, where it applies). We
              use administrative, technical, and physical safeguards appropriate to a telehealth medical
              practice. Video visits and portal access are intended to be conducted through secure systems;
              please use a private setting for appointments and protect your portal login credentials.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Cookies &amp; Analytics</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Our website may use cookies or similar technologies for essential site function, analytics, and
              to understand how visitors use the site. You can control cookies through your browser settings.
              Disabling cookies may limit some site features.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Your Choices</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              <li>Request access to or correction of contact information we hold about you</li>
              <li>Ask questions about health records through the channels we provide for patients</li>
              <li>Unsubscribe from marketing emails using the link in those messages</li>
              <li>Contact us to discuss privacy concerns</li>
            </ul>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Children</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Our website is not directed to children under 13. We do not knowingly collect personal
              information from children under 13 through the public website. Guardians seeking care for a
              minor should contact the practice directly.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Changes to This Policy</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the
              top of this page will change when we do. Continued use of the site after an update constitutes
              notice of the revised policy for website visitors.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Contact Us</h2>
            <div className="mt-4 space-y-2 text-base leading-relaxed text-ink-soft">
              <p>Dr. Autoimmune</p>
              <p>{CLINIC_LOCATION} · Telehealth nationwide</p>
              <p>
                Phone:{" "}
                <a href={SITE_CONTACT.phoneHref} className="font-medium text-primary hover:underline">
                  {SITE_CONTACT.phone}
                </a>
              </p>
              <p>
                Email:{" "}
                <a href={SITE_CONTACT.emailHref} className="font-medium text-primary hover:underline">
                  {SITE_CONTACT.email}
                </a>
              </p>
              <p>
                Or use our{" "}
                <a href="/contact-us/" className="font-medium text-primary hover:underline">
                  contact form
                </a>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
