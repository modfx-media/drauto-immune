import type { Metadata } from "next";
import ConditionRoute from "@/components/pages/conditions/ConditionRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { buildMetadata } from "@/lib/content";
import { getConditionEnrichment } from "@/content/condition-enrichment";

export async function generateMetadata(): Promise<Metadata> {
  const enrichment = getConditionEnrichment("inflammatory-bowel-disease");
  const fallback = buildMetadata("inflammatory-bowel-disease");
  if (enrichment?.pageTitle || enrichment?.metaDescription) {
    return cmsMetadata("/inflammatory-bowel-disease", {
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
  return cmsMetadata("/inflammatory-bowel-disease", () => buildMetadata("inflammatory-bowel-disease"));
}

export default function Page() {
  return <ConditionRoute slug="inflammatory-bowel-disease" />;
}
