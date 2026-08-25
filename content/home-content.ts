/**
 * Hand-extracted homepage copy from the migrated `content/data/home.json`
 * record (sourced from the live drautoimmune.com homepage). Kept as typed
 * data so the componentized homepage renders the exact live copy without
 * re-parsing markdown.
 *
 * Note: the live page's DOM contains the entire homepage content twice in
 * a row (an apparent uncleaned Elementor A/B section) with small copy
 * variants between the two passes — e.g. "Comprehensive New Patient
 * Evaluation" vs "90-Minute New Patient Exam", "Metabolic Coordinator" vs
 * "nutritionist". We use the first pass verbatim throughout and intentionally
 * drop the duplicate second pass (flagged during the earlier content
 * migration step as a known live-site artifact, not something to preserve
 * twice in a clean rebuild).
 */

export const HERO = {
  eyebrow: "Featuring 100% Remote Care",
  /** Real page/condition names from the site, used as the pill tag row above the headline. */
  tags: ["Wellness Services", "Conditions We Support", "Thyroid Conditions"],
  headline: "We Are Autoimmune Wellness Specialists",
  mission:
    "Our mission is to empower patients with chronic and complex autoimmune conditions by identifying the root cause and providing natural solutions that promote optimal health.",
  primaryCta: { label: "Book your Discovery Call", href: "/discovery-call/" },
  secondaryCta: { label: "Explore Our Services", href: "/wellness-services/" },
  /** Proof/stat strip — real facts pulled from the site (address, credentials, tagline). */
  stats: [
    { value: "100%", label: "Remote Care" },
    { value: "Root-Cause", label: "Approach" },
    { value: "FMCP", label: "Certified" },
    { value: "Boulder, CO", label: "Nationwide Care" },
  ],
};

export const APPROACH = {
  heading: "Where Medical Expertise Meets Personalized Healing",
  intro:
    "The Dr. Autoimmune team works with a wide range of complex medical concerns, including conditions that have not improved with standard care. Our mission is to identify the underlying drivers of symptoms and guide patients toward meaningful, lasting improvement.",
  /** Short feature pills shown as a 2x2 grid alongside the collage. */
  pills: [
    { icon: "heart-pulse", label: "Personalized care plans" },
    { icon: "shield", label: "Gentle, evidence-based methods" },
    { icon: "sparkles", label: "Years of functional-medicine training" },
    { icon: "target", label: "Whole-body, lasting results" },
  ],
  items: [
    {
      title: "Holistic Approach",
      description:
        "Through a holistic approach, we make decisions by exploring one's experience as a whole: body, mind, environment, and lifestyle. Factors contributing to your symptoms may come from a variety of areas. A standardized version of care is likely not going to address the root cause or promote overall wellness.",
    },
    {
      title: "Customized Wellness Plans",
      description:
        "Every individual is unique, that's why Dr. Autoimmune cares for each individual on a case-by-case basis, building a customized wellness plan that fits your unique needs. We listen to your story and work together to formulate your custom plan.",
    },
    {
      title: "Empowering Independence",
      description:
        "We are dedicated to helping your body function optimally by uncovering the right tools and lifestyle modifications. After working with the Dr. Autoimmune team, you will gain knowledge and resources to keep your health on track for years to come.",
    },
  ],
};

