import Link from "next/link";
import Accent from "@/components/ui/Accent";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import Icon, { type IconName } from "@/components/ui/Icon";
import InnerPageHero from "@/components/ui/InnerPageHero";
import Section from "@/components/ui/Section";
import Reveal from "@/components/home/Reveal";
import { CLINIC_LOCATION } from "@/components/layout/footer-links";
import { DISCOVERY_CALL_HREF, SITE_CONTACT } from "@/components/layout/nav-links";

interface DirectoryLink {
  label: string;
  href: string;
  description: string;
  external?: boolean;
}

/** Top-level navigational pages — the spine of the site. */
const MAIN_PAGES: DirectoryLink[] = [
  { label: "Home", href: "/", description: "Our approach, services, and story at a glance." },
  { label: "About Us", href: "/about-us/", description: "Meet the team and our root-cause philosophy." },
  { label: "Featured Interviews", href: "/featured-interviews/", description: "Podcasts and press features with our clinicians." },
  { label: "Blog", href: "/blog/", description: "Research-backed articles on autoimmune health." },
  { label: "Patient Stories", href: "/patient-stories/", description: "Real outcomes from real patients." },
  { label: "Contact Us", href: "/contact-us/", description: "Reach the team or send us a message." },
];

/** Services & how to start care — split into two scannable sub-columns. */
const SERVICES_A: DirectoryLink[] = [
  { label: "Services Overview", href: "/services/", description: "Everything we offer, in one place." },
  { label: "Book New Patient Evaluation", href: "/book-new-patient-evaluation/", description: "Start your intake as a new patient." },
  { label: "Discovery Call", href: "/discovery-call/", description: "A first conversation with our team." },
  { label: "Book An Appointment", href: "/book-an-appointment/", description: "Schedule a visit with our clinicians." },
];
const SERVICES_B: DirectoryLink[] = [
  { label: "Wellness Services", href: "/wellness-services/", description: "Supportive programs beyond the clinical visit." },
  { label: "Conditions We Support", href: "/conditions-we-support/", description: "The full list of conditions we treat." },
  {
    label: "Patient Portal",
    href: "https://drautoimmune.md-hq.com/",
    description: "Secure access to your records and messages.",
    external: true,
  },
];

/** Conditions grouped by body system — the clinical proof of this page. */
const CONDITION_CATEGORIES: { label: string; icon: IconName; links: DirectoryLink[] }[] = [
  {
    label: "Thyroid & Endocrine",
    icon: "target",
    links: [
      { label: "Thyroid Conditions", href: "/thyroid-conditions/", description: "Underactive, overactive & nodular thyroid care." },
      { label: "Hashimoto's Thyroiditis & Graves", href: "/hashimotos-thyroiditis-graves/", description: "The two most common autoimmune thyroid diseases." },
      { label: "Graves Disease", href: "/graves-disease/", description: "Autoimmune hyperthyroidism management." },
      { label: "Type 1 Diabetes", href: "/type-1-diabetes/", description: "Autoimmune-driven insulin insufficiency." },
    ],
  },
  {
    label: "Autoimmune & Rheumatologic",
    icon: "shield",
    links: [
      { label: "Rheumatoid Arthritis", href: "/rheumatoid-arthritis/", description: "Joint-focused autoimmune inflammation." },
      { label: "Lupus", href: "/lupus/", description: "Systemic autoimmune disease care." },
      { label: "Sjögren's Syndrome", href: "/sjogrens-syndrome/", description: "Autoimmune dryness of eyes & mouth." },
      { label: "Raynaud's Phenomenon", href: "/raynauds-phenomenon/", description: "Circulatory response to cold & stress." },
      { label: "Multiple Sclerosis", href: "/multiple-sclerosis/", description: "Autoimmune demyelination support." },
      { label: "Other Autoimmune Conditions", href: "/other-autoimmune-conditions/", description: "Less common autoimmune presentations." },
    ],
  },
  {
    label: "Digestive",
    icon: "leaf",
    links: [
      { label: "Inflammatory Bowel Disease", href: "/inflammatory-bowel-disease/", description: "Crohn's & ulcerative colitis care." },
      { label: "Celiac Disease & Gluten Intolerance", href: "/celiac-disease-and-gluten-intolerance/", description: "Gluten-triggered autoimmune response." },
    ],
  },
  {
    label: "Mental & Neurodevelopmental",
    icon: "sparkles",
    links: [
      { label: "Anxiety & Depression", href: "/anxiety-depression/", description: "The mind-body side of chronic illness." },
      { label: "ADHD / ADD", href: "/adhd-add/", description: "Attention & focus, root-cause informed." },
    ],
  },
];

