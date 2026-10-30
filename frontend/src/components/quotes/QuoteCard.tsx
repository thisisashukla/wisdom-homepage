'use client'

/**
 * One shareable, sourced quote: Devanagari line, IAST, meaning, source, and
 * Copy · WhatsApp · Save image · Listen. "More" opens the context and the
 * three "if this is you" lines. The first copy/share/save of the session
 * opens NextStepSheet.
 *
 * Pass a QuoteView (toView on the server: one language, no full verse) and the
 * More body as children (QuoteMore). A full Quote still works: it is converted
 * here and its More body is built from the quote.
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import dynamic from 'next/dynamic'
import {
  cardImageUrl,
  isQuoteView,
  toView,
  viewCopyText,
  viewShareUrl,
  type CardFormat,
  type Locale,
  type MomentId,
  type Quote,
  type QuoteView,
} from '@/lib/quotes-shared'
import { trackEvent } from '@/lib/mixpanel'
import { claimFirstAction, ensureToast, hideToast, showToast, writeClipboard, type SheetAction } from './session'
import { Icon } from './Icons'
import { MoreBody } from './QuoteMore'
import { tiro } from './fonts'
import './card.css'

const NextStepSheet = dynamic(() => import('./NextStepSheet'), { ssr: false })

export type QuoteCardProps = {
  quote: QuoteView | Quote
  locale: Locale
  pageName: string
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
  /** Server-rendered More body (context and the three lines). */
  children?: ReactNode
}

const T = {
  en: {
    copy: 'Copy',
    copyBio: 'Copy line',
    whatsapp: 'WhatsApp',
    save: 'Save image',
    listen: 'Listen',
    pause: 'Pause',
    share: 'Share',
    more: 'More',
    less: 'Less',
    post: 'Post',
    postSub: 'Feed, 4:5',
    status: 'Status',
    statusSub: 'Story or status, 9:16',
    copied: 'Copied',
    saved: 'Saved',
    failed: 'Could not copy. Press and hold the line to copy it.',
    saveFailed: 'The image opened in a new tab. Press and hold it to save.',
    bio: 'Fits your bio',
    chars: (n: number) => `${n} characters`,
    another: 'Another line',
    actions: 'Use this line',
  },
  hi: {
    copy: 'कॉपी',
    copyBio: 'श्लोक कॉपी',
    whatsapp: 'WhatsApp',
    save: 'इमेज सेव',
    listen: 'सुनें',
    pause: 'रोकें',
    share: 'शेयर',
    more: 'और पढ़ें',
    less: 'कम दिखाएं',
    post: 'पोस्ट',
    postSub: 'फ़ीड, 4:5',
    status: 'स्टेटस',
    statusSub: 'स्टोरी या स्टेटस, 9:16',
    copied: 'कॉपी हो गया',
    saved: 'सेव हो गया',
    failed: 'कॉपी नहीं हो पाया। श्लोक को दबाकर रखें और कॉपी करें।',
    saveFailed: 'इमेज नए टैब में खुली है। उसे दबाकर रखें और सेव करें।',
    bio: 'बायो में फ़िट',
    chars: (n: number) => `${n} अक्षर`,
    another: 'एक और श्लोक',
    actions: 'इस श्लोक को इस्तेमाल करें',
  },
} as const

const playing = new Set<HTMLAudioElement>()

const isCoarse = () => {
  try {
    return window.matchMedia('(pointer: coarse)').matches
  } catch {
    return false
  }
}

function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = name
  document.body.appendChild(a)
  a.click()
  a.remove()
  setTimeout(() => URL.revokeObjectURL(url), 4000)
}

