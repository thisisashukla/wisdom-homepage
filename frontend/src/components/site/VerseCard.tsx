import type { ReactNode } from 'react'
import type { Locale } from '@/lib/locale'
import ScriptToggle from './ScriptToggle'
import './site.css'

export type VerseLang = 'sa' | 'awa' | 'hi' | 'bra'

export type VerseCardProps = {
  /** The original, in Devanagari. A string with \n line breaks, or an array of lines (padas). */
  original: string | string[]
  /** IAST of the same lines. When given, the reader's script setting decides which one shows. */
  iast?: string | string[]
  /** Plain-language meaning, in the page language. */
  meaning?: ReactNode
  /** Citation ("Katha Upanishad 1.3.14"); links to sourceHref when given. */
  source?: ReactNode
  sourceHref?: string
  /** Small label above the verse ("Chaupai 7", "The line people quote"). */
  label?: ReactNode
  /** Language of the original: Sanskrit (default) sets Tiro Sanskrit; Awadhi, Hindi and Braj set Tiro Hindi. */
  lang?: VerseLang
  size?: 'hero' | 'default' | 'compact'
  /** Bordered card (default) or bare text. */
  framed?: boolean
  align?: 'center' | 'left'
  /** Shows the Devanagari / IAST switch in the card's top corner. Needs `iast`. */
  toggle?: boolean
  locale?: Locale
  /** Extra content under the source (word by word, notes). */
  children?: ReactNode
  /** Share / copy / save bar (ShareActions) or other controls, always last. */
  actions?: ReactNode
  /** Plays the verse reveal (rows rise in, rule draws). Use on the page's hero verse only. */
  reveal?: boolean
  /** Adds the site scroll reveal (.rv). */
  rv?: boolean
  as?: 'figure' | 'article' | 'div' | 'li'
  id?: string
  className?: string
}

const rows = (v: string | string[]) => (Array.isArray(v) ? v : v.split('\n')).map((r) => r.trim()).filter(Boolean)

/**
 * The one way a verse is set on the site. Fixed order: label and script switch, the original
 * (Devanagari or IAST, never both), the meaning, the source, extra content, then actions.
 */
export default function VerseCard({
  original,
  iast,
  meaning,
  source,
  sourceHref,
  label,
  lang = 'sa',
  size = 'default',
  framed = true,
  align = 'center',
  toggle = false,
  locale = 'en',
  children,
  actions,
  reveal = false,
  rv = false,
  as: Tag = 'figure',
  id,
  className = '',
}: VerseCardProps) {
  const deva = rows(original)
  const roman = iast ? rows(iast) : []
  const hasIast = roman.length > 0
  const cls = [
    'sx-verse',
    `sx-verse--${size}`,
    `sx-verse--${lang}`,
    framed && 'sx-verse--framed',
    align === 'left' && 'sx-verse--left',
    rv && 'rv',
    className,
  ]
    .filter(Boolean)
    .join(' ')
  const showTop = label || (toggle && hasIast)
  const MeaningTag = Tag === 'figure' ? 'figcaption' : 'div'
  return (
    <Tag id={id} className={cls} data-reveal={reveal ? '' : undefined}>
      {framed && <span className="sx-verse-rule" aria-hidden="true" />}
      {showTop && (
        <div className="sx-verse-top">
          {label ? <span className="sx-verse-label">{label}</span> : <span />}
          {toggle && hasIast && <ScriptToggle locale={locale} size="compact" />}
        </div>
      )}
      <p className={`sx-verse-orig${hasIast ? ' sx-deva' : ''}`} lang={lang === 'bra' ? 'hi' : lang}>
        {deva.map((r, i) => (
          <span key={i} className="sx-verse-row" style={{ ['--i' as string]: i }}>
            {r}
          </span>
        ))}
      </p>
      {hasIast && (
        <p className="sx-verse-orig sx-iast" lang={`${lang === 'bra' ? 'hi' : lang}-Latn`}>
          {roman.map((r, i) => (
            <span key={i} className="sx-verse-row" style={{ ['--i' as string]: i }}>
              {r}
            </span>
          ))}
        </p>
      )}
      {(meaning || source) && (
        <MeaningTag className="sx-verse-cap">
          {meaning && (
            <p className="sx-verse-meaning" lang={locale}>
              {meaning}
            </p>
          )}
          {source && <p className="sx-verse-source">{sourceHref ? <a href={sourceHref}>{source}</a> : <span>{source}</span>}</p>}
        </MeaningTag>
      )}
      {children && <div className="sx-verse-extra">{children}</div>}
      {actions && <div className="sx-verse-actions">{actions}</div>}
    </Tag>
  )
}

/** A list of verse cards with consistent spacing. Children are VerseCard as="li". */
export function VerseList({ children, columns = 1, className = '' }: { children: ReactNode; columns?: 1 | 2; className?: string }) {
  return <ul className={`sx-verse-list${columns === 2 ? ' sx-verse-list--2' : ''} ${className}`.trim()} data-stagger="60">{children}</ul>
}