export const SERVICES = {
  heading: "Our Specialized Wellness Services",
  intro:
    "At Dr. Autoimmune, we provide comprehensive functional medicine services designed to uncover the root causes of autoimmune and chronic conditions. Our personalized care plans combine advanced testing, natural therapies, and lifestyle guidance to help you restore balance, reduce inflammation, and achieve lasting wellness.",
  /**
   * Full catalog of core services + all supported conditions, in the same
   * order as the live-site navigation. Every `image` path resolves to a
   * migrated local copy of the corresponding live-site hero image
   * (`public/images/migrated/<slug>/`), so nothing is fetched cross-origin
   * from the (bot-protected) live CDN.
   */
  cards: [
    {
      category: "Service",
      image: "/images/services/wellness-services.jpg",
      title: "Wellness Services",
      description:
        "Advanced testing, personalized care plans, and natural solutions that help you achieve balance, boost energy, and support long-term vitality.",
      href: "/wellness-services/",
    },
    {
      category: "Service",
      image: "/images/services/new-patient-evaluation.png",
      title: "New Patient Evaluation",
      description:
        "An in-depth, personalized evaluation to uncover the root cause of your symptoms and build a targeted plan for lasting wellness.",
      href: "/book-new-patient-evaluation/",
    },
    {
      category: "Service",
      image: "/images/services/conditions-we-support-v2.png",
      title: "Conditions We Support",
      description:
        "A wide range of autoimmune and chronic conditions, especially those that haven't improved with standard medical care.",
      href: "/conditions-we-support/",
    },
    {
      category: "Condition",
      image: "/images/migrated/thyroid-conditions/vecteezy_cervical-lymphadenitis-of-the-right-side-in-a-woman_51694990-scaled.jpg",
      title: "Thyroid Conditions",
      description:
        "Over 90% of thyroid conditions are autoimmune. We find the true drivers behind fatigue, brain fog, and hormone imbalance.",
      href: "/thyroid-conditions/",
    },
    {
      category: "Condition",
      image: "/images/migrated/hashimotos-thyroiditis-graves/d975af0d-060e-4e8d-9c86-eb42a4638cc9_shutterstock_1643575045.avif",
      title: "Hashimoto's Thyroiditis",
      description:
        "A functional medicine approach to Hashimoto's that goes beyond hormone replacement to address the root immune drivers.",
      href: "/hashimotos-thyroiditis-graves/",
    },
    {
      category: "Condition",
      image: "/images/migrated/graves-disease/b311e27464f7d6f6e62ee48003f089b2.webp",
      title: "Graves Disease",
      description:
        "Root-cause support for Graves' disease, identifying immune triggers and restoring balance without over-suppressing the thyroid.",
      href: "/graves-disease/",
    },
    {
      category: "Condition",
      image: "/images/migrated/rheumatoid-arthritis/close-up-old-patient-with-wrist-issues-scaled.jpg",
      title: "Rheumatoid Arthritis",
      description:
        "Uncover what's driving joint inflammation with advanced testing and a personalized plan to calm the autoimmune response.",
      href: "/rheumatoid-arthritis/",
    },
    {
      category: "Condition",
      image: "/images/conditions/type-1-diabetes.jpg",
      title: "Type 1 Diabetes",
      description:
        "Functional medicine support for Type 1 Diabetes focused on immune modulation, gut health, and nutritional resilience.",
      href: "/type-1-diabetes/",
    },
    {
      category: "Condition",
      image: "/images/migrated/inflammatory-bowel-disease/632bc0a75b290964bff995f1_Prosper-Nutrition-Inflammatory-Bowel-Disease.jpg",
      title: "Inflammatory Bowel Disease",
      description:
        "Targeted, root-cause care for Crohn's and ulcerative colitis, restoring the gut lining, microbiome, and immune balance.",
      href: "/inflammatory-bowel-disease/",
    },
    {
      category: "Condition",
      image: "/images/migrated/celiac-disease-and-gluten-intolerance/colyak-hastaligi.jpg",
      title: "Celiac & Gluten Intolerance",
      description:
        "Precise testing plus a comprehensive plan for celiac, gluten sensitivity, and the downstream autoimmune consequences.",
      href: "/celiac-disease-and-gluten-intolerance/",
    },
    {
      category: "Condition",
      image: "/images/migrated/multiple-sclerosis/2177627.jpg",
      title: "Multiple Sclerosis",
      description:
        "A whole-body approach to MS, addressing the environmental, gut, and immune triggers behind relapses and progression.",
      href: "/multiple-sclerosis/",
    },
    {
      category: "Condition",
      image: "/images/migrated/lupus/large-19.webp",
      title: "Lupus",
      description:
        "Personalized care for lupus that targets the immune drivers and lifestyle factors fueling flares, so you can feel like yourself again.",
      href: "/lupus/",
    },
    {
      category: "Condition",
      image: "/images/migrated/sjogrens-syndrome/full-shot-sad-woman-holding-pillow-bed-scaled.jpg",
      title: "Sjögren's Syndrome",
      description:
        "Beyond symptom relief, a functional plan for Sjögren's that addresses the deeper autoimmune and hormonal patterns.",
      href: "/sjogrens-syndrome/",
    },
    {
      category: "Condition",
      image: "/images/migrated/anxiety-depression/Untitled-design-13-768x512-1-1.jpg",
      title: "Anxiety & Depression",
      description:
        "A biochemistry-first look at anxiety and depression: nutrients, gut, hormones, and inflammation, not just neurotransmitters.",
      href: "/anxiety-depression/",
    },
    {
      category: "Condition",
      image: "/images/migrated/adhd-add/HowDoesADHDAffectRelationships_.webp",
      title: "ADHD / ADD",
      description:
        "Support for ADHD/ADD that targets the underlying gut, nutrient, and metabolic drivers of focus and mood.",
      href: "/adhd-add/",
    },
    {
      category: "Condition",
      image: "/images/migrated/other-autoimmune-conditions/image-6.jpeg",
      title: "Other Autoimmune Conditions",
      description:
        "If your condition isn't listed, we still likely support it, the functional medicine framework applies to virtually every autoimmune presentation.",
      href: "/other-autoimmune-conditions/",
    },
    {
      category: "Condition",
      image: "/images/migrated/raynauds-phenomenon/1800x1200_raynauds_disease_and_raynauds_syndrome_bigbead.webp",
      title: "Raynaud's Phenomenon",
      description:
        "Root-cause care for Raynaud's, targeting circulation, autoimmune drivers, and the systemic patterns behind episodes.",
      href: "/raynauds-phenomenon/",
    },
  ],
};

