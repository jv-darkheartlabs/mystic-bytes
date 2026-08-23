# Literary shelves — taxonomy, dates, and later rewrite

Date: 2026-08-23  
Status: draft for review  
Phase in this spec: **1 — taxonomy, dates, hub split**  
Out of this spec: body rewrites (phase 2)

## Goal

Make the literary shelves honest and publishable.

- Readings stop filing *Corduroy* as gothic-horror-romance and *Emma* as enemies-to-lovers.
- The reviews hub splits into four lanes with their own URLs.
- Publish dates sit in the live window (1 Jan–23 Aug 2026) so Jekyll `future: false` actually shows the work.
- Verse dated 2027–2035 comes back into that window.
- Films inherit lane from the source reading and stay one Projection Room archive.

Phase 2 (separate plan, after phase 1 ships): full JV rewrite of all 2,110 reading bodies, then 43 film bodies. Templates below are locked now so recategorization does not dump juvenile titles into a book-club mold later.

## Non-goals (phase 1)

- No review or film body rewrites.
- No poem rewrites. Verse work is dates plus the two `VERSE_VOICE.md` enforcement rules named below.
- No new Jekyll collections. Readings stay `_readings` at `/r/:slug/`. Films stay `_films` at `/f/:slug/`. Verse stays `_verse` at `/v/:slug/`.
- Do not couple `date_read` to publish date. Ignore `scripts/readings/reading-dates.mjs` (it places `date_read` 0–14 days before `date`). Historical read/watched/written dates stay unless they are after 2026-08-23.

## Locked decisions

| Decision | Choice |
|---|---|
| Method | Category map + rules + slug overrides |
| Reading IA | Four URLs, not tabs |
| New genres | literary-fiction, mystery-crime, sff, memoir-nonfiction, horror, historical, philosophy-criticism |
| Thin categories | Keep philosophy-criticism and memoir-nonfiction even if under 15 titles |
| YA | Juvenile lane, category `ya-fiction` |
| Dates | Same window as journal: 2026-01-01 through 2026-08-23 |
| Historical dates | Keep; clamp only values after today |
| Verse | Redate + enforce New Orleans naming and personal-lore `shelf: false` |
| Films | One archive; `lane` copied from first `source_readings` slug |
| Rewrite depth | Full, later. Not this phase. |

Three URLs was an earlier pick. Four lanes superseded it. Use four URLs.

## Information architecture

### Literary parent

`/media/written/literary/` keeps three cards: reviews, projection room, verse.

Reviews card copy must not say “Dark romance shelf.” It points at the reviews hub.

### Reviews hub and lanes

| URL | Lane | Copy |
|---|---|---|
| `/media/written/reviews/` | hub | Four cards |
| `/media/written/reviews/romance/` | romance | The Orchid Room — trope, craft, ethics of desire |
| `/media/written/reviews/canon/` | canon | Classics, literary fiction, philosophy, memoir |
| `/media/written/reviews/genre/` | genre | Mystery, SFF, horror, historical — not romantasy |
| `/media/written/reviews/juvenile/` | juvenile | Children’s, MG, and YA series |

Individual reviews stay at `/r/:slug/`. `shelf: false` and `shelf_exclusions.yml` still hide cards from every lane grid. The `/r/` page remains live.

### Projection Room

Stays one URL: `/media/written/literary/projection-room/`.

Add an optional lane filter (romance / canon / genre / juvenile) driven by `lane` on the film. Do not split into four film archives.

Hide spice peppers on the film card when `lane` is not `romance`.

### Verse

No lane split. Archive stays `/media/written/literary/verse/`.

## Taxonomy

Each reading category maps to exactly one `lane`. Templates derive lane from `_data/reading_categories.yml`. Do not add a `lane` key on reading frontmatter (dual source of truth). Films do get `lane:` because their own `category` is cinematic, not the book lane.

### Romance (`lane: romance`)

Keep existing tropes:

