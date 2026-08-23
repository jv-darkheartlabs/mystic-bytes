---
layout: essay
title: Next.js Is React With Opinions About the Server
dek: "The framework's product is where the tree renders, not whether you like JSX."
number: 005.441
sort_key: 0005.441
date: 2026-07-31
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: Next.js as the common React meta-framework
  issue: server/client split treated as a styling choice instead of a rendering policy
  constraint: contrast with mystic-bytes Jekyll; no invented Next.js app at DHL
---

Next.js is React plus a strong opinion about the server: routing as files, rendering as a decision, data as something that may never reach the browser.[^1] JSX is not the product. The product is where the tree runs.

I do not run Next for Dark Heart Labs. mystic-bytes is Jekyll: markdown in, HTML out, no RSC payload, no `use client` boundary. That is an opinion too, just an older one. Next is what you reach for when the UI is a React app that still needs a first byte from a server you control.

The App Router made the opinion louder. Server Components by default, client islands where you opt in, caching as a footgun with a logo. Read the rendering docs before you copy a dashboard tutorial into a brochure site. If you wanted files on disk, Jekyll already did that without a hydration story.

Use Next when React is already the law of the repo and you need a server in the loop. Do not use it to launder a static essay collection through a JavaScript budget.

— JV · Dark Heart Labs.

## References

[^1]: Next.js Docs, "Server and Client Components," <https://nextjs.org/docs/app/getting-started/server-and-client-components>. Server Components by default, client islands where you opt in.
