# Wisdom site kit (`components/site`)

Every page and every funnel builds from this kit so the site looks, moves and measures the same everywhere.
Tune with props. Do not fork a component into a funnel folder, and do not restyle `sx-*` classes from funnel CSS.
If a page needs something the kit can't do, add a prop to the kit component (one place), not a local copy.

## Foundations
- `styles/tokens.css` (global): the only palette, type, layout and motion tokens. `--bg`, `--text*`, `--gold*`, `--border*`, `--bg-card`, `--bg-leaf`, `--sindoor` (the one secondary accent: marks only, never a background or button), `--font-display` (Playfair), `--font-ui` (Inter), `--font-deva-ui`, `--font-sa` (Tiro Sanskrit), `--font-awadhi` (Tiro Hindi), `--ease`, `--ease-out`, `--t-quick` (160ms), `--t-std` (500ms), `--t-slow` (900ms). Funnel CSS defines no hex colours except rgba tints of these.
- `styles/motion.css` + `<Motion />` (root layout): add `rv` to anything that should rise in on scroll; `data-stagger="60"` on a parent staggers its `.rv` children. No page mounts its own reveal observer. Only transform and opacity animate; reduced motion keeps fades.
- Fonts: Tiro Sanskrit and Tiro Hindi are set once on `<html>` (`lib/fonts.ts`). Use the tokens; no funnel `fonts.ts`.
- Script: `lib/script.ts` + `<ScriptToggle>`. One site-wide Devanagari / IAST setting on `<html data-script>`. Mark scripture spans `.sx-deva` / `.sx-iast`; CSS shows one. Never render both visibly.
- `lib/locale.ts` (`Locale`, `localeForPath`), `lib/seo.ts` (`SITE`, `abs`, `pageMeta`, `breadcrumbLd`, `faqLd`, `ldJson`, `AUTHOR_LD`, `PUBLISHER_LD`). No funnel redefines these.
- `lib/nav.ts`: the nav, More menu, drawer and footer links. Add a page there once.

## Components (import from `@/components/site`)
| Component | Use for | Key props |
|---|---|---|
| `PageHero` | Every page's hero. Fixed order: crumbs, eyebrow, H1, sub, facts, actions, then the verse or visual (right column on desktop). | `crumbs`, `eyebrow`, `title`, `sub`, `facts`, `actions` (first = primary), `verse` (VerseCard props), `visual`, `art`, `below`, `scriptToggle`, `locale`, `crumbsLd` |
| `VerseCard` | Every verse, line, doha, chaupai, shloka. Fixed order: label + script switch, original (Devanagari or IAST), meaning, source, children, actions. | `original`, `iast`, `meaning`, `source`, `sourceHref`, `label`, `lang` ('sa' / 'awa' / 'hi' / 'bra'), `size` ('hero' / 'default' / 'compact'), `framed`, `align`, `toggle`, `actions`, `children`, `as`, `rv` |
| `VerseList` | A list of VerseCards (`as="li"`). | `columns` 1 or 2 |
| `Section` | Every page section with the standard head. | `id`, `eyebrow`, `title`, `intro`, `tone` ('band' alternates), `width`, `track` (Section Viewed), `align` |
| `Button` / `Actions` | All CTAs. | `href`, `label`, `location`, `variant` ('primary' / 'secondary' / 'link') |
| `Facts` | Hero/section chips. | `items` |
| `Breadcrumbs` | Crumbs + BreadcrumbList JSON-LD (Home is added). Usually via PageHero. | `items`, `locale`, `ld` |
| `ShareActions` | Copy / WhatsApp / Save image / Listen / Share for any line. | `item {id,type}`, `copyText`, `shareText`, `image {url or render, fileName}`, `audioSrc`, `size` |
| `NextStep` | The device-aware next step (app / WhatsApp / email). | `placement`, `copy`, `pageKey`, `startSituation` |
| `GitaBridge` | Any link from another scripture back to a Gita verse. | `href`, `label`, `why`, `location`, `variant` ('card' / 'inline') |
| `Faq` | FAQs + FAQPage JSON-LD. | `items`, `locale`, `ld` |
| `LinkCards` | Related / up-next / hub listings, file downloads. | `items {href,title,body,kicker,orig,location,download,event,eventProps}`, `columns` |
| `JsonLd` | Any other schema. | `data` |
| `Nav`, `SiteFooter` | From `components/`; same on every page. `Nav` takes `overlayHero` and `locale` (defaults from the URL). |

## Analytics (`lib/mixpanel.ts`, `lib/analytics/events.ts`)
- Send only registry events: `trackEvent(EVENTS.X, props)`, or `trackEventBeacon` for taps that navigate away. Names are typed; a new event goes in `EVENTS` first.
- Naming: "Object Verb", Title Case, past tense, like the original funnels ("Page Viewed", "Onboarding Step Completed"). Clicked (not Tapped), Viewed (not Shown/Seen), Selected (not Picked), Opened, Toggled (`to`), Started/Completed. Name the object, not the funnel ("Script Toggled", "Line Opened"); the funnel is a property.
- Every event gets `page`, `funnel`, `locale`, `path` automatically. Pages mount `<PageTracker pageName="Title Case Name" />` (components/BlogTracker) once; components never pass `page` or `funnel`.
- Standard props: `item_id`, `item_type`, `location`, `position`, `to`, `method`.
- The `dev_` prefix is decided in one place (`isDevTraffic` / `wireEventName`). Never prefix by hand.
- Links: `data-mp-location` on an `<a>` sends Link Clicked / App Store Button Clicked. Links that send their own event get `data-mp-tracked`.
- Renames from the funnel-specific names are listed in `RENAMED` (events.ts).
