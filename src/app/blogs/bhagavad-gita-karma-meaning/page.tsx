import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Karma \u2014 What It Actually Means in the Bhagavad Gita | Wisdom",
  description: "Karma doesn't mean 'what goes around comes around.' That's a greeting card. Here's what the Bhagavad Gita actually teaches about karma \u2014 and why the real definition is harder, and more useful.",
  keywords: "karma meaning in bhagavad gita, what is karma, karma definition, bhagavad gita karma yoga, what does karma mean in hinduism, karma in gita, karma meaning hindi, karma actual meaning",
  openGraph: {
    title: "Karma \u2014 What It Actually Means in the Bhagavad Gita | Wisdom",
    description: "Karma doesn't mean what goes around comes around. Here's what the Bhagavad Gita actually teaches about karma \u2014 and why the real definition matters.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs",
    siteName: 'Wisdom',
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs" },
}

const pageCSS = `

        :root {
            --maroon: #3d0c0c;
            --maroon-mid: #5c1a1a;
            --gold: #c8881e;
            --gold-light: #f5c96a;
            --gold-pale: #fdf3dc;
            --gold-border: #e8c97a;
            --gold-dim: rgba(200,136,30,0.15);
            --text: #f5e8cc;
            --text-dim: rgba(245,232,204,0.65);
            --text-dimmer: rgba(245,232,204,0.35);
            --muted-2: rgba(245,232,204,0.35);
            --border: rgba(200,136,30,0.2);
            --bg: #120505;
            --bg-warm: #190707;
            --bg-alt: #0f0404;
            --bg-card: rgba(255,255,255,0.04);
            --bg-card-hover: rgba(255,255,255,0.07);
            --max: 780px;
        }

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            font-size: 16px;
        }

        /* ── NAV ── */
        body > nav {
            position: sticky;
            top: 0;
            z-index: 200;
            background: rgba(18, 5, 5, 0.92);
            backdrop-filter: blur(18px);
            -webkit-backdrop-filter: blur(18px);
            border-bottom: 1px solid var(--border);
        }
        .nav-inner {
            max-width: 1100px;
            margin: 0 auto;
            padding: 0 28px;
            height: 60px;
            display: flex;
            align-items: center;
            justify-content: space-between;
        }
        .logo {
            display: flex;
            align-items: center;
            gap: 9px;
            font-family: "Playfair Display", Georgia, serif;
            font-size: 21px;
            font-weight: 700;
            color: var(--gold-light);
            text-decoration: none;
        }
        .logo-mark {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            overflow: hidden;
            border: 1.5px solid rgba(200, 136, 30, 0.4);
            flex-shrink: 0;
        }
        .logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
        .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
        .nav-links a { font-size: 14px; font-weight: 500; color: var(--text-dim); transition: color 0.18s; }
        .nav-links a:hover, .nav-links a.active { color: var(--gold-light); }
        .btn-nav {
            background: var(--gold) !important;
            color: #1a0606 !important;
            padding: 8px 18px;
            border-radius: 8px;
            font-weight: 700;
            transition: opacity 0.18s;
        }
        .btn-nav:hover { opacity: 0.88; }

        /* ── BREADCRUMB ── */
        .breadcrumb {
            background: var(--bg-alt);
            border-bottom: 1px solid var(--border);
        }
        .breadcrumb-inner {
            max-width: 1100px;
            margin: 0 auto;
            padding: 10px 28px;
            font-size: 12px;
            color: var(--text-dimmer);
            display: flex;
            gap: 8px;
            align-items: center;
        }
        .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
        .breadcrumb-inner a:hover { color: var(--gold-light); }
        .bc-sep { opacity: 0.4; }

        /* ── ARTICLE HERO ── */
        .article-hero {
            background: var(--bg-warm);
            padding: 64px 28px 56px;
            border-bottom: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }
        .article-hero::before {
            content: "कर्म";
            position: absolute;
            right: -10px;
            bottom: -30px;
            font-family: "Noto Sans Devanagari", serif;
            font-size: 220px;
            color: rgba(200, 136, 30, 0.04);
            line-height: 1;
            pointer-events: none;
            user-select: none;
        }
        .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }
        .chapter-badge {
            display: inline-flex;
            align-items: center;
            gap: 8px;
            background: rgba(200, 136, 30, 0.1);
            border: 1px solid rgba(200, 136, 30, 0.28);
            color: var(--gold-light);
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.12em;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 100px;
            margin-bottom: 20px;
        }
        .chapter-badge-dot {
            width: 5px;
            height: 5px;
            border-radius: 50%;
            background: var(--gold);
            box-shadow: 0 0 6px var(--gold);
            flex-shrink: 0;
        }
        h1.article-title {
            font-family: "Playfair Display", Georgia, serif;
            font-size: clamp(28px, 4vw, 48px);
            font-weight: 700;
            color: var(--gold-light);
            line-height: 1.15;
            letter-spacing: -0.5px;
            margin-bottom: 14px;
        }
        h1.article-title em { font-style: italic; color: #fff; }
        .article-subtitle {
            font-size: 17px;
            color: var(--text-dim);
            font-weight: 300;
            margin-bottom: 32px;
            line-height: 1.65;
            max-width: 620px;
        }
        .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
        .meta-sep { color: var(--border); }

        .lead {
            font-size: 1.1rem;
            color: var(--text-dim);
            margin-bottom: 2rem;
            line-height: 1.8;
        }

        /* Main Content */
        .content {
            max-width: var(--max);
            margin: 0 auto;
            padding: 0 2rem 4rem;
        }

        h2 {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            font-weight: 700;
            margin: 2.5rem 0 1.5rem 0;
            color: var(--gold);
            border-bottom: 2px solid var(--gold-dim);
            padding-bottom: 0.75rem;
        }

        h3 {
            font-family: 'Playfair Display', serif;
            font-size: 1.3rem;
            font-weight: 600;
            margin: 1.5rem 0 1rem 0;
            color: var(--text);
        }

        p {
            margin-bottom: 1.5rem;
            color: var(--text-dim);
        }

        /* Shloka Card */
        .shloka-card {
            background: var(--bg-card);
            border: 1px solid var(--gold-dim);
            border-radius: 8px;
            padding: 2rem;
            margin: 2rem 0;
            transition: background 0.3s;
        }

        .shloka-card:hover {
            background: var(--bg-card-hover);
        }

        .shloka-card .verse-number {
            font-size: 0.85rem;
            color: var(--gold);
            font-weight: 600;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }

        .shloka-card .sanskrit {
            font-family: 'Noto Sans Devanagari', sans-serif;
            font-size: 1.1rem;
            color: var(--gold-light);
            margin-bottom: 1rem;
            line-height: 1.8;
        }

        .shloka-card .transliteration {
            font-family: 'Inter', sans-serif;
            font-size: 0.95rem;
            font-style: italic;
            color: var(--text-dimmer);
            margin-bottom: 1rem;
            line-height: 1.6;
        }

        .shloka-card .meaning {
            background: rgba(200,136,30,0.05);
            padding: 1rem;
            border-left: 3px solid var(--gold);
            margin-bottom: 1rem;
            border-radius: 4px;
        }

        .shloka-card .meaning-label {
            font-size: 0.75rem;
            color: var(--gold);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .shloka-card .meaning-text {
            color: var(--text);
            line-height: 1.7;
        }

        .shloka-card .insight {
            background: var(--bg-alt);
            padding: 1rem;
            border-radius: 4px;
            margin-bottom: 1rem;
            border: 1px solid var(--border);
        }

        .shloka-card .insight-label {
            font-size: 0.75rem;
            color: var(--text-dimmer);
            text-transform: uppercase;
            font-weight: 600;
            margin-bottom: 0.5rem;
        }

        .shloka-card .insight-text {
            color: var(--text-dim);
            line-height: 1.7;
            font-size: 0.95rem;
        }

        .shloka-card .essence {
            font-style: italic;
            color: var(--gold-light);
            margin-top: 1rem;
            padding-top: 1rem;
            border-top: 1px solid var(--border);
        }

        /* Pull Quote */
        .pull-quote {
            border-left: 4px solid var(--gold);
            padding-left: 2rem;
            margin: 2.5rem 0;
            font-size: 1.15rem;
            color: var(--gold-light);
            font-style: italic;
            line-height: 1.8;
        }

        /* Highlight Box */
        .highlight-box {
            background: var(--gold-dim);
            border: 1px solid var(--gold-border);
            padding: 1.5rem;
            border-radius: 8px;
            margin: 2rem 0;
        }

        .highlight-box h3 {
            color: var(--gold);
            margin-top: 0;
        }

        .highlight-box p {
            color: var(--text);
            margin-bottom: 0.75rem;
        }

        /* FAQ Section */
        .faq-section {
            max-width: var(--max);
            margin: 3rem auto;
            padding: 0 2rem;
        }

        .faq-item {
            margin-bottom: 2rem;
            border-bottom: 1px solid var(--border);
            padding-bottom: 2rem;
        }

        .faq-item:last-child {
            border-bottom: none;
        }

        .faq-item strong {
            color: var(--gold-light);
            font-size: 1.05rem;
        }

        .faq-item p {
            margin-top: 0.75rem;
        }

        /* App CTA */
                /* ── APP CTA ── */
        .app-cta {
          background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
          border: 1px solid rgba(200, 136, 30, 0.25);
          border-top: 3px solid var(--gold);
          border-radius: 20px;
          padding: 44px 48px 40px;
          margin: 48px 0 60px;
          text-align: center;
          position: relative;
          overflow: hidden;
        }
        .app-cta::before {
          content: "ज्ञान";
          position: absolute;
          top: -14px;
          right: -8px;
          font-family: "Noto Sans Devanagari", sans-serif;
          font-size: 130px;
          color: rgba(200, 136, 30, 0.05);
          line-height: 1;
          pointer-events: none;
          user-select: none;
        }
        .app-cta-eyebrow {
          display: inline-flex;
          align-items: center;
          background: rgba(200, 136, 30, 0.12);
          border: 1px solid rgba(200, 136, 30, 0.35);
          color: var(--gold-light);
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          padding: 5px 14px;
          border-radius: 20px;
          margin-bottom: 20px;
        }
        .app-cta-headline {
          font-family: "Playfair Display", serif;
          font-size: clamp(22px, 3vw, 30px);
          font-weight: 700;
          color: var(--text);
          line-height: 1.25;
          margin-bottom: 14px;
        }
        .app-cta-desc {
          font-size: 15px;
          color: var(--text-dim);
          line-height: 1.7;
          max-width: 480px;
          margin: 0 auto 22px;
        }
        .app-cta-features {
          display: flex;
          gap: 6px 18px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .app-cta-features span {
          font-size: 13px;
          color: var(--gold-light);
          opacity: 0.8;
        }
        .app-cta-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: var(--gold);
          color: #120505;
          text-decoration: none;
          padding: 15px 34px;
          border-radius: 12px;
          font-size: 16px;
          font-weight: 700;
          letter-spacing: -0.01em;
          transition: all 0.2s;
          box-shadow: 0 4px 22px rgba(200, 136, 30, 0.3);
        }
        .app-cta-btn:hover {
          background: var(--gold-light);
          transform: translateY(-2px);
          box-shadow: 0 8px 32px rgba(200, 136, 30, 0.5);
        }
        .app-cta-sub {
          font-size: 12px;
          color: rgba(245, 232, 204, 0.35);
          margin-top: 14px;
          letter-spacing: 0.04em;
        }

        /* Footer */
        footer {
            background: var(--bg-warm);
            border-top: 1px solid var(--border);
            padding: 3rem 2rem;
            text-align: center;
            color: var(--text-dimmer);
            margin-top: 4rem;
        }

        footer a {
            color: var(--gold);
            text-decoration: none;
        }

        footer a:hover {
            text-decoration: underline;
        }

        @media (max-width: 768px) {
            .article-hero { padding: 44px 20px 40px; }

            h2 {
                font-size: 1.5rem;
            }

            .nav-inner { padding: 0 20px; }
            .nav-links { gap: 16px; }
            .nav-links li:not(:last-child) { display: none; }
            .mobile-nav-toggle { display: flex; }
        }
    
`

