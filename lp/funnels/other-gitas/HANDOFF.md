# other-gitas funnel: handoff (30 Oct 2026)

Funnel slug `other-gitas`, card prefix `ag-`, root class `.fx-other-gitas`. Look: "Sakshi" (light ash page, ink,
sky Sanskrit, mist hairlines, one gold-hair rule per page, night in dark mode, EB Garamond for English verse).
Signature interaction: "Hold to be still". No Hindi twins were built.

## Routes built

| Route | Holds | Index |
|---|---|---|
| `/ashtavakra-gita` | Quick answer, 1.11 with script toggle, what the text is, where to start (4 verses), 6 famous lines, the 20 chapters, link to the Gita and comparison, FAQ (7), NextStep, sources | yes |
| `/ashtavakra-gita/chapter/[chapter]` (20) | Quick answer, gold rule, script toggle, every verse (Sanskrit + English, link to verse page), prev/next chapter, NextStep | yes, all 20 |
| `/ashtavakra-gita/chapter/[chapter]/verse/[verse]` (298) | Quick answer, toggle, the verse inside "Hold to be still", then (40 showcase) what to notice, word by word, 160 to 180 words of commentary, Gita bridge where real; chapter gist, prev/next, NextStep, sources | 40 indexed; 258 `robots: noindex, follow` and out of the sitemap until their notes exist |
| `/ashtavakra-gita/quotes` | 20 QuoteCards (Devanagari only on the card, link to verse), NextStep | yes |
| `/ashtavakra-gita-vs-bhagavad-gita` | Quick answer, 1.11 with its BG 17.3 echo, comparison table (8 rows, stacks on phones), who should start where, 6 shared threads with Gita links, FAQ (5), NextStep | yes |
| `/ashtavakra-gita/seven-mornings` | 7 days as `<details>` (verse, one practice), after-day-7 note, NextStep and a /start link | yes |
| `/gitas` | "Gitas beyond the Bhagavad Gita": 21 entries (BG, AG and 19 more, the five Mahamandal texts grouped and marked modern) with source, speakers, size, gist | yes |

Indexed verse pages (40): 1.1 to 1.20, 2.1, 2.10, 2.25, 6.2, 7.1, 8.1, 8.4, 9.6, 11.5, 15.4, 15.7, 15.8, 15.11,
15.14, 16.11, 17.3, 18.1, 18.35, 18.59, 18.100. This covers the GSC verse-number queries (17.3, 9.6, 18.35, which
now say on-page that people often land on the Bhagavad Gita verse of the same number).

## Files created (all inside the ownership list)

- `frontend/src/app/ashtavakra-gita/page.tsx`, `chapter/[chapter]/page.tsx`, `chapter/[chapter]/verse/[verse]/page.tsx`, `quotes/page.tsx`, `seven-mornings/page.tsx`
- `frontend/src/app/ashtavakra-gita-vs-bhagavad-gita/page.tsx`, `frontend/src/app/gitas/page.tsx`
- `frontend/src/components/funnels/other-gitas/`: `FxFrame.tsx` (Nav, footer, BlogTracker, FxEvents, fonts, CSS), `FxEvents.tsx`, `HoldStill.tsx`, `ScriptToggle.tsx`, `VerseLines.tsx`, `BridgeLink.tsx`, `NextBand.tsx`, `fonts.ts` (EB Garamond), `sakshi.css`
- `frontend/src/lib/funnels/other-gitas/`: `data.ts` (server only, imports the JSON), `content.ts` (copy, FAQs, plan, NextStep copy), `gitas.ts`, `seo.ts`
- `frontend/src/lib/funnelSitemaps/other-gitas.ts` (implemented: 5 hubs + 20 chapters + 40 verses = 65 URLs)
- `frontend/src/content/funnels/other-gitas/ashtavakra.json` (20 chapters, 298 verses), `cards.json` (20 cards)
- `frontend/scripts/funnels/other-gitas/`: `build.py`, `translit.py`, `chapters.py`, `en_1.py`, `en_2.py`, `en_3.py`, `show_1.py`, `show_2.py`, `cards_data.py`, `make_review.py`, `check_copy.py`
- `lp/funnels/other-gitas/HANDOFF.md`, `REVIEW.md`, `llms-section.md`

## Data: how it was made

- Sanskrit: the corpus (`sanscripts/wisdom_kb/out/verses.jsonl`, text `ashtavakra`), 11 typing errors fixed in `build.py` (listed in REVIEW.md), zero-width joiners removed.
- IAST: generated from the Devanagari by `translit.py`.
- English: all 298 verses re-translated from the Sanskrit in our own words (`en_*.py`). The corpus English (LLM drafts) and the corpus Hindi (licence unknown) are not used or published.
- Speakers: set per chapter from the `uvāca` markers (the corpus field was wrong). Chapter 4 differs between editions; see REVIEW.md.
- Notes for 40 verses (`show_*.py`): one-sentence "what to notice", 8 to 14 word meanings, 161 to 180 words of commentary, optional Gita bridge (`same` or `contrast`). Everything `reviewed: false`.
- Rebuild: from `frontend/`, `python3 scripts/funnels/other-gitas/build.py`. Copy check: from the repo root, `python3 frontend/scripts/funnels/other-gitas/check_copy.py` (house audit regexes + dashes + reveal patterns; currently 0 hits). The house `audit.py --page` does not know these routes, so `check_copy.py` imports its regexes.
- To index more verse pages: add an entry to `show_2.py` (notice, at least 4 words, commentary). `isIndexable()` and the sitemap pick it up automatically.

