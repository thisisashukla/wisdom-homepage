import type { ReactNode } from 'react'
import { VerseCard } from '@/components/site'
import type { Locale } from '@/lib/locale'
import type { LineView } from '@/lib/funnels/ramayana/types'
import { lineOriginal } from '@/lib/funnels/ramayana/verse'

const LABEL = {
  en: { said: 'Said by', id: 'Line id' },
  hi: { said: 'वक्ता', id: 'पंक्ति आईडी' },
}

/** Who says the line, with the text's mark (sindoor for Valmiki, gold for Tulsidas and the Gita). */
export function Speaker({ line, locale }: { line: Pick<LineView, 'speaker' | 'text'>; locale: Locale }) {
  return (
    <>
      <span className={`rl-mark rl-mark-${line.text}`} aria-hidden="true" />
      <span className="rl-sr">{LABEL[locale].said} </span>
      {line.speaker}
    </>
  )
}

/**
 * One original line as a VerseCard: speaker, the original (Devanagari or IAST, by the site setting),
 * Wisdom's plain meaning, the reference (linked when it has a page) and the Wisdom line id.
 */
export default function LineVerse({
  line,
  locale,
  showId = true,
  size = 'compact',
  framed = true,
  toggle = false,
  as,
  children,
}: {
  line: LineView
  locale: Locale
  showId?: boolean
  size?: 'default' | 'compact'
  framed?: boolean
  toggle?: boolean
  as?: 'li' | 'div' | 'figure'
  children?: ReactNode
}) {
  return (
    <VerseCard
      as={as}
      size={size}
      framed={framed}
      align="left"
      toggle={toggle}
      locale={locale}
      label={<Speaker line={line} locale={locale} />}
      {...lineOriginal(line)}
      meaning={line.meaning}
      source={line.ref}
      sourceHref={line.href}
    >
      {(showId || children) && (
        <>
          {children}
          {showId && (
            <p className="rl-line-id">
              {LABEL[locale].id} {line.id}
            </p>
          )}
        </>
      )}
    </VerseCard>
  )
}
