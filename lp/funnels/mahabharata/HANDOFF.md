# Mahabharata funnel: handoff (30 Oct 2026)

Root class `.fx-mahabharata`, card prefix `mbh-`, page keys `mbh-*`. Type-clean (`npx tsc --noEmit` shows no errors in my paths), ESLint clean with `next/core-web-vitals` (32 files, 0 issues), zero em or en dashes in every file I wrote. Not rendered: no `next build` or `next dev` was run, per the brief.

## Routes built (13 pages)

| Route | Page key | Holds |
|---|---|---|
| `/mahabharata/where-is-the-gita` | `mbh-where-gita` | Quick answer (CE 6.23 to 40, vulgate 25 to 42, Sanjaya to Dhritarashtra, MBh 6.23.1 = Gita 1.1); how the Bhishma Parva unfolds (the Gita told after Bhishma falls); Gita 1.1 and 18.75; all 18 chapter links and `/read-gita-in-18-days`; Arjuna asking to hear it again (MBh 14.17.6, 14.17.12); four places Gita lines recur in the epic (5.33.73 = Gita 16.21, 5.34.65, 3.32.3, 3.31.2); FAQ (6); next step; sources. Highest-fit page. |
| `/hi/mahabharata/where-is-the-gita` | `mbh-where-gita-hi` | Hindi twin of the above, Hindi Gita chapter links, hreflang both ways. |
| `/mahabharata/yaksha-prashna` | `mbh-yaksha` | 11 Q and A pairs (question verse + answer verse) from MBh 3.314, the last four questions (116 to 120), the Nakula choice (127, 131, 132, 135), Dharma revealed (3.315.6, 3.315.24), Gita bridges 2.27 and 16.21, 10-question quiz, FAQ (6). |
| `/mahabharata/quotes` | `mbh-quotes` | 25 lines in 7 themed groups, each with Sanskrit, speaker, English, ref and Copy/WhatsApp (Save image where a card exists); ItemList of Quotation in JSON-LD; FAQ (4). |
| `/mahabharata/characters/[slug]` | `mbh-char-<slug>` | karna, draupadi, vidura, kunti, bhishma, yudhishthira (`dynamicParams = false`). Each: quick answer, "Their choice" card (moment, verse, plain English), lineage strip with a link that opens the hub tree on that person, arc in 5 or 6 beats, their lines, Gita bridge, FAQ, links to the other five. Arjuna and Krishna not built. |
| `/mahabharata` | `mbh-hub` | Quick answer; "Pull a thread" family tree with Day 1 armies plus the same relations as a text list; start-here links; six characters; the 18 parvas (books 3, 5, 12, 13, 14 marked "Sanskrit here", book 6 in gold with a Gita link); a note for screen fans; FAQ (7). |
| `/mahabharata/vidura-niti` | `mbh-vidura-niti` | "Seven verses on anger" (5.33.73, 5.34.67, 5.36.5, 5.36.68, 5.37.51, 5.39.43, 5.39.73), then speech, the self, dharma, and the king's answer; Gita bridges 16.21, 2.63, 6.5, 2.14; FAQ (5); a "Lines we leave out" note listing the screened ids. |

Layouts: `src/app/mahabharata/layout.tsx` and `src/app/hi/mahabharata/layout.tsx` (Nav + SiteFooter, the Hindi one wraps in `lang="hi"`, same as `/hi/blogs`).

## Files

- Routes: `frontend/src/app/mahabharata/**`, `frontend/src/app/hi/mahabharata/**`
- Components (`frontend/src/components/funnels/mahabharata/`): `Shell` (tracker, JSON-LD, root class, crumbs, script toggle), `LineCard` + `LineActions`, `ScriptToggle`, `GitaLink`, `ChoiceCard`, `FamilyTree`, `FamilyList`, `YakshaQuiz`, `WhereIsGita` (shared EN/HI body), `Faq`, `NextBlock` (wraps the shared `NextStep` with funnel copy), `track.ts`, `fonts.ts` (Cormorant Garamond), `mbh.css`
- Lib (`frontend/src/lib/funnels/mahabharata/`): `lines.ts`, `family.ts`, `parvas.ts`, `characters.ts`, `yaksha.ts`, `whereGita.ts` (EN and HI copy), `seo.ts`, `iast.ts`
- Sitemap: `frontend/src/lib/funnelSitemaps/mahabharata.ts` (12 URLs, hreflang on the twin)
- Data: `frontend/src/content/funnels/mahabharata/lines.json` (91 lines + 33 excluded ids with reasons), `cards.json` (15 share cards)
- Scripts (`frontend/scripts/funnels/mahabharata/`): `lines_yaksha.py`, `lines_udyoga.py`, `lines_late.py` (the authored lines), `speakers.py`, `translit.py`, `build_lines.py`, `review_md.py`, `review_head.md`, `audit_mbh.py`, `dump.py`, `ganguli.py`
- Notes: `lp/funnels/mahabharata/HANDOFF.md`, `REVIEW.md`, `llms-section.md`

