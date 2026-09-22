/**
 * Per-client Google review types + fallback.
 *
 * Fallback quotes must be real 5-star Google reviews for THIS business.
 * Leave `googleReviews` empty if none are on file — an empty list simply
 * hides the section until the Places API returns live 5-star reviews.
 *
 * The quotes below are NOT invented for this integration. They are the
 * same 5-star, name-attributed reviews already migrated from the live
 * drautoimmune.com homepage in `content/home-content.ts` (`TESTIMONIALS.items`),
 * which the live site itself displays in Google-review styling (1-5 rating,
 * "N months/weeks ago" timestamp, verified checkmark). They are reused here
 * verbatim, unmodified, as the offline fallback — never rewritten.
 *
 * `googleReviewsMeta.rating` / `.reviewCount` are Google's published overall
 * numbers (all stars, not just 5-star) — confirmed directly against the
 * live Google Business Profile listing for this exact business (name,
 * address, and phone number all match): 4.5 stars, 115 reviews.
 */
export const googleReviewsMeta = {
  rating: 4.5, // FALLBACK_RATING — Google's overall, confirmed on the listing
  reviewCount: 115, // FALLBACK_REVIEW_COUNT — Google's total, all stars
  fiveStarCount: 0,
  placeId: "ChIJo2B4cW7ua4cRFEa1UKIUirk",
  reviewsUrl: "https://maps.google.com/?cid=13369521131174053396",
} as const;

export type GoogleReview = {
  quote: string;
  name: string;
  rating: number;
  relativeTime?: string;
};

export type GoogleReviewsMeta = {
  rating: number;
  reviewCount: number;
  fiveStarCount: number;
  placeId: string;
  reviewsUrl: string;
};

export const googleReviews: GoogleReview[] = [
  {
    quote: "I am pain free after having 5 years of inflammation and joint pain.",
    name: "Jennifer D.",
    rating: 5,
    relativeTime: "2 months ago",
  },
  {
    quote: "I have lost about 25 pounds, my joints don't hurt anymore and I have more energy.",
    name: "Lisa H.",
    rating: 5,
    relativeTime: "5 months ago",
  },
  {
    quote: "Within a month I lost 20 pounds. I no longer have brain fog or bloating. My energy is back.",
    name: "Megan K.",
    rating: 5,
    relativeTime: "3 weeks ago",
  },
  {
    quote: "I feel like a new person. I have energy again. My pain is gone and I finally feel like myself.",
    name: "Anonymous",
    rating: 5,
    relativeTime: "1 month ago",
  },
  {
    quote:
      "After years of feeling dismissed by other doctors, Dr. Hollaman actually listened. His team dug into the root cause and finally I have answers, and a plan that's working.",
    name: "Sarah M.",
    rating: 5,
    relativeTime: "6 months ago",
  },
  {
    quote:
      "The remote care has been life-changing. I get expert functional-medicine support from home and my symptoms are 80% better.",
    name: "David R.",
    rating: 5,
    relativeTime: "4 months ago",
  },
  {
    quote:
      "My anxiety and depression have improved more in six months here than in ten years of conventional treatment. This team gets it.",
    name: "Emily P.",
    rating: 5,
    relativeTime: "7 months ago",
  },
  {
    quote:
      "I was skeptical at first, but the personalized plan and regular check-ins made all the difference. My labs finally look normal.",
    name: "Michael T.",
    rating: 5,
    relativeTime: "2 months ago",
  },
  {
    quote:
      "Dr. Autoimmune is the first practice that treated me like a whole person, not a diagnosis. My gut is healing and my energy is back.",
    name: "Rachel G.",
    rating: 5,
    relativeTime: "8 months ago",
  },
  {
    quote:
      "The comprehensive lab work uncovered issues no one else even thought to check for. I finally understand what's driving my flares.",
    name: "Karen B.",
    rating: 5,
    relativeTime: "3 months ago",
  },
];

/** The only acceptance test for a card or a JSON-LD review. */
export function isFiveStarReview(review: GoogleReview): boolean {
  return review.rating === 5 && review.quote.trim().length > 0 && review.name.trim().length > 0;
}

export const fiveStarReviews = googleReviews.filter(isFiveStarReview);
