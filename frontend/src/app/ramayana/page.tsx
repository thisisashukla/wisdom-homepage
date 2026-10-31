import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, LinkCards, NextStep, PageHero, Section } from '@/components/site'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import { Speaker } from '@/components/funnels/ramayana/LineVerse'
import { MethodEn } from '@/components/funnels/ramayana/Method'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { KAND_LABEL, SCENES, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, itemListLd, ramayanaMeta } from '@/lib/funnels/ramayana/seo'
import { lineOriginal } from '@/lib/funnels/ramayana/verse'

const DESC = 'Ramayana: Part 1 in the text: which film scenes are in Valmiki and which are Tulsidas’s, seven lines for the week after, and the Diwali homecoming.'

export const metadata: Metadata = ramayanaMeta({
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
  { href: PATHS.original, t: 'Ramayana, in the original', s: 'Find out which film scenes Valmiki tells and which come from later tellings.' },
  { href: PATHS.afterFilm, t: 'Seven mornings after the film', s: 'A line each morning for the week after you see it, ending with the Bhagavad Gita.' },
  { href: PATHS.diwali, t: 'The homecoming behind Diwali', s: 'Ram’s return to Ayodhya, as Valmiki and Tulsidas tell it.' },
  { href: PATHS.compare, t: 'Valmiki and Tulsidas, side by side', s: 'How the two texts differ, and what the film draws on.' },
]

export default function RamayanaHub() {
  const hero = lineView(getLine('vr-5-12-10'), 'en')
  return (
    <main>
      <PageTracker pageName="Ramayana Hub" />
      <JsonLd
        data={[
          articleLd({ headline: 'The Ramayana behind the film', description: DESC, path: PATHS.hub, locale: 'en', about: ['Ramayana', 'Ramcharitmanas', 'Ramayana: Part 1', 'Diwali'] }),
          itemListLd('Ramayana on Wisdom', START.map((x) => ({ name: x.t, path: x.href }))),
        ]}
      />
      <PageHero
        crumbs={[{ label: 'Ramayana', href: PATHS.hub }]}
        eyebrow="Valmiki and Tulsidas"
        title="The Ramayana behind the film"
        sub="Read the scenes in Valmiki's Sanskrit and Tulsidas's Awadhi, then carry one line into your week."
        facts={['In cinemas from 5 Nov 2026', 'Diwali, 8 Nov']}
        actions={[{ href: PATHS.original, label: 'Check the film scenes', location: 'hero_original' }]}
        verse={{ ...lineOriginal(hero), label: <Speaker line={hero} locale="en" />, source: hero.ref }}
      />

      <Section spacing="tight" rv={false}>
        <p className="sx-prose rv" id="quick-answer">
          Ramayana: Part 1 is in cinemas from 5 November 2026 and reportedly tells the story up to Sita&apos;s abduction. In the
          texts, that is Bal, Ayodhya and Aranya Kand, in Valmiki&apos;s Ramayana and in Tulsidas&apos;s Ramcharitmanas. Start with
          a scene you remember from the trailer and see which text it comes from.
        </p>
      </Section>

      <Section id="start" tone="band" title="Start here">
        <LinkCards
          items={[
            ...START.map((x) => ({ href: x.href, title: x.t, body: x.s, location: `start_${x.href.split('/').pop()}` })),
            { href: PATHS.hiOriginal, title: <span lang="hi">हिंदी में पढ़ें</span>, body: 'The scene checks and the homecoming, with Hindi meanings.', hrefLang: 'hi', location: 'start_hindi' },
          ]}
        />
      </Section>

      <Section id="covers" title="What Part 1 covers in the text">
        <div className="rl-kands" data-stagger="60">
          {KANDS.map((k) => (
            <div key={k.id} className="rl-kand rv">
              <h3 className="sx-h3 rl-kand-h">{KAND_LABEL[k.id].en}</h3>
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
      </Section>

      <Section id="keep" tone="band" title="Lines to keep" intro="Keep one for the week ahead, or send one to a friend who is seeing the film.">
        <KeepCards ids={['ram-steadiness', 'ram-conduct', 'ram-own-deeds', 'ram-friend']} locale="en" pageKey="ramayana-hub" path={PATHS.hub} />
      </Section>

      <Section>
        <NextStep locale="en" pageKey="ramayana-hub" placement="end" copy={NEXT_COPY.en} />
      </Section>

      <MethodEn />
    </main>
  )
}
