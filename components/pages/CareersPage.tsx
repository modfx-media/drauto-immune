import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import SectionAmbient from "@/components/home/SectionAmbient";

const CARD = "min-w-0 rounded-card border border-gray bg-white p-4 shadow-card sm:p-6 md:p-10";

const APPLY_HREF =
  "mailto:drian@drautoimmune.com?subject=Metabolic%20Coordinator";

const FACTS = [
  { label: "Start date", value: "Approximately 3 weeks from posting" },
  { label: "Location", value: "100% remote" },
  { label: "Schedule", value: "Full time, Mon–Fri, Mountain Time. Lunch 12:30–1:30." },
  { label: "Pay", value: "$45 per session" },
] as const;

const DUTIES = [
  "Take over and continue care for existing patients transitioning from our departing nutritionist",
  "Lead patients through clinic-designed care plans, from intake through follow-up sessions",
  "Review and help patients understand clinical lab results within the scope of our framework",
  "Provide nutrition guidance, supplement protocols, and accountability aligned with each patient's plan",
  "Collaborate closely with the head clinician, who provides oversight and final direction on care",
  "Keep accurate, timely patient records and session notes",
  "Contribute to a team culture that shares in the practice's success",
] as const;

const REQUIRED = [
  "A valid degree in clinical nutrition, dietetics, or a closely related field, plus current professional credentials (for example, RDN, CNS, or LDN)",
  "Experience working with patients as a clinical nutritionist",
  "Working awareness of functional medicine principles",
  "Willingness to work within an established framework and follow care plans under the head clinician's oversight",
  "Ability to step into a full caseload immediately",
  "Professional references",
] as const;

const NICE_TO_HAVE = [
  "Experience interpreting functional or specialty lab panels",
  "Background with autoimmune or chronic-condition patients",
] as const;

const BENEFITS = [
  {
    name: "Initial blood panel and review",
    details: "Free comprehensive blood panel, reviewed by our functional medicine expert of 18 years",
    when: "At hire",
  },
  {
    name: "Hands-on lab training",
    details: "Practical training with clinical labs",
    when: "At hire",
  },
  {
    name: "Supplements and labs at cost",
    details: "Purchase all supplements and labs at our cost",
    when: "At hire",
  },
  {
    name: "Profit sharing",
    details: "10% of net profit shared with current staff, split evenly",
    when: "After 6 months",
  },
  {
    name: "IRA",
    details: "Retirement account with contributions from the office",
    when: "After 12 months",
  },
  {
    name: "Paid time off",
    details: "Up to 2 weeks per year; no more than 1 week taken at a time",
    when: "After 1 year",
  },
] as const;

const APPLICATION = [
  "Your resume",
  "A copy or description of your degree and current credentials",
  "2–3 professional references",
  "A short note on your experience with functional medicine and why this role fits you",
  "A video, less than 60 seconds long, explaining why you should be given an interview",
] as const;

