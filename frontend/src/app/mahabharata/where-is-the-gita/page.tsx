import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd } from '@/components/site'
import WhereIsGita, { WhereHero } from '@/components/funnels/mahabharata/WhereIsGita'
import { EN } from '@/lib/funnels/mahabharata/whereGita'
import { PATHS, articleLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'
import '@/components/funnels/mahabharata/mbh.css'

const PAGE_KEY = 'mbh-where-gita'
const CARD = 'mbh-3-32-3'

export const metadata: Metadata = meta({
  title: EN.title,
  description: EN.description,
  path: PATHS.gita,
  twin: { en: PATHS.gita, hi: PATHS.gitaHi },
  cardId: CARD,
})

export default function Page() {
  const ld = graph(articleLd({ headline: EN.h1, description: EN.description, path: PATHS.gita, image: ogImage(CARD), about: 'Bhagavad Gita' }))
  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Mahabharata Where Is The Gita" />
      <main className="fx-mbh" lang="en">
        <WhereHero copy={EN} locale="en" path={PATHS.gita} />
        <WhereIsGita copy={EN} locale="en" pageKey={PAGE_KEY} path={PATHS.gita} />
      </main>
    </>
  )
}
