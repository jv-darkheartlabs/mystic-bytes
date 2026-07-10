const coverMentorship = "/assets/images/cover-mentorship.svg";
const coverCode = "/assets/images/cover-code.svg";
const coverMind = "/assets/images/cover-mind.svg";
const coverSystems = "/assets/images/cover-systems.svg";
const coverLanguage = "/assets/images/cover-language.svg";
const coverCraft = "/assets/images/cover-craft.svg";
const coverArchive = "/assets/images/cover-archive.svg";
const projectFocusGuard = "/assets/images/project-focus-guard.svg";
const projectNeuroshell = "/assets/images/project-neuroshell.svg";



export type Essay = {
  number: string;
  slug: string;
  title: string;
  dek: string;
  date: string;
  cover?: string;
  locked?: boolean;
  /**
   * In-universe work order from THE ARCHITECT. Rendered as the
   * [INCOMING BRIEF] block above the post body. Optional — falls back
   * to a brief auto-derived from the title + dek when omitted.
   */
  brief?: {
    system: string; // the system / surface under fire
    issue: string;  // the bug / risk / inefficiency
    constraint?: string; // the limiting condition
  };
  /**
   * Content type per the length matrix.
   * - "dispatch" (default, omitted): 250-350 words, archive aphorism format
   * - "essay": 1,200-2,000 words, standard thought-leadership
   * - "pillar": 2,500-3,500 words, deep-dive authority piece
   */
  type?: "dispatch" | "essay" | "pillar";
  body: string[];
};

// Map a Dewey-ish signal number prefix to a cover image. Keeps the archive
// visually coherent without minting a unique illustration per essay.
export function coverForNumber(num: string): string {
  const head = parseInt(num.split(".")[0], 10);
  if (Number.isNaN(head)) return coverCode;
  if (head < 100) return coverCode;        // 000–099 computing / systems
  if (head < 200) return coverMind;        // 100–199 psychology / philosophy
  if (head < 300) return coverArchive;     // 200–299 reference
  if (head < 400) return coverSystems;     // 300–399 social systems
  if (head < 500) return coverLanguage;    // 400–499 language
  if (head < 600) return coverMind;        // 500–599 sciences
  if (head < 700) return coverCraft;       // 600–699 applied / craft
  if (head < 800) return coverCraft;       // 700–799 arts
  if (head < 900) return coverLanguage;    // 800–899 literature
  return coverArchive;                     // 900–999 history / geography
}

