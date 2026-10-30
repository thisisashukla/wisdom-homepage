import type { Metadata } from 'next'
import Shell from '@/components/funnels/mahabharata/Shell'
import WhereIsGita, { whereHero } from '@/components/funnels/mahabharata/WhereIsGita'
import { EN } from '@/lib/funnels/mahabharata/whereGita'
import { PATHS, articleLd, breadcrumbLd, faqLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'

const PAGE = 'mbh-where-gita'
const CARD = 'mbh-3-32-3'

export const metadata: Metadata = meta({
  title: EN.title,
  description: EN.description,
  path: PATHS.gita,
  twin: { en: PATHS.gita, hi: PATHS.gitaHi },
  cardId: CARD,
})

export default function Page() {
  const ld = graph(
    articleLd({ headline: EN.h1, description: EN.description, path: PATHS.gita, image: ogImage(CARD), about: 'Bhagavad Gita' }),
    faqLd(EN.faq),
    breadcrumbLd([
      { name: 'Home', path: '/' },
      { name: 'Mahabharata', path: PATHS.hub },
      { name: 'Where is the Gita', path: PATHS.gita },
    ]),
  )
  return (
    <Shell page={PAGE} crumbs={[{ label: EN.crumbs.home, href: '/' }, { label: EN.crumbs.mbh, href: PATHS.hub }, { label: EN.crumbs.here }]} jsonLd={ld} hero={whereHero(EN, 'en', PAGE)}>
      <WhereIsGita copy={EN} locale="en" page={PAGE} path={PATHS.gita} />
    </Shell>
  )
}
