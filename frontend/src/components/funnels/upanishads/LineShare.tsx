'use client'

/** ShareActions for a famous line. A client wrapper so the card image URLs can be built here (functions cannot cross from the server). */
import { ShareActions } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { cardImageUrl, viewCopyText, viewShareUrl, type QuoteView } from '@/lib/quotes-shared'

export default function LineShare({ view, locale, pageKey }: { view: QuoteView; locale: Locale; pageKey: string }) {
  return (
    <ShareActions
      item={{ id: view.id, type: 'line' }}
      locale={locale}
      copyText={viewCopyText(view, 'copy')}
      shareText={viewCopyText(view, 'whatsapp')}
      whatsappFallback={viewShareUrl(view, 'whatsapp')}
      image={{ url: (format) => cardImageUrl(view.id, { format, lang: locale, v: view.v, download: true }), fileName: (format) => `${view.file}-${format}.png` }}
      pageKey={pageKey}
    />
  )
}
