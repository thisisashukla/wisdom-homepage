# Wisdom site kit (`components/site`)

Every page and every funnel builds from this kit so the site looks, moves and measures the same everywhere.
Tune with props. Do not fork a component into a funnel folder, and do not restyle `sx-*` classes from funnel CSS.
If a page needs something the kit can't do, add a prop to the kit component (one place), not a local copy.

## Foundations
- `styles/tokens.css` (global): the only palette, type, layout and motion tokens. `--bg`, `--text*`, `--gold*`, `--border*`, `--bg-card`, `--bg-leaf`, `--sindoor` (the one secondary accent: marks only, never a background or button), `--font-display` (Playfair), `--font-ui` (Inter), `--font-deva-ui`, `--font-sa` (Tiro Sanskrit), `--font-awadhi` (Tiro Hindi), `--ease`, `--ease-out`, `--t-quick` (160ms), `--t-std` (500ms), `--t-slow` (900ms). Funnel CSS defines no hex colours except rgba tints of these.
- `styles/motion.css` + `<Motion />` (root layout): add `rv` to anything that should rise in on scroll; `data-stagger="60"` on a parent staggers its `.rv` children. No page mounts its own reveal observer. Only transform and opacity animate; reduced motion keeps fades.
- Fonts: Tiro Sanskrit and Tiro Hindi are set once on `<html>` (`lib/fonts.ts`). Use the tokens; no funnel `fonts.ts`.
- Script: `lib/script.ts` + `<ScriptToggle>`. One site-wide Devanagari / IAST setting on `<html data-script>`. Mark scripture spans `.sx-deva` / `.sx-iast`; CSS shows one. Never render both visibly. On a page whose verses are in another Indian script (the Chalisa in Telugu), `.sx-deva` holds that script and `ScriptToggle native` labels it; the setting is the same. A reader with no saved choice gets Devanagari, except on paths in `IAST_FIRST` (`lib/scriptBoot.ts`: the English Hanuman Chalisa pages), which open in English letters.
- `lib/locale.ts` (`Locale`, `localeForPath`), `lib/seo.ts` (`SITE`, `abs`, `pageMeta`, `breadcrumbLd`, `faqLd`, `ldJson`, `AUTHOR_LD`, `PUBLISHER_LD`). No funnel redefines these.
- `lib/nav.ts`: the nav, More menu, drawer and footer links. Add a page there once.
- Bottom of the screen: anything fixed to the bottom edge takes its z-index from the `--z-dock-*` scale in site.css (player, verse navigator, install card, LineBar), and only one shows at a time.
- Shared helpers, never re-written locally: `lib/gitaUrls.ts` (verse, chapter, topic, read-mode and audio URLs; `verseItemId` 'bg-2-47', `chapterItemId` 'bg-ch-2'), `lib/devanagari.ts` (normalise, speaker split, padas, `fitPada`), `lib/storage.ts` (safe localStorage JSON and change events).

