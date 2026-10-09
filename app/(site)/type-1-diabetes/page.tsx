import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/type-1-diabetes", () => buildMetadata("type-1-diabetes"));
}

export default function Page() {
  const page = getPageContent("type-1-diabetes");
  return (
    <CMSRoute path="/type-1-diabetes">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="type-1-diabetes" />
    </>
    </CMSRoute>
  );
}
