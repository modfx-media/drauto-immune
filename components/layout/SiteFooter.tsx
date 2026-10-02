import Footer from "@/components/layout/Footer";
import { withCMS } from "@/lib/cms/safe";

type LinkRow = {
  label?: string | null;
  href?: string | null;
  external?: boolean | null;
};

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
  const footer = await withCMS(async () => {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    return payload.findGlobal({ slug: "footer", draft: false });
  }, null);

  const quickLinks = mapLinks(footer?.quickLinks as LinkRow[] | undefined);
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
