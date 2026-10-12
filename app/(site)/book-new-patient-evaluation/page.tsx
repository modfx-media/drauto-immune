import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import BookNewPatientEvaluationPage from "@/components/pages/BookNewPatientEvaluationPage";
import { buildMetadata } from "@/lib/content";
import { buildBookNewPatientEvaluationJsonLd } from "@/lib/marketing-jsonld";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/book-new-patient-evaluation", () =>
    buildMetadata("book-new-patient-evaluation"),
  );
}

export default function Page() {
  return (
    <CMSRoute path="/book-new-patient-evaluation">
      <>
        <JsonLd blocks={buildBookNewPatientEvaluationJsonLd()} />
        <BookNewPatientEvaluationPage />
      </>
    </CMSRoute>
  );
}
