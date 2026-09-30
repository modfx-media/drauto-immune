/**
 * Nationwide pSEO data model + content builders for the `/areas-we-serve`
 * state hub pages and `/areas-we-serve/[state]/[condition]` pages.
 *
 * Scope note: GSC (gsc-report/Queries.csv) shows zero organic query signal
 * for any state/metro outside Boulder/Denver/Fort Collins, and an
 * independent 235-keyword DataForSEO check (data/pseo-national/keywords.json)
 * found no measurable US search volume for any condition x
 * online/virtual/telehealth combination and only trace (10-20/mo) volume
 * for a handful of states. This matrix was built at explicit user request
 * despite that finding — see conversation record — so every page combines
 * (a) genuinely substantive, already-reviewed condition education reused
 * from the site's own flagship condition pages (content/conditions-data.ts)
 * with (b) real, non-fabricated state geography/logistics content and (c) a
 * consistent, honest FAQ that never claims state-specific medical
 * licensure (see TODO in content/areas-data.ts) — to avoid classic
 * thin/duplicate pSEO patterns as much as possible at this scale.
 */

import type { AreaFaq, AreaSection } from "./areas-data";
import { COLORADO_PAGE, DENVER_PAGE } from "./location-longform";

export interface StateData {
  slug: string;
  name: string;
  abbr: string;
  region: "Northeast" | "Southeast" | "Midwest" | "Southwest" | "West";
  capital: string;
  majorCities: string[];
}

