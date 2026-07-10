# Technical Specification — Mystic Bytes (Jekyll Site)

## Overview

Static Jekyll site for Dark Heart Labs essays, portfolio, CV, and media, deployed to GitHub Pages with Pagefind search.

## Architecture

```mermaid
flowchart LR
  Content["_essays/ + _data/"] --> Jekyll["Jekyll build"]
  Jekyll --> Pagefind["Pagefind index"]
  Pagefind --> Pages["GitHub Pages"]
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Site generator | Jekyll 4 |
| Hosting | GitHub Pages |
| Search | Pagefind |
| Styles | SCSS |

## Deployment

Pushes to `main` run `.github/workflows/jekyll.yml`.

## Evidence map

| Concern | Path |
|---------|------|
| Essays | `_essays/` |
| Site data | `_data/` |
| Layout | `_includes/`, `_layouts/` |
| CI deploy | `.github/workflows/jekyll.yml` |

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
