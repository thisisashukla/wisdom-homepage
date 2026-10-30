import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import LineText from '@/components/funnels/hanuman-chalisa/LineText'
import ScriptToggle from '@/components/funnels/hanuman-chalisa/ScriptToggle'
import { Faq, HcNextStep } from '@/components/funnels/hanuman-chalisa/Blocks'
import {
  abs,
  AUTHOR_LD,
  breadcrumbLd,
  chalisaWorkLd,
  COUNTER_PATH,
  editionCitation,
  faqLd,
  getUnit,
  HOW_MANY_PATH,
  HUB_PATH,
  JAYANTI_PATH,
  ldJson,
  linePath,
  pageMeta,
  PUBLISHER_LD,
  UPDATED,
  type HcUnit,
} from '@/lib/funnels/hanuman-chalisa'

const PAGE = 'hanuman-chalisa-how-many-times'

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

function Quoted({ u }: { u: HcUnit }) {
  return (
    <figure style={{ margin: '20px 0 0', maxWidth: 640 }}>
      <LineText awadhi={u.awadhi} iast={u.iast} as="blockquote" className="hc-line" />
      <figcaption className="hc-prose" style={{ marginTop: 6 }}>
        <p style={{ margin: 0 }}>
          {u.meaning.en}{' '}
          <a href={linePath(u.slug)} className="hc-small">
            {u.label.en}, word by word
          </a>
        </p>
      </figcaption>
    </figure>
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
  const crumbs = breadcrumbLd([
    { name: 'Wisdom', path: '/' },
    { name: 'Hanuman Chalisa', path: HUB_PATH },
    { name: 'How many times', path: HOW_MANY_PATH },
  ])

  return (
    <main className="hc-main">
      <BlogTracker pageName={PAGE} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ldJson([articleLd, crumbs, faqLd(FAQ)]) }} />
      <nav className="hc-crumbs" aria-label="Breadcrumb">
        <a href="/">Wisdom</a> / <a href={HUB_PATH}>Hanuman Chalisa</a> / <span>How many times</span>
      </nav>
      <h1 className="hc-h1">How many times to recite the Hanuman Chalisa</h1>
      <p className="hc-quick" id="quick-answer">
        The Hanuman Chalisa names one number itself: chaupai 38 says whoever recites it a hundred times is freed from bondage and
        finds great joy. Everything else is family custom: once a day, 7, 11 or 21 times on a Tuesday or Saturday, 108 times for one
        round of the mala, or once a day for 40 days.
      </p>
      <div className="hc-controls">
        <ScriptToggle locale="en" page={PAGE} />
      </div>

      <section className="hc-section" aria-labelledby="h-text">
        <h2 className="hc-h2" id="h-text">
          What the text says about itself
        </h2>
        <div className="hc-prose">
          <p>The last three chaupais are Tulsidas speaking about the hymn. The first gives the number a hundred.</p>
        </div>
        <Quoted u={c38} />
        <Quoted u={c39} />
        <Quoted u={c40} />
        <div className="hc-prose" style={{ marginTop: 20 }}>
          <p>
            Earlier lines promise help to anyone who keeps Hanuman in mind, with no count attached. Chaupai 26 is the plainest of them.
          </p>
        </div>
        <Quoted u={c26} />
        <div className="hc-prose" style={{ marginTop: 20 }}>
          <p>
            Rambhadracharya, in his Mahaviri commentary, reads chaupai 38 as &ldquo;jo śat bār&rdquo;, the same hundred. Some popular
            printings start it &ldquo;yah sat bār&rdquo;. The number does not change.
          </p>
        </div>
      </section>

      <section className="hc-section" aria-labelledby="h-trad">
        <h2 className="hc-h2" id="h-trad">
          What families keep
        </h2>
        <ul className="hc-dates">
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
        <ul className="hc-links">
          <li>
            <a className="hc-btn hc-btn-primary" href={COUNTER_PATH} data-mp-location="howmany_counter">
              Set a sankalp and count
            </a>
          </li>
          <li>
            <a className="hc-btn" href={JAYANTI_PATH} data-mp-location="howmany_jayanti">
              11 times for Hanuman Jayanti
            </a>
          </li>
        </ul>
      </section>

      <Faq items={FAQ} locale="en" heading="Questions people ask" />
      <HcNextStep locale="en" pageName={PAGE} pageKey="hc-how-many" placement="howmany_end" />
    </main>
  )
}