const schemas = [
  {
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Karma — What It Actually Means in the Bhagavad Gita | Wisdom",
  "description": "Karma doesn't mean what goes around comes around. Here's what the Bhagavad Gita actually teaches about karma.",
  "datePublished": "2026-05-05",
  "author": {
    "@type": "Organization",
    "name": "Wisdom App"
  },
  "publisher": {
    "@type": "Organization",
    "name": "Wisdom App",
    "url": "https://wisdomquotes.in"
  }
},
  {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "What does karma actually mean?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Karma literally means action in Sanskrit. In the Bhagavad Gita, it refers to any action you perform and the consequences that flow from those actions. The Gita's teaching is about the quality of consciousness you bring to action, not cosmic justice."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Bhagavad Gita say about karma?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Gita's most important karma teaching is in verse 2.47: You have a right to perform your duties, but not to the fruits of your actions. This is the foundation of karma yoga — performing action without attachment to outcomes."
      }
    },
    {
      "@type": "Question",
      "name": "Does karma mean what goes around comes around?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Not in the Bhagavad Gita. The Gita's concept of karma is about the state of consciousness behind your actions, not a cosmic ledger. Actions do have consequences, but wisdom can dissolve accumulated karma — you are not locked into your past."
      }
    }
  ]
}
]

export default function KarmaMeaningPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

