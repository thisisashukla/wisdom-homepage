import BlogTracker from '@/components/BlogTracker'
import Nav from '@/components/Nav'
import SiteFooter from '@/components/SiteFooter'
import HeroPlanCTA from '@/components/funnel/HeroPlanCTA'
import VerseAudioPlayer from '@/components/gita/VerseAudioPlayer'
import SanskritText from '@/components/gita/SanskritText'
import ThemePlanClient from '@/components/plan/ThemePlanClient'
import { getVerse, getVerseAudio, verseUrl } from '@/lib/gita'
import { gitaForBySlug } from '@/lib/gitaFor'
import { appStoreUrl } from '@/lib/app'
import { PHASE_LABEL, THEME_PLANS, THEME_PLANS_PUBLISHED, THEME_READING, planGroupOf, planMinutesTotal, planSources, type ThemePlan } from '@/lib/themePlans'
import { themeHero, type ThemeVariant } from '@/lib/themeAssets'
import '../../home.css'
import '../../home-v3.css'
import '../gita-for.css'
import '../theme-plan.css'

const BASE = 'https://wisdomquotes.in'
const words = (s?: string | null) => (s ? s.trim().split(/\s+/).length : 0)

// Hides unrevealed days only once JS is confirmed; if the bundle never arrives, everything shows after 4 s.
const REVEAL_BOOT = `(function(){try{var r=document.currentScript.parentElement;if(window.matchMedia&&window.matchMedia('(prefers-reduced-motion: reduce)').matches)return;if(!('IntersectionObserver' in window))return;r.classList.add('tp-js');setTimeout(function(){if(!r.dataset.ready)r.classList.remove('tp-js')},4000)}catch(e){}})();`

