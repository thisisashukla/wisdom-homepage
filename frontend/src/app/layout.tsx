import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import MixpanelProvider from '@/components/MixpanelProvider'

// Self-host Google Fonts via next/font — eliminates render-blocking fetches
// to fonts.googleapis.com and fonts.gstatic.com, and preloads the primary
// weights.  This is our single biggest Core-Web-Vitals win on mobile India.
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
  variable: '--font-playfair',
  preload: true,
})

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  display: 'swap',
  variable: '--font-inter',
  preload: true,
})

const notoSansDevanagari = Noto_Sans_Devanagari({
  subsets: ['devanagari', 'latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-noto-devanagari',
  preload: true,
})

export const metadata: Metadata = {
  metadataBase: new URL('https://wisdomquotes.in'),
  title: {
    template: '%s | Wisdom',
    default: 'Wisdom — Bhagavad Gita, Sanskrit Shlokas & Wisdom Quotes',
  },
  description: 'Read the Bhagavad Gita verse by verse — Sanskrit shlokas with Hindi and English meaning, wisdom quotes, and daily spiritual practice. Free, ad-free, beautifully presented.',
  applicationName: 'Wisdom',
  authors: [{ name: 'Ankur Shukla', url: 'https://wisdomquotes.in/about' }],
  creator: 'Ankur Shukla',
  publisher: 'Wisdom',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  openGraph: {
    siteName: 'Wisdom',
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@sansearchapp',
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  icons: {
    icon: '/assets/new-light-logo.webp',
  },
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export const viewport: Viewport = {
  themeColor: '#1a0606',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${inter.variable} ${notoSansDevanagari.variable}`}
    >
      <head>
        <link rel="icon" href="/assets/new-light-logo.webp" />
        {/* Ties this site to the iOS app for App Store rich results & smart banner. */}
        <meta
          name="apple-itunes-app"
          content="app-id=6747684125, app-argument=https://wisdomquotes.in"
        />
      </head>
      <body>
        <AuthProvider>
          <MixpanelProvider>
            {children}
          </MixpanelProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
