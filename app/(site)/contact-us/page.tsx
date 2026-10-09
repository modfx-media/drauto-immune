import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import ContactUsPage from "@/components/pages/ContactUsPage";
import { buildMetadata, getPageContent } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/contact-us", () => buildMetadata("contact-us"));
}

export default function Page() {
  const page = getPageContent("contact-us");

  return (
    <CMSRoute path="/contact-us">
    <>
      {page && <JsonLd blocks={page.jsonLd} />}
      <ContactUsPage />
    </>
    </CMSRoute>
  );
}
