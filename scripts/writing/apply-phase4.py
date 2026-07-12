#!/usr/bin/env python3
"""Apply Phase 4 wellness rewrites → archive + _wellness."""

from __future__ import annotations

import json
import re
from pathlib import Path

BLOG = Path(
    "/Users/jenthedev/Documents/Documents - Jennifer\u2019s MacBook Pro/Active/dark-heart-labs/blog"
)
WELLNESS = Path("/Users/jenthedev/Projects/mystic-bytes/_wellness")
MANIFEST = Path("/Users/jenthedev/Projects/mystic-bytes/_data/writing_manifest.json")

INTRO = (
    "Wellness for builders is not luxury — it is maintenance. "
    "Scent, touch, and ritual can support recovery when used with realistic expectations. "
    "Nothing here replaces medical care.\n\n"
)

# source -> (slug, title, dek, body)
POSTS: list[tuple[str, str, str, str, str]] = [
    (
        "aromatherapy-blog/oils-ingredients/Lavender, Nature's Calming Elixir.md",
        "how-lavender-may-support-sleep-across-time-zones",
        "How Lavender May Support Sleep Across Time Zones",
        "A familiar scent can cue rest when your calendar still thinks it is afternoon elsewhere.",
        INTRO
        + """\
Lavender is the oil most people reach for first — and for sensible reasons. Inhaled aroma may support relaxation before bed, especially when you are adjusting to a new hemisphere or recovering from late deploy windows.

**How I use it:** one to three drops in a bedroom diffuser 30 minutes before sleep; never on skin undiluted. Pair with dark mode on devices and a fixed local bedtime — scent cues rest, it does not override circadian math.

**What research suggests:** some small studies report anxiolytic and sleep-quality improvements with inhaled lavender; effects vary by person and are modest compared to sleep hygiene.

**Cautions:** allergic reactions happen; patch-test diluted oil on inner arm. Avoid ingesting essential oils unless under qualified supervision.""",
    ),
    (
        "aromatherapy-blog/oils-ingredients/Unlock the Magic of Basil.md",
        "what-basil-essential-oil-may-offer-for-mental-fatigue",
        "What Basil Essential Oil May Offer for Mental Fatigue",
        "Herbaceous oils can mark a transition from work mode to off mode — if you keep doses low.",
        INTRO
        + """\
Basil essential oil (Ocimum basilicum) carries a sharp, green note. Some people find it clarifying during long reading or planning sessions; others find it overwhelming in small rooms.

**Usage:** diffuse briefly (10–15 minutes) in a ventilated space, or dilute heavily in carrier oil for wrist application away from eyes.

**Claims to soften:** basil is not a substitute for breaks, food, or sleep. It may support a ritual boundary: diffuser on means deep work; off means stop.

**Safety:** avoid during pregnancy unless advised; keep away from pets' breathing zones.""",
    ),
    (
        "aromatherapy-blog/oils-ingredients/Transformative Magic of Bergamot.md",
        "bergamot-oil-for-stress-with-a-photosensitivity-warning",
        "Bergamot Oil for Stress — With a Photosensitivity Warning",
        "Citrus calm comes with a sun-exposure footnote you should not skip.",
        INTRO
        + """\
Bergamot's bright aroma is popular in blends marketed for mood. Inhaled, it may help some people feel less tense; topically, it demands respect.

**Critical:** bergapten in bergamot can increase photosensitivity. Do not apply to skin before sun exposure. Prefer diffusion indoors.

**Builder use case:** afternoon diffuser reset between meetings — short burst, window cracked.

**Pair with:** factual stress management (walk, water, calendar boundaries), not instead of them.""",
    ),
    (
        "aromatherapy-blog/oils-ingredients/Chamomile, Nature's Soothing Gift.md",
        "how-chamomile-oil-may-help-you-wind-down-after-late-sprints",
        "How Chamomile Oil May Help You Wind Down After Late Sprints",
        "Gentle scent as part of a shutdown ritual — not a sedative in a bottle.",
        INTRO
        + """\
Roman or German chamomile oils are often chosen for evening blends. The aroma is soft; the expectation should be too.

**Practice:** chamomile in diffuser or diluted in evening bath — after laptop closed, not while reviewing PRs.

**May help with:** perceived tension, ritual association with sleep prep.

**Avoid:** replacing insomnia treatment; consult a clinician for chronic sleep issues.""",
    ),
    (
        "aromatherapy-blog/oils-ingredients/Rosemary, Nature's Revitalizing Elixir.md",
        "rosemary-oil-may-support-alertness-during-deep-work",
        "Rosemary Oil May Support Alertness During Deep Work",
        "Invigorating scent for morning blocks — keep concentration realistic.",
        INTRO
        + """\
Rosemary has a long folk history for memory and focus. Evidence for cognitive boost from aroma alone is mixed and small-scale.

**Practical use:** morning diffuser during a 90-minute focus block; stop if headache develops.

**Not a replacement for:** caffeine timing, sleep, or [sensory load management](/p/sensory-load-is-a-system-resource/).

**Caution:** high amounts can irritate; avoid near infants and sensitive pets.""",
    ),
    (
        "aromatherapy-blog/oils-ingredients/Spearmint, Nature's Refreshing Elixir.md",
        "spearmint-oil-as-a-lighter-desk-scent",
        "Spearmint Oil as a Lighter Desk Scent",
        "Milder than peppermint for people who want cool notes without the intensity.",
        INTRO
        + """\
Spearmint is softer than peppermint — useful if peppermint triggers headache or feels too sharp in a home office.

**Use:** low-dose diffusion; never near eyes. Good for post-lunch slump as a sensory reset, not a stimulant.

**May help:** perceived freshness and alertness; individual response varies.""",
    ),
]

