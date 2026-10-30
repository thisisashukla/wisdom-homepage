'use client'

/**
 * Copy, WhatsApp and Save image for a sayings card. Same events as QuoteCard
 * (Quote Copied / Quote Shared / Quote Image Saved) plus funnel and hub. The first
 * action of the session opens the hub's sheet instead of a toast.
 */

import { useEffect, useRef, useState } from 'react'
import dynamic from 'next/dynamic'
import { Icon } from '@/components/quotes/Icons'
import { claimFirstAction, ensureToast, hideToast, showToast, writeClipboard, type SheetAction } from '@/components/quotes/session'
import { cardImageUrl, type CardFormat } from '@/lib/quotes-shared'
import { fxTrack, type Hub, type Locale } from '@/lib/funnels/sayings/shared'

const FxSheet = dynamic(() => import('./FxSheet'), { ssr: false })

const T = {
  en: { copy: 'Copy', copied: 'Copied', whatsapp: 'WhatsApp', save: 'Save image', post: 'Post', postSub: 'Feed, 4:5', status: 'Status', statusSub: 'Story or status, 9:16', saved: 'Saved', failed: 'Could not copy. Press and hold the line to copy it.', saveFailed: 'The image opened in a new tab. Press and hold it to save.', actions: 'Use this line' },
  hi: { copy: 'कॉपी', copied: 'कॉपी हो गया', whatsapp: 'WhatsApp', save: 'इमेज सेव', post: 'पोस्ट', postSub: 'फ़ीड, 4:5', status: 'स्टेटस', statusSub: 'स्टोरी या स्टेटस, 9:16', saved: 'सेव हो गया', failed: 'कॉपी नहीं हो पाया। पंक्ति को दबाकर रखें और कॉपी करें।', saveFailed: 'इमेज नए टैब में खुली है। उसे दबाकर रखें और सेव करें।', actions: 'इस पंक्ति को इस्तेमाल करें' },
}

export type CardActionsProps = {
  quoteId: string
  domId?: string
  /** Share card id in cards.json, when this line has one. */
  cardId?: string
  cardV?: string
  fileStem: string
  /** Full text for Copy and WhatsApp (line, meaning, source, link). */
  text: string
  hub: Hub
  locale: Locale
  pageName: string
  pageKey: string
  position?: number
  section?: string
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

export default function CardActions({ quoteId, domId, cardId, cardV, fileStem, text, hub, locale, pageName, pageKey, position, section }: CardActionsProps) {
  const t = T[locale]
  const [tick, setTick] = useState(false)
  const [saveOpen, setSaveOpen] = useState(false)
  const [sheet, setSheet] = useState<SheetAction | null>(null)
  const saveRef = useRef<HTMLDivElement>(null)
  const saveBtnRef = useRef<HTMLButtonElement>(null)
  const blobs = useRef(new Map<CardFormat, Promise<Blob>>())
  const base = { page: pageKey, locale, hub }
  const props = { quote_id: quoteId, page_name: pageName, moment: section ?? null, position: position ?? null }

  useEffect(() => {
    ensureToast()
  }, [])

  const confirm = (action: SheetAction, msg?: string) => {
    if (claimFirstAction()) {
      hideToast()
      setSheet(action)
    } else if (msg) showToast(msg)
  }

  const onCopy = async () => {
    if (!(await writeClipboard(text))) {
      showToast(t.failed)
      return
    }
    setTick(true)
    setTimeout(() => setTick(false), 1800)
    fxTrack('Quote Copied', base, { ...props, mode: 'full' })
    confirm('copied', t.copied)
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(text)}`
  const onWhatsApp = () => {
    fxTrack('Quote Shared', base, { ...props, channel: 'whatsapp' })
    confirm('shared')
  }

  const imgUrl = (format: CardFormat) => cardImageUrl(cardId ?? '', { format, lang: locale, v: cardV, download: true })
  const fileName = (format: CardFormat) => `${fileStem}-${format}.png`
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
    let method: 'share' | 'download' = 'download'
    try {
      const blob = await getBlob(format)
      const file = new File([blob], name, { type: blob.type || 'image/png' })
      const coarse = typeof window !== 'undefined' && window.matchMedia?.('(pointer: coarse)').matches
      if (coarse && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
        try {
          await navigator.share({ files: [file] })
          method = 'share'
        } catch (err) {
          if ((err as DOMException)?.name === 'AbortError') return
          downloadBlob(blob, name)
        }
      } else downloadBlob(blob, name)
    } catch {
      window.open(imgUrl(format), '_blank', 'noopener')
      showToast(t.saveFailed)
      return
    }
    fxTrack('Quote Image Saved', base, { ...props, format, method })
    confirm('saved', t.saved)
  }

  const menuId = `${domId ?? quoteId}-save`
  return (
    <>
      <div className="qc-actions" role="group" aria-label={t.actions}>
        <button type="button" className="qc-act qc-copy" data-done={tick ? '' : undefined} onClick={onCopy}>
          <span className="qc-ico">
            <Icon name="copy" />
            <Icon name="check" />
          </span>
          <span>{tick ? t.copied : t.copy}</span>
        </button>
        <a className="qc-act" href={waHref} target="_blank" rel="noopener" onClick={onWhatsApp}>
          <Icon name="whatsapp" />
          <span>{t.whatsapp}</span>
        </a>
        {cardId && (
          <div className="qc-save" ref={saveRef}>
            <button
              type="button"
              className="qc-act"
              ref={saveBtnRef}
              aria-expanded={saveOpen}
              aria-controls={saveOpen ? menuId : undefined}
              onClick={() => {
                if (!saveOpen) {
                  getBlob('post').catch(() => {})
                  getBlob('status').catch(() => {})
                }
                setSaveOpen(!saveOpen)
              }}
            >
              <Icon name="save" />
              <span>{t.save}</span>
            </button>
            {saveOpen && (
              <div className="qc-menu" id={menuId}>
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
        )}
      </div>
      {sheet && <FxSheet action={sheet} hub={hub} locale={locale} pageName={pageName} pageKey={pageKey} onClose={() => setSheet(null)} />}
    </>
  )
}
