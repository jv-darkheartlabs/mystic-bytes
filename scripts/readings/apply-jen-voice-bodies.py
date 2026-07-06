#!/usr/bin/env python3
"""Apply Jen voice review bodies; preserve frontmatter."""
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2] / "_readings"

BODIES = {}

def body(slug, text):
    BODIES[slug] = text.strip() + "\n"

# --- Batch 1: Peckham RH + Altair + Thalassa ---

body("a-dark-fate", """
## Hook & thesis

You came for fae courts, four kings, and a heroine who refuses to kneel. *Dark Fae* delivers reverse-harem darkness with zodiac bite and Ruthless Boys energy—Peckham and Valenti know this shelf, and they write like they expect you to know it too. If polyamory, bullying, and violence are on your no list, walk now. If not… welcome to the court.

> Four thrones. One woman who remembers every slight. Vengeance wears a crown here.

## The contextual pivot

*Dark Fae* sits in reverse-harem dark romance: **spice 4**, warnings for bullying, violence, and polyamory as structure—not surprise. Peckham and Valenti build Elise's arc through power, retribution, and magnetic entanglement with four kings who each offer a different flavor of danger. You, browsing: RH with fae politics and emotional geometry. Us: whether the four attachments stay distinct under **spice 4** pressure, and whether the bullying frame reads as authored conflict or gratuitous cruelty.

## Deep-dive critique

RH lives or dies on differentiation. Peckham and Valenti assign emotional promises to each king—possession, challenge, tenderness weaponized, loyalty tested—so the geometry stays readable even when the court politics thicken. Close POV keeps Elise's agency central; she's not a passive prize passed between thrones.

Pacing alternates court intrigue and intimate escalation. Prose is efficient with occasional lyric flare when the fae aesthetic demands ornament. Violence and bullying warnings are integral to the power map—this is not soft fantasy with RH window dressing.

Mystic read: the court as labyrinth. Oaths and zodiac as fate-grammar. Desire as strategy and surrender both. Theme, craft, response—I felt the book strongest when Elise's choices cost her something visible, not when the court bowed to plot convenience.

Weak spots: middle density when lore stacks; occasional RH blur if you're not tracking who promised what. Still—if you're in the Ruthless Boys orbit, this is the contract you signed.

## Discussion launchpad

RH jury—tell the room which king blurred and which stayed sharp.

**Questions for the room:**
- Does Elise keep agency in the court, or do the kings define every move?
- Bullying as power map: authored or excessive for you?
- **Spice 4**—distributed or concentrated?
- Finish: "Four crowns, one ___."
- Would you start the series here, or do you need Book One first?

#TheOrchidRoom #DarkFae #CarolinePeckham #SusanneValenti #ReverseHarem #DarkRomance
""")

body("a-heart-of-secrets-and-shadows", """
## Hook & thesis

Secrets are the real love interest in *A Heart of Secrets and Shadows*—Beswick and Cara Clare write fantasy-romance where every withheld truth tightens the room. You feel it in your chest before you name it: vulnerability traded for power, power traded back for touch. **Spice 3**. Emotional intensity real. Come if you want romantasy that lingers in the shadow between confession and consequence.

> Every secret opened is a door—and someone is always on the other side.

## The contextual pivot

Fantasy-romance / romantasy at **spice 3**, with fantasy violence and emotional intensity on the warning label. Beswick and Clare alternate perspectives to deepen motive and fear—dual POV as architecture, not decoration. You: expect layered romantic tension against supernatural stakes. Us: whether the secrets escalate trust or merely delay heat—and whether **spice 3** satisfies readers who want more explicit release.

## Deep-dive critique

Structure is the book's argument. Perspective shifts reveal what each lover hides and what hiding costs—pacing breathes in revelation, tightens in confrontation. Prose runs lyrical without drowning; imagery favors threshold and shadow: doorways, half-light, the moment before speech.

Characterization succeeds when vulnerability reads as choice under pressure, not helplessness. Dialogue carries subtext; the best exchanges say two things at once. Weaker stretches languish when backstory repeats emotional beats already shown.

Mystic read: love as unveiling ritual. Each secret a small death of the former self. Theme, craft, response braided—I stayed for the tension of almost-telling, the romance of risk.

## Discussion launchpad

Tell me which secret you would have kept—and why.

**Questions for the room:**
- Does dual POV deepen trust themes or split your investment?
- **Spice 3**—enough heat for the emotional stakes?
- Where did a secret feel earned versus manufactured?
- Prompt: "The shadow between us tasted like ___."
- Beswick & Clare—unified voice or seam-visible?

#TheOrchidRoom #AHeartOfSecretsAndShadows #APBeswick #CaraClare #Romantasy #DarkRomance
""")

body("a-savage-fae", """
## Hook & thesis

*Savage Fae* does not whisper. Peckham and Valenti turn the fae court feral—**spice 5**, murder on the warning label, violence and explicit content woven into revenge and desire. You opted in or you didn't. I'm not here to sanitize the shelf. I'm here to tell you the book commits to savage with a straight face.

> Beauty with teeth. Devotion that draws blood.

## The contextual pivot

Reverse-harem dark romance at **spice 5**: violence, explicit sexual content, murder. Ruthless Boys / fae politics / shared devotion as design problem. Warnings are premise. You: tolerance for high heat plus lethal stakes. Us: whether five-spice distribution serves four distinct attachments—or overwhelms differentiation.

## Deep-dive critique

Peckham and Valenti prioritize emotional geometry under pressure. RH fails when men blur; here, temperaments contrast even when the plot screams. Close third keeps the heroine's hunger and strategy legible—revenge and want braided, not sequenced as afterthought.

Prose accelerates in set pieces; reflective beats deepen grudges and loyalties. **Spice 5** integrates into power and peril—not isolated reward chapters. Murder and violence warnings: literal. Gothic fae aesthetic—thorn, crown, blood—serves mood without replacing psychology.

Mystic read: the court as altar of appetite. Loyalty as ritual with no safe priest. I felt response in my gut when the book let beauty stay dangerous through the last act.

Slips: redundancy when imagery repeats beat; middle lore density. For RH readers at this heat—feature, not bug.

## Discussion launchpad

High spice, high stakes—say the true thing.

**Questions for the room:**
- Which attachment stayed distinct at **spice 5**?
- Murder on-page: craft or shock for you?
- Does revenge sharpen or flatten romance?
- Prompt: "Savage felt like the color ___."
- Keeper for the shelf, or one-and-done?

#TheOrchidRoom #SavageFae #CarolinePeckham #SusanneValenti #ReverseHarem #DarkRomance
""")

