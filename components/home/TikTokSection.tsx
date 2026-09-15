import TikTokEmbed from "@/components/ui/TikTokEmbed";
import Carousel from "@/components/ui/Carousel";
import Container from "@/components/ui/Container";
import Section from "@/components/ui/Section";
import { TIKTOK_VIDEOS } from "@/content/tiktok-videos";
import SectionHeading from "./SectionHeading";

/**
 * Horizontal-scrolling row of the 5 TikTok clips already referenced across
 * the blog. Uses the shared `Carousel` (prev/next + dot indicators).
 */
export default function TikTokSection() {
  const slides = TIKTOK_VIDEOS.map((video) => <TikTokEmbed key={video.id} video={video} />);

  return (
    <Section className="relative overflow-hidden">
      <Container>
        <SectionHeading
          eyebrow="From Our TikTok"
          heading="Bite-Sized Answers, Straight From Dr. Autoimmune"
          accent="Straight From"
          align="left"
        />

        <div className="mt-14">
          <Carousel ariaLabel="TikTok videos" slides={slides} />
        </div>
      </Container>
    </Section>
  );
}
