import JsonLd from "@/components/JsonLd";
import { CMSRoute } from "@/components/cms/CMSRoute";
import ConditionPageTemplate from "@/components/pages/conditions/ConditionPageTemplate";
import { getConditionData } from "@/content/conditions-data";
import { getPageContent } from "@/lib/content";
import { buildConditionFaqJsonLd } from "@/lib/condition-jsonld";
import { withUnifiedMedicalClinic } from "@/lib/organization-jsonld";

/** Shared server wrapper: CMS overlay + migrated JSON-LD + FAQ/MedicalWebPage schema. */
export default function ConditionRoute({ slug }: { slug: string }) {
  const page = getPageContent(slug);
  const condition = getConditionData(slug);
  const faqBlocks = condition ? buildConditionFaqJsonLd(condition) : [];
  const blocks = withUnifiedMedicalClinic([...(page?.jsonLd ?? []), ...faqBlocks]);

  return (
    <CMSRoute path={`/${slug}`}>
      <>
        {blocks.length > 0 && <JsonLd blocks={blocks} />}
        <ConditionPageTemplate slug={slug} />
      </>
    </CMSRoute>
  );
}
