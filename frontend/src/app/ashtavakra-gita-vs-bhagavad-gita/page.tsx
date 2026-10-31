import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, NextStep, PageHero, Section } from '@/components/site'
import { agVersePath, getVerseByKey, gitaVersePath, HUB_PATH, verseCardOf } from '@/lib/funnels/other-gitas/data'
import { COMPARE_FAQ, COMPARE_QUICK, COMPARE_ROWS, DISCLOSURE, NEXT_COPY, THREADS } from '@/lib/funnels/other-gitas/content'
import { articleLd, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE_KEY = 'ag-vs-bg'
const PATH = '/ashtavakra-gita-vs-bhagavad-gita'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Ashtavakra Gita vs Bhagavad Gita: how they differ',
  description:
    'Ashtavakra Gita and Bhagavad Gita side by side: setting, speakers, length, path and who should start where, with the verses they share.',
})

export default function CompareGitasPage() {
  const ag = getVerseByKey('1.11')!
  const ld = [
    articleLd({
      path: PATH,
      headline: 'Ashtavakra Gita vs Bhagavad Gita',
      description: COMPARE_QUICK,
      about: 'Ashtavakra Gita and Bhagavad Gita',
      citation: [
        { '@type': 'CreativeWork', name: 'Ashtavakra Gita (Ashtavakra Samhita)', inLanguage: 'sa' },
        { '@type': 'CreativeWork', name: 'Bhagavad Gita, Mahabharata, Bhishma Parva', inLanguage: 'sa' },
      ],
    }),
  ]

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Ashtavakra Bhagavad Gita Comparison" />
      <main className="fx-og" lang="en">
        <PageHero
          crumbs={[
            { label: 'Ashtavakra Gita', href: HUB_PATH },
            { label: 'Compared with the Bhagavad Gita', href: PATH },
          ]}
          eyebrow="A comparison"
          title="Ashtavakra Gita and Bhagavad Gita, side by side"
          facts={['700 verses and 298 verses', 'Krishna and Arjuna', 'Ashtavakra and Janaka']}
          actions={[
            { href: '#at-a-glance', label: 'See the differences', location: 'ag_vs_bg_hero_glance' },
            { href: '#start-where', label: 'Which to read first', location: 'ag_vs_bg_hero_start' },
          ]}
          verse={{
            ...verseCardOf(ag),
            label: (
              <>
                Ashtavakra Gita <a href={agVersePath(1, 11)}>1.11</a>, with its echo in{' '}
                <GitaBridge variant="inline" href={gitaVersePath(17, 3)} location="ag_vs_bg_hero" from="1.11" label="Bhagavad Gita 17.3" />:
              </>
            ),
          }}
        />

        <Section spacing="tight" width="narrow">
          <div className="sx-prose rv">
            <p id="quick-answer">{COMPARE_QUICK}</p>
          </div>
        </Section>

        <Section id="at-a-glance" track="at_a_glance" title="The two texts at a glance">
          <div className="og-table-wrap rv">
            <table className="og-table">
              <thead>
                <tr>
                  <th scope="col">Compare</th>
                  <th scope="col">Bhagavad Gita</th>
                  <th scope="col">Ashtavakra Gita</th>
                </tr>
              </thead>
              <tbody>
                {COMPARE_ROWS.map((r) => (
                  <tr key={r.label}>
                    <th scope="row">{r.label}</th>
                    <td data-col="Bhagavad Gita">{r.bg}</td>
                    <td data-col="Ashtavakra Gita">{r.ag}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section tone="band" id="start-where" track="start_where" title="Who should start where">
          <div className="og-pair rv">
            <div className="og-pair-gita sx-prose">
              <p className="og-pair-k">Bhagavad Gita</p>
              <p>
                If something in your life is asking you to act, a decision, a duty, a loss, start with the{' '}
                <GitaBridge variant="inline" href="/gita" location="ag_vs_bg_start_where" label="Bhagavad Gita" />
                . Its teaching grows out of Arjuna&apos;s situation, and most readers find themselves in it within a chapter.
              </p>
            </div>
            <div className="sx-prose">
              <p className="og-pair-k">Ashtavakra Gita</p>
              <p>
                If you have read some Vedanta, if you sit for meditation, or if a line like &quot;as you hold yourself, so you
                become&quot; stopped you, start with chapter 1 of the <a href={HUB_PATH}>Ashtavakra Gita</a>. It is twenty
                verses, and it holds the whole text.
              </p>
            </div>
          </div>
        </Section>

        <Section track="threads" title="Where they share a thread" width="narrow">
          <ul className="og-threads" data-stagger="60">
            {THREADS.map((t) => {
              const [c, v] = t.ag.split('.').map(Number)
              return (
                <li key={t.ag} className="og-thread rv">
                  <p className="og-thread-line">{t.line}</p>
                  <p className="og-thread-refs">
                    <a href={agVersePath(c, v)}>Ashtavakra Gita {t.ag}</a>
                    <span className="og-sr">{' and '}</span>
                    <GitaBridge variant="inline" href={gitaVersePath(t.c, t.v)} location="ag_vs_bg_threads" from={t.ag} label={`Bhagavad Gita ${t.c}.${t.v}`} />
                  </p>
                </li>
              )
            })}
          </ul>
        </Section>

        <Section tone="band" track="faq" title="Questions people ask" width="narrow">
          <Faq items={COMPARE_FAQ} />
        </Section>

        <Section track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={PAGE_KEY} placement="end" copy={NEXT_COPY} />
          </div>
        </Section>

        <Section tone="band" className="og-sources" title="Sources and method" width="narrow" spacing="tight">
          <p>
            Bhagavad Gita facts follow the Mahabharata&apos;s Bhishma Parva and our own verse pages. Ashtavakra Gita facts
            follow the common Sanskrit text of 20 chapters and 298 verses; dates are given as the range scholars propose.
            All English here is Wisdom&apos;s own.
          </p>
          <p>{DISCLOSURE}</p>
        </Section>
      </main>
    </>
  )
}
