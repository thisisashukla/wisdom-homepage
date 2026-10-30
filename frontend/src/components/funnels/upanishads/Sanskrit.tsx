/**
 * One Sanskrit passage in both scripts; CSS shows the one the reader chose
 * (data-script on .fx-upanishads). Devanagari by default, so it reads without JS.
 */
type Props = { sa: string; iast: string; size?: 'hero' | 'verse' | 'small'; as?: 'p' | 'div' }

const lines = (s: string) =>
  s
    .split('\n')
    .flatMap((l) => l.split(/(?<=[।|])\s+(?=\S)/u))
    .map((l) => l.trim().replace(/\s+([।॥|]+)/gu, '\u00a0$1'))
    .filter(Boolean)

export default function Sanskrit({ sa, iast, size = 'verse' }: Props) {
  return (
    <div className={`fx-sa fx-sa-${size}`}>
      <p className="s-deva" lang="sa">
        {lines(sa).map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </p>
      <p className="s-iast" lang="sa-Latn">
        {lines(iast).map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </p>
    </div>
  )
}
