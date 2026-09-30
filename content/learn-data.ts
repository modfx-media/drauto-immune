/**
 * Content model + data for the `/learn/[slug]` educational article series
 * (programmatic SEO Batch 1 — see `data/pseo/pages.json` and the project
 * report for methodology). Every entry here targets a keyword confirmed via
 * GSC (`data/pseo/gsc-analysis.json`) and/or DataForSEO keyword research
 * (`data/pseo/keywords.json`) to have NO existing coverage anywhere on the
 * site — checked against the 13 condition pages, the ~35 migrated blog
 * posts (`lib/blog-posts.ts`), AND the 208 live-but-unmigrated legacy blog
 * posts (`data/pseo/_unmigrated-blog-slugs.json`) — to avoid duplicate/
 * cannibalizing content. See the final pSEO report for the full rationale.
 *
 * Content is original, general patient-education material. It intentionally
 * avoids inventing statistics, clinical studies, or testimonials (YMYL
 * compliance) — only well-established, general medical facts are stated,
 * and every page ends with a medical disclaimer + CTA to book a real
 * evaluation for personalized care.
 */

import { LEARN_ENRICHMENT } from "./learn-enrichment";

export interface LearnFaq {
  question: string;
  answer: string[];
}

export interface LearnSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface LearnCitation {
  name: string;
  url: string;
}

export interface LearnPageData {
  slug: string;
  /** <title> tag text. */
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** Substring of h1 to render in the accent/serif style. */
  accent: string;
  heroSubhead: string;
  intro: string[];
  sections: LearnSection[];
  faqs: LearnFaq[];
  /** Condition page slugs (from content/conditions-data.ts) to cross-link. */
  relatedConditionSlugs: string[];
  /** Public references linked at the bottom of the article. */
  citations: LearnCitation[];
  targetKeyword: string;
  cluster: string;
  datePublished: string;
  dateModified: string;
}

/** Content version date for the September 2026 enrichment pass. */
export const LEARN_DATE_MODIFIED = "2026-09-30";

export const LEARN_AUTHOR = {
  name: "Dr. Ian Hollaman",
  credentials: "DC, MSc, FMCP",
  href: "/about-us/",
  note: "Board-certified chiropractic physician in Colorado, certified functional medicine practitioner through the Institute of Functional Medicine, and holder of a master's in nutrition and functional medicine. This article is general education reviewed for the practice. It is not a diagnosis.",
} as const;

export const MEDICAL_DISCLAIMER =
  "This article is for general educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Lab results and symptoms should always be reviewed with your own physician or qualified healthcare provider, who can evaluate your complete health history.";

