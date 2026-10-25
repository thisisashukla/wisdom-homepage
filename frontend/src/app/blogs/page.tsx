import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import { appStoreUrl } from '@/lib/app'


import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Blog \u2014 Bhagavad Gita, Sanskrit Shlokas &amp; Hindu Philosophy",
  description: "Deep readings of the Bhagavad Gita \u2014 chapter by chapter, shloka by shloka. Sanskrit text, IAST, meaning, and modern relevance. Written for the intellectually curious.",
  keywords: "",
  openGraph: {
    title: "Blog \u2014 Bhagavad Gita &amp; Hindu Philosophy | Wisdom",
    description: "Deep readings of the Bhagavad Gita \u2014 chapter by chapter. Sanskrit, meaning, and modern relevance.",
    type: 'website',
    url: "https://wisdomquotes.in/blogs/",
    siteName: 'Wisdom',
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/" },
}

const pageCSS = `

      :root {
        --maroon: #3d0c0c;
        --maroon-mid: #5c1a1a;
        --maroon-deep: #1a0606;
        --gold: #c8881e;
        --gold-light: #f5c96a;
        --gold-pale: #fdf3dc;
        --gold-dim: rgba(200, 136, 30, 0.15);
        --text: #f5e8cc;
        --text-dim: rgba(245, 232, 204, 0.65);
        --text-dimmer: rgba(245, 232, 204, 0.35);
        --muted-2: rgba(245, 232, 204, 0.35);
        --border: rgba(200, 136, 30, 0.2);
        --bg: #120505;
        --bg-warm: #190707;
        --bg-alt: #0f0404;
        --bg-card: rgba(255, 255, 255, 0.04);
      }

      *,
      *::before,
      *::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }
      html {
        scroll-behavior: smooth;
      }

      body {
        font-family:
          "Inter",
          -apple-system,
          sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.65;
        -webkit-font-smoothing: antialiased;
      }

      /* HERO */
      .blog-hero {
        background: var(--bg-warm);
        padding: 60px 32px 52px;
        position: relative;
        overflow: hidden;
      }
      .blog-hero::before {
        content: "Blog";
        position: absolute;
        right: -10px;
        bottom: -20px;
        font-family: "Playfair Display", serif;
        font-size: 220px;
        color: rgba(255, 255, 255, 0.02);
        line-height: 1;
        pointer-events: none;
        user-select: none;
      }
      .blog-hero-inner {
        max-width: 1100px;
        margin: 0 auto;
        position: relative;
        z-index: 2;
      }
      .blog-hero-label {
        font-size: 11px;
        letter-spacing: 0.22em;
        text-transform: uppercase;
        color: var(--gold-light);
        font-weight: 600;
        margin-bottom: 14px;
      }
      .blog-hero h1 {
        font-family: "Playfair Display", serif;
        font-size: clamp(28px, 4vw, 46px);
        font-weight: 700;
        color: var(--gold-light);
        line-height: 1.18;
        margin-bottom: 12px;
      }
      .blog-hero h1 em {
        font-style: italic;
        color: #fff;
      }
      .blog-hero p {
        font-size: 16px;
        color: var(--text-dim);
        max-width: 520px;
        line-height: 1.65;
        font-weight: 300;
      }

      /* LAYOUT */
      .blog-wrap {
        max-width: 1100px;
        margin: 0 auto;
        padding: 56px 32px 100px;
      }

      /* SECTION HEADER */
      .section-head {
        display: flex;
        align-items: baseline;
        gap: 16px;
        margin-bottom: 32px;
        padding-bottom: 16px;
        border-bottom: 1px solid var(--border);
      }
      .section-head h2 {
        font-family: "Playfair Display", serif;
        font-size: 22px;
        font-weight: 600;
        color: var(--gold-light);
      }
      .section-head h2 em {
        font-style: italic;
        color: var(--gold-light);
      }
      .section-count {
        font-size: 11px;
        letter-spacing: 0.1em;
        color: var(--muted-2);
        text-transform: uppercase;
        font-weight: 500;
      }

      /* ARTICLE CARDS */
      .articles-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
        gap: 24px;
        margin-bottom: 64px;
      }

      .article-card {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 14px;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        text-decoration: none;
        transition:
          border-color 0.15s,
          transform 0.15s,
          box-shadow 0.15s;
      }
      .article-card:hover {
        border-color: rgba(200, 136, 30, 0.45);
        transform: translateY(-3px);
        box-shadow: 0 8px 32px rgba(200, 136, 30, 0.09);
      }

      .card-thumb {
        background: var(--bg-alt);
        padding: 28px 28px 20px;
        position: relative;
        overflow: hidden;
        height: 160px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .card-thumb::before {
        position: absolute;
        right: 12px;
        bottom: -18px;
        font-family: "Playfair Display", Georgia, serif;
        font-size: 130px;
        color: rgba(255, 255, 255, 0.11);
        line-height: 1;
        pointer-events: none;
        user-select: none;
        font-weight: 700;
      }
      .card-thumb-ch1::before  { content: "1"; }
      .card-thumb-ch2::before  { content: "2"; }
      .card-thumb-ch3::before  { content: "3"; }
      .card-thumb-ch4::before  { content: "4"; }
      .card-thumb-ch5::before  { content: "5"; }
      .card-thumb-ch6::before  { content: "6"; }
      .card-thumb-ch7::before  { content: "7"; }
      .card-thumb-ch8::before  { content: "8"; }
      .card-thumb-ch9::before  { content: "9"; }
      .card-thumb-ch10::before { content: "10"; font-size: 110px; }
      .card-thumb-ch11::before { content: "11"; font-size: 110px; }
      .card-thumb-ch12::before { content: "12"; font-size: 110px; }
      .card-thumb-ch13::before { content: "13"; font-size: 110px; }
      .card-thumb-ch14::before { content: "14"; font-size: 110px; }
      .card-thumb-ch15::before { content: "15"; font-size: 110px; }
      .card-thumb-ch16::before { content: "16"; font-size: 110px; }
      .card-thumb-ch17::before { content: "17"; font-size: 110px; }
      .card-thumb-ch18::before { content: "18"; font-size: 110px; }
      .card-thumb-shlok::before    { content: "ॐ"; font-family: "Noto Sans Devanagari", serif; font-size: 130px; }
      .card-thumb-karma::before    { content: "क"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-gita::before     { content: "ग"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-peace::before    { content: "शं"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-begin::before    { content: "आ"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-arc::before      { content: "१८"; font-family: "Noto Sans Devanagari", serif; font-size: 110px; }
      .card-thumb-3paths::before   { content: "३"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-247::before      { content: "२"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-sthita::before   { content: "स्"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-nishkama::before { content: "नि"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-anxiety2::before { content: "मन"; font-family: "Noto Sans Devanagari", serif; font-size: 110px; }
      .card-thumb-death::before    { content: "आ"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-dharma::before   { content: "ध"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-ahankara::before { content: "अहं"; font-family: "Noto Sans Devanagari", serif; font-size: 110px; }
      .card-thumb-maya::before     { content: "माया"; font-family: "Noto Sans Devanagari", serif; font-size: 100px; }
      .card-thumb-gunas::before    { content: "गु"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-students::before { content: "अ"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-stoic::before    { content: "तु"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-gitagpt::before  { content: "AI"; font-family: "Playfair Display", serif; font-size: 110px; font-weight: 900; }
      .card-thumb-saar::before     { content: "सार"; font-family: "Noto Sans Devanagari", serif; font-size: 110px; }
      .card-thumb-krishna::before  { content: "कृ"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-shlokas20::before{ content: "२०"; font-family: "Noto Sans Devanagari", serif; font-size: 120px; }
      .card-thumb-gayatri::before  { content: "गा"; font-family: "Noto Sans Devanagari", serif; }
      .card-thumb-mahamantra::before { content: "हरे"; font-family: "Noto Sans Devanagari", serif; font-size: 110px; }
      .card-thumb-gitasanskrit::before { content: "३०"; font-family: "Noto Sans Devanagari", serif; font-size: 120px; }
      .card-thumb-whichgita::before { content: "अनुवाद"; font-family: "Noto Sans Devanagari", serif; font-size: 72px; }
      .card-thumb-atman::before    { content: "आत्मन्"; font-family: "Noto Sans Devanagari", serif; font-size: 72px; }

      /* ── CARD THUMB COLOR GROUPS ── */

      /* Group A: Karma / Action — warm copper-amber */
      .card-thumb-ch1, .card-thumb-ch2, .card-thumb-ch3,
      .card-thumb-ch4, .card-thumb-ch5, .card-thumb-ch6,
      .card-thumb-karma, .card-thumb-247, .card-thumb-nishkama,
      .card-thumb-students {
        background: linear-gradient(135deg, rgba(180, 75, 15, 0.18) 0%, var(--bg-alt) 65%);
        border-top: 2px solid rgba(210, 105, 30, 0.75);
      }

      /* Group B: Bhakti / Devotion — warm yellow-gold */
      .card-thumb-ch7, .card-thumb-ch8, .card-thumb-ch9,
      .card-thumb-ch10, .card-thumb-ch11, .card-thumb-ch12,
      .card-thumb-3paths, .card-thumb-arc, .card-thumb-begin,
      .card-thumb-shlok, .card-thumb-gita,
      .card-thumb-krishna, .card-thumb-mahamantra, .card-thumb-gayatri {
        background: linear-gradient(135deg, rgba(180, 145, 10, 0.16) 0%, var(--bg-alt) 65%);
        border-top: 2px solid rgba(210, 168, 20, 0.75);
      }

      /* Group C: Jnana / Knowledge — soft violet */
      .card-thumb-ch13, .card-thumb-ch14, .card-thumb-ch15,
      .card-thumb-ch16, .card-thumb-ch17, .card-thumb-ch18,
      .card-thumb-sthita, .card-thumb-dharma, .card-thumb-gunas,
      .card-thumb-death, .card-thumb-saar,
      .card-thumb-shlokas20, .card-thumb-gitasanskrit,
      .card-thumb-ahankara, .card-thumb-maya, .card-thumb-whichgita, .card-thumb-atman {
        background: linear-gradient(135deg, rgba(100, 70, 190, 0.13) 0%, var(--bg-alt) 65%);
        border-top: 2px solid rgba(150, 110, 220, 0.70);
      }

      /* Group D: Peace / Mental health — teal */
      .card-thumb-peace, .card-thumb-anxiety2 {
        background: linear-gradient(135deg, rgba(15, 145, 130, 0.14) 0%, var(--bg-alt) 65%);
        border-top: 2px solid rgba(25, 190, 170, 0.70);
      }

      /* Group E: Comparative / Crossover — cool steel-blue */
      .card-thumb-gitagpt {
        background: linear-gradient(135deg, rgba(196, 74, 74, 0.13) 0%, var(--bg-alt) 65%);
        border-top: 2px solid rgba(220, 120, 90, 0.65);
      }

      .card-thumb-stoic {
        background: linear-gradient(135deg, rgba(55, 100, 190, 0.13) 0%, var(--bg-alt) 65%);
        border-top: 2px solid rgba(80, 140, 220, 0.70);
      }

      .card-chapter-badge {
        font-size: 11px;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        font-weight: 600;
        color: var(--gold-light);
        margin-bottom: 8px;
      }
      .card-thumb-title {
        font-family: "Playfair Display", serif;
        font-size: 16px;
        font-weight: 600;
        color: var(--gold-light);
        line-height: 1.3;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .card-thumb-title em {
        font-style: italic;
        color: #fff;
      }

      .card-body {
        padding: 20px 24px 24px;
        flex: 1;
        display: flex;
        flex-direction: column;
      }
      .card-desc {
        font-size: 14px;
        line-height: 1.65;
        color: var(--text-dim);
        flex: 1;
        margin-bottom: 16px;
      }
      .card-meta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 11.5px;
        color: var(--text-dimmer);
        padding-top: 14px;
        border-top: 1px solid var(--border);
      }
      .card-read-time {
        font-weight: 500;
      }
      .card-arrow {
        font-size: 13px;
        color: var(--gold);
        font-weight: 600;
      }

      /* TAGS */
      .card-tags {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
        margin-bottom: 14px;
      }
      .tag {
        font-size: 11px;
        font-weight: 500;
        padding: 3px 9px;
        border-radius: 4px;
        letter-spacing: 0.06em;
      }
      .tag-chapter {
        background: rgba(200, 136, 30, 0.12);
        color: var(--gold-light);
      }
      .tag-shloka {
        background: rgba(200, 136, 30, 0.1);
        color: var(--gold-light);
      }
      .tag-sanskrit {
        background: transparent;
        color: var(--gold);
        border: 1px solid rgba(200, 136, 30, 0.30);
        font-family: "Noto Sans Devanagari", serif;
        font-size: 12px;
        letter-spacing: 0.01em;
        padding: 2px 9px;
      }
      .tag-philosophy {
        background: rgba(255, 255, 255, 0.08);
        color: var(--text);
      }

      /* COMING SOON SECTION */
      .coming-section {
        margin-top: 60px;
      }
      .coming-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
        gap: 14px;
      }
      .coming-card {
        background: var(--bg-card);
        border: 1px dashed var(--border);
        border-radius: 10px;
        padding: 18px 20px;
      }
      .coming-label {
        font-size: 11px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: var(--text-dimmer);
        font-weight: 600;
        margin-bottom: 6px;
      }
      .coming-title {
        font-size: 13.5px;
        font-weight: 600;
        color: var(--text-dim);
        line-height: 1.4;
      }
      .coming-soon-badge {
        display: inline-block;
        margin-top: 8px;
        font-size: 11px;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        background: rgba(200, 136, 30, 0.1);
        color: var(--gold-light);
        padding: 2px 8px;
        border-radius: 3px;
        font-weight: 500;
      }

      /* APP BANNER */
      .app-banner {
        background: var(--bg-card);
        border: 1px solid var(--border);
        border-radius: 14px;
        padding: 32px 36px;
        margin-bottom: 60px;
        display: grid;
        grid-template-columns: 1fr auto;
        gap: 24px;
        align-items: center;
      }
      @media (max-width: 580px) {
        .app-banner {
          grid-template-columns: 1fr;
        }
      }
      .app-banner h3 {
        font-family: "Playfair Display", serif;
        font-size: 18px;
        font-weight: 600;
        color: var(--gold-light);
        margin-bottom: 6px;
        line-height: 1.3;
      }
      .app-banner p {
        font-size: 13.5px;
        color: var(--text-dim);
        line-height: 1.6;
      }
      .app-banner-btn {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        background: var(--gold);
        color: #1a0606;
        text-decoration: none;
        padding: 11px 20px;
        border-radius: 8px;
        font-size: 13.5px;
        font-weight: 700;
        white-space: nowrap;
        transition: opacity 0.15s;
      }
      .app-banner-btn:hover {
        opacity: 0.88;
      }

      /* FOOTER */
      footer {
        background: var(--bg-alt);
        border-top: 1px solid var(--border);
        padding: 32px 40px;
        text-align: center;
        font-size: 12px;
        letter-spacing: 0.06em;
        color: var(--text-dimmer);
      }
      footer a {
        color: var(--text-dimmer);
        text-decoration: none;
      }
      footer a:hover {
        color: var(--gold-light);
      }
      footer span {
        color: var(--gold);
      }

      @media (max-width: 700px) {
        .blog-hero {
          padding: 44px 20px 40px;
        }
        .blog-wrap {
          padding: 40px 20px 60px;
        }
      }
    
`

