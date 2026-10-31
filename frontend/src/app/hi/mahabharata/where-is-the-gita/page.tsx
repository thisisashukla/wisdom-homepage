import type { Metadata } from 'next'
import PageTracker from '@/components/BlogTracker'
import { JsonLd } from '@/components/site'
import WhereIsGita, { WhereHero } from '@/components/funnels/mahabharata/WhereIsGita'
import { HI } from '@/lib/funnels/mahabharata/whereGita'
import { PATHS, articleLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'
import '@/components/funnels/mahabharata/mbh.css'

const PAGE_KEY = 'mbh-where-gita-hi'
const CARD = 'mbh-3-32-3'

export const metadata: Metadata = meta({
  title: HI.title,
  description: HI.description,
  path: PATHS.gitaHi,
  locale: 'hi',
  twin: { en: PATHS.gita, hi: PATHS.gitaHi },
  cardId: CARD,
})

export default function Page() {
  const ld = graph(articleLd({ headline: HI.h1, description: HI.description, path: PATHS.gitaHi, locale: 'hi', image: ogImage(CARD), about: 'Bhagavad Gita' }))
  return (
    <>
      <JsonLd data={ld} />
      <PageTracker pageName="Mahabharata Where Is The Gita HI" />
      <main className="fx-mbh" lang="hi">
        <WhereHero copy={HI} locale="hi" path={PATHS.gitaHi} />
        <WhereIsGita copy={HI} locale="hi" pageKey={PAGE_KEY} path={PATHS.gitaHi} />
      </main>
    </>
  )
}
