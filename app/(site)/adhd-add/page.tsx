import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/adhd-add", () => buildMetadata("adhd-add"));
}

export default function Page() {
  const page = getPageContent("adhd-add");
  return (
    <CMSRoute path="/adhd-add">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="adhd-add" />
    </>
    </CMSRoute>
  );
}