/**
 * Curated 6-item "Our Specialties" spotlight — a focused subset of
 * `SERVICES.cards` conditions used by the interactive specialty list
 * on the homepage. Order matches the site nav's top conditions.
 */
export const SPECIALTIES = {
  eyebrow: "Our Specialties",
  heading: "Care crafted around you",
  accent: "around you",
  intro: "Safe, natural strategies, from thyroid conditions to complex autoimmune care.",
  items: [
    {
      title: "Thyroid Conditions",
      description:
        "Over 90% of thyroid conditions are autoimmune. We uncover the immune, gut, and nutrient drivers behind fatigue, brain fog, and hormone imbalance.",
      image: "/images/migrated/thyroid-conditions/vecteezy_cervical-lymphadenitis-of-the-right-side-in-a-woman_51694990-scaled.jpg",
      href: "/thyroid-conditions/",
    },
    {
      title: "Hashimoto's Thyroiditis",
      description:
        "A functional-medicine plan for Hashimoto's that goes beyond hormone replacement to calm the autoimmune attack at its source.",
      image: "/images/migrated/hashimotos-thyroiditis-graves/d975af0d-060e-4e8d-9c86-eb42a4638cc9_shutterstock_1643575045.avif",
      href: "/hashimotos-thyroiditis-graves/",
    },
    {
      title: "Rheumatoid Arthritis",
      description:
        "Advanced testing and a personalized plan to uncover what's driving joint inflammation and calm the autoimmune response, without over-relying on immunosuppressants.",
      image: "/images/migrated/rheumatoid-arthritis/close-up-old-patient-with-wrist-issues-scaled.jpg",
      href: "/rheumatoid-arthritis/",
    },
    {
      title: "Inflammatory Bowel Disease",
      description:
        "Targeted, root-cause care for Crohn's and ulcerative colitis, restoring the gut lining, microbiome, and immune balance for lasting relief.",
      image: "/images/migrated/inflammatory-bowel-disease/632bc0a75b290964bff995f1_Prosper-Nutrition-Inflammatory-Bowel-Disease.jpg",
      href: "/inflammatory-bowel-disease/",
    },
    {
      title: "Celiac & Gluten Intolerance",
      description:
        "Precise testing plus a comprehensive plan for celiac, gluten sensitivity, and the downstream autoimmune consequences that so often follow.",
      image: "/images/migrated/celiac-disease-and-gluten-intolerance/colyak-hastaligi.jpg",
      href: "/celiac-disease-and-gluten-intolerance/",
    },
    {
      title: "Multiple Sclerosis",
      description:
        "A whole-body approach to MS, addressing the environmental, gut, and immune triggers behind relapses and progression.",
      image: "/images/migrated/multiple-sclerosis/2177627.jpg",
      href: "/multiple-sclerosis/",
    },
  ],
};

