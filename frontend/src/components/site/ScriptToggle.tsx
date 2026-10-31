'use client'

import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { setScript, useScript, type Script } from '@/lib/script'
import './site.css'

const LABEL: Record<Locale, string> = { en: 'Show verses in', hi: 'श्लोक इस लिपि में' }

/**
 * Devanagari / IAST switch. One setting for the whole site (lib/script.ts): flipping it on any
 * page changes every verse on every page. Mark scripture with .sx-deva / .sx-iast (VerseCard does).
 */
export default function ScriptToggle({ locale = 'en', size = 'default', className = '' }: { locale?: Locale; size?: 'default' | 'compact'; className?: string }) {
  const script = useScript()
  const pick = (s: Script) => {
    if (s === script) return
    setScript(s)
    trackEvent(EVENTS.ScriptToggled, { to: s === 'deva' ? 'devanagari' : 'iast' })
  }
  return (
    <div className={`sx-script${size === 'compact' ? ' sx-script--compact' : ''} ${className}`.trim()} role="group" aria-label={LABEL[locale]}>
      <button type="button" lang="sa" aria-pressed={script === 'deva'} onClick={() => pick('deva')}>
        देवनागरी
      </button>
      <button type="button" aria-pressed={script === 'iast'} onClick={() => pick('iast')}>
        IAST
      </button>
    </div>
  )
}
