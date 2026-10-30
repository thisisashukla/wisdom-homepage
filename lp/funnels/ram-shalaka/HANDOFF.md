# Ram Shalaka funnel: handoff

Funnel slug `ram-shalaka`, card prefix `rs-`, root class `.fx-ram-shalaka`. Built to match `PROTOTYPE.html` (approved) in look and behaviour. Nothing outside the owned paths was edited.

## Routes (11 pages, all static)

| Route | What it holds |
|---|---|
| `/hi/ram-shalaka` | Tool, Hindi default. Above the fold: the ritual (sankalp, dhyan hold 3.5 s, cloth hold 0.9 s, the count with gold thread and 25 slots, the answer, day done). Below: `#quick-answer` (2 sentences, 60 words), how to ask with the three traditional rules, the full grid as a real 225-cell `<table>`, all nine answers with meaning, scene and "for you" (Devanagari/IAST toggle), FAQ (6), Manas and Gita links (including `/ramayana`), sources and method. |
| `/ram-shalaka` | English twin of the same page, with English ritual copy and the IAST toggle on the answer and the nine answers. hreflang-paired with `/hi/ram-shalaka` (en, en-IN, hi, hi-IN, x-default = en, matching the site convention). |
| `/hi/ram-shalaka/[line]` ×9 | One per chaupai, slug from the opening words (`prabisi-nagar-kije-sab-kaja`, `hoihi-soi-jo-ram-rachi-rakha`, ...). Each: quick answer, the full four-line unit from the corpus with the answer half marked (IAST toggle), meaning (hi + en), scene (hi + en), "what it asks of you", traditional sign and sign note, "ask the shalaka" button back to the tool, "इस चौपाई से 7 दिन का पाठ", the Gita verse that says the same thing, NextStep, prev/next, sources. `dynamicParams = false`. |

## Files created

- `frontend/src/app/hi/ram-shalaka/{layout.tsx,page.tsx}`, `frontend/src/app/hi/ram-shalaka/[line]/page.tsx`, `frontend/src/app/ram-shalaka/{layout.tsx,page.tsx}`
- `frontend/src/components/funnels/ram-shalaka/`: `Ritual.tsx` (the only real client component), `ScriptToggle.tsx` (tiny client toggle), `ToolPage.tsx` (server, shared by both tool routes), `GridTable.tsx` (server table), `fonts.ts` (Tiro Devanagari Hindi via next/font, `--rs-tiro`, imported only by these routes), `shalaka.css` (all styles scoped under `.fx-ram-shalaka`)
- `frontend/src/lib/funnels/ram-shalaka/`: `core.ts` (client-safe: types, `sequence()`, 4 AM day key, question hash, expert keyword check, hrefs), `index.ts` (data access), `seo.ts` (metadata and JSON-LD)
- `frontend/src/lib/funnelSitemaps/ram-shalaka.ts` (implemented: 11 entries, lastModified 2026-10-30, tool pages carry hreflang alternates)
- `frontend/src/content/funnels/ram-shalaka/ram-shalaka.json` (grid, nine line records, hi/en copy) and `cards.json` (rs-1 to rs-9)
- `frontend/scripts/funnels/ram-shalaka/`: `build-data.mjs`, `check.mjs`, `extras.json`, `copy.json`, `variants.json` (output), `qa-harness.mjs`
- `lp/funnels/ram-shalaka/`: this file, `REVIEW.md`, `llms-section.md`, `qa/` (local harness, not shipped)

## Data and how it is generated

```
cd frontend
node scripts/funnels/ram-shalaka/build-data.mjs
node scripts/funnels/ram-shalaka/check.mjs
```

