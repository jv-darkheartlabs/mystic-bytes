---
layout: essay
title: Technical Debt Is a Vocabulary Problem
dek: "If finance cannot price it, engineering cannot pay it down."
number: 336.3
sort_key: 0336.03
date: 2024-12-29
cover: /assets/images/cover-systems.svg
type: micro
brief:
  system: Nightbind deployment pipeline
  issue: manual release script nobody trusts but everyone uses
  constraint: no dedicated refactor sprint; must justify cost in the current quarter
---

Technical debt is real work with real compounding cost — and it stays unfixed until someone translates it into a category finance already understands.[^1]

The Nightbind deploy script was the example I kept failing to sell: forty minutes of human babysitting per release, three failure modes documented only in a senior engineer's head, and a workaround so familiar the team had stopped calling it debt. Engineering knew the cost. Finance heard "we want to refactor." The sprint died in prioritisation because nobody put a number on the babysitting — hours per month, incident risk, the next hire who would inherit the ritual blind.

The mechanism is organisational, not technical. Debt compounds in code either way. It only gets scheduled when it appears on a ledger adjacent to revenue, risk, or headcount. Metaphors about credit cards help engineers talk to each other. They do not help you win a planning meeting.

Price the workaround before you name it debt. Hours, dollars, probability — whatever your org already optimises for. The team that can translate the mess is the team that gets time to fix it.

— JV · Dark Heart Labs.

[^1]: Ward Cunningham, "The WyCash Portfolio Management System" (OOPSLA experience report, 1992) — origin of the technical debt metaphor; debt as a deliberate trade requiring explicit accounting.
