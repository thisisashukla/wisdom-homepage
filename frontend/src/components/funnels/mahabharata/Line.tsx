import { VerseCard, type VerseCardProps } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { domIdOf, type MbhLine } from '@/lib/funnels/mahabharata/lines'
import LineShare from './LineShare'

type Props = {
  line: MbhLine
  locale?: Locale
  /** Page path the copied link points back to. */
  path: string
  /** NextStep / share attribution key ("mbh-hub"). */
  pageKey: string
  /** Small label above the line, e.g. "The Yaksha asks". */
  label?: string
  actions?: boolean
  showContext?: boolean
  /** A different DOM id when the same line appears twice on a page. */
  domId?: string
  size?: VerseCardProps['size']
  as?: VerseCardProps['as']
  className?: string
}

/** One Mahabharata line as a kit VerseCard: Devanagari or IAST, the meaning, speaker and verse, then the share bar. */
export default function Line({ line, locale = 'en', path, pageKey, label, actions = true, showContext = true, domId, size, as = 'article', className }: Props) {
  const id = domId ?? domIdOf(line.id)
  const hasHi = locale === 'hi' && Boolean(line.hi)
  const meaning = hasHi ? (line.hi as string) : line.en
  const ref = locale === 'hi' ? line.refHi : line.ref
  const speaker = line.speaker[locale]
  const withActions = actions && !line.noShare
  return (
    <VerseCard
      as={as}
      id={id}
      rv
      className={`mb-line${className ? ` ${className}` : ''}`}
      label={label}
      original={line.deva}
      iast={line.iast}
      meaning={locale === 'hi' && !hasHi ? <span lang="en">{line.en}</span> : meaning}
      source={`${speaker} · ${ref}`}
      locale={locale}
      size={size}
      actions={
        withActions ? (
          <LineShare
            lineId={line.id}
            cardId={line.cardId}
            domId={id}
            deva={line.deva}
            meaning={meaning}
            source={`${speaker}, ${ref}`}
            path={path}
            locale={locale}
            pageKey={pageKey}
          />
        ) : undefined
      }
    >
      {showContext && line.context && locale === 'en' ? <p className="mb-context">{line.context}</p> : undefined}
    </VerseCard>
  )
}
