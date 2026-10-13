import Link from "next/link";
import { STATES, STATE_CONDITIONS } from "@/content/national-data";

/**
 * "Find care in your state" block for flagship condition pages.
 * Only renders when the condition is part of the nationwide matrix.
 */
export default function FindCareByState({ conditionSlug }: { conditionSlug: string }) {
  const condition = STATE_CONDITIONS.find((c) => c.slug === conditionSlug);
  if (!condition) return null;

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-ink sm:text-3xl">Find Care in Your State</h2>
      <p className="mt-4 text-base leading-relaxed text-ink-soft">
        Looking for {condition.name} support by telehealth from where you live? Open the guide for
        your state to see how video visits, time zones, and local lab draws work. Availability is
        confirmed with the office — these pages do not claim licensure in every state.
      </p>
      <ul className="mt-6 columns-2 gap-x-8 sm:columns-3 md:columns-4">
        {STATES.map((state) => (
          <li key={state.slug} className="mb-2 break-inside-avoid">
            <Link
              href={`/areas-we-serve/${state.slug}/${condition.slug}/`}
              className="font-medium text-primary hover:underline"
            >
              {state.name}
            </Link>
          </li>
        ))}
      </ul>
      <p className="mt-4 text-sm text-ink-soft">
        Or browse the full{" "}
        <Link href="/areas-we-serve/" className="font-medium text-primary hover:underline">
          areas we serve
        </Link>{" "}
        directory.
      </p>
    </div>
  );
}
