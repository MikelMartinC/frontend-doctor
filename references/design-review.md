# Design review checklist

Systematic visual QA. With browser tooling available, screenshot at **375px, 768px and 1440px** before judging anything — never review responsive behavior from a single width.

## Severity levels

- **Blocker:** broken layout, unreadable text, failing contrast, overlapping elements, missing states.
- **High:** clearly hurts credibility or usability — misalignment, inconsistent spacing, jarring hierarchy.
- **Polish:** would elevate the design but doesn't hurt as-is.

Every finding must include the fix (exact CSS property or utility class change), not only the observation.

## 1. Visual hierarchy

- [ ] The most important element on the screen is unmistakable within 3 seconds (size, weight, position, color).
- [ ] There is exactly one primary action per view; secondary actions are visually subordinate (outline/ghost vs filled).
- [ ] Headings step down consistently — no `h3` visually louder than the `h2` above it.
- [ ] De-emphasis is used: metadata, captions and helper text are smaller/lighter than body text.

## 2. Spacing and alignment

- [ ] All spacing comes from one scale (4/8px multiples or project tokens). Flag any one-off values.
- [ ] Related items sit closer together than unrelated items (proximity communicates grouping).
- [ ] Elements align to a grid: left edges of stacked blocks line up; baselines of side-by-side text line up.
- [ ] Whitespace is symmetric where intended — cards with 24px top padding and 17px bottom padding are a bug.
- [ ] Nothing touches container edges unintentionally; sections breathe (don't fear generous padding).

## 3. Typography

- [ ] At most 2 font families; weights limited to a deliberate set (e.g. 400/500/700).
- [ ] Body text ≥ 16px; line-height ~1.5 for body, ~1.2 for headings.
- [ ] Line length 45–75 characters — flag full-width paragraphs on wide screens (`max-width: 65ch`).
- [ ] No faux hierarchy (bold body text acting as a heading); no ALL CAPS for long text.
- [ ] Numbers in tables/timers use `font-variant-numeric: tabular-nums`.

## 4. Color and contrast

- [ ] Body text contrast ≥ 4.5:1; large text and UI component boundaries ≥ 3:1 (measure, don't eyeball).
- [ ] Color is never the only signal (error states also get an icon/text, links are distinguishable beyond hue).
- [ ] Palette is restrained: one primary, neutrals, and semantic colors (success/warning/danger) used only for meaning.
- [ ] Dark mode (if supported): verify actual rendering — shadows, borders and images that work on white often fail on dark.

## 5. Interaction states

- [ ] Hover, focus-visible and active states exist on every interactive element and are noticeably distinct.
- [ ] Loading states preserve layout (skeletons sized like final content — no jumping).
- [ ] Empty and error states are designed, not default-blank.
- [ ] Disabled elements look disabled but remain readable (don't drop below 3:1 into invisibility).

## 6. Imagery and iconography

- [ ] Icons come from one set, one stroke width, consistent sizes (16/20/24px).
- [ ] Images have fixed aspect ratios (`aspect-ratio` or width+height) so they don't shift layout while loading.
- [ ] Avatars/user content handle the missing case (fallback initials, placeholder).

## 7. Motion

- [ ] Transitions are 150–300ms with an easing curve (`ease-out` for entrances); nothing animates slower than 400ms without reason.
- [ ] Motion has purpose (orientation, feedback) — decorative constant animation is a flag.
- [ ] `prefers-reduced-motion` disables non-essential animation.

## Report format

```
## Design review — <page/component> (<widths reviewed>)

### Blockers
1. <finding> — <file:line> — Fix: <exact change>

### High
...

### Polish
...
```
