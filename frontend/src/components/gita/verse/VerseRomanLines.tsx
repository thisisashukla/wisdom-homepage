/**
 * The shloka in IAST under the Devanagari, one half-verse per line, so readers who don't read
 * Devanagari can say it and search engines can match romanised queries ("karmanye vadhikaraste").
 *
 *   <VerseRomanLines roman={verseRoman(verse.sanskrit)} />
 *
 * Server component. Speaker line ("dhṛtarāṣṭra uvāca") is shown first, quieter.
 */
import type { VerseRoman } from '@/lib/verseText'
import './verse.css'

export default function VerseRomanLines({ roman }: { roman: VerseRoman }) {
  if (!roman.lines.length) return null
  return (
    <div className="vp-roman" lang="sa-Latn">
      {roman.speaker && <span className="vp-roman-speaker">{roman.speaker.iast}</span>}
      {roman.lines.map((l, i) => (
        <span key={i} className="vp-roman-line">{l.iast}</span>
      ))}
    </div>
  )
}
