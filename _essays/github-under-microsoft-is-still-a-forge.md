---
layout: essay
title: GitHub Under Microsoft Is Still a Forge
dek: "Microsoft bought the graph. Git, issues, and pull requests are still the product people live in."
number: 338.764
sort_key: 0338.764
date: 2026-08-19
cover: /assets/images/cover-code.svg
type: pillar
tags: [craft]
brief:
  system: mystic-bytes and jv-darkheartlabs repos on github.com
  issue: Copilot and metered Actions sit on top of the forge; leaving would mean moving the social graph, not only the git remote
  constraint: public customer of GitHub after the 2018 acquisition; no Microsoft employment claim
---

## Thesis

Microsoft bought GitHub in 2018. The incentive machine changed. The forge did not vanish. You still clone, open a pull request, and argue in an issue. Copilot, Actions minutes, and credits ride that habit. Ownership is the plot. The plot is not "GitHub died."

## Context

Dark Heart Labs' public work lives at [github.com/jv-darkheartlabs](https://github.com/jv-darkheartlabs). mystic-bytes is a git remote with a CI workflow, a pull-request culture, and a habit of treating `main` as the record. I use GitHub as a customer from Auckland. I have never been a GitHub or Microsoft employee. The documents that matter are the ones they published: the acquisition posts, Copilot billing changes, Actions pricing, and the still-boring core of git hosting.

There is a separate essay about GitHub as the default product-shaped forge: issues, PRs, the social UI of code. This one is about who owns that default and how they get paid without killing the thing they bought.

## Mechanism

**The 2018 purchase was a graph purchase.** Microsoft announced an agreement to acquire GitHub and closed at $7.5 billion in stock. Nadella's public line was developer freedom and an open platform; the strategic lines were enterprise sales, cloud adjacency, and bringing Microsoft tools to GitHub's audience.[^1] Eight years later the clone URL still works. That is not nostalgia. That is the asset. A forge is a network: identities, stars, CI badges, the README someone else already found. You can `git remote add` a Forgejo instance in an afternoon. You cannot move the watchers.

**Copilot is the extraction layer.** Completion, chat, agents, and code review turn public repos, and private ones if you enable that, into a metered assistant. In 2026 GitHub moved Copilot to usage-based billing via GitHub AI Credits and made Copilot code review consume Actions minutes as well as credits.[^2] Seats were a subscription to a habit. Credits are a subscription to tokens. The forge stays cheap enough for public OSS because the graph has to stay crowded for the assistant to be worth selling.

**Actions is CI as a utility bill.** Hosted runners and minute multipliers bundled "git push runs tests" into a meter. That bundle is why small teams stay. It is also why a noisy workflow is a budget event. Copilot review drawing from the same minute pool is a reminder that AI features are compute. I keep mystic-bytes CI boring on purpose. Boring is cheap.

**Microsoft's cloud is the gravity well, not the only remote.** The 2018 promise was that you could still deploy anywhere. That remains true in the git sense. The path of least resistance is Azure-shaped: identity, Codespaces, the enterprise agreement that already includes Copilot. Incentives do not require a hard lock-in. They require a default that feels like continuity. Continuity is how you keep the graph while selling the next SKU.

**The forge functions are still the contract.** Issues, PRs, CODEOWNERS, Actions YAML, Releases: this is why I have not moved mystic-bytes. A Microsoft-owned GitHub that deleted pull requests would not be GitHub. The ownership risk is subtler. Pricing on Copilot and minutes can rise. Search and recommendations can prefer Microsoft properties. Copilot can become the suggested way to write the next file in *your* repo. The second-order effect is cultural: juniors who learn "the site" as "the assistant on the site." The git object store does not care. The team might.

## Tradeoffs

**Stay vs self-host.** Self-hosting buys custody and costs the social graph, backup, and CI you currently do not staff. For a studio of one, github.com is still the rational forge. Rational is not free. It is priced in credits and in the knowledge that the landlord can change the meter.

**Copilot on vs Copilot off.** On buys speed and a bill. Off buys a quieter review culture and slower first drafts. I treat Copilot like any other vendor model: useful, metered, not a merge approver. The ownership twist is that the assistant lives *inside* the forge. The conflict of interest is structural. Microsoft sells the place you review code and the bot that writes some of it.

**Enterprise gravity vs OSS commons.** GitHub-the-commons needs public repos to stay cheap and indexed. GitHub-the-enterprise needs SKUs. Those goals rhyme until a pricing change makes CI or Copilot the reason a small project leaves. Watch the meter, not the keynote.

**When the owned forge is the right buy.** If your collaborators already have accounts, your Actions are quiet, and you can disable Copilot without drama, staying is craft, not loyalty. Mirror the important remotes. Keep the clone honest.

## Close

I will keep pushing to GitHub because that is where the work is seen. Microsoft owns the forge. The forge is still a forge. The new products are how ownership earns. Clone as if you might have to leave. Review as if the assistant works for the landlord. Neither stance requires a boycott. Both require a receipt.

— JV · Dark Heart Labs.

## References

[^1]: Microsoft, "Microsoft + GitHub = Empowering Developers" (4 June 2018) and "Microsoft acquires GitHub" (Stories). $7.5 billion, open-platform pledge, enterprise and cloud adjacency.

[^2]: GitHub Blog, "GitHub Copilot is moving to usage-based billing"; GitHub Changelog, "Updates to GitHub Copilot billing and plans" (1 June 2026). Token meter; code review consuming Actions minutes.

[^3]: GitHub Docs, Actions billing for hosted runners. The CI meter that bundled git push into an invoice.
