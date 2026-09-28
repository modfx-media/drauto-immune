# pSEO Comprehensive SEO Audit — Dr. Autoimmune

**Date:** 2025 (see individual tool timestamps below) · **Scope:** All programmatic/pSEO pages (`/areas-we-serve/**`, `/learn/**`) plus spot-checks against the existing migrated site for NAP/context. **Status: AUDIT ONLY — no code changes were made.** This document is the full findings report; see the summary table at the very end for the one thing to review first.

**Methodology note:** Because none of the audited pSEO pages are deployed to production yet (see Finding 0-A below), on-page/schema/content checks were performed by running a fresh production build (`next build`) and serving it locally (`next start`), then crawling all 531 sitemap URLs with a purpose-built script (`scripts/pseo-audit/crawl.mjs` + `analyze.mjs`, raw data in `data/pseo-audit/`). This is more exhaustive and accurate than spot-checking live URLs would have been, since it covers literally every generated page rather than a sample — but it does mean GSC/keyword-volume/Lighthouse checks (which require public reachability) reflect "not yet live" status rather than live performance.

---

## Step 0 — Inventory

| Check | Result |
|---|---|
| Fresh `npm run build` | ✅ 0 errors, 0 warnings, 541 total generated routes |
| Sitemap (`/sitemap.xml`) URL count | 531 (59 migrated + 461 `areas-we-serve` + 11 `learn`) |
| Build (541) vs. sitemap (531) delta | Fully explained by 10 non-content system routes correctly excluded from the sitemap (`robots.txt`, `sitemap.xml`, `icon.png`, `apple-icon.png`, `/_not-found`) — **not a bug** |
| `generateStaticParams` counts vs. sitemap vs. build tree | ✅ 100% consistent for every route family (50 state hubs, 400 condition×state, 10 Front Range cities, 10 Learn articles) |

**Finding 0-A (CRITICAL — read this first):** **None of the 472 pSEO pages (`areas-we-serve/**` + `learn/**`) are deployed to production.** `git status` shows every pSEO-related file as uncommitted/untracked, and a live `gsc_index_audit` against 6 sample URLs (hub pages + deep pages) confirms Google has **never crawled** any of them ("URL is unknown to Google"). This is not a technical indexability bug — `sitemap.ts`, `robots.ts`, and internal linking were all directly verified correct in the code — the pages simply haven't been pushed/deployed. **Every GSC-dependent finding below (zero impressions, "not indexed") is a direct consequence of this, not a quality problem.**

**Finding 0-B:** `data/pseo-national/pages.json` does not exist — the audit brief assumed this file; the actual national page inventory lives in `content/national-data.ts` (TypeScript, not JSON).

