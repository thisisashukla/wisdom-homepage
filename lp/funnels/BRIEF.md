# Funnel builds: shared brief (binding for every funnel agent)

Six funnels are being built in parallel on wisdomquotes.in (repo: wisdom-homepage/frontend, Next.js 14 app router, static generation). Each agent owns one funnel. Read this whole file first, then lp/quotes-build/STYLE.md, lp/02-brand-voice.md, lp/07-design-pass.md and lp/quotes-build/SPEC.md (the quote-page system you will reuse).

## Business context
- The site pulls traffic; the iOS app "Wisdom" monetises ($4.99/mo, $39.99/yr, 7-day trial). The app ICP is the English-speaking Indian diaspora on iPhone (US, UK, CA, AU) who want calm with almost no effort: a daily verse on the Lock Screen, 7-verse reading plans. Most web visitors are Hindi/Android India; they become a WhatsApp/email list via /start (Week 1 free, Google sign-in, plan by email).
- Every funnel page ends with the device-specific next step. Use `@/components/quotes/NextStep` with the `copy` prop to write lines for your text (the defaults mention Krishna). iPhone → App Store (ct slug), Android → WhatsApp channel (env) or /start, desktop → /start. pageKey: lowercase a to z, 0 to 9, hyphens, at most 40 chars, e.g. `ramayana-hub`. The app currently only has Gita (and a few Ramayana/Manas/Upanishad) lines, so iPhone copy must not promise content the app lacks: promise "a line each morning" or a Gita line, never "a Chalisa line on your Lock Screen".

## Ownership (to avoid clobbering parallel agents)
You may create and edit ONLY:
- your routes: `src/app/<your routes>/**` and Hindi twins under `src/app/hi/<your routes>/**`
- `src/components/funnels/<funnel>/**`, `src/lib/funnels/<funnel>.ts` (or a folder `src/lib/funnels/<funnel>/`)
- `src/content/funnels/<funnel>/**` (including `cards.json`, see below)
- `src/lib/funnelSitemaps/<funnel>.ts` (already stubbed; implement `entries()`)
- `scripts/funnels/<funnel>/**` (data generators; python3 or node)
- `lp/funnels/<funnel>/**` (HANDOFF.md, REVIEW.md, llms-section.md, notes)
Do NOT edit any other file: not sitemap.ts, layout.tsx, Nav, next.config.mjs, public/llms.txt, robots.txt, globals.css, quoteCardRender.ts, NextStep.tsx, themePlans.ts, the homepage, or any existing page. If you need a shared change, write it in HANDOFF.md under "Shared changes requested" and the lead will make it.
Route names are reserved per funnel in your prompt. Do not create routes outside your list.

## Environment rules
- Work through the device shell (mcp__remote-devices__device_bash) in `$HOME/mnt/wisdom-homepage/frontend`. Corpus is read-only at `$HOME/mnt/sanscripts`.
- No git commands. Deleting files is not permitted (rm fails); overwrite instead.
- No `npm install`, no new dependencies. Do NOT run `next build` or `next dev` (parallel agents share .next; the lead runs one build at the end).
- Verify with: `npx tsc --noEmit -p . 2>&1 | grep -E "<your paths>"` (other agents' half-written files may show errors; fix only yours), `npx eslint <your files>`, `python3 ../tools/copy-audit/audit.py --page <path substring>` from the repo root where it applies, and a grep for the em dash and en dash characters in every file you wrote. Zero hits required.
- You may render a page server-side to check it without next build by keeping pages simple and type-correct; rely on tsc.

## Data and editorial rules (non-negotiable)
- Every verse/line shown carries its original-language text (Sanskrit, Awadhi, Braj, Hindi). Show Devanagari or IAST through a toggle, never both at once on the same card.
- Interpretation follows Hindu scholars and traditional commentary (Shankara and the acharyas, Nilakantha for the Mahabharata, Gita Press tradition for the Manas) and never colonial readings (Max Müller, Hume as base) or Gandhi's.
- Judge an episode by its whole arc. Exclude verses that demean women, record the reason in the data (`exclude: {reason}`), and never make share cards of them.
- Never invent verses, refs, speakers or scenes. If unsure, leave it out and note it in REVIEW.md.
- Translations are our own. Never copy wording from copyrighted translations or commentaries: Gita Press Hindi bhavarth (Poddar), Gambhirananda, Nikhilananda, Easwaran, Olivelle, Debroy, Misra's Mahaviri English. Public-domain sources (M. N. Dutt, Ganguli, Sitarama Sastri, Paramananda, Vivekananda's Complete Works) may be used as reference; publish our own plain modern wording.
- Every generated meaning or note carries `reviewed: false` in the data, and REVIEW.md lists everything the owner must check (start with the showcase lines).
- No deity art, no film stills or posters. Text-first.
- Copy rules: lp/quotes-build/STYLE.md. In short: no em or en dashes anywhere, no "not X but Y" / "isn't X, it's Y" / "X is not A. It is B." patterns, no banned words (journey, unlock, timeless, ancient wisdom, profound, resonate, seeker, curated…), no exclamation marks, no emoji. Copy is about what the reader feels or does, never features.

