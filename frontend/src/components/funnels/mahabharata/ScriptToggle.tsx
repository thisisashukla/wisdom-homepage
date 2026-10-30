'use client'

import { useEffect, useState } from 'react'

type Script = 'deva' | 'iast'
const KEY = 'mbh_script'

/**
 * Devanagari or IAST, never both on one card. Sets data-script on the funnel root;
 * CSS hides the other. Without JS the root stays on Devanagari.
 */
export default function ScriptToggle({ locale }: { locale: 'en' | 'hi' }) {
  const [script, setScript] = useState<Script>('deva')

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(KEY)
      if (saved === 'iast' || saved === 'deva') setScript(saved)
    } catch {
      // storage blocked
    }
  }, [])

  useEffect(() => {
    document.querySelectorAll<HTMLElement>('.fx-mahabharata').forEach((el) => (el.dataset.script = script))
  }, [script])

  const pick = (s: Script) => {
    setScript(s)
    try {
      window.localStorage.setItem(KEY, s)
    } catch {
      // storage blocked
    }
  }

  const label = locale === 'hi' ? 'संस्कृत किस लिपि में दिखे' : 'Show the Sanskrit in'
  return (
    <div className="mb-script" role="group" aria-label={label}>
      <span className="mb-script-label" aria-hidden="true">
        {locale === 'hi' ? 'लिपि' : 'Script'}
      </span>
      <button type="button" aria-pressed={script === 'deva'} onClick={() => pick('deva')} lang="sa">
        देवनागरी
      </button>
      <button type="button" aria-pressed={script === 'iast'} onClick={() => pick('iast')}>
        IAST
      </button>
    </div>
  )
}