`age-gap`, `arranged-marriage`, `bully-romance`, `captor-and-captive`, `dark-billionaire`, `dark-cowboy-romance`, `dark-military-romance`, `enemies-to-lovers`, `forbidden-love`, `gothic-horror-romance`, `mafia-boss-and-innocent`, `motorcycle-club`, `omegaverse`, `reverse-harem`, `rockstar-romance`, `stalker-obsession`, `vampire-paranormal`, `fantasy-romance`

Rename:

- `dark-thriller` → `romantic-suspense` when the engine is desire plus danger.

`romantic-suspense` family: `edge`. Tags: `romanticsuspense`, `darkromance`.

Do not keep `dark-thriller` as a category. Every current `dark-thriller` file must land on `romantic-suspense`, `mystery-crime`, `horror`, `sff`, `historical`, `ya-fiction`, `juvenile-fiction`, or a canon category.

### Canon (`lane: canon`)

| Key | Label | For |
|---|---|---|
| `classic-literature` | Classic Literature | School/public-domain canon (*Emma*, *Dracula*, *1984*) |
| `literary-fiction` | Literary Fiction | Modern/contemporary literary (Morrison, McCarthy, literary contemporary) |
| `philosophy-criticism` | Philosophy & Criticism | Nietzsche, Plato, Lewis-as-apologetics, theory readers |
| `memoir-nonfiction` | Memoir & Nonfiction | Angelou, *On Writing*, *Diary of a Young Girl* |

Gothic classics (*Dracula*, *Frankenstein*, *Dorian Gray*) are `classic-literature`, not `gothic-horror-romance`.

### Genre (`lane: genre`)

| Key | Label | For |
|---|---|---|
| `mystery-crime` | Mystery & Crime | Christie, Grisham, Millennium, *Gone Girl* — no romance engine |
| `sff` | Science Fiction & Fantasy | SFF whose engine is not romance (*Dune*, Earthsea, Foundation) |
| `horror` | Horror | Horror that is not gothic-horror-romance (*Carrie*, *The Shining*) |
| `historical` | Historical Fiction | Historical that is not romantasy |

### Juvenile (`lane: juvenile`)

| Key | Label | For |
|---|---|---|
| `juvenile-fiction` | Juvenile | Picture books through MG (Seuss, Ramona, Nancy Drew, Hardy Boys, Narnia, *The Hobbit*) |
| `ya-fiction` | YA | YA series (Harry Potter, Hunger Games, Divergent, Maze Runner) |

### Families

Romance keeps `passion`, `power`, `gothic`, `bond`, `edge`.

New families for filter coloring:

- `canon`
- `genre`
- `juvenile`

Each non-romance category sets `family` to its lane name.

### Spice and content notes

| Lane | Spice in frontmatter | Peppers on card |
|---|---|---|
| romance | keep 1–5 | yes |
| canon | remove `spice` | no |
| genre | remove `spice` | no |
| juvenile | remove `spice` | no |

Juvenile content notes: keep only when the book needs them (violence in Hunger Games). Strip dark-romance CWs (`sexual content` on Seuss, etc.).

Romance prose must not cite spice numbers. That is a phase-2 voice rule; phase 1 only fixes frontmatter display.

## Recategorization rules

Run order. First match wins. Write a report of every change with `slug`, `from`, `to`, `rule`.

1. **Slug overrides** in `_data/reading_recategorize_overrides.yml` (`slug: category`).
2. **Series prefixes**
   - `nancy-drew-`, `hardy-boys-`, `nancy-drew-1-64` → `juvenile-fiction`
   - `ramona`, `beezus`, `dr-seuss`, `if-you-give-` → `juvenile-fiction`
   - `harry-potter-` → `ya-fiction`
   - `hunger-games`, `catching-fire`, `mockingjay`, `divergent`, `insurgent`, `allegiant`, `maze-runner`, `scorch-trials`, `death-cure` (and numbered/series slug variants) → `ya-fiction`
