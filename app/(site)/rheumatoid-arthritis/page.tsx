import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/rheumatoid-arthritis", () => buildMetadata("rheumatoid-arthritis"));
}

export default function Page() {
  const page = getPageContent("rheumatoid-arthritis");
  return (
    <CMSRoute path="/rheumatoid-arthritis">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ConditionPageTemplate slug="rheumatoid-arthritis" />
    </>
    </CMSRoute>
  );
}