## Components (import from `@/components/site`)
| Component | Use for | Key props |
|---|---|---|
| `PageHero` | Every page's hero. Fixed order: crumbs, eyebrow, H1, answer, sub, facts, actions, then the verse or visual (right column on desktop). | `crumbs`, `eyebrow`, `title`, `answer` (AnswerFirst: question, answer, source line), `sub`, `facts`, `actions` (first = primary), `verse` (VerseCard props), `visual`, `art`, `below`, `scriptToggle`, `locale`, `crumbsLd` |
| `VerseCard` | Every verse, line, doha, chaupai, shloka. Fixed order: label + script switch, original (Devanagari or IAST), meaning, source, children, actions. | `original`, `iast`, `meaning`, `source`, `sourceHref`, `label`, `lang` ('sa' / 'awa' / 'hi' / 'bra'; 'te' / 'gu' / 'kn' for Awadhi in Telugu, Gujarati or Kannada letters, which relabels the script switch), `size` ('hero' / 'default' / 'compact'), `framed`, `align`, `toggle`, `actions`, `children`, `as`, `rv` |
| `VerseList` | A list of VerseCards (`as="li"`). | `columns` 1 or 2 |
| `Section` | Every page section with the standard head. | `id`, `eyebrow`, `title`, `intro`, `tone` ('band' alternates), `width`, `track` (Section Viewed), `align` |
| `Button` / `Actions` | All CTAs. A `<button>` in a client component uses the same classes: `sx-btn sx-btn--primary` / `--link`, plus `sx-btn--sm` (44px) in tight spots. | `href`, `label`, `location`, `variant` ('primary' / 'secondary' / 'link') |
| `Facts` | Hero/section chips. | `items` |
| `Breadcrumbs` | Crumbs + BreadcrumbList JSON-LD (Home is added). Usually via PageHero. | `items`, `locale`, `ld` |
| `ShareActions` | Copy / WhatsApp / Save image / Listen / Share for any line. Six controls wrap as 3 + 3 on a phone. | `item {id,type}`, `copyText`, `shareText`, `image {url or render, fileName}`, `audioSrc`, `size`, `featured` ('status': a large WhatsApp Status button first), `extra` (one more control in the row, e.g. KeepButton) |
| `NextStep` | The device-aware next step (app / WhatsApp / email). | `placement`, `copy`, `pageKey`, `startSituation` |
| `GitaBridge` | Any link from another scripture back to a Gita verse. | `href`, `label`, `why`, `location`, `variant` ('card' / 'inline') |
| `Faq` | FAQs + FAQPage JSON-LD. | `items`, `locale`, `ld` |
| `LinkCards` | Related / up-next / hub listings, file downloads. With `img` on an item the card gets a 16:9 picture on top (the reading-plan look). `layout="rail"` scrolls sideways with snap on phones (for a row of picture cards) and is the normal grid from 700px. | `items {href,title,body,kicker,orig,img {src,alt,position},location,download,event,eventProps}`, `columns`, `layout` ('grid' / 'rail') |
| `VersePair` | A Gita verse beside a line from another tradition (Stoic, etc.), with where they meet and where they part. Stacked on phones, two columns on desktop. | `verse` (VerseCard props), `other {text, who, work, translator, href, location}`, `meet`, `part`, `title`, `id` |
| `Renderings` | One verse in several translations, each with translator, year, a note and its source. Public-domain or our own text only. | `items {who, year, lines, note, source, href, location, own}`, `label` |
| `JsonLd` | Any other schema. | `data` |
| `Figure` | A painting or photo in the flow of a page, framed like VideoFigure (rounded, hairline border, italic caption). Lazy by default; pass the -800 tile as `srcSmall`. | `src`, `alt`, `width`, `height`, `caption`, `ratio`, `position`, `srcSmall`, `priority`, `narrow` |
| `VideoFigure` | A Wisdom YouTube video in an article, framed like the blog header image. Thumbnail until play (no YouTube script before), then the youtube-nocookie player; VideoObject JSON-LD; sends Video Played. Add the video to `lib/videos.ts` (and `THEME_VIDEO` to show it on a theme plan). | `video`, `location`, `caption`, `ld`, `priority` |
| `Nav`, `SiteFooter` | From `components/`; same on every page. `Nav` takes `overlayHero` and `locale` (defaults from the URL). |

## Analytics (`lib/mixpanel.ts`, `lib/analytics/events.ts`)
- Send only registry events: `trackEvent(EVENTS.X, props)`, or `trackEventBeacon` for taps that navigate away. Names are typed; a new event goes in `EVENTS` first.
- Naming: "Object Verb", Title Case, past tense, like the original funnels ("Page Viewed", "Onboarding Step Completed"). Clicked (not Tapped), Viewed (not Shown/Seen), Selected (not Picked), Opened, Toggled (`to`), Started/Completed. Name the object, not the funnel ("Script Toggled", "Line Opened"); the funnel is a property.
- Every event gets `page`, `funnel`, `locale`, `path` automatically. Pages mount `<PageTracker pageName="Title Case Name" />` (components/BlogTracker) once; components never pass `page` or `funnel`.
- Standard props: `item_id`, `item_type`, `location`, `position`, `to`, `method`.
- The `dev_` prefix is decided in one place (`isDevTraffic` / `wireEventName`). Never prefix by hand.
- Links: `data-mp-location` on an `<a>` sends Link Clicked / App Store Button Clicked. Links that send their own event get `data-mp-tracked`.
- Renames from the funnel-specific names are listed in `RENAMED` (events.ts).