<nav>
      <div className="nav-inner">
        <a href="/" className="logo">
          <div className="logo-mark">
            <img src="/assets/male-logo-dark.webp" alt="Wisdom" />
          </div>
          Wisdom
        </a>
        <MobileNavToggle />
        <ul className="nav-links">
          <li><a href="/#features">Features</a></li>
          <li><a href="/#how-it-works">How it works</a></li>
          <li><a href="/#topics">Topics</a></li>
          <li><a href="/blogs" className="active">Blog</a></li>
          <li>
            <a
              href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
              target="_blank"
              rel="noopener"
              className="btn-nav"
              data-mp-location="nav"
              >Download Free</a
            >
          </li>
        </ul>
      </div>
    </nav>

    <div className="breadcrumb">
      <div className="breadcrumb-inner">
        <a href="/">Wisdom</a>
        <span className="bc-sep">/</span>
        <a href="/blogs">Blog</a>
        <span className="bc-sep">/</span>
        Karma in the Gita
      </div>
    </div>

    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Topic Guide · Core Teaching
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Karma Doesn&apos;t Mean<br />
          <em>What You Think It Means</em>
        </h1>
        <p className="article-subtitle">
          Karma isn&apos;t a cosmic ledger. It&apos;s not &ldquo;what goes around comes around.&rdquo; Here&apos;s what the Bhagavad Gita actually teaches — harder, more honest, and more useful than the greeting-card version.
        </p>
        <div className="article-meta">
          <span className="meta-item">Topic Guide · Karma Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~5 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapters 2, 3 & 4</span>
        </div>
      </div>
    </div>

    <div className="content">
        <p className="lead">
            &ldquo;Karma will get them.&rdquo; &ldquo;Good vibes only, the universe is watching.&rdquo; &ldquo;What goes around comes around.&rdquo; These have become the modern meaning of karma. They describe a cosmic justice system — you put in goodness, the universe deposits goodness back. You do wrong, cosmic punishment arrives. But this is not what the Bhagavad Gita teaches. The word karma appears hundreds of times in the Gita, and almost never means cosmic ledger-keeping. It means action. Specifically, it means the action you perform and the consciousness you bring to it. The distinction matters. It changes everything about how you live.
        </p>
        <h2>The Literal Meaning: Karma Is Action</h2>
        <p>
            The word karma comes from the Sanskrit root kri, which means "to do." Karma is simply action — any action you perform with your body, your speech, or your mind. Walking is karma. Breathing is karma. Thinking a thought is karma. It is not inherently moral or immoral. It just is.
        </p>
        <p>
            The Gita's teaching on karma is not about actions coming back to haunt you from the cosmic ether. It is about understanding the actual relationship between the quality of your consciousness and the quality of your action, and how that relationship shapes your inner state and your life over time.
        </p>
        <p>
            This is both simpler and harder than the greeting card version. Simpler because there is no invisible accountant tracking your deeds. Harder because it means the responsibility is entirely yours. You cannot blame the universe for your circumstances. You can only look at what you have done, the consciousness with which you did it, and what that has created.
        </p>

        <h2>The Central Teaching: You Have a Right to Action, Not to Its Fruits</h2>
        <p>
            The Gita's most important statement about karma comes in Chapter 2, verse 47. This is the foundation of the entire Karma Yoga section. Read this verse slowly.
        </p>

        <div className="shloka-card">
            <div className="verse-number">Bhagavad Gita 2.47</div>
            <div className="sanskrit">कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।
मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥</div>
            <div className="transliteration">karmaṇyevādhikāraste mā phaleṣu kadācana |
mā karmaphalaheturbhūrmā te saṅgo'stvakarmaṇi ||</div>
            <div className="meaning">
                <div className="meaning-label">Translation</div>
                <div className="meaning-text">You have a right to perform your prescribed duties, but you are not entitled to the fruits. Never consider yourself the cause of the results, and never be attached to not doing your duty.</div>
            </div>
            <div className="insight">
                <div className="insight-label">What This Teaches</div>
                <div className="insight-text">This single verse contains four instructions. First: act. You have not just permission but duty to perform action. Second: don't claim the fruits. The result is not yours to own. Third: don't let the anticipated fruit be your motive. If you're doing something only for the reward, you're building dependence on an outcome you don't fully control. Fourth: don't use this teaching to justify inaction. "Detachment from results" is not the same as "don't bother." All four pieces together describe the actual practice.</div>
            </div>
            <div className="essence">Do your duty. Let go of the outcome. Both halves matter.</div>
        </div>

        <p>
            This teaching is radical because it inverts how most people think about action. Most people think: "I will do X in order to get Y." The motive is the fruit. If the fruit arrives, they feel successful. If it doesn't, they feel cheated, angry, or empty. And their entire sense of self-worth becomes dependent on whether the outcome materialized.
        </p>
        <p>
            The Gita says: perform the action fully, with complete care and attention and integrity. But do not let "getting the fruit" be the reason you are doing it. This is not complacency. It is the opposite. It is saying: act with total commitment, but measure your success by the quality of your action, not by whether things worked out the way you wanted.
        </p>

        <div className="highlight-box">
            <h3>Why Attachment to Results is the Problem</h3>
            <p>
                When the fruit becomes the motive, several psychological chains begin. First, you become willing to act differently depending on who is watching — your integrity shifts based on reward and punishment. Second, people can manipulate you through the things you want. Third, your inner peace depends on outcomes you cannot fully control. Fourth, when the outcome doesn't arrive, you don't just experience disappointment; you experience a sense of personal failure.
            </p>
            <p>
                The Gita's teaching interrupts all of this by shifting where you place your attention and your measure of success. Not "did I get what I wanted," but "did I act with integrity."
            </p>
        </div>

        <h2>Karma Yoga: Acting as Service, Not Transaction</h2>
        <p>
            Chapter 3 of the Gita is entirely devoted to Karma Yoga — the yoga of action. It offers a radically different framing of why we act.
        </p>

        <div className="shloka-card">
            <div className="verse-number">Bhagavad Gita 3.9</div>
            <div className="sanskrit">यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः ।
