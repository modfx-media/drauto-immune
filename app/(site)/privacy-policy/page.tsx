import type { Metadata } from "next";
import { CMSRoute } from "@/components/cms/CMSRoute";
import { cmsMetadata } from "@/lib/cms/metadata";
import JsonLd from "@/components/JsonLd";
import PrivacyPolicyPage from "@/components/pages/PrivacyPolicyPage";
import { SITE_URL } from "@/lib/site";
import { SITE_CONTACT } from "@/components/layout/nav-links";

const TITLE = "Privacy Policy | Dr. Autoimmune";
const DESCRIPTION =
  "How Dr. Autoimmune, a Boulder, Colorado functional medicine practice, collects, uses, and protects personal and health-related information.";

export async function generateMetadata(): Promise<Metadata> {
  return cmsMetadata("/privacy-policy", {
    title: TITLE,
    description: DESCRIPTION,
    alternates: { canonical: `${SITE_URL}/privacy-policy/` },
    openGraph: {
      title: TITLE,
      description: DESCRIPTION,
      url: `${SITE_URL}/privacy-policy/`,
      type: "website",
    },
  });
}

export default function Page() {
  const blocks = [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: "Privacy Policy" },
        ],
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: TITLE,
        url: `${SITE_URL}/privacy-policy/`,
        description: DESCRIPTION,
        about: {
          "@type": "MedicalClinic",
          name: "Dr. Autoimmune",
          telephone: SITE_CONTACT.phone,
          email: SITE_CONTACT.email,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Boulder",
            addressRegion: "CO",
            addressCountry: "US",
          },
        },
      },
    },
  ];

  return (
    <CMSRoute path="/privacy-policy">
      <>
        <JsonLd blocks={blocks} />
        <PrivacyPolicyPage />
      </>
    </CMSRoute>
  );
}
