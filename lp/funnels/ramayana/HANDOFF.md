# Ramayana funnel: handoff

Built 30 Oct 2026 for the release of Ramayana: Part 1 (Thu 5 Nov) and Diwali (Sun 8 Nov).
Funnel slug `ramayana`, root class `.fx-ramayana`, card prefix `ram-`.

## Routes

| Route | What it holds | Page key (Mixpanel `page`) |
|---|---|---|
| `/ramayana` | Funnel hub: quick answer, start-here links, what Part 1 covers by kand (scene links with verdicts), 4 share cards, NextStep | `ramayana-hub` |
| `/ramayana/in-the-original` | Scene hub: quick answer with counts, lamp legend, 11 scenes in story order each with verdict chip and an interactive three-lamp row, links, 4 share cards, NextStep, FAQ (5), sources | `ramayana-in-the-original` |
| `/ramayana/in-the-original/[scene]` | 11 static pages (`dynamicParams = false`): question H1, verdict chip, 40 to 60 word quick answer with refs, three lamps (opens on the first text lamp), the whole episode in 3 lines, "what it asks of you this week", Gita bridge (8 of 11), NextStep, prev/next | `ramayana-scene-<slug>` |
| `/ramayana/after-the-film` | 7-line plan: days 1 to 4 Valmiki (2.22, 2.105, 3.66, 5.12), day 4 hands over, days 5 to 7 Gita 2.14, 6.5, 2.47 linked to their /gita pages; NextStep and a /start link | `ramayana-after-the-film` |
| `/ramayana/diwali` | The homecoming in 6 sections (Valmiki Yuddha 125 to 128, Manas Uttar 1 to 27), what it asks, Gita 2.71 bridge, 2 cards, NextStep, FAQ (3) | `ramayana-diwali` |
| `/ramayana/valmiki-vs-tulsidas` | Comparison table (14 rows, scene rows link to scene pages), what the film draws on (with press links), Gita bridge, NextStep, FAQ (5) | `ramayana-valmiki-vs-tulsidas` |
| `/hi/ramayana/in-the-original` | Hindi twin of the scene hub (Hindi verdict, Hindi quick answer and Hindi meanings for every scene); scene links go to the English scene pages | `ramayana-in-the-original-hi` |
| `/hi/ramayana/diwali` | Hindi twin of the Diwali page | `ramayana-diwali-hi` |

Scene slugs: `ahalya`, `sita-swayamvar-bow`, `kaikeyi-boons`, `kevat`, `bharat-refuses-the-throne`, `sita-into-the-fire`, `golden-deer`, `sita-words-to-lakshman`, `lakshman-rekha`, `jatayu`, `shabari`.

Not built: character pages (stretch), Hindi chaupai pages (blocked by Gita Press numbering, per brief), `/hi/ram-shalaka` (owner).

## Files created

- Routes: `src/app/ramayana/{layout,page}.tsx`, `src/app/ramayana/in-the-original/page.tsx`, `src/app/ramayana/in-the-original/[scene]/page.tsx`, `src/app/ramayana/after-the-film/page.tsx`, `src/app/ramayana/diwali/page.tsx`, `src/app/ramayana/valmiki-vs-tulsidas/page.tsx`, `src/app/hi/ramayana/layout.tsx`, `src/app/hi/ramayana/in-the-original/page.tsx`, `src/app/hi/ramayana/diwali/page.tsx`.
- Components `src/components/funnels/ramayana/`: `Shell.tsx` (palette scope, fonts, noscript rule), `ThreeLamps.tsx` (signature interaction), `Diya.tsx` (code-drawn lamp, 4 states), `LineBlock.tsx` + `ScriptToggle.tsx` + `script.ts` (one Devanagari/IAST choice per page, remembered in localStorage), `SceneLedger.tsx`, `LampLegend.tsx`, `KeepCards.tsx` (QuoteCard with Devanagari only), `PlanDays.tsx` (native `<details>`), `DiwaliPage.tsx` (EN/HI), `TrackOnView.tsx`, `Bits.tsx` (JSON-LD, crumbs, FAQ, sources notes), `copy.ts` (NextStep lines), `fonts.ts` (Cormorant Garamond, Tiro Devanagari Hindi), `lineViewClient.ts`, `ramayana.css`.
- Lib `src/lib/funnels/ramayana/`: `types.ts`, `data.ts`, `paths.ts`, `seo.ts`, `track.ts`, `hubCopy.ts`, `index.ts`.
- Sitemap: `src/lib/funnelSitemaps/ramayana.ts` (18 URLs, hreflang alternates on the two twins, lastModified 2026-10-30).
- Content `src/content/funnels/ramayana/`: `lines.json` (58), `scenes.json` (11), `plan.json` (7), `diwali.json`, `cards.json` (12), `excluded.json` (3).
- Scripts `scripts/funnels/ramayana/`: `corpus.py`, `lines_data.py`, `scenes_data.py`, `build_content.py`, `audit_copy.py`, `review_table.py`.

## Data: how it is generated

