#!/usr/bin/env node
/**
 * Export Lovable content-data.ts → Jekyll _essays, _data, _podcast
 * Run: npx tsx scripts/export-content.mjs
 *
 * Canonical source of truth: the committed files in _essays/, _data/, and _podcast/.
 * Run this script only when bulk-syncing from the Lovable prototype; it overwrites those paths.
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

function yamlStringify(obj, indent = 0) {
  const pad = "  ".repeat(indent);
  const lines = [];
  for (const [key, val] of Object.entries(obj)) {
    if (val === undefined || val === null) continue;
    if (Array.isArray(val)) {
      if (val.length === 0) continue;
      lines.push(`${pad}${key}:`);
      for (const item of val) {
        if (typeof item === "object" && item !== null) {
          lines.push(`${pad}  -`);
          for (const inner of yamlStringify(item, indent + 2).split("\n")) {
            if (inner) lines.push(inner);
          }
        } else {
          lines.push(`${pad}  - ${yamlScalar(item)}`);
        }
      }
    } else if (typeof val === "object") {
      lines.push(`${pad}${key}:`);
      lines.push(yamlStringify(val, indent + 1));
    } else if (typeof val === "string" && val.includes("\n")) {
      lines.push(`${pad}${key}: |`);
      val.split("\n").forEach((l) => lines.push(`${pad}  ${l}`));
    } else {
      lines.push(`${pad}${key}: ${yamlScalar(val)}`);
    }
  }
  return lines.filter(Boolean).join("\n");
}

function sortKey(number) {
  const [major, minor = "0"] = String(number).split(".");
  return `${major.padStart(4, "0")}.${minor.padStart(2, "0")}`;
}

function yamlScalar(v) {
  if (typeof v === "boolean") return v ? "true" : "false";
  if (typeof v === "number") return String(v);
  const s = String(v);
  if (s.match(/[:#{}[\],&*?]|^\s|^$/) || s.includes("'")) {
    return `"${s.replace(/\\/g, "\\\\").replace(/"/g, '\\"')}"`;
  }
  return s.includes(":") || s.includes("#") ? `"${s}"` : s;
}

function writeYamlFile(file, data) {
  fs.writeFileSync(file, yamlStringify(data) + "\n");
  console.log("wrote", path.relative(root, file));
}

// Dynamic import of TS module via tsx when run as: npx tsx scripts/export-content.mjs
const content = await import("./content-data.ts");
const { essays, projects, repositories, skillGroups, statusTags, coverForNumber } = content;

const MONTHS = {
  Jan: "01", Feb: "02", Mar: "03", Apr: "04", May: "05", Jun: "06",
  Jul: "07", Aug: "08", Sep: "09", Oct: "10", Nov: "11", Dec: "12",
};

function parseDate(dateStr) {
  // "Jun 28, 2026"
  const m = dateStr.match(/^(\w{3})\s+(\d{1,2}),\s+(\d{4})$/);
  if (!m) return "2026-01-01";
  const [, mon, day, year] = m;
  return `${year}-${MONTHS[mon] ?? "01"}-${day.padStart(2, "0")}`;
}

function deriveBrief(number, slug) {
  const SYSTEMS_BY_BUCKET = {
    computing: ["the merge queue", "a misbehaving CI runner", "the staging cluster", "a hot path in the router", "the build cache"],
    mind: ["your attention budget", "the on-call rotation", "the team's working memory", "the meeting load", "the cognitive surface area"],
    social: ["the review channel", "the public roadmap", "the contributor pipeline", "the changelog", "the launch comms"],
    language: ["the API surface", "the naming convention", "the prompt template", "the doc index", "the error vocabulary"],
    sciences: ["the telemetry pipeline", "the experiment harness", "the metrics dashboard", "the data warehouse"],
    craft: ["the deployment script", "the design system tokens", "the legacy module", "the migration runner", "the developer toolchain"],
    arts: ["the marketing site", "the editorial cadence", "the publication queue", "the brand surface"],
  };
  const ISSUES = [
    "drift between intent and implementation is widening",
    "the abstraction is leaking under load",
    "a quiet regression is eating throughput",
    "the contract no longer matches the caller's expectations",
    "an undocumented assumption just expired",
    "an edge case is now the median case",
    "the fast path stopped being fast",
    "ownership of this surface is ambiguous",
  ];
  const CONSTRAINTS = [
    "no downtime. no schema break. ship before EOW.",
    "blast radius stays inside this module. no API churn.",
    "one operator. one terminal. no rollback window.",
    "must hold on a tired 2am mind. document the trace.",
    "no new dependencies. work with what's already in the stack.",
    "preserve the existing public contract. fix it underneath.",
  ];
  function hash(s) {
    let h = 2166136261;
    for (let i = 0; i < s.length; i++) {
      h ^= s.charCodeAt(i);
      h = Math.imul(h, 16777619) >>> 0;
    }
    return h >>> 0;
  }
  function bucketFor(num) {
    const head = parseInt(num.split(".")[0], 10);
    if (Number.isNaN(head)) return "craft";
    if (head < 100) return "computing";
    if (head < 200) return "mind";
    if (head < 400) return "social";
    if (head < 500) return "language";
    if (head < 600) return "sciences";
    if (head < 700) return "craft";
    return "arts";
  }
  const seed = hash(`${number}::${slug}`);
  const bucket = bucketFor(number);
  const systems = SYSTEMS_BY_BUCKET[bucket];
  return {
    system: systems[seed % systems.length],
    issue: ISSUES[(seed >>> 5) % ISSUES.length],
    constraint: CONSTRAINTS[(seed >>> 11) % CONSTRAINTS.length],
  };
}

function bodyToMarkdown(body) {
  return body
    .map((para) => {
      if (para.startsWith("## ")) return `\n## ${para.slice(3)}\n`;
      return para + "\n";
    })
    .join("\n")
    .trim();
}

// ── Essays ──────────────────────────────────────────────────────────
const essaysDir = path.join(root, "_essays");
fs.mkdirSync(essaysDir, { recursive: true });
for (const f of fs.readdirSync(essaysDir)) {
  if (f.endsWith(".md")) fs.unlinkSync(path.join(essaysDir, f));
}

for (const essay of essays) {
  const brief = essay.brief ?? deriveBrief(essay.number, essay.slug);
  const cover = essay.cover ?? coverForNumber(essay.number);
  const front = {
    layout: "essay",
    title: essay.title,
    dek: essay.dek,
    number: essay.number,
    sort_key: sortKey(essay.number),
    date: parseDate(essay.date),
    cover,
    brief,
  };
  if (essay.type) front.type = essay.type;
  if (essay.locked) {
    front.locked = essay.locked;
    front.sitemap = false;
  }

  const md = `---\n${yamlStringify(front)}\n---\n\n${bodyToMarkdown(essay.body)}\n`;
  const filename = `${essay.slug}.md`;
  fs.writeFileSync(path.join(essaysDir, filename), md);
}
console.log(`exported ${essays.length} essays`);

// ── Projects & repos ───────────────────────────────────────────────
writeYamlFile(path.join(root, "_data/projects.yml"), {
  featured: projects.map((p) => ({
    ...p,
    cover: p.cover.startsWith("/") ? p.cover : `/assets/images/${path.basename(p.cover)}`,
  })),
  anzsco_groups: [
    { code: "261312", title: "Developer Programmer", description: "Application backends, APIs, integrations, and editor tooling." },
    { code: "261313", title: "Software Engineer", description: "Systems-level software — drivers, native apps, proxy modules." },
    { code: "261212", title: "Web Developer", description: "Full-stack web apps, static sites, and front-end starters." },
    { code: "263111", title: "Computer Network & Systems Engineer", description: "CI/CD, infrastructure automation, and platform engineering." },
    { code: "262113", title: "Systems Administrator", description: "Hardening, patch orchestration, and workspace configuration." },
    { code: "261112", title: "Systems Analyst", description: "Requirements-to-architecture traceability and ADRs." },
    { code: "263212", title: "ICT Support Engineer", description: "Service desk automation, SLA metrics, and runbooks." },
  ],
  repositories,
});

writeYamlFile(path.join(root, "_data/skills.yml"), {
  groups: skillGroups.map((g) => ({ title: g.title, items: g.items })),
});

writeYamlFile(path.join(root, "_data/status_tags.yml"), { tags: statusTags });

// ── CV data (from cv.tsx structure, embedded in export) ────────────
writeYamlFile(path.join(root, "_data/cv.yml"), {
  name: "Jennifer Vise",
  intro: "Developer Programmer with 25+ years across iOS/macOS development, web, UI/UX, and infrastructure tooling. Currently based in Louisiana, US; relocating to Auckland, NZ in 2027 (on-ground interviews Dec 2026 – Feb 2027). Remote-first; open to contract, freelance, or permanent engagements.",
  primary_code: "261312",
  supporting_codes: ["261212", "262113"],
  anzsco: {
    "261312": {
      title: "Developer Programmer",
      role: "Primary nominated occupation",
      summary: "Interprets specifications, designs and develops, tests, debugs, documents, and maintains program code across iOS/macOS, web, and tooling stacks.",
      duties: [
        "Interpret specifications and translate requirements into program designs",
        "Write, test, and maintain program code against documented standards",
        "Modify existing code to correct errors, adapt to new requirements, and improve performance",
        "Write and maintain technical documentation, release notes, and code-review artefacts",
        "Use consistent programming standards across Swift, TypeScript, Ruby, Rust, and Python codebases",
      ],
    },
    "261212": {
      title: "Web Developer",
      role: "Supporting specialisation",
      summary: "Designs, builds, integrates, optimises, tests, and maintains websites and web applications across the front-end and server-side.",
      duties: [
        "Analyse user needs and translate them into web functionality",
        "Design, build, and integrate accessible front-end and server-side components",
        "Optimise sites for performance, accessibility (WCAG 2.1 AA), and SEO",
        "Debug and maintain published web properties and supporting deployment pipelines",
      ],
    },
    "263111": {
      title: "Computer Network and Systems Engineer",
      role: "Supporting specialisation",
      summary: "Plans, develops, deploys, tests, and optimises infrastructure used to run software systems, including build, deployment, and observability pipelines.",
      duties: [
        "Design and maintain CI/CD pipelines and container-based deployment topologies",
        "Plan migrations across operating system generations and runtime environments",
        "Configure and monitor proxy-layer policies (e.g. Envoy) and network-adjacent controls",
        "Troubleshoot performance, capacity, and reliability across distributed deployments",
      ],
    },
    "262113": {
      title: "Systems Administrator",
      role: "Supporting specialisation",
      summary: "Maintains, configures, and automates computer systems and developer workspaces to keep services and tooling operational and reproducible.",
      duties: [
        "Maintain and configure macOS, Linux, and developer workspace environments",
        "Automate provisioning and reproducible setup via shell tooling and dotfiles",
        "Evaluate, integrate, and document software tooling across teams",
        "Provide tier-2/tier-3 support and onboarding documentation for technical staff",
      ],
    },
  },
  experience: [
    {
      org: "Independent / Personal Projects",
      role: "Open-Source Developer · UI/UX",
      period: "2024 — Present",
      location: "Remote (Louisiana, US → Auckland, NZ 2027)",
      codes: ["261312", "261212", "263111"],
      summary: "Independent development of macOS productivity software, proxy-layer focus tooling, and accessible web component libraries during caretaker leave.",
      duties: [
        { code: "261312", text: "Designed, wrote, tested, and maintained NeuroShell — a Swift/SwiftUI macOS terminal and AI productivity suite — including specification, architecture, and release engineering through v2 and into v3." },
        { code: "261312", text: "Implemented AI-assisted command parsing, session-recovery state machines, and accessibility settings layers against documented behavioural specifications." },
        { code: "263111", text: "Authored focus-guard, a Rust-based Envoy dynamic module that enforces deep-work policies at the proxy layer; planned the configuration and deployment model for team-scale rollout." },
        { code: "261212", text: "Built and maintained accessibility-rails-components, a WCAG 2.1 AA ViewComponents library with keyboard-first patterns and Stimulus controllers, derived from real audit findings." },
        { code: "261312", text: "Maintained version control, code review, and release standards across 25+ public repositories under github.com/jv-darkheartlabs." },
      ],
    },
    {
      org: "DigitalSpellCraft LLC",
      role: "iOS/macOS Developer · UI/UX · IT Specialist",
      period: "2015 — 2024",
      location: "Remote, United States",
      codes: ["261312", "263111", "262113"],
      summary: "Full-cycle Apple-platform development, AI integration, and infrastructure modernisation for a distributed creative-technology studio.",
      duties: [
        { code: "261312", text: "Designed and developed iOS and macOS applications using Swift, SwiftUI, and Xcode against documented user requirements and accessibility specifications." },
        { code: "261312", text: "Modified and refactored existing Swift/Objective-C code to correct defects, improve performance, and adapt to new Apple SDK generations." },
        { code: "261312", text: "Integrated local LLM (Ollama) and GPT-based tooling into developer workflows and conversational UI, including prompt design and structured-output validation." },
        { code: "263111", text: "Led macOS and Linux migration programmes (Snow Leopard through current releases) and introduced Docker containerisation for reproducible, scalable deployments." },
        { code: "262113", text: "Maintained and configured developer workspaces, build infrastructure, and async collaboration tooling (GitHub, Slack, Discord) across distributed contributors." },
      ],
    },
    {
      org: "365 Connect LLC",
      role: "Graphic Designer · UI/UX · DevOps",
      period: "2003 — 2015",
      location: "On-site 2003–2007; remote 2007–2015",
      codes: ["261212", "262113"],
      summary: "Front-end and design-systems work for an enterprise property-management platform, with infrastructure-adjacent tooling evaluation and integration.",
      duties: [
        { code: "261212", text: "Refined and maintained front-end elements of enterprise property-management web applications to improve usability, accessibility, and cross-browser compatibility." },
        { code: "261212", text: "Built and maintained visual design systems and component libraries using Adobe Creative Suite; delivered training to senior technical staff." },
        { code: "262113", text: "Evaluated, integrated, and documented software tooling across company platforms, ensuring performance, compatibility, and reproducible installation." },
      ],
    },
  ],
});

// ── About ───────────────────────────────────────────────────────────
writeYamlFile(path.join(root, "_data/about.yml"), {
  tagline: "the voice behind the signal. not the résumé — the room it was written in.",
  bio: "I build quiet software for loud minds. Twenty-five years at the workbench, mostly on Apple platforms — Swift, SwiftUI, Core ML — with detours through Rust proxy modules, edge TypeScript, and whatever the moment asks for. The credentials live on the CV. This page is the room the work gets written in.",
  specs: [
    { label: "comm_channel", value: "Discord" },
    { label: "comm_style", value: "Direct, blunt, no fluff" },
    { label: "env_mode", value: "Hybrid (office + home)" },
    { label: "fuel_type", value: "☕ Coffee. Always coffee." },
  ],
  tenets: [
    { title: "Creativity & innovation", body: "New ideas beat the way we've always done it. Hear the wild one out before you shut it down." },
    { title: "Efficiency over polish", body: "Ship it. Don't over-polish what isn't needed. If I do something twice, I'll automate it." },
    { title: "Always leveling up", body: "Tools, skills, mindset. Learning is the job, not a perk." },
  ],
  manual: {
    warn: {
      title: "How I might annoy you",
      items: [
        { k: "Rabbit hole mode", v: "I go deep on problems and lose track of time." },
        { k: "Blunt comms incoming", v: "Directness isn't personal — it's efficient." },
        { k: "Signal lost", v: "Hyperfocused and quiet doesn't mean upset. I'm in the zone." },
      ],
    },
    ban: {
      title: "How you might annoy me",
      items: [
        { k: "Meetings that could be a message", v: "Respect the calendar." },
        { k: "Vague communication", v: "Say what you mean. Mean what you say." },
        { k: "No accountability", v: "Own your work and your mistakes." },
        { k: "Talking down to others", v: "Everyone deserves respect — period." },
        { k: "Showing up unprepared", v: "Late or unready wastes both our time." },
        { k: "Shutting down new ideas", v: "At least hear it out first." },
      ],
    },
    help: {
      title: "I might need help with",
      items: [
        { k: "Overcommitting", v: "I say yes to everything — help me prioritize ruthlessly." },
        { k: "Analysis paralysis", v: "Sometimes I just need someone to say 'ship it.'" },
        { k: "Context switching", v: "Mid-flow interruptions cost me. Async beats sync." },
        { k: "Asking for help", v: "I'll try to solve it myself first — always." },
        { k: "Setting boundaries", v: "Work hours creep. Call it out." },
      ],
    },
    love: {
      title: "I love",
      items: [
        { k: "Brainstorming & ideating", v: "Whiteboard sessions, wild ideas, yes-and energy." },
        { k: "Designing & creating", v: "Making things that didn't exist before." },
        { k: "Automating & optimizing", v: "If I do it twice, I'll automate it." },
      ],
    },
  },
  quote: "If you're being quiet it means you're thinking. If I'm being quiet it means I'm in flow. Ping me on Discord — I promise I'll resurface.",
  relocation: "On the ground in Auckland December 2026 through February 2027 for interviews and in-person introductions; full relocation from Louisiana lands in 2027. AU UD/601 ETA and NZ eTA approved, housing secured. Open to remote contract or freelance work in the interim.",
  award: {
    title: "Human-Focused AI Award",
    subtitle: "Tetrate Buildathon — selected from 170+ applicants",
    quote: "NeuroShell puts AI to work while centering real human value.",
    attribution: "Birger Moëll, Associate Professor in Computational Linguistics, Uppsala University",
  },
});

// ── Podcast ─────────────────────────────────────────────────────────
writeYamlFile(path.join(root, "_data/media.yml"), {
  album_tracks: [
    { title: "the void responds", duration: "—" },
    { title: "coordinates", duration: "—" },
    { title: "drowned forest", duration: "—" },
    { title: "neon circle", duration: "—" },
    { title: "JV, From the Orchid Dark", duration: "—" },
  ],
});

const podcastDir = path.join(root, "_podcast");
fs.mkdirSync(podcastDir, { recursive: true });
const episodes = [
  {
    slug: "why-moving-countries-feels-like-refactoring-your-life",
    number: "01",
    title: "Why Moving Countries Feels Like Refactoring Your Life",
    dek: "Moving countries is a migration with no rollback plan.",
    date: "2026-06-29",
    duration: "7:19",
    summary: "Moving abroad is a cold start with no rollback. Why the dashboard stays red, why feelings lag behind commits, and why Auckland is a canary deployment — not a finish line.",
    related_transmission: "relocation-as-refactor",
    chapters: [
      { time: "0:00", label: "Cold start: a migration with no rollback plan" },
      { time: "0:41", label: "Visible tasks vs. invisible work" },
      { time: "0:56", label: "Running on a debugger in Auckland" },
      { time: "1:48", label: "Why migration plans look easy in staging" },
      { time: "2:08", label: "Acculturative stress and culture shock curves" },
      { time: "2:18", label: "Auckland: diverse substrate, deep refactor" },
      { time: "2:44", label: "The red dashboard and hot migration" },
      { time: "3:08", label: "Commits, not feelings" },
      { time: "3:55", label: "Deleting legacy social code on purpose" },
      { time: "5:03", label: "No rollback: the double tax" },
      { time: "5:58", label: "Canary deployment (Auckland interview window, early 2027)" },
      { time: "6:27", label: 'Migration is never "done"' },
      { time: "6:46", label: "NZ work-life balance as environment, not magic" },
      { time: "7:00", label: "Closing: every constant becomes a variable" },
    ],
    show_notes_links: [
      { label: "Berry's acculturation model", url: "https://open.maricopa.edu/culturepsychology/chapter/berrys-model-of-acculturation/" },
      { label: "MCNZ faster registration for overseas doctors", url: "https://www.mcnz.org.nz/about-us/news-and-updates/faster-easier-registration-for-overseas-trained-doctors/" },
      { label: "Stats NZ — Auckland overseas-born population", url: "https://www.stats.govt.nz/news/auckland-population-projected-to-reach-2-million-by-2033/" },
      { label: "Migrant social capital in NZ", url: "https://link.springer.com/article/10.1007/s41685-025-00386-6" },
      { label: "Remote Global Life-Work Balance Index", url: "https://remote.com/resources/research/global-life-work-balance-index" },
    ],
  },
  {
    slug: "the-atrophy-of-the-coder",
    number: "02",
    title: "The Atrophy of the Coder",
    dek: "When the builder becomes the inspector — and the craft starts to fade.",
    date: "2026-05-21",
    duration: "7:00",
    summary: "76% of developers use AI tools. Veteran engineers admit they haven't manually written code in months. What happens when the calloused mental muscles start to atrophy — and the code breaks at 2 a.m.?",
    chapters: [
      { time: "0:00", label: "The 2 a.m. cursor in the technical void" },
      { time: "0:22", label: "AI acceleration: 76% adoption, 55% faster tasks" },
      { time: "0:39", label: "Builder to inspector: orchestrating agents, not writing code" },
      { time: "1:05", label: "When code breaks: do we still have the muscles to fix it from scratch?" },
      { time: "1:25", label: "Boats vs. swimming (Rob Vanderveer)" },
      { time: "1:45", label: "The dangerous myth: human as secondary oversight" },
      { time: "2:09", label: "The technical void: speed vs. architectural understanding" },
      { time: "2:34", label: "Aotearoa indie games: stories, automation, and representation" },
      { time: "3:38", label: "Auckland War Memorial Museum: AI can't feel cultural permission" },
      { time: "4:17", label: "Hardware is hard: no vibe coding through field failures" },
      { time: "5:15", label: "Socio-technical trust: people and tools, jointly optimized" },
      { time: "5:28", label: "The stupid work: manual debugging as verification capacity" },
      { time: "5:42", label: "South Auckland and the next generation" },
      { time: "6:12", label: "Legacy: resilience over volume of code produced" },
      { time: "6:34", label: "Tools that think alongside us — or replace the need to think" },
      { time: "6:53", label: "Closing: share this transmission" },
    ],
    key_ideas: [
      "Builder → inspector: when you stop writing code, the calluses fade.",
      "Acceleration without verification capacity is debt, not speed.",
      "Cultural permission, hardware, and field failures can't be vibe-coded.",
      "Socio-technical trust: optimize people and tools together, never one without the other.",
      "Legacy is resilience — not the volume of code an agent shipped on your behalf.",
    ],
  },
];

for (const ep of episodes) {
  const front = { layout: "podcast", ...ep };
  const md = `---\n${yamlStringify(front)}\n---\n\n${ep.summary}\n`;
  fs.writeFileSync(path.join(podcastDir, `${ep.slug}.md`), md);
}
console.log(`exported ${episodes.length} podcast episodes`);
