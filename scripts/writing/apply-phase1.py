#!/usr/bin/env python3
"""Apply Phase 1 rewrites: the-craft + dev-essays → archive + _essays."""

from __future__ import annotations

import json
import textwrap
from pathlib import Path

BLOG = Path(
    "/Users/jenthedev/Documents/Documents - Jennifer\u2019s MacBook Pro/Active/dark-heart-labs/blog"
)
ESSAYS = Path("/Users/jenthedev/Projects/mystic-bytes/_essays")
MANIFEST = Path("/Users/jenthedev/Projects/mystic-bytes/_data/writing_manifest.json")
SKIP = {
    "the-craft/Debugging by Moonlight.md",
    "deployment-operations/dev-essays/Migrations at Midnight.md",
}


def write_post(
    source: str,
    site_slug: str,
    title: str,
    dek: str,
    date: str,
    tags: list[str],
    read_time: int,
    topic: str,
    body: str,
    number: str,
    cover: str = "/assets/images/cover-craft.svg",
    **extra,
) -> None:
    doc_fm = [
        "---",
        f'title: "{title}"',
        f"dek: {dek}",
        f"date: {date}",
        f"tags: {tags}",
        f"read_time: {read_time}",
        f"topic: {topic}",
        "status: published",
        f"site_slug: {site_slug}",
    ]
    for k, v in extra.items():
        if v is True:
            doc_fm.append(f"{k}: true")
        elif v:
            doc_fm.append(f"{k}: {v}")
    doc_fm.append("---\n")
    (BLOG / source).write_text("\n".join(doc_fm) + body + "\n\n— JV · Dark Heart Labs.\n", encoding="utf-8")

    sort_key = number.replace(".", "").zfill(6)
    if len(sort_key) > 6:
        sort_key = sort_key[:4] + sort_key[4:6].zfill(2)
    site_fm = [
        "---",
        "layout: essay",
        f"title: {title}",
        f"dek: {dek}",
        f"number: {number}",
        f"sort_key: {sort_key}",
        f"date: {date}",
        f"cover: {cover}",
        f"read_time: {read_time}",
        f"tags: {tags}",
    ]
    for k, v in extra.items():
        if v is True:
            site_fm.append(f"{k}: true")
        elif v:
            site_fm.append(f"{k}: {v}")
    site_fm.append("---\n")
    (ESSAYS / f"{site_slug}.md").write_text("\n".join(site_fm) + body + "\n\n— JV · Dark Heart Labs.\n", encoding="utf-8")


