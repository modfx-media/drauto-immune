import Link from "next/link";
import Icon, { type IconName } from "@/components/ui/Icon";
import Container from "@/components/ui/Container";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import { APPROACH } from "@/content/home-content";
import Card from "./Card";
import SectionHeading from "./SectionHeading";
import { SECTION_PADDING, TEXT } from "./theme";

const PILLAR_ICONS: IconName[] = ["compass", "clipboard", "trending-up"];

/**
 * The three pillars ("Holistic Approach," "Customized Wellness Plans,"
 * "Empowering Independence") — same three cards the shared `Card`
 * component is reused for elsewhere on this page.
 */
export default function Pillars2() {
  return (
    <section className={SECTION_PADDING}>
      <Container>
        <SectionHeading
          eyebrow="Our Approach"
          heading={APPROACH.heading}
          intro={APPROACH.intro}
          maxWidth="max-w-3xl"
        />

        <p className={`mt-4 max-w-3xl ${TEXT.body}`}>
          Every plan starts with listening: a comprehensive look at your history,
          labs, and lifestyle, so care fits your biology, not a template. We
          translate advanced testing into a clear roadmap and stay alongside you
          as your body responds.
        </p>

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-3">
          {APPROACH.items.map((item, i) => (
            <Card key={item.title}>
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary ring-1 ring-primary/15">
                <Icon name={PILLAR_ICONS[i]} className="h-5 w-5" />
              </span>
              <h3 className={`mt-2 ${TEXT.h3}`}>{item.title}</h3>
              <p className={TEXT.body}>{item.description}</p>
            </Card>
          ))}
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-4 border-t border-gray pt-10 sm:grid-cols-4">
          {APPROACH.pills.map((pill) => (
            <li
              key={pill.label}
              className="flex flex-col items-center gap-2 rounded-xl bg-sage/30 px-4 py-5 text-center transition-colors hover:bg-sage/50"
            >
              <Icon name={pill.icon as IconName} className="h-5 w-5 text-primary" />
              <span className="text-sm text-ink-soft">{pill.label}</span>
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-5">
          <Link
            href="/about-us/"
            className="inline-flex items-center gap-2 rounded-pill bg-primary px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-primary-hover"
          >
            Learn more about us
            <Icon name="arrow-right" className="h-4 w-4" />
          </Link>
          <a
            href={SITE_CONTACT.phoneHref}
            className="inline-flex items-center gap-2 text-sm font-medium text-ink transition-colors hover:text-primary"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-gray text-primary">
              <Icon name="phone-call" className="h-4 w-4" />
            </span>
            {SITE_CONTACT.phone}
          </a>
        </div>
      </Container>
    </section>
  );
}
