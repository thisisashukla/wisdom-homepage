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

/** Copy, WhatsApp and (for share cards) Save image. Reuses the quote-card event names. */
export default function LineActions({ lineId, domId, deva, meaning, source, path, cardId, page, locale }: Props) {
  const t = T[locale]
  const [done, setDone] = useState(false)
  useEffect(() => {
    ensureToast()
  }, [])

  const url = `${SITE_URL}${path}?utm_source=copy&utm_medium=quote#${domId}`
  const text = [deva, '', `"${meaning}"`, source, url].join('\n')
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
    <div className="mb-acts" role="group" aria-label={t.group}>
      <button type="button" onClick={onCopy} data-done={done ? '' : undefined}>
        {done ? t.copied : t.copy}
      </button>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(text)}`}
        target="_blank"
        rel="noopener"
        onClick={() => mbTrack('Quote Shared', page, locale, { ...base, channel: 'whatsapp' })}
      >
        {t.wa}
      </a>
      {cardId && (
        <a
          href={cardImageUrl(cardId, { format: 'post', lang: locale, download: true })}
          download={`mahabharata-${lineId.slice(4).replace(/\./g, '-')}.png`}
          onClick={() => mbTrack('Quote Image Saved', page, locale, { ...base, format: 'post', method: 'download' })}
        >
          {t.save}
        </a>
      )}
    </div>
  )
}
