# SEO fix rubric — wisdomquotes.in

Validates the Oct 2026 Search Console fixes. Every check is pass/fail. A release ships only when
every **Gate** check passes; **Score** checks feed the snippet-quality score.

Run the automated part:

```
node scripts/seo/check.mjs --base http://localhost:3000 --mode local
node scripts/seo/check.mjs --base https://wisdomquotes.in --mode prod
```

`local` skips host checks (A) that only make sense on the real domain.

## A. Host canonicalisation (Gate, prod only)
| ID | Check | Pass |
|---|---|---|
| A1 | `https://wisdomquotes.in{/, /hi/gita, /gita/chapter/2/verse/47, /sitemap.xml, /robots.txt}` | 200, no redirect |
| A2 | Same paths on `https://www.wisdomquotes.in` | single 301/308 to the apex URL, same path |

Why: apex 307→www while every canonical, hreflang and sitemap URL says apex = Google bounced between hosts (1,351 "alternate page" + crawl waste).

## B. Canonicals and sitemap (Gate)
| ID | Check | Pass |
|---|---|---|
| B1 | Sample pages (key pages + 40 sitemap URLs) | `<link rel=canonical>` present and equals `https://wisdomquotes.in` + its own path |
| B2 | sitemap.xml | ≥1,400 `<loc>`, all on apex, none on `www` |
| B3 | 40 random sitemap URLs fetched directly | all 200, zero redirects |
| B4 | robots.txt | `Sitemap:` line on apex |

## C. Broken internal links and retired URLs (Gate)
| ID | Check | Pass |
|---|---|---|
| C1 | Every EN + HI verse page (1,402) and both "today" pages | 0 links to a `/gita/topic/*` or `/hi/gita/topic/*` slug that has no hub page |
| C2 | Every retired tag slug (all verse tags without a hub, both locales) | one 301/308 hop → a 200 page in the same locale |
| C2b | The same retired URLs requested a second time | still 308 **with** a `Location` header (cached responses must not drop it) |
| C3 | Retired slugs that share verses with a surviving hub | redirect to a topic hub, not the generic `/gita` hub (relevance) |
| C4 | Legacy URLs `/hi`, `/support`, `/support.html`, `/blog/hare-krishna-mahamantra`, `/blogs/index.html`, `/gita/topic` | 200, or one permanent hop to a 200 |

## D. Snippets (Gate D1–D4, Score D5)
| ID | Check | Pass |
|---|---|---|
| D1 | All verse pages: rendered `<title>` ≤ 70 chars; meta description 70–160 chars (Hindi ≤ 145: Devanagari renders wider); description ends on a full sentence, not "…" | 100% |
| D2 | EN verse titles contain `Bhagavad Gita c.v` and `BG c.v`, never "Hindi" | 100% |
| D3 | HI verse title + description: ≥ 60% of letters are Devanagari | 100% |
| D4 | Rewritten blog pages: title contains the page's main query term, title ≤ 70, description 120–160 | 100% |
| D5 | Copy quality, scored 1–5 by a reviewer who did not write it, per rewritten page: (a) matches the dominant GSC query wording, (b) answers or promises a concrete payoff, (c) specific (numbers, names), (d) honest to the page body, no clickbait, (e) reads naturally | mean ≥ 4.0, no criterion < 3 |

Do not rewrite a page that already ranks top 3 with CTR ≥ 8% (e.g. `/hi/gita`).

## E. Nav app emphasis (Gate)
| ID | Check | Pass |
|---|---|---|
| E1 | Sample pages using the shared nav | exactly one desktop + one mobile `[data-nav-app]` link to `/app`, each with `data-mp-location` |
| E2 | Desktop 1280px screenshot | App link visible, visually distinct from plain nav links (filled/outlined pill + icon) |
| E3 | Mobile 390px and 360px | App link visible in the header without opening the menu; tap target ≥ 36px tall; no horizontal overflow |
| E4 | Mobile drawer | app row is first and visually primary |

## F. Build health (Gate)
| ID | Check | Pass |
|---|---|---|
| F1 | `next build` | succeeds, typecheck + lint pass |
| F2 | Key pages | 200 |
| F3 | JSON-LD on sample pages | every `application/ld+json` block parses |

## G. Outcome metrics (watch, not gate) — 28 days after deploy
- GSC "Not found (404)" falling toward < 50; "Alternate page with proper canonical" falling.
- Indexed pages up from 1.28K.
- CTR on the 8 rewritten pages vs the 28 days before (target: ≥ 2× on pages that were < 1.5%).
- Site clicks per 28 days vs 579 baseline.