body("a-war-of-fae-and-fate", """
## Hook & thesis

*Warrior Fae* puts war in the title and means it—Peckham and Valenti write RH where battle lines are emotional and literal. Four kings, fae politics, **spice 4**, violence and explicit content on the label. You're here because the court still calls. Good. Bring your appetite for agency under siege.

> Love as armament. Fate as something you swing back at.

## The contextual pivot

Reverse-harem fae romance: **spice 4**, violence and explicit sexual content. Warrior framing—strength tested, submission chosen or forced as trope text, loyalty under fire. Series continuity assumed for many readers; newcomers should expect inherited lore. Us: whether war elevates RH geometry or buries it in exposition.

## Deep-dive critique

Craft centers on conflict as intimacy's engine. POV keeps the heroine's tactical mind visible—desire isn't separate from survival. Pacing surges with skirmish energy, slows for alliance and betrayal. Four attachments must read as four promises; Peckham and Valenti differentiate through duty, danger, and devotion languages.

**Spice 4** lands when heat follows power shift—negotiation, truce, rupture. Weaker when battle reportage crowds character breath.

Mystic read: fate as battlefield. Oaths as weapons. The self that chooses which crown to bleed for. Theme, craft, response—I tracked who I trusted before the book confirmed it.

## Discussion launchpad

War + RH—did both get their due?

**Questions for the room:**
- Agency under war: convincing?
- **Spice 4** pacing with action—balanced?
- Which king's promise felt most costly?
- Prompt: "Warrior felt like metal and ___."
- Series momentum—continue or pause?

#TheOrchidRoom #WarriorFae #CarolinePeckham #SusanneValenti #ReverseHarem #DarkRomance
""")

body("altair-university", """
## Hook & thesis

Dark academia, bully romance, circus undertones, secrets that don't stay buried—*The Ruthless Rivalry* is Amber Vant asking you to want the person who makes campus feel like a knife fight. **Spice 4**. Bullying, rivalry, psychological intensity. You know the trope. The question is whether Vant earns your complicity.

> Rivalry as foreplay. The campus watches. So do you.

## The contextual pivot

Bully romance / dark academia: **spice 4**, warnings for bullying, rivalry, psychological intensity, secrets. Altair University Book One energy—establish hierarchy, poison desire with competition. You: opt-in to bully frame and **spice 4**. Us: consent signaling on page—does Vant mark the line between antagonism and romance clearly enough for the trope to feel authored?

## Deep-dive critique

Vant builds claustrophobia through institution—grades, reputation, social surveillance—as romance pressure cooker. POV immersion makes rivalry visceral; dialogue cuts. Pacing escalates as secrets surface; circus motif adds uncanny texture without leaving realism entirely.

**Spice 4** integrates into power imbalance the bully trope requires. Emotional intensity warning is real—you'll feel the protagonist's want and shame adjacent.

Mystic read: the university as maze. Knowledge as weapon. Desire misfiled under competition. Craft + theme + response: I stayed when the book let rivalry hurt, not just titillate.

Melodrama spikes occasionally—heightened lines when subtext already landed. Watch for that split.

## Discussion launchpad

Bully romance readers—defend your line.

**Questions for the room:**
- Rivalry to romance: earned or too fast?
- Dark academia atmosphere—essential or set dressing?
- **Spice 4** with bullying—coherent or uncomfortable?
- Prompt: "Altair tasted like winter and ___."
- Continue to *The Bleak Beginning*?

#TheOrchidRoom #AltairUniversity #TheRuthlessRivalry #AmberVant #BullyRomance #DarkAcademia
""")

body("altair-university-2", """
## Hook & thesis

Winter at Altair. Isolation on the warning label. *The Bleak Beginning* is Vant turning the screw—bully romance in a gothic academic cold that gets inside your coat. **Spice 4**. If Book One hooked you on rivalry, Book Two asks you to survive the bleak. I'm still in.

> Snow closes the exits. Desire doesn't.

## The contextual pivot

Bully romance continuation: **spice 4**, bullying, isolation, dark academia, emotional intensity, winter setting. Psychological pressure over plot fireworks. You: winter gothic + bully tolerance. Us: whether isolation deepens the trope or repeats Book One beats in frost.

## Deep-dive critique

Vant uses winter as craft—short days, long dread, campus as hibernation trap. First-person or close interiority (series voice) keeps shame and want adjacent. Pacing deliberate; emotional intensity warning earned in silence-heavy scenes.

**Spice 4** arrives as thaw—heat against cold—a structural contrast that works when power dynamics stay legible. Bullying frame: series contract; Vant's job is consequence on page.

Mystic read: isolation as spiritual winter. The self starved of witness. Threshold: door between who you were before Altair and who it makes you.

Weak: occasional drag when introspection circles; ending pressure if you need neat closure.

## Discussion launchpad

Winter book, hot room—go.

**Questions for the room:**
- Does isolation change bully romance for you?
- Bleaker than Book One, or same wine, new glass?
- **Spice 4** against winter—effective contrast?
- Prompt: "Bleak sounded like ___."
- Trust Vant with Book Three?

#TheOrchidRoom #AltairUniversity #TheBleakBeginning #AmberVant #BullyRomance #DarkAcademia
""")

