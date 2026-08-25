import type { Metadata } from "next";
import PotsAssessmentPopup from "@/components/home/PotsAssessmentPopup";
import Hero2 from "@/components/home2/Hero2";
import Pillars2 from "@/components/home2/Pillars2";
import ServicesHighlight2 from "@/components/home2/ServicesHighlight2";
import Specialties2 from "@/components/home2/Specialties2";
import Process2 from "@/components/home2/Process2";
import DoctorSpotlight2 from "@/components/home2/DoctorSpotlight2";
import WhyChooseUs2 from "@/components/home2/WhyChooseUs2";
import Products2 from "@/components/home2/Products2";
import BlogInsights2 from "@/components/home2/BlogInsights2";
import TikTokVideos2 from "@/components/home2/TikTokVideos2";
import Testimonials2 from "@/components/home2/Testimonials2";
import Faq2 from "@/components/home2/Faq2";
import ContactBand2 from "@/components/home2/ContactBand2";

/**
 * Isolated visual-redesign variant of the homepage for side-by-side
 * review against `/` — same content/copy (sourced from
 * `content/home-content.ts`, never rewritten), a stricter unified design
 * system. Kept out of search results since it's a comparison build, not
 * a page meant to be indexed alongside the real homepage.
 */
export const metadata: Metadata = {
  title: "Home (Design Variant) | Dr. Autoimmune",
  robots: { index: false, follow: false },
};

export default function Home2Page() {
  return (
    <>
      <PotsAssessmentPopup />

      <Hero2 />
      <Pillars2 />
      <ServicesHighlight2 />
      <Specialties2 />
      <Process2 />
      <DoctorSpotlight2 />
      <WhyChooseUs2 />
      <Products2 />
      <BlogInsights2 />
      <TikTokVideos2 />
      <Testimonials2 />
      <Faq2 />
      <ContactBand2 />
    </>
  );
}
