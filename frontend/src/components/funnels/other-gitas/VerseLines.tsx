/** One verse: Devanagari and IAST (the toggle shows one), then Wisdom's English. Server component. */
import { padas, type AgVerse } from '@/lib/funnels/other-gitas/data'

export default function VerseLines({ verse, english = true }: { verse: AgVerse; english?: boolean }) {
  return (
    <>
      <p className="fx-sa fx-deva" lang="sa">
        {padas(verse.sa).map((p, i) => (
          <span key={i}>{p}</span>
        ))}
      </p>
      <p className="fx-sa fx-iast" lang="sa-Latn">
        {padas(verse.iast).map((p, i) => (
          <span key={i}>{p}</span>
        ))}
      </p>
      {english && (
        <p className="fx-en" lang="en">
          {verse.en}
        </p>
      )}
    </>
  )
}
