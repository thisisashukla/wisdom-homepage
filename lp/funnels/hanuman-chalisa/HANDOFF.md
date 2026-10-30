# Hanuman Chalisa funnel: handoff

Funnel slug `hanuman-chalisa`, card ids `hc-*`, root class `.fx-hanuman-chalisa`. Built 30 Oct 2026. Type-clean (`npx tsc --noEmit -p . --incremental false`: no errors in these files), ESLint clean (next/core-web-vitals), copy audit index 0 on every page (run `python3 frontend/scripts/funnels/hanuman-chalisa/audit_hc.py`; the only flags are the channel names WhatsApp and email in the required next-step copy, and seven superlative false positives in translated lines such as "in the world"), zero em or en dashes in every file written. Not built or run with `next build` / `next dev`, as the brief requires: please check the routes in the lead build.

## Routes (49 URLs)

| Route | Holds |
|---|---|
| `/hanuman-chalisa` | Hub. Quick answer, Devanagari/IAST toggle, print button, the full 43-unit text with meaning on tap (`<details>`), the mala (sticky beside the text on desktop, above it on phones; the bead follows the line in view, tapping jumps to it), Gita bridge to BG 1.20, FAQ, next step, sources. |
| `/hanuman-chalisa/[line]` | 43 static pages (`generateStaticParams`, `dynamicParams = false`). Quick answer to "what does <line> mean", hero card (Awadhi with toggle, English meaning, Copy / WhatsApp / Save image for the 12 card lines), word by word, "Where this happens in the Ramayana" with the reference and its original line, other readings, a gold Gita bridge on 4 lines, previous/next, mala (links to line pages), next step. Audio slot renders only when `audio` is set. |
| `/hanuman-chalisa/learn` | Learn by heart: 11 days of 4 lines (day 11 has 3). Words fade in three steps, "I can say it" marks a line, learned beads turn tulsi green, progress in localStorage (try/catch). Works without JS as a plain day 1 list. |
| `/hanuman-chalisa/108` | Sankalp counter: 7, 11, 21, 108 or a 40-day vow (one per local day). Outer ring of 108 fills a bead per recitation, goal bead ringed in brass. Undo and new sankalp. The full text below as a read-along; inner beads follow and jump to it. |
| `/hanuman-chalisa/how-many-times` | What chaupais 38 to 40 (and 26) say, what families keep (stated as custom), Mahaviri reading of 38, FAQ. No benefit claims beyond the text. |
| `/hanuman-jayanti-2027` | Dates (Jayanti Tue 20 Apr 2027, Tamil Hanumath Jayanthi 7 Jan 2027, Kali Chaudas Sat 7 Nov 2026), 7-day family plan totalling 11 recitations (14 to 20 April), the closing doha, FAQ, Event JSON-LD. |
| `/hi/hanuman-chalisa` | Hindi twin of the hub: Hindi H1, quick answer, Hindi meanings for all 43 units, Hindi FAQ, Hindi next step. Line links go to the English line pages (labelled). |

## Files created

