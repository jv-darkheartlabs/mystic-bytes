#!/usr/bin/env python3
"""Final polish: replace review bodies for short readings with clean Jen-voice prose."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "_readings"

def apply(slug, body):
    path = ROOT / f"{slug}.md"
    text = path.read_text()
    fm = text.split("---", 2)[1]
    path.write_text(f"---{fm}---\n\n{body.strip()}\n")

BODIES = {}

def b(slug, content):
    BODIES[slug] = content

b("the-vegas-rule", """
## Hook & thesis

You don't come to Las Vegas to play safe—and Stephanie Archer's *The Heartbreak Rule* knows it. Enemies-to-lovers at **spice 4**, theater lights and neon heat, rivalry that breaks hearts on purpose before it mends them. I picked this for the archive because the title promises a rule you will violate by page sixty. You came for banter and burn. Stay for the moment the feud stops performing and starts confessing.

> Every rule is a dare with better lighting.

## The contextual pivot

*The Heartbreak Rule* sits on the enemies-to-lovers shelf with **spice 4** and a Vegas setting that functions as threshold—what happens under neon rewrites you until morning. No content warnings listed; the trope is the contract: rivalry, public friction, private want. You browsing: expect rom-com pace with dark romance heat spikes. Us in the Orchid Room: did the heartbreak *rule* pay off as theme, or does the title tease more than the book delivers?

## Deep-dive critique

Archer writes banter-forward ETL—the feud must be funny before it hurts, or the later softening won't land. Dual POV keeps both sides of the grudge legible; dialogue carries most of the romantic lift, which works when lines crackle and sags when they repeat the same insult loop. **Spice 4** arrives as escalation, not garnish; track whether heat follows emotional admission or merely schedule.

Vegas isn't postcard backdrop here—it's pressure cooker. Reputation, spectacle, the performance of not caring while caring eats you alive. Mystic read: neon as rewrite room, the city as place where ordinary rules suspend until dawn. I felt the book in my chest when the protagonist stopped winning arguments and started risking truth.

Craft-wise, pacing is rom-com brisk; if you need slow literary build, adjust expectations. Theme, craft, response braided: I stayed when enemies felt like two people protecting the same wound from different angles. When the middle repeated beats, I named it and kept going—ETL lives on delay, but delay needs variation.

Poetry later gets the uncut image; here I curate. Evergreen means no hype—just whether Archer's rule broke you the way you hoped.

## Discussion launchpad

Grade the feud and the heat separately—then tell the room why.

**Questions for the room:**
- **Spice 4**—earned in ETL, or stacked too fast?
- Vegas essential, or interchangeable setting?
- Heartbreak *rule*—theme landed or title bait?
- Prompt: "Heartbreak rule tasted like ___."
- Would you read Archer again on strength of this one?

#TheOrchidRoom #TheHeartbreakRule #StephanieArcher #EnemiesToLovers #DarkRomance
""")

b("i-just-want-to-be-yours", """
## Hook & thesis

Heather Garvin's *I Just Want to Be Yours* is enemies-to-lovers with music wired into the romance—**spice 3**, feud first, chord change later. You came for the moment hate learns harmony. I came because Garvin treats sound like feeling, not decoration. If you want scalding heat, adjust expectations. If you want the slow flip when rivalry finally tells the truth, you're home.

> Enemies until the song says otherwise.

## The contextual pivot

Enemies-to-lovers, **spice 3**, music and performance as motif, dark romance undertone without full taboo stack. Garvin writes for readers who want emotional ETL—animosity that softens because two people stop performing indifference. You browsing: lower spice, higher feeling. Us: does the music carry the romance, or sit beside it?

## Deep-dive critique

Garvin maps animosity to melody—pacing follows rehearsal, stage, the body in performance. POV stays close enough to feel embarrassment when want surfaces; dialogue runs witty, then raw when the feud cracks. **Spice 3** follows trust thaw; heat as release after emotional honesty, not constant frequency.

The mystic read: music as binding spell, the note that unlocks what words guarded. I've wanted inconvenient people; Garvin makes that feel true without asking me to pretend it's healthy. Theme, craft, response—I stayed when the song metaphor changed how a scene *moved*, not only how it sounded in description.

Weak spots: middle repetition if the feud circles one argument; secondary characters sometimes exist to reflect the leads. Companion read *Just Don't Call Me Yours* deepens the possession fight—pair when ready.

Poetry gets the raw chorus later; this review curates. Evergreen prose, no hype—just whether the chord change earned your belief.

## Discussion launchpad

Sing it plain—did the music matter?

**Questions for the room:**
- Music essential to romance here, or aesthetic?
- **Spice 3**—enough heat for the arc?
- ETL believable at this pace?
- Prompt: "I just want sounded like ___."
- Read companion first, second, or skip?

#TheOrchidRoom #IJustWantToBeYours #HeatherGarvin #EnemiesToLovers #DarkRomance
""")

b("just-dont-call-me-yours", """
## Hook & thesis

*Just Don't Call Me Yours*—Garvin's companion strike—**spice 3**, enemies-to-lovers, and a title that fights possession out loud. You don't want to be owned. The book wants you to want anyway. That tension is the whole show. I read it as the sequel's argument: autonomy versus hunger, name versus need.

> Don't call me yours—but stay.

## The contextual pivot

Enemies-to-lovers companion energy: **spice 3**, music shelf continuity, ownership theme foregrounded. You: read after *I Just Want to Be Yours* or standalone? Us: where's the line between romantic heat and red flag—and does Garvin mark it clearly enough for genre insiders?

