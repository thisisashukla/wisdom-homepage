import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import {
  abs,
  agChapterPath,
  agVersePath,
  getChapters,
  getVerseByKey,
  HUB_PATH,
  TOTAL_VERSES,
} from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, FAMOUS, HUB_FAQ, HUB_QUICK, SOURCES_NOTE, START_HERE } from '@/lib/funnels/other-gitas/content'
import { articleLd, breadcrumbLd, cardOg, faqLd, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE = 'ag-hub'

export const metadata: Metadata = pageMeta({
  path: HUB_PATH,
  title: 'Ashtavakra Gita: all 20 chapters in Sanskrit and English',
  description:
    'All 298 verses of the Ashtavakra Gita, the dialogue of Ashtavakra and King Janaka, in Sanskrit and plain English, with where to start.',
  image: cardOg('ag-1-11'),
})

export default function AshtavakraHubPage() {
  const chapters = getChapters()
  const hero = getVerseByKey('1.11')!
  const famous = FAMOUS.slice(0, 6).map((k) => getVerseByKey(k)!)
  const ld = [
    breadcrumbLd([{ name: 'Ashtavakra Gita', path: HUB_PATH }]),
    articleLd({ path: HUB_PATH, headline: 'Ashtavakra Gita: all 20 chapters in Sanskrit and English', description: HUB_QUICK, about: 'Ashtavakra Gita' }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ashtavakra Gita chapters',
      numberOfItems: chapters.length,
      itemListElement: chapters.map((c) => ({
        '@type': 'ListItem',
        position: c.n,
        name: `Chapter ${c.n}: ${c.title}`,
        url: abs(agChapterPath(c.n)),
      })),
    },
    faqLd(HUB_FAQ),
  ]

  return (
    <FxFrame pageKey={PAGE}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main className="fx-main">
        <h1 className="fx-h1">Ashtavakra Gita</h1>
        <p id="quick-answer" className="fx-quick">
          {HUB_QUICK}
        </p>

        <section aria-label="Ashtavakra Gita 1.11" style={{ marginTop: 32 }}>
          <ScriptToggle page={PAGE} />
          <p className="fx-ref" style={{ marginTop: 22 }}>
            The line people know, <a href={agVersePath(1, 11)}>1.11</a>, Ashtavakra to Janaka:
          </p>
          <VerseLines verse={hero} />
          <hr className="fx-rule" aria-hidden="true" />
        </section>

        <p className="fx-body">
          The whole text is one conversation. A king who has everything asks how to be free. A young sage, named for the
          eight bends in his body, tells him he already is: he is the witness of body and mind, and bondage is only the
          belief that he is bound. Janaka sees it, and spends the rest of the text testing it against wealth, desire,
          practice and death. There is almost no ritual, no story and no instruction to do anything. That is why some
          readers find it bare, and others carry one line from it for years.
        </p>

        <h2 className="fx-h2">Where to start</h2>
        <ul className="fx-list">
          {START_HERE.map((s) => (
            <li key={s.key}>
              <a className="fx-row" href={agVersePath(Number(s.key.split('.')[0]), Number(s.key.split('.')[1]))}>
                <span className="fx-row-n">{s.key}</span>
                <span className="fx-row-t">
                  <strong>{getVerseByKey(s.key)!.en}</strong>
                  <em>{s.why}</em>
                </span>
              </a>
            </li>
          ))}
        </ul>
        <p className="fx-small" style={{ marginTop: 14 }}>
          Want one a day? <a href="/ashtavakra-gita/seven-mornings">Seven mornings with the Ashtavakra Gita</a>.
        </p>

        <h2 className="fx-h2">The lines people quote</h2>
        <ul className="fx-list">
          {famous.map((x) => (
            <li key={x.id}>
              <a className="fx-row" href={agVersePath(x.c, x.v)}>
                <span className="fx-row-n">
                  {x.c}.{x.v}
                </span>
                <span className="fx-row-t">{x.en}</span>
              </a>
            </li>
          ))}
        </ul>
        <p className="fx-small" style={{ marginTop: 14 }}>
          <a href="/ashtavakra-gita/quotes">All twenty, as cards you can copy or share</a>
        </p>

        <h2 className="fx-h2">The 20 chapters</h2>
        <p className="fx-small">
          {TOTAL_VERSES} verses. Janaka asks in 1.1; Ashtavakra teaches most chapters; Janaka answers in chapters 2, 4, 6, 7,
          12, 13, 14, 19 and 20. Chapter titles here are our own plain descriptions.
        </p>
        <ol className="fx-list">
          {chapters.map((c) => (
            <li key={c.n}>
              <a className="fx-row" href={agChapterPath(c.n)}>
                <span className="fx-row-n">{c.n}</span>
                <span className="fx-row-t">
                  <strong>{c.title}</strong>
                  {c.gist} <em>{c.count} verses</em>
                </span>
              </a>
            </li>
          ))}
        </ol>

        <h2 className="fx-h2">Next to the Bhagavad Gita</h2>
        <p className="fx-body">
          The Bhagavad Gita teaches through a crisis on a battlefield and joins action, devotion and knowledge. The
          Ashtavakra Gita has no crisis and keeps to knowledge alone. Most readers start with the{' '}
          <a className="fx-gita-link" href="/gita">
            Bhagavad Gita
          </a>
          .{' '}
          <a href="/ashtavakra-gita-vs-bhagavad-gita">Compare the two side by side</a>, or see the{' '}
          <a href="/gitas">other Gitas in Hindu tradition</a>.
        </p>

        <h2 className="fx-h2">Questions people ask</h2>
        <dl className="fx-faq">
          {HUB_FAQ.map((f) => (
            <div key={f.q}>
              <dt>{f.q}</dt>
              <dd>{f.a}</dd>
            </div>
          ))}
        </dl>

        <NextBand pageKey={PAGE} />

        <section className="fx-sources">
          <h2 className="fx-h3">Sources and method</h2>
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </section>
      </main>
    </FxFrame>
  )
}
