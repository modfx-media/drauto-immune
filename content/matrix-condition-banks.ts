/**
 * Paragraph banks, FAQ templates, and climate overlays for the state × condition matrix pages.
 *
 * Everything here is qualitative. No prevalence figures, prices, hours, reviews, staff names,
 * clinic names, or licensing claims. Availability is always framed as "ask the office".
 */

import type { ClimateBand } from "./state-profiles";
import type { ClimateLens, ConditionBank, FaqTemplate } from "./matrix-banks/types";
import { HASHIMOTOS_BANK } from "./matrix-banks/hashimotos";
import { THYROID_BANK } from "./matrix-banks/thyroid";
import { LUPUS_BANK } from "./matrix-banks/lupus";
import { CELIAC_BANK } from "./matrix-banks/celiac";
import { SJOGRENS_BANK } from "./matrix-banks/sjogrens";
import { RHEUMATOID_BANK } from "./matrix-banks/rheumatoid";
import { IBD_BANK } from "./matrix-banks/ibd";
import { RAYNAUDS_BANK } from "./matrix-banks/raynauds";

export type { ClimateLens, ConditionBank, FaqTemplate };

export const CONDITION_BANKS: Record<string, ConditionBank> = {
  "hashimotos-thyroiditis-graves": HASHIMOTOS_BANK,
  "thyroid-conditions": THYROID_BANK,
  lupus: LUPUS_BANK,
  "celiac-disease-and-gluten-intolerance": CELIAC_BANK,
  "sjogrens-syndrome": SJOGRENS_BANK,
  "rheumatoid-arthritis": RHEUMATOID_BANK,
  "inflammatory-bowel-disease": IBD_BANK,
  "raynauds-phenomenon": RAYNAUDS_BANK,
};

export type PageContext = {
  state: string;
  abbr: string;
  capital: string;
  cities: string;
  cond: string;
  condLower: string;
  timezone: string;
};