## Deep-dive critique

Garvin parallels rivalry with refusal—performance as armor, intimacy as risk. Prose stays performance-aware; **spice 3** tests whether surrender can coexist with naming your own name. Dialogue carries the possession debate better than exposition ever could.

Mystic read: name as binding, refusal as spell. The body saying yes while the mouth says don't label me—that split is the book's nerve. I felt response when Garvin let embarrassment live on page without curing it instantly.

Compared to the companion: less meet-cute feud, more who-gets-to-claim-whom. Craft-wise, pacing matches the first—if you liked the rhythm there, you'll slide in here. If the first felt thin, this won't magically deepen the world.

Evergreen check: trope named, consequence felt, no comp shopping. Poetry later holds the uncut want; here I curate your opt-in.

## Discussion launchpad

Hot or red flag—pick a side and defend it.

**Questions for the room:**
- Possession theme—romantic or warning?
- **Spice 3** vs. companion book?
- Which Garvin hooked you harder?
- Prompt: "Don't call me yours felt like ___."
- Read order you'd recommend to a friend?

#TheOrchidRoom #JustDontCallMeYours #HeatherGarvin #EnemiesToLovers #DarkRomance
""")

b("peace-honey", """
## Hook & thesis

*Peaches & Honey*—R. Raeta, Book Two of These Immortal Truths. Myth with teeth, **spice 3**, violence and betrayal on the label. You wanted divine power imbalance with room to breathe—not constant explicit frequency, but constant *consequence*. Raeta serves sweetness that sours on purpose. I'm still thinking about honey as offering and trap.

> Immortal hunger. Mortal consequence.

## The contextual pivot

Fantasy-romance / mythic retelling: **spice 3**, violence, betrayal. Immortal Truths Book Two—series readers bring Book One memory; newcomers tolerate some inherited lore. Hades-and-Persephone energy is the pitch without comp shopping. Us: does Raeta escalate or repeat in prettier robes?

## Deep-dive critique

Raeta alternates POV so god-scale hunger and mortal-scale hunger sound like different music—when that works, the book sings; when it doesn't, you feel the same beat twice. Pacing simmers; **spice 3** follows trust fracture, betrayal tasting sweet then wrong.

Prose lush without drowning—moderate lyric density, image in service of appetite. Mystic read: myth as eternal return, peaches as season that rots, honey as covenant you regret signing. Theme, craft, response braided when power imbalance feels embodied, not declared.

Book Two lift is the question. I felt widening when betrayal changed behavior, not only plot. Violence on the label punctuates—don't ignore it for pretty myth skin.

Poetry will carry the uncut myth later; reviews curate. Evergreen: no hype, name the trope, honor the warning.

## Discussion launchpad

Series readers—Book Two verdict, one sentence.

**Questions for the room:**
- Book Two lift—yes or stall?
- **Spice 3** for mythic imbalance—enough?
- Betrayal—earned or engineered?
- Prompt: "Peaches and honey tasted like ___."
- Continue Immortal Truths?

#TheOrchidRoom #PeachesAndHoney #RRaeta #FantasyRomance #Romantasy
""")

b("the-newspaper-nanny", """
## Hook & thesis

Maren Moore's *The Newspaper Nanny*—forbidden love, **spice 3**, taboo proximity in domestic space. You know this trope makes people nervous. Moore writes the nervousness as heat—the headline is what you don't print. I won't pretend the shelf is safe. I'll say whether Moore authors it with eyes open.

> The headline is what you don't print.

## The contextual pivot

Forbidden-love, nanny taboo, **spice 3**. Power imbalance social rather than criminal—still real, still requiring framing on page. You browsing: tolerance for domestic forbidden. Us: ethics marked clearly enough for dark fiction versus accidental glamorization?

## Deep-dive critique

Moore builds intimacy through daily proximity—glances, rules, the ache of almost. Pacing slow by design; **spice 3** follows emotional trespass more than explicit frequency. POV confessional when strongest—shame and want sharing breath.

Mystic read: the home as temple profaned gently, silence as binding. I tracked my own line: empathy versus endorsement. The book succeeds when consequence lives in the protagonist's body, not only in gossip risk.

Craft-wise, accessible prose; tension in what's unspoken. Weak if taboo feels aesthetic only—strong when Moore lets discomfort stay in the room with you.

Evergreen opt-in language: you chose the shelf. Name where Moore earned trust or lost it.

## Discussion launchpad

Say the uncomfortable thing plainly.

**Questions for the room:**
- Taboo—authored or uncomfortable?
- **Spice 3**—enough for forbidden friction?
- Power dynamics—named on page?
- Prompt: "Newspaper nanny tasted like ___."
- Pair with Moore's *The Final Score*?

#TheOrchidRoom #TheNewspaperNanny #MarenMoore #ForbiddenLove #DarkRomance
""")

b("the-final-score", """
## Hook & thesis

*The Final Score*—Maren Moore, forbidden love on the field, **spice 3**. Rules you break with your body before your mind catches up. Public glory, private trespass. You feel the stadium even when the scene is quiet. I read for the split life—the scoreboard versus the secret game.

> The scoreboard sees one game. You play two.

## The contextual pivot

Forbidden-love, sports setting, **spice 3**. Taboo attraction under visibility—every cheer a reminder of what you can't name. You: forbidden without high heat. Us: does the field deepen taboo or decorate it?

