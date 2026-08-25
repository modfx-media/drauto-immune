/**
 * Bespoke content for the 13 individual condition pages, hand-migrated
 * from each page's `content/data/<slug>.json` `bodyMarkdown` (itself
 * crawled from the live drautoimmune.com) so headings, symptom/trigger
 * lists, and copy match the live site exactly for SEO parity. Metadata
 * and JSON-LD are still sourced from `lib/content.ts`/`content/data/*.json`
 * unchanged — this file only supplies the hand-built JSX content model.
 *
 * NOTE: the `helpHeading` for "anxiety-depression" is intentionally
 * "Triggers for Sjögren's Syndrome" — verified via a live MCP content
 * audit (DataForSEO) to be a genuine mislabeled-heading bug on the
 * production site itself, not a migration artifact. Per the instruction
 * to clone content exactly for SEO preservation, it is reproduced as-is
 * rather than "corrected".
 */

export interface ConditionImage {
  src: string;
  alt: string;
}

export interface ConditionBulletSection {
  heading: string;
  lead?: string;
  items: string[];
  ordered?: boolean;
}

export interface ConditionPageData {
  slug: string;
  name: string;
  heroDescription: string;
  introImage: ConditionImage;
  whatIsHeading: string;
  whatIsParagraphs: string[];
  /** Bullet list embedded directly under the "what is" heading (used by other-autoimmune-conditions' 25-disease list). */
  whatIsBullets?: string[];
  /** "What if you could…" style lead-in list (anxiety-depression only). */
  leadInBullets?: ConditionBulletSection;
  symptoms?: ConditionBulletSection;
  triggers?: ConditionBulletSection;
  helpHeading: string;
  helpParagraphs: string[];
  gutHeading: string;
  gutParagraphs: string[];
  /** Whether to render the shared "Finding the Root Cause" numbered list. Defaults to true. */
  showRootCause?: boolean;
  ctaImage?: ConditionImage;
  /** other-autoimmune-conditions renders Help/Root Cause/Gut sections BEFORE the mid-page CTA instead of after. */
  ctaAfterGut?: boolean;
}

const TRIGGERS_LEAD = "What can trigger or fuel an imbalance in your thyroid gland?";
const STANDARD_TRIGGERS = [
  "Gluten sensitivity or other food triggers",
  "Viral infection such as Epstein Barr virus (EBV)",
  "Plastics like BPA, phthalates, parabens",
  "Small intestinal bacterial overgrowth",
  "Mold toxicity",
  "Low glutathione status",
  "Hormonal imbalances",
  "Nutrient deficiencies",
  "Leaky gut",
  "Blood sugar dysfunction",
  "Low vitamin D",
];

const ROOT_CAUSE_INTRO_HELP_PARAGRAPHS = [
  "It can be frustrating trying to find help with chronic and complex conditions, which is why we have chosen to dedicate our practice to exactly that. Instead of treating the symptoms, our functional medicine approach focuses on finding the causes.",
  "All autoimmune diseases start in the gut. We design custom plans of dietary intervention, supplements and lifestyle recommendations to help heal the gut and support the immune system. In supporting these fundamental functions of the digestive tract we can reduce inflammation and see dramatic changes in symptoms.",
];

const GUT_INTRO_PARAGRAPH =
  "Our small intestine consists of 25 feet of tubing, the inside surface area being equivalent to that of a doubles tennis court!";

