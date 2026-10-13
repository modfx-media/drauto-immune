import Link from "next/link";
import { STATE_CONDITIONS, STATES } from "@/content/national-data";

/**
 * Indexable internal-link directory for all 400 state × condition pages.
 * Rendered on the areas hub so matrix URLs are not orphans.
 */
export default function StateConditionDirectory() {
  return (
    <div className="mt-8 space-y-8">
      {STATES.map((state) => (
        <div key={state.slug}>
          <h3 className="text-lg font-extrabold text-ink">{state.name}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {STATE_CONDITIONS.map((condition) => (
              <li key={condition.slug}>
                <Link
                  href={`/areas-we-serve/${state.slug}/${condition.slug}/`}
                  className="inline-flex rounded-pill border border-gray bg-white px-3 py-1.5 text-sm font-medium text-primary hover:border-primary/40 hover:underline"
                >
                  {condition.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
