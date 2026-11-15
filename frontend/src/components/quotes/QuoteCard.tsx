'use client'

/**
 * One shareable, sourced quote. The text block is the kit's VerseCard (label, Devanagari or IAST by
 * the site-wide script setting, meaning, source) and the action bar is the kit's ShareActions
 * (Copy · WhatsApp · Save image · Listen · Share). "More" opens the context and the three
 * "if this is you" lines. The first copy/share/save of the session opens NextStepSheet (ShareActions).
 *
 * Pass a QuoteView (toView on the server: one language, no full verse) and the More body as
 * children (QuoteMore). A full Quote still works: it is converted here and its More body is built
 * from the quote.
 *
 * Events (ShareActions): Quote Copied, Quote Shared { method }, Quote Image Saved / Save Failed /
 * Save Cancelled { format }, Quote Audio Played; all with item_id, item_type 'quote', moment,
 * position and mode ('bio' | 'full').
 *
 * Inside a KeepScope (every QuotePage hub) the action row also has Keep / रखें (KeepButton, passed to
 * ShareActions as `extra`), which keeps the line on this device for that hub: Quote Keep Toggled { to }.
 */

import { useState, type ReactNode } from 'react'
import { cardImageUrl, isQuoteView, toView, viewCopyText, viewShareUrl, type Locale, type MomentId, type Quote, type QuoteView } from '@/lib/quotes-shared'
import VerseCard from '@/components/site/VerseCard'
import ShareActions from '@/components/site/ShareActions'
import { MoreBody } from './QuoteMore'
import KeepButton from './KeepButton'
import { useKeepHub } from './KeepScope'
import { parseVerseHref } from '@/lib/trail'
import './card.css'

export type QuoteCardProps = {
  quote: QuoteView | Quote
  locale: Locale
  /** @deprecated The page comes from <PageTracker>; kept so existing callers compile. */
  pageName?: string
  /** Page key from QuotePageConfig, used for attribution in the sheet. */
  pageKey?: string
  /** The section's moment (tracking and the filter attribute). */
  moment?: MomentId
  variant?: 'list' | 'hero' | 'compact'
  /** Hero without IAST and Listen, for verse pages that already show both. */
  compactHero?: boolean
  position?: number
  audioSrc?: string | null
  /** Link on the source chip. undefined: the verse page (not on hero); null: no link. */
  verseHref?: string | null
  /** Hero only: renders an "Another line" link. */
  anotherHref?: string | null
  /** DOM id of the card root. Defaults to the quote id. */
  domId?: string
  /** Page path used as the link for non-Gita lines (full Quote only; views carry it). */
  pagePath?: string
  /** Bio pages: shows "Fits your bio" and Copy copies the Sanskrit line only. */
  bio?: boolean
  /** Passed to the NextStep in the sheet (/start?s=). */
  startSituation?: string
  /** Shows the Devanagari / IAST switch on the card. Defaults to true on the hero, false in lists. */
  scriptToggle?: boolean
  /** Server-rendered More body (context and the three lines). */
  children?: ReactNode
  /**
   * List cards of Gita lines: a "hear it and read on" link into the verse reader. Default true.
   * The click also starts a trail (lib/trail.ts), so the verse page keeps this list.
   */
  readOn?: boolean
}

const T = {
  en: { copyBio: 'Copy line', more: 'More', less: 'Less', bio: 'Fits your bio', chars: (n: number) => `${n} characters`, another: 'Another line', readOn: (ref: string) => `Hear it and read on from ${ref}` },
  hi: { copyBio: 'श्लोक कॉपी', more: 'और पढ़ें', less: 'कम दिखाएं', bio: 'बायो में फ़िट', chars: (n: number) => `${n} अक्षर`, another: 'एक और श्लोक', readOn: (ref: string) => `${ref} सुनें और आगे पढ़ें` },
} as const

const SIZE = { list: 'default', hero: 'hero', compact: 'compact' } as const

