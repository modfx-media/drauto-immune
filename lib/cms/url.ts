import { SITE_URL } from "@/lib/site";

const APEX = "https://drautoimmune.com";
const WWW = "https://www.drautoimmune.com";

/**
 * Public origin for Payload serverURL, CORS, and preview links.
 * On Vercel, NEXT_PUBLIC_SERVER_URL must be the public https origin.
 * If it is missing or localhost, fall back to NEXT_PUBLIC_SITE_URL / SITE_URL.
 */
export function getServerURL(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SERVER_URL?.trim();
  if (fromEnv && !fromEnv.includes("localhost") && !fromEnv.includes("127.0.0.1")) {
    return fromEnv.replace(/\/$/, "");
  }
  const site =
    process.env.NEXT_PUBLIC_SITE_URL?.trim() || SITE_URL;
  return site.replace(/\/$/, "");
}

export function getCorsOrigins(): string[] {
  const origins = new Set<string>([getServerURL(), APEX, WWW]);
  const vercel = process.env.VERCEL_URL?.trim();
  if (vercel) {
    origins.add(`https://${vercel.replace(/^https?:\/\//, "")}`);
  }
  return [...origins];
}

/** CMS stores paths without a trailing slash. Home is `/`. */
export function normalizeCmsPath(input: string | null | undefined): string | null {
  if (input == null) return null;
  const trimmed = String(input).trim();
  if (!trimmed || trimmed.includes("null") || trimmed.includes("undefined")) return null;
  const withSlash = trimmed.startsWith("/") ? trimmed : `/${trimmed}`;
  if (withSlash === "/") return "/";
  return withSlash.replace(/\/+$/, "");
}

export function publicUrlFromCmsPath(path: string): string {
  const normalized = normalizeCmsPath(path) ?? "/";
  if (normalized === "/") return `${getServerURL()}/`;
  return `${getServerURL()}${normalized}/`;
}
