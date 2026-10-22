/**
 * Kept for older imports. The app CTA on Gita pages is now the device-aware
 * funnel block: "Create my 7-day Gita plan" for everyone, the App Store on iPhone.
 */
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import type { Verse, Chapter } from '@/lib/gita'

type Props = {
  variant: 'inline' | 'verse' | 'chapter'
  locale?: 'en' | 'hi'
  verse?: Pick<Verse, 'chapter' | 'verse'> | null
  chapter?: Pick<Chapter, 'number' | 'enName' | 'hiName' | 'totalVerses'> | null
}

export default function GitaAppCTA({ variant, locale = 'en', verse, chapter }: Props) {
  return <VerseFunnelCTA variant={variant} locale={locale} verse={verse} chapter={chapter} />
}
