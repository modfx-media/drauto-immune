import type { LearnCitation, LearnFaq, LearnSection } from "./learn-data";
import type { LearnExtra } from "./learn-enrichment";

function extra(
  intro: string[],
  sections: LearnSection[],
  faqs: LearnFaq[],
  citations: LearnCitation[],
): LearnExtra {
  return { intro, sections, faqs, citations };
}

export const LEARN_ENRICHMENT_MORE: Record<string, LearnExtra> = {
  "mthfr-gene-mutation-and-autoimmune-disease": extra(
    [
      "MTHFR enters autoimmune conversations because folate metabolism touches methylation, homocysteine, and how some people feel on certain supplements. A gene variant is not the same thing as a diagnosis, and it is not a proven cause of autoimmune disease.",
    ],
    [
      {
        heading: "What the common variants actually are",
        paragraphs: [
          "MTHFR encodes an enzyme that helps process folate. Two variants, often called C677T and A1298C, are common in the general population. Carrying one copy, or even two copies of C677T, changes enzyme activity. It does not mean the gene is broken, and it does not mean you have a rare metabolic disease. MedlinePlus Genetics describes MTHFR-related illness as uncommon and separate from the everyday variants that direct-to-consumer tests report.",
          "The Centers for Disease Control and Prevention has said that common MTHFR variants are not, by themselves, a reason for a special medical workup in most people, and that folic acid intake recommendations do not change because of them. The American College of Medical Genetics has advised against ordering MTHFR testing as a routine clinical test. Those statements are the counterweight to marketing that treats a variant as the root of fatigue, miscarriage, depression, and autoimmunity all at once.",
          "Homocysteine can be higher when folate, B12, or B6 status is low, and the C677T variant can push homocysteine up modestly, especially if folate intake is poor. A homocysteine level is a blood test with a result you can act on. A genotype, without that context, mostly produces a label.",
        ],
      },
      {
        heading: "Where the autoimmune claim overreaches",
        paragraphs: [
          "Researchers have looked for links between MTHFR variants and autoimmune or inflammatory conditions. Findings are inconsistent across studies and populations. A variant that is present in a large share of healthy people cannot, by itself, explain why one person has Hashimoto's or lupus. If it were decisive, those diseases would be far more common than they are among variant carriers.",
          "What can be relevant in clinic is the nutrient side of the same pathway. Low folate or low B12 can cause fatigue, neuropathy, and anemia that patients sometimes fold into their autoimmune story. Those deficiencies are worth testing with standard labs when symptoms fit. Treating a measured deficiency is ordinary medicine. Treating a genotype with a stack of methylated supplements, without a deficiency, is not.",
          "Some people feel worse on folic acid and better on a methylfolate product, or the reverse. That experience deserves a hearing. It is still an n-of-one observation, not proof that the variant caused an autoimmune disease. Change one supplement at a time, with the clinician who can see your labs, and stop if numbness, anxiety, or a rash shows up.",
        ],
      },
      {
        heading: "What we look at instead of leading with the gene",
        paragraphs: [
          "At Dr. Autoimmune an MTHFR result that a patient already has is read after the history, not before it. We ask what symptoms are actually present, what the thyroid, inflammatory, and blood-count labs show, and whether folate or B12 has ever been measured. If homocysteine is high, we look for the nutritional reason and for kidney function, medications, and hypothyroidism, all of which can raise it.",
          "We do not order MTHFR genotyping as a first-line autoimmune test. If you already paid for it, bring the raw result so we can say plainly whether it changes anything. Most of the time the useful next step is a standard nutrient lab or a look at the autoimmune disease you already have, not another methylation panel.",
          "Be cautious with doses of methylfolate and methylcobalamin sold as 'detox' or 'immune reset' products. High doses are not harmless for everyone. They can aggravate anxiety in some people, and they do not replace thyroid hormone, disease-modifying drugs, or a gluten-free diet in celiac disease.",
        ],
      },
      {
        heading: "Questions that keep the visit honest",
        paragraphs: [
          "Ask whether your folate and B12 have been measured, not just whether you 'have MTHFR.' Ask what symptom would be explained by a high homocysteine and what symptom would not. Ask which supplement dose is being proposed and what side effect should make you stop. If the answer is that every autoimmune disease starts with this gene, you are hearing a sales script, not a differential diagnosis.",
          "Family members often share variants and do not share diseases. A relative's supplement plan is not your lab result. Retest nutrients if the diet, a pregnancy, or a medication such as metformin has changed the picture. Leave the genotype where it belongs: as background, not as the name of your illness.",
        ],
      },
    ],
    [
      {
        question: "Should everyone with an autoimmune disease get an MTHFR test?",
        answer: [
          "No. Professional guidance does not support routine MTHFR genotyping. If there is a specific question about homocysteine, blood clots, or a measured folate or B12 problem, test the thing that can change treatment. A genotype report rarely does that on its own.",
        ],
      },
      {
        question: "Is methylfolate required if I carry C677T?",
        answer: [
          "Not as a rule. Many people with this variant meet folate needs with diet and, when a pregnancy or a deficiency calls for it, with folic acid as public-health guidance describes. A clinician may try a different folate form if you have a documented problem tolerating one product. The variant alone is not a prescription.",
        ],
      },
    ],
    [
      {
        name: "MedlinePlus Genetics: MTHFR gene",
        url: "https://medlineplus.gov/genetics/gene/mthfr/",
      },
      {
        name: "CDC: MTHFR gene variant and folic acid",
        url: "https://www.cdc.gov/folic-acid/data-research/mthfr/index.html",
      },
      {
        name: "ACMG: ACMG Practice Guideline on MTHFR polymorphism testing",
        url: "https://www.nature.com/articles/gim2012165",
      },
    ],
  ),
  "autoimmune-hepatitis-symptoms-and-skin-rash": extra(
    [
      "Autoimmune hepatitis is inflammation of the liver driven by the immune system. A rash can be part of the story, and a rash can also belong to a completely different condition that happens to share a few blood tests. The liver tests and the skin findings have to be read together.",
    ],
    [
      {
        heading: "What autoimmune hepatitis tends to feel like",
        paragraphs: [
          "Some people are diagnosed from abnormal liver enzymes on a routine panel and feel nothing yet. Others notice fatigue that is out of proportion to sleep, a dull ache under the right ribs, itching, dark urine, pale stools, or yellowing of the eyes. Nausea and poor appetite show up when inflammation is more active. None of these symptoms is unique to autoimmune hepatitis. They are reasons to look at the liver rather than to assume the problem is only a skin or gut issue.",
          "Women are diagnosed more often than men, and the disease can appear at almost any age, including childhood. There are two main serologic patterns, type 1 and type 2, based on which autoantibodies are present. Type 1 is the more common pattern in adults and is associated with antinuclear antibodies and anti-smooth-muscle antibodies. Type 2 is associated with anti-LKM1 antibodies and is seen more in children and young women. The type guides the lab work. It is not something you can see in the mirror.",
          "The National Institute of Diabetes and Digestive and Kidney Diseases describes diagnosis as a combination of liver enzyme elevation, autoantibodies, elevated immunoglobulin G, and exclusion of viral hepatitis and other liver diseases. A liver biopsy is often used to confirm the pattern of interface hepatitis and to grade how much damage is present. Blood tests start the question. They do not always finish it.",
        ],
      },
      {
        heading: "Rashes that get blamed on the liver, and rashes that should",
        paragraphs: [
          "Itching without a visible rash is a classic liver symptom when bile flow is impaired, and people often call that itching a rash because the skin is marked by scratching. A true rash is a change you can see: redness, blisters, hives, or scaling. Autoimmune hepatitis can travel with other autoimmune diseases that have their own skin findings, including autoimmune thyroid disease, celiac disease, and ulcerative colitis. The rash may belong to the companion disease.",
          "Spider angiomas, easy bruising, and jaundice are skin signs of liver dysfunction. They are not the same as the inflammatory rashes of lupus or psoriasis, and they should push the evaluation toward liver tests rather than only toward a dermatology cream. A malar rash, psoriasis plaques, or the grouped itchy blisters of dermatitis herpetiformis each have their own workup. Dermatitis herpetiformis, for example, is tied to celiac disease, not to autoimmune hepatitis.",
          "Search interest in 'autoimmune hepatitis skin rash' is high because the two problems show up in the same month and nobody has connected them. Bring photos taken in daylight, a list of new medicines and supplements, and the liver panel. Acetaminophen in high doses, some antibiotics, and various supplements can injure the liver and mimic autoimmune hepatitis. A drug cause has to be excluded before a lifelong immune diagnosis is locked in.",
        ],
      },
      {
        heading: "How the condition is treated, in plain language",
        paragraphs: [
          "Standard treatment, when treatment is needed, is immune-modulating medicine prescribed by a hepatologist or gastroenterologist, commonly a corticosteroid with or without azathioprine. The goal is to quiet inflammation and protect the liver, then to find the lowest maintenance plan that keeps enzymes and symptoms controlled. Not every mild case is treated the same way. That decision uses the biopsy, the labs, and how you feel. It is not a decision for a supplement protocol alone.",
          "Untreated inflammatory activity can progress to cirrhosis and liver failure. That is why 'natural liver support' should not delay the specialist visit when enzymes are several times the upper limit or when jaundice is present. Nutrition, alcohol avoidance, and careful use of pain relievers matter alongside treatment. They do not replace it.",
          "A functional medicine review can look at overlapping gut and thyroid autoimmunity, medication and supplement lists, and how you are tolerating the prescribed plan. At Dr. Autoimmune we do not claim to replace hepatology for autoimmune hepatitis. We will tell you if the rash and the liver tests need that referral, and we will not talk you out of a biopsy your hepatologist has recommended.",
        ],
      },
      {
        heading: "When to get care urgently",
        paragraphs: [
          "Yellow skin or eyes, confusion, vomiting blood, black stools, severe abdominal swelling, or a liver enzyme result your portal has flagged as critical belong in urgent care or an emergency department. A new rash plus mouth ulcers, joint swelling, and fever also needs a prompt clinician, because that cluster can be lupus or a drug reaction rather than autoimmune hepatitis.",
          "If you already carry the diagnosis, call the liver clinic when itching becomes constant, urine turns brown, or a new medicine was started in the last few weeks. Bring the bottle. Many 'liver flares' are adverse effects that stop when the product stops, under medical supervision.",
        ],
      },
    ],
    [
      {
        question: "Does a positive ANA mean my rash is autoimmune hepatitis?",
        answer: [
          "No. ANA is common to several autoimmune conditions and can be positive without any liver disease. Autoimmune hepatitis is suspected when liver enzymes are high and other antibodies or immunoglobulin G support the pattern, not when a rash and an ANA are the only findings. You need the liver panel before that diagnosis is even on the list.",
        ],
      },
      {
        question: "Can autoimmune hepatitis cause itching without a rash?",
        answer: [
          "Yes. Impaired bile flow can cause intense itching with little or nothing to see on the skin except scratch marks. That symptom still deserves liver tests. Treating only the itch, without checking enzymes and bilirubin, misses the organ that is asking for attention.",
        ],
      },
    ],
    [
      {
        name: "NIDDK: Autoimmune hepatitis",
        url: "https://www.niddk.nih.gov/health-information/liver-disease/autoimmune-hepatitis",
      },
      {
        name: "MedlinePlus: Autoimmune hepatitis",
        url: "https://medlineplus.gov/autoimmunehepatitis.html",
      },
      {
        name: "NIAMS: Autoimmune diseases",
        url: "https://www.niams.nih.gov/health-topics/autoimmune-diseases",
      },
    ],
  ),
  "what-type-of-doctor-treats-autoimmune-disease": extra(
    [
      "There is no single autoimmune doctor. The right clinician depends on which organ is inflamed, whether a diagnosis already exists, and whether you are still in the phase of unexplained symptoms. Starting with the wrong specialty mostly costs time.",
    ],
    [
      {
        heading: "Who usually leads once a disease has a name",
        paragraphs: [
          "Rheumatologists diagnose and treat systemic autoimmune diseases such as rheumatoid arthritis, lupus, Sjögren's syndrome, vasculitis, and many cases of inflammatory muscle disease. They are the specialists who use disease-modifying drugs and who monitor joints and internal organs for those conditions. If you already have one of those diagnoses, a rheumatologist should be on the team even if you also want a functional medicine perspective.",
          "Other organs have their own leads. Autoimmune thyroid disease is usually followed by an endocrinologist or a primary clinician comfortable with thyroid hormone. Inflammatory bowel disease belongs with a gastroenterologist. Multiple sclerosis belongs with a neurologist. Autoimmune hepatitis belongs with a hepatologist or gastroenterologist. Type 1 diabetes belongs with an endocrinologist. A skin-limited autoimmune blistering disease may start with dermatology. The pattern is simple: the clinician who trains on that organ directs the disease-specific treatment.",
          "Primary care is not a consolation prize. A good primary clinician is often the person who notices the pattern, orders the first sensible labs, and makes the referral before years of separate symptom visits. If your primary clinician is unsure, ask which specialty matches the most objective finding you have, not the most worrying feeling.",
        ],
      },
      {
        heading: "Where functional medicine fits",
        paragraphs: [
          "Functional medicine practitioners, including Dr. Ian Hollaman, DC, MSc, FMCP at this practice, spend longer on history, triggers, nutrition, sleep, gut symptoms, and labs that a short specialty visit may not cover. That is useful when several systems are involved or when you have a diagnosis and still feel unwell on the standard plan. It is a poor substitute for the specialist who should be prescribing and monitoring immune-suppressing or organ-specific therapy.",
          "Credentials are not interchangeable. A chiropractic physician with functional medicine training is not a rheumatologist. A nurse practitioner in a specialty clinic is not a reason to skip the physician directing your disease if the disease is unstable. Ask each clinician what they will and will not manage. Overlap is healthy. A fight over who 'owns' you is not.",
          "Telehealth changes access, not scope. Dr. Autoimmune sees patients by video from Boulder. Whether a particular clinician can legally care for you depends on licensure and on the problem. Confirm that before you book, and keep the local specialist who can examine a swollen joint or admit you if a flare becomes dangerous.",
        ],
      },
      {
        heading: "How to choose the first appointment",
        paragraphs: [
          "If joints are hot, swollen, and stiff in the morning, start with rheumatology. If the main finding is an abnormal liver panel, start with gastroenterology or hepatology. If bowel urgency, bleeding, or nocturnal diarrhea dominates, start with gastroenterology and do not let an IBS label close the question. If the only confirmed issue is Hashimoto's and the question is persistent symptoms, endocrinology or a clinician who will look past TSH can be the right start, with rheumatology added if systemic features appear.",
          "Bring a one-page timeline, your actual lab PDFs, and a medication list. Ask what diagnosis is being considered and what finding would rule it out. A visit that cannot name the question it is trying to answer will order broad panels and still leave you lost.",
          "Second opinions are reasonable when the diagnosis is serious, the treatment is high-risk, or you have been told nothing is wrong while objective findings say otherwise. Collect the records first. Repeating every antibody from scratch, without the prior reports, wastes the thing you already paid for.",
        ],
      },
      {
        heading: "What no specialty should tell you",
        paragraphs: [
          "No clinician should promise a cure, tell you to stop prescribed immune therapy without a plan, or claim that one gut test explains every autoimmune disease. Those are sales lines. A useful clinician will tell you what is known, what is uncertain, and who else needs to be in the room.",
          "If you are choosing between a rheumatologist and a functional medicine visit, you often need both, in that order when organ damage is on the table, and with functional medicine alongside when the diagnosis is stable but symptoms are not. The type of doctor is the one whose training matches the decision in front of you this month.",
          "A practical sequence for a Denver or Boulder patient is the same sequence that works anywhere. Urgent or organ-specific problems go to the local specialist or emergency department first. Unexplained but stable symptoms can start with primary care or with a longer functional medicine history, as long as red flags are named out loud. Dr. Autoimmune can take the longer history by video and can tell you when the next person you need is a rheumatologist, gastroenterologist, endocrinologist, or neurologist. Ask that question on the discovery call if you are unsure which door to open. The wrong first appointment is usually expensive in time, not because the clinician was unkind, but because their tools did not match the decision.",
        ],
      },
    ],
    [
      {
        question: "Is a rheumatologist the same as an immunologist?",
        answer: [
          "No. Rheumatologists focus on joints, connective tissue, and systemic autoimmune disease. Clinical immunologists focus more on immune deficiency, severe allergy, and some immune dysregulation syndromes. A few physicians train in both. If your problem is recurrent serious infections plus autoimmunity, ask whether allergy-immunology should be involved. If the problem is inflammatory arthritis or lupus, rheumatology is the usual home.",
        ],
      },
      {
        question: "Can a functional medicine doctor diagnose lupus?",
        answer: [
          "Lupus is a clinical diagnosis that should be made or confirmed by a clinician experienced in it, typically a rheumatologist, using exam findings and specific labs. A functional medicine clinician can recognize that the story fits and can refer. Treating suspected lupus without that evaluation risks missing organ involvement.",
        ],
      },
    ],
    [
      {
        name: "American College of Rheumatology: Rheumatologist",
        url: "https://rheumatology.org/rheumatologist",
      },
      {
        name: "NIAMS: Autoimmune diseases",
        url: "https://www.niams.nih.gov/health-topics/autoimmune-diseases",
      },
      {
        name: "MedlinePlus: Autoimmune disorders",
        url: "https://medlineplus.gov/autoimmunediseases.html",
      },
    ],
  ),
  "how-to-choose-an-autoimmune-disease-specialist": extra(
    [
      "Choosing a specialist is easier once you know what decision you need made. Diagnosis, a change in immune-suppressing medication, and a longer look at why you still feel sick are three different appointments. One clinician rarely does all three equally well.",
    ],
    [
      {
        heading: "Match the clinician to the decision",
        paragraphs: [
          "If you do not yet have a diagnosis, you need someone who will examine the objective findings and say what this is not. For systemic symptoms that cluster around joints, rashes, and profound fatigue, that person is usually a rheumatologist. For bowel bleeding or nocturnal diarrhea, it is a gastroenterologist. Do not start with the practitioner whose website lists the most conditions. Start with the training that matches your most concrete abnormality.",
          "If you already have a diagnosis and the question is whether to start or change a disease-modifying drug, stay with the specialist who will live with the side effects and the monitoring labs. A second opinion is reasonable. A third philosophy that tells you to abandon monitoring is not a second opinion. It is a different standard of safety.",
          "If the diagnosis is stable and you still have fatigue, gut symptoms, poor sleep, or reactions to foods, a functional medicine visit can be the right additional appointment. At this practice that visit is with Dr. Ian Hollaman, DC, MSc, FMCP, or his clinical team, by telehealth. It is built to widen the history. It is not built to replace the specialist managing organ-threatening disease.",
        ],
      },
      {
        heading: "Credentials and scope you can verify",
        paragraphs: [
          "Ask what license the clinician holds and in which state. Board certification, for physicians who have it, is public. Functional medicine certificates, including training through the Institute of Functional Medicine, describe additional education. They are not a medical specialty board. Neither fact is an insult. Confusing them is how people end up expecting a chiropractic physician to manage lupus nephritis, or expecting a rheumatologist to spend ninety minutes on a diet history.",
          "Ask who you will actually see. A famous name on the website and a rotating contractor in the visit are different products. Ask how after-hours symptoms are handled. Autoimmune flares do not wait for the next scheduled video call. A practice that cannot tell you what to do if you develop chest pain or black stools is incomplete, no matter how thorough the intake packet is.",
          "Read a few visit notes, or ask for the style of the note. You want a record your other doctors can use: the diagnosis under consideration, the meds, the labs, and the plan. A note that is only a supplement list does not travel well to a hospital.",
        ],
      },
      {
        heading: "Red flags in the sales process",
        paragraphs: [
          "Be wary of a clinic that requires a large prepaid package before anyone has heard your history, that guarantees reversal of autoimmune disease, or that discourages you from telling your rheumatologist what you are taking. Those are commercial patterns, not clinical ones. Testing should answer a question. A panel of dozens of markers, sold before the question exists, is a product.",
          "Reviews can tell you whether people felt heard. They cannot tell you whether the diagnosis was correct. Look for specifics: did the clinician coordinate with existing specialists, admit uncertainty, and change the plan when a lab contradicted the story? Vague praise for 'getting to the root' is not a credential.",
          "Cost transparency matters because autoimmune care is long. Ask what the first visit includes, what labs are billed separately, and what happens if you need a referral rather than another package. A good answer is specific. A bad answer is that everything will make sense after you commit.",
        ],
      },
      {
        heading: "A practical way to decide this month",
        paragraphs: [
          "Write the single decision you need: a diagnosis, a medication change, or a plan for symptoms that persist despite appropriate treatment. Book the clinician whose license and training match that decision. Bring PDFs of labs, a one-page timeline, and your questions in writing. Leave with the name of the next step, including who to call if you get worse.",
          "If you want both a specialist and a functional medicine perspective, tell each of them that the other exists. Share the note. Hidden treatments and hidden supplements are how interactions get missed. The best specialist relationship is boring in the best way: clear scope, reachable follow-up, and no promise that one visit will rename your entire health story.",
          "Before you pay for a large testing package, ask which single result would change a drug, a diet, or a referral in the next thirty days. If the answer is that the whole panel will 'give a complete picture,' ask for the two tests that answer this month's question and defer the rest. Specialists earn trust by narrowing. A binder of uninterpreted markers does the opposite. Write the clinician's name, license, and the state they can see you in at the top of your notes. If those three lines are vague on the website, they will be vague in the visit.",
        ],
      },
    ],
    [
      {
        question: "How many specialists do I need?",
        answer: [
          "As few as the diseases require. One rheumatologist may be enough for rheumatoid arthritis. Lupus with kidney disease may add nephrology. Hashimoto's plus celiac disease may add endocrinology and gastroenterology. Adding clinicians without a new question increases contradictory advice. Add a person when there is a decision they are trained to make.",
        ],
      },
      {
        question: "What should I do if the specialist dismisses my symptoms?",
        answer: [
          "Ask which finding would make them reopen the question, and ask for a copy of the note. A second opinion is appropriate when objective abnormalities were not addressed. If the exam and the targeted labs are truly reassuring, ask what non-autoimmune explanations are still in play, including sleep, medication effects, and mood, rather than collecting more autoantibodies by default.",
        ],
      },
    ],
    [
      {
        name: "American College of Rheumatology: Rheumatologist",
        url: "https://rheumatology.org/rheumatologist",
      },
      {
        name: "NIAMS: Autoimmune diseases",
        url: "https://www.niams.nih.gov/health-topics/autoimmune-diseases",
      },
    ],
  ),
  "functional-medicine-vs-rheumatologist-what-to-expect": extra(
    [
      "People compare these visits because they want to know who will take the disease seriously and who will have time for the rest of the story. They are built for different jobs. Expecting them to feel the same is what makes one of them seem like a failure.",
    ],
    [
      {
        heading: "What a rheumatology visit is set up to do",
        paragraphs: [
          "A rheumatologist is a physician trained to diagnose and treat arthritis and systemic autoimmune disease. The visit is organized around classification and risk. You should expect questions about joint swelling, morning stiffness, rashes, mouth ulcers, Raynaud's phenomenon, chest pain, muscle weakness, and dry eyes or mouth. The exam looks for synovitis, skin findings, and signs that an organ is involved. Labs are chosen to confirm or exclude specific diseases and to monitor drugs, not to build a general wellness panel.",
          "If rheumatoid arthritis, lupus, vasculitis, or a similar disease is likely, the rheumatologist is also the person who discusses disease-modifying treatment and the labs that keep that treatment safe. Visits can feel short. The job is to make a high-stakes decision correctly. A short visit that names the disease and the monitoring plan can be a good visit. A long visit that never answers whether your joints are inflamed is not.",
          "Bring a list of swollen joints, photos of rashes, and prior antibody reports including the method and titer. Say which symptoms are new this month. Rheumatology is not the place to hope someone will infer your story from a stack of unsorted portal screenshots.",
        ],
      },
      {
        heading: "What a functional medicine visit is set up to do",
        paragraphs: [
          "A functional medicine visit at Dr. Autoimmune is longer on history. Dr. Ian Hollaman, DC, MSc, FMCP, is a board-certified chiropractic physician in Colorado and a certified functional medicine practitioner. The appointment looks at triggers and mediators: infections, medications, sleep, diet patterns, gut symptoms, stress stacked on a flare, and labs that may explain fatigue that persists after the rheumatologist has done the disease-specific job.",
          "You should expect questions a specialty visit may skip, and you should expect a limit. This practice does not replace rheumatology for diagnosis of lupus or for prescribing and monitoring drugs that suppress the immune system. You should leave knowing which recommendations are lifestyle or nutrition, which need your rheumatologist's approval, and which symptoms should send you back to that specialist sooner.",
          "Telehealth is the format here. There is no hands-on joint exam through a camera that equals an in-person rheumatology exam. If the question is 'is this joint swollen,' you need someone who can touch it. If the question is 'why am I still exhausted on a stable regimen,' a video history can carry a lot of the work.",
        ],
      },
      {
        heading: "How to use both without working against yourself",
        paragraphs: [
          "Tell the rheumatologist about every supplement and every diet change. Tell the functional medicine clinician about every prescription and the last lab your specialist ordered. Hidden plans create interactions and duplicated tests. A shared one-page summary, updated after each visit, prevents the two charts from diverging.",
          "Sequence matters. New inflammatory joint symptoms, possible organ involvement, or a first diagnosis of a systemic autoimmune disease should go to rheumatology first. A functional medicine visit can be scheduled alongside once the dangerous questions are in the right hands. Starting with only a root-cause program, while a swollen joint goes unexamined, is the failure mode this comparison exists to prevent.",
          "Disagree in the open. If one clinician wants you to stop a drug the other considers essential, do not resolve it in a group chat. Ask them what harm they are trying to prevent and what lab would show the harm is happening. You are allowed to choose. You are not served by silence.",
        ],
      },
      {
        heading: "What neither visit should promise",
        paragraphs: [
          "Neither a rheumatologist nor a functional medicine clinician can honestly promise that autoimmune disease will be reversed on a timeline. Rheumatology can often control inflammatory disease and prevent damage. Functional medicine can often improve sleep, diet-related symptoms, and the sense that someone has looked at the whole week of your life. Those are different wins. Marketing that collapses them into a cure is the signal to slow down.",
          "Cost and time are part of the choice. A specialty copay and a private functional medicine fee are not the same product. Ask what you are buying in the first month and what would make either of you stop. The right expectation is coordination, not a winner.",
          "A useful way to compare the two appointments is to write the question each one is allowed to answer. Rheumatology: is this inflammatory disease, and what treatment and monitoring does it require? Functional medicine at this practice: what in the history, the nutrition, the sleep, and the existing labs still explains symptoms after that disease-specific plan is in place? If your note for either visit cannot fit in two sentences, you are about to buy a general conversation. Bring the last rheumatology letter to the functional medicine visit and the functional medicine summary to the rheumatologist. Agreement is not required. A shared set of facts is. If the two plans conflict on a prescription, do not split the difference on your own. Ask which clinician owns the monitoring labs for that drug and follow that person's stop rules.",
        ],
      },
    ],
    [
      {
        question: "Do I have to pick one and cancel the other?",
        answer: [
          "Usually no. Most people with a diagnosed systemic autoimmune disease do better with a rheumatologist in charge of disease-modifying treatment and, if they want it, a functional medicine clinician looking at the contributors around that treatment. Canceling rheumatology to pursue only a root-cause program is the risky version of this choice.",
        ],
      },
      {
        question: "Will a functional medicine doctor order the same antibodies?",
        answer: [
          "Sometimes, and sometimes that is waste. If a recent ANA, ENA panel, or rheumatoid factor already exists, bring it. Repeating tests without reading the last ones does not create a better diagnosis. New tests should be tied to a symptom or to a drug that needs monitoring.",
        ],
      },
    ],
    [
      {
        name: "American College of Rheumatology: Rheumatologist",
        url: "https://rheumatology.org/rheumatologist",
      },
      {
        name: "NIAMS: Autoimmune diseases",
        url: "https://www.niams.nih.gov/health-topics/autoimmune-diseases",
      },
    ],
  ),
  "is-irritable-bowel-syndrome-an-autoimmune-disease": extra(
    [
      "IBS is common, miserable, and not classified as an autoimmune disease. The confusion is understandable: both IBS and inflammatory bowel disease involve the gut, both flare, and both get worse with stress. The difference is whether the bowel is inflamed and damaged, or whether the bowel is sensitive and poorly coordinated without that injury.",
    ],
    [
      {
        heading: "How IBS is defined",
        paragraphs: [
          "Irritable bowel syndrome is a disorder of gut-brain interaction. Clinicians use symptom criteria, often the Rome criteria: recurrent abdominal pain related to defecation or to a change in stool frequency or form, present long enough to be a pattern rather than a short infection. There is no antibody and no biopsy that 'positive for IBS.' The diagnosis is made from the story, after red flags and look-alike diseases have been considered.",
          "The National Institute of Diabetes and Digestive and Kidney Diseases describes IBS as a functional gastrointestinal disorder. The bowel can look normal on colonoscopy. That normal test does not mean you are imagining the pain. Visceral hypersensitivity, altered motility, bile-acid problems, and changes in the microbiome are all discussed as mechanisms. None of them is the immune system attacking the intestinal lining the way celiac disease or Crohn's disease does.",
          "Subtypes follow the stool pattern: constipation-predominant, diarrhea-predominant, or mixed. Treatment that helps one subtype can worsen another. A label of IBS without the subtype is only half a label.",
        ],
      },
      {
        heading: "The autoimmune diseases it gets mistaken for",
        paragraphs: [
          "Inflammatory bowel disease, meaning Crohn's disease and ulcerative colitis, is immune-mediated inflammation of the gut. Bleeding, weight loss, fever, anemia, and waking from sleep to stool are warning signs that argue against simple IBS and for an evaluation that may include stool inflammatory markers and colonoscopy. Celiac disease is an autoimmune reaction to gluten that injures the small intestine. It can look like IBS until someone checks serology and, when indicated, a biopsy. Microscopic colitis causes watery diarrhea and is diagnosed on biopsy even when the colon looks normal.",
          "People can have IBS and an autoimmune disease at the same time. Hashimoto's, rheumatoid arthritis, or lupus does not convert IBS into an autoimmune bowel disease, and it does not make every bout of bloating a flare of the systemic disease. It does mean new red-flag bowel symptoms should not be filed under 'just my IBS' without a look.",
          "A positive ANA, by itself, does not reclassify IBS. ANA is a broad antibody test. It does not diagnose Crohn's disease, ulcerative colitis, or celiac disease. If the bowel story has red flags, the next tests are the ones aimed at the bowel, not another generic autoimmune panel.",
        ],
      },
      {
        heading: "What helps, and what the label does not excuse",
        paragraphs: [
          "First-line care for IBS is still practical: a careful history of lactose, excess fructose, alcohol, and caffeine; a trial of soluble fiber when constipation dominates; medication matched to diarrhea or constipation when symptoms justify it; and treatment of coexisting anxiety or depression when those are part of the pain loop. A low-FODMAP diet, done as a time-limited trial with a reintroduction phase, helps some people with IBS and is not a forever elimination diet. Doing it without a plan creates a short food list and no new information.",
          "Gut-directed therapy, including structured stress treatment, has evidence in IBS because the condition is a gut-brain disorder. That is different from telling someone their pain is not real. Infection can precede IBS, which clinicians call post-infectious IBS. That history is worth recording. It still does not make the ongoing syndrome an autoimmune disease.",
          "At Dr. Autoimmune we treat the distinction as clinical, not semantic. If your story fits IBS, we will not upgrade it to autoimmunity to justify a protocol. If your story has bleeding, weight loss, nocturnal stools, fever, or iron deficiency, we will tell you that IBS is the wrong place to stop and that gastroenterology needs to see you. Overlap with celiac disease and inflammatory bowel disease is exactly why those conditions have their own pages on this site.",
        ],
      },
      {
        heading: "How to prepare for the appointment",
        paragraphs: [
          "Track two weeks of stool form, pain, and what you ate in the hours before the worst episodes. Note blood, fever, and whether symptoms wake you. Bring prior celiac tests and any colonoscopy report. Say which relatives have celiac disease or inflammatory bowel disease. Ask the clinician which red flag, if it appeared next month, should skip the diet advice and go straight to endoscopy.",
          "Leave with a subtype, a single diet or medication trial with an end date, and a statement about whether autoimmune bowel disease has been adequately considered. 'IBS' without those three items is a placeholder, not a plan. If the clinician says the colonoscopy was normal, ask whether biopsies were taken, because microscopic colitis is invisible without them. If celiac serology was negative, ask whether you were eating gluten at the time of the test. Those two details change the meaning of a normal workup more than another month of symptom tracking does.",
        ],
      },
    ],
    [
      {
        question: "Can IBS turn into Crohn's disease?",
        answer: [
          "IBS is not an early stage of Crohn's disease. They are different conditions. A person can be told they have IBS and later be found to have Crohn's disease if red flags were missed or if new symptoms developed. That is a missed or new diagnosis, not IBS transforming into an autoimmune disease. New bleeding, weight loss, or nocturnal symptoms should be reassessed rather than folded into the old label.",
        ],
      },
      {
        question: "If I feel better off gluten, do I have celiac disease?",
        answer: [
          "Not necessarily. Some people with IBS feel better with less gluten or less wheat because of FODMAP carbohydrates in wheat, not because of celiac autoimmunity. Celiac disease has specific blood tests and, when needed, a biopsy, and those tests are unreliable if you have already been strictly gluten-free for a long time. Get the testing plan from a clinician before you commit to a permanent gluten-free diet you may not need.",
        ],
      },
    ],
    [
      {
        name: "NIDDK: Irritable bowel syndrome (IBS)",
        url: "https://www.niddk.nih.gov/health-information/digestive-diseases/irritable-bowel-syndrome",
      },
      {
        name: "NIDDK: Crohn's disease",
        url: "https://www.niddk.nih.gov/health-information/digestive-diseases/crohns-disease",
      },
      {
        name: "MedlinePlus: Celiac disease",
        url: "https://medlineplus.gov/celiacdisease.html",
      },
    ],
  ),
};
