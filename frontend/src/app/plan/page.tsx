import type { Metadata, Viewport } from 'next'
import { Newsreader, Noto_Serif_Devanagari } from 'next/font/google'
import PlanView from '@/components/onboarding/PlanView'
import { getPlan, TOKEN_RE } from '@/lib/server/webPlans'
import '../start/start.css'

/**
 * A saved web plan, on any device. Every plan email links here with the
 * plan's token (?t=…&d=<day>[&fb=helped|not_for_me]). Without a token the
 * page looks for the one this browser saved and otherwise sends to /start.
 */
const newsreader = Newsreader({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], display: 'swap', variable: '--ob-serif' })
const notoSerif = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: '700', display: 'swap', variable: '--ob-deva' })

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  title: 'Your Gita reading plan',
  description: 'Your seven days of verses from Wisdom, one each morning.',
  robots: { index: false, follow: false },
  referrer: 'no-referrer',
}

export const viewport: Viewport = {
  themeColor: '#FFF8ED',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default async function PlanPage({ searchParams }: { searchParams: { t?: string; d?: string; fb?: string; src?: string; w?: string } }) {
  const token = typeof searchParams.t === 'string' && TOKEN_RE.test(searchParams.t) ? searchParams.t : null
  const plan = token ? await getPlan(token) : null
  const day = Number(searchParams.d)
  const fb = searchParams.fb === 'helped' || searchParams.fb === 'not_for_me' ? searchParams.fb : null
  return (
    <div className={`${newsreader.variable} ${notoSerif.variable}`} style={{ ['--ob-tiro' as string]: 'var(--font-tiro-sa)' }}>
      <PlanView
        token={token}
        plan={plan}
        missing={!!token && !plan}
        initialDay={Number.isInteger(day) && day >= 1 && day <= 7 ? day : null}
        fb={fb}
        src={typeof searchParams.src === 'string' && /^[a-z_]{1,24}$/.test(searchParams.src) ? searchParams.src : null}
        welcome={searchParams.w === '1'}
      />
    </div>
  )
}
