---
layout: essay
title: How to Build Responsive Layouts With CSS Grid
dek: "Grid asks how you want things arranged. Then it arranges them."
number: 006.28
sort_key: 0006.28
date: 2026-03-18
cover: /assets/images/cover-craft.svg
type: pillar
read_time: 7
tags: [design, craft]
brief:
  system: mystic-bytes Jekyll layouts, essay index, and card grids on Fedora
  issue: breakpoint-only rows broke when cards and deks varied in length
  constraint: native Grid; no layout framework; cascade literacy lives in a different essay
---

I used to float things. I cleared floats with empty divs. I pretended `display: table` was a layout strategy. CSS Grid is the two-dimensional arrangement model the platform finally shipped. This is not the essay about whether CSS is a language. That one is about cascade, specificity, and which declaration wins. This one is about tracks: where blocks live, how columns share leftover space, and why a card grid should not need a breakpoint for every new tile.

## Thesis

**Name regions first, then properties.** Grid rewards an explicit structure. It punishes "make this div go right" improvisation and the media-query pile that used to impersonate a layout engine.

## Context

mystic-bytes is a Jekyll writing site. The index is cards. The essay page is a reading column with optional asides. I write the CSS on Fedora, usually with Firefox's grid inspector open, because that overlay is the runtime. Auckland 2026 did not change the box model. It did change the screens I actually use: a laptop at a hostel desk, a phone on a bus down Dominion Road, a wide monitor when I can borrow one. The layout has to survive those without a separate "mobile site."

The failure I kept shipping was a card grid that looked fine at three breakpoints and went ragged the moment a dek ran long or a fourth tile appeared. Flex-only page shells were not evil. They were a one-dimensional tool asked to do two-dimensional work. Grid separates *where* a block lives from *how* content flows inside the cell.

I also kept fighting float-era components that assumed a 12-column sketch from a tool that is not the browser. The sketch is a conversation. The grid template is the contract the engine will honor.

## Mechanism

The workhorse for a card index looks like this:

```css
.layout {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(18rem, 1fr));
  gap: 1.5rem;
}
```

`minmax()` sets a readable floor. `auto-fill` asks how many such columns fit. Leftover space is shared. Breakpoints remain useful for navigation chrome and type scale. They should not be the reason every product row exists. Rachel Andrew's layout writing is the practical canon here: Grid and Flex are complementary, not a replacement war.[^1]

Spacing is geometry. Random margins on children create invisible debt. A `gap` token reused across grids (`1rem`, `1.5rem`, `2rem`) is structural. Readers feel the rhythm even when they cannot name `gap`. mystic-bytes uses one scale. When I let Cursor paste `margin-bottom: 23px` on a card, the rhythm breaks and I spend the next PR hunting a ghost.

Grid places regions. Flex distributes items along one axis inside a track: toolbars, tag rows, the metadata line under a title. Nesting flex in a grid cell is idiomatic. Simulating a full page grid with flex alone is how you rediscover 2012. If I need a sidebar beside a reading column, that is Grid. If I need the tags in the sidebar to sit in a row, that is Flex.

Named areas help when the page is a stable machine: `header / nav / main / aside / footer`. An essay index is not that machine. Auto-placement is enough. `grid-template-areas` on a card feed is ceremony you will fight the first time editorial adds a featured slot.

Subgrid is for inherited alignment. When nested cards must line up with a parent column rhythm, subgrid (where it exists) beats duplicating templates. Where support is incomplete, document the fallback on the component, not in a chat from six months ago. MDN's Grid guide is the page I keep open for `auto-fill` versus `auto-fit` and for current subgrid notes.[^2]

The inspector is part of the method. If I cannot see the tracks, I am guessing. Firefox will draw them. Chromium will too. I trust the overlay more than I trust a screenshot from a design file.

## Tradeoffs

Named areas versus auto-placement: areas shine for dashboards you redraw rarely. Card feeds rarely need the names.

Grid is not permission to replace landmarks with a soup of `div`s. Arrangement and document semantics are different jobs. I will wrap for a track. I will not turn a `nav` into a box because the mock used a box. The HTML-as-contract essay owns that fight. Here the rule is narrower: pay wrapping tax in layout, keep the landmarks.

A component library that hides `minmax` will feel fast until you cannot tune the minimum column. Know the native layer. mystic-bytes does not need a layout framework. It needs one template per pattern.

`auto-fit` collapses empty tracks. `auto-fill` keeps them. I default to `auto-fill` for indexes so a sparse row does not stretch one card across the viewport like a mistake.

## Close

The geometry that lasts is repeatable: one grid definition, one gap scale, one minimum column width you can defend in review. Layout becomes a decision you make once per pattern, not a fight on every pull request.

Build the card grid first. Add breakpoints where content demands them, not where the container looks lonely. If the inspector shows tracks and the page still looks wrong, you have an arrangement bug. If a rule "won't apply," that is the other essay.

— JV · Dark Heart Labs.

## References

[^1]: Rachel Andrew, *The New CSS Layout* (A Book Apart, 2018). Grid and Flex as complementary systems, with tracks as the unit of page arrangement.

[^2]: MDN Web Docs, [CSS Grid Layout](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_grid_layout). `auto-fill`, `minmax()`, named areas, and subgrid behavior with current browser notes.
