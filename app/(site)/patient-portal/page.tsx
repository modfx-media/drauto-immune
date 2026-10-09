import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import PatientPortalPage from "@/components/pages/PatientPortalPage";
import { buildMetadata } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/patient-portal", () => buildMetadata("patient-portal"));
}

export default function Page() {
  return (
    <CMSRoute path="/patient-portal">
      <PatientPortalPage />
    </CMSRoute>
  );
}
