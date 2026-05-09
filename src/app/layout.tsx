import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import MixpanelProvider from '@/components/MixpanelProvider'

export const metadata: Metadata = {
  title: {
    template: '%s | Wisdom',
    default: 'Wisdom — Bhagavad Gita, Sanskrit Shlokas & Wisdom Quotes',
  },
  description: 'Read the Bhagavad Gita verse by verse — Sanskrit shlokas with Hindi and English meaning, wisdom quotes, and daily spiritual practice. Free, ad-free, beautifully presented.',
  openGraph: {
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  icons: {
    icon: '/assets/male-logo-dark.webp',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&family=Inter:wght@300;400;500;600&family=Noto+Sans+Devanagari:wght@400;500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/assets/male-logo-dark.webp" />
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
