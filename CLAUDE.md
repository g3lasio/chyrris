# Working rules for this repo

Chyrris Technologies LLC — corporate site (chyrris.com). Express + Vite + React,
prerendered at build time, deployed on Railway from `main`.

**There are paying subscribers behind this deploy.** The Caymus Tank Calculator
subscription flow runs on the same server as the marketing site, and the
production environment holds a live Stripe key. Breaking it costs real revenue.

---

## Never

- **Never delete or disable images to meet a page-weight target.** Weight budgets in this
  repo have a floor as well as a ceiling. If you cannot meet a budget, say so and stop.
  This rule exists because an earlier pass scored "6.8 MB → 239 KB" as a win while
  quietly shipping a homepage with one image, inlined as a data URI. The image-weight
  floor in CI (`.github/workflows/quality.yml`) now fails the build on that.
- **Never modify these files without explicit approval in the request:**
  `server/stripe.ts`, `server/caymus-access.ts`, `server/apple-iap.ts`,
  `server/caymus-store.ts`, `server/twilio.ts`.
  CI blocks the PR unless it carries the `payment-approved` label.
- **Never add or change Content-Security-Policy, security headers, middleware, or route
  rewrites without explicit approval.** These break Stripe.js and Apple IAP silently —
  the page still renders, the payment just never completes.
- **Never fabricate a URL.** A link that 404s is worse than a product shown without a
  link. If a store URL is unknown, leave the slot empty: `shared/site/portfolio.ts`
  renders a link only when it has a destination, so an empty slot degrades correctly.
- **Never report a task complete on a failing screenshot or a red CI run.**

## Always

- **Always screenshot at 1440px and 390px before reporting completion**, and score the
  screenshots against the acceptance criteria in the request. Look at them. A previous
  pass shipped a scroll-reveal that left every section below the fold blank; the bug was
  invisible in the HTML and obvious in the screenshot.
- **Always keep server-rendered text in the HTML source.** Content behind client-side
  rendering is invisible to search engines and to AI crawlers, which mostly do not run
  JavaScript. `npm run build` prerenders every route; if you add a route, add it to
  `shared/site/routes.ts` or it ships as a 404.
- **Always read `design-system/README.md` before writing any UI.**

## Facts that must not drift

These live in `shared/site/company.ts` and are the single source of truth. Read from
there; never retype them into a component.

| | |
|---|---|
| Legal name | Chyrris Technologies LLC — never "Inc.", never bare "Chyrris Technologies" in a legal context |
| Location | **Fairfield, California** — city and state only, never a street address |
| Registration | California LLC No. B20260351587 |
| Emails | `info@chyrris.com` (general, partnerships, press, legal) · `support@chyrris.com` (product support) — never a personal address |
| Support commitment | "within two business days, Monday through Friday" — one wording, everywhere |
| LeadPrime's AI agent | **KEEN**. Mervin AI is a different product and keeps its name. |

Banned strings anywhere in shipped output: `San Francisco`, `military-grade`,
`grado militar`, `startup` (as self-description), `Coming Soon`, `Próximamente`,
`Replit`, `attached_assets`, `gelasio@chyrris.com`.

## Commands

```bash
npm run build     # images → client → ssr → prerender → server bundle
npm run check     # tsc --noEmit
npm start         # production server (needs a build first)
npm run images    # regenerate image derivatives from assets-src/
```

Images live in `assets-src/` (sources, not bundled) and are derived into
`client/src/assets/generated/` and `client/public/`. Both derivative trees are
committed, so the build survives a host where `sharp` fails to install.

## Reporting

- State what you did not verify and why. An unverified claim reported as verified is a
  more expensive failure than an honest gap.
- When a number is the deliverable (page weight, score, count), show the measurement
  command and its output, not a summary of it.
