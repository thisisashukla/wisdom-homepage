# Quote pages build spec (30 Oct 2026)

Source plan: https://claude.ai/artifact/VZr65ZxEbYJzH1AFojXZd1 ("Wisdom: quote-search ICP and the quote page that funnels to the app").
Repo: wisdom-homepage/frontend (Next 14 app router, TS, no Tailwind; page CSS is plain CSS files or <style> blocks; fonts via next/font: Playfair Display, Inter, Noto Sans Devanagari as CSS vars --font-playfair, --font-inter, --font-noto-devanagari).

## Goal
Rebuild the quote pages around ONE shareable, sourced quote card. Searchers want to USE a line (copy, WhatsApp status, Instagram bio, save image), not read an essay. Each page: answer the query on the first phone screen, cards grouped by moment, a "Which line is yours today?" picker after card 3, a "Lines Krishna never said" section, a device-aware next step (iPhone: app / Android: WhatsApp channel or /start / desktop: /start email week), short FAQ.

## Hard rules (every agent)
- Every quote shows its original Sanskrit (Devanagari) line. Gita lines carry "Krishna to Arjuna · Bhagavad Gita C.V" (or the real speaker).
- Only real verses. No modern sayings attributed to Krishna. No invented Radha lines (Radha is not in the Gita).
- Read verses through traditional Hindu commentary (Shankara, Ramanuja, Madhva, Sridhara, Madhusudana, Gita Press/Ramsukhdas); never Gandhi's readings; never change a verse's proposition.
- Copy: about what the reader feels or does, never features. NO em dashes or en dashes anywhere in user-facing copy (use commas, periods, colons). No "isn't X, it's Y" / "this is X so Y" patterns. Calm, modern, plain. Hindi: natural Hindustani as people speak and search (Devanagari), not stiff shuddh Hindi; Sanskrit words fine.
- No deity art generated in code. Cards are text-first.
- Do NOT git commit. Deleting files is not permitted on this machine (rm fails); never try to delete. Do not touch files outside your ownership list. Do not run `next build` or `next dev` (only the QA step does); use `npx tsc --noEmit -p .` from frontend/ to typecheck.

## Data contract (src/lib/quotes.ts exports these types; data lives in src/content/quotes/)
```ts
export type Locale = 'en' | 'hi'
export type L10n = { en: string; hi: string }
export type MomentId = 'karma' | 'trust' | 'hard-times' | 'peace' | 'positive-life' | 'devotion' | 'self' | 'wisdom' | 'character' | 'one-line' | 'bio' | 'students'
export type Quote = {
  id: string                 // Gita: 'bg-2-47'. Others: 'cn-1-16' (Chanakya Niti), 'sub-<slug>', 'isha-1', etc.
  source: 'gita' | 'chanakya-niti' | 'subhashita' | 'upanishad' | 'hitopadesha' | 'other'
  sourceName: L10n           // 'Bhagavad Gita 2.47' / 'भगवद गीता 2.47'
  chapter?: number; verse?: number   // Gita only (and when the source has numbering)
  speaker?: L10n             // 'Krishna to Arjuna' / 'श्रीकृष्ण, अर्जुन से'
  sanskritFull: string       // full verse, Devanagari, with । ॥
  sanskritLine: string       // the half-verse (or full if short) shown big on the card; must be an exact contiguous part of sanskritFull
  iast: string               // IAST transliteration of sanskritLine
  meaning: L10n              // 20 words max each, in the speaker's voice where natural
  context: L10n              // one sentence: when / why it was said
  forYou?: { exam: L10n; work: L10n; loss: L10n }  // "If this is you right now", one sentence each, storyteller voice, second person
  moments: MomentId[]
  rank: number               // 1 = most searched / most shared
  bioSafe?: boolean          // true if sanskritLine <= 150 characters (Instagram bio)
}
export type FakeQuote = { id: string; line: L10n; origin: L10n; realQuoteId: string; note: L10n }
export type HookFeeling = {
  id: string                 // 'worried' | 'hurt' | 'cant-decide' | 'lost' | 'starting-again' | 'let-go' | ...
  label: L10n                // chip label
  quoteId: string            // the line revealed
  lines: { en: [string, string]; hi: [string, string] }  // two short lines written for that feeling
  startSituation?: string    // id from SITUATIONS in src/lib/app.ts, passed to /start?s=
}
export type QuoteSection = { moment: MomentId; heading: string; intro?: string; quoteIds: string[] }
export type QuotePageConfig = {
  key: string                // 'krishna-quotes-en'
  path: string               // '/blogs/krishna-quotes'
  locale: Locale
  alternatePath?: string     // other-language twin
  pageName: string           // Mixpanel page name
  title: string; description: string   // <title> and meta description (description <= 155 chars)
  h1: string; promise: string          // promise = one line under H1
  breadcrumb: { label: string; href?: string }[]
  chips: { moment: MomentId; label: string; href?: string }[]   // filter in place; href = moment page if one exists
  sections: QuoteSection[]
  hook: { question: string; feelingIds: string[]; preset?: string }
  showFakes: boolean
  fakesHeading?: string
  dailyLine: { heading: string; sub: string }
  faq: { q: string; a: string }[]
  related: { href: string; label: string }[]
  extraSections?: { heading: string; paragraphs: string[] }[]   // short SEO text below the cards (keep brief)
  updated: string            // ISO date
}
```
Files:
- src/content/quotes/verses.json   : Quote[] (Gita)                 [owner: content-gita]
- src/content/quotes/hook.json     : HookFeeling[]                  [owner: content-gita]
- src/content/quotes/sayings.json  : Quote[] (non-Gita, bio/shlok)  [owner: content-sayings]
- src/content/quotes/fakes.json    : FakeQuote[]                    [owner: content-sayings]
- src/content/quotes/pages.ts      : export const QUOTE_PAGES: QuotePageConfig[]  [owner: content-pages]
- src/lib/quotes.ts                : types + getQuote(id), getQuotes(ids), quotesByMoment(m), getFakes(), getHookFeelings(ids), getPage(key), getPageByPath(path), audioFor(quote) (reuse the verse audio manifest via src/lib/gita.ts), cardImageUrl(id, {format, lang, theme})   [owner: components]

