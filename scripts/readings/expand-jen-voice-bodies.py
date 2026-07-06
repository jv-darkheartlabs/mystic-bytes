#!/usr/bin/env python3
"""Insert expansion paragraphs into short Jen-voice reviews."""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[2] / "_readings"
MARKER = "## Discussion launchpad"
SKIP = {"passion", "breaking-hailey", "dance-of-a-burning-sea", "white-lines", "four"}

INSERT = {
"a-dark-fate": """
And you're in this with me—so tell the truth: did any king make you flinch before you wanted him? That's the RH test. Peckham and Valenti earn loyalty when the court politics feel like emotional chess, not chess with bodies as pieces. Dialogue under pressure separates the attachments; watch who speaks possession versus who speaks permission.

I read mystic-bytes with mystic eyes: the zodiac here isn't horoscope fluff—it's fate as grammar you can rebel against. Elise's vengeance reads as ritual reclamation. My body stayed engaged when **spice 4** followed a power shift I could diagram, not when heat arrived as reward for page count alone.
""",
"a-heart-of-secrets-and-shadows": """
You're still here—good. Beswick and Clare ask you to sit in almost-confession, and that sitting is the romance. Dual POV works when each secret refracts the other lover differently; watch for that refraction instead of treating secrets as delay tactics only.

**Spice 3** can feel like restraint until you realize the book is foreplay for trust. Fantasy violence on the label is real; emotional intensity more so. I felt the threshold imagery in my throat—the breath before a door opens. Poetry will get the raw version of that feeling later; this review is the curated hand.
""",
"a-savage-fae": """
Stay with me. **Spice 5** is not a badge—it's a contract. If you finished hungry for more murder and more heat in the same scene, the book did its job. If you finished numb, say so in the room; that's data too.

Peckham and Valenti's savage register works when beauty never sanitizes violence. The fae aesthetic is thorn, not glitter. I tracked my own complicity as reader—rooting while flinching—and that's the genre-insider bargain this shelf asks you to name out loud.
""",
"a-war-of-fae-and-fate": """
You opted into war + RH—you don't get to pretend surprise when both show up on the same page. Watch POV during battle aftermath: who softens, who weaponizes tenderness, who disappears. That's where Peckham and Valenti prove differentiation.

Warrior framing invites mystic read as initiation through conflict—the self forged in fire rather than born ready. **Spice 4** after adrenaline converts to attachment is a craft choice I respect when the book lets the heroine strategize, not only react.
""",
"altair-university": """
Fourth wall moment: bully romance only works if you feel the protagonist's want and shame in the same breath. Vant's campus claustrophobia is the point—nowhere to perform neutrality. Secrets on the warning label pay off when revelation changes power, not only plot.

Dark academia here is mood plus institution: grades as currency, reputation as blade. **Spice 4** with bullying requires consequence on page; track whether Vant delivers or only teases. I stayed when rivalry hurt my chest, not when it performed cruelty for sport.
""",
"altair-university-2": """
Winter isn't wallpaper—it's isolation you can feel in your fingers. Vant uses cold to slow time, which bully romance needs; heat against frost lands when power dynamics stay legible. You, continuing the series: compare Book One rivalry to Book Two bleakness—same wound, different weather.

Emotional intensity warning is the honest one. I read threshold language in the snow: the self hibernating with desire it won't name. Tell the room if isolation deepened the trope for you or felt like repetition with icicles.
""",
"bewitched": """
Thalassa asks what magic costs, and **spice 4** is part of the invoice—not a separate receipt. Book One patience is real; reward is the slow turn when power answers back with personality. You browsing: know you're investing in series architecture.

Enchantment as mystic read: the spell as covenant written on the body. I felt response when the book stopped explaining magic and started showing appetite for rules broken. That's when dark romance and romantasy shake hands without apologizing.
""",
"dare-series-collection": """
Collection read is marathon, not sprint—hydrate. Tessier's bully world punishes binge with repetition if you're not tracking character obsession arcs across volumes. **Spice 5** sustained asks whether your tolerance is scene-by-scene or narrative-wide.

You know if you're her reader. I won't hype. I'll say: the collection rewards those who want escalation of complicity—watching yourself root for the wrong closeness and naming that choice like an adult.
""",
"deadly-throne": """
Mellow's music metaphor either sings for you or it doesn't—no middle. When it sings, **spice 4** feels like crescendo; when it doesn't, track whether court plot still carries you. I listened for rhythm in sentence length; that's craft you can feel without naming a comp.

Throne as altar, symphony as binding—mystic read without leaving the secular page. You in the room: did your body sync to the prose tempo anywhere? That's reader response as valid as star rating.
""",
"forever-rains": """
Rain as character is commitment. Mellow asks you to read mood as plot—and for some of you, that's heaven; for others, slow. **Spice 4** after emotional saturation is the design; if you wanted faster heat, name it.

I felt forever rain in my bones on good pages—the kind of atmospheric romance that poetry later steals one image from. One image. That's enough for the collective voice to stay linked across sections of the site.
""",
"fragile-allegiance": """
Reilly writes institution first, romance second—which is why mafia romance readers stay. Betrayal on the label must fracture trust you believed; watch whether fragile longing is character truth or plot lever. **Spice 4** after rupture is the mafia contract.

You're in the room: would you forgive at the pace the book asks? Mystic read—allegiance as vow spoken in blood, longing as heresy whispered anyway.
""",
"house-of-earth-and-blood": """
Maas asks for pages before full payoff—you either accept or you don't. Bryce's grief is engine; **spice 3** late is architecture. You browsing a 900-page appetite: know what you're buying.

City as living organism—mystic read without leaving urban fantasy. I felt the book when grief turned kinetic, not when lore repeated. literary analysis question: does Crescent City belong on your dark romance shelf, or adjacent? Your answer matters for how we tag our collective taste.
""",
"john-dies-at-the-end": """
Not everyone's dark romance—say that plainly. Wong's craft is voice under existential rot. **Spice 2** minimal; friendship and unreality carry charge. You stayed for weird; honor that.

Apocalypse as punchline that might be true—threshold humor. I respect the book when horror stops winking long enough to land. Tell the room if you shelve it here for craft study or for vibe alone.
""",
"part-of-you": """
Grey makes you feel watched—good. Forbidden love at **spice 3** is tension architecture; image motif must do work or it's gimmick. Track what's cropped out of the frame narratively; that's where taboo lives.

Photograph as spell fixing forbidden time—mystic read. You: where did guilt become heat for you, if it did? No spoilers needed; feeling is enough.
""",
"peace-honey": """
Raeta Book Two—series readers, bring receipts. Mythic romance at **spice 3** trades explicit frequency for power imbalance divine and human. Betrayal must taste like honey turned—sweet then wrong.

Immortal hunger, mortal consequence—I felt that in the alternating POV when scales of want didn't match. Poetry section will get the myth raw; here I curate: does Book Two widen Immortal Truths or repeat Book One in prettier robes?
""",
"pine-poison": """
Gilded Lies Book Two—poison as truth serum metaphor. Kidnapping on the label: serious. **Spice 3** after emotional toxin accumulates is pacing, not delay.

You in the room: compare Pits & Poison to Peaches & Honey in Raeta's voice—same author, different series knife. Which cut deeper? That's taste mapping for the archive.
""",
"pray-for-us": """
**Spice 5** + cult horror—opt-in repeated. Doyle's claustrophobia is craft; graphic content must feel authored, not stacked. Scream as prayer is mystic read without redeeming the cult.

I won't perform shock. I'll ask: did your body want to leave the page and couldn't? That's horror-romance working. Name where glamorization threatened—and where the book corrected course.
""",
"sinners-absolve": """
Book Five—series debt is real. Sketcher pays interest in callbacks and rupture. **Spice 4** at this depth assumes you care about pairings already; newcomers, start elsewhere.

Absolution as performance—sin as identity worn until it fits. You: tired or earned? Honest answers only. That's club energy.
""",
"sins-of-the-past": """
Reilly and betrayal again—comfort or formula for you? Past as lock picked slowly. **Spice 4** with emotional trauma on label requires consequence, not decoration.

Bound by history—mystic read. Would you forgive at this pace? Your no is as useful as your yes for the room.
""",
"take-me-apart": """
Alepou and Snow—co-author unity matters in POV handoffs. Disassembly theme should live in structure, not only title. **Spice 4** with gun violence on label: integrate or isolate?

Vitale energy readers: tell me if dismantling read as psychology or metaphor only. I felt best when identity fracture showed in dialogue rhythm, not exposition.
""",
"never": """
Thriller romance lives on breath held. Alepou and Snow at **spice 4** with crime themes—track whether love accelerates or slows investigation believably. Co-authored voice: seamless for you?

Never as dare—mystic threshold. Police tape atmosphere is mood you inhale. Where did your body speed up? That's response worth naming.
""",
"i-just-want-to-be-yours": """
Garvin writes music as feeling—**spice 3** ETL for readers who want feud-to-softening without scalding heat. You: did the song metaphor carry romance or decorate it?

Enemies until the chord changes—fourth wall: we've all wanted someone we shouldn't. Garvin makes that embarrassing and true. Pair with the companion when you're ready; taste the possession fight in the sequel.
""",
"just-dont-call-me-yours": """
Don't call me yours—title fight is theme. **Spice 3**, ownership versus autonomy. Garvin parallels companion read; differentiation is refusal as spell.

You in the room: hot or red flag? The book's job is to know you know. Name where it succeeded.
""",
"the-blood-we-crave-part-two": """
Serial Part Two—Jay assumes Part One grief. **Spice 4** + bullying + power imbalance: track consequence across parts. Crave as hunger that names you.

Hollow Boys readers: did Part Two escalate or repeat? Blood as covenant—mystic read. Your binge plan matters for this shelf.
""",
"the-duke-and-i": """
Regency **spice 3** is modest by dark romance measure—adjust expectations. Quinn's craft is constraint dialogue; darkness lives in reputation and consent conversation aged by time.

Propriety as armor—threshold between public self and private want. literary analysis shelf question: adjacent or core? Your vote shapes how we discuss classics here.
""",
"the-final-score": """
Moore's forbidden sports romance—**spice 3**, taboo in public glory. Dual perspective keeps trespass legible. You: did the field deepen forbidden or decorate?

Scoreboard sees one game—mystic read of split life. Tell the room if you'd read Moore again; that's archive curation in human form.
""",
"the-lawless-god": """
King's captivity at **spice 5**—Stockholm on the label means read with eyes open. Psychology must feel authored; glamorization is failure mode. Lawless god as dark baptism—mystic read without absolution promised.

You: where's your line? Say it plain. That helps the next reader more than stars.
""",
"the-murder-of-roger-ackroyd": """
Christie as craft masterclass on trust—**spice 1**, no romance heat, all revelation architecture. Why it's here: deception as domestic shadow, same nerve as dark romance's forbidden knowledge.

Poirot as lens—reader as accomplice until last page. Re-read knowing ending? Different book. Tell the room what you stole for your own reading life.
""",
"the-newspaper-nanny": """
Moore again—nanny taboo at **spice 3**. Proximity romance requires ethics framing on page. Headline is what you don't print—mystic read of silence as binding.

You: uncomfortable or authored? Both can be true. Name which dominated for you.
""",
"the-once-and-future-king": """
White's epic **spice 2**—Arthurian emotional intensity without modern heat frequency. Legend as romance with body count. Tonal range is craft lesson.

Sword as threshold—child to king. literary analysis: romantasy shelf as stretch or home? Defend your shelf.
""",
"the-ritual-of-bone": """
JLA primal scale—**spice 3**, violence and dark magic integrated. Banter plus threat is her engine. Blood remembers—mystic read literal and figurative.

Series commit question honest. You browsing: know page appetite before you start.
""",
"the-shades-of-magic": """
Schwab's color worlds—atmosphere as craft. **Spice 3** lighter for dark romance purists; gothic tag earns through dread and death imagery. Travel as trespass—mystic read.

Which London stayed in your body? One image is enough for poetry cross-link later.
""",
"the-vegas-rule": """
Archer ETL at **spice 4**—Vegas neon as threshold. Heartbreak rule as theme: did title pay off or tease?

Banter-forward pace—your mileage. You: enemies believable? Heat earned? Say both aloud in the room.
""",
"villain": """
Pierce villain-era mafia—**spice 4**, antihero appetite. Organized crime and death imagery literal. Villain as mirror—mystic read without moral sermon.

You chose this shelf. Did the book make you stop apologizing for wanting the wrong one—or did it feel aesthetic only? Honest split expected.
""",
}

def main():
    for slug, text in INSERT.items():
        path = ROOT / f"{slug}.md"
        content = path.read_text()
        if MARKER not in content:
            print(f"SKIP no marker {slug}")
            continue
        if text.strip() in content:
            print(f"SKIP already {slug}")
            continue
        content = content.replace(MARKER, text.strip() + "\n\n" + MARKER, 1)
        path.write_text(content)
        print(f"OK {slug}")

if __name__ == "__main__":
    main()