const RAW_LEARN_PAGES = [
  {
    slug: "ana-titer-levels-explained",
    title: "ANA Titer Levels Explained: What 1:80, 1:160 & 1:320 Mean",
    metaDescription:
      "What does an ANA titer of 1:80, 1:160, or 1:320 actually mean? Learn how ANA titer levels are read, why a higher number isn't always worse, and next steps.",
    eyebrow: "Lab Results Explained",
    h1: "ANA Titer Levels Explained: What Do 1:80, 1:160, and 1:320 Mean?",
    accent: "ANA Titer Levels",
    heroSubhead:
      "A positive antinuclear antibody (ANA) test is reported as a titer, not just \u201Cpositive\u201D or \u201Cnegative.\u201D Here's how to read that number.",
    intro: [
      "If your antinuclear antibody (ANA) test came back positive, the lab report likely included a ratio like 1:80, 1:160, or 1:320 alongside a staining pattern (such as speckled or homogeneous). That ratio is called the titer, and understanding what it means \u2014 and what it doesn't \u2014 can make a confusing result much easier to sit with while you wait for follow-up care.",
      "This isn't a diagnosis on its own. A positive ANA test tells your provider that your immune system is producing antibodies against components of your own cell nuclei, but it doesn't say which condition (if any) is causing that, or how severe it is.",
    ],
    sections: [
      {
        heading: "How the ANA Titer Number Is Determined",
        paragraphs: [
          "In the lab, your blood sample is diluted step by step \u2014 1:40, 1:80, 1:160, 1:320, and so on \u2014 and examined under a fluorescence microscope at each dilution to see how far it can be diluted before the antibody staining is no longer visible.",
          "A titer of 1:320 means the antibodies were still detectable even after your sample was diluted much more than a sample with a titer of 1:80. In general, a higher titer indicates a greater concentration of antinuclear antibodies in the blood \u2014 but it does not automatically mean a more serious condition or worse symptoms.",
        ],
      },
      {
        heading: "Is a Higher Titer Always More Concerning?",
        paragraphs: [
          "Not necessarily. Titer level is one piece of a much larger picture that includes your symptoms, the specific antibody staining pattern, more detailed antibody panels (such as anti-dsDNA or anti-Smith antibodies), and your overall clinical presentation.",
          "It's also common for healthy people, especially women, to have a low-titer positive ANA (often 1:40 or 1:80) with no underlying autoimmune condition at all. Titers of 1:160 or higher are more often followed up with additional testing, but plenty of people with a 1:320 titer never develop an autoimmune disease, while some people with autoimmune symptoms have a lower titer.",
        ],
        bullets: [
          "1:40 \u2013 1:80: Often considered a low-positive result; can occur in healthy individuals.",
          "1:160: A moderate titer that's more likely to prompt further antibody testing.",
          "1:320 or higher: A higher-positive result that typically warrants a closer clinical review alongside symptoms.",
        ],
      },
      {
        heading: "What Usually Happens After a Positive ANA Titer",
        paragraphs: [
          "Your provider will typically look at your titer together with the staining pattern reported by the lab (homogeneous, speckled, nucleolar, or centromere, among others), order more specific antibody tests if warranted, and review your symptom history \u2014 things like joint pain, fatigue, rashes, or unexplained fevers.",
          "A root-cause functional medicine approach also looks upstream: at gut health, chronic infections, environmental triggers, and inflammation markers that may be contributing to immune dysregulation, rather than looking at the ANA titer in isolation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does a 1:320 ANA titer mean I have lupus?",
        answer: [
          "No. A 1:320 titer means your ANA test is positive at a relatively high dilution, but ANA positivity alone isn't specific to lupus. Many people with a high titer never have any autoimmune diagnosis, while lupus itself is diagnosed using a combination of symptoms, additional antibody tests, and clinical criteria \u2014 not titer level alone.",
        ],
      },
      {
        question: "Can a positive ANA titer go back to normal?",
        answer: [
          "Yes, titers can fluctuate over time and with treatment of an underlying trigger, and some people's ANA reverts to negative. Others remain ANA-positive indefinitely without ever developing symptoms, which is why titer trends are usually interpreted alongside your clinical picture rather than on their own.",
        ],
      },
      {
        question: "What staining patterns are reported with an ANA titer?",
        answer: [
          "Common patterns include homogeneous, speckled, nucleolar, and centromere, each associated with different underlying antibody targets. The pattern is reported alongside the titer and can help guide which follow-up antibody tests your provider orders next.",
        ],
      },
    ],
    relatedConditionSlugs: ["lupus", "sjogrens-syndrome", "rheumatoid-arthritis"],
    targetKeyword: "ana titer 1:80 / 1:160 / 1:320 meaning",
    cluster: "ana-patterns",
    datePublished: "2026-09-29",
  },
  {
    slug: "medications-that-can-cause-a-positive-ana-test",
    title: "Medications That Can Cause a Positive ANA Test | Dr. Autoimmune",
    metaDescription:
      "Certain medications can trigger a positive ANA test or drug-induced lupus. Learn which drugs are most commonly linked and what to do if this affects you.",
    eyebrow: "Lab Results Explained",
    h1: "Medications That Can Cause a Positive ANA Test",
    accent: "Positive ANA Test",
    heroSubhead:
      "Not every positive ANA test points to lupus or another autoimmune disease \u2014 some medications are known to trigger antinuclear antibodies on their own.",
    intro: [
      "A positive ANA test result can be alarming, especially if you don't have symptoms that obviously point to an autoimmune condition. One factor that's easy to overlook: certain prescription medications are well documented to trigger ANA positivity, and in some cases, a reversible condition known as drug-induced lupus.",
      "Recognizing this possibility matters because the management is often very different \u2014 in many cases, symptoms and antibody levels improve once the medication is stopped and evaluated with your prescribing provider, rather than requiring long-term immune-modulating treatment.",
    ],
    sections: [
      {
        heading: "Medications Most Commonly Associated With a Positive ANA",
        paragraphs: [
          "Drug-induced ANA positivity and drug-induced lupus have been documented with a range of medication classes, most notably certain blood pressure medications, anti-seizure medications, and drugs used for irregular heart rhythms and thyroid conditions.",
        ],
        bullets: [
          "Hydralazine (blood pressure medication)",
          "Procainamide (heart rhythm medication)",
          "Certain anti-seizure medications, such as phenytoin",
          "Isoniazid (used for tuberculosis)",
          "Minocycline (an antibiotic sometimes used long-term for acne)",
          "Certain biologic medications, including some TNF-alpha inhibitors",
        ],
      },
      {
        heading: "How Drug-Induced Lupus Differs From Systemic Lupus",
        paragraphs: [
          "Drug-induced lupus tends to cause milder symptoms than systemic lupus erythematosus \u2014 typically joint pain, muscle aches, low-grade fever, and fatigue \u2014 and rarely affects the kidneys or central nervous system the way systemic lupus sometimes can.",
          "Antibody testing can also help distinguish the two: drug-induced lupus is frequently associated with anti-histone antibodies, whereas anti-dsDNA and anti-Smith antibodies are more specific to systemic lupus. Symptoms of drug-induced lupus generally resolve within weeks to months after the triggering medication is stopped, under medical supervision.",
        ],
      },
      {
        heading: "What to Do If You Suspect Your Medication Is the Cause",
        paragraphs: [
          "Never stop a prescribed medication on your own without talking to the prescribing provider first \u2014 some medications on this list treat serious conditions, and abruptly stopping them can be riskier than the ANA finding itself.",
          "Instead, bring your full medication list (including supplements) to your next appointment, mention the positive ANA result, and ask whether any of your medications are known to be associated with ANA positivity or drug-induced lupus. Your provider can help weigh the risks and benefits and order any follow-up testing needed.",
        ],
      },
    ],
    faqs: [
      {
        question: "Will my ANA test go back to normal if I stop the medication?",
        answer: [
          "In many documented cases of drug-induced ANA positivity or drug-induced lupus, antibody levels and symptoms do improve after the triggering medication is discontinued under medical guidance, though this can take weeks to months and should always be monitored by your provider.",
        ],
      },
      {
        question: "Can supplements cause a positive ANA test?",
        answer: [
          "Drug-induced ANA positivity is best documented with prescription medications rather than typical over-the-counter supplements. If you're taking supplements alongside prescription medications, it's still worth listing everything for your provider so nothing is overlooked when interpreting your results.",
        ],
      },
      {
        question: "Should I stop taking my medication if my ANA test is positive?",
        answer: [
          "Not without speaking to your prescribing provider first. Many of the medications associated with ANA positivity treat serious underlying conditions, so any change should be a shared decision based on your full health picture, not made independently.",
        ],
      },
    ],
    relatedConditionSlugs: ["lupus", "rheumatoid-arthritis"],
    targetKeyword: "medications that can cause a positive ana test",
    cluster: "ana-patterns",
    datePublished: "2026-09-29",
  },
  {
    slug: "false-positive-ana-test-causes",
    title: "False Positive ANA Test: Common Causes Explained",
    metaDescription:
      "A positive ANA test doesn't always mean autoimmune disease. Learn the common causes of a false positive ANA result and how providers sort out what's next.",
    eyebrow: "Lab Results Explained",
    h1: "False Positive ANA Test: What Can Cause It?",
    accent: "False Positive ANA",
    heroSubhead:
      "A positive antinuclear antibody test doesn't automatically mean you have an autoimmune disease. Here's what else can cause it.",
    intro: [
      "It's a common (and understandably stressful) experience: an ANA test comes back positive, but there's no clear autoimmune diagnosis to explain it. Before assuming the worst, it helps to know that a meaningful percentage of positive ANA results occur in people without lupus, rheumatoid arthritis, or any other autoimmune condition.",
      "\u201CFalse positive\u201D isn't always the most accurate way to describe these results \u2014 the antibody is genuinely present \u2014 but it may not reflect an active autoimmune disease. Below are the most well-documented reasons a positive ANA can occur without autoimmune disease being the cause.",
    ],
    sections: [
      {
        heading: "Common Non-Autoimmune Causes of a Positive ANA",
        paragraphs: [
          "Several factors are well-documented to cause ANA positivity in the absence of an autoimmune diagnosis:",
        ],
        bullets: [
          "Age \u2014 ANA positivity becomes more common with age, even in otherwise healthy adults.",
          "Being female \u2014 women are more likely than men to have a positive ANA without disease.",
          "Recent or chronic viral infections \u2014 including Epstein-Barr virus, which can transiently trigger ANA positivity.",
          "Certain medications \u2014 see our related article on medications linked to positive ANA results.",
          "A family history of autoimmune disease, even without a diagnosis yourself.",
          "Low-titer results (often 1:40 to 1:80), which are more likely to occur without underlying disease than higher titers.",
        ],
      },
      {
        heading: "Why Titer and Pattern Matter for Interpretation",
        paragraphs: [
          "A low-titer ANA in someone with no symptoms is interpreted very differently than a high-titer ANA in someone with joint pain, unexplained rashes, and fatigue. The staining pattern reported by the lab, along with more specific antibody panels, helps your provider judge how likely the result is to reflect true autoimmune disease versus an incidental finding.",
          "This is why a positive ANA test is rarely acted on in isolation \u2014 it's one data point that's weighed against your full symptom picture and additional labs.",
        ],
      },
      {
        heading: "What a Root-Cause Approach Looks At Next",
        paragraphs: [
          "Rather than treating a positive ANA as an endpoint, a functional medicine evaluation looks upstream at what might be driving immune activation in the first place \u2014 gut health and intestinal permeability, chronic low-grade infections, environmental exposures, nutrient deficiencies, and chronic stress \u2014 alongside conventional antibody testing.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a healthy person have a positive ANA test?",
        answer: [
          "Yes. A meaningful percentage of healthy people, especially women and older adults, test ANA-positive without ever developing an autoimmune disease. This is one reason ANA results are always interpreted together with symptoms and additional testing.",
        ],
      },
      {
        question: "Should I get retested if my ANA is positive but I have no symptoms?",
        answer: [
          "Many providers do recommend periodic monitoring or repeat testing, especially if the titer is moderate to high, so that any emerging symptoms can be caught early. Talk with your provider about a monitoring plan that fits your specific result and history.",
        ],
      },
      {
        question: "Does a viral infection cause a permanent positive ANA?",
        answer: [
          "Not usually. ANA elevations related to a recent viral infection are often temporary and can normalize as the infection resolves, though this should still be confirmed with follow-up testing rather than assumed.",
        ],
      },
    ],
    relatedConditionSlugs: ["lupus", "sjogrens-syndrome"],
    targetKeyword: "false positive ana test causes",
    cluster: "ana-patterns",
    datePublished: "2026-09-29",
  },
  {
    slug: "can-stress-trigger-autoimmune-disease-flares",
    title: "Can Stress Trigger Autoimmune Disease Flares?",
    metaDescription:
      "Many people notice autoimmune symptoms worsen during stressful periods. Learn how stress and the immune system are connected and what may help.",
    eyebrow: "Root-Cause Education",
    h1: "Can Stress Trigger an Autoimmune Disease Flare-Up?",
    accent: "Autoimmune Disease Flare-Up",
    heroSubhead:
      "If your symptoms seem to worsen during stressful periods, you're not imagining it \u2014 here's how stress and immune function are connected.",
    intro: [
      "Many people living with an autoimmune condition notice a pattern: a stressful stretch at work, a major life change, or a period of poor sleep seems to line up with a flare-up of joint pain, fatigue, skin symptoms, or digestive issues. This isn't just a coincidence for most people \u2014 there's a well-established biological relationship between chronic stress and immune regulation.",
      "Understanding this connection isn't about blaming stress for your condition, or being told to \u201Cjust relax.\u201D It's about recognizing one modifiable piece of a much larger picture that also includes gut health, nutrition, sleep, and environmental triggers.",
    ],
    sections: [
      {
        heading: "How Stress and the Immune System Are Connected",
        paragraphs: [
          "Chronic stress activates the hypothalamic-pituitary-adrenal (HPA) axis, leading to sustained changes in cortisol and other stress hormones. In the short term, cortisol is anti-inflammatory, but with prolonged stress, immune cells can become less responsive to cortisol's regulating signal \u2014 a phenomenon sometimes described as cortisol resistance \u2014 which can allow inflammation to persist or increase.",
          "Chronic stress is also linked to changes in gut permeability and the gut microbiome, both of which play a role in immune regulation for people with autoimmune conditions. Sleep disruption, which often accompanies chronic stress, independently affects inflammatory markers as well.",
        ],
      },
      {
        heading: "Signs Stress May Be Contributing to Your Symptoms",
        paragraphs: [
          "While everyone's pattern is different, some common signs that stress may be playing a role include:",
        ],
        bullets: [
          "Symptom flares that reliably follow high-stress periods (deadlines, grief, major life changes)",
          "Sleep disruption alongside worsening joint pain, skin symptoms, or fatigue",
          "Digestive symptoms that intensify during anxious or high-pressure periods",
          "Symptom improvement during vacations or lower-stress stretches",
        ],
      },
      {
        heading: "A Root-Cause Approach to Stress and Autoimmune Symptoms",
        paragraphs: [
          "Rather than treating stress management as an afterthought, a functional medicine evaluation looks at stress alongside gut health, sleep quality, nutrient status, and inflammatory triggers as part of the full picture driving your symptoms.",
          "This often includes practical strategies like sleep optimization, nervous system regulation techniques (such as breathwork), and addressing underlying gut or nutrient imbalances that may be amplifying your body's stress response \u2014 in addition to, not instead of, appropriate medical care for your specific condition.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can stress alone cause an autoimmune disease?",
        answer: [
          "Stress on its own isn't considered a sole cause of autoimmune disease. Most functional medicine and conventional models describe autoimmune disease as arising from a combination of genetic predisposition, environmental triggers, and immune dysregulation \u2014 with chronic stress acting as one potential contributing factor rather than a standalone cause.",
        ],
      },
      {
        question: "How quickly can stress trigger a flare?",
        answer: [
          "This varies significantly by person and condition. Some people notice symptoms worsening within days of a highly stressful event, while for others the connection is only clear when looking back over weeks or months of symptom patterns.",
        ],
      },
      {
        question: "What helps calm an autoimmune flare linked to stress?",
        answer: [
          "Approaches vary by individual and condition, but commonly discussed strategies include prioritizing consistent sleep, nervous-system regulation practices like breathwork or meditation, gentle movement, and addressing underlying gut or nutrient imbalances \u2014 always alongside, not in place of, your prescribed medical treatment plan.",
        ],
      },
    ],
    relatedConditionSlugs: ["anxiety-depression", "other-autoimmune-conditions"],
    targetKeyword: "can stress trigger autoimmune disease flares",
    cluster: "root-cause-education",
    datePublished: "2026-09-29",
  },
  {
    slug: "mthfr-gene-mutation-and-autoimmune-disease",
    title: "MTHFR Gene Mutation and Autoimmune Disease | Dr. Autoimmune",
    metaDescription:
      "What is the MTHFR gene mutation, and how might it relate to autoimmune disease and methylation? A clear, practical overview of what it means for you.",
    eyebrow: "Root-Cause Education",
    h1: "MTHFR Gene Mutation and Autoimmune Disease: What's the Connection?",
    accent: "MTHFR Gene Mutation",
    heroSubhead:
      "MTHFR is one of the most talked-about genes in functional medicine. Here's what it actually does, and why it's often discussed alongside autoimmune conditions.",
    intro: [
      "If you've had genetic testing done, or if a functional medicine provider has mentioned \u201Cmethylation,\u201D you may have come across the term MTHFR. It refers to a gene \u2014 methylenetetrahydrofolate reductase \u2014 that provides instructions for an enzyme involved in processing folate (vitamin B9) and regulating a process called methylation, which touches nearly every system in the body, including immune function.",
      "MTHFR gene variants are extremely common; having one doesn't mean something is inherently wrong. What matters more is understanding what the gene does and whether your individual nutrient status and symptoms suggest it's worth addressing as part of your care.",
    ],
    sections: [
      {
        heading: "What Does the MTHFR Gene Actually Do?",
        paragraphs: [
          "The MTHFR enzyme converts folate into its active, usable form (5-MTHF), which is required for methylation \u2014 a chemical process involved in DNA repair, neurotransmitter production, detoxification, and regulation of gene expression, including genes that influence immune cell behavior.",
          "Common variants of the MTHFR gene (most notably C677T and A1298C) can reduce the enzyme's efficiency, which may lead to lower levels of active folate and, in some cases, elevated homocysteine \u2014 an amino acid linked to inflammation when chronically elevated.",
        ],
      },
      {
        heading: "Why MTHFR Comes Up in Autoimmune Discussions",
        paragraphs: [
          "Methylation influences how immune cells communicate and regulate inflammation, which is why some functional medicine providers consider MTHFR variants as one piece of the puzzle in people with autoimmune conditions \u2014 particularly when nutrient testing shows low active folate, low B12, or elevated homocysteine alongside ongoing symptoms.",
          "It's important to be clear: having an MTHFR variant does not cause autoimmune disease on its own, and most people with an MTHFR variant never develop one. It's one of many factors that may be considered as part of a broader root-cause evaluation, not a diagnosis in itself.",
        ],
      },
      {
        heading: "What a Root-Cause Evaluation Looks At",
        paragraphs: [
          "Rather than testing for MTHFR in isolation, a thorough functional medicine evaluation typically looks at actual nutrient levels (active folate, B12, homocysteine), symptoms, and your broader health picture \u2014 since two people with the same gene variant can have very different nutrient statuses and needs.",
          "When relevant, support may include dietary changes and targeted supplementation with active forms of folate and B12, always personalized to your labs rather than applied as a blanket recommendation.",
        ],
      },
    ],
    faqs: [
      {
        question: "Does having an MTHFR mutation mean I will develop an autoimmune disease?",
        answer: [
          "No. MTHFR gene variants are very common in the general population, and most people who carry one never develop an autoimmune condition. It's considered one potential contributing factor among many, not a predictor or cause on its own.",
        ],
      },
      {
        question: "Should everyone with an autoimmune disease get tested for MTHFR?",
        answer: [
          "This depends on your individual symptoms and history. Some providers include it as part of a broader root-cause workup, especially when nutrient deficiencies are suspected, while others focus directly on measuring active folate, B12, and homocysteine levels rather than the gene variant itself.",
        ],
      },
      {
        question: "Can diet affect MTHFR-related methylation issues?",
        answer: [
          "Diet and targeted supplementation with active forms of folate and B12 (rather than synthetic folic acid) are commonly discussed strategies for supporting methylation in people with reduced MTHFR enzyme activity, but any supplementation should be guided by your actual lab results and a qualified provider.",
        ],
      },
    ],
    relatedConditionSlugs: ["hashimotos-thyroiditis-graves", "other-autoimmune-conditions"],
    targetKeyword: "mthfr gene mutation and autoimmune disease",
    cluster: "root-cause-education",
    datePublished: "2026-09-29",
  },
  {
    slug: "autoimmune-hepatitis-symptoms-and-skin-rash",
    title: "Autoimmune Hepatitis Symptoms and Skin Rash | Dr. Autoimmune",
    metaDescription:
      "Autoimmune hepatitis can cause fatigue, jaundice, and in some cases skin rash. Learn the common symptoms and how a root-cause approach can help.",
    eyebrow: "Conditions Education",
    h1: "Autoimmune Hepatitis Symptoms and Skin Rash: What to Know",
    accent: "Autoimmune Hepatitis",
    heroSubhead:
      "Autoimmune hepatitis is a lesser-known autoimmune condition affecting the liver, and some people also notice skin changes alongside their symptoms.",
    intro: [
      "Autoimmune hepatitis occurs when the immune system mistakenly attacks the liver, causing inflammation that, if untreated, can progress over time. It's less commonly discussed than conditions like Hashimoto's or rheumatoid arthritis, but it shares the same underlying pattern: the immune system targeting healthy tissue.",
      "Because early symptoms can be vague or overlap with other conditions, autoimmune hepatitis is sometimes discovered through routine blood work showing elevated liver enzymes before more noticeable symptoms appear.",
    ],
    sections: [
      {
        heading: "Common Symptoms of Autoimmune Hepatitis",
        paragraphs: [
          "Symptoms vary widely between individuals and can range from barely noticeable to significant. Commonly reported symptoms include:",
        ],
        bullets: [
          "Persistent fatigue",
          "Joint pain or aching",
          "Nausea or loss of appetite",
          "Abdominal discomfort, particularly upper right side",
          "Jaundice (yellowing of the skin or eyes) in more advanced cases",
          "Dark urine or pale stools",
          "Skin changes, including rash or itching (pruritus)",
        ],
      },
      {
        heading: "The Skin Rash and Autoimmune Hepatitis Connection",
        paragraphs: [
          "Skin symptoms in autoimmune hepatitis can occur for a few different reasons. Itching (pruritus) is a well-documented symptom linked to how the liver processes bile acids when inflamed. Some people also develop a rash as part of an overlapping autoimmune condition, since autoimmune hepatitis can occur alongside other autoimmune diseases (a pattern sometimes called autoimmune polyendocrine or overlap syndrome).",
          "Because skin changes have many possible causes, a rash alone isn't enough to diagnose autoimmune hepatitis \u2014 it's typically evaluated alongside liver function tests, specific antibody testing (such as ANA, anti-smooth muscle antibody, or anti-LKM1), and sometimes a liver biopsy.",
        ],
      },
      {
        heading: "How Autoimmune Hepatitis Is Typically Evaluated and Supported",
        paragraphs: [
          "Diagnosis generally involves blood tests for liver enzymes and specific autoantibodies, along with imaging or biopsy when needed. Conventional treatment often includes immunosuppressive medication to control the immune attack on the liver.",
          "A root-cause functional medicine approach can complement conventional care by addressing gut health, nutrient status, and inflammatory triggers that may support overall immune regulation \u2014 always working alongside, not replacing, appropriate monitoring by a hepatologist or gastroenterologist for this condition.",
        ],
      },
    ],
    faqs: [
      {
        question: "Is autoimmune hepatitis the same as regular hepatitis?",
        answer: [
          "No. Viral hepatitis (like hepatitis A, B, or C) is caused by a virus, while autoimmune hepatitis occurs when the immune system attacks the liver itself, without a viral infection as the trigger. They require different diagnostic testing and treatment approaches.",
        ],
      },
      {
        question: "Can autoimmune hepatitis cause itching without a visible rash?",
        answer: [
          "Yes. Itching related to liver inflammation (often from changes in bile acid processing) can occur without an obvious visible rash, which is one reason unexplained itching alongside fatigue or abdominal discomfort is worth mentioning to a provider.",
        ],
      },
      {
        question: "Does autoimmune hepatitis often occur with other autoimmune conditions?",
        answer: [
          "It can. Autoimmune hepatitis is sometimes seen alongside other autoimmune conditions, such as thyroid disease or inflammatory bowel disease, which is why a broader evaluation of symptoms and antibody patterns is often useful rather than looking at the liver in isolation.",
        ],
      },
    ],
    relatedConditionSlugs: ["inflammatory-bowel-disease", "other-autoimmune-conditions"],
    targetKeyword: "autoimmune hepatitis skin rash",
    cluster: "conditions-education",
    datePublished: "2026-09-29",
  },
  {
    slug: "what-type-of-doctor-treats-autoimmune-disease",
    title: "What Type of Doctor Treats Autoimmune Disease?",
    metaDescription:
      "Rheumatologist, endocrinologist, immunologist, or functional medicine doctor? Learn which specialists treat autoimmune disease and how they differ.",
    eyebrow: "Choosing Your Care Team",
    h1: "What Type of Doctor Treats Autoimmune Disease?",
    accent: "Autoimmune Disease",
    heroSubhead:
      "Autoimmune conditions can involve several different specialists. Here's a plain-language breakdown of who treats what, and how they work together.",
    intro: [
      "One of the more confusing parts of navigating a possible autoimmune diagnosis is figuring out which type of doctor to see in the first place. Autoimmune diseases can affect nearly any organ system, so the \u201Cright\u201D specialist often depends on which condition is suspected and which organs are involved.",
      "Many people end up seeing more than one specialist over time, and increasingly, a functional or integrative medicine provider alongside conventional specialists to address root causes rather than symptoms in isolation.",
    ],
    sections: [
      {
        heading: "Specialists Commonly Involved in Autoimmune Care",
        paragraphs: [
          "Depending on your symptoms and suspected condition, your care team might include:",
        ],
        bullets: [
          "Rheumatologist \u2014 joint, muscle, and connective tissue conditions like rheumatoid arthritis, lupus, and Sjögren's syndrome",
          "Endocrinologist \u2014 hormone-related autoimmune conditions such as Hashimoto's thyroiditis, Graves' disease, and type 1 diabetes",
          "Gastroenterologist \u2014 digestive-system autoimmune conditions like celiac disease and inflammatory bowel disease",
          "Immunologist \u2014 complex or overlapping immune dysfunction, especially when multiple systems are involved",
          "Neurologist \u2014 autoimmune conditions affecting the nervous system, such as multiple sclerosis",
          "Dermatologist \u2014 autoimmune skin conditions and skin manifestations of systemic disease",
          "Primary care provider \u2014 often the first point of contact and coordinator of referrals",
          "Functional medicine doctor \u2014 focuses on identifying and addressing underlying root causes (gut health, triggers, nutrient status) alongside conventional specialty care",
        ],
      },
      {
        heading: "Why You Might See More Than One Type of Doctor",
        paragraphs: [
          "Autoimmune diseases don't always stay confined to a single organ system, and it's common to have overlapping conditions (for example, Hashimoto's alongside celiac disease). Because of this, many patients work with a primary specialist for their main diagnosis while also incorporating a functional medicine provider to look at gut health, inflammation, and lifestyle factors that conventional specialty visits may not have time to fully address.",
        ],
      },
      {
        heading: "How a Functional Medicine Doctor Fits In",
        paragraphs: [
          "A functional medicine doctor doesn't typically replace a rheumatologist, endocrinologist, or other specialist for disease-specific monitoring and medication management. Instead, this type of provider focuses on identifying upstream contributors \u2014 gut permeability, chronic infections, nutrient deficiencies, and environmental triggers \u2014 and building a personalized plan (diet, supplements, lifestyle changes) designed to work alongside your existing specialty care.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I see a rheumatologist or a functional medicine doctor first?",
        answer: [
          "If you have specific symptoms suggestive of a particular autoimmune condition (like joint swelling or a suspicious rash), a relevant specialist such as a rheumatologist can help confirm or rule out a diagnosis. A functional medicine doctor can be valuable at any point \u2014 before, during, or after a formal diagnosis \u2014 to address root-cause factors alongside your specialist's care.",
        ],
      },
      {
        question: "Can a functional medicine doctor diagnose autoimmune disease?",
        answer: [
          "Functional medicine doctors can order and interpret many of the same antibody and inflammatory marker tests used in conventional diagnosis, and can identify patterns suggestive of autoimmune disease. Formal diagnosis of certain conditions may still involve imaging, biopsy, or criteria managed by a relevant specialist.",
        ],
      },
      {
        question: "Do I need a referral to see an autoimmune specialist?",
        answer: [
          "This depends on your insurance plan and location. Many rheumatologists, endocrinologists, and other specialists require a referral from a primary care provider, while functional medicine practices (including telehealth ones) often allow direct scheduling without a referral.",
        ],
      },
    ],
    relatedConditionSlugs: ["other-autoimmune-conditions", "rheumatoid-arthritis"],
    targetKeyword: "what type of doctor treats autoimmune disease",
    cluster: "provider-selection",
    datePublished: "2026-09-29",
  },
  {
    slug: "how-to-choose-an-autoimmune-disease-specialist",
    title: "How to Choose an Autoimmune Disease Specialist",
    metaDescription:
      "Choosing the right autoimmune specialist matters. Here's what to look for, questions to ask, and how telehealth functional medicine care fits in.",
    eyebrow: "Choosing Your Care Team",
    h1: "How to Choose an Autoimmune Disease Specialist",
    accent: "Autoimmune Disease Specialist",
    heroSubhead:
      "Finding the right autoimmune specialist can shorten your path to answers. Here's what to consider before you book that first appointment.",
    intro: [
      "Once you suspect (or have been told) that an autoimmune condition may be behind your symptoms, the next step \u2014 finding the right specialist \u2014 can feel overwhelming. Wait times for certain specialists can be long, appointment lengths are often short, and it's not always clear which type of provider is the best fit for your specific situation.",
      "A little bit of preparation before you choose can help you get more out of that first visit, whether you're seeing a conventional specialist, a functional medicine provider, or both.",
    ],
    sections: [
      {
        heading: "Questions to Ask Before Booking",
        paragraphs: [
          "Before committing to a specific provider, it can help to ask (or research):",
        ],
        bullets: [
          "Does this provider have experience with my specific suspected condition, or with autoimmune disease broadly?",
          "How long is a typical first appointment, and is there time to discuss my full history?",
          "Does the practice offer telehealth, and if so, is that a good fit for my situation?",
          "Will this provider coordinate with my other doctors (primary care, existing specialists)?",
          "What lab testing is typically included as part of an initial evaluation?",
        ],
      },
      {
        heading: "Conventional Specialist vs. Functional Medicine: What's the Difference?",
        paragraphs: [
          "A conventional specialist (rheumatologist, endocrinologist, gastroenterologist, etc.) typically focuses on diagnosing your specific condition using established clinical criteria and managing it with medication where appropriate.",
          "A functional medicine specialist takes a broader, root-cause-oriented approach \u2014 looking at gut health, nutrient status, environmental triggers, and lifestyle factors that may be contributing to immune dysregulation \u2014 often with longer initial appointments to review your full history. Many patients choose to work with both types of providers together rather than choosing one over the other.",
        ],
      },
      {
        heading: "Why Telehealth Has Become a Common Choice",
        paragraphs: [
          "Because many people wait months for an in-person appointment with certain specialists, telehealth functional medicine care has become a practical option for getting a comprehensive initial evaluation, lab review, and root-cause plan started sooner \u2014 without requiring travel, and often with more time allotted per visit than a typical in-person specialist appointment allows.",
        ],
      },
    ],
    faqs: [
      {
        question: "How long does it typically take to get an autoimmune diagnosis?",
        answer: [
          "This varies enormously depending on the condition, how clear the symptoms are, and how quickly testing and specialist appointments can be scheduled. Some people are diagnosed within weeks, while others go through a longer process involving multiple specialists and repeat testing.",
        ],
      },
      {
        question: "Is telehealth a good option for autoimmune care?",
        answer: [
          "Telehealth can work well for the initial evaluation, ongoing lab review, and root-cause functional medicine care for many autoimmune conditions, especially when combined with local lab draws or imaging as needed. Certain hands-on evaluations or procedures may still require an in-person visit with a local specialist.",
        ],
      },
      {
        question: "Can I work with a functional medicine doctor and a conventional specialist at the same time?",
        answer: [
          "Yes, this is a common and often recommended approach \u2014 many patients use a conventional specialist for disease-specific monitoring and medication management, while a functional medicine provider focuses on root-cause factors like gut health, nutrition, and lifestyle alongside that care.",
        ],
      },
    ],
    relatedConditionSlugs: ["conditions-we-support"],
    targetKeyword: "how to choose an autoimmune disease specialist",
    cluster: "provider-selection",
    datePublished: "2026-09-29",
  },
  {
    slug: "functional-medicine-vs-rheumatologist-what-to-expect",
    title: "Functional Medicine vs. Rheumatologist: What to Expect",
    metaDescription:
      "Wondering whether to see a rheumatologist or a functional medicine doctor? Here's what each visit typically looks like and how the two approaches differ.",
    eyebrow: "Choosing Your Care Team",
    h1: "Functional Medicine vs. Rheumatologist: What to Expect at Each Visit",
    accent: "Functional Medicine vs. Rheumatologist",
    heroSubhead:
      "Both play a role in autoimmune and joint-related care, but the visits themselves look quite different. Here's what to expect from each.",
    intro: [
      "If you're dealing with joint pain, fatigue, or a suspected autoimmune condition, you may be deciding between (or considering both) a rheumatologist and a functional medicine doctor. Understanding what each visit typically involves can help you set realistic expectations and choose the right starting point for your situation.",
    ],
    sections: [
      {
        heading: "What to Expect at a Rheumatologist Visit",
        paragraphs: [
          "A rheumatologist specializes in diagnosing and managing autoimmune and inflammatory joint conditions, such as rheumatoid arthritis, lupus, and Sjögren's syndrome. A typical visit includes a focused physical exam of your joints, a review of relevant antibody and inflammatory marker labs, and imaging when needed.",
          "Treatment often centers on disease-modifying medications and biologics aimed at controlling inflammation and preventing joint damage, with follow-up visits to monitor disease activity and medication response.",
        ],
      },
      {
        heading: "What to Expect at a Functional Medicine Visit",
        paragraphs: [
          "A functional medicine visit for autoimmune or joint-related concerns typically involves a longer initial appointment focused on your complete history \u2014 diet, digestion, sleep, stress, past infections, and environmental exposures \u2014 alongside comprehensive lab testing that may include nutrient levels, inflammatory markers, and gut health markers in addition to standard antibody panels.",
          "The resulting plan usually centers on dietary changes, targeted supplementation, and lifestyle modifications designed to address root-cause contributors to inflammation, alongside (not instead of) any medication prescribed by your other specialists.",
        ],
      },
      {
        heading: "Choosing Between the Two (or Using Both)",
        paragraphs: [
          "These approaches aren't mutually exclusive. Many patients use a rheumatologist for diagnosis, disease monitoring, and medication management, while working with a functional medicine provider on the root-cause and lifestyle side of their care \u2014 gut health, nutrition, and inflammation reduction strategies that complement their medical treatment plan.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can a functional medicine doctor replace my rheumatologist?",
        answer: [
          "For most people with a confirmed autoimmune diagnosis requiring disease-modifying medication, a functional medicine doctor works best as a complement to \u2014 not a replacement for \u2014 rheumatology care, focusing on root-cause and lifestyle factors alongside your prescribed treatment.",
        ],
      },
      {
        question: "How long is a typical functional medicine initial visit compared to a rheumatology visit?",
        answer: [
          "Functional medicine initial visits are often longer, sometimes 60-90 minutes, to allow a thorough review of your full history, while rheumatology visits (especially follow-ups) are frequently shorter and focused on disease activity and medication management.",
        ],
      },
      {
        question: "Will a functional medicine doctor order the same labs as a rheumatologist?",
        answer: [
          "There's often overlap in antibody and inflammatory marker testing, but functional medicine evaluations frequently add nutrient status, gut health, and additional inflammatory markers not always included in a standard rheumatology workup.",
        ],
      },
    ],
    relatedConditionSlugs: ["rheumatoid-arthritis", "lupus"],
    targetKeyword: "functional medicine vs rheumatologist",
    cluster: "provider-selection",
    datePublished: "2026-09-29",
  },
  {
    slug: "is-irritable-bowel-syndrome-an-autoimmune-disease",
    title: "Is IBS an Autoimmune Disease? Here's the Difference",
    metaDescription:
      "IBS and autoimmune conditions like IBD can look similar but aren't the same thing. Learn how irritable bowel syndrome differs from autoimmune disease.",
    eyebrow: "Conditions Education",
    h1: "Is Irritable Bowel Syndrome (IBS) an Autoimmune Disease?",
    accent: "Irritable Bowel Syndrome",
    heroSubhead:
      "IBS and autoimmune digestive conditions share some symptoms, but they aren't the same thing. Here's how they're actually different.",
    intro: [
      "Irritable bowel syndrome (IBS) is one of the most common digestive complaints, and because its symptoms \u2014 abdominal pain, bloating, and altered bowel habits \u2014 can overlap with autoimmune digestive conditions, it's a fair question: is IBS itself an autoimmune disease?",
      "The short answer is no, IBS is not classified as an autoimmune disease. But the two are often discussed together because they can look similar on the surface, sometimes coexist, and both involve gut function \u2014 which is worth understanding clearly.",
    ],
    sections: [
      {
        heading: "IBS vs. Autoimmune Digestive Conditions: The Key Difference",
        paragraphs: [
          "IBS is classified as a functional gastrointestinal disorder \u2014 meaning the digestive tract doesn't work the way it should, causing real symptoms, but without the visible tissue damage or inflammation seen on colonoscopy or biopsy that defines autoimmune conditions like inflammatory bowel disease (IBD, which includes Crohn's disease and ulcerative colitis) or celiac disease.",
          "Autoimmune digestive conditions involve the immune system actively attacking the digestive tract, which can be confirmed through inflammatory markers, antibody testing, and visible changes on imaging or biopsy. IBS diagnosis, by contrast, is typically made based on symptom patterns after ruling out other conditions, since there isn't a single definitive test for it.",
        ],
      },
      {
        heading: "Why IBS and Autoimmune Conditions Are Often Confused",
        paragraphs: [
          "Several factors contribute to the overlap in how people think about these conditions:",
        ],
        bullets: [
          "Similar core symptoms: abdominal pain, bloating, and changes in bowel habits appear in both.",
          "IBS and IBD can coexist \u2014 some people with well-controlled IBD still experience IBS-like symptoms.",
          "Both are influenced by the gut microbiome and gut-immune interactions, an active area of ongoing research.",
          "Symptom flares in both can be triggered or worsened by stress, certain foods, and poor sleep.",
        ],
      },
      {
        heading: "How a Root-Cause Approach Looks at IBS Symptoms",
        paragraphs: [
          "Even though IBS isn't autoimmune, a functional medicine evaluation can still be useful for IBS-pattern symptoms \u2014 assessing gut microbiome balance, food sensitivities, prior infections, and stress-related gut-brain axis factors that often drive IBS symptoms, while ruling out or monitoring for autoimmune digestive conditions when the symptom picture warrants it.",
        ],
      },
    ],
    faqs: [
      {
        question: "Can IBS turn into an autoimmune disease over time?",
        answer: [
          "IBS itself is not currently understood to progress into an autoimmune disease. However, because IBS-like symptoms can sometimes mask or coexist with an autoimmune digestive condition, persistent or worsening symptoms are worth having properly evaluated rather than assumed to be IBS alone.",
        ],
      },
      {
        question: "How can I tell if my symptoms are IBS or something autoimmune, like IBD?",
        answer: [
          "Certain \u201Cred flag\u201D symptoms \u2014 such as blood in the stool, unintended weight loss, nighttime symptoms that wake you up, or fever \u2014 are not typical of IBS and warrant prompt evaluation for inflammatory bowel disease or another condition. Inflammatory markers, stool tests, and sometimes colonoscopy can help distinguish the two.",
        ],
      },
      {
        question: "Does treating gut health help IBS symptoms even though it's not autoimmune?",
        answer: [
          "Many people with IBS do find that addressing gut microbiome balance, food triggers, and stress can meaningfully improve symptoms, even though IBS isn't classified as autoimmune \u2014 the gut-brain and gut-microbiome connections play a role in both types of conditions.",
        ],
      },
    ],
    relatedConditionSlugs: ["inflammatory-bowel-disease", "celiac-disease-and-gluten-intolerance"],
    targetKeyword: "is ibs an autoimmune disease",
    cluster: "conditions-education",
    datePublished: "2026-09-29",
  },
];

export const LEARN_PAGES: LearnPageData[] = RAW_LEARN_PAGES.map((page) => {
  const extra = LEARN_ENRICHMENT[page.slug];
  if (!extra) {
    throw new Error(`Missing learn enrichment for ${page.slug}`);
  }
  return {
    ...page,
    intro: [...page.intro, ...extra.intro],
    sections: [...page.sections, ...extra.sections],
    faqs: [...page.faqs, ...extra.faqs],
    citations: extra.citations,
    dateModified: LEARN_DATE_MODIFIED,
  };
});

export function getLearnPage(slug: string): LearnPageData | undefined {
  return LEARN_PAGES.find((p) => p.slug === slug);
}

export function getLearnSlugs(): string[] {
  return LEARN_PAGES.map((p) => p.slug);
}
