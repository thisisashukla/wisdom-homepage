import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Actions, Faq, JsonLd, NextStep, PageHero, ScriptToggle, Section, VerseCard, VerseList } from '@/components/site'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  getUnit,
  HOW_MANY_PATH,
  HUB_PATH,
  JAYANTI_PATH,
  linePath,
  NEXT_COPY,
  START_SITUATION,
  unitVerse,
  UPDATED,
  type HcUnit,
} from '@/lib/funnels/hanuman-chalisa'

export const metadata: Metadata = pageMeta({
  title: 'How Many Times to Recite the Hanuman Chalisa | Wisdom',
  description:
    'Chaupai 38 of the Hanuman Chalisa speaks of a hundred recitations. What the text says, and what families keep: 1, 7, 11, 21, 108 times or a 40-day vow.',
  path: HOW_MANY_PATH,
})

const FAQ = [
  {
    q: 'Does the Hanuman Chalisa say how many times to recite it?',
    a: 'Only once. Chaupai 38 says that whoever recites it a hundred times ("sat bār") is freed from bondage and finds great joy. Every other number people keep comes from custom.',
  },
  {
    q: 'Why do people recite it 108 times?',
    a: 'A japa mala has 108 beads, so 108 is one full round of the mala. It is kept for a special day or a vow, often split across a morning and an evening or shared by a family.',
  },
  {
    q: 'Why 11 or 21 times?',
    a: 'They are customary numbers for a sitting at home or in a temple, most often on a Tuesday or Saturday. The text does not name them.',
  },
  {
    q: 'What is the 40-day practice?',
    a: 'Chalisa means forty, and many people keep a vow of reciting it once a day for 40 days in a row. If a day is missed, many start the count again.',
  },
  {
    q: 'How long does one recitation take?',
    a: 'Most people take 6 to 10 minutes to recite it once at a steady pace, so 11 recitations take a little under two hours.',
  },
  {
    q: 'Who can recite it?',
    a: 'Anyone. Chaupai 39 begins "jo yah paṛhai", whoever reads this. The text sets no condition on who may read it or when.',
  },
]

/** A quoted unit: the line, its meaning, and a link to its word-by-word page. */
function Quoted({ u, as }: { u: HcUnit; as?: 'li' }) {
  return (
    <VerseCard
      as={as}
      size="compact"
      align="left"
      rv
      label={u.label.en}
      {...unitVerse(u)}
      meaning={u.meaning.en}
      source={`${u.label.en}, word by word`}
      sourceHref={linePath(u.slug)}
    />
  )
}

export default function HowManyTimesPage() {
  const c38 = getUnit('hc.c38')!
  const c39 = getUnit('hc.c39')!
  const c40 = getUnit('hc.c40')!
  const c26 = getUnit('hc.c26')!

  const articleLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'How many times to recite the Hanuman Chalisa',
    url: abs(HOW_MANY_PATH),
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    dateModified: UPDATED,
    about: chalisaWorkLd,
    citation: editionCitation,
    inLanguage: 'en',
  }

  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa How Many Times" />
      <JsonLd data={articleLd} />

      <PageHero
        crumbs={[
          { label: 'Hanuman Chalisa', href: HUB_PATH },
          { label: 'How many times', href: HOW_MANY_PATH },
        ]}
        eyebrow="What the text says"
        title="How many times to recite the Hanuman Chalisa"
        sub={
          <span id="quick-answer">
            The Hanuman Chalisa names one number itself: chaupai 38 says whoever recites it a hundred times is freed from bondage and
            finds great joy. Everything else is family custom: once a day, 7, 11 or 21 times on a Tuesday or Saturday, 108 times for one
            round of the mala, or once a day for 40 days.
          </span>
        }
        facts={['Chaupai 38', 'Once, 7, 11, 21, 108', '40 days']}
        actions={[{ href: COUNTER_PATH, label: 'Set a sankalp and count', location: 'howmany_hero_counter' }]}
        verse={{ ...unitVerse(c38), label: 'Chaupai 38, the one number in the text' }}
      />

      <Section
        id="h-text"
        tone="band"
        eyebrow="Chaupais 38 to 40"
        title="What the text says about itself"
        intro="The last three chaupais are Tulsidas speaking about the hymn. The first gives the number a hundred."
      >
        <div className="hc-controls">
          <ScriptToggle />
        </div>
        <VerseList columns={2}>
          <Quoted u={c38} as="li" />
          <Quoted u={c39} as="li" />
          <Quoted u={c40} as="li" />
        </VerseList>
        <p className="sx-prose rv hc-gap">
          Earlier lines promise help to anyone who keeps Hanuman in mind, with no count attached. Chaupai 26 is the plainest of them.
        </p>
        <div className="hc-text hc-gap">
          <Quoted u={c26} />
        </div>
        <div className="hc-aside-note rv">
          <p>
            Rambhadracharya, in his Mahaviri commentary, reads chaupai 38 as &ldquo;jo śat bār&rdquo;, the same hundred. Some popular
            printings start it &ldquo;yah sat bār&rdquo;. The number does not change.
          </p>
        </div>
      </Section>

      <Section id="h-trad" eyebrow="Custom" title="What families keep">
        <ul className="hc-rows rv">
          <li>
            <strong>Once a day</strong>
            In the morning after bathing, or at the evening lamp. Many families keep just this.
          </li>
          <li>
            <strong>7, 11 or 21 times</strong>
            A sitting on a Tuesday or Saturday, the days kept for Hanuman, at home or in a temple. Eleven is a common family number.
          </li>
          <li>
            <strong>100 times</strong>
            The number in chaupai 38. Some keep it in one long day; others spread it over several.
          </li>
          <li>
            <strong>108 times</strong>
            One round of a 108-bead mala, for Hanuman Jayanti or a vow, often shared among a family.
          </li>
          <li>
            <strong>40 days</strong>
            Once a day for forty days in a row, for the forty chaupais.
          </li>
        </ul>
        <Actions
          className="hc-gap rv"
          items={[
            { href: COUNTER_PATH, label: 'Set a sankalp and count', location: 'howmany_counter' },
            { href: JAYANTI_PATH, label: '11 times for Hanuman Jayanti', location: 'howmany_jayanti', variant: 'secondary' },
          ]}
        />
      </Section>

      <Section id="hc-faq" tone="band" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <Section className="hc-next">
        <NextStep locale="en" pageKey="hc-how-many" placement="howmany_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
      </Section>
    </main>
  )
}
