/**
 * Deterministic builder for the 400 state × condition matrix pages.
 *
 * Same inputs always yield the same output. Different (state, condition) pairs draw
 * different mixes of paragraph variants via string hashing. All copy is qualitative:
 * no prevalence figures, prices, hours, reviews, staff names, clinic names, or licensing claims.
 */

import type { AreaFaq, AreaSection } from "./areas-data";
import type { GeneratedPage, StateConditionSummary, StateData } from "./national-data";
import { STATE_CONDITIONS } from "./national-data";
import { STATE_PROFILES } from "./state-profiles";
import {
  AVAILABILITY_ANSWERS,
  AVAILABILITY_QUESTIONS,
  CONDITION_BANKS,
  CONDITION_LEDES,
  INTRO_CLOSERS,
  INTRO_OPENERS,
  LAB_WORKFLOWS,
  RELATED_CARE_PARAGRAPHS,
  REGIONAL_CLOSERS,
  TELEHEALTH_WORKFLOWS,
  CLIMATE_COMBO_VARIANTS,
  CLIMATE_INTRO_VARIANTS,
  getClimateOverlayParagraphs,
  type PageContext,
} from "./matrix-condition-banks";
import { CONDITION_LISTS } from "./matrix-banks/lists";
import { MATRIX_VARIANT_PLAN } from "./matrix-variant-plan";

const DATE_PUBLISHED = "2026-09-29";
const META_DESCRIPTION_LIMIT = 160;

const CONDITION_LOWER: Record<string, string> = {
  "hashimotos-thyroiditis-graves": "Hashimoto's thyroiditis",
  "thyroid-conditions": "thyroid conditions",
  lupus: "lupus",
  "celiac-disease-and-gluten-intolerance": "celiac disease and gluten intolerance",
  "sjogrens-syndrome": "Sjögren's syndrome",
  "rheumatoid-arthritis": "rheumatoid arthritis",
  "inflammatory-bowel-disease": "inflammatory bowel disease",
  "raynauds-phenomenon": "Raynaud's phenomenon",
};

function hashString(input: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < input.length; i++) {
    h ^= input.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  h ^= h >>> 15;
  h = Math.imul(h, 0x2c1b3c6d);
  h ^= h >>> 12;
  return h >>> 0;
}

function pick<T>(items: readonly T[], key: string): T {
  return items[hashString(key) % items.length];
}

function pickDistinct<T>(items: readonly T[], count: number, key: string): T[] {
  return items
    .map((item, index) => ({ item, order: hashString(`${key}#${index}`) }))
    .sort((a, b) => a.order - b.order)
    .slice(0, count)
    .map((entry) => entry.item);
}


const SLOT_NAMES = [
  "mech",
  "symp",
  "test",
  "nutr",
  "func",
  "expect",
  "opener",
  "closer",
  "lede",
  "tele",
  "lab",
  "reg",
  "rel",
  "avq",
  "ava",
] as const;
type SlotName = (typeof SLOT_NAMES)[number];

const LIST_NAMES = ["notice", "markers", "habits", "questions"] as const;
type ListName = (typeof LIST_NAMES)[number];

const SECTION_KEYS = [
  "understand",
  "symptoms",
  "testing",
  "telehealth",
  "regional",
  "nutrition",
  "functional",
  "expect",
  "related",
] as const;
type SectionKey = (typeof SECTION_KEYS)[number];

const HEADING_VARIANTS = 4;
const LIST_PICK_COUNT = 5;
const FAQ_ENCODED_LENGTH = 5;

/** One concrete choice of paragraph variants, list items, FAQs, and headings for a single page. */
export type VariantAssignment = {
  slots: number[];
  heads: number[];
  climate: number[];
  faqs: number[];
  lists: number[][];
};

export type VariantSchema = {
  slotSizes: number[];
  headSizes: number[];
  climateSizes: number[];
  faqPool: number;
  listPools: number[];
};

