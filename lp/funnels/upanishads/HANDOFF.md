# Upanishads funnel: handoff (30 Oct 2026)

Funnel `upanishads`, card prefix `up-`, root class `.fx-upanishads`, look "Aranya" (forest dawn, light by default, dusk in dark mode). 20 pages built; Mundaka and Kena stretch pages not built.

## Routes
| Route | Holds |
|---|---|
| `/upanishads` | Hub: what they are, the word, 108 and the 10 principal (table with Veda, length, link), which first, 10 famous lines, mahavakyas, Gita Dhyanam "cows" verse + Katha/Gita 2.19 to 2.20 bridges, plan CTA, NextStep, FAQ. ItemList + FAQPage + Article. |
| `/hi/upanishad` | Hindi hub: upanishad kya hai, kitne hain, 10 मुख्य उपनिषद table, Hindi lines, Gita bridge, FAQ. Twin of `/upanishads`. |
| `/upanishads/[line]` (10) | tat-tvam-asi, satyameva-jayate, asato-ma-sadgamaya, uttishthata-jagrata, ishavasyam-idam-sarvam, aham-brahmasmi, purnamadah-purnamidam, sahana-vavatu, matru-devo-bhava, bhidyate-hridaya-granthih. Quick answer, hero line (toggle), English, whole passage, who said it, Shankara then others, "Writing it out" (Devanagari forms for tattoo/calligraphy), print card preview + links to `/api/quote-card/up-...?format=post|status`, QuoteCard (copy/WhatsApp/save), Gita bridge, NextStep, related, FAQ, sources. `dynamicParams = false`. Article + Quotation + FAQPage. |
| `/hi/upanishads/[line]` (2) | satyameva-jayate, asato-ma-sadgamaya in Hindi (our own Hindi). hreflang twins. |
| `/upanishads/which-to-read-first` | Reading order, how to read, translations to buy (Gambhirananda, Nikhilananda, Easwaran, Olivelle, Gita Press; Paramananda free), plan CTA. |
| `/upanishads/isha` | Complete: invocation + 18 verses, anchors `#invocation`, `#v1`..`#v18`, Shankara notes, Gita bridges. |
| `/upanishads/mandukya` | Complete: 12 verses, anchors `#v1`..`#v12`, "neti, neti" interaction after verse 7. |
| `/upanishads/katha` | Complete: invocation + 119 verses in 11 Sit closer exchanges, anchors `#v1-1-1` style, acharya differences (1.2.20, 1.2.23, 1.3.14), bridges to BG 2.20, 2.19, 8.11, 15.1, link to the atman blog. |
| `/upanishads/mahavakyas` | The four, with Upanishad, Veda, kind, note, anchors. |
| `/upanishads/who-am-i` | 7 days in `<details>` (Kena 1.1, Mundaka 3.1.1, Katha 1.2.18, Isha 6, Mandukya 2, Chandogya 6.8.7, BU 1.4.10), each with Sanskrit, English, one thing to notice; ends with NextStep and /start. Order changed from the brief's list so it moves from the question (Kena) to the answer (BU); all refs verified in `passages.json`. |

## Files created
- `frontend/src/app/upanishads/**`, `frontend/src/app/hi/upanishad/**`, `frontend/src/app/hi/upanishads/**` (layouts add Nav + SiteFooter; Hindi layouts set `lang="hi"`).
- `frontend/src/components/funnels/upanishads/`: `Shell.tsx` (root, BlogTracker, crumbs, JSON-LD, GitaBridge, Faq, SourcesNote, UpNext), `LinePage.tsx`, `Sanskrit.tsx`, `VerseBlock.tsx`, `SitCloser.tsx`, `NetiNeti.tsx`, `ScriptToggle.tsx`, `PrintCard.tsx`, `PlanTracker.tsx`, `track.ts`, `fonts.ts` (Spectral), `aranya.css`.
- `frontend/src/lib/funnels/upanishads.ts` (types, data access, `upMeta`, JSON-LD helpers), `frontend/src/lib/funnelSitemaps/upanishads.ts` (20 entries, hreflang for the 3 twin pairs, lastModified 2026-10-30).
- `frontend/src/content/funnels/upanishads/`: generated `texts/{isha,mandukya,katha}.json`, `passages.json`, `cards.json` (12); hand-written `lines.ts`, `plan.ts`, `mahavakyas.ts`, `katha-exchanges.ts`, `principal.ts`.
- `frontend/scripts/funnels/upanishads/`: `make_fixes.py` (one-time edition reconciliation), `build.py` (corpus + fixes + imports + English to content), `check.py`, `translit.py`, `src/` (fixes.json, imports.json, imports_kena.json, en_isha/mandukya/katha.json, cards_spec.json).
- `lp/funnels/upanishads/`: HANDOFF.md, REVIEW.md, llms-section.md. `qa-preview/` holds three static render snapshots used for a screenshot check; delete them.

