import type { NextConfig } from "next";
import { FRONT_RANGE_CITIES, STATES } from "./content/national-data";

/** Thin state hubs fold into the national telehealth hub. Colorado stays. */
const stateHubRedirects = STATES.filter((state) => state.slug !== "colorado").map((state) => ({
  source: `/areas-we-serve/${state.slug}/`,
  destination: "/areas-we-serve/",
  permanent: true,
}));

/** Front Range city copies fold into Denver, the only city page we are keeping. */
const cityRedirects = FRONT_RANGE_CITIES.filter((city) => city.slug !== "denver").map((city) => ({
  source: `/areas-we-serve/colorado/${city.slug}/`,
  destination: "/areas-we-serve/colorado/denver/",
  permanent: true,
}));

const nextConfig: NextConfig = {
  // drautoimmune.com serves every route with a trailing slash (WordPress/Rank Math
  // permalink style) — match that pattern exactly for SEO continuity.
  trailingSlash: true,

  async redirects() {
    return [
      {
        // Renamed from /free-discovery-call/ to /discovery-call/. This was a
        // live, indexed route — permanently redirect it to preserve SEO/backlinks.
        source: "/free-discovery-call/",
        destination: "/discovery-call/",
        permanent: true,
      },
      ...stateHubRedirects,
      ...cityRedirects,
    ];
  },
};

export default nextConfig;
