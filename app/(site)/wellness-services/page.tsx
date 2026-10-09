import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import WellnessServicesPage from "@/components/pages/WellnessServicesPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/wellness-services", () => buildMetadata("wellness-services"));
}

export default function Page() {
  const page = getPageContent("wellness-services");

  return (
    <CMSRoute path="/wellness-services">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <WellnessServicesPage />
    </>
    </CMSRoute>
  );
}
