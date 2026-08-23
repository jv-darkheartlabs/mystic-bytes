---
layout: essay
title: HTTP Is the Web Whether You Like the Verbs
dek: "Browsers, caches, and crawlers already speak this language. Inventing a private dialect does not exempt you from theirs."
number: 004.70
sort_key: 0004.70
date: 2026-08-20
cover: /assets/images/cover-code.svg
type: pillar
read_time: 6
brief:
  system: mystic-bytes Jekyll site on HTTPS behind a CDN
  issue: missing pages returned 200 with HTML; Cache-Control left renamed essays sticky for a week
  constraint: static host; no app server to invent semantics; HTTP headers are the contract
---

GraphQL is a query language. gRPC is a procedure call. Your SPA router is a costume. The web that actually ships still speaks HTTP: browsers, CDNs, crawlers, feed readers, `curl` in a deploy script. You can dislike the verbs. You cannot opt out of the semantics. API versioning is a different promise. This is the protocol those clients already assumed before they read your OpenAPI file.

## Thesis

**HTTP is the public language of the web, and lying in that language is a protocol bug.** Status codes, methods, and cache directives are meaning. Treating them as decoration produces caches that cannot think and monitors that stay green while users hit a wall.

## Context

I run mystic-bytes as a Jekyll site over HTTPS. There is no application server to hide behind. The origin emits files and headers. The CDN, the browser, Googlebot, and my own `curl` checks all interpret those headers with the same RFC, whether I remember the RFC or not.

Two failures taught the same lesson. After a slug rename, origin served a 301 to the new permalink. The CDN kept serving the old HTML as 200 because `Cache-Control` had been set like a static asset that never moves: long `max-age`, no `must-revalidate`, no talk of the URL as a resource that can change identity. Readers with a warm cache saw a week of the previous essay. The deploy was correct. The protocol conversation with the cache was not.

The second failure was quieter. A missing permalink rendered Jekyll's 404 template. The host, for a stretch, returned that HTML with status 200. Uptime stayed green. Search consoles learned the URL existed. I had a pretty error page and a false success. HTTPS was fine. TLS does not fix a lie in the status line.

## Mechanism

**Methods are promises about side effects.** RFC 9110 defines method semantics in public: GET and HEAD are safe; PUT and DELETE are idempotent; POST is neither by default.[^1] Safe means a crawler or a prefetch can issue the request without changing server state. Idempotent means a retry is not a second purchase. When a "REST API" uses GET to delete a record because the button was easier to wire, the damage is not aesthetic. Caches, browsers, and link previews will replay it.

On mystic-bytes the only honest methods at the edge are GET and HEAD. Forms that need POST live elsewhere.

**Status codes are the type system of the transfer.** 200 means the request succeeded as the server understood it. 304 means the cached representation is still good. 404 means this resource is gone or never was; 410 is the rarer claim that it is gone on purpose. 301 is a durable new home; 302 is a detour. Returning 200 with `{"error": "..."}` in JSON, or 200 with a 404 template, trains every client to ignore the status line and parse the body. Intermediaries cannot parse your body. They only have the code. The HTML can be kind. The status cannot be polite.

**Caching is HTTP, not a CDN product.** Freshness and validation (`Cache-Control`, `ETag`, `Last-Modified`, 304) are how the web scales without asking the origin every time. A static essay can be immutable at a hashed asset URL and short-lived at a permalink that might redirect. Collapsing those into one `max-age=31536000` is how a taxonomy rename becomes a week of ghost pages. The CDN is an HTTP cache with a dashboard. If the headers are wrong, the dashboard will happily be wrong faster.

## Tradeoffs

**REST-ish vs RPC-shaped JSON.** A single POST endpoint that switches on a `method` field is easier to generate from one handler. It also throws away caching, safe retry, and every generic client that already knows GET. Use RPC behind the firewall if you must. At the public web boundary, pay the verb tax.

**Long cache vs editorial agility.** Immutable hashed CSS can live forever. An essay permalink cannot. Split the cache policy by what the URL *is*, not by what is convenient in `nginx` copy-paste.

**Pretty errors vs honest codes.** Designers want a branded 404. Operators want green checks. Both can have the branded page. Only one of them gets to pick the status, and it should be the operator who has read 9110.

## Close

The web is not your framework's router table. It is caches and clients that already agreed on methods, statuses, and freshness. mystic-bytes on HTTPS only works when I tell that pile the truth: this GET is a read, this 301 is a move, this 404 is an absence, this asset may be reused until I say otherwise. TLS does not invent new verbs.

If you ship this week, look at one response in DevTools. If the status and the `Cache-Control` would confuse a stranger's cache, they will confuse yours.

— JV · Dark Heart Labs.

## References

[^1]: R. Fielding, M. Nottingham, and J. Reschke, eds., RFC 9110, *HTTP Semantics* (IETF, June 2022). The current standard for methods, status codes, representations, and the meaning of a request independent of any one framework. Caching rules sit alongside in RFC 9111; the semantics that make caching legal start here.
