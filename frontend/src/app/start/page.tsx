import type { Metadata, Viewport } from 'next'
import { Newsreader, Noto_Serif_Devanagari } from 'next/font/google'
import StartFlow from '@/components/onboarding/StartFlow'
import './start.css'

// The app's type: Newsreader for everything, Tiro Devanagari Sanskrit for
// references and Sanskrit on cards, Noto Serif Devanagari bold for the
// revealed verse (wisdom/app/design/tokens/WTypography.ts).
const newsreader = Newsreader({ subsets: ['latin'], weight: ['400', '500', '600', '700'], style: ['normal', 'italic'], display: 'swap', variable: '--ob-serif' })
const notoSerif = Noto_Serif_Devanagari({ subsets: ['devanagari'], weight: '700', display: 'swap', variable: '--ob-deva' })

export const metadata: Metadata = {
  title: 'Create your free Gita reading plan',
  description: 'A few questions, then a verse chosen for what is on your mind and a week of verses built around it. Week 1 is free.',
  robots: { index: false, follow: true },
  alternates: { canonical: '/start' },
}

export const viewport: Viewport = {
  themeColor: '#FFF8ED',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
}

export default function StartPage() {
  return (
    <div className={`${newsreader.variable} ${notoSerif.variable}`} style={{ ['--ob-tiro' as string]: 'var(--font-tiro-sa)' }}>
      <StartFlow />
    </div>
  )
}
