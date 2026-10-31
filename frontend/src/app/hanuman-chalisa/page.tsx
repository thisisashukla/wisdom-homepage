import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, LinkCards, NextStep, PageHero, ScriptToggle, Section } from '@/components/site'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import { MeaningTracker, PrintButton } from '@/components/funnels/hanuman-chalisa/Trackers'
import { FullText, Sources } from '@/components/funnels/hanuman-chalisa/Blocks'
import { abs, AUTHOR_LD, pageMeta, PUBLISHER_LD } from '@/lib/seo'
import {
  beads,
  cardOg,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  getUnits,
  HOW_MANY_PATH,
  HUB_PATH,
  HUB_PATH_HI,
  HUB_TWIN,
  JAYANTI_PATH,
  LEARN_PATH,
  linePath,
  NEXT_COPY,
  START_SITUATION,
  unitVerse,
  UPDATED,
} from '@/lib/funnels/hanuman-chalisa'

export const metadata: Metadata = pageMeta({
  title: 'Hanuman Chalisa in English, Meaning Line by Line | Wisdom',
  description:
    'The full Hanuman Chalisa in Awadhi and English letters, with the meaning of every line, word by word. Learn it by heart and count 11, 21 or 108.',
  path: HUB_PATH,
  twin: HUB_TWIN,
  ogImage: cardOg('hc-1'),
})

const FAQ = [
  {
    q: 'Who wrote the Hanuman Chalisa?',
    a: 'Goswami Tulsidas, the poet of the Ramcharitmanas, wrote it in Awadhi. He names himself in the last chaupai: "tulsīdās sadā hari cerā", Tulsidas is forever Hari\'s servant.',
  },
  {
    q: 'Why is it called Chalisa?',
    a: 'Chalisa means "forty". The hymn has forty chaupais, framed by two dohas at the start and one at the end, so 43 units in all. Chaupai 39 calls it "hanumān calīsā" itself.',
  },
  {
    q: 'What language is the Hanuman Chalisa in?',
    a: 'Awadhi, the language of the Ayodhya region and of the Ramcharitmanas. It is close to Hindi, which is why Hindi speakers follow most of it, but words like "jasu" (glory) and "cerā" (servant) are Awadhi.',
  },
  {
    q: 'What is the right way to read the English letters?',
    a: 'The English letters here follow the way the Chalisa is sung, so the short a at the end of a word is dropped: जय reads "jay", ज्ञान reads "jñān". A long ā is said as in "father", ī as in "machine", ū as in "rule".',
  },
  {
    q: 'How many times should I recite it?',
    a: 'Chaupai 38 speaks of reciting it a hundred times. Families commonly recite it once, 7, 11 or 21 times, or 108 times on special days. The page on how many times sets out what the text says and what tradition adds.',
  },
  {
    q: 'When should I recite it?',
    a: 'Any time. Tuesdays and Saturdays are the days most families keep for Hanuman, and many recite it in the morning after bathing. Hanuman Jayanti falls on Tuesday, 20 April 2027.',
  },
]

