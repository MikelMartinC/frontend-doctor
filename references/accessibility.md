# Accessibility audit (WCAG 2.2 AA)

Audit order matters: keyboard first (highest real-world failure rate), then semantics, then visual criteria.

## 1. Keyboard path (test this first)

Walk the entire flow using only the keyboard:

- [ ] Every interactive element is reachable with Tab, in an order that matches visual reading order.
- [ ] Focus is always visible (WCAG 2.4.7). `outline: none` without a replacement is an automatic Blocker.
- [ ] Enter activates links/buttons; Space activates buttons; arrow keys work within composite widgets (menus, tabs, radio groups).
- [ ] Modals: focus moves into the dialog on open, is trapped inside, Escape closes, focus returns to the trigger on close.
- [ ] No keyboard traps (2.1.2) — you can always Tab out of any widget.
- [ ] Skip link to main content exists on page-level navigation (2.4.1).
- [ ] Nothing requires hover only — anything shown on hover is also reachable via focus and dismissible (1.4.13).

## 2. Semantics and structure

- [ ] Exactly one `<h1>`; heading levels don't skip (h1→h2→h3); headings describe the section, not styling.
- [ ] Landmarks: `header`, `nav`, `main` (one), `footer`; repeated landmarks (two navs) get `aria-label`s.
- [ ] Buttons are `<button>`, links are `<a href>`. A "link" that runs JS is a button; a "button" that navigates is a link.
- [ ] Lists of items use `ul/ol/li`; data tables use `<table>` with `<th scope>` — not div grids.
- [ ] The page has a descriptive `<title>` and `<html lang>` set.

## 3. Forms

- [ ] Every input has a programmatic label (`<label for>`, wrapping label, or `aria-label` as last resort). Placeholder is never the label (disappears on input).
- [ ] Required fields marked in the label and with `required`/`aria-required` — not color alone.
- [ ] Errors: identified in text next to the field (3.3.1), associated via `aria-describedby`, and `aria-invalid` set. On submit failure, move focus to the first error or an error summary.
- [ ] Inputs use the right `type` (`email`, `tel`, `url`) and `autocomplete` attributes (1.3.5).
- [ ] Grouped controls (radio sets) are wrapped in `<fieldset><legend>`.

## 4. Images and media

- [ ] Informative images have `alt` describing their function (not "image of…"); decorative images have `alt=""`.
- [ ] Icon-only buttons have `aria-label`; SVG icons inside labeled controls have `aria-hidden="true"`.
- [ ] Video: captions (1.2.2). Audio doesn't autoplay.

## 5. Visual criteria

- [ ] Text contrast ≥ 4.5:1; large text (≥24px, or ≥18.7px bold) and UI components/graphics ≥ 3:1 (1.4.3, 1.4.11).
- [ ] Text resizes to 200% without loss of content (1.4.4); layout survives 320px-wide viewport without horizontal scroll (1.4.10 reflow).
- [ ] Color is never the sole indicator (1.4.1).
- [ ] Touch/click targets ≥ 24×24px minimum per WCAG 2.5.8 — aim for 44×44px on mobile.

## 6. Dynamic content

- [ ] Async updates that matter (toasts, validation results, "N results found") are announced: `role="status"` / `aria-live="polite"`; use `assertive` only for errors requiring immediate attention.
- [ ] Expand/collapse controls carry `aria-expanded`; the current nav item has `aria-current="page"`.
- [ ] Loading regions use `aria-busy="true"` while pending.
- [ ] Custom widgets (tabs, comboboxes, menus) follow the WAI-ARIA Authoring Practices pattern completely — a half-implemented ARIA pattern is worse than a plain one. Prefer a headless library (Radix, Headless UI, React Aria) over hand-rolling.

## 7. Motion and time

- [ ] `prefers-reduced-motion` respected for non-essential animation (2.3.3).
- [ ] Nothing flashes more than 3 times per second (2.3.1).
- [ ] Auto-advancing content (carousels) can be paused (2.2.2).

## Report format

For each finding: **WCAG criterion · element/location · who it breaks the experience for · code-level fix.** Order by severity: Blocker (task impossible for some users) → High (major friction) → Advisory.
