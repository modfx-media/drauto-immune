import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import LiveWebinarSchedulePage from "@/components/pages/LiveWebinarSchedulePage";
import { SITE_URL } from "@/lib/site";

const CANONICAL = `${SITE_URL}/live-webinar-schedule/`;
const TITLE = "Live Webinar Schedule | Dr. Autoimmune";
const DESCRIPTION =
  "Upcoming live webinar sessions with Dr. Autoimmune on autoimmune and thyroid health, with registration links for each date.";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/live-webinar-schedule", {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: CANONICAL,
      type: "website",
    },
  });
}

export default function Page() {
  return (
    <CMSRoute path="/live-webinar-schedule">
      <LiveWebinarSchedulePage />
    </CMSRoute>
  );
}
