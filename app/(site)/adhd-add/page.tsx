import type { Metadata } from "next";
import ConditionRoute from "@/components/pages/conditions/ConditionRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { buildMetadata } from "@/lib/content";
import { getConditionEnrichment } from "@/content/condition-enrichment";

export async function generateMetadata(): Promise<Metadata> {
  const enrichment = getConditionEnrichment("adhd-add");
  const fallback = buildMetadata("adhd-add");
  if (enrichment?.pageTitle || enrichment?.metaDescription) {
    return cmsMetadata("/adhd-add", {
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
  return cmsMetadata("/adhd-add", () => buildMetadata("adhd-add"));
}

export default function Page() {
  return <ConditionRoute slug="adhd-add" />;
}