export const STATES: StateData[] = [
  { slug: "alabama", name: "Alabama", abbr: "AL", region: "Southeast", capital: "Montgomery", majorCities: ["Birmingham", "Huntsville", "Mobile"] },
  { slug: "alaska", name: "Alaska", abbr: "AK", region: "West", capital: "Juneau", majorCities: ["Anchorage", "Fairbanks", "Juneau"] },
  { slug: "arizona", name: "Arizona", abbr: "AZ", region: "Southwest", capital: "Phoenix", majorCities: ["Phoenix", "Tucson", "Mesa"] },
  { slug: "arkansas", name: "Arkansas", abbr: "AR", region: "Southeast", capital: "Little Rock", majorCities: ["Little Rock", "Fayetteville", "Fort Smith"] },
  { slug: "california", name: "California", abbr: "CA", region: "West", capital: "Sacramento", majorCities: ["Los Angeles", "San Francisco", "San Diego"] },
  { slug: "colorado", name: "Colorado", abbr: "CO", region: "West", capital: "Denver", majorCities: ["Denver", "Colorado Springs", "Boulder"] },
  { slug: "connecticut", name: "Connecticut", abbr: "CT", region: "Northeast", capital: "Hartford", majorCities: ["Hartford", "Bridgeport", "New Haven"] },
  { slug: "delaware", name: "Delaware", abbr: "DE", region: "Northeast", capital: "Dover", majorCities: ["Wilmington", "Dover", "Newark"] },
  { slug: "florida", name: "Florida", abbr: "FL", region: "Southeast", capital: "Tallahassee", majorCities: ["Miami", "Orlando", "Tampa"] },
  { slug: "georgia", name: "Georgia", abbr: "GA", region: "Southeast", capital: "Atlanta", majorCities: ["Atlanta", "Savannah", "Augusta"] },
  { slug: "hawaii", name: "Hawaii", abbr: "HI", region: "West", capital: "Honolulu", majorCities: ["Honolulu", "Hilo", "Kailua"] },
  { slug: "idaho", name: "Idaho", abbr: "ID", region: "West", capital: "Boise", majorCities: ["Boise", "Meridian", "Nampa"] },
  { slug: "illinois", name: "Illinois", abbr: "IL", region: "Midwest", capital: "Springfield", majorCities: ["Chicago", "Aurora", "Naperville"] },
  { slug: "indiana", name: "Indiana", abbr: "IN", region: "Midwest", capital: "Indianapolis", majorCities: ["Indianapolis", "Fort Wayne", "Evansville"] },
  { slug: "iowa", name: "Iowa", abbr: "IA", region: "Midwest", capital: "Des Moines", majorCities: ["Des Moines", "Cedar Rapids", "Davenport"] },
  { slug: "kansas", name: "Kansas", abbr: "KS", region: "Midwest", capital: "Topeka", majorCities: ["Wichita", "Overland Park", "Kansas City"] },
  { slug: "kentucky", name: "Kentucky", abbr: "KY", region: "Southeast", capital: "Frankfort", majorCities: ["Louisville", "Lexington", "Bowling Green"] },
  { slug: "louisiana", name: "Louisiana", abbr: "LA", region: "Southeast", capital: "Baton Rouge", majorCities: ["New Orleans", "Baton Rouge", "Shreveport"] },
  { slug: "maine", name: "Maine", abbr: "ME", region: "Northeast", capital: "Augusta", majorCities: ["Portland", "Lewiston", "Bangor"] },
  { slug: "maryland", name: "Maryland", abbr: "MD", region: "Northeast", capital: "Annapolis", majorCities: ["Baltimore", "Annapolis", "Frederick"] },
  { slug: "massachusetts", name: "Massachusetts", abbr: "MA", region: "Northeast", capital: "Boston", majorCities: ["Boston", "Worcester", "Springfield"] },
  { slug: "michigan", name: "Michigan", abbr: "MI", region: "Midwest", capital: "Lansing", majorCities: ["Detroit", "Grand Rapids", "Ann Arbor"] },
  { slug: "minnesota", name: "Minnesota", abbr: "MN", region: "Midwest", capital: "Saint Paul", majorCities: ["Minneapolis", "Saint Paul", "Rochester"] },
  { slug: "mississippi", name: "Mississippi", abbr: "MS", region: "Southeast", capital: "Jackson", majorCities: ["Jackson", "Gulfport", "Southaven"] },
  { slug: "missouri", name: "Missouri", abbr: "MO", region: "Midwest", capital: "Jefferson City", majorCities: ["Kansas City", "St. Louis", "Springfield"] },
  { slug: "montana", name: "Montana", abbr: "MT", region: "West", capital: "Helena", majorCities: ["Billings", "Missoula", "Bozeman"] },
  { slug: "nebraska", name: "Nebraska", abbr: "NE", region: "Midwest", capital: "Lincoln", majorCities: ["Omaha", "Lincoln", "Bellevue"] },
  { slug: "nevada", name: "Nevada", abbr: "NV", region: "West", capital: "Carson City", majorCities: ["Las Vegas", "Reno", "Henderson"] },
  { slug: "new-hampshire", name: "New Hampshire", abbr: "NH", region: "Northeast", capital: "Concord", majorCities: ["Manchester", "Nashua", "Concord"] },
  { slug: "new-jersey", name: "New Jersey", abbr: "NJ", region: "Northeast", capital: "Trenton", majorCities: ["Newark", "Jersey City", "Trenton"] },
  { slug: "new-mexico", name: "New Mexico", abbr: "NM", region: "Southwest", capital: "Santa Fe", majorCities: ["Albuquerque", "Santa Fe", "Las Cruces"] },
  { slug: "new-york", name: "New York", abbr: "NY", region: "Northeast", capital: "Albany", majorCities: ["New York City", "Buffalo", "Albany"] },
  { slug: "north-carolina", name: "North Carolina", abbr: "NC", region: "Southeast", capital: "Raleigh", majorCities: ["Charlotte", "Raleigh", "Greensboro"] },
  { slug: "north-dakota", name: "North Dakota", abbr: "ND", region: "Midwest", capital: "Bismarck", majorCities: ["Fargo", "Bismarck", "Grand Forks"] },
  { slug: "ohio", name: "Ohio", abbr: "OH", region: "Midwest", capital: "Columbus", majorCities: ["Columbus", "Cleveland", "Cincinnati"] },
  { slug: "oklahoma", name: "Oklahoma", abbr: "OK", region: "Southwest", capital: "Oklahoma City", majorCities: ["Oklahoma City", "Tulsa", "Norman"] },
  { slug: "oregon", name: "Oregon", abbr: "OR", region: "West", capital: "Salem", majorCities: ["Portland", "Salem", "Eugene"] },
  { slug: "pennsylvania", name: "Pennsylvania", abbr: "PA", region: "Northeast", capital: "Harrisburg", majorCities: ["Philadelphia", "Pittsburgh", "Harrisburg"] },
  { slug: "rhode-island", name: "Rhode Island", abbr: "RI", region: "Northeast", capital: "Providence", majorCities: ["Providence", "Cranston", "Warwick"] },
  { slug: "south-carolina", name: "South Carolina", abbr: "SC", region: "Southeast", capital: "Columbia", majorCities: ["Columbia", "Charleston", "Greenville"] },
  { slug: "south-dakota", name: "South Dakota", abbr: "SD", region: "Midwest", capital: "Pierre", majorCities: ["Sioux Falls", "Rapid City", "Pierre"] },
  { slug: "tennessee", name: "Tennessee", abbr: "TN", region: "Southeast", capital: "Nashville", majorCities: ["Nashville", "Memphis", "Knoxville"] },
  { slug: "texas", name: "Texas", abbr: "TX", region: "Southwest", capital: "Austin", majorCities: ["Houston", "Dallas", "Austin"] },
  { slug: "utah", name: "Utah", abbr: "UT", region: "West", capital: "Salt Lake City", majorCities: ["Salt Lake City", "West Valley City", "Provo"] },
  { slug: "vermont", name: "Vermont", abbr: "VT", region: "Northeast", capital: "Montpelier", majorCities: ["Burlington", "Montpelier", "Rutland"] },
  { slug: "virginia", name: "Virginia", abbr: "VA", region: "Southeast", capital: "Richmond", majorCities: ["Virginia Beach", "Richmond", "Norfolk"] },
  { slug: "washington", name: "Washington", abbr: "WA", region: "West", capital: "Olympia", majorCities: ["Seattle", "Spokane", "Tacoma"] },
  { slug: "west-virginia", name: "West Virginia", abbr: "WV", region: "Southeast", capital: "Charleston", majorCities: ["Charleston", "Huntington", "Morgantown"] },
  { slug: "wisconsin", name: "Wisconsin", abbr: "WI", region: "Midwest", capital: "Madison", majorCities: ["Milwaukee", "Madison", "Green Bay"] },
  { slug: "wyoming", name: "Wyoming", abbr: "WY", region: "West", capital: "Cheyenne", majorCities: ["Cheyenne", "Casper", "Laramie"] },
];

