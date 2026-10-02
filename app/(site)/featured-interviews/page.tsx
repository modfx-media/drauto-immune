import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import FeaturedInterviewsPage from "@/components/pages/FeaturedInterviewsPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/featured-interviews", () => buildMetadata("featured-interviews"));
}

export default function Page() {
  const page = getPageContent("featured-interviews");

  return (
    <CMSRoute path="/featured-interviews">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <FeaturedInterviewsPage />
    </>
    </CMSRoute>
  );
}
