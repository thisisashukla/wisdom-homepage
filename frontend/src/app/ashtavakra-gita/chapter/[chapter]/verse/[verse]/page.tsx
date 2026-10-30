import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import HoldStill from '@/components/funnels/other-gitas/HoldStill'
import ScriptToggle from '@/components/funnels/other-gitas/ScriptToggle'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import BridgeLink from '@/components/funnels/other-gitas/BridgeLink'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import FxSources from '@/components/funnels/other-gitas/FxSources'
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
import { DISCLOSURE, FAMOUS, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
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
      <main className="og-main">
        <div data-fx-fade="">
          <nav className="gita-crumb" aria-label="Breadcrumb">
            <a href={HUB_PATH}>Ashtavakra Gita</a>
            <span className="sep" aria-hidden="true">›</span>
            <a href={agChapterPath(x.c)}>
              Chapter {x.c}: {ch.title}
            </a>
            <span className="sep" aria-hidden="true">›</span>
            <span>Verse {ref}</span>
          </nav>
          <header className="gv-hero-head">
            <div className="gv-hero-eyebrow">The verse</div>
            <h1 className="gita-h1 gv-hero-h1">
              Ashtavakra Gita {ref}
              <span className="og-h1-sub">
                Chapter {x.c}, Verse {x.v}
              </span>
            </h1>
            <div className="gv-hero-badges">
              <span className="gv-hero-pill">{speakerLabel(x.speaker)}</span>
            </div>
            <p id="quick-answer" className="og-quick">
              {x.quick}
            </p>
          </header>
        </div>

        <HoldStill
          verseRef={ref}
          page={pageKey}
          after={<NextBand pageKey={pageKey} placement="hold" bare />}
        >
          <span className="gv-card-chip">The verse</span>
          <div className="gv-diamonds" aria-hidden="true">
            <i />
            <i />
            <i />
          </div>
          <ScriptToggle page={pageKey} />
          <VerseLines verse={x} keep />
          <p className="og-speaker">{who}</p>
          <hr className="og-rule fx-keep" aria-hidden="true" />
          <div className="gv-card-attrib">Ashtavakra Gita · {ref}</div>
        </HoldStill>

        <div data-fx-fade="">
          {full ? (
            <>
              <section className="og-sec rv">
                <h2 className="gv-sechead">
                  <span className="gv-sechead-label">What to notice</span>
                </h2>
                <div className="gv-insight">
                  <span className="gv-insight-icon" aria-hidden="true">
                    ✦
                  </span>
                  <p>{x.notice}</p>
                </div>
              </section>

              <section className="og-sec rv">
                <h2 className="gv-sechead">
                  <span className="gv-sechead-label">Word by word</span>
                </h2>
                <dl className="gv-wbw-flow">
                  {x.words!.map((w) => (
                    <div key={w.w} className="gv-word">
                      <dt className="gv-word-sa" lang="sa-Latn">
                        {w.w}
                      </dt>
                      <dd className="gv-word-en">{w.m}</dd>
                    </div>
                  ))}
                </dl>
              </section>

              <section className="og-sec rv">
                <div className="gv-cmnt">
                  <span className="gv-cmnt-ghost" aria-hidden="true">
                    {ref}
                  </span>
                  <div className="gv-cmnt-kicker">In plain words</div>
                  <h2 className="gv-cmnt-h">Reading the verse</h2>
                  <p className="gv-cmnt-p">{x.commentary}</p>
                </div>
              </section>

              {x.bridge && (
                <section className="og-sec rv">
                  <h2 className="gv-sechead">
                    <span className="gv-sechead-label">
                      {x.bridge.kind === 'same' ? 'Same thread in the Bhagavad Gita' : 'Where the Bhagavad Gita differs'}
                    </span>
                  </h2>
                  <BridgeLink from={ref} bridge={x.bridge} />
                </section>
              )}
            </>
          ) : (
            <section className="og-sec rv">
              <div className="og-pending">
                <p>
                  Word meanings and a note for this verse are still being written. Read it in context on the{' '}
                  <a href={agChapterPath(x.c)}>chapter {x.c} page</a>, or start with the verses in{' '}
                  <a href={HUB_PATH}>where to begin</a>.
                </p>
              </div>
            </section>
          )}

          <a href={agChapterPath(x.c)} className="og-chcard rv">
            <div className="og-chcard-top">
              <div className="og-chcard-k">Chapter {x.c} of 20</div>
              <div className="og-chcard-h">{ch.title}</div>
            </div>
            <div className="og-chcard-b">
              <p>
                Chapter {x.c}, {ch.title}: {ch.gist}
              </p>
              <span className="og-chcard-go">Read all {ch.count} verses in this chapter →</span>
            </div>
          </a>

          <nav className="gita-pn" aria-label="Previous and next verse">
            {prev ? (
              <a
                className="gita-pn-link"
                href={agVersePath(prev.c, prev.v)}
                data-fx-event="Verse Nav Clicked"
                data-fx-props={JSON.stringify({ direction: 'prev', from: ref, to: `${prev.c}.${prev.v}` })}
              >
                <div className="gita-pn-label">← Previous</div>
                <div className="gita-pn-target">
                  {prev.c}.{prev.v}
                </div>
              </a>
            ) : (
              <span />
            )}
            {next && (
              <a
                className="gita-pn-link right"
                href={agVersePath(next.c, next.v)}
                data-fx-event="Verse Nav Clicked"
                data-fx-props={JSON.stringify({ direction: 'next', from: ref, to: `${next.c}.${next.v}` })}
              >
                <div className="gita-pn-label">Next →</div>
                <div className="gita-pn-target">
                  {next.c}.{next.v}
                </div>
              </a>
            )}
          </nav>
        </div>

        <div className="og-verse-tail" data-fx-fade="">
          <NextBand pageKey={pageKey} bare />
          <p className="og-next-after">
            New to this text? <a href="/ashtavakra-gita/seven-mornings">Seven mornings with the Ashtavakra Gita</a> gives you one verse a day for a week.
          </p>
        </div>
      </main>

      <FxSources>
        <p>{SOURCES_NOTE}</p>
        <p>{DISCLOSURE}</p>
      </FxSources>
    </FxFrame>
  )
}
