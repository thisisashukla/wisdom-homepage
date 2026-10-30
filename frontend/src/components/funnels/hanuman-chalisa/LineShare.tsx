'use client'

/**
 * Copy, WhatsApp and (for the 12 share cards) Save image for one Chalisa unit.
 * Reuses the quote helpers and the Quote Copied / Quote Shared / Quote Image
 * Saved events, with the funnel properties added.
 */

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import { cardImageUrl } from '@/lib/quotes-shared'
import { ensureToast, showToast, writeClipboard } from '@/components/quotes/session'
import { Icon } from '@/components/quotes/Icons'
import '@/components/quotes/card.css'
import { baseProps, SITE, type HcLocale } from '@/lib/funnels/hanuman-chalisa/shared'

const T = {
  en: { copy: 'Copy', copied: 'Copied', wa: 'WhatsApp', save: 'Save image', failed: 'Could not copy. Press and hold the line to copy it.', saved: 'Saved' },
  hi: { copy: 'कॉपी', copied: 'कॉपी हो गया', wa: 'WhatsApp', save: 'इमेज सेव', failed: 'कॉपी नहीं हो पाया। पंक्ति को दबाकर रखें और कॉपी करें।', saved: 'सेव हो गया' },
} as const

export default function LineShare({
  id,
  awadhi,
  meaning,
  source,
  path,
  cardId,
  page,
  locale,
}: {
  id: string
  awadhi: [string, string]
  meaning: string
  source: string
  path: string
  cardId: string | null
  page: string
  locale: HcLocale
}) {
  const t = T[locale]
  const [tick, setTick] = useState(false)
  useEffect(() => {
    ensureToast()
  }, [])

  const text = (utm: string) =>
    [awadhi[0], awadhi[1], '', `"${meaning}"`, source, `${SITE}${path}?utm_source=${utm}&utm_medium=quote`].join('\n')
  const props = { ...baseProps(page, locale), quote_id: id }

  const onCopy = async () => {
    const ok = await writeClipboard(text('copy'))
    if (!ok) return showToast(t.failed)
    setTick(true)
    setTimeout(() => setTick(false), 1600)
    trackEvent('Quote Copied', { ...props, mode: 'full' })
    showToast(t.copied)
  }

  const waHref = `https://wa.me/?text=${encodeURIComponent(`${SITE}${path}`)}`
  const onWa = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.href = `https://wa.me/?text=${encodeURIComponent(text('whatsapp'))}`
    trackEvent('Quote Shared', { ...props, channel: 'whatsapp' })
  }

  return (
    <div className="hc-acts hc-noprint" role="group">
      <button type="button" className="hc-act" data-done={tick ? '' : undefined} onClick={onCopy} lang={locale}>
        <Icon name={tick ? 'check' : 'copy'} />
        {tick ? t.copied : t.copy}
      </button>
      <a data-mp-tracked="" className="hc-act" href={waHref} target="_blank" rel="noopener" onClick={onWa}>
        <Icon name="whatsapp" />
        {t.wa}
      </a>
      {cardId && (
        <a data-mp-tracked=""
          className="hc-act"
          href={cardImageUrl(cardId, { format: 'status', lang: locale, download: true })}
          download={`hanuman-chalisa-${cardId}.png`}
          lang={locale}
          onClick={() => trackEvent('Quote Image Saved', { ...props, format: 'status', method: 'download' })}
        >
          <Icon name="save" />
          {t.save}
        </a>
      )}
    </div>
  )
}