## Data: how it was made

1. `python3 scripts/funnels/mahabharata/build_lines.py` (from `frontend/`) reads the authored lines, checks every one against `~/mnt/sanscripts/wisdom_kb/out/verses.jsonl` (`text == "mbh"`), records the corpus reading wherever we emended (24 lines, mostly OCR repairs), generates IAST, enforces no dashes, card meanings at most 20 words and card lines inside their verse, and writes `lines.json` and `cards.json`. Every line and card carries `reviewed: false`.
2. `python3 scripts/funnels/mahabharata/review_md.py` regenerates `REVIEW.md`.
3. `python3 scripts/funnels/mahabharata/audit_mbh.py` runs the house copy-audit scorer over these files (the stock `audit.py --page` only knows registered pages). Remaining hits are in verse translations, where the verse itself says "do not X; Y".
4. Edition: chapter counts (Vana 315, Udyoga 196, Shanti 375, Anushasana 274, Ashvamedhika 118) match a southern-recension text of the Kumbhakonam type. Ganguli (Gutenberg 15474 to 15477) was used as a crib and to confirm speakers.
5. Excluded with recorded reasons: the five Anushasana ids from the brief, and 28 Vidura Niti verses screened for demeaning or confining women.

## Events (Mixpanel)

All carry `{ funnel: 'mahabharata', page: <page key>, locale }`.

| Event | Properties | Where |
|---|---|---|
| Family Node Tapped | person, source (`tree` or `panel`) | hub tree |
| Army View Toggled | on | hub tree |
| Yaksha Quiz Answered | q, correct | yaksha quiz |
| Yaksha Quiz Completed | score | yaksha quiz |
| Character Choice Opened | person | character pages, first open |
| Gita Bridge Tapped | from, to_ref | every gold link (beacon) |
| Quote Copied (reused) | quote_id (card id or line id), line_id, mode | LineActions |
| Quote Shared (reused) | quote_id, line_id, channel: whatsapp | LineActions |
| Quote Image Saved (reused) | quote_id, line_id, format: post, method: download | LineActions |

Also: Page Viewed, Scroll Depth, Section Viewed (`data-mp-section`) and Link Clicked (`data-mp-location`) through `BlogTracker`; Next Step Shown and Next Step Tapped through the shared `NextStep` (slug `q-<page key>-end`).

## SEO and AI

- Every page: `metadata` with title (60 chars or fewer including " | Wisdom"), description (155 or fewer), canonical, OG image from `/api/quote-card/<mbh card>?format=post&lang=en&theme=paper`; the Gita page pair has en, en-IN, hi, hi-IN, x-default alternates.
- JSON-LD on every page: BreadcrumbList, Article with `citation` (the text and edition), FAQPage; ItemList on the hub (parvas), quotes (Quotation items) and Vidura Niti (anger verses).
- `#quick-answer` on every page, 44 to 57 words, each with a verse reference.
- Visible refs are always "MBh B.A.V"; the Gita always "Gita C.V" or "Bhagavad Gita C.V".

## Shared changes requested

1. Merge `lp/funnels/mahabharata/llms-section.md` into `public/llms.txt`.
2. None needed for the sitemap: `src/app/sitemap.ts` already spreads `funnelSitemapEntries()`; my module returns 12 entries.
3. Optional: a Mahabharata link in the Nav or footer, and from `/read-gita-in-18-days` and Gita chapter 1 to `/mahabharata/where-is-the-gita`.
4. QuoteCard was not used for lines: the funnel brief says Devanagari or IAST through a toggle, never both on one card, and QuoteCard shows both. If you want parity, a `hideIast`-style prop on QuoteCard would let funnels use it.

## Open issues

- Not rendered or built. Check at 360 to 412 px: the family tree (wrapping rows and the thread overlay), the script toggle, and the Hindi page.
- Card images for `mbh-*` ids are untested; `mbh-3-314-119` and `mbh-5-40-12` have four short padas, and several lines use a trailing hyphen where a word breaks across padas.
- Arjuna and Krishna character pages not built. Hindi exists only for where-is-the-gita (as reserved).
- Facts and translations to confirm: see `REVIEW.md` section 1, especially item 1 (the brief's 25 to 42 is vulgate numbering, not critical edition).
