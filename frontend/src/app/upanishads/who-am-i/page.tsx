import Shell, { Band, GitaBridge, Head, HeroLine, SourcesNote, UpNext } from '@/components/funnels/upanishads/Shell'
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
  const kena = passage(WHO_AM_I[0].passage)
  const first = (x: string, cut: string) => x.split('\n')[0].replace(/^(ॐ|oṃ)\s+/u, '').split(cut)[0]
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
      hero={{
        eyebrow: '7-verse reading plan',
        title: 'Who am I: seven lines from the Upanishads',
        sub: 'Seven lines on who you are. One each morning.',
        facts: ['7 days', 'Seven Upanishads', 'About 5 min a day'],
        cta: { href: '#day-1', label: 'Read day 1', loc: 'plan_hero_day1' },
        visual: (
          <HeroLine
            sa={first(kena.sa, ' केन प्राणः')}
            iast={first(kena.iast, ' kena prāṇaḥ')}
            meaning={WHO_AM_I[0].en.split('? ')[0] + '?'}
            cite={WHO_AM_I[0].ref}
          />
        ),
      }}
    >
      <PlanTracker page={PAGE} locale="en" />
      <Band labelledBy="days">
        <p id="quick-answer" className="tp-intro rv">
          This plan takes the question &quot;who am I&quot; through seven Upanishads, one line a day: Kena 1.1, Mundaka 3.1.1, Katha 1.2.18, Isha 6,
          Mandukya 2, Chandogya 6.8.7 and Brihadaranyaka 1.4.10. Each day gives the Sanskrit, a plain English line and one small thing to notice. It
          takes about five minutes.
        </p>
        <h2 id="days" className="tp-h2 rv">
          The seven days
        </h2>
        <div className="fx-plan" data-stagger="60">
          {WHO_AM_I.map((d) => {
            const p = passage(d.passage)
            return (
              <details key={d.day} data-plan-day={d.day} open={d.day === 1} id={`day-${d.day}`} className="rv">
                <summary>
                  <span className="d-n">Day {d.day}</span>
                  <span className="d-t">{d.title}</span>
                </summary>
                <div className="d-body">
                  <div className="tp-verse">
                    <p className="fx-v-ref-plain">{d.ref}</p>
                    <Sanskrit sa={p.sa} iast={p.iast} size="small" />
                    <p className="fx-v-en">{d.en}</p>
                  </div>
                  <div className="tp-today d-sit">
                    <p>{d.sit}</p>
                  </div>
                  {d.gita && <GitaBridge c={d.gita.c} v={d.gita.v} note={d.gita.note} lead="Read next to" />}
                  {d.href && (
                    <p>
                      <a href={d.href} className="fx-link" data-mp-location={`plan_day_${d.day}_source`}>
                        Read it in its place
                      </a>
                    </p>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      </Band>

      <UpNext locale="en" pageName={PAGE} pageKey={PAGE} placement="plan-end" heading="Keep one line each morning" />

      <Band labelledBy="after">
        <Head id="after">After the seven days</Head>
        <div className="fx-prose rv">
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
        </div>
      </Band>

      <SourcesNote heading="Sources and method">
        <p>
          {SOURCES_NOTE_EN} Kena 1.1 is not in our corpus and was imported from the sanskritdocuments.org edition.
        </p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </Shell>
  )
}
