# Mail delivery — darkheartlabs.technology

`mailto:` is disabled. Domain MX is **iCloud**. Visitor Gmail/iCloud mailto was delayed or junked for days.

## Required: Resend + dhl-mail-intake (free)

1. Deploy `~/Projects/dhl-mail-intake` (Cloudflare Worker + Resend API key).
2. Set in `_config.yml`:

```yaml
form_provider: resend
form_endpoint: "https://dhl-mail-intake.<account>.workers.dev"
```

3. Share the same URL with Ask `demo/config.js`.
4. Submit a test brief from `/contact/`. Expect **Brief sent** and mail the same day.

Full DNS / From setup: [dhl-mail-intake/docs/MAIL.md](../../dhl-mail-intake/docs/MAIL.md) (sibling repo).

## Do not

- Fall back to mailto
- Put `RESEND_API_KEY` in this repo
- Sell Ask or contact as email-delivery until the Worker URL is set and tested

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
