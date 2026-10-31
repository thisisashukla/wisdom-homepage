import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd, NextStep, PageHero, Section, VerseCard, VerseList } from '@/components/site'
import QuoteShare from '@/components/funnels/other-gitas/QuoteShare'
import type { QuoteView } from '@/lib/quotes-shared'
import { abs, agVersePath, getVerseByKey, HUB_PATH, padas, speakerLabel, verseCardOf, type AgVerse } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, FAMOUS, NEXT_COPY, QUOTES_QUICK, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import cards from '@/content/funnels/other-gitas/cards.json'
import { articleLd, cardOg, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE_KEY = 'ag-quotes'
const PATH = '/ashtavakra-gita/quotes'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Ashtavakra Gita quotes: 20 lines in Sanskrit and English',
  description:
    'Twenty lines from the Ashtavakra Gita, each with the Sanskrit, a plain English meaning and the verse it comes from.',
  image: cardOg('ag-1-11'),
})

type Card = { id: string; meaning: { en: string } }
const CARD_MEANING = new Map((cards as Card[]).map((c) => [c.id, c.meaning.en]))

function view(x: AgVerse): QuoteView {
  const ref = `${x.c}.${x.v}`
  return {
    kind: 'view',
    id: x.id,
    sa: padas(x.sa).join(' '),
    // The card shows one script only (Devanagari); IAST is on the verse page behind the toggle.
    iast: '',
    meaning: CARD_MEANING.get(x.id) ?? x.en,
    sourceLine: `${x.speaker === 'janaka' ? 'King Janaka' : 'Ashtavakra to Janaka'} · Ashtavakra Gita ${ref}`,
    href: agVersePath(x.c, x.v),
    file: `ashtavakra-gita-${x.c}-${x.v}`,
    v: '',
  }
}

export default function AshtavakraQuotesPage() {
  const verses = FAMOUS.map((k) => getVerseByKey(k)!)
  const ld = [
    articleLd({ path: PATH, headline: 'Ashtavakra Gita quotes', description: QUOTES_QUICK, about: 'Ashtavakra Gita' }),
    {
      '@context': 'https://schema.org',
      '@type': 'ItemList',
      name: 'Ashtavakra Gita quotes',
      numberOfItems: verses.length,
      itemListElement: verses.map((x, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'Quotation',
          text: CARD_MEANING.get(x.id) ?? x.en,
          url: abs(agVersePath(x.c, x.v)),
          spokenByCharacter: { '@type': 'Person', name: speakerLabel(x.speaker) },
          citation: `Ashtavakra Gita ${x.c}.${x.v}`,
          image: cardOg(x.id),
        },
      })),
    },
  ]

  const lead = verses[0]

  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Ashtavakra Gita Quotes" />
      <main className="fx-og" lang="en">
        <PageHero
          crumbs={[
            { label: 'Ashtavakra Gita', href: HUB_PATH },
            { label: 'Quotes', href: PATH },
          ]}
          eyebrow="Lines people quote"
          title="Ashtavakra Gita quotes"
          facts={['20 lines', 'Ashtavakra and Janaka']}
          actions={[{ href: '#lines', label: 'See the lines', location: 'ag_quotes_hero_lines' }]}
          verse={{ ...verseCardOf(lead), label: `Ashtavakra Gita ${lead.c}.${lead.v}` }}
        />

        <Section spacing="tight" width="narrow">
          <div className="sx-prose rv">
            <p id="quick-answer">{QUOTES_QUICK}</p>
          </div>
        </Section>

        <Section id="lines" track="quotes">
          <VerseList columns={2}>
            {verses.map((x, i) => {
              const q = view(x)
              return (
                <VerseCard
                  key={x.id}
                  as="li"
                  id={x.id}
                  rv
                  {...verseCardOf(x)}
                  meaning={q.meaning}
                  source={q.sourceLine}
                  sourceHref={q.href ?? undefined}
                  actions={<QuoteShare quote={q} pageKey={PAGE_KEY} position={i + 1} />}
                />
              )
            })}
          </VerseList>

          <div className="sx-prose" style={{ marginTop: 40 }}>
            <p>
              If a line stops you, open its verse and read it slowly. If you are new to the text, start with
              the <a href={HUB_PATH}>Ashtavakra Gita guide</a> or read it beside the{' '}
              <a href="/ashtavakra-gita-vs-bhagavad-gita">Bhagavad Gita</a>.
            </p>
          </div>
        </Section>

        <Section tone="band" track="next_step" width="narrow">
          <div className="rv">
            <NextStep locale="en" pageKey={PAGE_KEY} placement="end" copy={NEXT_COPY} />
          </div>
        </Section>

        <Section className="og-sources" title="Sources and method" width="narrow" spacing="tight">
          <p>{SOURCES_NOTE} The card meanings are short versions of our verse translations.</p>
          <p>{DISCLOSURE}</p>
        </Section>
      </main>
    </>
  )
}
