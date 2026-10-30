/** The traditional 15 x 15 grid as a real table: crawlable and readable without JS. */
export default function GridTable({ grid, caption }: { grid: string[][]; caption: string }) {
  return (
    <div className="rs-table-wrap">
      <table className="rs-table" lang="hi">
        <caption>{caption}</caption>
        <tbody>
          {grid.map((row, r) => (
            <tr key={r}>
              {row.map((c, i) => (
                <td key={i} className={c.length > 2 ? 'sm' : undefined}>
                  {c}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