export const essays: Essay[] = [
  {
    number: "006.42",
    slug: "the-model-is-a-mirror",
    title: "The Model Is a Mirror",
    dek: "Whatever you bring to the prompt, the model hands back with better grammar.",
    date: "Jun 28, 2026",
    body: [
      "Whatever you bring to the prompt, the model hands back with better grammar. Vague intent in, vague prose out. Half-formed plan in, confident-sounding half-formed plan out. The system does not invent rigour you did not supply; it polishes whatever shape you handed it until the edges look intentional.",
      "This is why working with a model is a diagnostic for your own thinking. The places where the output goes soft are the places your brief went soft. The hallucinations cluster around the questions you did not bother to answer for yourself. The fix is upstream of the prompt, almost always.",
      "Treat the conversation like a code review of your own intent. If the model keeps misunderstanding, the bug is in the spec. Sharpen the brief before you sharpen the prompt, and the prompt will mostly write itself.",
    ],
  },
  {
    number: "005.74",
    slug: "migrations-are-confessions",
    title: "Migrations Are Confessions",
    dek: "Every schema change is a sentence about something the original author got wrong.",
    date: "Jun 21, 2026",
    body: [
      "Every schema change is a sentence about something the original author got wrong. Not maliciously \u2014 just earlier, with less information, under different constraints. The migration file is a footnote to a decision made by someone who could not see this far ahead, and it is your job to write the footnote without contempt.",
      "Good migrations are reversible in spirit even when they are not reversible in SQL. They leave a paper trail. They explain, in the commit message if nowhere else, why the old shape was reasonable and why the new shape is now necessary. Future maintainers inherit not just the schema but the reasoning.",
      "Treat each migration as a small act of historiography. The table is a record of what the team believed about the domain on the day the column was added. Change it carefully, and document the change like someone will one day need to argue with it.",
    ],
  },
  {
    number: "152.7",
    slug: "rest-is-a-deploy-target",
    title: "Rest Is a Deploy Target",
    dek: "Sleep ships the build your brain wrote during the day.",
    date: "Jun 17, 2026",
    body: [
      "Sleep ships the build your brain wrote during the day. The insight you almost had at 4pm is waiting in a queue; the queue does not drain unless you actually lie down. Skipping rest is not heroism. It is leaving the artefact in staging and calling the work done.",
      "The industry pretends otherwise. We valorise the late night, the weekend push, the consecutive deploys, and then quietly carry the technical debt of every decision made on five hours of sleep. The bug rate has a circadian rhythm, and so does the quality of the code review you wrote at midnight.",
      "Schedule rest the way you schedule releases. Protect the window. Trust that the brain, given the substrate, will compile the day into something useful by morning. The work is not the keystrokes. The work is what survives the night.",
    ],
  },
  {
    number: "401.9",
    slug: "naming-things-is-still-the-hardest-problem",
    title: "Naming Things Is Still the Hardest Problem",
    dek: "A name is a contract with every future reader of the code.",
    date: "Jun 14, 2026",
    body: [
      "A name is the smallest unit of design in a codebase. Every identifier you commit is a tiny API \u2014 a promise to every future reader, including future-you at 2am, that this thing does what it says on the tin. Get the name wrong and the cost compounds: misreads, defensive comments, wrapper functions invented to translate one bad name into a better one.",
      "The hard part is that good names require you to already understand the system. You can only name a concept once you can see its edges. That is why early code is full of `helper`, `utils`, `manager` \u2014 placeholder names for concepts the author has not yet fully resolved. The fix is not better vocabulary. The fix is staying willing to rename when the concept finally sharpens.",
      "Treat renaming as a first-class refactor. Reserve it the same respect you give to extracting a function or splitting a module. Naming is the interface the team thinks through. Keep it honest.",
    ],
  },
  {
    number: "428.0",
    slug: "documentation-as-empathy",
    title: "Documentation as Empathy",
    dek: "Docs are a letter to the next person — often yourself, six months from now.",
    date: "Jun 7, 2026",
    body: [
      "Docs are a letter to the next person, and the next person is almost always you. Six months from now, the context you currently hold in working memory will be gone. What survives is whatever you wrote down, in whatever tone you chose to write it in.",
      "Empathetic documentation answers three questions in order: what is this, why does it exist, how do I use it without breaking something. Most docs collapse the middle question, which is the one that actually matters. Without the why, the how is just superstition.",
      "Write the docs you wish the previous maintainer had left you. Then go a little further \u2014 leave a paragraph about what you considered and rejected. The dead-end paths are part of the map.",
    ],
  },
  {
    number: "153.4",
    slug: "context-switching-tax",
    title: "The Context-Switching Tax Nobody Itemizes",
    dek: "Every interruption is a charge against a budget you never see.",
    date: "May 31, 2026",
    body: [
      "Every interruption is a charge against a budget you never see. The visible cost is the minute the conversation took. The hidden cost is the twenty minutes of context reconstruction that follows \u2014 the slow rebuild of mental state, open files, half-formed hypotheses.",
      "Teams that pride themselves on responsiveness are quietly running on this tax. The Slack reply in two minutes is paid for by an engineer who will not ship the thing they were holding in their head. Multiply across a team and a quarter and the line item is enormous.",
      "The fix is structural, not personal. Block synchronous expectations into windows. Treat deep work as the default state and meetings as the exception that must justify itself. Async-first is not laziness. It is honest accounting.",
    ],
  },
  {
    number: "910.4",
    slug: "relocation-as-refactor",
    title: "Relocation as Refactor",
    dek: "Moving countries is a migration with no rollback plan.",
    date: "May 24, 2026",
    type: "pillar",
    body: [
      "Moving countries is a migration with no rollback plan. You lift an entire system \u2014 paperwork, relationships, daily routines, the small infrastructure of being a person \u2014 and you redeploy it onto unfamiliar substrate. Some services come back up immediately. Others stay broken for months. The ones that stay broken the longest are the ones you forgot were running.",
      "I made the call to leave on a Tuesday, in the bath, with a spreadsheet open on my phone. The spreadsheet had two columns \u2014 what I would keep, what I would let lapse \u2014 and a row count that kept growing every time I thought of something else. That spreadsheet is the migration plan. The bath is the staging environment. The Tuesday is the ticket number, the one I will eventually quote to myself when I forget why I started.",
      "## The system you are migrating is mostly invisible",
      "The visible work of relocation is the immigration paperwork, the lease termination, the dog import permit, the box of cables you finally throw out. The invisible work is the substrate underneath it: the GP who knows your medical history, the pharmacist who fills the script without asking, the friend who picks up on the second ring at 11pm. None of that comes with you. You will rebuild it from scratch, in a city where you have not yet earned the right to call anyone on the second ring.",
      "Software engineers underestimate this part because we are trained to think of migrations as data transfer. A relocation is closer to a cold start of an entire service mesh. Every dependency has to be re-resolved against the new environment. Every retry policy has to be re-tuned for new latencies. You will spend the first six months learning which of your habits were portable and which were specific to the runtime you left behind.",
      "## Defaults become explicit configuration",
      "At home, almost everything is a default. The way you order coffee. Where the cutlery goes. Which day the bins are collected. What is rude to say at a dinner table. None of this is conscious until you cross a border and discover that the default has been swapped underneath you. The cognitive load of relocation is not the new things you have to learn. It is the old things you have to stop assuming.",
      "Auckland will not be the city I came from. It will not be the cities my work mostly lives in. The defaults around weather, daylight, work hours, social distance, and politeness all shift simultaneously. Every shift is small. The aggregate is enormous. For the first months, you are running on a debugger \u2014 every action stepped through manually, because the cached assumption is no longer trustworthy.",
      "This is the part nobody warns you about, because the people who have done it have either repressed the memory or have rebuilt the cache so thoroughly they have forgotten what it cost to populate. The exhaustion of the first six months is not weakness. It is the bill for every constant becoming a variable at once.",
      "## The work is still running while you rebuild it",
      "You do not get to take the system down for maintenance. The clients keep paying. The code keeps shipping. The newsletter still goes out. The mortgage application still wants a payslip dated this month, in the new currency, from the new employer, who has not yet hired you because you have not yet arrived. The whole migration runs hot \u2014 production traffic, live writes, partial schema, and a maintenance window that exists only in theory.",
      "I am doing the relocation in deliberately staged phases. December 2026 through February 2027 is the Auckland interview window \u2014 three months on the ground, candidate-facing, learning the runtime. The full relocation lands later in 2027, once an offer makes the move funded rather than speculative. Treating it as two deploys instead of one is the only reason this looks tractable from the inside.",
      "## Refactors that touch this much state look like regressions first",
      "A refactor that rewrites how money flows, where you sleep, who you call, and what language the doctor speaks always looks worse before it looks better. The first metrics dashboard you check after the migration will be red. You will conclude you have ruined your life. You have not. You have just deployed to an environment with no warm cache, and the latency reads as failure until you remember it is just absence of history.",
      "The trick is to measure progress in commits, not feelings. A commit is: I opened a bank account. I registered with a GP. I learned the name of the corner store owner. I figured out which bus actually runs on Sundays. Each one is a small line in the changelog of the new life. Stacked up, over months, they become a system again. The feelings catch up later. The commits go first.",
      "## What you intentionally leave broken",
      "Not every service is worth restoring. A migration is also a chance to delete code you have been afraid to touch \u2014 friendships that were running on inertia, commitments that drained more than they returned, recurring obligations that had outlived their reason. The legacy system gave you cover to keep them running. The new system requires you to opt them back in. Most of them, quietly, you do not.",
      "This is the part of relocation no one writes the blog post about, because it sounds cold. It is not cold. It is honest accounting. You cannot rehydrate every connection from the old environment, and pretending you will is how the first year of the new life gets eaten by maintenance work for a system you do not even live in anymore.",
      "## The rollback plan you do not get to use",
      "Every senior engineer knows you do not deploy without a rollback. Relocation is the exception. There is no rollback. You can move back, eventually, but you will be moving to a country that has continued evolving without you, into a version of your old life that no longer matches the schema you left. The 'rollback' is just another migration.",
      "Accepting that is the moment the migration actually starts. As long as you secretly hold open the possibility of reverting, you will not fully commit to the new environment. You will keep half your bandwidth in the old runtime, paying double tax. The decision to close that door is what frees the rest of the cycles to actually rebuild.",
      "Auckland is not the destination. It is the next checkpoint. The system will keep refactoring itself after I land \u2014 that is what systems do. My job in 2027 is to ship the migration cleanly, document the breaking changes for the version of me who has to live inside the result, and resist the urge to call this 'done.' Relocations, like codebases, are only ever finished in the sense that someone eventually stops working on them. // JV, from the orchid dark.",
    ],
  },
  {
    number: "004.6",
    slug: "protocols-as-promises",
    title: "Protocols as Promises",
    dek: "A protocol is a promise two strangers agree to keep.",
    date: "May 17, 2026",
    type: "essay",
    body: [
      "A protocol is a promise two strangers agree to keep. Neither party has met the other. Neither will read the other's source code. The only thing standing between them and chaos is a written specification and a shared willingness to honour it.",
      "## The boring parts are the load-bearing parts",
      "The exciting parts of a protocol \u2014 the new feature, the cool extension, the performance trick \u2014 are not what keeps it alive. The boring parts do that. Version numbers. Error codes. What counts as a malformed message. What the server is allowed to do when the client sends something it does not understand. These are the conditions under which the promise can still be kept when something goes wrong, and something will always eventually go wrong.",
      "A protocol that only works on the happy path is not a protocol. It is a coincidence. The first time a network blips, a clock skews, a client falls behind on releases, or a malicious actor sends a deliberately malformed frame, the coincidence collapses, and every implementation downstream has to invent its own recovery story. The recovery stories will not agree. The system is now a tower of competing improvisations held together by goodwill.",
      "## Forwards and backwards compatibility are ethical commitments",
      "Every protocol upgrade is a promise to the implementers who shipped against the previous version. They wrote code in good faith. They built businesses on top of the assumption that the contract would hold. Breaking the contract silently \u2014 changing a field's meaning, removing a status code, tightening validation without warning \u2014 is not a technical decision. It is a breach of trust at scale.",
      "Good protocol design treats compatibility as the default and breakage as an event that requires ceremony: a major version bump, a deprecation window with real timelines, a migration path documented in detail, an escape hatch for the implementers who cannot move on your timeline. Bad protocol design treats compatibility as a constraint to be minimized so the maintainers can keep moving. The maintainers are not the customer. The ecosystem is.",
      "## The specification is the substrate",
      "An unwritten protocol is a protocol whose canonical reference is the source code of whoever happens to be most popular. This is how monocultures are born, and how the smaller players in an ecosystem get forced into a permanent role of guessing what the leader meant. If the protocol matters, write it down. Write it down with examples. Write it down with the edge cases. Write it down with the deliberate ambiguities labeled as such, so the implementer does not assume one resolution and discover, six months later, that another implementer assumed the opposite.",
      "A specification is not a marketing document. It does not get to use the word 'should' when it means 'must.' RFC 2119 exists for a reason. Use the keywords. Mean them. The reader is going to base production decisions on the precision of your prose.",
      "## What to do when you must extend",
      "Leave room to extend, but never silently. A reserved field is a future feature with a name. An ignored unknown is a forwards-compatibility gift to your future self. A capability negotiation step at the start of a session is a thousand times cheaper than discovering, at scale, that half the implementations cannot handle the new option you shipped.",
      "And document the extension contract before you ship the first extension. If the rule for unknown fields is 'ignore', say so. If the rule is 'reject', say so, and accept that you have just constrained every future change. Either is defensible. What is not defensible is leaving the rule unspecified and letting the ecosystem split into 'strict' and 'lenient' camps that quietly stop being interoperable.",
      "## Design like a stranger is going to read it",
      "Design protocols the way you would draft a contract with a stranger you trust but cannot supervise. Be explicit. Be conservative. Leave room to extend, but never silently. Assume that the version of the world in which everyone updates simultaneously does not exist, because it never has.",
      "The protocol that survives is the one whose authors took the boring parts seriously. The exciting parts are why people adopt it. The boring parts are why they stay.",
    ],
  },
  {
    number: "152.4",
    slug: "sensory-load-is-a-system-resource",
    title: "Sensory Load Is a System Resource",
    dek: "Treat the nervous system like the constrained machine it is.",
    date: "May 10, 2026",
    type: "essay",
    body: [
      "The nervous system is a constrained machine. It has bandwidth, latency, a thermal budget. Light, sound, fabric, social context \u2014 all of these consume capacity, and they consume it whether or not you notice them consuming it.",
      "AuDHD bodies make the budgeting visible because they cannot hide the deficit. The fluorescent hum that a colleague filters automatically is, for someone else, a background process eating thirty percent of cognition for the day. The cost is not the noise itself \u2014 noise is cheap. The cost is the suppression. The cost is the daemon you did not consent to run, draining a battery you needed for the work the company actually hired you to do.",
      "## The load is real even when it is invisible",
      "Sensory load behaves the way memory pressure behaves on a machine. Below a threshold, nothing is wrong. Above the threshold, everything slows down at once, and the symptoms look like personality flaws: short temper, decision fatigue, the sudden inability to compose a sentence in a meeting. We pathologize the surface and ignore the resource graph underneath. The person did not become incompetent at 3pm. The system ran out of capacity and started swapping.",
      "This is why telling a sensitive nervous system to 'just push through' is the same instruction as telling a database to 'just handle the load' when the connection pool is exhausted. The advice is not wrong because it is unkind. The advice is wrong because it does not name the actual bottleneck. The bottleneck is the pool. The bottleneck is the room.",
      "## Designing the room is engineering work",
      "When I build a workspace, I treat it the way I treat a production environment. What is the baseline draw? What are the spikes? What is the cost of recovery after a spike? The lamp that replaces overhead lights is not aesthetic preference. It is a config change that drops idle CPU by ten percent. The noise-cancelling headphones are not antisocial. They are a firewall. The Pomodoro timer is not a productivity hack. It is a scheduler with explicit yield points, because the nervous system, like any cooperative runtime, needs places to hand control back.",
      "Teams that take sensory load seriously make these affordances defaults instead of accommodations. The conference room with a dimmer. The Slack channel that is allowed to be quiet for hours. The meeting that comes with an agenda twenty-four hours in advance so the room is not also a cold-start problem. None of this is expensive. All of it compounds.",
      "## What you get back",
      "Give the machine fewer things to compensate for and you will get more of what you actually want from it: presence, judgement, sustained attention, the kind of careful pattern-matching that the loudest meeting room reliably destroys. The engineer who looked checked out in the standup will, given thirty minutes of quiet and a written brief, return the analysis that unblocks the quarter.",
      "This is not accommodation in the apologetic sense. This is correct systems thinking applied to the substrate the rest of the work runs on. Every other resource in the stack \u2014 compute, memory, network, on-call attention \u2014 we model carefully and protect from waste. The human nervous system is the only resource we still treat as infinite, and then act surprised when it brownouts on schedule.",
      "## A note from the orchid dark",
      "I am writing this from the same desk where, three years ago, I spent a full afternoon unable to figure out why I could not write a single useful sentence. The answer turned out to be a streetlight outside the window that had developed a faint flicker, just at the edge of what the eye registers consciously. I changed nothing about my discipline. I closed the blind. The afternoon returned. The machine had not failed. The room had.",
      "Treat the room as code. Treat the body as infrastructure. The work that follows will be better, and it will cost less to produce.",
    ],
  },
  {
    number: "005.1",
    slug: "the-tyranny-of-the-default",
    title: "The Tyranny of the Default",
    dek: "Most users will never change the setting. Design accordingly.",
    date: "May 3, 2026",
    type: "essay",
    body: [
      "Most users will never change the setting. Not because they cannot \u2014 because they will not. The default is the product. Every option you bury in a preference pane is a decision you have effectively made on behalf of ninety-five percent of the people who will ever touch the software.",
      "## Defaults are policy in disguise",
      "Treat the default as a public statement, because that is what it is. The default font size decides who can read the product without help. The default privacy setting decides who is safe inside it. The default notification cadence decides whose evening the product is allowed to interrupt. The default consent flow decides what the company knows about its users next quarter, and what the regulator finds when they audit twelve months from now.",
      "Engineering teams talk about defaults as if they were small \u2014 a checkbox here, a dropdown there, a quiet line in a config file. They are not small. They are the only setting most of the userbase will ever experience. The advanced panel where you so carefully exposed the toggle is, for the vast majority, a room they will never enter. The toggle exists for your conscience, not for them.",
      "## The user is not lazy. The user is rationing.",
      "It is tempting to read the user's refusal to change the setting as apathy. It is not apathy. It is correct cognitive triage. The user did not buy the software to configure it. They bought it to do the thing the marketing page promised. Every minute spent in preferences is a minute stolen from the actual job. A rational user spends as few of those minutes as possible.",
      "This is the same calculus an engineer applies to a new dependency. You do not read the entire config surface of every library you import. You trust that the maintainers have chosen sane defaults for the common case, and you only descend into the options when something breaks. Your users are doing exactly that with your product. The defaults are the API.",
      "## How defaults concentrate power",
      "Whoever sets the default exercises power on behalf of everyone who keeps it. That is most of the userbase. The product manager who quietly flips a telemetry default from off to on is not making a UX decision \u2014 they are conducting an opt-out surveillance program at the scale of the entire install base, and they are doing it without the friction of asking. The same logic applies to defaults that decide who sees whose content, which model answers which question, which currency the price is shown in, which pronouns the form accepts.",
      "If a feature is too sensitive to be a default, it is too sensitive to be a quiet toggle. Either earn the right to default it on by making the value obvious and the risk small, or stop pretending the choice is the user's. There is no neutral third option. Inaction is a default too.",
      "## A test for the team",
      "Before any release, ask the team a single question about each new default: if we were forced to publish a sentence in the press release explaining this default, what would the sentence be? If the sentence is unembarrassing \u2014 'we default to dark mode because eighty percent of our users prefer it after one session' \u2014 the default is probably honest. If the sentence is squirmy \u2014 'we default to sharing your contact list because it improves our growth metrics' \u2014 the default is policy you are hoping no one notices.",
      "Apply the same test to the defaults you inherit. The codebase came with values someone else chose, often years ago, often for reasons no one remembers. They are still policy. They are still yours now.",
      "## Argue about defaults like adults",
      "The healthiest teams I have worked with treat default-setting as a small ritual. The proposal names the default. The proposal names the alternative. The proposal names who is affected and how the team will know if the choice was wrong. The decision is written down with a date and an author. Six months later, when the metric turns or the regulator calls, the team can answer the question 'why is it set this way' without convening a seance.",
      "Defaults are the part of the product that scales without consent. Design them with the seriousness that scale deserves.",
    ],
  },
  {
    number: "770.1",
    slug: "aesthetics-as-affordance",
    title: "Aesthetics as Affordance",
    dek: "Beauty is not decoration. It tells the hand where to go.",
    date: "Apr 26, 2026",
    type: "essay",
    body: [
      "Beauty is not decoration. It tells the hand where to go. A well-shaped button invites a press the way a doorknob invites a turn \u2014 the form encodes the function, and the user does not have to read instructions to know what is asked of them.",
      "## The lie of decorative polish",
      "Engineering teams often treat aesthetics as the final coat of paint \u2014 the layer you add when the 'real' work is done. This framing is upside down. The visual language is the user's first model of the system, formed in the first two seconds, and that model decides whether the next click is confident or hesitant. Polish is not a topcoat. It is the moment the surface and the behaviour finally agree on what the product is.",
      "When aesthetics and affordance separate, the interface starts lying. A flat label that behaves like a button. A heading that turns out to be clickable. A card that looks tappable but is not. Each of these is a tiny breach of the implicit contract the surface made with the eye, and the user pays the cost in the form of suspicion. After enough breaches, they stop trusting the screen at all, and the product begins to feel hostile for reasons no support ticket can articulate.",
      "## Form is documentation",
      "A door with a flat plate where the handle should be is communicating, even when no one labels it. A door with a vertical bar is asking to be pulled. A door with a horizontal one is asking to be pushed. When the form contradicts the verb \u2014 the famous 'Norman door' with a pull handle on the side you are supposed to push \u2014 we blame the user for hesitating, when the truth is the door wrote a lie in its own grammar.",
      "Interfaces have the same grammar. A primary button should look like a commitment. A secondary button should look like a hedge. A destructive action should look like it is going to cost you something. When the visual weight does not match the consequence, users either over-click and regret it, or under-click and miss the function entirely. Either way, the product loses.",
      "## The aesthetic budget is a UX budget",
      "Every product has a finite supply of visual emphasis. Bold colors, large type, animation, contrast \u2014 all of these draw attention, and attention is a zero-sum resource. The team that gives every element the loudest treatment has effectively given no element any emphasis at all. The eye gives up trying to rank what matters and starts scanning randomly. This is why dashboards full of 'urgent' red end up feeling calmer than the team intended: red lost its meaning the third time it appeared on the page.",
      "Treat the aesthetic budget like a feature flag system. Most things are off. A few things are on. The few that are on are the ones the product is actually trying to direct the user toward. Restraint is not minimalism for its own sake. It is the only way the loud moments stay loud.",
      "## Aesthetics carry accessibility",
      "Good visual hierarchy is good accessibility. Contrast helps low-vision users and helps the rest of us read the screen in sunlight. Generous spacing helps motor-impaired users tap the right target and helps the rest of us scan faster. Type that respects line-height helps dyslexic readers and helps everyone who is tired at the end of a long day. The accommodation is the affordance, again and again. The team that designs the surface carefully is, without trying, designing the product that more people can use.",
      "The reverse is also true. The product that ignores aesthetic discipline ships a thousand small accessibility bugs by accident. Color combinations that fail contrast checks. Hit targets the size of a grain of rice. Type sizes inherited from a design tool no one questioned. The bug list is endless because the root cause is upstream of any individual screen.",
      "## Make polish a phase, not a vibe",
      "If your process treats polish as something that happens 'when there is time,' there will never be time. Schedule it. Name it. Make it a deliverable the same way you would treat a security review. The cost of doing it later is not just rework \u2014 it is the cumulative interest of every user who formed a slightly wrong model of the product before you got around to fixing it.",
      "Beauty earns its keep when it helps the user move. Until then, it is decoration, and decoration is what people delete in the next release.",
    ],
  },
  {
    number: "006.31",
    slug: "prompt-engineering-is-just-writing",
    title: "Prompt Engineering Is Just Writing",
    dek: "The model rewards the same clarity an editor would.",
    date: "Apr 19, 2026",
    body: [
      "The model rewards the same clarity a good editor would. Specific verbs, defined audience, stated constraints, examples instead of adjectives. None of this is new craft. It is the same advice that has been printed in writing handbooks since the typewriter.",
      "What is new is the immediacy of the feedback. Write a vague brief, get vague output, fix the brief, watch the output improve in seconds. The model has accidentally become the most patient writing tutor most engineers have ever had access to.",
      "Treat prompt engineering as a writing practice and your prompts get shorter, sharper, and more honest about what you actually want. The improvement transfers. The next memo you write to a human will be better too.",
    ],
  },
  {
    number: "025.4",
    slug: "tags-are-not-taxonomies",
    title: "Tags Are Not Taxonomies",
    dek: "A flat label set is not a classification system, no matter how many you add.",
    date: "Apr 12, 2026",
    body: [
      "A flat label set is not a classification system, no matter how many labels you add. Tags are a folksonomy \u2014 bottom-up, overlapping, full of near-synonyms. Taxonomies are top-down, exclusive, and committed to a theory of how the world divides.",
      "This matters because users navigate them differently. Tags are good for serendipity and recall: I remember a vibe, I follow the vibe, I find adjacent things. Taxonomies are good for completeness and audit: show me everything in this category and nothing outside it.",
      "Pick the structure that matches the question your users are actually asking. And when you find yourself adding a `meta` tag to tag your tags, accept that you have grown a taxonomy by accident and start designing it on purpose.",
    ],
  },
  {
    number: "005.8",
    slug: "the-changelog-as-narrative",
    title: "The Changelog as Narrative",
    dek: "A changelog is the only history book some projects ever write.",
    date: "Apr 5, 2026",
    type: "essay",
    body: [
      "A changelog is the only history book some projects ever write. Long after the original team has dispersed, the changelog is what tells the next maintainer why the system looks the way it does. It is the closest thing software has to an oral tradition.",
      "## The reader you will never meet",
      "Write the changelog for a stranger. Not the teammate sitting two desks away who already knows the context. The stranger \u2014 the maintainer in three years, the auditor on a deadline, the new hire on day four, the customer support engineer trying to reconstruct what shipped the week the bug started. None of them were in the room when the decision was made. The changelog is the room, preserved.",
      "This shifts what counts as a good entry. `Fixed bug in auth.` tells the stranger nothing. Which bug. Whose bug. What was the cost while it was open. What did we learn. The version number is a chapter heading; the entry beneath it is the chapter. A chapter that says only 'something happened' is not a chapter \u2014 it is a tombstone.",
      "## The changelog as a debugging artifact",
      "Every long-running system eventually produces the question 'when did this start.' A good changelog is the first place you look. A bad changelog is the reason the question takes a week to answer. The team that wrote 'Refactored billing module' in version 2.4.0 has condemned its future self to bisecting fifty commits to find the line that changed the rounding rule. The team that wrote 'Switched invoice rounding from banker\u2019s rounding to half-up to match the new regulator guidance (ticket #4412)' has handed its future self the answer for free.",
      "Treat the changelog as documentation that doubles as a debugger. Every entry should let a reader form a hypothesis about whether this is the change that caused the symptom they are investigating. If the entry cannot do that, it is undertelling its own story.",
      "## Narrative beats taxonomy",
      "Many teams over-structure changelogs into rigid categories \u2014 Added, Changed, Fixed, Removed \u2014 and then write inside those buckets as if the bucket were the explanation. The bucket is not the explanation. The bucket is a filing system. The reader still needs sentences.",
      "The best changelogs read like a quiet, accurate diary. They name what changed, why it changed, who asked for the change, and what to do if the change surprises you. They link to the pull request for the patient reader and to the upgrade note for the impatient one. They are not afraid to admit a mistake \u2014 'reverted the previous attempt; it caused a regression in webhook delivery; here is the post-mortem' \u2014 because the admission is what keeps the document trustworthy.",
      "## How to write one without hating your life",
      "The trick is not heroic discipline. The trick is to write the entry while the work is fresh, in the same pull request that ships the change. The author already knows the answer to the three questions \u2014 what changed, why, what to watch for. Writing them down takes ninety seconds. Reconstructing them six months later, for a release manager who was on parental leave when it shipped, takes an afternoon and is usually wrong.",
      "Codify it in the template. The PR description has a section called CHANGELOG. The merge bot refuses the merge if it is empty. The release script concatenates the section into the public document with the version number on top. The cost moves from one painful weekly ritual to a frictionless byproduct of work that was happening anyway.",
      "## The historical record is yours to shape",
      "Years from now, the company will tell a story about what it built. The marketing site will smooth it. The press releases will compress it. The conference talks will dramatize it. The only artifact that will reliably remember the actual sequence of decisions is the changelog \u2014 if you wrote it like it mattered.",
      "Write it like it mattered. The stranger is coming. They will be in a hurry. They will be grateful for any sentence that helps them understand why this line of code exists, and resentful of every line that does not.",
    ],
  },
  {
    number: "302.2",
    slug: "async-first-is-an-accessibility-feature",
    title: "Async-First Is an Accessibility Feature",
    dek: "Defaulting to async is how distributed teams stop punishing different nervous systems.",
    date: "Mar 29, 2026",
    type: "pillar",
    body: [
      "Defaulting to async is how distributed teams stop punishing different nervous systems. The synchronous meeting assumes a body that can context-switch on demand, parse spoken language in real time, mask its affect under social pressure, and recall decisions made out loud with no written record. That body is a minority of bodies. The rest of us have been quietly compensating for an interface that was never designed with us in mind.",
      "The first time I noticed how much the office was costing me, I was on a video call where five people debated the same architectural question for forty minutes, reached a decision I could not have repeated under oath, and then asked me to ship the work. I asked, that evening, whether anyone could send the decision in writing. No one had taken notes. The decision lived in five different heads, in five subtly different shapes. By the end of the week it had drifted into a sixth shape, in mine.",
      "## What synchronous defaults actually assume",
      "The synchronous meeting assumes that the cost of participation is uniform. It is not. For people with AuDHD, sensory processing differences, anxiety, hearing impairment, English as a second language, caregiving responsibilities, or simply a different time zone, the cost of being 'on' for a one-hour call is enormous compared to the cost of writing the same content out in a doc. The output looks similar. The input cost is wildly different. Sync-first teams optimize for the wrong axis.",
      "It also assumes that the loudest voice in the room is the best signal in the room. Often it is not. The strongest engineer on the team may be the one who needed forty-five minutes and a quiet kitchen to formulate the objection that would have saved the project. They do not get those forty-five minutes in a meeting. The decision ships without their input. The org calls this 'velocity' and is surprised when it has to be reversed three sprints later.",
      "## Async-first as legible decision-making",
      "Async-first writes the meeting down. The decision exists in a document. The reasoning exists in a thread. The dissent exists in a comment with a timestamp and a name attached to it. Six months later, when someone asks why the system looks the way it does, the answer is retrievable in twenty seconds instead of being reconstructed from competing memories of who said what in a room that has since dispersed.",
      "This is not a tooling problem. Notion, Linear, GitHub discussions, Loom, Slack channels with permalinks \u2014 the substrate has been adequate for years. The blocker is cultural. Teams default to meetings because meetings feel productive in real time. They are mostly productive in the way that pacing the floor feels productive: motion confused with progress. The first weeks of an async-first transition feel slower because they are honest about how slow synchronous thinking actually was.",
      "## The accessibility frame is the load-bearing one",
      "When I call async-first an accessibility feature, I do not mean it as a compliance argument. I mean it as systems design. The teams that succeed with neurodivergent contributors, contributors across time zones, parents on the second shift of childcare, and engineers who do their best thinking before 7am are the teams that already had to write things down. They did not retrofit access. They built the substrate that made access incidental.",
      "It is the same pattern as captioning. Captions were added for the Deaf and hard-of-hearing community. The benefit cascaded \u2014 second-language viewers, viewers in loud environments, viewers who want to watch while a baby naps, search indexers that can now find a moment inside a video. The accommodation became the affordance. Async-first is captions for collaboration.",
      "## What async-first is not",
      "Async-first is not slow. Decisions can still close in hours when the question is well-formed. Async-first is not no meetings. Meetings still happen \u2014 for synchronous decisions that genuinely require a real-time conversation, for relationship-building, for the rare crisis where parallel writing would be too slow. Async-first is not asocial. The teams that do it well often have richer social rituals because they are no longer using calendar slots to manufacture connection.",
      "What async-first refuses is the assumption that being in a meeting is the proof of work. It demands an artifact instead \u2014 a document, a PR, a decision log, something a reader can audit. The artifact is the deliverable. The meeting, if there even was one, is a side effect.",
      "## How async-first fails when it fails",
      "Async fails when teams treat it as a license to write less, not more. The whole substrate depends on writing \u2014 clear, well-structured, generous-with-context writing. A team that goes async and writes one-liners has just made themselves less legible than they were when they spoke out loud. The cost moves from real-time participation to opaque writing, which is worse, because at least the meeting had a witness.",
      "Async also fails when there is no decision protocol. Documents pile up. Comments pile up on documents. Nothing gets closed. The team feels busy and ships nothing. The fix is not to return to meetings. The fix is to add a small piece of governance \u2014 every thread has an owner, a deadline, and a clear definition of done. The accessibility feature still works. It just needs the rails.",
      "## What changes when you build this way",
      "The team that can think on paper together is the team that can include people who think differently. It is also the team that can hire across continents without optimizing for who can stomach the most calls. It is the team whose institutional memory survives turnover, because the reasoning is in the substrate and not in the heads of the people who happen to still work there.",
      "These are not soft benefits. They are recruitment, retention, and operational continuity. The case for async-first is not 'be kind to your colleagues.' It is: design the team for the bodies and minds and time zones you actually have, instead of the imaginary uniform participant the meeting culture was built around.",
      "Treat async as the accessibility feature it is. The team that writes down its thinking is the team that gets to keep its thinking. Everyone benefits \u2014 the people the meeting was already failing, and the people the meeting was working for who never knew the alternative existed. // JV, from the orchid dark.",
    ],
  },
  {
    number: "005.12",
    slug: "the-cost-of-cleverness",
    title: "The Cost of Cleverness",
    dek: "Clever code is a loan against the next reader's attention.",
    date: "Mar 22, 2026",
    type: "essay",
    body: [
      "Clever code is a loan against the next reader's attention. You felt smart writing it. The next person to open the file is going to spend ten minutes reverse-engineering what a clear line would have communicated instantly. Multiply by every reader, forever.",
      "## The interest rate compounds",
      "Software is a multi-reader medium. The author writes a line of code once. The line is then read \u2014 by the same author six months later, by the new hire on day twelve, by the on-call engineer at three in the morning, by the auditor preparing for the compliance review, by the static analyzer, by the next refactor, by the AI assistant trying to summarize the change for a pull request. Each of those readers pays a small comprehension tax. Multiply the tax by the readers and the line is not free. It is a recurring bill, and the bill scales with how clever the line was.",
      "Boring code is the opposite trade. It is slightly longer to write. It is much cheaper to read. Multiply that across years and teams and the savings are obscene. The honest measure of code quality is not how concise it is. It is how cheap it is for a stranger to change safely. By that measure, most of the code we admire in language showcases is not good code. It is exhibition code, designed to be looked at, not lived with.",
      "## Cleverness as a personality tax",
      "There is a particular flavour of cleverness that is really a status performance \u2014 the one-liner that uses three obscure language features to do what a five-line loop would have done. It is rarely about performance. It is about signaling. The author is telling the rest of the team how fluent they are. The team gets the signal. The team also gets a line of code they cannot safely modify without a meeting.",
      "Senior engineers tend, with time, to write more boring code, not less. They have been the reader on the other end of someone else's brilliance enough times to know what it costs. They have also discovered that the team's collective velocity matters more than any individual moment of self-expression. The boring solution is often the courteous one.",
      "## Where cleverness still earns its keep",
      "There are places where cleverness pays its own interest. Hot paths where a smarter algorithm shaves milliseconds at scale. Library internals that thousands of downstream callers depend on, where one careful optimization moves the floor for everyone. The rare crevice where a domain genuinely demands a non-obvious solution \u2014 cryptography primitives, lock-free data structures, the parser for a language you cannot change. In those places, write the clever code. Then write the comment that explains why it had to be clever, the test that pins its behaviour, and the benchmark that proves the cleverness was worth the cost.",
      "Everywhere else, the answer is to be boring on purpose. The verbose name. The explicit early return. The flat conditional instead of the nested ternary. The named intermediate variable that gives the reader a place to rest. None of this is bad taste. It is hospitality.",
      "## The team contract",
      "Treat code clarity as a team agreement, not a personal preference. Pull requests that lean clever should have to justify the cleverness, not the other way around. The default in review is 'rewrite this to be more obvious unless you can explain why obvious would be worse.' The team that holds the line on this for a year ends up with a codebase that new hires can be productive in by week two, instead of week eight. The savings are real. They show up in onboarding time, in incident response time, in how fast a team can pivot when the business changes its mind.",
      "## A small daily discipline",
      "Before you merge, read your own diff as if you were seeing it for the first time. If a line makes you reach for the language spec to remember what it does, the next reader will too \u2014 except the next reader will not have the benefit of having written it. Rewrite the line. Be boring on purpose. The next reader is you, in eighteen months, on a Sunday night, trying to fix something before Monday. Be kind to them.",
      "Cleverness is a debt. Pay it where the return justifies it. Decline it everywhere else.",
    ],
  },
  {
    number: "650.1",
    slug: "the-portfolio-as-evidence",
    title: "The Portfolio as Evidence",
    dek: "A portfolio is not a brag sheet. It is a case file.",
    date: "Mar 15, 2026",
    body: [
      "A portfolio is not a brag sheet. It is a case file. Each piece is an exhibit submitted in support of a claim about how you think \u2014 what you notice, what you choose, what you are willing to defend.",
      "The strongest portfolios are ruthless about omission. They show the work that proves the thesis and nothing else. A noisy portfolio undermines its own argument; a focused one lets the reader trust that everything they are seeing was chosen on purpose.",
      "Write the captions like a curator, not a r\u00e9sum\u00e9. Say what the problem was, what the constraint was, what the call was, what you would do differently. Evidence with context is testimony. Without context, it is just decoration.",
    ],
  },
  {
    number: "658.3",
    slug: "mentorship-in-fast-moving-industry",
    title: "On Mentorship in an Industry That Moves Too Fast",
    dek: "The half-life of technical knowledge in this field is short.",
    date: "Mar 8, 2026",
    cover: coverMentorship,
    body: [
      "The half-life of technical knowledge in this field is short. The framework that paid your rent in 2018 is a museum piece by 2026. This is the part that makes traditional mentorship \u2014 apprentice learns master's stack \u2014 almost useless.",
      "What does not decay is taste. How to read a system, how to weigh a trade-off, how to know when a meeting needs to end, how to call a bad idea a bad idea without crushing the person who brought it. None of these depend on the language at the top of last week's Hacker News.",
      "Mentor for the slow-changing layer. Teach judgement, posture, and the willingness to be wrong in public. The tools will turn over. The way someone shows up to the work is what travels with them across every stack they ever touch.",
    ],
  },
  {
    number: "303.6",
    slug: "conflict-resolution-code-review",
    title: "Conflict Resolution in Code Review and in Life",
    dek: "Code review is conflict management with a technical object in the middle.",
    date: "Mar 1, 2026",
    body: [
      "Code review is conflict management with a technical object in the middle. The diff is the table. Two people sit on either side of it and negotiate what the system should be. The diff itself is neutral; the conversation around it is not.",
      "Reviewers who forget this end up writing comments that read as verdicts on the author rather than questions about the code. Authors who forget this end up defending lines of code as if the lines were the self. Both modes are expensive, and both are avoidable.",
      "Move the conflict back to the artefact. Ask about the code. Propose alternatives in the same spirit you would offer a colleague a different route on a map. The review is over when the system is better, not when someone wins.",
    ],
  },
  {
    number: "152.1",
    slug: "attention-depletion-curve",
    title: "Attention Is a Resource With a Depletion Curve",
    dek: "Attention degrades over the course of the day.",
    date: "Feb 22, 2026",
    body: [
      "Attention degrades over the course of the day. This is not a motivational claim. It is a measurable curve. The hour you spend on hard work at 9am is not the same currency as the hour you spend on hard work at 4pm, no matter how the calendar prices them.",
      "Honest scheduling treats the morning as scarce. Deep work first, meetings in the afternoon, admin in the trough. Reversing the order is a quiet act of self-sabotage that most teams perform out of habit.",
      "Track your own curve for a week before you trust anyone else's prescription. The shape is personal. The principle \u2014 that attention is a depleting resource and not a constant \u2014 is not.",
    ],
  },
  {
    number: "080.0",
    slug: "collection-as-curatorial-act",
    title: "The Collection as Curatorial Act",
    dek: "Every collection encodes a theory of what matters.",
    date: "Feb 15, 2026",
    locked: true,
    body: [
      "Every collection encodes a theory of what matters. The shelf, the playlist, the bookmark folder, the saved-for-later queue. Each inclusion is an argument and each omission is an argument and the whole thing, taken together, is a quiet manifesto about the collector's mind.",
      "This is why other people's collections are so revealing. You learn more about a person from the contents of their RSS reader than from their About page. The reader is an unguarded surface. The About page is performance.",
      "Curate your own collections on purpose. Prune. Reorder. Notice what you keep adding and what you keep avoiding. The collection is a mirror with a delay.",
    ],
  },
  {
    number: "051.0",
    slug: "newsletter-as-form-why-we-returned",
    title: "The Newsletter as Form: Why We Returned to Email",
    dek: "The newsletter is email with intentionality.",
    date: "Feb 8, 2026",
    body: [
      "The newsletter is email with intentionality. It arrives in a place the reader already trusts, on a cadence the writer commits to, in a format that resists infinite scroll. None of this is innovative. All of it is increasingly rare.",
      "The return to email is not nostalgia. It is a structural response to platforms that broke the contract between writer and reader. The feed reorders you. The algorithm demotes you. The inbox, for now, still delivers what was sent.",
      "Write the newsletter you would want to receive. Few links, real sentences, a beginning and an end. The form rewards restraint and punishes filler, which is more than can be said for most surfaces on the modern internet.",
    ],
  },
  {
    number: "020.0",
    slug: "library-as-first-api",
    title: "The Library as the First API",
    dek: "The library is an information retrieval system built around a specific access pattern.",
    date: "Feb 1, 2026",
    body: [
      "The library is an information retrieval system built around a specific access pattern: a human walks in, asks a question, and walks out with an object. Every part of the building \u2014 call numbers, signage, reference desk, hold shelf \u2014 is a UX decision made centuries before the term existed.",
      "Software keeps reinventing the library and pretending it invented something new. Catalogues become indexes. Holds become queues. Reference becomes search. The vocabulary changes; the problem does not.",
      "When you design a new system for finding things, study the library first. Several hundred years of iteration are sitting there, fully documented, available for the cost of a walk to the nearest branch.",
    ],
  },
  {
    number: "006.6",
    slug: "rendering-is-lying-beautifully",
    title: "Rendering Is Lying Beautifully",
    dek: "The screen shows you something that doesn't exist.",
    date: "Jan 18, 2026",
    body: [
      "The screen shows you something that does not exist. There is no button. There is a rectangle of coloured pixels arranged to convince your visual cortex that a button is present and pressable. The lie is so consistent that we stop noticing it is a lie.",
      "Good rendering tells the lie with care. Spacing, shadow, motion, hit area \u2014 each of these reinforces the fiction. Bad rendering breaks the spell, and the user is briefly aware that they are looking at a grid of squares pretending to be a tool.",
      "Treat the visual layer as a stage production rather than a printout. The job is not to display data. The job is to maintain the illusion under which the data becomes usable.",
    ],
  },
  {
    number: "006.32",
    slug: "machine-that-hallucinates-helpfully",
    title: "The Machine That Hallucinates Helpfully",
    dek: "The LLM hallucinates. This is not a bug in the traditional sense.",
    date: "Jan 11, 2026",
    body: [
      "The LLM hallucinates. This is not a bug in the traditional sense. It is the mechanism. The model generates the most plausible next token given everything that came before, and plausibility is not the same property as truth.",
      "What changes the calculus is that the hallucinations are often useful. A confident wrong answer can shake loose a right one in the reader's head. A fluent rephrasing can clarify a thought the user could not quite reach alone. The model is not a search engine. It is a collaborator with a known bias toward confident fabrication.",
      "Use it accordingly. Treat every claim as a draft that needs a source. Treat every draft as a starting move in a longer conversation. The machine is most helpful when you stop expecting it to be an oracle.",
    ],
  },
  {
    number: "005.7",
    slug: "schema-migration-as-archaeology",
    title: "Schema Migration as Archaeology",
    dek: "The migration file is a time capsule.",
    date: "Jan 4, 2026",
    body: [
      "The migration file is a time capsule. It records, in unambiguous SQL, what the team believed about the world on a specific day. Read the migrations in order and you can reconstruct the history of a product almost more reliably than from the commit log.",
      "This is why migrations should be written as if they will be read by strangers. Name them honestly. Comment the reasoning. Resist the urge to squash them into a clean origin story; the messiness is the evidence.",
      "When you join a project, read the migrations before the code. The schema is the skeleton. The application is the soft tissue that grew around it.",
    ],
  },
  {
    number: "005.43",
    slug: "garbage-collection-ethics-of-forgetting",
    title: "Garbage Collection and the Ethics of Forgetting",
    dek: "The garbage collector frees memory that is no longer reachable.",
    date: "Dec 28, 2025",
    body: [
      "The garbage collector frees memory that is no longer reachable. The premise is that some references are alive and some are dead, and the dead ones should be cleared so the living ones can breathe. This is also a description of an inbox, an archive, a relationship.",
      "Systems that never forget accrue weight. Every retained reference is a small obligation to remember. At scale, the obligation becomes a structural cost \u2014 slower lookups, larger surfaces, more places for an error to hide.",
      "Forgetting is not failure. Forgetting is maintenance. Design the schedule on which your systems \u2014 and your habits \u2014 are allowed to drop what they are no longer using.",
    ],
  },
  {
    number: "005.3",
    slug: "ghost-in-the-binary-undefined-behavior",
    title: "The Ghost in the Binary: Undefined Behavior",
    dek: "Undefined behavior is the boogeyman of systems programming.",
    date: "Dec 21, 2025",
    body: [
      "Undefined behavior is the boogeyman of systems programming. The language specification refuses to say what happens. The compiler is free to assume it cannot occur. The program runs anyway, until one day it does not, and the failure is shaped like nothing in the source.",
      "The unsettling part is the temporal distance between cause and effect. The bug was committed two years ago. It surfaces today because a new optimisation pass decided to trust an assumption no human ever wrote down.",
      "Treat undefined behavior as a category, not a curiosity. Lint for it. Sanitize for it. Assume that the absence of a crash today is not evidence of correctness \u2014 only of the compiler not yet having found a reason to punish you.",
    ],
  },
  {
    number: "003.0",
    slug: "systems-thinking-before-it-was-a-job",
    title: "Systems Thinking Before Systems Thinking Was a Job",
    dek: "People have been thinking in systems since before the vocabulary existed.",
    date: "Dec 14, 2025",
    body: [
      "People have been thinking in systems since before the vocabulary existed. The irrigation engineer, the midwife, the cathedral mason \u2014 each of them held complex feedback loops in their head and reasoned about second-order effects without ever using the phrase.",
      "What the formal discipline contributed was language, not perception. Diagrams, stocks and flows, leverage points. Useful scaffolding. But the underlying cognitive move \u2014 seeing a thing as part of a thing \u2014 is older than any of the books on the shelf.",
      "When you teach systems thinking, do not start with the diagrams. Start by pointing at something in the room and asking what would change if it were removed. Most people already know how to think this way. They have just been told that what they were doing was not real work.",
    ],
  },
  {
    number: "005.6",
    slug: "review-before-rewrite",
    title: "Review Before Rewrite",
    dek: "Most rewrites are reviews that were never written down.",
    date: "Dec 7, 2025",
    body: [
      "The urge to rewrite a system from scratch is almost always a confession that nobody ever sat down and read it carefully. The legacy code looks unintelligible because nobody on the current team has done the work of intelligence. A rewrite skips that work and pays for it in a different currency, usually a missed deadline.",
      "Read first. Write a memo. Map the modules. Identify the three load-bearing assumptions. Nine times out of ten, the rewrite shrinks to a refactor by the time the memo is done.",
      "The rewrite that survives this discipline is the one worth doing. The rest were just procrastination wearing a hard hat.",
    ],
  },
  {
    number: "004.3",
    slug: "local-first-as-a-stance",
    title: "Local-First as a Stance",
    dek: "Local-first is not nostalgia. It is sovereignty.",
    date: "Nov 30, 2025",
    body: [
      "Local-first software stores your data on your device first and the cloud second. The cloud becomes a syncing convenience, not a landlord. Power flows in the direction of the user instead of toward a billing portal that can decide tomorrow to deprecate you.",
      "This is not a Luddite position. It is a stance about who gets to read your files at 3am when the vendor's auth service is having a bad night. The answer should be: you do.",
      "Treat local-first as a design constraint, not a feature. Constraints shape better products than features ever do.",
    ],
  },
  {
    number: "004.65",
    slug: "networks-are-promises-not-pipes",
    title: "Networks Are Promises, Not Pipes",
    dek: "The wire makes no guarantees the protocol did not request.",
    date: "Nov 23, 2025",
    body: [
      "It is tempting to imagine the network as a pipe \u2014 bytes in one end, bytes out the other. The metaphor is wrong in every direction. The network drops, reorders, duplicates, delays, and corrupts. Every property you want from it is a promise some protocol made on top of the wire.",
      "Designing distributed systems is mostly the work of choosing which promises you can afford and which ones you have to live without. Saying yes to availability is saying no to something else; the trade is non-negotiable.",
      "Treat the wire as hostile geography. Build the smallest protocol that survives it.",
    ],
  },
  {
    number: "005.13",
    slug: "build-the-debugger-you-needed-yesterday",
    title: "Build the Debugger You Needed Yesterday",
    dek: "Tooling is just the previous bug, automated.",
    date: "Nov 16, 2025",
    body: [
      "Every senior engineer carries an internal museum of bugs that took too long to find. The good ones turn that museum into tooling \u2014 scripts, dashboards, lint rules \u2014 so the same bug class cannot eat anyone's afternoon again.",
      "This is the unglamorous work that compounds. Nobody writes a blog post about a lint rule. The lint rule will quietly prevent a hundred outages over its lifetime, none of which will show up in any retrospective because they did not happen.",
      "Build the debugger you needed yesterday. Future-you, and everyone you have not met yet, will inherit the savings.",
    ],
  },
  {
    number: "006.7",
    slug: "ui-state-is-a-state-machine-whether-you-admit-it",
    title: "UI State Is a State Machine Whether You Admit It",
    dek: "The bug is what happens in the transition you forgot to model.",
    date: "Nov 9, 2025",
    body: [
      "Every interface is a state machine. The only question is whether the team has drawn it. Skip the drawing and the machine still exists; it is just defined by an accidental web of booleans nobody can fully enumerate.",
      "The bug, when it arrives, is always in the transition nobody named. Loading-but-also-error. Submitted-but-not-yet-acknowledged. Authenticated-but-pending-MFA. These states exist in the wild whether or not the code admits them.",
      "Draw the machine. Name the states. Let the code reflect the diagram. The bug surface contracts immediately.",
    ],
  },
  {
    number: "005.74",
    slug: "databases-are-an-opinion",
    title: "Databases Are an Opinion",
    dek: "The schema is the team's worldview, written down.",
    date: "Nov 2, 2025",
    body: [
      "A database schema is not neutral storage. It is the team's worldview, written down in DDL. Which entities exist, which relationships are first class, which fields are required \u2014 every one of these decisions is a hypothesis about how the business actually works.",
      "When the schema and the business disagree, the schema usually wins, because the schema is the part that has tests and migrations and the business is the part that has feelings. The cost is paid in awkward workarounds at the application layer.",
      "Treat schema design as product design. The shape of the table determines the shape of the conversation it is possible to have with the data later.",
    ],
  },
  {
    number: "005.82",
    slug: "encryption-is-not-a-feature",
    title: "Encryption Is Not a Feature",
    dek: "It is the temperature at which trust is possible.",
    date: "Oct 26, 2025",
    body: [
      "Encryption keeps getting marketed as a feature, as if a product could meaningfully ship without it. This framing benefits the seller and harms the user. Unencrypted communication is not a baseline; it is a regression.",
      "Treat encryption as ambient, like indoor plumbing. The conversation worth having is not whether to encrypt but what the threat model is, who holds the keys, and what happens when the keys are lost or compelled.",
      "Anything less is theatre, and theatre is what gets people hurt when the threat model finally walks in the door.",
    ],
  },
  {
    number: "621.39",
    slug: "hardware-is-a-deadline",
    title: "Hardware Is a Deadline",
    dek: "Atoms do not patch on Tuesday.",
    date: "Oct 19, 2025",
    body: [
      "Software is forgiving in a way that hardware never is. You can ship a bug, write a hotfix, push it out by lunch. Hardware ships and then it is in the world, in someone's hand, drawing current from a battery that does not care about your roadmap.",
      "Engineers who cross from software into hardware learn this fast. Every revision has a cost measured in tooling, in supply chain lead time, in the patience of customers holding a device that cannot be silently fixed at 2am.",
      "The discipline travels well in the other direction. Treat at least one of your software releases per quarter as if it were hardware. The standards rise immediately.",
    ],
  },
  {
    number: "303.4",
    slug: "tools-shape-the-hands",
    title: "Tools Shape the Hands",
    dek: "The first thing a new tool builds is its user.",
    date: "Oct 12, 2025",
    body: [
      "The keyboard you type on, the editor you live in, the chat client that interrupts you \u2014 each of these is quietly shaping the kind of work you find easy and the kind you find hard. Tools are not neutral. They have opinions, and they install those opinions in the hands that use them daily.",
      "This is why tool choice matters more than tool quality. A worse tool that supports your taste will produce better work than a better tool that fights it.",
      "Choose tools the way you would choose neighbours. You will adopt their habits whether you mean to or not.",
    ],
  },
  {
    number: "658.4",
    slug: "management-is-a-bandwidth-problem",
    title: "Management Is a Bandwidth Problem",
    dek: "The job is not knowing. The job is allocating attention.",
    date: "Oct 5, 2025",
    body: [
      "New managers think their job is knowing the answers. Experienced managers know their job is allocating attention \u2014 theirs, the team's, the org's \u2014 across a problem space that always exceeds the supply.",
      "The hardest skill is not deciding what to work on. It is deciding what to publicly stop caring about, so that the team can stop spending compute on it too. Every unmade decision is a leak.",
      "Spend the bandwidth like it costs real money. It does.",
    ],
  },
  {
    number: "652.5",
    slug: "email-is-an-interface",
    title: "Email Is an Interface",
    dek: "The inbox is a UI everybody ships into.",
    date: "Sep 28, 2025",
    body: [
      "The inbox is a UI every product ships into, whether the product team thinks of it that way or not. The transactional email is an onboarding screen rendered in a stranger's client, with no design system, no live preview, and no telemetry.",
      "Teams that take this seriously write email like product. Plain text alternates, real subject lines, sensible from-addresses, a single clear action. Teams that do not are leaking trust at every send.",
      "The cheapest thing you can ship next quarter is an email cleanup. Nobody will notice. That is the point.",
    ],
  },
  {
    number: "004.6781",
    slug: "webhooks-are-the-handshake-with-a-stranger",
    title: "Webhooks Are the Handshake With a Stranger",
    dek: "A webhook is a public mailbox. Treat it like one.",
    date: "Sep 21, 2025",
    body: [
      "A webhook endpoint is a door you have left unlocked on the internet. The stranger walking through it is supposed to be a known partner, but the door does not know that. The verification is your job.",
      "Sign payloads. Check signatures. Reject anything that does not match. Treat replays as hostile until proven otherwise. None of this is paranoia. It is the cost of opening a mailbox the public can write to.",
      "Webhooks fail quietly when they fail. Build the alerting before you need it.",
    ],
  },
  {
    number: "303.483",
    slug: "the-platform-is-the-policy",
    title: "The Platform Is the Policy",
    dek: "Defaults govern more people than rules do.",
    date: "Sep 14, 2025",
    body: [
      "Policy documents matter less than people think and platform defaults matter more. The rule the legal team wrote about acceptable use will be read by nobody. The dropdown that defaults to public will shape the behaviour of every user who ever touches it.",
      "If you want to change behaviour at scale, change the surface. Argue about the default. Move the friction. Add the speed bump. The legal page is downstream.",
      "Policy is what you say. The platform is what people do.",
    ],
  },
  {
    number: "400.1",
    slug: "plain-language-is-an-act-of-respect",
    title: "Plain Language Is an Act of Respect",
    dek: "Jargon is the cost of admission you should refuse to charge.",
    date: "Sep 7, 2025",
    body: [
      "Jargon is sometimes necessary. Most of the time it is a tax. The reader pays in attention, the writer collects in perceived expertise, and the actual work \u2014 communication \u2014 happens less often than it should.",
      "Plain language is harder to write because it requires you to actually understand the thing. The fog of jargon is what most authors hide behind when they have not yet figured out what they mean.",
      "Write plainly on purpose. The expertise that survives translation is the expertise that was real.",
    ],
  },
  {
    number: "411.0",
    slug: "interfaces-are-translations",
    title: "Interfaces Are Translations",
    dek: "Every screen is a sentence in someone else's first language.",
    date: "Aug 31, 2025",
    body: [
      "An interface is a translation between the system's internal language and the user's. Every label, every error, every empty state is a sentence the system is trying to say in a language it does not natively speak.",
      "Bad interfaces sound like the database. Good interfaces sound like a colleague. Great interfaces sound like the user's own thoughts, returned with slightly more confidence.",
      "Translate carefully. The user is not obligated to learn your vocabulary.",
    ],
  },
  {
    number: "005.117",
    slug: "abstractions-are-bets",
    title: "Abstractions Are Bets",
    dek: "An abstraction wagers that this difference will not matter later.",
    date: "Aug 24, 2025",
    body: [
      "Every abstraction is a bet that the differences it papers over will not matter. The bet pays off when the underlying details stay irrelevant. It bankrupts you when the details surge back into relevance and the abstraction starts lying to its callers.",
      "The skill is not avoiding abstractions. It is choosing the ones whose losing case you can afford. Premature abstractions are bets placed before the game has even started.",
      "Stay liquid. Abstract late, on purpose, against a real second use case.",
    ],
  },
  {
    number: "005.118",
    slug: "copy-paste-is-an-honest-first-draft",
    title: "Copy-Paste Is an Honest First Draft",
    dek: "Three call sites is when the shape becomes visible.",
    date: "Aug 17, 2025",
    body: [
      "Beginners are taught not to copy and paste. Experienced engineers do it on purpose, because three or four call sites of the same shape reveal more about the right abstraction than one site ever could.",
      "Refactor when the duplication starts to hurt \u2014 when changing one site implies you should have changed three. Until then, the duplication is reconnaissance.",
      "Premature DRY is more expensive than late DRY. Copy first; abstract once the shape is undeniable.",
    ],
  },
  {
    number: "510.0",
    slug: "math-is-a-debugger",
    title: "Math Is a Debugger",
    dek: "Symbols are a way to think more carefully than English allows.",
    date: "Aug 10, 2025",
    body: [
      "Mathematics is not a club for the credentialed. It is a notation for thinking carefully about things that are too slippery to hold in English. The symbols are scaffolding for ideas that fall apart in prose.",
      "Engineers who avoid math do not avoid the underlying difficulty. They just pay the price in vague reasoning, buggy intuitions, and back-of-envelope estimates that turn out to be order-of-magnitude wrong.",
      "Use math the way you use a debugger: as a tool you reach for when the situation has stopped being legible in words.",
    ],
  },
  {
    number: "530.11",
    slug: "time-is-not-a-line",
    title: "Time Is Not a Line",
    dek: "Causality is the only ordering distributed systems agree on.",
    date: "Aug 3, 2025",
    body: [
      "Distributed systems lose the comfort of a single timeline. Two events that happened in your wall-clock past may, from the system's perspective, be incomparable. There is no global now to appeal to.",
      "What survives is causality \u2014 the relation between events that one could have influenced the other. Logical clocks, vector clocks, and CRDTs are all attempts to track this thinner but more honest ordering.",
      "Stop reasoning about distributed systems with wristwatches. Reason about them with cause and effect.",
    ],
  },
  {
    number: "530.12",
    slug: "determinism-is-a-design-choice",
    title: "Determinism Is a Design Choice",
    dek: "A reproducible system is a system you can talk about.",
    date: "Jul 27, 2025",
    body: [
      "Determinism \u2014 the same input producing the same output \u2014 is not a property nature hands you. It is a constraint a team chooses to impose, and pays for, because the alternative is a system that cannot be reasoned about after the fact.",
      "Logs that lie. Tests that flake. Bugs that vanish in staging. Every one of these is a tax on non-determinism, charged at the worst possible moment.",
      "Design for determinism even when it costs more. The hours you spend up front buy you back days you would otherwise lose to the haunted house.",
    ],
  },
  {
    number: "363.34",
    slug: "resilience-is-a-rehearsal",
    title: "Resilience Is a Rehearsal",
    dek: "The plan you have not practiced is fiction.",
    date: "Jul 20, 2025",
    body: [
      "A disaster recovery plan that has never been executed is a creative writing exercise. Resilience is not the document. Resilience is the rehearsal \u2014 the runbook that has actually been run, the failover that has actually been tested, the team that has done it under load and survived.",
      "Theory is cheap. The first time you discover the backups were silently failing is during the restore you cannot afford to fail.",
      "Schedule the drill. Run it. Let it surface the ugly truth before the ugly truth arrives uninvited.",
    ],
  },
  {
    number: "005.83",
    slug: "authentication-is-the-easy-part",
    title: "Authentication Is the Easy Part",
    dek: "Authorization is where products are won and lost.",
    date: "Jul 13, 2025",
    body: [
      "Authentication \u2014 proving who someone is \u2014 is mostly a solved problem. Buy the library, follow the recipe, do not invent crypto. Two days of work, and a long tail of edge cases.",
      "Authorization \u2014 deciding what that someone can do \u2014 is where most products spend their actual security budget, and where most products quietly leak. The matrix of roles, resources, and contexts is the part nobody draws because the drawing would be embarrassing.",
      "Draw it anyway. The authorization model is the product, not a footnote.",
    ],
  },
  {
    number: "005.276",
    slug: "the-cost-of-real-time",
    title: "The Cost of Real-Time",
    dek: "Sub-second is a different product.",
    date: "Jul 6, 2025",
    body: [
      "Real-time is not a feature you bolt onto an existing product. Sub-second updates require an entirely different architecture \u2014 push instead of poll, optimistic UI, conflict resolution, retry semantics that did not exist before.",
      "Teams routinely under-budget the leap. The demo works. The production load reveals that the back-of-house was designed for batch.",
      "If real-time is the requirement, treat it as a re-platform, not a sprint. Anything less is wishful thinking with a websocket on top.",
    ],
  },
  {
    number: "005.46",
    slug: "operating-systems-are-political",
    title: "Operating Systems Are Political",
    dek: "The kernel decides who gets to do what to whom.",
    date: "Jun 29, 2025",
    body: [
      "An operating system is a peace treaty between processes that would otherwise eat each other. Scheduling, isolation, permissions \u2014 every kernel decision is a choice about who gets to do what to whom, enforced at gunpoint by the hardware.",
      "This is not a metaphor. The OS is the lowest layer at which a society of programs is possible. Change the kernel and you change the society.",
      "Read your OS the way you would read a constitution. The architecture is the politics.",
    ],
  },
  {
    number: "005.45",
    slug: "compilers-are-translators-with-taste",
    title: "Compilers Are Translators with Taste",
    dek: "Every optimization is an aesthetic preference.",
    date: "Jun 22, 2025",
    body: [
      "A compiler is not a neutral pipeline. It is a translator with taste, deciding which idioms to honour, which to rewrite, which to silently undo on its way to machine code. Two compilers given the same source will not produce equivalent binaries because they do not share preferences.",
      "Engineers who treat the compiler as a black box are surrendering decisions they did not know they were making. Read the assembly occasionally. The argument it is having with your source is instructive.",
      "Compilers have opinions. Yours should know what they are.",
    ],
  },
  {
    number: "305.5",
    slug: "class-is-an-input",
    title: "Class Is an Input",
    dek: "Every tool was built for someone, and that someone was usually not everyone.",
    date: "Jun 15, 2025",
    body: [
      "Software is not built in a vacuum. The expensive laptop, the second monitor, the quiet home office, the steady electricity \u2014 each of these is a default the builder did not always remember to question.",
      "Users on bad networks, shared devices, cheap hardware, and irregular power are not edge cases. They are most of the people on earth. Designing for them last is designing for them never.",
      "The default user in your head has a class. Notice whose.",
    ],
  },
  {
    number: "004.0285",
    slug: "accessibility-is-not-a-checklist",
    title: "Accessibility Is Not a Checklist",
    dek: "It is the practice of building for bodies that are not yours.",
    date: "Jun 8, 2025",
    body: [
      "Accessibility is too often delivered as a checklist of contrast ratios and ARIA labels appended to an otherwise indifferent product. The checklist is necessary; it is not sufficient.",
      "Real accessibility is a posture: building with the assumption that the user's eyes, ears, hands, and attention are not yours. The keyboard-only flow is not an alt path; it is a check on whether the UI was thought through at all.",
      "Ship as if you yourself might rely on the feature next year. The honesty improves the work.",
    ],
  },
  {
    number: "612.8",
    slug: "sleep-is-infrastructure",
    title: "Sleep Is Infrastructure",
    dek: "The brain has uptime requirements.",
    date: "Jun 1, 2025",
    body: [
      "Sleep is not a personal hygiene issue. It is the maintenance window the brain has scheduled with the body since the Pleistocene. Skipping it is not a productivity hack; it is taking the system down for an unplanned outage and pretending the metrics still mean something.",
      "Decisions made on five hours of sleep are not the same decisions you would have made on eight. The judgement is degraded in a way the person making the judgement cannot detect from the inside.",
      "Protect the maintenance window. The system above it is the only one you have.",
    ],
  },
  {
    number: "613.7",
    slug: "movement-is-a-debugger",
    title: "Movement Is a Debugger",
    dek: "The walk that solves the bug is doing more than you think.",
    date: "May 25, 2025",
    body: [
      "The walk that solves the bug is not a coincidence. Moving the body changes the brain \u2014 it lowers cortisol, increases blood flow, and shifts attention from focused to diffuse mode, which is where most insights happen.",
      "Engineers who treat exercise as time stolen from work have the accounting wrong. The hour spent walking returns multiples in better decisions made over the rest of the day.",
      "Move on purpose. Treat the walk as part of the debugger, because it is.",
    ],
  },
  {
    number: "616.85",
    slug: "burnout-is-a-systems-failure",
    title: "Burnout Is a Systems Failure",
    dek: "The individual broke because the environment was built to break them.",
    date: "May 18, 2025",
    type: "pillar",
    body: [
      "Burnout is rarely a personal failure. It is a systems failure the system found convenient to file under personal failure. The individual broke because the environment was built \u2014 through workload, expectations, ambient threat, and silence \u2014 to break them. Filing the outage under 'employee resilience' is how the system avoids the cost of redesign.",
      "I have watched five engineers burn out at three companies in the last decade. The pattern is identical every time. A high-output contributor gets handed work that scales faster than headcount. The handover is celebrated. They ship. They get more work. They ship that too. Then, somewhere between months nine and fourteen, the output collapses. The org calls it personal. The org is wrong. The org has been running them at one hundred and twenty percent utilization since the day they were promoted, and the failure is the system finally encountering the limit it was always going to encounter.",
      "## The wellness industry treats the symptom",
      "Meditation apps, mental health stipends, mandated PTO, wellness days, resilience training, ergonomic chairs \u2014 none of these are bad. They are also, almost without exception, downstream interventions for an upstream problem. They are sandbags around a foundation that is settling. They will not stop the settling. They will buy a quarter, maybe two, of false comfort while the structural issue continues to compound underneath.",
      "This is not a critique of the people delivering wellness programs. Most of them are genuinely trying to help. It is a critique of the organizations that fund those programs as a substitute for the harder work, because the harder work \u2014 reducing the load, changing the expectations, holding managers accountable for sustainable output \u2014 is uncomfortable in ways that buying a meditation subscription is not.",
      "## Treat burnout like a recurring outage",
      "When a service falls over for the third time in a quarter, you do not retrain the on-call engineer. You investigate the system. You ask what conditions keep producing this failure. You instrument. You add a runbook. You consider a rewrite. You absolutely do not file a ticket asking the database to develop more grit.",
      "Apply the same instinct to burnout. If three people on the team have burned out in two years, the team is the diagnosis, not the people. Something about how work is distributed, scoped, paced, or recognized is producing the failure with regularity. The fix is operational. Pretending it is personal is malpractice.",
      "## The variables you actually control",
      "Workload is the obvious one. It is also the one most managers refuse to touch, because reducing workload feels like admitting weakness to whoever set the workload. The second variable is autonomy: the ability to choose how, when, and in what order to do the work. Low autonomy at high load is the fastest burn pattern in the catalog. The third is recognition \u2014 not promotion, not stock, but the simpler thing of someone with authority noticing, out loud, that the work was hard.",
      "Beyond these are the less obvious variables: psychological safety to flag impossible deadlines without retribution, predictability of expectations week to week, alignment between the work and any sense of meaning the contributor still has the capacity to feel. These are management responsibilities. They are not yoga.",
      "## The AuDHD edge case is the canary",
      "Teams with AuDHD contributors burn out faster under bad conditions because the suppression cost is higher. The same fluorescent-lit open-plan office that mildly drains a typical brain catastrophically drains a sensory-sensitive one. The same vague brief that frustrates a typical engineer paralyzes one whose executive function is already under tax. The AuDHD contributor is not fragile. They are the canary in the coal mine, and the air the canary is breathing is the air the whole team is breathing.",
      "Designing for the edge case shores up the median. Reduce sensory load and everyone concentrates better. Clarify the brief and everyone ships faster. Make the meeting optional and everyone reclaims an hour. The accommodation, once again, becomes the affordance for everyone.",
      "## The cost of silence",
      "Most burnout cases I have witnessed had a long silent runway before the visible collapse. The contributor knew, weeks or months ahead, that they were running out. They did not say anything because saying something was career-coded as failure. By the time they spoke up, the collapse was already in motion and the only remaining intervention was an extended leave or a resignation.",
      "The org missed the signal because the org had not made it safe to send. This is the cheapest, ugliest failure on the list. A weekly 1:1 in which the answer to 'how are you' is always 'fine' is not a 1:1. It is a script. The cost of building a culture where the honest answer is sayable out loud is small. The cost of not building it is the engineer you would have kept for five more years.",
      "## What managers actually owe",
      "Managers owe accurate accounting. If the workload is unsustainable, say so to your own leadership in writing. If a project will require overtime to ship on the announced date, say that to the customer instead of to the contributor. If a contributor is signaling overload, believe them on the first signal, not the third.",
      "Managers also owe the obvious thing: the willingness to reduce the load when reducing it is the correct action. This is harder than it sounds, because reducing load means renegotiating commitments upstream, and renegotiating commitments upstream costs political capital. Spend the capital. The alternative is the slow erasure of the person who was doing the work.",
      "## What contributors can do",
      "Not everything is the org's job. Contributors can \u2014 and should \u2014 learn to read their own gauges. Sleep, appetite, exercise, the small evening rituals that mark the difference between a person and an extraction event. When the gauges start drifting, name it early, in writing, to a manager who has earned the right to hear it. If no manager has earned that right, the diagnosis is bigger than this essay can hold.",
      "Burnout is what happens when a system mistakes its workers for an infinite resource and then mistakes the resource for the problem when it runs out. The pattern is the diagnosis. Treat it the way you would treat any other recurring outage: stop blaming the on-call, fix the architecture, and write down what you learned so the next team does not have to relearn it in tears. // JV, from the orchid dark.",
    ],
  },
  {
    number: "796.01",
    slug: "games-teach-systems-thinking",
    title: "Games Teach Systems Thinking",
    dek: "Play is the safest place to fail.",
    date: "May 11, 2025",
    body: [
      "Games are the cheapest training environment for systems thinking the species has ever invented. Every game is a model \u2014 simplified, legible, with feedback loops fast enough to learn from. Players who win are the ones who internalize the model.",
      "This is not metaphor. Strategy games, tabletop, even card games are repeatedly the place where engineers report first encountering the habits of mind they later applied to production systems.",
      "Take play seriously. It is rehearsal disguised as leisure.",
    ],
  },
  {
    number: "793.93",
    slug: "ttrpgs-are-collaborative-software",
    title: "TTRPGs Are Collaborative Software",
    dek: "The rulebook is the kernel; the table is the runtime.",
    date: "May 4, 2025",
    body: [
      "A tabletop role-playing game is collaborative software running on the slowest, weirdest hardware in the world: a group of friends. The rulebook is the kernel. The table is the runtime. The session is the userland program.",
      "Every concept in software has an analogue at the table \u2014 versioning, forks, mods, technical debt, the moment when a feature request from the wizard breaks the encounter design.",
      "Run a campaign. You will learn more about product management than most product management books will teach you.",
    ],
  },
  {
    number: "700.1",
    slug: "craft-is-the-evidence-of-care",
    title: "Craft Is the Evidence of Care",
    dek: "Polish is what attention looks like when it stays.",
    date: "Apr 27, 2025",
    body: [
      "Craft is not a vibe. It is the concrete, observable evidence that someone cared enough to come back to the work after the deadline had passed and tighten the parts nobody would have noticed.",
      "Customers cannot always articulate what makes a crafted product feel different from a thrown-together one. They feel it anyway. The lifetime value is paid out in the difference.",
      "Schedule the second pass. The competitive advantage is hiding in the work nobody would have made you do.",
    ],
  },
  {
    number: "741.6",
    slug: "typography-is-a-trust-signal",
    title: "Typography Is a Trust Signal",
    dek: "Letter spacing reads before words do.",
    date: "Apr 20, 2025",
    body: [
      "Typography is the first thing a reader sees and almost never the first thing a designer fixes. Bad type is read as carelessness before anything is consciously read at all. Good type is read as competence before a single sentence has been parsed.",
      "This is not snobbery. It is signal. The reader is making a judgement about the institution behind the page in the half-second before their eyes settle into the prose.",
      "Spend the budget on the type. The trust dividend is enormous and almost entirely subconscious.",
    ],
  },
  {
    number: "770.4",
    slug: "photography-is-editing",
    title: "Photography Is Editing",
    dek: "The picture is what you chose to leave out.",
    date: "Apr 13, 2025",
    body: [
      "The camera captures everything in the frame. The photograph is what survives the photographer's choice about what to leave out. Composition is subtraction. Edit is subtraction. The exhibit is subtraction.",
      "The same principle generalises. The essay is what survives the cuts. The product is what survives the descopes. The decision is what survives the meeting after the bad options have been crossed off.",
      "Get comfortable with leaving things out. The work the audience receives is the work that survived the omissions.",
    ],
  },
  {
    number: "808.0",
    slug: "writing-is-thinking",
    title: "Writing Is Thinking",
    dek: "If you cannot write it down, you do not know it yet.",
    date: "Apr 6, 2025",
    body: [
      "Writing is not a way to communicate thinking that has already happened elsewhere. Writing is, for most working professionals, where the thinking actually happens. The fuzzy idea in your head becomes specific only when forced through the bottleneck of a sentence.",
      "This is why teams that write a lot make better decisions than teams that talk a lot. The talk feels like progress and produces fewer commitments. The writing produces fewer feelings and more decisions.",
      "Write the memo. The memo is the work, not its summary.",
    ],
  },
  {
    number: "808.4",
    slug: "essay-is-an-experiment",
    title: "The Essay Is an Experiment",
    dek: "To essay is to try, and trying is its own value.",
    date: "Mar 30, 2025",
    body: [
      "The word essay comes from the French essayer \u2014 to try. The essay is, at its root, an attempt. Not a verdict. Not a treatise. A try at thinking about something publicly, with the understanding that the trying is what counts.",
      "Modern blog culture has mostly forgotten this. Posts are pitched as conclusions, not attempts. The result is a flatter, more confident, less interesting body of writing.",
      "Bring the try back. Write the essay that you do not yet know the answer to. The reader will follow you into the question.",
    ],
  },
  {
    number: "371.1",
    slug: "teaching-is-debugging-yourself",
    title: "Teaching Is Debugging Yourself",
    dek: "You only see the gaps when someone else points at them.",
    date: "Mar 23, 2025",
    body: [
      "The fastest way to discover the gaps in your own understanding is to teach the thing. The student asks the question you assumed had an obvious answer, and the obvious answer turns out to be a folk belief you have been carrying for years.",
      "This is why mentoring pays back asymmetrically. The mentor gets a better-understood discipline. The mentee gets, eventually, a mentor of their own to surprise.",
      "Teach something every quarter. You will learn faster as a side effect than from any course you take.",
    ],
  },
  {
    number: "153.42",
    slug: "critical-thinking-is-a-muscle",
    title: "Critical Thinking Is a Muscle",
    dek: "The brain trains the way the body does.",
    date: "Mar 16, 2025",
    body: [
      "Critical thinking is not a personality trait. It is a muscle, and like any muscle it atrophies without use. The senior engineer who has not had a difficult conversation in three months has not been on sabbatical from criticism. They have been getting weaker.",
      "Reading things you disagree with, on purpose, is the equivalent of going to the gym. The discomfort is the workout.",
      "Schedule the disagreement. Without it the muscle softens and the team's collective judgement softens with it.",
    ],
  },
  {
    number: "153.43",
    slug: "disagreement-is-a-feature",
    title: "Disagreement Is a Feature",
    dek: "Consensus too early is a smell.",
    date: "Mar 9, 2025",
    body: [
      "A team that always agrees is a team where it is too costly to disagree. Consensus reached in under five minutes is almost never consensus. It is silence pretending to be agreement, and the unspoken objections will resurface later as missed deadlines and ghost rewrites.",
      "Healthy teams disagree visibly, name the trade-off, decide on purpose, and move. The argument is the feature, not the bug.",
      "Build a culture that can disagree on Tuesday and ship together on Wednesday. The team that cannot will neither disagree nor ship.",
    ],
  },
  {
    number: "658.45",
    slug: "async-is-a-political-position",
    title: "Async Is a Political Position",
    dek: "The meeting protects the loudest person in the room.",
    date: "Mar 2, 2025",
    body: [
      "Synchronous communication is not just a preference. It is a power structure. The meeting protects the people who think fastest in real time, speak the loudest, and forget what was said the moment the call ends.",
      "Async-first writing redistributes power. The slow thinker, the non-native speaker, the introvert, the person three time zones away \u2014 each of them gets the same shot at the document that the loudest extrovert in the room gets.",
      "Adopt async on purpose. The team you end up with is a different team than the meeting-first version would have produced.",
    ],
  },
  {
    number: "658.401",
    slug: "strategy-is-saying-no",
    title: "Strategy Is Saying No",
    dek: "Anyone can list opportunities. Strategy is the cuts.",
    date: "Feb 23, 2025",
    body: [
      "Strategy is not the list of things you intend to do. Strategy is the list of things you have decided not to do. The first list is brainstorming. The second list is leadership.",
      "Teams that confuse the two end up shipping ten half-features that compete for the same attention budget. The road map looks busy. The product feels incoherent.",
      "Write the no list. Share it. Defend it. The yes list will write itself once the no list is honest.",
    ],
  },
  {
    number: "658.402",
    slug: "prioritization-is-violence",
    title: "Prioritization Is Violence",
    dek: "Every yes is a no to a dozen possibilities.",
    date: "Feb 16, 2025",
    body: [
      "Prioritization is not a clean exercise. It is a violent one. Every yes on the road map is a quiet no to the dozen alternatives that were also viable. The shadow road map of unbuilt features is always longer than the visible one.",
      "Teams that hide this from themselves end up looking surprised when stakeholders are disappointed. The disappointment was load-bearing. Naming the cuts is what makes the chosen direction credible.",
      "Be honest about what you killed. The team that mourns its options ships the survivors with more conviction.",
    ],
  },
  {
    number: "658.403",
    slug: "decisions-are-cheap-reverts-are-expensive",
    title: "Decisions Are Cheap, Reverts Are Expensive",
    dek: "Make the call. Plan the rollback.",
    date: "Feb 9, 2025",
    body: [
      "Decisions, taken individually, are cheap. Reverts are expensive \u2014 not the technical revert, but the social one. Walking back a decision costs trust, momentum, and the small reservoir of credibility the leader was spending to make the original call.",
      "This is why good leaders are less interested in being right and more interested in being correctable. The system that makes reverts cheap is the system that can take more risk per decision.",
      "Decide. Document. Build the off-ramp. The off-ramp is the feature.",
    ],
  },
  {
    number: "658.404",
    slug: "scope-creep-is-a-symptom",
    title: "Scope Creep Is a Symptom",
    dek: "Nobody adds work to a project that was already winning.",
    date: "Feb 2, 2025",
    body: [
      "Scope creep is rarely greed. It is usually anxiety. Nobody adds new requirements to a project that is visibly on track. The extra feature is a hedge against the suspicion that the original feature will not justify the spend.",
      "Treat scope creep as a leading indicator. The stakeholder is telling you, in the only language available, that they do not yet believe.",
      "Address the belief, not the requirement. The scope will calm down once the confidence returns.",
    ],
  },
  {
    number: "658.5",
    slug: "operations-is-the-product",
    title: "Operations Is the Product",
    dek: "The dashboard is what the customer actually buys.",
    date: "Jan 26, 2025",
    body: [
      "For B2B products, the operations layer \u2014 the dashboard, the audit log, the invoice, the support escalation path \u2014 is often the product the customer actually experiences. The exciting AI feature is a bullet point. The status page is the relationship.",
      "Teams that under-invest in operations end up with a product their early adopters love and their enterprise customers cannot deploy. The gap between love and deployability is paid in renewals.",
      "Treat ops as a first-class surface. The boring parts are where the contract lives.",
    ],
  },
  {
    number: "658.51",
    slug: "metrics-shape-the-thing-they-measure",
    title: "Metrics Shape the Thing They Measure",
    dek: "The dashboard becomes the org chart.",
    date: "Jan 19, 2025",
    body: [
      "The metric you pick to track is the metric the team will quietly optimise for, including the parts of the metric that have nothing to do with the underlying outcome. This is Goodhart's law, restated with feeling.",
      "If the dashboard is page views, the team will eventually produce slideshows. If the dashboard is response time, the team will eventually move the slow work off the path being measured. The dashboard always wins.",
      "Choose the metric like you are choosing a destiny. Because, organisationally, you are.",
    ],
  },
  {
    number: "658.512",
    slug: "planning-is-rehearsing-the-failure",
    title: "Planning Is Rehearsing the Failure",
    dek: "The plan exists to be wrong on a schedule.",
    date: "Jan 12, 2025",
    body: [
      "The point of a plan is not to predict the future. The point is to give the team a coherent story to compare reality against, so that the moment reality diverges, the divergence is visible early.",
      "Plans that survive contact with reality are usually plans that were never specific enough to disagree with. Specificity is what makes a plan useful, not what makes it accurate.",
      "Write the plan to be wrong on purpose. The early disagreement is the value.",
    ],
  },
  {
    number: "336.2",
    slug: "budgets-are-belief-systems",
    title: "Budgets Are Belief Systems",
    dek: "The spreadsheet is a worldview, denominated in dollars.",
    date: "Jan 5, 2025",
    body: [
      "A budget is not a financial document. It is a worldview rendered in dollars. Where the money goes is where the organisation actually believes the future is, regardless of what its values page says.",
      "Read a company's budget and you will know more about its real priorities in twenty minutes than you would learn from a year of all-hands meetings. The slides lie; the spreadsheet does not.",
      "When the budget and the strategy disagree, the budget wins. Plan accordingly.",
    ],
  },
  {
    number: "336.3",
    slug: "technical-debt-is-a-vocabulary-problem",
    title: "Technical Debt Is a Vocabulary Problem",
    dek: "If finance cannot price it, engineering cannot pay it down.",
    date: "Dec 29, 2024",
    body: [
      "Technical debt is the engineering word for a class of cost that finance does not have a category for. The work is real. The cost compounds. The metaphor reaches for credit because credit is the closest concept the org understands.",
      "Until technical debt shows up on a balance sheet adjacent to actual debt, it will be deprioritised by anyone whose bonus depends on the actual numbers. The fix is mostly translation, not engineering.",
      "Learn to price the debt. The team that can put a dollar on the workaround is the team that gets time to fix it.",
    ],
  },
  {
    number: "658.314",
    slug: "one-on-ones-are-the-product",
    title: "One-on-Ones Are the Product",
    dek: "The meeting nobody talks about is the one that decides everything.",
    date: "Dec 22, 2024",
    body: [
      "The one-on-one is the meeting nobody puts on their highlight reel. It does not produce a deliverable. It does not generate a slide. It quietly decides whether the report stays, grows, leaves, or burns out, which makes it the most consequential thirty minutes on the manager's calendar.",
      "Treat it accordingly. Show up. Take notes. Follow up. Cancel everything else first.",
      "The pipeline of people is the product. Everything else is downstream of it.",
    ],
  },
  {
    number: "327.1",
    slug: "negotiation-is-naming-the-alternatives",
    title: "Negotiation Is Naming the Alternatives",
    dek: "BATNA is just honesty about what happens if the deal fails.",
    date: "Dec 15, 2024",
    body: [
      "The phrase BATNA \u2014 best alternative to a negotiated agreement \u2014 sounds like jargon and is actually just clarity. If the deal does not happen, what do you do tomorrow morning? The honest answer to that question is the floor of every negotiation you will ever have.",
      "People who do not know their alternatives accept worse deals than they should. People who know them, and have rehearsed them, walk in calm.",
      "Name your alternatives before the conversation starts. The conversation will go better because of it, even if the alternatives never come up.",
    ],
  },
  {
    number: "327.17",
    slug: "trust-is-a-protocol",
    title: "Trust Is a Protocol",
    dek: "It handshakes the same way TLS does.",
    date: "Dec 8, 2024",
    body: [
      "Trust between two people resembles a protocol negotiation more than a personality trait. Each party makes a small offer, the other party responds, and the relationship advances one round at a time. Skip a round and the connection downgrades or fails.",
      "Trust at scale \u2014 across teams, across organisations \u2014 works the same way, just with more parties and slower round trips. The handshake is the whole game.",
      "Run the handshake on purpose. The system you build with the people who completed it is the system that ships.",
    ],
  },
  {
    number: "004.692",
    slug: "apis-are-promises-with-a-version-number",
    title: "APIs Are Promises With a Version Number",
    dek: "The endpoint is a contract someone has to keep for years.",
    date: "Dec 1, 2024",
    body: [
      "An API endpoint is a contract. The moment a third party starts using it, you owe them backward compatibility for as long as that third party exists, even if your roadmap would prefer otherwise. The endpoint is a hostage of its own success.",
      "This is why versioning matters and why breaking changes deserve a louder announcement than features. The cost is borne by every integrator, distributed across every codebase that ever called the URL.",
      "Design endpoints to outlast the team that shipped them. The team rotates. The clients do not.",
    ],
  },
  {
    number: "005.131",
    slug: "types-are-documentation-that-runs",
    title: "Types Are Documentation That Runs",
    dek: "The compiler reads the docs you would not have written.",
    date: "Nov 24, 2024",
    body: [
      "Types are documentation that the compiler is willing to read. Comments rot. Types break the build. The asymmetry is the whole point \u2014 type annotations encode invariants in a way that the team cannot accidentally let go stale.",
      "This is also why dynamically typed codebases at scale tend to grow heavy runtime validation: the invariants were always there. They just had nowhere to live until something started failing in production.",
      "Add the types. The cost is hours; the savings are years.",
    ],
  },
  {
    number: "005.7565",
    slug: "sql-is-an-interface-to-the-truth",
    title: "SQL Is an Interface to the Truth",
    dek: "Every other query language is a layer on top of it.",
    date: "Nov 17, 2024",
    body: [
      "SQL has outlasted nearly every framework, ORM, and query language built on top of it. The reason is not nostalgia. SQL is a remarkably honest interface to relational data, and relational data turns out to model most of the world surprisingly well.",
      "Engineers who refuse to learn it because the syntax looks dated end up writing the same operations in three more layers of indirection, each of which translates back to SQL anyway.",
      "Learn SQL well. The dividend pays for itself across every backend you will ever touch.",
    ],
  },
  {
    number: "005.276",
    slug: "caching-is-a-tax-on-correctness",
    title: "Caching Is a Tax on Correctness",
    dek: "The fastest answer is also the easiest one to get wrong.",
    date: "Nov 10, 2024",
    body: [
      "Caching is the fastest way to make a slow system fast, and also the fastest way to make a correct system wrong. Every cache is a copy of the truth that the truth no longer knows about, and every cache invalidation is a small race against the next read.",
      "Most caching bugs are not bugs in the cache. They are bugs in the team's mental model of when the cache is allowed to lie.",
      "Cache deliberately. Document the staleness. The cache that nobody can explain is the cache that will eventually embarrass you.",
    ],
  },
  {
    number: "005.741",
    slug: "data-models-leak",
    title: "Data Models Leak",
    dek: "The schema you ship leaks into every report that ever queries it.",
    date: "Nov 3, 2024",
    body: [
      "A schema does not stay inside the application that defined it. It leaks outward into reports, dashboards, ETL pipelines, and the spreadsheets that the analyst built once and the entire org now runs on. Changing the schema is a change to all of those, whether you intended it or not.",
      "This is why schemas calcify so quickly. The blast radius of an honest rename is enormous, and most teams quietly decide it is cheaper to keep the bad name.",
      "Plan schemas like contracts with the future. The future has more readers than you think.",
    ],
  },
  {
    number: "006.4",
    slug: "testing-is-a-conversation",
    title: "Testing Is a Conversation",
    dek: "The suite tells you what the system is actually willing to promise.",
    date: "Oct 27, 2024",
    body: [
      "A test suite is not a quality assurance artifact. It is a conversation between past-you and future-you about what the system is actually willing to promise. Every test is a statement of intent that the codebase has accepted as binding.",
      "Suites that test the wrong things tell future-you about the wrong promises. Suites that test the right things become the most useful documentation any project has ever had.",
      "Write tests like you are dictating the system's contract. Because you are.",
    ],
  },
  {
    number: "006.42",
    slug: "ci-is-the-norm-enforcer",
    title: "CI Is the Norm Enforcer",
    dek: "The pipeline is the team's collective conscience.",
    date: "Oct 20, 2024",
    body: [
      "The continuous integration pipeline is the team's collective conscience, made executable. The rule that no one wanted to enforce in a code review becomes a check that the merge button cannot ignore.",
      "This is why CI quality dominates code quality at scale. Individual engineers vary. The pipeline is invariant. Whatever it requires, the codebase will eventually become.",
      "Invest in CI like you are designing the team's habits. You are.",
    ],
  },
  {
    number: "006.5",
    slug: "logs-are-letters-to-future-you",
    title: "Logs Are Letters to Future-You",
    dek: "The log line you skipped is the outage you cannot explain.",
    date: "Oct 13, 2024",
    body: [
      "A log line is a letter to whoever is debugging this incident at 3am. The signal-to-noise ratio of the log determines whether that letter is useful or just more weather to scroll past.",
      "Good logging is not more logging. It is the right log, at the right level, with the right correlation IDs, written by someone who imagined the future stranger reading it under pressure.",
      "Write logs as if your future self is grateful. Sometimes you will be.",
    ],
  },
  {
    number: "006.51",
    slug: "observability-is-the-second-product",
    title: "Observability Is the Second Product",
    dek: "Every running system is two products: the one users see and the one operators do.",
    date: "Oct 6, 2024",
    body: [
      "Every system in production is actually two products. The first is what the user sees. The second is what the operator sees \u2014 metrics, traces, alerts, dashboards. The second product determines whether the first one survives its second year.",
      "Teams that build only the first product end up reverse-engineering the second one in the middle of an outage. This is the worst possible time to design an observability strategy.",
      "Ship both products on purpose. The second one is the one that lets the first one grow up.",
    ],
  },
  {
    number: "006.52",
    slug: "incidents-are-curriculum",
    title: "Incidents Are Curriculum",
    dek: "The postmortem is the only honest training material the team will ever have.",
    date: "Sep 29, 2024",
    body: [
      "Every incident is curriculum. The postmortem is the textbook chapter. The blameless retrospective is the seminar. The fix is the homework. Teams that treat incidents as embarrassments to be minimised are throwing away the most expensive training material they will ever pay for.",
      "Write the postmortem as if you are teaching the next engineer who has not been hired yet. They will read it. Most of what they know about the system will come from documents like this one.",
      "Treat the archive of incidents as institutional memory. It is the closest thing the team has to one.",
    ],
  },
];

