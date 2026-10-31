import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PageTracker from '@/components/BlogTracker'
import { GitaBridge, JsonLd, LinkCards, NextStep, PageHero, ScriptToggle, Section, VerseCard } from '@/components/site'
import HoldStill from '@/components/funnels/other-gitas/HoldStill'
import PrevNext from '@/components/funnels/other-gitas/PrevNext'
import {
  abs,
  agChapterPath,
  agVersePath,
  clip,
  getChapter,
  getVerse,
  getVerses,
  gitaVersePath,
  HUB_PATH,
  isIndexable,
  neighbours,
  speakerLabel,
  verseCardOf,
  verseTitle,
} from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, FAMOUS, NEXT_COPY, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import { AG_CITATION, articleLd, cardOg, pageMeta } from '@/lib/funnels/other-gitas/seo'

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
    ...(full ? [articleLd({ path, headline: `Ashtavakra Gita ${ref}: meaning and commentary`, description: x.notice ?? x.en, about: 'Ashtavakra Gita' })] : []),
  ]

  // Section grounds alternate from the first section under the hero.
  let band = false
  const tone = () => ((band = !band) ? 'default' : 'band') as 'default' | 'band'

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Ashtavakra Gita Verse" />
      <main className="fx-og" lang="en">
        <PageHero
          crumbs={[
            { label: 'Ashtavakra Gita', href: HUB_PATH },
            { label: `Chapter ${x.c}: ${ch.title}`, href: agChapterPath(x.c) },
            { label: `Verse ${ref}`, href: path },
          ]}
          eyebrow="The verse"
          title={
            <>
              Ashtavakra Gita {ref}
              <span className="og-h1-sub">
                Chapter {x.c}, Verse {x.v}
              </span>
            </>
          }
          sub={<span id="quick-answer">{x.quick}</span>}
          facts={[speakerLabel(x.speaker)]}
          visual={
            <HoldStill
              verseRef={ref}
              after={<NextStep locale="en" pageKey={pageKey} placement="hold" copy={NEXT_COPY} />}
            >
              <div className="og-hold-top">
                <span className="og-hold-k">The verse</span>
                <ScriptToggle size="compact" />
              </div>
              <VerseCard className="fx-keep" as="div" framed={false} size="hero" reveal {...verseCardOf(x)} />
              <p className="og-speaker">{who}</p>
              <hr className="og-rule fx-keep" aria-hidden="true" />
              <p className="og-attrib">Ashtavakra Gita · {ref}</p>
            </HoldStill>
          }
        />

        {full ? (
          <>
            <Section tone={tone()} track="notice" title="What to notice" width="narrow">
              <p className="og-insight rv">{x.notice}</p>
            </Section>

            <Section tone={tone()} track="word_by_word" title="Word by word" width="narrow">
              <dl className="og-words rv">
                {x.words!.map((w) => (
                  <div key={w.w} className="og-word">
                    <dt lang="sa-Latn">{w.w}</dt>
                    <dd>{w.m}</dd>
                  </div>
                ))}
              </dl>
            </Section>

            <Section tone={tone()} track="commentary" eyebrow="In plain words" title="Reading the verse" width="narrow">
              <div className="sx-prose rv">
                <p>{x.commentary}</p>
              </div>
            </Section>

            {x.bridge && (
              <Section
                tone={tone()}
                track="gita_bridge"
                title={x.bridge.kind === 'same' ? 'Same thread in the Bhagavad Gita' : 'Where the Bhagavad Gita differs'}
                width="narrow"
              >
                <GitaBridge
                  className="rv"
                  href={gitaVersePath(x.bridge.c, x.bridge.v)}
                  location="ag_verse_bridge"
                  from={ref}
                  label={`Bhagavad Gita ${x.bridge.c}.${x.bridge.v}`}
                  why={x.bridge.note}
                />
              </Section>
            )}
          </>
        ) : (
          <Section tone={tone()} width="narrow">
            <div className="og-pending rv">
              <p>
                Read this verse in context on the{' '}
                <a href={agChapterPath(x.c)}>chapter {x.c} page</a>, or start with the verses in <a href={HUB_PATH}>where to begin</a>.
              </p>
            </div>
          </Section>
        )}

        <Section tone={tone()} track="chapter" width="narrow">
          <LinkCards
            items={[
              {
                href: agChapterPath(x.c),
                kicker: `Chapter ${x.c} of 20`,
                title: ch.title,
                body: (
                  <>
                    Chapter {x.c}, {ch.title}: {ch.gist}
                    <span className="og-go">Read all {ch.count} verses in this chapter →</span>
                  </>
                ),
                location: 'ag_verse_chapter_card',
              },
            ]}
          />
          <PrevNext
            label="Previous and next verse"
            from={ref}
            prev={prev ? { href: agVersePath(prev.c, prev.v), label: '← Previous', target: `${prev.c}.${prev.v}`, to: `${prev.c}.${prev.v}` } : null}
            next={next ? { href: agVersePath(next.c, next.v), label: 'Next →', target: `${next.c}.${next.v}`, to: `${next.c}.${next.v}` } : null}
          />
        </Section>

        <Section tone={tone()} track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={pageKey} placement="end" copy={NEXT_COPY} />
          </div>
          <p className="og-after-next">
            New to this text? <a href="/ashtavakra-gita/seven-mornings">Seven mornings with the Ashtavakra Gita</a> gives you one verse a day for a week.
          </p>
        </Section>

        <Section tone={tone()} className="og-sources" title="Sources and method" width="narrow" spacing="tight">
          <p>{SOURCES_NOTE}</p>
          <p>{DISCLOSURE}</p>
        </Section>
      </main>
    </>
  )
}