## Master Gita verse list (content-gita covers ALL; page configs pick only from these + sayings)
karma: 2.47 2.48 2.50 3.8 3.19 3.21 3.27 3.35 4.18 5.10 18.47 18.48
hard-times / self: 2.3 2.11 2.13 2.14 2.20 2.22 2.23 2.27 2.38 2.40
peace / mind: 2.56 2.62 2.63 2.66 2.70 5.21 6.5 6.6 6.17 6.19 6.26 6.34 6.35
trust / devotion: 4.7 4.8 6.40 7.19 9.22 9.26 9.27 9.29 9.31 12.13 12.14 12.15 18.62 18.65 18.66
wisdom: 4.38 4.39 5.18 7.7 10.20 11.32 15.7 18.63 18.78
character: 12.18 16.21 17.3 17.15
(63 verses; IDs 'bg-C-V'. A verse may carry several moments. 'one-line' = meaning short enough to post alone.)

## Components (src/components/quotes/, owner: components) — interfaces other agents import
- `QuoteCard` (client): `{ quote: Quote; locale: Locale; pageName: string; moment?: MomentId; variant?: 'list' | 'hero'; position?: number; audioSrc?: string | null; verseHref?: string | null }`
  Shows: Devanagari line (big), IAST (small), meaning, source chip, actions [Copy] [WhatsApp] [Save image (post/status)] [Listen if audioSrc]; tap "More" opens context + forYou (3 lines). Copy text = sanskritLine + meaning + "Bhagavad Gita 2.47" + verse URL with ?utm_source=copy&utm_medium=quote. WhatsApp uses wa.me with same text. Save image downloads /api/quote-card/<id>?format=status|post&lang=. First action of the session opens `NextStepSheet`.
- `MomentChips` (client): `{ chips: QuotePageConfig['chips']; locale; pageName }` filters sections in place (data-moment attributes) and links to moment pages.
- `LineForYou` (client): `{ feelings: HookFeeling[]; quotes: Record<string, Quote>; question: string; preset?: string; locale; pageName }` chips -> reveals the quote card + its two lines -> `NextStep`. All static, no API call.
- `NextStep` (client): `{ locale; pageName; placement: string; startSituation?: string }` device-aware: iOS -> appStoreUrl(`q_${pageName}_${placement}`) with copy "See a line from Krishna each time you pick up your phone." button "Start with this line" / Android -> NEXT_PUBLIC_WHATSAPP_CHANNEL_URL if set ("One line from Krishna each morning, on WhatsApp." [Join]) else startUrl({s, ref}) week by email / Desktop -> startUrl ("A week of lines for what you're going through, in your inbox." [Send my week]). Hindi copy from the plan doc.
- `NextStepSheet` (client): bottom sheet after first copy/share/save: "Copied. Want one every morning?" + NextStep. Once per session.
- `LineBar` (client): slim phone-only bottom bar after 30% scroll: "Find your line for today" -> scrolls to / opens LineForYou.
- `FakeQuotes` (server): `{ fakes: FakeQuote[]; quotes: Record<string, Quote>; locale; heading }`
- `QuotePage` (server): `{ config: QuotePageConfig }` renders everything incl. JSON-LD (BreadcrumbList, FAQPage, ItemList of Quotation with ImageObject per card), uses existing `Nav`/`SiteFooter` conventions via route layouts (template does NOT render Nav).
- `quotes.css` styles; mobile-first (380px). Match the site look (dark maroon + gold, see app/gita/gita.css and blogs pages) but keep cards calm and readable; Devanagari uses --font-noto-devanagari.

