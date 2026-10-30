'use client'

/**
 * "Which line is yours today?" Pick a feeling, get one line (QuoteCard), the
 * two lines written for that feeling, and the next step. All data via props.
 * With `preset`, it renders already revealed (without the entrance motion,
 * so it reads fine before JS).
 */

import { useRef, useState, type CSSProperties } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import type { HookFeeling, Locale, Quote, QuoteView } from '@/lib/quotes-shared'
import QuoteCard from './QuoteCard'
import NextStep from './NextStep'
import { prefersReducedMotion } from './session'
import './card.css'
import './quotes.css'

/** A feeling in one language, as QuotePage passes it (HookFeeling also works). */
export type FeelingView = { id: string; label: string; quoteId: string; lines: [string, string]; startSituation?: string }

export type LineForYouProps = {
  feelings: (FeelingView | HookFeeling)[]
  /** quote id -> quote (a QuoteView from toView, or a full Quote) */
  quotes: Record<string, QuoteView | Quote>
  question: string
  preset?: string
  locale: Locale
  pageName: string
  pageKey?: string
  /** quote id -> recitation URL */
  audio?: Record<string, string | null>
  pagePath?: string
}

const T = {
  en: { yours: 'Your line for today', pick: 'Pick what feels closest' },
  hi: { yours: 'आज का आपका श्लोक', pick: 'जो सबसे करीब लगे, वो चुनें' },
}

const norm = (f: FeelingView | HookFeeling, locale: Locale): FeelingView =>
  typeof f.label === 'string'
    ? (f as FeelingView)
    : {
        id: f.id,
        label: (f as HookFeeling).label[locale],
        quoteId: f.quoteId,
        lines: (f as HookFeeling).lines[locale],
        startSituation: f.startSituation,
      }

export default function LineForYou({ feelings, quotes, question, preset, locale, pageName, pageKey, audio, pagePath }: LineForYouProps) {
  const usable = feelings.map((f) => norm(f, locale)).filter((f) => quotes[f.quoteId])
  const initial = preset && usable.some((f) => f.id === preset) ? preset : null
  const [picked, setPicked] = useState<string | null>(initial)
  const [animate, setAnimate] = useState(false)
  const [round, setRound] = useState(0)
  const revealRef = useRef<HTMLDivElement>(null)
  const t = T[locale]

  if (!usable.length) return null

  const feeling = usable.find((f) => f.id === picked) ?? null
  const quote = feeling ? quotes[feeling.quoteId] : null

  const pick = (f: FeelingView) => {
    setPicked(f.id)
    setAnimate(true)
    setRound((r) => r + 1)
    trackEvent('Hook Feeling Picked', { feeling: f.id, page: pageName, locale })
    trackEvent('Hook Line Revealed', { quote_id: f.quoteId, feeling: f.id, page: pageName, locale })
    requestAnimationFrame(() => {
      const el = revealRef.current
      if (!el) return
      const r = el.getBoundingClientRect()
      if (r.top > window.innerHeight * 0.7 || r.top < 0) {
        el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
      }
    })
  }

  return (
    <section id="line-for-you" className="qlf" aria-labelledby="line-for-you-q" lang={locale}>
      <h2 id="line-for-you-q" className="qlf-q">
        {question}
      </h2>
      <div className="qlf-chips" role="group" aria-label={t.pick}>
        {usable.map((f) => (
          <button key={f.id} type="button" className="qchip qlf-chip" aria-pressed={picked === f.id} onClick={() => pick(f)}>
            {f.label}
          </button>
        ))}
      </div>

      <div ref={revealRef} className="qlf-reveal" aria-live="polite">
        {feeling && quote && (
          <div key={`${feeling.id}-${round}`} className="qlf-result" data-animate={animate ? '' : undefined}>
            <span className="qlf-rule" aria-hidden="true" />
            <p className="qlf-kicker">{t.yours}</p>
            <div className="qlf-card">
              <QuoteCard
                quote={quote}
                locale={locale}
                pageName={pageName}
                pageKey={pageKey}
                position={0}
                audioSrc={audio?.[feeling.quoteId] ?? null}
                domId={`${feeling.quoteId}-yours`}
                pagePath={pagePath}
                startSituation={feeling.startSituation}
              />
            </div>
            <div className="qlf-lines">
              {feeling.lines.map((line, i) => (
                <p key={i} className="qlf-line" style={{ '--i': i } as CSSProperties}>
                  {line}
                </p>
              ))}
            </div>
            <div className="qlf-next">
              <NextStep locale={locale} pageName={pageName} pageKey={pageKey} placement="hook" startSituation={feeling.startSituation} />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
