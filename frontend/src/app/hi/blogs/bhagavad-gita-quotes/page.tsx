import { notFound } from 'next/navigation'
import { getPage } from '@/lib/quotes'
import QuotePage, { quotePageMetadata } from '@/components/quotes/QuotePage'
import BlogTracker from '@/components/BlogTracker'

const KEY = 'gita-quotes-hi'

export function generateMetadata() {
  const c = getPage(KEY)
  return c ? quotePageMetadata(c) : {}
}

// Nav and the Hindi footer come from src/app/hi/blogs/layout.tsx.
export default function Page() {
  const c = getPage(KEY)
  if (!c) notFound()
  return (
    <>
      <QuotePage config={c} />
      <BlogTracker pageName={c.pageName} />
    </>
  )
}
