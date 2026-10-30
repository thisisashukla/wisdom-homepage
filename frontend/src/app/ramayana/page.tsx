import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import Hero from '@/components/funnels/ramayana/Hero'
import { Band, JsonLd, MethodEn, Tiles } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { KAND_LABEL, SCENES, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, breadcrumbLd, itemListLd, pageMeta } from '@/lib/funnels/ramayana/seo'

const PAGE = 'ramayana-hub'
const DESC = 'Ramayana: Part 1 in the text: which film scenes are in Valmiki and which are Tulsidas’s, seven lines for the week after, and the Diwali homecoming.'

export const metadata: Metadata = pageMeta({
  title: 'Ramayana: the texts behind the film, scene by scene',
  description: DESC,
  path: PATHS.hub,
  locale: 'en',
  card: 'ram-anirveda',
})

const KANDS = [
  { id: 'bal' as const, summary: 'Ram’s birth, his training with Vishvamitra, Ahalya, and the bow at Mithila.' },
  { id: 'ayodhya' as const, summary: 'The coronation that never happens, Kaikeyi’s two boons, the exile, and Bharat’s refusal.' },
  { id: 'aranya' as const, summary: 'The forest years, Shurpanakha, the golden deer, Sita’s abduction and Jatayu’s fight.' },
]

const START = [
  { href: PATHS.original, t: 'Ramayana, in the original', s: `${SCENES.length} film scenes checked against Valmiki and Tulsidas, with the lines.` },
  { href: PATHS.afterFilm, t: 'Seven mornings after the film', s: 'Four Ramayana lines, then three from the Bhagavad Gita, one a day.' },
  { href: PATHS.diwali, t: 'The homecoming behind Diwali', s: 'Ram’s return to Ayodhya, as Valmiki and Tulsidas tell it.' },
  { href: PATHS.compare, t: 'Valmiki and Tulsidas, side by side', s: 'How the two texts differ, and what the film draws on.' },
]

export default function RamayanaHub() {
  return (
    <Shell locale="en">
      <BlogTracker pageName={PAGE} />
      <JsonLd
        data={[
          breadcrumbLd([
            { name: 'Wisdom', path: '/' },
            { name: 'Ramayana', path: PATHS.hub },
          ]),
          articleLd({ headline: 'The Ramayana behind the film', description: DESC, path: PATHS.hub, locale: 'en', about: ['Ramayana', 'Ramcharitmanas', 'Ramayana: Part 1', 'Diwali'] }),
          itemListLd('Ramayana on Wisdom', START.map((x) => ({ name: x.t, path: x.href }))),
        ]}
      />
      <Hero
        locale="en"
        crumbLabel="Breadcrumb"
        crumbs={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana' }]}
        eyebrow="Valmiki and Tulsidas"
        h1="The Ramayana behind the film"
        sub="Read the scenes in Valmiki's Sanskrit and Tulsidas's Awadhi, then carry one line into your week."
        facts={['Film opens 5 Nov 2026', `${SCENES.length} scenes checked`, 'Diwali, 8 Nov']}
        cta={{ href: PATHS.original, label: 'Check the film scenes', loc: 'hero_original' }}
        lines={[lineView(getLine('vr-5-12-10'), 'en')]}
      />

      <Band className="rl-introsec">
        <p className="rl-intro rv" id="quick-answer">
          Ramayana: Part 1 releases worldwide on 5 November 2026 and reportedly tells the story up to Sita&apos;s abduction. In the
          texts, that is Bal, Ayodhya and Aranya Kand, in Valmiki&apos;s Ramayana and in Tulsidas&apos;s Ramcharitmanas. Start with
          the scene checks, read one line a morning in the week after, and read the homecoming behind Diwali on 8 November.
        </p>
      </Band>

      <Band id="start" title="Start here" tone="alt" wide>
        <Tiles
          items={[...START, { href: PATHS.hiOriginal, t: 'हिंदी में पढ़ें', s: 'The scene checks and the homecoming, with Hindi meanings.', lang: 'hi' as const }]}
          loc={(href) => (href === PATHS.hiOriginal ? 'start_hindi' : `start_${href.split('/').pop()}`)}
        />
      </Band>

      <Band id="covers" title="What Part 1 covers in the text" wide>
        <div className="rl-kands">
          {KANDS.map((k) => (
            <div key={k.id} className="rl-kand rv">
              <h3 className="rl-kand-h">{KAND_LABEL[k.id].en}</h3>
              <p className="rl-kand-p">{k.summary}</p>
              <ul className="rl-rows">
                {SCENES.filter((s) => s.kand === k.id).map((s) => (
                  <li key={s.slug}>
                    <a className="rl-row" href={PATHS.scene(s.slug)} data-mp-location={`covers_${s.slug}`}>
                      <strong>{s.title.en}</strong>
                      <span>{s.verdict.en}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Band>

      <Band id="keep" title="Lines to keep" lede="Copy one, send it on WhatsApp, or save it as an image." tone="alt" wide>
        <div className="rv">
          <KeepCards ids={['ram-steadiness', 'ram-conduct', 'ram-own-deeds', 'ram-friend']} locale="en" page={PAGE} pageKey="ramayana-hub" path={PATHS.hub} />
        </div>
      </Band>

      <Band>
        <div className="rl-final rv">
          <NextStep funnel="ramayana" locale="en" pageName={PAGE} pageKey="ramayana-hub" placement="end" copy={NEXT_COPY.en} />
        </div>
      </Band>

      <MethodEn />
    </Shell>
  )
}
