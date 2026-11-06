/** Splits a heading into word spans so CSS can rise them in one by one (see .dh-w). */
export function words(s: string, from = 0) {
  return s.split(' ').map((w, i) => (
    <span key={i} className="dh-w" style={{ ['--i' as string]: from + i }}>
      {w}{' '}
    </span>
  ))
}

/** Two-tone display heading: a muted lead-in and an italic ink finish, like the home hero. */
export function Title({ soft, ink, as: Tag = 'h1', className = '' }: { soft?: string; ink: string; as?: 'h1' | 'h2'; className?: string }) {
  const n = soft ? soft.split(' ').length : 0
  return (
    <Tag className={`dh-title ${className}`}>
      {soft && <span className="dh-title__soft">{words(soft)}</span>}
      <span className="dh-title__ink">{words(ink, n)}</span>
    </Tag>
  )
}
