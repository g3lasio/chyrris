# Chyrris design system

Read this before writing any UI in any Chyrris repo. It is short on purpose.

The rules below are not preferences. Each one is here because its absence produced a
specific defect on chyrris.com that a person had to find by hand.

---

## The one-sentence version

A sober, dark, text-first corporate surface: one accent colour, borders instead of
shadows, one vertical rhythm, system fonts, and no decoration that carries no
information.

## What this is not

The site this replaced ran three design systems at once — a cyan sci-fi homepage with
particle backgrounds and HUD scan lines, a gold Tzotzil section using emoji as icons, and
Caymus pages with no header or footer at all. It read as three companies. Do not
reintroduce:

- Neon, glow, scan lines, particle fields, "holographic" anything
- Emoji as iconography
- More than one accent colour
- Animated opacity on content (see **Motion**)
- A page that renders its own header or footer instead of using `Layout`

---

## Tokens

`tokens.css` is the source of truth. Never hardcode a hex value, a font size, or a pixel
gap in a component. If a value is missing, add it to `tokens.css` first.

In this repo the tokens are consumed through Tailwind: `bg-ink`, `text-text-muted`,
`border-line`, `bg-accent`. Reach for a token class, not an arbitrary value.

```jsx
// no
<div className="bg-[#12151a] text-[#98a3b3] p-[22px]">

// yes
<div className="bg-surface text-text-muted p-6">
```

### Colour

Four surfaces, three text steps, one accent. That is the whole palette.

| Use | Token |
|---|---|
| Page background | `--ink` / `bg-ink` |
| Alternating section, footer, cards | `--surface` / `bg-surface` |
| Hover, popover | `--surface-raised` |
| Default border | `--line` / `border-line` |
| Interactive border, inputs | `--line-strong` |
| Body copy and headings | `--text` |
| Secondary copy | `--text-muted` |
| Labels and metadata only | `--text-faint` |
| The single accent | `--accent` |

**`--text-faint` is not a body-copy colour.** It sits at ~4.6:1, which passes for large
text and UI but is uncomfortable for a paragraph. Use `--text-muted` for anything
someone has to read.

**Never use colour as the only signal.** A disabled button also loses its border; an
error message also carries text.

### Type

System stack, deliberately. Zero network requests, zero render-blocking, zero font swap.
The user is a contractor on a phone on a job site.

- `h1` — `text-3xl` mobile / `text-4xl`–`text-6xl` desktop, `font-semibold`,
  `tracking-tight`
- `h2` — `text-2xl` / `text-3xl`, `font-semibold`, `tracking-tight`
- `h3` — `text-lg`–`text-xl`, `font-semibold`
- Body — `text-base` (15px), `leading-relaxed`, `text-text-muted`
- Lede — `text-lg` (17px), `text-text-muted`, capped at `max-w-2xl`
- Eyebrow — `text-xs`, `uppercase`, `tracking-[0.18em]`, `text-accent`, `font-semibold`

Headings get `text-wrap: balance`, paragraphs get `text-wrap: pretty`. Both are already
set globally in `index.css`.

**Measure**: body copy never exceeds ~75 characters. Use `max-w-2xl` for ledes and
`container-prose` for long-form pages.

### Spacing

One vertical rhythm. Sections use the `.section` class (`py-16 md:py-24`) and nothing
else. If a section needs different spacing, that is a signal the content is wrong, not
the spacing.

Two container widths: `.container-site` (1152px) for standard pages,
`.container-prose` (768px) for legal text and support docs.

---

## Components

### Card

```jsx
<article className="card p-6">   {/* rounded-lg border border-line bg-surface */}
```

- Border, not shadow. On a near-black background a shadow is invisible.
- Hover changes the border (`hover:border-line-strong`), never the background jump.
- A card in a grid uses `flex h-full flex-col` so the row bottoms align; the action row
  sits behind `mt-auto` with `border-t border-line pt-5`.
- **A card that represents a real thing shows an image of it.** Product cards without
  imagery make real products look like placeholder rows.

### Button

Three variants, no more.

