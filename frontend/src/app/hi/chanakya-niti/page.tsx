import type { Metadata } from 'next'
import ChanakyaHub from '@/components/funnels/sayings/ChanakyaHub'
import { CHK_HUB, CHK_PATH } from '@/lib/funnels/sayings/copy-chanakya'
import { cardOg, fxMeta } from '@/lib/funnels/sayings/seo'

export const metadata: Metadata = fxMeta({
  title: CHK_HUB.title,
  description: CHK_HUB.description,
  path: CHK_PATH,
  locale: 'hi',
  ogImage: cardOg('chk-13-2', 'hi'),
})

export default function Page() {
  return <ChanakyaHub />
}
