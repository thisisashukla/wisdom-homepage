import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import { startUrl } from '@/lib/app'
import { abs, agVersePath, getVerseByKey, HUB_PATH } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, PLAN, PLAN_QUICK, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import { articleLd, breadcrumbLd, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE = 'ag-seven-mornings'
const PATH = '/ashtavakra-gita/seven-mornings'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Seven mornings with the Ashtavakra Gita: one verse a day',
  description:
    'A seven-day reading plan for the Ashtavakra Gita: one verse each morning in Sanskrit and plain English, with one small thing to try that day.',
})

export default function SevenMorningsPage() {
  const days = PLAN.map((d) => ({ ...d, x: getVerseByKey(d.key)! }))
  const ld = [
    breadcrumbLd([
      { name: 'Ashtavakra Gita', path: HUB_PATH },
      { name: 'Seven mornings', path: PATH },
    ]),
    articleLd({ path: PATH, headline: 'Seven mornings with the Ashtavakra Gita', description: PLAN_QUICK, about: 'Ashtavakra Gita' }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Seven mornings with the Ashtavakra Gita',
      numberOfItems: days.length,
      itemListElement: days.map((d) => ({
        '@type': 'ListItem',
        position: d.day,
        name: `Day ${d.day}: ${d.title} (Ashtavakra Gita ${d.key})`,
        url: abs(agVersePath(d.x.c, d.x.v)),
      })),
    },
  ]

  return (
    <FxFrame pageKey={PAGE}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main className="fx-main">
        <nav className="fx-crumb" aria-label="Breadcrumb">
          <a href={HUB_PATH}>Ashtavakra Gita</a>
          <span aria-hidden="true">/</span>
          <span>Seven mornings</span>
        </nav>
        <h1 className="fx-h1">Seven mornings with the Ashtavakra Gita</h1>
        <p id="quick-answer" className="fx-quick">
          {PLAN_QUICK}
        </p>
        <hr className="fx-rule" aria-hidden="true" />
        <p className="fx-body">
          Read the Sanskrit aloud once, even slowly, even badly. Read the English. Try the one thing. That is the whole
          morning. Open a day to begin.
        </p>
        <ScriptToggle page={PAGE} />

        <ol className="fx-days" style={{ marginTop: 20 }}>
          {days.map((d) => (
            <li key={d.day}>
              <details data-fx-day={d.day} open={d.day === 1}>
                <summary>
                  <span className="fx-row-n">{d.day}</span>
                  <span>
                    <strong>{d.title}</strong>
                    <em>Ashtavakra Gita {d.key}</em>
                  </span>
                </summary>
                <div className="fx-day-body">
                  <VerseLines verse={d.x} />
                  <h3 className="fx-h3">This morning</h3>
                  <p className="fx-body">{d.practice}</p>
                  <p className="fx-small" style={{ margin: 0 }}>
                    <a href={agVersePath(d.x.c, d.x.v)}>Word meanings and notes for {d.key}</a>
                  </p>
                </div>
              </details>
            </li>
          ))}
        </ol>

        <h2 className="fx-h2">After the seventh morning</h2>
        <p className="fx-body">
          If one of these verses stayed with you, read its chapter from the start. Chapter 1 is twenty verses and holds the
          whole teaching. If you would rather keep a line each morning, the Bhagavad Gita is the place most people go next,
          and you can have a week of it chosen for what you are going through.
        </p>

        <NextBand pageKey={PAGE} />
        <p className="fx-small" style={{ marginTop: 14 }}>
          On a computer? <a href={startUrl({ ref: 'q-ag-seven-mornings-link' })} data-mp-location="ag_seven_mornings_start">Get a week of Gita readings by email</a>.
        </p>

        <section className="fx-sources">
          <h2 className="fx-h3">Sources and method</h2>
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </section>
      </main>
    </FxFrame>
  )
}