3. **Extend** `scripts/readings/school-canon-categories.mjs` lists. **Do not reuse its current targets.** Today that file maps Nancy Drew → `dark-thriller` and gothic classics → `gothic-horror-romance`. New targets:
   - `JUVENILE` set → `juvenile-fiction` except Potter titles → `ya-fiction`
   - `CLASSIC_LIT` set → `classic-literature`, except philosophy titles (`beyond good and evil`, `thus spoke zarathustra`, `the republic`, `mere christianity`, Nietzsche readers) → `philosophy-criticism`
   - Remove contemporary misfits from `CLASSIC_LIT` before using it: *Good Omens*, *Wicked*, *Memoirs of a Geisha*, *The Kite Runner*, *The Time Traveler's Wife*. File those as `literary-fiction` unless a romance trope already fits.
   - `GOTHIC_CLASSICS` set → `classic-literature`
4. **Author lists** (in the same module or a sibling rules file): Austen, Dickens, the Brontës, Shelley, Stoker, Shakespeare, Tolstoy, Dostoevsky, Kafka, Woolf, etc. → `classic-literature` unless an override says otherwise.
5. **Philosophy / memoir title+author lists** → those canon categories.
6. **Mystery / SFF / horror / historical title+author lists** → genre categories. Only apply when the current category is `dark-thriller` or `gothic-horror-romance`, or when the title is on the list. Do not steal live romantasy (`fantasy-romance`, `vampire-paranormal`, etc.).
7. **Clean romance tropes stay.** If the current category is a romance trope other than `dark-thriller` or `gothic-horror-romance`, leave it unless a higher rule matched (*Emma* is caught by Austen, not left as `enemies-to-lovers`).
8. **Remainder**
   - leftover `dark-thriller` → `romantic-suspense`
   - leftover `gothic-horror-romance` → stay `gothic-horror-romance`
   - leftover `classic-literature` / `juvenile-fiction` → stay, except Potter already moved

Also update `scripts/readings/series-canons.json`: Nancy Drew / Hardy Boys `category` becomes `juvenile-fiction`, not `dark-thriller`.

Ambiguous leftovers (heuristic wanted to file a contemporary romance as a classic) go in the override file, not in ad-hoc script branches. Ship phase 1 with an overrides file that at least covers the known false friends from the planning pass (*A Homerun Proposal* is not a classic).

After the run: every `_readings/*.md` `category` must exist in `reading_categories.yml`. Fail the script if not.

## Dates

Window: **2026-01-01** through **2026-08-23** inclusive. Never later. Jekyll will not publish future dates.

Spread each collection **independently** by ascending `sort_key` (same method as the journal pass):

- `_readings` (2,110)
- `_films` (43)
- `_verse` (341)

Keep `date_read`, `date_watched`, `date_written` when they are ≤ 2026-08-23. If any is after that day, set it to 2026-08-23.

Do not rewrite `date_read` to sit near `date`. The older reading-date helper that does that is out of scope and must not be called.

## Verse enforcement (phase 1 only)

- Spread `date` as above. Keep `date_written`.
- In published poem text and titles, replace standalone `NOLA` with `New Orleans`. Category key `nola` stays (it is the taxonomy slug, not display copy). Display label is already “New Orleans”.
- Personal-lore slugs stay `shelf: false`. Canonical hide list is `_data/verse_shelf_exclusions.yml` (`tale-of-winston-and-chewy`, `winstons-epiphany`, `underworld-light`). Do not unhide them.
- No other verse body edits.

## Films (phase 1)

- Spread `date` across the window. Keep `date_watched` except clamp-after-today.
- After readings are recategorized, set each film’s `lane` from `site.readings` match on `source_readings[0]`.
- If the source slug is missing, set `lane: canon` and list it in the recategorize report.
- Remove `spice` from film frontmatter when `lane != romance`. Leave cinematic `category` (fantasy, gothic-horror, etc.) unchanged in phase 1.

