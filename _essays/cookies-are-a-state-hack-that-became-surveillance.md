---
layout: essay
title: Cookies Are a State Hack That Became Surveillance
dek: "The protocol is stateless. The header was enough to invent a tracking bus."
number: 004.86
sort_key: 0004.86
date: 2026-07-30
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: [craft]
brief:
  system: mystic-bytes and darkheartlabs.technology HTTP
  issue: cookies described as "just session" while the same header became a cross-site recognizer
  constraint: static site; set cookies only if needed; RFC 6265 as the spec
---

HTTP cookies were a state hack. The protocol is stateless. Someone needed a shopping cart. `Set-Cookie` became a way to hang a small blob on the browser and get it back on the next request. That was enough to invent sessions. It was also enough to invent a tracking bus: a third-party pixel that sets a cookie, then recognizes you on another origin.

RFC 6265 is the adult writeup of a hack that won. I run mystic-bytes as a static site. I do not need a session cookie to publish an essay. Host and analytics defaults still try to teach me otherwise. Third-party cookies are being retired in browsers in slow motion. First-party cookies and fingerprinting remain. The surveillance was not a later betrayal of a pure session technology. It was the same header, aimed at a different purpose.

If you set a cookie, write down why it exists and when it dies. If you do not need state, do not set one. The hack is load-bearing for apps with carts and logins. It is optional for a Jekyll site. Optional is the point. Privacy as a constraint starts before the snippet, not after a cookie banner apologizes for a choice you already made in JavaScript.

A session is a purpose. A tracker is a different purpose wearing the same header. Name which one you shipped.

— JV · Dark Heart Labs.

[^1]: A. Barth, RFC 6265, "HTTP State Management Mechanism" (IETF, 2011). The cookie as specified state, later used as a recognizer across sites.
