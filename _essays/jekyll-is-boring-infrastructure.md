---
layout: essay
title: Jekyll Is Boring Infrastructure
dek: "Markdown in, HTML out. The unfashionable generator is the point."
number: 005.436
sort_key: 0005.436
date: 2026-08-14
cover: /assets/images/cover-code.svg
type: pillar
read_time: 9
tags: ['craft']
brief:
  system: mystic-bytes Jekyll collections building darkheartlabs.technology
  issue: treating the generator as a "stack" to replace instead of a build step to keep boring
  constraint: GitHub Pages-compatible plugins; collections stay files in git
---

Jekyll turns folders of markdown into a site. That is the whole trick. I use it for mystic-bytes because I want the trick to stay small, not because static generation won a thought-leadership round.

This is not a tour of the publishing pipeline. Canonical URLs, media collections, and "if it is not in the repo it is not published" live in a different essay. This one is the tool: Jekyll, collections, Liquid, and the GitHub Pages builder that makes "boring" a deploy target.

## Thesis

**Jekyll is boring infrastructure.** A collection is a directory. A build is HTML. The generator should be the least interesting part of a writing practice.

## Context

mystic-bytes is a Jekyll app. Essays live in `_essays/`. Journal and other collections sit beside them. Frontmatter is YAML. The layout is HTML with Liquid. I write in Cursor on Fedora; GitHub Actions and Pages do the rest. When the build is green, files exist. When it is red, I broke a layout or a piece of frontmatter. There is no application server to pet.

I have been offered migrations the way people are offered religions. Next.js. A headless CMS. A database for posts. Each one is a real product. Each one would make the writing site more interesting than the writing. I already have enough interesting problems: voice, accessibility, whether a pillar is actually 800 words. I do not need a hydration strategy for a paragraph.

Auckland 2026 is a laptop problem, not a platform problem. Clone the repo, `bundle exec jekyll serve`, keep going. Boring is portable.

## Mechanism

Jekyll's own docs describe a static site generator: content plus templates plus a build, no runtime database required.[^1] That sentence is the architecture. mystic-bytes does not query Postgres for an essay. It renders a file. If git has the file, the site can have the page.

Collections are how the file becomes a type. Jekyll documents collections as named sets of documents with their own frontmatter and output rules.[^2] `_essays` is a collection. So are other buckets on this site. The curatorial work is naming the collection and living with it. The generator work is a loop: read documents, apply layout, write HTML. Tags, dates, and `sort_key` are data I typed. Jekyll does not invent a taxonomy. It prints what I claimed.

Liquid is the template language: `if`, `for`, filters, includes. It is ugly in the way that lasts. I can read a layout from 2014 and still know what it does. I cannot say the same of every React data-fetching mode. Ugly-stable is a feature when the site must survive me being on a plane.

GitHub Pages is the boring host. Pages will build a Jekyll site from a repo with a known plugin allowlist.[^3] That allowlist is a constraint, not an insult. If a gem is not permitted, I do not need it, or I prebuild elsewhere and push `_site`. mystic-bytes prefers staying inside the allowlist so the forge's builder and my laptop stay cousins. Divergence is how "it works locally" becomes a weekend.

Frontmatter is the API. `layout`, `title`, `dek`, `type`, `brief`. The generator does not care if the essay is good. It cares if the keys parse. That is the correct split. Voice is my job. YAML is Jekyll's job. When I want a new field, I add a key and teach one layout. I do not stand up a schema migration.

## Tradeoffs

**Plugin hunger versus Pages.** The ecosystem is full of gems that would make collections feel like a CMS. Each gem is a future rebuild. I keep the Gemfile short so Fedora, CI, and Pages do not drift.

**Boring versus interactive.** Jekyll will not give you a client-side editor with presence avatars. I draft in files. Collaboration is git. If I needed multiplayer on the paragraph, I would be writing a different product. I am not.

**Build time versus runtime.** A big collection makes the build slower. A runtime CMS makes 3am slower when auth dies. I pick the slow build. mystic-bytes can afford it. A newsroom with a thousand authors might not. This studio is not a newsroom.

**When Jekyll is the wrong tool.** App-like UI, per-user data, a form that must write back. Rails is for that. A design tool is for that. Do not stretch Liquid into an application server because you already know the layouts.

## Close

Keep the generator dull. Put the heat in the sentences. mystic-bytes should be the least surprising Jekyll site a Pages builder has seen all week.

If you are tempted to rewrite the writing site in a framework with a conference, write one more essay first. The infrastructure was not the blockage.

— JV · Dark Heart Labs.

## References

[^1]: Jekyll Documentation, "Jekyll," <https://jekyllrb.com/docs/>. Static generation: content, layouts, and a build step with no required app server.

[^2]: Jekyll Docs, "Collections," <https://jekyllrb.com/docs/collections/>. Named document sets, frontmatter, and output — the mechanism mystic-bytes uses for essays and adjacent writing.

[^3]: GitHub Docs, "Setting up a GitHub Pages site with Jekyll," <https://docs.github.com/en/pages/setting-up-a-github-pages-site-with-jekyll>. Pages as a constrained Jekyll host, including how the builder relates to a repository.