body("bewitched", """
## Hook & thesis

Laura Thalassa's *Bewitched Book One* asks what you'd trade for power that answers back—and whether the answer seduces you or devours you. **Spice 4**. Fantasy-romance with emotional intensity that doesn't flinch. You came for enchantment with teeth. Thalassa doesn't file them down.

> Magic with a price. Desire that invoices you later.

## The contextual pivot

Fantasy-romance / romantasy: **spice 4**, sexual content and emotional intensity. Forbidden power, moral ambiguity, romance threaded through consequence. Book One—series rules still forming. You: heat plus enchantment ethics. Us: whether Thalassa balances allure and cost without moralizing the dark romance reader.

## Deep-dive critique

Thalassa writes magic as appetite—rules exist, breaking them feels bodily. POV keeps longing legible; prose shifts between clear scene work and lyric lift when spellcraft turns sensual. **Spice 4** integrates into power exchange with the supernatural, not as detour.

Pacing: setup-heavy Book One risk—world and curse before full romantic payoff. Patience rewarded if you like slow uncanny burn.

Mystic read: the spell as covenant. The body as sigil. Theme, craft, response—I felt cost before climax, which is how this book earns trust.

## Discussion launchpad

Enchantment readers—name the price you'd pay.

**Questions for the room:**
- Power vs. love: which leads for you here?
- **Spice 4**—enchanted or ordinary heat?
- Book One patience—worth it?
- Prompt: "Bewitched smelled like ___."
- Continuing the series?

#TheOrchidRoom #Bewitched #LauraThalassa #FantasyRomance #Romantasy
""")

# --- Batch 2 ---

body("dare-series-collection", """
## Hook & thesis

Shantel Tessier's *Dare* collection is bully romance at collection scale—**spice 5**, bullying, violence, obsession, mature content. You don't stumble into this. You collect it because the trope owns you. I'm not coaxing. I'm confirming: Tessier writes dark academia bully heat like she expects you to have a safe word for fiction.

> Dare is a verb here. So is want.

## The contextual pivot

Bully romance series collection: **spice 5**, warnings for bullying, violence, obsession, dark themes, mature content. Multiple books, sustained voice, escalating stakes across the set. You: high heat + bully tolerance across a long arc. Us: whether collection format rewards immersion or fatigues—pacing across volumes, consistency of consent framing.

## Deep-dive critique

Tessier's craft strength is sustained atmosphere—privilege, cruelty, desire in elite spaces. POV keeps complicity uncomfortable. **Spice 5** frequency is the contract; integration with power imbalance varies by installment but trend is consistent.

Collection read: emotional through-line matters more than any single plot beat—character obsession arcs, rivalry evolution. Mystic read: initiation through humiliation and want. The dare as threshold ritual.

Weak: repetition if binge-read; bully trope drift if framing slips installment to installment. Know your pacing.

## Discussion launchpad

Collection readers—how many dares before fatigue?

**Questions for the room:**
- **Spice 5** across volumes—sustainable?
- Bullying framed with enough consequence?
- Best single-book peak in the set?
- Prompt: "Dare felt like a door marked ___."
- Recommend entry point for newcomers?

#TheOrchidRoom #Dare #ShantelTessier #BullyRomance #DarkRomance
""")

body("deadly-throne", """
## Hook & thesis

E.J. Mellow's *Symphony for a Deadly Throne* is fantasy-romance with music in the bones and danger in the crown—**spice 4**, emotional intensity, sexual content. You want romantasy that sounds like something. Mellow writes rhythm into power.

> A throne that hums. A heart that answers off-key.

## The contextual pivot

Fantasy-romance: **spice 4**, sexual content, emotional intensity. Musical motif, deadly politics, romantic stakes in royal register. You: romantasy with sensory craft. Us: whether symphony metaphor sustains or repeats—Book identity within Mellow's larger shelf.

## Deep-dive critique

Mellow binds music to power—cadence in prose, tension in set pieces. Close POV keeps romantic peril intimate amid court scale. **Spice 4** follows emotional crescendo; heat as movement in the score.

Pacing alternates performance and conspiracy; weaker when exposition explains what motif already showed.

Mystic read: rule as song. Crown as instrument. Desire as harmony that can shatter. Response: I felt climax in body before plot confirmed.

## Discussion launchpad

**Questions for the room:**
- Music as magic—essential?
- **Spice 4** pacing with court plot?
- Mellow shelf comparison for you—where does this sit?
- Prompt: "The throne sounded like ___."
- Re-read or recommend once?

#TheOrchidRoom #SymphonyForADeadlyThrone #EJMellow #FantasyRomance #Romantasy
""")

body("forever-rains", """
## Hook & thesis

*Song of the Forever Rain*—E.J. Mellow again, and yes, the rain is a character. **Spice 4**. Fantasy-romance where weather holds grief and desire in the same cloud. You feel mood first, plot second. That's the contract.

> Rain that doesn't stop. Want that won't either.

## The contextual pivot

Fantasy-romance: **spice 4**, sexual content, emotional intensity. Atmospheric romance, forbidden undertones, sensory worldbuilding. You: mood-forward romantasy. Us: whether forever rain elevates theme or becomes repetitive metaphor.

## Deep-dive critique

Mellow's prose leans sensory—wet stone, skin in storm, longing synced to weather. POV intimate; pacing languid by design. **Spice 4** emerges from emotional saturation—heat when the dam breaks.

Craft risk: metaphor density; reward: immersion if you read for atmosphere.

Mystic read: rain as cleansing and drowning both. Eternal return. Love as weather pattern you can't outrun.

## Discussion launchpad

**Questions for the room:**
- Atmosphere vs. plot— which won you?
- **Spice 4** in slow rain—earned?
- Prompt: "Forever rain tasted like ___."
- Mellow reader—essential or skippable in her catalog?
- One image that stayed?

#TheOrchidRoom #SongOfTheForeverRain #EJMellow #FantasyRomance #Romantasy
""")

