import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import CareersPage from "@/components/pages/CareersPage";
import { SITE_URL } from "@/lib/site";
import { medicalClinicRef, withUnifiedMedicalClinic } from "@/lib/organization-jsonld";

const TITLE = "Career Opportunities at Dr. Autoimmune";
const DESCRIPTION =
  "Dr. Autoimmune is hiring a full-time, 100% remote Metabolic Coordinator (clinical nutritionist). See the role, pay, benefits, and how to apply.";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/careers", {
    title: `${TITLE} | Metabolic Coordinator`,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/careers/` },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}/careers/`,
      type: "website",
    },
  });
}

export default function Page() {
  const blocks = withUnifiedMedicalClinic([
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Careers" },
        ],
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: TITLE,
        url: `${SITE_URL}/careers/`,
        description: DESCRIPTION,
        about: medicalClinicRef(),
      },
    },
  ]);

  return (
    <CMSRoute path="/careers">
      <>
        <JsonLd blocks={blocks} />
        <CareersPage />
      </>
    </CMSRoute>
  );
}
