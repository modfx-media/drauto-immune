import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import { withUnifiedMedicalClinic } from "@/lib/organization-jsonld";
import AboutUsPage from "@/components/pages/AboutUsPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/about-us", () => buildMetadata("about-us"));
}

export default function Page() {
  const page = getPageContent("about-us");

  return (
    <CMSRoute path="/about-us">
    <>
      {page && <JsonLd blocks={withUnifiedMedicalClinic(page.jsonLd)} />}
      <AboutUsPage />
    </>
    </CMSRoute>
  );
}
