import { listenSessionsForChapter } from '@/lib/listenServer'
import { listenHubUrl, minutesLabel, sessionUrl, type ListenLang } from '@/lib/listen'
import './listen.css'

/** Chapter page: this chapter's Listen sessions, as a short list. Server component. */
export function ChapterListenStrip({ chapter, lang }: { chapter: number; lang: ListenLang }) {
  const list = listenSessionsForChapter(chapter)
  if (!list.length) return null
  const hi = lang === 'hi'
  return (
    <section className="ll-strip" lang={lang} aria-labelledby={`ll-${chapter}`} data-mp-section={`chapter_${chapter}_listen`}>
      <h2 className="ll-h" id={`ll-${chapter}`}>{hi ? 'यह अध्याय सुनिए, अर्थ सहित' : 'Listen to this chapter, with meaning'}</h2>
      <ol className="ll-list">
        {list.map((s) => (
          <li key={s.id}>
            <a href={sessionUrl(s.chapter, s.n, lang)} data-mp-location={`chapter_${chapter}_listen_${s.n}`}>
              <span className="ll-t">{s.title[lang]}</span>
              <span className="ll-m">{hi ? `श्लोक ${s.from} से ${s.to}` : `Verses ${s.from} to ${s.to}`}, {minutesLabel(s.dur[lang], lang)}</span>
            </a>
          </li>
        ))}
      </ol>
    </section>
  )
}

/** Gita index pages: one line into the Listen hub. */
export function ListenHubLink({ lang, location }: { lang: ListenLang; location: string }) {
  const hi = lang === 'hi'
  return (
    <a className="ll-hub" href={listenHubUrl(lang)} lang={lang} data-mp-location={location}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h2v-7H5v-1a7 7 0 0 1 14 0v1h-3v7h2a3 3 0 0 0 3-3v-5a9 9 0 0 0-9-9z" /></svg>
      <span>
        <strong>{hi ? 'गीता सुनिए' : 'Listen to the Gita'}</strong>
        <span>{hi ? 'हर श्लोक, अर्थ सहित, 10 से 15 मिनट के सत्रों में' : 'Every verse with its meaning, in 10 to 15 minute sessions'}</span>
      </span>
    </a>
  )
}
