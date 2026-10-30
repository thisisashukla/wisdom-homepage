import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import HoldStill from '@/components/funnels/other-gitas/HoldStill'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import BridgeLink from '@/components/funnels/other-gitas/BridgeLink'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import NextStep from '@/components/quotes/NextStep'
import {
  abs,
  agChapterPath,
  agVersePath,
  clip,
  getChapter,
  getVerse,
  getVerses,
  HUB_PATH,
  isIndexable,
  neighbours,
  speakerLabel,
  verseTitle,
} from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, FAMOUS, NEXT_COPY, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import { AG_CITATION, articleLd, breadcrumbLd, cardOg, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

type Params = { chapter: string; verse: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getVerses().map((x) => ({ chapter: String(x.c), verse: String(x.v) }))
}

const load = (p: Params) => getVerse(Number(p.chapter), Number(p.verse))

export function generateMetadata({ params }: { params: Params }): Metadata {
  const x = load(params)
  if (!x) return { title: 'Verse not found' }
  const ref = `${x.c}.${x.v}`
  const lead = `Ashtavakra Gita ${ref} in Sanskrit and plain English`
  const rest = isIndexable(x) ? ', with word meanings and commentary: ' : ': '
  const description = clip(`${lead}${rest}"${x.en}"`, 155)
  return pageMeta({
    path: agVersePath(x.c, x.v),
    title: verseTitle(x),
    description,
    index: isIndexable(x),
    image: FAMOUS.includes(ref) ? cardOg(x.id) : undefined,
  })
}

export default function AshtavakraVersePage({ params }: { params: Params }) {
  const x = load(params)
  if (!x) notFound()
  const ch = getChapter(x.c)
  if (!ch) notFound()
  const ref = `${x.c}.${x.v}`
  const pageKey = `ag-v-${x.c}-${x.v}`
  const path = agVersePath(x.c, x.v)
  const { prev, next } = neighbours(x.c, x.v)
  const full = isIndexable(x)
  const who = x.speaker === 'janaka' ? 'King Janaka, to Ashtavakra' : 'Ashtavakra, to King Janaka'

  const ld = [
    breadcrumbLd([
      { name: 'Ashtavakra Gita', path: HUB_PATH },
      { name: `Chapter ${x.c}`, path: agChapterPath(x.c) },
      { name: `Verse ${ref}`, path },
    ]),
    {
      '@context': 'https://schema.org',
      '@type': 'Quotation',
      text: x.en,
      url: abs(path),
      inLanguage: 'en',
      spokenByCharacter: { '@type': 'Person', name: speakerLabel(x.speaker) },
      isPartOf: AG_CITATION,
      citation: `Ashtavakra Gita ${ref}`,
    },
    ...(full
      ? [articleLd({ path, headline: `Ashtavakra Gita ${ref}: meaning and commentary`, description: x.notice ?? x.en, about: 'Ashtavakra Gita' })]
      : []),
  ]

  return (
    <FxFrame pageKey={pageKey}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main className="fx-main">
        <div data-fx-fade="">
          <nav className="fx-crumb" aria-label="Breadcrumb">
            <a href={HUB_PATH}>Ashtavakra Gita</a>
            <span aria-hidden="true">/</span>
            <a href={agChapterPath(x.c)}>Chapter {x.c}</a>
            <span aria-hidden="true">/</span>
            <span>Verse {ref}</span>
          </nav>
          <h1 className="fx-h1">Ashtavakra Gita {ref}</h1>
          <p id="quick-answer" className="fx-quick">
            {x.quick}
          </p>
          <ScriptToggle page={pageKey} />
        </div>

        <HoldStill
          verseRef={ref}
          page={pageKey}
          after={<NextStep funnel="other-gitas" locale="en" pageName={pageKey} pageKey={pageKey} placement="hold" copy={NEXT_COPY} />}
        >
          <p className="fx-ref">{who}</p>
          <VerseLines verse={x} />
        </HoldStill>

        <div data-fx-fade="">
          {full ? (
            <>
              <h2 className="fx-h2">What to notice</h2>
              <p className="fx-notice">{x.notice}</p>

              <h2 className="fx-h2">Word by word</h2>
              <dl className="fx-words">
                {x.words!.map((w) => (
                  <div key={w.w} style={{ display: 'contents' }}>
                    <dt lang="sa-Latn">{w.w}</dt>
                    <dd>{w.m}</dd>
                  </div>
                ))}
              </dl>

              <h2 className="fx-h2">Reading the verse</h2>
              <p className="fx-body">{x.commentary}</p>

              {x.bridge && (
                <>
                  <h2 className="fx-h2">
                    {x.bridge.kind === 'same' ? 'Same thread in the Bhagavad Gita' : 'Where the Bhagavad Gita differs'}
                  </h2>
                  <BridgeLink from={ref} bridge={x.bridge} />
                </>
              )}
            </>
          ) : (
            <p className="fx-small" style={{ marginTop: 32 }}>
              Word meanings and a note for this verse are still being written. Read it in context on the{' '}
              <a href={agChapterPath(x.c)}>chapter {x.c} page</a>, or start with the verses in{' '}
              <a href={HUB_PATH}>where to begin</a>.
            </p>
          )}

          <p className="fx-small" style={{ marginTop: 32 }}>
            Chapter {x.c}, {ch.title}: {ch.gist}
          </p>

          <nav className="fx-pn" aria-label="Previous and next verse">
            {prev && (
              <a
                href={agVersePath(prev.c, prev.v)}
                data-fx-event="Verse Nav Clicked"
                data-fx-props={JSON.stringify({ direction: 'prev', from: ref, to: `${prev.c}.${prev.v}` })}
              >
                <small>Previous</small>
                {prev.c}.{prev.v}
              </a>
            )}
            {next && (
              <a
                className="fx-next"
                href={agVersePath(next.c, next.v)}
                data-fx-event="Verse Nav Clicked"
                data-fx-props={JSON.stringify({ direction: 'next', from: ref, to: `${next.c}.${next.v}` })}
              >
                <small>Next</small>
                {next.c}.{next.v}
              </a>
            )}
          </nav>
        </div>

        <NextBand pageKey={pageKey} />
        <p className="fx-small" data-fx-fade="" style={{ marginTop: 14 }}>
          New to this text? <a href="/ashtavakra-gita/seven-mornings">Seven mornings with the Ashtavakra Gita</a> gives you one verse a day for a week.
        </p>

        <section className="fx-sources" data-fx-fade="">
          <h2 className="fx-h3">Sources and method</h2>
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </section>
      </main>
    </FxFrame>
  )
}
