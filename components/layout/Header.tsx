"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import Button from "@/components/ui/Button";
import Icon from "@/components/ui/Icon";
import Logo from "./Logo";
import UtilityBar from "./UtilityBar";
import { DISCOVERY_CALL_HREF, NAV_LINKS, SITE_CONTACT, type NavItem } from "./nav-links";

const EASE = [0.22, 1, 0.36, 1] as const;

const dropdownContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } },
};

// Dropdown items animate in with the same position+opacity treatment as
// the existing Faq accordion (AnimatePresence-mounted content that only
// appears after a user interaction, not on initial page load — so it's
// not subject to the above-the-fold "stuck invisible on mount" hazard).
const dropdownItem = {
  hidden: { opacity: 0, y: 8, scale: 0.98 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.24, ease: EASE } },
};

/**
 * Shared sliding "hover pill" behind whichever top-level nav item is
 * currently active — a single motion element with a stable `layoutId`
 * so Framer Motion animates it (FLIP) from its previous position/size to
 * the new one whenever a different item is hovered, instead of each item
 * having its own static hover background.
 */
function HoverPill() {
  return (
    <motion.span
      layoutId="nav-hover-pill"
      className="absolute inset-0 -z-10 rounded-full bg-sage"
      transition={{ type: "spring", stiffness: 420, damping: 34 }}
    />
  );
}

/**
 * A top-level nav item with a dropdown: label navigates to its own overview
 * page, an adjacent chevron button toggles the submenu (opens on hover for
 * mouse users too). Only one dropdown is open at a time, managed by the
 * parent `Header`.
 */
function NavDropdown({
  item,
  open,
  hovered,
  onOpen,
  onClose,
  triggerRef,
}: {
  item: NavItem;
  open: boolean;
  hovered: boolean;
  onOpen: () => void;
  onClose: () => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  const panelId = `nav-panel-${item.label.replace(/\s+/g, "-").toLowerCase()}`;

  return (
    <li className="group relative shrink-0" onMouseEnter={onOpen} onMouseLeave={onClose}>
      <div className="relative flex items-center gap-0.5 rounded-full py-1.5 pl-2 pr-1">
        {hovered && <HoverPill />}
        <Link
          href={item.href}
          onClick={onClose}
          className="relative whitespace-nowrap text-sm font-medium text-ink transition-colors hover:text-primary"
        >
          {item.label}
        </Link>
        <button
          ref={triggerRef}
          type="button"
          aria-haspopup="true"
          aria-expanded={open}
          aria-controls={panelId}
          aria-label={`${item.label} submenu`}
          onClick={() => (open ? onClose() : onOpen())}
          className="relative flex h-5 w-5 items-center justify-center rounded-full text-ink-soft transition-colors hover:text-primary"
        >
          <Icon
            name="chevron-down"
            className={`h-3 w-3 transition-transform duration-200 ${open ? "rotate-180 text-primary" : ""}`}
          />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id={panelId}
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.24, ease: EASE }}
            style={{ transformOrigin: "top center" }}
            className={`absolute top-full z-10 pt-3 ${
              item.mega
                ? "left-1/2 w-[min(960px,94vw)] -translate-x-1/2"
                : "left-1/2 min-w-64 -translate-x-1/2"
            }`}
          >
            {item.mega ? (
              <div className="flex overflow-hidden rounded-card border border-gray bg-white shadow-card-hover">
                {/* Left: condition grid */}
                <div className="flex-1">
                  <div className="border-b border-gray bg-sage/40 px-6 py-4">
                    <p className="font-mono text-[0.6rem] font-medium uppercase tracking-[0.14em] text-primary">
                      Conditions We Support
                    </p>
                    <p className="mt-1 text-sm text-ink-soft">
                      Root-cause care for a wide range of autoimmune and chronic conditions.
                    </p>
                  </div>
                  <motion.ul
                    variants={dropdownContainer}
                    initial="hidden"
                    animate="visible"
                    className="grid max-h-[60vh] grid-cols-2 gap-x-2 gap-y-2 overflow-y-auto p-4 sm:grid-cols-3"
                  >
                    {item.children?.map((child) => (
                      <motion.li key={child.href} variants={dropdownItem}>
                        <Link
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          onClick={onClose}
                          className="flex items-center rounded-lg px-2.5 py-2.5 text-sm text-ink transition-colors hover:bg-sage/60 hover:text-primary"
                        >
                          <span className="leading-snug">{child.label}</span>
                        </Link>
                      </motion.li>
                    ))}
                  </motion.ul>
                  <div className="flex items-center justify-between gap-3 border-t border-gray bg-white px-6 py-3">
                    <p className="text-xs text-ink-soft">Don&apos;t see your condition?</p>
                    <Link
                      href="/other-autoimmune-conditions/"
                      onClick={onClose}
                      className="inline-flex items-center gap-1.5 text-xs font-medium text-primary transition-colors hover:text-primary-hover"
                    >
                      View all conditions
                      <Icon name="arrow-right" className="h-3 w-3" />
                    </Link>
                  </div>
                </div>

                {/* Right: featured promo panel */}
                <motion.div
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.1, ease: EASE }}
                  className="relative hidden w-64 shrink-0 flex-col justify-between overflow-hidden bg-primary p-6 text-white md:flex"
                >
                  <motion.div
                    aria-hidden="true"
                    className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-white/10 blur-2xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                  />
                  <div className="relative">
                    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-white/15 text-sage">
                      <Icon name="compass" className="h-5 w-5" />
                    </span>
                    <p className="mt-4 text-lg font-medium leading-snug text-white">
                      Not sure where to start?
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-white/85">
                      Book a discovery call and we&apos;ll help map your care path.
                    </p>
                  </div>
                  <Link
                    href={DISCOVERY_CALL_HREF}
                    onClick={onClose}
                    className="group/cta relative mt-6 inline-flex items-center justify-center gap-1.5 rounded-pill bg-sage px-4 py-2.5 text-sm font-semibold uppercase tracking-wide text-ink transition-all duration-300 hover:-translate-y-0.5 hover:bg-white"
                  >
                    Book your Discovery Call
                    <Icon name="arrow-right" className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-1" />
                  </Link>
                </motion.div>
              </div>
            ) : (
              <motion.ul
                variants={dropdownContainer}
                initial="hidden"
                animate="visible"
                className="flex max-h-[70vh] flex-col gap-0.5 overflow-y-auto rounded-card border border-gray bg-white p-2 shadow-card-hover"
              >
                {item.children?.map((child) => (
                  <motion.li key={child.href} variants={dropdownItem}>
                    <Link
                      href={child.href}
                      target={child.external ? "_blank" : undefined}
                      rel={child.external ? "noopener noreferrer" : undefined}
                      onClick={onClose}
                      className="flex items-center rounded-lg px-3 py-2.5 text-sm text-ink transition-colors hover:bg-sage hover:text-primary"
                    >
                      {child.label}
                    </Link>
                  </motion.li>
                ))}
              </motion.ul>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}