body("fragile-allegiance", """
## Hook & thesis

Cora Reilly's *Fragile Longing* is mafia romance where loyalty frays at the edges—**spice 4**, organized crime, betrayal, violence, emotional intensity. You know Reilly's world bites. This one asks what happens when longing outlasts allegiance.

> Loyalty with hairline cracks. Desire presses the glass.

## The contextual pivot

Mafia-boss-and-innocent / mafia romance: **spice 4**, organized crime, betrayal, violence, emotional intensity. Power, family duty, romantic trespass. You: mafia tolerance + betrayal theme. Us: whether fragility reads as character depth or plot convenience.

## Deep-dive critique

Reilly writes institution—blood, oath, territory—as romance pressure. POV keeps moral fracture visible. **Spice 4** follows trust rupture; heat braided with danger.

Pacing: emotional beats over action sprawl. Dialogue sharp; betrayal theme needs reader patience for slow burn.

Mystic read: allegiance as vow. Longing as heresy. The body choosing what the family forbids.

## Discussion launchpad

**Questions for the room:**
- Betrayal—earned or telegraphed?
- **Spice 4** with mafia violence—coherent?
- Reilly comfort read or stretch?
- Prompt: "Fragile sounded like ___."
- Forgiveness arc—buy it?

#TheOrchidRoom #FragileLonging #CoraReilly #MafiaRomance #DarkRomance
""")

body("house-of-earth-and-blood", """
## Hook & thesis

*Crescent City: House of Earth and Blood*—you've seen the cover in every bookshop. Sarah J. Maas opens a modern fantasy metropolis where grief, violence, and **spice 3** romance share the same skyline. You don't need me to hype it. You need to know if the Orchid Room read matches your memory of Bryce's rage and the city that feeds on secrets.

> A city that never sleeps because something is always hunting.

## The contextual pivot

Fantasy-romance / romantasy: **spice 3**, violence, grief, drug use on warnings. Urban fantasy scale, murder mystery engine, slow-burn romantic architecture. Book One of Crescent City. You: tolerance for long setup and series commitment. Us: craft of grief-as-fuel, **spice 3** placement in a 900-page appetite.

## Deep-dive critique

Maas builds city as character—species politics, clubs, temples, crime—before romance pays full dividend. POV anchored in Bryce's fury and mourning; prose accessible with epic sprawl. **Spice 3** arrives late relative to page count—contract readers accept or reject early.

Pacing: first third investment heavy; payoff when mystery and found family ignite. Violence and grief warnings literal.

Mystic read: the city as living altar. Grief as portal. Hunt as devotion misrecognized.

## Discussion launchpad

**Questions for the room:**
- Setup length—worth it?
- **Spice 3**—enough for the emotional arc?
- Bryce as heroine—anchor or barrier?
- Prompt: "Crescent City smelled like ___."
- Continue to Book Two?

#TheOrchidRoom #HouseOfEarthAndBlood #SarahJMaas #CrescentCity #Romantasy
""")

body("john-dies-at-the-end", """
## Hook & thesis

*John Dies @ the End* is not romance with horror trim—it's horror-comedy that eats your certainty and asks if you still trust the guy telling the story. David Wong. **Spice 2**. Gore, drugs, paranormal chaos on the label. You came weird. Stay weird.

> The end is a punchline that might be true.

## The contextual pivot

Gothic-horror-romance shelf placement with **spice 2**: horror, violence, drug use, paranormal, gore. Meta-narrative, buddy apocalypse, reality slippage. You: stomach for gore and unreliability. Us: whether friendship/love threads satisfy dark-romance readers or this is horror-first with romantic adjacency.

## Deep-dive critique

Wong's craft is voice—irreverent, exhausted, conspiratorial. Structure mimics burnout; pacing chaotic by design. **Spice 2** minimal; heat not the engine. Prose funny until it isn't.

Mystic read: reality as veil. The drug as false sacrament. Endings as thresholds you crawl through laughing.

Response: I trusted the book when it stopped winking long enough to hurt.

## Discussion launchpad

**Questions for the room:**
- Horror or romance shelf—for you?
- Unreliable narrator—feature or frustration?
- Gore tolerance—stay or bail?
- Prompt: "John Dies tasted like ___."
- Recommend to dark romance readers?

#TheOrchidRoom #JohnDiesAtTheEnd #DavidWong #GothicHorror #DarkRomance
""")

body("part-of-you", """
## Hook & thesis

Emma Grey's *Pictures of You* is forbidden love with a camera between you and the truth—**spice 3**, intimacy observed, desire that shouldn't be looked at twice. You feel watched reading it. That's the point.

> A frame around wanting. What's outside the shot?

## The contextual pivot

Forbidden-love: **spice 3**, taboo attraction, emotional exposure. Observation, memory, image as motif. You: forbidden tolerance without high spice. Us: whether the photographic frame deepens guilt and want—or feels gimmick.

## Deep-dive critique

Grey uses image as POV grammar—what's captured, cropped, withheld. Pacing intimate; **spice 3** integrated into confession rhythm. Prose clear with lyric pockets.

Mystic read: the photograph as spell fixing a moment that shouldn't last. Forbidden as negative space.

Weak: taboo ethics need reader opt-in; book must signal awareness.

## Discussion launchpad

**Questions for the room:**
- Image motif—essential?
- **Spice 3**—enough heat?
- Forbidden line—clear on page?
- Prompt: "Pictures of you looked like ___."
- Would you shelve with dark romance?

#TheOrchidRoom #PicturesOfYou #EmmaGrey #ForbiddenLove #DarkRomance
""")

