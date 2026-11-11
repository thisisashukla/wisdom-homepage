import { Facts } from '@/components/site'
import type { CompareApp } from '@/lib/app-compare/apps'
import { entryFacts, monthYear } from '@/lib/app-compare/format'
import type { ReactNode } from 'react'
import WisdomGet from './WisdomGet'
import './compare.css'

/** A link to another app's store page or site: tracked as Link Clicked, never as our App Store click. */
export function OutLink({ href, app, loc, children }: { href: string; app: string; loc: string; children: ReactNode }) {
  return (
    <a className="sx-btn sx-btn--link" href={href} target="_blank" rel="nofollow noopener" data-mp-tracked="" data-cx-out={app} data-cx-loc={loc}>
      {children}
    </a>
  )
}

/**
 * One app, in the same order everywhere: who it suits, what it is, key facts, what you will
 * find, what is worth knowing, then links. Wisdom's entry gets the platform-aware link.
 */
export default function AppEntry({ app, bestFor, page }: { app: CompareApp; bestFor?: string; page: string }) {
  const loc = `${page}_entry`
  return (
    <li id={app.key} className={`cx-entry rv${app.isWisdom ? ' cx-entry--ours' : ''}`}>
      {bestFor && <p className="cx-entry-kicker">{bestFor}</p>}
      <h3 className="sx-h3">
        {app.name}
        {app.isWisdom && <span className="cx-ours">Made by us</span>}
      </h3>
      <p className="cx-entry-kind">
        {app.kind}. By {app.developer}.
      </p>
      <Facts items={entryFacts(app)} label={`${app.name} at a glance`} />
      {app.stale && <p className="cx-entry-stale">Not updated on the App Store since {monthYear(app.updated)}.</p>}
      <div className="cx-entry-cols">
        <div>
          <p className="cx-entry-k">What you will find</p>
          <ul className="cx-list">
            {app.youll.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="cx-entry-k">Worth knowing</p>
          <ul className="cx-list cx-list--worth">
            {app.worth.map((t) => (
              <li key={t}>{t}</li>
            ))}
          </ul>
        </div>
      </div>
      <p className="cx-entry-small">
        Languages: {app.languages}. Price: {app.price}. Ads: {app.ads}. Account: {app.account}. Apple privacy label: {app.privacy}.
        {app.android.note ? ` Android: ${app.android.note}.` : ''}
      </p>
      <div className="cx-entry-links">
        {app.isWisdom ? (
          <WisdomGet location={`${page}_wisdom`} campaign={`web_${page}`} />
        ) : (
          <>
            <OutLink href={app.appStoreUrl} app={app.key} loc={`${loc}_app_store`}>
              App Store page
            </OutLink>
            {app.android.url && (
              <OutLink href={app.android.url} app={app.key} loc={`${loc}_google_play`}>
                Google Play page
              </OutLink>
            )}
            {app.sources.map((s) => (
              <OutLink key={s.url} href={s.url} app={app.key} loc={`${loc}_website`}>
                {s.label}
              </OutLink>
            ))}
          </>
        )}
      </div>
    </li>
  )
}

/** A list of entries. */
export function AppEntries({ children }: { children: ReactNode }) {
  return <ul className="cx-entries">{children}</ul>
}
