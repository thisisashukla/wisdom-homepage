/**
 * The circle board: a leaderboard ranked by days sat this week, nothing else.
 * Seven lamp slots per person; lit lamps are days they sat. Proposed feature,
 * illustrated with sample names.
 */
type Row = { name: string; place: string; lamps: number; now?: boolean; you?: boolean }

function Lamp({ lit }: { lit: boolean }) {
  return (
    <svg viewBox="0 0 24 28" width="22" height="26" className={`dh-lamp${lit ? ' dh-lamp--lit' : ''}`} aria-hidden="true">
      {lit && <path className="dh-lamp__fire" d="M12 3c2.6 3.6 3.6 6.7 1.9 9.4-.9 1.4-2.9 1.4-3.8 0C8.4 9.7 9.4 6.6 12 3Z" />}
      <path className="dh-lamp__bowl" d="M3 16.5c1.6 4.4 16.4 4.4 18 0-2.6 1.4-6 1.9-9 1.9s-6.4-.5-9-1.9Z" />
    </svg>
  )
}

export default function Board({ title, reset, rows }: { title: string; reset: string; rows: Row[] }) {
  return (
    <div className="dh-board" data-reveal>
      <div className="dh-board__top">
        <p>{title}</p>
        <p className="dh-board__reset">{reset}</p>
      </div>
      <ol>
        {rows.map((r, ri) => (
          <li key={r.name} className={r.you ? 'you' : ''} style={{ ['--r' as string]: ri }}>
            <span className="dh-board__av" aria-hidden="true">{r.name[0]}</span>
            <span className="dh-board__who">
              <b>{r.name}</b>
              <span>
                {r.place}
                {r.now && (
                  <em className="dh-board__now">
                    <i aria-hidden="true" /> sitting now
                  </em>
                )}
              </span>
            </span>
            <span className="dh-board__lamps" aria-label={`${r.lamps} of 7 days`}>
              {Array.from({ length: 7 }, (_, d) => (
                <span key={d} style={{ ['--d' as string]: d }}>
                  <Lamp lit={d < r.lamps} />
                </span>
              ))}
            </span>
          </li>
        ))}
      </ol>
    </div>
  )
}
