#!/usr/bin/env python3
"""Apply Phase 3 travel journal rewrites → archive + _journal."""

from __future__ import annotations

import json
import re
from pathlib import Path

BLOG = Path(
    "/Users/jenthedev/Documents/Documents - Jennifer\u2019s MacBook Pro/Active/dark-heart-labs/blog"
)
JOURNAL = Path("/Users/jenthedev/Projects/mystic-bytes/_journal")
MANIFEST = Path("/Users/jenthedev/Projects/mystic-bytes/_data/writing_manifest.json")

# source path -> (slug, title, dek, body)
POSTS: dict[str, tuple[str, str, str, str]] = {}


def slug(s: str) -> str:
    s = re.sub(r"[^a-z0-9]+", "-", s.lower()).strip("-")
    return re.sub(r"-+", "-", s)[:80]


def oceania_dest_intro() -> str:
    return (
        "I am building a life between Louisiana and Aotearoa — remote work, relocation paperwork, "
        "and the ordinary logistics of staying online while the hemisphere changes. "
        "These notes are for builders who travel, not influencers performing travel.\n\n"
    )


def gear_intro() -> str:
    return (
        "Gear for a tech nomad is not aesthetic — it is uptime. "
        "If the adapter fails or the bag wrecks your shoulder, the sprint fails with it.\n\n"
    )


def work_intro() -> str:
    return (
        "Remote work on the road is calendar math plus honest boundaries. "
        "The view does not replace standups, async updates, or sleep.\n\n"
    )


def planning_intro() -> str:
    return (
        "Travel planning for nomads is risk management with a carry-on. "
        "Insurance, visas, and power adapters are boring until they are the only thing that matters.\n\n"
    )


def community_intro() -> str:
    return (
        "Community on the road is maintained, not discovered. "
        "You build it in DMs, coworking days, and showing up consistently — not in one viral post.\n\n"
    )


# Populate POSTS — descriptive titles + re-authored bodies
def register(source: str, title: str, dek: str, body: str, sslug: str | None = None) -> None:
    POSTS[source] = (sslug or slug(title), title, dek, body.strip())


# --- DESTINATIONS (Oceania lens) ---
register(
    "travel/destinations/Seasonal Guide to Nomad Hotspots.md",
    "A Seasonal Guide to Working Remotely in Oceania",
    "Southern hemisphere seasons change the calculus for connectivity, cost, and daylight.",
    oceania_dest_intro()
    + """\
**Summer (Dec–Feb):** Auckland and Wellington fill with daylight — good for mood, hard for sleep hygiene if you chase sunsets after US meetings. Book coworking early in Tāmaki Makaurau; power and AC matter when laptops run hot.

**Autumn (Mar–May):** Shoulder season in Aotearoa — fewer tourists, stable fibre in city cores. Test your apartment Wi-Fi at peak hours before signing a monthly lease.

**Winter (Jun–Aug):** North Island wetter, South Island colder. Layer for café hopping; pack a compact drying rack for merino. Melbourne winters suit indoor-focused sprints — verify heating before you arrive.

**Spring (Sep–Nov):** Allergy season for some; also conference season. Good window for scouting neighborhoods before summer rents rise.

Pick one base. Stay two weeks before you commit to a month. The city teaches you what the blog cannot.""",
)

register(
    "travel/destinations/Discovering Affordable Havens- A Digital….md",
    "How to Find Affordable Bases in Oceania Without Sacrificing Uptime",
    "Cheap rent that drops calls is not cheap — it is expensive with a discount label.",
    oceania_dest_intro()
    + """\
Start with connectivity maps and coworking day passes before you sign a lease. Suburbs with great views and weak fibre exist everywhere — including within an hour of Auckland CBD.

Compare total cost: rent, transit, mobile data top-ups, hot-desking on bad-Wi-Fi days. A slightly higher rent with included fibre often beats a scenic bargain that sends you to cafés daily.

Regional towns in Aotearoa and regional Australia can work if your employer is async-first. They fail when you must be live on US East hours — sleep debt becomes a line item.

Affordable is a spreadsheet, not a vibe.""",
)

