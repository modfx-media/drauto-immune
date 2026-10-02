"use client";

import { RefreshRouteOnSave } from "@payloadcms/live-preview-react";
import { useRouter } from "next/navigation";

export function LivePreviewListener() {
  const router = useRouter();
  const serverURL =
    process.env.NEXT_PUBLIC_SERVER_URL &&
    !process.env.NEXT_PUBLIC_SERVER_URL.includes("localhost")
      ? process.env.NEXT_PUBLIC_SERVER_URL
      : typeof window !== "undefined"
        ? window.location.origin
        : "";

  if (!serverURL) return null;

  return <RefreshRouteOnSave refresh={() => router.refresh()} serverURL={serverURL} />;
}
