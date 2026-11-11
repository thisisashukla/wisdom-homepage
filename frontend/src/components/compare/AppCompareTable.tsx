import type { ReactNode } from 'react'
import type { CompareApp, FeatureKey, Mark } from '@/lib/app-compare/apps'
import { MARK_LABEL, androidText, monthYear, ratingText } from '@/lib/app-compare/format'
import './compare.css'

export type ColumnKey =
  | FeatureKey
  | 'price'
  | 'ratings'
  | 'updated'
  | 'android'
  | 'privacy'
  | 'languages'
  | 'widgetHome'
  | 'widgetLock'
  | 'widgetShows'

const LABEL: Record<ColumnKey, string> = {
  price: 'Price (US)',
  ratings: 'Ratings',
  updated: 'Last update',
  android: 'Android',
  privacy: 'Privacy label',
  languages: 'Languages',
  sanskrit: 'Sanskrit',
  translit: 'Transliteration',
  meanings: 'Word meanings',
  commentary: 'Commentary',
  audio: 'Audio',
  offline: 'Offline',
  widgets: 'Widgets',
  watch: 'Apple Watch',
  plans: 'Plan or routine',
  widgetHome: 'Home Screen',
  widgetLock: 'Lock Screen',
  widgetShows: 'What it shows',
}

const FEATURE_KEYS: FeatureKey[] = ['sanskrit', 'translit', 'meanings', 'commentary', 'audio', 'offline', 'widgets', 'watch', 'plans']

function MarkCell({ v, note }: { v: Mark; note?: string }) {
  return (
    <>
      <span className={`cx-mark cx-mark--${v}`}>{MARK_LABEL[v]}</span>
      {note && <span className="cx-cell-note">{note}</span>}
    </>
  )
}

function cell(app: CompareApp, col: ColumnKey, notes: ColumnKey[]): ReactNode {
  if ((FEATURE_KEYS as string[]).includes(col)) {
    const f = app.features[col as FeatureKey] ?? { v: 'ns' as Mark }
    return <MarkCell v={f.v} note={notes.includes(col) ? f.note : undefined} />
  }
  switch (col) {
    case 'price':
      return app.priceShort
    case 'ratings':
      return (
        <>
          <span className="cx-mark cx-mark--part">US {ratingText(app.ratingUS)}</span>
          <span className="cx-cell-note">India {ratingText(app.ratingIN)}</span>
        </>
      )
    case 'updated':
      return app.stale ? <span className="cx-stale">{monthYear(app.updated)}, over a year ago</span> : monthYear(app.updated)
    case 'android':
      return androidText(app)
    case 'privacy':
      return app.privacy
    case 'languages':
      return app.languages
    case 'widgetHome':
      return <MarkCell v={app.widget?.home ?? 'ns'} />
    case 'widgetLock':
      return <MarkCell v={app.widget?.lock ?? 'ns'} />
    case 'widgetShows':
      return app.widget?.shows ?? 'Not stated'
    default:
      return null
  }
}

/**
 * One comparison table, the same columns for every app on the page. Wide table on desktop
 * (scrolls sideways if it must), one card per app on phones. App names jump to the entry.
 */
export default function AppCompareTable({
  apps,
  columns,
  notes = ['commentary', 'audio', 'widgets'],
  caption,
  linkToEntries = true,
}: {
  apps: CompareApp[]
  columns: ColumnKey[]
  /** Columns that also show the short note under Yes / Partly. */
  notes?: ColumnKey[]
  caption?: ReactNode
  linkToEntries?: boolean
}) {
  return (
    <div className="cx-table-wrap rv">
      <table className="cx-table">
        {caption && <caption>{caption}</caption>}
        <thead>
          <tr>
            <th scope="col">App</th>
            {columns.map((c) => (
              <th key={c} scope="col">
                {LABEL[c]}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr key={app.key} className={app.isWisdom ? 'cx-row--ours' : undefined}>
              <th scope="row">
                {linkToEntries ? (
                  <a className="cx-app" href={`#${app.key}`}>
                    {app.name}
                  </a>
                ) : (
                  <span className="cx-app">{app.name}</span>
                )}
                <span className="cx-dev">
                  {app.isWisdom ? 'Ankur Shukla' : app.developer}
                  {app.isWisdom && <span className="cx-ours">Ours</span>}
                </span>
              </th>
              {columns.map((c) => (
                <td key={c} data-col={LABEL[c]}>
                  {cell(app, c, notes)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