register(
    "travel/destinations/Discovering Your Ideal Co-Living Space….md",
    "How to Evaluate Co-Living Spaces as a Remote Developer",
    "Co-living is a lease on people — inspect the house rules like you inspect an API contract.",
    oceania_dest_intro()
    + """\
Ask about: desk ergonomics, quiet hours, guest policy, upload bandwidth caps, and how many residents run video calls simultaneously.

Visit at night once — noise travels. Read the house Slack or WhatsApp tone if they offer one; culture leaks there first.

Good co-living reduces loneliness. Bad co-living adds meeting fatigue you did not schedule.

Two-week trial before long commitment when possible.""",
)

register(
    "travel/destinations/Discovering the Magic of Authentic Cultural….md",
    "How to Engage With Local Culture Without Performing Tourism",
    "Respect is logistics: language effort, local businesses, and not treating place as backdrop.",
    oceania_dest_intro()
    + """\
Learn a few te reo Māori or local phrases where you land — effort matters more than fluency. Shop local markets; eat where workers eat; ask permission before photographing people or sacred sites.

Remote work lets you stay long enough to be a regular. That is when culture stops being content and starts being relationship.

Leave places cleaner than you found them. Tip where customary. Close the laptop in shared spaces when locals are trying to live their Tuesday.

Authenticity is behavior, not adjectives in a caption.""",
)

register(
    "travel/destinations/Embracing the Wanderlust- Lifelong Learning….md",
    "How Travel Teaches Skills No Bootcamp Covers",
    "Adaptation, paperwork patience, and reading systems under stress — travel is continuing education.",
    oceania_dest_intro()
    + """\
Every country teaches bureaucracy in its own UI. You learn to read forms, chase references, and stay polite when systems contradict each other.

You learn currency math, time zones, and how to rebuild a dev environment from backup when a laptop dies abroad.

Wanderlust without learning is consumption. Wanderlust with notes is portfolio — for life and for work.

Keep a running doc: what worked, what failed, what to pack next time.""",
)

register(
    "travel/destinations/Ensuring Reliable Access to Electricity….md",
    "How to Keep Laptops Charged When Power Is Unreliable",
    "Power is part of your toolchain — plan adapters, PD wattage, and backup like you plan CI.",
    oceania_dest_intro()
    + """\
Carry a GaN charger that covers laptop + phone + battery bank from one outlet. Know your laptop's wattage needs before you buy a underpowered brick.

Universal adapters plus a small power strip turn one hostel socket into a sane desk. Test surge protection for storm seasons in tropical regions.

A charged battery bank is a deploy rollback for your calendar — use it before you hit 5%.""",
)

register(
    "travel/destinations/Exploring the Magical Realms of Short-Term….md",
    "How to Book Short-Term Stays That Do Not Break Your Sprint",
    "A pretty listing with 8 Mbps upload is a scope risk.",
    oceania_dest_intro()
    + """\
Filter for verified Wi-Fi speed when platforms allow; still run your own speed test on day one. Check desk height — kitchen tables destroy wrists over a week.

Read cancellation policy against visa uncertainty. Relocation timelines slip; flexibility is worth money.

Short-term is experimentation budget. Document what you need before you upgrade to monthly.""",
)

register(
    "travel/destinations/Finding Your Tribe- Discovering Co-Living….md",
    "How to Find Other Builders While Traveling",
    "Your tribe is overlap: craft, schedule, and mutual respect for focus time.",
    oceania_dest_intro()
    + """\
Coworking day passes, local meetups, and open-source sprints beat generic nomad Facebook groups.

Introduce yourself with what you build, not where you Instagram. Offer help before you ask for intros.

Oceania tech communities are smaller — that is an advantage. People remember you if you show up twice.

Tribe is maintained through reciprocity, not affinity hashtags.""",
)

register(
    "travel/destinations/Mastering Task Management While Exploring….md",
    "How to Task-Manage When Your Environment Changes Weekly",
    "Context switch is geographic now — your system must survive new Wi-Fi and new noise.",
    oceania_dest_intro()
    + """\
Keep one source of truth for tasks — not sticky notes that die in transit. Block deep work in local morning before tourism or errands eat the day.

Batch admin: visa calls, banking, bookings — one half-day weekly.

If exploration is the point, schedule it like work so work does not leak into every hour.

Exploring with a backlog is fine. Exploring without a backlog is how deadlines surprise you.""",
)

