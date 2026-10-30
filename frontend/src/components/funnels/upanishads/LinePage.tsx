/**
 * A famous-line page (/upanishads/[line] and the Hindi twins). Order follows
 * the brief: quick answer, the line, plain meaning, then the arc.
 */
import type { Metadata } from 'next'
import QuoteCard from '@/components/quotes/QuoteCard'
import type { Locale } from '@/lib/quotes-shared'
import { articleLd, card, cardView, faqLd, passage, pageKey, SITE, upMeta, DISCLOSURE_EN, UPDATED } from '@/lib/funnels/upanishads'
import { LINES, lineBySlug, type FamousLine } from '@/content/funnels/upanishads/lines'
import Shell, { Faq, GitaBridge, SourcesNote, UpNext } from './Shell'
import Sanskrit from './Sanskrit'
import PrintCard from './PrintCard'

const enPath = (slug: string) => `/upanishads/${slug}`
const hiPath = (slug: string) => `/hi/upanishads/${slug}`

export function lineMetadata(slug: string, locale: Locale): Metadata {
  const line = lineBySlug(slug)
  if (!line) return { title: 'Not found', robots: { index: false } }
  const hi = locale === 'hi' ? line.hi : undefined
  return upMeta({
    title: hi?.title ?? line.title,
    description: hi?.description ?? line.description,
    path: locale === 'hi' ? hiPath(slug) : enPath(slug),
    locale,
    twin: line.hi ? (locale === 'hi' ? enPath(slug) : hiPath(slug)) : undefined,
    ogCard: line.cardId,
  })
}

const T = {
  en: {
    upanishads: 'Upanishads',
    whole: 'The whole passage',
    who: 'Who said it, and to whom',
    acharyas: 'How the acharyas read it',
    shankara: 'Shankara',
    others: 'Where others read it differently',
    writing: 'Writing it out',
    cardCaption: 'A print-ready card in Devanagari, 1080 by 1350 pixels. Open it full size for a tattoo stencil, calligraphy reference or framing.',
    post: 'Open the 4:5 card',
    status: 'Open the 9:16 story card',
    use: 'Copy or share the line',
    gita: 'The same thought in the Gita',
    gitaLead: 'Read next to',
    next: 'One line each morning',
    more: 'Keep reading',
    faq: 'Questions people ask',
    sources: 'Sources and method',
    plan: { label: 'Who am I: a 7-verse plan', sub: 'Seven lines from seven Upanishads, one a day.' },
    hub: { label: 'The Upanishads', sub: 'What they are, how many, and where to start.' },
    read: 'Read the full text',
  },
  hi: {
    upanishads: 'उपनिषद',
    whole: 'पूरा अंश',
    who: 'किसने, किससे कहा',
    acharyas: 'आचार्य इसे कैसे पढ़ते हैं',
    shankara: 'शंकराचार्य',
    others: 'दूसरी बात',
    writing: 'लिखने का सही रूप',
    cardCaption: 'देवनागरी में प्रिंट के लायक कार्ड, 1080 x 1350 पिक्सेल। फ़्रेम, सुलेख या टैटू के लिए पूरे साइज़ में खोलें।',
    post: '4:5 कार्ड खोलें',
    status: '9:16 स्टेटस कार्ड खोलें',
    use: 'श्लोक कॉपी या शेयर करें',
    gita: 'गीता में यही बात',
    gitaLead: 'साथ में पढ़ें',
    next: 'हर सुबह एक श्लोक',
    more: 'आगे पढ़ें',
    faq: 'लोग अक्सर पूछते हैं',
    sources: 'स्रोत और तरीका',
    plan: { label: 'Who am I: 7 श्लोकों का प्लान (अंग्रेज़ी)', sub: 'सात उपनिषदों से सात श्लोक, रोज़ एक।' },
    hub: { label: 'उपनिषद क्या हैं', sub: 'कितने हैं, कौन से मुख्य हैं, कहाँ से शुरू करें।' },
    read: 'पूरा पाठ पढ़ें (अंग्रेज़ी)',
  },
} as const

