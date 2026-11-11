/**
 * App comparison kit for /best-apps and its pages. Data: lib/app-compare/apps.ts.
 * Builds on the site kit (components/site); add props here rather than per-page copies.
 */
export { default as CompareShell } from './CompareShell'
export { default as CompareNote } from './CompareNote'
export { default as CompareMethod } from './CompareMethod'
export { default as AppCompareTable, type ColumnKey } from './AppCompareTable'
export { default as AppEntry, AppEntries, OutLink } from './AppEntry'
export { default as ComparisonPage, type ComparisonPageProps, type ReaderPick, type EntryGroup } from './ComparisonPage'
export { compareLd, COMPARE_PAGES, comparePath } from '@/lib/app-compare/pages'