body("peace-honey", """
## Hook & thesis

*Peaches & Honey*—R. Raeta, Book Two of These Immortal Truths. Myth retold with teeth. **Spice 3**, violence and betrayal on the label. You wanted Hades-and-Persephone energy with room to breathe. Raeta serves sweetness that sours on purpose.

> Immortal hunger. Mortal consequence.

## The contextual pivot

Fantasy-romance: **spice 3**, violence, betrayal. Immortal Truths series continuation—mythic romance, power imbalance divine and human. You: series Book Two or mythic dark romance entry. Us: whether Raeta escalates Book One promises without repeating beats.

## Deep-dive critique

Raeta alternates POV for dual hunger—god and mortal scales of want. Pacing simmers; **spice 3** follows trust fracture. Prose lush without drowning; betrayal warning integral.

Mystic read: myth as eternal return. Honey as offering and trap. Peaches as season that rots.

## Discussion launchpad

**Questions for the room:**
- Book Two lift—yes or no?
- **Spice 3** for mythic power imbalance?
- Betrayal—earned?
- Prompt: "Peaches and honey tasted like ___."
- Continue Immortal Truths?

#TheOrchidRoom #PeachesAndHoney #RRaeta #FantasyRomance #Romantasy
""")

# --- Batch 3 ---

body("pine-poison", """
## Hook & thesis

*Pits & Poison*—R. Raeta, These Gilded Lies Book Two. Gilded surfaces, poison underneath. **Spice 3**, murder, betrayal, kidnapping on the warnings. You don't sip. You swallow and wait for the burn.

> Gold leaf on a cup that was never empty.

## The contextual pivot

Fantasy-romance: **spice 3**, murder, betrayal, kidnapping. Gilded Lies series—courtly poison, romantic treachery. You: mythic dark romance with crime stakes. Us: whether poison metaphor sustains Book Two.

## Deep-dive critique

Raeta writes luxury as camouflage—prose polished, violence precise. POV keeps complicity close. **Spice 3** after emotional toxin accumulates. Kidnapping warning: take seriously.

Mystic read: poison as truth serum. Gilding as lie you choose to believe.

## Discussion launchpad

**Questions for the room:**
- Poison vs. honey— which Raeta voice fits you?
- **Spice 3** with kidnapping on label?
- Murder stakes—integrated?
- Prompt: "Pits and poison smelled like ___."
- Gilded Lies continue?

#TheOrchidRoom #PitsAndPoison #RRaeta #FantasyRomance #Romantasy
""")

body("pray-for-us", """
## Hook & thesis

Molly Doyle's *Scream For Us*—Order of the Unseen. **Spice 5**. Cult themes, obsession, graphic content, death imagery. Gothic-horror romance that doesn't ask permission to scream. You opt in with eyes open or you don't open the book.

> Faith twisted until it sounds like desire.

## The contextual pivot

Gothic-horror-romance: **spice 5**, cult themes, violence, obsession, graphic content, death imagery. Religious dread + romantic fixation. You: high spice + cult horror tolerance. Us: framing— authored dark fiction vs. shock stack.

## Deep-dive critique

Doyle builds claustrophobia—ritual, hierarchy, unseen order. POV immersive; **spice 5** braided with psychological coercion. Pacing escalates through dread more than jump scares.

Mystic read: cult as corrupted covenant. Scream as prayer. The body confessing what the mind denies.

## Discussion launchpad

Heavy shelf—speak plain.

**Questions for the room:**
- Cult + romance—coherent for you?
- **Spice 5** with horror—sustainable?
- Graphic content—earned?
- Prompt: "Scream sounded like the color ___."
- Order of the Unseen—continue?

#TheOrchidRoom #ScreamForUs #MollyDoyle #GothicHorror #DarkRomance
""")

body("sinners-absolve", """
## Hook & thesis

*Sinners Absolute*—Somme Sketcher, Sinners Anonymous Book Five. **Spice 4**. Redemption questioned, organized crime, violence, dark themes. You're deep in the series or you're climbing fast. Sketcher writes like absolution is a con.

> Five books of sin. One invoice still open.

## The contextual pivot

Forbidden-love / dark romance series: **spice 4**, dark themes, redemption, organized crime, violence. Book Five—payoff architecture, accumulated character debt. You: series investment. Us: whether late-series heat and morality land fresh.

## Deep-dive critique

Sketcher trades on ensemble memory—callbacks, rupture, reunion. POV series-stable; **spice 4** distributed across pairings readers already track. Pacing assumes loyalty.

Mystic read: absolution as performance. Sin as identity you wear until it fits.

## Discussion launchpad

**Questions for the room:**
- Book Five payoff—worth the climb?
- Redemption theme— tired or earned?
- **Spice 4** at series depth?
- Prompt: "Sinners absolute felt like ___."
- New reader start point?

#TheOrchidRoom #SinnersAbsolute #SommeSketcher #ForbiddenLove #DarkRomance
""")

body("sins-of-the-past", """
## Hook & thesis

Cora Reilly's *Bound By The Past*—betrayal in the dek, **spice 4**, organized crime, emotional trauma, violence. Mafia romance where history isn't prologue; it's the weapon.

> The past doesn't knock. It picks the lock.

## The contextual pivot

Mafia romance: **spice 4**, betrayal, organized crime, emotional trauma, violence. Past-debt trope, loyalty fracture, romantic repair under fire. You: mafia + second-chance/betrayal arc. Us: whether past bind feels inevitable or manufactured.

## Deep-dive critique

Reilly anchors emotion in family law—betrayal has institutional weight. POV keeps wound visible; **spice 4** follows trust negotiation. Trauma warning: emotional, not decorative.

Mystic read: past as chain. Forgiveness as breaking links one at a time.

## Discussion launchpad

**Questions for the room:**
- Betrayal arc—forgivable?
- **Spice 4** with trauma themes?
- Reilly formula—comfort or stale?
- Prompt: "Bound by the past felt like metal and ___."
- Standalone OK?

#TheOrchidRoom #BoundByThePast #CoraReilly #MafiaRomance #DarkRomance
""")