- Data: `frontend/src/content/funnels/hanuman-chalisa/chalisa.json` (43 units `hc.d1`, `hc.d2`, `hc.c1` to `hc.c40`, `hc.d3`; fields: awadhi, iast (sung), iastScholarly, words[], meaning {en, hi}, quick, ramayana {en, refs[]}, variants[], audio: null, learnDay, cardId, reviewed: false), `cards.json` (12 cards).
- Generator: `frontend/scripts/funnels/hanuman-chalisa/build_chalisa.py` (all text, meanings, glosses, variant notes, refs; verifies refs against the sanscripts corpus, gloss/text alignment, 40 to 60 word quick answers, card length), `translit.py` (IAST and sung IAST), `review_sheet.py` (writes REVIEW.md), `audit_hc.py` (house copy audit and dash check on these files; `audit.py` itself does not list them), `eslintrc.json` and `.eslintrc-tmp.json` (lint config used for the check; the second is a stray copy that could not be deleted, safe to remove).
- Lib: `frontend/src/lib/funnels/hanuman-chalisa/index.ts` (server: data, metadata, JSON-LD helpers, next-step copy), `shared.ts` (client-safe types, keys, storage helpers), `frontend/src/lib/funnelSitemaps/hanuman-chalisa.ts` (`entries()`: 49 URLs, hub pair with hreflang, lastModified 2026-10-30).
- Components (`frontend/src/components/funnels/hanuman-chalisa/`): `Mala.tsx`, `ScriptToggle.tsx`, `LineText.tsx`, `LineShare.tsx`, `LearnMode.tsx`, `Counter.tsx`, `Trackers.tsx` (line opened, meaning opened, print), `Blocks.tsx` (full text, FAQ, next step, sources), `fonts.ts` (Tiro Devanagari Hindi, `--hc-tiro`), `hc.css`.
- Routes: `frontend/src/app/hanuman-chalisa/{layout,page}.tsx`, `[line]/page.tsx`, `learn/page.tsx`, `108/page.tsx`, `how-many-times/page.tsx`, `frontend/src/app/hanuman-jayanti-2027/{layout,page}.tsx`, `frontend/src/app/hi/hanuman-chalisa/{layout,page}.tsx`.
- Docs: `lp/funnels/hanuman-chalisa/HANDOFF.md`, `REVIEW.md` (+ `REVIEW.head.md`, its hand-written part), `llms-section.md`, `witnesses/` (the six text witnesses used for the diff).

## Text and data

The Awadhi is the Gita Press reading, assembled from two Gita Press scans (booklet 695 and a second printing; a third, 2121, for spot checks) and diffed against Rambhadracharya's Mahaviri (mool only), Kavita Kosh and vignanam. Hindi Wikisource has no Hanuman Chalisa page (checked by API). Every variant decision is in REVIEW.md section 2; each is also shown on its line page as "Other readings". Two owner calls are flagged there: चलीसा in chaupai 39 and संकर सुवन vs शंकर स्वयं in chaupai 6. Meanings, glosses and notes are Wisdom's own; nothing from Poddar's bhavarth or Misra's English is used.

## Design

Palette under `.fx-hanuman-chalisa`: ghee #FBF3E6, soot #2A140C, sindoor #D4471F (a darker #A8361A for small text and buttons, for AA contrast), brass #B8862B (decorative; #7A5718 for text), tulsi #3F6B4A, night #160B07 via `prefers-color-scheme: dark`. Tiro Devanagari Hindi for the Awadhi and its IAST, Playfair and Inter otherwise. Wisdom gold marks Gita links as an underline and dot (gold text fails contrast on ghee). The mala is the one bold element; everything else is a single text column with brass hairlines. Print stylesheet prints the text with meanings opened.

Accessibility: beads are real links or buttons with labels, one roving tab stop (arrow keys, Home, End), `aria-current` on the current bead. Beads are 22px targets on phones; the text list on every page is the equivalent control (WCAG 2.5.8 exception). Toggle and day buttons are `aria-pressed`. Reduced motion removes transforms and animations.

## Mixpanel events

All carry `funnel: 'hanuman-chalisa'`, `page` (page name), `locale`.

| Event | Extra properties | Fired |
|---|---|---|
| Chalisa Line Opened | `line` (unit id), `via` ('page' or 'meaning') | Line page view; first open of a meaning on the hub, Hindi hub or counter page |
| Mala Bead Tapped | `line`, `mode` ('anchor', 'page', 'button') | Any bead tap |
| Script Toggled | `to` ('deva' or 'iast') | Toggle change |
| Learn Line Marked | `line`, `day` | "I can say it" |
| Learn Day Completed | `day`, `learned` (total) | Last line of a day marked |
| Counter Goal Set | `goal` ('7', '11', '21', '108', 'vow40') | Goal chosen |
| Recitation Counted | `count`, `goal` | Each counted recitation |
| Counter Goal Reached | `goal` | Count reaches the goal |
| Chalisa Sheet Printed | none | Print button |
| Quote Copied / Quote Shared / Quote Image Saved | `quote_id` (unit id), `mode` / `channel` / `format` | Line page actions (existing event names) |
| Next Step Shown / Next Step Tapped | existing NextStep props | NextStep (pageKey `hc-hub`, `hc-line-<pos>`, `hc-learn`, `hc-108`, `hc-how-many`, `hc-jayanti-2027`, `hc-hub-hi`) |

