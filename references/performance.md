# Frontend performance

**Measure → fix → measure again.** Never claim an improvement without before/after numbers. With browser tooling available, use the Performance/Network data; otherwise instrument with the project's tooling (Lighthouse, `next build` output, bundle analyzer).

## Targets (Core Web Vitals)

| Metric | Good | What it measures |
|--------|------|------------------|
| LCP | ≤ 2.5s | Largest content paint — loading |
| INP | ≤ 200ms | Interaction to next paint — responsiveness |
| CLS | ≤ 0.1 | Cumulative layout shift — stability |

## Triage: match the symptom to the lever

### Slow initial load (LCP)

1. **Find the LCP element** (usually hero image or heading) and prioritize it:
   - Hero image: `fetchpriority="high"`, never lazy-load it, serve modern format (AVIF/WebP) properly sized.
   - Preload critical font: `<link rel="preload" as="font">` + `font-display: swap`.
2. **Cut render-blocking work:** defer non-critical scripts, inline critical CSS if the framework supports it.
3. **Shrink the JS actually shipped:**
   - Analyze first (`next build`, `vite-bundle-visualizer`, `source-map-explorer`) — fix the biggest item, not the easiest.
   - Route-level code splitting; `dynamic import()` for heavy below-the-fold widgets (charts, editors, maps).
   - Replace heavyweight deps (moment→date-fns/Temporal, lodash→per-method imports or native, big icon packs→only used icons).
4. **Images:** correct `sizes`/`srcset`, lazy-load below-the-fold (`loading="lazy"`), explicit dimensions.

### Sluggish interactions (INP)

- Long tasks: break up >50ms main-thread work; debounce input handlers; move heavy computation to a web worker.
- React: memoize expensive subtrees (`memo`, `useMemo`) only after profiling shows re-render cost; fix the cause first (state placed too high, unstable props/context).
- Virtualize long lists (>~100 rows): `@tanstack/react-virtual` or equivalent.
- Avoid layout thrashing: batch DOM reads and writes; don't interleave `offsetHeight` reads with style writes in a loop.

### Layout shift (CLS)

- Every image/video/embed/ad slot gets explicit dimensions or `aspect-ratio`.
- Skeletons sized like the final content; never inject banners above existing content after load.
- `font-display: swap` + preload, or `size-adjust` fallback metrics, to limit font-swap shift.
- Animate with `transform`, never with `top/left/width/height/margin`.

## Framework notes

- **Next.js/Nuxt/SvelteKit:** prefer server rendering/server components for content; keep client components at the leaves. Check for accidental `"use client"` at layout level pulling the whole tree client-side.
- **SPA:** ensure the router code-splits per route by default; audit anything imported in the entry chunk.
- **Data:** cache with the layer you have (React Query/SWR staleness, HTTP `Cache-Control`); dedupe duplicate fetches for the same resource on one page; paginate — don't fetch 10k rows to display 20.

## Quick wins checklist

- [ ] Compression (brotli/gzip) and caching headers on static assets.
- [ ] No unused heavy dependencies in the client bundle (check the analyzer output).
- [ ] Fonts: ≤ 2 families, subsetted, `woff2`, preloaded.
- [ ] Third-party scripts: loaded `defer`/`async`, ideally after interaction (analytics, chat widgets).
- [ ] Icons: tree-shaken imports (`lucide-react/icons/x`), not the whole set.
- [ ] `useEffect` chains that fetch sequentially → parallelize or move to the data layer.

## Report format

```
## Performance — <page>
Baseline: LCP <x>s · INP <x>ms · CLS <x> · JS shipped <x>kB
Changes: 1. <change> — <expected/measured impact>
After: LCP <x>s · INP <x>ms · CLS <x> · JS shipped <x>kB
```
