import type { Metadata } from "next";
import ConditionRoute from "@/components/pages/conditions/ConditionRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import { buildMetadata } from "@/lib/content";
import { getConditionEnrichment } from "@/content/condition-enrichment";

export async function generateMetadata(): Promise<Metadata> {
  const enrichment = getConditionEnrichment("hashimotos-thyroiditis-graves");
  const fallback = buildMetadata("hashimotos-thyroiditis-graves");
  if (enrichment?.pageTitle || enrichment?.metaDescription) {
    return cmsMetadata("/hashimotos-thyroiditis-graves", {
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
  return cmsMetadata("/hashimotos-thyroiditis-graves", () => buildMetadata("hashimotos-thyroiditis-graves"));
}

export default function Page() {
  return <ConditionRoute slug="hashimotos-thyroiditis-graves" />;
}
