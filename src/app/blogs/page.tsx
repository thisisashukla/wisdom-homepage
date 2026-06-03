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
        min-height: 130px;
        display: flex;
        flex-direction: column;
        justify-content: flex-end;
      }
      .card-thumb::before {
        position: absolute;
        right: -10px;
        top: -10px;
        font-family: "Noto Sans Devanagari", serif;
        font-size: 100px;
        color: rgba(255, 255, 255, 0.04);
        line-height: 1;
        pointer-events: none;
        user-select: none;
      }
      .card-thumb-ch1::before { content: "अध्याय १"; }
      .card-thumb-ch2::before { content: "अध्याय २"; }
      .card-thumb-ch3::before { content: "अध्याय ३"; }
      .card-thumb-ch4::before { content: "अध्याय ४"; }
      .card-thumb-ch5::before { content: "अध्याय ५"; }
      .card-thumb-ch6::before { content: "अध्याय ६"; }
      .card-thumb-ch7::before { content: "अध्याय ७"; }
      .card-thumb-ch8::before { content: "अध्याय ८"; }
      .card-thumb-ch9::before { content: "अध्याय ९"; }
      .card-thumb-ch10::before { content: "अध्याय १०"; font-size: 80px; }
      .card-thumb-ch11::before { content: "अध्याय ११"; font-size: 80px; }
      .card-thumb-ch12::before { content: "अध्याय १२"; font-size: 80px; }
      .card-thumb-ch13::before { content: "अध्याय १३"; font-size: 80px; }
      .card-thumb-ch14::before { content: "अध्याय १४"; font-size: 80px; }
      .card-thumb-ch15::before { content: "अध्याय १५"; font-size: 80px; }
      .card-thumb-ch16::before { content: "अध्याय १६"; font-size: 80px; }
      .card-thumb-ch17::before { content: "अध्याय १७"; font-size: 80px; }
      .card-thumb-ch18::before { content: "अध्याय १८"; font-size: 80px; }
      .card-thumb-shlok::before { content: "श्लोक"; }
      .card-thumb-karma::before { content: "कर्म"; }
      .card-thumb-gita::before { content: "गीता"; }
      .card-thumb-peace::before { content: "शान्ति"; }
      .card-thumb-begin::before { content: "आरम्भ"; }
      .card-thumb-arc::before { content: "अठारह"; }
      .card-thumb-3paths::before { content: "त्रिमार्ग"; font-size: 80px; }

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
        font-size: 18px;
        font-weight: 600;
        color: var(--gold-light);
        line-height: 1.3;
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
        <span className="section-count">6 articles published</span>
      </div>

      <div className="articles-grid">
        {/* Krishna's Three Paths */}
        <a href="/blogs/krishna-three-paths-bhagavad-gita" className="article-card" data-mp-article="Krishna Three Paths">
          <div className="card-thumb card-thumb-3paths">
            <div className="card-chapter-badge">Topic Guide · The Three Yogas</div>
            <div className="card-thumb-title">Krishna&apos;s Three Paths:<br /><em>Karma, Jnana, Bhakti and Where They Meet</em></div>
          </div>
          <div className="card-body">
            <div className="card-tags">
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
      </div>

      {/* COMING SOON */}
      <div className="coming-section">
        <div className="section-head">
          <h2>Coming Soon</h2>
          <span className="section-count">Collections, topic guides &amp; the Upanishads</span>
        </div>
        <div className="coming-grid">
          <div className="coming-card">
            <div className="coming-label">Shloka Collection</div>
            <div className="coming-title">20 Most Famous Shlokas in Sanskrit</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Guide</div>
            <div className="coming-title">Bhagwat Geeta Saar — The Complete Essence</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Collection</div>
            <div className="coming-title">Krishna Quotes — 50 Teachings with Verse References</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Topic Guide</div>
            <div className="coming-title">What the Gita Says About Leadership</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Topic Guide</div>
            <div className="coming-title">What the Gita Says About Work &amp; Burnout</div>
            <span className="coming-soon-badge">Coming soon</span>
          </div>
          <div className="coming-card">
            <div className="coming-label">Upanishads</div>
            <div className="coming-title">Isha Upanishad — A Reader's Guide</div>
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