import type { AreaFaq, AreaSection } from "./areas-data";

interface LocationPage {
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

const CONDITIONS = [
  { label: "Hashimoto's thyroiditis", href: "/hashimotos-thyroiditis-graves/" },
  { label: "Thyroid conditions", href: "/thyroid-conditions/" },
  { label: "Lupus", href: "/lupus/" },
  { label: "Celiac disease", href: "/celiac-disease-and-gluten-intolerance/" },
  { label: "Sjögren's syndrome", href: "/sjogrens-syndrome/" },
  { label: "Rheumatoid arthritis", href: "/rheumatoid-arthritis/" },
  { label: "Inflammatory bowel disease", href: "/inflammatory-bowel-disease/" },
  { label: "Multiple sclerosis", href: "/multiple-sclerosis/" },
];

export const COLORADO_PAGE: LocationPage = {
  title: "Colorado Telehealth Functional Medicine | Dr. Autoimmune",
  metaDescription:
    "Boulder-based telehealth functional medicine for Colorado patients, including Denver and the Front Range. See how visits, labs, and referrals work.",
  h1: "Telehealth Functional Medicine for Colorado Patients",
  accent: "Colorado Patients",
  heroSubhead:
    "The practice is in Boulder. Visits are by video, so patients along the Front Range and elsewhere in Colorado do not need to drive in for a history and lab review.",
  intro: [
    "Dr. Autoimmune is based in Boulder, Colorado. Dr. Ian Hollaman, DC, MSc, FMCP, is a board-certified chiropractic physician in Colorado, a certified functional medicine practitioner through the Institute of Functional Medicine, and holds a master's in nutrition and functional medicine. The clinical work patients book here is telehealth: history, lab review, and follow-up by secure video.",
    "Colorado patients usually find the practice from Boulder, Denver, or another Front Range town. Denver is about a 30-minute drive from Boulder in ordinary traffic. Longmont is closer, Fort Collins is farther north, and Colorado Springs is a longer drive south. Those drive times are why the visit was built to be remote. Living in the mountains or on the Western Slope does not require a trip to Boulder for the conversation and the lab plan. Hands-on exams, imaging, and procedures still happen locally when they are needed.",
    "This page is about how care works for people who live in Colorado. It is not a claim that a video visit replaces a rheumatologist, gastroenterologist, or emergency department. Availability for any given patient should be confirmed with the office before you book, at (303) 882-8447 or through the discovery call.",
  ],
  sections: [
    {
      heading: "What Colorado patients can expect from the first visits",
      paragraphs: [
        "The first clinical conversation is a long history, not a seven-minute symptom list. You will be asked what has already been diagnosed, which specialists you see, which medicines and supplements you take, and what changed before the symptoms got worse. Prior lab PDFs matter more than a retelling of the numbers. ANA titers, thyroid panels, celiac serology, iron studies, and inflammatory markers are read in the form the lab reported them, including the reference range.",
        "After that history, lab work is ordered to a draw site near where you live. People in Denver, Aurora, Lakewood, Boulder, and Fort Collins generally have several commercial lab locations. People in smaller mountain towns may have fewer options and a longer drive to a draw. The plan should name the draw site before you leave the video visit so the order is not an abstract idea. Results are reviewed on a follow-up video visit, with a written sense of what is reassuring, what is incomplete, and what belongs with a specialist.",
        "Follow-up is where most of the work happens. A single visit can list possibilities. It cannot show whether a nutrition change, a sleep schedule, or a specialist referral changed anything. Colorado patients stay on video for those reviews. If a joint needs to be examined, a rash needs to be seen in person, or an endoscopy is the next question, that appointment is with a local clinician, not with a camera.",
      ],
    },
    {
      heading: "Front Range, Denver, and the rest of the state",
      paragraphs: [
        "A large share of patients live along the Front Range: Boulder, Denver, Longmont, Louisville, Lafayette, Broomfield, Westminster, Arvada, Aurora, Fort Collins, and Colorado Springs. Denver is the city with its own page because that is where search demand showed up. The other towns are real places patients drive from, and they do not each need a separate copy of this explanation. If you live in one of them, you are reading the right page.",
        "Outside the Front Range the logistics change and the medicine does not. A patient in Grand Junction or Durango still needs a lab that will draw the order, a pharmacy that will fill a prescription written within the clinician's scope, and a local emergency plan. Weather closes roads. A telehealth visit is the part that does not depend on I-70. It is not a reason to delay urgent symptoms because you cannot get to Boulder.",
        "Boulder itself is covered on the about page, which already ranks for local brand searches. This Colorado page is the statewide explanation. The Denver page is the city-specific one. Using three different URLs to say the same sentence with a different town name was the pattern the site stopped publishing.",
      ],
    },
    {
      heading: "Conditions the practice discusses most often",
      paragraphs: [
        "The longer explanations live on the condition pages, not on a grid of Colorado-plus-diagnosis URLs. Those combination pages still exist for anyone who has an old link, and they are marked noindex because they repeated the same article fifty times. Use the pages below when you want the actual condition overview.",
      ],
      links: CONDITIONS,
    },
    {
      heading: "What this practice will not tell a Colorado patient",
      paragraphs: [
        "We will not say that every autoimmune disease starts in the gut. Intestinal symptoms and barrier function are relevant for some people and irrelevant for others. We will not promise that a video visit cures Hashimoto's, lupus, or inflammatory bowel disease. We will not ask you to stop a rheumatologist's prescription because a supplement plan sounds more natural.",
        "We also will not invent a Colorado-specific disease rate to make this page sound local. Altitude, dry air, and long sunny days are real features of living here. They are not a personalized risk score. If sun exposure matters for your lupus, or if winter darkness matters for your energy, that belongs in your history, not in a statewide slogan.",
        "Licensure is stated only as far as the site already documents it: Dr. Hollaman is a board-certified chiropractic physician in Colorado. Do not read this page as a list of other state licenses. If you are sitting in Colorado and want to know whether the team can see you, ask the office. That answer is a scheduling fact, not a paragraph that can be copied for every state.",
        "Bring a timeline that starts with the first symptom you still have, not with the most recent bad week. Include surgeries, pregnancies, antibiotic courses, and the month a specialist gave you a name for the problem. Colorado patients often have records split across a Boulder primary clinician, a Denver specialist, and a hospital portal that does not talk to either. Download the PDFs before the visit. A screen share of a portal that logs you out is a poor use of the hour.",
        "Ask what will be different after two follow-ups. A serious answer names a lab, a symptom score you can repeat, or a referral with a question attached. An answer that only extends the supplement list is a reason to pause. The discovery call is the right place to ask that before you schedule the full evaluation. The office number is (303) 882-8447.",
        "Winter travel on the Front Range is its own reason to keep follow-up on video. Storms close the Boulder Turnpike and mountain passes, and a patient who feels well enough to talk may not feel well enough to drive. Use the video visit for the conversation. Use a local draw site for blood. If the draw site is closed for weather, say so and reschedule the lab, not the interpretation. The interpretation can happen as soon as the results exist, from wherever you are in the state.",
        "Children and teenagers with suspected autoimmune disease need pediatric specialists. This page describes adult-oriented functional medicine history and lab review. It is not a pediatric rheumatology service. If you are calling about a child, ask the office whether the team sees that age group before you assemble records. Do not use an adult telehealth article as a care plan for a child. Adults caring for their own health can use the condition links above to prepare questions, then bring the mismatch between those general pages and their Colorado records to the visit. The page is background. The chart is the decision. If you are comparing this practice with a Denver clinic, ask who reads the labs, who you call if you worsen, and which problems are referred out. Those answers are the visit. A page that only swaps the city name is not.",
      ],
    },
  ],
  faqs: [
    {
      question: "Do I need to drive to Boulder for follow-up?",
      answer: [
        "No. History, lab review, and follow-up visits are by video. You may still need to drive to a local lab, imaging center, or specialist. Those trips are to the facility that can do the thing a camera cannot.",
      ],
    },
    {
      question: "I live in Fort Collins, Colorado Springs, or a mountain town. Is there a separate page?",
      answer: [
        "No. Those URLs redirect here or to the Denver page so the site is not a stack of identical town pages. Your visit is the same telehealth process, with labs arranged near you. Denver has its own page because that is the city people were actually searching.",
      ],
    },
    {
      question: "Can you replace my Denver rheumatologist?",
      answer: [
        "No. Rheumatology, gastroenterology, endocrinology, and emergency care stay with the clinicians who examine you and prescribe disease-specific treatment. This practice is an additional functional medicine evaluation, coordinated with those clinicians when you want both.",
      ],
    },
  ],
  datePublished: "2026-09-30",
};

export const DENVER_PAGE: LocationPage = {
  title: "Functional Medicine for Denver Patients | Dr. Autoimmune",
  metaDescription:
    "Telehealth functional medicine for Denver patients from a Boulder practice about 30 minutes away. How labs, referrals, and video visits work in the metro area.",
  h1: "Functional Medicine Care for Denver Patients",
  accent: "Denver Patients",
  heroSubhead:
    "Boulder is about 30 minutes from Denver in ordinary traffic. The visits are by video, so the drive is not part of getting a history and a lab plan.",
  intro: [
    "Denver patients looking for an autoimmune or functional medicine clinician are usually comparing a local specialist with a longer, root-cause visit. Dr. Autoimmune is based in Boulder, about 30 minutes from central Denver, and the appointments patients book are telehealth. You do not come to Boulder to sit in a waiting room for the history, the lab review, or the follow-up.",
    "Dr. Ian Hollaman, DC, MSc, FMCP, is a board-certified chiropractic physician in Colorado and a certified functional medicine practitioner through the Institute of Functional Medicine. Denver is the city page because this is the metro area where people were searching and the site did not have a real answer. It is not one of fifty cloned state pages.",
    "Call (303) 882-8447 or book a discovery call to confirm the team can see you. A page cannot know your insurance, your diagnoses, or whether a video visit is the right next step. A person at the practice can.",
  ],
  sections: [
    {
      heading: "How a Denver visit actually runs",
      paragraphs: [
        "You meet by secure video. The first visit covers diagnoses you already have, specialists you already see in Denver, medicines, supplements, and the sequence of symptoms. Bring files, not summaries. A Denver rheumatology note, a thyroid ultrasound report, and an ANA report with the titer and pattern are more useful than a screenshot that only says positive.",
        "Labs are drawn in the metro area, not in our office. People in central Denver, Aurora, Lakewood, Arvada, Westminster, and the southeast suburbs generally have a commercial draw site within a short drive. The order should name where you will go. Results come back to the clinician and are reviewed on a second video visit. That review is where you hear what the numbers change and what they do not.",
        "Some questions cannot be finished on video. A swollen joint needs hands. A colonoscopy, a skin biopsy, and an urgent abdominal exam need local facilities. Denver has those facilities. The functional medicine visit should tell you when to use them instead of pretending a camera is an exam room.",
      ],
    },
    {
      heading: "Denver specialists and this practice",
      paragraphs: [
        "Many Denver patients already have a rheumatologist, endocrinologist, or gastroenterologist and still feel unwell. That is the situation this visit is built for: a stable or unclear specialty plan, plus fatigue, gut symptoms, poor sleep, or labs nobody has explained in plain language. The visit does not fire your specialist. You should tell both sides what the other recommended.",
        "If you do not yet have a specialist and the story is inflammatory arthritis, lupus features, bleeding bowel symptoms, or jaundice, the first appointment in Denver should be the specialist who can examine that problem. Use this practice alongside that referral, not as a way to avoid it. Boulder being nearby does not make a video visit a rheumatology exam.",
        "Boulder patients who searched the brand already land on the homepage and the about page. If you live in Boulder, start there. If you live in Denver and want the metro logistics, you are in the right place. Fort Collins, Colorado Springs, and the other Front Range cities redirect either here or to the Colorado page so we are not maintaining ten versions of this paragraph.",
      ],
    },
    {
      heading: "Condition guides, without a fake Denver edition",
      paragraphs: [
        "Disease overviews do not get more accurate by inserting the word Denver. These are the condition pages. Read the one that matches the question you actually have, then bring the mismatch between that page and your labs to the visit.",
      ],
      links: CONDITIONS,
    },
    {
      heading: "Limits we will say out loud",
      paragraphs: [
        "We do not claim a Denver-specific autoimmune rate, and we do not claim the Front Range climate is your diagnosis. Dry air and strong sun are part of living here. They belong in a lupus or skin history if they change your symptoms. They are not a statistic we made up for a landing page.",
        "We do not say every autoimmune disease starts in the gut. We do not promise symptom reversal on a timeline. Supplements discussed on a visit are specific to your labs and history, and they are not a substitute for disease-modifying treatment your Denver specialist has prescribed.",
        "Scope stays inside what the clinician is licensed and trained to do. Dr. Hollaman's Colorado chiropractic licensure and functional medicine training are public facts on the about page. This page does not add hospital privileges, a Denver storefront, or a claim that we are your emergency coverage. If you cannot reach us and you have chest pain, trouble breathing, black stools, or rapidly worsening neurologic symptoms, use emergency services in Denver.",
        "Denver traffic is the practical reason the visit is remote. A 30-minute drive from central Denver to Boulder becomes much longer at rush hour on US-36, and it is a poor use of a sick day if the appointment is a conversation and a lab order. Schedule the video visit from home or work. Schedule the blood draw near the neighborhood you are already in, whether that is Capitol Hill, the Highlands, Aurora, Lakewood, or the Tech Center. Tell the clinician which draw site is actually convenient. An order sent to a location you will not visit is an order that will not get done.",
        "If you already see a specialist at a Denver hospital, ask them for the last clinic note and the last lab set before you book with us. We would rather read that note than repeat the same antibody panel. If they are uncomfortable with a functional medicine consult, that is a conversation to have with them, not a reason to hide the visit. Coordination fails in secret. It works when both charts mention each other.",
        "Use the Colorado page if your question is about the rest of the state, including mountain towns and the Western Slope. Use this page if you live in the Denver metro and want the logistics of video care from a Boulder practice. Use the about page if you are looking for Dr. Hollaman's training in more detail. Three pages cover what fifty cloned pages were pretending to cover.",
        "Parking and clinic buildings downtown are irrelevant to this appointment, which is the point. Block the video time the way you would block a specialist visit: a quiet room, the medication bottles in front of you, and the lab files downloaded. If a Denver employer needs a note about medical appointments, ask the office what documentation they can provide after you are an established patient. Do not assume a telehealth visit is invisible to the rest of your care team. It should be in the packet you hand the next specialist.",
        "People searching for an autoimmune doctor in Denver are often trying to find someone who will look past a single normal TSH or a low-titer ANA. Bring those exact reports. The visit can explain what the number does and does not mean, and it can tell you whether a Denver rheumatologist, endocrinologist, or gastroenterologist is the missing exam. That answer is more useful than a page that only repeats the city name. If the report is from a hospital portal, download the PDF that includes the reference range and the performing lab. A cropped phone image drops the line a clinician needs. If you have two conflicting ANA results from two Denver labs, bring both and the dates. Different methods are a common reason the numbers do not match, and that is a solvable question rather than evidence that nobody knows what they are doing. Write down which lab drew each sample and whether you were ill that week. A low titer during a viral illness, followed by a negative repeat, is a different story from a high titer with joint swelling. The Denver visit is for sorting that story and deciding whether you also need a local exam. Bring both reports even if one of them looks less alarming.",
      ],
    },
  ],
  faqs: [
    {
      question: "Is there an office in Denver I should drive to?",
      answer: [
        "No. The practice is based in Boulder and the visits are by video. You will still travel inside Denver for blood draws, imaging, or a specialist exam when those are part of the plan.",
      ],
    },
    {
      question: "How far is Boulder from Denver?",
      answer: [
        "About 30 minutes from central Denver to Boulder in ordinary traffic, longer at rush hour. The telehealth visit exists so that drive is not required for the history and the lab review.",
      ],
    },
    {
      question: "Do you take the place of a rheumatologist at National Jewish or another Denver clinic?",
      answer: [
        "No. Keep the specialist who manages disease-specific medication. This visit is a functional medicine evaluation that should be coordinated with that care, not swapped for it.",
      ],
    },
  ],
  datePublished: "2026-09-30",
};

export const HUB_SECTIONS: AreaSection[] = [
  {
    heading: "Where the practice actually is",
    paragraphs: [
      "Dr. Autoimmune is a Boulder, Colorado practice. Dr. Ian Hollaman, DC, MSc, FMCP, is a board-certified chiropractic physician in Colorado, certified in functional medicine through the Institute of Functional Medicine, with a master's in nutrition and functional medicine. Patients meet by video. The phone number on the site is (303) 882-8447. Those are the facts a location page is allowed to repeat, because they do not change when the reader's town changes.",
      "Colorado has a full page because that is the state where the practice is based and where patients along the Front Range actually live. Denver has its own page because that metro area was the location search with real demand. The other forty-nine state URLs redirect here. The other Front Range city URLs redirect to Denver or Colorado. If you followed an old link for Texas, Wyoming, or Fort Collins, you were sent to a page that has something to say instead of a copy of this one with the name swapped.",
    ],
  },
  {
    heading: "What a telehealth evaluation includes",
    paragraphs: [
      "The first visit is a history: diagnoses, specialists, medications, supplements, surgeries, pregnancies, infections, sleep, and the order in which symptoms showed up. Lab PDFs are part of the history. A portal adjective such as high or normal is not. The clinician should be able to point at a value and say whether it answers the question you came with.",
      "Orders go to a draw site near you. Results are reviewed on a follow-up video visit. Recommendations may include nutrition changes, a supplement tied to a lab, a referral, or reassurance that a frightening antibody does not mean a disease. You should leave with a written sense of what happens next and what symptom should make you call sooner.",
      "Video does not include a hands-on joint exam, a skin biopsy, an endoscopy, or emergency care. If those are the next step, the plan should name the local clinician or the emergency department, not another supplement. People outside Colorado should confirm with the office that the team can see them before they book. This page does not publish a state-by-state license list, because the practice has not provided one to put on the site.",
    ],
  },
  {
    heading: "Conditions, on the pages that actually explain them",
    paragraphs: [
      "Read the condition page that matches your question. A state-by-condition URL is noindexed on purpose. It was the same short article with a state name inserted, and it did not help patients or search engines.",
    ],
    links: CONDITIONS,
  },
  {
    heading: "How to decide if this is the right next appointment",
    paragraphs: [
      "Book a discovery call if you want to know whether a functional medicine history would add something your current specialists are not covering. Do not book it as a substitute for emergency care, and do not book it as a way to avoid a rheumatologist when your joints are swollen, a gastroenterologist when you are bleeding, or a hepatologist when you are jaundiced.",
      "Bring the records either way. The useful first month is a timeline plus the labs you already paid for, shared with every clinician on the team. Hidden supplements and hidden prescriptions are how two reasonable plans collide. If we are not the right fit, the call should say so. A location page that promises every state the same outcome is the page this hub used to be. It is not the page you are reading now.",
      "People outside Colorado often ask whether a Boulder practice can see them by video. The honest answer is to ask the office, because licensure and scheduling change and this website does not keep a fifty-state license table. What does not change is the shape of the visit: a long history, labs drawn near you, a follow-up to interpret them, and a referral when the problem needs hands-on care. What also does not change is the emergency rule. Chest pain, trouble breathing, black stools, new weakness, or confusion are not video-visit problems in any state.",
      "If you landed here from an old state link, you did not lose a local office. There was never a Texas clinic or a Wyoming clinic behind those URLs. There was a template. The Colorado page describes the state where the practice sits. The Denver page describes the metro area patients were searching. Condition questions belong on the condition pages linked above. That is the whole map.",
      "A discovery call is a fit check, not a diagnosis. Bring the question you want answered and the record that prompted it. If the next step is a specialist you do not have yet, we would rather say that on the call than after you have paid for a plan that cannot examine a joint or scope a bowel. The phone number is (303) 882-8447. The booking link is the discovery call used across the rest of the site.",
      "Old URLs for individual states now redirect to this hub in one step. Old URLs for Longmont, Fort Collins, Louisville, Lafayette, Broomfield, Westminster, Arvada, Aurora, and Colorado Springs redirect to the Denver page. Nothing on those addresses was a different clinic. Keeping them as separate articles would have left the site with hundreds of near-copies, which is the pattern this cleanup removed. If a bookmark lands you here, use the Colorado or Denver link in the sections above, or go straight to the condition page that matches your question.",
      "Records that make the first month faster are a medication list with doses, the last specialty note, and labs from the past year as PDFs. Screenshots of a phone portal crop the reference range. If you have imaging, the report is more useful than the disc, unless a clinician has asked for the images. Send what you have before the visit when the office gives you a way to do that. Walking through a login on the call wastes the time you booked.",
      "Functional medicine here means a longer look at contributors such as sleep, nutrition, medications, and overlapping symptoms. It does not mean a guarantee, a detox package, or a claim that one mechanism explains every autoimmune disease. If a sentence on another page of the internet sounds more certain than this one, compare it with your actual labs before you reorganize your treatment. Certainty that is not tied to your chart is advertising. When you are ready, start with the discovery call, keep your existing specialists in the loop, and use the Colorado and Denver pages for logistics rather than for a diagnosis. Diagnosis belongs in a visit, with your records open. If you are outside Colorado, say which state you are calling from so the team can tell you whether they can see you. A redirected state URL is not a license. It only means the thin page is gone. Start with Colorado if you want the statewide logistics, Denver if you live in that metro area, and the condition pages if you want the disease overview. The discovery call is where those pages turn into a plan for your own labs. Put the medication list, the last specialty note, and a year of labs in one folder before you call. Include the titer and pattern if you have an ANA report, and the laboratory name on each page. Two results from two labs are not a trend until someone checks the method. You should leave the visit able to name what was reassuring, what is still unknown, and who else needs to see you.",
    ],
  },
];
