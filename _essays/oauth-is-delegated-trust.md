---
layout: essay
title: OAuth Is Delegated Trust
dek: "You are not logging in. You are handing a scoped key to a stranger for a while."
number: 004.85
sort_key: 0004.85
date: 2026-08-11
cover: /assets/images/cover-code.svg
type: pillar
read_time: 8
tags: [craft]
brief:
  system: GitHub OAuth and OIDC sign-in used as a customer of public identity providers from Auckland
  issue: "Sign in with Google" taught as login when the protocol is delegated authorization
  constraint: RFC 6749 and OIDC as the texts; no identity-vendor employment; not a copy-paste tutorial
---

## Thesis

**OAuth is delegated trust.** RFC 6749 describes how a resource owner lets a client access a protected resource without giving that client a password.[^1] OpenID Connect hangs an identity token on the same machinery. The consent screen is the whole plot. If you teach this as "login with Google," you will design the wrong failure.

## Context

I click through GitHub OAuth when a tool wants to list my repos. I have used a Google or Microsoft button on sites I did not write, from a desk in Auckland, because the alternative was another password I would reuse. I do not work for those identity providers. I do not owe you a framework snippet. I owe you the shape of the trust you just moved.

mystic-bytes itself does not run an OAuth server. Dark Heart Labs still lives in a world where GitHub is the forge and GitHub is an authorization server. The protocol shows up anyway. Treating it as a green button is how scopes sprawl and a leaked token becomes a leaked account.

## Mechanism

**The four roles are the architecture.** RFC 6749 names a resource owner (you), a client (the app), an authorization server (GitHub, Google, your IdP), and a resource server (the API). The client never gets your password if the flow is honest. It gets a token. The token is a capability: a string that says this client may do these things until this time. Passwords are identity. Tokens are permission. Mixing them is how people store a bearer token like a session cookie and then wonder why a XSS hole was a repo hole.

**Grants are how trust moves.** Authorization code is the browser path: the user sees the authorization server, the client swaps a short code for tokens on a back channel. Implicit was a shortcut the working group later regretted. Client credentials is machine-to-machine. Refresh tokens extend the delegation without another consent click. Each grant answers "who saw a secret, and for how long." I need to know which grant I am in when something leaks.

**Scope is the policy language.** `repo`, `email`, `openid`, `offline_access`: strings the authorization server interprets as a subset of power. The consent screen is supposed to be the human-readable version. It is often a wall of text. I have approved a GitHub app and then gone back to the settings page to see that I handed over more than the README advertised. That is not a user-education problem only. That is a client that asked wide and an owner who was tired. Delegated trust fails at the ask. Ask narrow. Review the grant like a PR.

**OIDC is identity on top of authorization.** OpenID Connect sends an ID token — a JWT that says who you are — alongside the access token that says what the client may do.[^2] "Sign in with…" is usually OIDC. The access token may still read a calendar you forgot was in scope. Authentication and authorization share a redirect. They are not the same promise. If you only needed a stable user id, you did not need `repo`. If you needed `repo`, you hired the client as a limited you.

**Bearer tokens are stolen trust.** RFC 6750 is blunt: whoever holds the token is the client.[^3] HTTPS on the hop, short lifetime, bind it if you can, do not log it, do not stuff it in a query string. I treat a leaked GitHub token as a password reset plus a scope autopsy. The protocol delegated. The attacker inherited the delegation. There is no extra "but I didn't type my password" mercy in the RFC.

## Tradeoffs

**Convenience vs blast radius.** One button is kinder than a new password. One button attached to a fat scope is a wider incident. Prefer a password manager and a first-party account if the client only needed you to come back tomorrow. Prefer OAuth when the client truly must call someone else's API as you.

**OIDC vs a homemade session.** Rolling your own "paste a Google token into our cookie" without validating the ID token is not clever. It is a confused-deputy kit. Use a library that implements the checks, or do not federate.

**When a password is the smaller trust.** A newsletter login that never calls Gmail should not be an OAuth client. Delegation is for calling APIs. Login is for recognizing a returning person. If you only need the second, do not borrow the first.

## Close

Read the consent screen as a contract. Name the grant, the scopes, and where the token will sit. Call OAuth delegated trust and OIDC a name tag on that trust. I will keep clicking GitHub's button when a tool actually needs the forge. I will stop calling that click a login. A login is a door. This is a key you cut for a stranger, on purpose, for a while.

— JV · Dark Heart Labs.

## References

[^1]: D. Hardt, ed., RFC 6749, *The OAuth 2.0 Authorization Framework* (IETF, October 2012). Roles, grants, and the delegation this essay is about.

[^2]: N. Sakimura et al., *OpenID Connect Core 1.0*. Identity token on top of OAuth, which is what most "Sign in with" buttons actually run.

[^3]: M. Jones and D. Hardt, RFC 6750, *The OAuth 2.0 Authorization Framework: Bearer Token Usage* (IETF, October 2012). Possession of the token is the trust.
