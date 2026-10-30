import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import SceneLedger from '@/components/funnels/ramayana/SceneLedger'
import LampLegend from '@/components/funnels/ramayana/LampLegend'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import Hero from '@/components/funnels/ramayana/Hero'
import { Band, Faq, JsonLd, MethodEn, Tiles } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { SCENES, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { HUB_COUNTS, HUB_FAQ, HUB_QUICK } from '@/lib/funnels/ramayana/hubCopy'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, faqLd, itemListLd, pageMeta } from '@/lib/funnels/ramayana/seo'

const PAGE = 'ramayana-in-the-original'
const TITLE = 'Ramayana film scenes vs Valmiki and Tulsidas | Wisdom'
const DESC = 'Lakshman Rekha, Ahalya, Kevat, Shabari and more: which Ramayana: Part 1 scenes are in Valmiki, which are Tulsidas’s, with the original lines.'

export const metadata: Metadata = pageMeta({
  title: TITLE,
  description: DESC,
  path: PATHS.original,
  locale: 'en',
  twin: { en: PATHS.original, hi: PATHS.hiOriginal },
  card: 'ram-anirveda',
})

export default function InTheOriginalPage() {
  const crumbs = [
    { name: 'Wisdom', path: '/' },
    { name: 'Ramayana', path: PATHS.hub },
    { name: 'In the original', path: PATHS.original },
  ]
  return (
    <Shell locale="en">
      <BlogTracker pageName={PAGE} />
      <JsonLd
        data={[
          breadcrumbLd(crumbs),
          articleLd({ headline: 'Ramayana, in the original', description: DESC, path: PATHS.original, locale: 'en', about: ['Ramayana', 'Ramcharitmanas', 'Ramayana: Part 1'] }),
          itemListLd(
            'Ramayana: Part 1 scenes checked against Valmiki and Tulsidas',
            SCENES.map((s) => ({ name: s.question.en, path: PATHS.scene(s.slug) })),
          ),
          faqLd(HUB_FAQ.en),
        ]}
      />
      <Hero
        locale="en"
        crumbLabel="Breadcrumb"
        crumbs={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana', href: PATHS.hub }, { name: 'In the original' }]}
        eyebrow="Film, Valmiki, Tulsidas"
        h1="Ramayana, in the original"
        sub="You watched it on the big screen. Read the line it came from."
        facts={[`${HUB_COUNTS.total} scenes`, `${HUB_COUNTS.both} in both texts`, `${HUB_COUNTS.tulsidasOnly} from Tulsidas alone`]}
        cta={{ href: '#scenes', label: 'See the scenes', loc: 'hero_scenes' }}
        lines={[lineView(getLine('rcm-6-36-1'), 'en')]}
      />

      <Band className="rl-introsec">
        <p className="rl-intro rv" id="quick-answer">
          {HUB_QUICK.en}
        </p>
      </Band>

      <Band
        id="lamps"
        title="Three lamps for every scene"
        tone="alt"
        lede="Each scene has three diyas: the film, Valmiki and Tulsidas. A lit lamp means the moment is in that version. Tap a lamp to read what that version has, in the original with plain English."
      >
        <div className="rv">
          <LampLegend locale="en" />
        </div>
      </Band>

      <Band id="scenes" title="The scenes, in story order">
        <SceneLedger scenes={SCENES} locale="en" page={PAGE} />
      </Band>

      <Band id="next-read" title="After the credits" tone="alt" wide>
        <Tiles
          items={[
            { href: PATHS.afterFilm, t: 'Seven mornings after the film', s: 'Four Ramayana lines, then three from the Bhagavad Gita, one a day.' },
            { href: PATHS.compare, t: 'Valmiki and Tulsidas, side by side', s: 'Language, length, how each tells Ram, and what the film draws on.' },
            { href: PATHS.diwali, t: 'The homecoming, as Valmiki and Tulsidas tell it', s: 'The return to Ayodhya behind Diwali, line by line.' },
            { href: PATHS.hiOriginal, t: 'हिंदी में पढ़ें', s: 'The same scenes, with Hindi meanings.', lang: 'hi' },
          ]}
          loc={(href) =>
            href === PATHS.afterFilm ? 'links_after_film' : href === PATHS.compare ? 'links_compare' : href === PATHS.diwali ? 'links_diwali' : 'links_hindi'
          }
        />
      </Band>

      <Band id="keep" title="Lines to keep" lede="Copy one, send it on WhatsApp, or save it as an image." wide>
        <div className="rv">
          <KeepCards ids={['ram-anirveda', 'ram-trouble-passes', 'ram-all-things-part', 'ram-hundred-years']} locale="en" page={PAGE} pageKey="ramayana-original" path={PATHS.original} />
        </div>
      </Band>

      <Band tone="alt">
        <div className="rl-final rv">
          <NextStep funnel="ramayana" locale="en" pageName={PAGE} pageKey="ramayana-original" placement="end" copy={NEXT_COPY.en} />
        </div>
      </Band>

      <Faq heading="Questions people ask" qas={HUB_FAQ.en} />
      <MethodEn />
    </Shell>
  )
}
