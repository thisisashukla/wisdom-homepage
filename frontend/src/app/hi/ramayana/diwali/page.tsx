import type { Metadata } from 'next'
import DiwaliPage from '@/components/funnels/ramayana/DiwaliPage'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { pageMeta } from '@/lib/funnels/ramayana/seo'

const DESC = 'दिवाली क्यों: राम की अयोध्या वापसी, वाल्मीकि रामायण (युद्धकाण्ड 125 से 128) और रामचरितमानस (उत्तरकाण्ड) की पंक्तियों में, सरल हिंदी अर्थ के साथ।'

export const metadata: Metadata = pageMeta({
  title: 'दिवाली और रामायण: राम की घर वापसी, मूल पंक्तियों में',
  description: DESC,
  path: PATHS.hiDiwali,
  locale: 'hi',
  twin: { en: PATHS.diwali, hi: PATHS.hiDiwali },
  card: 'ram-hundred-years',
})

export default function Page() {
  return <DiwaliPage locale="hi" description={DESC} />
}
