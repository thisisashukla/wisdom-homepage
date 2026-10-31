import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, NextStep, PageHero, ScriptToggle, Section, VerseCard, VerseList } from '@/components/site'
import PrevNext from '@/components/funnels/other-gitas/PrevNext'
import { agChapterPath, agVersePath, chapterVerses, getChapter, getChapters, HUB_PATH, isIndexable, speakerLabel, verseCardOf } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, NEXT_COPY, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import { articleLd, pageMeta } from '@/lib/funnels/other-gitas/seo'

type Params = { chapter: string }

export const dynamicParams = false

export function generateStaticParams(): Params[] {
  return getChapters().map((c) => ({ chapter: String(c.n) }))
}

function quick(n: number): string {
  const ch = getChapter(n)!
  const who = n === 1 ? 'King Janaka asks one question and Ashtavakra answers' : `${speakerLabel(ch.speaker)} speaks`
  return `Chapter ${n} of the Ashtavakra Gita, "${ch.title}", has ${ch.count} verses. ${who}. ${ch.gist} Read it a few verses at a time.`
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
  const ld = articleLd({ path, headline: `Ashtavakra Gita chapter ${n}: ${ch.title}`, description: ch.gist, about: 'Ashtavakra Gita' })
  const first = verses[0]

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Ashtavakra Gita Chapter" />
      <main className="fx-og" lang="en">
        <PageHero
          crumbs={[
            { label: 'Ashtavakra Gita', href: HUB_PATH },
            { label: `Chapter ${n}`, href: path },
          ]}
          eyebrow={`Chapter ${n} of 20`}
          title={
            <>
              Ashtavakra Gita chapter {n}: {ch.title}
            </>
          }
          facts={[`${ch.count} verses`, speakerLabel(ch.speaker)]}
          actions={[{ href: `#v${first.v}`, label: `Read from verse ${n}.${first.v}`, location: `ag_ch_${n}_hero_start` }]}
          verse={{ ...verseCardOf(first), label: `Verse ${n}.${first.v}` }}
        />

        <Section spacing="tight" width="narrow">
          <div className="sx-prose rv">
            <p id="quick-answer">{quick(n)}</p>
          </div>
        </Section>

        <Section id="all-verses" track="verses" title={`All ${ch.count} verses`} width="narrow">
          <div className="og-list-tools">
            <ScriptToggle />
          </div>
          <VerseList className="og-vlist">
            {verses.map((x) => (
              <VerseCard
                key={x.id}
                as="li"
                id={`v${x.v}`}
                rv
                size="compact"
                {...verseCardOf(x)}
                source={`${x.c}.${x.v}`}
                sourceHref={agVersePath(x.c, x.v)}
              >
                {isIndexable(x) ? (
                  <p className="og-vtag-row">
                    <a className="og-vtag" href={agVersePath(x.c, x.v)}>
                      Word meanings and notes
                    </a>
                  </p>
                ) : undefined}
              </VerseCard>
            ))}
          </VerseList>

          <PrevNext
            label="Previous and next chapter"
            from={`ch${n}`}
            prev={prev ? { href: agChapterPath(prev.n), label: `← Chapter ${prev.n}`, target: prev.title, to: `ch${prev.n}` } : null}
            next={next ? { href: agChapterPath(next.n), label: `Chapter ${next.n} →`, target: next.title, to: `ch${next.n}` } : null}
          />
        </Section>

        <Section tone="band" track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={pageKey} placement="end" copy={NEXT_COPY} />
          </div>
        </Section>

        <Section className="og-sources" title="Sources and method" width="narrow" spacing="tight">
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </Section>
      </main>
    </>
  )
}