const schemas: Record<string, unknown>[] = []

export default function BlogIndexPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

    <div className="blog-hero">
      <div className="blog-hero-inner">
        <div className="blog-hero-label">Wisdom · Reading the Bhagavad Gita</div>
        <h1 className="blog-index-h1">The Bhagavad Gita,<br /><em>read closely</em></h1>
        <p>
          All 18 chapters. Chapter by chapter, shloka by shloka. Sanskrit, IAST,
          Hindi, and what each verse says, including the parts most summaries
          skip.
        </p>
      </div>
    </div>

    <div className="blog-wrap">
      {/* APP BANNER */}
      <div className="app-banner">
        <div>
          <h3>A verse a day for what you&apos;re going through.</h3>
          <p>
            Tell Wisdom what&apos;s going on and it gives you one verse a day for
            seven days, read aloud, with the Sanskrit. Week 1 is free on iPhone.
          </p>
        </div>
        <a
          href={appStoreUrl('web_blog_footer')}
          target="_blank"
          rel="noopener"
          className="app-banner-btn"
          data-mp-location="app_banner"
          >Get it on the App Store →</a
        >
      </div>

      {/* CHAPTER STUDIES */}
      <div className="section-head">
        <h2>Bhagavad Gita, <em>Chapter Studies</em></h2>
        <span className="section-count">All 18 chapters published</span>
      </div>

      <div className="articles-grid">
        {/* Chapter 1 */}
        <a href="/blogs/bhagwat-geeta-chapter-1" className="article-card" data-mp-article="Bhagavad Gita Chapter 1">
          <div className="card-thumb card-thumb-ch1">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 1 · 47 Verses</div>
            <div className="card-thumb-title">Arjuna Vishada Yoga —<br /><em>When the Warrior Sat Down</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 1</span>
              <span className="tag tag-shloka">47 Shlokas</span>
              <span className="tag tag-philosophy">Grief & Dharma</span>
            </div>
            <div className="card-desc">
              Arjuna looks at the two armies, sees his teachers and cousins, and puts down his bow. All 47 verses with Sanskrit, IAST and notes.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~16 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 2 */}
        <a href="/blogs/bhagwat-geeta-chapter-2" className="article-card" data-mp-article="Bhagavad Gita Chapter 2">
          <div className="card-thumb card-thumb-ch2">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 2 · 72 Verses</div>
            <div className="card-thumb-title">Sankhya Yoga —<br /><em>Krishna&apos;s First Answer</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 2</span>
              <span className="tag tag-shloka">72 Shlokas</span>
              <span className="tag tag-philosophy">Soul & Duty</span>
            </div>
            <div className="card-desc">
              Krishna&apos;s first answer: the atman that does not die (2.20), 2.47 on action and its fruit, the slide from dwelling on something to ruin (2.62–63), and the person of steady wisdom (2.55–72).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~18 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 3 */}
        <a href="/blogs/bhagwat-geeta-chapter-3" className="article-card" data-mp-article="Bhagavad Gita Chapter 3">
          <div className="card-thumb card-thumb-ch3">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 3 · 43 Verses</div>
            <div className="card-thumb-title">Karma Yoga —<br /><em>Why No One Can Stop Acting</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 3</span>
              <span className="tag tag-shloka">43 Shlokas</span>
              <span className="tag tag-philosophy">Action & Dharma</span>
            </div>
            <div className="card-desc">
              Why no one can stop acting (3.5), how work becomes an offering (yajña), the example you set for others (lokasaṅgraha), your own dharma over another&apos;s (3.35), and desire as the enemy (3.37).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~14 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 4 */}
        <a href="/blogs/bhagwat-geeta-chapter-4" className="article-card" data-mp-article="Bhagavad Gita Chapter 4">
          <div className="card-thumb card-thumb-ch4">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 4 · 42 Verses</div>
            <div className="card-thumb-title">Jnana Yoga —<br /><em>The Fire That Burns Karma</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 4</span>
              <span className="tag tag-shloka">42 Shlokas</span>
              <span className="tag tag-philosophy">Knowledge & Karma</span>
            </div>
            <div className="card-desc">
              Yada yada hi dharmasya (4.7–8), knowledge as the highest offering (4.33) and as a fire that burns karma to ash (4.37), and how to learn from a teacher (4.34).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~13 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 5 */}
        <a href="/blogs/bhagwat-geeta-chapter-5" className="article-card" data-mp-article="Bhagavad Gita Chapter 5">
          <div className="card-thumb card-thumb-ch5">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 5 · 29 Verses</div>
            <div className="card-thumb-title">Karma Sanyasa Yoga —<br /><em>How to Act Without Being Touched</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 5</span>
              <span className="tag tag-shloka">29 Shlokas</span>
              <span className="tag tag-philosophy">Renunciation & Peace</span>
            </div>
            <div className="card-desc">
              The lotus leaf that water doesn&apos;t wet (5.10), the sage who looks on a scholar, a cow, an elephant and a dog alike (5.18), where lasting happiness is found (5.21), and 5.29, where Krishna calls himself the friend of all beings.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 6 */}
        <a href="/blogs/bhagwat-geeta-chapter-6" className="article-card" data-mp-article="Bhagavad Gita Chapter 6">
          <div className="card-thumb card-thumb-ch6">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 6 · 47 Verses</div>
            <div className="card-thumb-title">Dhyana Yoga —<br /><em>The Lamp That Does Not Flicker</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 6</span>
              <span className="tag tag-shloka">47 Shlokas</span>
              <span className="tag tag-philosophy">Meditation</span>
            </div>
            <div className="card-desc">
              Meditation in practice: lift yourself by yourself (6.5), the lamp in a windless place (6.19), Arjuna&apos;s objection that the mind is like the wind (6.34), and Krishna&apos;s answer, practice and letting go.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~14 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 7 */}
        <a href="/blogs/bhagwat-geeta-chapter-7" className="article-card" data-mp-article="Bhagavad Gita Chapter 7">
          <div className="card-thumb card-thumb-ch7">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 7 · 30 Verses</div>
            <div className="card-thumb-title">Jnana Vijnana Yoga —<br /><em>Knowing About vs. Knowing Through</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 7</span>
              <span className="tag tag-shloka">30 Shlokas</span>
              <span className="tag tag-philosophy">Knowledge & Realization</span>
            </div>
            <div className="card-desc">
              Pearls strung on a thread (7.7), Krishna as the taste of water (7.8), the four kinds of people who turn to him (7.16), and the rare one who sees that <em>Vāsudeva is everything</em> (7.19).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 8 */}
        <a href="/blogs/bhagwat-geeta-chapter-8" className="article-card" data-mp-article="Bhagavad Gita Chapter 8">
          <div className="card-thumb card-thumb-ch8">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 8 · 28 Verses</div>
            <div className="card-thumb-title">Akshara Brahma Yoga —<br /><em>What the Mind Has Practiced</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 8</span>
              <span className="tag tag-shloka">28 Shlokas</span>
              <span className="tag tag-philosophy">Death & Imperishable</span>
            </div>
            <div className="card-desc">
              What the mind has practised shapes the end: whatever you remember at death is what you become (8.6). Also Brahma&apos;s day and night, and the path of no return.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~11 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 9 */}
        <a href="/blogs/bhagwat-geeta-chapter-9" className="article-card" data-mp-article="Bhagavad Gita Chapter 9">
          <div className="card-thumb card-thumb-ch9">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 9 · 34 Verses</div>
            <div className="card-thumb-title">Raja Vidya Raja Guhya Yoga —<br /><em>The Royal Secret</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 9</span>
              <span className="tag tag-shloka">34 Shlokas</span>
              <span className="tag tag-philosophy">Devotion & Refuge</span>
            </div>
            <div className="card-desc">
              Krishna calls this the royal knowledge and says it is easy to practise (9.2). Offer a leaf, a flower, a fruit or water (9.26), offer whatever you do (9.27), and the promise of 9.31: <em>my devotee never perishes</em>.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~13 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 10 */}
        <a href="/blogs/bhagwat-geeta-chapter-10" className="article-card" data-mp-article="Bhagavad Gita Chapter 10">
          <div className="card-thumb card-thumb-ch10">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 10 · 42 Verses</div>
            <div className="card-thumb-title">Vibhuti Yoga —<br /><em>Sparks of the Divine</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 10</span>
              <span className="tag tag-shloka">42 Shlokas</span>
              <span className="tag tag-philosophy">Divine Manifestations</span>
            </div>
            <div className="card-desc">
              Where to look for Krishna: in whatever shines (10.41). The Self in the heart of every being (10.20), the long list of &lsquo;among these, I am that&rsquo;, and the last verse: the universe rests on one fragment of him (10.42).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~13 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 11 */}
        <a href="/blogs/bhagwat-geeta-chapter-11" className="article-card" data-mp-article="Bhagavad Gita Chapter 11">
          <div className="card-thumb card-thumb-ch11">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 11 · 55 Verses</div>
            <div className="card-thumb-title">Vishwarupa Darshana Yoga —<br /><em>The Universal Form</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 11</span>
              <span className="tag tag-shloka">55 Shlokas</span>
              <span className="tag tag-philosophy">Cosmic Form</span>
            </div>
            <div className="card-desc">
              Arjuna asks to see Krishna&apos;s universal form and is shown it: a thousand suns (11.12), mouths like fire, <em>I am Time, the destroyer of worlds</em> (11.32). The chapter ends on devotion as the way to see it (11.54).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~16 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 12 */}
        <a href="/blogs/bhagwat-geeta-chapter-12" className="article-card" data-mp-article="Bhagavad Gita Chapter 12">
          <div className="card-thumb card-thumb-ch12">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 12 · 20 Verses</div>
            <div className="card-thumb-title">Bhakti Yoga —<br /><em>How a Devotee Lives</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 12</span>
              <span className="tag tag-shloka">20 Shlokas</span>
              <span className="tag tag-philosophy">Devotion</span>
            </div>
            <div className="card-desc">
              One of the two shortest chapters, 20 verses. A four-step ladder for when meditation is too hard (12.8–11), and the devotee Krishna calls dear (12.13–20).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~11 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 13 */}
        <a href="/blogs/bhagwat-geeta-chapter-13" className="article-card" data-mp-article="Bhagavad Gita Chapter 13">
          <div className="card-thumb card-thumb-ch13">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 13 · 35 Verses</div>
            <div className="card-thumb-title">Kshetra Kshetrajna —<br /><em>The Field and the Knower</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 13</span>
              <span className="tag tag-shloka">35 Shlokas</span>
              <span className="tag tag-philosophy">Self & Awareness</span>
            </div>
            <div className="card-desc">
              The field and the knower of the field: your body, moods and reactions, and the awareness that watches them (13.1–2).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~13 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 14 */}
        <a href="/blogs/bhagwat-geeta-chapter-14" className="article-card" data-mp-article="Bhagavad Gita Chapter 14">
          <div className="card-thumb card-thumb-ch14">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 14 · 27 Verses</div>
            <div className="card-thumb-title">Gunatraya Vibhaga —<br /><em>Sattva, Rajas and Tamas</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 14</span>
              <span className="tag tag-shloka">27 Shlokas</span>
              <span className="tag tag-philosophy">Three Gunas</span>
            </div>
            <div className="card-desc">
              Why some days are clear, some restless and some heavy: sattva, rajas and tamas, and the person who goes beyond all three (14.22–26).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 15 */}
        <a href="/blogs/bhagwat-geeta-chapter-15" className="article-card" data-mp-article="Bhagavad Gita Chapter 15">
          <div className="card-thumb card-thumb-ch15">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 15 · 20 Verses</div>
            <div className="card-thumb-title">Purushottama Yoga —<br /><em>Cut the Tree, Find the Source</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 15</span>
              <span className="tag tag-shloka">20 Shlokas</span>
              <span className="tag tag-philosophy">Supreme Self</span>
            </div>
            <div className="card-desc">
              An upside-down tree (15.1), the weapon of detachment that cuts it (15.3), a part of Krishna in every being (15.7), the fire that digests food (15.14), and the name Purushottama (15.18).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~11 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 16 */}
        <a href="/blogs/bhagwat-geeta-chapter-16" className="article-card" data-mp-article="Bhagavad Gita Chapter 16">
          <div className="card-thumb card-thumb-ch16">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 16 · 24 Verses</div>
            <div className="card-thumb-title">Daivasura Sampad —<br /><em>Two Kinds of Inner Wealth</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 16</span>
              <span className="tag tag-shloka">24 Shlokas</span>
              <span className="tag tag-philosophy">Character & Ego</span>
            </div>
            <div className="card-desc">
              The qualities that free you and the ones that bind (16.5), and the three gates to ruin: <em>kāma, krodha, lobha</em>, desire, anger and greed (16.21).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~11 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 17 */}
        <a href="/blogs/bhagwat-geeta-chapter-17" className="article-card" data-mp-article="Bhagavad Gita Chapter 17">
          <div className="card-thumb card-thumb-ch17">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 17 · 28 Verses</div>
            <div className="card-thumb-title">Shraddhatraya Vibhaga —<br /><em>You Are What You Trust</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 17</span>
              <span className="tag tag-shloka">28 Shlokas</span>
              <span className="tag tag-philosophy">Faith & Action</span>
            </div>
            <div className="card-desc">
              Faith comes in three kinds, and a person is made of what they trust (17.3). Food, austerity and giving in three kinds each, and Om Tat Sat (17.23).
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Chapter 18 */}
        <a href="/blogs/bhagwat-geeta-chapter-18" className="article-card" data-mp-article="Bhagavad Gita Chapter 18">
          <div className="card-thumb card-thumb-ch18">
            <div className="card-chapter-badge">Bhagavad Gita · Chapter 18 · 78 Verses</div>
            <div className="card-thumb-title">Moksha Sannyasa Yoga —<br /><em>The Final Teaching</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 18</span>
              <span className="tag tag-shloka">78 Shlokas</span>
              <span className="tag tag-philosophy">Liberation</span>
            </div>
            <div className="card-desc">
              The last chapter, 78 verses. Five causes of any action (18.14), your own duty over someone else&apos;s (18.47), and 18.66: <em>abandon every duty, take refuge in me alone</em>.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~20 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>
      </div>

      {/* TOPIC GUIDES */}
      <div className="section-head" style={{marginTop: '56px'}}>
        <h2>Gita Teachings, <em>Topic Guides</em></h2>
        <span className="section-count">26 articles published</span>
      </div>

      <div className="articles-grid">
        {/* Which Gita Translation */}
        <a href="/blogs/best-bhagavad-gita-translation" className="article-card" data-mp-article="Best Bhagavad Gita Translation">
          <div className="card-thumb card-thumb-whichgita">
            <div className="card-chapter-badge">Reader&apos;s Guide · Translations &amp; Commentaries</div>
            <div className="card-thumb-title">Bhagavad Gita Translations —<br /><em>Which One Should You Read?</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">अनुवाद</span>
              <span className="tag tag-philosophy">12+ Editions</span>
              <span className="tag tag-shloka">4 Traditions</span>
              <span className="tag tag-chapter">Chooser&apos;s Guide</span>
            </div>
            <div className="card-desc">
              Easwaran or Prabhupada? Gita Press or Penguin? Every translation is also an interpretation. A reader-by-reader guide to the major Gitas, with every criticism cited to its source.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~13 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Bhagwat Geeta Saar */}
        <a href="/blogs/bhagwat-geeta-saar" className="article-card" data-mp-article="Bhagwat Geeta Saar">
          <div className="card-thumb card-thumb-saar">
            <div className="card-chapter-badge">The Complete Essence · All 18 Chapters</div>
            <div className="card-thumb-title">Bhagwat Geeta Saar —<br /><em>The Essence in 18 Verses</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">गीता सार</span>
              <span className="tag tag-philosophy">All 18 Chapters</span>
              <span className="tag tag-shloka">22 Verses</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              The &ldquo;Geeta Saar&rdquo; forwarded on WhatsApp isn&apos;t in the Gita. Here is one core verse from each of the 18 chapters instead, in Sanskrit, Hindi and English.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~15 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Krishna Quotes 50 */}
        <a href="/blogs/krishna-quotes" className="article-card" data-mp-article="Krishna Quotes 50">
          <div className="card-thumb card-thumb-krishna">
            <div className="card-chapter-badge">Collection · 50 Teachings · Verse-Referenced</div>
            <div className="card-thumb-title">Krishna Quotes —<br /><em>50 Teachings from the Gita</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">कृष्ण</span>
              <span className="tag tag-philosophy">50 Quotes</span>
              <span className="tag tag-shloka">10 Themes</span>
              <span className="tag tag-chapter">Reference</span>
            </div>
            <div className="card-desc">
              Fifty Krishna quotes from the Bhagavad Gita, grouped by theme, each with the verse reference and the context most social-media versions strip away. Action, devotion, meditation, surrender, character.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~14 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* 20 Famous Sanskrit Shlokas */}
        <a href="/blogs/20-famous-sanskrit-shlokas" className="article-card" data-mp-article="20 Famous Sanskrit Shlokas">
          <div className="card-thumb card-thumb-shlokas20">
            <div className="card-chapter-badge">Collection · 20 Shlokas · Hindi &amp; English</div>
            <div className="card-thumb-title">20 Famous Sanskrit Shlokas —<br /><em>with Meaning in Hindi &amp; English</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">श्लोक</span>
              <span className="tag tag-philosophy">Vedas · Upanishads · Gita</span>
              <span className="tag tag-shloka">20 Verses</span>
              <span className="tag tag-chapter">Reference</span>
            </div>
            <div className="card-desc">
              Twenty well-known Sanskrit shlokas, from Vakratunda Mahakaya to Asato Ma Sadgamaya to Karmanye Vadhikaraste, each in Devanagari and IAST with English and Hindi meaning.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~14 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Gayatri Mantra */}
        <a href="/blogs/gayatri-mantra-meaning" className="article-card" data-mp-article="Gayatri Mantra Meaning">
          <div className="card-thumb card-thumb-gayatri">
            <div className="card-chapter-badge">Mantra Guide · Rig Veda 3.62.10</div>
            <div className="card-thumb-title">Gayatri Mantra —<br /><em>Word-by-Word Meaning &amp; How to Chant</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">गायत्री</span>
              <span className="tag tag-philosophy">Rig Veda</span>
              <span className="tag tag-shloka">24 Syllables</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              Rig Veda 3.62.10, word by word: bhur, bhuvah, svah, savitur, vareṇyam, bhargo, dhīmahi. Its request is in the last line, that our minds be inspired, and here is how to chant it.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Hare Krishna Mahamantra */}
        <a href="/blogs/hare-krishna-mahamantra" className="article-card" data-mp-article="Hare Krishna Mahamantra">
          <div className="card-thumb card-thumb-mahamantra">
            <div className="card-chapter-badge">Mantra Guide · Kali Santarana Upanishad</div>
            <div className="card-thumb-title">Hare Krishna Mahamantra —<br /><em>Meaning, History &amp; Kirtan</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">हरे कृष्ण</span>
              <span className="tag tag-philosophy">Bhakti · Chaitanya · ISKCON</span>
              <span className="tag tag-shloka">16 Words</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              A sixteen-word mantra that George Harrison put on the UK charts in 1969. Chaitanya spread it in 16th-century Bengal; Prabhupada carried it to New York in 1965. What the words mean, and what nama-kirtan is for.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~13 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* BG Quotes in Sanskrit */}
        <a href="/blogs/bhagavad-gita-quotes-sanskrit" className="article-card" data-mp-article="BG Quotes in Sanskrit">
          <div className="card-thumb card-thumb-gitasanskrit">
            <div className="card-chapter-badge">Collection · 30 Verses · Sanskrit · Hindi · English</div>
            <div className="card-thumb-title">Bhagavad Gita Quotes in Sanskrit —<br /><em>30 Verses with Meaning</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">गीता</span>
              <span className="tag tag-philosophy">6 Themes</span>
              <span className="tag tag-shloka">30 Shlokas</span>
              <span className="tag tag-chapter">Reference</span>
            </div>
            <div className="card-desc">
              Thirty well-known Gita verses with the Sanskrit put back: karma, atman, bhakti, paramatman, shanti and shoka, each in Devanagari, IAST, English and Hindi.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~16 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Rise and Failure of GitaGPT */}
        <a href="/blogs/rise-and-failure-of-gitagpt" className="article-card" data-mp-article="Rise and Failure of GitaGPT">
          <div className="card-thumb card-thumb-gitagpt">
            <div className="card-chapter-badge">Product Teardown · Religious AI · India</div>
            <div className="card-thumb-title">The Rise and Failure of GitaGPT:<br /><em>What Went Wrong When India Put Krishna on a GPU</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">गीता-GPT</span>
              <span className="tag tag-philosophy">AI · Religion · India</span>
              <span className="tag tag-shloka">5 Chatbots</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              In early 2023, a Google engineer launched GitaGPT as a weekend project. Five clones followed in 60 days. Several told users it was fine to kill if it was their dharma. What those bots got wrong, and what a Gita assistant would need to get right.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~14 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Krishna's Three Paths */}
        <a href="/blogs/krishna-three-paths-bhagavad-gita" className="article-card" data-mp-article="Krishna Three Paths">
          <div className="card-thumb card-thumb-3paths">
            <div className="card-chapter-badge">Topic Guide · The Three Yogas</div>
            <div className="card-thumb-title">Krishna&apos;s Three Paths:<br /><em>Karma, Jnana, Bhakti and Where They Meet</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">त्रिमार्ग</span>
              <span className="tag tag-philosophy">Three Yogas</span>
              <span className="tag tag-shloka">12+ Verses</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              Krishna describes three ways in: action, knowledge and devotion, suited to different people. The verses for each, with parallels from Tulsidas.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~18 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Beyond Bhagavad Gita - Lesser Known Gitas */}
        <a href="/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health" className="article-card" data-mp-article="Beyond Bhagavad Gita Quotes">
          <div className="card-thumb card-thumb-gita">
            <div className="card-chapter-badge">Topic Guide · 7 Gitas · Mental &amp; Spiritual Health</div>
            <div className="card-thumb-title">Beyond the Bhagavad Gita:<br /><em>7 Lesser-Known Gitas on Inner Peace</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">गीता</span>
              <span className="tag tag-philosophy">Ashtavakra · Avadhuta</span>
              <span className="tag tag-shloka">7 Gitas</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              Ashtavakra, Avadhuta, Ram, Hans, Shakti, Shambhu and Vishnu: seven lesser-known texts called Gita, and what each says about peace of mind.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Anxiety & Mental Peace */}
        <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="article-card" data-mp-article="Gita Anxiety Mental Peace">
          <div className="card-thumb card-thumb-peace">
            <div className="card-chapter-badge">Topic Guide · Anxiety & Mental Health</div>
            <div className="card-thumb-title">What the Gita Says About<br /><em>Anxiety & Mental Peace</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">शान्ति</span>
              <span className="tag tag-philosophy">Mental Peace</span>
              <span className="tag tag-shloka">Chapters 2 & 5</span>
              <span className="tag tag-chapter">Quick Read</span>
            </div>
            <div className="card-desc">
              In Chapter 1 Arjuna is shaking and his mouth is dry. What Chapters 2 and 5 say about where anxiety starts and where to step in.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~6 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Karma Meaning */}
        <a href="/blogs/bhagavad-gita-karma-meaning" className="article-card" data-mp-article="Gita Karma Meaning">
          <div className="card-thumb card-thumb-karma">
            <div className="card-chapter-badge">Topic Guide · Core Teaching</div>
            <div className="card-thumb-title">Karma —<br /><em>What It Means in the Gita</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">कर्म</span>
              <span className="tag tag-philosophy">Karma Yoga</span>
              <span className="tag tag-shloka">Chapters 2, 3, 4</span>
              <span className="tag tag-chapter">Quick Read</span>
            </div>
            <div className="card-desc">
              In the Gita, karma means action, not cosmic payback. What Krishna says about it in Chapters 2 to 4, and why it asks more of you than the popular idea.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~5 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Complete Structure / Arc */}
        <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" className="article-card" data-mp-article="Gita Complete Structure">
          <div className="card-thumb card-thumb-arc">
            <div className="card-chapter-badge">All 18 Chapters · The Full Arc</div>
            <div className="card-thumb-title">The Bhagavad Gita as a Story —<br /><em>How Krishna Builds His Argument</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">अष्टादश</span>
              <span className="tag tag-philosophy">All 18 Chapters</span>
              <span className="tag tag-shloka">Structure & Arc</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              How the 18 chapters fit together, from Arjuna sitting down in Chapter 1 to his answer in 18.73.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~15 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Beginners Guide */}
        <a href="/blogs/bhagavad-gita-for-beginners" className="article-card" data-mp-article="Gita For Beginners">
          <div className="card-thumb card-thumb-begin">
            <div className="card-chapter-badge">Beginner's Guide · Start Here</div>
            <div className="card-thumb-title">Bhagavad Gita for Beginners —<br /><em>Where to Start</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">आरम्भ</span>
              <span className="tag tag-philosophy">All 18 Chapters</span>
              <span className="tag tag-shloka">Guide</span>
              <span className="tag tag-chapter">Quick Read</span>
            </div>
            <div className="card-desc">
              700 verses, 18 chapters. Where to start, which translation to pick, and what the Gita is about, for anyone reading it for the first time.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~7 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* BG 2.47 */}
        <a href="/blogs/bhagavad-gita-2-47-karmanye-vadhikaraste" className="article-card" data-mp-article="BG 2.47 Karmanye Vadhikaraste">
          <div className="card-thumb card-thumb-247">
            <div className="card-chapter-badge">Verse Deep Dive · Chapter 2, Verse 47</div>
            <div className="card-thumb-title">Karmanye Vadhikaraste —<br /><em>BG 2.47, Word by Word</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">कर्मण्य</span>
              <span className="tag tag-philosophy">Karma Yoga</span>
              <span className="tag tag-shloka">BG 2.47</span>
              <span className="tag tag-chapter">Verse Guide</span>
            </div>
            <div className="card-desc">
              Four instructions in 32 syllables, and most people quote only the first two. The full Sanskrit, word by word, and what the other two ask.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~8 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Sthitaprajna */}
        <a href="/blogs/sthitaprajna-bhagavad-gita" className="article-card" data-mp-article="Sthitaprajna Bhagavad Gita">
          <div className="card-thumb card-thumb-sthita">
            <div className="card-chapter-badge">Concept Guide · Chapter 2, Verses 55–72</div>
            <div className="card-thumb-title">Sthitaprajna —<br /><em>The Person of Steady Wisdom</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">स्थितप्रज्ञ</span>
              <span className="tag tag-philosophy">Equanimity</span>
              <span className="tag tag-shloka">18 Verses</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Arjuna asks what a person of steady wisdom looks like, and Krishna answers over 18 verses (2.55–72): the tortoise drawing in its limbs, the slide from desire to ruin, the ocean that rivers fill without moving it.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~10 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Nishkama Karma */}
        <a href="/blogs/nishkama-karma-bhagavad-gita" className="article-card" data-mp-article="Nishkama Karma Guide">
          <div className="card-thumb card-thumb-nishkama">
            <div className="card-chapter-badge">Topic Guide · Karma Yoga</div>
            <div className="card-thumb-title">Nishkama Karma —<br /><em>Acting Without Attachment to Results</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">निष्काम</span>
              <span className="tag tag-philosophy">Karma Yoga</span>
              <span className="tag tag-shloka">7 Verses</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Action without attachment to the result. The same verse, 2.47, rules out inaction, so this is no excuse to stop working. What it means, and why it is hard.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~9 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Gita on Anxiety (new deep-dive) */}
        <a href="/blogs/bhagavad-gita-on-anxiety" className="article-card" data-mp-article="Bhagavad Gita On Anxiety">
          <div className="card-thumb card-thumb-anxiety2">
            <div className="card-chapter-badge">Topic Guide · Mental Peace</div>
            <div className="card-thumb-title">What the Gita Says About Anxiety —<br /><em>Verses on Fear and Worry</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">मनस्</span>
              <span className="tag tag-philosophy">Mental Peace</span>
              <span className="tag tag-shloka">9 Verses</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              Arjuna&apos;s hands shake and his bow slips (1.29–30). The verses where Krishna answers fear and worry, the slide from craving to collapse (2.62–63), and where to interrupt it.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~11 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Death and Soul */}
        <a href="/blogs/bhagavad-gita-on-death-and-the-soul" className="article-card" data-mp-article="Bhagavad Gita On Death and Soul">
          <div className="card-thumb card-thumb-death">
            <div className="card-chapter-badge">Topic Guide · Chapter 2</div>
            <div className="card-thumb-title">The Gita on Death and the Soul —<br /><em>What the Gita Says Survives</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">आत्मन्</span>
              <span className="tag tag-philosophy">Atman</span>
              <span className="tag tag-shloka">BG 2.19–2.25</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Weapons do not cut it, fire does not burn it, water does not wet it, wind does not dry it (2.23). What the Gita says survives death, verse by verse.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~9 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Dharma */}
        <a href="/blogs/dharma-meaning-bhagavad-gita" className="article-card" data-mp-article="Dharma Meaning Bhagavad Gita">
          <div className="card-thumb card-thumb-dharma">
            <div className="card-chapter-badge">Concept Guide · Core Teaching</div>
            <div className="card-thumb-title">Dharma in the Gita —<br /><em>What It Means and What It Doesn&apos;t</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">धर्म</span>
              <span className="tag tag-philosophy">Dharma</span>
              <span className="tag tag-shloka">5 Key Verses</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Dharma rarely means only &quot;duty&quot; in the Gita. Svadharma, sanatana dharma, dharma-kshetra, and the last instruction to set all dharmas aside (18.66): how they fit together.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~10 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Three Gunas */}
        <a href="/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita" className="article-card" data-mp-article="Three Gunas Sattva Rajas Tamas">
          <div className="card-thumb card-thumb-gunas">
            <div className="card-chapter-badge">Concept Guide · Chapter 14</div>
            <div className="card-thumb-title">Sattva, Rajas, Tamas —<br /><em>The Gita&apos;s Psychology of Inner States</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">गुण</span>
              <span className="tag tag-philosophy">Three Gunas</span>
              <span className="tag tag-shloka">Chapter 14</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Why some mornings are clear, some restless and some heavy. Sattva, rajas and tamas in Chapter 14, how to recognise each in yourself, and the state beyond all three.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~9 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* For Students */}
        <a href="/blogs/bhagavad-gita-for-students" className="article-card" data-mp-article="Bhagavad Gita For Students">
          <div className="card-thumb card-thumb-students">
            <div className="card-chapter-badge">Topic Guide · For Students</div>
            <div className="card-thumb-title">Bhagavad Gita for Students —<br /><em>9 Lessons on Focus, Failure &amp; Effort</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">अभ्यास</span>
              <span className="tag tag-philosophy">Discipline</span>
              <span className="tag tag-shloka">9 Lessons</span>
              <span className="tag tag-chapter">Practical Guide</span>
            </div>
            <div className="card-desc">
              Arjuna froze before the biggest test of his life. Nine lessons for students from the Gita: exam nerves, effort without attachment, self-control, and what to do after failing.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~9 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Ahankara Meaning */}
        <a href="/blogs/ahankara-meaning-bhagavad-gita" className="article-card" data-mp-article="Ahankara Meaning Bhagavad Gita">
          <div className="card-thumb card-thumb-ahankara">
            <div className="card-chapter-badge">Concept Guide · Sanskrit Term</div>
            <div className="card-thumb-title">Ahankara —<br /><em>The Gita&apos;s Word for Ego</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">अहंकार</span>
              <span className="tag tag-philosophy">Identity &amp; Self</span>
              <span className="tag tag-shloka">Chapters 3, 13, 16 &amp; 18</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Ahankara means &lsquo;I-maker&rsquo;: the part of the mind that labels experience as mine. Where the Gita uses the word (Chapters 3, 13, 16 and 18), and why it treats it as a mistake about who you are.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~8 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Maya Meaning */}
        <a href="/blogs/maya-meaning-bhagavad-gita" className="article-card" data-mp-article="Maya Meaning Bhagavad Gita">
          <div className="card-thumb card-thumb-maya">
            <div className="card-chapter-badge">Concept Guide · Sanskrit Term</div>
            <div className="card-thumb-title">Maya —<br /><em>Illusion in the Bhagavad Gita</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">माया</span>
              <span className="tag tag-philosophy">Reality &amp; Illusion</span>
              <span className="tag tag-shloka">BG 7.14, 14.19, 18.61</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              In the Gita, maya is the power that makes the real look like something else. It is made of the three gunas (7.14), and Krishna says it is crossed by turning to him.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~9 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Soul Is Not Atman */}
        <a href="/blogs/atman-not-soul-bhagavad-gita" className="article-card" data-mp-article="Atman Not Soul Bhagavad Gita">
          <div className="card-thumb card-thumb-atman">
            <div className="card-chapter-badge">Concept Guide · Sanskrit Term</div>
            <div className="card-thumb-title">Atman and Soul —<br /><em>Why the Words Differ</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">आत्मन्</span>
              <span className="tag tag-philosophy">Self &amp; Identity</span>
              <span className="tag tag-shloka">BG 2.20, 13.31, 15.7</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Many English translations render ātman as &ldquo;soul&rdquo;, and the two words carry different assumptions. What the Gita says, verse by verse, with the Bible&apos;s account of the soul for contrast.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Gita vs Stoicism */}
        <a href="/blogs/bhagavad-gita-vs-stoicism" className="article-card" data-mp-article="Bhagavad Gita vs Stoicism">
          <div className="card-thumb card-thumb-stoic">
            <div className="card-chapter-badge">Comparative Philosophy</div>
            <div className="card-thumb-title">Bhagavad Gita vs Stoicism —<br /><em>Nine Parallels</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">समता</span>
              <span className="tag tag-philosophy">Stoicism</span>
              <span className="tag tag-shloka">9 Parallels</span>
              <span className="tag tag-chapter">Comparison</span>
            </div>
            <div className="card-desc">
              Marcus Aurelius and Krishna never met, yet they say similar things about action, equanimity, duty and the self. Nine parallels, and where the two disagree.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~12 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>
      </div>

      {/* COMING SOON */}
      <div className="coming-section">
        <div className="section-head">
          <h2>Coming Soon</h2>
          <span className="section-count">Mantras, verse deep-dives &amp; core concepts</span>
        </div>
        <div className="coming-grid">
          <div className="coming-card">
            <div className="coming-label">Verse Guide</div>
            <div className="coming-title">Yada Yada Hi Dharmasya — BG 4.7 Line by Line</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Mantra Guide</div>
            <div className="coming-title">Mahamrityunjaya Mantra — Meaning &amp; History</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Concept Guide</div>
            <div className="coming-title">Moksha — Liberation in the Gita</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Concept Guide</div>
            <div className="coming-title">Dharma vs Karma — How the Two Forces Relate</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Collection</div>
            <div className="coming-title">30 Bhagavad Gita Quotes on Life</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          
          <div className="coming-card">
            <div className="coming-label">Story Guide</div>
            <div className="coming-title">Mahabharata Summary — What Happened Before the Gita</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
        </div>
      </div>
    </div>

    <SiteFooter />

    

      <BlogTracker pageName="Blog Index" />
    </>
  )
}