export interface StateConditionSummary {
  /** Matches a slug in content/conditions-data.ts CONDITIONS (the canonical flagship page). */
  slug: string;
  name: string;
  shortOverview: string;
  symptomBadges: string[];
}

/**
 * 8 conditions with the strongest confirmed GSC demand (see
 * data/pseo/gsc-analysis.json clusters) that also have an existing
 * canonical flagship page to link back to for full-depth content.
 */
export const STATE_CONDITIONS: StateConditionSummary[] = [
  {
    slug: "hashimotos-thyroiditis-graves",
    name: "Hashimoto's Thyroiditis",
    shortOverview:
      "Hashimoto's is an autoimmune disease in which the body attacks its own thyroid gland, and it's the underlying cause of roughly 90% of hypothyroidism cases. Our functional medicine approach looks beyond thyroid hormone replacement to find and address the root triggers behind the condition.",
    symptomBadges: ["Fatigue", "Weight gain", "Brain fog", "Hair loss", "Cold sensitivity", "Joint pain", "Dry skin"],
  },
  {
    slug: "thyroid-conditions",
    name: "Thyroid Conditions",
    shortOverview:
      "Over 90% of thyroid conditions are autoimmune in nature, meaning the immune system is attacking thyroid tissue rather than the gland simply malfunctioning on its own. Our approach focuses on identifying what's driving that immune response, not just managing hormone levels.",
    symptomBadges: ["Fatigue", "Weight changes", "Brain fog", "Sleep problems", "Hair loss", "Heart palpitations"],
  },
  {
    slug: "lupus",
    name: "Lupus",
    shortOverview:
      "Lupus is a chronic autoimmune disease that can cause inflammation and pain throughout the body, affecting nearly 1.5 million people in the U.S. Our functional medicine team looks at gut health, detoxification, and immune triggers to help support patients living with lupus.",
    symptomBadges: ["Joint pain", "Fatigue", "Butterfly rash", "Sun sensitivity", "Hair loss", "Anemia"],
  },
  {
    slug: "celiac-disease-and-gluten-intolerance",
    name: "Celiac Disease & Gluten Intolerance",
    shortOverview:
      "Celiac disease is an autoimmune condition triggered by gluten, and many patients continue to have symptoms even after going gluten-free. Our team helps identify why gut healing may be incomplete and builds a broader plan around nutrition, gut repair, and immune support.",
    symptomBadges: ["Abdominal pain", "Bloating", "Fatigue", "Brain fog", "Joint pain", "Skin rashes"],
  },
  {
    slug: "sjogrens-syndrome",
    name: "Sjögren's Syndrome",
    shortOverview:
      "Sjögren's syndrome is a chronic autoimmune disease affecting as many as 4 million Americans, often overlapping with other autoimmune conditions. Diagnosis can be difficult, and our functional medicine approach focuses on the underlying immune and gut-health drivers behind symptoms.",
    symptomBadges: ["Dry eyes", "Dry mouth", "Fatigue", "Joint pain", "Brain fog", "Respiratory issues"],
  },
  {
    slug: "rheumatoid-arthritis",
    name: "Rheumatoid Arthritis",
    shortOverview:
      "Rheumatoid arthritis is an autoimmune disease in which the immune system attacks the joints, causing pain, stiffness, and swelling that can be debilitating without the right support. We look at gut health, food sensitivities, and other environmental triggers behind the disease process.",
    symptomBadges: ["Joint swelling", "Morning stiffness", "Fatigue", "Brain fog", "Loss of appetite"],
  },
  {
    slug: "inflammatory-bowel-disease",
    name: "Inflammatory Bowel Disease",
    shortOverview:
      "Inflammatory bowel disease (IBD), including Crohn's disease and ulcerative colitis, affects roughly 3 million people in the U.S. Rather than only managing flares, our functional medicine approach works to heal the gut lining and identify each patient's individual triggers.",
    symptomBadges: ["Abdominal pain", "Diarrhea", "Fatigue", "Reduced appetite", "Weight loss"],
  },
  {
    slug: "raynauds-phenomenon",
    name: "Raynaud's Phenomenon",
    shortOverview:
      "Raynaud's phenomenon causes blood vessel spasms that restrict blood flow to the fingers, toes, ears, or nose, and it's frequently linked to an underlying autoimmune condition such as Sjögren's syndrome. We look at the broader immune picture, not just the circulation symptoms.",
    symptomBadges: ["Cold sensitivity", "Color-changing fingers", "Numbness", "Swelling when warmed"],
  },
];

