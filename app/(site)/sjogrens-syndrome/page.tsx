import type { Metadata } from "next";
import ConditionRoute from "@/components/pages/conditions/ConditionRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { buildMetadata } from "@/lib/content";
import { getConditionEnrichment } from "@/content/condition-enrichment";

export async function generateMetadata(): Promise<Metadata> {
  const enrichment = getConditionEnrichment("sjogrens-syndrome");
  const fallback = buildMetadata("sjogrens-syndrome");
  if (enrichment?.pageTitle || enrichment?.metaDescription) {
    return cmsMetadata("/sjogrens-syndrome", {
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
  return cmsMetadata("/sjogrens-syndrome", () => buildMetadata("sjogrens-syndrome"));
}

export default function Page() {
  return <ConditionRoute slug="sjogrens-syndrome" />;
}
