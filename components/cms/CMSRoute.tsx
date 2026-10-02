import { draftMode } from "next/headers";
import { LivePreviewListener } from "@/components/cms/LivePreviewListener";
import { queryRoutedContentByPath } from "@/lib/cms/queries";

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
      {draft.isEnabled && <LivePreviewListener />}
      {children}
    </>
  );
}