## Data: how it was generated
1. `python3 -I scripts/funnels/upanishads/make_fixes.py <editions_dir> $HOME/mnt/sanscripts/data/raw_json` (editions = text dumps of sanskritdocuments.org iisha, kena, maandu, katha, mundaka, tait pages, fetched 30 Oct, not committed).
2. `python3 -I scripts/funnels/upanishads/build.py` then `python3 -I scripts/funnels/upanishads/check.py` (lines in passages, plan and mahavakya refs, every Katha verse in exactly one exchange, no dashes).
- Corpus never edited. Corpus Hindi never used. English is ours (Sanskrit + Shankara via Sitarama Sastri; Paramananda for tone). No Gambhirananda/Nikhilananda/Easwaran/Olivelle/Muller/Hume text used.
- Main fixes: Isha 12 was a duplicate of 9; Katha 1.1.4 to 1.2.11 OCR-damaged (1.2.9 was a paraphrase); 19 Mundaka fixes; prose records merged; Kena, shanti mantras and Taittiriya 2.1.1 opening imported. Details in REVIEW.md section 4.

## Events (all carry funnel: 'upanishads', page, locale)
| Event | Properties | Where |
|---|---|---|
| Sit Closer Tapped | text, exchange (1 to 11), exchange_id | Katha |
| Sit Closer Read All | text, heard | Katha ("Read the whole text straight through") |
| Neti Step Tapped | step, of | Mandukya 7 |
| Script Toggled | to (deva/iast) | every page with the toggle |
| Plan Day Opened | day | who-am-i |
| Print Card Opened | line, format | line pages |
Plus reused: Quote Copied / Shared / Image Saved (QuoteCard), Next Step Shown / Tapped (NextStep; carries page, not funnel), Link Clicked via `data-mp-location`, page views and Section Viewed via BlogTracker.

## SEO / AI
- Every page: `upMeta` (absolute title, at most 60 chars; description at most 155; canonical; hreflang en, en-IN, hi, hi-IN, x-default for twins; OG image = the page's share card or the site default), BreadcrumbList, Article with `citation`, FAQPage where there is an FAQ, ItemList on hub/mahavakyas/plan, Quotation on line pages. `p#quick-answer` of 45 to 59 words on every page.
- Gita bridges (gold thread): Katha 1.2.18 to 19 / BG 2.20, 2.19; Gita Dhyanam verse 4 on the hub; plus 15.1, 8.11, 5.10, 6.29, 13.2 and others per line.
- `llms-section.md` ready to merge into `public/llms.txt`.

## Design notes
- Tokens as specified, plus `--ash-ink #625d55` and `--sal-ink #44603f` for small text and link text, because ash (#8C877D) and sal (#5E7A5A) on bark fall under 4.5:1. The original tones stay for rules and the thread. Spectral (headings, English verse), Tiro Devanagari Sanskrit (verses), Inter (UI).
- Script toggle hides one script with CSS (`data-script` on the root); server render is Devanagari, so pages read without JS. The QuoteCard shows only one of its Devanagari/IAST lines accordingly.
- Sit closer and neti neti render everything on the server; hiding starts only after mount. Reduced motion: opacity only.

## Checks run
- `npx tsc --noEmit -p .`: no errors in funnel paths.
- ESLint with `eslint-config-next/core-web-vitals` (the repo has no eslint config; run with a temporary config): clean.
- Server render of all 20 pages with react-dom/server (TS transpiled, next/font stubbed): all render; titles and descriptions within limits. Screenshot at 390px: no horizontal scroll.
- copy-audit scoring on funnel files (see REVIEW.md section 6); dash grep: zero.

## Shared changes requested
1. `src/app/sitemap.ts` already calls `funnelSitemapEntries()`; confirm the `alternates` field passes through.
2. Merge `lp/funnels/upanishads/llms-section.md` into `public/llms.txt`.
3. `/start` support for `?plan=who-am-i` (research wants the desktop CTA to start this plan); today the plan page links `/start?ref=upanishads-who-am-i` and NextStep sends desktop to the Gita week.
4. Nav or `/reading-plans`: a link to `/upanishads` and `/upanishads/who-am-i`.
5. App Store campaign token: NextStep uses `q-<pagekey>-<placement>`; the research asked for an `upanishads` token. Fine as is if campaigns are grouped by prefix.
6. Optional: allow `funnel` on Next Step events (NextStep.tsx) so funnel reporting does not depend on page-name prefixes (`upanishads-`).

## Open issues
- Mundaka and Kena complete pages (stretch) not built; Kena data is imported and ready (`imports_kena.json`), Mundaka reconciled.
- Chandogya 6 Sit closer not built.
- All translations unreviewed; see REVIEW.md. A Sanskrit reviewer pass on the showcase lines is the gating step before promotion.
- Print card images not checked visually here (no build); check the 12 cards render after the lead's build.
