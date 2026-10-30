import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import FxHero from '@/components/funnels/other-gitas/FxHero'
import FxSources from '@/components/funnels/other-gitas/FxSources'
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

  const first = verses[0]

  return (
    <FxFrame pageKey={pageKey}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main>
        <FxHero
          crumbs={[{ label: 'Ashtavakra Gita', href: HUB_PATH }, { label: `Chapter ${n}` }]}
          eyebrow={`Chapter ${n} of 20`}
          title={
            <>
              Ashtavakra Gita chapter {n}: {ch.title}
            </>
          }
          facts={[`${ch.count} verses`, speakerLabel(ch.speaker), 'Sanskrit and plain English']}
          cta={{ href: `#v${first.v}`, label: `Read from verse ${n}.${first.v}`, location: `ag_ch_${n}_hero_start` }}
          art={
            <div className="og-hero-verse" aria-hidden="true">
              <p className="og-hero-ref">
                Verse {n}.{first.v}
              </p>
              <VerseLines verse={first} />
              <hr className="og-rule" />
            </div>
          }
        />

        <section className="og-intro">
          <div className="wrap og-col">
            <div className="og-prose">
              <p id="quick-answer" className="og-lead">
                {quick(n)}
              </p>
            </div>
          </div>
        </section>

        <section className="section" aria-labelledby="all-verses">
          <div className="wrap og-col">
            <div className="og-list-head">
              <div className="og-head">
                <h2 className="heading" id="all-verses">
                  All {ch.count} verses
                </h2>
              </div>
              <ScriptToggle page={pageKey} />
            </div>
            <ol className="og-vlist">
              {verses.map((x) => (
                <li key={x.id} id={`v${x.v}`} className="og-vcard rv">
                  <div className="og-vcard-head">
                    <a className="og-vcard-ref" href={agVersePath(x.c, x.v)}>
                      {x.c}.{x.v}
                    </a>
                    {isIndexable(x) && (
                      <a className="og-vcard-tag" href={agVersePath(x.c, x.v)}>
                        Word meanings and notes
                      </a>
                    )}
                  </div>
                  <VerseLines verse={x} />
                  <hr className="og-rule" aria-hidden="true" />
                </li>
              ))}
            </ol>

            <nav className="gita-pn og-pn-ch" aria-label="Previous and next chapter">
              {prev ? (
                <a
                  className="gita-pn-link"
                  href={agChapterPath(prev.n)}
                  data-fx-event="Verse Nav Clicked"
                  data-fx-props={JSON.stringify({ direction: 'prev', from: `ch${n}`, to: `ch${prev.n}` })}
                >
                  <div className="gita-pn-label">← Chapter {prev.n}</div>
                  <div className="gita-pn-target">{prev.title}</div>
                </a>
              ) : (
                <span />
              )}
              {next && (
                <a
                  className="gita-pn-link right"
                  href={agChapterPath(next.n)}
                  data-fx-event="Verse Nav Clicked"
                  data-fx-props={JSON.stringify({ direction: 'next', from: `ch${n}`, to: `ch${next.n}` })}
                >
                  <div className="gita-pn-label">Chapter {next.n} →</div>
                  <div className="gita-pn-target">{next.title}</div>
                </a>
              )}
            </nav>
          </div>
        </section>

        <NextBand pageKey={pageKey} />

        <FxSources>
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </FxSources>
      </main>
    </FxFrame>
  )
}
