'use client'

/**
 * "Keep" / "रखें": keeps a line on this device for this hub (lib/favourites). Sits in the card's
 * action row (ShareActions `extra`) and uses its look (.qc-act). The state shows as a filled
 * heart and aria-pressed; the label stays the same so screen readers hear one name.
 * Event: Quote Keep Toggled { item_id, item_type 'quote', to: 'kept' | 'released', hub, ...props (location) }.
 */

import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { normHub, toggleFavourite } from '@/lib/favourites'
import type { Locale } from '@/lib/quotes-shared'
import { Icon } from './Icons'
import { useFavourites } from './KeepScope'
import { showToast } from './session'
import './keep.css'

const T = {
  en: { keep: 'Keep', kept: 'Kept. It will be waiting at the top of this page when you return.', gone: 'Let go. You can keep it again any time.' },
  hi: { keep: 'रखें', kept: 'रख लिया। जब लौटेंगे, यह इसी पेज पर सबसे ऊपर मिलेगा।', gone: 'हटा दिया। जब मन करे, फिर रख लें।' },
} as const

export type KeepButtonProps = {
  id: string
  hub: string
  locale: Locale
  /** Extra analytics properties (moment, position, location). */
  props?: Record<string, unknown>
  className?: string
}

export default function KeepButton({ id, hub, locale, props, className = '' }: KeepButtonProps) {
  const t = T[locale]
  const h = normHub(hub)
  const on = useFavourites().some((f) => f.id === id && f.hub === h)

  const onClick = () => {
    const now = toggleFavourite(id, h)
    trackEvent(EVENTS.QuoteKeepToggled, { item_id: id, item_type: 'quote', to: now ? 'kept' : 'released', hub: h, ...props })
    showToast(now ? t.kept : t.gone, now ? 2600 : 1800)
  }

  return (
    <button type="button" className={`qc-act qc-keep ${className}`.trim()} aria-pressed={on} data-on={on ? '' : undefined} onClick={onClick}>
      <span className="qc-ico">
        <Icon name="heart" />
        <Icon name="heart-fill" />
      </span>
      <span>{t.keep}</span>
    </button>
  )
}