# Build remaining oils programmatically from a data table
OILS = [
    ("Celery Seed, Nature's Green Elixir.md", "celery-seed-oil-notes-for-calm-focus", "Celery Seed Oil Notes for Calm Focus", "Earthy, quiet notes for people who dislike sweet florals.", "Celery seed oil is niche — herbaceous and grounding. Diffuse sparingly; blend with citrus if the earthiness feels heavy. May support a calm desk atmosphere for some users."),
    ("Cinnamon Bark, the Warming Magic of Nature.md", "how-to-use-cinnamon-bark-oil-safely", "How to Use Cinnamon Bark Oil Safely", "Warming scent is potent — respect dilution and irritation risk.", "Cinnamon bark is strong; skin irritation is common undiluted. Prefer diffusion in large rooms, low drops. Winter ritual scent, not daily perfume. Keep away from children and mucous membranes."),
    ("Copaiba, Nature's Soothing Balm.md", "what-copaiba-oil-may-offer-for-recovery-rituals", "What Copaiba Oil May Offer for Recovery Rituals", "Soft resin note — often blended, rarely solo.", "Copaiba has a mild, balsamic profile. Used in massage blends for perceived muscle comfort after travel or desk tension. Always dilute; may help as part of recovery routine with stretching and hydration."),
    ("Fennel, Nature's Harmonious Herb.md", "fennel-oil-for-travel-and-digestive-comfort", "Fennel Oil for Travel and Digestive Comfort", "May ease mild digestive discomfort for some — not medical treatment.", "Fennel sweet oil is sometimes used for travel-related bloating aroma support. Inhalation only in small amounts; ingest only under professional guidance if at all."),
    ("Frankincense, Nature's Timeless Elixir.md", "frankincense-in-a-minimal-desk-diffusion-practice", "Frankincense in a Minimal Desk Diffusion Practice", "Resinous, slow scent for end-of-day transition.", "Frankincense is popular in meditation blends. One drop in diffuser marks shutdown after work — pairs with logging off chat. Grounding aroma; evidence for anxiety is preliminary."),
    ("Ginger, Nature's Invigorating Root.md", "ginger-oil-for-nausea-and-motion-what-to-know", "Ginger Oil for Nausea and Motion — What to Know", "Ginger is better studied as food; oil use is secondary and cautious.", "Ginger essential oil may help some with motion discomfort via inhalation. For pregnancy, chemotherapy, or chronic nausea, follow medical advice — not blog advice."),
    ("Laurus Nobilis, the Regal Aura of Nature.md", "bay-laurel-oil-for-focus-sessions", "Bay Laurel Oil for Focus Sessions", "Herbal, slightly camphoraceous — use in low concentration.", "Bay laurel (laurel leaf) can scent a focus block when diluted or diffused lightly. Stop if respiratory irritation occurs."),
    ("Lemongrass, Nature's Balancing Elixir.md", "lemongrass-oil-for-uplifting-workspace-diffusion", "Lemongrass Oil for Uplifting Workspace Diffusion", "Bright citrus-grass note — ventilate well.", "Lemongrass may feel uplifting in afternoon slumps. Can irritate skin; avoid direct sun after topical use. Short diffusion sessions only."),
    ("Lime, Nature's Zesty Elixir.md", "lime-essential-oil-for-morning-routines", "Lime Essential Oil for Morning Routines", "Citrus brightness — photosensitivity applies here too.", "Lime oil in morning diffuser can mark start of day. Like other citrus oils, mind photosensitivity if applied to skin. Prefer inhalation routes."),
    ("Mountain Savory, Nature's Invigorating Elixir.md", "mountain-savory-oil-for-afternoon-slumps", "Mountain Savory Oil for Afternoon Slumps", "Sharp herb for people who tolerate strong scents.", "Mountain savory is intense — one drop goes far. For builders who need a sensory jolt between meetings; not for shared small offices without consent."),
    ("Nutmeg, Spiced Symphony of Nature's Warmth.md", "nutmeg-oil-in-small-doses-for-evening", "N nutmeg Oil in Small Doses for Evening", "Warm spice — sedating associations, strong potency.", "Nutmeg essential oil is potent and can be toxic in large amounts. Micro-dose in diffusion only; never ingest casually. Evening wind-down scent for some."),
    ("Sage, Nature's Tranquil Elixir.md", "sage-essential-oil-for-grounding-after-meeting-heavy-days", "Sage Essential Oil for Grounding After Meeting-Heavy Days", "Herbaceous reset when Slack will not stop.", "Clary sage is often chosen for stress blends (verify species on label). May support relaxation ritual after video-call days. Avoid pregnancy unless cleared by clinician."),
    ("Tarragon, Nature's Soothing Elixir.md", "tarragon-oil-for-evening-wind-down", "Tarragon Oil for Evening Wind-Down", "Anise-like herb — polarizing scent profile.", "Tarragon oil suits people who like licorice notes. Low-dose diffusion before bed; patch-test if touching skin."),
    ("Thyme, Nature's Balancing Elixir.md", "thyme-oil-safe-home-use-and-reputation", "Thyme Oil — Safe Home Use and Reputation", "Antimicrobial reputation does not mean disinfectant replacement.", "Thyme thymol type is strong — respiratory irritant at high concentration. Use for occasional diffusion in ventilated rooms; not as COVID-era surface substitute without proper protocols."),
]