/** Resources & further reading, plus the one external storefront link. */
const RESOURCE_LINKS: (DirectoryLink & { tag: string })[] = [
  { tag: "Article", label: "Blog", href: "/blog/", description: "Ongoing research-backed articles & updates." },
  { tag: "Stories", label: "Patient Stories", href: "/patient-stories/", description: "First-hand patient experiences." },
  { tag: "Interviews", label: "Featured Interviews", href: "/featured-interviews/", description: "Podcasts and press appearances." },
  { tag: "Directory", label: "Conditions We Support", href: "/conditions-we-support/", description: "Full clinical condition index." },
  { tag: "Events", label: "Live Webinar Schedule", href: "/live-webinar-schedule/", description: "Upcoming live sessions on autoimmune & thyroid health." },
  { tag: "Store", label: "Store", href: "/store/", description: "Wellness products available through our clinic." },
  {
    tag: "External",
    label: "Shop",
    href: "https://shop.drautoimmune.com/",
    description: "Supplements & products we recommend.",
    external: true,
  },
];

const QUICK_JUMP = [
  { id: "main", label: "Main Pages" },
  { id: "services", label: "Services" },
  { id: "conditions", label: "Conditions" },
  { id: "resources", label: "Resources" },
  { id: "visit", label: "Visit & Contact" },
];

/** One typographic index entry — not a card/button, reads like a reference list. */
function DirectoryRow({ link }: { link: DirectoryLink }) {
  return (
    <li>
      <Link
        href={link.href}
        target={link.external ? "_blank" : undefined}
        rel={link.external ? "noopener noreferrer" : undefined}
        className="group flex items-start justify-between gap-4 border-b border-gray py-4 transition-colors hover:border-primary/30"
      >
        <span>
          <span className="block text-base font-medium text-ink transition-colors group-hover:text-primary">
            {link.label}
          </span>
          <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">{link.description}</span>
        </span>
        <span
          aria-hidden="true"
          className="mt-1 shrink-0 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
        >
          <Icon name="arrow-right" className="h-4 w-4" />
        </span>
      </Link>
    </li>
  );
}

