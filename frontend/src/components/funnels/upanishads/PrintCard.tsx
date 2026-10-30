'use client'

import type { Locale } from '@/lib/quotes-shared'
import { upTrack } from './track'

type Props = { cardId: string; line: string; page: string; locale: Locale; alt: string; labels: { post: string; status: string; caption: string } }

/** The print-quality Devanagari card: a preview plus links to the full-size images. */
export default function PrintCard({ cardId, line, page, locale, alt, labels }: Props) {
  const url = (format: 'post' | 'status') => `/api/quote-card/${encodeURIComponent(cardId)}?format=${format}&lang=${locale}&theme=paper`
  const open = (format: string) => upTrack('Print Card Opened', page, locale, { line, format })
  return (
    <figure className="fx-print">
      <a data-mp-tracked="" href={url('post')} target="_blank" rel="noopener" onClick={() => open('post')} className="fx-print-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url('post')} alt={alt} width={1080} height={1350} loading="lazy" decoding="async" />
      </a>
      <figcaption>
        <p>{labels.caption}</p>
        <p className="fx-print-links">
          <a data-mp-tracked="" href={url('post')} target="_blank" rel="noopener" onClick={() => open('post')}>
            {labels.post}
          </a>
          <a data-mp-tracked="" href={url('status')} target="_blank" rel="noopener" onClick={() => open('status')}>
            {labels.status}
          </a>
        </p>
      </figcaption>
    </figure>
  )
}