for fname, slug, title, dek, body_extra in OILS:
    POSTS.append((
        f"aromatherapy-blog/oils-ingredients/{fname}",
        slug,
        title,
        dek,
        INTRO + body_extra + "\n\n**General safety:** dilute for skin; keep away from pets; store away from heat; consult a practitioner if pregnant, nursing, or managing chronic conditions.",
    ))

# Fix nutmeg title typo
POSTS = [(s, sl, t.replace("N nutmeg", "Nutmeg"), d, b) for s, sl, t, d, b in POSTS]

BLENDS = [
    ("aromatherapy-blog/blends-elixirs/Custom Scents.md", "how-to-build-a-personal-diffuser-blend", "How to Build a Personal Diffuser Blend for Work and Rest", "Start with two oils and a notebook — complexity comes later.", INTRO + "Choose a top note (citrus), middle (herb), base (resin or wood). Test 30-minute diffusion sessions. Record ratios. Separate work blend from sleep blend so your brain learns the cue."),
    ("aromatherapy-blog/blends-elixirs/Harnessing the Synergy of Aromatherapy and….md", "how-to-layer-essential-oils-without-overwhelming-a-room", "How to Layer Essential Oils Without Overwhelming a Room", "Synergy is not stacking every bottle at once.", INTRO + "Add one oil at a time across days, not all in one diffuser load. Small rooms amplify mistakes. Coworking neighbors matter. Less is measurable; more is often headache."),
    ("aromatherapy-blog/blends-elixirs/The Art of Scent- Blending Aromatherapy….md", "a-simple-framework-for-blending-essential-oils-at-home", "A Simple Framework for Blending Essential Oils at Home", "Percentages beat intuition until intuition is trained.", INTRO + "Use a 3–5% dilution for body products unless a certified aromatherapist says otherwise. For diffusion, total drops per 100ml water depends on device — read manual. Label every bottle with date and ingredients."),
]

