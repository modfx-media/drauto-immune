import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import BookAnAppointmentPage from "@/components/pages/BookAnAppointmentPage";
import { buildMetadata } from "@/lib/content";
import { buildBookAnAppointmentJsonLd } from "@/lib/marketing-jsonld";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/book-an-appointment", () => buildMetadata("book-an-appointment"));
}

export default function Page() {
  return (
    <CMSRoute path="/book-an-appointment">
      <>
        <JsonLd blocks={buildBookAnAppointmentJsonLd()} />
        <BookAnAppointmentPage />
      </>
    </CMSRoute>
  );
}
