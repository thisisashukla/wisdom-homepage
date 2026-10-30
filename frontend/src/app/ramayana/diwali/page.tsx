import type { Metadata } from 'next'
import DiwaliPage from '@/components/funnels/ramayana/DiwaliPage'
import { PATHS } from '@/lib/funnels/ramayana/paths'
import { pageMeta } from '@/lib/funnels/ramayana/seo'

const DESC = "Why Diwali: Ram's return to Ayodhya as Valmiki (Yuddha Kanda 125 to 128) and Tulsidas (Uttar Kand) tell it, line by line, with plain English."

export const metadata: Metadata = pageMeta({
  title: 'Diwali in the Ramayana: the homecoming, line by line',
  description: DESC,
  path: PATHS.diwali,
  locale: 'en',
  twin: { en: PATHS.diwali, hi: PATHS.hiDiwali },
  card: 'ram-hundred-years',
})

export default function Page() {
  return <DiwaliPage locale="en" description={DESC} />
}