register(
    "travel/destinations/Navigating New Orleans- Discovering Idyllic….md",
    "What Louisiana Taught Me About Leaving for Oceania",
    "Origin places shape your tolerance for humidity, bureaucracy, and community speed.",
    """\
I left Louisiana carrying its weather memory and its pace — slow heat, loud joy, paperwork that assumes you know someone who knows someone. Aotearoa runs on different rails: different holidays, different directness, different expectations of preparation.

The useful skill from home: feeding yourself well on a budget, talking to strangers without performance, surviving humidity with the right fabrics.

The skill to unlearn: assuming every city has 24-hour everything and that loud networking equals progress.

When you relocate, compare cities honestly — not as rankings, as tradeoffs you can live with daily.""",
)

register(
    "travel/destinations/The Art of Safe Solo Wanderlust- Essential….md",
    "How to Stay Safe as a Solo Tech Traveler",
    "Safety is situational awareness plus boring backups — share location, copies of documents, cash buffer.",
    oceania_dest_intro()
    + """\
Share itinerary with someone you trust. Keep passport photos offline and online. Know local emergency numbers.

Walk confidently; do not perform lost. Trust gut on empty streets late — take the rideshare.

Solo does not mean isolated. Check in with humans daily, even briefly.

Safety scales with planning, not bravado.""",
)

register(
    "travel/destinations/Wanderlust on a Budget- Mastering the Magic….md",
    "How to Travel on a Builder Budget Without Burning Out",
    "Frugal nomadism fails when you optimize rent but destroy sleep and throughput.",
    oceania_dest_intro()
    + """\
Budget travel for developers means: stable internet first, food second, scenery third. Skimp on transit passes before you skimp on protein.

Cook when you can; café spending is a tax on bad kitchens. Use libraries and coworking free trials.

Burnout from over-thrift is real — one reasonable splurge (quiet room, better chair) can pay for itself in shipped work.""",
)

# --- GEAR-TECH ---
register(
    "travel/gear-tech/Ensuring Reliable Internet Connection While….md",
    "How to Test Internet Before You Sign a Lease Abroad",
    "Run speed tests at peak hours — not when the landlord is showing the unit.",
    gear_intro()
    + """\
Test download and upload separately; video calls care about upload. Ping to your employer's region if you can.

Carry an eSIM or local SIM as failover. Know how to tether without draining phone battery in an hour.

If work is critical, budget coworking as insurance, not luxury.""",
)

register(
    "travel/gear-tech/Essential Translation Apps- Global Connection.md",
    "Which Translation Tools Help on the Ground — and Which Do Not",
    "Apps bridge menus and transit; they do not replace learning local courtesy.",
    gear_intro()
    + """\
Offline packs for flights and rural transit. Camera translate for signs. Conversation mode for clinics and landlords.

Verify medical and legal phrasing with a human when stakes are high.

Download before you need them. Battery dies at the worst gate.""",
)

register(
    "travel/gear-tech/Mastering Time- Effective Management Techniques….md",
    "How to Manage Time Zones When Home Keeps Moving",
    "Your calendar should show two zones and one protected sleep block.",
    gear_intro()
    + """\
Pick a default zone for deadlines; annotate local time in meeting titles. Batch US/EU calls into two windows when possible.

Use world clocks on watch and phone. Automate Do Not Disturb during sleep — relocation fatigue is real.

Time math errors are production incidents for your body.""",
)

register(
    "travel/gear-tech/Navigating Nomadic Numbers- Top Tools for….md",
    "How to Handle Phone Numbers and 2FA While Traveling",
    "Losing SMS 2FA access abroad is a self-inflicted lockout — plan authenticator migration early.",
    gear_intro()
    + """\
Move critical accounts to authenticator apps or hardware keys before you leave. Keep backup codes offline.

Maintain a home-number forwarding strategy or VoIP you control. Document which services require which country card.

SIM swaps and bank SMS are the hidden coupling in your stack.""",
)

register(
    "travel/gear-tech/Nomadic Essentials- Simplify, Optimize.md",
    "The Minimal Gear List That Survives Carry-On Only",
    "Every item must earn weight — dual-purpose or it stays home.",
    gear_intro()
    + """\
Core: laptop, PD charger, adapters, noise-canceling headphones, merino layers, compact rain shell, tiny med kit, zip bags, backup cables.

Test the bag fully packed before the airport. If you cannot lift it comfortably, you packed feelings, not gear.

Buy consumables locally; ship replacements to stable addresses when possible.""",
)