export const CLIMATE_OVERLAYS: Record<ClimateBand, { intros: string[]; lensPool: ClimateLens[] }> = {
  "cold-north": {
    intros: [
      "Winters in the northern tier are long and cold, and daylight shrinks sharply around midwinter, so many people spend months bundled up and indoors. That backdrop touches several parts of autoimmune care, though nothing here says how common any condition is where you live.",
      "In the far north of the lower forty-eight, snow cover and short days can linger for months, and many daily plans revolve around bundling up, driving carefully, and staying indoors. Conditions like these color routines more than any statistic could, and they raise a few specific talking points in autoimmune care.",
      "People in cold-winter states often describe a rhythm of dark mornings, early sunsets, and heated indoor air, followed by a bright and busy summer. That rhythm influences sleep, activity, and mood, and it gives patients and clinicians seasonal patterns to track without implying anything about local disease rates.",
    ],
    lensPool: ["cold", "winterLight", "swing"],
  },
  "humid-south": {
    intros: [
      "Summers across the humid South are hot and sticky, with long stretches where air conditioning is a way of life and winters are comparatively mild. Seasonal heat shapes sleep, hydration, and activity, which are all relevant to how a chronic condition feels day to day.",
      "The Deep South and nearby states live through warm, damp weather for much of the year, with afternoon heat that shapes when people exercise, eat, and rest. Mild winters mean fewer days of deep cold, but humidity and indoor cooling create seasonal habits worth considering in autoimmune care.",
      "Humidity defines daily life in much of the South, where long growing seasons, warm evenings, and frequent sun go together with a culture of indoor cooling. Those patterns can affect hydration, sleep, and energy, which are worth noting for anyone managing a chronic condition.",
    ],
    lensPool: ["humid", "sun", "swing"],
  },
  "arid-southwest": {
    intros: [
      "Sunny, dry-leaning country defines much of this region, with strong light for much of the year and low humidity indoors and out. Those conditions bring their own questions about skin, eyes, hydration, and sun exposure for people with immune-related conditions.",
      "Open sky, strong light, and low humidity are hallmarks of desert and sun-belt living, along with sizable temperature drops after dark in many places. Those conditions shape outdoor habits, skin care, and hydration, all of which intersect with immune-related conditions.",
      "Dry-leaning air and abundant sunshine are the backdrop across much of the Southwest and sunnier parts of the West Coast. People there often adapt with shade, hydration, and early or late outdoor hours, and those adaptations matter in autoimmune care too.",
    ],
    lensPool: ["sun", "dry", "swing"],
  },
  "pacific-nw": {
    intros: [
      "The Pacific Northwest is known for gray, drizzly winters and long cloudy spells on the wet side of the mountains, followed by bright but mild summers. Months with little direct sun invite a careful conversation about vitamin D and mood.",
      "West of the Cascades, overcast skies and mild, drizzly weather can stretch across many winter weeks, while east of the mountains the air turns drier and sunnier. Either way, seasonal light is a theme, and so are habits for staying active when the weather is dreary.",
      "Evergreen forests, rain on the coast, and mist in the valleys go together with long, soft-lit winters in the Pacific Northwest. Many residents become attentive to daylight, mood, and indoor routines, which gives autoimmune care a natural set of seasonal questions.",
    ],
    lensPool: ["winterLight", "humid", "swing"],
  },
  "mountain-west": {
    intros: [
      "Life in the Mountain West means elevation, intense sunshine, dry air, and cold snaps that can arrive quickly, even in towns that feel sunny much of the year. Thin air and strong ultraviolet light add some distinct considerations for people managing a chronic condition.",
      "Elevation shapes everyday life in the interior West: air is thinner, sunlight is stronger, humidity is low, and temperatures can swing widely between day and night. Those features bring specific questions about sleep, hydration, and sun for people with immune-related conditions.",
      "From high plains to mountain valleys, the Mountain West offers abundant sunshine, dry air, and cold winters with snow in many places. Outdoor recreation is part of life, and it is worth thinking through sun, cold, and altitude when a chronic condition is in the picture.",
    ],
    lensPool: ["altitude", "sun", "cold"],
  },
  midwest: {
    intros: [
      "The Midwest has four distinct seasons and big swings between them, with cold winters, warm and often humid summers, and fast changes in spring and fall. Those swings can disrupt sleep, routines, and symptom patterns in ways worth tracking.",
      "Across the Midwest, the seasons arrive with force: snow and bitter cold in winter, thunderstorms and warmth in summer, and quick shifts between them in spring and fall. People often adapt their routines each season, and those adaptations can change how a chronic condition feels.",
      "Prairies, lakes, and farm country in the nation's middle are known for dramatic weather changes, from icy winters to hot, humid summer days. That variety invites a seasonal approach to sleep, movement, and symptom tracking for anyone living with autoimmune concerns.",
    ],
    lensPool: ["swing", "cold", "humid"],
  },
  northeast: {
    intros: [
      "The Northeast moves through all four seasons, with cold, sometimes snowy winters, humid summers, and quick temperature shifts at the edges of the year. Seasonal change affects routines, indoor heating and cooling, and daylight, all of which can color how symptoms feel.",
      "From coastal harbors to inland hills, Northeastern states move through crisp falls, snowy winters, damp springs, and humid summers. Frequent seasonal transitions can disrupt sleep and routines, so patients often benefit from noticing how symptoms track with the calendar.",
      "Brick-and-brownstone cities, small towns, and wooded countryside share a climate of four well-defined seasons, with cold winters and warm, sometimes sticky summers. Heating and cooling indoors, plus changing daylight, offer practical angles for chronic-condition care.",
    ],
    lensPool: ["swing", "winterLight", "cold"],
  },
  "florida-tropics": {
    intros: [
      "Florida's subtropical weather is warm for most of the year, with humid summers, frequent sun, and cooler spells that are usually brief. Heat, sun, and heavy air conditioning use can shape comfort and routines for people living with a chronic condition.",
      "Palm-lined coasts and warm Gulf and Atlantic waters make outdoor living a year-round possibility in Florida. Strong sun, heavy rain showers, and constant air conditioning shape daily habits in ways that matter for people managing immune-related conditions.",
      "Florida's long warm season means sunscreen, hydration, and shade are everyday topics, while cooler snaps are short. Hurricane season adds planning questions for anyone who relies on medication and reliable internet.",
    ],
    lensPool: ["humid", "sun"],
  },
  alaska: {
    intros: [
      "Alaska has extreme seasonal light, with very long summer days and very short winter ones, plus long periods of serious cold in many communities. Those extremes affect sleep, mood, activity, and vitamin D conversations in ways that are specific to life this far north.",
      "Alaskans plan around daylight: near-continuous light in summer, long darkness in winter, and a cold season that lasts far longer than in most states. These extremes touch sleep, activity, and mood, which is why seasonal habits feature in autoimmune care here.",
      "Mountains, glaciers, coastline, and boreal forest define the landscape, while light and temperature extremes define the calendar. Remote communities and long distances add logistics, and seasonal rhythms add questions about sleep, vitamin D, and staying active.",
    ],
    lensPool: ["winterLight", "cold", "swing"],
  },
  hawaii: {
    intros: [
      "Hawaii's tropical climate is warm year-round, with strong sun, trade-wind breezes, and humid air in many places. Constant sun exposure and heat bring particular considerations for people with immune-related conditions, along with a lifestyle that makes outdoor time easy.",
      "Trade winds, warm ocean water, and tropical sunshine shape island routines year-round. Outdoor time is easy to come by, which brings sun protection and hydration into everyday conversation for people with immune-related conditions.",
      "Island living means warm days, frequent rain showers in many places, and strong ultraviolet light much of the year. Planning around sun, heat, and travel between islands or to the mainland is part of managing a chronic condition here.",
    ],
    lensPool: ["sun", "humid"],
  },
};

