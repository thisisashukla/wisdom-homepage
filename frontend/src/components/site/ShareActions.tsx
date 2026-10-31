'use client'

/**
 * The one share bar for any verse, line, doha, quote or result: Copy · WhatsApp · Save image · Listen,
 * plus the native Share sheet where the device has one. Used by QuoteCard and every funnel.
 * Events (registry): Quote Copied, Quote Shared { method }, Quote Image Saved / Save Failed /
 * Save Cancelled { format }, Quote Audio Played; all carry item_id and item_type.
 * The first copy/share/save of the session opens NextStepSheet (unless nextStep={false}).
 */

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { claimFirstAction, ensureToast, hideToast, showToast, writeClipboard, type SheetAction } from '@/components/quotes/session'
import { Icon } from '@/components/quotes/Icons'
import '@/components/quotes/card.css'

const NextStepSheet = dynamic(() => import('@/components/quotes/NextStepSheet'), { ssr: false })

export type ShareFormat = 'post' | 'status'

export type ShareImage =
  /** A server-rendered card image (e.g. /api/quote-card/...). */
  | { url: (format: ShareFormat) => string; fileName: (format: ShareFormat) => string; render?: never }
  /** A card drawn in the browser (canvas). */
  | { render: (format: ShareFormat) => Promise<Blob>; fileName: (format: ShareFormat) => string; url?: never }

export type ShareActionsProps = {
  /** What is being shared, for analytics. */
  item: { id: string; type: string }
  locale: Locale
  /** Text copied by Copy (usually the line, meaning, source and link). */
  copyText: string
  /** Text sent to WhatsApp / the native share sheet; defaults to copyText. Use utm_source=whatsapp in its link. */
  shareText?: string
  /** WhatsApp text for the server href (before the click adds the full text). Defaults to shareText. */
  whatsappFallback?: string
  image?: ShareImage
  audioSrc?: string | null
  /** Copy button label override (e.g. "Copy line" on bio pages). */
  copyLabel?: string
  /** Opens NextStepSheet after the session's first action (default true). */
  nextStep?: boolean
  /** Passed to NextStepSheet for attribution. */
  pageKey?: string
  startSituation?: string
  /** Extra analytics properties (moment, position, mode). */
  props?: Record<string, unknown>
  size?: 'default' | 'compact'
  className?: string
}

