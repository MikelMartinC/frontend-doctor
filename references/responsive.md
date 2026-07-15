# Responsive design

## Workflow for responsive bugs

1. Reproduce at the exact width where it breaks (browser tooling: resize to 320, 375, 768, 1024, 1440).
2. Identify the cause category (below) — don't patch symptoms with one-off media queries.
3. Fix with fluid-first techniques; add breakpoints only where content genuinely needs a different layout.
4. Re-verify at all widths **and** at 200% zoom (zoom ≈ smaller viewport and is a WCAG requirement).

## Principles

- **Mobile-first CSS:** base styles for small screens, `min-width` queries to enhance upward. Mixed `min`/`max` queries in one file are a smell.
- **Fluid by default:** layouts should flex between breakpoints, not only at them. If it breaks at 837px but works at 768px and 1024px, it isn't responsive.
- **Content-driven breakpoints:** add a breakpoint where the content breaks, not at device names.
- **Let the browser work:** prefer `grid`/`flexbox` wrapping and `minmax()` over media queries counting columns.

## Common breakages and their real fixes

| Symptom | Cause | Fix |
|---------|-------|-----|
| Horizontal scroll on mobile | Fixed-width element, unbroken long string, or 100vw + padding | `max-width: 100%`; `overflow-wrap: break-word`; use `100%` not `100vw` |
| Squished columns on tablet | Fixed column count | `grid-template-columns: repeat(auto-fit, minmax(280px, 1fr))` |
| Text overflowing its box | Fixed `height` on text container | `min-height`, or remove the height |
| Giant images on mobile | Missing constraints | `max-width: 100%; height: auto` + `aspect-ratio` to prevent CLS |
| Table unusable on mobile | Wide table forced to shrink | Wrap in `overflow-x: auto` container, or reflow to cards/definition list |
| Nav unusable on mobile | Desktop-only nav | Disclosure menu with a real `<button aria-expanded>`, focus management |
| Tiny tap targets | Desktop-sized controls | ≥44×44px targets; add padding, not just larger icons |

## Techniques to reach for

- `clamp()` for fluid type and spacing: `font-size: clamp(1rem, 0.9rem + 1vw, 1.25rem)` — removes whole classes of breakpoint CSS.
- `flex-wrap: wrap` + `gap` + `flex: 1 1 <basis>` for rows that gracefully collapse into columns.
- Container queries (`@container`) when a component's layout should depend on its container, not the viewport — the right tool for cards/sidebars used in multiple contexts.
- `aspect-ratio` for media boxes; `object-fit: cover` for images that must fill.
- Dynamic viewport units (`dvh` instead of `vh`) for full-height sections on mobile (avoids the browser-chrome jump).
- `<img srcset sizes>` or the framework's image component — don't ship 2000px images to phones.

## Tailwind specifics

- Order utilities mobile-first: `flex flex-col md:flex-row` (base is mobile; never write the desktop layout unprefixed and "undo" it with `max-md:`).
- Use `gap-*` over child margins; use fractions/`grid-cols-*` with responsive prefixes.
- Arbitrary values (`w-[837px]`) in responsive code are a smell — prefer the scale.

## Verification checklist

- [ ] 320px: no horizontal scroll, all content reachable (WCAG reflow).
- [ ] 375px / 768px / 1440px: intentional layout at each, no awkward in-between states when dragging the width.
- [ ] Landscape phone (short viewport): fixed headers/footers don't consume the screen.
- [ ] 200% zoom at desktop width: equivalent to mobile — must still work.
- [ ] Touch targets ≥ 44px on mobile; hover-only interactions have touch equivalents.