- `build-data.mjs` lifts ROWS and CH from `PROTOTYPE.html`, reads the four-line units for the eight corpus ids from `~/mnt/sanscripts/wisdom_kb/out/verses.jsonl` (Sanskrit/Awadhi text and IAST only; the corpus Hindi meaning, which is Gita Press/Poddar, is never read into the output), and merges `extras.json` (slugs, line-page quick answers, our meanings for the other half of each unit, Gita bridges, shortened card meanings) and `copy.json` (UI, page, FAQ copy). It fails if a card meaning exceeds 20 words.
- `check.mjs` result: **225/225 start cells yield their chaupai** under the ninth-square rule (k = p mod 9, positions m..24 then 0..m-1), plus checks on the unit answer pair, cards, `reviewed:false` and dashes.
- Every record carries `reviewed: false`. Doha numbers are not shown anywhere until the owner confirms the Gita Press refs (REVIEW.md section 1).
- One grid/corpus spelling variant (भए vs भय, #9): the pages use the grid reading. Logged in `variants.json` and REVIEW.md.

## Behaviour notes

- State in `localStorage` key `wq_shalaka_v1` = `{day, used, asked:[{h,k}], mala:[k]}`, all inside try/catch. Three diyas a day, reset at 4 AM local. Only an FNV hash of the normalised question is stored; the text never leaves component state. A repeat question shows the earlier chaupai and blocks. Private mode works without persistence.
- Sound: Web Audio bell per hop (1,320 Hz), two-note bell at the end, toggle in the top bar, off when reduced motion is on. Vibration `navigator.vibrate(6)` guarded.
- Reduced motion: dhyan hold 0.6 s, shalaka hold 0.2 s, all slots fill at once, no flicker or loops, the cloth fades without lifting.
- Keyboard: Space/Enter holds the dhyan button; Enter on the cloth places the shalaka on a random square; with the cloth lifted, arrow keys move across the 225 cells and Enter chooses. Focus moves to each new screen's heading.
- Health, legal and money note: shown under the answer when the typed question matches a small Hindi/Hinglish/English keyword list (`core.ts`).
- Share: "शेयर कार्ड" opens a sheet with `/api/quote-card/rs-<n>?format=status&lang=<hi|en>&theme=night` (canonical form, so no 308), Save image (`download=1`) and Copy. "WhatsApp पर भेजें" opens wa.me with the chaupai, meaning, source and the tool URL with UTM. The question is never included.
- Next step: NextStep with a copy override (iPhone "a line each morning", Android WhatsApp "रोज़ एक चौपाई" when `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL` is set, else /start email copy, desktop /start), plus the "इस चौपाई से 7 दिन का पाठ" button to `/start?ref=rs-<n>`. NextStep's button is restyled as a secondary (outline) button inside `.rs-next` so the plan button stays the one primary action.
- No deity art. Grid and every chaupai line in Tiro Devanagari Hindi.
- Client JS of our own code: about 9.4 KB gzipped (Ritual + core + ScriptToggle, transpiled), plus NextStep which other funnels share. Client props are about 7 KB (one locale only). The board has a fixed 1:1 aspect ratio; the panel has a 600 px min height.

## Mixpanel events

All carry `{ funnel: 'ram-shalaka', page, locale }`. `page` is `ram-shalaka` (hi tool), `ram-shalaka-en` (en tool) or `ram-shalaka-line-<n>` (line pages). The typed question is never sent.

| Event | Extra properties | Fired when |
|---|---|---|
| Shalaka Opened | lang, device (ios/android/desktop), referrer (hostname or "direct") | ritual mounts |
| Sankalp Set | typed (bool) | "प्रश्न मन में है" passes the guards |
| Diya Lit | held_ms | dhyan hold completes |
| Dhyan Abandoned | held_ms | released before 3.5 s |
| Shalaka Placed | cell (0..224), veil (bool) | the shalaka hold completes or a keyboard choice |
| Chaupai Revealed | k, sign, nth_today | answer screen shows |
| Prasang Opened | k | the "प्रसंग" tab is opened |
| Shalaka Shared | channel (card, whatsapp, save_image, copy), k | share sheet opened or an action in it |
| Plan From Chaupai | k | "इस चौपाई से 7 दिन का पाठ" (answer screen; line pages via BlogTracker data-mp-event) |
| Daily Limit Reached | | fourth question attempted in a day |
| Repeat Question Blocked | k (earlier answer) | same typed question asked again today |

Reused: Page Viewed, Link Clicked, Scroll Depth, Section Viewed (BlogTracker, `data-mp-location` and `data-mp-section` on links and sections), Next Step Shown and Next Step Tapped (NextStep). The prototype's Listen Played and WhatsApp Joined are not built: there is no recorded audio yet, and channel joins are covered by Next Step Tapped with target `whatsapp`.

## SEO and AI notes

- Titles (absolute, no suffix): "श्रीराम शलाका प्रश्नावली: चौपाई, अर्थ और प्रसंग सहित" (52 chars), "Shri Ram Shalaka Prashnavali in English, with meanings" (54), and "<line>: अर्थ और प्रसंग" for line pages (36 to 41). Descriptions 127 to 155 chars.
- Canonicals on every page. Tool pages: hreflang en, en-IN, hi, hi-IN, x-default. Line pages are Hindi only (self hi/hi-IN).
- OG images: `/api/quote-card/rs-2?format=post&lang=<locale>&theme=night` for the tools, the line's own card for line pages.
- JSON-LD: tool pages carry BreadcrumbList, Article (citation: Book "Shri Ramcharitmanas", Goswami Tulsidas, Gita Press, Gorakhpur), ItemList of the nine line pages and FAQPage. Line pages carry BreadcrumbList, Article (same citation) and Quotation.
- `#quick-answer` on every page. Internal links: tool to each line page and its Gita verse page, line pages to the tool, `/hi/gita/chapter/<c>/verse/<v>`, `/ramayana`, prev/next, `/start?ref=rs-<n>`.
- `llms-section.md` is ready to merge into `public/llms.txt`.

## Verification run

- `npx tsc --noEmit -p .`: no errors in any ram-shalaka path.
- ESLint with `eslint-config-next/core-web-vitals` (the repo has no ESLint config, so I passed one from outside the repo with `--no-eslintrc`): clean.
- Server render of all 11 pages through a TypeScript loader outside the repo: 225 `<td>` on both tool pages, no `undefined`, quick answers 44 to 60 words.
- Copy audit regexes from `tools/copy-audit/audit.py` on the rendered text and the data: 0 banned, 0 reveal, 0 superlative. The only hits are "phone"/"WhatsApp" in functional UI lines, flagged by the vignette rule. No em or en dashes in any file I wrote. (`audit.py --page ram-shalaka` itself crashes with ZeroDivisionError because funnel pages are not in its PAGES list.)
- **Not done: a run in a real browser.** I had no `next dev`, and the browser pane would not open local files. `qa/index.html` (made by `scripts/funnels/ram-shalaka/qa-harness.mjs`) runs the real Ritual on React UMD with stubbed analytics. Open it from Finder to try the flow before the build. Please check the hold gestures on a real Android phone and an iPhone: pointer capture, long-press callout and vibration.

## Shared changes requested

1. Merge `lp/funnels/ram-shalaka/llms-section.md` into `public/llms.txt`.
2. Add a card on the /hi homepage, "मन में प्रश्न है? श्रीराम शलाका से पूछिए", linking to `/hi/ram-shalaka`, as the prototype specifies. Also add links from the Manas/Ramayana hub.
3. `/start`: accept `ref=rs-<n>` and, if possible, seed the 7-day plan from that chaupai's theme (k to theme: 1 trust in prayer, 2 beginning, 3 honesty, 4 company, 5 letting go of the result, 6 good counsel, 7 obstacles, 8 dharma over strength, 9 effort and hope).
4. Confirm that `NEXT_PUBLIC_WHATSAPP_CHANNEL_URL` is set and that the channel will carry a Manas line. Otherwise soften the Android NextStep line in `copy.json`.
5. `quoteCardRender.cardFilename`: rs cards download as `sanskrit-shlok-rs-1.png`. Consider a `ramcharitmanas-chaupai-<n>.png` branch for `source: 'ramcharitmanas'`. The sheet's Save link sets its own `download` name, so this only affects direct URL saves.
6. Add an ESLint config to the repo. `npx eslint <file>` currently fails with "couldn't find a configuration file".
7. Optional: add `ram-shalaka` pages to `tools/copy-audit/audit.py` PAGES, or make it skip empty `--page` matches.

## Open issues

- Doha numbers hidden until the Gita Press refs are confirmed (REVIEW.md).
- No chaupai audio. The prototype's "Listen" button is omitted; add it when a recording or the Wisdom TTS voice exists.
- Tiro Devanagari Hindi loads the full Devanagari subset through next/font, with preload on these routes only. The prototype's `text=` subsetting (about 6 KB) is not available in next/font. If LCP suffers, self-host a subset.
- Open owner questions from the prototype are kept at their defaults: the cloth is the default (the grid can be uncovered), the reset is at 4 AM, and the English twin ships with the Hindi page.
- The mala is saved on the device only (no account sync yet).

## Redesign, 31 Oct 2026: the shalaka as a small app

The tool was rebuilt to feel like a free app rather than an explainer. Logic, storage, privacy rules and the ninth-square count are unchanged.

**Look.** The Ramnami cloth: a bhagwa field printed edge to edge with राम in kumkum, the grid on a Gita Press pothi page with a double kumkum border, Yatra One brush lettering for the ask and the verdict, Tiro Devanagari Hindi for every syllable and chaupai. When the answer arrives the cloth darkens to night and the seal glows. Tokens live at the top of `shalaka.css`; the old `--rs-*` names are aliases so the sections and line pages follow.

**Flow (three taps).**
1. Ask: big "मन में एक प्रश्न रखें", a paper slip for the question (optional, Enter submits), six one-tap example questions, "शलाका उठाएँ".
2. Pick: the grid unrolls while श्री राम जय राम जय जय राम lights word by word. "आँखें मूँदें, एक अक्षर छुएँ": tap any square, or "श्रीराम पर छोड़ें" for a random one. The dhyan hold and the cloth hold are gone.
3. The count: the chosen square stamps, the other eight classes fade, your 25 squares tint. A diya bead hops every ninth square (slow, fast, slow over about 3.5 s) with a rising bell and a light buzz; each syllable flies off the board into a tray laid out as the chaupai itself (two lines, grouped into words), so the line visibly assembles.
4. Verdict: dusk falls, the seal stamps in (शुभ gold with marigold petals, संशय pothi, अभी नहीं kumkum), then the directive (आरंभ करें), the chaupai inks in word by word, meaning, then actions.

**Sharing.** "अपना उत्तर शेयर करें" is the primary action. A 1080 × 1920 answer card is drawn on the device (`shareCard.ts`: night cloth, seal, directive, chaupai, meaning, "आप भी पूछें" + URL; the question is never drawn) about a second after the reveal, so on phones the native share sheet opens inside the tap with the image attached. Desktop and unsupported browsers get the card sheet with Save image and Copy. The server card (`/api/quote-card/rs-n`) stays as the fallback. WhatsApp text now opens with "मैंने श्रीराम शलाका से प्रश्न पूछा। उत्तर मिला: शुभ".

**Below the app.** Breadcrumbs, quick answer, the nine answers, then one FAQ accordion that also holds the method and the full grid table (still a real 225-cell table in the HTML). The h1 is the small kicker inside the app.

**Line pages.** New saffron hero with the cloth, a mini verdict seal, the full chaupai as the h1 and a primary "शलाका से प्रश्न पूछें".

**Analytics changes.** `Diya Lit` and `Dhyan Abandoned` no longer fire (no hold). `Shalaka Placed` gains `how` (touch, random, key); `veil` is always false. `Shalaka Shared` gains channel `native`.

**Copy keys added** (copy.json ui hi/en): kicker, askTitle, askSub, askBtn, askNote, chips, silentQ, pickTitle, pickRandom, countDone, verdictLead, shareInvite, shareAsk, malaCount, tomorrow. Rerun build-data.mjs after edits.

**Checked** in the desktop app's browser at 375 px and 1280 px (Hindi and English, all three seal colours, done screen, share card, a line page); tsc clean on these paths. Not checked on a real iPhone/Android: the native share with an image file, haptics, and the count's smoothness on a low-end phone.

## Sign-in gate and events, 31 Oct 2026

**Gate.** Signed-out visitors get one free shalaka per device (`localStorage` `wq_shalaka_free_v1`, counted when the syllable is touched). The next "शलाका उठाएँ" opens a gate screen in the app ("शलाका फिर उठाएँ", their typed question shown, "Google से जारी रखें"). Sign-in uses the shared `signInWithGoogle` (popup, redirect fallback) and `identify()`, then goes straight to the grid with the same question. After a redirect the visitor lands back on the ask screen, signed in (the question is not carried through the redirect, by design). Signed-in visitors keep the 3-a-day rule. On the answer screen a gated visitor's "एक और प्रश्न" reads "Google से, मुफ़्त" so the gate is not a surprise. The gate is client-side only: clearing site data gives another free try.

**Events** (all carry funnel, page, locale, signed_in; prod names without the dev_ prefix; project Wisdom-Homepage 4010994):

| Event | Extra properties |
|---|---|
| Shalaka Opened | lang, device, referrer, free_used |
| Shalaka Example Picked | label |
| Sankalp Set | typed, chip |
| Shalaka Gate Shown | typed, free_used, asked_today |
| Shalaka Gate Dismissed | |
| Shalaka Signin Started | |
| Shalaka Signin Completed | method (popup, redirect) |
| Shalaka Signin Cancelled | |
| Shalaka Signin Failed | code |
| Shalaka Placed | cell, how (touch, random, key), free_attempt |
| Chaupai Revealed | k, n, sign, nth_today, typed, free_attempt, mala_size |
| Shalaka Again Tapped | left, gated |
| Shalaka Script Toggled | to |
| Shalaka Sound Toggled | on |
| Shalaka Language Switched | to, screen |
| Shalaka Mala Opened | k, got, screen |
| Shalaka Line Opened | k |
| Shalaka Shared | channel (native, card, whatsapp, save_image, copy), k |

Profile properties on reveal (land once identified): `shalaka_asks` and `shalaka_<sign>` increments, `shalaka_first_at` (set once), `shalaka_last_at`.

Gate funnel to watch: Chaupai Revealed (free_attempt = true) → Shalaka Again Tapped → Shalaka Gate Shown → Shalaka Signin Started → Shalaka Signin Completed → Chaupai Revealed (signed_in = true).

Verified: the dev_ events arrive in Wisdom-Homepage live view. Shalaka Opened shows twice per load in dev only (React strict mode).

## Next steps, sitemap and more events, 31 Oct 2026

**CTAs (`RsNext.tsx`).** One block, two steps: the custom plan for everyone ("अपने प्रश्न पर सात दिन ठहरें", button "मेरा 7 दिन का पाठ बनाएँ · पहला हफ़्ता मुफ़्त" to `/start`), and on iPhone a row under it to the App Store (copy from `ui.next.app`). The server renders the plan; the app row appears after mount on iPhone. Placements:
- `answer`: right after share / WhatsApp / ask again, before the tabs and mala.
- `done`: the three-questions-done screen (the strongest moment: they want more and can't ask).
- `page`: below the nine answers on both tool pages.
- `line`: each line page, after the Gita link (replaces the old plan button and NextStep there).
Links: `/start?s=<situation>&ref=rs-<n>-<placement>` (ref is `rs-<placement>` when no chaupai), App Store `ct=rs-<n>-<placement>`. Example chips now carry a /start situation (job, new start, home → decision; marriage → partner; exam → didnt_work_out; journey → none), so a plan from "क्या यह रिश्ता मेरे लिए शुभ है?" opens /start on the partner situation. NextStep is no longer used by this funnel.

**New events.** Shalaka Grid Shown (typed), Shalaka Next Shown (placement, app, platform, k, n, situation), Plan From Chaupai (now also placement, ref, platform, situation), Shalaka App Tapped (placement, ref) plus the shared App Store click event. Plan funnel: Chaupai Revealed → Shalaka Next Shown (answer) → Plan From Chaupai → Onboarding Viewed (source starts with rs-).

**Sitemap and SEO.** lastModified 2026-10-31 for all 11 URLs; tool pages weekly, priority 0.9 (hi) and 0.8 (en). Article dateModified 2026-10-31. New WebApplication JSON-LD on both tool pages (free, Any OS, LifestyleApplication). llms.txt and llms-section.md describe the app flow, the free try and sign-in, and the answer card. Next 14.2 sitemaps have no image entries, so card images are not listed.
