import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import { FRONT_RANGE_CITIES, STATES } from "./content/national-data";
import { ALL_SEO_REDIRECTS } from "./lib/seo-redirects";

/** Thin state hubs fold into the national telehealth hub. Colorado stays. */
const stateHubRedirects = STATES.filter((state) => state.slug !== "colorado").map((state) => ({
  source: `/areas-we-serve/${state.slug}/`,
  destination: "/areas-we-serve/",
  statusCode: 301 as const,
}));

/** Front Range city copies fold into Denver, the only city page we are keeping. */
const cityRedirects = FRONT_RANGE_CITIES.filter((city) => city.slug !== "denver").map((city) => ({
  source: `/areas-we-serve/colorado/${city.slug}/`,
  destination: "/areas-we-serve/colorado/denver/",
  statusCode: 301 as const,
}));

function withOptionalTrailingSlash(source: string): string[] {
  if (source.endsWith("/")) {
    const bare = source.slice(0, -1);
    return bare && bare !== "" ? [source, bare] : [source];
  }
  return [source, `${source}/`];
}

const seoRedirects = ALL_SEO_REDIRECTS.flatMap((redirect) =>
  withOptionalTrailingSlash(redirect.source).map((source) => ({
    source,
    destination: redirect.destination.endsWith("/")
      ? redirect.destination
      : `${redirect.destination}/`,
    // Explicit 301 (not Next's default 308 for `permanent: true`) per SEO plan.
    statusCode: 301 as const,
  })),
);

const nextConfig: NextConfig = {
  // drautoimmune.com serves every route with a trailing slash (WordPress/Rank Math
  // permalink style) — match that pattern exactly for SEO continuity.
  trailingSlash: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.public.blob.vercel-storage.com",
      },
      {
        protocol: "https",
        hostname: "*.blob.vercel-storage.com",
      },
    ],
  },
  serverExternalPackages: [
    "pg",
    "@payloadcms/db-vercel-postgres",
    "@neondatabase/serverless",
    "@vercel/postgres",
  ],

  async redirects() {
    return [
      {
        source: "/free-discovery-call/",
        destination: "/discovery-call/",
        statusCode: 301,
      },
      {
        source: "/free-discovery-call",
        destination: "/discovery-call/",
        statusCode: 301,
      },
      ...seoRedirects,
      ...stateHubRedirects,
      ...cityRedirects,
    ];
  },
};

export default withPayload(nextConfig, { devBundleServerPackages: false });
