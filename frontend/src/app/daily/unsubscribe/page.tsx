import type { Metadata } from 'next'
import { Newsreader } from 'next/font/google'
import UnsubscribeView from '@/components/onboarding/UnsubscribeView'
import { DAILY_TOKEN_RE as TOKEN_RE } from '@/lib/server/readers'
import '../../start/start.css'

const newsreader = Newsreader({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], display: 'swap', variable: '--ob-serif' })

export const metadata: Metadata = {
  title: 'Stop the morning verse',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

/** "Stop these emails" from a morning verse email: one button, so link scanners can't unsubscribe anyone. */
export default function UnsubscribePage({ searchParams }: { searchParams: { t?: string } }) {
  const token = typeof searchParams.t === 'string' && TOKEN_RE.test(searchParams.t) ? searchParams.t : null
  return (
    <div className={newsreader.variable}>
      <UnsubscribeView token={token} kind="daily" />
    </div>
  )
}
