import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import DiscoveryCallPage from "@/components/pages/DiscoveryCallPage";
import { buildMetadata } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/discovery-call", () => buildMetadata("discovery-call"));
}

export default function Page() {
  return (
    <CMSRoute path="/discovery-call">
      <DiscoveryCallPage />
    </CMSRoute>
  );
}
