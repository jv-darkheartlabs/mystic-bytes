---
layout: essay
title: Passkeys Replace the Shared Secret
dek: "The server keeps a public key. The password was a secret you both had to hold."
number: 004.87
sort_key: 0004.87
date: 2026-07-29
cover: /assets/images/cover-code.svg
type: micro
read_time: 2
tags: [craft]
brief:
  system: GitHub and Apple ID login as a passkey user
  issue: passwords treated as identity when the replacement is a device-bound key
  constraint: WebAuthn as a user, not an authenticator vendor
---

A password is a shared secret. You send it, or a hash of it, to a server that must store something stealable in bulk. Passkeys replace that bargain. WebAuthn and FIDO make a key pair. The private key stays on a device or in a password manager. The server stores a public key. Phishing a site for a passkey does not work the same way as phishing for a reused string.

I use passkeys where GitHub and Apple ID offer them, as a user, not as someone who ships an authenticator. The UX is still uneven: recoverability, a lost laptop, the moment a site falls back to email OTP because the dialog scared someone. That mess is real. The model is still better than a shared string in a breach dump. mystic-bytes does not run a login. The accounts around the studio do. Those are the ones that get phished.

Passwords will linger because forms are easy and because recovery is a product. Treat passkeys as the default where the identity provider supports them. Keep a recovery path that is not the same shared secret you just escaped. A passkey that cannot survive a device loss will be disabled by the person you asked to be safer.

The shared secret was always a bad primitive for humans. Passkeys are the less-bad primitive that browsers finally agreed to ship.

— JV · Dark Heart Labs.

[^1]: W3C Web Authentication (WebAuthn) and FIDO Alliance passkey documentation. Public-key credentials in place of a server-held password.
