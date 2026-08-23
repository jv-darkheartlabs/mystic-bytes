# Literary shelves phase 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recategorize readings into four lanes, split the reviews hub into four URLs, spread literary publish dates through 23 Aug 2026, inherit film lanes, and redate verse so it publishes.

**Architecture:** Category YAML is the source of truth for `lane`. A Node classifier (`resolveLaneCategory`) retags `_readings` frontmatter only. Lane archives are four Jekyll pages sharing `_includes/reading-lane-grid.html`. Films get a `lane` field from `source_readings[0]`. Dates are a separate spread pass that must not call `reading-dates.mjs`.

**Tech Stack:** Jekyll 4, Liquid, Node ESM scripts (existing `scripts/readings/`), SCSS family tokens.

## Global Constraints

- No review, film, or poem body rewrites except standalone `NOLA` → `New Orleans` in verse.
- No new Jekyll collections. Permalinks stay `/r/:slug/`, `/f/:slug/`, `/v/:slug/`.
- Publish dates: 2026-01-01 through 2026-08-23 inclusive. Never later.
- Keep `date_read` / `date_watched` / `date_written` unless after 2026-08-23 (then clamp).
- Do not call `scripts/readings/reading-dates.mjs`.
- Every reading `category` must exist in `reading_categories.yml` and map to exactly one `lane`.
- Do not commit unless the user asks.

---

### Task 1: Taxonomy YAML and family tokens

**Files:**
- Modify: `_data/reading_categories.yml`
- Modify: `_sass/_signal-protocol.scss`
- Modify: `_sass/_readings.scss`
- Create: `_data/reading_recategorize_overrides.yml`
- Modify: `scripts/readings/series-canons.json`

**Produces:** Every category has `lane`. `dark-thriller` is gone. `romantic-suspense` exists. New canon/genre/juvenile keys exist.

- [ ] **Step 1:** Add families `canon`, `genre`, `juvenile` and CSS variables `--family-canon`, `--family-genre`, `--family-juvenile` (reuse `--silver`, `--violet`, `--status`). Add those names to `$reading-families`.
- [ ] **Step 2:** Add `lane: romance` to every remaining trope. Replace `dark-thriller` with `romantic-suspense` (family `edge`, tags `[romanticsuspense, darkromance]`, `lane: romance`).
- [ ] **Step 3:** Set existing `classic-literature` and `juvenile-fiction` to `lane: canon` / `lane: juvenile` and family matching the lane. Add `literary-fiction`, `philosophy-criticism`, `memoir-nonfiction`, `mystery-crime`, `sff`, `horror`, `historical`, `ya-fiction` with lanes as in the spec.
- [ ] **Step 4:** Overrides file starts with at least `a-homerun-proposal: enemies-to-lovers`.
- [ ] **Step 5:** In `series-canons.json`, set Nancy Drew and Hardy Boys `category` to `juvenile-fiction`.

---

### Task 2: Classifier + recategorize runner

**Files:**
- Modify: `scripts/readings/school-canon-categories.mjs`
- Create: `scripts/readings/recategorize-lanes.mjs`
- Create: `scripts/readings/recategorize-lanes-selftest.mjs`

**Produces:** `resolveLaneCategory(meta, overrides) → { category, rule }` with first-match order from the spec. Runner writes frontmatter and a JSON report.

- [ ] **Step 1:** Export `resolveLaneCategory` implementing spec rule order 1–8. Import/extend `GOTHIC_CLASSICS`, `CLASSIC_LIT`, `JUVENILE`. Split philosophy titles out of `CLASSIC_LIT`. Remove Good Omens, Wicked, Memoirs of a Geisha, The Kite Runner, The Time Traveler's Wife from `CLASSIC_LIT`; those resolve to `literary-fiction` unless a romance trope already fits. Potter titles in the juvenile set resolve to `ya-fiction`.
- [ ] **Step 2:** Self-test fixtures: Emma → classic-literature; Dracula → classic-literature; Corduroy → juvenile-fiction; a nancy-drew slug → juvenile-fiction; harry-potter-and-the-sorcerers-stone → ya-fiction; Fourth Wing (fantasy-romance) stays fantasy-romance.
- [ ] **Step 3:** Runner: parse `_readings/*.md`, apply resolver, set `category`, strip `spice` when the new category's lane is not romance, strip juvenile dark-romance CWs (`sexual content` and equivalents), fail if any category is unknown. Write `scripts/readings/recategorize-lanes-report.json`.
- [ ] **Step 4:** Run `node scripts/readings/recategorize-lanes-selftest.mjs` then `node scripts/readings/recategorize-lanes.mjs`.

---

### Task 3: Dates, verse NOLA, film lanes

**Files:**
- Create: `scripts/spread-literary-dates.mjs`
- Modify: `_verse/*.md` (dates + NOLA string)
- Modify: `_films/*.md` (`lane`, `date`, spice removal)
- Modify: `_readings/*.md` (`date` only in this task)

**Produces:** All three collections dated in-window. Films have `lane`. Verse has no standalone NOLA in title/body.

- [ ] **Step 1:** Spread `date` by ascending `sort_key` independently per folder from 2026-01-01 to 2026-08-23. Clamp historical date fields after 2026-08-23. Do not import `reading-dates.mjs`.
- [ ] **Step 2:** After readings are recategorized, set film `lane` from `source_readings[0]` slug → that reading's category → YAML `lane`. Missing source → `lane: canon` and log it. Remove film `spice` when `lane != romance`.
- [ ] **Step 3:** In verse title, dek, source_title, and body, replace standalone `NOLA` with `New Orleans`. Do not rename category key `nola`. Do not unhide `verse_shelf_exclusions.yml` slugs.

---

### Task 4: Hub, lane pages, layouts

**Files:**
- Create: `_includes/reading-lane-grid.html`
- Modify: `media/written/reviews/index.html` (become four-card hub)
- Create: `media/written/reviews/romance/index.html`
- Create: `media/written/reviews/canon/index.html`
- Create: `media/written/reviews/genre/index.html`
- Create: `media/written/reviews/juvenile/index.html`
- Modify: `media/written/literary/index.html`
- Modify: `media/written/literary/projection-room/index.html`
- Modify: `assets/js/projection-room.js`
- Modify: `_layouts/reading.html`
- Modify: `_layouts/film.html`

**Produces:** Four lane URLs. Spice only on romance. Reading back-link goes to the lane archive.

- [ ] **Step 1:** Extract the current reviews grid into `_includes/reading-lane-grid.html` with `include.lane`. Filter chips = categories whose `lane` equals `include.lane`. Show spice only if `cat.lane == "romance"`.
- [ ] **Step 2:** Reviews index becomes a four-card hub. Lane copy from the spec. Literary reviews card: drop “Dark romance shelf.”
- [ ] **Step 3:** Reading layout: back-link `/media/written/reviews/{{ cat.lane }}/`, spice only if `cat.lane == "romance"`. Film layout: spice only if `page.lane == "romance"`. Projection Room: `data-lane` on cards, four lane filter buttons, hide spice when lane is not romance. JS matches `data-lane` when the active filter is a lane.

---

### Task 5: Verify

- [ ] Spot-check Emma, Dracula, Corduroy, Nancy Drew, Potter, Fourth Wing.
- [ ] No `date:` after 2026-08-23 in the three collections.
- [ ] `bundle exec jekyll build`
- [ ] Four lane URLs exist under `_site/media/written/reviews/`
