import { draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/cms/LivePreviewListener";
import { RenderRoutedContent } from "@/components/cms/RenderRoutedContent";
import { queryRoutedContentByPath } from "@/lib/cms/queries";

/**
 * Query-first overlay: a published CMS document wins when RenderRoutedContent
 * can map it; otherwise the designed page (`children`) stays.
 */
export async function CMSRoute({
  path,
  children,
}: {
  path: string;
  children: React.ReactNode;
}) {
  const [routed, draft] = await Promise.all([queryRoutedContentByPath(path), draftMode()]);
  if (!routed) return children;

  return (
    <>
      {draft.isEnabled ? <LivePreviewListener /> : null}
      <RenderRoutedContent routed={routed} fallback={children} />
    </>
  );
}
