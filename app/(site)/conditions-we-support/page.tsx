import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import { withUnifiedMedicalClinic } from "@/lib/organization-jsonld";
import ConditionsWeSupportPage from "@/components/pages/ConditionsWeSupportPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/conditions-we-support", () => buildMetadata("conditions-we-support"));
}

export default function Page() {
  const page = getPageContent("conditions-we-support");
  return (
    <CMSRoute path="/conditions-we-support">
    <>
      {page && <JsonLd blocks={withUnifiedMedicalClinic(page.jsonLd)} />}
      <ConditionsWeSupportPage />
    </>
    </CMSRoute>
  );
}
