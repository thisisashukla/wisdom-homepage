'use client'

import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { cardImage } from '@/lib/funnels/upanishads'

type Props = { cardId: string; line: string; locale: Locale; alt: string; labels: { post: string; status: string; caption: string } }

/** The print-quality Devanagari card: a preview plus links to the full-size images. */
export default function PrintCard({ cardId, line, locale, alt, labels }: Props) {
  const url = (format: 'post' | 'status') => cardImage(cardId, format, locale)
  const open = (format: 'post' | 'status') => trackEvent(EVENTS.PrintCardOpened, { item_id: line, item_type: 'line', format })
  return (
    <figure className="up-print">
      <a data-mp-tracked="" href={url('post')} target="_blank" rel="noopener" onClick={() => open('post')} className="up-print-img">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={url('post')} alt={alt} width={1080} height={1350} loading="lazy" decoding="async" />
      </a>
      <figcaption>
        <p>{labels.caption}</p>
        <p className="up-print-links">
          <a data-mp-tracked="" className="sx-link" href={url('post')} target="_blank" rel="noopener" onClick={() => open('post')}>
            {labels.post}
          </a>
          <a data-mp-tracked="" className="sx-link" href={url('status')} target="_blank" rel="noopener" onClick={() => open('status')}>
            {labels.status}
          </a>
        </p>
      </figcaption>
    </figure>
  )
}
