import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'


export const metadata: Metadata = {
  title: "Blog \u2014 Bhagavad Gita, Sanskrit Shlokas &amp; Hindu Philosophy | Wisdom",
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
        font-size: 10px;
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
      .card-thumb-ahankara, .card-thumb-maya {
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
        font-size: 9px;
        letter-spacing: 0.18em;
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
        font-size: 10.5px;
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
        font-size: 9px;
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
        font-size: 9px;
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
        <h1>The Bhagavad Gita,<br /><em>read closely</em></h1>
        <p>
          All 18 chapters. Chapter by chapter, shloka by shloka. Sanskrit, IAST,
          Hindi, and what the verse is actually saying, including the parts that
          most summaries skip.
        </p>
      </div>
    </div>

    <div className="blog-wrap">
      {/* APP BANNER */}
      <div className="app-banner">
        <div>
          <h3>One verse a day. What it means right now.</h3>
          <p>
            The Wisdom app delivers one Bhagavad Gita verse each morning:
            Devanagari, transliteration, English meaning, and a guided
            reflection practice. Free on iPhone.
          </p>
        </div>
        <a
          href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
          target="_blank"
          rel="noopener"
          className="app-banner-btn"
          data-mp-location="app_banner"
          >Download Free →</a
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
              The most psychologically honest chapter in the Gita begins not with wisdom, but with collapse. Why does the greatest archer in history put down his bow? All 47 verses with Sanskrit, IAST, and modern context.
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
            <div className="card-thumb-title">Sankhya Yoga —<br /><em>The Chapter That Changes Everything</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 2</span>
              <span className="tag tag-shloka">72 Shlokas</span>
              <span className="tag tag-philosophy">Soul & Duty</span>
            </div>
            <div className="card-desc">
              The philosophical heart of the Gita. The eternal soul, 2.47 (the most quoted verse in the world), the cascade from thought to ruin, and the portrait of a mind that cannot be broken: the sthitaprajna.
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
            <div className="card-thumb-title">Karma Yoga —<br /><em>Why You Cannot Run</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 3</span>
              <span className="tag tag-shloka">43 Shlokas</span>
              <span className="tag tag-philosophy">Action & Dharma</span>
            </div>
            <div className="card-desc">
              Why you cannot not act. The logic of yajna: how action becomes offering. Lokasamgraha: the weight of the example you set. Your own dharma, imperfectly. And why desire is the real enemy.
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
              Yada yada hi dharmasya: the divine promise of renewal. The yoga of knowledge as the highest offering. How wisdom burns away past karma. And the Gita's model for how to learn from a real teacher.
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
              The lotus leaf teaching. Equal vision across all beings. Where inner happiness actually lives. And the quietly profound verse 5.29, where Krishna calls himself the sincere friend of all beings.
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
              The Gita's most practical chapter on meditation. Lift yourself by yourself. The lamp in a windless place. Arjuna's honest objection that the mind is like the wind, and the answer: practice and detachment.
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
              The seam in the Gita where the camera pulls back. Pearls strung on a thread. The sacred in the taste of water. The four kinds of seekers. And the rare turning that ends all searching: <em>Vāsudeva is everything</em>.
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
              A chapter about death, and therefore about every moment that is not yet death. Whatever state the mind has practiced, that is what you become at the end. Brahma's day and night. The path that does not return.
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
              The king of all knowledge, supremely easy to practice. Leaf, flower, fruit, water. Whatever you do, offer it. And the line that has consoled more sufferers than possibly any other in the book: <em>my devotee never perishes</em>.
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
              Where to look for the Divine: in everything that shines. The lamp lit inside the heart. The Self at the heart of every being. And the closing reveal: the whole universe rests on a single fragment.
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
            <div className="card-thumb-title">Vishwarupa Darshana Yoga —<br /><em>The Vision That Cannot Be Looked At</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 11</span>
              <span className="tag tag-shloka">55 Shlokas</span>
              <span className="tag tag-philosophy">Cosmic Form</span>
            </div>
            <div className="card-desc">
              Arjuna asked to see. Krishna gave him what he asked for. A thousand suns. Mouths like fire. <em>I am Time, the destroyer of worlds.</em> And the gentler closing: only devotion sees this.
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
            <div className="card-thumb-title">Bhakti Yoga —<br /><em>How a Devotee Actually Lives</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 12</span>
              <span className="tag tag-shloka">20 Shlokas</span>
              <span className="tag tag-philosophy">Devotion</span>
            </div>
            <div className="card-desc">
              The shortest chapter, and one of the most practical. The four-step ladder for when meditation is too hard. And the portrait of the devotee Krishna calls dear: measured by friendliness, not by belief.
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
              The Gita's most precise piece of metaphysical work. Your body, your moods, your reactions, all observed. By something that is not them. The foundation underneath every other teaching.
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
            <div className="card-thumb-title">Gunatraya Vibhaga —<br /><em>The Three Forces of Inner Weather</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-chapter">Chapter 14</span>
              <span className="tag tag-shloka">27 Shlokas</span>
              <span className="tag tag-philosophy">Three Gunas</span>
            </div>
            <div className="card-desc">
              Why some days are clear, some restless, some you cannot get off the couch. Sattva, rajas, tamas: the Gita's psychology of mood. And the unwavering devotion that goes beyond all three.
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
              An upside-down tree. The sword of detachment. A spark of the eternal in every being. The fire that digests your dinner. And the name Krishna finally claims: Purushottama, the Self beyond every other self.
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
              The qualities that open a life and the ones that close it. The spiral of endless desire. The three gates of ruin: <em>kāma, krodha, lobha</em>. And why dropping them is the only ladder out.
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
              You are made of your trust. Whatever you trust, that is what you become. Three kinds of food, austerity, giving. Om Tat Sat. And the closing claim: action without trust transforms nothing.
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
              Seventy-eight verses to close everything. Five causes of any action. Your own duty over a borrowed perfection. And the most secret verse of all: <em>abandon every duty, take refuge in me alone</em>.
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
        <span className="section-count">24 articles published</span>
      </div>

      <div className="articles-grid">
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
              The famous WhatsApp &ldquo;Geeta Saar&rdquo; you have read isn&apos;t actually in the Gita. Here is what Krishna really taught &mdash; one core verse for each of the 18 chapters, in Sanskrit, Hindi, and English.
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
              The twenty Sanskrit shlokas every educated person should know &mdash; from Vakratunda Mahakaya to Asato Ma Sadgamaya to Karmanye Vadhikaraste. Devanagari, IAST, English translation, and Hindi meaning for each.
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
              The most-recited Sanskrit mantra on earth. Word by word: bhur, bhuvah, svah, savitur, vareṇyam, bhargo, dhīmahi. What it actually asks for is not wealth or protection &mdash; it is illumination of the intellect.
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
              A sixteen-word mantra that George Harrison put on the UK charts in 1969. Chaitanya popularized it in 16th-century Bengal; Prabhupada carried it to New York in 1965. What the words mean, and what nama-kirtan is actually doing.
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
              Most Gita quotes online strip away the Sanskrit. This piece restores it. Thirty famous verses across six themes &mdash; karma, atman, bhakti, paramatman, shanti, shoka &mdash; each in Devanagari, IAST, English, and Hindi.
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
              In early 2023, a Google engineer launched GitaGPT as a weekend project. Five clones followed in 60 days. Several told users it was fine to kill if it was their dharma. A product teardown of what those bots got wrong, and what a real Krishna assistant needs.
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
              Krishna does not say there is one way. He lays out three: Action, Wisdom, Devotion, each shaped for a different temperament, all converging on the same reality. Grounded in the verses, with parallels from Tulsidas and modern psychology.
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
              The Bhagavad Gita is one voice in a vast chorus. The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each carry their own wisdom for mental peace — and most people have never read a word of them.
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
              Chapter 1 opens with the world's most famous panic attack. The Gita's teaching on anxiety isn't "calm down" — it's a complete diagnosis of how the spiral begins and where to interrupt it.
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
            <div className="card-thumb-title">Karma —<br /><em>What It Actually Means in the Gita</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">कर्म</span>
              <span className="tag tag-philosophy">Karma Yoga</span>
              <span className="tag tag-shloka">Chapters 2, 3, 4</span>
              <span className="tag tag-chapter">Quick Read</span>
            </div>
            <div className="card-desc">
              Karma doesn't mean "what goes around comes around." That's a greeting card. Here's what the Bhagavad Gita actually teaches — and why the real definition is harder, more honest, and more useful.
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
              The Gita isn't a random collection of wisdom. It's a structured discourse with a setup, escalation, climax, and payoff. Three acts, 18 chapters, one warrior who sat down and stood back up.
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
              700 verses, 18 chapters — where do you start? Which translation? What is it actually about? A no-nonsense guide for anyone who has heard about the Gita and wants to finally read it properly.
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
            <div className="card-thumb-title">Karmanye Vadhikaraste —<br /><em>The Most Misread Line in the Gita</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">कर्मण्य</span>
              <span className="tag tag-philosophy">Karma Yoga</span>
              <span className="tag tag-shloka">BG 2.47</span>
              <span className="tag tag-chapter">Verse Guide</span>
            </div>
            <div className="card-desc">
              Four instructions in 32 syllables. Most people quote the first half. The second half is what changes everything. Full Sanskrit, word-by-word breakdown, and why the fourth clause is the one nobody talks about.
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
            <div className="card-thumb-title">Sthitaprajna —<br /><em>The 18-Verse Portrait of an Unshakeable Mind</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">स्थितप्रज्ञ</span>
              <span className="tag tag-philosophy">Equanimity</span>
              <span className="tag tag-shloka">18 Verses</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Arjuna asked: what does a person of steady wisdom actually look like? Krishna answered across 18 consecutive verses. The kachhua image, the cascade from desire to ruin, the ocean that receives rivers without overflowing.
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
              Nishkama karma is not passivity. The Gita explicitly forbids inaction in the same verse it forbids attachment to results. What it actually means, why it is hard, and what changes when you practice it.
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
            <div className="card-thumb-title">What the Gita Says About Anxiety —<br /><em>9 Verses That Actually Help</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">मनस्</span>
              <span className="tag tag-philosophy">Mental Peace</span>
              <span className="tag tag-shloka">9 Verses</span>
              <span className="tag tag-chapter">Deep Read</span>
            </div>
            <div className="card-desc">
              The Gita opens with a panic attack. Arjuna&apos;s hands shake, his bow drops, his voice breaks. Krishna&apos;s 700-verse answer begins here. Nine specific verses on anxiety, the cascade from craving to collapse, and where to interrupt it.
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
            <div className="card-thumb-title">The Gita on Death and the Soul —<br /><em>What Actually Cannot Be Destroyed</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">आत्मन्</span>
              <span className="tag tag-philosophy">Atman</span>
              <span className="tag tag-shloka">BG 2.19–2.25</span>
              <span className="tag tag-chapter">Concept Guide</span>
            </div>
            <div className="card-desc">
              Weapons do not cut it. Fire does not burn it. Water does not wet it. Wind does not dry it. The Gita&apos;s first move is a structural claim about the nature of the self — and it changes everything that follows.
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
              Dharma appears 72 times in the Gita. It never quite means &quot;duty.&quot; Svadharma, sanatana dharma, the dharma-kshetra, and the final instruction to abandon all dharma: how they fit together.
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
              Why some mornings are clear, some restless, and some you cannot get off the couch. Sattva, rajas, tamas: the Gita&apos;s framework for reading your own inner states. And the state beyond all three.
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
              The Gita was taught to someone who froze under pressure before the biggest test of his life. Nine lessons specifically for students: results anxiety, effort without attachment, self-mastery, and what to do after failure.
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
              Ahankara doesn&apos;t mean pride or arrogance. It means I-maker — the mechanism in the mind that creates the sense of being a separate, bounded self. The Gita diagnoses it as the root misidentification, not a personality flaw.
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
              Maya doesn&apos;t mean the world is fake. In the Gita it is the divine power that makes the real appear as something other than what it is — composed of the three gunas, and crossed not by argument but by surrender.
            </div>
            <div className="card-meta">
              <span className="card-read-time">~9 min read</span>
              <span className="card-arrow">Read →</span>
            </div>
          </div>
        </a>

        {/* Gita vs Stoicism */}
        <a href="/blogs/bhagavad-gita-vs-stoicism" className="article-card" data-mp-article="Bhagavad Gita vs Stoicism">
          <div className="card-thumb card-thumb-stoic">
            <div className="card-chapter-badge">Comparative Philosophy</div>
            <div className="card-thumb-title">Bhagavad Gita vs Stoicism —<br /><em>9 Teachings That Keep Finding Each Other</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
              <span className="tag tag-sanskrit">समता</span>
              <span className="tag tag-philosophy">Stoicism</span>
              <span className="tag tag-shloka">9 Parallels</span>
              <span className="tag tag-chapter">Comparison</span>
            </div>
            <div className="card-desc">
              Marcus Aurelius and Krishna never met. They reached remarkably similar conclusions about action, equanimity, duty, and the self. Nine parallel teachings, and where the two traditions actually diverge.
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
            <div className="coming-title">Moksha — What Liberation Actually Means in the Gita</div>
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
            <div className="coming-label">Reader&apos;s Guide</div>
            <div className="coming-title">Which Bhagavad Gita Translation Should You Read?</div>
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

    <footer>
      <p>
        Wisdom App ·
        <span>Daily shlokas from the Bhagavad Gita & Hindu scriptures</span>
        · Free on iPhone
      </p>
      <p style={{marginTop: '8px'}}>
        <a href="/">wisdomquotes.in</a>  ·
        <a href="/blogs">Blog</a>  ·
        <a href="/gita">Bhagavad Gita</a>  ·
        <a href="/privacy">Privacy</a>  ·
        <a href="/terms">Terms</a>  ·
        <a href="/methodology">Methodology</a>  ·
        <a href="mailto:work.ankurshukla@gmail.com">Support</a>
      </p>
      <p style={{marginTop: '6px', fontSize: '11px', opacity: 0.7}}>
        Wisdom editorial translations. Commentary AI-drafted, human-reviewed. <a href="/methodology">Methodology →</a>
      </p>
    </footer>

    

      <BlogTracker pageName="Blog Index" />
    </>
  )
}