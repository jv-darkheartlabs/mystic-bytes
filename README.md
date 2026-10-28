# Dark Heart Labs — darkheartlabs.technology

Career-focused Jekyll site for experience, one résumé, selected work, outdoor interests and personal media at [darkheartlabs.technology](https://darkheartlabs.technology).

**Tech spec:** [docs/TECH_SPEC.md](docs/TECH_SPEC.md)

## Stack

- Jekyll 4 + GitHub Pages
- SCSS (`_sass/`, `css/main.scss`)
- MTG catalog card search via Scryfall (no general site search)
- Structured content in `_data/`, essays in `_essays/`, podcast in `_podcast/`

## Quick start

```bash
bundle install
bundle exec jekyll serve
```

Build only:

```bash
bundle exec jekyll build
```

## Content source of truth

Essays and site data are authored in-repo (`_essays/`, `_data/`). The optional `scripts/export-content.mjs` syncs from a Lovable prototype when bulk-updating — see that script's header comment.

## Security headers

GitHub Pages does **not** support custom HTTP response headers (no `_headers`, no CDN edge config on the free tier). This site uses a minimal Content-Security-Policy meta tag in `_includes/head.html` where compatible with Scryfall, Google Fonts, and Spotify embeds. For full header control (HSTS, CSP at the edge), put Cloudflare or another reverse proxy in front of the domain.

## Deploy

Pushes to `main` run `.github/workflows/jekyll.yml`: Jekyll build → html-proofer internal link check → GitHub Pages deploy.

## License

See [LICENSE](LICENSE).

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