export const TESTIMONIALS = {
  heading: "Real Results from Real Patients",
  intro:
    "If you're ready for real hope from real Dr. Autoimmune patients, these stories show the health transformation possible through a root cause approach.",
  cta: { label: "Ready to be the next success story?", href: "/discovery-call/" },
  /**
   * Google-review-style testimonials. `rating` is a 1-5 integer,
   * `timeAgo` mirrors the "N months ago" copy Google places under each
   * review. `verified` renders the small Google check-mark chip.
   */
  items: [
    {
      quote: "I am pain free after having 5 years of inflammation and joint pain.",
      author: "Jennifer D.",
      condition: "Polymyalgia Rheumatica",
      rating: 5,
      timeAgo: "2 months ago",
      verified: true,
    },
    {
      quote:
        "I have lost about 25 pounds, my joints don't hurt anymore and I have more energy.",
      author: "Lisa H.",
      condition: "Thyroid and Neuropathy",
      rating: 5,
      timeAgo: "5 months ago",
      verified: true,
    },
    {
      quote:
        "Within a month I lost 20 pounds. I no longer have brain fog or bloating. My energy is back.",
      author: "Megan K.",
      condition: "Hashimoto's",
      rating: 5,
      timeAgo: "3 weeks ago",
      verified: true,
    },
    {
      quote: "I feel like a new person. I have energy again. My pain is gone and I finally feel like myself.",
      author: "Anonymous",
      condition: "Autoimmune",
      rating: 5,
      timeAgo: "1 month ago",
      verified: true,
    },
    {
      quote:
        "After years of feeling dismissed by other doctors, Dr. Hollaman actually listened. His team dug into the root cause and finally I have answers, and a plan that's working.",
      author: "Sarah M.",
      condition: "Hashimoto's Thyroiditis",
      rating: 5,
      timeAgo: "6 months ago",
      verified: true,
    },
    {
      quote:
        "The remote care has been life-changing. I get expert functional-medicine support from home and my symptoms are 80% better.",
      author: "David R.",
      condition: "IBS + Chronic Fatigue",
      rating: 5,
      timeAgo: "4 months ago",
      verified: true,
    },
    {
      quote:
        "My anxiety and depression have improved more in six months here than in ten years of conventional treatment. This team gets it.",
      author: "Emily P.",
      condition: "Anxiety & Depression",
      rating: 5,
      timeAgo: "7 months ago",
      verified: true,
    },
    {
      quote:
        "I was skeptical at first, but the personalized plan and regular check-ins made all the difference. My labs finally look normal.",
      author: "Michael T.",
      condition: "Autoimmune Thyroid",
      rating: 5,
      timeAgo: "2 months ago",
      verified: true,
    },
    {
      quote:
        "Dr. Autoimmune is the first practice that treated me like a whole person, not a diagnosis. My gut is healing and my energy is back.",
      author: "Rachel G.",
      condition: "Inflammatory Bowel Disease",
      rating: 5,
      timeAgo: "8 months ago",
      verified: true,
    },
    {
      quote:
        "The comprehensive lab work uncovered issues no one else even thought to check for. I finally understand what's driving my flares.",
      author: "Karen B.",
      condition: "Lupus",
      rating: 5,
      timeAgo: "3 months ago",
      verified: true,
    },
  ],
};

export const PROCESS = {
  heading: "How Our Care Process Works",
  intro:
    "A simple, guided path that helps you feel understood, supported, and finally provides clarity for the next steps on your health journey.",
  cta: { label: "Book your Discovery Call", href: "/discovery-call/" },
  steps: [
    {
      title: "Discovery Call",
      image: "/images/process/discovery-call.webp",
      description:
        "This is often the first time people feel truly heard. During this phone call with our New Patient Coordinator, you will talk openly about your symptoms, health history, and what you have been experiencing. We will share how functional medicine targets your root cause and how our team approaches chronic, complex, autoimmune concerns. By the end of the call, you will gain a clear understanding of whether our care is a good fit and what your next step will look like.",
    },
    {
      title: "Comprehensive New Patient Evaluation",
      image: "/images/process/comprehensive-new-patient-evaluation.jpg",
      description:
        "In this thorough evaluation with a member of Dr. Hollaman's clinical team, we bring together your clinical history, symptom patterns, and blood analysis to begin identifying the root drivers of your condition. Your evaluation helps clarify the connections in your health history and guides the creation of your individualized care plan.",
    },
    {
      title: "Personalized Functional Medicine Care Plan",
      image: "/images/migrated/home/provide-healthy-eating-information.jpg",
      description:
        "This is your ongoing, customized care experience. You will have regular check-ins with our clinical team, dedicated visits with your Metabolic Coordinator, strategic testing to guide progress, and individualized adjustments to your diet, lifestyle, and supplements. Every part of your plan is tailored to your needs and supported by a team that walks with you each step of the way.",
    },
  ],
};