export default function HanumanChalisaHub() {
  const units = getUnits()
  const beadList = beads('en', 'anchor')

  const workLd = {
    '@context': 'https://schema.org',
    '@type': 'CreativeWork',
    '@id': `${abs(HUB_PATH)}#text`,
    name: 'Hanuman Chalisa with English meaning',
    headline: 'Hanuman Chalisa in English, line by line',
    url: abs(HUB_PATH),
    inLanguage: ['awa', 'en'],
    isBasedOn: chalisaWorkLd,
    citation: editionCitation,
    author: AUTHOR_LD,
    publisher: PUBLISHER_LD,
    dateModified: UPDATED,
    translationOfWork: chalisaWorkLd,
  }
  const listLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Hanuman Chalisa, all 43 lines',
    numberOfItems: units.length,
    itemListElement: units.map((u) => ({ '@type': 'ListItem', position: u.pos, name: `${u.label.en}: ${u.iast[0]}`, url: abs(linePath(u.slug)) })),
  }

  const d1 = units[0]

  return (
    <main>
      <PageTracker pageName="Hanuman Chalisa Hub" />
      <MeaningTracker />
      <JsonLd data={[workLd, listLd]} />

      <PageHero
        crumbs={[{ label: 'Hanuman Chalisa', href: HUB_PATH }]}
        eyebrow="Tulsidas, in Awadhi"
        title="Hanuman Chalisa in English, line by line"
        sub={
          <span id="quick-answer">
            The Hanuman Chalisa is a 43-line Awadhi hymn to Hanuman by Goswami Tulsidas: two opening dohas, forty chaupais and a closing
            doha. Read it slowly, a line at a time, and stop on any line whose meaning you want to know before you say it again.
          </span>
        }
        facts={['Said on Tuesdays and Saturdays', '6 to 10 minutes to recite']}
        actions={[
          { href: '#hc-text', label: 'Read it line by line', location: 'hub_hero_read' },
          { href: LEARN_PATH, label: 'Learn it by heart, 4 lines a day', location: 'hub_learn' },
          { href: COUNTER_PATH, label: 'Count 11, 21 or 108', location: 'hub_counter' },
          { href: HUB_PATH_HI, label: <span lang="hi">हिंदी में</span>, location: 'hub_hindi', hrefLang: 'hi' },
        ]}
        verse={{ ...unitVerse(d1), label: 'Doha 1, the opening line' }}
      />

      <Section id="hc-text" tone="band" eyebrow="43 lines" title="The full text">
        <div className="hc-controls hc-noprint">
          <ScriptToggle />
          <PrintButton label="Print the text" />
        </div>
        <p className="hc-note">
          The English letters follow the way the Chalisa is sung: the short a at the end of a word is dropped, so जय reads jay and ज्ञान
          reads jñān.
        </p>

        <div className="hc-read hc-gap">
          <aside className="hc-read-aside" aria-label="Mala: one bead for each line">
            <Mala beads={beadList} locale="en" mode="anchor" currentId="hc.d1" label="Mala of 43 beads, one for each line" caption="One bead for each of the 43 lines. Tap a bead to go to its line.">
              <span className="hc-mala-name">Hanuman Chalisa</span>
              <span className="hc-mala-sub">2 dohas, 40 chaupais, 1 doha</span>
            </Mala>
          </aside>
          <FullText units={units} locale="en" />
        </div>
      </Section>

      <Section id="hc-gita" eyebrow="The thread to the Gita" title="Hanuman in the Gita" className="hc-noprint">
        <GitaBridge
          href="/gita/chapter/1/verse/20"
          label="Read Bhagavad Gita 1.20"
          why="Hanuman is on Arjuna's chariot at Kurukshetra. In the Bhagavad Gita, Arjuna is called kapi-dhvaja, the one whose banner bears the vanara, as he lifts his bow just before the dialogue with Krishna begins."
          location="hub_gita_1_20"
          className="rv"
        />
      </Section>

      <Section id="hc-more" tone="band" title="Reciting it" className="hc-noprint">
        <LinkCards
          items={[
            { href: HOW_MANY_PATH, title: 'How many times to recite it', body: 'Once, 11, 21, 108, or a 40-day vow', location: 'hub_how_many' },
            { href: JAYANTI_PATH, title: 'Hanuman Jayanti, 20 April 2027', body: 'A one-week family plan', location: 'hub_jayanti' },
          ]}
        />
      </Section>

      <Section id="hc-faq" title="Questions people ask">
        <Faq items={FAQ} />
      </Section>

      <Section tone="band" className="hc-next">
        <NextStep locale="en" pageKey="hc-hub" placement="hub_end" startSituation={START_SITUATION} copy={NEXT_COPY.en} />
        <Sources locale="en" />
      </Section>
    </main>
  )
}
