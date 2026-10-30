/**
 * One Chalisa unit in both scripts; CSS shows the one the toggle picked.
 * lang="hi" on the Awadhi so screen readers use a Hindi voice (no common
 * reader ships an Awadhi one); the data records the language as Awadhi.
 */

export default function LineText({
  awadhi,
  iast,
  as = 'p',
  className = 'hc-line',
}: {
  awadhi: [string, string]
  iast: [string, string]
  as?: 'p' | 'div' | 'blockquote'
  className?: string
}) {
  const Tag = as
  // Keep the danda with its last word (display only; the data is unchanged).
  const nb = (t: string) => t.replace(/ ([।॥|]+)/g, '\u00a0$1')
  return (
    <Tag className={className}>
      <span className="hc-deva" lang="hi">
        <span className="hc-half">{nb(awadhi[0])}</span>
        <span className="hc-half">{nb(awadhi[1])}</span>
      </span>
      <span className="hc-iast" lang="hi-Latn">
        <span className="hc-half">{nb(iast[0])}</span>
        <span className="hc-half">{nb(iast[1])}</span>
      </span>
    </Tag>
  )
}