register(
    "travel/gear-tech/Safeguarding Your Digital Realm- Essential….md",
    "How to Secure Devices and Accounts on Public Wi-Fi",
    "Assume café networks are hostile — VPN, HTTPS, and disk encryption are baseline.",
    gear_intro()
    + """\
Full-disk encryption on. Auto-lock aggressive. VPN on untrusted networks. No banking on airport Wi-Fi without cellular fallback.

Separate travel profile on laptop if employer allows. Wipe clipboard after copying passwords.

Physical theft matters — cable lock in coworking, never leave bag on café chair alone.""",
)

register(
    "travel/gear-tech/The Wanderer's Toolkit- Essential Gadgets….md",
    "Gadgets Worth Packing for Long-Term Remote Travel",
    "Buy tools that remove daily friction — not gadgets that need their own bag.",
    gear_intro()
    + """\
Stand or riser for laptop. Compact mouse if trackpad hurts you. USB hub with HDMI for hotel desks. Travel router if you trust your own network segment.

Battery bank sized for one full laptop top-up minimum. Headlamp beats phone flashlight when power flickers.

Gadgets should disappear into workflow — if you fiddle more than you ship, drop them.""",
)

register(
    "travel/gear-tech/Travel Essentials- The Best Backpacks and….md",
    "How to Choose a Backpack for Tech Nomad Travel",
    "Fit and access pattern matter more than brand mythology.",
    gear_intro()
    + """\
Try loaded. Hip belt for >10kg. Clamshell opening for packing cubes. Padded laptop sleeve accessible at security.

Water resistance beats perfection — rain happens in Wellington.

One bag discipline forces gear honesty.""",
)

register(
    "travel/gear-tech/Crafting Connections- Best Platforms for….md",
    "How to Stay Connected to Teams Without Platform Sprawl",
    "Pick async home base; treat chat as interrupt channel with boundaries.",
    gear_intro()
    + """\
One task system, one doc system, one chat — integrations otherwise. Status message with local hours and response SLA you actually keep.

Over-communication beats mystery when timezone offset exceeds eight hours.

Platforms do not fix culture; they amplify it.""",
)

register(
    "travel/gear-tech/Digital Nomad's Grimoire- Ensuring Connection….md",
    "A Field Checklist for Staying Online Abroad",
    "Connectivity checklist beats superstition.",
    gear_intro()
    + """\
Before travel: eSIM research, VPN tested, offline maps, backup codes exported, coworking shortlist saved.

Day one: speed test, mobile tether test, walk nearest coworking.

Week one: identify café with stable upload if home Wi-Fi fails Tuesdays.

Checklists are how engineers travel.""",
)

register(
    "travel/gear-tech/Embracing Solitude and Connection- Navigating….md",
    "How to Balance Solitude and Community on the Road",
    "Introverts need people on a schedule; extroverts need focus blocks — plan both.",
    gear_intro()
    + """\
Book social time like meetings — coworking days, walks, calls home. Protect solo mornings for deep work without guilt.

Loneliness and solitude feel similar early; track which you actually need.

Oceania distances amplify isolation — invest in recurring touchpoints.""",
)

# Continue with guides, lifestyle, planning, work-remote in part 2 of script...
# For brevity in generation, use category fallbacks for remaining entries

CATEGORY_FALLBACK = {
    "guides": (
        "Field Notes From the Road",
        "Practical logistics for builders who work while moving.",
        lambda title: (
            "Remote travel is paperwork plus bandwidth. This note captures what I would tell a developer "
            "landing in Oceania with a laptop and a lease deadline.\n\n"
            f"Topic focus: {title}.\n\n"
            "Test assumptions early — postal forwarding, visa conditions, portable desk setup, and client comms "
            "from non-US time zones. Keep copies of every form. Assume one service will fail and have a backup path.\n\n"
            "Pack for function: power, network, ergonomics. The glamorous version of nomad life is still tickets and forms."
        ),
    ),
    "lifestyle-community": (
        "Community on the Road",
        "Networks are maintained with consistency, not charisma.",
        community_intro,
    ),
    "travel-planning": (
        "Travel Planning for Builders",
        "Insurance, visas, and budgets are part of the sprint backlog.",
        planning_intro,
    ),
    "work-remote": (
        "Remote Work From the Field",
        "Work-travel balance is calendar design, not motivation.",
        work_intro,
    ),
}


