---
layout: essay
title: HTML Is a Contract
dek: "Tags are a promise to browsers, AT, and crawlers — not a sketch."
number: 005.224
sort_key: 0005.224
date: 2026-08-21
cover: /assets/images/cover-craft.svg
read_time: 6
tags: ['craft']
type: pillar
related_projects: [accessibility-rails-components]
brief:
  system: mystic-bytes Jekyll layouts and accessibility-rails-components ViewComponents
  issue: div soup and CSS-as-semantics leaving the accessibility tree and crawlers with a sketch
  constraint: native elements first; ARIA only to fill a named gap; no invented a11y product claims
---

A Jekyll layout can look finished in the browser and still be unsigned. I have shipped mystic-bytes pages where a "heading" was a `div` with a large font, because the mock treated type as paint. CSS kept the promise to the sighted reader. The accessibility tree and the crawler received a generic node. Tags are not a sketch you decorate. They are a contract with every consumer that does not run your stylesheet.

This is not the essay about checklists versus posture. That one already exists. This is the document language: what an element *is* for parsers, assistive technology, and indexers.

## Thesis

**HTML is a contract: the element type is a promise about role, structure, and behavior, honored by browsers, the accessibility tree, and crawlers.** Class names are local slang. Tags are the public API of the page.

## Context

mystic-bytes builds darkheartlabs.technology as HTML. Frontmatter and Markdown go through Jekyll; the artifact is tags. I write those layouts in Cursor on Fedora. If I let the model emit `<div onclick>` because React muscle memory is in the weights, I have broken the contract in the file that actually ships. Auckland 2026 does not give VoiceOver a CSS parser.

[accessibility-rails-components](https://github.com/jv-darkheartlabs/accessibility-rails-components) exists because Rails will generate a form that looks complete while the name, role, and value mapping are wrong. A `button` is a contract: focusable, activatable, named. A `div` with a click handler is a drawing of a button. I keep the library on native elements and Stimulus because that is how you keep the promise without a second, parallel DOM made of ARIA.

Nightbind had the same sketch problem on surfaces that were "done" visually. A control that did not map to a widget in the accessibility tree was not a polish miss. It was a failed export. The living standard already named the element I should have used.

They treat HTML as the leftover after the design tool. The leftover is the product. Everything else is a compile step.

## Mechanism

The HTML living standard is the contract text. It defines parsing (including how you recover from garbage), content models (what may nest in what), and the meaning of elements: `article`, `nav`, `main`, `button`, `input`, `label`, `table`.[^1] A browser that implements HTML is not "rendering your sketch." It is executing that document. Implied tags, foster parenting, and the form-associated element rules are all specified. You do not get to invent a private HTML and then be surprised that Googlebot and Safari disagreed with your intention.

The accessibility tree is a mapping of that document, not a courtesy. Platform APIs expose role, name, value, and state. HTML-AAM describes how HTML elements map into those APIs so AT does not have to guess from pixels.[^2] A heading level is a promise about outline. A `label`/`for` pair is a promise about name computation. `alt` on `img` is a promise about the text alternative. When those are missing, AT still gets a tree. The tree is just a lie of omission.

Crawlers are a third party to the same contract. They read headings, landmarks, links, and `a href`, not your `data-analytics-id`. Semantic HTML is not an SEO trick layered on later. It is the same public language. mystic-bytes can afford this honesty because the site is documents. A writing page that is a pile of `div`s with `role="text"` is a document that refused to be one.

Progressive enhancement is the contract under failure. HTML that works without the Stimulus controller is HTML that still means something when Cursor's JavaScript does not load. Enhance a `button`. Do not reconstruct one.

Parsing is stricter than people think and sloppier than they want. You can omit tags the parser will insert. You cannot omit meaning. A `p` inside a `p` will be repaired. A clickable `div` will not become a button by empathy.

## Tradeoffs

**Native vs ARIA.** ARIA is for gaps the host language left. First rule still holds: do not add a role that the element already has, and do not add a role instead of the element. accessibility-rails-components prefers the element.

**Markdown vs control.** Jekyll will wrap a paragraph. It will not save a heading you never wrote. Author the outline in the source. Do not hope the theme injects it.

**Wrappers vs soup.** Extra `div`s for Grid are allowed. Extra `div`s that replace `ul`, `nav`, and `button` are a contract breach. Pay wrapping tax in layout, not in semantics.

**When the contract is a different host.** Canvas, maps, and some design tools are bitmap or custom accessibility trees. Name that exception. Do not use it as permission to sketch the rest of the app.

## Close

View source, then view the accessibility tree. If a heading is a styled `div`, the contract is unsigned. Browsers will still paint. AT and crawlers will still build a tree. They will not owe you the meaning you kept in Figma.

Tags are the promise. CSS is the outfit. JavaScript is a guest. Write the promise first.

— JV · Dark Heart Labs.

## References

[^1]: WHATWG, *HTML Living Standard*, <https://html.spec.whatwg.org/>. Parsing, content models, and element semantics — the public contract user agents implement.

[^2]: W3C, *HTML Accessibility API Mappings (HTML-AAM)*, <https://www.w3.org/TR/html-aam-1.0/>. How HTML maps into the accessibility tree: role, name, and state as derived from the document, not from the paint.