export function variantSchema(conditionSlug: string): VariantSchema {
  const bank = CONDITION_BANKS[conditionSlug];
  const lists = CONDITION_LISTS[conditionSlug];
  const sizes: Record<SlotName, number> = {
    mech: bank.mechanisms.length,
    symp: bank.symptomsNarrative.length,
    test: bank.testing.length,
    nutr: bank.nutritionTriggers.length,
    func: bank.functionalApproach.length,
    expect: bank.whatToExpect.length,
    opener: INTRO_OPENERS.length,
    closer: INTRO_CLOSERS.length,
    lede: CONDITION_LEDES[conditionSlug].length,
    tele: TELEHEALTH_WORKFLOWS.length,
    lab: LAB_WORKFLOWS.length,
    reg: REGIONAL_CLOSERS.length,
    rel: RELATED_CARE_PARAGRAPHS.length,
    avq: AVAILABILITY_QUESTIONS.length,
    ava: AVAILABILITY_ANSWERS.length,
  };
  return {
    slotSizes: SLOT_NAMES.map((name) => sizes[name]),
    headSizes: SECTION_KEYS.map(() => HEADING_VARIANTS),
    climateSizes: [CLIMATE_INTRO_VARIANTS, CLIMATE_COMBO_VARIANTS],
    faqPool: bank.faqs.length,
    listPools: LIST_NAMES.map((name) => lists[name].length),
  };
}

export function faqCountFor(stateSlug: string, conditionSlug: string): number {
  return 3 + (hashString(`faqn|${stateSlug}|${conditionSlug}`) % 3);
}

export const LIST_PICK_SIZE = LIST_PICK_COUNT;

/** Hash-derived assignment. This is the fallback when a page has no entry in the variant plan. */
export function hashAssignment(stateSlug: string, conditionSlug: string, attempt = 0): VariantAssignment {
  const pairKey = `${stateSlug}|${conditionSlug}`;
  const schema = variantSchema(conditionSlug);
  const indexes = (n: number) => Array.from({ length: n }, (_, i) => i);
  return {
    slots: schema.slotSizes.map((size, i) => hashString(`${pairKey}|slot${i}|${attempt}`) % size),
    heads: schema.headSizes.map((size, i) => hashString(`${pairKey}|head${i}|${attempt}`) % size),
    climate: schema.climateSizes.map((size, i) => hashString(`${pairKey}|climate${i}|${attempt}`) % size),
    faqs: pickDistinct(indexes(schema.faqPool), faqCountFor(stateSlug, conditionSlug), `faq|${pairKey}|${attempt}`),
    lists: schema.listPools.map((pool, i) =>
      pickDistinct(indexes(pool), LIST_PICK_COUNT, `list${i}|${pairKey}|${attempt}`),
    ),
  };
}

export function encodeAssignment(a: VariantAssignment): number[] {
  const faqs = [...a.faqs];
  while (faqs.length < FAQ_ENCODED_LENGTH) faqs.push(-1);
  return [...a.slots, ...a.heads, ...a.climate, ...faqs, ...a.lists.flat()];
}

function decodeAssignment(encoded: readonly number[], conditionSlug: string, faqCount: number): VariantAssignment | null {
  const schema = variantSchema(conditionSlug);
  const expectedLength =
    schema.slotSizes.length + schema.headSizes.length + schema.climateSizes.length + FAQ_ENCODED_LENGTH + schema.listPools.length * LIST_PICK_COUNT;
  if (encoded.length !== expectedLength) return null;
  let cursor = 0;
  const take = (n: number) => encoded.slice(cursor, (cursor += n));
  const slots = take(schema.slotSizes.length);
  const heads = take(schema.headSizes.length);
  const climate = take(schema.climateSizes.length);
  const faqs = take(FAQ_ENCODED_LENGTH).filter((v) => v >= 0);
  const lists = schema.listPools.map(() => take(LIST_PICK_COUNT));
  const inRange = (values: number[], sizes: number[]) => values.every((v, i) => Number.isInteger(v) && v >= 0 && v < sizes[i]);
  const distinct = (values: number[]) => new Set(values).size === values.length;
  if (!inRange(slots, schema.slotSizes) || !inRange(heads, schema.headSizes) || !inRange(climate, schema.climateSizes)) return null;
  if (faqs.length !== faqCount || !distinct(faqs) || faqs.some((v) => v >= schema.faqPool)) return null;
  for (let i = 0; i < lists.length; i++) {
    if (!distinct(lists[i]) || lists[i].some((v) => v < 0 || v >= schema.listPools[i])) return null;
  }
  return { slots, heads, climate, faqs, lists };
}

