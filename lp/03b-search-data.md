# 03b · Search and conversion data (20 Oct 2026)

Replaces the Autocomplete guesses in 03-seo.md with measured data. 03-seo.md stays as written; where they disagree, this file wins.

Sources: Google Search Console (sc-domain:wisdomquotes.in, last 90 days, read in the browser because the local GSC connector's OAuth file is missing) and Mixpanel project Wisdom-Homepage (4010994, last 90 days).

## 1. Site totals (GSC, 90 days)
- 1,040 clicks, 51.2K impressions, 2% CTR, average position 7.7.
- 1,000 distinct queries; only 83 earned a click.

## 2. Which pages earn search clicks, and what those visitors do next (90 days)

Mixpanel funnel: first page view from a search engine → event within 1 day.

| Landing page | GSC clicks | Search landers (MP) | Played audio | App Store click | Main queries (GSC) |
|---|---|---|---|---|---|
| /hi/gita | 301 | 359 | 10% | 2 | भागवत गीता के 700 श्लोक हिंदी में (53 clicks, 1,021 impr.), 700 shlok, श्लोक अर्थ सहित |
| /blogs/best-bhagavad-gita-translation | 95 (+9 www) | 138 | 8% | **3 (2.2%)** | which bhagavad gita is best to read (146 impr.), best translation (119+118), best English translation (62), which version to read |
| /blogs/karma-quotes-bhagavad-gita | 85 | 95 | 7% | 0 | sanskrit quotes on karma (231 impr.), karma quotes in sanskrit |
| /blogs/20-famous-sanskrit-shlokas | 71 | 131 | 9% | 0 | famous sanskrit shlokas, short shlokas |
| **/ (homepage)** | **68** | **88** | **19%** | **3 (3.4%)** | 700 verses of the bhagavad gita (47 impr.), today's bhagavad gita verse (32), verses in sanskrit (16) |
| /blogs/krishna-quotes | 19 | 156 | 6% | 1 | krishna quotes |
| /app | — | 9 | 22% | 4 (44%) | — |

All search landers: 1,920 people, 7% played audio, 13 clicked App Store (0.7%).

## 3. What the homepage itself ranks for
68 clicks, 1,431 impressions in 90 days. Reading intent only:
- 700 verses of the bhagavad gita / 700 slokas / bhagavad gita 700 verses
- today's bhagavad gita verse / daily bhagavad gita verses / bhagavad gita verse for today
- bhagavad gita verses in sanskrit / with chapter and verse
- **"bhagavad gita online": 2 impressions.** "read online in hindi": 2.

## 4. Problem-intent demand we actually see
Across all 1,000 queries: "bhagavad gita quotes on anxiety" 8 impressions, nothing for overthinking, grief, failure, stress or sleep. The site does not rank for problem queries yet, so no search visitor arrives with a knot named. Problem-aware visitors come from reels, Reddit and ChatGPT, not Google.

## 5. Who lands on the homepage (Mixpanel, 524 people, 90 days)
| Source | People | Share |
|---|---|---|
| Direct / no referrer | 311 | 59% |
| Internal (from other wisdomquotes pages) | 72 | 14% |
| Google | 73 | 14% |
| **ChatGPT** | **53** | **10%** |
| Bing | 23 | 4% |
| Instagram, Facebook, X | 14 | 3% |

Country: India 335 (64%), US 93 (18%), China 15, UK 13, Canada 12.
OS: Android 229, Windows 114, iOS 79 (15%), Linux 58, Mac 38.

## 6. What homepage visitors click (Mixpanel, Link Clicked, 90 days)
| Element | Clicks |
|---|---|
| Hero "Read the Gita" → 1.1 | **261** |
| Hero "Verse of the day" → /gita/today | 54 |
| Mobile nav → /app | 37 |
| Entry "Read the Gita" (lower) | 25 |
| Entry "Hindi Gita" | 21 |
| Home App Store button | 1 |

Readers who start at 1.1 keep going: 110 tapped Next on 1.1, about 30–35 are still tapping Next at 1.40.

## 7. App Store clicks are mostly dead clicks
38 people clicked an App Store button in 90 days: **Android 23, iOS 7, Mac 5, Windows 3.** 30 of the 38 came from the /app hero. About 9 were on an iPhone. iOS is 11% of search landers and 15% of homepage visitors.

## What this means for the homepage
1. **"Converting" queries, honestly:** hard conversions are too few to rank queries (13 search-attributed App Store clicks in 90 days). Using App Store click plus audio play as the signal, the query families that convert are:
   - **"Which Gita should I read / best English translation"**: best App Store rate of any content page (2.2%), English-reading, includes diaspora. This is the ICP's "never read it end to end" moment, stated as a search.
   - **"700 verses / verses in Sanskrit"** to the homepage: 19% play audio, 3.4% App Store.
   - **"Today's Gita verse"**: homepage ranks 8.5 with 32 impressions; the daily-verse habit is the product.
   - Hindi "700 श्लोक" converts to reading and audio on /hi/gita, not to the app. The ICP excludes Hindi-only readers; keep serving them through /hi/gita.
   - Karma and Sanskrit-quote blogs bring traffic but convert to nothing.
2. **The primary keyword in 03-seo.md is wrong.** Replace "bhagavad gita online" with "Bhagavad Gita 700 verses in Sanskrit with meaning" (title and H1 support) and "today's Bhagavad Gita verse" (secondary).
3. **Readers are the homepage's largest active group.** The "Read the Gita" hero link that the 19 Oct revision removed was the most-clicked element on the page (261 vs 1 App Store tap from home). Removing it risks losing the one behaviour that works.
4. **The finder has no search demand to ride yet.** Problem-first copy is right for reel, Reddit and ChatGPT arrivals (the ICP), but it has to sit beside a reader path, not replace it.
5. **The device split decides the money path.** 85–89% of visitors cannot install the app. The web plan (₹89/week) is the main offer; the App Store button shows on iPhone only.
6. **ChatGPT is a real referrer** (10% of homepage visitors). Keep llms.txt and a plain factual intro paragraph that an LLM can quote.
