import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "What the Bhagavad Gita Says About Anxiety, Stress & Mental Peace | Wisdom",
  description: "The Bhagavad Gita was written for a man in the middle of a panic attack. Here's what it actually says about anxiety, fear, and the path to mental peace \u2014 beyond the Instagram quotes.",
  keywords: "bhagavad gita anxiety, bhagavad gita mental peace, gita quotes for stress, bhagavad gita depression, what does gita say about worry, gita mental health, bhagavad gita peace of mind",
  openGraph: {
    title: "What the Bhagavad Gita Says About Anxiety, Stress & Mental Peace | Wisdom",
    description: "The Bhagavad Gita was written for a man in the middle of a panic attack. Here's what it actually says about anxiety, fear, and the path to mental peace.",
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
            content: "शान्ति";
            position: absolute;
            right: -10px;
            bottom: -30px;
            font-family: "Noto Sans Devanagari", serif;
            font-size: 200px;
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

        /* ── HERO IMAGE ── */
        .hero-image {
            position: relative;
            margin: 3rem 0 1rem;
            border-radius: 12px;
            overflow: hidden;
            border: 1px solid var(--gold-border);
            box-shadow: 0 12px 40px rgba(0, 0, 0, 0.5),
                        0 0 0 1px rgba(200, 136, 30, 0.08),
                        0 4px 24px rgba(200, 136, 30, 0.12);
        }
        .hero-image img { display: block; width: 100%; height: auto; }
        .hero-image::after {
            content: "";
            position: absolute;
            inset: 0;
            background: linear-gradient(180deg, rgba(18, 5, 5, 0) 55%, rgba(18, 5, 5, 0.55) 100%);
            pointer-events: none;
        }
        .hero-image-caption {
            font-family: 'Playfair Display', serif;
            font-style: italic;
            font-size: 0.9rem;
            color: var(--text-dimmer);
            text-align: center;
            margin-top: 0.85rem;
            margin-bottom: 2rem;
            letter-spacing: 0.02em;
        }

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
  "headline": "What the Bhagavad Gita Says About Anxiety, Stress & Mental Peace | Wisdom",
  "description": "The Bhagavad Gita was written for a man in the middle of a panic attack. Here's what it actually says about anxiety, fear, and the path to mental peace.",
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
      "name": "Does the Bhagavad Gita help with anxiety?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes — and not just as a collection of comforting quotes. The Gita was written for a man in the middle of what we would now call a panic attack. Its entire philosophical framework is designed specifically to address the mental states of fear, grief, confusion, and paralysis."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Gita say about mental peace?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "The Gita doesn't promise the absence of difficulty. It offers a different relationship to it. The teaching of 2.14 says sense-experiences are temporary; 2.56 describes a mind steady in sorrow; and 5.24 points to inner happiness as the source of genuine peace."
      }
    },
    {
      "@type": "Question",
      "name": "What does the Gita say about worry and overthinking?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Verses 2.62-2.63 describe the cascade: dwelling on an object leads to attachment, desire, anger, confusion, and collapse. The Gita's analysis is that anxiety begins at dwelling — what you allow your mind to turn toward."
      }
    }
  ]
}
]

