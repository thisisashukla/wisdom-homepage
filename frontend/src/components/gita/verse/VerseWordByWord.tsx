/**
 * Word-by-word meaning, closed by default. Each Sanskrit word shows its Devanagari, IAST and
 * gloss; below the grid, the literal reading (English glosses only) and the verse in the plain
 * spelling people type when they search. Everything stays in the HTML, so search engines and AI
 * crawlers read it even while it is closed.
 *
 *   <VerseWordByWord words={[{ sa: 'कर्मणि', gloss: 'in action' }]} locale="en" plain="karmanyevadhikaraste ..." />
 *
 * Server component (a native <details>). Opening it is tracked by BlogTracker's section events
 * through data-mp-section.
 */
import { wordIast } from '@/lib/verseText'
import './verse.css'

export type WbwWord = { sa: string; gloss: string }

const COPY = {
  en: {
    title: 'Word by word',
    sub: 'Each Sanskrit word with how it is said and what it means',
    literal: 'Read literally',
    plain: 'Simple spelling',
  },
  hi: {
    title: 'शब्दार्थ',
    sub: 'हर संस्कृत शब्द, उसका उच्चारण और अर्थ',
    literal: 'शब्दशः',
    plain: 'रोमन लिपि में',
  },
} as const

type Props = {
  words: WbwWord[]
  locale: 'en' | 'hi'
  /** Language of the glosses (Hindi pages may gloss in Hindi or English). */
  glossLang: 'en' | 'hi'
  /** The whole verse in the plain typing form. */
  plain?: string
  /** Section id for analytics, e.g. verse_2_47_wbw. */
  section: string
}

export default function VerseWordByWord({ words, locale, glossLang, plain, section }: Props) {
  if (!words.length && !plain) return null
  const t = COPY[locale]
  return (
    <details className="vp-fold vp-wbw" data-mp-section={section}>
      <summary>
        <span className="vp-fold-title">{t.title}</span>
        <span className="vp-fold-sub">{t.sub}</span>
      </summary>
      {words.length > 0 && (
        <ul className="vp-wbw-grid">
          {words.map((w, i) => (
            <li key={i} className="vp-word">
              <span className="vp-word-sa" lang="sa">{w.sa}</span>
              <span className="vp-word-ro" lang="sa-Latn">{wordIast(w.sa)}</span>
              <span className="vp-word-gl" lang={glossLang}>{w.gloss}</span>
            </li>
          ))}
        </ul>
      )}
      {words.length > 0 && glossLang === 'en' && (
        <p className="vp-wbw-line">
          <b>{t.literal}</b> {words.map((w) => w.gloss).join(' · ')}
        </p>
      )}
      {plain && (
        <p className="vp-wbw-line" lang="sa-Latn">
          <b>{t.plain}</b> {plain}
        </p>
      )}
    </details>
  )
}
