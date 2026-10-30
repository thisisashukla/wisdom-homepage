'use client'

/**
 * Devanagari / IAST toggle. Sets data-script on the funnel root; CSS shows one
 * script at a time. Server render is Devanagari, so the page reads without JS.
 */
import { useEffect, useState } from 'react'
import type { Locale } from '@/lib/quotes-shared'
import { upTrack } from './track'

type Script = 'deva' | 'iast'
const KEY = 'fx-up-script'

export default function ScriptToggle({ page, locale }: { page: string; locale: Locale }) {
  const [script, setScript] = useState<Script>('deva')

  useEffect(() => {
    let saved: Script = 'deva'
    try {
      if (localStorage.getItem(KEY) === 'iast') saved = 'iast'
    } catch {}
    setScript(saved)
    document.querySelectorAll('.fx-upanishads').forEach((el) => el.setAttribute('data-script', saved))
  }, [])

  const choose = (to: Script) => {
    if (to === script) return
    setScript(to)
    document.querySelectorAll('.fx-upanishads').forEach((el) => el.setAttribute('data-script', to))
    try {
      localStorage.setItem(KEY, to)
    } catch {}
    upTrack('Script Toggled', page, locale, { to })
  }

  const label = locale === 'hi' ? 'लिपि चुनें' : 'Show the Sanskrit in'
  return (
    <div className="fx-toggle" role="group" aria-label={label}>
      <button type="button" aria-pressed={script === 'deva'} onClick={() => choose('deva')}>
        <span lang="sa">देवनागरी</span>
      </button>
      <button type="button" aria-pressed={script === 'iast'} onClick={() => choose('iast')}>
        IAST
      </button>
    </div>
  )
}
