/** One verse: Devanagari and IAST (the toggle shows one), then Wisdom's English. Server component.
 *  `keep` marks the lines that stay visible during "Hold to be still". */
import { padas, type AgVerse } from '@/lib/funnels/other-gitas/data'

export default function VerseLines({ verse, english = true, keep = false }: { verse: AgVerse; english?: boolean; keep?: boolean }) {
  const k = keep ? ' fx-keep' : ''
  return (
    <>
      <p className={`fx-sa fx-deva${k}`} lang="sa">
        {padas(verse.sa).map((p, i) => (
          <span key={i}>{p}</span>
        ))}
      </p>
      <p className={`fx-sa fx-iast${k}`} lang="sa-Latn">
        {padas(verse.iast).map((p, i) => (
          <span key={i}>{p}</span>
        ))}
      </p>
      {english && (
        <p className={`fx-en${k}`} lang="en">
          {verse.en}
        </p>
      )}
    </>
  )
}
