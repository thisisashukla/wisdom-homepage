/**
 * Page frame for the other-gitas funnel: site nav and footer (both fade, via sakshi.css, during "Hold to be still"),
 * page-view tracking, funnel click events and the scoped "Sakshi" look.
 */
import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import BlogTracker from '@/components/BlogTracker'
import { tiro } from '@/components/quotes/fonts'
import FxEvents from './FxEvents'
import { garamond } from './fonts'
import './sakshi.css'

export default function FxFrame({ pageKey, children }: { pageKey: string; children: ReactNode }) {
  return (
    <div className={`fx-other-gitas ${garamond.variable} ${tiro.variable}`} data-script="deva" data-fx-root="">
      <Nav pageName={pageKey} />
      <BlogTracker pageName={pageKey} />
      <FxEvents page={pageKey} />
      {children}
      <SiteFooter />
    </div>
  )
}
