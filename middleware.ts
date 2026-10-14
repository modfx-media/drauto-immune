import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { CASE_VARIANT_REDIRECTS } from "@/lib/seo-redirects";

/**
 * Case-sensitive 301s for path casing typos. next.config redirects are
 * matched case-insensitively and would loop live lowercase canonicals
 * (see CASE_VARIANT_REDIRECTS note in lib/seo-redirects.ts).
 */
const CASE_REDIRECT_MAP = new Map<string, string>();
for (const redirect of CASE_VARIANT_REDIRECTS) {
  const dest = redirect.destination.endsWith("/")
    ? redirect.destination
    : `${redirect.destination}/`;
  CASE_REDIRECT_MAP.set(redirect.source, dest);
  if (redirect.source.endsWith("/")) {
    CASE_REDIRECT_MAP.set(redirect.source.slice(0, -1), dest);
  } else {
    CASE_REDIRECT_MAP.set(`${redirect.source}/`, dest);
  }
}

export function middleware(request: NextRequest) {
  const target = CASE_REDIRECT_MAP.get(request.nextUrl.pathname);
  if (!target) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = target;
  return NextResponse.redirect(url, 301);
}

export const config = {
  // Only paths that need exact-case redirects (expand as CASE_VARIANT grows).
  matcher: ["/Graves-disease", "/Graves-disease/"],
};
