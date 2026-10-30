import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
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
      <main className="fx-main">
        <nav className="fx-crumb" aria-label="Breadcrumb">
          <a href={HUB_PATH}>Ashtavakra Gita</a>
          <span aria-hidden="true">/</span>
          <span>Compared with the Bhagavad Gita</span>
        </nav>
        <h1 className="fx-h1">Ashtavakra Gita and Bhagavad Gita, side by side</h1>
        <p id="quick-answer" className="fx-quick">
          {COMPARE_QUICK}
        </p>

        <section aria-label="One verse that both texts would agree on" style={{ marginTop: 28 }}>
          <ScriptToggle page={PAGE} />
          <p className="fx-ref" style={{ marginTop: 22 }}>
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
          <hr className="fx-rule" aria-hidden="true" />
        </section>

        <h2 className="fx-h2">The two texts at a glance</h2>
        <div className="fx-table-wrap">
          <table className="fx-table">
            <thead>
              <tr>
                <th scope="col">
                  <span className="fx-small">Compare</span>
                </th>
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

        <h2 className="fx-h2">Who should start where</h2>
        <p className="fx-body">
          If something in your life is asking you to act, a decision, a duty, a loss, start with the{' '}
          <a className="fx-gita-link" href="/gita">
            Bhagavad Gita
          </a>
          . Its teaching grows out of Arjuna&apos;s situation, and most readers find themselves in it within a chapter.
        </p>
        <p className="fx-body">
          If you have read some Vedanta, if you sit for meditation, or if a line like &quot;as you hold yourself, so you
          become&quot; stopped you, start with chapter 1 of the{' '}
          <a href={HUB_PATH}>Ashtavakra Gita</a>. It is twenty verses, and it holds the whole text.
        </p>

        <h2 className="fx-h2">Where they share a thread</h2>
        <ul className="fx-list">
          {THREADS.map((t) => {
            const [c, v] = t.ag.split('.').map(Number)
            return (
              <li key={t.ag} style={{ padding: '16px 0' }}>
                <p className="fx-body" style={{ marginBottom: 8 }}>
                  {t.line}
                </p>
                <p className="fx-small" style={{ margin: 0 }}>
                  <a href={agVersePath(c, v)}>Ashtavakra Gita {t.ag}</a>
                  {' and '}
                  <a
                    className="fx-gita-link"
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

        <h2 className="fx-h2">Questions people ask</h2>
        <dl className="fx-faq">
          {COMPARE_FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <NextBand pageKey={PAGE} />

        <section className="fx-sources">
          <h2 className="fx-h3">Sources and method</h2>
          <p>
            Bhagavad Gita facts follow the Mahabharata&apos;s Bhishma Parva and our own verse pages. Ashtavakra Gita facts
            follow the common Sanskrit text of 20 chapters and 298 verses; dates are given as the range scholars propose.
            All English here is Wisdom&apos;s own.
          </p>
          <p>{DISCLOSURE}</p>
        </section>
      </main>
    </FxFrame>
  )
}