body("take-me-apart", """
## Hook & thesis

Brea Alepou and Skyler Snow's *Take Me Apart*—mafia romance where identity disassembly is the metaphor and the method. **Spice 4**, gun violence, organized crime, dark themes. You came for Vitale energy and dismantling. They deliver.

> Take me apart—but tell me who holds the pieces.

## The contextual pivot

Mafia-boss-and-innocent: **spice 4**, gun violence, organized crime, dark themes, violence. Co-authored voice; shifting POV; power and vulnerability traded. You: mafia heat + psychological edge. Us: co-author unity and POV handoffs.

## Deep-dive critique

Alepou and Snow oscillate perspective—motives tessellate. Prose sharp; dialogue weaponized. **Spice 4** integrates into imbalance; disassembly theme in structure and scene design.

Mystic read: self as puzzle. Love as rearrangement. Violence as language you learn or refuse.

Weak: middle sag if emotional beats repeat.

## Discussion launchpad

**Questions for the room:**
- Co-author seams visible?
- Disassembly metaphor—earned?
- **Spice 4** with gun violence on label?
- Prompt: "Take me apart sounded like ___."
- Vitale brothers—continue?

#TheOrchidRoom #TakeMeApart #BreaAlepou #SkylerSnow #MafiaRomance #DarkRomance
""")

body("never", """
## Hook & thesis

*Never Say Never*—Brea Alepou and Skyler Snow, dark thriller romance. **Spice 4**, violence, crime themes, police tape in the atmosphere. Love beside the yellow line. You feel the siren even when it stops.

> Never is a dare. You know that.

## The contextual pivot

Dark-thriller romance: **spice 4**, violence, crime themes, dark themes. Co-authored; romantic suspense + crime dread. You: thriller tolerance + dark romance heat. Us: balance of crime engine vs. emotional arc.

## Deep-dive critique

Dual author voice cohesive; POV supports suspicion and pull. Pacing thriller-forward; **spice 4** when adrenaline converts to intimacy. Prose gritty; warnings literal.

Mystic read: crime scene as altar of truth. Attraction at the threshold of what you shouldn't know.

## Discussion launchpad

**Questions for the room:**
- Thriller vs. romance—which led?
- **Spice 4** in crime frame?
- Co-author chemistry?
- Prompt: "Never say never tasted like ___."
- Re-read value?

#TheOrchidRoom #NeverSayNever #BreaAlepou #SkylerSnow #DarkThriller #DarkRomance
""")

body("i-just-want-to-be-yours", """
## Hook & thesis

Heather Garvin's *I Just Want to Be Yours*—enemies-to-lovers with music in the wiring. **Spice 3**. You came for the feud and the chord change when hate flips. Garvin writes sound like feeling.

> Enemies until the song says otherwise.

## The contextual pivot

Enemies-to-lovers: **spice 3**, music motif, dark romance undertone. Performance, rivalry, redemption through art. You: lower spice ETL with emotional payoff. Us: whether music carries romance or decorates it.

## Deep-dive critique

Garvin maps animosity to melody—pacing concert-tour rhythm. POV dual or close; dialogue witty then raw. **Spice 3** follows trust thaw.

Mystic read: music as binding spell. The note that unlocks the chest.

## Discussion launchpad

**Questions for the room:**
- Music essential?
- **Spice 3**—enough?
- ETL believable?
- Prompt: "I just want sounded like ___."
- Pair with *Just Don't Call Me Yours*?

#TheOrchidRoom #IJustWantToBeYours #HeatherGarvin #EnemiesToLovers #DarkRomance
""")

body("just-dont-call-me-yours", """
## Hook & thesis

*Just Don't Call Me Yours*—Garvin again, enemies-to-lovers, **spice 3**, music and possession in the title fight. You don't want to be owned. The book wants you to want anyway. Classic tension.

> Don't call me yours—but stay.

## The contextual pivot

Enemies-to-lovers companion energy: **spice 3**, music, identity vs. possession. You: Garvin shelf continuity. Us: ownership theme—romantic heat or red flag the book names?

## Deep-dive critique

Garvin parallels rivalry with autonomy—prose performance-heavy. **Spice 3** integrated into emotional release. Pacing similar to companion read; differentiation in possession theme.

Mystic read: name as binding. Refusal as spell.

## Discussion launchpad

**Questions for the room:**
- Possession theme—hot or warning?
- **Spice 3** vs. companion book?
- Which Garvin hooked you more?
- Prompt: "Don't call me yours felt like ___."
- Read order preference?

#TheOrchidRoom #JustDontCallMeYours #HeatherGarvin #EnemiesToLovers #DarkRomance
""")

# --- Batch 4 ---

body("the-blood-we-crave-part-two", """
## Hook & thesis

Monty Jay's *The Blood We Crave* Part Two—bully romance continuation, **spice 4**, bullying, power imbalance, emotional intensity. You survived Part One. Part Two asks for blood loyalty.

> Crave is a verb that doesn't apologize.

## The contextual pivot

Bully romance serial: **spice 4**, sexual content, emotional intensity, bullying, power imbalance. Hollow Boys / continuation readers. You: series opt-in. Us: Part Two escalation vs. repetition.

## Deep-dive critique

Jay sustains hierarchy tension; POV intimate with cruelty adjacent to want. **Spice 4** follows power shifts. Pacing serial—cliff energy.

Mystic read: blood as covenant. Craving as hunger that names you.

## Discussion launchpad

**Questions for the room:**
- Part Two worth Part One?
- **Spice 4** + bullying—coherent?
- Power imbalance—marked on page?
- Prompt: "The blood we crave tasted like ___."
- Continue Hollow Boys?

#TheOrchidRoom #TheBloodWeCrave #MontyJay #BullyRomance #DarkRomance
""")

