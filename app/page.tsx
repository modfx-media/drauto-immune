import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import ApproachSection from "@/components/home/ApproachSection";
import BlogInsights from "@/components/home/BlogInsights";
import DoctorSpotlight from "@/components/home/DoctorSpotlight";
import Faq from "@/components/home/Faq";
import Hero from "@/components/home/Hero";
import PotsAssessmentPopup from "@/components/home/PotsAssessmentPopup";
import ProcessSteps from "@/components/home/ProcessSteps";
import ServicesSection from "@/components/home/ServicesSection";
import SpecialtiesSection from "@/components/home/SpecialtiesSection";
import Testimonials from "@/components/home/Testimonials";
import TikTokSection from "@/components/home/TikTokSection";
import WellnessProducts from "@/components/home/WellnessProducts";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import { buildMetadata, getPageContent } from "@/lib/content";
import { getDisplayedGoogleReviews, withGoogleReviewsSchema } from "@/lib/google-reviews";

export function generateMetadata(): Metadata {
  return buildMetadata("home");
}

export default async function Home() {
  const page = getPageContent("home");
  // cache()-wrapped: one fetch per request, shared with anything else on
  // this page that also calls getDisplayedGoogleReviews().
  const googleReviews = await getDisplayedGoogleReviews();

  return (
    <>
      {page && <JsonLd blocks={withGoogleReviewsSchema(page.jsonLd, googleReviews)} />}

      <PotsAssessmentPopup />

      <Hero />
      <ApproachSection />
      <ServicesSection />
      <SpecialtiesSection />
      <ProcessSteps />
      <DoctorSpotlight />
      <WhyChooseUs />
      <WellnessProducts />
      <BlogInsights />
      <TikTokSection />
      <Faq />
      <Testimonials
        items={googleReviews.reviews}
        rating={googleReviews.meta.rating}
        reviewCount={googleReviews.meta.reviewCount}
        reviewsUrl={googleReviews.meta.reviewsUrl}
      />
    </>
  );
}