## Design
- One shared skeleton across funnels: the house type scale, card unit (QuoteCard where it fits), NextStep, share-card layout, and Wisdom gold (#f5c96a) as the thread that marks every link back to the Gita.
- Each funnel varies only its palette (4 to 6 CSS custom properties scoped under a root class `.fx-<funnel>`) and one signature interaction (named in your prompt).
- Fonts: Tiro Devanagari Sanskrit/Hindi for every original line (see src/components/quotes/fonts.ts for the next/font pattern), Playfair Display and Inter for the brand. At most one extra display face, only if your prompt allows it.
- Mobile first at 360 to 412 px, tap targets 44 px, WCAG AA, visible focus, semantic HTML, lang attributes on Devanagari, prefers-reduced-motion respected, content visible without JS. Motion per lp/quotes-build/STYLE.md.
- Load the frontend-design skill (Skill tool: anthropic-skills:frontend-design) before designing components.

## Analytics (Mixpanel)
- Use `trackEvent` / `trackEventBeacon` from `@/lib/mixpanel`. Page views: use the existing pattern (`BlogTracker` from `@/components/BlogTracker` with a pageName, or trackPageViewed in a client component).
- Event names in Title Case "Object Action" (e.g. "Scene Lamp Tapped"). Every event carries `{ funnel: '<funnel>', page: '<pageKey>', locale }` plus specifics.
- Reuse existing events where the meaning is the same: Quote Copied / Quote Shared / Quote Image Saved (QuoteCard), Next Step Shown / Next Step Tapped (NextStep). Use `data-mp-location` on links so BlogTracker logs Link Clicked.
- List every new event with its properties in HANDOFF.md.

## SEO and AI discovery
- `generateMetadata` / `metadata` on every page: title at most 60 chars, description at most 155, canonical URL, hreflang alternates for EN/HI twins (en, en-IN, hi, hi-IN, x-default), Open Graph image (a share card from /api/quote-card/<cardId>?format=post&lang=en or the site default og-image).
- JSON-LD on every page via `<script type="application/ld+json">`: BreadcrumbList always; plus Article or CreativeWork (with `citation` naming the text and edition), FAQPage where there is an FAQ, ItemList on hubs, Quotation for line pages, HowTo only if truly a how-to.
- `generateStaticParams` for dynamic routes. No thin pages: each indexed page has unique substance; anything without it is `robots: { index: false }`.
- Each page opens with a 40 to 60 word direct answer (a paragraph with `id="quick-answer"`) that states the fact plainly with the verse reference, then the original line, plain English, then the arc. Visible refs use one consistent format per text. Add a short "Sources and method" note naming the editions and that the English is Wisdom's own.
- Internal links: to Gita verse pages (`/gita/chapter/<c>/verse/<v>`) wherever there is a real bridge, to /start, and across your funnel pages.
- Implement `src/lib/funnelSitemaps/<funnel>.ts` entries() from your content data, with `lastModified: new Date('2026-10-30')`, sensible priorities, and hreflang alternates for twins.
- Write `lp/funnels/<funnel>/llms-section.md`: a markdown section in the style of public/llms.txt (heading, 2 to 4 sentence description, bullet list of URLs with one line each) for the lead to merge.

## Share cards
- Add items to `src/content/funnels/<funnel>/cards.json`: an array of objects `{ id, source, sourceName: {en, hi}, speaker?: {en, hi}, sanskritLine, iast, meaning: {en, hi} }`. Prefix ids with your funnel prefix (given in your prompt). The existing route `/api/quote-card/<id>?format=post|status|square&lang=en|hi&theme=paper|night` now reads these files. Meanings at most 20 words.

## Deliverables
- Working pages and data in your owned paths, type-clean.
- `lp/funnels/<funnel>/HANDOFF.md`: routes built (with what each holds), files created, data generated and how, events, SEO/AI notes, shared changes requested, open issues.
- `lp/funnels/<funnel>/REVIEW.md`: every generated translation or note the owner must check, showcase lines first.
- `lp/funnels/<funnel>/llms-section.md`.
- Final reply to the lead: at most 250 words (routes, page count, events, blockers).