export function resolveAssignment(stateSlug: string, conditionSlug: string): VariantAssignment {
  const encoded = MATRIX_VARIANT_PLAN[`${stateSlug}|${conditionSlug}`];
  if (encoded) {
    const decoded = decodeAssignment(encoded, conditionSlug, faqCountFor(stateSlug, conditionSlug));
    if (decoded) return decoded;
  }
  return hashAssignment(stateSlug, conditionSlug);
}

const SECTION_HEADINGS: Record<SectionKey, ((c: PageContext) => string)[]> = {
  understand: [
    (c) => `Understanding ${c.cond}`,
    (c) => `What Is Going On in ${c.cond}`,
    (c) => `The Biology Behind ${c.cond}`,
    (c) => `How ${c.cond} Works in the Body`,
  ],
  symptoms: [
    () => "Symptoms and What Patients Notice",
    (c) => `What People With ${c.cond} Often Describe`,
    () => "Everyday Signs Worth Tracking",
    () => "Reading the Symptom Picture",
  ],
  testing: [
    () => "Testing and Labs",
    () => "Which Tests and Labs Come Up",
    () => "Blood Work, Imaging, and What They Show",
    () => "Looking Under the Hood: Testing",
  ],
  telehealth: [
    (c) => `How Telehealth Works for ${c.state} Patients`,
    (c) => `Video Visits From ${c.state}: The Practical Side`,
    (c) => `Getting Care at a Distance in ${c.state}`,
    (c) => `Telehealth Logistics for ${c.state}`,
  ],
  regional: [
    (c) => `Regional Considerations in ${c.state}`,
    (c) => `Climate and Season in ${c.state}`,
    (c) => `Weather, Light, and Habits in ${c.state}`,
    (c) => `Local Context for ${c.state} Patients`,
  ],
  nutrition: [
    () => "Nutrition and Lifestyle Angles",
    () => "Food, Habits, and Daily Routines",
    () => "Practical Nutrition and Lifestyle Questions",
    (c) => `Eating and Living Well Around ${c.cond}`,
  ],
  functional: [
    (c) => `A Functional Medicine Lens on ${c.cond}`,
    () => "How a Functional Approach Fits In",
    () => "Working Alongside Your Specialists",
    () => "What Functional Medicine Adds",
  ],
  expect: [
    () => "What to Expect From the Process",
    () => "Your First Steps and Follow-Ups",
    () => "How Visits Typically Unfold",
    () => "From Discovery Call to Follow-Up",
  ],
  related: [
    (c) => `Related Care for ${c.state} Patients`,
    () => "Where to Go Next",
    (c) => `More Resources for ${c.state} Patients`,
    () => "Keep Exploring",
  ],
};

const LIST_LEADS: Record<ListName, string[]> = {
  notice: [
    "Details worth writing down between visits:",
    "Observations that help a clinician see your pattern:",
    "Things to note on a simple log:",
    "Small details that add up over a few weeks:",
  ],
  markers: [
    "Markers and tests clinicians commonly discuss for this condition:",
    "Items that may come up when labs and imaging are reviewed:",
    "Tests a clinician may consider, depending on your history:",
    "Possible entries on a testing conversation, none of them automatic:",
  ],
  habits: [
    "Everyday habits people commonly ask about:",
    "Practical routines that come up in conversations about daily life:",
    "Small habits patients often raise:",
    "Ideas to discuss with your clinician before adopting:",
  ],
  questions: [
    "Questions worth bringing to your visits:",
    "Questions that often make appointments more productive:",
    "Prompts to take to your specialist or follow-up:",
    "Things to ask when you sit down with your care team:",
  ],
};

function listCities(cities: string[]): string {
  if (cities.length <= 1) return cities.join("");
  if (cities.length === 2) return `${cities[0]} and ${cities[1]}`;
  return `${cities.slice(0, -1).join(", ")}, and ${cities[cities.length - 1]}`;
}

