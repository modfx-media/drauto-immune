import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/inflammatory-bowel-disease", () => buildMetadata("inflammatory-bowel-disease"));
}

export default function Page() {
  const page = getPageContent("inflammatory-bowel-disease");
  return (
    <CMSRoute path="/inflammatory-bowel-disease">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="inflammatory-bowel-disease" />
    </>
    </CMSRoute>
  );
}
