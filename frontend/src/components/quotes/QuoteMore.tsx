/**
 * The "More" body of a quote card: when it was said, and the three
 * "if this is you right now" lines. No client code: QuotePage renders it on
 * the server and hands it to QuoteCard as children, in one language only.
 */

import type { Locale, Quote } from '@/lib/quotes-shared'

const T = {
  en: { context: 'When it was said', forYou: 'If this is you right now', exam: 'Before an exam', work: 'At work', loss: 'After a loss' },
  hi: { context: 'यह कब कहा गया', forYou: 'अगर आप अभी इस हाल में हैं', exam: 'परीक्षा से पहले', work: 'काम पर', loss: 'कुछ खोने के बाद' },
}

export const hasMore = (quote: Quote, locale: Locale): boolean =>
  Boolean(quote.context?.[locale] || quote.forYou?.exam?.[locale] || quote.forYou?.work?.[locale] || quote.forYou?.loss?.[locale])

export function MoreBody({ quote, locale }: { quote: Quote; locale: Locale }) {
  const t = T[locale]
  const keys = (['exam', 'work', 'loss'] as const).filter((k) => quote.forYou?.[k]?.[locale])
  return (
    <>
      {quote.context?.[locale] && (
        <div className="qc-context">
          <p className="qc-label">{t.context}</p>
          <p lang={locale}>{quote.context[locale]}</p>
        </div>
      )}
      {keys.length > 0 && (
        <div className="qc-foryou">
          <p className="qc-label">{t.forYou}</p>
          <dl>
            {keys.map((k) => (
              <div key={k}>
                <dt>{t[k]}</dt>
                <dd lang={locale}>{quote.forYou![k][locale]}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  )
}

export default MoreBody