export function getState(slug: string): StateData | undefined {
  return STATES.find((s) => s.slug === slug);
}

export function getStateSlugs(): string[] {
  return STATES.map((s) => s.slug);
}

export function getStateCondition(slug: string): StateConditionSummary | undefined {
  return STATE_CONDITIONS.find((c) => c.slug === slug);
}

export function getStateConditionSlugs(): string[] {
  return STATE_CONDITIONS.map((c) => c.slug);
}

export interface FrontRangeCity {
  slug: string;
  name: string;
  /** Approximate one-way drive time from Boulder (general public knowledge, not an exact claim). */
  driveTime: string;
  /** A real, non-medical local detail to keep each page's intro genuinely distinct. */
  localNote: string;
}

/**
 * Colorado Front Range cities near Boulder HQ with a genuinely dedicated page
 * (Denver has confirmed GSC search demand; the rest are close enough to
 * Boulder that patients realistically search "near me" from these towns).
 * Boulder itself intentionally has no page here — see content/areas-data.ts
 * scope note on cannibalization risk with the already-ranking homepage/about-us copy.
 */
export const FRONT_RANGE_CITIES: FrontRangeCity[] = [
  { slug: "denver", name: "Denver", driveTime: "about 30 minutes", localNote: "Colorado's capital and largest city" },
  { slug: "longmont", name: "Longmont", driveTime: "about 20 minutes", localNote: "one of Boulder County's largest cities" },
  { slug: "fort-collins", name: "Fort Collins", driveTime: "about 45 minutes", localNote: "home to Colorado State University" },
  { slug: "louisville", name: "Louisville", driveTime: "about 10 minutes", localNote: "just southeast of Boulder" },
  { slug: "lafayette", name: "Lafayette", driveTime: "about 15 minutes", localNote: "neighboring Louisville along US-287" },
  { slug: "broomfield", name: "Broomfield", driveTime: "about 15 minutes", localNote: "midway between Boulder and Denver" },
  { slug: "westminster", name: "Westminster", driveTime: "about 20 minutes", localNote: "a large suburb along the US-36 corridor" },
  { slug: "arvada", name: "Arvada", driveTime: "about 25 minutes", localNote: "northwest of downtown Denver" },
  { slug: "aurora", name: "Aurora", driveTime: "about 45 minutes", localNote: "one of the largest cities in the Denver metro area" },
  { slug: "colorado-springs", name: "Colorado Springs", driveTime: "about 1.5 hours", localNote: "home to the U.S. Air Force Academy" },
];

