---
layout: essay
title: React Is a Default, Not a Law
dek: "Ecosystem gravity is real. mystic-bytes is still Jekyll."
number: 005.440
sort_key: 0005.440
date: 2026-07-31
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: ['craft']
brief:
  system: frontend hiring and tutorial default around React
  issue: treating a UI library as the required shape of every site, including a static writing repo
  constraint: mystic-bytes stays Jekyll; no invented React product at DHL
---

React is the default UI library the way GitHub is the default forge: not because a standards body voted, but because the graph of jobs, tutorials, and npm packages already points there.[^1] Gravity is not a law of physics. It is a crowd.

mystic-bytes is Jekyll. Essays are files. The page is HTML. I do not mount a component tree to publish a paragraph. Cursor and GitHub will still offer React snippets because that is what the index contains. I decline them for this repo the same way I decline a Kubernetes sidebar for Pages.

Use React when you have UI state that actually deserves a client runtime: a Rails app with a dense dashboard, a design tool, anything that is not a document. Do not use it as baptism for a writing site. The default is a hiring convenience. The law would be "HTML is illegal," and nobody passed that.

If the work is a document, ship a document. Leave the ecosystem gravity for the products that need a tree of components and a reconciliation loop.

— JV · Dark Heart Labs.

## References

[^1]: React Docs, "Describing the UI," <https://react.dev/learn>. The official model of components and declarative UI — the library the crowd treated as a default.