तदर्थं कर्म कौन्तेय मुक्तसंगः समाचर ॥</div>
            <div className="transliteration">yajñārthātkarmaṇo'nyatra loko'yaṃ karmabandhanaḥ |
tadarthaṃ karma kaunteya muktasaṃgaḥ samācara ||</div>
            <div className="meaning">
                <div className="meaning-label">Translation</div>
                <div className="meaning-text">Action done for any reason other than as a sacred offering (yajna) creates bondage in this world. Therefore, perform your duties as an offering, free from attachment, O Arjuna.</div>
            </div>
            <div className="insight">
                <div className="insight-label">What This Teaches</div>
                <div className="insight-text">The Gita's transformation of karma is not about what you do. It's about why. The exact same action — cooking a meal, writing code, teaching a class, caring for someone — binds you if done with ego-craving and frees you if done as an offering. What changes is the consciousness you bring to it. Yajna — usually translated as "sacrifice" or "sacred offering" — is the key. You're performing the action not for personal gain but as service to something larger.</div>
            </div>
            <div className="essence">Freedom comes from acting for a higher purpose, not personal gain.</div>
        </div>

        <p>
            This is the practical meaning of karma yoga. You are not renouncing the world. You are renouncing your demand to own the fruits. You do the action because it is your duty, because you see it as service, because it is the right thing to do. The quality of your life shifts not because circumstances change, but because you have shifted why you are acting.
        </p>

        <p className="pull-quote">
            The same action, performed with attachment to results, creates bondage. Performed as an offering, it creates freedom. The Gita is very clear: the difference is internal, not external.
        </p>

        <h2>Past Karma Isn't Fate</h2>
        <p>
            The Gita does acknowledge that actions have consequences. Past actions have created present circumstances. You are not born into a blank slate. The Gita has a concept of karma phalas — the fruits of past actions that work themselves out through your life.
        </p>
        <p>
            But here is the critical sentence: wisdom burns all karma. Not gradually. Not carefully. Completely.
        </p>

        <div className="shloka-card">
            <div className="verse-number">Bhagavad Gita 4.37</div>
            <div className="sanskrit">यथैधांसि समिद्धोऽग्निर्भस्मसात्कुरुतेऽर्जुन ।
