import type { JsonLdBlock } from "@/lib/content";

/**
 * Renders JSON-LD blocks. Callers should pass blocks through
 * `withUnifiedMedicalClinic`, which drops scraped Rank Math / Yoast graphs
 * and emits one MedicalClinic.
 */
export default function JsonLd({ blocks }: { blocks: JsonLdBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => (
        <script
          key={i}
          type="application/ld+json"
          className={block.source ?? undefined}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(block.data) }}
        />
      ))}
    </>
  );
}
