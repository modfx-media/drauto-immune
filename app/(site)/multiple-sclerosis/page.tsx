import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/multiple-sclerosis", () => buildMetadata("multiple-sclerosis"));
}

export default function Page() {
  const page = getPageContent("multiple-sclerosis");
  return (
    <CMSRoute path="/multiple-sclerosis">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="multiple-sclerosis" />
    </>
    </CMSRoute>
  );
}
