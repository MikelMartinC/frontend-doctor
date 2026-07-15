# Component patterns

Guidance for building components that are predictable, complete and consistent with the host project.

## 1. Match the project, always

Before writing a component, answer from the codebase (not from preference):

- **Styling:** Tailwind? CSS Modules? styled-components? Design tokens/CSS variables? Use exactly what exists.
- **Component library:** shadcn/ui, Radix, Headless UI, MUI, custom? Compose from it instead of reimplementing primitives.
- **Conventions:** file naming (`Button.tsx` vs `button.tsx`), folder-per-component vs flat, barrel exports, test co-location.
- **Data patterns:** how existing components fetch, cache and handle errors (React Query, SWR, server components, stores).

## 2. The five data states

Any component that renders external data must handle all five. Sketch them before coding:

| State | Requirement |
|-------|-------------|
| Loading | Skeleton matching final layout (prevents CLS). Spinners only for sub-300ms operations or button-internal loading. |
| Error | Human message + retry action. Never a raw error string or a blank region. |
| Empty | Explain *why* it's empty and what the user can do ("No projects yet — create your first one"). Never render bare nothing. |
| Partial | Long lists: pagination/virtualization. Long text: truncation with full value on demand. |
| Populated | The happy path — also verify with extreme content (1 item, 1000 items, very long strings, missing optional fields). |

## 3. Interaction states

Every interactive element defines: `default`, `hover`, `focus-visible`, `active`, `disabled` — and `aria-busy`/internal loading where an action is async.

- Style focus with `:focus-visible` (not `:focus`) so mouse users don't see rings but keyboard users always do.
- Disabled buttons during async submits must also communicate progress (spinner or label change), not just be inert.

## 4. Props API design

- **Narrow types over booleans that multiply:** `variant: "primary" | "secondary" | "ghost"` instead of `isPrimary`, `isGhost`.
- **Pass through native attributes:** extend `ComponentProps<"button">` (React) or use `v-bind="$attrs"` (Vue) so consumers can set `type`, `aria-*`, `data-*` without new props.
- **Composition over configuration:** if a component grows more than ~8 props, split it into composable parts (`Card` + `Card.Header` + `Card.Body`) rather than adding `showHeader`, `headerIcon`, `headerAction`…
- **Controlled and uncontrolled:** inputs accept `value`/`onChange` but work uncontrolled with `defaultValue` where cheap to support.
- **Forward refs** on any component wrapping a focusable/measurable element.

## 5. Semantic HTML first

| Need | Use | Not |
|------|-----|-----|
| Navigate to a URL | `<a href>` | `<div onClick>` / `<button>` + router push |
| Trigger an action | `<button type="button">` | `<div>`/`<span>` with onClick |
| Modal | `<dialog>` or library with focus trap | absolutely-positioned div |
| Disclosure/accordion | `<details>/<summary>` or `aria-expanded` button | CSS-only hover reveal |
| Form submit | `<form onSubmit>` + `<button type="submit">` | onClick on a button (breaks Enter key) |
| Page structure | `header/nav/main/aside/footer`, one `<h1>`, ordered heading levels | div soup, headings picked by font size |

ARIA is a last resort: **no ARIA is better than wrong ARIA**. Native elements ship keyboard behavior for free.

## 6. Styling rules

- Space with a consistent scale (multiples of 4px / the project's spacing tokens). Never invent one-off values like `margin: 13px`.
- Prefer parent-controlled layout: components don't carry external margins; the container spaces its children (`gap`, `space-y-*`).
- Use design tokens/CSS variables for color — never hardcode hex values that exist as tokens.
- `min-height` over `height` for anything containing text.
- Animate only `transform` and `opacity`; wrap non-trivial motion in `@media (prefers-reduced-motion: no-preference)`.

## 7. Definition of done

- [ ] All five data states implemented (where data applies) and all interaction states styled.
- [ ] Keyboard: reachable, operable, visible focus, logical Tab order.
- [ ] Labels: inputs associated via `htmlFor`/`id` or wrapping `<label>`; icon-only buttons have `aria-label`.
- [ ] Renders correctly at 375px and 1440px; long content doesn't break layout.
- [ ] Typecheck, lint and existing tests pass; new logic has tests if the project tests components.
