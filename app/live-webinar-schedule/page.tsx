import type { Metadata } from "next";
import LiveWebinarSchedulePage from "@/components/pages/LiveWebinarSchedulePage";
import { SITE_URL } from "@/lib/site";

const CANONICAL = `${SITE_URL}/live-webinar-schedule/`;
const TITLE = "Live Webinar Schedule | Dr. Autoimmune";
const DESCRIPTION =
  "Upcoming live webinar sessions with Dr. Autoimmune on autoimmune and thyroid health, with registration links for each date.";

export function generateMetadata(): Metadata {
  return {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: CANONICAL },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: CANONICAL,
      type: "website",
    },
  };
}

export default function Page() {
  return <LiveWebinarSchedulePage />;
}
