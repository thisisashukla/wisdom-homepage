/**
 * Where a search started. Anything that sends a reader to /search adds ?from_path=<the page they
 * were on>, and the search page puts it on every search event as entry_path. Without it, every
 * Search Completed and Search Result Clicked would only say path=/search.
 */
export const ENTRY_PATH_PARAM = 'from_path'

/** The page the reader is on now, to hand to /search. */
export function currentEntryPath(): string {
  return typeof window === 'undefined' ? '' : window.location.pathname
}

/** The from_path handed over in the URL, or null when it is missing or not a site path. */
export function readEntryPath(params: URLSearchParams): string | null {
  const raw = params.get(ENTRY_PATH_PARAM)
  if (!raw || !raw.startsWith('/') || raw.startsWith('//')) return null
  return raw.slice(0, 200)
}
