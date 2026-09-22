import { cache } from "react";
import type { JsonLdBlock } from "./content";
import {
  fiveStarReviews,
  googleReviewsMeta,
  isFiveStarReview,
  type GoogleReview,
  type GoogleReviewsMeta,
} from "./reviews";

const REVIEWS_REVALIDATE_SECONDS = 60 * 60 * 24;
const PLACES_FIELD_MASK = "id,rating,userRatingCount,googleMapsUri,reviews";

export type GoogleReviewsPayload = {
  reviews: GoogleReview[];
  meta: GoogleReviewsMeta;
};

type PlacesReview = {
  rating?: number;
  relativePublishTimeDescription?: string;
  text?: { text?: string };
  originalText?: { text?: string };
  authorAttribution?: { displayName?: string };
};

type PlacesDetailsResponse = {
  rating?: number;
  userRatingCount?: number;
  googleMapsUri?: string;
  reviews?: PlacesReview[];
  error?: { message?: string; status?: string };
};

function fallbackPayload(): GoogleReviewsPayload {
  return {
    reviews: fiveStarReviews,
    meta: { ...googleReviewsMeta },
  };
}

/**
 * Google's Place Details endpoint only ever returns Google's own "5 most
 * relevant" reviews — never the full corpus (see doc: "What actually gets
 * fetched"). To give the on-page scrolling section enough real cards to
 * loop smoothly, we top up the live 5-star reviews with the same on-file
 * 5-star reviews used as the offline fallback (`lib/reviews.ts` — real,
 * previously-verified quotes for this business, not invented). Live
 * reviews always come first and take priority; fallback entries are only
 * appended, never used to replace or hide a live review, and duplicates
 * (matched by reviewer name) are dropped.
 */
function mergeWithFallback(live: GoogleReview[]): GoogleReview[] {
  const seen = new Set(live.map((r) => r.name.trim().toLowerCase()));
  const extra = fiveStarReviews.filter((r) => !seen.has(r.name.trim().toLowerCase()));
  return [...live, ...extra];
}

function mapPlaceReview(review: PlacesReview): GoogleReview | null {
  const quote = (review.text?.text ?? review.originalText?.text ?? "").trim();
  const name = review.authorAttribution?.displayName?.trim() ?? "";
  const rating = review.rating ?? 0;

  // Exact 5 only. Drop 4, 4.5, empty text, and nameless authors here.
  if (rating !== 5 || !quote || !name) return null;

  return {
    quote,
    name,
    rating: 5,
    relativeTime: review.relativePublishTimeDescription,
  };
}

/**
 * Places API (New), then 5-star reviews with text only.
 * Google returns at most 5 most-relevant reviews. Filter that set.
 *
 * Server-only. `GOOGLE_PLACES_API_KEY` is preferred; falls back to
 * `GOOGLE_API_KEY` if that is the only one set. Never exposed to the
 * client, never `NEXT_PUBLIC_`, and never logged.
 */
export const getDisplayedGoogleReviews = cache(
  async (): Promise<GoogleReviewsPayload> => {
    const apiKey =
      process.env.GOOGLE_PLACES_API_KEY?.trim() || process.env.GOOGLE_API_KEY?.trim();
    const placeId = process.env.GOOGLE_PLACE_ID?.trim() || googleReviewsMeta.placeId;

    if (!apiKey || placeId.startsWith("REPLACE_")) return fallbackPayload();

    try {
      const response = await fetch(
        `https://places.googleapis.com/v1/places/${encodeURIComponent(placeId)}`,
        {
          headers: {
            "X-Goog-Api-Key": apiKey,
            "X-Goog-FieldMask": PLACES_FIELD_MASK,
          },
          next: {
            revalidate: REVIEWS_REVALIDATE_SECONDS,
            tags: ["google-reviews"],
          },
        },
      );

      const data = (await response.json()) as PlacesDetailsResponse;

      if (!response.ok || data.error) {
        console.error(
          "Google Places reviews request failed:",
          data.error?.message ?? response.statusText,
        );
        return fallbackPayload();
      }

      const liveReviews = (data.reviews ?? [])
        .map(mapPlaceReview)
        .filter((review): review is GoogleReview => review !== null)
        .filter(isFiveStarReview);

      if (liveReviews.length === 0) return fallbackPayload();

      const reviews = mergeWithFallback(liveReviews);

      return {
        reviews,
        meta: {
          // Google's real overall numbers — always Google's own figures,
          // never derived from how many cards we happen to render.
          rating: data.rating ?? googleReviewsMeta.rating,
          reviewCount: data.userRatingCount ?? googleReviewsMeta.reviewCount,
          fiveStarCount: reviews.length,
          placeId,
          reviewsUrl: data.googleMapsUri ?? googleReviewsMeta.reviewsUrl,
        },
      };
    } catch (error) {
      console.error("Google Places reviews fetch error:", error);
      return fallbackPayload();
    }
  },
);

/**
 * Injects the live (or fallback) Google review data into the migrated
 * MedicalBusiness JSON-LD block: `aggregateRating` from `meta`, and
 * `review[]` limited to the exact 5-star reviews actually rendered on the
 * page. Every other migrated block (WebPage/WebSite/BreadcrumbList graph,
 * etc.) passes through untouched.
 *
 * - Omits `aggregateRating` entirely when `meta.rating` is 0 (unverified).
 * - Omits `review` entirely when there are no five-star reviews to show.
 */
export function withGoogleReviewsSchema(
  blocks: JsonLdBlock[],
  payload: GoogleReviewsPayload,
): JsonLdBlock[] {
  const visible = payload.reviews.filter(isFiveStarReview);

  return blocks.map((block) => {
    if (!block.data || block.data["@type"] !== "MedicalBusiness") return block;

    const data = { ...block.data };

    if (payload.meta.rating > 0) {
      data.aggregateRating = {
        "@type": "AggregateRating",
        ratingValue: String(payload.meta.rating),
        reviewCount: String(payload.meta.reviewCount || visible.length),
        bestRating: "5",
      };
    }

    if (visible.length > 0) {
      data.review = visible.map((review) => ({
        "@type": "Review",
        author: { "@type": "Person", name: review.name },
        reviewRating: {
          "@type": "Rating",
          ratingValue: "5",
          bestRating: "5",
        },
        reviewBody: review.quote,
      }));
    }

    return { ...block, data };
  });
}
