import { api } from '@/lib/funnelClient'

/**
 * The browser's side of saved web plans: the token this browser keeps, and
 * "do they already have a plan?" (/api/plan/mine: by that token, or by the
 * signed-in account on any device).
 */
export const PLAN_TOKEN_KEY = 'wisdom_plan_token'
export const TOKEN_RE = /^[0-9a-f]{48}$/

export type PlanSummary = {
  token: string
  status: 'active' | 'done' | 'replaced' | 'unsubscribed'
  today: number
  unlocked: number
  complete: boolean
  weekTitle: string | null
  readDays: number[]
  name: string | null
  age: string | null
  stages: string[]
}

export function savedToken(): string | null {
  try {
    const t = localStorage.getItem(PLAN_TOKEN_KEY)
    return t && TOKEN_RE.test(t) ? t : null
  } catch {
    return null
  }
}

export function keepToken(token: string) {
  try { localStorage.setItem(PLAN_TOKEN_KEY, token) } catch {}
}

/** Their plan, if any: this browser's first, then (signed in) their account's. Never throws. */
export async function findMyPlan(): Promise<PlanSummary | null> {
  const t = savedToken()
  try {
    const r = await api<{ plan: PlanSummary | null }>(`/api/plan/mine${t ? `?t=${t}` : ''}`, { timeoutMs: 8000 })
    if (r.plan?.token) keepToken(r.plan.token)
    return r.plan ?? null
  } catch {
    return null
  }
}
