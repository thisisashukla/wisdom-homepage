import type { Locale } from './locale'

/**
 * The site navigation, defined once. Nav (desktop bar + More menu), the phone drawer and the
 * footer all read from here, so a page added here appears everywhere in the same order.
 */
export type NavItem = {
  label: Record<Locale, string>
  /** Path per locale; a page without a Hindi twin uses the English path for both. */
  href: Record<Locale, string>
  /** One-line description shown in the More menu. */
  note?: Record<Locale, string>
  /** Paths that count as "inside" this item for aria-current (prefix match). */
  match?: string[]
}

const same = (p: string) => ({ en: p, hi: p })

export const NAV_PRIMARY: NavItem[] = [
  { label: { en: 'Read the Gita', hi: 'गीता पढ़ें' }, href: { en: '/gita', hi: '/hi/gita' }, match: ['/gita', '/hi/gita'] },
  { label: { en: 'Verse of the Day', hi: 'आज का श्लोक' }, href: { en: '/gita/today', hi: '/hi/gita/today' }, match: ['/gita/today', '/hi/gita/today'] },
  { label: { en: 'Reading Plans', hi: 'रीडिंग प्लान' }, href: same('/reading-plans'), match: ['/reading-plans', '/gita-for'] },
  { label: { en: 'Blog', hi: 'ब्लॉग' }, href: same('/blogs'), match: ['/blogs', '/hi/blogs'] },
]

/** "Beyond the Gita": the scripture funnels, in the More menu, the drawer and the footer. */
export const NAV_SCRIPTURES: NavItem[] = [
  { label: { en: 'Ramayana', hi: 'रामायण' }, href: same('/ramayana'), note: { en: 'Valmiki and Tulsidas, scene by scene', hi: 'वाल्मीकि और तुलसीदास, प्रसंग दर प्रसंग' }, match: ['/ramayana', '/hi/ramayana'] },
  { label: { en: 'Mahabharata', hi: 'महाभारत' }, href: same('/mahabharata'), note: { en: 'The family, the war and the Gita inside it', hi: 'कुरु वंश, युद्ध और उसके भीतर गीता' }, match: ['/mahabharata', '/hi/mahabharata'] },
  { label: { en: 'Upanishads', hi: 'उपनिषद' }, href: { en: '/upanishads', hi: '/hi/upanishad' }, note: { en: 'Where to start, line by line', hi: 'कहाँ से शुरू करें, श्लोक दर श्लोक' }, match: ['/upanishads', '/hi/upanishad'] },
  { label: { en: 'Hanuman Chalisa', hi: 'हनुमान चालीसा' }, href: { en: '/hanuman-chalisa', hi: '/hi/hanuman-chalisa' }, note: { en: 'All 43 lines with their meaning', hi: 'सभी 43 पंक्तियाँ, अर्थ के साथ' }, match: ['/hanuman-chalisa', '/hi/hanuman-chalisa', '/hanuman-jayanti'] },
  { label: { en: 'Ashtavakra Gita', hi: 'अष्टावक्र गीता' }, href: same('/ashtavakra-gita'), note: { en: 'A king asks how to be free', hi: 'राजा जनक का प्रश्न: मुक्ति कैसे?' }, match: ['/ashtavakra-gita'] },
  { label: { en: 'Other Gitas', hi: 'अन्य गीताएँ' }, href: same('/gitas'), note: { en: 'Twenty songs beyond the Bhagavad Gita', hi: 'भगवद्गीता के अलावा बीस गीताएँ' }, match: ['/gitas'] },
  { label: { en: 'Vivekananda quotes', hi: 'विवेकानंद के विचार' }, href: { en: '/vivekananda-quotes', hi: '/hi/vivekananda-quotes' }, note: { en: 'Only what he actually said', hi: 'वही जो उन्होंने सच में कहा' }, match: ['/vivekananda-quotes', '/hi/vivekananda-quotes'] },
  { label: { en: 'Kabir dohe', hi: 'कबीर के दोहे' }, href: { en: '/kabir-dohe-in-english', hi: '/hi/kabir-ke-dohe' }, note: { en: 'Fifty dohe in his own words', hi: 'पचास दोहे, उनके अपने शब्दों में' }, match: ['/kabir-dohe-in-english', '/hi/kabir-ke-dohe'] },
  { label: { en: 'Chanakya Niti', hi: 'चाणक्य नीति' }, href: same('/hi/chanakya-niti'), note: { en: 'Sanskrit verses for hard choices (Hindi)', hi: 'कठिन फ़ैसलों के लिए श्लोक' }, match: ['/hi/chanakya-niti'] },
  { label: { en: 'Shri Ram Shalaka', hi: 'श्रीराम शलाका' }, href: { en: '/ram-shalaka', hi: '/hi/ram-shalaka' }, note: { en: 'Ask Shri Ram a question', hi: 'श्रीराम से एक प्रश्न पूछें' }, match: ['/ram-shalaka', '/hi/ram-shalaka'] },
]

/** Secondary links (More menu foot, drawer foot). */
export const NAV_SECONDARY: NavItem[] = [
  { label: { en: 'हिंदी गीता', hi: 'English Gita' }, href: { en: '/hi/gita', hi: '/gita' } },
  { label: { en: 'Gita for life', hi: 'जीवन के लिए गीता' }, href: same('/gita-for'), match: ['/gita-for'] },
  { label: { en: 'About', hi: 'परिचय' }, href: same('/about'), match: ['/about'] },
]

export const NAV_APP = {
  href: '/app',
  label: { en: 'Wisdom app', hi: 'Wisdom ऐप' },
  short: { en: 'App', hi: 'ऐप' },
}

export const NAV_PLAN = {
  href: '/start?ref=menu',
  label: { en: 'Get my free reading plan', hi: 'मेरा मुफ़्त रीडिंग प्लान' },
}

export const MORE_LABEL: Record<Locale, string> = { en: 'More', hi: 'और' }
export const SCRIPTURES_LABEL: Record<Locale, string> = { en: 'Beyond the Gita', hi: 'गीता के आगे' }

/** Length of the longest match of `path` against the item, or -1. */
function matchLength(item: NavItem, path: string, locale: Locale): number {
  const list = item.match ?? [item.href[locale]]
  let best = -1
  for (const m of list) if ((path === m || path.startsWith(`${m}/`)) && m.length > best) best = m.length
  return best
}

/** The one item the current path belongs to (most specific match wins), or null. */
export function activeItem(items: NavItem[], path: string | null, locale: Locale): NavItem | null {
  if (!path) return null
  let hit: NavItem | null = null
  let len = -1
  for (const it of items) {
    const l = matchLength(it, path, locale)
    if (l > len) {
      len = l
      hit = it
    }
  }
  return hit
}
