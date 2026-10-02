import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";
import { normalizeCmsPath } from "@/lib/cms/url";

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get("secret");
  const rawPath = request.nextUrl.searchParams.get("path");

  if (!process.env.PREVIEW_SECRET || secret !== process.env.PREVIEW_SECRET) {
    return new Response("Invalid preview secret", { status: 401 });
  }

  const path = normalizeCmsPath(rawPath);
  if (!path || !path.startsWith("/")) {
    return new Response("Invalid path", { status: 400 });
  }
  if (path.split("/").some((segment) => segment === "null" || segment === "undefined")) {
    return new Response("Invalid path", { status: 400 });
  }

  const draft = await draftMode();
  draft.enable();

  const destination = path === "/" ? "/" : `${path}/`;
  redirect(destination);
}
