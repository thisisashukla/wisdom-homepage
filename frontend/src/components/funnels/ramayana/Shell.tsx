import type { ReactNode } from 'react'
import HomeAnimations from '@/components/HomeAnimations'
import { tiro } from '@/components/quotes/fonts'
import { tiroHindi } from './fonts'
import '@/app/home.css'
import '@/app/home-v3.css'
import './ramayana.css'

/** Root of every Ramayana funnel page: house tokens and motion, scripture fonts, language. */
export default function Shell({ locale, children }: { locale: 'en' | 'hi'; children: ReactNode }) {
  return (
    <div className={`fx-ramayana ${tiroHindi.variable} ${tiro.variable}`} lang={locale}>
      <noscript>
        <style>{'.fx-ramayana .rl-panel{display:block;grid-row:auto!important}'}</style>
      </noscript>
      <HomeAnimations />
      <main>{children}</main>
    </div>
  )
}
