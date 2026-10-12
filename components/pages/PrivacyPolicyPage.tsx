import Link from "next/link";
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
              , contact us, book a discovery call or evaluation, use our patient portal, browse our wellness store
              links, or otherwise interact with our practice online.
            </p>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              This page is written for patients and website visitors in plain language. It is not a substitute for
              notices your care team may provide during clinical onboarding, and it does not create rights beyond
              those that apply under U.S. law and our professional obligations.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Who This Policy Covers</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                This policy applies to people who visit our public website, submit contact or booking forms, join
                educational webinars we host, shop through links to our online store, or become patients of the
                practice. Discovery calls are described elsewhere on the site as available to USA patients only;
                clinical telehealth is likewise delivered to patients in the United States.
              </p>
              <p>
                Third-party sites we link to — for example Shopify at shop.drautoimmune.com, Zoom webinar
                registration pages, podcast hosts, or laboratory partners — have their own privacy practices. When
                you leave drautoimmune.com, review that provider&rsquo;s policy for how they handle your data.
              </p>
            </div>
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
                  <strong className="text-ink">Scheduling and account data</strong> associated with online booking
                  tools and the patient portal used for messaging, results, and visit management.
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
              <p>
                We collect only what is reasonably needed to respond to you, deliver care, operate the website, and
                meet recordkeeping requirements. You control how much health detail you share on public forms; once
                you are a patient, more detailed clinical information is gathered through the channels designed for
                care.
              </p>
            </div>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">How We Use Information</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              <li>To schedule and provide telehealth consultations and ongoing care</li>
              <li>To respond to inquiries and coordinate labs or referrals when appropriate</li>
              <li>To operate, secure, and improve our website and booking tools</li>
              <li>To send practice updates you request (for example, newsletter signup)</li>
              <li>To support educational offerings such as live webinar registration when you opt in</li>
              <li>To meet legal, regulatory, and professional recordkeeping obligations</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              We do not use your health information for unrelated marketing without a lawful basis and, where
              required, your permission. Unsubscribe links are included in marketing emails so you can stop those
              messages at any time.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">How We Share Information</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                We do not sell your personal information. We may share information with trusted service
                providers who help us operate the practice (for example, secure telehealth or booking
                platforms, laboratory partners such as those used for blood draws and extensive marker panels,
                payment processors, and our patient portal vendor), only as needed to perform those services.
              </p>
              <p>
                We may also disclose information when required by law, to protect the rights or safety of
                patients or others, or in connection with a professional consultation you authorize. If you ask
                us to coordinate with another clinician — such as a rheumatologist, endocrinologist, or
                neurologist — we share only what is needed for that coordination.
              </p>
            </div>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Health Information &amp; Telehealth</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Because we provide clinical care, some information we maintain may be protected health
                information under applicable U.S. health privacy laws (including HIPAA, where it applies). We
                use administrative, technical, and physical safeguards appropriate to a telehealth medical
                practice. Video visits and portal access are intended to be conducted through secure systems;
                please use a private setting for appointments and protect your portal login credentials.
              </p>
              <p>
                Telehealth from a Boulder-based practice means your information may be accessed by our clinical
                team while you are located elsewhere in the United States. Lab partners process specimens at their
                facilities under their own privacy and security programs. Ask your care team if you have questions
                about where a specific record lives.
              </p>
            </div>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Cookies &amp; Analytics</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Our website may use cookies or similar technologies for essential site function, analytics, and
              to understand how visitors use the site. You can control cookies through your browser settings.
              Disabling cookies may limit some site features, such as remembering preferences or completing certain
              forms smoothly.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Your Choices</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              <li>Request access to or correction of contact information we hold about you</li>
              <li>Ask questions about health records through the channels we provide for patients</li>
              <li>Unsubscribe from marketing emails using the link in those messages</li>
              <li>Contact us to discuss privacy concerns</li>
              <li>Limit what you share on public website forms until a secure care channel is available</li>
            </ul>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Patients can typically manage much of their day-to-day communication through the patient portal.
              Portal login issues can be raised by phone or through our{" "}
              <Link href="/contact-us/" className="font-medium text-primary hover:underline">
                contact page
              </Link>
              .
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Data Retention</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              We retain information for as long as needed to provide services, respond to inquiries, and meet
              professional and legal recordkeeping requirements that apply to a medical practice. Website analytics
              and marketing lists may follow shorter or different retention schedules than clinical records. If you
              have a specific retention question about your file, contact us and we will explain the relevant
              process.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Children</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Our website is not directed to children under 13. We do not knowingly collect personal
              information from children under 13 through the public website. Guardians seeking care for a
              minor should contact the practice directly so we can use appropriate enrollment pathways.
            </p>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">Changes to This Policy</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              We may update this Privacy Policy from time to time. The &ldquo;Last updated&rdquo; date at the
              top of this page will change when we do. Continued use of the site after an update constitutes
              notice of the revised policy for website visitors. Material changes that affect patients may also be
              communicated through practice channels when appropriate.
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
                <Link href="/contact-us/" className="font-medium text-primary hover:underline">
                  contact form
                </Link>
                . To begin care rather than ask a privacy question, start with a{" "}
                <Link href="/discovery-call/" className="font-medium text-primary hover:underline">
                  discovery call
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
