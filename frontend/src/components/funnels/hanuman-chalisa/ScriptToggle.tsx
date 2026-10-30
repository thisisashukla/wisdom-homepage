'use client'

/**
 * Devanagari / IAST toggle. Both scripts are in the server HTML; the root's
 * data-script attribute decides which one shows (Devanagari without JS).
 * The choice is saved on the device and shared by every toggle on the page.
 */

import { useEffect, useState } from 'react'
import { trackEvent } from '@/lib/mixpanel'
import { baseProps, SCRIPT_KEY, type HcLocale } from '@/lib/funnels/hanuman-chalisa/shared'

type Script = 'deva' | 'iast'

const T = {
  en: { group: 'Script', deva: 'देव', devaLabel: 'Devanagari', iast: 'IAST', iastLabel: 'Roman letters (IAST)' },
  hi: { group: 'लिपि', deva: 'देव', devaLabel: 'देवनागरी', iast: 'IAST', iastLabel: 'रोमन (IAST)' },
} as const

function apply(s: Script) {
  document.querySelectorAll<HTMLElement>('.fx-hanuman-chalisa').forEach((el) => {
    if (s === 'iast') el.setAttribute('data-script', 'iast')
    else el.removeAttribute('data-script')
  })
}

export default function ScriptToggle({ locale, page }: { locale: HcLocale; page: string }) {
  const t = T[locale]
  const [script, setScript] = useState<Script>('deva')

  useEffect(() => {
    let saved: Script = 'deva'
    try {
      saved = window.localStorage.getItem(SCRIPT_KEY) === 'iast' ? 'iast' : 'deva'
    } catch {
      // storage blocked
    }
    setScript(saved)
    apply(saved)
    const onChange = (e: Event) => setScript((e as CustomEvent<Script>).detail)
    window.addEventListener('hc:script', onChange)
    return () => window.removeEventListener('hc:script', onChange)
  }, [])

  const choose = (s: Script) => {
    if (s === script) return
    setScript(s)
    apply(s)
    try {
      window.localStorage.setItem(SCRIPT_KEY, s)
    } catch {
      // storage blocked
    }
    window.dispatchEvent(new CustomEvent('hc:script', { detail: s }))
    trackEvent('Script Toggled', { ...baseProps(page, locale), to: s })
  }

  return (
    <div className="hc-toggle" role="group" aria-label={t.group}>
      <button type="button" data-deva="" lang="hi" aria-pressed={script === 'deva'} aria-label={t.devaLabel} onClick={() => choose('deva')}>
        {t.deva}
      </button>
      <button type="button" aria-pressed={script === 'iast'} aria-label={t.iastLabel} onClick={() => choose('iast')}>
        {t.iast}
      </button>
    </div>
  )
}