function relatedLines(line: FamousLine, locale: Locale): FamousLine[] {
  if (locale === 'hi') return LINES.filter((l) => l.hi && l.slug !== line.slug)
  return line.related.map((s) => lineBySlug(s)).filter((l): l is FamousLine => !!l)
}

export default function LinePage({ slug, locale }: { slug: string; locale: Locale }) {
  const line = lineBySlug(slug)
  if (!line) return null
  const t = T[locale]
  const hi = locale === 'hi' ? line.hi : undefined
  const path = locale === 'hi' ? hiPath(slug) : enPath(slug)
  const pageName = locale === 'hi' ? `upanishads-hi-${slug}` : `upanishads-${slug}`
  const key = pageKey(pageName)
  const p = passage(line.passage)
  const showWhole = (hi?.fullMeaning ?? line.fullMeaning) !== ''
  const h1 = hi?.h1 ?? line.h1
  const description = hi?.description ?? line.description
  const faq = hi?.faq ?? line.faq
  const refLabel = locale === 'hi' ? card(line.cardId).sourceName.hi : line.ref

  const crumbs =
    locale === 'hi'
      ? [
          { name: 'होम', path: '/' },
          { name: t.upanishads, path: '/hi/upanishad' },
          { name: h1.split(':')[0], path },
        ]
      : [
          { name: 'Home', path: '/' },
          { name: t.upanishads, path: '/upanishads' },
          { name: h1.split(':')[0], path },
        ]

  const jsonLd = [
    articleLd({ headline: h1, description, path, citation: `${line.ref}. Sanskrit: ${p.basis.startsWith('sanscripts corpus') ? 'Wisdom corpus' : p.basis}. English: Wisdom translation.`, locale, about: line.textName }),
    {
      '@context': 'https://schema.org',
      '@type': 'Quotation',
      text: line.sa,
      inLanguage: 'sa',
      url: `${SITE}${path}`,
      citation: line.ref,
      isPartOf: { '@type': 'Book', name: line.textName },
      image: `${SITE}/api/quote-card/${line.cardId}?format=post&lang=${locale}&theme=paper`,
      dateModified: UPDATED,
    },
    faqLd(faq),
  ]

  return (
    <Shell pageName={pageName} locale={locale} crumbs={crumbs} jsonLd={jsonLd}>
      <article>
        <header>
          <h1>{h1}</h1>
          <p id="quick-answer" className="fx-quick">
            {hi?.quick ?? line.quick}
          </p>
        </header>

        <div className="fx-line" data-mp-section="line">
          <p className="fx-ref">{refLabel}</p>
          <Sanskrit sa={line.sa} iast={line.iast} size="hero" />
          <p className="fx-en-line" lang={locale}>
            {hi?.meaning ?? line.meaning}
          </p>
        </div>

        {showWhole && (
          <section className="fx-sec" aria-labelledby="whole">
            <h2 id="whole">{t.whole}</h2>
            <p className="fx-ref">{refLabel}</p>
            <Sanskrit sa={p.sa} iast={p.iast} size="small" />
            <p className="fx-v-en" style={{ marginTop: 14 }}>
              {hi?.fullMeaning ?? line.fullMeaning}
            </p>
          </section>
        )}

        <section className="fx-sec" aria-labelledby="who">
          <h2 id="who">{t.who}</h2>
          {locale === 'en' && <p className="fx-who">{line.who}</p>}
          <p className="fx-scene">{hi?.scene ?? line.scene}</p>
          {line.textHref && locale === 'en' && (
            <p>
              <a href={line.textHref} data-mp-location="line_read_text">
                {t.read}: {line.textName}
              </a>
            </p>
          )}
        </section>

        <section className="fx-sec fx-acharya" aria-labelledby="acharyas">
          <h2 id="acharyas">{t.acharyas}</h2>
          <h3>{t.shankara}</h3>
          <p>{hi?.shankara ?? line.shankara}</p>
          <h3>{t.others}</h3>
          <p>{hi?.others ?? line.others}</p>
        </section>

        <section className="fx-sec" aria-labelledby="writing" data-mp-section="writing">
          <h2 id="writing">{t.writing}</h2>
          <ul className="fx-forms">
            {line.writing.forms.map((f) => (
              <li key={f.sa}>
                <span className="f-sa s-deva" lang="sa">
                  {f.sa}
                </span>
                <span className="f-iast s-iast" lang="sa-Latn">
                  {f.iast}
                </span>
                {locale === 'en' && <span className="f-label">{f.label}</span>}
              </li>
            ))}
          </ul>
          <p>{hi?.writingNote ?? line.writing.note}</p>
          <PrintCard
            cardId={line.cardId}
            line={slug}
            page={pageName}
            locale={locale}
            alt={`${line.sa} (${line.ref})`}
            labels={{ post: t.post, status: t.status, caption: t.cardCaption }}
          />
          <h3 style={{ marginTop: 28 }}>{t.use}</h3>
          <QuoteCard quote={cardView(line.cardId, locale, path)} locale={locale} pageName={pageName} pageKey={key} verseHref={null} />
        </section>

        {line.gita.length > 0 && (
          <section className="fx-sec" aria-labelledby="gita">
            <h2 id="gita">{t.gita}</h2>
            {line.gita.map((g) => (
              <GitaBridge key={`${g.c}.${g.v}`} c={g.c} v={g.v} note={locale === 'en' ? g.note : ''} locale={locale} lead={t.gitaLead} />
            ))}
          </section>
        )}

        <UpNext locale={locale} pageName={pageName} pageKey={key} placement="line-end" heading={t.next} />

        <section className="fx-sec" aria-labelledby="more">
          <h2 id="more">{t.more}</h2>
          <ul className="fx-links">
            {relatedLines(line, locale).map((l) => (
              <li key={l.slug}>
                <a href={locale === 'hi' ? hiPath(l.slug) : enPath(l.slug)} data-mp-location={`related_${l.slug}`}>
                  <strong>{locale === 'hi' && l.hi ? l.hi.h1 : l.h1}</strong>
                  <span>{l.ref}</span>
                </a>
              </li>
            ))}
            {locale === 'hi' && (
              <li>
                <a href={enPath(slug)} hrefLang="en" data-mp-location="related_english">
                  <strong>English: {line.h1}</strong>
                  <span>{line.ref}</span>
                </a>
              </li>
            )}
            <li>
              <a href="/upanishads/who-am-i" data-mp-location="related_plan">
                <strong>{t.plan.label}</strong>
                <span>{t.plan.sub}</span>
              </a>
            </li>
            <li>
              <a href={locale === 'hi' ? '/hi/upanishad' : '/upanishads'} data-mp-location="related_hub">
                <strong>{t.hub.label}</strong>
                <span>{t.hub.sub}</span>
              </a>
            </li>
          </ul>
        </section>

        <Faq items={faq} heading={t.faq} />

        <SourcesNote heading={t.sources}>
          {locale === 'hi' ? (
            <p>
              संस्कृत पाठ Wisdom के संग्रह से है, जिसे sanskritdocuments.org के संस्करण से मिलाया गया है। हिंदी और अंग्रेज़ी अर्थ Wisdom का अपना है, शंकराचार्य के भाष्य के आधार पर। अभी इसकी मानवीय समीक्षा चल रही है।
            </p>
          ) : (
            <>
              <p>
                {line.ref}, {line.veda}. Sanskrit {p.basis.startsWith('sanscripts corpus') ? 'from the Wisdom corpus, read against the sanskritdocuments.org edition' : `from ${p.basis}`}
                {p.kb.length > 0 ? ` (KB ${p.kb.join(', ')})` : ''}. {p.note ?? ''}
              </p>
              <p>
                The English is Wisdom&apos;s own, drafted from the Sanskrit with Shankara&apos;s commentary (S. Sitarama Sastri&apos;s public-domain English) and
                checked against Swami Paramananda (1919) for tone. {DISCLOSURE_EN}
              </p>
            </>
          )}
        </SourcesNote>
      </article>
    </Shell>
  )
}
