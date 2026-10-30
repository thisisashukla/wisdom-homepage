'use client'

/** One verified Vivekananda line: the line, its source chip (opens the drawer), our Hindi meaning on Hindi pages, and actions. */

import { useState } from 'react'
import dynamic from 'next/dynamic'
import { VERDICT_LABEL, chipText, fxTrack, type DrawerData, type Locale } from '@/lib/funnels/sayings/shared'
import CardActions from './CardActions'
import '@/components/quotes/card.css'
import './sayings.css'

const SourceDrawer = dynamic(() => import('./SourceDrawer'), { ssr: false })

export type VivCardProps = {
  drawer: DrawerData
  /** Hindi meaning on Hindi pages, short plain note on English pages, or nothing. */
  meaning?: string
  meaningLang?: Locale
  cardId?: string
  locale: Locale
  pageName: string
  pageKey: string
  position?: number
  section?: string
  shareText: string
  /** Fact-check page for this line, when there is one. */
  checkHref?: string
  domId?: string
}

export default function VivCard({ drawer, meaning, meaningLang, cardId, locale, pageName, pageKey, position, section, shareText, checkHref, domId }: VivCardProps) {
  const [open, setOpen] = useState(false)
  const onChip = () => {
    setOpen(true)
    fxTrack('Source Drawer Opened', { page: pageKey, locale, hub: 'vivekananda' }, { quote_id: drawer.quoteId, verdict: drawer.verdict })
  }
  return (
    <article id={domId ?? drawer.quoteId} className="qc fx-card fx-viv-card rv" data-section={section}>
      <p className="fx-viv-line" lang="en">
        {drawer.line}
      </p>
      {meaning && (
        <p className="fx-viv-meaning" lang={meaningLang ?? locale}>
          {meaning}
        </p>
      )}
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
          <a className="fx-link" href={drawer.url} rel="noopener">
            {locale === 'hi' ? 'मूल पाठ' : 'Source text'}
          </a>
        </noscript>
        {checkHref && (
          <a className="fx-link" href={checkHref} data-mp-location="card_fact_check">
            {locale === 'hi' ? 'जाँच देखें' : 'See the check'}
          </a>
        )}
      </p>
      <CardActions
        quoteId={drawer.quoteId}
        cardId={cardId}
        fileStem={`vivekananda-quote-${drawer.quoteId.replace(/^viv-/, '')}`}
        text={shareText}
        hub="vivekananda"
        locale={locale}
        pageName={pageName}
        pageKey={pageKey}
        position={position}
        section={section}
      />
      {open && <SourceDrawer data={drawer} locale={locale} onClose={() => setOpen(false)} />}
    </article>
  )
}
