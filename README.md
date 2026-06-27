# Mystic Bytes Portfolio Site
Portfolio repository aligned to ANZSCO 261312 (Developer Programmer), showcasing structured content modeling, frontend implementation, and deployment-ready static-site delivery.

Live site: [gh.jenthedev.it.com](https://gh.jenthedev.it.com)

## Problem
Job-hunting portfolios often become difficult to maintain when profile content, project evidence, and presentation styling are mixed together.

## Solution
Mystic Bytes separates resume content into structured data files and uses a Jekyll-based presentation layer, enabling rapid updates while preserving consistent UX and branding.
## Career Presentation Hub
This repository is the primary location for career-facing narrative and professional positioning.

### Role focus
- Primary target: **Developer Programmer (ANZSCO 261312)**
- Adjacent evidence: **261112**, **262113**, **263212**, and theming-focused **261211**

### Application handoff links
- Portfolio landing map: [projects-workspaces/README.md](https://github.com/jen-the-dev/projects-workspaces/blob/main/README.md)
- Submission pack tracker: [nz-immigration-application-tracker](https://github.com/jen-the-dev/nz-immigration-application-tracker)
- Cover letter source: [cover-letter-anzsco-261312.md](https://github.com/jen-the-dev/nz-immigration-application-tracker/blob/main/cover-letter-anzsco-261312.md)

## Architecture
- `_data/` stores structured resume and project content.
- `_layouts/` and `_includes/` define reusable page composition.
- `_sass/` and `css/main.scss` control the visual system.
- `index.html` renders the assembled portfolio experience.

## Tech Stack
- Jekyll
- Ruby + Bundler
- SCSS
- GitHub Pages-style static deployment

## Quick Start
```bash
bundle install
bundle exec jekyll serve
```

## Testing
- `bundle exec jekyll build` for build validation.
- Manual responsive and accessibility checks on generated pages.

## ANZSCO 261312 Competency Evidence
- **Software implementation**: static-site architecture and modular layout composition.
- **Design and maintenance**: clear separation of data, presentation, and style layers.
- **Quality focus**: reproducible build workflow and documented customization paths.

## Commit Convention
Use Conventional Commits for presentation clarity:
- `feat(scope): add new user-facing capability`
- `fix(scope): resolve functional defect`
- `test(scope): add or improve automated tests`
- `docs(readme): improve project documentation`

## Evidence Map
- `_config.yml`
- `_data/`
- `_layouts/`
- `_includes/`
- `_sass/`
- `index.html`
