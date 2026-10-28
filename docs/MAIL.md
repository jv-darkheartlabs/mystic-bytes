# Mail delivery — darkheartlabs.technology

The employment inquiry form uses the existing Cloudflare Worker and Resend integration. Public direct-contact links use `jen.the.dev80@gmail.com`; the form recipient remains configured separately on the worker. Do not assume changing the displayed email changes delivery.

## Required: Resend + dhl-mail-intake (free)

1. Deploy `~/Projects/dhl-mail-intake` (Cloudflare Worker + Resend API key).
2. Set in `_config.yml`:

```yaml
form_provider: resend
form_endpoint: "https://dhl-mail-intake.<account>.workers.dev"
```

3. Share the same URL with Ask `demo/config.js`.
4. After explicit authorization to send a test, submit an employment inquiry from `/contact/` and confirm both the success response and inbox receipt. Local browser validation alone does not verify delivery.

Organization, role and location are optional and are included inside the `message` field because the existing worker renders that field rather than arbitrary metadata. Required name, email and message fields are validated before sending. Honeypot, Turnstile and rate-limit handling remain in place.

Full DNS / From setup: [dhl-mail-intake/docs/MAIL.md](../../dhl-mail-intake/docs/MAIL.md) (sibling repo).

## Do not

- Replace form submission with a mailto URL
- Put `RESEND_API_KEY` in this repo
- Claim end-to-end delivery is verified without checking inbox receipt

---

**Maintained by:** [Dark Heart Labs](https://darkheartlabs.technology)  
**Author:** Jennifer ([@jv-darkheartlabs](https://github.com/jv-darkheartlabs))  
**Site:** https://darkheartlabs.technology