export const DOCTOR = {
  heading: "Meet Dr. Ian Hollaman, DC, MSc, FMCP",
  paragraphs: [
    "Dr. Ian Hollaman empowers his patients to achieve their health goals through functional medicine approaches. He too has experienced the endless cycle of traditional healthcare which sparked his determination to provide a different type of experience for his own patients. During his graduate studies, Dr Ian became chronically ill, and after eight providers, he found a functional medicine doctor that guided him back to health. Dr Ian's experience inspired his journey to master the art of functional medicine!",
    "Dr. Ian is a board-certified chiropractic physician in the state of Colorado. He is a certified functional medicine practitioner through the Institute of Functional Medicine and holds a Master's in Nutrition and Functional Medicine alongside functional neurology/neurofeedback certifications through the American Functional Neurology Institute. Learn more about Dr. Autoimmune below!",
  ],
  /** Credential checklist — the same facts from the paragraph above, itemized. */
  credentials: [
    "Board-certified chiropractic physician in the state of Colorado",
    "Certified functional medicine practitioner, Institute of Functional Medicine",
    "Master's in Nutrition and Functional Medicine",
    "Functional neurology/neurofeedback certification, American Functional Neurology Institute",
  ],
  cta: { label: "More About Dr. Autoimmune", href: "/about-us/" },
};

export const CONSULTATION = {
  heading: "Start Your Health Consultation",
  intro:
    "Do you have questions about your health and can't seem to find the answers you're looking for? We're here to help. Our team is experienced in working with a variety of medical conditions. Whether your condition hasn't improved with standard medical care or you want an explanation for the symptoms you're feeling, Dr. Autoimmune is here to provide you with relief. Schedule a consultation below!",
  items: [
    {
      title: "Expert Care for Complex Conditions",
      description:
        "Our team specializes in helping patients whose symptoms haven't improved with standard medical treatments.",
    },
    {
      title: "Personalized, Root-Cause Approach",
      description: "We go beyond surface symptoms to identify and address the underlying causes of your health issues.",
    },
    {
      title: "Comprehensive Support",
      description:
        "From thyroid and rheumatologic to other autoimmune conditions, we provide compassionate, evidence-based care.",
    },
    {
      title: "Convenient Remote Consultations",
      description: "Access expert guidance from anywhere with our 100% online functional medicine consultations.",
    },
  ],
  cta: { label: "Book your Discovery Call", href: "/discovery-call/" },
};

export const PRODUCTS = {
  heading: "Explore Our Wellness Products",
  intro: "Clinically selected supplements designed to support your overall health and daily foundation.",
  cta: { label: "Shop Now", href: "https://shop.drautoimmune.com/" },
};

/**
 * Product carousel data — 5 real Dr. Autoimmune supplements sourced
 * directly from shop.drautoimmune.com (Shopify CDN was accessible and
 * downloaded locally to `public/images/products/`). Each entry keeps
 * a link back to its shop page as the primary CTA target.
 */
export const PRODUCTS_CATALOG = [
  {
    slug: "gut-power",
    name: "GutPower",
    tagline: "Mucosa & Digestive Support",
    description:
      "Hydrochloric acid + Zinc Carnosine: supports stomach acid, mucosal lining, and healthy digestion.",
    image: "/images/products/gut-power.png",
    href: "https://shop.drautoimmune.com/products/gutpower",
  },
  {
    slug: "collagen-power",
    name: "Collagen Power",
    tagline: "Bone, Joint & Skin Support",
    description:
      "Research-backed collagen peptides supporting connective tissue, joint comfort, and skin resilience.",
    image: "/images/products/collagen-power.png",
    href: "https://shop.drautoimmune.com/products/collagen-power",
  },
  {
    slug: "immuno-power",
    name: "ImmunoPower",
    tagline: "Immune & T-Cell Support",
    description:
      "A comprehensive immune complex designed to support immune signalling, T-cell function, and resilience.",
    image: "/images/products/immuno-power.png",
    href: "https://shop.drautoimmune.com/products/immunopower",
  },
  {
    slug: "nac-power",
    name: "NAC Power",
    tagline: "Antioxidant & Detox Support",
    description:
      "N-Acetyl Cysteine to support glutathione, respiratory, and antioxidant pathways.",
    image: "/images/products/nac-power.png",
    href: "https://shop.drautoimmune.com/products/nacpower",
  },
  {
    slug: "leaky-gut-trio",
    name: "Leaky Gut Trio",
    tagline: "Gut Restoration Bundle",
    description:
      "A curated three-supplement bundle to support intestinal barrier integrity and gut healing.",
    image: "/images/products/leaky-gut-trio.png",
    href: "https://shop.drautoimmune.com/products/leaky-gut-trio",
  },
] as const;

