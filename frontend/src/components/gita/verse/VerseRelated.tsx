/**
 * Up to three related verses and one row of theme links (verse tags and the concepts it builds on,
 * merged and de-duplicated). Replaces the six related cards in two groups, the theme tags on the
 * verse card and the "Explore related themes" line.
 *
 *   <VerseRelated chapter={2} verse={47} lang="en" verses={[...]} themes={[{ href, label, count }]} />
 *
 * Server component. Links: <loc>_related_<c>_<v>, <loc>_theme_<slug>.
 */
import { verseUrl, type GitaLang } from '@/lib/gitaUrls'
import './verse.css'

export type RelatedVerse = { chapter: number; verse: number; teaser: string }
export type ThemeLink = { slug: string; href: string; label: string; count?: number }

const COPY = {
  en: { title: 'Verses in the same spirit', themes: 'Themes', read: 'Read' },
  hi: { title: 'इसी भाव के श्लोक', themes: 'विषय', read: 'पढ़ें' },
} as const

type Props = {
  chapter: number
  verse: number
  lang: GitaLang
  verses: RelatedVerse[]
  themes: ThemeLink[]
  /** Leave this verse out (the next verse, which already has its own card). */
  exclude?: { chapter: number; verse: number } | null
}

export default function VerseRelated({ chapter, verse, lang, verses, themes, exclude }: Props) {
  const list = verses.filter((r) => !(exclude && r.chapter === exclude.chapter && r.verse === exclude.verse)).slice(0, 3)
  if (!list.length && !themes.length) return null
  const t = COPY[lang]
  const loc = `verse_${lang === 'hi' ? 'hi_' : ''}${chapter}_${verse}`
  return (
    <section className="vp-related" aria-label={t.title}>
      {list.length > 0 && (
        <>
          <h2 className="vp-sechead">{t.title}</h2>
          <ul className="vp-related-list">
            {list.map((r) => (
              <li key={`${r.chapter}.${r.verse}`}>
                <a href={verseUrl(r.chapter, r.verse, lang)} data-mp-location={`${loc}_related_${r.chapter}_${r.verse}`}>
                  <span className="vp-ref">{r.chapter}.{r.verse}</span>
                  <span className="vp-related-teaser">{r.teaser}</span>
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
      {themes.length > 0 && (
        <p className="vp-themes">
          <span className="vp-themes-label">{t.themes}</span>
          {themes.map((th) => (
            <a key={th.slug} href={th.href} className="vp-chip" data-mp-location={`${loc}_theme_${th.slug}`}>
              {th.label}
              {th.count ? <span className="vp-chip-count">{th.count}</span> : null}
            </a>
          ))}
        </p>
      )}
    </section>
  )
}
