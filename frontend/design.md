# design.md: AI Engineer Portfolio (Praneeth)

A design spec for an AI Engineer portfolio, inspired by the structure and tone of digimaxx.co. Hand this file to Claude Code or any AI coding tool as the source of truth for look, layout, and behavior.

---

## 1. What this is based on

**Observed on digimaxx.co** (from page content and structure):

- Confident, enterprise tone. Headlines are short, declarative, and outcome-led ("Build. Transform. Scale.", "Intelligence, engineered for the real world.").
- Every section opens with a small **eyebrow label** (e.g. "What We Do", "AI", "Experience") followed by a large heading.
- **Numbered cards** ("01" to "06") with a category line ("AI · Product"), a one-sentence description, and an expandable "View details" panel listing **Core capabilities** as bullets.
- **Filter tabs** above the work grid (All / AI / Government / Enterprise / Product / Digital Transformation).
- Capability chips (AI Agents, Generative AI, RAG, NLP...) and a numbered expertise list.
- Hero with a looping background video, sticky nav, a single primary CTA, and a floating "Ask Maxy" assistant button.
- Black and white wordmark variants, which implies a high-contrast, neutral base.
- Built with v0 (Next.js/React style stack).

**Not verified:** exact hex values, font families, and spacing. I could only read the page content, not its CSS. Everything in sections 3 and 4 is a **proposed system**, not a copy of Digimaxx's tokens. Replace with real values if you inspect the site in browser dev tools.

---

## 2. Design principles

1. **Systems, not decoration.** The visuals should hint at orchestration (nodes, pipelines, flows), never stock robots or glowing brains.
2. **Outcome-first copy.** Say what the work achieved, then how.
3. **One accent family.** Cyan and blue only. No violet, no rainbow gradients.
4. **Readable first.** Patterns live in margins and hero. Text always sits on plain dark.
5. **Calm motion.** Animation only where it explains something, and always optional.

---

## 3. Color tokens (cyan and blue, no violet)

```css
:root {
  --bg: #0a0a0f;            /* page background */
  --surface: #12121a;       /* cards, panels */
  --surface-2: #181824;     /* hover / raised */
  --border: #1e293b;
  --text-strong: #f8fafc;   /* headings */
  --text: #cbd5e1;          /* body */
  --text-muted: #94a3b8;    /* captions, eyebrows */
  --accent: #06b6d4;        /* primary: cyan */
  --accent-2: #3b82f6;      /* secondary: blue */
  --accent-soft: rgba(6, 182, 212, 0.12);
  --glow-blue: rgba(59, 130, 246, 0.15);
  --success: #10b981;
  --focus: #22d3ee;
}

[data-theme="light"] {
  --bg: #fafafa;
  --surface: #ffffff;
  --surface-2: #f1f5f9;
  --border: #e2e8f0;
  --text-strong: #0f172a;
  --text: #334155;
  --text-muted: #64748b;
  --accent: #0891b2;
  --accent-2: #2563eb;
}
```

**Usage ratio:** about 60% background, 30% surfaces and text, 10% accent.
**Accent goes on:** primary buttons, links, active nav item, card index numbers, tags, key words in the hero headline.
**Avoid:** pure `#000` / `#fff` for large areas, neon green, multi-stop rainbow gradients.

---

## 4. Typography (proposed)

| Role | Font | Notes |
|---|---|---|
| Headings, body | Inter or Geist | Clean, neutral, matches the enterprise tone |
| Code, tags, eyebrows | JetBrains Mono or Geist Mono | Signals "engineer" |

| Style | Size | Weight | Notes |
|---|---|---|---|
| Hero H1 | clamp(2.5rem, 6vw, 4.5rem) | 600 | Tight tracking (-0.02em) |
| Section H2 | clamp(1.75rem, 4vw, 2.75rem) | 600 | |
| Card H3 | 1.25rem | 500 | |
| Body | 1rem / 1.7 | 400 | Max width 65ch |
| Eyebrow | 0.75rem | 500 | Mono, uppercase, letter-spacing 0.12em, `--text-muted` |

Use only two weights (400 and 500/600) to keep it refined.

---

## 5. Layout

- **Container:** max-width 1200px, side padding 24px (mobile) to 48px (desktop).
- **Section spacing:** 96px to 140px vertical on desktop, 64px on mobile.
- **Grid:** 12 columns. Project cards 3-up on desktop, 2-up on tablet, 1-up on mobile.
- **Nav:** sticky, translucent dark with 1px bottom border on scroll. Links: About, Skills, Experience, Projects, Contact. One CTA button on the right ("Let's talk").
- **Section pattern:** eyebrow, H2, one-line intro, content.

---

## 6. Sections and backgrounds

All sections share `--bg`. Only the hero is animated.

