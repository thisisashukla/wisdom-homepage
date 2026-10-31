import { startUrl } from '@/lib/app'
import type { Action } from '@/components/site/Button'

/**
 * The "Create my free Gita reading plan" call to action as a kit Action (Button / Actions / PageHero),
 * opening /start on every device. Same href as HeroPlanCTA (ref = campaign, s = situation); clicks are
 * counted as Link Clicked { location } through data-mp-location.
 */
export function planAction({ campaign, location, situation, variant }: { campaign: string; location: string; situation?: string | null; variant?: Action['variant'] }): Action {
  return { href: startUrl({ s: situation, ref: campaign }), label: 'Create my free Gita reading plan', location, ...(variant ? { variant } : {}) }
}
