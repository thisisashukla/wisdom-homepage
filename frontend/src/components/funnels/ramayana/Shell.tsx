import type { ReactNode } from 'react'
import { tiro } from '@/components/quotes/fonts'
import { cormorant, tiroHindi } from './fonts'
import './ramayana.css'

/** Root of every Ramayana funnel page: palette scope, fonts, language. */
export default function Shell({ locale, children }: { locale: 'en' | 'hi'; children: ReactNode }) {
  return (
    <div className={`fx-ramayana ${cormorant.variable} ${tiroHindi.variable} ${tiro.variable}`} lang={locale}>
      <noscript>
        <style>{'.fx-ramayana .rl-panel{display:block}'}</style>
      </noscript>
      <main className="rl-wrap">{children}</main>
    </div>
  )
}
