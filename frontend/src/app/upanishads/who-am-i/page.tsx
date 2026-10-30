import Shell, { GitaBridge, SourcesNote, UpNext } from '@/components/funnels/upanishads/Shell'
import Sanskrit from '@/components/funnels/upanishads/Sanskrit'
import PlanTracker from '@/components/funnels/upanishads/PlanTracker'
import { articleLd, passage, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'
import { WHO_AM_I } from '@/content/funnels/upanishads/plan'

const PATH = '/upanishads/who-am-i'
const PAGE = 'upanishads-who-am-i'
const TITLE = 'Who Am I? A 7-Day Upanishad Reading Plan'
const DESC =
  'Seven lines from seven Upanishads on who you are, one a day: Kena, Mundaka, Katha, Isha, Mandukya, Chandogya, Brihadaranyaka. Sanskrit and plain English.'

export const metadata = upMeta({ title: TITLE, description: DESC, path: PATH, ogCard: 'up-na-jayate-mriyate' })

export default function Page() {
  const jsonLd = [
    articleLd({ headline: TITLE, description: DESC, path: PATH, citation: WHO_AM_I.map((d) => d.ref).join('; ') }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Who am I: seven lines from the Upanishads',
      itemListElement: WHO_AM_I.map((d) => ({ '@type': 'ListItem', position: d.day, name: `Day ${d.day}: ${d.title} (${d.ref})` })),
    },
  ]
  return (
    <Shell
      pageName={PAGE}
      locale="en"
      crumbs={[
        { name: 'Home', path: '/' },
        { name: 'Upanishads', path: '/upanishads' },
        { name: 'Who am I', path: PATH },
      ]}
      jsonLd={jsonLd}
    >
      <PlanTracker page={PAGE} locale="en" />
      <header>
        <h1>Who am I: seven lines from the Upanishads</h1>
        <p className="fx-lede" style={{ marginTop: 14 }}>
          Seven lines on who you are. One each morning.
        </p>
        <p id="quick-answer" className="fx-quick">
          This plan takes the question &quot;who am I&quot; through seven Upanishads, one line a day: Kena 1.1, Mundaka 3.1.1, Katha 1.2.18, Isha 6,
          Mandukya 2, Chandogya 6.8.7 and Brihadaranyaka 1.4.10. Each day gives the Sanskrit, a plain English line and one small thing to notice. It
          takes about five minutes.
        </p>
      </header>

      <section className="fx-sec" aria-labelledby="days">
        <h2 id="days">The seven days</h2>
        <div className="fx-plan">
          {WHO_AM_I.map((d) => {
            const p = passage(d.passage)
            return (
              <details key={d.day} data-plan-day={d.day} open={d.day === 1} id={`day-${d.day}`}>
                <summary>
                  <span className="d-n">Day {d.day}</span>
                  <span className="d-t">{d.title}</span>
                </summary>
                <div className="d-body">
                  <p className="fx-ref">{d.ref}</p>
                  <Sanskrit sa={p.sa} iast={p.iast} size="small" />
                  <p className="fx-v-en">{d.en}</p>
                  <p className="d-sit">{d.sit}</p>
                  {d.gita && <GitaBridge c={d.gita.c} v={d.gita.v} note={d.gita.note} lead="Read next to" />}
                  {d.href && (
                    <p>
                      <a href={d.href} data-mp-location={`plan_day_${d.day}_source`}>
                        Read it in its place
                      </a>
                    </p>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      </section>

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="plan-end" heading="Keep one line each morning" />

      <section className="fx-sec" aria-labelledby="after">
        <h2 id="after">After the seven days</h2>
        <p>
          Read the texts these lines come from, start to finish:{' '}
          <a href="/upanishads/isha" data-mp-location="plan_after_isha">
            Isha
          </a>
          ,{' '}
          <a href="/upanishads/katha" data-mp-location="plan_after_katha">
            Katha
          </a>{' '}
          and{' '}
          <a href="/upanishads/mandukya" data-mp-location="plan_after_mandukya">
            Mandukya
          </a>
          . Or take a week with the Gita:{' '}
          <a href="/start?ref=upanishads-who-am-i" data-mp-location="plan_after_start">
            start a 7-day Gita plan
          </a>
          .
        </p>
      </section>

      <SourcesNote heading="Sources and method">
        <p>
          {SOURCES_NOTE_EN} Kena 1.1 is not in our corpus and was imported from the sanskritdocuments.org edition.
        </p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </Shell>
  )
}
