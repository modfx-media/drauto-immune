import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import StorePage from "@/components/pages/StorePage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/store", () => buildMetadata("store"));
}

export default function Page() {
  const page = getPageContent("store");

  return (
    <CMSRoute path="/store">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <StorePage />
    </>
    </CMSRoute>
  );
}
