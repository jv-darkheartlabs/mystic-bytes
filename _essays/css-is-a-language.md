---
layout: essay
title: CSS Is a Language
dek: "Selectors and cascade are a programming model, not decoration."
number: 005.222
sort_key: 0005.222
date: 2026-08-23
cover: /assets/images/cover-craft.svg
read_time: 6
tags: ['craft']
type: pillar
brief:
  system: mystic-bytes Jekyll layouts and component CSS on Fedora
  issue: treating stylesheets as visual notes while the cascade silently picked a competing rule
  constraint: no layout-framework rewrite; learn the evaluation model instead of sprinkling !important
---

I keep being told CSS is not a real language. Then a mystic-bytes layout "mysteriously" ignored the rule I wrote in Cursor, and the inspector showed a different selector winning for the same property. That is evaluation, not taste. Selectors are predicates. The cascade is the interpreter. Decoration is what people call it when they refuse to read the spec.

This is not a Grid tutorial. Arrangement is a different essay. This one is the language that decides which declaration is true.

## Thesis

**CSS is a programming language whose evaluation model is the cascade.** You write rules that match, then the engine sorts those rules and applies one value per property. Specificity, origin, and order are the control flow. Pretending the stylesheet is a mood board is how you debug color by shouting.

## Context

mystic-bytes is Jekyll. Layouts are HTML. The look lives in CSS the browser will actually parse. I write it on Fedora, usually with Firefox's computed pane open, because that pane is the runtime. Cursor will happily complete a utility class or an `!important` before I have named why the previous rule lost. The Auckland 2026 move does not change what a reader’s browser does with those files.

The failure I keep repeating is social, not syntactic. A component in accessibility-rails-components needed a focus ring that survived a parent theme. I styled `button:focus-visible`. A later "cleanup" in a wrapper used `.btn { outline: none }` with a more specific class list Cursor had concatenated. The ring vanished. Visual review still passed if you used a mouse. Keyboard users got a control that looked inert. The stylesheet had executed correctly. I had written two programs that disagreed, and I had not stated the precedence.

They call this "just design." Designers who actually ship CSS already know it is a language. The insult is aimed at the people who treat the file as a comment on a mock.

Nightbind taught the same lesson on a checkout surface: a `div` dressed as a button inherited `color` and did not inherit the focus behavior I assumed, because inheritance is property-specific. The cascade is not "later files win." It is an algorithm with a documented sort.

## Mechanism

Bert Bos and the CSS 2.1 editors wrote the cascade down as a sorting problem: collect declarations that match, then order them by origin and importance, then by specificity, then by order of appearance.[^1] User-agent styles sit under author styles. `!important` inverts the author/user relationship. That inversion is why dumping `!important` in a "hotfix" is not a stronger opinion. It is a different program with a different sort key.

Specificity is a tuple, not a vibe. IDs beat classes beat types. Inline beats IDs. `:where()` contributes zero. `:is()` takes the most specific argument. If you cannot compute the tuple for the two rules in the inspector, you are guessing. MDN’s cascade introduction is the readable form of the same algorithm: origin, importance, layers, specificity, source order.[^2]

Cascade layers (`@layer`) admit that specificity wars were a bad API. A later layer beats an earlier one even if its selector is weaker. mystic-bytes does not need twelve layers. It does need me to stop using ID selectors as a personality.

Inheritance is the other half of defaulting. `color` inherits. `margin` does not. Custom properties cascade as specified values. When Cursor pastes `--accent` on `:root` and again on `.essay`, that is assignment in nested scopes. The computed value is the program’s output.

Selectors are boolean expressions over the tree. Descendant, child, sibling, `:not()`, `:has()`: these are queries. A query language that paints boxes is still a query language. Pixels as output do not make the evaluation decorative.

## Tradeoffs

**Utility classes vs cascade literacy.** Utilities flatten specificity and make the HTML the stylesheet. That can be a good dialect for an app you rebuild weekly. On a Jekyll writing site it turns every paragraph into a class dump I will not remember in six months. I keep the cascade and name a few components.

**`!important` vs layers.** Importance is a blunt instrument. Layers are a declared order. If a third-party theme is the problem, wrap it in a layer rather than racing it with IDs.

**Resets vs components.** A global reset is a program that runs first. Component CSS that assumes browser defaults will lie after a reset. Read the reset. Then write the component.

**When to ignore the cascade.** Generated email HTML, and some SVG presentation attributes, are hostile hosts. Do not moralize. Change host or accept inline.

## Close

Open the computed styles on the element that "won't listen." Name the winning origin, the specificity tuple, and the losing rule. If you cannot, you were decorating. CSS already ran the program. You just refused to read the return value.

Selectors and cascade are the language. The picture is the output.

— JV · Dark Heart Labs.

## References

[^1]: Bert Bos et al., *Cascading Style Sheets Level 2 Revision 1 (CSS 2.1) Specification*, W3C, "Assigning property values, Cascading, and Inheritance," <https://www.w3.org/TR/CSS22/cascade.html>. The original public algorithm: origin, importance, specificity, and order — CSS as a specified evaluation model, not a paint program.

[^2]: MDN Web Docs, "Introduction to the CSS cascade," <https://developer.mozilla.org/en-US/docs/Web/CSS/Guides/Cascade/Introduction>. Readable walkthrough of origin, importance, cascade layers, specificity, and source order, aligned with CSS Cascading and Inheritance (W3C).
