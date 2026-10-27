'use client'

import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, type User } from 'firebase/auth'
import { auth, googleProvider } from '@/lib/firebase'
import { mixpanel, initMixpanel, trackEvent } from '@/lib/mixpanel'

/** Browser helpers for the "your verse" funnel: sign-in, API calls, Razorpay. */

export const PENDING_KEY = 'wisdom_yv_pending'

export function savePending(state: Record<string, unknown>) {
  try {
    sessionStorage.setItem(PENDING_KEY, JSON.stringify({ ...state, at: Date.now() }))
  } catch {}
}

export function takePending(): Record<string, unknown> | null {
  try {
    const raw = sessionStorage.getItem(PENDING_KEY)
    sessionStorage.removeItem(PENDING_KEY)
    if (!raw) return null
    const v = JSON.parse(raw)
    return Date.now() - (v.at ?? 0) < 15 * 60 * 1000 ? v : null
  } catch {
    return null
  }
}

export function identify(user: User) {
  try {
    initMixpanel()
    mixpanel.identify(user.uid)
    mixpanel.people.set({ $email: user.email ?? undefined, $name: user.displayName ?? undefined })
  } catch {}
}

/** Google sign-in: popup first, redirect if the browser blocks popups. */
export async function signInWithGoogle(pending: Record<string, unknown>): Promise<User | null> {
  googleProvider.setCustomParameters({ prompt: 'select_account' })
  try {
    const cred = await signInWithPopup(auth, googleProvider)
    identify(cred.user)
    return cred.user
  } catch (err) {
    const code = (err as { code?: string })?.code || ''
    if (code === 'auth/popup-blocked' || code === 'auth/operation-not-supported-in-this-environment') {
      savePending(pending)
      await signInWithRedirect(auth, googleProvider as GoogleAuthProvider)
      return null
    }
    if (code === 'auth/popup-closed-by-user' || code === 'auth/cancelled-popup-request') return null
    throw err
  }
}

async function authHeaders(): Promise<Record<string, string>> {
  const u = auth.currentUser
  if (!u) return {}
  const token = await u.getIdToken()
  return { Authorization: `Bearer ${token}` }
}

export class ApiError extends Error {
  constructor(public status: number, public code: string) {
    super(code)
  }
}

/**
 * How long the browser waits for our own routes. Each is a little above the route's maxDuration, so
 * the route's own answer (a 502 when the backend is slow) arrives first; the browser only gives up
 * when the route itself never answers. Everything else is quick.
 */
export const API_TIMEOUT = { default: 20_000, hook: 65_000, plan: 65_000 } as const

export async function api<T>(path: string, init: { method?: string; body?: unknown; timeoutMs?: number } = {}): Promise<T> {
  const ctrl = new AbortController()
  const timer = setTimeout(() => ctrl.abort(), init.timeoutMs ?? API_TIMEOUT.default)
  let res: Response
  try {
    res = await fetch(path, {
      method: init.method ?? (init.body ? 'POST' : 'GET'),
      headers: { 'Content-Type': 'application/json', ...(await authHeaders()) },
      body: init.body ? JSON.stringify(init.body) : undefined,
      signal: ctrl.signal,
    })
  } catch {
    if (ctrl.signal.aborted) throw new ApiError(0, 'timeout')
    throw new ApiError(0, 'network')
  } finally {
    clearTimeout(timer)
  }
  const data = await res.json().catch(() => ({}))
  if (!res.ok) throw new ApiError(res.status, (data as { error?: string }).error || `http_${res.status}`)
  return data as T
}

// ── Razorpay Checkout ────────────────────────────────────────────────────────

type RazorpayResponse = {
  razorpay_payment_id: string
  razorpay_subscription_id: string
  razorpay_signature: string
}
type RazorpayCtor = new (opts: Record<string, unknown>) => { open: () => void; on: (e: string, cb: (r: unknown) => void) => void }

function loadRazorpay(): Promise<RazorpayCtor> {
  const w = window as unknown as { Razorpay?: RazorpayCtor }
  if (w.Razorpay) return Promise.resolve(w.Razorpay)
  return new Promise((resolve, reject) => {
    const s = document.createElement('script')
    s.src = 'https://checkout.razorpay.com/v1/checkout.js'
    s.async = true
    s.onload = () => (w.Razorpay ? resolve(w.Razorpay) : reject(new Error('razorpay_missing')))
    s.onerror = () => reject(new Error('razorpay_load_failed'))
    document.head.appendChild(s)
  })
}

/** Opens Checkout for the weekly plan. Resolves true once the server has verified the payment. */
export async function startWeeklyPlanCheckout(source: string): Promise<boolean> {
  const sub = await api<{ active?: boolean; subscription_id?: string; key_id?: string; email?: string; name?: string }>(
    '/api/pay/subscribe',
    { body: {} },
  )
  if (sub.active) return true
  const Razorpay = await loadRazorpay()
  trackEvent('Purchase Started', { product: 'web_plan_weekly', source })
  return new Promise((resolve, reject) => {
    const rzp = new Razorpay({
      key: sub.key_id,
      subscription_id: sub.subscription_id,
      name: 'Wisdom',
      description: 'Your Gita plan · ₹89 a week',
      image: 'https://wisdomquotes.in/assets/new-light-logo.webp',
      prefill: { email: sub.email, name: sub.name },
      theme: { color: '#c8881e' },
      modal: {
        ondismiss: () => {
          trackEvent('Purchase Cancelled', { product: 'web_plan_weekly', source })
          resolve(false)
        },
      },
      handler: async (r: RazorpayResponse) => {
        try {
          await api('/api/pay/verify', { body: r })
          trackEvent('Purchase Completed', { product: 'web_plan_weekly', price_inr: 89, source })
          resolve(true)
        } catch (e) {
          reject(e)
        }
      },
    })
    rzp.on('payment.failed', () => trackEvent('Purchase Failed', { product: 'web_plan_weekly', source }))
    rzp.open()
  })
}

export function bgLink(id: string): string | null {
  const m = /^bg\.(\d+)\.(\d+)$/.exec(id)
  return m ? `/gita/chapter/${m[1]}/verse/${m[2]}` : null
}
