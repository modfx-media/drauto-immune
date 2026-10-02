import type { Metadata } from "next";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Page not found | Dr. Autoimmune",
};

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-6 py-24 text-center">
      <p className="font-mono text-xs font-semibold uppercase tracking-[0.2em] text-primary">404</p>
      <h1 className="mt-3 text-3xl font-extrabold text-ink">Page not found</h1>
      <p className="mt-3 text-ink-soft">
        That address is not on this site. Try the home page or the site directory.
      </p>
      <p className="mt-8">
        <a href="/" className="font-semibold text-primary underline-offset-4 hover:underline">
          Back to home
        </a>
      </p>
    </div>
  );
}
