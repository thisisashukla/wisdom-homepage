/**
 * The Wisdom iPhone app (v3): one place for its store link, its proposition
 * and the onboarding vocabulary the website shares with it.
 *
 * Proposition: "Bhagavad Gita, tuned to your life. One verse a day."
 */

export const APP_STORE_ID = '6747684125'

/**
 * App Store link with an App Store Connect campaign token, so installs can be
 * attributed per placement (App Analytics → Sources → Campaigns).
 * `pt` is the provider token from App Store Connect → Analytics → Campaign
 * Generator. Without it Apple ignores `ct`, so set NEXT_PUBLIC_APP_STORE_PT.
 */
export function appStoreUrl(campaign: string): string {
  const pt = process.env.NEXT_PUBLIC_APP_STORE_PT
  const params = new URLSearchParams()
  if (pt) params.set('pt', pt)
  params.set('ct', campaign.slice(0, 40))
  params.set('mt', '8')
  return `https://apps.apple.com/app/apple-store/id${APP_STORE_ID}?${params.toString()}`
}

export const APP_TAGLINE = 'Bhagavad Gita, tuned to your life.'
export const APP_SUBLINE = 'One verse a day.'

/** Weekly price for the web customisation (Android / desktop). */
export const WEB_PLAN_PRICE_INR = 89

// ── Onboarding vocabulary (mirrors wisdom/app/constants/onboardingGoals.ts) ──

export type FeelingId = 'quiet' | 'nerve' | 'replay' | 'stick' | 'faith' | 'gita'

export const FEELINGS: { id: FeelingId; label: string; line: string }[] = [
  { id: 'quiet', label: 'Restless', line: "My mind won't settle." },
  { id: 'nerve', label: 'Stuck', line: 'I keep going over something.' },
  { id: 'replay', label: 'Uneasy', line: "Something doesn't sit right." },
  { id: 'stick', label: 'Determined', line: "I'm ready to stick with it." },
  { id: 'faith', label: 'Searching', line: "I'm looking for something deeper." },
  { id: 'gita', label: 'Curious', line: 'I want to read the Gita.' },
]

export const FEELINGS_HI: Record<FeelingId, string> = {
  quiet: 'बेचैन',
  nerve: 'अटका हुआ',
  replay: 'असहज',
  stick: 'दृढ़',
  faith: 'खोज में',
  gita: 'जिज्ञासु',
}

/**
 * Situations the backend understands, as (topic, follow) pairs from the app's
 * onboarding (wisdom/app/constants/onboardingSituations.ts). `slug` is the
 * public URL of the matching /gita-for page, when there is one.
 */
export type Situation = { id: string; label: string; topic: string; follow: string; slug?: string }

export const SITUATIONS: Situation[] = [
  { id: 'overthinking', label: 'Overthinking', topic: 'mind', follow: 'overthinking', slug: 'overthinking' },
  { id: 'anxious', label: 'Anxious for no reason', topic: 'mind', follow: 'anxious', slug: 'stress' },
  { id: 'cant_sleep', label: "Can't sleep", topic: 'mind', follow: 'cant_sleep', slug: 'cant-sleep' },
  { id: 'didnt_work_out', label: 'Fear of failing', topic: 'work', follow: 'didnt_work_out', slug: 'fear-of-failure' },
  { id: 'might_lose_job', label: 'Might lose my job', topic: 'work', follow: 'might_lose_job' },
  { id: 'boss', label: 'My boss', topic: 'someone', follow: 'boss', slug: 'toxic-people' },
  { id: 'in_laws', label: 'My in-laws', topic: 'someone', follow: 'in_laws', slug: 'family-problems' },
  { id: 'partner', label: 'My partner', topic: 'someone', follow: 'partner' },
  { id: 'far_from_home', label: 'Far from home', topic: 'missing', follow: 'far_from_home', slug: 'loneliness' },
  { id: 'someone_lost', label: 'Someone I lost', topic: 'missing', follow: 'someone_lost', slug: 'grief' },
  { id: 'guilt', label: 'Guilt', topic: 'enough', follow: 'guilt', slug: 'guilt' },
  { id: 'fraud', label: 'Feel like a fraud', topic: 'enough', follow: 'fraud' },
  { id: 'everyone_ahead', label: "Everyone's ahead", topic: 'compare', follow: 'everyone_ahead', slug: 'comparison' },
  { id: 'money_tight', label: 'Money is tight', topic: 'compare', follow: 'money_tight', slug: 'money-stress' },
  { id: 'midlife', label: 'Midlife', topic: 'meaning', follow: 'midlife' },
  { id: 'decision', label: "A decision I'm avoiding", topic: 'meaning', follow: 'decision', slug: 'decision-making' },
  { id: 'cant_say_no', label: "I can't say no", topic: 'someone', follow: 'cant_say_no' },
]

export const situationById = (id?: string | null) => SITUATIONS.find((s) => s.id === id)

export type Platform = 'ios' | 'android' | 'desktop'

/** Client-side platform sniff. iPadOS reports as Mac with touch. */
export function detectPlatform(): Platform {
  if (typeof navigator === 'undefined') return 'desktop'
  const ua = navigator.userAgent || ''
  if (/iPhone|iPad|iPod/i.test(ua)) return 'ios'
  if (/Macintosh/i.test(ua) && typeof document !== 'undefined' && 'ontouchend' in document) return 'ios'
  if (/Android/i.test(ua)) return 'android'
  return 'desktop'
}

/**
 * The one question the website asks ("What's weighing on you?"), in the
 * customer's own words (lp/01-icp.md word bank). Each answer carries the
 * backend feeling + situation so one tap is enough.
 */
export type AskOption = { id: string; label: string; feeling: FeelingId; situation?: string; about?: string }
export const ASK: AskOption[] = [
  { id: 'overthinking', label: 'Overthinking', feeling: 'quiet', situation: 'overthinking', about: 'overthinking' },
  { id: 'result', label: "It didn't work out", feeling: 'nerve', situation: 'didnt_work_out', about: "something that didn't work out" },
  { id: 'boss', label: 'My boss', feeling: 'replay', situation: 'boss', about: 'trouble with your boss' },
  { id: 'breakup', label: 'My relationship', feeling: 'replay', situation: 'partner', about: 'your relationship' },
  { id: 'family', label: 'Family or in-laws', feeling: 'replay', situation: 'in_laws', about: 'family or in-laws' },
  { id: 'lost', label: 'Someone I lost', feeling: 'faith', situation: 'someone_lost', about: 'someone you lost' },
  { id: 'compare', label: "Everyone's ahead of me", feeling: 'nerve', situation: 'everyone_ahead', about: 'feeling everyone is ahead of you' },
  { id: 'sleep', label: "Can't sleep", feeling: 'quiet', situation: 'cant_sleep', about: "nights you can't sleep" },
  { id: 'home', label: 'Far from home', feeling: 'faith', situation: 'far_from_home', about: 'being far from home' },
  { id: 'else', label: 'Something else', feeling: 'replay' },
]

/**
 * Where "Create my plan" goes. iPhone: the App Store (the plan lives in the
 * app). Everyone else: /start, the app's onboarding on the web, where Google
 * sign-up comes once the questions are done. Never a sign-in on the page itself.
 */
export function startUrl(opts: { s?: string | null; ref?: string | null } = {}): string {
  const q = new URLSearchParams()
  if (opts.s) q.set('s', opts.s)
  if (opts.ref) q.set('ref', opts.ref)
  const qs = q.toString()
  return `/start${qs ? `?${qs}` : ''}`
}
