'use client'

/**
 * The share bar for one Ramayana card: the kit's ShareActions with the card's copy text and
 * Save image from the card image route. (ShareActions takes image functions, so this thin
 * client wrapper builds them from the card id.)
 */

import { ShareActions } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { SITE } from '@/lib/seo'
import { cardImageUrl } from '@/lib/quotes-shared'

export default function KeepShare({
  id,
  sa,
  meaning,
  sourceLine,
  path,
  fileBase,
  position,
  pageKey,
  locale,
}: {
  id: string
  sa: string
  meaning: string
  sourceLine: string
  path: string
  fileBase: string
  position: number
  pageKey: string
  locale: Locale
}) {
  const text = (utm: string) => [sa, '', `"${meaning}"`, sourceLine, `${SITE}${path}?utm_source=${encodeURIComponent(utm)}&utm_medium=quote#${id}`].join('\n')
  return (
    <ShareActions
      item={{ id, type: 'quote' }}
      locale={locale}
      copyText={text('copy')}
      shareText={text('whatsapp')}
      image={{
        url: (format) => cardImageUrl(id, { format, lang: locale, download: true }),
        fileName: (format) => `${fileBase}-${format}.png`,
      }}
      pageKey={pageKey}
      props={{ position }}
    />
  )
}
