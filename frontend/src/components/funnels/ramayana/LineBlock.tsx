'use client'

import type { LineView } from '@/lib/funnels/ramayana/types'
import { useScript } from './script'

const LABEL = {
  en: { said: 'Said by', id: 'Line id' },
  hi: { said: 'वक्ता', id: 'पंक्ति आईडी' },
}

/** One original line: Devanagari or IAST (never both), then Wisdom's plain meaning and the reference. */
export default function LineBlock({ line, locale, showId = true }: { line: LineView; locale: 'en' | 'hi'; showId?: boolean }) {
  const script = useScript()
  const t = LABEL[locale]
  const padas = (script === 'deva' ? line.sa.match(/[^।॥]+[।॥]*/gu) : line.iast.match(/[^|]+\|*/g)) ?? [line.sa]
  return (
    <figure className={`rl-line rl-line-${line.lang} rl-text-${line.text}`}>
      <blockquote className="rl-orig" lang={script === 'deva' ? line.lang : `${line.lang}-Latn`} data-script={script}>
        {padas.filter((p) => p.trim()).map((p, i) => (
          <span key={i} className="rl-pada">
            {p.trim()}
          </span>
        ))}
      </blockquote>
      <p className="rl-meaning" lang={locale}>
        {line.meaning}
      </p>
      <figcaption className="rl-cite">
        <span className="rl-cite-who">
          <span className="rl-sr">{t.said} </span>
          {line.speaker}
        </span>
        {line.href ? (
          <a className="rl-cite-ref rl-gold" href={line.href} data-mp-location="line_ref">
            {line.ref}
          </a>
        ) : (
          <span className="rl-cite-ref">{line.ref}</span>
        )}
        {showId && (
          <span className="rl-cite-id">
            {t.id} {line.id}
          </span>
        )}
      </figcaption>
    </figure>
  )
}
