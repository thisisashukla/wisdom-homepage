import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import Mala from '@/components/funnels/hanuman-chalisa/Mala'
import ScriptToggle from '@/components/funnels/hanuman-chalisa/ScriptToggle'
import { MeaningTracker, PrintButton } from '@/components/funnels/hanuman-chalisa/Trackers'
import { Faq, FullText, HcNextStep, Sources } from '@/components/funnels/hanuman-chalisa/Blocks'
import HcHero, { HeroLine } from '@/components/funnels/hanuman-chalisa/Hero'
import {
  abs,
  AUTHOR_LD,
  beads,
  breadcrumbLd,
  cardOg,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  faqLd,
  getUnits,
  HOW_MANY_PATH,
  HUB_PATH,
  HUB_TWIN,
  JAYANTI_PATH,
  LEARN_PATH,
  ldJson,
  linePath,
  pageMeta,
  PUBLISHER_LD,
  UPDATED,
} from '@/lib/funnels/hanuman-chalisa'

const PAGE = 'hanuman-chalisa-hub'

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
  const crumbs = breadcrumbLd([
    { name: 'Wisdom', path: '/' },
    { name: 'Hanuman Chalisa', path: HUB_PATH },
  ])

  const d1 = units[0]

  return (
    <main className="hc-main">
      <BlogTracker pageName={PAGE} />
      <MeaningTracker page={PAGE} locale="en" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([workLd, listLd, crumbs, faqLd(FAQ)]) }} />

      <HcHero
        crumbs={
          <nav className="hc-crumbs hc-noprint" aria-label="Breadcrumb">
            <a href="/">Wisdom</a> / <span>Hanuman Chalisa</span> /{' '}
            <a href="/hi/hanuman-chalisa" hrefLang="hi" lang="hi">
              हिंदी में
            </a>
          </nav>
        }
        eyebrow="Tulsidas, in Awadhi"
        title="Hanuman Chalisa in English, line by line"
        sub={
          <>
            The Hanuman Chalisa is a 43-line Awadhi hymn to Hanuman by Goswami Tulsidas: two opening dohas, forty chaupais and a closing
            doha. Below is the full text in the Gita Press reading, in Devanagari or English letters, with the meaning of every line one
            tap away. Each line also has its own page, word by word.
          </>
        }
        facts={['43 lines', 'Gita Press reading', 'Meaning for every line']}
        actions={
          <a href="#hc-text" className="btn-read-gita btn-read-gita-primary" data-mp-location="hub_hero_read">
            Read it line by line
          </a>
        }
        links={
          <>
            <a href={LEARN_PATH} data-mp-location="hub_learn">
              Learn it by heart, 4 lines a day
            </a>
            <a href={COUNTER_PATH} data-mp-location="hub_counter">
              Count 11, 21 or 108
            </a>
          </>
        }
        visual={<HeroLine awadhi={d1.awadhi} iast={d1.iast} caption="Doha 1, the opening line" />}
      />

      <section className="section hc-band" id="hc-text" aria-labelledby="hc-text-h">
        <div className="wrap">
          <div className="sec-head hc-sec-head rv">
            <p className="eyebrow">43 lines</p>
            <h2 className="heading" id="hc-text-h">
              The full text
            </h2>
            <div className="hc-controls hc-noprint">
              <ScriptToggle locale="en" page={PAGE} />
              <PrintButton label="Print the text" page={PAGE} locale="en" />
            </div>
            <p className="hc-note">
              The English letters follow the way the Chalisa is sung: the short a at the end of a word is dropped, so जय reads jay and ज्ञान
              reads jñān.
            </p>
          </div>

          <div className="hc-read">
            <aside className="hc-read-aside" aria-label="Mala: one bead for each line">
              <Mala beads={beadList} locale="en" page={PAGE} mode="anchor" currentId="hc.d1" label="Mala of 43 beads, one for each line" caption="One bead for each of the 43 lines. Tap a bead to go to its line.">
                <span className="hc-mala-name">Hanuman Chalisa</span>
                <span className="hc-mala-sub">2 dohas, 40 chaupais, 1 doha</span>
              </Mala>
            </aside>
            <div className="rv">
              <FullText units={units} locale="en" />
            </div>
          </div>
        </div>
      </section>

      <section className="section section-alt hc-band hc-noprint" aria-labelledby="hc-gita-h">
        <div className="wrap hc-col">
          <div className="hc-bridge rv">
            <p className="eyebrow">The thread to the Gita</p>
            <h2 className="hc-h2" id="hc-gita-h">
              Hanuman in the Gita
            </h2>
            <div className="hc-prose">
              <p>
                Hanuman is on Arjuna&apos;s chariot at Kurukshetra. In the Bhagavad Gita, Arjuna is called kapi-dhvaja, the one whose
                banner bears the vanara, as he lifts his bow just before the dialogue with Krishna begins.{' '}
                <a className="hc-gita" href="/gita/chapter/1/verse/20" data-mp-location="hub_gita_1_20">
                  Read Bhagavad Gita 1.20
                </a>
              </p>
            </div>
          </div>

          <h2 className="hc-h2 rv" id="hc-more-h" style={{ marginTop: 56 }}>
            Reciting it
          </h2>
          <ul className="hc-tiles" aria-labelledby="hc-more-h" data-stagger="60">
            <li className="rv">
              <a className="hc-tile" href={HOW_MANY_PATH} data-mp-location="hub_how_many">
                <strong>How many times to recite it</strong>
                <span>Once, 11, 21, 108, or a 40-day vow</span>
              </a>
            </li>
            <li className="rv">
              <a className="hc-tile" href={JAYANTI_PATH} data-mp-location="hub_jayanti">
                <strong>Hanuman Jayanti, 20 April 2027</strong>
                <span>A one-week family plan</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <Faq items={FAQ} locale="en" heading="Questions people ask" />

      <section className="section section-alt hc-band">
        <div className="wrap hc-col">
          <HcNextStep locale="en" pageName={PAGE} pageKey="hc-hub" placement="hub_end" />
          <Sources locale="en" />
        </div>
      </section>
    </main>
  )
}
