import type { Metadata } from 'next'
import KabirHub from '@/components/funnels/sayings/KabirHub'
import { KAB_HUB, KAB_PATH, KAB_PATH_EN } from '@/lib/funnels/sayings/copy-kabir'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const metadata: Metadata = fxMeta({
  title: KAB_HUB.hi.title,
  description: KAB_HUB.hi.description,
  path: KAB_PATH,
  locale: 'hi',
  twin: { en: KAB_PATH_EN, hi: KAB_PATH },
  ogImage: cardOg('kab-guru-govind-dou-khade', 'hi'),
})

export default function Page() {
  return <KabirHub locale="hi" />
}
