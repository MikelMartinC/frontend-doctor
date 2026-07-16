# 🩺 frontend-doctor

A comprehensive **frontend skill for Claude Code**: it turns Claude into a senior frontend engineer with a strict quality bar. One skill, five modes — component building, visual design review, accessibility auditing (WCAG 2.2 AA), responsive layout debugging, and performance optimization (Core Web Vitals).

Framework-agnostic, with specific guidance for React, Vue and Tailwind CSS.

**🌐 Demo site:** [mikelmartinc.github.io/frontend-doctor](https://mikelmartinc.github.io/frontend-doctor/) — built with the skill's own prescription: semantic HTML, keyboard-first, AA contrast, light/dark theme, `prefers-reduced-motion` aware, fully responsive, zero dependencies.

## Install

```bash
npx skills add MikelMartinC/frontend-doctor
```

Or manually — clone into your skills directory:

```bash
# Project-level (shared with your team via git)
git clone https://github.com/MikelMartinC/frontend-doctor .claude/skills/frontend-doctor

# Or user-level (available in all your projects)
git clone https://github.com/MikelMartinC/frontend-doctor ~/.claude/skills/frontend-doctor
```

Claude Code picks it up automatically — no configuration needed. It activates whenever you ask for frontend work, and you can invoke it explicitly with `/frontend-doctor`.

**Recommended companion:** the [Playwright MCP server](https://github.com/microsoft/playwright-mcp). With it, Claude renders your actual UI, takes screenshots at multiple viewport widths and verifies its own work. The skill works without it (static, code-level review), but it shines with it.

## What it does

Without a skill, Claude produces *reasonable* frontend code — but inconsistently: it may forget the error state, remove a focus outline, or only check the desktop layout. **frontend-doctor** fixes that by imposing the internal checklist of a senior frontend team. When you ask for frontend work, Claude detects which of the five modes applies and loads only that mode's reference file (progressive disclosure — your context stays lean).

### 🧱 Build mode

*"Create a pricing card with a monthly/annual toggle"*

Before writing any code, Claude must:

1. **Read the project first** — detect the styling approach (Tailwind, CSS Modules, styled-components), component library (shadcn/ui, Radix, MUI…) and naming conventions, and match them exactly. It never imposes a new paradigm on your codebase.
2. **Enumerate states before coding** — every data-driven component ships with all five data states (loading, error, empty, partial, populated) and every interactive element with all interaction states (default, hover, focus-visible, active, disabled). No more "happy path only" components.
3. **Build semantic-first** — native HTML (`button`, `a`, `dialog`, `details`, real `<form>` submission) before ARIA; *no ARIA is better than wrong ARIA*.
4. **Verify** — run the project's typecheck/lint/tests, and render the result at 375px and 1440px when browser tooling is available.

The reference also covers props API design (variant unions over boolean explosions, composition over configuration, native attribute passthrough, ref forwarding) and styling rules (spacing scales, design tokens, parent-controlled layout, `min-height` over `height`).

### 👁️ Design review mode

*"Review the dashboard UI before we ship it"*

Claude screenshots the page at **375px, 768px and 1440px** and evaluates it against a systematic checklist: visual hierarchy, spacing rhythm and alignment, typography scale and line length, color restraint and measured contrast, interaction states, imagery consistency, and motion.

Findings come back ordered by severity — **Blocker / High / Polish** — and every finding includes the exact fix (the CSS property or utility class to change), not just the observation.

### ♿ Accessibility audit mode

*"Audit the checkout flow for WCAG compliance"*

A WCAG 2.2 AA audit that starts where real websites actually fail: **the keyboard path** (Tab order, visible focus, modal focus traps, Escape behavior, no keyboard traps). Then semantics and landmarks, forms (programmatic labels, error association, `autocomplete`), images and media, visual criteria (contrast ratios, 200% zoom, reflow at 320px), dynamic content (`aria-live`, `aria-expanded`, `aria-busy`), and motion/timing.

Each finding cites the WCAG criterion, the affected element, **who it breaks the experience for**, and the code-level fix.

### 📱 Responsive mode

*"The sidebar breaks on tablet, fix it"*

A diagnosis-first workflow: reproduce at the exact breaking width, identify the root cause, and fix it fluid-first instead of patching symptoms with one-off media queries. Includes a symptom → cause → fix table for the classic breakages (horizontal scroll on mobile, squished columns, overflowing text, unusable tables) and the modern techniques to reach for: `clamp()`, container queries, `auto-fit`/`minmax()`, `aspect-ratio`, dynamic viewport units — plus Tailwind-specific mobile-first rules.

Verification always covers 320px (WCAG reflow), the three main widths, landscape phones and 200% zoom.

### ⚡ Performance mode

*"The landing page LCP is 4 seconds, improve it"*

A Core Web Vitals triage playbook: symptoms map to levers — slow load (LCP) → prioritize the LCP element, cut render-blocking work, shrink shipped JS via bundle analysis; sluggish interactions (INP) → break up long tasks, fix re-render causes, virtualize long lists; layout shift (CLS) → explicit dimensions, sized skeletons, font loading strategy.

Hard rule: **measure before and after — never claim an improvement without numbers.**

## Non-negotiables (enforced in every mode)

- Interactive elements are keyboard-reachable with a visible focus indicator.
- Text contrast meets WCAG AA (4.5:1 body, 3:1 large text / UI components).
- Images have meaningful `alt` text; form inputs have associated labels.
- Touch targets are at least 44×44px on mobile.
- No layout that only works at one viewport width.
- `prefers-reduced-motion` is respected for non-essential animation.
- Focus outlines are never removed without an equal-or-better replacement.

## Structure

```
frontend-doctor/
├── SKILL.md                        # Entry point: modes, workflows, non-negotiables
└── references/                     # Loaded on demand, one per mode
    ├── component-patterns.md       # States, props API, semantic HTML, styling rules
    ├── design-review.md            # Visual QA checklist with severity levels
    ├── accessibility.md            # WCAG 2.2 AA audit, keyboard-first
    ├── responsive.md               # Fluid-first fixes for common breakages
    └── performance.md              # Core Web Vitals triage playbook
```

## Philosophy

- **Correct, accessible, responsive, fast — in that order.**
- Semantic HTML before ARIA; no ARIA is better than wrong ARIA.
- Reviews produce fixes, not just findings.
- Performance claims require measurements.
- Match the host project's conventions — never impose a styling paradigm.

## Contributing

Issues and PRs welcome — especially real-world failure cases the checklists miss. See [CONTRIBUTING.md](CONTRIBUTING.md).

## License

[MIT](LICENSE)