| # | Section | Background | Content |
|---|---|---|---|
| 1 | **Hero** | Canvas node-graph (about 60 nodes desktop, 25 mobile), cyan nodes, blue radial glow behind the headline | Name, role line, 1-sentence value statement, 2 CTAs (View projects, Contact) |
| 2 | **About** | Faint dot grid with a cursor spotlight | Short bio (see section 9), photo optional, key facts |
| 3 | **Skills** | Clustered constellation, with nodes grouped by category and faint dashed links between groups | Grouped skill chips (see section 7) |
| 4 | **Experience** | Horizontal glowing timeline (vertical on mobile): DRDO, CognitBotz, Digimaxx, with the current role in bright cyan | Role, dates, 2 to 3 impact bullets each |
| 5 | **Projects** | Faint pipeline (Agent, Retriever, LLM) with a slow pulse travelling along it | Filterable numbered cards (see section 7) |
| 6 | **Contact** | Concentric signal rings, centered | Email, LinkedIn, GitHub, short form or mailto CTA |

---

## 7. Components

### Project card (mirrors the numbered-card pattern)
```
01
NaukriBot                      <- H3
AI · Automation                <- category, mono, muted
One-sentence outcome.
[ View details v ]             <- expands in place

Core capabilities
- Persistent browser sessions (Playwright)
- Semantic matching (SentenceTransformers + FAISS)
- Screening Q&A solver
- Telegram control + FastAPI dashboard
[ Explore this work -> ]
```
- Surface `--surface`, 1px `--border`, 12px radius, 24px padding.
- Hover: border becomes `--accent` at 40% opacity, surface becomes `--surface-2`, 150ms ease.
- Index number "01" in mono, `--accent`.

### Filter tabs
`All · AI Agents · RAG · Full-stack · Automation`. Pill style, active pill uses `--accent-soft` fill and `--accent` text.

### Skill chips
Mono, 13px, 1px border, 6px radius. Grouped under small labels: **AI and ML**, **Backend**, **Frontend**, **Database**, **Languages**, **Tools and DevOps**. Order inside each group by strength, strongest first.

### Buttons
- **Primary:** `--accent` fill, dark text, 8px radius, 12px by 20px padding. Hover brightens slightly.
- **Secondary:** transparent, 1px `--border`, `--text-strong` text.
- Visible focus ring: 2px `--focus`, 2px offset.

### Floating assistant (optional, mirrors "Ask Maxy")
A bottom-right button, "Ask about my work", opening a small chat panel backed by a RAG pipeline over the portfolio content (resume, projects, NaukriBot write-up). It doubles as a live demo of your RAG and orchestration skills.

---

## 8. Motion

- Hero node-graph: `requestAnimationFrame`, pause when the tab is hidden, nodes drift slowly, links fade by distance, nodes near the cursor connect to it.
- Section reveal: fade and translate 12px, 400ms, once per element, triggered by IntersectionObserver.
- Pipeline pulse in Projects: one dot, 6s loop.
- Honor `prefers-reduced-motion`: show static versions of every background and disable reveals.
- Never animate layout properties. Use only `transform` and `opacity`.

---

## 9. Copy

**Hero**
> Praneeth. AI Engineer building the orchestration layer behind production AI.
> Agents, RAG pipelines, and workflows, coordinated into reliable, scalable systems.

**About**
> B.Tech Computer Science graduate (Vignan Institute of Technology and Science, Hyderabad) and Associate AI Engineer at Digimaxx AI Solutions. Started with internships at DRDO (Live Missile Data Simulation) and CognitBotz (enterprise dashboards for Adani using React.js, FastAPI, and PostgreSQL).

**Projects intro**
> Systems built to work in the real world, not just demo well.

**Contact**
> Have a complex problem? Let's build the intelligence to solve it.

Keep sentences short. Lead with the outcome. Add one metric per project where possible (requests per day, hours saved, applications sent).

---

## 10. Technical notes

- **Stack:** React + TypeScript + Vite. Tailwind optional (map the tokens above into `tailwind.config`).
- **Components:** `<NeuralBackground />`, `<SectionHeader eyebrow title intro />`, `<ProjectCard />`, `<FilterTabs />`, `<SkillGroup />`, `<Timeline />`, `<ThemeToggle />`.
- **Performance:** canvas only in the hero, lazy-load below the fold, target Lighthouse 90+ on mobile.
- **SEO:** update `<title>` and meta description to "AI Engineer" positioning (current tab text says "Full Stack Developer"), add Open Graph image.
- **Accessibility:** WCAG AA contrast, semantic landmarks, keyboard-navigable cards and tabs, alt text on any image.

---

## 11. Do and don't

| Do | Don't |
|---|---|
| Dark near-black base with one cyan and blue accent | Use violet, rainbow gradients, or neon green |
| Show orchestration visually (nodes, pipelines) | Use robot, brain, or circuit-board stock art |
| Keep patterns subtle and in margins | Put busy patterns behind body text |
| Use specific words: reliable, observable, multi-agent | Claim "redefining industry standards" |
| Lead each project with its outcome | List tools without saying what they achieved |
