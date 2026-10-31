import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, NextStep, PageHero, ScriptToggle, Section, VerseCard } from '@/components/site'
import DayDetails from '@/components/funnels/other-gitas/DayDetails'
import { startUrl } from '@/lib/app'
import { abs, agVersePath, getVerseByKey, HUB_PATH, verseCardOf } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, NEXT_COPY, PLAN, PLAN_QUICK, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import { articleLd, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE_KEY = 'ag-seven-mornings'
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
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Ashtavakra Gita Seven Mornings" />
      <main className="fx-og" lang="en">
        <PageHero
          crumbs={[
            { label: 'Ashtavakra Gita', href: HUB_PATH },
            { label: 'Seven mornings', href: PATH },
          ]}
          eyebrow="7-morning reading plan"
          title="Seven mornings with the Ashtavakra Gita"
          facts={['7 verses', 'About 3 minutes a morning']}
          actions={[{ href: '#day-1', label: 'Begin with day 1', location: 'ag_seven_mornings_hero_day_1' }]}
          verse={{ ...verseCardOf(d1.x), label: `Day 1, Ashtavakra Gita ${d1.key}` }}
        />

        <Section spacing="tight" width="narrow">
          <div className="sx-prose rv">
            <p id="quick-answer">{PLAN_QUICK}</p>
            <p>
              Read the Sanskrit aloud once, however slowly, then the English, and try the one small thing
              before the day gets busy.
            </p>
          </div>
        </Section>

        <Section id="the-week" track="plan_days" title="The seven mornings" width="narrow">
          <div className="og-list-tools">
            <ScriptToggle />
          </div>
          <ol className="og-days" data-stagger="60">
            {days.map((d) => (
              <li key={d.day} id={`day-${d.day}`} className="rv">
                <DayDetails className="og-day" day={d.day} open={d.day === 1}>
                  <summary>
                    <span className="og-day-node" aria-hidden="true">
                      {d.day}
                    </span>
                    <span>
                      <strong className="og-day-h">{d.title}</strong>
                      <em className="og-day-m">Day {d.day} · Ashtavakra Gita {d.key}</em>
                    </span>
                    <span className="og-day-x" aria-hidden="true">
                      +
                    </span>
                  </summary>
                  <div className="og-day-body">
                    <VerseCard as="div" size="compact" {...verseCardOf(d.x)} />
                    <div className="og-today">
                      <h3>This morning</h3>
                      <p>{d.practice}</p>
                    </div>
                    <p className="og-day-link">
                      <a href={agVersePath(d.x.c, d.x.v)}>Word meanings and notes for {d.key}</a>
                    </p>
                  </div>
                </DayDetails>
              </li>
            ))}
          </ol>
        </Section>

        <Section tone="band" track="after_plan" title="After the seventh morning" width="narrow">
          <div className="sx-prose rv">
            <p>
              If one of these verses stayed with you, read its chapter from the start. Chapter 1 is twenty verses and holds the
              whole teaching. If you would rather keep a line each morning, the Bhagavad Gita is the place most people go next,
              and you can have a week of it chosen for what you are going through.
            </p>
          </div>
        </Section>

        <Section track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={PAGE_KEY} placement="end" copy={NEXT_COPY} />
          </div>
          <p className="og-after-next">
            On a computer?{' '}
            <a href={startUrl({ ref: 'q-ag-seven-mornings-link' })} data-mp-location="ag_seven_mornings_start">
              Get a week of Gita readings by email
            </a>
            .
          </p>
        </Section>

        <Section tone="band" className="og-sources" title="Sources and method" width="narrow" spacing="tight">
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </Section>
      </main>
    </>
  )
}
