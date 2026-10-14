import type { JsonLdBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/site";
import { medicalClinicEntity, medicalClinicRef, MEDICAL_CLINIC_ID } from "@/lib/organization-jsonld";

function breadcrumb(items: { name: string; path?: string }[]): JsonLdBlock {
  return {
    source: null,
    data: {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: item.name,
        ...(item.path ? { item: `${SITE_URL}${item.path}` } : {}),
      })),
    },
  };
}

/**
 * Blog hub structured data: BreadcrumbList + CollectionPage (with Blog
 * typing) listing recent posts — mirrors `/learn/` hub JSON-LD.
 */
export function buildBlogHubJsonLd(
  posts: ReadonlyArray<{ title: string; slug: string }>,
): JsonLdBlock[] {
  const url = `${SITE_URL}/blog/`;

  return [
    breadcrumb([
      { name: "Home", path: "/" },
      { name: "Blog" },
    ]),
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        ...medicalClinicEntity(),
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": ["CollectionPage", "Blog"],
        name: "Blog | Autoimmune Disease and Functional Health Insights",
        url,
        description:
          "Read our latest insights on immune and gut health. We share simple ways to help you feel better every day. Check out our blog for helpful health advice.",
        publisher: medicalClinicRef(),
        hasPart: {
          "@type": "ItemList",
          itemListElement: posts.slice(0, 20).map((post, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: post.title,
            url: `${SITE_URL}/${post.slug}/`,
          })),
        },
      },
    },
  ];
}

type BookingPageConfig = {
  path: string;
  name: string;
  description: string;
  crumbName: string;
  serviceName: string;
  serviceDescription: string;
};

function buildBookingJsonLd(config: BookingPageConfig): JsonLdBlock[] {
  const url = `${SITE_URL}${config.path}`;

  return [
    breadcrumb([
      { name: "Home", path: "/" },
      { name: config.crumbName },
    ]),
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        ...medicalClinicEntity({
          makesOffer: {
            "@type": "Offer",
            itemOffered: {
              "@type": "Service",
              name: config.serviceName,
              description: config.serviceDescription,
              provider: medicalClinicRef(),
              areaServed: [
                { "@type": "City", name: "Boulder" },
                { "@type": "City", name: "Denver" },
                { "@type": "State", name: "Colorado" },
                { "@type": "Country", name: "United States" },
              ],
              availableChannel: {
                "@type": "ServiceChannel",
                serviceUrl: url,
                serviceType: "Telehealth",
              },
            },
          },
        }),
      },
    },
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: config.name,
        url,
        description: config.description,
        about: { "@id": MEDICAL_CLINIC_ID },
      },
    },
  ];
}

export function buildBookAnAppointmentJsonLd(): JsonLdBlock[] {
  return buildBookingJsonLd({
    path: "/book-an-appointment/",
    name: "Book An Appointment - Dr. Autoimmune",
    description:
      "Looking for an autoimmune specialist near Boulder, CO? Turn to Dr. Autoimmune. Visit our Book An Appointment page to learn about our wellness services.",
    crumbName: "Book An Appointment",
    serviceName: "Functional Medicine Appointment",
    serviceDescription:
      "Book a telehealth appointment with Dr. Autoimmune for root-cause functional medicine care focused on autoimmune and chronic conditions.",
  });
}

export function buildBookNewPatientEvaluationJsonLd(): JsonLdBlock[] {
  return buildBookingJsonLd({
    path: "/book-new-patient-evaluation/",
    name: "Book New Patient Evaluation - Dr. Autoimmune",
    description:
      "Start your recovery with a full health review. Our team is ready to listen and help you feel like yourself again. Reserve your appointment online!",
    crumbName: "Book New Patient Evaluation",
    serviceName: "New Patient Evaluation",
    serviceDescription:
      "Comprehensive new-patient functional medicine evaluation covering symptoms, history, and labs to build a personalized autoimmune care plan.",
  });
}

export function buildDiscoveryCallJsonLd(): JsonLdBlock[] {
  return buildBookingJsonLd({
    path: "/discovery-call/",
    name: "Book Your Discovery Call Today | Dr. Autoimmune",
    description:
      "Not sure where to start? Sign up for a discovery call to see how we can help you feel your best. For more information, contact us today!",
    crumbName: "Discovery Call",
    serviceName: "Discovery Call",
    serviceDescription:
      "A complimentary discovery call to learn whether Dr. Autoimmune's root-cause functional medicine approach is a fit for your health goals.",
  });
}
