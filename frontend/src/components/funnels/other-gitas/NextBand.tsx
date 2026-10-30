/** The device-specific next step at the end of every funnel page, in a house glow panel. */
import type { ReactNode } from 'react'
import NextStep from '@/components/quotes/NextStep'
import { NEXT_COPY } from '@/lib/funnels/other-gitas/content'

export default function NextBand({
  pageKey,
  placement = 'end',
  note,
  after,
  bare = false,
}: {
  pageKey: string
  placement?: string
  note?: string
  after?: ReactNode
  bare?: boolean
}) {
  const panel = (
    <div className={`og-next${bare ? '' : ' rv'}`}>
      <NextStep funnel="other-gitas" locale="en" pageName={pageKey} pageKey={pageKey} placement={placement} copy={NEXT_COPY} />
      {note && <p className="og-next-note">{note}</p>}
    </div>
  )
  if (bare) return panel
  return (
    <section className="section section-warm" aria-label="Your next step" data-fx-fade="">
      <div className="wrap og-col">
        {panel}
        {after && <p className="og-next-after">{after}</p>}
      </div>
    </section>
  )
}
