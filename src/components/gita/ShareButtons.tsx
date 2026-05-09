'use client'

/**
 * Share buttons for verse pages. URL-based, no backend.
 * Native Web Share API (mobile) + X + WhatsApp share-link + Copy link.
 * Every interaction emits a Mixpanel "Share Clicked" event.
 */

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

type Props = {
  /** Page-relative URL, e.g. /gita/chapter/2/verse/47 */
  url: string
  /** Quotable text — the verse translation or essence */
  text: string
  /** A short title — "Bhagavad Gita 2.47" */
  title: string
  locale?: 'en' | 'hi'
}

const labels = {
  en: { label: 'Share this verse', native: 'Share', x: 'X', wa: 'WhatsApp', copy: 'Copy link', copied: 'Copied' },
  hi: { label: 'इस श्लोक को share करें', native: 'Share', x: 'X', wa: 'WhatsApp', copy: 'Link copy करें', copied: 'Copy हो गया' },
}

export default function ShareButtons({ url, text, title, locale = 'en' }: Props) {
  const t = labels[locale]
  const [copied, setCopied] = useState(false)
  const [hasNative, setHasNative] = useState(false)

  useEffect(() => {
    setHasNative(typeof navigator !== 'undefined' && typeof (navigator as Navigator & { share?: unknown }).share === 'function')
  }, [])

  const fullUrl = `https://wisdomquotes.in${url}`
  const composed = `"${text}"\n\n— ${title}\n${fullUrl}`

  const xUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(`"${text}" — ${title}`)}&url=${encodeURIComponent(fullUrl)}`
  const waUrl = `https://wa.me/?text=${encodeURIComponent(composed)}`

  const onNative = async () => {
    trackEvent('Share Clicked', { method: 'native', url, locale })
    try {
      await (navigator as Navigator & { share: (data: ShareData) => Promise<void> }).share({ title, text, url: fullUrl })
    } catch {
      /* user cancelled */
    }
  }
  const onCopy = async () => {
    trackEvent('Share Clicked', { method: 'copy', url, locale })
    try {
      await navigator.clipboard.writeText(fullUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard blocked */
    }
  }
  const trackOut = (method: string) => () => trackEvent('Share Clicked', { method, url, locale })

  return (
    <div className="gita-share" role="group" aria-label={t.label}>
      <span className="gita-share-label">{t.label}</span>
      {hasNative && (
        <button type="button" onClick={onNative} className="gita-share-btn" data-mp-location="share_native">
          <span aria-hidden>↗</span> {t.native}
        </button>
      )}
      <a
        className="gita-share-btn"
        href={xUrl}
        target="_blank"
        rel="noopener"
        onClick={trackOut('x')}
        data-mp-location="share_x"
      >
        <span aria-hidden>𝕏</span> {t.x}
      </a>
      <a
        className="gita-share-btn"
        href={waUrl}
        target="_blank"
        rel="noopener"
        onClick={trackOut('whatsapp')}
        data-mp-location="share_whatsapp"
      >
        <span aria-hidden>◎</span> {t.wa}
      </a>
      <button
        type="button"
        onClick={onCopy}
        className={`gita-share-btn ${copied ? 'copied' : ''}`}
        data-mp-location="share_copy"
      >
        <span aria-hidden>{copied ? '✓' : '⎘'}</span> {copied ? t.copied : t.copy}
      </button>
    </div>
  )
}
