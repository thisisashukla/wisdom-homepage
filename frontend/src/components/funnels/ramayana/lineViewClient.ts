import type { Line, LineView } from '@/lib/funnels/ramayana/types'

/** English view of a stored line, for client components that already hold the Line. */
export function lineViewClient(line: Line): LineView {
  return {
    key: line.key,
    text: line.text,
    id: line.corpusId ?? line.key,
    lang: line.lang,
    sa: line.sa,
    iast: line.iast,
    meaning: line.meaning.en,
    speaker: line.speaker.en,
    ref: line.ref.en,
    ...(line.href ? { href: line.href } : {}),
  }
}