**Finding 0-C:** `data/pseo/pages.json` exists but is **stale** — it still describes the original 12-page Batch 1 scope (a single `/areas-we-serve/denver/` page) from an earlier session. It was never updated when the 461-page nationwide state/condition matrix and the 10 dedicated Front Range city pages replaced that architecture. Low severity (it's a historical record, not used by any code), but worth updating or deleting so it doesn't mislead future audits.

**Finding 0-D:** The audit brief references an `/online/[condition]` route. **This route does not exist anywhere in this codebase.** Treated as N/A.

---

## Step 1 — Build & Technical Checks

| Check | Result |
|---|---|
| Build errors/warnings | ✅ None |
| Static generation | ✅ All 461 areas-we-serve + 11 learn pages use `generateStaticParams` (fully static, no unnecessary dynamic rendering) |
| Canonical tags | ✅ 530/531 pages have a correct, absolute, self-referencing, trailing-slash canonical. ❌ 1 exception: `/live-webinar-schedule/` (pre-existing migrated page, **not** part of the pSEO batch) has no canonical tag or OG tags at all |
| robots.txt | ✅ Allows all, correct sitemap pointer |
| `noindex` meta tags | ✅ 0 found across all 531 crawled pages |
| Trailing slash / lowercase slug consistency | ✅ 100% consistent |
| Internal links: broken links | ✅ 0 broken internal links detected |
| Internal links: orphan pages | ✅ 0 orphan pages — every pSEO page has ≥1 inbound internal link |

---

## Step 2 — On-Page SEO

| Check | Result | Severity |
|---|---|---|
| Title length (all 460 `areas-we-serve` pages) | ❌ Averages ~75-80 chars (pattern: *"Telehealth Autoimmune & Functional Medicine Care in {State} \| Dr. Autoimmune"*), over the ~60-char guideline | Medium |
| Meta description length (same 460 pages) | ❌ Averages 165-190 chars, over the ~155-char guideline | Medium |
| Duplicate titles / duplicate meta descriptions | ✅ 0 found — every state/condition/city gets a unique string | — |
| H1 (site-wide) | ✅ Clean, 1 H1 everywhere except 1 unrelated pre-existing blog post (2 H1s, out of scope) | Low |
| **Word count — all 460 `areas-we-serve` pages** | ❌ State hubs: 470-526 words; Front Range city pages: ~450 words; condition×state pages: similar range. All below common 600-700 word benchmarks for local/national service pages | **High** |
| Word count — Learn articles (10) | ✅ Comfortably long-form, not flagged | — |
| Image alt text | 28 pages site-wide missing alt text on ≥1 image — **all 28 are pre-existing migrated pages**, 0 in the pSEO batch | Low (out of scope) |
| Open Graph tags | ✅ Present/complete on all pSEO pages (1 pre-existing exception, same as canonical finding above) | — |

---

## Step 3 — Content Quality, Duplication & YMYL

This is where the most significant findings are.

### 3-A. Net Information Gain scoring (CRITICAL)

Ran a representative state-hub page (Texas) through a specialized scoring tool modeled on Google's 2026 Scaled Content Abuse / coordinated-content detection criteria:

> **Score: 1/5 — FAILED all 5 checklist items:**
> 1. No page-specific data point requiring actual research (no Texas-specific stats, regulations, or lab-network info)
> 2. No locally-specific detail beyond the state name + 3 city names dropped into a template
> 3. No page-specific framework/angle — identical boilerplate structure to all 49 sibling state pages
> 4. **Zero citations**, including for a contested, unsourced medical claim presented as fact ("All autoimmune diseases start in the gut")
> 5. Content reads identically with the state name removed or swapped for any other state
>
> **Cluster-fingerprint risk: rated "High"** — specifically because of the site-wide pattern across all 460 similarly-built pages, not this one page in isolation.

### 3-B. Quantified near-duplicate content (measured directly, not estimated)

| Page group | Pages | Avg. pairwise text similarity | Min–Max |
|---|---|---|---|
| 50 state hub pages | 1,225 pairs | **77.7%** | 68%–80% |
| Each of 8 condition×state groups (50 states each) | 9,800 pairs total | **75–77%** per group | 72%–78% |
| 10 Front Range city pages | 45 pairs | **77.0%** | 75%–81% |
| 10 Learn articles (control group) | 45 pairs | **13.2%** | — | 

**20,928 page-pairs** exceed a 60% similarity threshold across the areas-we-serve architecture. The Learn articles, by contrast, are genuinely unique hand-written content — no concern there.

### 3-C. Medical disclaimer — MISSING on all 461 `areas-we-serve` pages

The Learn template correctly renders `MEDICAL_DISCLAIMER`; the Areas We Serve template (state hubs, condition×state pages, city pages, and the hub itself) never imports or renders it, despite discussing specific diagnosable medical conditions. **Real YMYL compliance gap.** Severity: Medium-High.

### 3-D. Risky-phrase scan

After fixing a word-boundary bug in the scanner (initial pass falsely matched "cure" inside "se**cure**"), 7 pages site-wide contain a flagged term (cure/cured/miracle/"eliminate your symptoms") — **all 7 are pre-existing legacy blog posts; none are in the new pSEO batch.** Worth a look but out of this audit's primary scope.

### 3-E. CTA / phone presence

✅ 100% pass — every areas-we-serve/learn page has a working Discovery Call CTA and the site phone number.

### 3-F. NAP consistency

✅ The phone number used in all new pSEO JSON-LD (`+1 (303) 882-8447`) is the **same number used consistently across the entire existing live site** (header, footer, every condition page, contact-us JSON-LD). **Pre-existing, unrelated bug found:** `content/data/home.json`'s own `MedicalBusiness` JSON-LD block uses a different, stale phone number (`+1-720-656-9123`) — a real NAP inconsistency on the homepage itself, not introduced by pSEO work, but worth fixing for overall site consistency. Low-Medium severity.

---

## Step 4 — Schema / JSON-LD

| Check | Result |
|---|---|
| JSON-LD parses without error | ✅ 0 parse errors across all 531 pages |
| BreadcrumbList + WebPage/MedicalWebPage + FAQPage present on every areas-we-serve/learn detail page | ✅ Pass |
| FAQPage has ≥1 question everywhere it appears | ✅ Pass |
| Schema phone number matches site NAP | ✅ Pass (matches `+1 (303) 882-8447` everywhere in the pSEO batch) |
| `/learn/` hub page JSON-LD | ❌ **0 JSON-LD blocks** — `/areas-we-serve/` hub correctly has 3 (BreadcrumbList/WebPage/FAQPage), `/learn/` has none. Minor inconsistency, low severity, easy fix |

---

## Step 5 — Keyword Targeting

- **GSC connection:** ✅ Connected to `https://drautoimmune.com/`. Confirms Finding 0-A: 0 impressions/clicks for any pSEO URL in the queried range, and a direct index-status check on 6 sample URLs shows all "unknown to Google / never crawled."
- **Fresh keyword-volume check on the 10 new Front Range city pages** (15 keyword variants tested via DataForSEO): only **3 of 15** show any measurable US monthly search volume:
  - "functional medicine fort collins" — ~170-260/mo
  - "functional medicine arvada" — ~20-50/mo
  - "functional medicine louisville co" — ~10-30/mo
  - The other 12 — including **every** "autoimmune doctor {city}" variant tested — show no measurable volume at all.
- This reconfirms the same near-zero-demand pattern already documented in the original Batch-1 research (`data/pseo/keywords.json`, `data/pseo-national/keywords.json`): the pages are built against essentially undetectable per-keyword search demand.
- **Cannibalization:** ✅ None detected — Boulder was deliberately excluded from the new city pages (routed to `/about-us/` instead) specifically to protect its existing ranking.

---

## Step 6 — Performance & UX / Lighthouse

- No dedicated Lighthouse/PageSpeed/Core Web Vitals MCP tool is available in this environment. The one candidate found (`mobile_friendly_test`) requires a publicly reachable URL — it cannot be run against unpublished pages, and per Finding 0-A, none of these pages are public yet.
- The build confirms 100% static generation for all 461+11 pSEO pages (no per-request server work), which is favorable for performance by construction, but this is not a substitute for real Lighthouse/CWV numbers.
- **Recommendation:** re-run a real Lighthouse/PageSpeed pass once these pages are deployed to a preview or production URL — this step could not be meaningfully completed in this audit.

---

## Merge / Noindex / Delete Candidates (options only — no action taken)

| Page group | Count | Risk signal | Suggested tier |
|---|---|---|---|
| 400 condition×state pages | 400 | Lowest Net-Info-Gain score, zero measurable per-keyword volume in prior research, largest contributor to the site-wide duplicate fingerprint | **Highest risk — reconsider before deploying** |
| 50 state hub pages | 50 | Same template pattern/duplication signal, though they serve a real navigational-hub purpose | Medium risk |
| 10 Front Range city pages | 10 | Same duplication pattern, but 3 of 10 show real keyword demand | Lower risk |
| 10 Learn articles + hub | 11 | Unique content (13.2% similarity), real per-keyword demand from prior research, no duplication concern | **Keep as-is** |

---

## Top duplicate-content pairs (sample of the 25 highest-similarity pairs found)

| Type | Page A | Page B | Similarity |
|---|---|---|---|
| Front Range city | `/areas-we-serve/colorado/lafayette/` | `/areas-we-serve/colorado/broomfield/` | 80.7% |
| Front Range city | `/areas-we-serve/colorado/longmont/` | `/areas-we-serve/colorado/westminster/` | 80.0% |
| State hub | `/areas-we-serve/virginia/` | `/areas-we-serve/west-virginia/` | 79.9% |
| State hub | `/areas-we-serve/new-hampshire/` | `/areas-we-serve/new-jersey/` | 79.1% |
| State hub | `/areas-we-serve/north-carolina/` | `/areas-we-serve/north-dakota/` | 79.1% |
| *(full list of 20,928 pairs above 60% similarity in `data/pseo-audit/findings.json`)* | | | |

---

## Prioritized Fix Plan (for review — not yet approved/implemented)

| # | Fix | Severity | Est. files affected |
|---|---|---|---|
| 1 | Decide on deployment strategy given Finding 0-A + the Net-Info-Gain/duplication findings — this should happen *before* any of the other fixes, since it may change scope entirely | Critical | 0 (decision only) |
| 2 | Add `MEDICAL_DISCLAIMER` to the Areas We Serve template | High | 1 (`components/pages/areas/AreaPageTemplate.tsx` or equivalent) |
| 3 | Add genuine page-specific content to reduce duplication + raise Net-Info-Gain score (real regulatory/lab-logistics/demographic detail per state, sourced claims) — likely requires re-scoping from 400 auto-generated condition pages down to a smaller, deeply-researched set | High | `content/national-data.ts` + possibly route restructuring |
| 4 | Shorten titles (<60 chars) and meta descriptions (<155 chars) across all 460 areas-we-serve pages | Medium | 1 (`content/national-data.ts` generator functions) |
| 5 | Fix stale phone number in `content/data/home.json`'s JSON-LD | Low-Medium | 1 |
| 6 | Add JSON-LD to `/learn/` hub page | Low | 1 (`app/learn/page.tsx`) |
| 7 | Add canonical + OG tags to `/live-webinar-schedule/` | Low | 1 |
| 8 | Update/retire the stale `data/pseo/pages.json` inventory file | Low | 1 |

---

## Summary Table

| Step | Area | Status | Top finding |
|---|---|---|---|
| 0 | Inventory | ⚠️ | **None of the 472 pSEO pages are deployed to production yet** — all GSC/live-indexing findings below stem from this |
| 1 | Build & Technical | ✅ | Clean build, correct canonicals/robots/sitemap, no orphans or broken links |
| 2 | On-Page SEO | ⚠️ | All 460 areas-we-serve pages are under typical word-count benchmarks (450-526 words); titles/meta descriptions run long |
| 3 | Content Quality/YMYL | 🔴 | **Net Information Gain score 1/5** on sampled page + measured 75-80% near-duplicate similarity across all 460 areas-we-serve pages; medical disclaimer missing sitewide on that template |
| 4 | Schema | ✅ | Clean; only gap is missing JSON-LD on the `/learn/` hub |
| 5 | Keyword Targeting | 🔴 | Fresh check on the 10 new Front Range pages: only 3/15 tested keywords show any measurable volume; reconfirms near-zero demand pattern |
| 6 | Performance/Lighthouse | ⚠️ | Could not be completed — no available tool works against undeployed pages |

**Do not fix anything until you say "approved."**
