import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/graves-disease", () => buildMetadata("graves-disease"));
}

export default function Page() {
  const page = getPageContent("graves-disease");
  return (
    <CMSRoute path="/graves-disease">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="graves-disease" />
    </>
    </CMSRoute>
  );
}
