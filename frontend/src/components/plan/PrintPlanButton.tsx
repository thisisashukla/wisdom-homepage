'use client'

import { EVENTS, trackEvent } from '@/lib/mixpanel'

/** "Print this plan": the browser's print sheet, which also saves a PDF. The page's print CSS
 *  turns the day list into a checklist. Sends Sheet Printed { item_type: 'reading_plan' }. */
export default function PrintPlanButton({ plan, label = 'Print or save as PDF', location }: { plan: string; label?: string; location: string }) {
  return (
    <button
      type="button"
      className="sx-btn sx-btn--secondary"
      data-mp-tracked
      onClick={() => {
        trackEvent(EVENTS.SheetPrinted, { item_type: 'reading_plan', item_id: plan, location })
        window.print()
      }}
    >
      {label}
    </button>
  )
}
