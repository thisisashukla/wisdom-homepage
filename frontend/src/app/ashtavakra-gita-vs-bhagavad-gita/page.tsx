import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import FxHero from '@/components/funnels/other-gitas/FxHero'
import FxFaq from '@/components/funnels/other-gitas/FxFaq'
import FxSources from '@/components/funnels/other-gitas/FxSources'
import { agVersePath, getVerseByKey, gitaVersePath, HUB_PATH } from '@/lib/funnels/other-gitas/data'
import { COMPARE_FAQ, COMPARE_QUICK, COMPARE_ROWS, DISCLOSURE, THREADS } from '@/lib/funnels/other-gitas/content'
import { articleLd, breadcrumbLd, faqLd, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE = 'ag-vs-bg'
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
    breadcrumbLd([
      { name: 'Ashtavakra Gita', path: HUB_PATH },
      { name: 'Ashtavakra Gita vs Bhagavad Gita', path: PATH },
    ]),
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
    faqLd(COMPARE_FAQ),
  ]

  return (
    <FxFrame pageKey={PAGE}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main>
        <FxHero
          crumbs={[{ label: 'Ashtavakra Gita', href: HUB_PATH }, { label: 'Compared with the Bhagavad Gita' }]}
          eyebrow="A comparison"
          title="Ashtavakra Gita and Bhagavad Gita, side by side"
          facts={['700 verses and 298 verses', 'Krishna and Arjuna', 'Ashtavakra and Janaka']}
          cta={{ href: '#at-a-glance', label: 'See the differences', location: 'ag_vs_bg_hero_glance' }}
          alt={{ href: '#start-where', label: 'Which to read first', location: 'ag_vs_bg_hero_start' }}
          art={
            <section className="og-hero-verse" aria-label="One verse that both texts would agree on">
              <ScriptToggle page={PAGE} />
              <p className="og-hero-ref">
                Ashtavakra Gita <a href={agVersePath(1, 11)}>1.11</a>, with its echo in{' '}
                <a
                  className="fx-gita-link"
                  href={gitaVersePath(17, 3)}
                  data-fx-event="Gita Bridge Tapped"
                  data-fx-props={JSON.stringify({ from: '1.11', to_ref: '17.3' })}
                >
                  Bhagavad Gita 17.3
                </a>
                :
              </p>
              <VerseLines verse={ag} />
              <hr className="og-rule" aria-hidden="true" />
            </section>
          }
        />

        <section className="og-intro">
          <div className="wrap og-col">
            <div className="og-prose">
              <p id="quick-answer" className="og-lead">
                {COMPARE_QUICK}
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="at-a-glance">
          <div className="wrap">
            <div className="og-head rv">
              <h2 className="heading">The two texts at a glance</h2>
            </div>
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
          </div>
        </section>

        <section className="section section-alt" id="start-where">
          <div className="wrap">
            <div className="og-head rv">
              <h2 className="heading">Who should start where</h2>
            </div>
            <div className="og-pair rv">
              <div className="og-pair-gita og-prose">
                <p className="og-pair-k">Bhagavad Gita</p>
                <p>
                  If something in your life is asking you to act, a decision, a duty, a loss, start with the{' '}
                  <a className="fx-gita-link" href="/gita">
                    Bhagavad Gita
                  </a>
                  . Its teaching grows out of Arjuna&apos;s situation, and most readers find themselves in it within a chapter.
                </p>
              </div>
              <div className="og-prose">
                <p className="og-pair-k">Ashtavakra Gita</p>
                <p>
                  If you have read some Vedanta, if you sit for meditation, or if a line like &quot;as you hold yourself, so you
                  become&quot; stopped you, start with chapter 1 of the <a href={HUB_PATH}>Ashtavakra Gita</a>. It is twenty
                  verses, and it holds the whole text.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="wrap og-col">
            <div className="og-head rv">
              <h2 className="heading">Where they share a thread</h2>
            </div>
            <ul className="og-rows" data-stagger="60">
              {THREADS.map((t) => {
                const [c, v] = t.ag.split('.').map(Number)
                return (
                  <li key={t.ag} className="og-thread rv">
                    <p className="og-thread-line">{t.line}</p>
                    <p className="og-thread-refs">
                      <a className="og-chip" href={agVersePath(c, v)}>
                        Ashtavakra Gita {t.ag}
                      </a>
                      <span className="og-sr">{' and '}</span>
                      <a
                        className="og-chip is-gita"
                        href={gitaVersePath(t.c, t.v)}
                        data-fx-event="Gita Bridge Tapped"
                        data-fx-props={JSON.stringify({ from: t.ag, to_ref: `${t.c}.${t.v}` })}
                      >
                        Bhagavad Gita {t.c}.{t.v}
                      </a>
                    </p>
                  </li>
                )
              })}
            </ul>
          </div>
        </section>

        <section className="section section-alt">
          <div className="wrap og-col">
            <div className="og-head rv">
              <h2 className="heading">Questions people ask</h2>
            </div>
            <FxFaq items={COMPARE_FAQ} />
          </div>
        </section>

        <NextBand pageKey={PAGE} />

        <FxSources>
          <p>
            Bhagavad Gita facts follow the Mahabharata&apos;s Bhishma Parva and our own verse pages. Ashtavakra Gita facts
            follow the common Sanskrit text of 20 chapters and 298 verses; dates are given as the range scholars propose.
            All English here is Wisdom&apos;s own.
          </p>
          <p>{DISCLOSURE}</p>
        </FxSources>
      </main>
    </FxFrame>
  )
}
