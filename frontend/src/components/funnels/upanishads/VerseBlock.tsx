/** One verse of a complete text: ref (anchor link), speaker, Sanskrit, Wisdom's English, optional note. */
import type { ReactNode } from 'react'
import Sanskrit from './Sanskrit'

export type VerseView = { ref: string; anchor: string; sa: string; iast: string; en: string; who: string | null }

export default function VerseBlock({ v, label, note }: { v: VerseView; label: string; note?: ReactNode }) {
  return (
    <div className="fx-v" id={v.anchor}>
      <p className="fx-v-ref">
        <a href={`#${v.anchor}`} aria-label={`${label} ${v.ref}`}>
          {v.ref}
        </a>
        {v.who && <span className="fx-v-who">{v.who}</span>}
      </p>
      <div className="fx-v-body">
        <Sanskrit sa={v.sa} iast={v.iast} />
        <p className="fx-v-en">{v.en}</p>
        {note && <div className="fx-v-note">{note}</div>}
      </div>
    </div>
  )
}
