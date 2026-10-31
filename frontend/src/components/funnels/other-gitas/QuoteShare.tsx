'use client'

import { ShareActions } from '@/components/site'
import { cardImageUrl, viewCopyText, type QuoteView } from '@/lib/quotes-shared'

/** The kit share bar for one Ashtavakra quote card, with its 4:5 and 9:16 card images. */
export default function QuoteShare({ quote, pageKey, position }: { quote: QuoteView; pageKey: string; position: number }) {
  return (
    <ShareActions
      item={{ id: quote.id, type: 'quote' }}
      locale="en"
      copyText={viewCopyText(quote, 'copy')}
      shareText={viewCopyText(quote, 'whatsapp')}
      image={{ url: (format) => cardImageUrl(quote.id, { format, lang: 'en' }), fileName: (format) => `${quote.file}-${format}.png` }}
      pageKey={pageKey}
      props={{ position }}
    />
  )
}
