import QuoteCard from '@/components/quotes/QuoteCard'
import { cardFileName, type QuoteView } from '@/lib/quotes-shared'
import cardsJson from '@/content/funnels/ramayana/cards.json'

type Card = {
  id: string
  sourceName: { en: string; hi: string }
  speaker: { en: string; hi: string }
  sanskritLine: string
  iast: string
  meaning: { en: string; hi: string }
}
const CARDS = cardsJson as unknown as Card[]

/** Share cards (Copy, WhatsApp, Save image) for a few Ramayana lines. Devanagari only, so a card never shows both scripts. */
export default function KeepCards({ ids, locale, page, pageKey, path }: { ids: string[]; locale: 'en' | 'hi'; page: string; pageKey: string; path: string }) {
  const cards = ids.map((id) => CARDS.find((c) => c.id === id)).filter((c): c is Card => Boolean(c))
  return (
    <div className="rl-cards">
      {cards.map((c, i) => {
        const view: QuoteView = {
          kind: 'view',
          id: c.id,
          sa: c.sanskritLine,
          iast: '',
          meaning: c.meaning[locale],
          sourceLine: `${c.speaker[locale]} · ${c.sourceName[locale]}`,
          href: null,
          sharePath: path,
          file: cardFileName(
            { id: c.id, source: 'other', sourceName: c.sourceName, sanskritFull: c.sanskritLine, sanskritLine: c.sanskritLine, iast: c.iast, meaning: c.meaning, context: c.meaning, moments: [], rank: 0 },
            'post',
          ).replace(/-post\.png$/, ''),
          v: '',
        }
        return <QuoteCard key={c.id} quote={view} locale={locale} pageName={page} pageKey={pageKey} position={i + 1} variant="compact" verseHref={null} />
      })}
    </div>
  )
}
