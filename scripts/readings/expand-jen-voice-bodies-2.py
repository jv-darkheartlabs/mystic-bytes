#!/usr/bin/env python3
"""Second expansion pass for Jen-voice reviews under 550 words."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2] / "_readings"
MARKER = "## Discussion launchpad"
SKIP = {"passion", "breaking-hailey", "dance-of-a-burning-sea", "white-lines", "four"}

INSERT2 = {
"a-dark-fate": """
Dialogue under fire reveals who offers possession and who offers partnership disguised as command—track that distinction chapter to chapter. Peckham and Valenti's court scenes work when zodiac language feels like emotional weather, not homework. I want you to notice when Elise chooses strategy over swoon; that's agency the RH shelf often forgets to give women surrounded by kings.

Reader response: I stayed engaged when revenge and desire shared the same breath without one canceling the other. When the middle stacked lore, I felt the book ask for series loyalty—fair, but name it if that's not your mood tonight.
""",
"a-heart-of-secrets-and-shadows": """
Beswick and Clare's best passages pair lyric image with sharp dialogue—shadow as setting and as emotional fact. **Spice 3** readers: notice how often almost-touch carries more charge than explicit release; that's intentional craft for this heat level. Fantasy violence should punctuate, not replace, the romantic question.

You in the archive: if you want romantasy that treats secrets as plot engine rather than delay, you're aligned. You in the room: bring one moment you almost put the book down—and one you couldn't.
""",
"a-savage-fae": """
Savage means the prose doesn't flinch when the court does. **Spice 5** distribution across RH attachments is the craft test—who gets the scene that changes temperature for you? Murder on the label isn't metaphor; track your own tolerance honestly.

I felt the book in my gut when beauty stayed lethal through the last act. That's the mystic thread: devotion wearing a predator's face and still feeling like prayer if you're the reader who opted in.
""",
"a-war-of-fae-and-fate": """
War framing should sharpen RH geometry, not bury it in battle reportage. Watch post-conflict scenes—who reaches, who withholds, who weaponizes care. **Spice 4** after adrenaline is a craft hinge; note whether you believed the shift or needed another chapter of mistrust (valid either way).

Series readers: tell us if Warrior Fae widens the world you signed up for in earlier volumes. New readers: name where lore lost you without shame—that helps the archive.
""",
"altair-university": """
Circus undertone in tags isn't decoration—uncanny pressure on realism. Vant's secrets escalate best when revelation reorders who holds power on campus. **Spice 4** with bullying: I watch for consequence after cruelty, not only chemistry after insult.

You browsing dark academia bully: this is cold-start rivalry. You continuing: compare your body response to Book Two winter—same author, different claustrophobia.
""",
"altair-university-2": """
Isolation warning is the honest one—winter shrinks social escape routes until desire feels like the only warm room. Vant's bleak register works when silence carries as much threat as dialogue. **Spice 4** against frost: heat should feel like thaw you mistrust.

Gothic academia as mystic read: the university as monastery of ambition where the soul learns forbidden appetite. I felt Book Two when shame and want shared a coat.
""",
"bewitched": """
Thalassa's Book One contract is patience—magic rules before romantic payoff. **Spice 4** when it arrives should feel like consequence of power touched, not scheduled reward. Emotional intensity on the label: track interior cost, not only external enchantment.

You: one rule you'd break for the magic offered. Say it in discussion—that's fourth wall honesty the Orchid Room runs on.
""",
"dare-series-collection": """
Binge versus stretch reading changes Tessier's collection—marathon can numb **spice 5** if you're not tracking obsession arcs. Pick an entry volume if you're new; series faithful, note which book peaks cruelty and care for you.

Dark humor optional here; earnest appetite required. The collection asks you to admit why bully romance hooks you—craft answer, not apology.
""",
"deadly-throne": """
Mellow's throne music either syncs your reading pulse or it doesn't—both valid. Court scenes need clarity when symphony metaphor stacks; when clear, **spice 4** reads as movement in the score. Emotional intensity: watch the protagonist's breath on page.