## Deep-dive critique

Moore uses arena pressure—crowds, reputation, the performance of normalcy. Dual POV when present keeps trespass legible from both sides; dialogue tension-forward. **Spice 3** integrates into admission scenes; heat as confession risk.

Mystic read: the field as sacred ground profaned by want. Theme, craft, response—I stayed when forbidden felt like choice under constraint, not accident without consequence.

Accessible prose; mid-length depth. If you need **spice 5**, adjust shelf. If you want forbidden that lives in glances and rules broken, Moore delivers.

Poetry gets the uncut image of split life later. Here: evergreen, no hype, name your threshold in discussion.

## Discussion launchpad

Two games, one heart—argue it out.

**Questions for the room:**
- Sports setting essential?
- **Spice 3**—enough heat?
- Forbidden ethics—clear?
- Prompt: "Final score sounded like ___."
- Moore on your re-read list?

#TheOrchidRoom #TheFinalScore #MarenMoore #ForbiddenLove #DarkRomance
""")

# part 2 — remaining short readings

b("a-war-of-fae-and-fate", """
## Hook & thesis

*Warrior Fae*—Peckham and Valenti, war in the title and in the bones. Reverse-harem fae politics, **spice 4**, violence and explicit content on the label. Four kings, battlefield loyalty, desire that doesn't cease fire. You opted into RH and war both. Good. Bring your appetite for agency under siege.

> Love as armament. Fate as something you swing back at.

## The contextual pivot

Reverse-harem fae romance: **spice 4**, violence, explicit sexual content. Warrior framing tests RH geometry under conflict—attachments must stay distinct when plot screams. Series continuity helps; newcomers expect lore. Us: war elevates or buries the harem?

## Deep-dive critique

Peckham and Valenti keep the heroine's tactical mind visible—desire isn't separate from survival. POV close; pacing surges with skirmish energy, slows for alliance and betrayal. **Spice 4** after power shifts must feel earned; note if you needed another chapter of mistrust.

Four attachments as four promises—track who reaches after conflict, who withholds, who weaponizes care. Mystic read: fate as battlefield, oaths as weapons. I felt the book when choice mattered more than coincidence.

Middle lore density can blur RH lines—series readers forgive, newcomers may drift. Evergreen: trope named, warnings honored, no comp shopping.

## Discussion launchpad

War + RH—did both get their due?

**Questions for the room:**
- Agency under war—convincing?
- **Spice 4** with action—balanced?
- Which king's promise cost most?
- Prompt: "Warrior felt like metal and ___."
- Series continue or pause?

#TheOrchidRoom #WarriorFae #CarolinePeckham #SusanneValenti #ReverseHarem #DarkRomance
""")

b("altair-university", """
## Hook & thesis

*Altair University: The Ruthless Rivalry*—Amber Vant, dark academia bully romance, **spice 4**. Campus as knife fight, desire wearing a letter jacket of contempt. You know the trope. The question is whether Vant earns your complicity—and whether rivalry hurts enough to matter.

> Rivalry as foreplay. The campus watches. So do you.

## The contextual pivot

Bully romance / dark academia: **spice 4**, bullying, rivalry, psychological intensity, secrets. Book One energy—establish hierarchy, poison want with competition. Circus undertone in tags adds uncanny pressure. Us: consent signaling—antagonism versus romance, marked clearly?

## Deep-dive critique

Vant builds claustrophobia through institution—grades, reputation, surveillance. POV immersion makes rivalry visceral; dialogue cuts when subtext carries shame. **Spice 4** with bullying requires consequence after cruelty, not only chemistry after insult.

Secrets escalate power when revelation reorders the room. Mystic read: university as maze, knowledge as weapon. I stayed when rivalry hurt my chest—not when it performed cruelty for sport.

Melodrama spikes occasionally—name them, keep reading if the arc holds. Evergreen opt-in: you chose bully shelf.

## Discussion launchpad

Defend your line on rivalry-to-romance.

**Questions for the room:**
- Rivalry earned or too fast?
- Dark academia essential?
- **Spice 4** + bullying—coherent?
- Prompt: "Altair tasted like winter and ___."
- Continue to *The Bleak Beginning*?

#TheOrchidRoom #AltairUniversity #TheRuthlessRivalry #AmberVant #BullyRomance #DarkAcademia
""")

b("altair-university-2", """
## Hook & thesis

Winter at Altair. Isolation on the warning label. *The Bleak Beginning* turns the screw—**spice 4**, bully romance in gothic academic cold that gets under your coat. Book One hooked you on rivalry; Book Two asks you to survive the bleak. I'm still in. Are you?

> Snow closes the exits. Desire doesn't.

## The contextual pivot

Bully romance continuation: **spice 4**, bullying, isolation, dark academia, emotional intensity, winter setting. Psychological pressure over fireworks. Us: isolation deepens trope or repeats Book One in frost?

## Deep-dive critique

Vant uses winter as craft—short days, long dread, campus as hibernation trap. Silence carries threat; **spice 4** against frost lands when power dynamics stay legible. Heat as thaw you mistrust—good when earned.

Mystic read: isolation as spiritual winter, desire the only warm room left. Theme, craft, response—I felt Book Two when shame and want shared a coat.

Pacing deliberate; some circles in introspection. Evergreen: name if bleakness elevated or fatigued you.

## Discussion launchpad

Winter book, hot room—go.

