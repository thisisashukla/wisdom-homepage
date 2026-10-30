import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import SceneLedger from '@/components/funnels/ramayana/SceneLedger'
import LampLegend from '@/components/funnels/ramayana/LampLegend'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import { Crumbs, Faq, JsonLd, MethodEn } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { SCENES } from '@/lib/funnels/ramayana/data'
import { HUB_FAQ, HUB_QUICK } from '@/lib/funnels/ramayana/hubCopy'
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
      <Crumbs label="Breadcrumb" items={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana', href: PATHS.hub }, { name: 'In the original' }]} />

      <header className="rl-hero">
        <h1 className="rl-h1">Ramayana, in the original</h1>
        <p className="rl-promise">You watched it on the big screen. Read the line it came from.</p>
        <div className="rl-shore" aria-hidden="true" />
        <p className="rl-quick" id="quick-answer">
          {HUB_QUICK.en}
        </p>
      </header>

      <section className="rl-section" aria-labelledby="lamps">
        <h2 className="rl-h2" id="lamps">
          Three lamps for every scene
        </h2>
        <p className="rl-lede">
          Each scene has three diyas: the film, Valmiki and Tulsidas. A lit lamp means the moment is in that version. Tap a lamp
          to read what that version has, in the original with plain English.
        </p>
        <LampLegend locale="en" />
      </section>

      <section className="rl-section" aria-labelledby="scenes">
        <h2 className="rl-h2" id="scenes">
          The scenes, in story order
        </h2>
        <SceneLedger scenes={SCENES} locale="en" page={PAGE} />
      </section>

      <section className="rl-section" aria-labelledby="next-read">
        <h2 className="rl-h2" id="next-read">
          After the credits
        </h2>
        <ul className="rl-links">
          <li>
            <a href={PATHS.afterFilm} data-mp-location="links_after_film">
              <strong>Seven mornings after the film</strong>
              <span>Four Ramayana lines, then three from the Bhagavad Gita, one a day.</span>
            </a>
          </li>
          <li>
            <a href={PATHS.compare} data-mp-location="links_compare">
              <strong>Valmiki and Tulsidas, side by side</strong>
              <span>Language, length, how each tells Ram, and what the film draws on.</span>
            </a>
          </li>
          <li>
            <a href={PATHS.diwali} data-mp-location="links_diwali">
              <strong>The homecoming, as Valmiki and Tulsidas tell it</strong>
              <span>The return to Ayodhya behind Diwali, line by line.</span>
            </a>
          </li>
          <li>
            <a href={PATHS.hiOriginal} hrefLang="hi" data-mp-location="links_hindi">
              <strong lang="hi">हिंदी में पढ़ें</strong>
              <span>The same scenes, with Hindi meanings.</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="rl-section" aria-labelledby="keep">
        <h2 className="rl-h2" id="keep">
          Lines to keep
        </h2>
        <p className="rl-lede">Copy one, send it on WhatsApp, or save it as an image.</p>
        <KeepCards ids={['ram-anirveda', 'ram-trouble-passes', 'ram-all-things-part', 'ram-hundred-years']} locale="en" page={PAGE} pageKey="ramayana-original" path={PATHS.original} />
      </section>

      <div className="rl-next">
        <NextStep funnel="ramayana" locale="en" pageName={PAGE} pageKey="ramayana-original" placement="end" copy={NEXT_COPY.en} />
      </div>

      <Faq heading="Questions people ask" qas={HUB_FAQ.en} />
      <MethodEn />
    </Shell>
  )
}
