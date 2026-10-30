import type { Metadata } from 'next'
import KabirHub from '@/components/funnels/sayings/KabirHub'
import { KAB_HUB, KAB_PATH, KAB_PATH_EN } from '@/lib/funnels/sayings/copy-kabir'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const metadata: Metadata = fxMeta({
  title: KAB_HUB.en.title,
  description: KAB_HUB.en.description,
  path: KAB_PATH_EN,
  locale: 'en',
  twin: { en: KAB_PATH_EN, hi: KAB_PATH },
  ogImage: cardOg('kab-guru-govind-dou-khade', 'en'),
})

export default function Page() {
  return <KabirHub locale="en" />
}