function fitMetaDescription(candidates: string[], start: number): string {
  for (let i = 0; i < candidates.length; i++) {
    const candidate = candidates[(start + i) % candidates.length];
    if (candidate.length <= META_DESCRIPTION_LIMIT) return candidate;
  }
  return [...candidates].sort((a, b) => a.length - b.length)[0];
}

export function buildEnrichedStateConditionContent(
  state: StateData,
  condition: StateConditionSummary,
): GeneratedPage {
  return buildPageFromAssignment(state, condition, resolveAssignment(state.slug, condition.slug));
}

export function buildPageFromAssignment(
  state: StateData,
  condition: StateConditionSummary,
  assign: VariantAssignment,
): GeneratedPage {
  const profile = STATE_PROFILES[state.slug];
  const bank = CONDITION_BANKS[condition.slug];
  if (!profile) throw new Error(`Missing state profile for ${state.slug}`);
  if (!bank) throw new Error(`Missing condition bank for ${condition.slug}`);

  const pairKey = `${state.slug}|${condition.slug}`;
  const condLower = CONDITION_LOWER[condition.slug] ?? condition.name;
  const cities = listCities(state.majorCities);
  const ctx: PageContext = {
    state: state.name,
    abbr: state.abbr,
    capital: state.capital,
    cities,
    cond: condition.name,
    condLower,
    timezone: profile.timezoneNote,
  };

  const siblings = STATE_CONDITIONS.filter((c) => c.slug !== condition.slug);

  const titlePatterns = [
    `${condition.name} Doctor in ${state.name}? Telehealth Functional Medicine | Dr. Autoimmune`,
    `Functional Medicine for ${condition.name} in ${state.name} | Telehealth | Dr. Autoimmune`,
    `Telehealth Autoimmune Specialist for ${condition.name} — ${state.name} | Dr. Autoimmune`,
  ];
  const title = pick(titlePatterns, `title|${pairKey}`);

  const metaCandidates = [
    `${condition.name} help for ${state.name} patients: telehealth functional medicine from Boulder, CO. Labs near ${state.majorCities[0]}. Ask about availability.`,
    `Living in ${state.name} with ${condLower}? Video visits with a Boulder, Colorado practice. Book a discovery call to confirm availability in ${state.abbr}.`,
    `From ${state.majorCities[0]} to ${state.majorCities[2]}: ${condLower} telehealth care led from Boulder, CO. Call (303) 882-8447 to confirm you can be seen.`,
    `${state.name} ${condLower} support by video. A Boulder, Colorado practice with national lab coordination. Discovery call to confirm ${state.abbr} availability.`,
  ];
  const metaDescription = fitMetaDescription(metaCandidates, hashString(`meta|${pairKey}`) % metaCandidates.length);

  const h1Patterns = [
    `${condition.name} Help in ${state.name}: A Telehealth Plan Built Around You`,
    `Living With ${condition.name} in ${state.name}? Start With a Video Visit`,
    `${state.name} ${condition.name} Care From Boulder, Without the Travel`,
    `A Closer Look at ${condition.name} for ${state.name} Patients`,
    `Telehealth Functional Medicine for ${condition.name} Across ${state.name}`,
    `More Time, More Detail: ${condition.name} Care for ${state.name}`,
  ];
  const h1 = pick(h1Patterns, `h1|${pairKey}`);

  const heroSubhead = pick(
    [
      `Video visits from Boulder, Colorado for ${condLower}, with lab coordination near ${state.majorCities[0]} and the rest of ${state.name}.`,
      `A long, detailed conversation about ${condLower}, available by secure video to people throughout ${state.name} once the office confirms availability.`,
      `Telehealth care for ${condLower} led from Boulder, Colorado, with scheduling that accounts for ${state.name}'s time zone.`,
    ],
    `sub|${pairKey}`,
  );

  const slot = (name: SlotName) => assign.slots[SLOT_NAMES.indexOf(name)];
  const heading = (key: SectionKey) => SECTION_HEADINGS[key][assign.heads[SECTION_KEYS.indexOf(key)]](ctx);
  const leadIn = (name: ListName) => LIST_LEADS[name][assign.heads[SECTION_KEYS.indexOf("understand")] % HEADING_VARIANTS];
  const listItems = (name: ListName) =>
    assign.lists[LIST_NAMES.indexOf(name)].map((i) => CONDITION_LISTS[condition.slug][name][i]);

  const lede = CONDITION_LEDES[condition.slug][slot("lede")];
  const intro = [
    INTRO_OPENERS[slot("opener")](ctx),
    `${lede} ${profile.geographyNote}`,
    INTRO_CLOSERS[slot("closer")](ctx),
  ];

  const climateParagraphs = getClimateOverlayParagraphs(
    profile.climateBand,
    condition.slug,
    assign.climate[0],
    assign.climate[1],
  );

  const sections: AreaSection[] = [
    { heading: heading("understand"), paragraphs: [bank.mechanisms[slot("mech")]] },
    {
      heading: heading("symptoms"),
      paragraphs: [bank.symptomsNarrative[slot("symp")], leadIn("notice")],
      bullets: listItems("notice"),
    },
    {
      heading: heading("testing"),
      paragraphs: [bank.testing[slot("test")], leadIn("markers")],
      bullets: listItems("markers"),
    },
    {
      heading: heading("telehealth"),
      paragraphs: [
        TELEHEALTH_WORKFLOWS[slot("tele")](ctx),
        `${state.name} is on ${profile.timezoneNote}. ${profile.intakeNote}`,
        `${LAB_WORKFLOWS[slot("lab")](ctx)} ${profile.labNote}`,
      ],
    },
    {
      heading: heading("regional"),
      paragraphs: [
        climateParagraphs[0],
        `${climateParagraphs[1]} ${climateParagraphs[2]}`,
        REGIONAL_CLOSERS[slot("reg")](ctx),
      ],
    },
    {
      heading: heading("nutrition"),
      paragraphs: [bank.nutritionTriggers[slot("nutr")], leadIn("habits")],
      bullets: listItems("habits"),
    },
    { heading: heading("functional"), paragraphs: [bank.functionalApproach[slot("func")]] },
    {
      heading: heading("expect"),
      paragraphs: [bank.whatToExpect[slot("expect")], leadIn("questions")],
      bullets: listItems("questions"),
    },
    {
      heading: heading("related"),
      paragraphs: [RELATED_CARE_PARAGRAPHS[slot("rel")]({ ...ctx, siblingCount: siblings.length })],
      links: [
        { label: `${condition.name} Guide`, href: `/${condition.slug}/` },
        ...siblings.map((c) => ({
          label: `${c.name} in ${state.name}`,
          href: `/areas-we-serve/${state.slug}/${c.slug}/`,
        })),
        { label: "Areas We Serve", href: "/areas-we-serve/" },
        { label: "Book a Discovery Call", href: "/discovery-call/" },
      ],
    },
  ];

  const availabilityFaq: AreaFaq = {
    question: AVAILABILITY_QUESTIONS[slot("avq")](ctx),
    answer: [AVAILABILITY_ANSWERS[slot("ava")](ctx)],
  };
  const bankFaqs: AreaFaq[] = assign.faqs.map((i) => bank.faqs[i]).map((t) => ({
    question: t.question(state.name),
    answer: [t.answer(state.name)],
  }));
  const availabilityPosition = hashString(`avp|${pairKey}`) % (bankFaqs.length + 1);
  const faqs = [...bankFaqs];
  faqs.splice(availabilityPosition, 0, availabilityFaq);

  return {
    title,
    metaDescription,
    h1,
    accent: `${state.name} · ${condition.name}`,
    heroSubhead,
    intro,
    sections,
    faqs,
    datePublished: DATE_PUBLISHED,
  };
}

export function pagePlainText(page: GeneratedPage): string {
  const parts: string[] = [...page.intro];
  for (const section of page.sections) {
    parts.push(section.heading, ...section.paragraphs, ...(section.bullets ?? []));
  }
  for (const faq of page.faqs) {
    parts.push(faq.question, ...faq.answer);
  }
  return parts.join("\n\n");
}
