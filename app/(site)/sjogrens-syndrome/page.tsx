import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/sjogrens-syndrome", () => buildMetadata("sjogrens-syndrome"));
}

export default function Page() {
  const page = getPageContent("sjogrens-syndrome");
  return (
    <CMSRoute path="/sjogrens-syndrome">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="sjogrens-syndrome" />
    </>
    </CMSRoute>
  );
}
