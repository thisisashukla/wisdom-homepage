import type { Metadata } from 'next'
import Shell from '@/components/funnels/mahabharata/Shell'
import WhereIsGita, { whereHero } from '@/components/funnels/mahabharata/WhereIsGita'
import { HI } from '@/lib/funnels/mahabharata/whereGita'
import { PATHS, articleLd, breadcrumbLd, faqLd, graph, meta, ogImage } from '@/lib/funnels/mahabharata/seo'

const PAGE = 'mbh-where-gita-hi'
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
  const ld = graph(
    articleLd({ headline: HI.h1, description: HI.description, path: PATHS.gitaHi, locale: 'hi', image: ogImage(CARD), about: 'Bhagavad Gita' }),
    faqLd(HI.faq),
    breadcrumbLd([
      { name: 'होम', path: '/' },
      { name: 'महाभारत', path: PATHS.hub },
      { name: 'गीता कहाँ है', path: PATHS.gitaHi },
    ]),
  )
  return (
    <Shell
      page={PAGE}
      locale="hi"
      crumbs={[{ label: HI.crumbs.home, href: '/' }, { label: HI.crumbs.mbh, href: PATHS.hub }, { label: HI.crumbs.here }]}
      jsonLd={ld}
      hero={whereHero(HI, 'hi', PAGE)}
    >
      <WhereIsGita copy={HI} locale="hi" page={PAGE} path={PATHS.gitaHi} />
    </Shell>
  )
}
