import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { Faq, GitaBridge, JsonLd, LinkCards, NextStep, PageHero, Section } from '@/components/site'
import { abs, agChapterPath, agVersePath, getChapters, getVerseByKey, HUB_PATH, TOTAL_VERSES, verseCardOf } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, FAMOUS, HUB_FAQ, HUB_QUICK, NEXT_COPY, SOURCES_NOTE, START_HERE } from '@/lib/funnels/other-gitas/content'
import { articleLd, cardOg, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE_KEY = 'ag-hub'
const HERO_KEY = '1.11'

export const metadata: Metadata = pageMeta({
  path: HUB_PATH,
  title: 'Ashtavakra Gita: all 20 chapters in Sanskrit and English',
  description:
    'All 298 verses of the Ashtavakra Gita, the dialogue of Ashtavakra and King Janaka, in Sanskrit and plain English, with where to start.',
  image: cardOg('ag-1-11'),
})

const keyPath = (key: string) => {
  const [c, v] = key.split('.').map(Number)
  return agVersePath(c, v)
}

export default function AshtavakraHubPage() {
  const chapters = getChapters()
  const hero = getVerseByKey(HERO_KEY)!
  // Each verse appears once on the page: the hero keeps 1.11, "Where to start" and "The lines people quote" skip what is already shown.
  const start = START_HERE.filter((s) => s.key !== HERO_KEY)
  const shown = new Set([HERO_KEY, ...start.map((s) => s.key)])
  const famous = FAMOUS.filter((k) => !shown.has(k))
    .slice(0, 6)
    .map((k) => getVerseByKey(k)!)
  const ld = [
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
  ]

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Ashtavakra Gita Hub" />
      <main className="fx-og" lang="en">
        <PageHero
          crumbs={[{ label: 'Ashtavakra Gita', href: HUB_PATH }]}
          eyebrow="Ashtavakra and King Janaka"
          title="Ashtavakra Gita"
          facts={['20 chapters', `${TOTAL_VERSES} verses`]}
          actions={[
            { href: agChapterPath(1), label: 'Read chapter 1', location: 'ag_hub_hero_chapter_1' },
            { href: '#start', label: 'Where to start', location: 'ag_hub_hero_start' },
          ]}
          verse={{
            ...verseCardOf(hero),
            label: (
              <>
                The line people know, <a href={agVersePath(1, 11)}>1.11</a>, Ashtavakra to Janaka:
              </>
            ),
          }}
        />

        <Section spacing="tight">
          <div className="sx-prose rv">
            <p id="quick-answer">{HUB_QUICK}</p>
            <p>
              The whole text is one conversation. A king who has everything asks how to be free. A young sage, named for the
              eight bends in his body, tells him he already is: he is the witness of body and mind, and bondage is only the
              belief that he is bound. Janaka sees it, and spends the rest of the text testing it against wealth, desire,
              practice and death. It has almost no story or ritual, and it gives no instructions. Most readers start with
              one line and stay with it for a while.
            </p>
          </div>
        </Section>

        <Section id="start" track="start_here" title="Where to start">
          <LinkCards
            columns={3}
            items={start.map((s) => ({ href: keyPath(s.key), kicker: s.key, title: getVerseByKey(s.key)!.en, body: s.why, location: 'ag_hub_start' }))}
          />
          <p className="og-small">
            Want one a day? <a href="/ashtavakra-gita/seven-mornings">Seven mornings with the Ashtavakra Gita</a>.
          </p>
        </Section>

        <Section tone="band" track="famous_lines" title="The lines people quote">
          <LinkCards
            columns={3}
            items={famous.map((x) => ({ href: agVersePath(x.c, x.v), kicker: `${x.c}.${x.v}`, title: x.en, location: 'ag_hub_famous' }))}
          />
          <p className="og-small">
            <a href="/ashtavakra-gita/quotes">The twenty lines people quote most</a>
          </p>
        </Section>

        <Section
          track="chapters"
          title="The 20 chapters"
          intro={
            <>
              {TOTAL_VERSES} verses. Janaka asks in 1.1; Ashtavakra teaches most chapters; Janaka answers in chapters 2, 4, 6, 7,
              12, 13, 14, 19 and 20.
            </>
          }
        >
          <LinkCards
            items={chapters.map((c) => ({
              href: agChapterPath(c.n),
              kicker: String(c.n),
              title: c.title,
              body: (
                <>
                  {c.gist}
                  <span className="og-meta">{c.count} verses</span>
                </>
              ),
              location: 'ag_hub_chapters',
            }))}
          />
        </Section>

        <Section tone="band" track="next_to_gita" title="Next to the Bhagavad Gita" width="narrow">
          <div className="sx-prose rv">
            <p>
              The Bhagavad Gita teaches through a crisis on a battlefield and joins action, devotion and knowledge. The
              Ashtavakra Gita has no crisis and keeps to knowledge alone. Most readers start with the{' '}
              <GitaBridge variant="inline" href="/gita" location="ag_hub_next_to_gita" label="Bhagavad Gita" />
              .{' '}
              <a href="/ashtavakra-gita-vs-bhagavad-gita">Compare the two side by side</a>, or see the{' '}
              <a href="/gitas">other Gitas in Hindu tradition</a>.
            </p>
          </div>
        </Section>

        <Section track="faq" title="Questions people ask" width="narrow">
          <Faq items={HUB_FAQ} />
        </Section>

        <Section tone="band" track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={PAGE_KEY} placement="end" copy={NEXT_COPY} />
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