body("the-duke-and-i", """
## Hook & thesis

*The Duke & I*—Julia Quinn, Bridgerton, **spice 3**. Regency romance on the fantasy-romance shelf here because desire is its own kind of magic. You know Daphne and Simon. The question is whether the Orchid Room read finds the darkness under the polish.

> Propriety as armor. Desire as the crack.

## The contextual pivot

Historical romance / romantasy placement: **spice 3**, consent and reputation stakes, family politics. You: Regency tolerance, series cultural weight. Us: dark romance adjacency—where does pain live in the happy veneer?

## Deep-dive critique

Quinn's craft is dialogue and social constraint—pacing ballroom to bedroom. **Spice 3** historically modest by contemporary dark romance; emotional stakes carry heat. POV clear; prose accessible.

Mystic read: the mask of the ton. Truth spoken only in private threshold.

## Discussion launchpad

**Questions for the room:**
- Dark romance shelf—fit?
- **Spice 3**—enough for you?
- Consent conversation—aged how?
- Prompt: "The duke and I smelled like ___."
- Bridgerton curiosity satisfied?

#TheOrchidRoom #TheDukeAndI #JuliaQuinn #Bridgerton #Romantasy
""")

body("the-final-score", """
## Hook & thesis

Maren Moore's *The Final Score*—forbidden love on the field, **spice 3**, rules you break with your body before your mind catches up. Sports romance with taboo friction. You feel the stadium and the secret.

> The scoreboard sees one game. You play two.

## The contextual pivot

Forbidden-love: **spice 3**, sports setting, illicit attraction, moral boundary testing. You: forbidden without high heat. Us: whether sports frame deepens taboo or decorates.

## Deep-dive critique

Moore uses arena as pressure cooker—public glory, private trespass. Dual POV common; dialogue tension-forward. **Spice 3** follows emotional admission.

Mystic read: the field as sacred ground profaned by want.

## Discussion launchpad

**Questions for the room:**
- Sports essential?
- **Spice 3**—enough?
- Forbidden ethics—clear?
- Prompt: "Final score sounded like ___."
- Moore shelf—more?

#TheOrchidRoom #TheFinalScore #MarenMoore #ForbiddenLove #DarkRomance
""")

body("the-lawless-god", """
## Hook & thesis

Lola King's *Lawless God*—captor-and-captive, **spice 5**, kidnapping, Stockholm syndrome, violence, blood, psychological manipulation, obsession. The dek doesn't whisper. Neither do I. Opt in like an adult.

> God is lawless here. So is want.

## The contextual pivot

Captor-and-captive: **spice 5**, full warning stack. Stockholm framed in marketing—book must signal authored taboo. You: dubcon/captivity tolerance at high heat. Us: psychology vs. glamorization.

## Deep-dive critique

King writes claustrophobia—single-location pressure, POV inside attachment formation. **Spice 5** frequent; integrated with imbalance. Prose intense; blood and violence literal.

Mystic read: captivity as dark baptism. The god you invent when there's no exit.

## Discussion launchpad

Heavy shelf—plain speech.

**Questions for the room:**
- Stockholm framing—authored?
- **Spice 5**—sustainable?
- Line between fantasy and endorsement?
- Prompt: "Lawless god felt like ___."
- Recommend to captivity readers only?

#TheOrchidRoom #LawlessGod #LolaKing #CaptorAndCaptive #DarkRomance
""")

body("the-murder-of-roger-ackroyd", """
## Hook & thesis

Agatha Christie's *The Murder of Ackroyd*—**spice 1**, murder, death, violence. Not romance. Still on our shelf because Poirot teaches you how revelation rewires everything you thought you trusted. You came for the knife in the narrative itself.

> The murder is not the only betrayal.

## The contextual pivot

Dark-thriller classic: **spice 1**, murder mystery, unreliable community. Detective fiction as craft masterclass. You: mystery tolerance, literary patience. Us: why it lives beside dark romance—trust, deception, domestic shadow.

## Deep-dive critique

Christie's architecture is the character—Poirot as lens, village as closed system. Pacing procedural; prose clean. **Spice 1** romance absent; tension psychological.

Mystic read: truth as veil lifted once. The reader as accomplice until the last page.

## Discussion launchpad

**Questions for the room:**
- Shelf fit—for you?
- Narrator trust—when did you suspect?
- Craft lesson you stole?
- Prompt: "Ackroyd sounded like quiet and ___."
- Re-read knowing the ending?

#TheOrchidRoom #TheMurderOfAckroyd #AgathaChristie #DarkThriller
""")

body("the-newspaper-nanny", """
## Hook & thesis

Maren Moore's *The Newspaper Nanny*—forbidden love, **spice 3**, taboo proximity in domestic space. You know this trope makes people nervous. Moore writes the nervousness as heat.

> The headline is what you don't print.

## The contextual pivot

Forbidden-love: **spice 3**, nanny taboo, power imbalance social. You: forbidden tolerance. Us: ethics framing—does Moore mark boundaries for the trope?

## Deep-dive critique

Moore builds intimacy through daily proximity—pacing slow, POV confessional. **Spice 3** follows emotional trespass. Prose accessible; tension in glances and rules broken.

Mystic read: the home as temple profaned gently.

## Discussion launchpad

**Questions for the room:**
- Taboo—authored or uncomfortable?
- **Spice 3**—enough?
- Power dynamics—named?
- Prompt: "Newspaper nanny tasted like ___."
- Pair with *The Final Score*?

#TheOrchidRoom #TheNewspaperNanny #MarenMoore #ForbiddenLove #DarkRomance
""")

