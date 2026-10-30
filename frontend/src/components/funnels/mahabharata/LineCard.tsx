import type { MbhLine } from '@/lib/funnels/mahabharata/lines'
import { domIdOf } from '@/lib/funnels/mahabharata/lines'
import LineActions from './LineActions'

type Props = {
  line: MbhLine
  locale?: 'en' | 'hi'
  page: string
  /** Page path the copied link points to. */
  path: string
  /** Small label above the line, e.g. "The Yaksha asks". */
  label?: string
  actions?: boolean
  showContext?: boolean
  /** Use a different DOM id when the same line appears twice on a page. */
  domId?: string
  className?: string
}

/** One Sanskrit line: Devanagari or IAST (by the page toggle), our English, who says it, and the ref. */
export default function LineCard({ line, locale = 'en', page, path, label, actions = true, showContext = true, domId, className }: Props) {
  const id = domId ?? domIdOf(line.id)
  const meaning = locale === 'hi' && line.hi ? line.hi : line.en
  const ref = locale === 'hi' ? line.refHi : line.ref
  const speaker = line.speaker[locale]
  const devaRows = line.deva.split('\n')
  const iastRows = line.iast.split('\n')
  return (
    <article className={`mb-line${className ? ` ${className}` : ''}`} id={id}>
      {label && <p className="mb-line-label">{label}</p>}
      <p className="mb-deva" lang="sa">
        {devaRows.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
      </p>
      <p className="mb-iast" lang="sa-Latn">
        {iastRows.map((r, i) => (
          <span key={i}>{r}</span>
        ))}
      </p>
      <p className="mb-meaning" lang={locale === 'hi' && line.hi ? 'hi' : 'en'}>
        {meaning}
      </p>
      {showContext && line.context && locale === 'en' && <p className="mb-context">{line.context}</p>}
      <p className="mb-src">
        <span className="mb-ref">{ref}</span>
        <span className="mb-speaker">{speaker}</span>
      </p>
      {actions && !line.noShare && (
        <LineActions
          lineId={line.id}
          domId={id}
          deva={line.deva}
          meaning={meaning}
          source={`${speaker}, ${ref}`}
          path={path}
          cardId={line.cardId}
          page={page}
          locale={locale}
        />
      )}
    </article>
  )
}
