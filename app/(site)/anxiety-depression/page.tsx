import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/anxiety-depression", () => buildMetadata("anxiety-depression"));
}

export default function Page() {
  const page = getPageContent("anxiety-depression");
  return (
    <CMSRoute path="/anxiety-depression">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="anxiety-depression" />
    </>
    </CMSRoute>
  );
}
