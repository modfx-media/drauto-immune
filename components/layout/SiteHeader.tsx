import Header from "@/components/layout/Header";
import { withCMS } from "@/lib/cms/safe";
import type { NavItem } from "@/components/layout/nav-links";

type NavRow = {
  label?: string | null;
  href?: string | null;
  external?: boolean | null;
  mega?: boolean | null;
  children?: { label?: string | null; href?: string | null; external?: boolean | null }[] | null;
};

export default async function SiteHeader() {
  const header = await withCMS(async () => {
    const [{ getPayload }, { default: config }] = await Promise.all([
      import("payload"),
      import("@payload-config"),
    ]);
    const payload = await getPayload({ config });
    return payload.findGlobal({ slug: "header", draft: false });
  }, null);

  const rows = (header?.nav as NavRow[] | undefined) ?? [];
  const navLinks: NavItem[] = rows
    .filter((row) => row.label && row.href)
    .map((row) => ({
      label: row.label as string,
      href: row.href as string,
      external: Boolean(row.external) || undefined,
      mega: Boolean(row.mega) || undefined,
      children: row.children
        ?.filter((child) => child.label && child.href)
        .map((child) => ({
          label: child.label as string,
          href: child.href as string,
          external: Boolean(child.external) || undefined,
        })),
    }));

  return <Header navLinks={navLinks.length ? navLinks : undefined} />;
}
