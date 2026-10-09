import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { normalizeCmsPath } from "@/lib/cms/url";

export async function GET(request: Request): Promise<Response> {
  const draft = await draftMode();
  draft.disable();

  const { searchParams } = new URL(request.url);
  const path = normalizeCmsPath(searchParams.get("path")) ?? "/";
  if (!path.startsWith("/") || path.split("/").some((s) => s === "null" || s === "undefined")) {
    redirect("/");
  }

  const destination = path === "/" ? "/" : `${path}/`;
  redirect(destination);
}