`python3 scripts/funnels/ramayana/build_content.py` (from `frontend/`) reads `~/mnt/sanscripts/wisdom_kb/out/verses.jsonl` read-only, takes the shown part of each verse from the corpus and fails if it is not a contiguous part of the corpus text, applies the four listed text fixes, generates IAST (port of `toIast`, dandas kept as `|`/`||`), computes Gita Press doha groups for Manas lines, writes the JSON above, and fails on dashes, exclamation marks, quick answers outside 40 to 62 words, meta titles over 60 and descriptions over 155 characters, and card meanings over 20 words. Gita lines in the plan come from `src/content/quotes/verses.json`.

Reference policy (details in REVIEW.md): Valmiki to the sarga; Manas with a Gita Press doha number only for Aranya, Kishkindha, Ayodhya up to 101 and Uttar up to 41, else the kand name. Every line also shows its corpus line id.

## Events (new)

All carry `{ funnel: 'ramayana', page, locale }` via `trackFunnel` in `src/lib/funnels/ramayana/track.ts`.

| Event | Extra properties | Fired by |
|---|---|---|
| Scene Lamp Tapped | `scene` (slug), `lamp` (film, valmiki, tulsidas), `state` (lit, partial, dark, unknown) | opening a lamp on the scene hub (EN/HI) or a scene page |
| Scene Viewed | `scene` | scene page mount |
| Script Toggled | `to` (devanagari, iast) | any script toggle |
| Plan Day Opened | `day` (1 to 7), `source` (vr, bg) | opening a day on /ramayana/after-the-film (load-time toggles ignored) |

Reused: Quote Copied / Quote Shared / Quote Image Saved (QuoteCard in KeepCards), Next Step Shown / Next Step Tapped (NextStep, `placement: 'end'`), Page Viewed / Link Clicked / Scroll Depth (BlogTracker; links carry `data-mp-location`).

## SEO and AI notes

- Every page: absolute title (60 max), description (155 max), canonical, hreflang (en, en-IN, hi, hi-IN, x-default on the twins; en, en-IN, x-default on English-only pages), Open Graph image from `/api/quote-card/ram-...` (scene pages use the site default).
- JSON-LD: BreadcrumbList everywhere; Article with `isBasedOn` (Valmiki Ramayana, Ramcharitmanas) and `citation`; ItemList on the hubs and the plan; FAQPage on both scene hubs, the comparison page and the Diwali twins; Quotation on scene pages.
- Each page opens with `#quick-answer` (40 to 60 words, refs inside), then the lines, then the arc, then "Sources and method".
- llms.txt section: `lp/funnels/ramayana/llms-section.md`.

## Checks run

- `npx tsc --noEmit -p .`: no errors in any file (whole project clean at the time of the run).
- ESLint with `eslint-config-next/core-web-vitals` (the repo has no ESLint config file; I passed it with `--no-eslintrc -c`): clean.
- Copy audit on all funnel files and content (`python3 scripts/funnels/ramayana/audit_copy.py --hits`, which reuses `tools/copy-audit/audit.py` scoring): 0 banned, 0 superlative, 0 clinical, 0 formula; 1 reveal hit that is two separate fields read together (day 4 meaning + day 5 title); "WhatsApp" vignette hits are the CTA. Em/en dash grep over every file I wrote: 0.
- Not checked visually: no dev server or build was allowed. Please look at a scene page and the scene hub at 360 and 412 px after the build (lamp row, panel unfold, the IAST toggle).

## Shared changes requested

1. **NextStep `funnel` property.** NextStep's Next Step Shown/Tapped events cannot carry `funnel: 'ramayana'`. Suggest an optional `funnel` prop passed into both events (or a Mixpanel super property set per route).
2. **`/start?plan=ramayana`.** /start ignores `plan`. The after-the-film page links `/start?plan=ramayana&ref=ramayana-after-the-film`; a Ramayana-first week (these four lines, then Gita by day 4) would match the page. NextStep's email kind also cannot pass `plan`.
3. **App Store campaign.** RESEARCH.md suggests `ct=ramayana-film`; NextStep builds `q-<pageKey>-end` (e.g. `q-ramayana-original-end`, `q-ram-lakshman-rekha-end`). Fine as is, or add a `campaign` override prop.
4. **public/llms.txt**: merge `llms-section.md`.
5. **Navigation**: link `/ramayana` from the Nav or the homepage/blog index for the film week.
6. **QuoteCard script toggle**: QuoteCard prints Devanagari and IAST together when `iast` is set; KeepCards passes `iast: ''` so Ramayana cards show Devanagari only. A `script` prop on QuoteCard would let cards follow the page toggle.
7. Search Console: submit the sitemap after deploy; the Diwali page needs to be live before 8 Nov.
8. `src/lib/funnels/ramayana/index.ts` started life as a tsc self-test file (deleting is not permitted here); it is now a harmless re-export barrel and can stay or go.

## Open issues

- Film lamps: 8 of 11 say "Not yet known". Update from reviews after 5 Nov (edit `scenes_data.py`, rebuild).
- Manas doha numbers for Bal, Sundar, Lanka and late Ayodhya are not shown until confirmed against a Gita Press copy.
- Hindi scene pages do not exist; the Hindi hub links to the English scene pages (the Hindi hub carries the Hindi verdict, quick answer and meanings for every lamp).
- Character pages (stretch) not built.
