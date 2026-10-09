import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/hashimotos-thyroiditis-graves", () => buildMetadata("hashimotos-thyroiditis-graves"));
}

export default function Page() {
  const page = getPageContent("hashimotos-thyroiditis-graves");
  return (
    <CMSRoute path="/hashimotos-thyroiditis-graves">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="hashimotos-thyroiditis-graves" />
    </>
    </CMSRoute>
  );
}
