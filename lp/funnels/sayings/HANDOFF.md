# Sayings funnel: handoff (30 Oct 2026)

Root class `.fx-sayings` (palette per `data-hub`). Card id prefixes `viv-`, `kab-`, `chk-`. Rahim (`rah-`) not built.

## Routes built (103 static pages)

| Route | Pages | What it holds |
|---|---|---|
| `/vivekananda-quotes` | 1 | Hub: 61 lines verified against Complete Works vols 1 to 8, grouped students / education / fear-and-strength / work-and-success; "Lines Swamiji lived by" (6 Gita verses he quotes, gold links to `/gita/chapter/C/verse/V`); "Did he say it?" (9 flagged lines + 35 confirmed); FAQ with 12 Jan, 11 Sep, 4 Jul; sources and method. |
| `/hi/vivekananda-quotes` | 1 | Hindi twin: same 61 English originals with our Hindi meanings, Hindi copy, links to `/hi/gita/...`. |
| `/vivekananda-quotes/[theme]` | 4 | students, education, fear-and-strength, work-and-success. Own quick answer, lines, Gita bridge subset, FAQ. `dynamicParams = false`. |
| `/vivekananda-quotes/did-he-say/[slug]` | 44 | One fact check per shared line. First sentence answers (Yes / Partly / No). Verdict stamp, shared version, real line in a card with the source drawer, "lines he did say", ClaimReview JSON-LD. |
| `/hi/kabir-ke-dohe` | 1 | Top-50 hub by theme (guru, speech and conduct, time, love and devotion, truth and show). Tap-a-word meanings, script toggle, "where this line is found" tags, FAQ with Kabir Jayanti 18 Jun 2027 and Guru Purnima 18 Jul 2027. |
| `/hi/kabir-ke-dohe/[slug]` | 50 | One per doha: hero card, Hindi + English meaning, शब्दार्थ, where found with source link, related dohe. |
| `/kabir-dohe-in-english` | 1 | English hub, same 50 dohe with English meanings (hreflang twin of the Hindi hub). |
| `/hi/chanakya-niti` | 1 | 61 verses with a chapter.verse seal (Devanagari numerals), situation picker (new job, rival, money, friend who let you down → 3 verses each), "चाणक्य ने यह नहीं कहा" (3 lines), exclusion note on verses about women. |
| `/hi/kabir-ke-dohe/class-8`, `/class-10` | 0 | **Not built.** ncert.nic.in returns robots_disallowed to WebFetch, so the textbook text could not be transcribed. Exam mode not built. |
| `/hi/rahim-ke-dohe` | 0 | **Not built** (stretch). The NCERT class 7 and 9 ordering could not be verified for the same reason. |

Every page: `generateMetadata`/`metadata` (title ≤ 60, description ≤ 155, canonical, hreflang en/en-IN/hi/hi-IN/x-default on twins, OG image = share card), `#quick-answer` paragraph of 40 to 60 words, JSON-LD (BreadcrumbList, Article with `citation`, FAQPage, ItemList of Quotation on hubs, Quotation + ClaimReview on fact checks), sources and method note, device-aware next step, `BlogTracker` page view.

## Files

