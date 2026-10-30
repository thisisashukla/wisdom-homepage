'use client'

/**
 * Devanagari / IAST switch. Sets data-script on the funnel root, so every verse on the page follows it and
 * only one script is ever visible. Without JS the page shows Devanagari. The choice is remembered.
 */
import { useEffect, useRef, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'

type Script = 'deva' | 'iast'
const KEY = 'fx-script'

export default function ScriptToggle({ page }: { page: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [script, setScript] = useState<Script>('deva')

  const apply = (s: Script) => {
    const root = ref.current?.closest('[data-fx-root]')
    if (root) root.setAttribute('data-script', s)
  }

  useEffect(() => {
    let saved: Script = 'deva'
    try {
      if (localStorage.getItem(KEY) === 'iast') saved = 'iast'
    } catch {
      saved = 'deva'
    }
    setScript(saved)
    apply(saved)
  }, [])

  const choose = (s: Script) => {
    if (s === script) return
    setScript(s)
    apply(s)
    try {
      localStorage.setItem(KEY, s)
    } catch {
      // private mode: keep it for this page only
    }
    trackEvent('Script Toggled', { funnel: 'other-gitas', page, locale: 'en', to: s })
  }

  return (
    <div ref={ref} className="fx-toggle" role="group" aria-label="Show the Sanskrit in">
      <button type="button" lang="sa" aria-pressed={script === 'deva'} onClick={() => choose('deva')}>
        देवनागरी
      </button>
      <button type="button" aria-pressed={script === 'iast'} onClick={() => choose('iast')}>
        IAST
      </button>
    </div>
  )
}
