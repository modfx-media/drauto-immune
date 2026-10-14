export type ClimateLens =
  | "cold"
  | "sun"
  | "humid"
  | "dry"
  | "altitude"
  | "winterLight"
  | "swing";

export type FaqTemplate = {
  question: (stateName: string) => string;
  answer: (stateName: string) => string;
};

export type ConditionBank = {
  mechanisms: string[];
  symptomsNarrative: string[];
  testing: string[];
  nutritionTriggers: string[];
  functionalApproach: string[];
  whatToExpect: string[];
  /** Condition-specific sentence for each climate lens (qualitative, no rates or statistics). */
  climateLenses: Record<ClimateLens, string>;
  faqs: FaqTemplate[];
};
