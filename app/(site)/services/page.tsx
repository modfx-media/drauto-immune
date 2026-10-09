import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ServicesPage from "@/components/pages/ServicesPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/services", () => buildMetadata("services"));
}

export default function Page() {
  const page = getPageContent("services");

  return (
    <CMSRoute path="/services">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ServicesPage />
    </>
    </CMSRoute>
  );
}