export function getEssayBySlug(slug: string): Essay | undefined {
  return essays.find((e) => e.slug === slug);
}

export type Job = {
  org: string;
  role: string;
  period: string;
  bullets: string[];
};

export const jobs: Job[] = [
  {
    org: "Independent / Personal Projects",
    role: "Open-Source Developer · UI/UX",
    period: "2024 — Present",

    bullets: [
      "Caretaker leave 2024–present, during which independent work continued across open-source and design tooling.",
      "NeuroShell — personal open-source project. ADHD-friendly terminal and AI productivity suite for macOS. Human-Focused AI Award, Tetrate Buildathon (selected from 170+ applicants). v2 shipped; v3 in active development.",
    ],

  },
  {
    org: "DigitalSpellCraft LLC",
    role: "iOS/macOS Developer · UI/UX · IT Specialist",
    period: "2015 — 2024",
    bullets: [
      "iOS & macOS Development: designed and developed applications targeting Apple platforms using Swift, SwiftUI, and Xcode.",
      "UI/UX Design: built accessible, human-centred interfaces with a focus on neurodivergent and sensory-sensitive users.",
      "AI Integration: implemented local LLM solutions (Ollama) and GPT-powered tooling into developer workflows and conversational UI.",
      "Infrastructure & DevOps: led macOS and Linux migrations (Snow Leopard → current); Docker containerisation for scalable deployments.",
      "Remote Collaboration: async-first workflow via GitHub, Slack, and Discord across distributed teams.",
    ],
  },
  {
    org: "365 Connect LLC",
    role: "Graphic Designer · UI/UX · DevOps",
    period: "2003 — 2015",
    bullets: [
      "On-site 2003–2007; fully remote 2007–2015.",
      "UI/UX: refined front-end elements for enterprise property management applications, improving usability and accessibility.",
      "Design Systems: built and maintained visual design standards using Adobe Creative Suite; delivered training to senior technical staff.",
      "DevOps Support: evaluated and integrated software tooling across company platforms, ensuring performance and compatibility.",
    ],
  },
];

