import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/other-autoimmune-conditions", () => buildMetadata("other-autoimmune-conditions"));
}

export default function Page() {
  const page = getPageContent("other-autoimmune-conditions");
  return (
    <CMSRoute path="/other-autoimmune-conditions">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="other-autoimmune-conditions" />
    </>
    </CMSRoute>
  );
}
