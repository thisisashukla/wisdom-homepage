import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import NextStep from '@/components/quotes/NextStep'
import Shell from '@/components/funnels/ramayana/Shell'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import { Crumbs, JsonLd, MethodEn } from '@/components/funnels/ramayana/Bits'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { KAND_LABEL, SCENES } from '@/lib/funnels/ramayana/data'
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
      <Crumbs label="Breadcrumb" items={[{ name: 'Wisdom', href: '/' }, { name: 'Ramayana' }]} />

      <header className="rl-hero">
        <h1 className="rl-h1">The Ramayana behind the film</h1>
        <p className="rl-promise">Read the scenes in Valmiki&apos;s Sanskrit and Tulsidas&apos;s Awadhi, then carry one line into your week.</p>
        <div className="rl-shore" aria-hidden="true" />
        <p className="rl-quick" id="quick-answer">
          Ramayana: Part 1 releases worldwide on 5 November 2026 and reportedly tells the story up to Sita&apos;s abduction. In the
          texts, that is Bal, Ayodhya and Aranya Kand, in Valmiki&apos;s Ramayana and in Tulsidas&apos;s Ramcharitmanas. Start with
          the scene checks, read one line a morning in the week after, and read the homecoming behind Diwali on 8 November.
        </p>
      </header>

      <section className="rl-section" aria-labelledby="start">
        <h2 className="rl-h2" id="start">
          Start here
        </h2>
        <ul className="rl-links">
          {START.map((x) => (
            <li key={x.href}>
              <a href={x.href} data-mp-location={`start_${x.href.split('/').pop()}`}>
                <strong>{x.t}</strong>
                <span>{x.s}</span>
              </a>
            </li>
          ))}
          <li>
            <a href={PATHS.hiOriginal} hrefLang="hi" data-mp-location="start_hindi">
              <strong lang="hi">हिंदी में पढ़ें</strong>
              <span>The scene checks and the homecoming, with Hindi meanings.</span>
            </a>
          </li>
        </ul>
      </section>

      <section className="rl-section" aria-labelledby="covers">
        <h2 className="rl-h2" id="covers">
          What Part 1 covers in the text
        </h2>
        {KANDS.map((k) => (
          <div key={k.id} className="rl-section" style={{ paddingTop: '1.2rem' }}>
            <h3 className="rl-h3">{KAND_LABEL[k.id].en}</h3>
            <p className="rl-p">{k.summary}</p>
            <ul className="rl-links">
              {SCENES.filter((s) => s.kand === k.id).map((s) => (
                <li key={s.slug}>
                  <a href={PATHS.scene(s.slug)} data-mp-location={`covers_${s.slug}`}>
                    <strong>{s.title.en}</strong>
                    <span>{s.verdict.en}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      <section className="rl-section" aria-labelledby="keep">
        <h2 className="rl-h2" id="keep">
          Lines to keep
        </h2>
        <p className="rl-lede">Copy one, send it on WhatsApp, or save it as an image.</p>
        <KeepCards ids={['ram-steadiness', 'ram-conduct', 'ram-own-deeds', 'ram-friend']} locale="en" page={PAGE} pageKey="ramayana-hub" path={PATHS.hub} />
      </section>

      <div className="rl-next">
        <NextStep funnel="ramayana" locale="en" pageName={PAGE} pageKey="ramayana-hub" placement="end" copy={NEXT_COPY.en} />
      </div>

      <MethodEn />
    </Shell>
  )
}