## Layout and copy

- `_layouts/reading.html`: look up lane from category data. Show spice only for romance. Back-link goes to that lane archive, not the hub.
- `_layouts/film.html`: show spice only for `lane == romance`.
- Reviews index becomes the four-card hub (mirror `media/written/literary/index.html`).
- Each lane page reuses one include, `_includes/reading-lane-grid.html`, filtered to that lane’s categories. Filter chips are that lane’s categories only.
- `assets/js/reading-log.js` can stay; it already filters on `data-category`.
- Literary hub lede: book reviews in four lanes, projection room, verse. No “dark romance shelf” as the only description of reviews.

## Phase 2 templates (locked, not built now)

Used when bodies are rewritten later. Phase 1 must not reshape bodies to match.

**Romance** — keep `reading_review_framework.yml`. Headings: Hook & thesis, The contextual pivot, Deep-dive critique, Discussion launchpad. 400–550 words. Spice via craft, never as a number.

**Canon** — Hook & thesis, Contextual pivot, Deep-dive critique. 350–500 words. No launchpad. No heat.

**Genre** — Canon headings plus one genre-placement paragraph in the pivot. 400–550 words. Optional launchpad. No spice.

**Juvenile** — short note, 180–280 words. What it is, when she read it, why it stayed. No book-club questions. No dark-romance frame.

**Films** — keep Projection Room five-section form. Spice only if source lane is romance.

## Architecture (files)

| Path | Change |
|---|---|
| `_data/reading_categories.yml` | `lane` on every category; add new keys; replace `dark-thriller` with `romantic-suspense` |
| `_data/reading_recategorize_overrides.yml` | slug → category |
| `scripts/readings/school-canon-categories.mjs` | new targets; YA split; philosophy split |
| `scripts/readings/recategorize-lanes.mjs` | runner + report |
| `scripts/readings/series-canons.json` | juvenile category for Drew/Hardy |
| `scripts/spread-literary-dates.mjs` (or equivalent) | readings, films, verse dates |
| `_readings/*.md` | `category`, optional spice/CW cleanup, `date` |
| `_films/*.md` | `lane`, `date` |
| `_verse/*.md` | `date`; NOLA string replace where needed |
| `media/written/reviews/index.html` | four-card hub |
| `media/written/reviews/{romance,canon,genre,juvenile}/index.html` | lane grids |
| `_includes/reading-lane-grid.html` | shared grid |
| `media/written/literary/index.html` | hub copy |
| `media/written/literary/projection-room/index.html` | lane filter; conditional spice |
| `_layouts/reading.html`, `_layouts/film.html` | spice + back-link |
| `_data/reading_review_framework.yml` | no phase-1 edit (phase 2) |

## Verification

1. Recategorize script exits 0; report written; zero unknown categories.
2. Count: every reading has a category whose `lane` is one of romance / canon / genre / juvenile.
3. Spot-check: *Emma* → `classic-literature`; *Dracula* → `classic-literature`; *Corduroy* → `juvenile-fiction`; a Nancy Drew → `juvenile-fiction`; a Potter → `ya-fiction`; a romantasy title still `fantasy-romance`.
4. No `date:` after 2026-08-23 in `_readings`, `_films`, `_verse`.
5. Verse files with `date_written` after 2026-08-23 are clamped; 314 previously future-dated poems now have dates in-window.
6. `bundle exec jekyll build` succeeds.
7. Four lane URLs render and only list their lane.
8. `/r/:slug/` still works. Romance cards show peppers; juvenile/canon/genre cards do not.
9. html-proofer internal links (existing CI job) pass.

## Success criteria (phase 1)

The public reviews hub describes four lanes. Opening Orchid Room does not show Seuss. Opening juvenile does. Publish dates are all in 2026 through 23 Aug. Verse from 2027–2035 is live. Film pages carry a lane that matches the source book. No review prose was rewritten in this phase.

---

Maintained by Dark Heart Labs. Author: JV.
