/**
 * Single MedicalClinic entity used site-wide. All page JSON-LD should
 * reference this @id rather than emitting duplicate clinic objects.
 * Facts only: Boulder base, published phone, telehealth, CO/Denver/US areaServed.
 * No state licensing claims.
 */

import type { JsonLdBlock } from "@/lib/content";
import { SITE_CONTACT } from "@/components/layout/nav-links";
import { stripLegacyWordPressSchema } from "@/lib/legacy-schema";
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

function isClinicType(type: unknown): boolean {
  const types = Array.isArray(type) ? type : type ? [type] : [];
  return types.includes("MedicalClinic") || types.includes("MedicalBusiness");
}

/**
 * Collapse nested MedicalClinic / MedicalBusiness objects (publisher, about,
 * etc.) to `{ "@id": MEDICAL_CLINIC_ID }`. Does not rewrite the top-level node.
 */
function collapseNestedClinics(node: unknown, depth = 0): unknown {
  if (Array.isArray(node)) return node.map((item) => collapseNestedClinics(item, depth));
  if (!node || typeof node !== "object") return node;
  const obj = { ...(node as Record<string, unknown>) };

  if (depth > 0 && isClinicType(obj["@type"]) && obj["@id"] !== MEDICAL_CLINIC_ID) {
    return medicalClinicRef();
  }

  for (const key of Object.keys(obj)) {
    if (key === "@context") continue;
    obj[key] = collapseNestedClinics(obj[key], depth + 1);
  }
  return obj;
}

/**
 * Ensure one MedicalClinic entity with `#medicalclinic` and collapse nested
 * duplicates (including migrated Rank Math publishers) to `@id` refs.
 * Drops top-level MedicalBusiness/MedicalClinic blocks that are not the
 * canonical entity (home JSON, booking helpers, etc. are re-emitted once).
 */
export function withUnifiedMedicalClinic(blocks: JsonLdBlock[]): JsonLdBlock[] {
  const collapsed: JsonLdBlock[] = [];

  for (const block of stripLegacyWordPressSchema(blocks)) {
    if (!block.data) {
      collapsed.push(block);
      continue;
    }
    const data = block.data as Record<string, unknown>;
    if (isClinicType(data["@type"]) && data["@id"] !== MEDICAL_CLINIC_ID) {
      // Drop legacy top-level clinic/business; canonical entity is added below.
      continue;
    }
    collapsed.push({
      ...block,
      data: collapseNestedClinics(data) as Record<string, unknown>,
    });
  }

  const hasEntity = collapsed.some((block) => {
    const d = block.data as Record<string, unknown> | undefined;
    return d?.["@type"] === "MedicalClinic" && d?.["@id"] === MEDICAL_CLINIC_ID;
  });

  if (hasEntity) return collapsed;

  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        ...medicalClinicEntity(),
      },
    },
    ...collapsed,
  ];
}
