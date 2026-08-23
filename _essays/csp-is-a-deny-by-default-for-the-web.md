---
layout: essay
title: CSP Is a Deny-by-Default for the Web
dek: "Name what may run. Everything else is refused."
number: 004.89
sort_key: 0004.89
date: 2026-07-28
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: [craft]
brief:
  system: mystic-bytes / darkheartlabs.technology Content-Security-Policy
  issue: CSP treated as a header to copy-paste instead of an allowlist that starts at none
  constraint: static Jekyll origin; no exploit steps or bypass recipes
---

Content-Security-Policy is deny-by-default for the web. You name what may execute and from where. Everything else is refused. `default-src 'none'` plus a short allowlist is the honest form. A policy that allows every host is a comment with extra syntax.

I set CSP on a static origin because mystic-bytes is HTML, CSS, and a little JS. Inline scripts and random CDNs are how an injected script becomes a one-line incident. The header is annoying: a forgotten `style-src`, a markdown plugin that emits an inline handler, a font host you did not list. Annoying is the point. The browser will not know your intent unless you write it.

CSP is not a complete XSS product. It does not make a bad `eval` wise. It does reduce the blast radius of a script that needs a third-party host you never allowed. Start from deny. Add origins you can explain. If you cannot explain a host, it does not belong in the policy. Report-only is how you learn what would break before you enforce. Enforcement is how you stop pretending the report was the control.

A static site has no excuse for a permissive policy. There is no app server that "needs" twenty analytics domains. If the essay collection cannot ship without a third-party script, the script is the product. Admit that, or cut it.

— JV · Dark Heart Labs.

[^1]: MDN, "Content-Security-Policy," and W3C CSP3. Deny-by-default as the intended posture; allowlists as the actual policy.
