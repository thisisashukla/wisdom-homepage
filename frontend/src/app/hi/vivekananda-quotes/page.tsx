import type { Metadata } from 'next'
import VivHub from '@/components/funnels/sayings/VivHub'
import { VIV_HUB, VIV_PATH, VIV_PATH_HI } from '@/lib/funnels/sayings/copy-viv'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const metadata: Metadata = fxMeta({
  title: VIV_HUB.hi.title,
  description: VIV_HUB.hi.description,
  path: VIV_PATH_HI,
  locale: 'hi',
  twin: { en: VIV_PATH, hi: VIV_PATH_HI },
  ogImage: cardOg('viv-arise-awake', 'hi'),
})

export default function Page() {
  return <VivHub locale="hi" />
}