export default function AnxietyMentalPeacePage() {
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
        Anxiety & Mental Peace
      </div>
    </div>

    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Topic Guide · Anxiety & Mental Health
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          The Bhagavad Gita Was Written for<br />
          <em>Someone Having a Breakdown</em>
        </h1>
        <p className="article-subtitle">
          Chapter 1 opens with the world&apos;s most famous panic attack. The Gita&apos;s teaching on anxiety isn&apos;t &ldquo;calm down&rdquo; — it&apos;s a complete diagnosis of how the spiral begins and where to interrupt it.
        </p>
        <div className="article-meta">
          <span className="meta-item">Topic Guide · Mental Health</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~6 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapters 1, 2 & 5</span>
        </div>
      </div>
    </div>

    <div className="content">
        <figure className="hero-image">
          <img
            src="/assets/chapter6.webp"
            alt="Krishna on the path of meditation and inner stillness — Bhagavad Gita Chapter 6"
            width={1200}
            height={800}
            loading="eager"
            fetchPriority="high"
          />
        </figure>
        <p className="hero-image-caption">Krishna takes Arjuna&apos;s trembling hands — the moment the Gita begins.</p>
        <p className="lead">
            Most people approach the Bhagavad Gita as spiritual wisdom — timeless, distant, comforting in a philosophical sort of way. But that&apos;s not what the Gita is. The Gita is a crisis management manual for someone in the middle of what we would now call a panic attack. Chapter 1 opens with a detailed clinical description of exactly that: shaking limbs, dry mouth, trembling bow, mind spinning, fear flooding the body. The Gita&apos;s entire philosophical apparatus was designed from the ground up to answer a man in that state. This is not metaphor. This is the foundation of the text.
        </p>
        <h2>What Arjuna's Breakdown Looks Like</h2>
        <p>
            When you read the opening chapter of the Bhagavad Gita — the Vishada Yoga, the "yoga of despair" — you are reading a 2,500-year-old description of an anxiety attack so precise it could serve as a clinical checklist today. Arjuna is standing on the battlefield of Kurukshetra, about to fight his own cousins in what will be the greatest war of the age. And something breaks in him.
        </p>
        <p>
            His words tumble out: "My limbs fail me, my mouth goes dry, my skin trembles, my hair stands on end, my bow slips from my hand, and my very mind seems to recoil." He tells Krishna that the thought of killing his own relatives makes him feel physically sick. He cannot do this. He will not do this. He would rather flee than stay.
        </p>
        <p>
            What Arjuna is describing is not cowardice. It is psychological shutdown. The body is in dysregulation: trembling, sweating, dry mouth, inability to hold objects, mind spinning. The mind is flooded with catastrophic thinking: "If I kill them, I will have destroyed my family, ruined the tradition, brought shame upon myself." And underneath it all, the foundational fear: "I cannot do what I am called to do."
        </p>
        <p>
            The genius of the Bhagavad Gita is that it does not dismiss this state. It does not tell Arjuna to "toughen up" or "be a man" or "think positive thoughts." Instead, it takes his mental crisis entirely seriously and then methodically rebuilds the framework through which he understands his situation.
        </p>

        <h2>The Gita's Diagnosis: How Anxiety Arises</h2>
        <p>
            The Gita's most precise analysis of how anxiety and psychological collapse actually happen is contained in verses 2.62-2.63. These two verses outline the entire cascade: from dwelling to attachment to desire to anger to confusion to lost memory to destroyed intelligence to complete disintegration.
        </p>

        <div className="shloka-card">
            <div className="verse-number">Bhagavad Gita 2.62-2.63</div>
            <div className="sanskrit">ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते ।
सङ्गात् संजायते कामः कामात्क्रोधोऽभिजायते ॥ २.६२ ॥
क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः ।
स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥ २.६३ ॥</div>
            <div className="transliteration">dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate |
saṅgāt saṃjāyate kāmaḥ kāmātkrodho'bhijāyate ||
krodhādbhavati saṃmohaḥ saṃmohātsmṛtivibhramaḥ |
smṛtibhraṃśād buddhināśo buddhināśātpraṇaśyati ||</div>
            <div className="meaning">
                <div className="meaning-label">Translation</div>
                <div className="meaning-text">From dwelling on sense objects arises attachment; from attachment arises desire; from desire arises anger. From anger comes delusion; from delusion, loss of memory; from loss of memory, destruction of intelligence; from the destruction of intelligence, one perishes.</div>
            </div>
            <div className="insight">
                <div className="insight-label">What This Teaches</div>
                <div className="insight-text">This is the Gita's cascade model of psychological collapse. Notice where it starts: not with an external event, not with the feeling of fear, but with what the mind dwells on. You dwell on something. Dwelling creates attachment. Attachment creates the need for a particular outcome (desire). When the outcome doesn't match what you want, you become angry. Anger clouds judgment. Loss of judgment means loss of sense. The spiral spirals. But here is the critical insight: the entry point is earlier than you think. You cannot always control your fear response in the moment. But you can control what you allow your mind to dwell on. That's the interruption point.</div>
            </div>
            <div className="essence">Guard what you dwell on — the anxiety cascade begins at thought, not at feeling.</div>
        </div>

        <p>
            What makes this analysis powerful is that it doesn't blame the anxiety itself. It traces the actual mechanism. Most people struggling with anxiety experience it as a sudden, irrational event: "I'm feeling anxious and I don't even know why." But the Gita traces it back further. The anxiety has a cause, and that cause is usually what you have been dwelling on, often unconsciously, for some time.
        </p>

        <h2>The Antidote: Endurance Without Suppression</h2>
        <p>
            The Gita does not offer to eliminate difficulty or fear. It offers something more useful: a way to bear it. This is the teaching of verse 2.14.
        </p>

        <div className="shloka-card">
            <div className="verse-number">Bhagavad Gita 2.14</div>
            <div className="sanskrit">मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः ।
आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥</div>
            <div className="transliteration">mātrāsparśāstu kaunteya śītoṣṇasukhaduḥkhadāḥ |
āgamāpāyino'nityāstāṃstitikṣasva bhārata ||</div>
            <div className="meaning">
                <div className="meaning-label">Translation</div>
                <div className="meaning-text">Sense contacts give rise to cold and heat, pleasure and pain. They come and go, O Arjuna — they are impermanent. Bear them patiently.</div>
            </div>
            <div className="insight">
                <div className="insight-label">What This Teaches</div>
                <div className="insight-text">The verse doesn't promise that pain won't come. It doesn't say positive thinking will erase difficulty. It says: sense experiences bring both pleasure and pain, and they are temporary. You will feel things you don't want to feel. The work is not to suppress them or argue with them, but to bear them with the recognition that they will pass. The word used is titiksha — often translated as patience, but more precisely, it means endurance. Not passivity. Not resignation. Active bearing.</div>
            </div>
            <div className="essence">Endure life's changing experiences with patience — they are temporary.</div>
        </div>

        <p>
            This is radically different from the popular wisdom of anxiety management. It is not "positive affirmations." It is not "reprogramming your thoughts." It is recognizing that some discomfort is simply part of being alive, and the work is learning to not add suffering on top of the discomfort through resistance, denial, or desperation to make it stop immediately.
        </p>

        <div className="highlight-box">
            <h3>The Time-Horizon Shift</h3>
            <p>
                One of the most practical effects of this teaching: when you deeply understand that the present anxiety is temporary, it changes your entire strategy. You stop trying to escape it (which usually deepens it). Instead, you learn to outlast it. You orient toward time rather than toward the immediate resolution. This alone can dissolve a significant portion of the suffering that anxiety creates.
            </p>
        </div>

        <h2>Equanimity Is Not Numbness</h2>
        <p>
            The next teaching defines what a mentally healthy person actually looks like. It's not someone who never feels anything. It's someone whose happiness doesn't depend on things working out perfectly.
        </p>

        <div className="shloka-card">
            <div className="verse-number">Bhagavad Gita 2.56</div>
            <div className="sanskrit">दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः ।
वीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥</div>
            <div className="transliteration">duḥkheṣvanudvignamanāḥ sukheṣu vigataspṛhaḥ |
vītarāgabhayakrodhaḥ sthitadhīrmunirucyate ||</div>
            <div className="meaning">
                <div className="meaning-label">Translation</div>
                <div className="meaning-text">One whose mind is not disturbed by suffering, who does not crave for pleasure, and who is free from attachment, fear, and anger — such a person is called a sage of steady mind.</div>
            </div>
            <div className="insight">
                <div className="insight-label">What This Teaches</div>
                <div className="insight-text">This verse contains three characteristics of the steadfast person: unshaken in suffering (which doesn't mean numb — it means present with it without panic), not desperately craving pleasure (which doesn't mean joyless — it means not grasping), and free from attachment/fear/anger. This is the Gita's portrait of genuine mental health. Not the absence of difficulty. The presence of steadiness in the face of it.</div>
            </div>
            <div className="essence">Steadiness in suffering, restraint in pleasure — this is the steady mind.</div>
        </div>

        <p>
            Notice what the verse does not say. It does not say "a sage has no negative feelings." It does not say "a steady mind never experiences pain." It says the sage is not disturbed, not destabilized, not fragmented by the experience. The experience can be there. The mind can remain whole.
        </p>

        <p className="pull-quote">
            This is the work of emotional regulation, not emotional absence. The Gita is not asking you to become a robot. It's asking you to become anchored in something that doesn't shift when circumstances do.
        </p>

        <h2>Where Peace Actually Lives</h2>
        <p>
            The most profound teaching about peace comes near the end of the Gita. In verses 5.21 and 5.24, Krishna describes where happiness actually exists. Most people are looking for it in the wrong place.
        </p>

        <div className="shloka-card">
            <div className="verse-number">Bhagavad Gita 5.24</div>
            <div className="sanskrit">योऽन्तःसुखोऽन्तरारामस्तथान्तर्ज्योतिरेव यः ।
स योगी ब्रह्मनिर्वाणं ब्रह्मभूतोऽधिगच्छति ॥</div>
            <div className="transliteration">yo'ntaḥsukho'ntarārāmastathāntarjyotireva yaḥ |
sa yogī brahmanirvāṇaṃ brahmabhūto'dhigacchati ||</div>
            <div className="meaning">
                <div className="meaning-label">Translation</div>
                <div className="meaning-text">One who finds happiness within, who is delighted within, who is illuminated within — that yogi attains brahma-nirvana, becoming Brahman.</div>
            </div>
            <div className="insight">
                <div className="insight-label">What This Teaches</div>
                <div className="insight-text">Three times in this verse, Krishna uses the word "antar" — within, inside. The happiness you are searching for outside — in outcomes, in approval, in financial security, in the perfect relationship — is not located outside. It's located inside. The anxiety comes from looking for stability in places that are inherently unstable. Your outcomes change. Other people's approval changes. Money comes and goes. But there is something within you that is not trembling. The work is learning to locate it.</div>
            </div>
            <div className="essence">The happiness you seek outside is already inside — it was never anywhere else.</div>
        </div>

        <p>
            This is not naive idealism. This is not saying that external conditions don't matter. It is saying that the fundamental peace you are after — the peace that actually allows you to handle difficult circumstances — is not found by fixing all external circumstances. It's found by recognizing that there is a part of you that is not destabilized by what happens. That part is what the Gita keeps pointing toward.
        </p>

        <h2>The Practice: One Verse at a Time</h2>
        <p>
            The Gita's teaching on anxiety is not meant to be read once and then filed away. It's meant to be lived with, returned to again and again, allowed to work on you over time. This is why the structure of one verse per day is so powerful. Each morning, a single shloka sits with you all day. You read it while you are calm. Then, when anxiety arises, you remember it. Not as an intellectual idea, but as something that has already become part of how you think.
        </p>

        <p>
            The verses on dwelling (2.62-63), on endurance (2.14), on steadiness (2.56), and on inner peace (5.24) are not theoretical knowledge. They are practical maps for what to do when the mind starts to spiral. They name the process so that you can recognize it. They offer a different way to relate to what you're experiencing.
        </p>
    </div>

    <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
            <strong>Does the Bhagavad Gita help with anxiety?</strong>
            <p>
                Yes — and not just as a collection of comforting quotes. The Gita was written for a man in the middle of what we would now call a panic attack. Its entire philosophical framework is designed specifically to address the mental states of fear, grief, confusion, and paralysis. Verses 2.14, 2.56, 2.62-63, and 5.24 are particularly direct in their treatment of how anxiety arises and how to work with it.
            </p>
        </div>

        <div className="faq-item">
            <strong>What does the Gita say about mental peace?</strong>
            <p>
                The Gita doesn't promise the absence of difficulty. It offers a different relationship to it. The teaching of 2.14 says sense-experiences are temporary; 2.56 describes a mind steady in sorrow and restrained in pleasure; and 5.24 points to inner happiness (antah-sukha) as the source of genuine peace — not external conditions. The peace the Gita points to is built on a shift in where you're looking for stability.
            </p>
        </div>

        <div className="faq-item">
            <strong>What does the Gita say about worry and overthinking?</strong>
            <p>
                Verses 2.62-2.63 describe the cascade: dwelling on an object → attachment → desire → anger → confusion → loss of judgment → collapse. The Gita's analysis of overthinking is that it begins at dwelling — what you consistently turn your attention toward. Managing anxiety in the Gita's framework means managing attention first, and working with emotion second. It's about interrupting the spiral at its origin point.
            </p>
        </div>

        <div className="faq-item">
            <strong>Is the Bhagavad Gita good for depression?</strong>
            <p>
                The Gita addresses depressive thinking patterns, particularly the sense of hopelessness and paralysis that Arjuna experiences. While the Gita is philosophical and not a substitute for professional mental health care, its teachings on duty, equanimity, and the eternal nature of the self have resonated with people experiencing depression for centuries. Many find that returning to one verse at a time gives the mind a different framework to work with.
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
    

      <BlogTracker pageName="Gita Anxiety Mental Peace" />
    </>
  )
}