**Questions for the room:**
- Isolation change bully romance for you?
- Bleaker than Book One?
- **Spice 4** vs. winter—contrast work?
- Prompt: "Bleak sounded like ___."
- Trust Vant with Book Three?

#TheOrchidRoom #AltairUniversity #TheBleakBeginning #AmberVant #BullyRomance #DarkAcademia
""")

b("bewitched", """
## Hook & thesis

Laura Thalassa's *Bewitched Book One* asks what you'd trade for power that answers back—and whether the answer seduces or devours. **Spice 4**, fantasy-romance, emotional intensity real. Enchantment with teeth, not glitter. Book One patience is the contract.

> Magic with a price. Desire that invoices you later.

## The contextual pivot

Fantasy-romance: **spice 4**, sexual content, emotional intensity. Forbidden power, moral ambiguity, series Book One setup. You: slow uncanny burn tolerance. Us: allure versus cost—does Thalassa moralize or author darkness?

## Deep-dive critique

Thalassa writes magic as appetite—rules exist, breaking them feels bodily. POV keeps longing legible; prose shifts clear to lyric when spellcraft turns sensual. **Spice 4** as consequence of touched power, not scheduled reward.

Pacing setup-heavy—reward is slow turn when enchantment gains personality. Mystic read: spell as covenant, body as sigil. I stayed when cost preceded climax.

Evergreen: no hype. Poetry later steals one image; note yours in discussion.

## Discussion launchpad

Name the price you'd pay.

**Questions for the room:**
- Power vs. love—which leads?
- **Spice 4**—enchanted or ordinary?
- Book One patience—worth it?
- Prompt: "Bewitched smelled like ___."
- Continuing series?

#TheOrchidRoom #Bewitched #LauraThalassa #FantasyRomance #Romantasy
""")

b("dare-series-collection", """
## Hook & thesis

Shantel Tessier's *Dare* collection—bully romance at collection scale, **spice 5**, bullying, violence, obsession, mature content. You don't collect this by accident. Tessier writes elite cruelty and want like she expects you to have a safe word for fiction.

> Dare is a verb here. So is want.

## The contextual pivot

Bully romance series collection: **spice 5**, full warning stack. Multiple volumes, sustained voice, obsession arcs across books. You: binge tolerance and high heat across installments. Us: collection rewards or fatigues?

## Deep-dive critique

Tessier sustains atmosphere—privilege, power, desire in compressed spaces. **Spice 5** frequency is contract; integration with imbalance varies by volume but trend holds. Marathon reading can numb—track obsession arcs, not only scenes.

Mystic read: dare as initiation, humiliation as threshold. Dark humor optional; earnest appetite required. I won't hype—I'll ask if you admit why bully hooks you.

Evergreen opt-in repeated. Name consequence when it lands.

## Discussion launchpad

Collection readers—fatigue point?

**Questions for the room:**
- **Spice 5** sustainable across set?
- Bullying consequence—consistent?
- Peak volume for you?
- Prompt: "Dare felt like a door marked ___."
- New reader entry point?

#TheOrchidRoom #Dare #ShantelTessier #BullyRomance #DarkRomance
""")

b("deadly-throne", """
## Hook & thesis

E.J. Mellow's *Symphony for a Deadly Throne*—fantasy-romance with music in the crown, **spice 4**, emotional intensity on the label. You want romantasy that *sounds* like something. Mellow writes rhythm into power. I listened for the sentence that made my pulse sync.

> A throne that hums. A heart that answers off-key.

## The contextual pivot

Fantasy-romance: **spice 4**, sexual content, emotional intensity. Musical motif, deadly politics, royal romantic stakes. Us: symphony metaphor sustains or repeats?

## Deep-dive critique

Mellow binds music to power—cadence in prose, tension in set pieces. Close POV keeps peril intimate at court scale. **Spice 4** as movement in the score when metaphor clears.

Court exposition can stack—when clear, heat follows crescendo. Mystic read: rule as song, crown as instrument. Theme, craft, response—one image worth carrying to poetry later.

Evergreen craft note: tempo in sentences mirrors throne tension when it's working.

## Discussion launchpad

Did the music sync your pulse?

**Questions for the room:**
- Music essential?
- **Spice 4** with court plot?
- Where in Mellow's shelf?
- Prompt: "The throne sounded like ___."
- Re-read or recommend once?

#TheOrchidRoom #SymphonyForADeadlyThrone #EJMellow #FantasyRomance #Romantasy
""")

b("forever-rains", """
## Hook & thesis

*Song of the Forever Rain*—Mellow again, and the rain is a character. **Spice 4**, fantasy-romance, emotional intensity you inhale. Mood first, plot second—that's the contract. You either lean into atmospheric romance or you don't.

> Rain that doesn't stop. Want that won't either.

## The contextual pivot

Fantasy-romance: **spice 4**, sexual content, emotional intensity. Weather as emotional plot engine. Us: forever rain elevates or repeats?

## Deep-dive critique

Mellow's sensory register—wet stone, skin in storm—immerses when you read for atmosphere. **Spice 4** after saturation; frustration if you wanted event density sooner is valid data.

Mystic read: rain as cleansing and drowning, love as weather you can't outrun. Moderate lyric density—image serves feeling. One image for poetry cross-link: name it in discussion.

Evergreen: no trend slang. Body response counts.

## Discussion launchpad

Atmosphere vs. plot—which won?

**Questions for the room:**
- Rain metaphor—essential or heavy?
- **Spice 4** slow burn—earned?
- Prompt: "Forever rain tasted like ___."
- Skippable in Mellow catalog?
- One image that stayed?

