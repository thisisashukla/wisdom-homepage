import type { Metadata } from 'next'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import MixpanelProvider from '@/components/MixpanelProvider'

export const metadata: Metadata = {
  title: {
    template: '%s | Wisdom',
    default: 'Wisdom — Bhagavad Gita',
  },
  description: 'Free access to the Bhagavad Gita, one verse at a time. Explore all chapters and topic guides.',
  openGraph: {
    siteName: 'Wisdom',
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