- Routes: `src/app/vivekananda-quotes/{layout,page}.tsx`, `[theme]/page.tsx`, `did-he-say/[slug]/page.tsx`; `src/app/hi/vivekananda-quotes/{layout,page}.tsx`; `src/app/hi/kabir-ke-dohe/{layout,page}.tsx`, `[slug]/page.tsx`; `src/app/kabir-dohe-in-english/{layout,page}.tsx`; `src/app/hi/chanakya-niti/{layout,page}.tsx`. Each layout renders Nav, `<main>`, SiteFooter (Hindi layouts wrap in `lang="hi"`).
- Components `src/components/funnels/sayings/`: `VivHub`, `VivTheme`, `VivCheckPage`, `KabirHub`, `DohaPage`, `ChanakyaHub` (server); `VivCard`, `SourceDrawer`, `DevaCard`, `CardActions`, `FxNextStep`, `FxSheet`, `ScriptToggle`, `SituationPicker`, `FactCheckTracker` (client); `parts.tsx`, `fonts.ts` (Archivo variable width for the Vivekananda hub only; Tiro Devanagari Hindi and Sanskrit), `sayings.css`.
- Lib `src/lib/funnels/sayings/`: `shared.ts` (client-safe types, `fxTrack`), `data.ts` (server loaders), `seo.ts` (metadata + JSON-LD), `copy-viv.ts`, `copy-kabir.ts`, `copy-chanakya.ts`.
- Sitemap: `src/lib/funnelSitemaps/sayings.ts` (103 URLs, lastModified 2026-10-30, hreflang on both twin pairs).
- Content `src/content/funnels/sayings/`: `vivekananda.json`, `kabir.json`, `chanakya.json`, `cards.json` (45 cards: 20 viv, 15 kab, 10 chk).
- Generators `scripts/funnels/sayings/` (run from `frontend/`, with `PYTHONDONTWRITEBYTECODE=1`):
  - `viv_clean.py` → `~/work_sayings/viv_clean.jsonl` (drops 4,341 Bengali translations, 2,399 headings under 25 chars or without sentence punctuation, 116 duplicates; 9,239 paragraphs left).
  - `viv_match.py` (difflib matcher), `viv_factcheck.py` (44 shared lines, resumable), `viv_shared_lines.json` (the 44 lines, from Goodreads, BrainyQuote, AZQuotes, forwards).
  - `viv_picks.py` + `build_vivekananda.py` (fails if any hub line is not verbatim in the clean corpus; Gita bridge quotes verified the same way).
  - `kabir_picks.py` + `build_kabir.py`; `chanakya_picks.py` + `build_chanakya.py` (needs `pip install --user pyarrow`, already present in the VM); `translit.py`; `build_cards.py`; `build_review.py` (writes REVIEW.md); `copy_check.py` (runs the copy-audit scorer over our files and data).

## Data notes