export default function CareersPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="We're hiring"
        title="Career Opportunities at Dr. Autoimmune"
        accent="Dr. Autoimmune"
        subhead="Join a 100% remote functional medicine team. One role is open now."
      />

      <Section bg="cream-wash" className="relative">
        <SectionAmbient tone="sage" variant="dots" />
        <Container className="relative mx-auto max-w-3xl space-y-6">
          <Reveal className={CARD}>
            <p className="font-mono text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-primary">
              Now hiring · starts in about 3 weeks
            </p>
            <h2 className="mt-3 text-2xl font-extrabold text-ink sm:text-3xl">Metabolic Coordinator</h2>
            <p className="mt-2 text-base text-ink-soft">
              Clinical Nutritionist (MC) · Full time · 100% remote
            </p>
            <dl className="mt-8 grid gap-4 sm:grid-cols-2">
              {FACTS.map((fact) => (
                <div key={fact.label} className="rounded-card bg-sage/40 px-4 py-4">
                  <dt className="font-mono text-[0.68rem] font-semibold uppercase tracking-[0.14em] text-primary">
                    {fact.label}
                  </dt>
                  <dd className="mt-1.5 text-sm leading-relaxed text-ink">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">About the role</h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                Dr. Autoimmune is a functional medicine practice led by a clinician with 18 years of
                experience. We are hiring an experienced, credentialed clinical nutritionist to join our
                team as a Metabolic Coordinator (MC).
              </p>
              <p>
                The MC guides patients through structured care plans within our established clinical
                framework, under the oversight of our head clinician. This is not a slow ramp-up: you
                will inherit an active caseload from our departing nutritionist and should expect a full
                schedule right away.
              </p>
            </div>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">What you&rsquo;ll do</h2>
            <ul className="mt-4 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              {DUTIES.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">What we&rsquo;re looking for</h2>
            <h3 className="mt-6 text-lg font-extrabold text-ink">Required</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              {REQUIRED.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              This role requires a clinical nutrition degree and credentials. Health coaches and
              coaching-only certifications will not be considered.
            </p>
            <h3 className="mt-8 text-lg font-extrabold text-ink">Nice to have</h3>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              {NICE_TO_HAVE.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-primary">Compensation and benefits</h2>
            <p className="mt-4 text-base font-bold text-ink">Pay: $45 per session</p>
            <ul className="mt-4 overflow-hidden rounded-md border border-primary/15 sm:hidden">
              <li className="grid grid-cols-[1fr_auto] gap-2 bg-primary px-3 py-2.5 text-sm font-bold text-white">
                <span>Benefit</span>
                <span>Eligibility</span>
              </li>
              {BENEFITS.map((benefit, index) => (
                <li
                  key={benefit.name}
                  className={`border-t border-primary/15 px-3 py-3 ${index % 2 === 1 ? "bg-sage" : "bg-white"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="font-bold text-ink">{benefit.name}</p>
                    <p className="shrink-0 text-right text-sm font-semibold text-ink">{benefit.when}</p>
                  </div>
                  <p className="mt-1.5 text-sm leading-relaxed text-ink">{benefit.details}</p>
                </li>
              ))}
            </ul>
            <div className="mt-4 hidden max-w-full overflow-hidden sm:block">
              <table className="w-full table-fixed border-collapse text-left text-sm text-ink">
                <thead>
                  <tr className="bg-primary text-white">
                    <th scope="col" className="w-[28%] px-4 py-3 font-bold">
                      Benefit
                    </th>
                    <th scope="col" className="px-4 py-3 font-bold">
                      Details
                    </th>
                    <th scope="col" className="w-[22%] px-4 py-3 font-bold">
                      Eligibility
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {BENEFITS.map((benefit, index) => (
                    <tr key={benefit.name} className={index % 2 === 1 ? "bg-sage" : "bg-white"}>
                      <th scope="row" className="border border-primary/15 px-4 py-3 align-top font-bold">
                        {benefit.name}
                      </th>
                      <td className="border border-primary/15 px-4 py-3 align-top leading-relaxed">
                        {benefit.details}
                      </td>
                      <td className="border border-primary/15 px-4 py-3 align-top">{benefit.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal className={CARD}>
            <h2 className="text-2xl font-extrabold text-ink">How to apply</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft [overflow-wrap:anywhere]">
              Email the following to{" "}
              <a href={APPLY_HREF} className="font-medium text-primary hover:underline">
                drian@drautoimmune.com
              </a>{" "}
              with &ldquo;Metabolic Coordinator&rdquo; in the subject line:
            </p>
            <ol className="mt-4 list-decimal space-y-2 pl-5 text-base leading-relaxed text-ink-soft">
              {APPLICATION.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Because the role starts in about 3 weeks, we will review applications as they arrive.
            </p>
            <div className="mt-6">
              <Button href={APPLY_HREF} className="w-full sm:w-auto">
                Apply by email
              </Button>
            </div>
            <p className="mt-8 text-sm leading-relaxed text-ink-soft">
              Dr. Autoimmune is an equal opportunity employer.
            </p>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
