import { VerseCard } from '@/components/site'
import { PROV_LABEL, verseCardProps, type VerseData } from '@/lib/explore'
import './explore.css'

/** Why a verse sits where it does, with where that link comes from (the text itself, or our reading). */
export function Why({ text, prov }: { text?: string; prov?: 'text' | 'ours' }) {
  if (!text) return null
  return (
    <p className="ex-why">
      {text}{' '}
      {prov && <span className={`ex-badge ex-badge--${prov}`}>{PROV_LABEL[prov]}</span>}
    </p>
  )
}

/**
 * A verse from the map, set the site's one way (VerseCard: original, IAST under the site-wide
 * script setting, meaning, source) with its caption under it. Server and client both use it.
 */
export default function ExploreVerse({
  v,
  size = 'compact',
  as,
  rv = false,
  why = true,
  children,
}: {
  v: VerseData
  size?: 'default' | 'compact'
  as?: 'figure' | 'li' | 'div'
  rv?: boolean
  why?: boolean
  children?: React.ReactNode
}) {
  const cap = why && v.why ? <Why text={v.why} prov={v.p} /> : null
  return (
    <VerseCard {...verseCardProps(v)} size={size} align="left" as={as} rv={rv} className="ex-verse">
      {cap || children ? (
        <>
          {cap}
          {children}
        </>
      ) : undefined}
    </VerseCard>
  )
}