#TheOrchidRoom #SongOfTheForeverRain #EJMellow #FantasyRomance #Romantasy
""")

b("fragile-allegiance", """
## Hook & thesis

Cora Reilly's *Fragile Longing*—mafia romance where loyalty frays, **spice 4**, organized crime, betrayal, violence, emotional intensity. Reilly's world bites. This one asks what happens when longing outlasts allegiance.

> Loyalty with hairline cracks. Desire presses the glass.

## The contextual pivot

Mafia romance: **spice 4**, betrayal arc, family institution as pressure. You: Reilly comfort or stretch? Us: fragility as depth or plot lever?

## Deep-dive critique

Reilly anchors emotion in family law—betrayal must cost trust you believed. **Spice 4** after rupture; repair pace matches your forgiveness appetite or doesn't. Dialogue sharp; violence warning literal.

Mystic read: vow in blood, longing as heresy whispered anyway. I stayed when fracture showed in voice before plot confirmed.

Evergreen mafia note: institution first, bedroom second—Reilly's map.

## Discussion launchpad

Would you forgive at this pace?

**Questions for the room:**
- Betrayal—earned?
- **Spice 4** + violence—coherent?
- Reilly formula—comfort or stale?
- Prompt: "Fragile sounded like ___."
- Standalone OK?

#TheOrchidRoom #FragileLonging #CoraReilly #MafiaRomance #DarkRomance
""")

b("house-of-earth-and-blood", """
## Hook & thesis

*Crescent City: House of Earth and Blood*—Sarah J. Maas opens a metropolis where grief, violence, and **spice 3** romance share the skyline. You don't need hype. You need to know if Bryce's rage anchors you through the long setup. I won't pretend it's short.

> A city that never sleeps because something is always hunting.

## The contextual pivot

Fantasy-romance / romantasy: **spice 3**, violence, grief, drug use. Urban fantasy scale, murder mystery engine, slow-burn architecture. Book One—series commitment implied. Us: grief-as-fuel and late **spice 3**—feature or friction?

## Deep-dive critique

Maas builds city as organism—politics, clubs, species—before romance pays full dividend. Bryce's fury readable; prose accessible at epic length. **Spice 3** arrives late—accept early or bounce.

Violence and grief warnings literal. Mystic read: city as living altar, hunt as misrecognized devotion. I felt ignition when grief turned kinetic.

Evergreen: no comp shopping. Orchid Room shelf debate welcome—core dark romance or epic neighbor?

## Discussion launchpad

Setup worth it—yes or no?

**Questions for the room:**
- Bryce—anchor or barrier?
- **Spice 3** placement—OK?
- City as character—landed?
- Prompt: "Crescent City smelled like ___."
- Book Two commit?

#TheOrchidRoom #HouseOfEarthAndBlood #SarahJMaas #CrescentCity #Romantasy
""")

b("john-dies-at-the-end", """
## Hook & thesis

*John Dies @ the End*—David Wong, **spice 2**, horror-comedy that eats certainty. Gore, drugs, paranormal chaos on the label. Not everyone's dark romance. Maybe yours anyway—for craft, for vibe, for the friend who narrates apocalypse like a tired bartender.

> The end is a punchline that might be true.

## The contextual pivot

Gothic-horror-romance placement: **spice 2**, horror, violence, drug use, paranormal, gore. Meta buddy weirdness, unreliability as engine. Us: romantic adjacency versus horror-first?

## Deep-dive critique

Wong's voice is the craft—irreverent, exhausted, conspiratorial. Structure chaotic by design; **spice 2** minimal. I respected pages where horror stopped winking long enough to hurt.

Mystic read: reality as veil, punchline as threshold. Evergreen weird—shelf honestly labeled.

## Discussion launchpad

Why is this here—for you?

**Questions for the room:**
- Horror or romance shelf?
- Unreliable narrator—feature or fight?
- Gore tolerance—stay or bail?
- Prompt: "John Dies tasted like ___."
- Recommend to DR friends?

#TheOrchidRoom #JohnDiesAtTheEnd #DavidWong #GothicHorror #DarkRomance
""")

b("never", """
## Hook & thesis

*Never Say Never*—Brea Alepou and Skyler Snow, dark thriller romance, **spice 4**, violence and crime atmosphere you inhale. Love beside the yellow line. The title is a dare. You know that.

> Never is a dare. You know that.

## The contextual pivot

Dark-thriller romance: **spice 4**, violence, crime themes, dark themes. Co-authored; suspicion and pull braided. Us: crime engine vs. emotional arc—who leads?

## Deep-dive critique

Dual author voice cohesive; POV supports dread and desire. Pacing thriller-forward; **spice 4** when adrenaline converts to intimacy. Prose gritty; warnings literal.

Mystic read: crime scene as altar of truth, attraction at the edge of knowing. Where did your pulse speed up—name it.

Evergreen co-author note: unity matters in tone handoffs.

## Discussion launchpad

Thriller or romance—pick primary.

**Questions for the room:**
- Which genre led?
- **Spice 4** in crime frame?
- Co-author seams?
- Prompt: "Never say never tasted like ___."
- Re-read value?

#TheOrchidRoom #NeverSayNever #BreaAlepou #SkylerSnow #DarkThriller #DarkRomance
""")

b("part-of-you", """
## Hook & thesis