export default async function ThemePlanPage({ plan, variant }: { plan: ThemePlan; variant: ThemeVariant }) {
  const url = `${BASE}/gita-for/${plan.slug}`
  const hero = themeHero(plan, variant)
  const legacy = gitaForBySlug(plan.slug)

  const days = await Promise.all(
    plan.days.map(async (d) => {
      const r = d.ref ?? d.anchor
      const verse = r ? await getVerse(r[0], r[1]) : null
      const audio = d.ref ? getVerseAudio(d.ref[0], d.ref[1]) : null
      return { d, r, verse, audio }
    }),
  )
  const used = new Set(days.filter((x) => x.r).map((x) => `${x.r![0]}.${x.r![1]}`))
  const more = (legacy?.verses ?? []).filter((v) => !used.has(`${v.chapter}.${v.verse}`))
  // Same group first (a busy mind, hard times, good days…), then the rest; six cards.
  const group = planGroupOf(plan.slug)
  const others = THEME_PLANS.filter((p) => p.slug !== plan.slug)
  const related = [...others.filter((p) => planGroupOf(p.slug) === group), ...others.filter((p) => planGroupOf(p.slug) !== group)].slice(0, 6)
  const reading = THEME_READING[plan.slug] ?? []
  const pageName = `Theme Plan ${plan.label}`

  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Article',
        '@id': `${url}#article`,
        headline: plan.h1,
        description: plan.description,
        image: [`${BASE}${hero.og}`, `${BASE}${hero.desktop}`],
        inLanguage: 'en',
        datePublished: THEME_PLANS_PUBLISHED,
        dateModified: THEME_PLANS_PUBLISHED,
        author: { '@type': 'Person', name: 'Ankur Shukla', url: `${BASE}/about` },
        publisher: { '@type': 'Organization', name: 'Wisdom', logo: { '@type': 'ImageObject', url: `${BASE}/assets/new-light-logo.webp` } },
        mainEntityOfPage: url,
        keywords: plan.keywords.join(', '),
        about: [
          { '@type': 'Book', name: 'Bhagavad Gita', sameAs: ['https://en.wikipedia.org/wiki/Bhagavad_Gita', 'https://www.wikidata.org/wiki/Q48268'] },
          { '@type': 'Thing', name: plan.label },
        ],
        mentions: days
          .filter((x) => x.r && x.verse)
          .map(({ r }) => ({ '@type': 'CreativeWork', name: `Bhagavad Gita ${r![0]}.${r![1]}`, url: `${BASE}${verseUrl(r![0], r![1])}` })),
        isPartOf: { '@type': 'CollectionPage', name: 'Bhagavad Gita reading plans', url: `${BASE}/reading-plans` },
        speakable: { '@type': 'SpeakableSpecification', cssSelector: ['.tp-h1', '.tp-intro', '.tp-line'] },
        isAccessibleForFree: true,
        timeRequired: `PT${planMinutesTotal(plan)}M`,
      },
      {
        '@type': 'ItemList',
        name: `${plan.label}: 7 verses from the Bhagavad Gita and beyond`,
        numberOfItems: 7,
        itemListOrder: 'https://schema.org/ItemListOrderAscending',
        itemListElement: days.map(({ d, r }) => ({
          '@type': 'ListItem',
          position: d.day,
          name: `Verse ${d.day}: ${d.heading} (${r && d.ref ? `Bhagavad Gita ${r[0]}.${r[1]}` : d.verse?.ref ?? d.story?.source})`,
          url: `${url}#verse-${d.day}`,
        })),
      },
      {
        '@type': 'FAQPage',
        mainEntity: plan.faq.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a } })),
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'Reading plans', item: `${BASE}/reading-plans` },
          { '@type': 'ListItem', position: 3, name: plan.label, item: url },
        ],
      },
    ],
  }

  const clientDays = days.map(({ d, r, verse }) => ({
    day: d.day,
    phase: d.phase,
    ref: r ? `${r[0]}.${r[1]}` : null,
    words: words(d.line) + words(d.verse?.line) + words(verse?.englishTranslation) + words(d.forYou) + words(d.today) + words(d.story?.body) + words(d.story?.lesson),
  }))

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <Nav pageName={pageName} />

      <article className={`tp tp-${plan.slug}`} data-theme={plan.slug} data-variant={variant} suppressHydrationWarning>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_BOOT }} />

        {/* ── Hero ── */}
        <header className="tp-hero">
          <picture className="tp-hero-art">
            <source media="(max-width: 700px)" srcSet={hero.mobile} />
            <img src={hero.desktop} alt={hero.alt} width={1920} height={1080} decoding="async" fetchPriority="high" />
          </picture>
          <div className="tp-hero-shade" aria-hidden="true" />
          <div className="wrap tp-hero-inner">
            <nav className="gf-crumbs tp-crumbs" aria-label="Breadcrumb">
              <a href="/">Home</a> / <a href="/reading-plans">Reading plans</a> / <span>{plan.label}</span>
            </nav>
            <div className="tp-eyebrow">7-verse reading plan</div>
            <h1 className="tp-h1">{plan.h1}</h1>
            <p className="tp-sub">{plan.subtitle}</p>
            <ul className="tp-facts" aria-label="About this plan">
              <li>7 verses</li>
              <li>{planSources(plan)}</li>
              <li>About {planMinutesTotal(plan)} min to read</li>
              <li>Sanskrit, English, audio</li>
            </ul>
            <div className="tp-hero-actions">
              <a href="#verse-1" className="btn-read-gita btn-read-gita-primary tp-start" data-mp-location={`theme_${plan.slug}_start`} data-mp-event="Theme CTA Clicked" data-mp-props={JSON.stringify({ theme: plan.slug, cta: 'start_verse_1' })}>
                Read the first verse
              </a>
              <a href="#verse-1" className="tp-continue" hidden data-mp-location={`theme_${plan.slug}_continue`}>
                <span>Pick up where you left off</span> →
              </a>
            </div>
          </div>
        </header>

        {/* ── Intro and the week at a glance ── */}
        <section className="section tp-introsec">
          <div className="wrap tp-col">
            <p className="tp-intro">{plan.intro}</p>
            <h2 className="tp-h2">The seven verses</h2>
            <ol className="tp-strip">
              {plan.days.map((d) => (
                <li key={d.day}>
                  <a href={`#verse-${d.day}`} className="tp-strip-item" data-day={d.day} data-mp-location={`theme_${plan.slug}_strip_${d.day}`} data-mp-event="Theme Strip Clicked" data-mp-props={JSON.stringify({ theme: plan.slug, verse: d.day })}>
                    <span className="tp-strip-n">Verse {d.day}</span>
                    <span className="tp-strip-phase">{PHASE_LABEL[d.phase]}</span>
                    <span className="tp-strip-head">{d.heading}</span>
                    <span className="tp-strip-ref">{d.ref ? `Gita ${d.ref[0]}.${d.ref[1]}` : (d.verse?.ref ?? d.story?.source ?? '').split(',')[0]}</span>
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ── The week ── */}
        <section className="section tp-weeksec" aria-label="The seven verses">
          <div className="wrap tp-col tp-week">
            <div className="tp-thread" aria-hidden="true"><div className="tp-thread-fill" /></div>

            {days.map(({ d, r, verse, audio }) => {
              const isStory = d.phase === 'story'
              return (
                <section key={d.day} id={`verse-${d.day}`} className={`tp-day tp-day-${d.phase}`} data-day={d.day} aria-labelledby={`verse-${d.day}-h`}>
                  <div className="tp-node" data-day={d.day} aria-hidden="true">{d.day}</div>
                  <div className="tp-card">
                    <div className="tp-seal" aria-hidden="true">
                      <span className="tp-seal-day">Verse {d.day}</span>
                      <span className="tp-seal-phase">{PHASE_LABEL[d.phase]}</span>
                    </div>
                    <div className="tp-day-inner">
                      <div className="tp-day-eyebrow">Verse {d.day} · {PHASE_LABEL[d.phase]}</div>
                      <h2 className="tp-day-h" id={`verse-${d.day}-h`}>{d.heading}</h2>

                      {d.ref && r && verse && (
                        <div className="tp-verse">
                          {audio ? (
                            <VerseAudioPlayer audioSrc={audio.audio} timestamps={audio.timestamps} text={verse.sanskrit} chapter={r[0]} verse={r[1]} />
                          ) : (
                            <SanskritText text={verse.sanskrit} className="verse-audio-words" />
                          )}
                          <p className="tp-line">{d.line}</p>
                          <p className="tp-ref">
                            <a href={verseUrl(r[0], r[1])} data-mp-location={`theme_${plan.slug}_verse_${r[0]}_${r[1]}`} data-mp-event="Theme Verse Page Opened" data-mp-props={JSON.stringify({ theme: plan.slug, verse: d.day, ref: `${r[0]}.${r[1]}` })}>Bhagavad Gita {r[0]}.{r[1]}</a>
                            {verse.speaker ? <span> · {verse.speaker}</span> : null}
                          </p>
                          <details className="tp-tr" data-track="translation">
                            <summary>Full translation</summary>
                            <p>{verse.englishTranslation}</p>
                            {verse.hindiTranslation && <p className="tp-hi" lang="hi">{verse.hindiTranslation}</p>}
                          </details>
                        </div>
                      )}

                      {!d.ref && d.verse && (
                        <div className="tp-verse">
                          <SanskritText text={d.verse.sanskrit} className="verse-audio-words" />
                          <p className="tp-line">{d.verse.line}</p>
                          <p className="tp-ref">{d.verse.ref}</p>
                        </div>
                      )}

                      {isStory && d.story && (
                        <div className="tp-story">
                          {!d.verse && <div className="tp-story-src">{d.story.source}</div>}
                          <h3 className="tp-story-title">{d.story.title}</h3>
                          <p className="tp-story-body">{d.story.body}</p>
                          <blockquote className="tp-story-lesson">{d.story.lesson}</blockquote>
                          {!d.ref && r && verse && (
                            <p className="tp-ref">
                              Read with <a href={verseUrl(r[0], r[1])} data-mp-location={`theme_${plan.slug}_verse_${r[0]}_${r[1]}`}>Bhagavad Gita {r[0]}.{r[1]}</a>
                            </p>
                          )}
                        </div>
                      )}

                      <div className="tp-for">
                        <h3 className="tp-label">What it means for you</h3>
                        <p>{d.forYou}</p>
                      </div>
                      <div className="tp-today">
                        <h3 className="tp-label">Try this</h3>
                        <p>{d.today}</p>
                      </div>
                      {d.note && <p className="tp-note">{d.note}</p>}
                    </div>
                  </div>
                </section>
              )
            })}

            <div className="tp-done" data-mp-section={`theme_${plan.slug}_done`}>
              <div className="tp-done-seal" aria-hidden="true">✦</div>
              <h2 className="tp-h2">That&apos;s all seven.</h2>
              <p>
                Come back to the one that stayed with you. Or let Wisdom pick seven verses for your own situation, with the Sanskrit
                read aloud.
              </p>
            </div>
          </div>
        </section>

        {/* ── Next step ── */}
        <section className="section section-alt" id="find">
          <div className="wrap tp-col gf-widget">
            <div className="eyebrow">Your situation is your own</div>
            <h2 className="heading">Seven verses picked for <em>your</em> {plan.label.toLowerCase()}.</h2>
            <p className="subtext">
              Everyone gets the same seven on this page. Tell Wisdom what you&apos;re facing in a sentence or two, and it picks verses for you.
            </p>
            <div id="your-verse">
              <HeroPlanCTA campaign={`web_theme_${plan.slug}`} location={`theme_${plan.slug}_create_plan`} pageName={pageName} situation={legacy?.situation} />
            </div>
            <p className="gf-app">
              On iPhone, Wisdom gives you one verse each morning, read aloud.{' '}
              <a href={appStoreUrl(`web_theme_${plan.slug.replace(/-/g, '_')}`)} target="_blank" rel="noopener" data-mp-location={`theme_${plan.slug}_app`} data-mp-event="Theme CTA Clicked" data-mp-props={JSON.stringify({ theme: plan.slug, cta: 'app_store' })}>
                Get the app →
              </a>
            </p>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section className="section">
          <div className="wrap tp-col">
            <h2 className="tp-h2">Common questions</h2>
            <div className="tp-faq">
              {plan.faq.map((f) => (
                <details key={f.q} className="tp-faq-item" data-track="faq" data-q={f.q}>
                  <summary>{f.q}</summary>
                  <p>{f.a}</p>
                </details>
              ))}
              <details className="tp-faq-item" data-track="faq" data-q="One verse a day or all seven at once?">
                <summary>Should I read one verse a day or all seven at once?</summary>
                <p>
                  Either works. All seven take about {planMinutesTotal(plan)} minutes. One a day gives each verse time to settle, and the
                  page remembers where you stopped.
                </p>
              </details>
            </div>

            {more.length > 0 && (
              <>
                <h2 className="tp-h2 tp-more-h">More Gita verses on {plan.label.toLowerCase()}</h2>
                <ul className="tp-more">
                  {more.map((v) => (
                    <li key={`${v.chapter}.${v.verse}`}>
                      <a href={verseUrl(v.chapter, v.verse)} data-mp-location={`theme_${plan.slug}_more_${v.chapter}_${v.verse}`}>Bhagavad Gita {v.chapter}.{v.verse}</a>
                      <span>{v.why}</span>
                    </li>
                  ))}
                </ul>
              </>
            )}

            {reading.length > 0 && (
              <>
                <h2 className="tp-h2 tp-more-h">Read further</h2>
                <ul className="tp-more">
                  {reading.map((l) => (
                    <li key={l.href}><a href={l.href} data-mp-location={`theme_${plan.slug}_read_${l.href.split('/').pop()}`} data-mp-event="Theme Further Reading Clicked" data-mp-props={JSON.stringify({ theme: plan.slug, to: l.href })}>{l.label}</a></li>
                  ))}
                  <li><a href="/read-gita-in-18-days" data-mp-location={`theme_${plan.slug}_read_18_days`}>Read the whole Gita in 18 days</a></li>
                </ul>
              </>
            )}

            {plan.crisis && (
              <aside className="tp-crisis" aria-label="If you need help now">
                <strong>If you&apos;re thinking about harming yourself, please reach out now.</strong> US and Canada: call or text 988. UK and Ireland:
                Samaritans, 116 123. India: Tele-MANAS, 14416. Australia: Lifeline, 13 11 14. You deserve support from a person.
              </aside>
            )}
          </div>
        </section>

        {/* ── Other plans ── */}
        <section className="section section-alt">
          <div className="wrap">
            <div className="tp-related-head">
              <h2 className="tp-h2">More 7-verse plans</h2>
              <a href="/reading-plans" data-mp-location={`theme_${plan.slug}_all_plans`}>All reading plans →</a>
            </div>
            <div className="tp-related">
              {related.map((p) => {
                const h = themeHero(p, variant)
                return (
                  <a key={p.slug} href={`/gita-for/${p.slug}`} className="tp-rel" data-mp-location={`theme_${plan.slug}_related_${p.slug}`} data-mp-event="Theme Related Clicked" data-mp-props={JSON.stringify({ theme: plan.slug, to: p.slug })}>
                    <img src={h.tile} alt="" loading="lazy" decoding="async" width={800} height={450} />
                    <span className="tp-rel-label">{p.label}</span>
                    <span className="tp-rel-sub">7 verses · {planMinutesTotal(p)} min →</span>
                  </a>
                )
              })}
            </div>
          </div>
        </section>

        {/* ── Sticky progress ── */}
        <div className="tp-pill" role="status" aria-live="polite">
          <span className="tp-pill-dots" aria-hidden="true">
            {plan.days.map((d) => (
              <a key={d.day} href={`#verse-${d.day}`} className="tp-pill-dot" data-day={d.day} tabIndex={-1} />
            ))}
          </span>
          <span className="tp-pill-text">0 of 7 verses read</span>
        </div>
      </article>

      <SiteFooter />
      <BlogTracker pageName={pageName} />
      <ThemePlanClient slug={plan.slug} variant={variant} days={clientDays} />
    </>
  )
}
