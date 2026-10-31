import { VerseCard, VerseList } from '@/components/site'
import type { Locale } from '@/lib/locale'
import { padasDeva, padasIast } from '@/lib/funnels/ramayana/verse'
import cardsJson from '@/content/funnels/ramayana/cards.json'
import KeepShare from './KeepShare'

type Card = {
  id: string
  sourceName: { en: string; hi: string }
  speaker: { en: string; hi: string }
  sanskritLine: string
  iast: string
  meaning: { en: string; hi: string }
  lineKey?: string
}
const CARDS = cardsJson as unknown as Card[]

const slug = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

/** A few Ramayana lines to keep: each a VerseCard with Copy, WhatsApp and Save image. */
export default function KeepCards({ ids, locale, pageKey, path }: { ids: string[]; locale: Locale; pageKey: string; path: string }) {
  const cards = ids.map((id) => CARDS.find((c) => c.id === id)).filter((c): c is Card => Boolean(c))
  return (
    <VerseList columns={2}>
      {cards.map((c, i) => {
        const sourceLine = `${c.speaker[locale]} · ${c.sourceName[locale]}`
        return (
          <VerseCard
            key={c.id}
            as="li"
            id={c.id}
            size="compact"
            rv
            locale={locale}
            lang={c.lineKey?.startsWith('rcm') ? 'awa' : 'sa'}
            original={padasDeva(c.sanskritLine)}
            iast={c.iast ? padasIast(c.iast) : undefined}
            meaning={c.meaning[locale]}
            source={sourceLine}
            actions={
              <KeepShare
                id={c.id}
                sa={c.sanskritLine}
                meaning={c.meaning[locale]}
                sourceLine={sourceLine}
                path={path}
                fileBase={`shlok-${slug(c.sourceName.en) || c.id}`}
                position={i + 1}
                pageKey={pageKey}
                locale={locale}
              />
            }
          />
        )
      })}
    </VerseList>
  )
}
