import type { Metadata } from 'next'
import VivHub from '@/components/funnels/sayings/VivHub'
import { VIV_HUB, VIV_PATH, VIV_PATH_HI } from '@/lib/funnels/sayings/copy-viv'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const metadata: Metadata = fxMeta({
  title: VIV_HUB.en.title,
  description: VIV_HUB.en.description,
  path: VIV_PATH,
  locale: 'en',
  twin: { en: VIV_PATH, hi: VIV_PATH_HI },
  ogImage: cardOg('viv-arise-awake', 'en'),
})

export default function Page() {
  return <VivHub locale="en" />
}
