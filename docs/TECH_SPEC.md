# Technical Specification — Mystic Bytes (Jekyll Site)

## Overview

Career-focused Jekyll site for Jennifer Picado: experience, résumé, selected work, outdoors and personal media. The retained card search queries the Scryfall catalog; general site search is removed.

## Architecture

```mermaid
flowchart LR
  Content["_essays/ + _data/"] --> Jekyll["Jekyll build"]
  Jekyll --> Pages["GitHub Pages"]
  CardSearch["Card search page"] --> Scryfall["Scryfall catalog API"]
```

## Tech stack

| Layer | Technology |
|-------|------------|
| Site generator | Jekyll 4 |
| Hosting | GitHub Pages |
| Card search | Scryfall API |
| Styles | SCSS |

## Deployment

Pushes to `main` run `.github/workflows/jekyll.yml`.

## Evidence map

| Concern | Path |
|---------|------|
| Essays | `_essays/` |
| Career facts and copy | `_data/career.yml` |
| Site data | `_data/` |
| Résumé download | `assets/documents/Jennifer-Picado-Resume.pdf` |
| Live demos | `demos.html` |
| Layout | `_includes/`, `_layouts/` |
| Form POST (no mailto) | `assets/js/form-submit.js`, `assets/js/employment-contact.js`, `docs/MAIL.md` |
| CI deploy | `.github/workflows/jekyll.yml` |

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
