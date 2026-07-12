---
layout: essay
title: "Decisions Are Cheap, Reverts Are Expensive"
dek: "Make the call. Plan the rollback."
number: 658.403
sort_key: 0658.403
date: 2025-02-09
cover: /assets/images/cover-craft.svg
type: micro
brief:
  system: Nightbind production migration
  issue: rollback script ready; stakeholder comms plan was not
  constraint: database revert in minutes; credibility ledger measured in quarters
---

A decision is cheap; the revert is expensive — especially the social one.

Technical rollbacks are taught. Git has flags. Feature flags exist. What teams rarely budget is the trust spent when a lead walks back a call in public: momentum stalls, dissent gets louder, and the next risky choice faces a higher approval tax.

I have shipped migrations at Nightbind where the rollback script was polished and the comms plan was not. The database came back in minutes. The credibility ledger took a quarter. Good leaders optimize for correctability, not bravado — they decide fast, document why, and build the off-ramp before anyone needs it.

They confuse velocity with decisiveness when undoing a choice requires a hero and an apology tour. That is not agility. That is speed without a safety model.

Decide. Document. Ship the escape hatch alongside the happy path. The off-ramp is the feature.

— JV · Dark Heart Labs.
