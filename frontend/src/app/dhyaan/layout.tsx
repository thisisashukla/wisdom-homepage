import type { Metadata, Viewport } from 'next'
import { Newsreader } from 'next/font/google'
import './dhyaan.css'
import './home.css'
import './ui.css'
import { DhFooter, DhNav } from './_components/Chrome'
import Reveal from './_components/home/Reveal'
import { DHYAAN_URL, ICON, NAME, OG_IMAGE, ONE_LINER } from './_lib/site'

// Newsreader stands in for New York, the serif the iOS app uses.
const serif = Newsreader({ subsets: ['latin'], axes: ['opsz'], style: ['normal', 'italic'], display: 'swap', variable: '--dh-display' })

/**
 * Dhyaan waitlist site, served at dhyaan.wisdomquotes.in (see the host rewrite in
 * next.config.mjs). Everything here overrides the Wisdom root metadata: its own
 * metadataBase, title template, icons and social cards, and no Wisdom app banner.
 */
export const metadata: Metadata = {
  metadataBase: new URL(DHYAAN_URL),
  title: { template: '%s · Dhyaan', default: 'Dhyaan: silent meditation for iPhone & Apple Watch' },
  description: ONE_LINER,
  applicationName: NAME,
  alternates: { canonical: DHYAAN_URL },
  openGraph: { siteName: NAME, type: 'website', locale: 'en_US', url: DHYAAN_URL, images: [{ url: OG_IMAGE, width: 1200, height: 630 }] },
  twitter: { card: 'summary_large_image', creator: '@thisisashukla', images: [OG_IMAGE] },
  icons: { icon: ICON, apple: ICON },
  itunes: null,
}

export const viewport: Viewport = { themeColor: '#0F0B09' }

export default function DhyaanLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={`dh ${serif.variable}`}>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('dh-js')" }} />
      <Reveal />
      <DhNav />
      <main>{children}</main>
      <DhFooter />
    </div>
  )
}
