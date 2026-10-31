'use client'

/**
 * The share bar for one Chalisa unit: the kit's ShareActions with the line's
 * copy text and, for the 12 units that have a share card, Save image from the
 * card image route. (ShareActions takes image functions, so this thin client
 * wrapper builds them from the card id.)
 */

import { ShareActions } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { SITE } from '@/lib/seo'
import { cardImageUrl } from '@/lib/quotes-shared'
import { kindOf, START_SITUATION } from '@/lib/funnels/hanuman-chalisa/shared'

export default function LineShare({
  id,
  awadhi,
  meaning,
  source,
  path,
  cardId,
  audioSrc,
  pageKey,
  locale,
}: {
  id: string
  awadhi: [string, string]
  meaning: string
  source: string
  path: string
  cardId: string | null
  audioSrc?: string | null
  pageKey: string
  locale: Locale
}) {
  const text = (utm: string) =>
    [awadhi[0], awadhi[1], '', `"${meaning}"`, source, `${SITE}${path}?utm_source=${utm}&utm_medium=quote`].join('\n')
  return (
    <ShareActions
      item={{ id, type: kindOf(id) }}
      locale={locale}
      copyText={text('copy')}
      shareText={text('whatsapp')}
      whatsappFallback={`${SITE}${path}`}
      image={
        cardId
          ? {
              url: (format) => cardImageUrl(cardId, { format, lang: locale, download: true }),
              fileName: (format) => `hanuman-chalisa-${cardId}-${format}.png`,
            }
          : undefined
      }
      audioSrc={audioSrc}
      pageKey={pageKey}
      startSituation={START_SITUATION}
    />
  )
}