export function getFrontRangeCity(slug: string): FrontRangeCity | undefined {
  return FRONT_RANGE_CITIES.find((c) => c.slug === slug);
}

export function getFrontRangeCitySlugs(): string[] {
  return FRONT_RANGE_CITIES.map((c) => c.slug);
}

export function buildFrontRangeCityContent(city: FrontRangeCity): GeneratedPage {
  if (city.slug === "denver") return DENVER_PAGE;
  return {
    title: `${city.name}, CO Telehealth Care | Dr. Autoimmune`,
    metaDescription: `100% telehealth, root-cause functional medicine care for ${city.name}, Colorado patients. Book a Discovery Call today.`,
    h1: `Telehealth Care for ${city.name}, Colorado Patients`,
    accent: city.name,
    heroSubhead: `Based ${city.driveTime} away in Boulder, and built to be 100% remote — so ${city.name} patients never need to drive in for a visit.`,
    intro: [
      `Dr. Autoimmune is based in Boulder, Colorado — ${city.driveTime} from ${city.name}, ${city.localNote}. Because our entire practice operates by telehealth, ${city.name} patients can work with our team without making that drive at all.`,
      `Every visit, from your initial intake through lab review and ongoing follow-up, happens by secure video. Lab work is coordinated at a facility convenient to where you live in ${city.name}, and results are reviewed together during a telehealth appointment.`,
    ],
    sections: [
      {
        heading: "Conditions We Support",
        paragraphs: [
          `Our practice focuses on autoimmune and chronic conditions that respond well to a root-cause, functional medicine approach. Explore condition-specific information for Colorado patients below.`,
        ],
        links: STATE_CONDITIONS.map((c) => ({ label: c.name, href: `/areas-we-serve/colorado/${c.slug}/` })),
      },
      {
        heading: "What a Telehealth Visit Looks Like",
        paragraphs: TELEHEALTH_VISIT_PARAGRAPHS,
      },
      {
        heading: "Why Functional Medicine?",
        paragraphs: WHY_FUNCTIONAL_MEDICINE_PARAGRAPHS,
      },
    ],
    faqs: [
      {
        question: `Do I need to travel to Boulder for an appointment from ${city.name}?`,
        answer: [
          `No — every visit is conducted by video, so ${city.name} patients never need to make the drive to Boulder for an appointment.`,
        ],
      },
      {
        question: `Is Dr. Autoimmune able to treat patients located in ${city.name}?`,
        answer: [
          `Telehealth practice availability can vary and change over time. Please contact our team directly to confirm current availability before booking, so we can make sure we're able to see you.`,
        ],
      },
      {
        question: "How does lab testing work if the practice is fully remote?",
        answer: [
          "We coordinate lab orders that can typically be completed at a lab location near you, and review the results together during a video visit — the same comprehensive evaluation you'd expect from an in-person functional medicine appointment.",
        ],
      },
    ],
    datePublished: "2026-09-29",
  };
}