Emma Grey's *Pictures of You*—forbidden love with a camera between you and truth, **spice 3**. You feel watched reading it. That's the point. Intimacy observed, desire that shouldn't be looked at twice.

> A frame around wanting. What's outside the shot?

## The contextual pivot

Forbidden-love: **spice 3**, observation and memory as motif. Taboo ethics require framing on page. Us: photographic device—essential or gimmick?

## Deep-dive critique

Grey uses image as POV grammar—cropped, withheld, confessed. **Spice 3** follows tension in what's not shown. Prose clear with lyric pockets.

Mystic read: photograph as spell fixing forbidden time. I tracked guilt becoming heat—where did your line live?

Evergreen taboo note: book must signal awareness; you mark success or slip.

## Discussion launchpad

What's outside the frame?

**Questions for the room:**
- Image motif essential?
- **Spice 3** enough?
- Forbidden line clear?
- Prompt: "Pictures of you looked like ___."
- Dark romance shelf fit?

#TheOrchidRoom #PicturesOfYou #EmmaGrey #ForbiddenLove #DarkRomance
""")

b("pine-poison", """
## Hook & thesis

*Pits & Poison*—R. Raeta, These Gilded Lies Book Two. Gold leaf on a cup that was never empty. **Spice 3**, murder, betrayal, kidnapping on the warnings. You don't sip—you swallow and wait for the burn.

> Gold leaf on a cup that was never empty.

## The contextual pivot

Fantasy-romance: **spice 3**, murder, betrayal, kidnapping. Gilded Lies series—courtly poison, romantic treachery. Us: poison metaphor sustains Book Two?

## Deep-dive critique

Raeta writes luxury as camouflage—prose polished, violence precise. **Spice 3** after emotional toxin; kidnapping warning serious. POV keeps complicity close.

Mystic read: poison as truth serum, gilding as chosen lie. Compare to Immortal Truths if you've read both Raeta lines—which cut deeper?

Evergreen series honesty: Book Two lift or stall?

## Discussion launchpad

Poison or honey—which Raeta voice?

**Questions for the room:**
- **Spice 3** + kidnapping on label?
- Murder integrated?
- Prompt: "Pits and poison smelled like ___."
- Continue Gilded Lies?
- Book Two vs. Book One?

#TheOrchidRoom #PitsAndPoison #RRaeta #FantasyRomance #Romantasy
""")

b("pray-for-us", """
## Hook & thesis

Molly Doyle's *Scream For Us*—Order of the Unseen, **spice 5**, cult themes, obsession, graphic content, death imagery. Gothic-horror romance that doesn't ask permission. Read warnings first. I mean it.

> Faith twisted until it sounds like desire.

## The contextual pivot

Gothic-horror-romance: **spice 5**, cult, violence, obsession, graphic content. Religious dread + fixation. Us: authored dark fiction vs. shock stack?

## Deep-dive critique

Doyle builds claustrophobia—ritual, hierarchy, unseen order. **Spice 5** braided with psychological coercion; dread over jump scares. POV immersive.

Mystic read: cult as corrupted covenant, scream as prayer. I won't perform shock—did your body want exit and couldn't?

Evergreen opt-in repeated. Name glamorization risk if felt.

## Discussion launchpad

Heavy shelf—plain speech.

**Questions for the room:**
- Cult + romance coherent?
- **Spice 5** sustainable?
- Graphic content earned?
- Prompt: "Scream sounded like the color ___."
- Continue Order of the Unseen?

#TheOrchidRoom #ScreamForUs #MollyDoyle #GothicHorror #DarkRomance
""")

b("sinners-absolve", """
## Hook & thesis

*Sinners Absolute*—Somme Sketcher, Sinners Anonymous Book Five, **spice 4**, redemption questioned, organized crime, violence. Five books of sin—one invoice still open. You're deep or you're climbing. Sketcher writes absolution like a con.

> Five books of sin. One invoice still open.

## The contextual pivot

Forbidden-love series: **spice 4**, dark themes, redemption, crime. Book Five payoff architecture. Us: late-series heat and morality—fresh or tired?

## Deep-dive critique

Sketcher trades ensemble memory—callbacks, rupture, reunion. **Spice 4** assumes pairing investment. Pacing series-stable.

Mystic read: absolution as performance, sin as identity worn until it fits. New readers: ask start volume in discussion.

Evergreen series note: honesty about entry point helps the archive.

## Discussion launchpad

Book Five—worth the climb?

**Questions for the room:**
- Payoff earned?
- Redemption tired or fresh?
- **Spice 4** at depth?
- Prompt: "Sinners absolute felt like ___."
- Where to start series?

#TheOrchidRoom #SinnersAbsolute #SommeSketcher #ForbiddenLove #DarkRomance
""")

b("sins-of-the-past", """
## Hook & thesis

Cora Reilly's *Bound By The Past*—betrayal in the dek, **spice 4**, organized crime, emotional trauma, violence. Mafia romance where history is the weapon, not the prologue.

> The past doesn't knock. It picks the lock.

## The contextual pivot

Mafia romance: **spice 4**, betrayal, trauma, violence. Past-debt trope under family law. Us: bind feels inevitable or manufactured?

## Deep-dive critique

Reilly institutionalizes emotion—betrayal costs trust structurally. **Spice 4** follows negotiation of repair. Trauma warning emotional, not decorative.

Mystic read: chain of history, forgiveness as link broken one at a time. Would you forgive at this pace—say yes or no plainly.

Evergreen Reilly map: comfort read or formula—both valid.

