import type { Metadata } from 'next'
import FxFrame from '@/components/funnels/other-gitas/FxFrame'
import NextBand from '@/components/funnels/other-gitas/NextBand'
import FxHero from '@/components/funnels/other-gitas/FxHero'
import FxSources from '@/components/funnels/other-gitas/FxSources'
import VerseLines from '@/components/funnels/other-gitas/VerseLines'
import QuoteCard from '@/components/quotes/QuoteCard'
import type { QuoteView } from '@/lib/quotes-shared'
import { abs, agVersePath, getVerseByKey, HUB_PATH, padas, speakerLabel, type AgVerse } from '@/lib/funnels/other-gitas/data'
import { DISCLOSURE, FAMOUS, QUOTES_QUICK, SOURCES_NOTE } from '@/lib/funnels/other-gitas/content'
import cards from '@/content/funnels/other-gitas/cards.json'
import { articleLd, breadcrumbLd, cardOg, ldScript, pageMeta } from '@/lib/funnels/other-gitas/seo'

const PAGE = 'ag-quotes'
const PATH = '/ashtavakra-gita/quotes'

export const metadata: Metadata = pageMeta({
  path: PATH,
  title: 'Ashtavakra Gita quotes: 20 lines in Sanskrit and English',
  description:
    'Twenty lines from the Ashtavakra Gita, each with the Sanskrit, a plain English meaning and the verse it comes from, ready to copy or share.',
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
    breadcrumbLd([
      { name: 'Ashtavakra Gita', path: HUB_PATH },
      { name: 'Quotes', path: PATH },
    ]),
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
    <FxFrame pageKey={PAGE}>
      {ld.map((d, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={ldScript(d)} />
      ))}
      <main>
        <FxHero
          crumbs={[{ label: 'Ashtavakra Gita', href: HUB_PATH }, { label: 'Quotes' }]}
          eyebrow="20 lines to copy or share"
          title="Ashtavakra Gita quotes"
          facts={['20 lines', 'Sanskrit and plain English', 'Each with its verse']}
          cta={{ href: '#lines', label: 'See the lines', location: 'ag_quotes_hero_lines' }}
          art={
            <div className="og-hero-verse" aria-hidden="true">
              <p className="og-hero-ref">
                Ashtavakra Gita {lead.c}.{lead.v}
              </p>
              <VerseLines verse={lead} />
              <hr className="og-rule" />
            </div>
          }
        />

        <section className="og-intro">
          <div className="wrap og-col">
            <div className="og-prose">
              <p id="quick-answer" className="og-lead">
                {QUOTES_QUICK}
              </p>
            </div>
          </div>
        </section>

        <section className="section" id="lines" aria-label="Ashtavakra Gita quotes">
          <div className="wrap">
            <div className="og-cards">
              {verses.map((x, i) => (
                <QuoteCard key={x.id} quote={view(x)} locale="en" pageName={PAGE} pageKey={PAGE} position={i + 1} />
              ))}
            </div>

            <div className="og-prose" style={{ marginTop: 40 }}>
              <p>
                Each card links to its verse, with word meanings and a short commentary. If you are new to the text, start with
                the <a href={HUB_PATH}>Ashtavakra Gita guide</a> or read it beside the{' '}
                <a className="fx-gita-link" href="/ashtavakra-gita-vs-bhagavad-gita">
                  Bhagavad Gita
                </a>
                .
              </p>
            </div>
          </div>
        </section>

        <NextBand pageKey={PAGE} />

        <FxSources>
          <p>{SOURCES_NOTE} The card meanings are short versions of our verse translations.</p>
          <p>{DISCLOSURE}</p>
        </FxSources>
      </main>
    </FxFrame>
  )
}
