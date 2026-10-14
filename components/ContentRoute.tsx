import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/content";
import JsonLd from "@/components/JsonLd";
import MigratedContent from "@/components/MigratedContent";
import { withUnifiedMedicalClinic } from "@/lib/organization-jsonld";

/**
 * Renders a migrated route: injects every JSON-LD block captured from the
 * live page and the migrated body content/images/video. Used by every
 * static page and by the [slug] blog post route.
 */
export default function ContentRoute({ routeKey }: { routeKey: string }) {
  const page = getPageContent(routeKey);
  if (!page) notFound();

  return (
    <>
      <JsonLd blocks={withUnifiedMedicalClinic(page.jsonLd)} />
      <MigratedContent markdown={page.bodyMarkdown} videos={page.videos} />
    </>
  );
}