export const CONDITIONS: ConditionPageData[] = [
  {
    slug: "thyroid-conditions",
    name: "Thyroid Conditions",
    heroDescription:
      "Need help with thyroid issues? Our Boulder specialist looks for the root cause of your low energy and brain fog.",
    introImage: {
      src: "/images/migrated/thyroid-conditions/vecteezy_cervical-lymphadenitis-of-the-right-side-in-a-woman_51694990-scaled.jpg",
      alt: "Close-up of a woman's neck showing visible thyroid gland swelling",
    },
    whatIsHeading: "What are Thyroid Conditions?",
    whatIsParagraphs: [
      "The thyroid is a butterfly-shaped gland located in your throat that makes specific hormones. When this gland isn't working correctly, you can experience a variety of symptoms. Over 90% of thyroid conditions are autoimmune, meaning that the body attacks its own thyroid tissue. Thyroiditis is the swelling of the thyroid gland.",
      "If you're one of the 14 million people in America who are suffering from Hashimoto's thyroiditis or 10 million people who have Graves' disease, you're probably wondering what you can do to help improve symptoms and get some relief.",
    ],
    symptoms: {
      heading: "Thyroid Condition Symptoms",
      lead: "Do you suspect or know that you have a thyroid condition? You may experience symptoms such as:",
      items: [
        "Fatigue",
        "Weight loss",
        "Brain fog",
        "Constipation or \u201Ctummy troubles\u201D",
        "Muscle weakness or joint pain",
        "Sleep problems",
        "Sensitivity to heat or cold",
        "Hair loss",
        "Dry or pale skin",
        "Anxiety/Depression",
        "Heart palpitations",
        "Hoarse/deepened voice",
      ],
    },
    triggers: { heading: "Triggers for Thyroid Conditions", lead: TRIGGERS_LEAD, items: STANDARD_TRIGGERS },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "Typically in treatment for hypothyroid conditions, an oral hormone medication is prescribed and can be helpful for the symptoms. However, since this drug may cause long-term damage to bones and the cardiovascular system, many people choose to find more natural ways to treat their thyroiditis.",
      ...ROOT_CAUSE_INTRO_HELP_PARAGRAPHS,
    ],
    ctaImage: {
      src: "/images/migrated/thyroid-conditions/iStock-931369150-e1763140495912.jpg",
      alt: "Patient consulting with a functional medicine doctor about thyroid symptoms",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed they begin to target the thyroid. This is why medication may help symptoms but it can never resolve your thyroid condition.",
    ],
  },
  {
    slug: "hashimotos-thyroiditis-graves",
    name: "Hashimoto's Thyroiditis",
    heroDescription:
      "Our doctor specializes in treating Hashimoto's thyroiditis. We use a natural approach to help manage your thyroid health.",
    introImage: {
      src: "/images/migrated/hashimotos-thyroiditis-graves/d975af0d-060e-4e8d-9c86-eb42a4638cc9_shutterstock_1643575045.avif",
      alt: "Illustration of the thyroid gland under autoimmune attack",
    },
    whatIsHeading: "What is Hashimoto's Thyroiditis?",
    whatIsParagraphs: [
      "Hashimoto's is an autoimmune disease, meaning that the body is attacking the thyroid gland. If you're one of the 14 million people in America who are suffering from Hashimoto's thyroiditis, you're probably wondering what you can do to help improve symptoms and get some relief.",
      "90% of the time, the cause of hypothyroidism, or underactive thyroid, is Hashimoto's thyroiditis. The body makes antibodies (little warriors) that attack the thyroid, a butterfly-shaped gland in your throat. This can cause an underproduction of thyroid hormones and harm the hormone system that is needed to keep the body functioning properly.",
    ],
    symptoms: {
      heading: "Hashimoto's Thyroiditis Symptoms",
      lead: "Do you suspect or know that you have Hashimoto's thyroiditis? You may experience symptoms such as:",
      items: [
        "Fatigue",
        "Weight loss",
        "Brain fog",
        "Constipation or \u201Ctummy troubles\u201D",
        "Muscle weakness or joint pain",
        "Sleep problems",
        "Sensitivity to heat or cold",
        "Hair loss",
        "Dry or pale skin",
        "Anxiety/Depression",
        "Heart palpitations",
        "Hoarse/deepened voice",
      ],
    },
    triggers: {
      heading: "Triggers for Hashimoto's Thyroiditis",
      lead: TRIGGERS_LEAD,
      items: [
        "Gluten sensitivity and other food trigger",
        "Viral infection such as Epstein Barr virus (EBV)",
        "Plastics like BPA, phthalates, parabens",
        "Small intestinal bacterial overgrowth",
        "Mold toxicity",
        "Low glutathione status",
        "Hormonal imbalances",
        "Nutrient deficiencies",
        "Leaky gut",
        "Blood sugar dysfunction",
      ],
    },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "Typically in treatment for Hashimoto's, an oral hormone medication is prescribed and can be helpful for the symptoms. However, since this drug may cause long-term damage to bones and the cardiovascular system, many people choose to find more natural ways to treat thyroiditis.",
      ...ROOT_CAUSE_INTRO_HELP_PARAGRAPHS,
    ],
    ctaImage: {
      src: "/images/migrated/hashimotos-thyroiditis-graves/iStock-931369150-e1763140495912.jpg",
      alt: "Patient consulting with a functional medicine doctor about Hashimoto's thyroiditis",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed they begin to target the thyroid. This is why medication may help symptoms but it can never resolve your thyroid condition.",
    ],
  },
  {
    slug: "graves-disease",
    name: "Graves' Disease",
    heroDescription:
      "Learn how to manage Graves' disease naturally. Dr. Autoimmune helps you balance an overactive thyroid and find lasting relief.",
    introImage: {
      src: "/images/migrated/graves-disease/b311e27464f7d6f6e62ee48003f089b2.webp",
      alt: "Illustration of an overactive thyroid gland affected by Graves' disease",
    },
    whatIsHeading: "What is Graves' Disease?",
    whatIsParagraphs: [
      "Graves' disease is an autoimmune disease, meaning that the immune system attacks the thyroid gland. If you're one of the 10 million people who have Graves' disease, you're probably wondering what you can do to help improve symptoms and get some relief.",
      "Hyperthyroidism (overactive thyroid) is generally contributed to Graves' disease, a condition where too much thyroid hormone is produced. Thyroid hormones influence every organ in the body, including the heart.",
    ],
    symptoms: {
      heading: "Graves' Disease Symptoms",
      lead: "Do you suspect or know that you have Graves' disease? You may experience symptoms such as:",
      items: [
        "Anxiety/Irritability",
        "Fatigue",
        "Weight loss",
        "Hand or finger tremors",
        "Enlargement of the thyroid gland (goiter)",
        "Brain fog",
        "Frequent bowel movements",
        "Bulging eyes (Graves' ophthalmopathy)",
        "Thick, red skin usually on the shins or tops of the feet (Graves' dermopathy)",
        "Sleep problems",
        "Sensitivity to heat",
        "Heart palpitations",
      ],
    },
    triggers: {
      heading: "Triggers for Graves' Disease",
      lead: TRIGGERS_LEAD,
      items: [
        "Gluten sensitivity or other food triggers",
        "Viral infection such as Epstein Barr virus (EBV)",
        "Plastics like BPA, phthalates, parabens",
        "Small intestinal bacterial overgrowth",
        "Mold toxicity",
        "Low glutathione status",
        "Hormonal imbalances",
        "Nutrient deficiencies",
        "Leaky gut",
        "Blood sugar dysfunction",
      ],
    },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "Typically in treatment for Graves', an oral radioactive iodine medication is prescribed to destroy overactive thyroid cells. However, since this drug may cause an increased risk of cancer, many people choose to find more natural healing methods.",
      ...ROOT_CAUSE_INTRO_HELP_PARAGRAPHS,
    ],
    ctaImage: {
      src: "/images/migrated/graves-disease/iStock-931369150-e1763140495912.jpg",
      alt: "Patient consulting with a functional medicine doctor about Graves' disease",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed they begin to target the thyroid. This is why medication may help symptoms but it can never resolve your thyroid condition.",
    ],
  },
  {
    slug: "rheumatoid-arthritis",
    name: "Rheumatoid Arthritis",
    heroDescription:
      "Stop letting rheumatoid arthritis pain hold you back. We focus on gut health and inflammation to help your joints feel better.",
    introImage: {
      src: "/images/migrated/rheumatoid-arthritis/close-up-old-patient-with-wrist-issues-scaled.jpg",
      alt: "Close-up of a patient's swollen wrist joint from rheumatoid arthritis",
    },
    whatIsHeading: "What is Rheumatoid Arthritis?",
    whatIsParagraphs: [
      "Rheumatoid arthritis is an autoimmune disease, meaning that the immune system attacks its own body (specifically the joints, but can also damage your eyes and other organs). Life with rheumatoid arthritis can be miserable: the aches, the burn, the feeling of stiffness that lasts throughout the day, but there is hope!",
    ],
    symptoms: {
      heading: "Rheumatoid Arthritis Symptoms",
      lead: "Do you suspect or know that you have rheumatoid arthritis? Symptoms may include:",
      items: [
        "Tender, warm, swollen joints",
        "Joint stiffness that is usually worse in the mornings and after inactivity",
        "Fatigue",
        "Fever",
        "Loss of appetite",
        "Brain fog or loss of mental clarity",
        "Depression",
      ],
    },
    triggers: {
      heading: "Triggers for Rheumatoid Arthritis",
      lead: "What can trigger or fuel rheumatoid arthritis?",
      items: [
        "Gluten intolerance or food sensitivities",
        "Viral infections like Epstein Barr virus (EBV)",
        "Chemical toxins, especially cigarette smoke",
        "Stress/cortisol",
        "Small intestinal bacterial overgrowth",
        "Poor dental health",
        "Hormone fluctuations",
      ],
    },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "Many of our clients have been told they will \u201Chave to live with it\u201D, or \u201Cto just deal with the side effects\u201D of pharmaceuticals. But if you are fed up with your current situation and medical management, there is another way!",
      "Functional medicine is an approach that looks at the entire body (structural, metabolic and neurologic health). We can understand a patient's complete health situation and discover underlying triggers that may be the actual culprit behind your rheumatoid arthritis.",
      "All autoimmune diseases start in the gut. We design custom plans of dietary intervention, supplements and lifestyle recommendations to help heal the gut and support the immune system. In supporting these fundamental functions of the digestive tract we can reduce inflammation and see dramatic changes in symptoms.",
    ],
    ctaImage: {
      src: "/images/migrated/rheumatoid-arthritis/Rheumatoid-Arthritis-1024x683.jpg",
      alt: "Illustration comparing a healthy joint to one affected by rheumatoid arthritis",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed against your own tissue.",
    ],
  },
  {
    slug: "type-1-diabetes",
    name: "Type 1 Diabetes",
    heroDescription:
      "We help patients with Type 1 Diabetes improve their overall wellness. Dr. Autoimmune looks at diet and lifestyle to support your body.",
    introImage: {
      src: "/images/migrated/type-1-diabetes/type-1-diabetes-1280x853-1.jpg",
      alt: "Person checking their blood glucose level",
    },
    whatIsHeading: "What is Type 1 Diabetes?",
    whatIsParagraphs: [
      "Type 1 diabetes is a chronic autoimmune disease that affects 1.6 million Americans alone, mostly children.",
      "There are two main types of diabetes. Type 1 differs from type 2 in that it is an autoimmune disease that causes your body to create antibodies (little warriors) that attack your pancreas, which makes insulin. Insulin is a hormone that regulates blood sugar. If you have type 1 diabetes, your body can't create insulin, which results in high blood sugar levels.",
    ],
    symptoms: {
      heading: "Type 1 Diabetes Symptoms",
      lead: "Do you suspect or know that you have type 1 diabetes or insulin resistance? You may experience symptoms such as these:",
      items: [
        "Fatigue and weakness",
        "Increased thirst",
        "Frequent urination",
        "Extreme hunger",
        "Blurred vision",
        "Unintended weight loss",
        "Irritability and other mood changes",
        "Anxiety",
        "Sugar cravings after meals",
        "Bed-wetting in children who previously didn't wet the bed during the night",
      ],
    },
    triggers: { heading: "Triggers for Type 1 Diabetes", lead: "What can trigger or fuel type 1 diabetes?", items: STANDARD_TRIGGERS },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "The standard treatment for type 1 diabetes is injectable insulin medication. This method addresses the issue of high blood sugar, but it does not address the root cause of the problem.",
      "It can be frustrating trying to find help with chronic and complex conditions, which is why we have chosen to dedicate our practice to exactly that. Instead of treating the symptoms, the functional medicine approach focuses on finding the causes.",
      "All autoimmune diseases start in the gut. We design custom plans of dietary intervention, supplements and lifestyle recommendations to help heal the gut and support the immune system. In supporting these fundamental functions of the digestive tract we can reduce inflammation and see dramatic changes in symptoms.",
    ],
    ctaImage: {
      src: "/images/migrated/type-1-diabetes/type_1_diabetes-980x653-1-e1763146034288.jpg",
      alt: "Insulin vial and syringe used to manage type 1 diabetes",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and antibodies are formed against our own tissue.",
    ],
  },
  {
    slug: "inflammatory-bowel-disease",
    name: "Inflammatory Bowel Disease",
    heroDescription:
      "Find an IBD specialist in Boulder who focuses on gut healing. We help you manage Crohn's and Colitis with natural methods.",
    introImage: {
      src: "/images/migrated/inflammatory-bowel-disease/632bc0a75b290964bff995f1_Prosper-Nutrition-Inflammatory-Bowel-Disease.jpg",
      alt: "Illustration of the digestive tract affected by inflammatory bowel disease",
    },
    whatIsHeading: "What is Inflammatory Bowel Disease?",
    whatIsParagraphs: [
      "Inflammatory bowel disease (IBD) refers to a group of conditions, including autoimmune Crohn's disease and ulcerative colitis. IBD affects 3 million people in the US, yet conventional medicine still hasn't identified the cause or cure. The good news is: there is hope!",
    ],
    symptoms: {
      heading: "Inflammatory Bowel Disease Symptoms",
      lead: "Do you suspect or know that you have inflammatory bowel disease? You may experience symptoms such as these:",
      items: ["Diarrhea", "Fatigue", "Abdominal pain and cramping", "Blood in your stool", "Reduced appetite", "Unintended weight loss", "Depression/Anxiety"],
    },
    triggers: { heading: "Triggers for Inflammatory Bowel Disease", lead: "What can trigger or fuel inflammatory bowel disease?", items: STANDARD_TRIGGERS },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "We understand that living with inflammatory bowel disease is painful, frustrating, and exhausting. The conventional treatment is to prescribe medications that help manage the symptoms, but this approach does not recognize the interconnectedness of our bodies. Instead of focusing on band-aid treatments for IBD, functional medicine aims to heal leaky gut and identify the personal environmental triggers that differ from person to person.",
      "All autoimmune diseases start in the gut. We design custom plans of dietary intervention, supplements and lifestyle recommendations to help heal the gut and support the immune system. In supporting these fundamental functions of the digestive tract we can reduce inflammation and see dramatic changes in symptoms.",
    ],
    ctaImage: {
      src: "/images/migrated/inflammatory-bowel-disease/Inflammatory-Bowel-Disease.jpg",
      alt: "Person experiencing abdominal pain from inflammatory bowel disease",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed against your own tissue.",
    ],
  },
  {
    slug: "celiac-disease-and-gluten-intolerance",
    name: "Celiac Disease & Gluten Intolerance",
    heroDescription:
      "Meet our Boulder Celiac doctor who can help you navigate a gluten-free life. We focus on healing your gut and boosting nutrition.",
    introImage: {
      src: "/images/migrated/celiac-disease-and-gluten-intolerance/colyak-hastaligi.jpg",
      alt: "Gluten-containing foods linked to celiac disease symptoms",
    },
    whatIsHeading: "What is Celiac Disease?",
    whatIsParagraphs: [
      "Celiac disease is an autoimmune condition where the body attacks its own tissue. Shockingly, the majority of symptoms tend to be neurologic (in the brain), not gastrointestinal (in the gut). In fact, for every single celiac suffering from gut symptoms, 7 others may have only brain-based symptoms (headaches, fatigue, numbness/tingling, depression, etc).",
      "The majority of Americans actually have a genetic predisposition for gluten intolerance, which can trigger and/or exacerbate many other conditions, especially related to autoimmunity. Let us help you find out if your health conditions are related to gluten intolerance.",
    ],
    symptoms: {
      heading: "Celiac Disease Symptoms",
      lead: "Do you suspect or know that you have celiac disease or are gluten intolerant? Symptoms may include:",
      items: [
        "Abdominal cramping, pain and bloating",
        "Depression/Anxiety",
        "Constipation",
        "Diarrhea",
        "Headaches",
        "Fatigue (can present as chronic iron deficiency)",
        "Bone/joint pain",
        "Itchy skin/rashes (dermatitis herpetiformis)",
        "Struggles with weight gain or inability to lose weight",
        "Balance troubles (ataxia)",
        "Mouth ulcers",
        "\u201CFailure to thrive\u201D",
        "Miscarriage",
        "Osteoporosis",
      ],
    },
    triggers: {
      heading: "Triggers for Celiac Disease",
      lead: "What can trigger celiac disease?",
      items: ["Lack of breastfeeding", "Chronic stress", "Fungal/Candida overgrowth", "Timing of gluten introduction", "Hormones", "Chronic low vitamin D levels"],
    },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "\u201CWhy don't I feel better now that I'm off gluten?\u201D Sadly, 60% of patients studied one year post gluten removal still had no significant gut healing. Meaning, you can remove the main trigger (gluten), but you can still suffer from symptoms. This is most likely from continued autoimmune inflammation, infections, hormonal changes and nutrient deficiencies. You heard that right: the majority of those diagnosed with celiac disease do not recover after gluten withdrawal!",
      ...ROOT_CAUSE_INTRO_HELP_PARAGRAPHS,
    ],
    ctaImage: {
      src: "/images/migrated/celiac-disease-and-gluten-intolerance/wom3Qmr23xMTeTTpCQZA7C.jpg",
      alt: "Person reading a food label to check for gluten",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed against your own tissue.",
    ],
  },
  {
    slug: "multiple-sclerosis",
    name: "Multiple Sclerosis",
    heroDescription:
      "Searching for an MS doctor in Boulder, CO? We provide functional care to help manage your symptoms and improve mobility.",
    introImage: {
      src: "/images/migrated/multiple-sclerosis/2177627.jpg",
      alt: "Illustration of nerve damage caused by multiple sclerosis",
    },
    whatIsHeading: "What is Multiple Sclerosis?",
    whatIsParagraphs: [
      "Multiple sclerosis (MS) is an autoimmune disease affecting the central nervous system. There is no known cure, and this condition is potentially debilitating.",
      "Those of us with loved ones suffering from multiple sclerosis know personally how frustrating, painful, and heart-wrenching this disease can be. Affecting 2.8 million people worldwide, MS is a demon that many people are familiar with. While there is no known cure, there is still hope.",
    ],
    symptoms: {
      heading: "Multiple Sclerosis Symptoms",
      lead: "Do you suspect or know that you have multiple sclerosis (MS)? You may experience symptoms such as these:",
      items: ["Pains and spasms", "Weakness or fatigue", "Tingling and numbness", "Vision problems", "Balance problems or dizziness", "Bladder issues", "Sexual dysfunction", "Cognitive problems", "Depression/Anxiety"],
    },
    triggers: { heading: "Triggers for Multiple Sclerosis", lead: "What can trigger or fuel multiple sclerosis?", items: STANDARD_TRIGGERS.slice(0, 10) },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "Treatments that are available for MS are expensive, experimental, and provide temporary relief at best. Most MS patients focus their treatment plans around physical therapy. Though keeping the muscles in use and attempting to reconnect neurons through this method is helpful, it does not address the root cause of the problem.",
      "It can be frustrating trying to find help with chronic and complex conditions, which is why we have chosen to dedicate our practice to exactly that. Instead of treating the symptoms, the functional medicine approach focuses on finding the causes.",
      "All autoimmune diseases start in the gut. We design custom plans of dietary intervention, supplements and lifestyle recommendations to help heal the gut and support the immune system. In supporting these fundamental functions of the digestive tract we can reduce inflammation and see dramatic changes in symptoms.",
    ],
    ctaImage: {
      src: "/images/migrated/multiple-sclerosis/images-2025-11-15T002457.934.jpeg",
      alt: "Person managing daily life with multiple sclerosis",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and antibodies are formed against your own tissue.",
    ],
  },
  {
    slug: "lupus",
    name: "Lupus",
    heroDescription:
      "Manage flares and pain with help from our Lupus expert in Boulder, CO. We use functional medicine to balance your system.",
    introImage: {
      src: "/images/migrated/lupus/Untitled-design-12-768x512-1.jpg",
      alt: "Woman experiencing joint pain, a common symptom of lupus",
    },
    whatIsHeading: "What is Lupus?",
    whatIsParagraphs: [
      "Lupus is a chronic disease that can cause inflammation and pain in any part of your body. It's an autoimmune disease, meaning the immune system attacks healthy tissue. The main types of lupus are systemic lupus erythematosus (SLE), discoid lupus, drug induced lupus, and neonatal lupus. SLE is considered the most common kind of lupus and the most serious form as well.",
      "Nearly 1.5 million people in the U.S. suffer from lupus. People of African, Asian, and Native American descent are more likely to develop lupus than are Caucasians. 90% of people diagnosed with the disease are women.",
    ],
    symptoms: {
      heading: "Lupus Symptoms",
      lead: "Do you suspect or know that you have lupus? You may experience symptoms such as these:",
      items: [
        "Muscle and joint pain",
        "Fever",
        "Rashes (malar \u201Cbutterfly\u201D type)",
        "Chest pain",
        "Hair loss",
        "Sun or light sensitivity",
        "Kidney problems",
        "Mouth sores",
        "Prolonged or extreme fatigue",
        "Anemia",
        "Memory problems",
        "Blood clotting",
        "Eye disease",
        "Anxiety",
      ],
    },
    triggers: {
      heading: "Triggers for Lupus",
      lead: "What can trigger or fuel lupus?",
      items: ["Insulin resistance", "Gluten sensitivity", "Impaired detoxification", "Mucosal infections in the gut or sinus tract", "Chemical exposure", "Low vitamin D", "Hormonal imbalances", "Cortisol/Stress response", "Trauma"],
    },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [...ROOT_CAUSE_INTRO_HELP_PARAGRAPHS],
    ctaImage: {
      src: "/images/migrated/lupus/large-19.webp",
      alt: "Illustration representing lupus affecting multiple organs",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed they begin to target organs. This is why medication may help symptoms but it can never resolve your condition.",
    ],
  },
  {
    slug: "sjogrens-syndrome",
    name: "Sjögren's Syndrome",
    heroDescription:
      "We help patients with Sjögren's Syndrome feel better every day. Learn how our natural approach can reduce your symptoms.",
    introImage: {
      src: "/images/migrated/sjogrens-syndrome/Untitled-design-4.jpg",
      alt: "Illustration of dry eyes, a hallmark symptom of Sjögren's syndrome",
    },
    whatIsHeading: "What is Sjögren's Syndrome?",
    whatIsParagraphs: [
      "Sjögren's syndrome is a chronic autoimmune disease that affects as many as 4 million Americans. It is often found in conjunction with other autoimmune diseases or related conditions, commonly Raynaud's phenomenon.",
      "Diagnosing Sjögren's can be difficult as the symptoms overlap with many other conditions and there is not one single test to confirm this condition's presence. A combination of laboratory testing and symptom-reporting is currently used to classify Sjögren's, but further research is needed to determine exact diagnostic criteria.",
    ],
    symptoms: {
      heading: "Sjögren's Syndrome Symptoms",
      lead: "Do you suspect or know that you have Sjögren's syndrome? You may experience symptoms such as these:",
      items: [
        "Dry eyes and mouth",
        "Fatigue",
        "Joint or muscle pain",
        "Inability to focus or \u2018brain fog\u2019",
        "Dry nose, recurrent sinusitis, nosebleeds",
        "Dry or peeling lips",
        "Respiratory issues like shortness of breath, cough",
        "Vaginal dryness",
        "Anxiety and depression",
      ],
    },
    triggers: { heading: "Triggers for Sjögren's Syndrome", lead: "What can trigger or fuel Sjögren's syndrome?", items: STANDARD_TRIGGERS },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "Treatments for Sjögren's may include non-steroidal anti-inflammatories (NSAIDS), corticosteroids, disease-modifying anti-rheumatic drugs (DMARDs), biologics, and symptom-suppressing drugs for treating dry eyes and mouth. Each of these treatments, though helpful, incur their own array of risks, especially NSAIDS.",
      "It can be frustrating trying to find help with chronic and complex conditions, which is why we have chosen to dedicate our practice to exactly that. Instead of treating the symptoms, the functional medicine approach focuses on uncovering the causes.",
      "All autoimmune diseases start in the gut. We design custom plans of dietary intervention, supplements and lifestyle recommendations to help heal the gut and support the immune system. In supporting these fundamental functions of the digestive tract we can reduce inflammation and see dramatic changes in symptoms.",
    ],
    ctaImage: {
      src: "/images/migrated/sjogrens-syndrome/full-shot-sad-woman-holding-pillow-bed-scaled.jpg",
      alt: "Woman resting in bed due to fatigue from Sjögren's syndrome",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and antibodies are created against our own tissue.",
    ],
  },
  {
    slug: "anxiety-depression",
    name: "Anxiety & Depression",
    heroDescription:
      "Tired of feeling low? Dr. Autoimmune helps you find the physical causes of anxiety and depression through nutrition and balance.",
    introImage: {
      src: "/images/migrated/anxiety-depression/Untitled-design-13-768x512-1-1.jpg",
      alt: "Person experiencing anxiety and depression",
    },
    whatIsHeading: "Anxiety & Depression",
    whatIsParagraphs: [
      "Are you one of the millions of Americans suffering from a mental illness that affects your ability to function well in your everyday life? Anxiety and depression can be signs of an underlying imbalance or even an autoimmune disease.",
    ],
    leadInBullets: {
      heading: "What if you could\u2026",
      items: [
        "Address the actual cause of your depression or anxiety safely and effectively?",
        "Take control of your life?",
        "Transform your body, your brain, and your experience with an effective, integrative, functional medicine approach to healing?",
      ],
    },
    // Preserved exactly as-is on the live site — see file header note.
    helpHeading: "Triggers for Sjögren's Syndrome",
    helpParagraphs: [
      "There is hope for happiness. It takes courage and commitment as well as powerful knowledge, support, and tools from an expert. Dr. Autoimmune and his team incorporate functional medicine, functional neurology, functional nutrition, brain mapping, neurofeedback and customized chiropractic care to help people with both depression and anxiety.",
      "Our featured service for depression and anxiety is neurofeedback. Neurofeedback training works on the root of the problem, altering the brain patterns that may be causing depression and anxiety. This program can restore healthy brain wave patterns and bring lasting brain changes. It is non-invasive and does not have negative side effects, making it a very powerful tool in the battle against depression.",
      "Those with depression and/or anxiety usually notice improvement after only a few sessions, but for the brain to fully learn how to make healthier patterns consistently, a number of brain training sessions are required. We usually recommend 20-40. With practice, the brain learns to make these healthy patterns on its own and regulate mood independently. Neurofeedback can help depression and anxiety sufferers get their lives back and gain control.",
    ],
    showRootCause: false,
    ctaImage: {
      src: "/images/migrated/anxiety-depression/large-14.webp",
      alt: "Neurofeedback therapy session for anxiety and depression",
    },
    gutHeading: "The Gut-Brain Connection",
    gutParagraphs: [
      "Did you know we have a second brain? The second one, called our enteric nervous system, consists of some 100 million neurons that are in the walls of our gut. There are incredibly intricate interconnections between the brain and the gut and the vagus nerve (the nerve responsible for a lot of your thinking and brain function) connected from the top of your stomach, all the way up to your brain.",
      "When your gut is unhappy, stressed, inflamed\u2026your brain is unhappy or stressed. Inflammation in your gut sends signals to your brain, causing similar responses such as inflammation, stress, anxiety, depression and a host of other mental health issues.",
      "By restoring healthy gut function, we can make a huge impact on mental function. This gut-brain connection may be the key to restoring your mental health!",
    ],
    ctaAfterGut: true,
  },
  {
    slug: "adhd-add",
    name: "ADHD / ADD",
    heroDescription:
      "Looking for a different way to manage your ADHD or ADD symptoms? We focus on the root causes of brain fog and distraction.",
    introImage: {
      src: "/images/migrated/adhd-add/Untitled-design-14-768x512-1.jpg",
      alt: "Child struggling to focus, a common sign of ADHD/ADD",
    },
    whatIsHeading: "ADHD & ADD",
    whatIsParagraphs: [
      "Attention deficit disorder (ADD) and attention deficit hyperactivity disorder (ADHD) can be signs of an underlying imbalance. Recent advances in research are helping us understand brains with ADHD, leading to the development of new treatment options that offer the promise of a brighter future for you or your child.",
      "ADD/ADHD spectrum disorders are often thought of as strictly brain-related. Treatments for these disorders are often focused on reducing symptoms. However, there is a strong link to what is happening in the brain to what is happening in the gut. Our functional medicine approach focuses on identifying the root causes behind brain-related issues.",
    ],
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "There is hope for happiness. It takes courage and commitment as well as powerful knowledge, support, and tools from an expert. Dr. Autoimmune and his team incorporate functional medicine, functional neurology, functional nutrition, brain mapping, neurofeedback and customized chiropractic care to help people with brain-based disorders.",
      "Our featured service for ADHD/ADD is neurofeedback. Neurofeedback training works on the root of the problem, altering the brain patterns that may be worsening attention issues. This program can restore healthy brain wave patterns and bring lasting brain changes. It is non-invasive and does not have negative side effects, making it a very powerful tool in the battle against ADHD.",
      "Those with ADHD usually notice improvement after only a few sessions, but for the brain to fully learn how to make healthier patterns consistently, a number of brain training sessions are required. We usually recommend 20-40. With practice, the brain learns to make these healthy patterns on its own and regulate mood independently. Neurofeedback can help ADHD sufferers get their lives back and gain control.",
    ],
    showRootCause: false,
    ctaImage: {
      src: "/images/migrated/adhd-add/HowDoesADHDAffectRelationships_.webp",
      alt: "Man with a pained expression holding his head, surrounded by chaotic lines and question marks",
    },
    gutHeading: "The Gut-Brain Connection",
    gutParagraphs: [
      "Did you know we have a second brain? The second one, called our enteric nervous system, consists of some 100 million neurons that are in the walls of our gut. There are incredibly intricate interconnections between the brain and the gut and the vagus nerve (the nerve responsible for a lot of your thinking and brain function) connected from the top of your stomach, all the way up to your brain.",
      "When your gut is unhappy, stressed, inflamed\u2026your brain is unhappy or stressed. Inflammation in your gut sends signals to your brain, causing similar responses such as inflammation, stress, anxiety, depression and a host of other mental health issues.",
      "By restoring healthy gut function, we can make a huge impact on mental function. This gut-brain connection may be the key to restoring your mental health!",
    ],
    ctaAfterGut: true,
  },
  {
    slug: "other-autoimmune-conditions",
    name: "Other Autoimmune Conditions",
    heroDescription:
      "Don't see your condition listed? We help with various immune problems using a functional approach.",
    introImage: {
      src: "/images/migrated/other-autoimmune-conditions/Untitled-design-15-768x512-1.jpg",
      alt: "Person managing symptoms of a rare autoimmune condition",
    },
    whatIsHeading: "Over 100 Autoimmune Diseases",
    whatIsParagraphs: [
      "Our specialty is autoimmunity. Whether you know or suspect that you have an autoimmune condition, we can help you achieve your wellness goals. All autoimmune diseases develop through very similar patterns and we are very familiar with these processes.",
      "Immunology, rheumatology or endocrinology specialists may have training in specific disorders, but they lack any tools except pharmaceutical or surgical and typically down-play natural medicine as a viable alternative. Here is a list of autoimmune conditions we have worked with in our 12 years of autoimmune specialization:",
    ],
    whatIsBullets: [
      "Stiff person syndrome (SPS)",
      "Primary biliary cholangitis",
      "Dermatomyositis",
      "Polymyositis",
      "Cardiolipin induced cardiomyopathy",
      "Mixed connective tissue disorders",
      "Scleroderma",
      "Optic neuritis",
      "Psoriasis and psoriatic arthritis",
      "Ankylosing spondylitis",
      "Fibromyalgia",
      "Chronic fatigue syndrome / Myalgic encephalitis",
      "Giant cell arteritis",
      "Immune thrombocytopenic purpura",
      "Inclusion body myositis",
      "Lichen planus",
      "Polymyalgia rheumatica",
      "Granulomatosis with Polyangiitis",
      "Pernicious anemia",
      "Meniere's",
      "Restless leg syndrome",
      "Uveitis",
      "Vasculitis",
      "Vitiligo",
      "PANDAS",
    ],
    triggers: {
      heading: "Common Autoimmune Triggers",
      lead: "Your DNA loads the gun, but your environment pulls the trigger. What are some of the most common triggers for autoimmune disease?",
      items: STANDARD_TRIGGERS,
    },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [...ROOT_CAUSE_INTRO_HELP_PARAGRAPHS],
    ctaImage: {
      src: "/images/migrated/other-autoimmune-conditions/image-6.jpeg",
      alt: "Woman grimacing in pain while rubbing her neck and shoulder",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and as antibodies are formed they begin to target organs. This is why medication may help symptoms but it can never resolve your condition.",
    ],
    ctaAfterGut: true,
  },
  {
    slug: "raynauds-phenomenon",
    name: "Raynaud's Phenomenon",
    heroDescription:
      "Tired of cold hands and feet? We help manage Raynaud's Phenomenon by improving your circulation and immune health.",
    introImage: {
      src: "/images/migrated/raynauds-phenomenon/1800x1200_raynauds_disease_and_raynauds_syndrome_bigbead.webp",
      alt: "Fingers affected by Raynaud's phenomenon turning pale from cold exposure",
    },
    whatIsHeading: "What is Raynaud's Phenomenon?",
    whatIsParagraphs: [
      "Raynaud's phenomenon is a condition that can occur on its own (known as primary Raynaud's), or it can be a sign of an underlying autoimmune disease (known as secondary Raynaud's). It is estimated to affect an average of 6.5% of people (8-10% of women and 3-5% of men). It is commonly associated with Sjögren's Syndrome.",
      "Raynaud's affects the arteries and blood vessels, causing vascular \u2018spasms\u2019 that restrict blood flow to extremities such as the ears, toes, and nose. These spasms can be triggered by mild cold or even emotional distress.",
    ],
    symptoms: {
      heading: "Raynaud's Phenomenon Symptoms",
      lead: "Do you suspect or know that you have Raynaud's phenomenon? You may experience symptoms such as these:",
      items: [
        "Sensitivity to cold in ears, toes, nipples, knees, or nose",
        "Fingers that turn pale or white then blue when exposed to cold, or during stress or emotional upset, then red when the hands are warmed",
        "Hands that may become swollen and painful when warmed",
      ],
    },
    triggers: { heading: "Triggers for Raynaud's Phenomenon", lead: "What can trigger or fuel Raynaud's phenomenon?", items: STANDARD_TRIGGERS },
    helpHeading: "How Can Dr. Autoimmune Help?",
    helpParagraphs: [
      "It can be frustrating trying to find help with chronic and complex conditions, which is why we have chosen to dedicate our practice to exactly that. Instead of treating the symptoms, the functional medicine approach focuses on uncovering the causes.",
      "All autoimmune diseases start in the gut. We design custom plans of dietary intervention, supplements and lifestyle recommendations to help heal the gut and support the immune system. In supporting these fundamental functions of the digestive tract we can reduce inflammation and see dramatic changes in symptoms.",
    ],
    ctaImage: {
      src: "/images/migrated/raynauds-phenomenon/has-anyone-had-raynauds-for-most-of-their-life-has-it-v0-wnsfhlzan4oc1-scaled.jpg",
      alt: "Person with cold, discolored fingers due to Raynaud's phenomenon",
    },
    gutHeading: "It All Starts in the Gut!",
    gutParagraphs: [
      GUT_INTRO_PARAGRAPH,
      "Proteins called \u201Ctight junctions\u201D prevent a flood of material into the gut. Low vitamin D levels coupled with inflammation in the gut starts to widen the space between cells, allowing materials (bacteria and food) to start seeping through. This triggers inflammation and antibodies are formed against your own tissue.",
    ],
  },
];

export function getConditionData(slug: string): ConditionPageData | undefined {
  return CONDITIONS.find((c) => c.slug === slug);
}

/**
 * Deterministically picks the next `count` conditions after `slug` in the
 * shared `CONDITIONS` order (wrapping around), for a "Related Conditions"
 * cross-link block. Deterministic (no `Math.random`) so server and client
 * render identically and there's no hydration mismatch.
 */
export function getRelatedConditions(slug: string, count = 3): ConditionPageData[] {
  const index = CONDITIONS.findIndex((c) => c.slug === slug);
  if (index === -1) return CONDITIONS.slice(0, count);
  const related: ConditionPageData[] = [];
  for (let i = 1; related.length < count && i <= CONDITIONS.length; i++) {
    const candidate = CONDITIONS[(index + i) % CONDITIONS.length];
    if (candidate.slug !== slug) related.push(candidate);
  }
  return related;
}
