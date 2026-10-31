import type { ReactNode } from 'react'
import type { Locale } from '@/lib/locale'
import Breadcrumbs, { type Crumb } from './Breadcrumbs'
import { Actions, type Action } from './Button'
import Facts from './Facts'
import ScriptToggle from './ScriptToggle'
import VerseCard, { type VerseCardProps } from './VerseCard'
import './site.css'

export type PageHeroProps = {
  locale?: Locale
  /** Breadcrumb trail after Home; the last item is this page. */
  crumbs: Crumb[]
  /** Emit BreadcrumbList JSON-LD (default true). Set false if the page emits its own. */
  crumbsLd?: boolean
  eyebrow?: ReactNode
  title: ReactNode
  sub?: ReactNode
  facts?: string[]
  /** First action is the gold primary button; the rest render as links. */
  actions?: Action[]
  /** Anything else under the actions in the text column (a small note, a secondary row). */
  below?: ReactNode
  /** The hero verse: rendered as a hero-size VerseCard with the reveal moment and the script switch. */
  verse?: Omit<VerseCardProps, 'size' | 'reveal' | 'locale'>
  /** A custom visual instead of a verse (the mala, an interactive). Sits where the verse would. */
  visual?: ReactNode
  /** Full-bleed art behind the text (theme-plan style). */
  art?: { src: string; alt: string; position?: string; width?: number; height?: number }
  /** Shows the script switch in the crumbs row (for pages whose verses are below the hero). */
  scriptToggle?: boolean
  /** lang attribute for the text column (e.g. 'hi' on Hindi twins). */
  lang?: string
  id?: string
  className?: string
}

/**
 * The one page hero. Order is fixed on every page:
 * phone: crumbs, eyebrow, H1, sub, facts, actions, then the verse or visual;
 * desktop: the text column on the left, the verse or visual on the right.
 */
export default function PageHero({
  locale = 'en',
  crumbs,
  crumbsLd = true,
  eyebrow,
  title,
  sub,
  facts,
  actions = [],
  below,
  verse,
  visual,
  art,
  scriptToggle = false,
  lang,
  id,
  className = '',
}: PageHeroProps) {
  const side = verse ? <VerseCard {...verse} size="hero" reveal locale={locale} toggle={verse.toggle ?? Boolean(verse.iast)} /> : visual
  const split = Boolean(side) && !art
  return (
    <header id={id} className={`sx-hero${art ? ' sx-hero--art' : ''} ${className}`.trim()}>
      {art ? (
        <>
          <picture className="sx-hero-art">
            <img src={art.src} alt={art.alt} width={art.width ?? 1448} height={art.height ?? 1086} decoding="async" fetchPriority="high" style={art.position ? { objectPosition: art.position } : undefined} />
          </picture>
          <div className="sx-hero-shade" aria-hidden="true" />
        </>
      ) : (
        <div className="sx-hero-glow" aria-hidden="true" />
      )}
      <div className={`sx-wrap sx-hero-grid${split ? ' sx-hero-grid--split' : ''}`}>
        <div className="sx-crumbs-row">
          <Breadcrumbs items={crumbs} locale={locale} ld={crumbsLd} />
          {scriptToggle && <ScriptToggle locale={locale} size="compact" />}
        </div>
        <div className="sx-hero-text" lang={lang}>
          {eyebrow && <p className="sx-eyebrow">{eyebrow}</p>}
          <h1 className="sx-h1">{title}</h1>
          {sub && <p className="sx-sub">{sub}</p>}
          {facts && facts.length > 0 && <Facts items={facts} locale={locale} />}
          {actions.length > 0 && <Actions items={actions} />}
          {below}
        </div>
        {side && <div className="sx-hero-visual">{side}</div>}
      </div>
    </header>
  )
}