# (source, site_slug, title, dek, body) — dates/tags from manifest at runtime
CONTENT: list[tuple] = [
    (
        "the-craft/Bioluminescence in the Build Process.md",
        "what-ci-build-logs-tell-you-before-users-do",
        "What CI Build Logs Tell You Before Users Do",
        "The build pipeline is early warning infrastructure — if you read it.",
        """\
CI is not a gate you click through. It is telemetry about whether your changes still fit the system you think you are building.

When a build fails in main, the user impact is still zero — that is the cheapest place to learn. Treat red builds as messages, not interruptions. Read the first error, not the last cascade. Fix the root compiler or test failure before chasing warnings that accumulated for months.

Good pipelines fail fast on the checks that catch category errors: type errors, lint on changed files, unit tests for touched modules. Slow checks — integration, visual, end-to-end — belong on a schedule that does not block every push, but must block release.

Log retention matters. A build log from last Tuesday is evidence when production breaks on Friday. Tag artifacts with commit SHA. Link CI runs to deploys so you can answer: *what exactly shipped?*

The glow in the log is not decoration. It is the system telling you where the next incident would have started — if you had ignored the build.""",
    ),
    (
        "the-craft/Code as Incantation.md",
        "why-readable-code-is-a-communication-contract",
        "Why Readable Code Is a Communication Contract",
        "Code is written once and read many times — optimize for the reader.",
        """\
You are not typing for the compiler alone. The compiler forgives opacity; the next engineer does not.

Readable code states intent in names, boundaries, and file layout. A function named `process` is a shrug. A function named `validatePaymentAndEnqueueReceipt` is a contract. Comments explain *why* when the why is not obvious from types and names — never restate the what.

Keep units small enough to hold in working memory. Extract when a block needs a name to be understood. Prefer explicit data structures over clever nesting. The reader should not need your mental stack to navigate the file.

Review with the question: *could someone fix a bug here without asking me?* If not, the code is not finished — it is merely passing tests.

Communication is not softness. It is maintenance cost control.""",
    ),
    (
        "the-craft/Debugging as Meditation.md",
        "how-to-debug-without-making-the-problem-worse",
        "How to Debug Without Making the Problem Worse",
        "Panic adds mutations. Debugging needs stillness and sequence.",
        """\
The first impulse in a bug hunt is to change things — restart services, clear caches, redeploy last green. Sometimes that works. Often it destroys the evidence you need.

Start by reproducing. If you cannot reproduce, narrow the surface: user, request id, time window, feature flag. Write down what you know before you touch the system.

Change one variable at a time. Hypothesis, test, note result. Breath is not metaphor — literal pause reduces duplicate edits that compound confusion.

When stuck, explain the bug to someone or to an empty document. Forcing narrative exposes gaps in your model.

Debugging is not meditation because it is calm. It is meditation because attention is the tool, and attention requires you to stop thrashing.""",
    ),
    (
        "the-craft/Morally Grey Architecture.md",
        "when-pragmatic-shortcuts-are-worth-the-tradeoff",
        "When Pragmatic Shortcuts Are Worth the Tradeoff",
        "Not every compromise is debt — some are informed bets.",
        """\
Engineering ethics is not purity. It is naming tradeoffs before they name you.

A shortcut is worth taking when: the failure mode is bounded, the rollback path exists, the team documents the assumption, and the shortcut expires when a trigger condition is met — traffic threshold, date, or feature completion.

A shortcut is not worth taking when: it touches auth, money, or user data without review; it hides errors; it couples teams without an interface contract.

Grey architecture is honest architecture. Write the ADR. State what you sacrificed and what would make you revisit the decision.

Morally grey is not morally absent. It is accountable.""",
    ),
    (
        "the-craft/The Algorithm Remembers.md",
        "why-systems-preserve-every-shortcut-you-take",
        "Why Systems Preserve Every Shortcut You Take",
        "Defaults and caches outlive the sprint that set them.",
        """\
Systems have memory: feature flags left on, cron jobs nobody owns, retry policies tuned for a demo, indexes added for one report.

The algorithm — routing, ranking, caching, scheduling — encodes past constraints. When those constraints change, the behavior persists until someone audits inputs and weights.

Schedule periodic reviews of: defaults in config, automated jobs, ML or heuristic weights, permission templates. Ask *what problem was this solving when it was added?*

Deletion is architecture. Removing a stale rule is as important as adding a new one.

What you ship becomes policy whether you intended it or not.""",
    ),
    (
        "the-craft/The All-Consuming Refactor.md",
        "how-to-refactor-without-stopping-the-world",
        "How to Refactor Without Stopping the World",
        "Big refactors need strangler patterns, not big-bang rewrites.",
        """\
The refactor that eats a quarter rarely finishes in a quarter. It expands because every opened layer reveals another assumption.

Prefer strangler fig patterns: route new work through the new path, migrate callers incrementally, delete old code when traffic hits zero. Keep main deployable weekly — daily if you can.

Define done as measurable: *80% of checkout flows use PaymentServiceV2*, not *rewrite payments*.

Time-box spikes. If exploration exceeds the box, write findings and choose: continue with funding, or accept current state with documented pain.

Refactoring is not a personality trait. It is a project with scope and a stop condition.""",
    ),
    (
        "the-craft/The Cathedral and the Commit.md",
        "why-long-lived-codebases-need-patient-architecture",
        "Why Long-Lived Codebases Need Patient Architecture",
        "Cathedrals are built stone by stone — so are repos that last a decade.",
        """\
Short-term code optimizes for demo. Long-lived code optimizes for change cost.

Patient architecture invests in boundaries: modules with clear contracts, tests at seams, documentation for failure recovery. It accepts slower feature one if feature ten is cheaper.

Every commit adds stone. Ask whether this stone belongs in the wall or is rubble that future masons must remove.

Teams leave; commits stay. Build for the engineer who arrives in three years with no oral history.

The cathedral is not grandeur. It is durability.""",
    ),
    (
        "the-craft/The Compiler as Oracle.md",
        "how-to-learn-from-compiler-errors-instead-of-fearing-them",
        "How to Learn From Compiler Errors Instead of Fearing Them",
        "Type and compile errors are cheap feedback — use them.",
        """\
The compiler is not judging you. It is reporting a mismatch between model and syntax.

Read errors bottom-up when cascades stack. Fix the first root cause; many following errors vanish. Treat warnings as tickets — silence only what you understand.

Stronger type systems front-load mistakes. Lean into them when a module touches money, auth, or irreversible state.

Developers who fear the compiler write defensively opaque code. Developers who feed it clear structures ship faster with fewer production surprises.

The red underline is sonar, not punishment.""",
    ),
    (
        "the-craft/The Enchantment of Small Tools.md",
        "why-single-purpose-scripts-beat-all-in-one-platforms",
        "Why Single-Purpose Scripts Beat All-in-One Platforms",
        "Do one thing. Compose. Repeat.",
        """\
Platforms promise everything; scripts deliver one fix today.

The Unix philosophy persists because composition scales: small tools with clear stdin/stdout, piped together, versioned in repo, owned by the team.

Your personal toolkit — aliases, one-off CLIs, pre-commit helpers — saves minutes daily. Minutes compound to weeks annually. Document scripts in README snippets so they survive laptop swaps.

Before buying another platform seat, ask: *could a 40-line script solve 80% of this?*

Small tools are how senior engineers keep leverage without waiting on procurement.""",
    ),
    (
        "the-craft/The Forgiveness of Version Control.md",
        "how-git-gives-you-permission-to-experiment",
        "How Git Gives You Permission to Experiment",
        "Branches and reverts make bold tries cheap.",
        """\
Version control's gift is reversible narrative. You can attempt the refactor, the spike, the risky API — and return to known good.

Commit often. Small commits are small save points. Write messages for future readers at 2 AM — see the essay on commit messages.

Revert without shame when evidence says ship was wrong. The log records the attempt; nobody needs heroics.

Forgiveness is not chaos. It is safety that enables speed.""",
    ),
    (
        "the-craft/The Fortress of Digital Security.md",
        "security-basics-every-developer-should-default-to",
        "Security Basics Every Developer Should Default To",
        "Most breaches are boring failures of defaults — not genius attackers.",
        """\
Security is not a specialist-only concern. It is hygiene at boundaries.

Defaults worth enforcing: least-privilege credentials, secrets in vaults not repos, dependency scanning in CI, parameterized queries, CSRF and auth on state-changing routes, rate limits on auth endpoints, audit logs on admin actions.

Threat model the feature, not the whole company — *what happens if this input is malicious, duplicated, or replayed?*

Fix the boring items before buying exotic tools. Rotated keys, patched dependencies, and MFA stop more incidents than buzzword appliances.

A fortress is layers, not one wall.""",
    ),
    (
        "the-craft/The Garden of Forking Paths.md",
        "how-to-use-git-branches-as-low-risk-experiments",
        "How to Use Git Branches as Low-Risk Experiments",
        "Every branch is a hypothesis you can discard without cost.",
        """\
Branch freely for ideas that might fail. Merge when evidence supports; delete when it does not.

Merge conflicts are decisions, not accidents — choose which reality to keep deliberately.

Keep branches short-lived. Long branches become second products with hidden integration tax.

Abandoned branches are compost, not failure. They informed the path you shipped.

Experimentation requires cheap rollback. Git provides it — use it.""",
    ),
    (
        "the-craft/The Haunting of Legacy Code.md",
        "how-to-work-with-legacy-code-without-contempt",
        "How to Work With Legacy Code Without Contempt",
        "Legacy is evidence of survival — read it before you rewrite it.",
        """\
Legacy code kept the business alive. Approach it with archaeology, not contempt.

Before refactor, characterize behavior: tests, logs, user flows. Understand why the strange branch exists — often a production fire you never saw.

Not every ghost needs exorcism. Stable, low-churn modules can rest.

When you change legacy, leave breadcrumbs: comments, ADRs, migration notes.

Someday your code will haunt someone else. Write the kind of legacy you wish you inherited.""",
    ),
    (
        "the-craft/The Inheritance of Open Source.md",
        "how-to-be-a-good-custodian-of-open-source-dependencies",
        "How to Be a Good Custodian of Open Source Dependencies",
        "Every install is trust in strangers' maintenance labor.",
        """\
Open source runs on gift economics. Your install is an implicit promise to participate responsibly.

Good citizenship: pin versions, fund or contribute fixes upstream, report reproducible bugs, improve docs when you learn something painful.

When you publish OSS: clear license, README with setup and scope, issue templates, security contact.

You inherit thousands of packages. Be the maintainer you wish your dependencies had — even if your contribution is a one-line doc fix.

Inheritance is a chain. Act like a good ancestor.""",
    ),
    (
        "the-craft/The Possessive Codebase.md",
        "when-deep-familiarity-with-a-codebase-becomes-an-asset",
        "When Deep Familiarity With a Codebase Becomes an Asset",
        "Institutional knowledge is leverage — if you document it outward.",
        """\
Knowing where bodies are buried can look like possession. It should look like mentorship.

Deep familiarity lets you estimate honestly, spot regression risks, and navigate incidents fast. The failure mode is bus factor one — when only you can deploy, only you can fix, only you know why the cron exists.

Convert private knowledge to public artifacts: runbooks, recorded walkthroughs, pairing sessions, comments at non-obvious seams.

The goal is not to need you forever. The goal is to make the system's story readable while you are still here to tell it.

Familiarity is an asset when it scales the team. It is a liability when it hoards power.""",
    ),
    (
        "the-craft/The Quiet Power of Refactoring.md",
        "when-refactoring-pays-off-and-when-it-does-not",
        "When Refactoring Pays Off and When It Does Not",
        "Invisible improvements still compound — if timed correctly.",
        """\
Refactoring rarely closes tickets. It changes the cost of the next ten tickets.

Refactor when adding feature work is unnecessarily hard, when the same module breaks repeatedly, when onboarding questions cluster on one file.

Do not refactor to avoid harder product work, right before release, or in stable modules nobody touches.

Good refactoring is invisible to users — faster loads, fewer bugs, clearer paths for teammates.

Quiet work is not unimportant. It is the interest payment on future velocity.""",
    ),
    (
        "the-craft/The Sacred Commit Message.md",
        "how-to-write-commit-messages-future-you-will-thank-you-for",
        "How to Write Commit Messages Future You Will Thank You For",
        "The diff shows what changed. The message explains why.",
        """\
Commit messages are async communication with future teammates — including you.

Use conventional prefixes: feat, fix, refactor, chore, docs. They enable changelog automation and quick scanning.

Body text answers: *what problem?* *why this approach?* *what to watch in prod?*

Avoid "fixed stuff" and "wip" on main. If work is incomplete, stay on a branch.

Breadcrumbs beat archaeology. One minute writing saves an hour guessing.""",
    ),
    (
        "the-craft/Things That Break at Scale.md",
        "what-to-load-test-before-you-need-to",
        "What to Load-Test Before You Need To",
        "Ten users hide sins that ten thousand expose.",
        """\
Scale breaks assumptions: O(n²) loops, missing indexes, unbounded queues, synchronous chains, hot keys in cache.

Load-test the paths that matter economically — checkout, auth, search — not only the homepage.

Watch p95 and error rate, not average latency. Averages lie when tails kill users.

Scaling problems are often validation: people want the product. Your job is to make wanting it survivable.

Design for the storm while seas are calm — caches, backpressure, idempotency, graceful degradation.""",
    ),
    (
        "the-craft/Tides of the Terminal.md",
        "how-to-build-fluency-with-the-command-line",
        "How to Build Fluency With the Command Line",
        "The terminal is honest interface — no chrome, direct feedback.",
        """\
GUI tools hide steps; the shell shows them. Fluency starts with navigation: pwd, ls, cd, history, tab completion.

Learn piping — stdout to the next tool — early. grep, jq, sort, head, tail cover most inspection tasks.

Write aliases for repeated sequences; promote stable aliases to scripts in repo.

The blinking cursor is invitation, not judgment. Type; read errors; adjust.

Terminal skill pays compound interest across every stack you will touch.""",
    ),
    (
        "the-craft/Witchcraft and Webpack.md",
        "how-to-tame-frontend-build-tools-without-being-the-expert",
        "How to Tame Frontend Build Tools Without Being the Expert",
        "You do not need to master webpack — you need a config that builds and an owner when it breaks.",
        """\
Frontend bundlers are powerful and opaque. Teams survive by: pinning versions, documenting the one config that works, and assigning an owner for upgrades.

Do not upgrade toolchain and framework simultaneously. Change one axis, verify, proceed.

Copy proven configs from similar projects; adapt incrementally. Comment why each plugin exists.

When build times triple, treat it as incident — profile, bisect plugin changes, restore baseline.

Build tooling is infrastructure. Respect it without romanticizing it.""",
    ),
    (
        "deployment-operations/dev-essays/Automating the Inevitable.md",
        "what-to-automate-first-in-a-small-team",
        "What to Automate First in a Small Team",
        "Automate repetition before you automate judgment.",
        """\
Automate what is boring, frequent, and error-prone: deploy scripts, test runs, lint, dependency updates with CI gates, backup verification, certificate expiry checks.

Do not automate ambiguous product decisions or one-off migrations without human review.

The ROI test: *hours saved per month vs hours to build and maintain automation.*

Start with toil that wakes people at night — restore scripts, smoke tests post-deploy, rollback buttons.

Automation should fail loudly and visibly, not silently replace thinking.""",
    ),
    (
        "deployment-operations/dev-essays/Bioluminescent Debugging.md",
        "how-to-debug-with-better-observability-signals",
        "How to Debug With Better Observability Signals",
        "Logs, metrics, and traces are instruments — tune them before the storm.",
        """\
Debugging production without observability is navigation without instruments.

Logs: structured, correlated with request id, level-appropriate. Metrics: RED/USE on critical paths. Traces: sample enough to catch tail latency.

During incidents, pick one signal class to trust first — usually logs for correctness, metrics for scope, traces for latency.

Invest in dashboards before launch, not after the first page.

Glow in the charts means you can see the current under the calm surface.""",
    ),
    (
        "deployment-operations/dev-essays/Deploy Friday- A Risk Assessment.md",
        "when-friday-deploys-are-acceptable-and-when-they-are-not",
        "When Friday Deploys Are Acceptable and When They Are Not",
        "Calendar risk is human availability risk.",
        """\
Friday deploys are fine when: change is small, rollback is tested, on-call is staffed, monitoring is solid, and stakeholders accept weekend response if needed.

Friday deploys are bad when: database migration is irreversible, feature flag cleanup is manual, or the team routinely disappears offline.

Replace folklore with checklist. If two items fail, wait until Monday.

Risk is not day of week alone — it is blast radius times recovery time times coverage.""",
    ),
    (
        "deployment-operations/dev-essays/Forced Proximity- The Monorepo.md",
        "monorepo-tradeoffs-for-small-teams",
        "Monorepo Tradeoffs for Small Teams",
        "Shared code is easier to find; shared build pain is easier to spread.",
        """\
Monorepos reduce cross-repo versioning friction and enable atomic changes across services.

Costs: CI complexity, slow builds without caching, ownership blur, tool investment.

Small teams benefit when products share types and release together. Pain rises when unrelated products share one pipeline without boundaries.

Use path filters, affected-target builds, and CODEOWNERS. Split before politics exceeds tooling benefits.

Proximity forces conversation — design boundaries so forced proximity does not force coupling.""",
    ),
    (
        "deployment-operations/dev-essays/Observability in the Deep.md",
        "why-observability-is-not-the-same-as-monitoring",
        "Why Observability Is Not the Same as Monitoring",
        "Monitoring tells you when known problems fire. Observability lets you ask new questions.",
        """\
Dashboards of golden signals catch regressions you anticipated. They fail on novel failures — the bug you never instrumented.

Observability requires high-cardinality logs, exemplars, trace context, and ad-hoc query ability.

Build for questions: *show checkout latency for EU users on mobile when flag X is on.*

Monitoring is insurance on known risks. Observability is exploration budget for unknown ones.

Ship both; confuse neither.""",
    ),
    (
        "deployment-operations/dev-essays/Signals from the Deep- On Logging.md",
        "what-belongs-in-logs-and-what-does-not",
        "What Belongs in Logs and What Does Not",
        "Logs are letters to future-you — write them to be searched, not admired.",
        """\
Log events, not paragraphs. Include correlation ids, duration, outcome, and safe context — never secrets.

Log at boundaries: request in/out, external API calls, queue publish/consume, auth decisions.

Avoid debug noise in production default levels. Sample verbose traces when volume explodes.

When paging, logs should answer: *what failed, for whom, since when, with what error class.*

Letters unread are useless. Structure is respect for the reader at 3 AM.""",
    ),
    (
        "deployment-operations/dev-essays/The Abyssal Zone of Production.md",
        "what-production-teaches-you-that-staging-cannot",
        "What Production Teaches You That Staging Cannot",
        "Real traffic is messy in ways rehearsal never fully copies.",
        """\
Staging lacks: true user behavior, full data scale, adversarial inputs, network weirdness, vendor outages, clock skew across regions.

Treat staging as rehearsal for mechanics, not behavior. Production teaches distributions — tail latency, bot traffic, cache cold starts.

Practice game days on production-like load in isolated environments. Canary deploys in prod with tight blast radius.

The abyssal zone is not drama. It is where assumptions drown — plan recovery, not perfection.""",
    ),
    (
        "deployment-operations/dev-essays/The Ceremony of the Clean Install.md",
        "why-clean-install-docs-save-deployments",
        "Why Clean Install Docs Save Deployments",
        "If only one laptop can deploy, you do not have a process — you have a ritual.",
        """\
Document setup from empty machine: runtime versions, env vars, seed data, smoke test command.

Run clean install quarterly on a fresh VM or container. Drift hides in undocumented steps.

Onboarding is a deploy rehearsal. If new engineers cannot ship in week one, your install path is broken.

Ceremony becomes reliability when every step is written and repeatable.""",
    ),
    (
        "deployment-operations/dev-essays/The Dark Forest of Dependencies.md",
        "how-to-navigate-dependency-risk",
        "How to Navigate Dependency Risk",
        "Your supply chain is a forest — map it before you get lost.",
        """\
Inventory direct and transitive dependencies. Pin versions in lockfiles. Scan for CVEs in CI; triage by exploitability in your usage.

Prefer fewer, maintained libraries over many micro-deps. Evaluate bus factor and release cadence before adopting.

Vendor SDKs and SaaS APIs are dependencies too — plan for deprecation and rate limits.

Dark forest navigation is boring: lists, pins, updates, and owners.""",
    ),
    (
        "deployment-operations/dev-essays/The Haunted Deploy.md",
        "how-to-postmortem-a-bad-deploy-without-blame",
        "How to Postmortem a Bad Deploy Without Blame",
        "Incidents are curriculum — if you write the lesson down.",
        """\
Blameless postmortems ask: timeline, contributing factors, detection gap, mitigation gap, follow-up actions with owners.

Separate *what happened* from *why the system allowed it.* People respond to incentives and constraints; fix systems.

Publish internally within 72 hours while memory is fresh. Track action items like product work.

Haunted deploys stop haunting when the story is captured and the guardrail is shipped.""",
    ),
    (
        "deployment-operations/dev-essays/The Last Line of Defense.md",
        "where-to-put-guardrails-before-production",
        "Where to Put Guardrails Before Production",
        "The last line of defense should be depth, not hope.",
        """\
Layer defenses: input validation, authz checks, rate limits, circuit breakers, feature flags, canaries, automated rollback.

No single gate catches everything. Defense in depth accepts that some bugs ship — and limits damage.

Test rollback before you test launch. If revert is scary, launch is scary.

The last line is not one hero on call. It is architecture that fails small.""",
    ),
    (
        "deployment-operations/dev-essays/The Patience of the Long Deploy.md",
        "how-to-run-deployments-that-take-hours",
        "How to Run Deployments That Take Hours",
        "Long deploys need checkpoints, not anxiety spirals.",
        """\
Break into phases with verifiable checkpoints: migrate expand, backfill percent, flip read path, drain old queue.

Communicate ETA ranges. Automate progress metrics — rows migrated, lag, error budget.

Assign a commander for the window; others watch dashboards, not Slack threads.

Patience is procedure. Hurry without checkpoints causes the incidents patience was meant to avoid.""",
    ),
    (
        "deployment-operations/dev-essays/The Void Between Deploys.md",
        "how-to-manage-anxiety-between-ship-and-confirmation",
        "How to Manage Anxiety Between Ship and Confirmation",
        "The gap between deploy click and green metrics is a design problem.",
        """\
Reduce the void with: progressive rollout, synthetic checks immediately post-deploy, clear health criteria, automated rollback triggers.

Anxiety often means monitoring is insufficient — you cannot see the system confirm success.

Breathing helps humans; automation helps systems. Invest in the second.

The void shrinks when confirmation is instrumented, not when you stare harder at the dashboard.""",
    ),
    (
        "deployment-operations/dev-essays/You Are Not Your Stack Trace.md",
        "how-to-separate-identity-from-production-errors",
        "How to Separate Identity From Production Errors",
        "A failing deploy is not a verdict on your worth.",
        """\
Production errors are state mismatches, not character judgments. Separate *I broke prod* from *the system exposed a gap.*

Healthy teams discuss failures as data. Unhealthy teams attach shame and hide near-misses.

After incidents: rest, review, improve guards. Do not perform penance through unsustainable hours.

You are the engineer who responds — not the stack trace.""",
    ),
    (
        "deployment-operations/dev-essays/Your API Is a Promise.md",
        "how-to-treat-api-contracts-as-long-term-commitments",
        "How to Treat API Contracts as Long-Term Commitments",
        "Breaking clients is breaking trust — version accordingly.",
        """\
APIs are promises with semver: additive changes freely, breaking changes only with version bumps and migration windows.

Document error shapes, pagination, idempotency keys, and rate limits as part of the contract — not as footnotes.

Consumers you do not know exist will integrate. Assume external dependency.

Deprecation timelines beat surprise removal. Telemetry on old endpoints tells you when to close.

Promises kept quietly are how platforms age without rage.""",
    ),
]


def main() -> None:
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    by_source = {e["source"]: e for e in manifest["entries"]}
    num = 70
    written = 0
    for source, slug, title, dek, body in CONTENT:
        if source in SKIP:
            continue
        meta = by_source.get(source)
        if not meta:
            print("missing manifest", source)
            continue
        tags = meta["tags"]
        if source.startswith("deployment"):
            tags = meta.get("tags") or ["ops"]
            cover = "/assets/images/cover-code.svg"
        else:
            cover = "/assets/images/cover-craft.svg"
        number = f"007.{num}"
        num += 1
        write_post(
            source=source,
            site_slug=slug,
            title=title,
            dek=dek,
            date=meta["date"],
            tags=tags,
            read_time=7,
            topic="/".join(source.split("/")[:-1]),
            body=body.strip() + "\n",
            number=number,
            cover=cover,
        )
        written += 1
        print("wrote", slug)
    print(f"done: {written} posts")


if __name__ == "__main__":
    main()
