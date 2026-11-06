import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Inter, Noto_Sans_Devanagari } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import MixpanelProvider from '@/components/MixpanelProvider'
import Motion from '@/components/site/Motion'
import { scriptureFontVars } from '@/lib/fonts'
import { SCRIPT_BOOT } from '@/lib/scriptBoot'
import { SITE_NAME_FULL } from '@/lib/seo'

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
    default: 'Wisdom: Bhagavad Gita, Sanskrit Shlokas and Wisdom Quotes',
  },
  description: 'Read the Bhagavad Gita verse by verse in Sanskrit, with Hindi and English meaning, and find the verses for what you are going through. Free, no ads.',
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
    siteName: SITE_NAME_FULL,
    type: 'website',
    locale: 'en_IN',
    alternateLocale: ['hi_IN'],
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    // site = the site's brand handle; creator = the author's handle.
    // Unified with all page-level Article schemas across the site.
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  icons: {
    icon: '/assets/new-light-logo.webp',
  },
  // Ties this site to the iOS app for App Store rich results & smart banner. Set in
  // metadata (not a hard-coded <meta>) so a sub-site such as /dhyaan can override it.
  itunes: { appId: '6747684125', appArgument: 'https://wisdomquotes.in' },
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
      className={`${playfair.variable} ${inter.variable} ${notoSansDevanagari.variable} ${scriptureFontVars}`}
      suppressHydrationWarning
    >
      <head>
        {/* Devanagari or IAST, chosen once for the whole site (lib/script.ts); applied before paint. */}
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_BOOT }} />
        {/* Plain-text guide to the site for AI assistants (llmstxt.org). */}
        <link rel="alternate" type="text/plain" href="/llms.txt" title="llms.txt" />
      </head>
      <body>
        <AuthProvider>
          <MixpanelProvider>
            {children}
            <Motion />
          </MixpanelProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
