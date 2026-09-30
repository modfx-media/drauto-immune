import type { LearnCitation, LearnFaq, LearnSection } from "./learn-data";
import type { LearnExtra } from "./learn-enrichment";
import { LEARN_ENRICHMENT_MORE } from "./learn-enrichment-more";

const medlineAna: LearnCitation = {
  name: "MedlinePlus: ANA (antinuclear antibody) test",
  url: "https://medlineplus.gov/lab-tests/ana-antinuclear-antibody-test/",
};
const niamsLupus: LearnCitation = {
  name: "NIAMS: Systemic lupus erythematosus (lupus)",
  url: "https://www.niams.nih.gov/health-topics/lupus",
};
const niamsAutoimmune: LearnCitation = {
  name: "NIAMS: Autoimmune diseases",
  url: "https://www.niams.nih.gov/health-topics/autoimmune-diseases",
};

function extra(
  intro: string[],
  sections: LearnSection[],
  faqs: LearnFaq[],
  citations: LearnCitation[],
): LearnExtra {
  return { intro, sections, faqs, citations };
}

export const LEARN_ENRICHMENT_REST: Record<string, LearnExtra> = {
  "medications-that-can-cause-a-positive-ana-test": extra(
    [
      "A medication link does not mean the drug was a mistake, and it does not mean you should stop it tonight. It means the antibody result has a second explanation that has to be checked against the prescription list before anyone labels you with a lifelong autoimmune disease.",
    ],
    [
      {
        heading: "Drugs with the strongest track record",
        paragraphs: [
          "Hydralazine, used for blood pressure, and procainamide, used for heart rhythm, are the classic high-risk examples in textbooks of drug-induced lupus. Isoniazid, used for tuberculosis, minocycline, an antibiotic sometimes taken for months for acne, and several anticonvulsants including phenytoin have also been tied to ANA positivity or to a lupus-like illness. More recently, TNF-alpha inhibitors used for rheumatoid arthritis, psoriasis, and inflammatory bowel disease have been associated with new autoantibodies and, less often, with clinical lupus-like disease.",
          "The list is not a reason to fear every prescription. Most people who take these drugs never develop a problem. Risk rises with higher cumulative exposure for some of the older drugs, and with factors such as slow drug metabolism that a clinician may already know from your history. A short course of an antibiotic is a different exposure from minocycline taken daily for a year. Bring the start date, the dose, and the reason the drug was prescribed.",
          "Over-the-counter pain relievers and ordinary supplements are not the group with the best evidence for drug-induced ANA positivity. Still list them. A complete list keeps the visit from missing an interacting prescription, and it stops a supplement from being blamed when a prescription is the more plausible trigger.",
        ],
      },
      {
        heading: "How drug-induced lupus differs from systemic lupus",
        paragraphs: [
          "Drug-induced lupus is usually milder than systemic lupus erythematosus. Joint pain, muscle aches, fever, and fatigue are the common story. Kidney inflammation and serious brain or nerve disease are uncommon in the drug-induced form and are more concerning for systemic disease. The skin can be involved, but a classic malar rash is less typical than in systemic lupus.",
          "Blood tests can help separate the two, and they are not perfect. Anti-histone antibodies are frequently positive in drug-induced lupus, especially with the older drugs such as hydralazine and procainamide. Anti-dsDNA and anti-Smith antibodies point much more toward systemic lupus. A positive ANA plus anti-histone antibodies still needs a clinician, because anti-histone antibodies are not exclusive to drug-induced disease.",
          "The practical difference is the plan. When a drug is the driver, the usual path is to stop or switch that drug under the prescriber's direction and watch symptoms and antibodies over weeks to months. Systemic lupus is managed as its own disease, sometimes with hydroxychloroquine or immune-modulating treatment, and stopping an unrelated medicine will not be the whole answer.",
        ],
      },
      {
        heading: "What to do before you change any prescription",
        paragraphs: [
          "Call the prescriber before you stop a heart, blood pressure, seizure, tuberculosis, or biologic medicine. Some of these drugs prevent strokes, control dangerous rhythms, or treat active infection. The ANA result is important. An abrupt stop can be more dangerous than the antibody. Ask for a shared decision: which drug is the suspect, what the substitute is, and who will monitor the washout.",
          "Write a timeline. Note when the medicine started, when symptoms started, and when the ANA was drawn. A drug started years before any symptom is a weaker suspect than a drug started two months before the joint pain. Photos of rashes and a list of other new products, including antibiotics from a dentist, belong in that timeline.",
          "A functional medicine review at Dr. Autoimmune can sit beside that conversation. We look at the antibody pattern, symptoms, and other labs, and we coordinate with the prescriber rather than replacing them. If the story fits systemic lupus, referral to rheumatology is part of responsible care, not a failure of a root-cause approach.",
        ],
      },
      {
        heading: "After the drug is stopped",
        paragraphs: [
          "Symptoms of drug-induced lupus often ease over weeks to a few months once the trigger is removed, but the ANA itself can stay positive longer than the symptoms. A lingering antibody is not proof that the disease has become permanent. Your clinician decides whether a repeat test will change a decision. Chasing the titer every month rarely does.",
          "If symptoms continue or new findings appear, such as protein in the urine, chest pain with breathing, low blood counts, or a rising anti-dsDNA, the working diagnosis should be reopened. Drug exposure and systemic autoimmune disease can coexist. One does not cancel the other.",
          "Keep a one-page medication timeline in the same folder as the lab PDF. Columns that help are the drug name, the dose, the start date, the symptom start date, and who prescribed it. Include drugs from dentists, dermatologists, and infusions given in an infusion center, because those rarely appear on the primary pharmacy list. When the prescriber changes the drug, write the stop date and the substitute. A later visit should not have to reconstruct that history from memory. If a new clinician wants to rechallenge the suspect drug, that decision needs the original reaction written down, not a vague memory that 'a blood pressure pill' was involved.",
        ],
      },
    ],
    [
      {
        question: "Can a biologic medicine cause a positive ANA even if it is treating an autoimmune disease?",
        answer: [
          "Yes. TNF-alpha inhibitors are used for autoimmune diseases and have been associated with new autoantibodies. That does not automatically mean the drug has failed or that you have developed lupus. It means new symptoms, especially joint pain outside the original disease, rashes, or fever, should be reported to the prescribing specialist before the next dose is treated as routine.",
        ],
      },
      {
        question: "If my ANA becomes negative, was the medicine definitely the cause?",
        answer: [
          "A falling or negative repeat test supports that idea when the timing also fits, but antibodies fluctuate for other reasons. Use the repeat result as one piece of the timeline, not as a courtroom verdict. The prescriber and the clinician reading your symptoms should agree on what the change means before you draw a conclusion.",
        ],
      },
    ],
    [medlineAna, niamsLupus, niamsAutoimmune],
  ),
  "false-positive-ana-test-causes": extra(
    [
      "False positive is a slippery phrase. Sometimes it means the antibody is real but you do not have an autoimmune disease. Sometimes it means the assay itself was influenced by another illness or by how the sample was handled. Sorting those apart is the whole job of the follow-up visit.",
    ],
    [
      {
        heading: "A real antibody is not the same thing as a disease",
        paragraphs: [
          "The most common 'false positive' is not a lab error. It is a true low-level ANA in a person who does not have, and may never have, a systemic autoimmune disease. Healthy adults, especially women, can test positive. The chance of a positive result also rises with age. Family members of people with autoimmune disease can carry autoantibodies without being ill. In those situations the test did what it was designed to do: it detected an antibody. It was never designed to diagnose a disease on its own.",
          "That is why ordering an ANA 'just to check' creates confusion. The test is most useful when a clinician is already looking at signs of a connective tissue disease: inflammatory arthritis, a photosensitive rash, oral ulcers, serositis, Raynaud's phenomenon with skin changes, or unexplained low blood counts. A positive result in that setting moves the workup forward. The same result in a person with fatigue alone mostly creates a label that is hard to put down.",
        ],
      },
      {
        heading: "Illnesses and situations that raise the ANA without lupus",
        paragraphs: [
          "Infections can turn an ANA positive for a time. Viral illnesses are the everyday example. Chronic infections are discussed as well, though a positive test during a short illness should be interpreted with the timing in mind, not as a new lifelong diagnosis. Autoimmune thyroid disease, autoimmune liver disease, and some other organ-specific conditions can also be associated with a positive ANA even when systemic lupus is not present.",
          "Other medical situations show up in this conversation often enough to ask about them directly: recent pregnancy, liver inflammation, certain cancers, and medications covered in the companion article on drug-induced ANA positivity. None of these is a reason to ignore symptoms that truly fit a rheumatic disease. They are reasons not to stop the history after the word positive.",
          "Laboratory method matters. Indirect immunofluorescence on HEp-2 cells is the reference approach for ANA screening. Solid-phase assays used by some labs do not always agree with it. A surprising result is a reason to ask which method was used and, when the clinical story and the number do not match, to repeat the test with immunofluorescence rather than to collect three more screens of the same kind.",
        ],
      },
      {
        heading: "How clinicians decide the result does not change your care",
        paragraphs: [
          "The decision is clinical. No symptoms of a connective tissue disease, a low titer, a nonspecific pattern, and negative follow-up antibodies usually mean watchful waiting rather than immune-suppressing drugs. The plan might be no repeat test at all, or a repeat only if new symptoms appear. Treating a number, in the absence of disease, exposes you to medicines you do not need.",
          "The opposite mistake is reassurance that is too fast. Night sweats, fevers, swollen joints, a rash that scars, chest pain when you breathe, foamy urine, or falling blood counts are not 'just stress' because the first antibody panel was mixed. Those findings need a clinician who will examine you, not a blog that will clear you.",
          "At Dr. Autoimmune we use the ANA as a starting constraint. If the result is likely incidental, we say so and look at the symptoms that actually brought you in, whether those are fatigue, gut symptoms, or a thyroid problem. If the result might be early connective tissue disease, we order the more specific antibodies and we refer to rheumatology when that referral will answer a question we cannot.",
        ],
      },
      {
        heading: "What to bring so the visit is not a rerun",
        paragraphs: [
          "Bring every ANA report, not a portal summary. The method, the titer, the pattern, and the lab's cutoff are the useful lines. Add a medication list with start dates, a short symptom diary, and any photos of rashes. If a relative has lupus, Sjögren's, or rheumatoid arthritis, say so. Family history changes how carefully a low titer is watched. It still does not turn the titer into a diagnosis.",
          "Ask three questions before you leave: does this result match a disease I might have, which follow-up antibody would change the plan, and what symptom should make me call sooner than the next scheduled visit? Those questions keep a false-positive scare from becoming either ignored inflammation or an unnecessary label.",
          "If you have had more than one ANA, line the reports up by date, laboratory, method, titer, and pattern. A change from 1:80 to 1:160 at a different lab is not automatically a worsening. A change in pattern, or a new specific antibody such as anti-dsDNA, is more meaningful than a small titer move. Write down symptoms that were present on each draw date. A positive test during a viral illness, with a later negative test and no rheumatic symptoms, is a very different story from a rising titer plus new joint swelling. The folder you bring should make that difference obvious in five minutes.",
        ],
      },
    ],
    [
      {
        question: "Can stress alone make an ANA test positive?",
        answer: [
          "Stress is not a standard explanation for a positive ANA the way infection, age, sex, medication, and autoimmune disease are. Stress can worsen how you feel and can coincide with the week the test was drawn. It should not be used to dismiss a titer that comes with real inflammatory signs. It also should not be treated as the proven cause of the antibody.",
        ],
      },
      {
        question: "Should I repeat a positive ANA every month until it is negative?",
        answer: [
          "No. Repeat the test when a clinician has a decision that depends on the trend, or when your symptoms change in a meaningful way. Monthly repeats of a stable, low-titer result mostly reproduce anxiety. If a repeat is worth doing, ask whether it should be run by immunofluorescence so you are not comparing two different methods.",
        ],
      },
    ],
    [medlineAna, niamsAutoimmune, niamsLupus],
  ),
  "can-stress-trigger-autoimmune-disease-flares": extra(
    [
      "Patients ask this because they can feel the pattern: a hard month, poor sleep, then a flare of joint pain, a rash, gut symptoms, or crushing fatigue. The honest answer is that stress is a plausible contributor to flares for many people, and it is not a complete explanation of why an autoimmune disease starts or how it should be treated.",
    ],
    [
      {
        heading: "What stress can change in the body",
        paragraphs: [
          "Psychological stress activates the hypothalamic-pituitary-adrenal axis and the sympathetic nervous system. Cortisol and adrenaline shift in the short term to help you cope. When the demand does not let up, sleep shortens, heart rate stays higher, muscles stay tight, and digestion slows because blood flow is prioritized elsewhere. People living with autoimmune disease often notice that this is the same week symptoms intensify. That observation is common enough to take seriously even though a single stressful week is not a lab test.",
          "Sleep loss is the part patients can sometimes measure. Short sleep increases pain sensitivity and makes fatigue feel medical even when the underlying disease activity is stable. Pain then disrupts the next night. The loop is real, and it is not 'all in your head' in the dismissive sense. The brain and the immune system share signaling molecules. Calling the flare stress-related does not mean the inflammation is imaginary.",
          "What stress does not do, on current evidence, is give a simple on-off switch. Major stress does not produce the same flare in every person with the same diagnosis. Infection, medication changes, ultraviolet light in lupus, gluten exposure in celiac disease, and hormonal shifts remain separate, testable triggers. A good history asks about all of them instead of stopping at the worst week at work.",
        ],
      },
      {
        heading: "Flares versus the start of a disease",
        paragraphs: [
          "Triggering a flare in someone who already has rheumatoid arthritis, lupus, Hashimoto's, or inflammatory bowel disease is a different claim from causing the disease in the first place. Autoimmune diseases have genetic susceptibility and immune dysregulation that stress did not create alone. Trauma and chronic stress show up in patient stories often. They are not, by themselves, a diagnosis, and they are not a reason to skip disease-specific treatment that is keeping an organ safe.",
          "If you are in an active flare, stress reduction is an adjunct. It does not replace the plan your rheumatologist, gastroenterologist, or endocrinologist is using to protect joints, kidneys, bowel, or thyroid. Tell those clinicians about the stressor. Do not quietly stop a prescribed immune-modulating drug because you have decided stress was the only cause.",
        ],
      },
      {
        heading: "What is worth changing, and what is wishful",
        paragraphs: [
          "The changes with the clearest day-to-day payoff are unglamorous: a regular sleep window, a limit on alcohol during a flare, food you already know you tolerate, and a plan for pain that does not rely only on willing yourself calm. Brief, repeatable practices such as paced breathing, a short walk, or a scheduled call with someone who does not minimize your symptoms are more realistic than a personality overhaul during a flare.",
          "Be wary of programs that promise to reverse autoimmune disease by clearing stress, especially if they ask you to abandon monitoring labs or prescribed treatment. Mind-body work can reduce symptom burden. It has not earned the right to be sold as a cure. If a practice helps you function, keep it and keep the medical follow-up.",
          "At Dr. Autoimmune we ask about stress the same way we ask about infections, sleep, and diet: as a possible amplifier of immune symptoms, documented in your timeline. We do not tell you the disease is your fault for being stressed. We look for the amplifiers we can actually change, and we coordinate with the specialists already treating the diagnosis.",
        ],
      },
      {
        heading: "When a flare is not 'just stress'",
        paragraphs: [
          "New chest pain, shortness of breath, one-sided weakness, black stools, high fever, rapidly swelling joints, a severe headache that is new for you, or confusion are emergency symptoms. They are not a mindfulness problem. Call emergency services or your specialist's on-call line. A stressful month can sit next to a dangerous flare. The stress does not make the danger smaller.",
          "If flares are coming closer together, write down the dates, the symptoms, and what else changed: an infection, a new drug, travel, a big sleep debt, or sun exposure. That page is more useful than a general statement that you have been stressed. It gives the next visit something to test.",
        ],
      },
    ],
    [
      {
        question: "Can therapy or meditation replace my autoimmune medication?",
        answer: [
          "No. Counseling, meditation, and sleep work can make flares easier to live with and sometimes less frequent. They are not substitutes for medication that is preventing organ damage. Any change to immune-modulating treatment has to be planned with the clinician who prescribed it, using your labs and exam, not a wellness plan alone.",
        ],
      },
      {
        question: "How do I talk about stress without being told it is all psychological?",
        answer: [
          "Describe the sequence with dates: what happened, how sleep changed, which symptoms followed, and which symptoms are new. Ask which of those symptoms would still need testing if stress were not in the story. A clinician who will only accept one explanation, either 'purely stress' or 'purely disease,' is missing the way these illnesses actually behave.",
        ],
      },
    ],
    [
      niamsAutoimmune,
      {
        name: "NIMH: I'm so stressed out! Fact sheet",
        url: "https://www.nimh.nih.gov/health/publications/so-stressed-out-fact-sheet",
      },
      {
        name: "NIAMS: Rheumatoid arthritis",
        url: "https://www.niams.nih.gov/health-topics/rheumatoid-arthritis",
      },
    ],
  ),
  ...LEARN_ENRICHMENT_MORE,
};
