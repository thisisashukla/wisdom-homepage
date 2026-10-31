'use client'

/** The Vivekananda source chip: verdict stamp and volume; tap to open the Complete Works paragraph (SourceDrawer). */

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { EVENTS, trackEvent } from '@/lib/mixpanel'
import { VERDICT_LABEL, chipText, type DrawerData, type Locale } from '@/lib/funnels/sayings/shared'

const SourceDrawer = dynamic(() => import('./SourceDrawer'), { ssr: false })

export default function SourceChip({ drawer, locale, checkHref }: { drawer: DrawerData; locale: Locale; checkHref?: string }) {
  const [open, setOpen] = useState(false)
  const onChip = () => {
    setOpen(true)
    trackEvent(EVENTS.SourceDrawerOpened, { item_id: drawer.quoteId, item_type: 'quote', verdict: drawer.verdict })
  }
  return (
    <p className="fx-viv-source">
      <button type="button" className="fx-chip" aria-haspopup="dialog" onClick={onChip}>
        <span className="fx-stamp" data-verdict={drawer.verdict} lang={locale}>
          {VERDICT_LABEL[drawer.verdict][locale]}
        </span>
        <span className="fx-chip-text" lang="en">
          {chipText(drawer, 'en')}
        </span>
      </button>
      <noscript>
        <a className="sx-link" href={drawer.url} rel="noopener">
          {locale === 'hi' ? 'मूल पाठ' : 'Source text'}
        </a>
      </noscript>
      {checkHref && (
        <a className="sx-link" href={checkHref} data-mp-location="card_fact_check">
          {locale === 'hi' ? 'जाँच देखें' : 'See the check'}
        </a>
      )}
      {open && <SourceDrawer data={drawer} locale={locale} onClose={() => setOpen(false)} />}
    </p>
  )
}
