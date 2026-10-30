/** Small client helpers shared by the quote components. */

export type SheetAction = 'copied' | 'shared' | 'saved'

const SHEET_KEY = 'wq_q_sheet_shown'
export const LINEBAR_KEY = 'wq_q_linebar_dismissed'

let sheetShownInMemory = false

/** True only for the first copy/share/save of the session (sessionStorage, memory fallback). */
export function claimFirstAction(): boolean {
  try {
    if (window.sessionStorage.getItem(SHEET_KEY)) return false
    window.sessionStorage.setItem(SHEET_KEY, '1')
    return true
  } catch {
    if (sheetShownInMemory) return false
    sheetShownInMemory = true
    return true
  }
}

export function sessionFlag(key: string): boolean {
  try {
    return window.sessionStorage.getItem(key) === '1'
  } catch {
    return false
  }
}

export function setSessionFlag(key: string): void {
  try {
    window.sessionStorage.setItem(key, '1')
  } catch {
    // storage blocked: the flag lives only as long as the component state
  }
}

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

export async function writeClipboard(text: string): Promise<boolean> {
  try {
    if (navigator.clipboard?.writeText) {
      await navigator.clipboard.writeText(text)
      return true
    }
  } catch {
    // fall through to the textarea fallback
  }
  try {
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    ta.style.top = '0'
    document.body.appendChild(ta)
    ta.select()
    const ok = document.execCommand('copy')
    document.body.removeChild(ta)
    return ok
  } catch {
    return false
  }
}

// ── One shared toast for every card: a persistent polite live region on <body>. ──

let toastTimer: ReturnType<typeof setTimeout> | undefined

export function ensureToast(): HTMLElement | null {
  if (typeof document === 'undefined') return null
  let el = document.getElementById('qc-toast')
  if (!el) {
    el = document.createElement('div')
    el.id = 'qc-toast'
    el.className = 'qc-toast'
    el.setAttribute('role', 'status')
    el.setAttribute('aria-live', 'polite')
    document.body.appendChild(el)
  }
  return el
}

export function showToast(msg: string, ms = 1800): void {
  const el = ensureToast()
  if (!el) return
  el.textContent = msg
  el.setAttribute('data-show', '')
  clearTimeout(toastTimer)
  toastTimer = setTimeout(hideToast, ms)
}

export function hideToast(): void {
  const el = typeof document !== 'undefined' ? document.getElementById('qc-toast') : null
  clearTimeout(toastTimer)
  if (!el) return
  el.removeAttribute('data-show')
  el.textContent = ''
}
