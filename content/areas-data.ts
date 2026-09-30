/**
 * Content model + data for the `/areas-we-serve` telehealth service-area
 * hub (`AREA_HUB`). The nationwide state hub + state x condition matrix
 * (`/areas-we-serve/[state]`, `/areas-we-serve/[state]/[condition]`) lives
 * in content/national-data.ts — the original Denver-only dedicated city
 * page content was folded directly into the Colorado state hub route (see
 * app/areas-we-serve/[state]/page.tsx) once the nationwide matrix replaced
 * the flat `[slug]` route.
 *
 * Scope note (see final pSEO report): GSC + DataForSEO data showed real,
 * unmet search demand for "denver" + autoimmune/functional-medicine terms
 * (an existing content gap: ~1,200 impressions, average position ~38, and
 * zero existing page targeting it). Boulder-specific terms, by contrast,
 * already rank #1–3 via the homepage/about-us page, so a competing
 * dedicated Boulder URL was intentionally NOT created (would risk
 * cannibalizing an already-strong ranking). Fort Collins and other Front
 * Range cities had minimal/no independent search signal, so they're
 * covered descriptively on the hub page rather than as separate thin
 * pages — consistent with "if the data doesn't support a page, don't
 * build it."
 *
 * TODO(nationwide licensing): before adding ANY state-specific claim (e.g.
 * "licensed in Texas", "we treat patients in Ohio"), confirm with the
 * practice which states the provider(s) are actually licensed in. As of
 * this writing, the only verified claims anywhere in the codebase are the
 * general "Licensed Functional Medicine Provider" + "100% Telehealth" +
 * "patients nationwide" copy already live on the site (content/data/
 * home.json, content/data/book-new-patient-evaluation.json) — there is
 * no state-by-state licensure list to draw from. Do not add one without
 * explicit confirmation.
 */

import { HUB_SECTIONS } from "./location-longform";

export interface AreaFaq {
  question: string;
  answer: string[];
}

export interface AreaSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Internal-link pills (e.g. related condition/state pages) rendered instead of plain bullets. */
  links?: { label: string; href: string }[];
}

/**
 * Front Range / Colorado communities linked descriptively on the hub page.
 * Boulder links to About Us (already ranks well there — see scope note
 * above); the rest link to their own dedicated pages under
 * /areas-we-serve/colorado/[city]/ (content/national-data.ts FRONT_RANGE_CITIES).
 */
export const FRONT_RANGE_LINKS = [
  { label: "Boulder", href: "/about-us/" },
  { label: "Denver", href: "/areas-we-serve/colorado/denver/" },
  { label: "Colorado", href: "/areas-we-serve/colorado/" },
];

/** Rendered by AreaPageTemplate on every areas-we-serve page (hub, state, condition, and city). */
export const AREA_MEDICAL_DISCLAIMER =
  "This page is for general educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always talk with your own physician or qualified healthcare provider about your specific symptoms and health history.";

export const AREA_HUB: {
  title: string;
  metaDescription: string;
  h1: string;
  accent: string;
  heroSubhead: string;
  intro: string[];
  sections: AreaSection[];
  faqs: AreaFaq[];
  datePublished: string;
} = {
  title: "Areas We Serve — Nationwide Telehealth Care | Dr. Autoimmune",
  metaDescription:
    "Boulder-based telehealth functional medicine for autoimmune and chronic conditions. See how visits work in Colorado and Denver, and how to ask about care from another state.",
  h1: "Areas We Serve: Telehealth Care Nationwide",
  accent: "Telehealth Care",
  heroSubhead:
    "Based in Boulder, Colorado, and built to be 100% remote — so you can get root-cause autoimmune care no matter what state you live in.",
  intro: [
    "Dr. Autoimmune is based in Boulder, Colorado. Appointments are telehealth, so the history, the lab review, and follow-up do not require a drive to an office. Whether the team can take you as a patient still has to be confirmed with the office. This page does not pretend that a copied state article is that confirmation.",
    "The location pages that remain are Colorado and Denver. Older state URLs redirect here. Older Front Range city URLs redirect to Denver. Read the sections below for how a visit works, then use the condition pages when you need a disease overview.",
  ],
  sections: [
    {
      heading: "Colorado Front Range",
      paragraphs: [
        "A large share of our patients live along the Front Range, from Boulder and Denver north through Longmont and Fort Collins, and south toward Colorado Springs. Because every visit is conducted by telehealth, there's no commute, no waiting room, and no need to take extra time off work for an in-office visit.",
      ],
      links: FRONT_RANGE_LINKS,
    },
    {
      heading: "Nationwide Telehealth Care",
      paragraphs: [
        "Beyond Colorado, we work with patients across the country who are looking for a root-cause, functional medicine approach to autoimmune and chronic health conditions. Lab work is coordinated locally wherever you live, and every consultation, follow-up, and plan review happens over video.",
      ],
    },
    ...HUB_SECTIONS,
  ],
  faqs: [
    {
      question: "Do I need to live near Boulder to become a patient?",
      answer: [
        "No. Our practice is 100% telehealth, so you can work with our team from anywhere in the country. Local lab work is coordinated near you, and every visit takes place over video.",
      ],
    },
    {
      question: "How does lab testing work if the practice is fully remote?",
      answer: [
        "We coordinate lab orders that can typically be completed at a lab location near you, and review the results together during a video visit — the same comprehensive evaluation you'd expect from an in-person functional medicine appointment.",
      ],
    },
    {
      question: "Is telehealth care as thorough as an in-person visit?",
      answer: [
        "Our telehealth visits are built around a comprehensive review of your history, symptoms, and labs, with the same root-cause approach used across our practice. Some hands-on evaluations may still require a local in-person provider, which we can help you identify if needed.",
      ],
    },
  ],
  datePublished: "2026-09-29",
};