export const WHY_CHOOSE_US = {
  heading: "Why Choose Us",
  items: [
    {
      title: "Root-Cause Approach",
      description:
        "We look beyond symptoms to uncover the underlying drivers of autoimmune, thyroid, and chronic conditions. Our goal is to help you finally understand why you feel the way you do.",
    },
    {
      title: "Personalized Functional Medicine Care",
      description: "Every patient receives a customized strategy tailored to their unique physiology, history, and goals.",
    },
    {
      title: "Comprehensive, Ongoing Support",
      description:
        "You're guided by a clinical team that includes Dr. Hollaman and a dedicated Metabolic Coordinator, with regular check-ins, testing, and adjustments to keep you progressing.",
    },
    {
      title: "100 Percent Remote Consultations",
      description:
        "Work with our team from anywhere in the United States and receive expert functional medicine care without travel or office visits.",
    },
    {
      title: "Proven Patient Results",
      description:
        "Patients come to us after years of frustration, and finally experience clarity, direction, and meaningful change through our process.",
    },
  ],
};

export const BLOG_INSIGHTS = {
  heading: "Insights for Autoimmune Wellness",
  intro:
    "Stay informed with expert articles, tips, and research updates from Dr. Autoimmune. Explore how lifestyle, nutrition, and functional medicine can help you uncover the root causes of chronic conditions and take control of your health naturally.",
  posts: [
    {
      image: "/images/migrated/home/Screenshot-2026-07-28-at-2.16.11-AM.png",
      title: "The Hidden Link Between Gut Health and Autoimmune Disease",
      excerpt:
        "The gut is home to 70% of the immune system: understanding how leaky gut, dysbiosis, and inflammation drive autoimmune disease.",
      category: "Gut Health",
      readTime: "8 min read",
      href: "/the-hidden-link-between-gut-health-and-autoimmune-disease/",
    },
    {
      image: "/images/migrated/home/Screenshot-2026-07-20-at-6.48.44-PM.png",
      title: "If My ANA Is Positive Do I Have an Autoimmune Disease?",
      excerpt:
        "A positive ANA is only one piece of the puzzle. Learn what it does, and doesn't, tell you about your immune health.",
      category: "Diagnosis",
      readTime: "5 min read",
      href: "/if-my-ana-is-positive-do-i-have-an-autoimmune-disease/",
    },
    {
      image: "/images/migrated/home/Screenshot-2026-07-13-at-8.30.50-PM.png",
      title: "I Eat Clean Why Do I Still Feel Sick?",
      excerpt:
        "Clean eating alone often isn't enough. Explore the hidden triggers behind chronic symptoms, from mold to gut dysbiosis.",
      category: "Nutrition",
      readTime: "6 min read",
      href: "/i-eat-clean-why-do-i-still-feel-sick/",
    },
  ],
};

export const FAQ = {
  heading: "Frequently Asked Questions",
  items: [
    {
      question: "How is your approach different from traditional medicine?",
      answer:
        "We use functional medicine, focusing on the whole person: body, mind, environment, and lifestyle. We aim to identify the root cause of your condition and create a personalized wellness plan for lasting health.",
    },
    {
      question: "What conditions do you treat?",
      answer: "We provide care for the following conditions:",
      list: [
        "Thyroid Conditions: Hashimoto's Thyroiditis, Graves' Disease",
        "Rheumatologic Conditions: Rheumatoid Arthritis",
        "Metabolic & Digestive Conditions: Type 1 Diabetes, Inflammatory Bowel Disease, Celiac Disease, Gluten Intolerance",
        "Neurological & Immune Conditions: Multiple Sclerosis, Sjögren's Syndrome, Raynaud's Phenomenon, ADHD / ADD",
        "Mental Health Conditions: Anxiety & Depression",
        "Other Autoimmune Conditions",
      ],
    },
    {
      question: "Do you offer remote care?",
      answer:
        "Yes! Our services are 100% remote, allowing patients to consult with us from anywhere and receive their personalized plan without leaving home.",
    },
    {
      question: "How long does it take to see results?",
      answer:
        "Results depend on the individual and the condition. Many patients notice improvements within weeks, while lasting changes often occur over a few months.",
    },
    {
      question: "Can you help if standard treatments haven't worked?",
      answer:
        "Absolutely. Our approach is designed for patients who haven't found relief with traditional care, focusing on root causes and customized wellness plans.",
    },
  ],
};