export const CLIMATE_INTRO_VARIANTS = 3;
export const CLIMATE_COMBO_VARIANTS = 6;

function lensPairs(pool: ClimateLens[]): [ClimateLens, ClimateLens][] {
  const pairs: [ClimateLens, ClimateLens][] = [];
  for (const first of pool) for (const second of pool) if (first !== second) pairs.push([first, second]);
  return pairs;
}

export function getClimateOverlayParagraphs(
  band: ClimateBand,
  conditionSlug: string,
  introVariant = 0,
  comboVariant = 0,
): string[] {
  const overlay = CLIMATE_OVERLAYS[band];
  const bank = CONDITION_BANKS[conditionSlug];
  const pairs = lensPairs(overlay.lensPool);
  const [first, second] = pairs[comboVariant % pairs.length];
  return [
    overlay.intros[introVariant % overlay.intros.length],
    bank.climateLenses[first],
    bank.climateLenses[second],
  ];
}

export const CONDITION_LEDES: Record<string, string[]> = {
  "hashimotos-thyroiditis-graves": [
    "Hashimoto's is an autoimmune condition of the thyroid, and its signs are easy to mistake for ordinary tiredness or aging.",
    "With Hashimoto's, the immune system targets the thyroid gland, which means the story is bigger than a single hormone number.",
    "Autoimmune thyroid disease, including Hashimoto's and Graves', often takes years to put a name to.",
  ],
  "thyroid-conditions": [
    "Thyroid trouble can run slow or fast, and the same symptoms often belong to several different problems.",
    "A thyroid concern can mean an underactive gland, an overactive one, an enlarged one, or a lump, each with its own path.",
    "Many people reach a thyroid evaluation after months of vague symptoms that never quite added up on their own.",
  ],
  lupus: [
    "Lupus is a chronic autoimmune disease that can affect skin, joints, blood, and organs, often with unpredictable flares.",
    "Living with lupus means planning around fatigue, flares, and a long list of appointments with different specialists.",
    "Lupus is known for taking different forms in different people, which makes personal tracking especially valuable.",
  ],
  "celiac-disease-and-gluten-intolerance": [
    "Celiac disease and gluten intolerance are related but different, and sorting out which applies to you shapes everything that follows.",
    "Gluten-related conditions can show up in the gut, the skin, the joints, or simply as fatigue, which complicates the search for answers.",
    "Many people with celiac disease find that going gluten-free is only the first chapter of getting well.",
  ],
  "sjogrens-syndrome": [
    "Sjögren's syndrome goes well beyond dry eyes and dry mouth, and fatigue can be its most limiting feature.",
    "Sjögren's often hides behind symptoms that are blamed on aging, medications, or stress, which is why it is frequently recognized late.",
    "Because Sjögren's can overlap with other autoimmune conditions, a wide view of the immune picture tends to be useful.",
  ],
  "rheumatoid-arthritis": [
    "Rheumatoid arthritis is an autoimmune disease of the joints, and timely rheumatology care is central to protecting them.",
    "Stiff mornings, swollen knuckles, and heavy fatigue are the details people with rheumatoid arthritis tend to describe first.",
    "Rheumatoid arthritis involves more than the joints, which is why sleep, mood, heart health, and bone health belong in the conversation.",
  ],
  "inflammatory-bowel-disease": [
    "Inflammatory bowel disease, which includes Crohn's disease and ulcerative colitis, calls for medical care directed by a gastroenterologist.",
    "Living with IBD means navigating flares, food uncertainty, and nutrient questions on top of regular medical monitoring.",
    "IBD affects far more than digestion, reaching energy, nutrition, mood, and sometimes joints and skin.",
  ],
  "raynauds-phenomenon": [
    "Raynaud's phenomenon is more than cold fingers, and sometimes it is an early clue to a broader autoimmune picture.",
    "Color-changing fingers and toes are the hallmark of Raynaud's, and the pattern of episodes can say a lot.",
    "For some people Raynaud's stands alone, and for others it travels with another autoimmune condition, so evaluation matters.",
  ],
};