export default function QuoteCard({
  quote,
  locale,
  pageKey,
  moment,
  variant = 'list',
  compactHero = false,
  position,
  audioSrc,
  verseHref,
  anotherHref,
  domId,
  pagePath,
  bio = false,
  startSituation,
  scriptToggle,
  children,
  readOn = true,
}: QuoteCardProps) {
  const t = T[locale]
  const full = isQuoteView(quote) ? null : quote
  const view: QuoteView = full ? toView(full, locale, { path: pagePath }) : (quote as QuoteView)
  const id = domId ?? view.id
  const lean = variant === 'hero' && compactHero
  const moreBody = variant === 'compact' ? null : children ?? (full ? <MoreBody quote={full} locale={locale} /> : null)
  const [expanded, setExpanded] = useState(false)
  const keepHub = useKeepHub()

  const chipHref = verseHref === undefined ? (variant === 'hero' ? null : view.href) : verseHref
  const iast = !lean && view.iast ? view.iast : undefined
  const padas = view.sa.split(/(?<=[।॥])\s+/u).filter(Boolean)
  const moreId = `${id}-more`
  const showAnother = variant === 'hero' && Boolean(anotherHref)
  const readOnRef = readOn && variant === 'list' ? parseVerseHref(view.href) : null

  const label =
    bio && view.bioSafe ? (
      <span className="qc-badge">
        <span>{t.bio}</span>
        <span className="qc-badge-n">{t.chars(Array.from(view.sa).length)}</span>
      </span>
    ) : undefined

  return (
    <VerseCard
      as="article"
      id={id}
      className={`qc-card qc-${variant}`}
      size={SIZE[variant]}
      locale={locale}
      label={label}
      original={padas}
      iast={iast}
      meaning={view.meaning}
      source={view.sourceLine}
      sourceHref={chipHref ?? undefined}
      toggle={scriptToggle ?? (variant === 'hero' && Boolean(iast))}
      actions={
        <>
          <ShareActions
              item={{ id: view.id, type: 'quote' }}
              locale={locale}
              copyText={bio ? view.sa : viewCopyText(view, 'copy')}
              shareText={viewCopyText(view, 'whatsapp')}
              whatsappFallback={viewShareUrl(view, 'whatsapp')}
              copyLabel={bio ? t.copyBio : undefined}
              image={{
                url: (format) => cardImageUrl(view.id, { format, lang: locale, v: view.v, download: true }),
                fileName: (format) => `${view.file}-${format}.png`,
              }}
              audioSrc={lean ? null : audioSrc}
              pageKey={pageKey}
              startSituation={startSituation}
              props={{ moment: moment ?? null, position: position ?? null, mode: bio ? 'bio' : 'full' }}
              extra={
                keepHub ? (
                  <KeepButton id={view.id} hub={keepHub} locale={locale} props={{ moment: moment ?? null, position: position ?? null, location: 'card' }} />
                ) : undefined
              }
            />
          {(moreBody || showAnother || readOnRef) && (
            <div className="qc-foot">
              {moreBody && (
                <button type="button" className="qc-more" aria-expanded={expanded} aria-controls={expanded ? moreId : undefined} onClick={() => setExpanded((v) => !v)}>
                  {expanded ? t.less : t.more}
                </button>
              )}
              {readOnRef && view.href && (
                <a
                  className="qc-link qc-another qc-readon"
                  href={view.href}
                  data-mp-location="quote_read_on"
                >
                  {t.readOn(`${readOnRef.ch}.${readOnRef.vs}`)} <span aria-hidden="true">→</span>
                </a>
              )}
              {showAnother && (
                <a className="qc-link qc-another" href={anotherHref!}>
                  {t.another}
                </a>
              )}
            </div>
          )}
          {moreBody && expanded && (
            <div className="qc-more-body" id={moreId}>
              {moreBody}
            </div>
          )}
        </>
      }
    />
  )
}

