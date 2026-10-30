import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import FxHero from '@/components/funnels/other-gitas/FxHero'
import FxSources from '@/components/funnels/other-gitas/FxSources'
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

  const d1 = days[0]

  return (
    <FxFrame pageKey={PAGE}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main>
        <FxHero
          crumbs={[{ label: 'Ashtavakra Gita', href: HUB_PATH }, { label: 'Seven mornings' }]}
          eyebrow="7-morning reading plan"
          title="Seven mornings with the Ashtavakra Gita"
          facts={['7 verses', 'About 3 minutes a morning', 'Sanskrit and plain English']}
          cta={{ href: '#day-1', label: 'Begin with day 1', location: 'ag_seven_mornings_hero_day_1' }}
          art={
            <div className="og-hero-verse" aria-hidden="true">
              <p className="og-hero-ref">
                Day 1, Ashtavakra Gita {d1.key}
              </p>
              <VerseLines verse={d1.x} />
              <hr className="og-rule" />
            </div>
          }
        />

        <section className="og-intro">
          <div className="wrap og-col">
            <div className="og-prose">
              <p id="quick-answer" className="og-lead">
                {PLAN_QUICK}
              </p>
              <p>
                Read the Sanskrit aloud once, even slowly, even badly. Read the English. Try the one thing. That is the whole
                morning. Open a day to begin.
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="the-week">
          <div className="wrap og-col">
            <div className="og-list-head">
              <div className="og-head">
                <h2 className="heading" id="the-week">
                  The seven mornings
                </h2>
              </div>
              <ScriptToggle page={PAGE} />
            </div>
            <ol className="og-days" data-stagger="60">
              {days.map((d) => (
                <li key={d.day} id={`day-${d.day}`} className="rv">
                  <details className="og-day" data-fx-day={d.day} open={d.day === 1}>
                    <summary>
                      <span className="og-day-node" aria-hidden="true">
                        {d.day}
                      </span>
                      <span>
                        <strong className="og-day-h">
                          {d.title}
                        </strong>
                        <em className="og-day-m">Day {d.day} · Ashtavakra Gita {d.key}</em>
                      </span>
                      <span className="og-day-x" aria-hidden="true">
                        +
                      </span>
                    </summary>
                    <div className="og-day-body">
                      <div className="og-day-verse">
                        <VerseLines verse={d.x} />
                      </div>
                      <div className="tp-today">
                        <h3 className="tp-label">This morning</h3>
                        <p>{d.practice}</p>
                      </div>
                      <p className="og-day-link">
                        <a href={agVersePath(d.x.c, d.x.v)}>Word meanings and notes for {d.key}</a>
                      </p>
                    </div>
                  </details>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap og-col">
            <div className="og-head rv">
              <h2 className="heading">After the seventh morning</h2>
            </div>
            <div className="og-prose rv">
              <p>
                If one of these verses stayed with you, read its chapter from the start. Chapter 1 is twenty verses and holds the
                whole teaching. If you would rather keep a line each morning, the Bhagavad Gita is the place most people go next,
                and you can have a week of it chosen for what you are going through.
              </p>
            </div>
          </div>
        </section>

        <NextBand
          pageKey={PAGE}
          after={
            <>
              On a computer?{' '}
              <a href={startUrl({ ref: 'q-ag-seven-mornings-link' })} data-mp-location="ag_seven_mornings_start">
                Get a week of Gita readings by email
              </a>
              .
            </>
          }
        />

        <FxSources>
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </FxSources>
      </main>
    </FxFrame>
  )
}
