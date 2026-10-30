/**
 * The house hero for every Chalisa page: a maroon diya glow, crumbs, eyebrow,
 * Playfair H1, a short sub, fact chips and one gold action. There is no art of
 * Hanuman yet, so the visual is typographic: an Awadhi line set large in Tiro
 * (HeroLine), or on the line pages the mala itself.
 */

import type { ReactNode } from 'react'
import LineText from './LineText'

export function HeroLine({ awadhi, iast, caption }: { awadhi: [string, string]; iast: [string, string]; caption: string }) {
  return (
    <figure className="hc-hero-line">
      <span className="hc-orn" aria-hidden="true">
        <i />
        <i />
        <i />
      </span>
      <LineText awadhi={awadhi} iast={iast} as="blockquote" className="hc-line" />
      <span className="hc-hero-rule" aria-hidden="true" />
      <figcaption>{caption}</figcaption>
    </figure>
  )
}

export default function HcHero({
  crumbs,
  eyebrow,
  title,
  lang,
  sub,
  facts,
  factsLabel = 'About this page',
  actions,
  links,
  visual,
  below,
  variant = 'line',
}: {
  crumbs: ReactNode
  eyebrow: string
  title: ReactNode
  lang?: 'hi'
  sub: ReactNode
  facts?: string[]
  factsLabel?: string
  actions?: ReactNode
  links?: ReactNode
  visual?: ReactNode
  /** Sits under the text column (the line card on line pages). */
  below?: ReactNode
  /** 'line': the visual leads on phones. 'mala': the visual follows the text and card. */
  variant?: 'line' | 'mala'
}) {
  return (
    <header className={`hc-hero hc-hero-${variant}`}>
      <div className="hc-hero-glow" aria-hidden="true" />
      <div className="wrap hc-hero-inner">
        <div className="hc-hero-crumbs">{crumbs}</div>
        {visual && <div className="hc-hero-visual">{visual}</div>}
        <div className="hc-hero-text">
          <p className="hc-eyebrow" lang={lang}>
            {eyebrow}
          </p>
          <h1 className="hc-h1" lang={lang}>
            {title}
          </h1>
          <p className="hc-sub" id="quick-answer" lang={lang}>
            {sub}
          </p>
          {facts && facts.length > 0 && (
            <ul className="hc-facts" aria-label={factsLabel} lang={lang}>
              {facts.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
          )}
          {actions && <div className="hc-hero-actions hc-noprint">{actions}</div>}
          {links && <div className="hc-hero-links hc-noprint">{links}</div>}
        </div>
        {below && <div className="hc-hero-below">{below}</div>}
      </div>
    </header>
  )
}
