'use client'

import { EVENTS, trackEvent } from '@/lib/mixpanel'
import type { Locale } from '@/lib/locale'
import { setScript, useScript, type Script } from '@/lib/script'
import './site.css'

const LABEL: Record<Locale, string> = { en: 'Show verses in', hi: 'श्लोक इस लिपि में' }

/** The verse's own script when it is not Devanagari (the Chalisa in Telugu letters, say). */
export type NativeScript = { code: 'te' | 'gu' | 'kn'; label: string }

/**
 * Devanagari / IAST switch. One setting for the whole site (lib/script.ts): flipping it on any
 * page changes every verse on every page. Mark scripture with .sx-deva / .sx-iast (VerseCard does).
 * `native` relabels the first button for a page whose verses are in another Indian script; the
 * setting itself is unchanged ('deva' = the verse's own script, 'iast' = English letters).
 */
export default function ScriptToggle({
  locale = 'en',
  size = 'default',
  className = '',
  native,
}: {
  locale?: Locale
  size?: 'default' | 'compact'
  className?: string
  native?: NativeScript
}) {
  const script = useScript()
  const pick = (s: Script) => {
    if (s === script) return
    setScript(s)
    trackEvent(EVENTS.ScriptToggled, { to: s === 'iast' ? 'iast' : native ? native.code : 'devanagari' })
  }
  return (
    <div className={`sx-script${size === 'compact' ? ' sx-script--compact' : ''} ${className}`.trim()} role="group" aria-label={LABEL[locale]}>
      <button type="button" lang={native ? native.code : 'sa'} aria-pressed={script === 'deva'} onClick={() => pick('deva')}>
        {native ? native.label : 'देवनागरी'}
      </button>
      <button type="button" aria-pressed={script === 'iast'} onClick={() => pick('iast')}>
        IAST
      </button>
    </div>
  )
}