export const skillGroups = [
  {
    title: "Languages",
    items: ["Swift 6", "TypeScript", "Rust", "Python", "Ruby", "Bash/Shell", "SQL"],
  },
  {
    title: "Apple",
    items: [
      "SwiftUI",
      "Swift 6 strict concurrency",
      "Observation",
      "SwiftData",
      "Swift Testing",
      "Xcode 16",
      "Core ML",
      "Vision",
      "Accessibility (VoiceOver, Dynamic Type)",
    ],
  },
  {
    title: "Web & Edge",
    items: [
      "TanStack Start",
      "React 19",
      "Vite",
      "Tailwind v4",
      "Bun",
      "Hono",
      "Cloudflare Workers",
      "Drizzle",
      "PostgreSQL / Supabase",
    ],
  },
  {
    title: "Infra & AI",
    items: [
      "TARS (Tetrate Agent Router)",
      "MCP servers",
      "pgvector RAG",
      "Local LLM (Ollama)",
      "Eval harnesses",
      "Envoy dynamic modules",
      "Fly.io",
      "GitHub Actions",
      "Linux",
    ],
  },
  {
    title: "Tooling",
    items: [
      "Git / GitHub",
      "VS Code",
      "Cursor",
      "Figma",
      "Linear",
      "Jira",
      "Confluence",
      "Async-first collaboration",
    ],
  },
  {
    title: "Heritage (maintenance only)",
    items: ["Objective-C", "Combine", "XCTest", "Adobe Creative Suite"],
  },
];