## Discussion launchpad

Forgiveness at this pace—buy it?

**Questions for the room:**
- Betrayal arc?
- **Spice 4** + trauma?
- Reilly comfort or stale?
- Prompt: "Bound by the past felt like metal and ___."
- Standalone OK?

#TheOrchidRoom #BoundByThePast #CoraReilly #MafiaRomance #DarkRomance
""")

b("take-me-apart", """
## Hook & thesis

Brea Alepou and Skyler Snow's *Take Me Apart*—mafia romance where disassembly is metaphor and method, **spice 4**, gun violence, organized crime, dark themes. Vitale energy. You came for dismantling. They deliver.

> Take me apart—but tell me who holds the pieces.

## The contextual pivot

Mafia-boss-and-innocent: **spice 4**, gun violence, organized crime, violence. Co-authored shifting POV. Us: unity and handoffs; psychology vs. metaphor only?

## Deep-dive critique

Alepou and Snow tessellate motives—prose sharp, dialogue weaponized. **Spice 4** in imbalance; disassembly in rhythm when dialogue fractures, not only exposition.

Mystic read: self as puzzle, violence as language learned or refused. Middle sag if beats repeat—name it.

Evergreen co-author craft: seamless for you or not?

## Discussion launchpad

Disassembly—earned or title only?

**Questions for the room:**
- Co-author seams?
- Metaphor vs. psychology?
- **Spice 4** + guns on label?
- Prompt: "Take me apart sounded like ___."
- Vitale continue?

#TheOrchidRoom #TakeMeApart #BreaAlepou #SkylerSnow #MafiaRomance #DarkRomance
""")

b("the-blood-we-crave-part-two", """
## Hook & thesis

Monty Jay's *The Blood We Crave* Part Two—bully romance serial, **spice 4**, bullying, power imbalance, emotional intensity. Part One grief assumed. Part Two asks for blood loyalty.

> Crave is a verb that doesn't apologize.

## The contextual pivot

Bully romance serial: **spice 4**, sexual content, emotional intensity, bullying, power imbalance. Hollow Boys continuity. Us: Part Two escalation or repetition?

## Deep-dive critique

Jay sustains hierarchy tension; POV intimate with cruelty adjacent to want. **Spice 4** follows power shifts; serial cliff energy.

Mystic read: blood as covenant, craving as hunger that names you. Track consequence across parts—does Jay deliver?

Evergreen serial note: entry point matters; say where you'd start a friend.

## Discussion launchpad

Part Two worth Part One?

**Questions for the room:**
- Escalation or repeat?
- **Spice 4** + bullying?
- Power imbalance marked?
- Prompt: "The blood we crave tasted like ___."
- Continue Hollow Boys?

#TheOrchidRoom #TheBloodWeCrave #MontyJay #BullyRomance #DarkRomance
""")

b("the-duke-and-i", """
## Hook & thesis

*The Duke & I*—Julia Quinn, Bridgerton, **spice 3**. Regency romance on our romantasy shelf because desire is its own magic—propriety as armor, cracks on purpose.

> Propriety as armor. Desire as the crack.

## The contextual pivot

Historical romance: **spice 3**, reputation and consent stakes, family politics. Cultural weight known. Us: darkness under polish—where does pain live?

## Deep-dive critique

Quinn's craft is constraint dialogue—pacing ballroom to bedroom. **Spice 3** modest vs. modern dark romance; emotional stakes carry. POV clear; prose accessible.

Mystic read: mask of the ton, truth in private threshold. Consent conversation aged—discuss without pretending we're on 2026 page.

Evergreen shelf debate: core or classic neighbor?

## Discussion launchpad

Dark romance shelf—fit?

**Questions for the room:**
- **Spice 3** enough?
- Consent read—how aged?
- Daphne/Simon—anchor?
- Prompt: "The duke and I smelled like ___."
- Curiosity satisfied?

#TheOrchidRoom #TheDukeAndI #JuliaQuinn #Bridgerton #Romantasy
""")

b("the-lawless-god", """
## Hook & thesis

Lola King's *Lawless God*—captor-and-captive, **spice 5**, kidnapping, Stockholm syndrome, violence, blood, manipulation, obsession. The dek doesn't whisper. Opt in like an adult. I won't coax.

> God is lawless here. So is want.

## The contextual pivot

Captor-and-captive: **spice 5**, full warning stack. Stockholm in marketing—psychology must feel authored. Us: fantasy versus endorsement—where's your line?

## Deep-dive critique

King claustrophobia—single-location pressure, attachment formation inside POV. **Spice 5** frequent, integrated with imbalance. Blood and violence literal.

Mystic read: captivity as dark baptism, god invented when there's no exit. Your plain-spoken line in discussion helps the next reader more than stars.

Evergreen taboo: say where book succeeded or failed framing.

## Discussion launchpad

Plain speech only.

**Questions for the room:**
- Stockholm authored?
- **Spice 5** sustainable?
- Line between fantasy and endorsement?
- Prompt: "Lawless god felt like ___."
- Captivity readers only?

#TheOrchidRoom #LawlessGod #LolaKing #CaptorAndCaptive #DarkRomance
""")

b("the-murder-of-roger-ackroyd", """
## Hook & thesis

Agatha Christie's *The Murder of Ackroyd*—**spice 1**, murder mystery craft. Not romance. On our shelf because revelation rewires trust—the knife in the narrative itself.

> The murder is not the only betrayal.

## The contextual pivot

