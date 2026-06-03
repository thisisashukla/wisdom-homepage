import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'

export const metadata: Metadata = {
  title: "Beyond the Bhagavad Gita: Best Quotes on Mental & Spiritual Health from 7 Lesser-Known Gitas | Wisdom",
  description: "The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each carry profound wisdom for mental and spiritual health that most people have never encountered.",
  keywords: "ashtavakra gita quotes, avadhuta gita mental health, ram gita teachings, hans gita philosophy, shakti gita quotes, shambhu gita wisdom, vishnu gita quotes, lesser known gitas, gitas besides bhagavad gita, other gitas mental peace, spiritual health gita quotes",
  openGraph: {
    title: "Beyond the Bhagavad Gita: Best Quotes on Mental & Spiritual Health from 7 Lesser-Known Gitas | Wisdom",
    description: "The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each carry profound wisdom for mental and spiritual health.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health",
    siteName: 'Wisdom',
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health" },
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

        * { margin: 0; padding: 0; box-sizing: border-box; }

        body {
            background: var(--bg);
            color: var(--text);
            font-family: 'Inter', sans-serif;
            line-height: 1.7;
            font-size: 16px;
        }

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
        .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; text-decoration: none; }
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
            content: "गीता";
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
            max-width: 680px;
        }
        .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
        .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
        .meta-sep { color: var(--border); }

        /* CHAPTER IMAGE */
        .chapter-image {
            margin: 32px 0 36px;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid var(--border);
            box-shadow: 0 4px 32px rgba(0,0,0,0.4);
        }
        .chapter-image img {
            width: 100%;
            height: auto;
            display: block;
            object-fit: cover;
        }
        .chapter-image figcaption {
            padding: 10px 18px;
            background: var(--bg-card);
            font-size: 11.5px;
            color: var(--text-dimmer);
            letter-spacing: 0.04em;
            font-style: italic;
            border-top: 1px solid var(--border);
        }

        /* ── CONTENT ── */
        .content {
            max-width: var(--max);
            margin: 0 auto;
            padding: 0 2rem 4rem;
        }

        .lead {
            font-size: 1.1rem;
            color: var(--text-dim);
            margin-bottom: 2rem;
            line-height: 1.8;
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

        p { margin-bottom: 1.5rem; color: var(--text-dim); }

        /* Gita Section Header */
        .gita-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 3rem 0 1.5rem;
        }
        .gita-badge {
            display: inline-flex;
            align-items: center;
            background: rgba(200,136,30,0.12);
            border: 1px solid rgba(200,136,30,0.35);
            color: var(--gold-light);
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.14em;
            text-transform: uppercase;
            padding: 5px 14px;
            border-radius: 20px;
            white-space: nowrap;
        }
        .gita-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            font-weight: 700;
            color: var(--gold);
            border-bottom: 2px solid var(--gold-dim);
            padding-bottom: 0.75rem;
            flex: 1;
            margin: 0;
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
        .shloka-card:hover { background: var(--bg-card-hover); }
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
        .shloka-card .meaning-text { color: var(--text); line-height: 1.7; }
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
        .shloka-card .insight-text { color: var(--text-dim); line-height: 1.7; font-size: 0.95rem; }
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
        .highlight-box h3 { color: var(--gold); margin-top: 0; }
        .highlight-box p { color: var(--text); margin-bottom: 0.75rem; }
        .highlight-box p:last-child { margin-bottom: 0; }

        /* Gita index */
        .gita-index {
            background: var(--bg-card);
            border: 1px solid var(--gold-dim);
            border-radius: 8px;
            padding: 1.5rem 2rem;
            margin: 2rem 0;
        }
        .gita-index h3 {
            color: var(--gold);
            margin-top: 0;
            margin-bottom: 1rem;
            font-size: 1rem;
            text-transform: uppercase;
            letter-spacing: 0.08em;
        }
        .gita-index ol { list-style: none; padding: 0; counter-reset: gita-counter; }
        .gita-index ol li {
            counter-increment: gita-counter;
            display: flex;
            align-items: baseline;
            gap: 0.75rem;
            padding: 0.5rem 0;
            border-bottom: 1px solid var(--border);
            color: var(--text-dim);
            font-size: 0.95rem;
        }
        .gita-index ol li:last-child { border-bottom: none; }
        .gita-index ol li::before {
            content: counter(gita-counter);
            color: var(--gold);
            font-weight: 700;
            font-size: 0.8rem;
            min-width: 1.2rem;
        }
        .gita-index ol li strong { color: var(--text); }

        /* FAQ */
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
        .faq-item:last-child { border-bottom: none; }
        .faq-item strong { color: var(--gold-light); font-size: 1.05rem; }
        .faq-item p { margin-top: 0.75rem; }

        /* App CTA */
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
        .app-cta-features span { font-size: 13px; color: var(--gold-light); opacity: 0.8; }
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
        footer a { color: var(--gold); text-decoration: none; }
        footer a:hover { text-decoration: underline; }

        @media (max-width: 768px) {
            .article-hero { padding: 44px 20px 40px; }
            h2 { font-size: 1.5rem; }
            .gita-title { font-size: 1.35rem; }
            .app-cta { padding: 32px 24px 28px; }
        }
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Beyond the Bhagavad Gita: Best Quotes on Mental & Spiritual Health from 7 Lesser-Known Gitas",
    "description": "The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each carry profound wisdom for mental and spiritual health.",
    "datePublished": "2026-05-20",
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": ["https://www.linkedin.com/in/thisisashukla/", "https://x.com/thisisashukla"]
    },
    "publisher": { "@type": "Organization", "name": "Wisdom App", "url": "https://wisdomquotes.in" }
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the Ashtavakra Gita and how is it different from the Bhagavad Gita?", "acceptedAnswer": { "@type": "Answer", "text": "The Ashtavakra Gita is a dialogue between the sage Ashtavakra and King Janaka. Unlike the Bhagavad Gita, it is entirely focused on one teaching: you are pure awareness, not the body-mind system. It is often described as the most radical non-dual text in the Indian tradition." } },
      { "@type": "Question", "name": "What is the Avadhuta Gita about?", "acceptedAnswer": { "@type": "Answer", "text": "The Avadhuta Gita is attributed to Dattatreya and is a first-person declaration of liberation. Its recurring refrain — 'I am the nectar of wisdom, steady and like the sky' — is one of the most psychologically impactful lines in Sanskrit literature." } },
      { "@type": "Question", "name": "What does the Ram Gita say about fear and mental peace?", "acceptedAnswer": { "@type": "Answer", "text": "The Ram Gita says fear and sorrow are embedded in the beginning, middle, and end of worldly existence. Rama's solution is to turn inward: recognizing the true self as the witness of intellect, separate from and undisturbed by its fluctuations." } },
      { "@type": "Question", "name": "How many Gitas are there in Hindu philosophy?", "acceptedAnswer": { "@type": "Answer", "text": "The tradition contains dozens of texts called 'Gita.' The Bhagavad Gita is the most widely known, but others include the Ashtavakra Gita, Avadhuta Gita, Uddhava Gita, Ram Gita, Hans Gita, Guru Gita, Shakti Gita, Shambhu Gita, Vishnu Gita, Ribhu Gita, and many more." } },
      { "@type": "Question", "name": "Are the lesser-known Gitas good for mental health?", "acceptedAnswer": { "@type": "Answer", "text": "Yes. The Ashtavakra Gita's teaching on the witness-self speaks to anxiety and self-criticism. The Avadhuta Gita addresses depressive identification. The Hans Gita is the tradition's clearest teaching on anger regulation. The Vishnu Gita's verse on craving and aversion maps closely onto modern ACT therapy." } },
      { "@type": "Question", "name": "Where can I read the Ashtavakra Gita in English?", "acceptedAnswer": { "@type": "Answer", "text": "John Richards' translation is freely available online and widely read. Thomas Byrom's rendering, 'The Heart of Awareness,' is more poetic. Swami Nityaswarupananda's commentary edition is thorough for deeper study." } }
    ]
  }
]

