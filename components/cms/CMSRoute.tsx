import { draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/cms/LivePreviewListener";
import { RenderRoutedContent } from "@/components/cms/RenderRoutedContent";
import { queryRoutedContentByPath } from "@/lib/cms/queries";

/**
 * Query-first overlay (payload-cms-integration skill):
 * published CMS doc wins; otherwise render hardcoded children.
 * Drafts do not replace the public site (queries use draft only in draftMode).
 */
export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const [routed, draft] = await Promise.all([
    queryRoutedContentByPath(path),
    draftMode(),
  ]);
  if (!routed) return children;

  return (
    <>
      {draft.isEnabled && <LivePreviewListener />}
      <RenderRoutedContent routed={routed} fallback={children} />
    </>
  );
}