body("the-once-and-future-king", """
## Hook & thesis

T.H. White's *The Once & Future King*—**spice 2**, fantasy violence, emotional intensity. Arthurian epic on the romantasy shelf because legend is romance with a body count. You came for myth that hurts.

> The future king is always a child first.

## The contextual pivot

Fantasy classic: **spice 2**, Arthurian cycle, moral education, war and chivalry. You: epic patience, literary fantasy. Us: emotional romance threads within bildungsroman scale.

## Deep-dive critique

White's craft is tonal range—comedy to tragedy. Pacing episodic; prose humane and sharp. **Spice 2** romantic threads subtle by modern measure.

Mystic read: the sword as threshold. Merlin as guide through veils.

## Discussion launchpad

**Questions for the room:**
- Romantasy shelf—fit?
- Emotional peak—for you?
- **Spice 2**—misplaced expectation?
- Prompt: "Once and future felt like mist and ___."
- Full cycle worth it?

#TheOrchidRoom #TheOnceAndFutureKing #THWhite #FantasyRomance
""")

body("the-ritual-of-bone", """
## Hook & thesis

Jennifer L. Armentrout's *The Primal of Blood and Bone*—fantasy-romance with primal in the title and **spice 3** on the label. Violence, dark magic. You know JLA delivers appetite with world scale.

> Blood remembers. Bone answers.

## The contextual pivot

Fantasy-romance: **spice 3**, violence, dark magic. Primal series energy—power, mate-bond adjacency, epic stakes. You: JLA tolerance for series length. Us: primal theme as craft or marketing?

## Deep-dive critique

Armentrout balances banter and threat—POV heroine-forward. Pacing series-standard; **spice 3** integrated into bond tension. Magic system serves romance pressure.

Mystic read: blood as ancestry speaking. Ritual as body remembering what mind denies.

## Discussion launchpad

**Questions for the room:**
- Primal theme—essential?
- **Spice 3**—enough for JLA fans?
- Dark magic—integrated?
- Prompt: "Blood and bone tasted like ___."
- Series commit?

#TheOrchidRoom #ThePrimalOfBloodAndBone #JenniferLArmentrout #Romantasy
""")

body("the-shades-of-magic", """
## Hook & thesis

V.E. Schwab's *A Darker Shade of Magic*—**spice 3**, death imagery, gothic atmosphere. Multiple Londons, one traveler who shouldn't exist. You came for portal fantasy with blood in the grout.

> Magic has a color. So does hunger.

## The contextual pivot

Gothic-horror-romance adjacency / fantasy: **spice 3**, death imagery, atmospheric dread. Found family, parallel worlds. You: Schwab mood + adventure. Us: romantic thread vs. adventure lead.

## Deep-dive critique

Schwab's craft is world-color— prose vivid, pacing adventure-forward. POV multi; **spice 3** light romantic undertone by dark romance standards. Atmosphere earns gothic tag.

Mystic read: London as many veils. Travel as trespass.

## Discussion launchpad

**Questions for the room:**
- Gothic shelf—fit?
- **Spice 3** expectation match?
- Favorite London?
- Prompt: "Darker shade smelled like ___."
- Continue trilogy?

#TheOrchidRoom #ADarkerShadeOfMagic #VESchwab #GothicHorror #DarkRomance
""")

body("the-vegas-rule", """
## Hook & thesis

Stephanie Archer's *The Heartbreak Rule*—enemies-to-lovers, **spice 4**, sports romance rules and hearts broken on purpose. You don't come to Vegas to play safe.

> Every rule is a dare with better lighting.

## The contextual pivot

Enemies-to-lovers: **spice 4**, sports/ Vegas setting, rivalry to romance. You: ETL at higher spice. Us: heartbreak rule as theme vs. title flavor.

## Deep-dive critique

Archer writes banter-forward ETL—pacing rom-com speed with **spice 4** heat spikes. POV dual typical; dialogue carries feud.

Mystic read: Vegas as neon threshold—what happens here rewrites you until morning.

## Discussion launchpad

**Questions for the room:**
- **Spice 4**—earned in ETL?
- Vegas essential?
- Heartbreak theme—land?
- Prompt: "Heartbreak rule tasted like ___."
- Archer—more?

#TheOrchidRoom #TheHeartbreakRule #StephanieArcher #EnemiesToLovers #DarkRomance
""")

body("villain", """
## Hook & thesis

Luna Pierce's *Villain Era*—dark mafia romance, **spice 4**, organized crime, violence, death imagery. You chose the villain shelf. Pierce writes like morality is a suggestion.

> Villain era means you stop apologizing for wanting the wrong one.

## The contextual pivot

Mafia-boss-and-innocent: **spice 4**, organized crime, violence, death imagery, dark themes. Antihero romance, power imbalance. You: mafia dark romance. Us: villainy as identity or aesthetic?

## Deep-dive critique

Pierce sustains threat—POV keeps danger adjacent to heat. **Spice 4** integrated; violence warnings literal. Prose contemporary, pace thriller-romance.

Mystic read: the villain as mirror—you see what you'd deny.

## Discussion launchpad

**Questions for the room:**
- Villain era—earned title?
- **Spice 4** with crime violence?
- Antihero—compelling or thin?
- Prompt: "Villain era sounded like ___."
- Pierce shelf continue?

#TheOrchidRoom #VillainEra #LunaPierce #MafiaRomance #DarkRomance
""")

SKIP = {"passion", "breaking-hailey", "dance-of-a-burning-sea", "white-lines", "four"}

def main():
    for slug, new_body in BODIES.items():
        path = ROOT / f"{slug}.md"
        if not path.exists():
            print(f"MISSING {slug}")
            continue
        text = path.read_text()
        parts = text.split("---", 2)
        if len(parts) < 3:
            print(f"BAD FM {slug}")
            continue
        fm = parts[1]
        out = f"---{fm}---\n\n{new_body}"
        path.write_text(out)
        print(f"OK {slug}")

if __name__ == "__main__":
    main()
