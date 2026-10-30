/**
 * Page frame for the other-gitas funnel on the house UI: site nav and footer (both fade during "Hold to be still"),
 * page-view tracking, funnel click events, house scroll reveals (.rv via HomeAnimations) and the house stylesheets.
 * gita.css comes first so the house :root in home.css wins; other-gitas.css adds only what the house lacks.
 */
import type { ReactNode } from 'react'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import BlogTracker from '@/components/BlogTracker'
import HomeAnimations from '@/components/HomeAnimations'
import { tiro } from '@/components/quotes/fonts'
import FxEvents from './FxEvents'
import '@/app/gita/gita.css'
import '@/app/home.css'
import '@/app/home-v3.css'
import '@/app/gita-for/gita-for.css'
import '@/app/gita-for/theme-plan.css'
import './other-gitas.css'

export default function FxFrame({ pageKey, children }: { pageKey: string; children: ReactNode }) {
  return (
    <div className={`fx-other-gitas ${tiro.variable}`} data-script="deva" data-fx-root="">
      <Nav pageName={pageKey} />
      <BlogTracker pageName={pageKey} />
      <FxEvents page={pageKey} />
      <HomeAnimations />
      {children}
      <SiteFooter />
    </div>
  )
}