export default function BeyondBhagavadGitaPage() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Wisdom</a>
          <span className="bc-sep">/</span>
          <a href="/blogs">Blog</a>
          <span className="bc-sep">/</span>
          Beyond the Bhagavad Gita
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Topic Guide · 7 Gitas · Mental &amp; Spiritual Health
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Beyond the Bhagavad Gita:<br />
            <em>7 Lesser-Known Gitas on Inner Peace</em>
          </h1>
          <p className="article-subtitle">
            The Bhagavad Gita is one voice in a vast chorus. The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each carry their own profound wisdom for mental and spiritual health. Most people have never read a word of them.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Topic Guide · 7 Gitas</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~12 min read</span>
          </div>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/gitas.webp"
            alt="The many Gitas of Hindu philosophy — Sanskrit wisdom texts beyond the Bhagavad Gita"
            width={1200}
            height={800}
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>The Bhagavad Gita is one voice in a vast chorus of Gitas.</figcaption>
        </figure>

        <p className="lead">
          Most people who turn to Indian scripture for mental peace start and end with the Bhagavad Gita. That is understandable, and limiting. The Sanskrit philosophical tradition contains at least a dozen distinct texts called &ldquo;Gita&rdquo; (songs of wisdom) each addressed to a different kind of seeker, each with its own angle on the most pressing questions: how to find peace, how to bear suffering, how to know yourself, and how to stop being controlled by fear and desire. This is a reading of seven of them.
        </p>

        <div className="gita-index">
          <h3>Gitas in this article</h3>
          <ol>
            <li><strong>Ashtavakra Gita</strong>: the radical teaching on pure awareness and identity</li>
            <li><strong>Avadhuta Gita</strong>: the song of the liberated sage beyond all convention</li>
            <li><strong>Ram Gita</strong>: Rama&apos;s teaching on the witness-self and liberation through knowledge</li>
            <li><strong>Hans Gita</strong>: the divine swan&apos;s teaching on anger, tolerance, and inner strength</li>
            <li><strong>Shakti Gita</strong>: the Goddess&apos;s teaching on consciousness in motion and stillness</li>
            <li><strong>Shambhu Gita</strong>: Shiva&apos;s instruction on dissolving fear at its very root</li>
            <li><strong>Vishnu Gita</strong>: Vishnu&apos;s exposition on ignorance, fear, and freedom from the senses</li>
          </ol>
        </div>

        <p>
          None of these texts require you to be a Sanskrit scholar. What they share, and what makes them relevant to modern mental and spiritual health, is a relentless focus on the inner workings of the mind: how suffering arises, where fear comes from, why we are not identical to our thoughts and moods, and what it would feel like to be genuinely free.
        </p>

        {/* ── ASHTAVAKRA GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">1 of 7</span>
          <h2 className="gita-title">Ashtavakra Gita, You Are the Witness, Not the Witnessed</h2>
        </div>

        <p>
          The Ashtavakra Gita is possibly the most psychologically direct text in the entire Indian tradition. It has no mythology, no ritual, and very little metaphor. It is a dialogue between the sage Ashtavakra and King Janaka, and its central argument is simple and total: you are not your body, not your mind, not your emotions, not your social role. You are the awareness that witnesses all of these. Recognizing this is not a spiritual achievement. It is the end of the search.
        </p>
        <p>
          For mental health, this teaching has a very specific implication. The anxiety you feel is real. The grief is real. But you are not identical to them. There is a part of you that watches these states arise and pass, and that part has never been wounded.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Ashtavakra Gita 1.5</div>
          <div className="sanskrit">न त्वं विप्रादिको वर्णो नाश्रमी नाक्षगोचरः ।{'\n'}असङ्गोऽसि निराकारो विश्वसाक्षी सुखी भव ॥</div>
          <div className="transliteration">na tvaṃ viprādiko varṇo nāśramī nākṣagocaraḥ |{'\n'}asaṅgo&apos;si nirākāro viśvasākṣī sukhī bhava ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">You are not any caste or stage of life. You are not perceived by the senses. You are unattached, formless, the witness of the entire universe. Knowing this, be happy.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">Every identity label (profession, status, age, personality type) is something you witness. None of it is the witness itself. Ashtavakra doesn&apos;t ask you to improve your identity or upgrade your self-image. He asks you to step back from all of it and recognize what&apos;s doing the witnessing. That recognition, he says, is happiness itself, not a reward for achieving it, but the natural state of awareness knowing itself.</div>
          </div>
          <div className="essence">You witness the universe. No label can contain the witness.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Ashtavakra Gita 1.17</div>
          <div className="sanskrit">निरपेक्षो निर्विकारो निर्भरः शीतलाशयः ।{'\n'}अगाधबुद्धिरक्षुब्धो भव चिन्मात्रवासनः ॥</div>
          <div className="transliteration">nirapekṣo nirvikāro nirbharaḥ śītalāśayaḥ |{'\n'}agādhabuddhirakṣubdho bhava cinmātravāsanaḥ ||</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Be without expectation, without modification, self-sufficient, with a cool heart. Be of unfathomable intelligence, undisturbed, established in pure awareness alone.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">This verse is the Ashtavakra Gita&apos;s compressed portrait of inner health: no expectations from the world, no reactive modifications, self-complete, cool-hearted, of unfathomable depth, undisturbed. The goal isn&apos;t emotional peak performance. It&apos;s a baseline so stable that experiences arise and pass through it without shattering it.</div>
          </div>
          <div className="essence">Coolness, depth, undisturbed awareness: these are one thing, not many.</div>
        </div>

        {/* ── AVADHUTA GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">2 of 7</span>
          <h2 className="gita-title">Avadhuta Gita, You Are Not Your Pain</h2>
        </div>

        <p>
          The Avadhuta Gita is attributed to Dattatreya, the wandering sage who lived beyond all social convention. Where the Ashtavakra Gita is a structured dialogue, the Avadhuta Gita is more like a declaration, a statement of what it is like to see clearly when all the conditioning has fallen away. It speaks in the first person: &ldquo;I am not this. I am not that. I am the nectar of wisdom, pure and like the sky.&rdquo;
        </p>
        <p>
          For people in the grip of depression, anxiety, grief, or persistent self-criticism, this text offers something unusual: not advice, but a mirror held up to a different possibility of being. You are not the suffering. You are not the mind that keeps recycling it. Something in you has remained untouched.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Avadhuta Gita 3.15</div>
          <div className="sanskrit">सन्तापदुःखजनको न विधिः कदाचित्{'\n'}सन्तापयोगजनितं न मनः कदाचित् ।{'\n'}यस्मादहङ्कृतिरियं न च मे कदाचित्{'\n'}ज्ञानामृतं समरसं गगनोपमोऽहम् ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">I am not fate that causes suffering, nor the mind born from suffering; this ego is not mine. I am the nectar of wisdom, steady and like the sky.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">Dattatreya strips away three things people typically identify with during psychological suffering: the circumstances that caused the pain, the mind that keeps reliving it, and the ego that makes it feel personal. What remains? &ldquo;Gyanamritam&rdquo;: the nectar of wisdom, steady, unchanging, vast as the sky. This is not spiritual bypassing. It is pointing to a part of you that, regardless of what you have been through, has not been destroyed by it.</div>
          </div>
          <div className="essence">You are the steady, unifying wisdom beyond pain, mind, and ego.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Avadhuta Gita 3.34</div>
          <div className="sanskrit">किं नाम रोदिषि सखे न जरा न मृत्युः{'\n'}किं नाम रोदिषि सखे न च जन्म दुःखम् ।{'\n'}किं नाम रोदिषि सखे न च ते विकारो{'\n'}ज्ञानामृतं समरसं गगनोपमोऽहम् ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Why do you weep, friend? You have no old age, no death, no birth, no suffering, no faults. I am the nectar of wisdom, pure and like the infinite sky beyond all.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">The opening question, &ldquo;why do you weep?&rdquo;, is not dismissive. It is genuinely curious. Dattatreya isn&apos;t telling you your grief is wrong. He is pointing to a deeper question: what part of you is crying, and is that part actually who you are? The list of things you don&apos;t have (old age, death, birth, suffering, flaws) is a claim about what your true nature actually is, underneath the biographical story the mind keeps running.</div>
          </div>
          <div className="essence">You are timeless wisdom, untouched by birth, death, or suffering.</div>
        </div>

        <p className="pull-quote">
          &ldquo;Why do you weep, friend?&rdquo; The Avadhuta Gita isn&apos;t dismissing your grief. It&apos;s asking you which part of you is actually suffering. The answer might surprise you.
        </p>

        {/* ── RAM GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">3 of 7</span>
          <h2 className="gita-title">Ram Gita, Fear Is Not in the World, It&apos;s in Misunderstanding It</h2>
        </div>

        <p>
          The Ram Gita appears in the Adhyatma Ramayana. It is the teaching that Rama gives to Lakshmana before the final battle with Ravana. Unlike the battlefield setting of the Bhagavad Gita, this context is quieter: a brother sitting with his brother, asking to understand the nature of reality before the great struggle begins.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Ram Gita · Verse 55</div>
          <div className="sanskrit">आदौ च मध्ये च तथैव चान्ततो भवं विदित्वा भयशोककारणम् ।{'\n'}हित्वा समस्तं विधिवादचोदितं भजेत्स्वमात्मानमथाखिलात्मनाम् ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Knowing that fear and sorrow are the cause of the world&apos;s beginning, middle, and end, abandon all prescribed external actions and worship your own inner being as the true self of all beings.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">Rama says fear and sorrow are not problems that appear occasionally in an otherwise comfortable world. They are the texture of worldly existence itself: at the beginning, in the middle, and at the end. Once you accept this, you stop being surprised by suffering and start doing the only thing that actually works: turning inward. Not as an escape from the world, but as the only source of stability that isn&apos;t subject to the world&apos;s constant change.</div>
          </div>
          <div className="essence">Fear and sorrow underlie all of existence; true refuge is devotion to your own inner self.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Ram Gita · Verse 40</div>
          <div className="sanskrit">अनाद्यविद्योद्भवबुद्धिबिम्बितो जीवप्रकाशोऽयमितीर्यते चितः ।{'\n'}आत्माधियः साक्षितया पृथक्स्थितो बुध्द्यापरिच्छिन्नपरः स एव हि ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">The living being is the light of consciousness reflected in intellect born from beginningless ignorance; the true self is separate from intellect as its witness and beyond its distinctions.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">Overthinking, rumination, the restless loop of &ldquo;what if&rdquo; and &ldquo;why did I&rdquo;: all of this belongs to the intellect. And the intellect, Rama says, is like a mirror reflecting consciousness, not consciousness itself. Your true self is the witness watching the intellect, not the intellect itself. When you identify with the thoughts instead of the witness, every swing of the mind feels like a swing in who you are. When you recognize the witness, you find something that doesn&apos;t swing.</div>
          </div>
          <div className="essence">Your true self is the unchanging watcher beyond intellect and its illusions.</div>
        </div>

        {/* ── HANS GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">4 of 7</span>
          <h2 className="gita-title">Hans Gita, The Strength That Doesn&apos;t React</h2>
        </div>

        <p>
          The Hans Gita (Hamsa Gita) is a discourse found in the Shanti Parva of the Mahabharata, where the divine swan (a symbol of discernment and purity) instructs on virtue, wisdom, and the qualities of those who have truly cultivated their inner life. Its focus is intensely practical: how does a person with real inner development actually behave when provoked, attacked, or tested?
        </p>

        <div className="shloka-card">
          <div className="verse-number">Hans Gita · Verse 10</div>
          <div className="sanskrit">परश्चेदेनमति वादबानैर्भृशं विध्येच्छम एवेह कार्यः ।{'\n'}संरोष्यमाणः प्रतिहृष्यते यः स आदत्ते सुकृतं वै परस्य ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">If others fiercely attack the wise person with harsh words like arrows, he remains calm. One who stays inwardly pleased despite another&apos;s anger inherits that person&apos;s goodness.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">What this verse describes is the capacity to remain internally stable when attacked, not numb, not suppressed, but genuinely at rest. The person who cannot do this will have their day wrecked by every difficult interaction. The person who can do this is carrying something that external events cannot easily disturb.</div>
          </div>
          <div className="essence">Calmness in the face of harsh attack transforms others&apos; anger into your own good.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Hans Gita · Verse 15</div>
          <div className="sanskrit">अक्रोधनः क्रुध्यतां वै विशिष्टस्तथा तितिक्षुरतितिक्षोर्विशिष्टः ।{'\n'}अमानुषान्मानुषो वै विशिष्टस् तथा ज्ञानाज्ज्ञानवान्वै प्रधानः ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">A person who does not get angry at angry people is superior. The tolerant one surpasses the intolerant. Among all beings, the human is distinguished by the capacity for wisdom, and among humans, the wise surpass the ignorant.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">The Hans Gita presents a hierarchy not of status but of inner capacity. The highest rung isn&apos;t wealth, power, or intelligence. It&apos;s the person who can stay calm when others are not. This is what anger management traditions, modern therapeutic frameworks, and cognitive-behavioral approaches converge on: the ability to regulate your own response instead of being governed by the other person&apos;s state.</div>
          </div>
          <div className="essence">True superiority lies in calmness amid anger and wisdom over ignorance.</div>
        </div>

        <div className="highlight-box">
          <h3>What the Hans Gita Says About Anger</h3>
          <p>
            The text treats anger not as evil but as a test of inner development. Those who respond to anger with more anger are at one level. Those who can bear it without being consumed by it are at another. The text doesn&apos;t moralize. It simply describes what is true about inner life: reactivity is a sign that you are not yet stable in yourself. Stability grows through practice, not through suppression.
          </p>
        </div>

        {/* ── SHAKTI GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">5 of 7</span>
          <h2 className="gita-title">Shakti Gita, Consciousness Is Both the Movement and the Stillness</h2>
        </div>

        <p>
          The Shakti Gita is the Goddess&apos;s own teaching. It appears within the Devi Bhagavata Purana and presents a vision of divinity entirely woven into every form of existence. Its core insight for mental health is about integration: the recognition that the energy in your restlessness and the stability in your stillness are not opposites. They are two expressions of the same consciousness.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Shakti Gita 1.80</div>
          <div className="sanskrit">कार्यब्रह्मस्वरूपेत्र विश्वास्मिन जङ्गमे मम ।{'\n'}वर्त्तते चिद्विलासस्तु स्थावरे सद्विलासिता ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">In this universe shaped as the active and the supreme, my conscious play exists in all that moves, and my true presence in all that is still.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">The Goddess is saying she is in both: the movement and the stillness, the activity and the rest. We often frame inner peace as the absence of activity: you will be well when the anxious thoughts stop, when life calms down. The Shakti Gita suggests something different: the consciousness that animates your busiest, most scattered day is the same consciousness present in your most peaceful moment. Recognizing this dissolves the internal war between how you are and how you think you should be.</div>
          </div>
          <div className="essence">True self is present as conscious energy in movement and stable presence in stillness.</div>
        </div>

        {/* ── SHAMBHU GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">6 of 7</span>
          <h2 className="gita-title">Shambhu Gita, Fear Dissolves at Its Own Root</h2>
        </div>

        <p>
          The Shambhu Gita is Shiva&apos;s teaching, found within the Skanda Purana. Shiva, as the lord of dissolution and liberation, speaks about what happens to inner obstacles (particularly fear and desire) when genuine liberation is approached. His teaching is precise on what happens to psychological suffering at its deepest level.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Shambhu Gita 6.135</div>
          <div className="sanskrit">भयमैथुनरूपिण्यो जीवन्मुक्तौ घटत्तयः ।{'\n'}राजसिक्यो विलीयन्ते स्वीयेषु कारणेवलम् ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">In the liberated being, the fear and passion-like rajasic tendencies dissolve completely, merging back into their own source.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">Shiva does not describe fear as something to be overcome through effort or willpower. He describes it as something that dissolves naturally, by returning to its own origin. Suppressing fear doesn&apos;t dissolve it; it pressurizes it. Fighting fear often intensifies it. Shiva&apos;s teaching points toward something different: when you trace fear back to where it arises in you, rather than endlessly reacting to it in the world, it loses its grip. The source of fear, when seen clearly, cannot maintain its power.</div>
          </div>
          <div className="essence">Fears and desires vanish by dissolving naturally into their own origin in liberation.</div>
        </div>

        <p className="pull-quote">
          Shiva&apos;s teaching on fear isn&apos;t about overcoming it through courage. It&apos;s about following it back to where it arises, and finding that at its source, it cannot sustain itself.
        </p>

        {/* ── VISHNU GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">7 of 7</span>
          <h2 className="gita-title">Vishnu Gita, Ignorance Is the Cause; Clarity Is the Cure</h2>
        </div>

        <p>
          The Vishnu Gita appears within the Mahabharata&apos;s Shanti Parva as Vishnu&apos;s direct teaching on the nature of suffering, liberation, and how the senses bind the mind. It is particularly relevant for those caught in cycles of craving and aversion (wanting certain outcomes desperately, pushing others away) who find that this push and pull is the very engine of their anxiety.
        </p>

        <div className="shloka-card">
          <div className="verse-number">Vishnu Gita 1.75</div>
          <div className="sanskrit">अज्ञानदेव भीतीनामुत्पत्तिजायते सुरा : ।{'\n'}अज्ञानमेव जन्तूनां हेतुस्तापत्रयस्य वै ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">O divine beings, ignorance alone gives rise to fear. Ignorance alone is the cause of the threefold suffering.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">Vishnu names ignorance (not circumstance, not bad luck, not other people) as the root of fear and suffering. This is not fatalistic. It is liberating: if ignorance is the cause, then clarity is the cure. Every genuine moment of self-understanding is not just intellectually satisfying. It is actively therapeutic.</div>
          </div>
          <div className="essence">Fear and suffering arise only from ignorance, not from reality itself.</div>
        </div>

        <div className="shloka-card">
          <div className="verse-number">Vishnu Gita 4.76</div>
          <div className="sanskrit">इन्द्रियम्येन्द्रियस्यार्थे रागद्वेषौ व्यवस्थितौ ।{'\n'}तयोर्न वशमागच्छेत्तौ ह्यस्य परिपन्थिनौ ॥</div>
          <div className="meaning">
            <div className="meaning-label">Translation</div>
            <div className="meaning-text">Every sense has attachment for its own objects and aversion for the opposite. One should not be controlled by either, for these two are the obstacles of one who seeks freedom.</div>
          </div>
          <div className="insight">
            <div className="insight-label">Why This Matters for Mental Health</div>
            <div className="insight-text">Vishnu is precise: the issue is not your senses, not pleasure, not pain. The issue is being controlled by the pull of craving and the push of aversion. This is almost exactly what modern ACT (Acceptance and Commitment Therapy) describes as psychological inflexibility, the state of being governed by emotional reactions rather than freely choosing your response. Craving and aversion are called &ldquo;paripanthi&rdquo;: obstacles, enemies of freedom.</div>
          </div>
          <div className="essence">Refusing to be controlled by attraction or aversion frees your movement and choice.</div>
        </div>

        <h2>What All These Gitas Share</h2>
        <p>
          Across seven different texts, from seven different sages, addressing seven different audiences, the same insight appears in different forms. The cause of mental suffering is misidentification: taking yourself to be your circumstances, your mood, your social role, your thoughts, your fears. The relief from suffering begins with recognizing something in you that none of these things have touched.
        </p>
        <p>
          This is not the same as saying your circumstances don&apos;t matter. The Ram Gita explicitly acknowledges that fear and sorrow are woven into the structure of worldly existence. The Avadhuta Gita doesn&apos;t say you haven&apos;t suffered. The Hans Gita doesn&apos;t say anger isn&apos;t real. What all of them point toward is a distinction: between the part of you that is in pain and the part of you that can witness the pain without being destroyed by it.
        </p>

        <div className="highlight-box">
          <h3>One Verse Per Day</h3>
          <p>
            These texts are not meant to be read once and understood. They are meant to be lived with. One verse a day, read slowly, sat with, carried through an ordinary day, allows the teachings to work on you in the way they were designed to. Not as intellectual content but as a lens through which experience gradually looks different.
          </p>
          <p>
            The Wisdom app delivers one verse from the Bhagavad Gita each morning: Sanskrit, transliteration, meaning, and modern relevance. It&apos;s a beginning. These other Gitas are waiting for you.
          </p>
        </div>
      </div>

      {/* FAQ */}
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is the Ashtavakra Gita and how is it different from the Bhagavad Gita?</strong>
          <p>The Ashtavakra Gita is a dialogue between the sage Ashtavakra and King Janaka. Unlike the Bhagavad Gita (which covers duty, action, and devotion) the Ashtavakra Gita is entirely focused on one teaching: you are pure awareness, not the body-mind system. It has no mythology, no ritual, and no gradual path. It is often described as the most radical non-dual text in the Indian tradition.</p>
        </div>

        <div className="faq-item">
          <strong>What is the Avadhuta Gita about?</strong>
          <p>The Avadhuta Gita is attributed to Dattatreya. An &ldquo;avadhuta&rdquo; is a person who has renounced all social conventions and lives beyond prescribed roles. The Gita is Dattatreya&apos;s song of liberation, a first-person declaration of what it is like to be free from identification with the mind, ego, and circumstances. Its recurring refrain, &ldquo;I am the nectar of wisdom, steady and like the sky,&rdquo; is one of the most psychologically impactful lines in Sanskrit literature.</p>
        </div>

        <div className="faq-item">
          <strong>What does the Ram Gita say about fear and mental peace?</strong>
          <p>The Ram Gita is Rama&apos;s teaching to Lakshmana in the Adhyatma Ramayana. Rama says explicitly that fear and sorrow are embedded in the beginning, middle, and end of worldly existence. His solution is not more action or better strategy but turning inward: recognizing the true self as the witness of intellect, separate from and undisturbed by its fluctuations.</p>
        </div>

        <div className="faq-item">
          <strong>How many Gitas are there in Hindu philosophy?</strong>
          <p>The tradition contains dozens of texts called &ldquo;Gita.&rdquo; The Bhagavad Gita is by far the most widely known, but others include the Ashtavakra Gita, Avadhuta Gita, Uddhava Gita, Ram Gita, Hans Gita, Guru Gita, Shakti Gita, Shambhu Gita, Vishnu Gita, Ganesha Gita, Devi Gita, Ribhu Gita, and several more. Each is distinct in its philosophical orientation and intended audience.</p>
        </div>

        <div className="faq-item">
          <strong>Are the lesser-known Gitas good for mental health?</strong>
          <p>Many of them are, in some ways more directly applicable to mental health than parts of the Bhagavad Gita. The Ashtavakra Gita&apos;s teaching on the witness-self speaks directly to the experience of anxiety and self-criticism. The Avadhuta Gita&apos;s refrain addresses depressive identification. The Hans Gita is the tradition&apos;s clearest teaching on anger regulation. The Vishnu Gita&apos;s verse on craving and aversion maps onto modern ACT therapy with remarkable precision.</p>
        </div>

        <div className="faq-item">
          <strong>Where can I read the Ashtavakra Gita in English?</strong>
          <p>Several English translations are available. John Richards&apos; translation is freely available online and is widely read. Thomas Byrom&apos;s rendering, titled &ldquo;The Heart of Awareness,&rdquo; is more poetic and less literal. Swami Nityaswarupananda&apos;s commentary edition is thorough for those who want deeper study.</p>
        </div>
      </div>

      {/* APP CTA */}
      <div className="content">
        <div className="app-cta">
          <div className="app-cta-eyebrow">Free iOS App</div>
          <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
          <p className="app-cta-desc">
            The Wisdom app delivers one verse each day: Devanagari script, transliteration, meaning, and how it applies right now. 700 verses from the Bhagavad Gita and growing. Home screen widget. Free.
          </p>
          <div className="app-cta-features">
            <span>✦ Daily shloka in Sanskrit</span>
            <span>✦ Meaning &amp; modern context</span>
            <span>✦ Home screen widget</span>
          </div>
          <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" className="app-cta-btn" data-mp-location="cta">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" /></svg>
            Download on the App Store
          </a>
          <div className="app-cta-sub">Free · iPhone · No account needed</div>
        </div>
      </div>

      <footer>
        <p>© 2026 Wisdom App. A daily verse to quiet the mind.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125" target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="Beyond Bhagavad Gita Quotes" />
    </>
  )
}
