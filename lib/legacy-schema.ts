import type { JsonLdBlock } from "@/lib/content";
import { SITE_URL } from "@/lib/site";

const CLINIC_ID = `${SITE_URL}/#medicalclinic`;
const WEBSITE_ID = `${SITE_URL}/#website`;

const LEGACY_SOURCES = new Set(["rank-math-schema", "yoast-schema-graph"]);
const DROP_ACTIONS = new Set(["SearchAction", "CommentAction"]);

function isRecord(value: unknown): value is Record<string, unknown> {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function nodeTypes(node: Record<string, unknown>): string[] {
  const type = node["@type"];
  if (typeof type === "string") return [type];
  if (Array.isArray(type)) return type.filter((item): item is string => typeof item === "string");
  return [];
}

function legacyPersonId(id: string): boolean {
  return id.endsWith("#person") || id.includes("#/schema/person/") || id.includes("/author/");
}

/** Scraped WordPress author / Rank Math knowledge-graph person. */
function isLegacyPersonNode(node: Record<string, unknown>): boolean {
  const types = nodeTypes(node);
  const id = typeof node["@id"] === "string" ? node["@id"] : "";
  if (types.includes("Person") && types.includes("Organization")) return true;
  if (types.includes("Person")) return true;
  if (types.includes("Organization") && legacyPersonId(id)) return true;
  return false;
}

function isLegacyRef(node: Record<string, unknown>): boolean {
  const id = typeof node["@id"] === "string" ? node["@id"] : "";
  if (!legacyPersonId(id)) return false;
  const types = nodeTypes(node);
  if (types.length === 0) return true;
  return types.includes("Person") || types.includes("Organization");
}

function stripActions(node: Record<string, unknown>): Record<string, unknown> {
  if (!("potentialAction" in node)) return node;
  const raw = node.potentialAction;
  const list = Array.isArray(raw) ? raw : [raw];
  const kept = list.filter((item) => {
    if (!isRecord(item)) return false;
    const types = nodeTypes(item);
    if (types.some((type) => DROP_ACTIONS.has(type))) return false;
    const blob = JSON.stringify(item);
    return !blob.includes("?s=") && !blob.includes("search_term_string");
  });
  const next = { ...node };
  if (kept.length === 0) delete next.potentialAction;
  else next.potentialAction = Array.isArray(raw) ? kept : kept[0];
  return next;
}

function rewriteRefs(node: unknown): unknown {
  if (Array.isArray(node)) return node.map(rewriteRefs);
  if (!isRecord(node)) return node;
  if (isLegacyRef(node)) return { "@id": CLINIC_ID };

  const next: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(node)) {
    if (key === "@context") continue;
    next[key] = rewriteRefs(value);
  }
  return stripActions(next);
}

function flattenNodes(data: Record<string, unknown>): Record<string, unknown>[] {
  if (Array.isArray(data["@graph"])) {
    return data["@graph"].filter(isRecord);
  }
  return data["@type"] ? [data] : [];
}

function isLegacyBlock(block: JsonLdBlock): boolean {
  if (block.source && LEGACY_SOURCES.has(block.source)) return true;
  if (!block.data) return false;
  const blob = JSON.stringify(block.data);
  return (
    blob.includes("#person") ||
    blob.includes("?s=") ||
    blob.includes("/author/developer") ||
    blob.includes("#/schema/person/")
  );
}

function score(node: Record<string, unknown>): number {
  let value = Object.keys(node).length;
  if (node.breadcrumb) value += 5;
  if (node.dateModified || node.datePublished) value += 2;
  if (typeof node.description === "string") value += 2;
  if (Array.isArray(node.itemListElement)) value += node.itemListElement.length;
  return value;
}

function pick(nodes: Record<string, unknown>[], type: string): Record<string, unknown> | undefined {
  const matches = nodes.filter((node) => nodeTypes(node).includes(type));
  if (matches.length === 0) return undefined;
  return matches.reduce((best, node) => (score(node) > score(best) ? node : best));
}

/**
 * Collapse scraped Rank Math / Yoast graphs into one WebSite, one WebPage,
 * and (on posts) one BlogPosting. Drops the `#person` organization, the
 * `/?s=` SearchAction, the "developer" author, and a duplicate Article.
 */
export function stripLegacyWordPressSchema(blocks: JsonLdBlock[]): JsonLdBlock[] {
  const passthrough: JsonLdBlock[] = [];
  const legacyNodes: Record<string, unknown>[] = [];

  for (const block of blocks) {
    if (!block.data || !isLegacyBlock(block)) {
      passthrough.push(
        block.data
          ? { ...block, data: rewriteRefs(block.data) as Record<string, unknown> }
          : block,
      );
      continue;
    }
    legacyNodes.push(...flattenNodes(block.data));
  }

  if (legacyNodes.length === 0) return passthrough;

  const rewritten = legacyNodes
    .filter((node) => !isLegacyPersonNode(node))
    .filter((node) => {
      const types = nodeTypes(node);
      return !types.includes("MedicalClinic") && !types.includes("MedicalBusiness");
    })
    .map((node) => rewriteRefs(node))
    .filter(isRecord)
    .filter((node) => nodeTypes(node).length > 0);

  const hasPosting = rewritten.some((node) => nodeTypes(node).includes("BlogPosting"));
  const withoutArticles = rewritten.flatMap((node) => {
    if (!nodeTypes(node).includes("Article")) return [node];
    if (hasPosting) return [];
    return [{ ...node, "@type": "BlogPosting" }];
  });

  const webPage = pick(withoutArticles, "WebPage");
  const posting = pick(withoutArticles, "BlogPosting");
  const breadcrumb = pick(withoutArticles, "BreadcrumbList");
  let webSite: Record<string, unknown> | undefined = pick(withoutArticles, "WebSite");
  if (!webSite && (webPage || posting)) {
    webSite = {
      "@type": "WebSite",
      "@id": WEBSITE_ID,
      url: `${SITE_URL}/`,
      name: "Dr. Autoimmune",
      inLanguage: "en-US",
    };
  }
  const singles = new Set(["WebSite", "WebPage", "BlogPosting", "Article", "BreadcrumbList"]);
  const rest = withoutArticles.filter((node) => !nodeTypes(node).some((type) => singles.has(type)));

  if (webSite) {
    webSite["@id"] = typeof webSite["@id"] === "string" ? webSite["@id"] : WEBSITE_ID;
    webSite.publisher = { "@id": CLINIC_ID };
  }
  if (webPage) {
    webPage.isPartOf = { "@id": (webSite?.["@id"] as string | undefined) ?? WEBSITE_ID };
    if (webPage.about && isRecord(webPage.about) && isLegacyRef(webPage.about)) {
      webPage.about = { "@id": CLINIC_ID };
    }
  }
  if (posting) {
    posting.author = { "@id": CLINIC_ID };
    posting.publisher = { "@id": CLINIC_ID };
    if (webPage && webPage["@id"]) {
      posting.mainEntityOfPage = { "@id": webPage["@id"] };
      posting.isPartOf = { "@id": webPage["@id"] };
    }
  }

  const graph = [webSite, webPage, breadcrumb, posting, ...rest].filter(isRecord);
  if (graph.length === 0) return passthrough;

  return [
    {
      source: null,
      data: {
        "@context": "https://schema.org",
        "@graph": graph,
      },
    },
    ...passthrough,
  ];
}