/** Full-screen mobile nav panel with accordion-style dropdowns. */
function MobileMenu({
  onClose,
  links,
}: {
  onClose: () => void;
  links: readonly NavItem[];
}) {
  const [openSection, setOpenSection] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.32, ease: EASE }}
      className="fixed inset-0 z-40 flex flex-col overflow-y-auto bg-white min-[1180px]:hidden"
    >
      <div className="flex items-center justify-between border-b border-gray px-6 py-4">
        <Link href="/" onClick={onClose}>
          <Logo />
        </Link>
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="flex h-10 w-10 items-center justify-center rounded-pill text-ink transition-colors hover:bg-gray"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
            <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      <motion.nav
        aria-label="Mobile"
        className="flex flex-1 flex-col gap-1 px-6 py-4"
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.05 } } }}
      >
        {links.map((link) => {
          const hasChildren = !!link.children?.length;
          const sectionOpen = openSection === link.label;
          return (
            <motion.div
              key={link.href}
              variants={{ hidden: { y: 16 }, visible: { y: 0, transition: { duration: 0.4, ease: EASE } } }}
              className="border-b border-gray"
            >
              <div className="flex items-center justify-between">
                <Link
                  href={link.href}
                  onClick={onClose}
                  target={link.external ? "_blank" : undefined}
                  rel={link.external ? "noopener noreferrer" : undefined}
                  className="flex-1 py-3.5 text-base font-medium text-ink hover:text-primary"
                >
                  {link.label}
                </Link>
                {hasChildren && (
                  <button
                    type="button"
                    aria-expanded={sectionOpen}
                    aria-label={`${link.label} submenu`}
                    onClick={() => setOpenSection(sectionOpen ? null : link.label)}
                    className="flex h-10 w-10 shrink-0 items-center justify-center text-ink-soft"
                  >
                    <Icon
                      name="chevron-down"
                      className={`h-4 w-4 transition-transform duration-200 ${sectionOpen ? "rotate-180 text-primary" : ""}`}
                    />
                  </button>
                )}
              </div>

              <AnimatePresence initial={false}>
                {hasChildren && sectionOpen && (
                  <motion.ul
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25, ease: EASE }}
                    className="flex flex-col gap-0.5 overflow-hidden pb-3 pl-4"
                  >
                    {link.children?.map((child) => (
                      <li key={child.href}>
                        <Link
                          href={child.href}
                          target={child.external ? "_blank" : undefined}
                          rel={child.external ? "noopener noreferrer" : undefined}
                          onClick={onClose}
                          className="block rounded-lg py-2 text-sm text-ink-soft hover:text-primary"
                        >
                          {child.label}
                        </Link>
                      </li>
                    ))}
                  </motion.ul>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}

        <motion.div
          variants={{ hidden: { y: 16 }, visible: { y: 0, transition: { duration: 0.4, ease: EASE } } }}
          className="mt-6 flex flex-col gap-4"
        >
          <Button href={DISCOVERY_CALL_HREF} variant="primary" size="md" className="w-full uppercase tracking-wide" onClick={onClose}>
            Book your Discovery Call
          </Button>
          <div className="flex flex-col gap-2 border-t border-gray pt-4 text-sm text-ink-soft">
            <a href={SITE_CONTACT.phoneHref} className="flex items-center gap-2 hover:text-primary">
              <Icon name="phone-call" className="h-4 w-4 text-primary" />
              {SITE_CONTACT.phone}
            </a>
            <a href={SITE_CONTACT.emailHref} className="flex items-center gap-2 hover:text-primary">
              <Icon name="clock" className="h-4 w-4 text-primary" />
              {SITE_CONTACT.email}
            </a>
          </div>
        </motion.div>
      </motion.nav>
    </motion.div>
  );
}

export default function Header({ navLinks }: { navLinks?: readonly NavItem[] }) {
  const links = navLinks ?? NAV_LINKS;
  const [scrolled, setScrolled] = useState(false);
  const [utilityHidden, setUtilityHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null);

  const lastScrollY = useRef(0);
  const headerRef = useRef<HTMLElement>(null);
  const triggerRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  useEffect(() => {
    let raf = 0;
    function apply() {
      const y = window.scrollY;
      // Wide hysteresis (24-40px) on the scrolled toggle prevents the logo
      // scale / header padding animations from flip-flopping around a
      // single-pixel threshold — that was the "trembling" the user saw
      // when scrolling up near the top of the page.
      setScrolled((prev) => {
        if (!prev && y > 40) return true;
        if (prev && y < 24) return false;
        return prev;
      });
      // Utility bar: hide when scrolling down past 160, reveal ONLY when
      // the user is back near the top (< 60). This is intentionally NOT
      // a "scroll up anywhere = show" behavior — the older version's
      // "reveal on any 4px scroll-up" was the second source of jitter,
      // because every tiny reverse motion re-triggered the grid-rows
      // expand transition, which visually shifts the sticky header
      // during its 300ms animation.
      if (y > lastScrollY.current && y > 160) {
        setUtilityHidden(true);
        setOpenDropdown(null);
        setHoveredLabel(null);
      } else if (y < 60) {
        setUtilityHidden(false);
      }
      lastScrollY.current = y;
      raf = 0;
    }
    function onScroll() {
      if (raf) return;
      raf = requestAnimationFrame(apply);
    }
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close any open dropdown on outside click or Escape (and return focus
  // to its trigger button on Escape, per standard disclosure-widget practice).
  useEffect(() => {
    if (!openDropdown) return;
    function onDocClick(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
        setHoveredLabel(null);
      }
    }
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        triggerRefs.current[openDropdown ?? ""]?.focus();
        setOpenDropdown(null);
        setHoveredLabel(null);
      }
    }
    document.addEventListener("click", onDocClick);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("click", onDocClick);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openDropdown]);

  useEffect(() => {
    if (!mobileOpen) return;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <div className="sticky top-0 z-50">
      <div
        className={`grid overflow-hidden transition-[grid-template-rows] duration-300 ease-out ${
          utilityHidden ? "grid-rows-[0fr]" : "grid-rows-[1fr]"
        }`}
      >
        <div className="min-h-0 overflow-hidden">
          <UtilityBar />
        </div>
      </div>

      <header
        ref={headerRef}
        className={[
          "relative z-50 bg-white/95 backdrop-blur-md transition-shadow duration-200",
          scrolled ? "shadow-card border-b border-gray/0" : "border-b border-gray",
        ].join(" ")}
      >
        <div
          className={`mx-auto flex w-full max-w-[var(--container-max)] items-center justify-between gap-2 px-6 transition-[padding] duration-300 md:px-10 ${
            scrolled ? "py-2" : "py-3"
          }`}
        >
          {/* Left group: logo + primary nav — kept as one flex unit so the
              row's single `justify-between` only ever splits it against the
              right-hand CTA group, instead of spreading space across every
              individual item (which was pushing the CTA too far toward the
              edge on wide screens). */}
          <div className="flex min-w-0 items-center gap-2">
            <Link href="/" className="flex shrink-0 items-center" onClick={() => setMobileOpen(false)}>
              <Logo condensed={scrolled} />
            </Link>

            <nav aria-label="Primary" className="hidden min-[1180px]:flex">
              <ul className="flex shrink-0 items-center" onMouseLeave={() => setHoveredLabel(null)}>
                {links.map((link) =>
                  link.children?.length ? (
                    <NavDropdown
                      key={link.href}
                      item={link}
                      open={openDropdown === link.label}
                      hovered={hoveredLabel === link.label}
                      onOpen={() => {
                        setOpenDropdown(link.label);
                        setHoveredLabel(link.label);
                      }}
                      onClose={() => setOpenDropdown(null)}
                      triggerRef={(el) => {
                        triggerRefs.current[link.label] = el;
                      }}
                    />
                  ) : (
                    <li
                      key={link.href}
                      className="relative shrink-0"
                      onMouseEnter={() => setHoveredLabel(link.label)}
                    >
                      <div className="relative rounded-full px-2 py-1.5">
                        {hoveredLabel === link.label && <HoverPill />}
                        <Link
                          href={link.href}
                          target={link.external ? "_blank" : undefined}
                          rel={link.external ? "noopener noreferrer" : undefined}
                          className="relative whitespace-nowrap text-sm font-medium text-ink transition-colors hover:text-primary"
                        >
                          {link.label}
                        </Link>
                      </div>
                    </li>
                  )
                )}
              </ul>
            </nav>
          </div>

          {/* Right group: CTA (desktop) + hamburger (mobile/tablet).
              Note: the nav/CTA-visible breakpoint below is a custom
              min-[1180px] value rather than a stock Tailwind breakpoint.
              The site's own container is hard-capped at --container-max
              (72rem/1152px), so the usable row width never grows past
              that regardless of viewport. With 8 top-level items (Home,
              About Us, Services, Conditions, Patient Stories, Blog, Shop,
              Contact Us) the nav + CTA no longer fit at the full-size
              (un-scrolled) logo width — fixed by shrinking the logo
              (Logo.tsx `h-9 sm:h-10` → flat `h-7`, ~67px narrower) rather
              than trimming nav padding further. Verified via
              getBoundingClientRect() at 1180px and 1280px, scrollY 0
              (un-scrolled, full-size logo — the tightest case): a
              consistent ~22.4px positive gap between the nav and the CTA,
              no overlap. If another top-level nav item or a longer CTA/nav
              label is ever added, re-measure at 1180px with scrollY 0. */}
          <div className="flex shrink-0 items-center gap-3">
            <div className="hidden min-[1180px]:block">
              <Button href={DISCOVERY_CALL_HREF} variant="primary" size="sm">
                Book your Discovery Call
              </Button>
            </div>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-pill text-ink transition-colors hover:bg-gray min-[1180px]:hidden"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" className="h-6 w-6">
                {mobileOpen ? (
                  <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                ) : (
                  <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Soft dimming backdrop behind an open dropdown — a common modern
          mega-menu affordance that draws focus to the open panel. The
          header itself has an explicit z-index (its own stacking context),
          so this can safely sit at a lower z-index and still render behind
          the header/dropdown while covering the rest of the page below it.
          Only ever mounts from desktop dropdown interactions since nav
          dropdowns aren't rendered below the min-[1180px] breakpoint. */}
      <AnimatePresence>
        {openDropdown && (
          <motion.div
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => {
              setOpenDropdown(null);
              setHoveredLabel(null);
            }}
            className="fixed inset-0 z-40 bg-ink/[0.15] backdrop-blur-[1px]"
          />
        )}
      </AnimatePresence>

      <AnimatePresence>{mobileOpen && <MobileMenu links={links} onClose={() => setMobileOpen(false)} />}</AnimatePresence>
    </div>
  );
}

