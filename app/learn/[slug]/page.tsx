import { notFound } from "next/navigation";
import type { Metadata } from "next";
import JsonLd from "@/components/JsonLd";
import LearnPageTemplate from "@/components/pages/learn/LearnPageTemplate";
import { getLearnPage, getLearnSlugs } from "@/content/learn-data";
import { buildLearnJsonLd } from "@/lib/learn-jsonld";
import { SITE_URL } from "@/lib/site";

export async function generateStaticParams() {
  return getLearnSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLearnPage(slug);
  if (!page) return {};

  const canonical = `${SITE_URL}/learn/${page.slug}/`;
  return {
    title: page.title,
    description: page.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: page.title,
      description: page.metaDescription,
      url: canonical,
      type: "article",
      publishedTime: page.datePublished,
      modifiedTime: page.dateModified,
    },
    twitter: {
      card: "summary_large_image",
      title: page.title,
      description: page.metaDescription,
    },
  };
}

export default async function LearnArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLearnPage(slug);
  if (!page) notFound();

  return (
    <>
      <JsonLd blocks={buildLearnJsonLd(page)} />
      <LearnPageTemplate page={page} />
    </>
  );
}
