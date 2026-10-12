/**
 * Single MedicalClinic entity used site-wide. All page JSON-LD should
 * reference this @id rather than emitting duplicate clinic objects.
 * Facts only: Boulder base, published phone, telehealth, CO/Denver/US areaServed.
 * No state licensing claims.
 */

import { SITE_CONTACT } from "@/components/layout/nav-links";
import { SITE_URL } from "@/lib/site";

export const MEDICAL_CLINIC_ID = `${SITE_URL}/#medicalclinic`;

/** Full MedicalClinic node — emit once per page graph (or as publisher/about). */
export function medicalClinicEntity(
  extras: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    "@type": "MedicalClinic",
    "@id": MEDICAL_CLINIC_ID,
    name: "Dr. Autoimmune",
    url: `${SITE_URL}/`,
    telephone: SITE_CONTACT.phone,
    image: `${SITE_URL}/images/og/default.jpg`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Boulder",
      addressRegion: "CO",
      addressCountry: "US",
    },
    areaServed: [
      { "@type": "City", name: "Boulder" },
      { "@type": "City", name: "Denver" },
      { "@type": "State", name: "Colorado" },
      { "@type": "Country", name: "United States" },
    ],
    availableService: {
      "@type": "MedicalTherapy",
      name: "Telehealth Functional Medicine Consultation",
    },
    description:
      "Boulder-based functional medicine practice offering telehealth care for autoimmune and chronic conditions.",
    ...extras,
  };
}

/** Compact reference to the site-wide MedicalClinic @id. */
export function medicalClinicRef(): { "@id": string } {
  return { "@id": MEDICAL_CLINIC_ID };
}
