# Website funnel upgrade — validation and release checks

Validated locally on 30 September 2026. Scope: `wisdom-homepage` website code. Not deployed.

## User decisions and scope

- Email subscriptions and WhatsApp are deferred. No subscriber table, sending cron, sender configuration, WhatsApp integration, or new capture endpoint was built. The existing Hindi daily-email form is no longer exposed.
- Android, Windows, Mac and other non-iOS readers get a web reading action. iPhone and iPad readers get the App Store offer. This intentionally replaces the document's email/WhatsApp branch for this iteration.
- The user confirmed some iOS reading is free and a paid plan unlocks more. CTAs say “Free to start, with a paid plan for more.” They do not promise Hindi in the app or an unverified trial length.
- The iOS application, subscriptions/prices, and its onboarding were not changed. Existing unrelated backend/search/lead-capture working-tree changes were preserved.

## Evidence used to prioritize the work

[Mixpanel device baseline, September 2–29](https://mixpanel.com/project/4010994/view/4506749/app/insights#o97DPEJFEyjL):

- 955 distinct measured visitors; 424 Android, 172 iOS, 210 Windows, 54 Mac, 37 Linux, 2 Chrome OS and 56 unknown.
- 9 distinct App Store clickers: 5 Android, 2 iOS, 1 Windows and 1 Mac. The overall clicker/visitor ratio is 0.94%; this is not an install conversion rate or a sequential funnel.
- Linux accounts for 3.9% of measured visitors in this window, so the document's historical ~60% estimate is not a current baseline. Filtering an entire OS would discard legitimate readers.

[Mixpanel page and engagement baseline, excluding Linux](https://mixpanel.com/project/4010994/view/4506749/app/insights#WGEaEVU9eVMv):

- 918 measured visitors and 9 App Store clickers; 73 people played recitation; 2 submitted the AI waitlist.
- Hindi Gita hub: 139 readers; translation guide: 137; home: 97; Krishna quotes: 77; English verse 1.1: 61; karma quotes: 55.
- No App Store clicks were recorded on the Hindi hub or translation guide. Six clickers used the app landing page. People can appear on multiple pages, so per-page counts must not be summed.
- Non-Linux is only a comparison segment, not proof that all remaining events are human.

Search Console, September 2–30 (28-day tool window): Hindi Gita 123 clicks, position 5.4; karma quotes 55, position 7.2; translation guide 51, position 7.4. The `www` app URL still had 4 clicks. These pages' metadata and reading content were protected. A fresh 14-day pre-release export is still needed for the exact E1 comparison.

The raw aggregate Mixpanel summary is in `funnel-baseline-2026-09-30.json`. Organization/business-context tools lacked their optional scope, but project, event, and analytics queries succeeded for project **4010994 — Wisdom-Homepage**.

## Implemented

- Removed AI waitlist prompts from the homepage, navigation, chapters, topics and articles. No `ScriptureAI` imports remain under `src/app`.
- Shared, localized device-aware CTA on reading pages and articles; one offer, with one repeat on the homepage and the long app landing page. Removed conflicting direct Wisdom App Store footer links.
- Added the missing English/Hindi verse CTAs after recitation and commentary. Kept audio, bookmarks, share and feedback controls.
- Saved the last chapter/verse/language in this browser and surfaced it immediately below the hero on `/`, `/gita`, and `/hi/gita`. Reading in another language updates the same saved place. Bad or blocked local storage cannot break reading.
- Added page-specific smart banners to both languages' verse/chapter/today routes; removed the fixed homepage banner.
- Added the Apple association file with team ID `3LGV26BUP7` and bundle ID `com.sansearch.wisdom`, verified against the local Xcode project. `?web=1` is excluded first to support an app web fallback.
- Added one-hop 301 canonical redirects for `www` and trailing-slash verse URLs, preserving query parameters. The association file is served as JSON.
- Added deterministic `ct`/`mt` App Store campaign tags. Optional `NEXT_PUBLIC_APP_STORE_PROVIDER_ID` supplies the real `pt` value when available. No provider ID was invented; campaign install attribution is not claimed as verified.
- Guarded analytics initialization and all tracking entry points against webdriver, HeadlessChrome and known crawler agents. Real Linux/Android browsers remain included.
- Added `os`, `page_type`, `source_path`, `locale`, `ct` and offer variant to the CTA funnel. Repeated CTA placements share one impression per page view; React effect replay does not duplicate page views.

## Validation performed

- Production build: passed; all **1,647** static pages generated. Type checking passed.
- Unit/API suite: **21 tests passed**. The five funnel tests were rerun after the final campaign fix and passed.
- Browser regression: **45 checks passed**, including 35 page/device combinations across iPhone, Android, Windows, iPad desktop mode and Mac emulation; saved reading place across English/Hindi; three verse smart banners and canonicals; association JSON; single-hop redirects.
- Analytics browser test: exactly one Page Viewed, one CTA Shown across both `/app` placements, and one App Store Button Clicked with iOS/app/campaign properties. The automated-reader test made zero Mixpanel requests. Test analytics and App Store navigation were intercepted; no production events were submitted.
- Recitation: 1.1, 2.47 and 3.1 played with active word highlighting under iPhone and Android emulation (six checks). This is Chrome emulation, not real iOS Safari.
- Visual inspection: 375px Android verse, iPhone translation guide and Hindi hub. No horizontal overflow; observed local layout shift was 0 on those three loads. CTA height remained 300px across device resolution. This is a local smoke test, not PageSpeed/mobile field-performance evidence.
- Exact metadata equality against the pre-change source for Hindi Gita, translation guide and karma quotes. Verse content files, Sanskrit rendering and the audio component are unchanged.
- `git diff --check`: passed.

## Rubric scorecard

Scores are conservative against the supplied release rubric, not an assertion that local emulation proves real-device or future production outcomes. **0 pending** means the required outcome is unverified, not that a failure has been observed. Deferred checks are excluded only because of the user's explicit scope change.

| Check | Score | Evidence or remaining validation |
| --- | --- | --- |
| A1 Gate | 1 | Correct device offers in 35 emulated combinations; real iPhone/Android/Windows checks still required. Non-iOS offer is web reading under revised scope. |
| A2 | 2 | Hindi CTA copy is Hindi; translation guide promotes daily reading without falsely claiming access to every translation; verse CTA offers the next verse. |
| A3 Gate | 2 | Verse, translation, meaning and audio precede the offer; no new popup, modal or reading obstruction; 375px layout checked. |
| A4 | 2 | One offer per tested reading page; one repeat on `/` and `/app`; no AI waitlist remains in the rendered page routes/navigation. |
| A5 | 2 | Free-to-start and paid-plan copy matches the user's confirmation; no fabricated trial duration or Hindi-app promise. |
| B1 Gate | 0 pending | Web association contract implemented. Requires iOS associated-domain entitlement, verse routing and missing-verse fallback in a TestFlight build plus a real iPhone. |
| B2 | 1 | Three exact per-verse banner URLs verified; actual Safari “Open” behavior awaits compatible app/device. |
| B3 | 2 | Hindi 1.9 restores on all three entry pages; subsequent English 2.47 correctly replaces it. |
| B4 Gate | 1 | Local `www` plus slash forms redirect in one 301 to apex/no slash; canonical tags verified. Vercel domain settings and production/Search Console still need validation. |
| C1–C5 | Deferred | Email channel explicitly excluded by the user. No delivery or signup outcome claimed. |
| D1 Gate | 1 | Bot-init guard tested; current Linux baseline below 10%. Seven-day post-release event-quality check and Search Console reconciliation still required. |
| D2 | 0 pending | `ct` and `mt` tags implemented; provider ID absent. App Store Connect campaign rows/installs have not been verified. |
| D3 | 1 | Local iOS impression→click events are correctly attributed and deduplicated; non-iOS web reading is tracked. Live nonzero funnel awaits deployment; email branch deferred. |
| E1 Gate | 0 pending | Priority SEO metadata/content preserved. Rankings 14 days after release cannot be assessed before deployment. |
| E2 | 1 | Local layout/CLS checks passed. Before/after PageSpeed and a mid-range Android device are still required. |
| E3 | 1 | Playback and highlighting passed six emulated checks. Real iPhone/Android validation remains. |

**The original release gates are not all passed.** This is a completed website-code implementation of the revised scope, ready for review, not production release approval. The document's pre-release requirement for 7/14-day post-release measurements is temporally impossible; those should be tracked as rollout checks rather than claimed in advance.

## Remaining release work

1. Review and deploy the frontend through its existing hosting workflow; ensure the Vercel canonical domain is apex and does not introduce a preceding redirect to `www`.
2. Verify production association response (200, JSON, no redirect), Apple's CDN copy, and real-device same-verse links with and without the compatible app. Verify `?web=1` fallback does not reopen the app.
3. Supply the actual App Store provider ID if campaign install reporting requires it; rebuild, then verify campaign rows in App Store Connect. Click tracking alone does not prove installs or paid conversion.
4. Run the scoped reader walks on real devices. The Hindi Android walk ends in continued web reading; there is no email delivery step in this iteration.
5. After seven days, compare bot signals and view→CTA→App Store rates by OS/page type. Compare iOS clickers against iOS visitors, separately from non-iOS continued reading. After 14 days, compare Search Console clicks and positions for the three protected pages. After four weeks, connect installs/trials/paid outcomes from the app before claiming the larger paid funnel improved.

## Reproducing local checks

From `frontend`, run `npm run build`, `npm test` (Node 22.18+ for TypeScript tests), and `npm run start -- --hostname 127.0.0.1 --port 3100`.

With Playwright available, run `node tests/browser-funnel.cjs` and `node tests/browser-analytics.cjs`. Set `PLAYWRIGHT_MODULE` to an existing Playwright installation and `CHROME_PATH` to an installed Chrome executable if needed; `TEST_BASE_URL` defaults to the local port above. These tests never require a production analytics write.

Reference contracts: [Apple associated domains](https://developer.apple.com/documentation/xcode/supporting-associated-domains), [Next.js trailing slash handling](https://nextjs.org/docs/app/api-reference/config/next-config-js/trailingSlash).


## Follow-up: make the app CTA unmistakable

The previous homepage placement was too far down, and desktop device targeting made the nav's App link the only app entry visible near the top. This was not sufficient visual prominence.

- Added a dedicated CTA inside the homepage hero, keeping one footer repeat.
- Added the Wisdom app icon and “Wisdom for iPhone & iPad” label to app offers.
- Enlarged the official Apple badge from 135×40 to 162×48, verifying its image loads.
- Kept the original device rule pending the user's preference: iPhone/iPad see the App Store badge; desktop/Android see the web-reading offer. Showing the App Store on every device would intentionally revise A1 of the supplied rubric.
- Production rebuild passed (1,647 generated pages); five funnel unit tests and all 45 browser regression checks passed again.
- Homepage-specific analytics regression passed: one page view, one impression across hero/footer, one attributed App Store click; zero automated-reader analytics requests.
- Phone/desktop hero screenshots inspected: no horizontal overflow. Observed whole-page local layout shift was 0.014 on phone and 0.003 on desktop; this is not a before/after field-performance comparison. Real-device and post-release rubric checks remain pending as listed above.

[Validated iPhone hero screenshot](qa/home-iphone-cta.png)