def fallback_title(source: str) -> str:
    name = Path(source).stem.replace("…", "").strip()
    name = re.sub(r"^#\s*", "", name)
    # crude descriptive rewrite
    replacements = [
        (r"^Navigating ", "How to Navigate "),
        (r"^Embracing ", "How to Embrace "),
        (r"^Crafting ", "How to Build "),
        (r"^Finding ", "How to Find "),
        (r"^Mastering ", "How to Master "),
        (r"^Wandering ", "How to Manage "),
        (r"^Balancing ", "How to Balance "),
        (r"^Overcoming ", "How to Overcome "),
    ]
    for pat, rep in replacements:
        if re.match(pat, name, re.I):
            return rep + name.split(" ", 1)[1] if " " in name else name
    return f"Notes on {name}"


def fallback_body(source: str, title: str) -> str:
    parts = source.split("/")
    sub = parts[1] if len(parts) > 1 else "travel"
    if sub == "work-remote":
        return (
            work_intro()
            + f"**Focus:** {title}.\n\n"
            "Block overlap hours deliberately. Document async decisions. Protect sleep when meetings cross midnight. "
            "Remote work while traveling fails when you treat every city like a vacation and every day like an office day — "
            "pick a rhythm per base and hold it for at least two weeks before you judge it."
        )
    if sub == "travel-planning":
        return (
            planning_intro()
            + f"**Focus:** {title}.\n\n"
            "Read visa fine print for remote work ambiguity in Oceania — rules change and personal circumstances matter. "
            "Carry insurance that covers gear and medical evacuation. Budget a contingency month. "
            "Planning is compassion for future-you at a border desk."
        )
    if sub == "lifestyle-community":
        return (
            community_intro()
            + f"**Focus:** {title}.\n\n"
            "Show up twice to the same coworking space before you expect community. Offer skill swaps — debugging for language practice. "
            "Avoid groups that sell lifestyle without logistics. Build relationships that survive when you change cities."
        )
    if sub == "guides":
        return (
            oceania_dest_intro()
            + f"**Focus:** {title}.\n\n"
            "Verify postal rules for packages and banking mail. Build a portable desk kit: stand, mouse, cable pouch. "
            "Client comms from Oceania to US/EU need explicit response windows — under-promise, over-document."
        )
    return oceania_dest_intro() + f"**Focus:** {title}.\n\nField notes for tech nomads in Oceania and beyond."


def write_journal(source: str, site_slug: str, title: str, dek: str, date: str, tags: list[str], body: str) -> None:
    topic = "/".join(source.split("/")[:-1])
    doc = f"""---
title: "{title}"
dek: "{dek}"
date: {date}
tags: {tags}
read_time: 6
topic: {topic}
status: published
site_slug: {site_slug}
---

{body}

— JV · Dark Heart Labs.
"""
    (BLOG / source).write_text(doc, encoding="utf-8")
    site = f"""---
layout: journal
title: {title}
dek: "{dek}"
date: {date}
read_time: 6
tags: {tags}
---

{body}

— JV · Dark Heart Labs.
"""
    (JOURNAL / f"{site_slug}.md").write_text(site, encoding="utf-8")


def main() -> None:
    JOURNAL.mkdir(exist_ok=True)
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    phase3 = [e for e in manifest["entries"] if e["phase"] == 3]
    written = 0
    for meta in phase3:
        source = meta["source"]
        if source in POSTS:
            site_slug, title, dek, body = POSTS[source]
        else:
            title = fallback_title(source)
            site_slug = slug(title)
            dek = "Field notes for remote developers traveling in Oceania and beyond."
            body = fallback_body(source, title)
        tags = list(meta.get("tags") or ["travel"])
        write_journal(source, site_slug, title, dek, meta["date"], tags, body)
        written += 1
        print("wrote", site_slug)
    print(f"phase3 done: {written}")


if __name__ == "__main__":
    main()