export function getStatesByRegion(): Record<StateData["region"], StateData[]> {
  const grouped: Record<StateData["region"], StateData[]> = {
    Northeast: [],
    Southeast: [],
    Midwest: [],
    Southwest: [],
    West: [],
  };
  for (const state of STATES) grouped[state.region].push(state);
  return grouped;
}

const WHY_FUNCTIONAL_MEDICINE_PARAGRAPHS = [
  "It can be frustrating trying to find help with chronic and complex conditions, which is why our practice is dedicated to exactly that. Instead of only treating symptoms, our functional medicine approach focuses on finding the underlying contributors we can actually test and discuss with you.",
  "Intestinal barrier function is one factor researchers study in some autoimmune conditions. It is not the cause of every autoimmune disease, and we do not treat it as one. Plans are built from your history, symptoms, and labs, and may include nutrition, supplements, and lifestyle changes your clinician thinks are relevant.",
];

const TELEHEALTH_VISIT_PARAGRAPHS = [
  "Your first visit is a comprehensive video consultation covering your full health history, current symptoms, and any prior lab work or diagnoses.",
  "From there, we typically coordinate additional lab testing that can be completed at a location convenient to you, and review the results together during a follow-up video visit — the same thorough evaluation you'd expect from an in-person functional medicine appointment, without the commute or waiting room.",
];

export interface GeneratedPage {
  title: string;
  metaDescription: string;
  h1: string;
  accent: string;
  heroSubhead: string;
  intro: string[];
  sections: AreaSection[];
  faqs: AreaFaq[];
  datePublished: string;
}

export function buildStateHubContent(state: StateData): GeneratedPage {
  if (state.slug === "colorado") return COLORADO_PAGE;
  const citiesList = state.majorCities.join(", ");
  return {
    title: `${state.name} Autoimmune Telehealth Care | Dr. Autoimmune`,
    metaDescription: `100% telehealth, root-cause functional medicine care for ${state.name} patients. Book a Discovery Call today.`,
    h1: `Telehealth Autoimmune & Functional Medicine Care in ${state.name}`,
    accent: state.name,
    heroSubhead: `Based in Boulder, Colorado and built to be 100% remote, Dr. Autoimmune works with ${state.name} patients entirely by video — no travel required.`,
    intro: [
      `Dr. Autoimmune is a telehealth-only functional medicine practice based in Boulder, Colorado. Patients throughout ${state.name} — including ${citiesList} and surrounding communities — can work with our team for root-cause autoimmune and chronic-condition care without ever visiting an office in person.`,
      `Every visit, from your initial intake through lab review and ongoing follow-up, happens by secure video. Lab work is coordinated at a facility convenient to where you live in ${state.name}, and results are reviewed together during a telehealth appointment.`,
    ],
    sections: [
      {
        heading: `Conditions We Support for ${state.name} Patients`,
        paragraphs: [
          `Our practice focuses on autoimmune and chronic conditions that respond well to a root-cause, functional medicine approach. Explore condition-specific information for ${state.name} patients below.`,
        ],
        links: STATE_CONDITIONS.map((c) => ({ label: c.name, href: `/areas-we-serve/${state.slug}/${c.slug}/` })),
      },
      {
        heading: "What a Telehealth Visit Looks Like",
        paragraphs: TELEHEALTH_VISIT_PARAGRAPHS,
      },
      {
        heading: "Why Functional Medicine?",
        paragraphs: WHY_FUNCTIONAL_MEDICINE_PARAGRAPHS,
      },
    ],
    faqs: [
      {
        question: `Do I need to live near Boulder, Colorado to become a patient from ${state.name}?`,
        answer: [
          `No. Our practice is 100% telehealth, so ${state.name} patients can work with our team from anywhere in the state. Local lab work is coordinated near you, and every visit takes place over video.`,
        ],
      },
      {
        question: `Is Dr. Autoimmune able to treat patients located in ${state.name}?`,
        answer: [
          `Telehealth practice availability can vary by state and change over time. Please contact our team directly to confirm current availability for ${state.name} before booking, so we can make sure we're able to see you.`,
        ],
      },
      {
        question: "How does lab testing work if the practice is fully remote?",
        answer: [
          "We coordinate lab orders that can typically be completed at a lab location near you, and review the results together during a video visit — the same comprehensive evaluation you'd expect from an in-person functional medicine appointment.",
        ],
      },
    ],
    datePublished: "2026-09-29",
  };
}