Dark-thriller classic: **spice 1**, murder, death, violence. Detective fiction as masterclass. Us: why beside dark romance—forbidden knowledge nerve.

## Deep-dive critique

Christie's architecture is character—Poirot as lens, village closed system. Prose clean; **spice 1** romance absent; tension psychological.

Mystic read: truth as veil lifted once. Reader as accomplice until last page. Re-read knowing ending—is different book.

Evergreen craft theft: name one move you stole.

## Discussion launchpad

Shelf fit—for you?

**Questions for the room:**
- Narrator trust—when suspect?
- Craft lesson stolen?
- Prompt: "Ackroyd sounded like quiet and ___."
- Re-read knowing ending?
- Why here in Orchid Room?

#TheOrchidRoom #TheMurderOfAckroyd #AgathaChristie #DarkThriller
""")

b("the-once-and-future-king", """
## Hook & thesis

T.H. White's *The Once & Future King*—**spice 2**, Arthurian epic, fantasy violence and emotional intensity. Legend as romance with cost. Myth that hurts before it crowns.

> The future king is always a child first.

## The contextual pivot

Fantasy classic: **spice 2**, bildungsroman scale, chivalry and war. Romantasy shelf as stretch or home. Us: emotional threads within epic patience.

## Deep-dive critique

White tonal range—comedy to tragedy. Pacing episodic; **spice 2** romantic threads subtle by modern measure. Prose humane, sharp.

Mystic read: sword as threshold, Merlin as guide through veils. Full cycle commitment honest upfront.

Evergreen epic note: patience is contract.

## Discussion launchpad

Romantasy shelf—fit?

**Questions for the room:**
- Emotional peak?
- **Spice 2** misplaced expectation?
- Prompt: "Once and future felt like mist and ___."
- Full cycle worth it?
- Arthur or Merlin—anchor?

#TheOrchidRoom #TheOnceAndFutureKing #THWhite #FantasyRomance
""")

b("the-ritual-of-bone", """
## Hook & thesis

Jennifer L. Armentrout's *The Primal of Blood and Bone*—**spice 3**, violence, dark magic. Primal in the title means appetite with world scale. JLA readers know the banter-threat engine.

> Blood remembers. Bone answers.

## The contextual pivot

Fantasy-romance: **spice 3**, violence, dark magic. Primal series energy, bond tension, epic stakes. Us: primal theme craft or marketing?

## Deep-dive critique

Armentrout banter plus threat—heroine-forward POV. **Spice 3** in bond negotiation; magic serves romance pressure.

Mystic read: body remembering what mind denies. Series page appetite—commit or sample honestly.

Evergreen JLA note: voice familiarity is feature for fans.

## Discussion launchpad

Primal theme essential?

**Questions for the room:**
- **Spice 3** for JLA fans?
- Dark magic integrated?
- Prompt: "Blood and bone tasted like ___."
- Series commit?
- Banter—carry or tire?

#TheOrchidRoom #ThePrimalOfBloodAndBone #JenniferLArmentrout #Romantasy
""")

b("the-shades-of-magic", """
## Hook & thesis

V.E. Schwab's *A Darker Shade of Magic*—**spice 3**, death imagery, gothic atmosphere. Multiple Londons, travel as trespass. Portal fantasy with blood in the grout.

> Magic has a color. So does hunger.

## The contextual pivot

Gothic-horror-romance adjacency: **spice 3**, death imagery, atmospheric dread. Found family, parallel worlds. Us: romantic thread vs. adventure lead.

## Deep-dive critique

Schwab world-color prose—vivid, adventure-forward. Multi POV; **spice 3** lighter for dark romance purists. Atmosphere earns gothic tag.

Mystic read: London as veils, travel as profane crossing. Which London stayed in your body—one image enough for poetry link.

Evergreen adventure note: adjust heat expectations.

## Discussion launchpad

Gothic shelf fit?

**Questions for the room:**
- **Spice 3** match expectation?
- Favorite London?
- Prompt: "Darker shade smelled like ___."
- Trilogy continue?
- Adventure or romance led?

#TheOrchidRoom #ADarkerShadeOfMagic #VESchwab #GothicHorror #DarkRomance
""")

b("villain", """
## Hook & thesis

Luna Pierce's *Villain Era*—dark mafia romance, **spice 4**, organized crime, violence, death imagery. You chose the villain shelf. Pierce writes like morality is a suggestion you already rejected.

> Villain era means you stop apologizing for wanting the wrong one.

## The contextual pivot

Mafia-boss-and-innocent: **spice 4**, crime, violence, death imagery, dark themes. Antihero appetite. Us: villainy identity vs. aesthetic?

## Deep-dive critique

Pierce sustains threat—danger adjacent to heat. **Spice 4** integrated; violence literal. POV contemporary pace, thriller-romance rhythm.

Mystic read: villain as mirror—you see denied want. Stop apologizing—or aesthetic only? Room split is point.

Evergreen antihero note: opt-in without sermon.

## Discussion launchpad

Villain era—earned title?

**Questions for the room:**
- **Spice 4** + crime violence?
- Antihero compelling or thin?
- Prompt: "Villain era sounded like ___."
- Pierce continue?
- Mirror or mask?

#TheOrchidRoom #VillainEra #LunaPierce #MafiaRomance #DarkRomance
""")

def main():
    for slug, body in BODIES.items():
        apply(slug, body)
        print(f"OK {slug}")

if __name__ == "__main__":
    main()