## Card image API (owner: card-image)
`src/app/api/quote-card/[id]/route.tsx` (edge or nodejs ImageResponse). Query: format=post (1080x1350, default) | status (1080x1920) | square (1080x1080); lang=en|hi; theme=paper|night (default paper). Reads verses.json + sayings.json. Text-first: Devanagari line large, meaning, source line, small "wisdomquotes.in" mark, subtle code-drawn motif (thin lotus/peacock-feather line art in SVG) allowed. Needs real Devanagari + Latin fonts bundled as files (no network at render). Cache-Control long. Also `Content-Disposition` inline with a filename like `krishna-quote-bhagavad-gita-2-47.png`.

## Tracking (src/lib/mixpanel.ts trackEvent; components emit)
Quote Copied {quote_id, page, moment, position, locale} · Quote Shared {channel: whatsapp|native} · Quote Image Saved {format} · Quote Audio Played · Moment Chip Tapped {moment} · Hook Feeling Picked {feeling} · Hook Line Revealed {quote_id} · Next Step Shown {platform, placement} · Next Step Tapped {platform, placement, target}. App Store links go through trackLinkClick (already logs page/location/href).

## Routes (owner: routes)
EN: /blogs/krishna-quotes (rebuild in place, same URL) · /blogs/krishna-quotes/trust · /blogs/krishna-quotes/positive-life · /blogs/krishna-quotes/hard-times · /blogs/bhagavad-gita-quotes (new) · /blogs/sanskrit-shlok-for-instagram-bio (new)
HI: /hi/blogs/krishna-quotes · /hi/blogs/krishna-quotes/trust · /hi/blogs/krishna-quotes/positive-life · /hi/blogs/bhagavad-gita-quotes  (new /hi/blogs layout with lang="hi")
Retrofit: /blogs/karma-quotes-bhagavad-gita keeps its text and headings; its quote blocks become QuoteCards; add hook + next step.
Verse pages /gita/chapter/[c]/verse/[v] and Hindi twins: when the verse is in verses.json, show QuoteCard variant="hero" at the top + "Another line" (next quote sharing a moment).
Redirect /blogs/bhagavad-gita-2-47-karmanye-vadhikaraste -> /gita/chapter/2/verse/47 (301) only after the 2.47 verse page carries the hero card.
Sitemap, blogs index card entries, hreflang alternates for EN/HI twins.

Page keys (content-pages writes one config per route above): krishna-quotes-en, krishna-quotes-hi, trust-en, trust-hi, positive-life-en, positive-life-hi, hard-times-en, gita-quotes-en, gita-quotes-hi, insta-bio-en.

## Targets per page (keyword -> page)
- sri krishna quotes in hindi 40.5K, krishna quotes hindi 22.2K, krishna status 4.4K -> krishna-quotes-hi (Hindi H1 "श्री कृष्ण के अनमोल वचन", status section of one-liners)
- krishna quotes, lord krishna quotes 33.1K each -> krishna-quotes-en
- trust krishna quotes 18.1K -> trust-en/hi (hook preset 'let-go')
- positive krishna quotes on life 14.8K -> positive-life-en/hi (situation chips: exams, work, breakup, loss, starting again)
- krishna quotes hard times / difficult time -> hard-times-en
- bhagavad gita quote(s) 49.5K IN / 3.6K US, quotes from bhagavad gita 40.5K, in hindi 22.2K -> gita-quotes-en/hi (by theme + by chapter)
- sanskrit shlok for instagram bio 5.4K -> insta-bio-en (Gita + sayings, each <=150 chars, "fits your bio" badge, grouped calm/strength/devotion/karma)
- karmanye vadhikaraste 6.6K + 4.4K -> verse page 2.47 hero
