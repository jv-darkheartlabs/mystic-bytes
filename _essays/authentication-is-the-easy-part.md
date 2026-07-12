---
layout: essay
title: Authentication Is the Easy Part
dek: "Authorization is where products are won and lost."
number: 005.83
sort_key: 0005.83
date: 2025-07-13
cover: /assets/images/cover-code.svg
type: micro
brief:
  system: Nightbind player account service
  issue: OAuth login works; GMs cannot scope session tools to single campaign
  constraint: no API churn; extend authorization matrix inside existing module
---

Authentication — proving who someone is — is mostly a solved problem. Authorization — deciding what they can do — is where products quietly leak.

Nightbind had working OAuth in a week. The month after was a permission matrix: which player sees which campaign log, which GM can revoke a session token without banning the account, which moderator action spans worlds versus rooms. None of that lives in the identity provider. It lives in your data model and your nerve.[^1] Teams ship login, defer the matrix, and call security done because the library badge is green. Then a GM tool exposes another campaign's notes because the role string was reused across tenants.

Draw the authorization model before you draw the login screen. Roles, resources, contexts — on one page, embarrassing or not. That diagram is the product. Authentication is the door; authorization is the floor plan.

If you cannot explain who can do what to which row, you are not ready to ship.

— JV · Dark Heart Labs.

[^1]: NIST SP 800-162, *Guide to Attribute Based Access Control (ABAC)* — the distinction between authentication and fine-grained authorization as separate engineering surfaces.