| Variant | Classes | When |
|---|---|---|
| Primary | `rounded bg-accent px-5 py-2.5 text-sm font-medium text-white hover:bg-accent-hover` | The one action the page wants |
| Secondary | `rounded border border-line-strong px-5 py-2.5 text-sm font-medium text-text-muted hover:border-accent hover:text-text` | Everything else |
| Small / chip | `rounded border border-line-strong px-3 py-1.5 text-xs font-medium` | Link rows inside cards |

One primary button per view. Disabled state is
`disabled:cursor-not-allowed disabled:opacity-60` and the label changes to say what is
happening ("Sending…"), never a spinner alone.

Minimum touch target 40px in any direction on mobile.

### Nav

- `sticky top-0 z-50 border-b border-line bg-ink/90 backdrop-blur-md`, height `h-16`
- A skip-to-content link is the first focusable element on the page
- Current page carries `aria-current="page"`
- The mobile panel **must** close on Escape, on pointer-down outside, and on route
  change. All three. Missing any one of them was a shipped bug.
- The language switcher is two real `<a>` links to the localised URLs — never a
  JavaScript toggle over `localStorage`. A decorative overlay once swallowed the click
  and left the Spanish site unreachable.

### Section

```jsx
<section className="section border-b border-line">      {/* or bg-surface to alternate */}
  <div className="container-site">
    <p className="eyebrow">Label</p>
    <h2 className="mt-3 text-3xl font-semibold tracking-tight">Heading</h2>
    <p className="mt-4 max-w-2xl text-lg text-text-muted">Lede</p>
  </div>
</section>
```

Alternate `bg-ink` and `bg-surface` between sections. Separate with `border-b border-line`,
not with empty space.

### Form field

```jsx
<label className="block text-sm font-medium text-text" htmlFor="x">Label</label>
<input id="x" name="x" className="mt-1.5 w-full rounded border border-line-strong
  bg-ink px-3 py-2.5 text-[15px] focus:border-accent" />
```

- Every input has a real `<label>` with `htmlFor`. Placeholders are not labels.
- Optional fields say so in the label; do not mark the required ones.
- Errors go in an `aria-live="polite"` region and name the field.
- Any form that creates a record needs: required fields, a consent checkbox, a honeypot,
  and server-side rate limiting. Client validation is a courtesy, not a control.

---

## Motion

**Never animate the opacity of content.** Ever.

Two separate shipped bugs came from this: sections that stayed near-transparent when the
scroll animation did not complete, and a rebuild that left everything below the fold
blank in screenshots because an IntersectionObserver never fired.

If you want an entrance, animate `transform` only, default to the visible state, and add
a timeout that clears the transform if the observer never fires. `Reveal.tsx` is the
reference implementation.

Respect `prefers-reduced-motion: reduce` — it is already handled globally in
`index.css`.

---

## Accessibility floor

Not aspirational. CI fails below Lighthouse Accessibility 95.

- Visible focus ring on every interactive element (`:focus-visible`, set globally)
- Viewport never sets `maximum-scale` or `user-scalable=no` (WCAG 2.1 SC 1.4.4)
- One `h1` per page; heading levels do not skip
- Every image has an `alt`; decorative images get `alt=""`
- Icon-only buttons carry `aria-label`
- Colour is never the sole carrier of meaning

## Images

- Derive every image to the size it is actually displayed. A 2048×2048 PNG shown at
  128×128 shipped 5.3 MB to render a thumbnail.
- WebP with a PNG or JPEG fallback, `srcset` at 1x/2x, `sizes` set.
- `loading="lazy"` on everything except the header logo and the hero.
- Always set `width` and `height` so nothing shifts on load.
- `assetsInlineLimit: 0` — no image is inlined as a data URI. Inlined images vanish from
  the image-weight budget and from auditing tools, which is exactly what the CI floor
  exists to prevent.
- Sources go in `assets-src/` and are never bundled. Derivatives are committed.

## Copy

- Plain language in both English and Spanish. The Spanish is written for a Spanish
  speaker, not translated word for word.
- No jargon dressed as personality. "Designation", "Communication Channel",
  "Transmission Subject" and "TRANSMIT MESSAGE" were the old contact form's labels.
- Say what a thing is. No empty adjectives, no capability claims without a product
  behind them.