export default function QuoteCard({
  quote,
  locale,
  pageName,
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
  children,
}: QuoteCardProps) {
  const t = T[locale]
  const full = isQuoteView(quote) ? null : quote
  const view: QuoteView = full ? toView(full, locale, { path: pagePath }) : (quote as QuoteView)
  const id = domId ?? view.id
  const lean = variant === 'hero' && compactHero
  const listenSrc = lean ? null : audioSrc
  const moreBody = variant === 'compact' ? null : children ?? (full ? <MoreBody quote={full} locale={locale} /> : null)

  const [expanded, setExpanded] = useState(false)
  const [copiedTick, setCopiedTick] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canNative, setCanNative] = useState(false)
  const [sheet, setSheet] = useState<SheetAction | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioTracked = useRef(false)
  const saveRef = useRef<HTMLDivElement>(null)
  const saveBtnRef = useRef<HTMLButtonElement>(null)
  const blobs = useRef(new Map<CardFormat, Promise<Blob>>())

  useEffect(() => {
    setCanNative(typeof navigator !== 'undefined' && typeof navigator.share === 'function')
    ensureToast()
    return () => {
      const a = audioRef.current
      if (a) {
        a.pause()
        playing.delete(a)
      }
    }
  }, [])

  const base = { quote_id: view.id, page: pageName, moment: moment ?? null, position: position ?? null, locale }

  /** The first action of the session opens the sheet (its title already says what happened) instead of a toast. */
  const confirm = (action: SheetAction, msg?: string) => {
    if (claimFirstAction()) {
      hideToast()
      setSheet(action)
    } else if (msg) showToast(msg)
  }

  // ── Copy ──
  const onCopy = async () => {
    const ok = await writeClipboard(bio ? view.sa : viewCopyText(view, 'copy'))
    if (!ok) {
      showToast(t.failed)
      return
    }
    setCopiedTick(true)
    setTimeout(() => setCopiedTick(false), 1800)
    trackEvent('Quote Copied', { ...base, mode: bio ? 'bio' : 'full' })
    confirm('copied', t.copied)
  }

  // ── Share ── (server href is just the link; the click adds the full text)
  const waHref = `https://wa.me/?text=${encodeURIComponent(viewShareUrl(view, 'whatsapp'))}`
  const onWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(viewCopyText(view, 'whatsapp'))}`
    trackEvent('Quote Shared', { ...base, channel: 'whatsapp' })
    confirm('shared')
  }
  const onNative = async () => {
    try {
      await navigator.share({ text: viewCopyText(view, 'share') })
      trackEvent('Quote Shared', { ...base, channel: 'native' })
      confirm('shared')
    } catch {
      // cancelled or not allowed
    }
  }

  // ── Save image ──
  const imgUrl = (format: CardFormat) => cardImageUrl(view.id, { format, lang: locale, v: view.v, download: true })
  const fileName = (format: CardFormat) => `${view.file}-${format}.png`
  const getBlob = (format: CardFormat): Promise<Blob> => {
    let p = blobs.current.get(format)
    if (!p) {
      p = fetch(imgUrl(format)).then((r) => {
        if (!r.ok) throw new Error(`card ${r.status}`)
        return r.blob()
      })
      p.catch(() => blobs.current.delete(format))
      blobs.current.set(format, p)
    }
    return p
  }

  const toggleSave = () => {
    if (!saveOpen) {
      // Warm both images so the tap below still counts as a user gesture for share().
      getBlob('post').catch(() => {})
      getBlob('status').catch(() => {})
    }
    setSaveOpen(!saveOpen)
  }

  useEffect(() => {
    if (!saveOpen) return
    const onDown = (e: PointerEvent) => {
      if (saveRef.current && !saveRef.current.contains(e.target as Node)) setSaveOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSaveOpen(false)
        saveBtnRef.current?.focus()
      }
    }
    document.addEventListener('pointerdown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [saveOpen])

  const onSave = async (e: React.MouseEvent<HTMLAnchorElement>, format: CardFormat) => {
    e.preventDefault()
    setSaveOpen(false)
    const name = fileName(format)
    let method: 'share' | 'download'
    try {
      const blob = await getBlob(format)
      const file = new File([blob], name, { type: blob.type || 'image/png' })
      if (isCoarse() && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file] })
          method = 'share'
        } catch (err) {
          if ((err as DOMException)?.name === 'AbortError') {
            trackEvent('Quote Image Save Cancelled', { ...base, format })
            return
          }
          downloadBlob(blob, name)
          method = 'download'
        }
      } else {
        downloadBlob(blob, name)
        method = 'download'
      }
    } catch {
      window.open(imgUrl(format), '_blank', 'noopener')
      trackEvent('Quote Image Save Failed', { ...base, format })
      showToast(t.saveFailed)
      return
    }
    trackEvent('Quote Image Saved', { ...base, format, method })
    confirm('saved', t.saved)
  }

  // ── Listen ── (the audio element is created on first tap, not rendered per card)
  const toggleAudio = () => {
    if (!listenSrc) return
    let a = audioRef.current
    if (!a) {
      a = new Audio(listenSrc)
      a.preload = 'none'
      a.addEventListener('play', () => {
        setIsPlaying(true)
        if (!audioTracked.current) {
          audioTracked.current = true
          trackEvent('Quote Audio Played', base)
        }
      })
      a.addEventListener('pause', () => setIsPlaying(false))
      a.addEventListener('ended', () => setIsPlaying(false))
      audioRef.current = a
    }
    if (a.paused) {
      playing.forEach((other) => other !== a && other.pause())
      playing.add(a)
      a.play().catch(() => setIsPlaying(false))
    } else a.pause()
  }

  const chipHref = verseHref === undefined ? (variant === 'hero' ? null : view.href) : verseHref
  const lineLength = Array.from(view.sa).length
  const padas = view.sa.split(/(?<=[।॥])\s+/u).filter(Boolean)
  const moreId = `${id}-more`

  return (
    <article id={id} className={`qc qc-${variant}${lean ? ' qc-lean' : ''} ${tiro.variable}`} data-moment={moment}>
      {bio && view.bioSafe && (
        <p className="qc-badge">
          <span>{t.bio}</span>
          <span className="qc-badge-n">{t.chars(lineLength)}</span>
        </p>
      )}

      <p className="qc-sa" lang="sa">
        {padas.map((p, i) => (
          <span key={i} className="qc-pada">
            {p}
          </span>
        ))}
      </p>
      {!lean && view.iast && (
        <p className="qc-iast" lang="sa-Latn">
          {view.iast}
        </p>
      )}
      <p className="qc-meaning" lang={locale}>
        {view.meaning}
      </p>

      <p className="qc-source">
        {chipHref ? (
          <a className="qc-chip" href={chipHref}>
            {view.sourceLine}
          </a>
        ) : (
          <span className="qc-chip">{view.sourceLine}</span>
        )}
      </p>

      <div className="qc-actions" role="group" aria-label={t.actions}>
        <button type="button" className="qc-act qc-copy" data-done={copiedTick ? '' : undefined} onClick={onCopy}>
          <span className="qc-ico">
            <Icon name="copy" />
            <Icon name="check" />
          </span>
          <span>{copiedTick ? t.copied : bio ? t.copyBio : t.copy}</span>
        </button>
        <a className="qc-act" href={waHref} target="_blank" rel="noopener" onClick={onWhatsApp}>
          <Icon name="whatsapp" />
          <span>{t.whatsapp}</span>
        </a>
        <div className="qc-save" ref={saveRef}>
          <button
            type="button"
            className="qc-act"
            ref={saveBtnRef}
            aria-expanded={saveOpen}
            aria-controls={saveOpen ? `${id}-save` : undefined}
            onClick={toggleSave}
          >
            <Icon name="save" />
            <span>{t.save}</span>
          </button>
          {saveOpen && (
            <div className="qc-menu" id={`${id}-save`}>
              <a href={imgUrl('post')} download={fileName('post')} onClick={(e) => onSave(e, 'post')}>
                <strong>{t.post}</strong>
                <span>{t.postSub}</span>
              </a>
              <a href={imgUrl('status')} download={fileName('status')} onClick={(e) => onSave(e, 'status')}>
                <strong>{t.status}</strong>
                <span>{t.statusSub}</span>
              </a>
            </div>
          )}
        </div>
        {listenSrc && (
          <button type="button" className="qc-act" data-on={isPlaying ? '' : undefined} onClick={toggleAudio}>
            <Icon name={isPlaying ? 'pause' : 'play'} />
            <span>{isPlaying ? t.pause : t.listen}</span>
          </button>
        )}
      </div>

      {(moreBody || canNative || (variant === 'hero' && anotherHref)) && (
        <div className="qc-foot">
          {moreBody && (
            <button
              type="button"
              className="qc-more"
              aria-expanded={expanded}
              aria-controls={expanded ? moreId : undefined}
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded ? t.less : t.more}
            </button>
          )}
          <span className="qc-foot-end">
            {canNative && (
              <button type="button" className="qc-link" onClick={onNative}>
                <Icon name="share" />
                <span>{t.share}</span>
              </button>
            )}
            {variant === 'hero' && anotherHref && (
              <a className="qc-link qc-another" href={anotherHref}>
                {t.another}
              </a>
            )}
          </span>
        </div>
      )}

      {moreBody && expanded && (
        <div className="qc-more-body" id={moreId}>
          {moreBody}
        </div>
      )}

      {sheet && (
        <NextStepSheet
          action={sheet}
          locale={locale}
          pageName={pageName}
          pageKey={pageKey}
          startSituation={startSituation}
          onClose={() => setSheet(null)}
        />
      )}
    </article>
  )
}
