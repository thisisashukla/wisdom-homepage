import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, JsonLd, LinkCards, NextStep, PageHero, Section } from '@/components/site'
import SceneLedger from '@/components/funnels/ramayana/SceneLedger'
import LampLegend from '@/components/funnels/ramayana/LampLegend'
import KeepCards from '@/components/funnels/ramayana/KeepCards'
import { Speaker } from '@/components/funnels/ramayana/LineVerse'
import { MethodEn } from '@/components/funnels/ramayana/Method'
import { NEXT_COPY } from '@/components/funnels/ramayana/copy'
import { SCENES, getLine, lineView } from '@/lib/funnels/ramayana/data'
import { HUB_COUNTS, HUB_FAQ, HUB_QUICK } from '@/lib/funnels/ramayana/hubCopy'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { articleLd, itemListLd, ramayanaMeta } from '@/lib/funnels/ramayana/seo'
import { lineOriginal } from '@/lib/funnels/ramayana/verse'

const TITLE = 'Ramayana film scenes vs Valmiki and Tulsidas | Wisdom'
const DESC = 'Lakshman Rekha, Ahalya, Kevat, Shabari and more: which Ramayana: Part 1 scenes are in Valmiki, which are Tulsidas’s, with the original lines.'

export const metadata: Metadata = ramayanaMeta({
  title: TITLE,
  description: DESC,
  path: PATHS.original,
  locale: 'en',
  twin: { en: PATHS.original, hi: PATHS.hiOriginal },
  card: 'ram-anirveda',
})

export default function InTheOriginalPage() {
  const hero = lineView(getLine('rcm-6-36-1'), 'en')
  return (
    <main>
      <PageTracker pageName="Ramayana In The Original" />
      <JsonLd
        data={[
          articleLd({ headline: 'Ramayana, in the original', description: DESC, path: PATHS.original, locale: 'en', about: ['Ramayana', 'Ramcharitmanas', 'Ramayana: Part 1'] }),
          itemListLd(
            'Ramayana: Part 1 scenes checked against Valmiki and Tulsidas',
            SCENES.map((s) => ({ name: s.question.en, path: PATHS.scene(s.slug) })),
          ),
        ]}
      />
      <PageHero
        crumbs={[
          { label: 'Ramayana', href: PATHS.hub },
          { label: 'In the original', href: PATHS.original },
        ]}
        eyebrow="The film and the texts"
        title="Ramayana, in the original"
        sub="Pick a scene you know from the film or the trailer and read what Valmiki and Tulsidas wrote."
        facts={[`${HUB_COUNTS.total} scenes`, `${HUB_COUNTS.both} in both texts`, `${HUB_COUNTS.tulsidasOnly} from Tulsidas alone`]}
        actions={[{ href: '#scenes', label: 'See the scenes', location: 'hero_scenes' }]}
        verse={{ ...lineOriginal(hero), label: <Speaker line={hero} locale="en" />, source: hero.ref }}
      />

      <Section spacing="tight" rv={false}>
        <p className="sx-prose rv" id="quick-answer">
          {HUB_QUICK.en}
        </p>
      </Section>

      <Section
        id="lamps"
        tone="band"
        title="Three lamps for every scene"
        intro="Some moments you know from the film are in Valmiki, and some come only from Tulsidas or later retellings. A lit diya marks each telling that has the moment."
      >
        <div className="rv">
          <LampLegend locale="en" />
        </div>
      </Section>

      <Section id="scenes" title="The scenes, in story order">
        <SceneLedger scenes={SCENES} locale="en" />
      </Section>

      <Section id="next-read" tone="band" title="After the credits">
        <LinkCards
          items={[
            { href: PATHS.afterFilm, title: 'Seven mornings after the film', body: 'Four Ramayana lines, then three from the Bhagavad Gita, one a day.', location: 'links_after_film' },
            { href: PATHS.compare, title: 'Valmiki and Tulsidas, side by side', body: 'Language, length, how each tells Ram, and what the film draws on.', location: 'links_compare' },
            { href: PATHS.diwali, title: 'The homecoming, as Valmiki and Tulsidas tell it', body: 'The return to Ayodhya behind Diwali, line by line.', location: 'links_diwali' },
            { href: PATHS.hiOriginal, title: <span lang="hi">हिंदी में पढ़ें</span>, body: 'The same scenes, with Hindi meanings.', hrefLang: 'hi', location: 'links_hindi' },
          ]}
        />
      </Section>

      <Section id="keep" title="Lines to keep" intro="Keep one for the week ahead, or send one to a friend who is seeing the film.">
        <KeepCards ids={['ram-anirveda', 'ram-trouble-passes', 'ram-all-things-part', 'ram-hundred-years']} locale="en" pageKey="ramayana-original" path={PATHS.original} />
      </Section>

      <Section tone="band">
        <NextStep locale="en" pageKey="ramayana-original" placement="end" copy={NEXT_COPY.en} />
      </Section>

      <Section id="faq" title="Questions people ask">
        <Faq items={HUB_FAQ.en} />
      </Section>
      <MethodEn />
    </main>
  )
}
