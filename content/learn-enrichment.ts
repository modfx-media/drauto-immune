import type { LearnCitation, LearnFaq, LearnSection } from "./learn-data";
import { LEARN_ENRICHMENT_REST } from "./learn-enrichment-rest";

export interface LearnExtra {
  intro: string[];
  sections: LearnSection[];
  faqs: LearnFaq[];
  citations: LearnCitation[];
}

const medlineAna: LearnCitation = {
  name: "MedlinePlus: ANA (antinuclear antibody) test",
  url: "https://medlineplus.gov/lab-tests/ana-antinuclear-antibody-test/",
};
const niamsAutoimmune: LearnCitation = {
  name: "NIAMS: Autoimmune diseases",
  url: "https://www.niams.nih.gov/health-topics/autoimmune-diseases",
};
export const LEARN_ENRICHMENT: Record<string, LearnExtra> = {
  "ana-titer-levels-explained": {
    intro: [
      "People usually meet this number on a printout, not in a classroom. The report may say positive, then list a titer such as 1:80, 1:160, or 1:320, plus a pattern such as speckled or homogeneous. Those two details answer different questions. The titer is about how far the lab could dilute the sample and still see the antibody. The pattern is about which structures inside the cell nucleus lit up. Neither line, by itself, names a disease.",
    ],
    sections: [
      {
        heading: "How to read the titer line on the report",
        paragraphs: [
          "Indirect immunofluorescence is the method most people mean when they talk about an ANA titer. The lab dilutes serum in steps, often doubling each time, and looks for a fluorescent stain. A result of 1:80 means staining was still seen when one part serum was mixed with 79 parts diluent. A result of 1:320 means staining was still seen after a much greater dilution. In plain language, the second sample had to be watered down further before the signal disappeared, so the antibody concentration was higher.",
          "Labs do not all use the same cutoff. One laboratory may call 1:40 positive and another may not report a titer until 1:80. That is why two reports from different labs are not always interchangeable, and why a clinician reads the number next to that lab's reference range rather than against a universal chart found online. If you are comparing an older result with a new one, note which lab ran each test.",
          "The titer is not a severity score. A person can have a 1:320 result and feel well, and another person can have a lower titer with clear inflammatory symptoms. Symptoms, the exam, the pattern, and more specific antibody tests carry the rest of the meaning. Treat the ratio as one measurement of antibody amount, not as a forecast.",
        ],
      },
      {
        heading: "What 1:80, 1:160, and 1:320 usually lead to",
        paragraphs: [
          "A low-positive result, often in the 1:40 to 1:80 range, is common enough in healthy adults that many clinicians do not chase it when there are no suggestive symptoms. Women are more likely than men to have a positive ANA without a diagnosed autoimmune disease. Age can matter too: positive results become more common later in life. A low titer plus a story of joint swelling, rashes, mouth ulcers, pleuritic chest pain, or unexplained fevers is a different situation from a low titer found on a panel ordered without a clear reason.",
          "A titer of 1:160 is a frequent point at which clinicians add more specific tests, especially if symptoms fit an autoimmune disease. Those follow-up tests look for antibodies aimed at particular proteins, such as double-stranded DNA, Smith antigen, Ro/SSA, La/SSB, Scl-70, or centromere proteins. The first ANA screen is broad. The second round asks which condition, if any, the antibodies resemble.",
          "A titer of 1:320 or higher gets attention because it is less often an incidental finding, but it is still not a diagnosis of lupus or of any other single disease. Lupus classification uses a combination of clinical findings and immunologic criteria. Anti-dsDNA and anti-Smith antibodies are more specific for systemic lupus than the ANA screen is. Some people with a high titer are monitored and never develop a named disease. Some people with autoimmune disease have titers that move up or down over time.",
        ],
      },
      {
        heading: "Patterns, and why the pattern is not the diagnosis either",
        paragraphs: [
          "Homogeneous staining is often discussed alongside antibodies to chromatin and is one of the patterns seen in lupus, but it is not exclusive to lupus. Speckled staining is a large family. It can be associated with mixed connective tissue disease, Sjögren's, lupus, and with antibodies that show up in people who do not have a rheumatic disease. Nucleolar and centromere patterns push the workup toward systemic sclerosis and related conditions, again only together with symptoms such as skin thickening, Raynaud's phenomenon, or dry eyes and dry mouth.",
          "Ask the ordering clinician to explain the pattern in the context of your symptoms rather than matching it to a disease list on your own. If the report says 'AC-1' or another International Consensus on ANA Patterns code, that code is a lab classification, not a diagnosis. Bring the full report, including the method, to the visit. A screenshot of only the word positive drops the information the next clinician needs.",
        ],
      },
      {
        heading: "What a functional medicine visit adds, and what it does not replace",
        paragraphs: [
          "At Dr. Autoimmune the ANA titer is read as part of a longer history: infections, medications, pregnancies, sun-sensitive rashes, joint pattern, gut symptoms, thyroid history, and prior labs. A root-cause visit can look at inflammation markers, nutrient status, sleep, and possible triggers that keep the immune system activated. That work sits beside, not instead of, rheumatology when the story suggests lupus, Sjögren's, scleroderma, or inflammatory arthritis.",
          "Do not start or stop immune-suppressing medication, or a drug prescribed for blood pressure or seizures, because of a titer you read about online. If a medication is a possible contributor, that decision belongs with the prescriber. Repeat testing has a purpose when symptoms change or when a clinician is watching a trend. Repeating the same screen every few weeks, without a question to answer, rarely helps.",
        ],
      },
    ],
    faqs: [
      {
        question: "Should I see a rheumatologist for a 1:80 ANA?",
        answer: [
          "Not automatically. Many people with a 1:80 result and no suggestive symptoms are not referred. A rheumatologist is the right next step when the titer is higher, the pattern is concerning, more specific antibodies are positive, or you have symptoms such as inflammatory joint pain, a malar rash, oral ulcers, chest pain with breathing, or unexplained low blood counts. Your own clinician is the person who should make that referral.",
        ],
      },
      {
        question: "Does the titer tell me how fast the disease is progressing?",
        answer: [
          "No. The dilution number is not a staging system. Disease activity, when a disease is actually present, is judged from symptoms, the exam, and tests chosen for that condition, such as complement levels or anti-dsDNA in lupus. A single titer cannot tell you whether you are getting better or worse.",
        ],
      },
    ],
    citations: [
      medlineAna,
      {
        name: "NIAMS: Systemic lupus erythematosus (lupus)",
        url: "https://www.niams.nih.gov/health-topics/lupus",
      },
      niamsAutoimmune,
    ],
  },
  ...LEARN_ENRICHMENT_REST,
};
