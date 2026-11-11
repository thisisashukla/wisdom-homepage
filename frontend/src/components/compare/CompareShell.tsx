import type { ReactNode } from 'react'
import PageTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import { JsonLd } from '@/components/site'
import CompareTracker from './CompareTracker'
import './compare.css'

/** The frame for every comparison page: nav, main, footer, page tracking, outbound tracking, schema. */
export default function CompareShell({ pageName, ld, children }: { pageName: string; ld?: unknown; children: ReactNode }) {
  return (
    <>
      {ld ? <JsonLd data={ld} /> : null}
      <Nav />
      <main className="cx" lang="en">
        {children}
      </main>
      <SiteFooter />
      <PageTracker pageName={pageName} />
      <CompareTracker />
    </>
  )
}
