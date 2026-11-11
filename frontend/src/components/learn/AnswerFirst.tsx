import type { Locale } from '@/lib/locale'
import './learn.css'

export type AnswerSource = {
  /** The original line (Sanskrit or Awadhi, Devanagari). Line breaks are kept. */
  text: string
  /** Where the line comes from, e.g. "Valmiki Ramayana, Aranya Kanda, sarga 45". */
  ref: string
  lang: 'sa' | 'awa' | 'hi'
  /** The same line in IAST; shown instead when the reader picks English letters (ScriptToggle). */
  iast?: string
}

export type AnswerFirstProps = {
  /** The question as a searcher asks it. */
  question: string
  /** The direct answer, one or two sentences. */
  answer: string
  /** The line the answer rests on, with its reference. */
  source?: AnswerSource
  locale?: Locale
  id?: string
  className?: string
}

/**
 * Answer-first block: sits right under a page's H1 (PageHero `answer`), so a reader who
 * arrives with a direct question gets the answer and its source line before anything else.
 * Also used on its own in a list of answers (/hi/ramayana/in-the-original); give each an `id`.
 */
export default function AnswerFirst({ question, answer, source, locale = 'en', id = 'short-answer', className = '' }: AnswerFirstProps) {
  const headId = `${id}-q`
  return (
    <section id={id} className={`af ${className}`.trim()} aria-labelledby={headId} data-mp-section={id === 'short-answer' ? 'short_answer' : `short_answer_${id}`}>
      <h2 className="af-q" id={headId} lang={locale}>
        {question}
      </h2>
      <p className="af-a" lang={locale}>
        {answer}
      </p>
      {source && (
        <figure className="af-src">
          <blockquote className={`af-orig${source.lang === 'awa' ? ' af-orig--awa' : ''}`} lang={source.lang === 'awa' ? 'hi' : source.lang}>
            <span className={source.iast ? 'sx-deva' : undefined}>{source.text}</span>
            {source.iast && (
              <span className="sx-iast" lang="sa-Latn">
                {source.iast}
              </span>
            )}
          </blockquote>
          <figcaption className="af-ref">{source.ref}</figcaption>
        </figure>
      )}
    </section>
  )
}
