'use client'

/**
 * The kit share bar for a shalaka answer, with the answer card drawn on the device
 * (shareCard.ts) as the Save image. Events come from ShareActions: Quote Copied, Quote Shared
 * { method }, Quote Image Saved { format }, all with item_id rs-<n> and item_type 'shalaka'.
 */

import { ShareActions } from '@/components/site'
import type { Locale } from '@/lib/locale'
import type { RsRitualLine } from '@/lib/funnels/ram-shalaka/core'
import { cardFonts, drawCard, type CardCopy } from './shareCard'

type Props = {
  line: RsRitualLine
  locale: Locale
  card: CardCopy
  copyText: string
  shareText?: string
  nextStep?: boolean
  pageKey?: string
  props?: Record<string, unknown>
  size?: 'default' | 'compact'
  className?: string
}

export default function ShalakaShare({ line, locale, card, copyText, shareText, nextStep = true, pageKey, props, size, className }: Props) {
  return (
    <ShareActions
      item={{ id: `rs-${line.n}`, type: 'shalaka' }}
      locale={locale}
      copyText={copyText}
      shareText={shareText}
      image={{
        render: (format) => drawCard(line, card, cardFonts(locale), locale, format),
        fileName: (format) => `ram-shalaka-${line.slug}${format === 'post' ? '-post' : ''}.png`,
      }}
      nextStep={nextStep}
      pageKey={pageKey}
      props={props}
      size={size}
      className={className}
    />
  )
}
