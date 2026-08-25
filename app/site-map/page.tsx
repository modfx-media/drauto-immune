import type { Metadata } from "next";
import SiteMapPage from "@/components/pages/SiteMapPage";

export function generateMetadata(): Metadata {
  return {
    title: "Site Directory | Dr. Autoimmune",
    description:
      "A complete index of Dr. Autoimmune's pages: services, the conditions we treat, resources, and how to get in touch.",
  };
}

export default function Page() {
  return <SiteMapPage />;
}