One image for poetry cross-link later: name it in the room—the crown, the note, the silence before the downbeat.
""",
"forever-rains": """
Atmospheric romance asks you to read weather as emotional plot. Mellow's forever rain can feel repetitive if you need event density—own that taste. **Spice 4** after saturation is design; if you wanted earlier heat, say so.

I lingered where rain and skin shared a sentence without melodrama. That's moderate lyric density working—image in service of feeling, not perfume.
""",
"fragile-allegiance": """
Reilly's mafia institution is the pressure cooker—family law before bedroom. Betrayal must cost trust you believed in; fragile longing should crack voice before plot confirms. **Spice 4** after rupture: note whether repair pace matches your forgiveness appetite.

Mystic read: loyalty as vow, longing as heresy whispered in the same breath. You know if Reilly is comfort or repetition for you—both are data.
""",
"house-of-earth-and-blood": """
Maas scale is commitment—city, grief, mystery, slow romantic architecture. **Spice 3** late is feature for some, bug for others; decide early. Bryce's rage is readable; track when it becomes your anchor versus barrier.

Crescent City as organism: politics, clubs, species—world as romance pressure. Orchid Room shelf debate welcome: core dark romance or epic adjacency?
""",
"john-dies-at-the-end": """
Wong's unreliability is craft, not cheat—horror-comedy that eats certainty. **Spice 2** minimal; charge lives in friendship and reality slip. Gore on label: literal.

If you shelve this here, say why—craft, vibe, or contrarian joy. The archive learns from your honesty.
""",
"part-of-you": """
Observation as romance engine—Grey makes you complicit in looking. **Spice 3** forbidden without high frequency; tension must carry. Image motif succeeds when what's cropped narratively hurts.

Taboo ethics: book must signal awareness. You mark where it did or didn't—that's genre-insider work, not moralizing.
""",
"peace-honey": """
Raeta mythic Book Two—power scales differ in dual POV; god hunger versus mortal hunger should feel like different music. **Spice 3** with betrayal: sweet turned wrong on purpose. Violence on label punctuates.

Immortal Truths readers: name Book Two lift or stall. Myth browsing: Hades-Persephone appetite without naming comps—just the dynamic you came for.
""",
"pine-poison": """
Gilded Lies poison aesthetic—luxury hiding blade. Kidnapping warning serious; **spice 3** after emotional toxin is pacing. Compare series voice to Immortal Truths if you've read both Raeta lines.

One poison image for the room—color, taste, temperature. Poetic prompt energy without leaving the review.
""",
"pray-for-us": """
Doyle cult claustrophobia at **spice 5**—graphic content must feel authored. Obsession and faith twisted together: track where your body wanted exit and couldn't. Horror-romance contract is opt-in repeated.

Scream as prayer—mystic read without redemption promise. Name glamorization risk if you felt it; name craft win if you stayed anyway.
""",
"sinners-absolve": """
Book Five debt—Sketchers pays in callbacks. **Spice 4** assumes pairing investment. Redemption theme: tired or earned? Say which without performing neutrality.

Sin as identity worn until it fits—late series mystic read. New readers: ask for start volume in discussion; that's kindness.
""",
"sins-of-the-past": """
Reilly betrayal arc—past as lock picking. **Spice 4** with trauma on label needs consequence. Comfort read or formula: your answer shapes whether you continue the stack.

Bound by history—would you forgive at this pace? Room split expected and welcome.
""",
"take-me-apart": """
Co-author POV handoffs—seamless or not for you? Disassembly in dialogue rhythm beats exposition about fragmentation. **Spice 4** with gun violence: integrated or isolated scenes?

