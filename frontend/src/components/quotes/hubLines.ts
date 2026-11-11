/**
 * The lines a hub hands to HubTop ("Today's line", "Lines you kept"). Plain module: the hubs
 * (server components) build the list, HubTop (client) renders it.
 */

/** One keepable line on the hub, in the page language. */
export type HubLine = {
  id: string
  meaning: string
  source: string
  /** DOM id the line links to. Defaults to the quote id. */
  anchor?: string
}

/**
 * Lines in page order, each id once: `main` first (Today's line picks from these, so
 * `todayCount` is how many there are), then `more`, lines that sit elsewhere on the page
 * (a picker, a "never said" card) with the anchor they sit at, so a line kept there still
 * shows in "Lines you kept".
 */
export function hubLinesFrom<T>(
  toLine: (item: T) => HubLine,
  main: T[],
  more: Array<{ item: T; anchor: string }> = [],
): { lines: HubLine[]; todayCount: number } {
  const lines: HubLine[] = []
  const seen = new Set<string>()
  const add = (item: T, anchor?: string) => {
    const line = toLine(item)
    if (seen.has(line.id)) return
    seen.add(line.id)
    lines.push(anchor ? { ...line, anchor } : line)
  }
  main.forEach((x) => add(x))
  const todayCount = lines.length
  more.forEach(({ item, anchor }) => add(item, anchor))
  return { lines, todayCount }
}
