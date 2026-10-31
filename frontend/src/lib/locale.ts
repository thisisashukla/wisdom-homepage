/** The site's two languages. Import this type everywhere instead of redeclaring 'en' | 'hi'. */
export type Locale = 'en' | 'hi'

export const LOCALES: readonly Locale[] = ['en', 'hi']

/** Locale of a path: /hi and /hi/... are Hindi, everything else English. */
export function localeForPath(path: string | null | undefined): Locale {
  return path === '/hi' || (path ?? '').startsWith('/hi/') ? 'hi' : 'en'
}

/** Pick the string for a locale from an { en, hi } pair. */
export function t<T>(pair: { en: T; hi: T }, locale: Locale): T {
  return pair[locale]
}
