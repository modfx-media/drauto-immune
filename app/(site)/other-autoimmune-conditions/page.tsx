import type { Metadata } from "next";
import ConditionRoute from "@/components/pages/conditions/ConditionRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { buildMetadata } from "@/lib/content";
import { getConditionEnrichment } from "@/content/condition-enrichment";

export async function generateMetadata(): Promise<Metadata> {
  const enrichment = getConditionEnrichment("other-autoimmune-conditions");
  const fallback = buildMetadata("other-autoimmune-conditions");
  if (enrichment?.pageTitle || enrichment?.metaDescription) {
    return cmsMetadata("/other-autoimmune-conditions", {
      ...fallback,
      title: enrichment.pageTitle ?? fallback.title,
      description: enrichment.metaDescription ?? fallback.description,
      openGraph: {
        ...fallback.openGraph,
        title: enrichment.pageTitle ?? fallback.openGraph?.title,
        description: enrichment.metaDescription ?? fallback.openGraph?.description,
      },
    });
  }
  return cmsMetadata("/other-autoimmune-conditions", () => buildMetadata("other-autoimmune-conditions"));
}

export default function Page() {
  return <ConditionRoute slug="other-autoimmune-conditions" />;
}
