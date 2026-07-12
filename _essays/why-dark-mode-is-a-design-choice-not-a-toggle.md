---
layout: essay
title: Why Dark Mode Is a Design Choice, Not a Toggle
dek: "Dark interfaces are not the absence of light — they are deliberate decisions about contrast, focus, and who the product is for at midnight."
number: 006.17
sort_key: 0006.17
date: 2003-03-17
cover: /assets/images/cover-craft.svg
read_time: 7
tags: ['design', 'craft']
hashnode: true
---

Dark mode is not a skin you slap on at the end of a sprint. It is a design stance: which elements earn light, which recede, and how the interface behaves when the room is dim and the user has been staring at pixels for hours. Treating it as a toggle checkbox misses the craft entirely.

## Designing for low light

On a dark canvas, every highlight is intentional. Every border, glow, and gradient communicates hierarchy. A button that works on white can vibrate on charcoal. Text that passed WCAG on cream can fail on navy if you copied hex values without re-tuning. Dark mode is empathy encoded in CSS — if you do it properly.

That means separate tokens, not inverted colors. Surfaces need depth without relying on harsh shadows. Focus rings must remain visible. Semantic colors — success, warning, error — need recalibration so they inform instead of shout.

Test both modes with the same components. If you only polish light mode in review, you are shipping half a product.

## The glow belongs to design

When you build a dark theme well, you choose what deserves attention. Not everything should compete for luminance. The best dark interfaces whisper: they pull you toward the primary action instead of illuminating every secondary panel equally.

This is why I maintain [dark-heart-themes](https://github.com/jv-darkheartlabs/dark-heart-themes) as a first-class concern — not because dark is trendy, but because builders deserve tooling that treats low-light work as a normal condition, not an afterthought. Terminals, dashboards, and writing environments should be readable at hour fourteen without punishing the eyes.

## Live where you thrive

Some people do their clearest thinking after sunset. Some need reduced glare for sensory or medical reasons. A product that respects dark mode respects those users' hours and health — not just their aesthetic preference.

Set your environment deliberately. Let the code glow where it should. And when you ship, ship both modes with the same care, or ship one mode honestly instead of pretending inversion is design.

Dark mode is not a lifestyle brand. It is a commitment to contrast, rest, and the people who do their work while the rest of the world sleeps.


## Accessibility crosses both modes

Reduced motion, high contrast, and keyboard focus do not stop mattering because the background is dark. A theme system that treats accessibility tokens as first-class citizens serves both modes — and saves you from the quarterly audit panic.

Preview screenshots in both modes before release. Marketing assets that only show light mode train users to expect a product half-finished.
 Color is not decoration in either mode. It is wayfinding. Treat both palettes as navigation systems.
 Your eyes are part of the user story. Design for them in every mode.


Ship tokens, not tricks. A design system that treats theme as data survives the next redesign without another fire drill.
 Choose contrast with the same rigor you choose copy.
  That is the whole argument.


If your dark mode is an afterthought, your users can tell — even if your marketing cannot.

— JV · Dark Heart Labs.
