import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import PatientStoriesPage from "@/components/pages/PatientStoriesPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/patient-stories", () => buildMetadata("patient-stories"));
}

export default function Page() {
  const page = getPageContent("patient-stories");

  return (
    <CMSRoute path="/patient-stories">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <PatientStoriesPage />
    </>
    </CMSRoute>
  );
}
