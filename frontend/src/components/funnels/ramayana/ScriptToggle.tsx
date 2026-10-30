'use client'

import { trackFunnel } from '@/lib/funnels/ramayana/track'
import { setScript, useScript, type Script } from './script'

/** Devanagari or IAST for every original line on the page. */
export default function ScriptToggle({ locale, page }: { locale: 'en' | 'hi'; page: string }) {
  const script = useScript()
  const pick = (s: Script) => {
    if (s === script) return
    setScript(s)
    trackFunnel('Script Toggled', { page, locale }, { to: s === 'deva' ? 'devanagari' : 'iast' })
  }
  return (
    <div className="rl-script" role="group" aria-label={locale === 'hi' ? 'लिपि चुनें' : 'Script for the original lines'}>
      <button type="button" aria-pressed={script === 'deva'} onClick={() => pick('deva')} lang="hi">
        देवनागरी
      </button>
      <button type="button" aria-pressed={script === 'iast'} onClick={() => pick('iast')}>
        IAST
      </button>
    </div>
  )
}