CONSULT = [
    ("aromatherapy-blog/consultation-business/Aromatherapy.md", "what-aromatherapy-is-and-what-it-is-not", "What Aromatherapy Is — and What It Is Not", "Complementary support, not diagnosis or cure.", INTRO + "Aromatherapy uses plant-derived essential oils for wellbeing support through inhalation and diluted topical use. It is not a replacement for medical treatment, psychiatry, or emergency care. Useful for rituals, sensory boundaries, and comfort alongside evidence-based care."),
    ("aromatherapy-blog/consultation-business/Aromatherapy Consultation.md", "what-a-wellness-focused-aromatherapy-consult-includes", "What a Wellness-Focused Aromatherapy Consult Includes", "History, goals, contraindications — then a plan you can actually follow.", INTRO + "A consult should cover health history, medications, scent preferences, home environment (pets, kids, room size), and realistic goals. You leave with dilution guidance and a small starter protocol — not a shopping cart of twelve bottles."),
    ("aromatherapy-blog/consultation-business/Aromatherapy Consultation rewrite.md", "how-to-prepare-for-your-first-aromatherapy-consult", "How to Prepare for Your First Aromatherapy Consult", "Bring your medication list and honest expectations.", INTRO + "Write down what you want: sleep, focus, travel recovery, stress ritual. Note allergies and who shares your space. Ask about training and scope of practice. Red flag: anyone promising cures for chronic disease with oils alone."),
    ("aromatherapy-blog/consultation-business/Aromatherapy FAQs.md", "common-questions-about-essential-oils-for-beginners", "Common Questions About Essential Oils for Beginners", "Dilution, diffusion, and why quality labels matter.", INTRO + "**Can I ingest?** Generally no without professional supervision. **How dilute?** Typical adult topical: 1–2% for face, 2–3% body. **Are all oils equal?** No — look for botanical name, batch, GC/MS if available. **Pets?** Many oils are toxic to cats; research before diffusing."),
    ("aromatherapy-blog/consultation-business/Natural & Alternative Healing.md", "complementary-wellness-for-developers-under-load", "Complementary Wellness for Developers Under Load", "Oils, movement, and sleep hygiene sit in the same toolbox.", INTRO + "Alternative does not mean instead of. Under chronic stress, combine: medical care when needed, therapy, sleep, movement, and sensory rituals (including aromatherapy) that you can sustain. Discard practices that require buying hope in bulk."),
]

TECH = [
    ("aromatherapy-blog/tech-crossover/Embracing the Future- The Confluence of….md", "sensory-load-screens-and-why-smell-breaks-the-loop", "Sensory Load, Screens, and Why Smell Breaks the Loop", "Olfaction is the sense that bypasses the same fatigue as pixels.", INTRO + "Developers live in visual and auditory load. Scent can mark state change when willpower is low — start work, stop work, sleep. See [sensory load as a system resource](/p/sensory-load-is-a-system-resource/). Tech cannot smell; you can use low-tech scent intentionally."),
    ("aromatherapy-blog/tech-crossover/Fragrant Futures- Technological Innovations….md", "scent-tech-hype-vs-useful-signals", "Scent Tech — Hype vs Useful Signals", "Most gadgets add complexity; few add wellbeing.", INTRO + "Wearables that puff lavender exist. Ask: does this solve a problem or add charging cables? Useful: timed diffuser with quiet motor. Gimmick: app-controlled mood 'algorithm' with no evidence."),
    ("aromatherapy-blog/tech-crossover/Scented Pixels- A Journey into the Technological….md", "ambient-scent-in-ux-mostly-theater-sometimes-useful", "Ambient Scent in UX — Mostly Theater, Sometimes Useful", "Digital products cannot smell; physical rituals still can.", INTRO + "Scented marketing in retail increases dwell time — different context from your home office. For builders, the crossover is personal: scent marks offline rituals that balance online work."),
    ("aromatherapy-blog/tech-crossover/The Allure of Aroma- A Guide to Tech-Infused….md", "desk-rituals-that-actually-help-focus", "Desk Rituals That Actually Help Focus", "Ritual beats gadget when the ritual is repeatable.", INTRO + "Same mug, same startup playlist, same two-minute stretch, same diffuser cue — reduce decision fatigue. Aromatherapy fits as cue, not cure. Measure by whether you ship sustainably, not by vibe alone."),
    ("aromatherapy-blog/tech-crossover/The Enchanting Convergence of Technology….md", "wellness-tech-without-the-buzzwords", "Wellness Tech Without the Buzzwords", "Keep what works; delete the rest.", INTRO + "Filter wellness tech like code deps: maintenance cost, failure modes, evidence. A plain ceramic diffuser with one oil you tolerate beats a subscription scent platform. Integrate with calendar boundaries, not instead of them."),
]

