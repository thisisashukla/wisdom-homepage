/** The device-specific next step at the end of every funnel page. */
import NextStep from '@/components/quotes/NextStep'
import { NEXT_COPY } from '@/lib/funnels/other-gitas/content'

export default function NextBand({ pageKey, placement = 'end', note }: { pageKey: string; placement?: string; note?: string }) {
  return (
    <section className="fx-next-band" aria-label="Your next step" data-fx-fade="">
      <NextStep funnel="other-gitas" locale="en" pageName={pageKey} pageKey={pageKey} placement={placement} copy={NEXT_COPY} />
      {note && <p className="fx-small">{note}</p>}
    </section>
  )
}
