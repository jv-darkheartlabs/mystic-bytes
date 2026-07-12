---
layout: essay
title: How to Build Responsive Layouts With CSS Grid
dek: "Grid asks how you want things arranged — then arranges them. The old float hacks deserve a quiet burial."
number: 006.28
sort_key: 0006.28
date: 2013-07-05
cover: /assets/images/cover-craft.svg
type: pillar
read_time: 7
tags: [design, craft]
brief:
  system: content-heavy marketing site with card grids, sidebars, and uneven copy lengths
  issue: breakpoint-only layouts broke on new card sizes; float-era components fought every refactor
  constraint: one spacing scale; no layout framework; must survive designer handoffs without a rewrite
---

We used to float things. We cleared floats with empty divs. We pretended `display: table` was a layout strategy. CSS Grid is what happens when the platform stops apologizing — and responsive layout stops being a pile of media queries held together by hope.

## Thesis

**Name regions first, properties second.** Grid rewards explicit structure; it punishes "make this div go right" improvisation.

## Context

Every content site eventually ships the same failure mode: a card grid that looked fine at three breakpoints and collapsed into ragged columns the moment marketing added a fourth tile with a longer title. Float-based rows and flex-only page shells were not evil — they were one-dimensional tools asked to do two-dimensional work. Grid separates *where* a block lives from *how* content flows inside it.

## Mechanism

**The pattern that ships**

```css
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.5rem;
}
```

`auto-fill` with `minmax()` is the workhorse: as many columns as fit, each at least readable, sharing leftover space. Breakpoints remain for navigation and type scale — not for every product row.

**Spacing as geometry**

Random margins on children create invisible debt. A gap token reused across grids (`1rem`, `1.5rem`, `2rem`) is structural. Users feel consistent rhythm even when they cannot cite `gap: 1.5rem`.

**Grid and flex divide labor**

Grid places regions on the page. Flex distributes items along one axis inside a track — toolbars, button groups, metadata rows. Nesting flex in grid cells is idiomatic. Simulating a full page grid with flex alone is how teams rediscover 2012.

**Subgrid when alignment must inherit**

When nested cards must line up with a parent column rhythm, subgrid (where supported) beats duplicating column templates. Where support is incomplete, document the fallback in the component — not in a Slack thread six months later.

## Tradeoffs

**Named areas vs auto placement.** `grid-template-areas` shines for stable dashboards. Card feeds rarely need the ceremony.

**Semantic HTML vs visual grid.** Grid is not permission to div-soup a page. Landmarks (`main`, `nav`, `aside`) still belong in the document tree.

**Framework vs native grid.** Layout primitives in a component library help — until they hide minmax logic you cannot tune. Know the native layer underneath.

## Close

The sacred geometry is repeatability: one grid definition, one gap scale, one minimum column width you can defend in review. Layout becomes a decision you make once per pattern, not a fight on every pull request.

Build the card grid first. Add breakpoints only where *content* — not the container — demands them.

— JV · Dark Heart Labs.

## References

[^1]: Rachel Andrew, *The New CSS Layout* (A Book Apart, 2018) — grid and flex as complementary systems, not rivals.
[^2]: MDN, *CSS Grid Layout* — `auto-fill`, `minmax()`, and subgrid behavior with current browser notes.
