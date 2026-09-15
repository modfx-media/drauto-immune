export interface NavChild {
  label: string;
  href: string;
  /** Opens in a new tab (matches the live site's own external targets). */
  external?: boolean;
}

export interface NavItem {
  label: string;
  href: string;
  children?: readonly NavChild[];
  /**
   * When true, the dropdown for this item renders as a wide multi-column
   * "mega menu" (used for Conditions, which has 14 sub-items).
   */
  mega?: boolean;
  /** Opens in a new tab (used for Shop, which links out to the Shopify store). */
  external?: boolean;
}

/**
 * Main nav — labels, hrefs, and dropdown structure cloned exactly from the
 * live site's header (drautoimmune.com), mapped onto this rebuild's
 * internal routes. "Services" and "Conditions" link to their overview page
 * on click (the live site's own triggers were `href="#"` anchor-only) while
 * still opening a dropdown of the same sub-pages listed on the live menu.
 * Top-level order otherwise matches the live site exactly: About Us,
 * Services, Conditions, Patient Stories, Blog, Shop, Contact Us — Shop/
 * Contact Us are separate top-level items (not folded into a "More" menu).
 * A "Home" item (internal-only, not on the live site) was added back for
 * consistency with the rest of the nav.
 */
export const NAV_LINKS: readonly NavItem[] = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "About Us",
    href: "/about-us/",
    children: [{ label: "Featured Interviews", href: "/featured-interviews/" }],
  },
  {
    label: "Services",
    href: "/services/",
    children: [
      { label: "Book New Patient Evaluation", href: "/book-new-patient-evaluation/" },
      { label: "Conditions We Support", href: "/conditions-we-support/" },
      { label: "Wellness Services", href: "/wellness-services/" },
      { label: "Patient Portal", href: "https://drautoimmune.md-hq.com/", external: true },
    ],
  },
  {
    label: "Conditions",
    href: "/conditions-we-support/",
    mega: true,
    children: [
      { label: "Thyroid Conditions", href: "/thyroid-conditions/" },
      { label: "Hashimoto's Thyroiditis", href: "/hashimotos-thyroiditis-graves/" },
      { label: "Graves Disease", href: "/graves-disease/" },
      { label: "Rheumatoid Arthritis", href: "/rheumatoid-arthritis/" },
      { label: "Type 1 Diabetes", href: "/type-1-diabetes/" },
      { label: "Inflammatory Bowel Disease", href: "/inflammatory-bowel-disease/" },
      { label: "Celiac Disease and Gluten Intolerance", href: "/celiac-disease-and-gluten-intolerance/" },
      { label: "Multiple Sclerosis", href: "/multiple-sclerosis/" },
      { label: "Lupus", href: "/lupus/" },
      { label: "Sjögren's Syndrome", href: "/sjogrens-syndrome/" },
      { label: "Anxiety & Depression", href: "/anxiety-depression/" },
      { label: "ADHD / ADD", href: "/adhd-add/" },
      { label: "Other Autoimmune Conditions", href: "/other-autoimmune-conditions/" },
      { label: "Raynaud's Phenomenon", href: "/raynauds-phenomenon/" },
    ],
  },
  { label: "Patient Stories", href: "/patient-stories/" },
  { label: "Blog", href: "/blog/" },
  { label: "Shop", href: "https://shop.drautoimmune.com/", external: true },
  { label: "Contact Us", href: "/contact-us/" },
] as const;


export const SITE_CONTACT = {
  phone: "+1 (303) 882-8447",
  phoneHref: "tel:+13038828447",
  email: "npc@drautoimmune.com",
  emailHref: "mailto:npc@drautoimmune.com",
} as const;

export const DISCOVERY_CALL_HREF = "/discovery-call/";