ज्ञानाग्निः सर्वकर्माणि भस्मसात्कुरुते तथा ॥</div>
            <div className="transliteration">yathaidhāṃsi samiddho'gnirbhasmasātkurute'rjuna |
jñānāgniḥ sarvakarmāṇi bhasmasātkurute tathā ||</div>
            <div className="meaning">
                <div className="meaning-label">Translation</div>
                <div className="meaning-text">As a blazing fire reduces wood to ashes, the fire of knowledge reduces all karma to ashes, O Arjuna.</div>
            </div>
            <div className="insight">
                <div className="insight-label">What This Teaches</div>
                <div className="insight-text">This is the Gita's most important statement about past karma. It is not permanent. It is not fate. Understanding — genuine understanding of the nature of action and consciousness — burns it. The image is not of gradual dissolution but of fire consuming wood completely. This means: you are not locked into your past. Change of consciousness can alter the trajectory of your life.</div>
            </div>
            <div className="essence">Knowledge is the fire that burns away all karma.</div>
        </div>

        <p>
            This is why the Gita, written for a warrior in a moment of paralysis, is radically hopeful. Arjuna cannot undo the past. He cannot change the fact that he is on a battlefield about to fight his own family. But he can change his consciousness about what he is doing. And that change of consciousness is not just therapeutic — it is transformative. It alters what happens next.
        </p>

        <h2>So Karma Isn't About Punishment?</h2>
        <p>
            No. The Gita does not use karma as a cosmic punishment mechanism. It uses it as a description of the chain between intention, action, and consequence.
        </p>
        <p>
            When you act with attachment to a specific result, you create internal patterns that shape how you perceive the world. When you act with ego-craving, you become dependent on things you cannot control. When you perform an action with integrity, you build a quality of character that you can trust. These are not cosmic rewards. They are natural consequences of how consciousness works.
        </p>
        <p>
            The chain can be interrupted. The interruption point is not external. It is not "wait for the universe to fix this." It is your inner state. It is the consciousness you bring to action. It is the meaning you assign to what you are doing. Change that, and the entire trajectory shifts.
        </p>

        <div className="highlight-box">
            <h3>The Practical Meaning</h3>
            <p>
                If you're carrying regret about past actions, the Gita's teaching is: the wisdom you have now can transform that. Not erase it. Transform it. You learn something. You change how you act. That change doesn't just affect the future; it alters how you relate to the past.
            </p>
            <p>
                If you're anxious about whether your efforts will pay off, the Gita's teaching is: act fully, but release the demand to own the outcome. Your job is the quality of your action. The fruits are not your business.
            </p>
        </div>
    </div>

    <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
            <strong>What does karma actually mean?</strong>
            <p>
                Karma literally means "action" in Sanskrit. In the Bhagavad Gita, it refers to any action you perform — physical, verbal, or mental — and the consequences that flow from those actions. The Gita's teaching is not about cosmic justice or punishment, but about the quality of consciousness you bring to action and how that shapes your inner state over time.
            </p>
        </div>

        <div className="faq-item">
            <strong>What does the Bhagavad Gita say about karma?</strong>
            <p>
                The Gita's most important karma teaching is in verse 2.47: "You have a right to perform your prescribed duties, but not to the fruits of your actions." This is the foundation of karma yoga — not a cosmic ledger-keeping system, but a practice of acting without attachment to outcomes. The Gita says act fully, but don't let the anticipated fruit be your motive.
            </p>
        </div>

        <div className="faq-item">
            <strong>Does karma mean what goes around comes around?</strong>
            <p>
                Not in the Bhagavad Gita. That phrase describes rough cosmic justice — you get back what you give. The Gita's concept of karma is more internal: it's about the state of consciousness behind your actions, not a universe keeping score. The Gita does say actions have consequences, but it also says wisdom (jnana) can dissolve accumulated karma. You are not locked into your past.
            </p>
        </div>

        <div className="faq-item">
            <strong>What is karma yoga?</strong>
            <p>
                Karma yoga is the yoga of action — specifically, performing action as a form of service or sacred offering, without attachment to the results. It is not renouncing the world. It is renouncing your demand to own the fruits of your labor. You act fully, with integrity and care, but you release the need for a specific outcome. This practice is described in Chapter 3 as appropriate for people who are active in the world.
            </p>
        </div>

        <div className="faq-item">
            <strong>Can karma be changed or burned?</strong>
            <p>
                Yes. The Gita teaches in verse 4.37 that knowledge (jnana) burns all karma. Your past actions have consequences, but understanding — genuine understanding of the nature of action and consciousness — is said to dissolve even accumulated karma. This doesn't mean you erase the past; it means you transform your relationship to it and alter your trajectory moving forward.
            </p>
        </div>
    </div>

    {/* ── APP CTA ── */}
    <div className="app-cta">
        <div className="app-cta-eyebrow">Free iOS App</div>
        <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
        <p className="app-cta-desc">
            The Wisdom app delivers one Bhagavad Gita verse each day — Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
        </p>
        <div className="app-cta-features">
            <span>✦ Daily shloka in Sanskrit</span>
            <span>✦ Meaning & modern context</span>
            <span>✦ Home screen widget</span>
        </div>
        <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
           target="_blank" rel="noopener"
           className="app-cta-btn"
           data-mp-location="cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
            Download on the App Store
        </a>
        <div className="app-cta-sub">Free · iPhone · No account needed</div>
    </div>


    <footer>
        <p>© 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
    </footer>

    {/* Schema Markup */}
    

    

        {/* Mixpanel */}
    

      <BlogTracker pageName="Gita Karma Meaning" />
    </>
  )
}