Vitale readers: psychology versus metaphor—where did the book land? Your body knows before your rating does.
""",
"never": """
Crime atmosphere inhales—thriller pace with **spice 4** romantic release valves. Co-authored voice unity matters in suspicion-to-trust turns. Never as dare: threshold language.

Where did your pulse speed up? Reader response is craft feedback too.
""",
"i-just-want-to-be-yours": """
Garvin music-as-feeling: does performance carry romance or decorate it? **Spice 3** ETL—feud softening believable? Companion read pairing optional but revealing.

Enemies until the chord changes—we've wanted inconvenient people. Garvin makes that embarrassing; good.
""",
"just-dont-call-me-yours": """
Ownership versus autonomy in title fight—**spice 3** heat should test refusal as spell. Compare companion: possession theme is sequel's knife.

Hot or red flag: book must know you know. Name success and failure points plainly.
""",
"the-blood-we-crave-part-two": """
Part Two serial—escalation or repetition? **Spice 4** bullying power imbalance across parts: consequence tracked? Hollow Boys faithful: bring Part One memory.

Blood crave as hunger naming you—mystic covenant read without spoiler need.
""",
"the-duke-and-i": """
Regency **spice 3** modest versus modern dark romance—adjust expectations first. Quinn constraint dialogue is craft lesson; consent conversation aged—discuss without pretending we're in 2026 on page.

Shelf adjacency debate welcome—core or classic neighbor?
""",
"the-final-score": """
Moore forbidden sports—public glory, private trespass. **Spice 3** taboo friction; field deepen or decorate? Dual POV keeps trespass legible.

Split life mystic read—scoreboard versus secret game. Moore again yes/no?
""",
"the-lawless-god": """
Captivity **spice 5**—Stockholm on label, psychology authored or glamorized? King intensity literal on blood and manipulation warnings.

Your line in plain speech helps the next reader more than stars—say it in discussion.
""",
"the-murder-of-roger-ackroyd": """
Christie trust architecture—**spice 1** craft study. Revelation rewires reading; re-read is different book. Why beside dark romance: forbidden knowledge nerve.

Steal one craft move for your own reading life—name it.
""",
"the-newspaper-nanny": """
Nanny taboo **spice 3**—proximity ethics on page? Moore domestic forbidden: headline unprinted—silence as binding.

Uncomfortable versus authored—both can be true; which dominated?
""",
"the-once-and-future-king": """
White epic **spice 2**—emotional intensity without modern heat frequency. Arthurian myth as romance with cost. Tonal range craft lesson.

Romantasy shelf stretch or home—defend without comps.
""",
"the-ritual-of-bone": """
JLA primal **spice 3**—banter plus threat engine. Dark magic and violence integrated. Series page appetite honest upfront.

Blood remembers—body knowledge before plot confirms. Commit or sample?
""",
"the-shades-of-magic": """
Schwab color worlds—**spice 3** lighter for dark romance purists; gothic through dread. Travel trespass mystic read.

Which London stayed in your body—one image enough for poetry link later.
""",
"the-vegas-rule": """
Archer **spice 4** ETL Vegas threshold—neon as rewrite room. Heartbreak rule theme pay off?

Banter pace your mileage; enemies and heat earned separately—grade both.
""",
"villain": """
Pierce **spice 4** antihero mafia—villain era aesthetic versus identity. Death imagery literal; organized crime on page.

Stop apologizing for wrong want—or aesthetic only? Room split is the point.
""",
}

def main():
    for slug, text in INSERT2.items():
        path = ROOT / f"{slug}.md"
        content = path.read_text()
        if MARKER not in content:
            print(f"SKIP {slug}")
            continue
        block = text.strip()
        if block in content:
            print(f"SKIP dup {slug}")
            continue
        content = content.replace(MARKER, block + "\n\n" + MARKER, 1)
        path.write_text(content)
        w = len(content.split('---',2)[2].split())
        print(f"OK {slug} -> {w} words")

if __name__ == "__main__":
    main()
