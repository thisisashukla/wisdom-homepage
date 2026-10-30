/**
 * "Lines Krishna never said": the line people share, where it comes from,
 * then the real verse as a compact QuoteCard with a note. Server component.
 */

import type { FakeQuote, Locale, Quote, QuoteView } from '@/lib/quotes-shared'
import QuoteCard from './QuoteCard'
import './card.css'
import './quotes.css'

export type FakeQuotesProps = {
  fakes: FakeQuote[]
  /** real quote id -> quote (QuoteView from toView, or a full Quote) */
  quotes: Record<string, QuoteView | Quote>
  locale: Locale
  heading: string
  pageName: string
  pageKey?: string
  audio?: Record<string, string | null>
  pagePath?: string
  /** DOM ids already used on the page, so repeated quotes get unique ids. */
  usedIds?: Set<string>
}

const T = {
  en: { tag: 'Not in the Gita', origin: 'Where it comes from', real: 'What the Gita says' },
  hi: { tag: 'गीता में नहीं है', origin: 'असल में कहां से आया', real: 'गीता में असल में क्या है' },
}

export default function FakeQuotes({ fakes, quotes, locale, heading, pageName, pageKey, audio, pagePath, usedIds }: FakeQuotesProps) {
  const t = T[locale]
  const list = fakes.filter((f) => quotes[f.realQuoteId])
  if (!list.length) return null
  return (
    <section className="qfakes" id="never-said" aria-labelledby="never-said-h">
      <h2 id="never-said-h" className="qp-h2">
        {heading}
      </h2>
      <div className="qfakes-list">
        {list.map((f) => {
          const real = quotes[f.realQuoteId]
          let domId = `${real.id}-real`
          if (usedIds) {
            let n = 2
            while (usedIds.has(domId)) domId = `${real.id}-real-${n++}`
            usedIds.add(domId)
          }
          return (
            <article key={f.id} className="qfake" aria-labelledby={`fake-${f.id}`}>
              <div className="qfake-said">
                <p className="qfake-tag">{t.tag}</p>
                <p id={`fake-${f.id}`} className="qfake-line" lang={locale}>
                  <s>{f.line[locale]}</s>
                </p>
                <p className="qfake-origin">
                  <span className="qfake-origin-k">{t.origin}: </span>
                  {f.origin[locale]}
                </p>
              </div>
              <div className="qfake-real">
                <p className="qfake-real-k">{t.real}</p>
                <QuoteCard
                  quote={real}
                  locale={locale}
                  pageName={pageName}
                  pageKey={pageKey}
                  variant="compact"
                  audioSrc={audio?.[real.id] ?? null}
                  domId={domId}
                  pagePath={pagePath}
                />
                <p className="qfake-note" lang={locale}>
                  {f.note[locale]}
                </p>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}
