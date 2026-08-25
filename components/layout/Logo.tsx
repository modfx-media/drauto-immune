import Image from "next/image";
import { motion } from "motion/react";

/**
 * Dr. Autoimmune wordmark — raster logo supplied by the client, rendered
 * via `next/image`. Wrapped in a `motion.div` that scales down smoothly
 * when `condensed` (sticky header shrink-on-scroll). Image intrinsic
 * dimensions match the source file's aspect ratio; the visible height is
 * controlled with a fixed `h-[…]` class so the box height doesn't change
 * during scale animations.
 */
export default function Logo({ condensed = false }: { condensed?: boolean }) {
  return (
    <motion.div
      className="flex items-center"
      animate={{ scale: condensed ? 0.9 : 1 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      style={{ transformOrigin: "left center" }}
    >
      <Image
        src="/images/logo/DA-Tagline-Color-Large-removebg-preview.png"
        alt="Dr. Autoimmune: Let Your Health Soar"
        width={440}
        height={79}
        preload={true}
        className="h-7 w-auto"
      />
    </motion.div>
  );
}