export type Project = {
  name: string;
  role: string;
  period: string;
  href?: string;
  cover: string;
  body: string;
  quote?: { text: string; attribution: string };
  tags: string[];
};

export const projects: Project[] = [
  {
    name: "NeuroShell",
    role: "Creator & Lead Developer",
    period: "2024 — Present",
    href: "https://github.com/jv-darkheartlabs/NeuroShell",
    cover: projectNeuroshell,
    body: "Open-source terminal application and AI productivity suite for macOS, built for developers with ADHD and cognitive differences. Plain-English AI command input, Where Was I? session recovery (⌘⌥W), procedurally generated nature audio, focus timers, breathing tools, hydration and posture reminders, and a full accessibility settings layer. v2 shipped. v3 in active development.",
    quote: {
      text: "NeuroShell puts AI to work while centering real human value.",
      attribution: "Birger Moëll, Associate Professor in Computational Linguistics, Uppsala University",
    },
    tags: ["macOS", "Swift", "AI", "Accessibility", "Award winner"],
  },
  {
    name: "focus-guard",
    role: "Creator & Lead Developer",
    period: "2026 — Present",
    href: "https://github.com/jv-darkheartlabs/focus-guard",
    cover: projectFocusGuard,
    body: "Envoy dynamic module that enforces focus-mode policies at the proxy layer. Written in Rust, it lets teams define when and how deep-work sessions are protected — blocking distractions before they reach the browser, API, or service. Built for neurodivergent developers who need environmental guardrails, not just willpower.",
    tags: ["Envoy", "Rust", "Focus tooling", "Proxy", "Open source"],
  },
  {
    name: "dark-heart-themes",
    role: "Creator & Maintainer",
    period: "2026 — Present",
    href: "https://github.com/jv-darkheartlabs/dark-heart-themes",
    cover: coverCraft,
    body: "Cyberpunk and Magic: The Gathering theme collections for Cursor and Zed. Merged home for editor palettes — high contrast, long-session, install, fork, remix.",
    tags: ["Cursor", "Zed", "Themes", "Design", "Open source"],
  },
  {
    name: "accessibility-rails-components",
    role: "Creator & Maintainer",
    period: "2025 — Present",
    href: "https://github.com/jv-darkheartlabs/accessibility-rails-components",
    cover: coverCraft,
    body: "WCAG 2.1 AA–compliant ViewComponents library for Rails. Inclusive defaults, keyboard-first patterns, and Stimulus controllers wired for assistive tech — built around real audit findings, not checklists.",
    tags: ["Rails", "Ruby", "Accessibility", "ViewComponents", "Open source"],
  },
];

