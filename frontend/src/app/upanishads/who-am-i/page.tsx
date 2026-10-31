import PageTracker from '@/components/BlogTracker'
import { JsonLd, PageHero, Section, VerseCard } from '@/components/site'
import { Bridge, SourcesNote, UpNext } from '@/components/funnels/upanishads/parts'
import PlanTracker from '@/components/funnels/upanishads/PlanTracker'
import { articleLd, padas, passage, upMeta, DISCLOSURE_EN, SOURCES_NOTE_EN } from '@/lib/funnels/upanishads'
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
    <>
      <PageTracker pageName="Upanishads Plan" />
      <PlanTracker />
      <JsonLd data={jsonLd} />
      <PageHero
        crumbs={[
          { label: 'Upanishads', href: '/upanishads' },
          { label: 'Who am I', href: PATH },
        ]}
        eyebrow="7-verse reading plan"
        title="Who am I: seven lines from the Upanishads"
        sub="Read one line each morning for a week and carry the question of who you are into the day."
        facts={['7 days', 'Seven Upanishads', 'About 5 min a day']}
        actions={[{ href: '#day-1', label: 'Read day 1', location: 'plan_hero_day1' }]}
        verse={{
          original: padas(first(kena.sa, ' केन प्राणः')),
          iast: padas(first(kena.iast, ' kena prāṇaḥ')),
          meaning: WHO_AM_I[0].en.split('? ')[0] + '?',
          source: WHO_AM_I[0].ref,
        }}
      />

      <Section id="answer" width="narrow" spacing="tight">
        <p id="quick-answer" className="sx-intro rv">
          This plan takes the question &quot;who am I&quot; through seven Upanishads, one line a day: Kena 1.1, Mundaka 3.1.1, Katha 1.2.18, Isha 6,
          Mandukya 2, Chandogya 6.8.7 and Brihadaranyaka 1.4.10. Each day comes with one small thing to notice
          and takes about five minutes.
        </p>
      </Section>

      <Section id="days" tone="band" width="narrow" title="The seven days">
        <div className="up-plan" data-stagger="60">
          {WHO_AM_I.map((d) => {
            const p = passage(d.passage)
            return (
              <details key={d.day} data-plan-day={d.day} open={d.day === 1} id={`day-${d.day}`} className="rv">
                <summary>
                  <span className="up-plan-n">Day {d.day}</span>
                  <span className="up-plan-t">{d.title}</span>
                </summary>
                <div className="up-plan-body">
                  <VerseCard align="left" size="compact" framed={false} label={d.ref} original={padas(p.sa)} iast={padas(p.iast)} meaning={d.en} />
                  <div className="up-plan-sit">
                    <p>{d.sit}</p>
                  </div>
                  {d.gita && <Bridge c={d.gita.c} v={d.gita.v} note={d.gita.note} />}
                  {d.href && (
                    <p>
                      <a href={d.href} className="sx-link" data-mp-location={`plan_day_${d.day}_source`}>
                        Read it in its place
                      </a>
                    </p>
                  )}
                </div>
              </details>
            )
          })}
        </div>
      </Section>

      <UpNext locale="en" pageKey={PAGE} placement="plan-end" heading="Keep one line each morning" />

      <Section id="after" width="narrow" title="After the seven days">
        <div className="sx-prose rv">
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
      </Section>

      <SourcesNote heading="Sources and method">
        <p>
          {SOURCES_NOTE_EN} Kena 1.1 follows the sanskritdocuments.org edition.
        </p>
        <p>{DISCLOSURE_EN}</p>
      </SourcesNote>
    </>
  )
}