export const INTRO_OPENERS: ((c: PageContext) => string)[] = [
  (c) =>
    `Looking for a ${c.condLower} doctor in ${c.state} often means a maze of referrals, short appointments, and results that come back "normal." Dr. Autoimmune is a Boulder, Colorado practice that offers functional medicine visits entirely by video, so people in ${c.cities} and beyond can add a longer, more detailed conversation to the care they already have.`,
  (c) =>
    `If you live in ${c.state} and ${c.condLower} has taken over your calendar, wanting more time with a clinician is completely reasonable. Dr. Autoimmune, based in Boulder, Colorado, holds every visit by secure video, which means the distance between ${c.capital} and the Rocky Mountains does not require a flight or a road trip.`,
  (c) =>
    `Patients in ${c.state} who are working through ${c.condLower} often tell us the same thing: they want someone to look at the whole picture, not only the last lab result. That is the goal of a functional medicine visit with Dr. Autoimmune, a telehealth practice headquartered in Boulder, Colorado.`,
  (c) =>
    `Not everyone in ${c.state} has an autoimmune specialist down the road. A telehealth practice changes that equation for conversation time, if not for hands-on exams. Dr. Autoimmune offers video-based functional medicine from Boulder, Colorado, for people exploring ${c.condLower} from places like ${c.cities}.`,
  (c) =>
    `This page is for people in ${c.state} who are trying to make sense of ${c.condLower} and want a different kind of appointment. Dr. Autoimmune is a Boulder, Colorado practice built around long, detailed video visits, a review of your history and labs, and plans you can actually follow.`,
  (c) =>
    `Chronic conditions rarely fit into a fifteen-minute appointment, and ${c.condLower} is no exception. Residents of ${c.state}, from ${c.cities} to smaller towns, can meet with the Dr. Autoimmune team from Boulder, Colorado, by video, bringing symptoms, records, and questions to a longer conversation.`,
];

export const INTRO_CLOSERS: ((c: PageContext) => string)[] = [
  (c) =>
    `Dr. Ian Hollaman, DC, MSc, FMCP, leads the practice. Care here complements your existing doctors and does not replace them, and it is not a promise of any particular result. Because telehealth rules and scheduling can change, please call (303) 882-8447 or book a discovery call to confirm the practice can see patients in ${c.state}.`,
  (c) =>
    `The first step is a conversation, not a commitment. A discovery call lets you describe what is happening and ask the office directly whether it can see patients in ${c.state}. The practice phone number is (303) 882-8447. Nothing on this page is medical advice or a guarantee of outcome.`,
  (c) =>
    `Before booking, ask the office whether it can see patients where you live. Availability depends on factors this website cannot know, so a call to (303) 882-8447 or a discovery call is the reliable way to confirm ${c.state}. The page below explains what care looks like once that is settled.`,
  (c) =>
    `Care is led by Dr. Ian Hollaman, DC, MSc, FMCP, and it is designed to sit alongside your specialists. No page can tell you whether the practice is available to a patient in ${c.state}, so the office should confirm that for you, by phone at (303) 882-8447 or through a discovery call.`,
];

export const TELEHEALTH_WORKFLOWS: ((c: PageContext) => string)[] = [
  (c) =>
    `For ${c.state} patients, everything happens at a distance. You meet with the team on a secure video call from your own home, car, or office, review your history, go through labs together, and agree on next steps for ${c.condLower}. The office is in Boulder, but you never need to be.`,
  (c) =>
    `A telehealth visit for ${c.condLower} needs little more than a private room, a camera, and a reliable connection. You can be in ${c.capital} or in a town with one stoplight. What matters is that you can speak freely and have your records and medication list nearby.`,
  (c) =>
    `The process is straightforward for people in ${c.state}: a discovery call to confirm fit and availability, a comprehensive new patient evaluation by video, coordinated lab work near you, and follow-up visits to review results and adjust the plan for ${c.condLower}.`,
  (c) =>
    `Video does not change how carefully your history is taken. A visit with a ${c.state} patient follows the same structure as any other: symptoms, timeline, medications, prior testing, and priorities. What it cannot do is replace a hands-on exam, and the team will tell you when you need one locally.`,
  (c) =>
    `Working with a Boulder practice from ${c.state} means your visits are organized around your schedule and your connection, not a waiting room. Many people find that long video visits make it easier to cover ${c.condLower} in depth, with notes and records in front of them.`,
  (c) =>
    `Telehealth is a good fit for conversation-heavy care such as reviewing patterns, labs, nutrition, and lifestyle in ${c.condLower}. It is a poor fit for emergencies and for anything requiring physical examination, and patients in ${c.state} are encouraged to keep local physicians involved for those needs.`,
];

