/**
 * Substantive expansions for the ~500-word condition templates.
 * Medically careful: no unverifiable outcomes, cure claims, or invented stats.
 * Facts that appear here already exist on the site (Boulder base, telehealth,
 * functional medicine / gut focus, neurofeedback for ADHD/anxiety, 83+ marker panels).
 */

export type ConditionFaq = {
  question: string;
  answer: string[];
};

export type ConditionLink = {
  href: string;
  label: string;
};

export type ConditionEnrichment = {
  pageTitle?: string;
  metaDescription?: string;
  /** Optional H1 override used in the hero for keyword targeting. */
  displayName?: string;
  labs?: {
    heading: string;
    lead?: string;
    items: string[];
  };
  conventional?: {
    heading: string;
    paragraphs: string[];
  };
  approach?: {
    heading: string;
    paragraphs: string[];
  };
  boulder?: {
    heading: string;
    paragraphs: string[];
  };
  faqs: ConditionFaq[];
  relatedLearn: ConditionLink[];
  relatedBlog: ConditionLink[];
};

const SHARED_BOULDER = (condition: string): ConditionEnrichment["boulder"] => ({
  heading: `${condition} Care in Boulder, Colorado — and Nationwide by Telehealth`,
  paragraphs: [
    `Dr. Autoimmune is based in Boulder, Colorado, and delivers care entirely by telehealth so patients across Colorado and the United States can work with the team without travel.`,
    `Lab draws are coordinated at a facility convenient to where you live. Discovery calls and evaluations happen by secure video. If you are searching for a ${condition.toLowerCase()} specialist in Boulder, start on this page and the homepage. Denver metro patients can read how visits work with the Boulder clinic on the Denver telehealth page, then book a discovery call to confirm fit alongside any specialists you already see.`,
  ],
});

