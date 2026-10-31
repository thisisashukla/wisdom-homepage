'use client'

import { ShareActions } from '@/components/site'
import { cardImageUrl, SITE_URL } from '@/lib/quotes-shared'
import type { Locale } from '@/lib/locale'

/** The kit share bar for one Mahabharata line: copy text links back to the line on this page; Save image when the line has a card. */
export default function LineShare({
  lineId,
  cardId,
  domId,
  deva,
  meaning,
  source,
  path,
  locale,
  pageKey,
}: {
  lineId: string
  cardId: string | null
  domId: string
  deva: string
  meaning: string
  source: string
  path: string
  locale: Locale
  pageKey: string
}) {
  const text = (src: 'copy' | 'whatsapp') => [deva, '', `"${meaning}"`, source, `${SITE_URL}${path}?utm_source=${src}&utm_medium=quote#${domId}`].join('\n')
  const file = `mahabharata-${lineId.slice(4).replace(/\./g, '-')}`
  return (
    <ShareActions
      item={{ id: lineId, type: 'line' }}
      locale={locale}
      copyText={text('copy')}
      shareText={text('whatsapp')}
      image={
        cardId
          ? { url: (format) => cardImageUrl(cardId, { format, lang: locale }), fileName: (format) => `${file}${format === 'status' ? '-status' : ''}.png` }
          : undefined
      }
      pageKey={pageKey}
      props={cardId ? { card_id: cardId } : undefined}
    />
  )
}