export const LAB_WORKFLOWS: ((c: PageContext) => string)[] = [
  (c) =>
    `Blood work is coordinated through commercial laboratories, including national networks such as LabCorp, that generally operate patient service centers in many communities. The office confirms which draw location is workable in ${c.state} when orders are placed, and results are reviewed together by video.`,
  (c) =>
    `Where a draw is needed, orders are sent to a national commercial lab network and you visit a patient service center near you. Locations and hours belong to the lab, not the practice, so confirm the details with the lab before you go.`,
  (c) =>
    `Our comprehensive testing can include an 83+ marker blood panel, which gives broad context on inflammation, nutrients, metabolism, and immune patterns. Drawing it happens at a lab site close to you in ${c.state}, and the interpretation takes place during a follow-up video visit.`,
  (c) =>
    `Lab testing is not mandatory for every patient, but it is a common part of care. If it is recommended, you are not asked to travel to Boulder. The draw happens locally through a commercial lab network, and fasting or timing instructions come from the office in advance.`,
  (c) =>
    `If you already have recent labs from a ${c.state} clinician, bring them. Existing results can reduce what needs to be repeated, and they give the team a baseline for comparing anything new that is ordered through a national commercial lab.`,
  (c) =>
    `Results are not simply emailed and left unexplained. After a draw through a commercial lab, a follow-up video visit goes through what each marker may suggest for ${c.condLower}, what remains uncertain, and what should be handed back to your own physicians.`,
];

export const RELATED_CARE_PARAGRAPHS: ((c: PageContext & { siblingCount: number }) => string)[] = [
  (c) =>
    `For the full condition guide, read our main ${c.condLower} page. If you are exploring more than one diagnosis, the ${c.state} pages for the other conditions the practice supports are linked below, along with the Areas We Serve overview and the discovery call page.`,
  (c) =>
    `Autoimmune conditions often travel together, so it is common to look at neighboring topics. Below are links to the main ${c.condLower} guide, the ${c.siblingCount} other condition pages for ${c.state}, the nationwide hub, and the page where you can book a discovery call.`,
  (c) =>
    `Where to go next depends on your question. The main guide covers ${c.condLower} in depth. The ${c.state} pages for related conditions cover how care works for those topics. The hub explains how the practice serves different states, and the discovery call page is the direct route to a conversation.`,
  (c) =>
    `If you want more background before booking, start with the full ${c.condLower} guide, or browse related conditions for ${c.state} below. When you are ready, the discovery call page lets you ask about availability, and the hub page explains how the practice works across the country.`,
];

export const REGIONAL_CLOSERS: ((c: PageContext) => string)[] = [
  (c) =>
    `These are broad, qualitative observations about life in ${c.state}, not statements about how often any condition occurs there. Your own symptoms, history, and labs are what guide care.`,
  (c) =>
    `None of this says anything about how common ${c.condLower} is in ${c.state}. It simply offers practical context for planning around climate and season.`,
  (c) =>
    `Treat these as practical prompts rather than medical rules. What matters for you in ${c.state} is your own pattern, which a symptom log and a clinician can help clarify.`,
];

export const AVAILABILITY_QUESTIONS: ((c: PageContext) => string)[] = [
  (c) => `Can Dr. Autoimmune see ${c.condLower} patients who live in ${c.state}?`,
  (c) => `Is the practice available to patients in ${c.state} with ${c.condLower}?`,
  (c) => `How do I find out whether I can book from ${c.state}?`,
];

export const AVAILABILITY_ANSWERS: ((c: PageContext) => string)[] = [
  (c) =>
    `Availability can vary by state and change over time, and this page cannot confirm it for you. Please call the office at (303) 882-8447 or book a discovery call to ask whether the practice can see patients in ${c.state}.`,
  (c) =>
    `The honest answer is to ask. Whether the team can see someone in ${c.state} depends on factors that may change, so contact the office by phone at (303) 882-8447 or through a discovery call before you plan around it.`,
  (c) =>
    `Please confirm with the office. A discovery call is the simplest way to find out whether the practice can currently see patients in ${c.state}, and the phone number is (303) 882-8447. No one should assume availability from a web page.`,
];