- **Vivekananda fact check** (44 lines): 35 in his words, 5 paraphrase, 4 not found. Not found: "talk to yourself once a day", "in a day when you don't come across any problems", "take risks... lead... guide", "if the mind is intensely eager... mountains crumbled into atoms". Vol 9 was checked with the Wikisource search API (`prefix:The Complete Works of Swami Vivekananda/`, which indexes all nine volumes): zero hits for each. (WebFetch could not open Wikisource pages, so the API was queried from the device shell.)
- **Deviation from the brief's known results**: "You have to grow from the inside out" scores 98.4 against vol 5, *Sayings and Utterances* no. 20, so it is marked In his words, with the vol 2 lecture line shown. See REVIEW.md §0.
- "Arise, awake…" is verbatim (vol 3, Calcutta address), noted as adapted from Katha Upanishad 1.3.14.
- Gita bridge, each quote verified in the corpus: 2.3 (*Thoughts on the Gita*, vol 4, Bengali translation: "If one reads this one Shloka…"), 2.47 (vol 1, Karma Yoga), 2.40 (vol 3, The Sages of India), 4.7 (vol 1, Mohammed), 2.23 (vol 3, The Vedanta), 13.29 on our site's numbering (vol 3, The Sages of India: "Thus seeing the same Lord equally present everywhere").
- **Kabir**: Kavita-Kaumudi 1917 (173 lines), Granthavali via Kavitakosh (38), Kavitakosh Dohavali (888). Tags: 29 Kavita-Kaumudi, 3 Granthavali, 19 sung tradition. The misfiled Rahim doha (kkdv.241) is excluded. All 15 नारी/नारि/कामिनी lines reviewed; 2 excluded (kk.155, kkdv.517) with reasons in `kabir.json` → `womenReview`. 84 near-duplicates at 0.85 similarity (the brief's ~106 used a looser cut). Missing famous dohe were not added.
- **Chanakya**: 342 verses, 17 chapters. The parquet's English column is misaligned with the Sanskrit in chapters 6, 8 and 14, so meanings were written from the Sanskrit. 73 verses mention women (Sanskrit keywords); 33 excluded with reasons; the exclusion note cites Sternbach via P. K. Gautam (IDSA 2023). Not-said: the "opposition unites" line (Factly), "three questions" (not in the text; nearest is 4.18), and "straight trees" (half true: 7.12 says सरल, "honest" was added).

## Mixpanel events

All carry `funnel: 'sayings'`, `page: <pageKey>`, `locale`, `hub` (vivekananda | kabir | chanakya).

| Event | Props | Where |
|---|---|---|
| Source Drawer Opened | quote_id, verdict | VivCard source chip |
| Fact Check Viewed | slug, verdict | every `/did-he-say/[slug]` page view |
| Word Meaning Tapped | doha (card id), word | DevaCard glossed word (Kabir) |
| Situation Picked | situation (new-job, rival, money, friend) | Chanakya picker |
| Exam Mode Toggled | on | **not emitted** (NCERT pages not built) |
| Quote Copied / Quote Shared / Quote Image Saved | quote_id, page_name, moment (section), position, mode / channel / format, method | CardActions (same names as QuoteCard) |
| Next Step Shown / Next Step Tapped | platform, placement, target, page, page_key, ref | NextStep (viv, chanakya); KabirNextStep adds funnel and hub |
| Page Viewed, Link Clicked, scroll depth | via BlogTracker | `data-mp-location` on internal links |

Page keys: `viv-hub-en`, `viv-hub-hi`, `viv-theme-<theme>`, `viv-check-<slug>` (≤ 40), `kabir-hub-hi`, `kabir-hub-en`, `kabir-doha-<slug>` (≤ 40), `chanakya-hub-hi`.

## Next step

- Vivekananda and Chanakya: shared `NextStep` with `copy` overrides (iPhone copy promises "one Gita line each morning", nothing the app lacks).
- Kabir: own `KabirNextStep` in `FxNextStep.tsx`: WhatsApp channel on every phone, iPhone included, `/start` on desktop. Needs `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL`; without it phones also get `/start`.
- The first copy/share/save opens `FxSheet` (a copy of NextStepSheet that uses the hub's next step).

## SEO and AI

- Fact-check pages answer in their first sentence. Seasonal dates are in FAQs: 12 Jan, 11 Sep, 4 Jul (Vivekananda); Kabir Jayanti 18 Jun 2027, Guru Purnima 18 Jul 2027 (Kabir).
- `lp/funnels/sayings/llms-section.md` is ready to merge into `public/llms.txt`.
- Hindi twin pairs: `/vivekananda-quotes` ↔ `/hi/vivekananda-quotes`; `/kabir-dohe-in-english` ↔ `/hi/kabir-ke-dohe`.

## Shared changes requested

1. **Card renderer, English originals** (`src/lib/quoteCardRender.ts`): Vivekananda cards put the English line in `sanskritLine` (drawn in Tiro Devanagari Sanskrit, which has Latin) and "Complete Works, vol N" in `iast`, because an empty `iast` falls back to `toIast(sanskritLine)` and would print the line twice. Better: honour an `iast: ""` or a `script: 'latin'` flag to skip the IAST row and set the line in Playfair.
2. **NextStepSheet**: pass a `copy` prop through to NextStep, and **NextStep**: an optional `kinds` override (e.g. `{ ios: 'whatsapp' }`) so funnels need not fork them. We forked both inside our folder.
3. **Merge** `llms-section.md` into `public/llms.txt`; optionally link the hubs from the blogs index / Nav.
4. **Chanakya numbering**: `src/content/quotes/sayings.json` uses a different numbering than the corpus parquet in places (e.g. `cn-8-13` is 8.14 in the parquet). Decide one edition site-wide.
5. **Cleanup** (rm is blocked for us): `frontend/scripts/funnels/sayings/__pycache__/` can be deleted.
6. **Lint**: the repo has no ESLint config (`npx eslint` errors out), so only `tsc` was run. `npx tsc --noEmit -p .` is clean for all sayings files.

## Open issues

- NCERT class 8 and class 10 Kabir pages, exam mode, and Rahim are not built (see above).
- Not rendered in a browser (no `next build`/`next dev` per the brief). Worth a look at 360 to 412 px on: the source drawer, the Chanakya seal beside long verses, and the Archivo H1 on the Hindi Vivekananda page (falls back to Noto Sans Devanagari).
- Roman (IAST-style) transliteration of dohe is machine-made.
- All meanings and notes carry `reviewed: false`; see REVIEW.md.
