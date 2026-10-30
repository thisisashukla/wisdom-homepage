'use client'

import { useEffect, useState } from 'react'
import { ensureToast, showToast, writeClipboard } from '@/components/quotes/session'
import { cardImageUrl, SITE_URL } from '@/lib/quotes-shared'
import { mbTrack, type MbLocale } from './track'

type Props = {
  lineId: string
  domId: string
  deva: string
  meaning: string
  source: string
  /** Page the copied link points back to. */
  path: string
  cardId: string | null
  page: string
  locale: MbLocale
}

const T = {
  en: { copy: 'Copy', copied: 'Copied', wa: 'WhatsApp', save: 'Save image', fail: 'Could not copy. Press and hold the line to copy it.', group: 'Use this line' },
  hi: { copy: 'कॉपी', copied: 'कॉपी हो गया', wa: 'WhatsApp', save: 'इमेज सेव', fail: 'कॉपी नहीं हो पाया। श्लोक को दबाकर रखें और कॉपी करें।', group: 'इस श्लोक को इस्तेमाल करें' },
} as const

/** Copy, WhatsApp and (for share cards) Save image, in the house quote-card action row. Reuses the quote-card event names. */
export default function LineActions({ lineId, domId, deva, meaning, source, path, cardId, page, locale }: Props) {
  const t = T[locale]
  const [done, setDone] = useState(false)
  useEffect(() => {
    ensureToast()
  }, [])

  const urlFor = (src: 'copy' | 'whatsapp') => `${SITE_URL}${path}?utm_source=${src}&utm_medium=quote#${domId}`
  const text = [deva, '', `"${meaning}"`, source, urlFor('copy')].join('\n')
  const waText = [deva, '', `"${meaning}"`, source, urlFor('whatsapp')].join('\n')
  const base = { quote_id: cardId ?? lineId, line_id: lineId }

  const onCopy = async () => {
    const ok = await writeClipboard(text)
    if (!ok) {
      showToast(t.fail)
      return
    }
    setDone(true)
    setTimeout(() => setDone(false), 1800)
    showToast(t.copied)
    mbTrack('Quote Copied', page, locale, { ...base, mode: 'full' })
  }

  return (
    <div className="qc-actions" role="group" aria-label={t.group}>
      <button type="button" className="qc-act qc-copy" onClick={onCopy} data-done={done ? '' : undefined}>
        <span className="qc-ico" aria-hidden="true">
          <i className="qi qi-copy" />
          <i className="qi qi-check" />
        </span>
        {done ? t.copied : t.copy}
      </button>
      <a data-mp-tracked=""
        className="qc-act"
        href={`https://wa.me/?text=${encodeURIComponent(waText)}`}
        target="_blank"
        rel="noopener"
        onClick={() => mbTrack('Quote Shared', page, locale, { ...base, channel: 'whatsapp' })}
      >
        <i className="qi qi-whatsapp" aria-hidden="true" />
        {t.wa}
      </a>
      {cardId && (
        <a data-mp-tracked=""
          className="qc-act"
          href={cardImageUrl(cardId, { format: 'post', lang: locale, download: true })}
          download={`mahabharata-${lineId.slice(4).replace(/\./g, '-')}.png`}
          onClick={() => mbTrack('Quote Image Saved', page, locale, { ...base, format: 'post', method: 'download' })}
        >
          <i className="qi qi-save" aria-hidden="true" />
          {t.save}
        </a>
      )}
    </div>
  )
}