Page names for BlogTracker: `hanuman-chalisa-hub`, `hanuman-chalisa-hub-hi`, `hanuman-chalisa-line`, `hanuman-chalisa-learn`, `hanuman-chalisa-108`, `hanuman-chalisa-how-many-times`, `hanuman-jayanti-2027`. Links carry `data-mp-location`.

## Next step copy (NextStep `copy` override, `START_SITUATION = 'didnt_work_out'`)

- iPhone: "A Gita line on your Lock Screen each morning, for the days that take courage." / "Get one line each morning". No Chalisa line is promised in the app.
- Android with `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL`: "A Chalisa line and its meaning every Tuesday and Saturday, on WhatsApp." / "Join on WhatsApp". **The channel has to actually post these** (see shared changes).
- Desktop: "A 7-day courage plan from the Gita, one verse a day, by email." / "Send my 7 days" to `/start?s=didnt_work_out` (Fear of failing, the closest situation to courage before an exam or interview).
- Hindi equivalents for the Hindi hub.

## SEO and AI

- Titles 52 to 60 chars, descriptions at most 155, canonical on every page, hreflang (en, en-IN, hi, hi-IN, x-default) on the hub pair. OG images: share cards from `/api/quote-card/hc-*` for the hub, 12 card lines and Jayanti; site default otherwise.
- JSON-LD: BreadcrumbList everywhere. Hub (EN and HI): CreativeWork with `citation` (Gita Press edition, Tulsidas), ItemList of 43 line pages, FAQPage. Line pages: Quotation with `creator` Tulsidas, `citation`, `isPartOf` the work, and our English as `workTranslation`. Learn: HowTo. How-many-times: Article + FAQPage. Jayanti: Event (2027-04-20) + FAQPage.
- Every page opens with `#quick-answer` (40 to 60 words; line pages generated and checked by the build script).
- Internal links: hub to every line page, lines to hub/learn/108, prev/next, gold Gita links (BG 1.20, 4.34, 18.66, 7.19, 8.5), `/start` via NextStep.
- Sitemap: `src/lib/funnelSitemaps/hanuman-chalisa.ts`, 49 URLs. llms.txt section: `lp/funnels/hanuman-chalisa/llms-section.md`.

## Shared changes requested

1. **Nav on a light page**: the site Nav is dark; it sits above the ghee page. If you want a light Nav variant for funnel pages, that is a Nav change.
2. **NextStepSheet copy**: `NextStepSheet` has no `copy` prop, so line-page Copy/WhatsApp show a toast instead of the sheet (the sheet would promise Krishna lines). Adding a `copy` passthrough to NextStepSheet would let funnels use it.
3. **WhatsApp channel content**: the Android next step promises a Chalisa line every Tuesday and Saturday. Someone needs to schedule those posts (the 43 meanings are ready in chalisa.json), or change the line in `NEXT_COPY` in `src/lib/funnels/hanuman-chalisa/index.ts`.
4. **llms.txt**: merge `llms-section.md`.
5. **Copy audit**: `tools/copy-audit/audit.py` does not list funnel pages; `scripts/funnels/hanuman-chalisa/audit_hc.py` runs it on ours. Consider adding funnel globs to `PAGES`.
6. Remove `frontend/scripts/funnels/hanuman-chalisa/.eslintrc-tmp.json` (stray lint config; deletes are blocked for agents).

## Open issues

- Not rendered in a browser (no dev server allowed). Check in the lead build: the mala geometry at 360 and 412 px, the sticky aside on desktop, the print output, and dark mode.
- The card API renders `sanskritLine` with Tiro Devanagari Sanskrit; the Awadhi has no Sanskrit-only conjuncts, but check the 12 card images once.
- Audio: none shipped. Add a URL to a unit's `audio` field (via the build script) and the line page shows a player.
- Ramayana numbering follows the corpus, which can differ from the Gita Press Manas by a doha (REVIEW.md section 5).
- The learn page and counter are English only; the Hindi hub links to them labelled "(अंग्रेज़ी में)".
