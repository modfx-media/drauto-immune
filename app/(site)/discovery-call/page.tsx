import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import DiscoveryCallPage from "@/components/pages/DiscoveryCallPage";
import { buildMetadata } from "@/lib/content";
import { buildDiscoveryCallJsonLd } from "@/lib/marketing-jsonld";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/discovery-call", () => buildMetadata("discovery-call"));
}

export default function Page() {
  return (
    <CMSRoute path="/discovery-call">
      <>
        <JsonLd blocks={buildDiscoveryCallJsonLd()} />
        <DiscoveryCallPage />
      </>
    </CMSRoute>
  );
}