TREAT = [
    ("aromatherapy-blog/treatments/Acne Treatments.md", "skin-care-basics-for-dry-office-air", "Skin Care Basics for Dry Office Air", "Humidity, cleanser choice, and stopping the pick-refactor cycle on your face.", INTRO + "AC and monitor heat dry skin. Hydrate, use non-comedogenic moisturizer, clean pillowcase. Essential oils like tea tree may support some people in diluted spot treatment — patch-test; can irritate. See a dermatologist for persistent acne."),
    ("aromatherapy-blog/treatments/Anti aging treatments.md", "aging-skin-and-sun-practical-notes", "Aging Skin and Sun — Practical Notes", "SPF daily beats any oil narrative.", INTRO + "Photoaging is UV-driven. Retinoids and sunscreen are evidence-backed; oils may support barrier comfort but do not reverse wrinkles magically. Sleep and hydration help appearance because biology, not marketing."),
    ("aromatherapy-blog/treatments/Facial Treatments.md", "facial-care-as-recovery-ritual-after-travel", "Facial Care as Recovery Ritual After Travel", "Rehydrate, calm, sleep — in that order.", INTRO + "After flights: gentle cleanse, moisturizer, water. Facial massage with diluted oil may reduce perceived puffiness for some. Not medical treatment. Keep routine short so you actually do it."),
]

GENERAL = [
    ("aromatherapy-blog/general/The Magic of Fragrance- How Aromas Affect Our Senses….md", "how-scent-affects-mood-and-memory", "How Scent Affects Mood and Memory — A Builder's Primer", "Olfactory paths hit limbic system fast — use that deliberately.", INTRO + "Scent links to memory because wiring is direct. Use consistent aromas for work and rest cues. Avoid scent bombing shared spaces. For neurodivergent builders, strong smells can increase load — preference beats trend."),
]


def write_wellness(source: str, slug: str, title: str, dek: str, date: str, body: str) -> None:
    topic = "/".join(source.split("/")[:-1])
    doc = f'''---
title: "{title}"
dek: "{dek}"
date: {date}
tags: [wellness]
read_time: 6
topic: {topic}
status: published
site_slug: {slug}
---

{body}

— JV · Dark Heart Labs.
'''
    (BLOG / source).write_text(doc, encoding="utf-8")
    site = f'''---
layout: wellness
title: {title}
dek: "{dek}"
date: {date}
read_time: 6
tags: [wellness]
cover: /assets/images/cover-craft.svg
---

{body}

— JV · Dark Heart Labs.
'''
    (WELLNESS / f"{slug}.md").write_text(site, encoding="utf-8")


def main() -> None:
    WELLNESS.mkdir(exist_ok=True)
    manifest = json.loads(MANIFEST.read_text(encoding="utf-8"))
    by_source = {e["source"]: e for e in manifest["entries"]}
    all_posts = POSTS + BLENDS + CONSULT + TECH + TREAT + GENERAL
    written = 0
    for source, slug, title, dek, body in all_posts:
        meta = by_source.get(source)
        if not meta:
            print("SKIP missing", source)
            continue
        write_wellness(source, slug, title, dek, meta["date"], body.strip())
        meta["status"] = "published"
        written += 1
        print("wrote", slug)
    MANIFEST.write_text(json.dumps(manifest, indent=2), encoding="utf-8")
    print(f"phase4 done: {written}/{len(all_posts)}")


if __name__ == "__main__":
    main()