export const CONDITION_ENRICHMENT: Record<string, ConditionEnrichment> = {
  "thyroid-conditions": {
    pageTitle: "Thyroid Conditions | Functional Medicine Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine care for Hashimoto's, Graves', and other thyroid conditions from Boulder, CO. Learn symptoms, labs beyond TSH, and telehealth next steps.",
    displayName: "Thyroid Conditions Functional Medicine Care",
    labs: {
      heading: "Thyroid Labs Worth Reviewing Beyond TSH",
      lead: "A single TSH result rarely tells the full story. A fuller thyroid panel may include:",
      items: [
        "TSH, free T4, and free T3",
        "Thyroid peroxidase (TPO) and thyroglobulin (TgAb) antibodies",
        "Reverse T3 when conversion questions arise",
        "Nutrient markers that commonly affect thyroid function (vitamin D, ferritin, B12)",
      ],
    },
    conventional: {
      heading: "How Conventional Care Usually Approaches Thyroid Disease",
      paragraphs: [
        "Endocrinology typically focuses on confirming hypo- or hyperthyroidism, monitoring TSH, and using thyroid hormone replacement or antithyroid medication when needed. That care is essential when hormone levels are dangerous or unstable.",
        "Many patients still feel unwell with a “normal” TSH. Functional medicine does not replace endocrine care — it looks at gut health, nutrient status, immune triggers, and lifestyle factors that may keep symptoms going after the numbers stabilize.",
      ],
    },
    approach: {
      heading: "Our Functional Medicine Approach to Thyroid Conditions",
      paragraphs: [
        "We review your full symptom timeline, prior labs, and medications, then order or interpret a broader panel when gaps exist. Care plans often emphasize gut repair, food triggers (including gluten when indicated), and nutrient repletion alongside coordination with your prescribing clinician.",
        "Hashimoto’s and Graves’ each have dedicated pages on this site. Use this hub to understand the thyroid landscape, then dig into the condition that matches your diagnosis.",
      ],
    },
    boulder: SHARED_BOULDER("Thyroid"),
    faqs: [
      {
        question: "Can I have thyroid symptoms with a normal TSH?",
        answer: [
          "Yes. TSH is only one marker. Free T4, free T3, antibodies, and nutrient status can help explain fatigue, brain fog, hair loss, or temperature intolerance when TSH looks normal. See our article on symptoms with a normal TSH for a deeper walkthrough.",
        ],
      },
      {
        question: "Do you treat both Hashimoto’s and Graves’?",
        answer: [
          "Yes. We support patients with autoimmune thyroid disease through root-cause evaluation, gut-focused plans, and telehealth follow-up. Medication changes remain under the clinician who manages your prescriptions.",
        ],
      },
      {
        question: "Is thyroid care available by telehealth from Boulder?",
        answer: [
          "Yes. Visits are remote. Blood draws happen locally, and results are reviewed by video with the clinical team.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/what-type-of-doctor-treats-autoimmune-disease/", label: "What type of doctor treats autoimmune disease?" },
      { href: "/learn/how-to-choose-an-autoimmune-disease-specialist/", label: "How to choose an autoimmune specialist" },
    ],
    relatedBlog: [
      { href: "/why-do-i-still-have-symptoms-when-my-tsh-is-normal/", label: "Why symptoms persist when TSH is normal" },
      { href: "/what-high-tsh-levels-actually-mean-why-thyroid-medication-isnt-always-the-answer/", label: "What high TSH levels actually mean" },
      { href: "/hashimotos-thyroiditis-graves/", label: "Hashimoto’s Thyroiditis" },
      { href: "/graves-disease/", label: "Graves’ Disease" },
    ],
  },

  "hashimotos-thyroiditis-graves": {
    pageTitle: "Hashimoto’s Thyroiditis Functional Medicine | Boulder | Dr. Autoimmune",
    metaDescription:
      "Hashimoto’s thyroiditis care with functional medicine in Boulder, CO. Learn TPO/TgAb labs, nutrient gaps, gut triggers, and telehealth evaluation options.",
    displayName: "Hashimoto’s Thyroiditis Functional Medicine Care",
    labs: {
      heading: "Hashimoto’s Labs We Commonly Review",
      items: [
        "TSH, free T4, free T3",
        "TPO antibodies and thyroglobulin antibodies (TgAb)",
        "Ferritin, vitamin D, B12, and related nutrient markers",
        "Inflammatory and gut-related markers when symptoms point that direction",
      ],
    },
    conventional: {
      heading: "Conventional Hashimoto’s Care vs Root-Cause Support",
      paragraphs: [
        "Standard care monitors thyroid hormone levels and uses levothyroxine or similar replacement when hypothyroidism is present. Antibody levels confirm autoimmune thyroiditis but are not always tracked closely once replacement starts.",
        "Functional medicine asks why the immune system is targeting thyroid tissue — looking at intestinal permeability, food triggers, infections, mold exposure, and nutrient deficiencies that commonly accompany Hashimoto’s.",
      ],
    },
    approach: {
      heading: "How We Approach Hashimoto’s",
      paragraphs: [
        "Your evaluation reviews antibody history, symptom patterns (fatigue, cold intolerance, hair loss, brain fog), and gut symptoms. Plans may include dietary guidance, gut support, and nutrient repletion while you continue working with the clinician who manages thyroid medication.",
        "This page focuses on Hashimoto’s. For overactive autoimmune thyroid disease, see our Graves’ disease page.",
      ],
    },
    boulder: SHARED_BOULDER("Hashimoto’s"),
    faqs: [
      {
        question: "Do high TPO antibodies mean I need medication immediately?",
        answer: [
          "Antibody results confirm autoimmune activity, but medication decisions are based on hormone levels, symptoms, and your clinician’s judgment. We help interpret the bigger picture and address root-cause drivers alongside that care.",
        ],
      },
      {
        question: "Can gut health affect Hashimoto’s?",
        answer: [
          "Gut inflammation and intestinal permeability are frequently discussed in functional medicine as contributors to autoimmune thyroid activity. We evaluate digestive symptoms and related labs when building a plan.",
        ],
      },
      {
        question: "Is this page only about Hashimoto’s, or also Graves’?",
        answer: [
          "This page is Hashimoto’s-focused. Graves’ disease has its own dedicated page covering hyperthyroid symptoms, eye findings, and related labs.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/ana-titer-levels-explained/", label: "ANA titer levels explained" },
      { href: "/learn/autoimmune-protocol-diet/", label: "Autoimmune protocol (AIP) diet guide" },
    ],
    relatedBlog: [
      { href: "/nutritional-deficiencies-in-hashimotos-understanding-prevention-support/", label: "Nutritional deficiencies in Hashimoto’s" },
      { href: "/why-do-i-still-have-symptoms-when-my-tsh-is-normal/", label: "Symptoms when TSH is normal" },
      { href: "/graves-disease/", label: "Graves’ Disease" },
    ],
  },

  "graves-disease": {
    pageTitle: "Graves’ Disease Natural & Functional Care | Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine support for Graves’ disease from Boulder, CO. Learn TRAb/TSI labs, eye symptoms, root-cause drivers, and telehealth next steps.",
    displayName: "Graves’ Disease Functional Medicine Care",
    labs: {
      heading: "Labs Often Relevant in Graves’ Disease",
      lead: "Hyperthyroid numbers and antibody patterns tell different parts of the story. We review what you already have and note gaps before ordering more:",
      items: [
        "TSH, free T4, free T3 — and how they track with symptoms over time",
        "TSH receptor antibodies (TRAb) / thyroid-stimulating immunoglobulin (TSI)",
        "Eye symptom history and ophthalmology notes when orbitopathy is present",
        "Nutrient and stress-related markers that may influence recovery (for example vitamin D, ferritin, B12 when clinically relevant)",
        "Prior ECG or heart-rate notes if palpitations or tachycardia were documented",
      ],
    },
    conventional: {
      heading: "Conventional Graves’ Treatment and Where We Fit",
      paragraphs: [
        "Endocrinology manages hyperthyroidism with antithyroid medication, radioactive iodine, or surgery when indicated, and monitors for thyroid eye disease. Those decisions are critical when heart rate, weight loss, or eye changes are significant.",
        "Functional medicine support focuses on immune and gut drivers, nutrient status, and lifestyle stressors while you remain under endocrine supervision for hormone control.",
        "Graves’ is driven by antibodies that stimulate the TSH receptor. That mechanism explains why people can feel wired, heat-intolerant, and anxious even after they understand the diagnosis — the immune signal and the hormone load are both part of the picture.",
      ],
    },
    approach: {
      heading: "Our Approach to Graves’ Disease",
      paragraphs: [
        "We review antibody results, symptom timeline, sleep, stress load, and digestive health. Care plans are individualized and coordinated with your prescribing clinician — we do not replace urgent endocrine management.",
        "What testing looks like here: telehealth history from our Boulder-based practice, review of endocrine labs and notes, and local draw sites for any additional panel we agree is useful. What to expect after the first visits is a clearer map of what is endocrine-managed, what is worth investigating as a root-cause contributor, and which symptoms should trigger a same-week call to your endocrinologist or urgent care.",
        "We will not ask you to stop antithyroid medication because a supplement plan sounds gentler. We will not promise a timeline for antibody decline. The useful outcome of a functional medicine evaluation is a written sense of next labs, lifestyle priorities, and how to keep your endocrine team in the loop.",
      ],
    },
    boulder: SHARED_BOULDER("Graves’"),
    faqs: [
      {
        question: "Can functional medicine replace antithyroid medication?",
        answer: [
          "No. Medication, radioactive iodine, or surgery decisions belong with your endocrinologist. We work on root-cause factors and overall resilience alongside that care.",
        ],
      },
      {
        question: "Do you help with Graves’ eye symptoms?",
        answer: [
          "We take eye symptoms seriously and encourage ophthalmology involvement when needed. Our role is supporting systemic drivers — not replacing specialty eye care.",
        ],
      },
      {
        question: "What should I bring to a Graves’ telehealth evaluation?",
        answer: [
          "Recent TSH/free T4/free T3 and TRAb or TSI results with reference ranges, a medication list with doses, eye or cardiology notes if you have them, and a timeline of when symptoms started relative to diagnosis and treatment changes.",
        ],
      },
      {
        question: "Is this different from the Hashimoto’s page?",
        answer: [
          "Yes. This page is Graves’-focused (typically hyperthyroid patterns and TSH-receptor antibodies). Hashimoto’s has its own guide covering hypothyroidism and TPO/TgAb patterns. Many people compare both; use the page that matches your diagnosis and labs.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/what-type-of-doctor-treats-autoimmune-disease/", label: "What type of doctor treats autoimmune disease?" },
      { href: "/areas-we-serve/colorado/denver/", label: "Denver patients: how telehealth works" },
    ],
    relatedBlog: [
      { href: "/thyroid-conditions/", label: "Thyroid conditions hub" },
      { href: "/hashimotos-thyroiditis-graves/", label: "Hashimoto’s Thyroiditis" },
      { href: "/what-high-tsh-levels-actually-mean-why-thyroid-medication-isnt-always-the-answer/", label: "High TSH explained" },
      { href: "/why-do-i-still-have-symptoms-when-my-tsh-is-normal/", label: "Symptoms when TSH looks normal" },
    ],
  },

  "rheumatoid-arthritis": {
    pageTitle: "Rheumatoid Arthritis Functional Medicine | Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine support for rheumatoid arthritis from Boulder, CO. Learn symptoms, common labs, gut-immune drivers, and telehealth evaluation options.",
    displayName: "Rheumatoid Arthritis Functional Medicine Care",
    labs: {
      heading: "RA-Related Labs We May Review",
      lead: "We interpret rheumatology workups alongside broader patterns rather than treating any single antibody in isolation:",
      items: [
        "Rheumatoid factor (RF) and anti-CCP antibodies",
        "ESR and CRP inflammatory markers",
        "Complete blood count and metabolic panels from your rheumatologist",
        "Gut and nutrient markers when symptoms suggest deeper drivers",
        "Prior imaging or joint exam notes that clarify which areas are actively inflamed",
      ],
    },
    conventional: {
      heading: "Rheumatology Care and Functional Medicine Together",
      paragraphs: [
        "Rheumatologists diagnose RA and prescribe disease-modifying medications that protect joints. That care saves function and should not be delayed when inflammatory arthritis is active.",
        "Functional medicine explores gut health, food triggers, infections, and lifestyle factors that may amplify inflammation while you continue rheumatology treatment.",
        "RA is an immune-driven attack on synovial tissue. Understanding mechanisms — citrullinated protein antibodies, innate immune activation, and systemic inflammation — helps explain why joint swelling can travel with fatigue, brain fog, or digestive flares even when a single joint exam looks quieter.",
      ],
    },
    approach: {
      heading: "How We Support Rheumatoid Arthritis",
      paragraphs: [
        "Evaluations review joint patterns, fatigue, digestive symptoms, and prior labs. Plans emphasize root-cause investigation and practical lifestyle support — never as a substitute for DMARD or biologic therapy when those are indicated.",
        "What testing looks like in our model: we review RF, anti-CCP, ESR/CRP, and the story your rheumatologist has already built, then fill gaps with gut, nutrient, and inflammatory context when clinically relevant. Draws for broader panels can be coordinated locally while visits remain telehealth from Boulder.",
        "What to expect: a careful history of which joints flare, morning stiffness, food or stress triggers, and gut symptoms; a plan that respects your current medications; and follow-up that adjusts nutrition, lifestyle, and supportive therapies as markers and symptoms change. We do not promise remission or medication discontinuation.",
      ],
    },
    boulder: SHARED_BOULDER("Rheumatoid arthritis"),
    faqs: [
      {
        question: "Do I need a rheumatologist if I work with Dr. Autoimmune?",
        answer: [
          "If inflammatory arthritis is suspected or confirmed, a rheumatologist should be part of your team. We coordinate alongside specialty care rather than replacing it.",
        ],
      },
      {
        question: "Can diet help rheumatoid arthritis symptoms?",
        answer: [
          "Many patients explore anti-inflammatory or elimination-style diets, including autoimmune protocol patterns. We individualize dietary guidance based on your history and labs rather than one generic plan.",
        ],
      },
      {
        question: "What does a functional medicine evaluation for RA usually cover?",
        answer: [
          "We map joint and systemic symptoms, review rheumatology labs and treatments, and look for modifiable drivers such as gut inflammation, nutrient gaps, and lifestyle stressors. Package and visit details are confirmed during scheduling.",
        ],
      },
      {
        question: "Can Denver patients with RA use telehealth?",
        answer: [
          "Yes. Care is delivered by telehealth from Boulder with local lab draws. Denver metro patients can read how Front Range visits work on our Denver page, then book a discovery call to confirm fit alongside rheumatology care.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/functional-medicine-vs-rheumatologist-what-to-expect/", label: "Functional medicine vs rheumatologist" },
      { href: "/learn/autoimmune-protocol-diet/", label: "Autoimmune protocol diet guide" },
      { href: "/areas-we-serve/colorado/denver/", label: "Denver patients: Boulder telehealth for RA support" },
    ],
    relatedBlog: [
      { href: "/what-high-crp-reveals-about-chronic-inflammation/", label: "What high CRP reveals about inflammation" },
      { href: "/signs-gut-may-be-driving-autoimmune-flares/", label: "Gut signs driving autoimmune flares" },
    ],
  },

  "type-1-diabetes": {
    pageTitle: "Type 1 Diabetes Functional Medicine Support | Boulder | Dr. Autoimmune",
    metaDescription:
      "Root-cause functional medicine support for type 1 diabetes from Boulder, CO. Learn autoimmune drivers, gut connections, and telehealth care coordination.",
    displayName: "Type 1 Diabetes Functional Medicine Support",
    labs: {
      heading: "Markers Often Reviewed Alongside Glucose Management",
      items: [
        "Diabetes-related autoantibodies from your endocrinology workup",
        "HbA1c and glucose trends from your care team",
        "Nutrient status and inflammatory markers when relevant",
        "Digestive and microbiome-related testing when gut symptoms are present",
      ],
    },
    conventional: {
      heading: "Endocrine Management Remains Essential",
      paragraphs: [
        "Type 1 diabetes requires insulin and ongoing endocrine monitoring. Functional medicine does not replace insulin therapy.",
        "We focus on immune and gut factors, nutrient support, and lifestyle patterns that may influence how well you feel day to day while insulin management continues with your diabetes team.",
      ],
    },
    approach: {
      heading: "Our Supportive Approach",
      paragraphs: [
        "After reviewing your history and labs, we look for modifiable drivers — gut inflammation, food reactions, stress physiology, and nutrient gaps — and build a plan that respects your insulin regimen.",
      ],
    },
    boulder: SHARED_BOULDER("Type 1 diabetes"),
    faqs: [
      {
        question: "Can functional medicine reverse type 1 diabetes?",
        answer: [
          "Type 1 diabetes is an autoimmune condition that requires insulin. We do not claim reversal. Our work supports overall resilience and root-cause factors alongside endocrine care.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/what-type-of-doctor-treats-autoimmune-disease/", label: "What type of doctor treats autoimmune disease?" },
    ],
    relatedBlog: [
      { href: "/the-hidden-link-between-gut-health-and-autoimmune-disease/", label: "Gut health and autoimmune disease" },
      { href: "/signs-gut-may-be-driving-autoimmune-flares/", label: "Gut signs and autoimmune flares" },
    ],
  },

  "inflammatory-bowel-disease": {
    pageTitle: "Inflammatory Bowel Disease Functional Medicine | Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine support for Crohn’s and ulcerative colitis from Boulder, CO. Learn symptoms, testing, gut-immune drivers, and telehealth options.",
    displayName: "Inflammatory Bowel Disease Functional Medicine Care",
    labs: {
      heading: "IBD Testing Context We Review",
      lead: "GI specialty records remain the foundation; we add context that explains day-to-day symptoms between scopes:",
      items: [
        "Colonoscopy and pathology notes from your gastroenterologist",
        "Calprotectin and other stool inflammatory markers when available",
        "CRP, anemia panels, and nutrient deficiencies common in IBD",
        "Microbiome or SIBO-related testing when the clinical picture fits",
        "Medication and flare history so supportive plans do not conflict with GI therapy",
      ],
    },
    conventional: {
      heading: "GI Specialty Care Comes First for Active IBD",
      paragraphs: [
        "Gastroenterologists diagnose Crohn’s and ulcerative colitis and manage anti-inflammatory or biologic therapies. Flare care, bleeding, and obstruction risks need specialty oversight.",
        "Functional medicine adds depth on diet, microbiome balance, and lifestyle stressors once the acute picture is stable — or while coordinating with your GI team.",
        "Mechanistically, IBD reflects dysregulated mucosal immunity in genetically susceptible people. Barrier injury, microbial imbalance, and immune signaling can keep symptoms loud even when a treatment plan is otherwise appropriate — which is why root-cause support focuses on terrain, not on replacing biologics.",
      ],
    },
    approach: {
      heading: "How We Approach IBD",
      paragraphs: [
        "We map symptom patterns (diarrhea, constipation, bloating, pain), review prior scopes and labs, and build gut-focused plans that respect your GI medications and monitoring schedule.",
        "What testing looks like: we start with what gastroenterology has already documented, then consider stool inflammation markers, nutrient status, and gut-focused labs when they clarify triggers. Broader blood panels used in the practice (including extensive marker panels coordinated through partners such as Evexia with LabCorp draws) are ordered thoughtfully — not as a substitute for colonoscopy when that is indicated.",
        "What to expect: telehealth visits from our Boulder practice, coordination with your GI team, dietary strategies that may include autoimmune protocol patterns when appropriate, and honest limits — we do not claim to cure Crohn’s or ulcerative colitis.",
      ],
    },
    boulder: SHARED_BOULDER("IBD"),
    faqs: [
      {
        question: "Is IBS the same as IBD?",
        answer: [
          "No. IBD involves visible inflammation and often requires immunosuppression or biologics. IBS is a functional gut disorder. See our learn article on whether IBS is autoimmune for a clear comparison.",
        ],
      },
      {
        question: "Do you work with Crohn’s disease specifically?",
        answer: [
          "Yes. We support Crohn’s and ulcerative colitis patients with root-cause gut evaluation. Read our Crohn’s functional medicine article for a deeper dive.",
        ],
      },
      {
        question: "Can I use telehealth during an IBD flare?",
        answer: [
          "Telehealth can help with history, diet, and lab review, but severe pain, bleeding, fever, or obstruction symptoms need urgent in-person GI or emergency care. We coordinate support around specialty flare management — we do not replace it.",
        ],
      },
      {
        question: "Do Denver patients with IBD need to travel to Boulder?",
        answer: [
          "Visits are remote. Lab draws stay local. Denver metro patients can review Front Range telehealth details on our Denver page before booking a discovery call.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/is-irritable-bowel-syndrome-an-autoimmune-disease/", label: "Is IBS an autoimmune disease?" },
      { href: "/learn/autoimmune-protocol-diet/", label: "Autoimmune protocol diet guide" },
      { href: "/areas-we-serve/colorado/denver/", label: "Denver patients: IBD telehealth from Boulder" },
    ],
    relatedBlog: [
      { href: "/healing-crohns-disease-with-functional-medicine/", label: "Healing Crohn’s with functional medicine" },
      { href: "/leaky-gut-signs-causes-and-functional-fixes/", label: "Leaky gut signs and fixes" },
      { href: "/celiac-disease-and-gluten-intolerance/", label: "Celiac and gluten intolerance" },
    ],
  },

  "celiac-disease-and-gluten-intolerance": {
    pageTitle: "Celiac Disease Doctor & Gluten Intolerance | Boulder | Dr. Autoimmune",
    metaDescription:
      "Celiac disease and non-celiac gluten sensitivity care from Boulder, CO. Learn tTG-IgA testing, biopsy context, NCGS, and functional medicine support.",
    displayName: "Celiac Disease & Gluten Intolerance Care",
    labs: {
      heading: "Gluten-Related Testing Explained",
      items: [
        "Tissue transglutaminase IgA (tTG-IgA) and total IgA",
        "Endomysial antibodies and deamidated gliadin peptides when used",
        "Small-bowel biopsy reports when celiac disease is being confirmed",
        "Evaluation for non-celiac gluten sensitivity when celiac testing is negative but symptoms persist",
      ],
    },
    conventional: {
      heading: "Celiac vs Allergy vs Sensitivity",
      paragraphs: [
        "Celiac disease is an autoimmune reaction to gluten confirmed with serology and often biopsy. Wheat allergy is an IgE-mediated allergy. Non-celiac gluten sensitivity involves symptoms with gluten exposure without celiac markers.",
        "A strict gluten-free diet is the foundation of celiac care. Functional medicine also looks at nutrient repletion, gut repair, and coexisting immune issues after gluten is removed.",
      ],
    },
    approach: {
      heading: "Our Approach to Gluten-Related Disorders",
      paragraphs: [
        "We clarify which gluten disorder fits your labs, review nutrient gaps common after malabsorption, and support gut healing while you maintain the dietary restrictions your diagnosis requires.",
      ],
    },
    boulder: SHARED_BOULDER("Celiac and gluten-related"),
    faqs: [
      {
        question: "Should I stop eating gluten before celiac testing?",
        answer: [
          "If celiac testing is planned, ask your clinician before removing gluten — many antibody and biopsy tests are more accurate while gluten is still in the diet.",
        ],
      },
      {
        question: "Is gluten sensitivity the same as celiac disease?",
        answer: [
          "No. Celiac disease is autoimmune and diagnosed with specific labs and often biopsy. Sensitivity can cause real symptoms without those markers. Treatment still often includes gluten avoidance, but the diagnostic path differs.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/is-irritable-bowel-syndrome-an-autoimmune-disease/", label: "IBS vs autoimmune gut disease" },
      { href: "/learn/autoimmune-protocol-diet/", label: "Autoimmune protocol diet guide" },
    ],
    relatedBlog: [
      { href: "/leaky-gut-signs-causes-and-functional-fixes/", label: "Leaky gut guide" },
      { href: "/a-guide-to-dysbiosis-autoimmunity/", label: "Dysbiosis and autoimmunity" },
      { href: "/the-hidden-link-between-gut-health-and-autoimmune-disease/", label: "Autoimmune diseases of the digestive system" },
    ],
  },

  "multiple-sclerosis": {
    pageTitle: "Multiple Sclerosis Specialist Support | Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine support for multiple sclerosis from Boulder, CO. Learn symptom patterns, root-cause evaluation, and telehealth care alongside neurology.",
    displayName: "Multiple Sclerosis Functional Medicine Support",
    labs: {
      heading: "Records We Review With MS Patients",
      lead: "Neurology documentation anchors the diagnosis; we add systemic context that often shapes daily energy and gut symptoms:",
      items: [
        "Neurology notes and MRI summaries",
        "Vitamin D and related nutrient status",
        "Inflammatory and gut-related markers when clinically relevant",
        "Medication and relapse history from your neurology team",
        "Thyroid and metabolic markers when fatigue or brain fog overlap with other patterns",
      ],
    },
    conventional: {
      heading: "Neurology Leads Disease-Modifying Therapy",
      paragraphs: [
        "Neurologists diagnose MS and manage disease-modifying therapies. Functional medicine does not replace that specialty care.",
        "We support fatigue, gut symptoms, nutrient status, and lifestyle factors that affect day-to-day function while neurology directs MS-specific treatment.",
        "MS involves immune-mediated injury to myelin in the central nervous system. Relapsing and progressive patterns differ, but both can be influenced by infection history, vitamin D status, gut-immune signaling, and lifestyle stressors — areas where root-cause evaluation can add complementary support without claiming to reverse MRI lesions.",
      ],
    },
    approach: {
      heading: "How We Support People With MS",
      paragraphs: [
        "Evaluations emphasize whole-person history, gut-immune connections, and practical plans that coordinate with your neurologist rather than conflicting with prescribed therapies.",
        "What testing looks like: we review neurology records first, then consider nutrient panels, inflammatory markers, and gut-focused labs when symptoms point that direction. Extensive blood chemistry used elsewhere in the practice is applied selectively and interpreted alongside — not instead of — MRI and CSF findings from neurology.",
        "What to expect: telehealth visits from Boulder, a clear discussion of what functional medicine can address (fatigue terrain, gut, nutrients, lifestyle) versus what belongs with neurology (DMT selection, relapse management), and follow-up that stays respectful of your existing prescriptions.",
      ],
    },
    boulder: SHARED_BOULDER("Multiple sclerosis"),
    faqs: [
      {
        question: "Are you a multiple sclerosis specialist in Boulder?",
        answer: [
          "We are a functional medicine practice supporting autoimmune and neurologic immune conditions, including MS, via telehealth from Boulder. Neurology remains essential for MS diagnosis and disease-modifying therapy.",
        ],
      },
      {
        question: "Can functional medicine replace my MS medication?",
        answer: [
          "No. Disease-modifying therapy decisions belong with your neurologist. We focus on supportive root-cause factors and never advise stopping MS medications without that specialist’s involvement.",
        ],
      },
      {
        question: "What symptoms do MS patients commonly want help with here?",
        answer: [
          "Fatigue, gut symptoms, nutrient questions, and lifestyle patterns that affect day-to-day function are common reasons people seek complementary support while neurology manages MS-specific treatment.",
        ],
      },
      {
        question: "Is MS support available to Denver patients by telehealth?",
        answer: [
          "Yes. Visits are remote with local lab draws. See our Denver patients page for Front Range logistics, then book a discovery call to discuss fit with your neurology plan.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/how-to-choose-an-autoimmune-disease-specialist/", label: "How to choose an autoimmune specialist" },
      { href: "/areas-we-serve/colorado/denver/", label: "Denver patients: MS telehealth support from Boulder" },
    ],
    relatedBlog: [
      { href: "/what-chronic-fatigue-reveals-about-thyroid-health/", label: "Chronic fatigue and thyroid health" },
      { href: "/signs-gut-may-be-driving-autoimmune-flares/", label: "Gut drivers of autoimmune flares" },
    ],
  },

  lupus: {
    pageTitle: "Lupus Specialist Support in Boulder, CO | Dr. Autoimmune",
    metaDescription:
      "Functional medicine support for lupus from Boulder, CO. Learn common symptoms, ANA context, root-cause evaluation, and telehealth next steps.",
    displayName: "Lupus Functional Medicine Support",
    labs: {
      heading: "Lupus-Related Labs We Commonly Discuss",
      lead: "Antibody panels need clinical context. We review rheumatology results and fill systemic gaps that affect how you feel day to day:",
      items: [
        "ANA titer and pattern, plus reflex antibodies (dsDNA, Smith, RNP, SSA/SSB) when available",
        "Complement levels and inflammatory markers from rheumatology workups",
        "Kidney function and urinalysis notes when lupus nephritis is a concern",
        "Nutrient and gut markers that may influence fatigue and flares",
        "Prior flare timelines so labs are interpreted against real symptom seasons, not isolated numbers",
      ],
    },
    conventional: {
      heading: "Rheumatology Remains Central for Lupus",
      paragraphs: [
        "Lupus diagnosis and medication management belong with rheumatology, especially when organs are involved. Functional medicine explores triggers — infections, gut health, sunlight sensitivity patterns, stress, and nutrient status — alongside that care.",
        "Mechanistically, systemic lupus involves loss of immune tolerance with autoantibodies that can affect skin, joints, blood counts, kidneys, and other organs. That complexity is exactly why specialty oversight stays essential and why root-cause work focuses on modifiable drivers rather than promising to “clear” antibodies.",
      ],
    },
    approach: {
      heading: "Our Approach to Lupus Support",
      paragraphs: [
        "We review your antibody history, flare patterns, and digestive or skin clues, then build a root-cause plan that respects your rheumatologist’s treatment.",
        "What testing looks like: ANA and reflex antibodies are interpreted carefully — a positive ANA alone is not a lupus diagnosis. We also review complements, inflammatory markers, kidney notes when relevant, and gut or nutrient labs that may explain fatigue between rheumatology visits.",
        "What to expect: telehealth evaluation from Boulder, coordination with rheumatology, lifestyle and nutrition strategies tailored to your flares, and clear boundaries about emergencies or organ-threatening disease that need in-person specialty care.",
      ],
    },
    boulder: SHARED_BOULDER("Lupus"),
    faqs: [
      {
        question: "Does a positive ANA mean I have lupus?",
        answer: [
          "No. ANA can be positive for many reasons. Specific antibodies, clinical criteria, and rheumatology evaluation determine whether lupus is present. See our ANA guide for more detail.",
        ],
      },
      {
        question: "Do you see lupus patients in Boulder or by telehealth?",
        answer: [
          "Care is delivered by telehealth from our Boulder-based practice to patients across Colorado and nationwide, coordinated with local specialists when needed.",
        ],
      },
      {
        question: "What should I bring to a lupus-focused evaluation?",
        answer: [
          "Antibody reports, rheumatology notes, medication list, and a brief flare diary (skin, joints, fatigue, sun triggers) help us connect mechanisms to your lived pattern without repeating unnecessary testing.",
        ],
      },
      {
        question: "Can Denver patients with lupus work with Dr. Autoimmune remotely?",
        answer: [
          "Yes. Front Range patients use the same telehealth model with local labs. Read our Denver page for logistics, then book a discovery call to confirm fit alongside rheumatology care.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/false-positive-ana-test-causes/", label: "False positive ANA causes" },
      { href: "/learn/ana-titer-levels-explained/", label: "ANA titer levels explained" },
      { href: "/learn/medications-that-can-cause-a-positive-ana-test/", label: "Medications that can cause a positive ANA" },
      { href: "/areas-we-serve/colorado/denver/", label: "Denver patients: lupus telehealth from Boulder" },
    ],
    relatedBlog: [
      { href: "/if-my-ana-is-positive-do-i-have-an-autoimmune-disease/", label: "If my ANA is positive, do I have an autoimmune disease?" },
      { href: "/autoimmune-skin-clues-gut-health-trouble/", label: "Autoimmune skin clues and gut health" },
    ],
  },

  "sjogrens-syndrome": {
    pageTitle: "Sjögren’s Syndrome Natural Treatment Support | Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine support for Sjögren’s syndrome from Boulder, CO. Learn dryness symptoms, antibody context, root-cause care, and telehealth options.",
    displayName: "Sjögren’s Syndrome Functional Medicine Care",
    labs: {
      heading: "Sjögren’s Workup Elements We Review",
      lead: "Dryness evaluations and antibodies tell different parts of the story; we review both when available:",
      items: [
        "SSA/Ro and SSB/La antibodies when available",
        "ANA and related autoimmune panels",
        "Notes on dry eye/dry mouth evaluation from specialists",
        "Nutrient and gut markers that may accompany systemic symptoms",
        "Inflammatory markers and overlapping autoimmune labs when joint pain or Raynaud’s is present",
      ],
    },
    conventional: {
      heading: "Specialty Care for Dryness and Systemic Features",
      paragraphs: [
        "Rheumatology, ophthalmology, and dental specialists often share Sjögren’s care. Functional medicine looks at immune triggers, gut health, and fatigue drivers while those teams manage dryness and organ involvement.",
        "Sjögren’s involves autoimmune injury to moisture-producing glands and can extend to systemic features. Antibody-positive and antibody-negative presentations both exist, which is why dryness exams and clinical criteria matter as much as SSA/SSB results.",
      ],
    },
    approach: {
      heading: "How We Support Sjögren’s",
      paragraphs: [
        "We map dryness, joint pain, fatigue, and digestive symptoms, then build a plan focused on root-cause contributors without interrupting specialty treatments you already use.",
        "What testing looks like: we review SSA/Ro, SSB/La, ANA, and specialist notes on dry eye or dry mouth, then consider nutrient and gut markers that may travel with fatigue or flares. We do not replace slit-lamp exams or dental monitoring.",
        "What to expect: telehealth visits from Boulder, coordination with your rheumatology and eye/dental teams, and supportive strategies for systemic symptoms. Natural-support language on this site means root-cause lifestyle and nutrition work — not a claim that Sjögren’s can be cured without specialty care.",
      ],
    },
    boulder: SHARED_BOULDER("Sjögren’s"),
    faqs: [
      {
        question: "Is Raynaud’s related to Sjögren’s?",
        answer: [
          "Raynaud’s can occur with Sjögren’s and other autoimmune conditions. See our Raynaud’s page if cold-triggered color changes in fingers or toes are part of your story.",
        ],
      },
      {
        question: "Can I have Sjögren’s with negative SSA/SSB antibodies?",
        answer: [
          "Yes. Some people meet clinical criteria without those antibodies. Diagnosis belongs with clinicians who can integrate exam findings, symptoms, and the full lab picture — not with a single test result.",
        ],
      },
      {
        question: "What does functional medicine add if I already use eye drops and see a rheumatologist?",
        answer: [
          "We look at gut, nutrient, inflammatory, and lifestyle drivers that may amplify fatigue and systemic symptoms while you continue dryness and rheumatology care.",
        ],
      },
      {
        question: "Do Denver patients need in-person visits for Sjögren’s support?",
        answer: [
          "Clinical visits with our practice are telehealth. Specialty eye, dental, or rheumatology exams still happen locally as those clinicians recommend. See our Denver page for Front Range telehealth logistics.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/how-to-choose-an-autoimmune-disease-specialist/", label: "How to choose an autoimmune specialist" },
      { href: "/areas-we-serve/colorado/denver/", label: "Denver patients: Sjögren’s telehealth from Boulder" },
    ],
    relatedBlog: [
      { href: "/raynauds-phenomenon/", label: "Raynaud’s Phenomenon" },
      { href: "/if-my-ana-is-positive-do-i-have-an-autoimmune-disease/", label: "Positive ANA guide" },
    ],
  },

  "anxiety-depression": {
    pageTitle: "Anxiety & Depression Root-Cause Care | Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine for anxiety and depression from Boulder, CO. Explore gut-brain links, neurofeedback, lab evaluation, and telehealth support.",
    displayName: "Anxiety & Depression Functional Medicine Care",
    labs: {
      heading: "What We Look At Beyond Mood Alone",
      items: [
        "Thyroid and nutrient markers that can influence mood and energy",
        "Inflammatory markers when systemic symptoms are present",
        "Gut symptoms and related testing when the gut-brain axis is involved",
        "Sleep, medication, and prior mental-health treatment history",
      ],
    },
    conventional: {
      heading: "Mental Health Care and Functional Medicine",
      paragraphs: [
        "Therapy and psychiatric medication can be life-saving and should not be stopped without your prescribing clinician. Functional medicine investigates physical contributors — gut inflammation, thyroid imbalance, nutrient gaps — that may amplify anxiety or depression symptoms.",
      ],
    },
    approach: {
      heading: "Our Approach, Including Neurofeedback",
      paragraphs: [
        "Dr. Autoimmune’s team incorporates functional medicine, nutrition, and neurofeedback brain training as part of a broader plan for brain-based symptoms. Session counts are individualized; many patients need a series of visits for lasting pattern change.",
      ],
    },
    boulder: SHARED_BOULDER("Anxiety and depression"),
    faqs: [
      {
        question: "Can gut problems cause anxiety or depression symptoms?",
        answer: [
          "The gut and brain communicate closely through immune and nerve pathways. Gut inflammation can contribute to mood and cognitive symptoms for some people. We evaluate that connection when digestive issues are part of your history.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/can-stress-trigger-autoimmune-disease-flares/", label: "Can stress trigger autoimmune flares?" },
    ],
    relatedBlog: [
      { href: "/adhd-add/", label: "ADHD / ADD support" },
      { href: "/what-high-crp-reveals-about-chronic-inflammation/", label: "Inflammation and CRP" },
    ],
  },

  "adhd-add": {
    pageTitle: "ADHD & ADD Root-Cause Care in Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine and neurofeedback for ADHD/ADD from Boulder, CO. Learn gut-brain drivers, evaluation steps, and telehealth options.",
    displayName: "ADHD & ADD Root-Cause Care",
    labs: {
      heading: "Evaluation Elements for ADHD/ADD",
      items: [
        "Symptom history across attention, impulsivity, and hyperactivity",
        "Nutrient and thyroid markers that can affect focus and energy",
        "Gut symptoms that may relate to the gut-brain axis",
        "Prior diagnoses, school/work impact, and medication history",
      ],
    },
    conventional: {
      heading: "Conventional ADHD Care and Our Additions",
      paragraphs: [
        "Stimulant and non-stimulant medications, behavioral strategies, and educational supports are standard ADHD tools. Functional medicine investigates underlying imbalances, and our team offers neurofeedback as a non-invasive training option focused on brain-wave patterns.",
      ],
    },
    approach: {
      heading: "Functional Medicine + Neurofeedback",
      paragraphs: [
        "Plans may combine gut-focused care, nutrition, and neurofeedback. Improvements are individual; a course of brain-training sessions is often recommended for more durable pattern change.",
      ],
    },
    boulder: SHARED_BOULDER("ADHD/ADD"),
    faqs: [
      {
        question: "Is neurofeedback a replacement for ADHD medication?",
        answer: [
          "Not necessarily. Some patients use neurofeedback alongside medication or as part of a broader plan. Medication changes should only be made with the prescribing clinician.",
        ],
      },
      {
        question: "Do you work with adults and children?",
        answer: [
          "We support people seeking root-cause care for attention symptoms. Availability and visit structure are confirmed during the discovery call.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/how-to-choose-an-autoimmune-disease-specialist/", label: "How to choose the right specialist" },
    ],
    relatedBlog: [
      { href: "/anxiety-depression/", label: "Anxiety & Depression" },
      { href: "/what-chronic-fatigue-reveals-about-thyroid-health/", label: "Fatigue and thyroid health" },
    ],
  },

  "other-autoimmune-conditions": {
    pageTitle: "Other Autoimmune Conditions We Support | Dr. Autoimmune",
    metaDescription:
      "Functional medicine for complex and less common autoimmune conditions from Boulder, CO. See how root-cause telehealth care works when your diagnosis is rare.",
    displayName: "Other Autoimmune Conditions We Support",
    labs: {
      heading: "How We Approach Uncommon Autoimmune Diagnoses",
      items: [
        "Specialty notes and antibody panels you already have",
        "Inflammatory markers and organ-specific labs from your specialists",
        "Gut and nutrient evaluation when systemic symptoms overlap",
        "Clear coordination plan with rheumatology, neurology, or other specialists",
      ],
    },
    conventional: {
      heading: "Rare Diagnoses Still Need Specialty Anchors",
      paragraphs: [
        "Uncommon autoimmune diseases often require specialty centers for diagnosis and medication. Functional medicine helps when symptoms persist, gut issues overlap, or you need a broader root-cause lens alongside specialty care.",
      ],
    },
    approach: {
      heading: "One Framework, Many Conditions",
      paragraphs: [
        "Autoimmune diseases share immune dysregulation patterns even when organ targets differ. We use that framework — gut, triggers, nutrients, lifestyle — while respecting the specifics of your diagnosis.",
      ],
    },
    boulder: SHARED_BOULDER("Complex autoimmune"),
    faqs: [
      {
        question: "What if my condition is not listed on your site?",
        answer: [
          "If your condition is autoimmune or strongly suspected to be, book a discovery call. We will tell you honestly whether our model is a fit or whether another specialist should lead.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/what-type-of-doctor-treats-autoimmune-disease/", label: "What type of doctor treats autoimmune disease?" },
      { href: "/learn/autoimmune-hepatitis-symptoms-and-skin-rash/", label: "Autoimmune hepatitis symptoms and skin rash" },
    ],
    relatedBlog: [
      { href: "/conditions-we-support/", label: "Conditions we support" },
      { href: "/mold-illness-often-mimics-autoimmune-disease-symptoms/", label: "When mold illness mimics autoimmunity" },
    ],
  },

  "raynauds-phenomenon": {
    pageTitle: "Raynaud’s Phenomenon Treatment Support | Boulder | Dr. Autoimmune",
    metaDescription:
      "Functional medicine support for Raynaud’s phenomenon from Boulder, CO. Learn symptoms, autoimmune links, root-cause evaluation, and telehealth options.",
    displayName: "Raynaud’s Phenomenon Functional Medicine Care",
    labs: {
      heading: "When Raynaud’s Needs an Autoimmune Workup",
      lead: "Color-change episodes deserve a careful history; labs help sort primary patterns from secondary autoimmune links:",
      items: [
        "ANA and related antibodies if secondary Raynaud’s is suspected",
        "Evaluation for associated conditions such as Sjögren’s, scleroderma, or lupus",
        "Circulation and symptom triggers (cold, stress)",
        "Gut and inflammatory markers when systemic autoimmune disease is possible",
        "Prior rheumatology notes when Raynaud’s appears with joint pain, dryness, or rashes",
      ],
    },
    conventional: {
      heading: "Primary vs Secondary Raynaud’s",
      paragraphs: [
        "Primary Raynaud’s occurs on its own. Secondary Raynaud’s can signal an underlying autoimmune disease and deserves a broader workup. Conventional care includes trigger avoidance, hand-warming strategies, and sometimes medication for severe cases.",
        "Functional medicine looks for immune and vascular contributors, especially when Raynaud’s appears with fatigue, joint pain, dryness, or positive antibodies.",
        "Mechanistically, episodic vasospasm reduces blood flow to fingers or toes in response to cold or stress. When autoantibodies or connective-tissue disease are present, the same symptom can be a clue rather than an isolated circulation quirk — which is why we take overlapping autoimmune features seriously.",
      ],
    },
    approach: {
      heading: "Our Approach to Raynaud’s",
      paragraphs: [
        "We clarify primary vs secondary patterns, review autoimmune labs, and build a plan addressing inflammation, gut health, and lifestyle triggers while coordinating with specialists when connective-tissue disease is present.",
        "What testing looks like: ANA and related antibodies when secondary disease is possible, review for Sjögren’s, lupus, or scleroderma features, and gut or inflammatory markers when the systemic picture suggests more than cold hands alone.",
        "What to expect: telehealth history and trigger mapping from Boulder, practical lifestyle strategies, and clear escalation guidance — digital ulcers, severe asymmetric attacks, or new systemic symptoms need prompt in-person evaluation.",
      ],
    },
    boulder: SHARED_BOULDER("Raynaud’s"),
    faqs: [
      {
        question: "When should Raynaud’s be evaluated for autoimmune disease?",
        answer: [
          "New Raynaud’s in adulthood, asymmetric findings, digital ulcers, or accompanying systemic symptoms (rash, joint pain, dryness, abnormal antibodies) warrant a broader autoimmune evaluation with your clinician.",
        ],
      },
      {
        question: "Can telehealth help with Raynaud’s?",
        answer: [
          "History, trigger review, and lab interpretation work well by telehealth. Urgent color changes with severe pain or sores need prompt in-person care.",
        ],
      },
      {
        question: "Is Raynaud’s always autoimmune?",
        answer: [
          "No. Primary Raynaud’s can occur without an autoimmune disease. Secondary Raynaud’s is the pattern that raises concern for conditions such as Sjögren’s, lupus, or scleroderma and deserves a broader workup.",
        ],
      },
      {
        question: "Can Denver patients discuss Raynaud’s by telehealth?",
        answer: [
          "Yes. Most history and lab review can happen remotely from our Boulder practice with local draws. See our Denver page for Front Range logistics, and seek urgent local care for severe digital ischemia or ulcers.",
        ],
      },
    ],
    relatedLearn: [
      { href: "/learn/false-positive-ana-test-causes/", label: "False positive ANA causes" },
      { href: "/learn/how-to-choose-an-autoimmune-disease-specialist/", label: "Choosing an autoimmune specialist" },
      { href: "/areas-we-serve/colorado/denver/", label: "Denver patients: Raynaud’s telehealth from Boulder" },
    ],
    relatedBlog: [
      { href: "/sjogrens-syndrome/", label: "Sjögren’s Syndrome" },
      { href: "/lupus/", label: "Lupus" },
      { href: "/if-my-ana-is-positive-do-i-have-an-autoimmune-disease/", label: "Positive ANA guide" },
    ],
  },
};

export function getConditionEnrichment(slug: string): ConditionEnrichment | undefined {
  return CONDITION_ENRICHMENT[slug];
}