export function buildStateConditionContent(state: StateData, condition: StateConditionSummary): GeneratedPage {
  const citiesList = state.majorCities.join(", ");
  return {
    title: `${condition.name} in ${state.abbr} | Dr. Autoimmune`,
    metaDescription: `${condition.name} telehealth care for ${state.name} patients — 100% virtual. Book a Discovery Call.`,
    h1: `${condition.name} Care for ${state.name} Patients`,
    accent: `${state.name} · ${condition.name}`,
    heroSubhead: `A root-cause, telehealth approach to ${condition.name} for patients throughout ${state.name} — no office visit required.`,
    intro: [
      condition.shortOverview,
      `If you live in ${state.name} — whether in ${citiesList}, or anywhere else in the state — you can work with Dr. Autoimmune's team entirely by video visit. Read our full ${condition.name} guide for a deeper look at symptoms, triggers, and treatment approach, or continue below for what telehealth care looks like for ${state.name} patients specifically.`,
    ],
    sections: [
      {
        heading: `${condition.name} Symptoms`,
        paragraphs: [`Patients with ${condition.name} commonly report symptoms such as:`],
        bullets: condition.symptomBadges,
      },
      {
        heading: "What a Telehealth Visit Looks Like",
        paragraphs: TELEHEALTH_VISIT_PARAGRAPHS,
      },
      {
        heading: `Getting Care in ${state.name}`,
        paragraphs: [
          `Patients from across ${state.name} — including ${citiesList} — work with our practice by video, with lab testing coordinated at a facility near where you live.`,
        ],
        links: [
          { label: `${state.name} Service Area`, href: `/areas-we-serve/${state.slug}/` },
          { label: `Full ${condition.name} Guide`, href: `/${condition.slug}/` },
        ],
      },
    ],
    faqs: [
      {
        question: `Is telehealth care effective for ${condition.name}?`,
        answer: [
          `Our telehealth visits are built around a comprehensive review of your history, symptoms, and labs, using the same root-cause approach used across our practice. Some hands-on evaluations may still require a local in-person provider, which we can help you identify if needed.`,
        ],
      },
      {
        question: `Is Dr. Autoimmune able to treat ${condition.name} patients located in ${state.name}?`,
        answer: [
          `Telehealth practice availability can vary by state and change over time. Please contact our team directly to confirm current availability for ${state.name} before booking, so we can make sure we're able to see you.`,
        ],
      },
      {
        question: `Do I need to travel to Boulder, Colorado for ${condition.name} care?`,
        answer: [`No — every visit is conducted by video, so ${state.name} patients never need to travel for an appointment.`],
      },
    ],
    datePublished: "2026-09-29",
  };
}
