import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import SiteMapPage from "@/components/pages/SiteMapPage";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/site-map", {
    title: "Site Directory | Dr. Autoimmune",
    description:
      "A complete index of Dr. Autoimmune's pages: services, the conditions we treat, resources, and how to get in touch.",
  });
}

export default function Page() {
  return (
    <CMSRoute path="/site-map">
      <SiteMapPage />
    </CMSRoute>
  );
}
