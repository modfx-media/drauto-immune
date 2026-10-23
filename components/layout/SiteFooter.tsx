import Footer from "@/components/layout/Footer";
import { QUICK_LINKS } from "@/components/layout/footer-links";
import { withCMS } from "@/lib/cms/safe";

type LinkRow = {
  label?: string | null;
  href?: string | null;
  external?: boolean | null;
};

const CAREERS_LINK = QUICK_LINKS.find((link) => link.label === "Careers");

/** CMS footer snapshots predate the Careers PDF link. Keep a single copy in Quick Links. */
function withCareersLink(
  links: { label: string; href: string; external?: boolean }[] | undefined,
) {
  if (!links?.length || !CAREERS_LINK) return links;
  const already = links.some(
    (link) =>
      link.label.toLowerCase() === "careers" ||
      link.href.includes("metabolic-coordinator"),
  );
  if (already) return links;
  const item = {
    label: CAREERS_LINK.label,
    href: CAREERS_LINK.href,
    external: true as const,
  };
  const shopAt = links.findIndex((link) => link.label === "Shop");
  if (shopAt === -1) return [...links, item];
  return [...links.slice(0, shopAt), item, ...links.slice(shopAt)];
}

function mapLinks(rows: LinkRow[] | null | undefined) {
  return rows
    ?.filter((row) => row.label && row.href)
    .map((row) => ({
      label: row.label as string,
      href: row.href as string,
      external: Boolean(row.external) || undefined,
    }));
}

export default async function SiteFooter() {
  const footer =
    process.env.DATABASE_URL && process.env.PAYLOAD_SECRET
      ? await withCMS(async () => {
          const [{ getPayload }, { default: config }] = await Promise.all([
            import("payload"),
            import("@payload-config"),
          ]);
          const payload = await getPayload({ config });
          return payload.findGlobal({ slug: "footer", draft: false });
        }, null)
      : null;

  const quickLinks = withCareersLink(mapLinks(footer?.quickLinks as LinkRow[] | undefined));
  const servicesLinks = mapLinks(footer?.servicesLinks as LinkRow[] | undefined);
  const conditionsLinks = mapLinks(footer?.conditionsLinks as LinkRow[] | undefined);

  return (
    <Footer
      quickLinks={quickLinks?.length ? quickLinks : undefined}
      servicesLinks={servicesLinks?.length ? servicesLinks : undefined}
      conditionsLinks={conditionsLinks?.length ? conditionsLinks : undefined}
    />
  );
}
