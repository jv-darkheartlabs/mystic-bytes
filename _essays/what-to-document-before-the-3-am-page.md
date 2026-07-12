---
layout: essay
title: What to Document Before the 3 AM Page
dek: "Documentation is irrelevant until it is critical. Write for the operator who has no context and no Slack."
number: 006.23
sort_key: 0006.23
date: 2009-06-05
cover: /assets/images/cover-craft.svg
read_time: 6
tags: [culture]
cross_link: documentation-as-empathy
---

You wrote the docs. Nobody read them. Then something broke, and your runbook had more traffic in an hour than the company blog had all quarter. That lifecycle — irrelevant, irrelevant, critical, irrelevant again — is normal. It is not an argument against writing. It is the case for writing the right things before the page fires.

## Document for recovery, not completeness

At 3 AM, nobody wants your architecture essay. They want:

1. **How to confirm the symptom.** Which dashboard, which log line, which error string means "this runbook applies."
2. **How to stop the bleeding.** Safe restart order, feature flag names, rollback command with the exact environment variable spelled out.
3. **How to verify recovery.** Row counts, health check URLs, a user-visible smoke test that proves customers are unblocked.
4. **Who to wake next.** Escalation path with time zones, not "ask in Slack."

If those four sections exist and are current, you have done the job. Everything else is optional until someone asks for it twice.

## What to capture while context is fresh

**Why you made a decision, not just what.** The next maintainer can read the code. They cannot read the meeting where you rejected the obvious approach because of a vendor limit that still exists.

**Where the bodies are buried.** Metaphorically — legacy tables, cron jobs nobody owns, the script that only runs on Tuesdays. Name them. Link to the ticket that explains the scar.

**The README as hospitality.** A good README says: here is how to run this locally, here is what will hurt you, here is who owns it. A missing README says: figure it out; I did.

Docs decay without owners. Couple documentation updates to the PR that changes behavior, or the doc did not happen.

**Test the tired-operator path.** Run through your runbook once without relying on tribal knowledge. If step three says "restart the service the usual way," you have not written a runbook — you have written a reminder that only works for you.

**Prefer the repo over the wiki.** In-repo docs version with code. Wikis drift. For anything that breaks production, colocation wins.

## Empathy is the frame

See [Documentation as Empathy](/p/documentation-as-empathy/) for the longer argument: docs are a letter to the next person, often yourself six months later. This essay is the operational subset — **write the 3 AM page before the 3 AM page.** Future operators will not have your muscle memory. They will have whatever you left in the repo.

Write it anyway. Then test it once while tired: can you follow your own steps without opening a second tab to guess?

— JV · Dark Heart Labs.