const T = {
  en: {
    copy: 'Copy', whatsapp: 'WhatsApp', save: 'Save image', listen: 'Listen', pause: 'Pause', share: 'Share',
    post: 'Post', postSub: 'Feed, 4:5', status: 'Status', statusSub: 'Story or status, 9:16',
    copied: 'Copied', saved: 'Saved', failed: 'Could not copy. Press and hold the line to copy it.',
    saveFailed: 'The image opened in a new tab. Press and hold it to save.', actions: 'Use this line',
  },
  hi: {
    copy: 'कॉपी', whatsapp: 'WhatsApp', save: 'इमेज सेव', listen: 'सुनें', pause: 'रोकें', share: 'शेयर',
    post: 'पोस्ट', postSub: 'फ़ीड, 4:5', status: 'स्टेटस', statusSub: 'स्टोरी या स्टेटस, 9:16',
    copied: 'कॉपी हो गया', saved: 'सेव हो गया', failed: 'कॉपी नहीं हो पाया। पंक्ति को दबाकर रखें और कॉपी करें।',
    saveFailed: 'इमेज नए टैब में खुली है। उसे दबाकर रखें और सेव करें।', actions: 'इस पंक्ति को इस्तेमाल करें',
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

export default function ShareActions({
  item,
  locale,
  copyText,
  shareText,
  whatsappFallback,
  image,
  audioSrc,
  copyLabel,
  nextStep = true,
  pageKey,
  startSituation,
  props,
  size = 'default',
  className = '',
}: ShareActionsProps) {
  const t = T[locale]
  const share = shareText ?? copyText
  const [copiedTick, setCopiedTick] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [canNative, setCanNative] = useState(false)
  const [sheet, setSheet] = useState<SheetAction | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const audioTracked = useRef(false)
  const saveRef = useRef<HTMLDivElement>(null)
  const saveBtnRef = useRef<HTMLButtonElement>(null)
  const blobs = useRef(new Map<ShareFormat, Promise<Blob>>())
  const menuId = `${item.id.replace(/[^a-zA-Z0-9_-]/g, '-')}-save`

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

  const base = { item_id: item.id, item_type: item.type, ...props }

  const confirm = (action: SheetAction, msg?: string) => {
    if (nextStep && claimFirstAction()) {
      hideToast()
      setSheet(action)
    } else if (msg) showToast(msg)
  }

  const onCopy = async () => {
    const ok = await writeClipboard(copyText)
    if (!ok) {
      showToast(t.failed)
      return
    }
    setCopiedTick(true)
    setTimeout(() => setCopiedTick(false), 1800)
    trackEvent(EVENTS.QuoteCopied, { ...base, method: 'copy' })
    confirm('copied', t.copied)
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(whatsappFallback ?? share)}`
  const onWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(share)}`
    trackEvent(EVENTS.QuoteShared, { ...base, method: 'whatsapp' })
    confirm('shared')
  }
  const onNative = async () => {
    try {
      await navigator.share({ text: share })
      trackEvent(EVENTS.QuoteShared, { ...base, method: 'native' })
      confirm('shared')
    } catch {
      // cancelled or not allowed
    }
  }

  const getBlob = (format: ShareFormat): Promise<Blob> => {
    let p = blobs.current.get(format)
    if (!p) {
      p = image!.render
        ? image!.render(format)
        : fetch(image!.url!(format)).then((r) => {
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

  const onSave = async (e: React.MouseEvent<HTMLAnchorElement>, format: ShareFormat) => {
    e.preventDefault()
    setSaveOpen(false)
    const name = image!.fileName(format)
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
            trackEvent(EVENTS.QuoteImageSaveCancelled, { ...base, format })
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
      if (image!.url) window.open(image!.url(format), '_blank', 'noopener')
      trackEvent(EVENTS.QuoteImageSaveFailed, { ...base, format })
      showToast(t.saveFailed)
      return
    }
    trackEvent(EVENTS.QuoteImageSaved, { ...base, format, method })
    confirm('saved', t.saved)
  }

  const toggleAudio = () => {
    if (!audioSrc) return
    let a = audioRef.current
    if (!a) {
      a = new Audio(audioSrc)
      a.preload = 'none'
      a.addEventListener('play', () => {
        setIsPlaying(true)
        if (!audioTracked.current) {
          audioTracked.current = true
          trackEvent(EVENTS.QuoteAudioPlayed, base)
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

  return (
    <>
      <div className={`qc-actions sx-share${size === 'compact' ? ' sx-share--compact' : ''} ${className}`.trim()} role="group" aria-label={t.actions}>
        <button type="button" className="qc-act qc-copy" data-done={copiedTick ? '' : undefined} onClick={onCopy}>
          <span className="qc-ico">
            <Icon name="copy" />
            <Icon name="check" />
          </span>
          <span>{copiedTick ? t.copied : copyLabel ?? t.copy}</span>
        </button>
        <a data-mp-tracked="" className="qc-act" href={waHref} target="_blank" rel="noopener" onClick={onWhatsApp}>
          <Icon name="whatsapp" />
          <span>{t.whatsapp}</span>
        </a>
        {image && (
          <div className="qc-save" ref={saveRef}>
            <button type="button" className="qc-act" ref={saveBtnRef} aria-expanded={saveOpen} aria-controls={saveOpen ? menuId : undefined} onClick={toggleSave}>
              <Icon name="save" />
              <span>{t.save}</span>
            </button>
            {saveOpen && (
              <div className="qc-menu" id={menuId}>
                {(['post', 'status'] as const).map((f) => (
                  <a key={f} data-mp-tracked="" href={image.url ? image.url(f) : '#'} download={image.fileName(f)} onClick={(e) => onSave(e, f)}>
                    <strong>{f === 'post' ? t.post : t.status}</strong>
                    <span>{f === 'post' ? t.postSub : t.statusSub}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        )}
        {audioSrc && (
          <button type="button" className="qc-act" data-on={isPlaying ? '' : undefined} onClick={toggleAudio}>
            <Icon name={isPlaying ? 'pause' : 'play'} />
            <span>{isPlaying ? t.pause : t.listen}</span>
          </button>
        )}
        {canNative && (
          <button type="button" className="qc-act" onClick={onNative}>
            <Icon name="share" />
            <span>{t.share}</span>
          </button>
        )}
      </div>
      {sheet && (
        <NextStepSheet action={sheet} locale={locale} pageName={pageKey ?? item.id} pageKey={pageKey} startSituation={startSituation} onClose={() => setSheet(null)} />
      )}
    </>
  )
}