export default function SiteMapPage() {
  return (
    <>
      <InnerPageHero
        eyebrow="Site Directory"
        title="Every Page, Clearly Organized"
        accent="Clearly Organized"
        subhead="A complete index of our services, the conditions we treat, and every resource on drautoimmune.com."
        image={{ src: "/images/migrated/blog/getty-images-aeVclBoyScE-unsplash.jpg", alt: "Doctor consulting with a patient in an exam room" }}
      />

      {/* Quick-jump strip */}
      <Section bg="cream-wash" className="!py-6">
        <Container>
          <nav aria-label="Jump to section" className="flex flex-wrap items-center gap-2.5">
            {QUICK_JUMP.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="rounded-pill border border-primary/20 bg-white px-4 py-2 font-mono text-xs font-medium uppercase tracking-[0.08em] text-primary-active transition-colors hover:border-primary hover:bg-sage"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </Container>
      </Section>

      {/* Main pages */}
      <Section bg="white" id="main">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,2.1fr)] lg:gap-16">
            <Reveal className="lg:border-r lg:border-gray lg:pr-10">
              <Badge className="mb-4 inline-flex">Start Here</Badge>
              <h2>
                Main <Accent>Pages</Accent>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                The core navigational pages that make up the site, start here if you&rsquo;re getting oriented.
              </p>
            </Reveal>
            <Reveal delay={0.1}>
              <ul>
                {MAIN_PAGES.map((link) => (
                  <DirectoryRow key={link.href} link={link} />
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Services */}
      <Section bg="cream-wash" id="services">
        <Container>
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-14">
            <Reveal>
              <Badge className="mb-4 inline-flex">Care Pathways</Badge>
              <h2>
                Services & <Accent>Getting Started</Accent>
              </h2>
              <p className="mt-4 text-base leading-relaxed text-ink-soft">
                Every way to begin care with us, from a free introductory call to booking your first evaluation and
                managing visits through our patient portal.
              </p>
              <Button href={DISCOVERY_CALL_HREF} variant="primary" size="md" className="mt-6 uppercase tracking-wide">
                Book your Discovery Call
              </Button>
            </Reveal>
            <div className="grid grid-cols-1 gap-x-10 sm:grid-cols-2">
              <Reveal delay={0.1}>
                <ul>
                  {SERVICES_A.map((link) => (
                    <DirectoryRow key={link.href} link={link} />
                  ))}
                </ul>
              </Reveal>
              <Reveal delay={0.18}>
                <ul>
                  {SERVICES_B.map((link) => (
                    <DirectoryRow key={link.href} link={link} />
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Conditions index */}
      <Section bg="sage" id="conditions" className="relative overflow-hidden">
        <Container className="relative">
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge className="mb-4 inline-flex">Clinical Index</Badge>
            <h2>
              Conditions We <Accent>Treat</Accent>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">
              Fourteen conditions, grouped by body system, every one gets a dedicated page covering our root-cause
              approach.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 lg:grid-cols-2">
            {CONDITION_CATEGORIES.map((category, i) => (
              <Reveal key={category.label} delay={i * 0.08}>
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
                    <Icon name={category.icon} className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-lg font-extrabold text-ink">{category.label}</h3>
                </div>
                <ul className="mt-2 rounded-card border border-primary/15 bg-white/70 px-6">
                  {category.links.map((link) => (
                    <DirectoryRow key={link.href} link={link} />
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Resources */}
      <Section bg="white" id="resources">
        <Container>
          <Reveal>
            <Badge className="mb-4 inline-flex">Keep Learning</Badge>
            <h2>
              Resources & <Accent>Further Reading</Accent>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="mt-8">
            <ul>
              {RESOURCE_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="group flex flex-col gap-1 border-b border-gray py-5 transition-colors hover:border-primary/30 sm:flex-row sm:items-center sm:gap-6"
                  >
                    <span className="inline-flex w-fit shrink-0 items-center rounded-pill bg-sage px-3 py-1 font-mono text-[0.65rem] font-medium uppercase tracking-[0.1em] text-primary-active sm:w-24 sm:justify-center">
                      {link.tag}
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-medium text-ink transition-colors group-hover:text-primary">
                        {link.label}
                      </span>
                      <span className="mt-0.5 block text-sm leading-relaxed text-ink-soft">{link.description}</span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="hidden shrink-0 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100 sm:inline-flex"
                    >
                      <Icon name="arrow-right" className="h-4 w-4" />
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Reveal>
        </Container>
      </Section>

      {/* Visit & contact strip */}
      <Section bg="cream-wash" id="visit">
        <Container>
          <Reveal>
            <div className="rounded-card border border-gray bg-white p-8 shadow-card sm:p-10">
              <div>
                <Badge className="mb-4 inline-flex">Visit & Contact</Badge>
                <h2>
                  Ready When <Accent>You Are</Accent>
                </h2>
                <ul className="mt-6 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:gap-8">
                  <li>
                    <a
                      href={SITE_CONTACT.phoneHref}
                      className="group flex items-center gap-3 text-base font-medium text-ink transition-colors hover:text-primary"
                    >
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage text-primary">
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
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage text-primary">
                        <Icon name="globe" className="h-5 w-5" />
                      </span>
                      {SITE_CONTACT.email}
                    </a>
                  </li>
                  <li className="flex items-center gap-3 text-base font-medium text-ink">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-sage text-primary">
                      <Icon name="target" className="h-5 w-5" />
                    </span>
                    {`${CLINIC_LOCATION} · Remote & Telehealth Nationwide`}
                  </li>
                </ul>
                <Button href={DISCOVERY_CALL_HREF} variant="primary" size="md" className="mt-8 uppercase tracking-wide">
                  Book your Discovery Call
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
