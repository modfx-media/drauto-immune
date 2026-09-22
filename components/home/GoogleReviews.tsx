import type { ReactNode } from "react";
import { getDisplayedGoogleReviews } from "@/lib/google-reviews";

/**
 * Async Server Component wrapper around the Google Places reviews fetch.
 * `getDisplayedGoogleReviews` is wrapped in React's `cache()`, so calling it
 * again elsewhere on the same request (e.g. for JSON-LD in `app/page.tsx`)
 * re-uses this same result instead of firing a second request.
 *
 * Renders nothing when there are no 5-star reviews with text to show —
 * callers must keep working (hero, stats, rest of the page) even when this
 * returns null.
 */
export async function GoogleReviews({
  children,
}: {
  children: (
    payload: Awaited<ReturnType<typeof getDisplayedGoogleReviews>>,
  ) => ReactNode;
}) {
  const payload = await getDisplayedGoogleReviews();
  if (payload.reviews.length === 0) return null;
  return children(payload);
}
