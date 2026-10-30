import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import {
  agChapterPath,
  agVersePath,
  chapterVerses,
  getChapter,
  getChapters,
  HUB_PATH,
  isIndexable,
  speakerLabel,
} from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import { articleLd, breadcrumbLd, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

type Params = { chapter: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getChapters().map((c) => ({ chapter: String(c.n) }))
}

function quick(n: number): string {
  const ch = getChapter(n)!
  const who = n === 1 ? 'King Janaka asks one question and Ashtavakra answers' : `${speakerLabel(ch.speaker)} speaks`
  return `Chapter ${n} of the Ashtavakra Gita, "${ch.title}", has ${ch.count} verses. ${who}. ${ch.gist} Every verse is below in Sanskrit and in Wisdom's plain English.`
}

export function generateMetadata({ params }: { params: Params }): Metadata {
  const ch = getChapter(Number(params.chapter))
  if (!ch) return { title: 'Chapter not found' }
  const title = `Ashtavakra Gita Chapter ${ch.n}: ${ch.title}, all ${ch.count} verses`
  const t = title.length <= 60 ? title : `Ashtavakra Gita Chapter ${ch.n}: all ${ch.count} verses`
  const d = `All ${ch.count} verses of Ashtavakra Gita chapter ${ch.n} in Sanskrit (Devanagari or IAST) and plain English. ${ch.gist}`
  return pageMeta({ path: agChapterPath(ch.n), title: t, description: d.length <= 155 ? d : `${d.slice(0, d.lastIndexOf(' ', 151))}...` })
}

export default function AshtavakraChapterPage({ params }: { params: Params }) {
  const n = Number(params.chapter)
  const ch = getChapter(n)
  if (!ch) notFound()
  const verses = chapterVerses(n)
  const pageKey = `ag-ch-${n}`
  const path = agChapterPath(n)
  const prev = getChapter(n - 1)
  const next = getChapter(n + 1)

  const ld = [
    breadcrumbLd([
      { name: 'Ashtavakra Gita', path: HUB_PATH },
      { name: `Chapter ${n}`, path },
    ]),
    articleLd({ path, headline: `Ashtavakra Gita chapter ${n}: ${ch.title}`, description: ch.gist, about: 'Ashtavakra Gita' }),
  ]

  return (
    <FxFrame pageKey={pageKey}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main className="fx-main">
        <nav className="fx-crumb" aria-label="Breadcrumb">
          <a href={HUB_PATH}>Ashtavakra Gita</a>
          <span aria-hidden="true">/</span>
          <span>Chapter {n}</span>
        </nav>
        <h1 className="fx-h1">
          Ashtavakra Gita chapter {n}: {ch.title}
        </h1>
        <p id="quick-answer" className="fx-quick">
          {quick(n)}
        </p>
        <hr className="fx-rule" aria-hidden="true" />
        <ScriptToggle page={pageKey} />

        <h2 className="fx-h2">All {ch.count} verses</h2>
        <ol style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          {verses.map((x) => (
            <li key={x.id} id={`v${x.v}`} className="fx-verse">
              <div className="fx-verse-head">
                <a href={agVersePath(x.c, x.v)}>
                  {x.c}.{x.v}
                </a>
                <span className="fx-small">{isIndexable(x) ? 'Word meanings and notes' : ''}</span>
              </div>
              <VerseLines verse={x} />
            </li>
          ))}
        </ol>

        <nav className="fx-pn" aria-label="Previous and next chapter">
          {prev && (
            <a href={agChapterPath(prev.n)} data-fx-event="Verse Nav Clicked" data-fx-props={JSON.stringify({ direction: 'prev', from: `ch${n}`, to: `ch${prev.n}` })}>
              <small>Chapter {prev.n}</small>
              {prev.title}
            </a>
          )}
          {next && (
            <a className="fx-next" href={agChapterPath(next.n)} data-fx-event="Verse Nav Clicked" data-fx-props={JSON.stringify({ direction: 'next', from: `ch${n}`, to: `ch${next.n}` })}>
              <small>Chapter {next.n}</small>
              {next.title}
            </a>
          )}
        </nav>

        <NextBand pageKey={pageKey} />

        <section className="fx-sources">
          <h2 className="fx-h3">Sources and method</h2>
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </section>
      </main>
    </FxFrame>
  )
}
