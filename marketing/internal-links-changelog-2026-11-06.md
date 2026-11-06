# Internal links changelog — 2026-11-06

26 contextual internal links added across 16 blog posts in `frontend/src/app/blogs/`. Anchors are existing text only; no sentences rewritten. Targets chosen from GSC page×query data, 2026-08-06 to 2026-11-05.

Every link uses the existing inline style plus `data-mp-location="internal_link_<target>"` (`2_47`, `gita_structure`, `best_translation`, `chapter_18`, `nishkama_karma`), so clicks can be tracked in Mixpanel.

## Revert

All changes (from repo root):

```
git apply -R marketing/internal-links-2026-11-06.patch
```

A single link: open the file at the line below and replace the `<a …>anchor</a>` with the plain anchor text.

## Changes

| # | File | Line | Anchor | Target | Target query (pos) |
|---|---|---|---|---|---|
| 1 | `ahankara-meaning-bhagavad-gita/page.tsx` | 566 | Chapter 18 | `/blogs/bhagwat-geeta-chapter-18` | bhagavad gita chapter 18 shlokas with meaning (7.7) |
| 2 | `ahankara-meaning-bhagavad-gita/page.tsx` | 660 | Nishkama karma | `/blogs/nishkama-karma-bhagavad-gita` | nishkama karma (10.5) |
| 3 | `best-bhagavad-gita-translation/page.tsx` | 676 | nishkama karma | `/blogs/nishkama-karma-bhagavad-gita` | nishkama karma (10.5) |
| 4 | `bhagavad-gita-complete-structure-all-chapters/page.tsx` | 664 | 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 5 | `bhagavad-gita-complete-structure-all-chapters/page.tsx` | 765 | Chapter 18 | `/blogs/bhagwat-geeta-chapter-18` | bhagavad gita chapter 18 shlokas with meaning (7.7) |
| 6 | `bhagavad-gita-for-beginners/page.tsx` | 558 | 18 chapters | `/blogs/bhagavad-gita-complete-structure-all-chapters` | how many parts are there in bhagavad gita (9.2) |
| 7 | `bhagavad-gita-for-beginners/page.tsx` | 584 | Verse 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 8 | `bhagavad-gita-for-beginners/page.tsx` | 589 | English translations of the Gita | `/blogs/best-bhagavad-gita-translation` | which bhagavad gita is best to read (8.1) |
| 9 | `bhagavad-gita-for-students/page.tsx` | 731 | BG 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 10 | `bhagavad-gita-for-students/page.tsx` | 761 | nishkama karma | `/blogs/nishkama-karma-bhagavad-gita` | nishkama karma (10.5) |
| 11 | `bhagavad-gita-karma-meaning/page.tsx` | 718 | verse 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 12 | `bhagavad-gita-on-anxiety/page.tsx` | 769 | BG 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 13 | `bhagavad-gita-quotes-sanskrit/page.tsx` | 917 | BG 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 14 | `bhagavad-gita-vs-stoicism/page.tsx` | 795 | BG 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 15 | `bhagwat-geeta-chapter-1/page.tsx` | 1399 | 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 16 | `bhagwat-geeta-chapter-2/page.tsx` | 1447 | karmany evadhikaras te ma phaleshu kadachana | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 17 | `bhagwat-geeta-saar/page.tsx` | 570 | 18 chapters | `/blogs/bhagavad-gita-complete-structure-all-chapters` | how many parts are there in bhagavad gita (9.2) |
| 18 | `bhagwat-geeta-saar/page.tsx` | 600 | BG 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 19 | `bhagwat-geeta-saar/page.tsx` | 627 | Chapter 18 | `/blogs/bhagwat-geeta-chapter-18` | bhagavad gita chapter 18 shlokas with meaning (7.7) |
| 20 | `dharma-meaning-bhagavad-gita/page.tsx` | 649 | Chapter 18 | `/blogs/bhagwat-geeta-chapter-18` | bhagavad gita chapter 18 shlokas with meaning (7.7) |
| 21 | `dharma-meaning-bhagavad-gita/page.tsx` | 714 | 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 22 | `karma-quotes-bhagavad-gita/page.tsx` | 554 | Bhagavad Gita 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 23 | `krishna-three-paths-bhagavad-gita/page.tsx` | 1167 | nishkama karma | `/blogs/nishkama-karma-bhagavad-gita` | nishkama karma (10.5) |
| 24 | `krishna-three-paths-bhagavad-gita/page.tsx` | 1190 | 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 25 | `nishkama-karma-bhagavad-gita/page.tsx` | 695 | BG 2.47 | `/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste` | karmanye vadhikaraste meaning in english (7.9) |
| 26 | `nishkama-karma-bhagavad-gita/page.tsx` | 703 | Chapter 18 | `/blogs/bhagwat-geeta-chapter-18` | bhagavad gita chapter 18 shlokas with meaning (7.7) |

## Not linked (by design)

- 2.47 post: "nishkama karma" sits inside a quoted misreading.
- Stoicism post: "Gita translations" refers to the post's own source notes.
- Chapter 2: "longest chapter in the Gita's first half" is not Chapter 18.
- No natural unlinked mentions of karma-quotes, krishna-quotes, 20-famous-sanskrit-shlokas, bhagavad-gita-quotes-sanskrit anchors exist in other posts.