export type Repo = {
  name: string;
  href: string;
  lang?: string;
  updated: string;
  status: "active" | "wip" | "archive" | "fork";
  blurb: string;
};

// Full repo index mirrored from github.com/jv-darkheartlabs. Ordered:
// active originals → ANZSCO / NZ market portfolio samples → WIP → forks.
export const repositories: Repo[] = [
  // ── Active originals ──────────────────────────────────────────────
  {
    name: "NeuroShell",
    href: "https://github.com/jv-darkheartlabs/NeuroShell",
    lang: "Swift",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261313: AuDHD-friendly terminal and AI productivity suite for macOS. SwiftUI, plain-English command input, session recovery, focus and sensory tooling.",
  },
  {
    name: "focus-guard",
    href: "https://github.com/jv-darkheartlabs/focus-guard",
    lang: "Rust",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261313: Envoy dynamic module that enforces focus-mode policies at the proxy layer. Distractions blocked upstream of the browser.",
  },
  {
    name: "dark-heart-themes",
    href: "https://github.com/jv-darkheartlabs/dark-heart-themes",
    lang: "Python",
    updated: "2026-07",
    status: "active",
    blurb:
      "ANZSCO 261312: Cyberpunk and Magic: The Gathering theme collections for Cursor and Zed. Merged editor palettes — high contrast, long-session, forkable.",
  },
  {
    name: "accessibility-rails-components",
    href: "https://github.com/jv-darkheartlabs/accessibility-rails-components",
    lang: "Ruby",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261312: WCAG 2.1 AA–compliant Rails ViewComponents. Inclusive defaults, keyboard-first patterns, Stimulus controllers wired for assistive tech.",
  },

  // ── ANZSCO / NZ market portfolio samples ─────────────────────────
  {
    name: "event-driven-integrations-platform",
    href: "https://github.com/jv-darkheartlabs/event-driven-integrations-platform",
    lang: "TypeScript",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261312 sample: resilient backend integrations with retries, idempotency, and webhook delivery guarantees.",
  },
  {
    name: "rbac-auth-audit-service",
    href: "https://github.com/jv-darkheartlabs/rbac-auth-audit-service",
    lang: "Go",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261312 sample: RBAC authorization, session lifecycle management, and append-only audit logging in Go.",
  },
  {
    name: "data-pipeline-observability-qa-suite",
    href: "https://github.com/jv-darkheartlabs/data-pipeline-observability-qa-suite",
    lang: "Python",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261312 sample: data ingestion pipeline with observability metrics, tracing, and automated QA checks.",
  },
  {
    name: "cloud-native-task-management-api",
    href: "https://github.com/jv-darkheartlabs/cloud-native-task-management-api",
    lang: "JavaScript",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261312 backend sample using Node.js, PostgreSQL, Redis, and Docker for cloud-native task management.",
  },
  {
    name: "systems-analysis-traceability-platform",
    href: "https://github.com/jv-darkheartlabs/systems-analysis-traceability-platform",
    lang: "Python",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261112 sample: requirements-to-architecture traceability platform with ADRs and coverage matrix.",
  },
  {
    name: "ict-support-service-desk-automation-portal",
    href: "https://github.com/jv-darkheartlabs/ict-support-service-desk-automation-portal",
    lang: "Python",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 263212 sample: service desk triage, SLA metrics, and runbook automation for ICT support engineering.",
  },
  {
    name: "linux-hardening-patch-orchestration-lab",
    href: "https://github.com/jv-darkheartlabs/linux-hardening-patch-orchestration-lab",
    lang: "Python",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 262113 sample: Linux hardening audit and patch orchestration with evidence reporting.",
  },
  {
    name: "cicd-automated-infrastructure",
    href: "https://github.com/jv-darkheartlabs/cicd-automated-infrastructure",
    lang: "Python",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 263111: CI/CD and infrastructure automation sample using Docker, Kubernetes, Terraform, and GitHub Actions.",
  },
  {
    name: "realtime-data-streaming-dashboard",
    href: "https://github.com/jv-darkheartlabs/realtime-data-streaming-dashboard",
    lang: "JavaScript",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261312: Real-time dashboard sample featuring WebSockets, data visualization, and third-party API integration.",
  },
  {
    name: "multi-platform-ecommerce-web-app",
    href: "https://github.com/jv-darkheartlabs/multi-platform-ecommerce-web-app",
    lang: "JavaScript",
    updated: "2026-06",
    status: "active",
    blurb:
      "ANZSCO 261212: Full-stack e-commerce portfolio sample with Next.js, Node.js, Stripe integration, and production-ready architecture.",
  },

  // ── Document packs and companion samples ─────────────────────────
  {
    name: "nz-immigration-application-tracker",
    href: "https://github.com/jv-darkheartlabs/nz-immigration-application-tracker",
    lang: "Ruby",
    updated: "2026-07",
    status: "active",
    blurb:
      "ANZSCO 261312: Submission pack — resume, cover letter, and portfolio evidence index with Rails capability blueprint.",
  },
  {
    name: "wellington-fintech-rails-api",
    href: "https://github.com/jv-darkheartlabs/wellington-fintech-rails-api",
    lang: "Ruby",
    updated: "2026-07",
    status: "active",
    blurb:
      "ANZSCO 261312: Rails API backend exploring fintech patterns for the Wellington market — accounts, ledgers, and transaction primitives.",
  },
  {
    name: "wellington-api-static",
    href: "https://github.com/jv-darkheartlabs/wellington-api-static",
    lang: "HTML",
    updated: "2026-07",
    status: "active",
    blurb:
      "ANZSCO 261312: Static documentation site paired with the Wellington fintech Rails API. Endpoint reference and onboarding notes.",
  },
  {
    name: "clerk-nextjs-starter",
    href: "https://github.com/jv-darkheartlabs/clerk-nextjs-starter",
    lang: "TypeScript",
    updated: "2026-06",
    status: "wip",
    blurb:
      "ANZSCO 261212: Next.js + Clerk authentication starter used as a clean baseline for developer portfolio presentations.",
  },

  // ── Forks (personal mirrors / patches) ───────────────────────────
  {
    name: "mystic-bytes",
    href: "https://github.com/jv-darkheartlabs/mystic-bytes",
    lang: "SCSS",
    updated: "2026-06",
    status: "fork",
    blurb:
      "Jekyll portfolio theme powering darkheartlabs.technology. Forked and heavily customised.",
  },
  {
    name: "apple-bce-drv",
    href: "https://github.com/jv-darkheartlabs/apple-bce-drv",
    lang: "C",
    updated: "2026-06",
    status: "fork",
    blurb:
      "ANZSCO 261313: Linux drivers for Apple's Buffer Copy Engine on T2-based Macs. Mirrored for personal patches while running Linux on Mac hardware.",
  },
  {
    name: "apple-ib-drv",
    href: "https://github.com/jv-darkheartlabs/apple-ib-drv",
    lang: "C",
    updated: "2026-06",
    status: "fork",
    blurb:
      "ANZSCO 261313: Linux support for Apple iBridge devices (Touch Bar / ambient light sensor) on 2018+ MacBook Pros. Personal mirror.",
  },
  {
    name: "nvm",
    href: "https://github.com/jv-darkheartlabs/nvm",
    updated: "2026-03",
    status: "fork",
    blurb:
      "ANZSCO 261312: Fork of Node Version Manager — POSIX shell script for managing multiple Node.js versions side by side.",
  },
];


export const statusTags = [
  "AU_VISA_APPROVED",
  "NZ_ETA_APPROVED",
  "HOUSING_SECURED",
  "SEEKING_REMOTE_WORK",
];