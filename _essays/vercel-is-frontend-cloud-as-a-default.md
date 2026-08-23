---
layout: essay
title: Vercel Is Frontend Cloud as a Default
dek: "Git push, preview URL, edge cache. The platform is the workflow."
number: 005.453
sort_key: 0005.453
date: 2026-08-10
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: Vercel preview deployments and edge network as the common frontend host
  issue: treating a document site as incomplete without a preview hostname and an edge function
  constraint: mystic-bytes stays Jekyll on GitHub Pages; product (previews, edge), not company narrative
---

Vercel is the frontend cloud a lot of teams get without choosing a cloud: git push, a preview URL, bytes cached at the edge. I do not run mystic-bytes on it. The writing site is Jekyll on GitHub Pages. The scheduler lives on Railway. I am a user of preview deploys as a habit, not a Vercel operator, and I will not route a static essay collection through their dashboard to look current.

The product that stuck is the preview. A pull request gets a hostname.[^1] Designers click it. QA clicks it. The argument happens on a URL that dies with the branch. That is a real workflow. It is also how "the frontend" became a platform SKU instead of a folder of files. The edge network is the other half: put the bytes close to the reader, run middleware at the boundary, call the compute ephemeral so nobody has to ssh.[^2] Fine for an app that needs a first byte from a function. Excessive for markdown that can be a file on Pages.

Use Vercel when the UI is a JavaScript app that wants a preview per change and a CDN that is not a weekend of nginx. Do not use it as baptism for a document site. The default is gravity. Gravity is not a requirement. I read the preview and edge docs so I can talk to people who ship there. I still publish HTML.

— JV · Dark Heart Labs.

## References

[^1]: Vercel Docs, "Environments," <https://vercel.com/docs/deployments/environments>. Preview as the pre-production environment: a hostname per branch or pull request.

[^2]: Vercel Docs, "CDN," <https://vercel.com/docs/cdn>. Edge cache and request handling at the boundary — the other half of the frontend-cloud default.
