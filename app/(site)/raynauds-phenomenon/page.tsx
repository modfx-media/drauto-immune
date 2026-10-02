import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/raynauds-phenomenon", () => buildMetadata("raynauds-phenomenon"));
}

export default function Page() {
  const page = getPageContent("raynauds-phenomenon");
  return (
    <CMSRoute path="/raynauds-phenomenon">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="raynauds-phenomenon" />
    </>
    </CMSRoute>
  );
}
