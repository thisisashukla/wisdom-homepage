'use client'

/**
 * The one share bar for any verse, line, doha, quote or result: Copy · WhatsApp · Save image · Listen,
 * plus the native Share sheet where the device has one. Used by QuoteCard, the verse pages and every funnel.
 * Tune with props:
 *   featured="status"  a large "WhatsApp Status" button first: saves (or, on phones, shares) the 9:16 image.
 *   extra={<KeepButton/>}  one more control at the end of the row (it should use the .qc-act look).
 * The row wraps cleanly: six controls sit in two rows of three on a phone.
 * Events (registry): Quote Copied, Quote Shared { method }, Quote Image Saved { format, method:
 * 'share' | 'download' } / Save Failed / Save Cancelled { format },
 * Quote Audio Played; all carry item_id and item_type. One save sends one Quote Image Saved.
 * The first copy/share/save of the session opens NextStepSheet (unless nextStep={false}).
 */

import { useEffect, useRef, useState, type ReactNode } from 'react'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { claimFirstAction, ensureToast, hideToast, showToast, writeClipboard, type SheetAction } from '@/components/quotes/session'
import { Icon } from '@/components/quotes/Icons'
import NextStepSheet, { loadNextStepSheet } from '@/components/quotes/SafeNextStepSheet'
import '@/components/quotes/card.css'

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
  /** Put this image format first as a large button ("WhatsApp Status"). Needs `image`. */
  featured?: 'status'
  /** One more control at the end of the row, e.g. <KeepButton />. Give it the .qc-act look. */
  extra?: ReactNode
  className?: string
}

const T = {
  en: {
    copy: 'Copy', whatsapp: 'WhatsApp', save: 'Save image', listen: 'Listen', pause: 'Pause', share: 'Share',
    post: 'Post', postSub: 'Feed, 4:5', status: 'Status', statusSub: 'Story or status, 9:16',
    copied: 'Copied', saved: 'Saved', failed: 'Could not copy. Press and hold the line to copy it.',
    saveFailed: 'The image opened in a new tab. Press and hold it to save.', actions: 'Use this line',
    featured: 'WhatsApp Status', featuredSub: { verse: 'Put this verse on your Status today', line: 'Put this line on your Status today' },
    featuredSaved: 'Saved. Now add it to your Status.', preparing: 'Getting your image ready',
  },
  hi: {
    copy: 'कॉपी', whatsapp: 'WhatsApp', save: 'इमेज सेव', listen: 'सुनें', pause: 'रोकें', share: 'शेयर',
    post: 'पोस्ट', postSub: 'फ़ीड, 4:5', status: 'स्टेटस', statusSub: 'स्टोरी या स्टेटस, 9:16',
    copied: 'कॉपी हो गया', saved: 'सेव हो गया', failed: 'कॉपी नहीं हो पाया। पंक्ति को दबाकर रखें और कॉपी करें।',
    saveFailed: 'इमेज नए टैब में खुली है। उसे दबाकर रखें और सेव करें।', actions: 'इस पंक्ति को इस्तेमाल करें',
    featured: 'WhatsApp स्टेटस', featuredSub: { verse: 'आज इस श्लोक को अपने स्टेटस पर लगाएं', line: 'आज इस पंक्ति को अपने स्टेटस पर लगाएं' },
    featuredSaved: 'सेव हो गया। अब इसे स्टेटस पर लगाएं।', preparing: 'इमेज तैयार हो रही है',
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
  featured,
  extra,
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
    // Fetch the sheet's code now, not at the moment a save hands off a download.
    const preload = setTimeout(() => {
      if (nextStep) loadNextStepSheet().catch(() => {})
    }, 1500)
    return () => {
      clearTimeout(preload)
      const a = audioRef.current
      if (a) {
        a.pause()
        playing.delete(a)
      }
    }
  }, [])

  const base = { item_id: item.id, item_type: item.type, ...props }

  const confirm = (action: SheetAction, msg?: string, delay = 0) => {
    if (nextStep && claimFirstAction()) {
      hideToast()
      // After a download, let the browser finish handing the file off before the sheet mounts.
      if (delay) setTimeout(() => setSheet(action), delay)
      else setSheet(action)
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
      if (nextStep) loadNextStepSheet().catch(() => {})
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

  const [busy, setBusy] = useState(false)

  const onSave = async (e: React.MouseEvent<HTMLElement>, format: ShareFormat, from: 'menu' | 'featured' = 'menu') => {
    e.preventDefault()
    setSaveOpen(false)
    if (busy) return
    setBusy(true)
    const slow = from === 'featured' ? setTimeout(() => showToast(t.preparing, 4000), 600) : undefined
    const name = image!.fileName(format)
    let via: 'share' | 'download'
    try {
      const blob = await getBlob(format)
      clearTimeout(slow)
      const file = new File([blob], name, { type: blob.type || 'image/png' })
      if (isCoarse() && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file] })
          via = 'share'
        } catch (err) {
          if ((err as DOMException)?.name === 'AbortError') {
            trackEvent(EVENTS.QuoteImageSaveCancelled, { ...base, format })
            return
          }
          // NotAllowedError (the tap expired while the image rendered) and others: save the file instead.
          downloadBlob(blob, name)
          via = 'download'
        }
      } else {
        downloadBlob(blob, name)
        via = 'download'
      }
    } catch {
      clearTimeout(slow)
      if (image!.url) window.open(image!.url(format), '_blank', 'noopener')
      trackEvent(EVENTS.QuoteImageSaveFailed, { ...base, format })
      showToast(t.saveFailed)
      return
    } finally {
      setBusy(false)
    }
    trackEvent(EVENTS.QuoteImageSaved, { ...base, format, method: via })
    confirm('saved', from === 'featured' ? t.featuredSaved : t.saved, via === 'download' ? 600 : 0)
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

  const showFeatured = featured === 'status' && Boolean(image)
  // Controls in the row (the featured button sits above it), so a phone can lay six out as 3 + 3.
  const count = 2 + (image ? 1 : 0) + (audioSrc ? 1 : 0) + (canNative ? 1 : 0) + (extra ? 1 : 0)
  const warmStatus = () => {
    getBlob('status').catch(() => {})
    if (nextStep) loadNextStepSheet().catch(() => {})
  }

  return (
    <>
      <div
        className={`qc-actions sx-share${size === 'compact' ? ' sx-share--compact' : ''}${showFeatured ? ' sx-share--featured' : ''} ${className}`.trim()}
        role="group"
        aria-label={t.actions}
        data-count={count}
      >
        {showFeatured && image && (
          <a
            className="qc-act qc-act--featured"
            data-mp-tracked=""
            href={image.url ? image.url('status') : '#'}
            download={image.fileName('status')}
            aria-busy={busy || undefined}
            onPointerDown={warmStatus}
            onPointerEnter={warmStatus}
            onFocus={warmStatus}
            onClick={(e) => onSave(e, 'status', 'featured')}
          >
            <span className="qc-feat-ico">
              <Icon name="whatsapp" />
            </span>
            <span className="qc-feat-txt">
              <strong>{t.featured}</strong>
              <span>{item.type === 'verse' ? t.featuredSub.verse : t.featuredSub.line}</span>
            </span>
          </a>
        )}
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
        {extra}
      </div>
      {sheet && (
        <NextStepSheet action={sheet} locale={locale} pageName={pageKey ?? item.id} pageKey={pageKey} startSituation={startSituation} onClose={() => setSheet(null)} />
      )}
    </>
  )
}
