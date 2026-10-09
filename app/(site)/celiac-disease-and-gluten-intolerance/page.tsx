import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/celiac-disease-and-gluten-intolerance", () => buildMetadata("celiac-disease-and-gluten-intolerance"));
}

export default function Page() {
  const page = getPageContent("celiac-disease-and-gluten-intolerance");
  return (
    <CMSRoute path="/celiac-disease-and-gluten-intolerance">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="celiac-disease-and-gluten-intolerance" />
    </>
    </CMSRoute>
  );
}
