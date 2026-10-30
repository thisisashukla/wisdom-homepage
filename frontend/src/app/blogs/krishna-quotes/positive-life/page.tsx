import { notFound } from 'next/navigation'
import { getPage } from '@/lib/quotes'
import QuotePage, { quotePageMetadata } from '@/components/quotes/QuotePage'
import BlogTracker from '@/components/BlogTracker'
import SiteFooter from '@/components/SiteFooter'

const KEY = 'positive-life-en'

export function generateMetadata() {
  const c = getPage(KEY)
  return c ? quotePageMetadata(c) : {}
}

export default function Page() {
  const c = getPage(KEY)
  if (!c) notFound()
  return (
    <>
      <QuotePage config={c} />
      <SiteFooter />
      <BlogTracker pageName={c.pageName} />
    </>
  )
}
