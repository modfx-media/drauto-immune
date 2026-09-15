import { SITE_CONTACT } from "./nav-links";

/**
 * Top utility strip — contact info. Hidden on small screens to keep the
 * mobile header compact (matches the migrated site's own "hidden on
 * mobile" utility row).
 */
export default function UtilityBar() {
  return (
    <div className="hidden bg-gradient-to-r from-primary to-[#2c5b4a] text-white md:block">
      <div className="mx-auto flex w-full max-w-[var(--container-max)] items-center justify-center gap-6 px-6 py-2 md:px-10">
        <div className="flex items-center gap-4 font-mono text-xs tracking-[0.02em]">
          <a
            href={SITE_CONTACT.phoneHref}
            className="group flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-6"
            >
              <path
                d="M6.6 10.8a15.6 15.6 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25 9 9 0 0 0 2.8.45 1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 2 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1 9 9 0 0 0 .45 2.8 1 1 0 0 1-.25 1z"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinejoin="round"
              />
            </svg>
            <span>{SITE_CONTACT.phone}</span>
          </a>
          <span aria-hidden="true" className="mx-1 h-3 w-px shrink-0 bg-white/25" />
          <a
            href={SITE_CONTACT.emailHref}
            className="group flex items-center gap-2 text-white/90 transition-colors hover:text-white"
          >
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:scale-110"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.5" />
              <path d="m4 7 8 6 8-6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
            </svg>
            <span>{SITE_CONTACT.email}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