## Hold to be still

`HoldStill.tsx` wraps the verse on verse pages. Touch or mouse press for 350ms, a 3s mouse hover, or holding the
space bar while the verse is fully in view (and nothing else focused) adds `.fx-still` to the root: nav, footer,
notes and CTAs (`[data-fx-fade]`) fade to 5% over 2s; the gold-hair rule pulses (3.6s). Moving more than 12px before
it starts cancels (scrolling). Escape ends it. On release the device-specific NextStep (placement `hold`) appears
under the verse. Reduced motion: opacity only, no pulse. Without JS the verse is plain text.

## Mixpanel events (all carry funnel: 'other-gitas', page: <pageKey>, locale: 'en')

| Event | Extra properties | Where |
|---|---|---|
| Hold Still Started | verse | verse pages |
| Hold Still Completed | verse, held_ms | verse pages |
| Script Toggled | to ('deva' or 'iast') | every page with the toggle |
| Verse Nav Clicked | direction ('prev' or 'next'), from, to | verse pages (verses), chapter pages (chapters) |
| Plan Day Opened | day | seven-mornings |
| Gita Bridge Tapped | from (AG ref), to_ref (BG ref) | verse pages, comparison page |

Reused: Page Viewed, Link Clicked, Scroll Depth, Section Viewed (BlogTracker), Quote Copied / Shared / Image Saved
(QuoteCard on /quotes), Next Step Shown / Tapped (NextStep, placements `end` and `hold`). Page keys: `ag-hub`,
`ag-ch-<n>`, `ag-v-<c>-<v>`, `ag-quotes`, `ag-vs-bg`, `ag-seven-mornings`, `gitas-hub`.

## SEO / AI notes

- Every page: title at most 60 chars (absolute, no site suffix), description at most 155, canonical, en/en-IN/x-default alternates, OG image (share card `ag-1-11` on the hub and quotes page, the verse's own card on its page where one exists, else the site default), `#quick-answer` paragraph of 40 to 65 words, Sources and method note.
- JSON-LD: BreadcrumbList everywhere; Article with `citation` (Ashtavakra Gita CreativeWork); FAQPage on hub and comparison; ItemList on hub (chapters), quotes (Quotation items with card images), seven-mornings, /gitas; Quotation on every verse page.
- Verse titles: "Ashtavakra Gita 1.11: muktābhimānī mukto hi meaning".
- Hub and comparison FAQs answer chapters, verse count, the dating range, the speakers, and "is it part of the Mahabharata" (no; the sage's story is in the Vana Parva).

## Shared changes requested (lead)

1. **Link the comparison page from the translation blog.** In `src/app/blogs/best-bhagavad-gita-translation/page.tsx`, wherever it discusses the Ashtavakra Gita, add a link to `/ashtavakra-gita-vs-bhagavad-gita` (anchor e.g. "how the Ashtavakra Gita differs from the Bhagavad Gita") and one to `/ashtavakra-gita`. It already ranks at positions 2 to 4 for the comparison queries.
2. **Merge `lp/funnels/other-gitas/llms-section.md` into `public/llms.txt`.**
3. **Sitemap:** nothing to do if `funnelSitemapEntries()` is already wired into `sitemap.ts`.
4. **Bhagavad Gita verse pages 17.3, 9.6 and 18.35** get Ashtavakra verse-number queries. Optional: a one-line "Looking for Ashtavakra Gita 17.3?" link on those three BG pages to `/ashtavakra-gita/chapter/17/verse/3` (and 9/6, 18/35).
5. Optional: link `/gitas` and `/ashtavakra-gita` from the blogs index or footer.

## Open issues

- 258 verse pages are noindex until their notes are written (priority order: 15.x, 18.x, 2.x).
- Owner review of REVIEW.md section A before the disclosure line changes to "human-reviewed".
- Lint: the repo has no ESLint config; I ran `eslint-config-next/core-web-vitals` from a temp config outside the repo, 0 issues. `tsc`: 0 errors in these paths (one unrelated error exists in `components/funnels/mahabharata/LineActions.tsx`).
- Not built: Hindi twins. The pages were not rendered (no next build/dev per the brief); please look at `/ashtavakra-gita/chapter/1/verse/11` on a phone in the lead build, especially the hold on iOS Safari (long-press callout is suppressed only while holding).
- EB Garamond is loaded via next/font on these routes only.
