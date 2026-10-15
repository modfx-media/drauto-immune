/** Next sets this during `next build` page-data collection. */
function isProductionBuild(): boolean {
  return process.env.NEXT_PHASE === "phase-production-build";
}

/**
 * Run CMS work with a hard timeout so Vercel SSG cannot hang on Neon/Payload
 * cold starts (generateStaticParams / static pages that query Payload).
 */
export async function withCMS<T>(fn: () => Promise<T>, fallback: T): Promise<T> {
  const timeoutMs = isProductionBuild() ? 5_000 : 20_000;
  try {
    return await Promise.race([
      fn(),
      new Promise<T>((_, reject) => {
        setTimeout(() => reject(new Error(`[cms] timed out after ${timeoutMs}ms`)), timeoutMs);
      }),
    ]);
  } catch (error) {
    console.error("[cms]", error);
    return fallback;
  }
}
