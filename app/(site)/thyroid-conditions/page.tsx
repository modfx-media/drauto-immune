import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/thyroid-conditions", () => buildMetadata("thyroid-conditions"));
}

export default function Page() {
  const page = getPageContent("thyroid-conditions");
  return (
    <CMSRoute path="/thyroid-conditions">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="thyroid-conditions" />
    </>
    </CMSRoute>
  );
}
