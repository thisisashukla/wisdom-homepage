'use client'

import { distinctId, isDevTraffic, registerSuper, updateProfile } from '@/lib/mixpanel'

/**
 * The ids that join a /start visitor's Mixpanel events to the backend's Supabase rows (plan_runs, raw_notes).
 *
 *   onboarding_id  one per onboarding, made when a fresh /start begins and kept while the saved flow resumes.
 *                  Registered as a Mixpanel super property, so every later event in this browser carries it.
 *   request_id     one per backend call, sent in `client` and on the Mixpanel event that reports the call
 *                  (Verses Generated, Plan Built).
 *
 * The app does the same (wisdom/app/services/OnboardingTrace.ts). The note text never goes to Mixpanel: only that
 * there was one, its length and whether it was spoken or typed.
 */
const KEY = 'wisdom_onboarding_id'
const TRAIL_KEY = 'wisdom_onboarding_trail'

const uuid = (): string => {
  try {
    if (typeof crypto !== 'undefined' && 'randomUUID' in crypto) return crypto.randomUUID()
  } catch {}
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

let current: string | null = null
let trail: string[] = []

/** Starts (fresh) or resumes the onboarding's id and puts it on every later Mixpanel event. */
export function beginOnboarding(fresh: boolean): string {
  let id: string | null = null
  try {
    id = fresh ? null : localStorage.getItem(KEY)
    trail = fresh ? [] : JSON.parse(localStorage.getItem(TRAIL_KEY) || '[]')
  } catch {
    trail = []
  }
  if (!id) {
    id = uuid()
    try {
      localStorage.setItem(KEY, id)
      localStorage.setItem(TRAIL_KEY, '[]')
    } catch {}
  }
  current = id
  registerSuper({ onboarding_id: id, onboarding_platform: 'web' })
  updateProfile({ set: { last_onboarding_id: id }, setOnce: { first_onboarding_id: id } })
  return id
}

export const onboardingId = (): string | null => current

export const newRequestId = (): string => uuid()

/** Every word tapped on the feeling screen, in order (the screen keeps only the last one). */
export function noteEmotionTap(id: string) {
  trail = [...trail, id].slice(-20)
  try {
    localStorage.setItem(TRAIL_KEY, JSON.stringify(trail))
  } catch {}
}
export const emotionTrail = (): string[] => trail

/** What the person told us, on their Mixpanel profile and on every later event. Answers only, never their words. */
export function rememberAnswers(props: Record<string, unknown>) {
  registerSuper(props)
  updateProfile({ set: props })
}

/** The `client` block for /api/start/* (passed to the backend as `client`, see lib/server/startShared.ts). */
export function clientFor(requestId: string, extra: { context?: string; emotion?: string } = {}) {
  return {
    requestId,
    onboardingId: current ?? undefined,
    distinctId: distinctId() ?? undefined,
    context: extra.context ?? 'onboarding',
    emotion: extra.emotion,
    emotionTrail: trail,
    dev: isDevTraffic(),
  }
}
