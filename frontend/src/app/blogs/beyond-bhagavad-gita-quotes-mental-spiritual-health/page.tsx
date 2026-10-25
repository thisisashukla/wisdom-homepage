import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Beyond the Bhagavad Gita: Best Quotes on Mental & Spiritual Health from 7 Lesser-Known Gitas",
  description: "The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each have verses on fear, anger, grief and the restless mind. Sanskrit, translation and a plain reading of each.",
  keywords: "ashtavakra gita quotes, avadhuta gita mental health, ram gita teachings, hans gita philosophy, shakti gita quotes, shambhu gita wisdom, vishnu gita quotes, lesser known gitas, gitas besides bhagavad gita, other gitas mental peace, spiritual health gita quotes",
  openGraph: {
    title: "Beyond the Bhagavad Gita: Best Quotes on Mental & Spiritual Health from 7 Lesser-Known Gitas | Wisdom",
    description: "The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each have verses on fear, anger, grief and the restless mind.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Beyond the Bhagavad Gita: Best Quotes on Mental & Spiritual Health from 7 Lesser-Known Gitas | Wisdom",
    description: "The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each have verses on fear, anger, grief and the restless mind.",
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health",
    languages: {
      'en': "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health",
      'en-IN': "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health",
      'x-default': "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
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
    "description": "The Ashtavakra Gita, Avadhuta Gita, Ram Gita, Hans Gita, Shakti Gita, Shambhu Gita, and Vishnu Gita each have verses on fear, anger, grief and the restless mind.",
    "datePublished": "2026-05-20",
    "dateModified": "2026-08-01",
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/og-image.webp", "width": 1200, "height": 630 },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health" },
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": ["https://www.linkedin.com/in/thisisashukla/", "https://x.com/thisisashukla"]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wisdom",
      "url": "https://wisdomquotes.in",
      "logo": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/new-light-logo.webp" }
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wisdom", "item": "https://wisdomquotes.in" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://wisdomquotes.in/blogs" },
      { "@type": "ListItem", "position": 3, "name": "Beyond the Bhagavad Gita: Best Quotes on Mental & Spiritual Health from 7 Lesser-Known Gitas", "item": "https://wisdomquotes.in/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What is the Ashtavakra Gita and how is it different from the Bhagavad Gita?", "acceptedAnswer": { "@type": "Answer", "text": "The Ashtavakra Gita is a dialogue between the sage Ashtavakra and King Janaka. Where the Bhagavad Gita covers duty, action and devotion, it keeps to one teaching: you are pure awareness, the witness of body and mind. It is one of the best-known Advaita texts." } },
      { "@type": "Question", "name": "What is the Avadhuta Gita about?", "acceptedAnswer": { "@type": "Answer", "text": "The Avadhuta Gita is attributed to Dattatreya and is a first-person declaration of liberation. Chapter 3 repeats the refrain 'I am the nectar of wisdom, the same everywhere, like the sky.'" } },
      { "@type": "Question", "name": "What does the Ram Gita say about fear and mental peace?", "acceptedAnswer": { "@type": "Answer", "text": "The Ram Gita says worldly existence brings fear and sorrow at its beginning, middle and end. Rama tells Lakshmana to turn inward and recognise the self as the witness of the intellect, separate from its changes." } },
      { "@type": "Question", "name": "How many Gitas are there in Hindu philosophy?", "acceptedAnswer": { "@type": "Answer", "text": "The tradition contains dozens of texts called 'Gita.' The Bhagavad Gita is the best known, and others include the Ashtavakra Gita, Avadhuta Gita, Uddhava Gita, Ram Gita, Hans Gita, Guru Gita, Shakti Gita, Shambhu Gita, Vishnu Gita, Ribhu Gita, and many more." } },
      { "@type": "Question", "name": "Are the lesser-known Gitas good for mental health?", "acceptedAnswer": { "@type": "Answer", "text": "These are philosophical texts and no replacement for treatment. Several of them speak to states of mind people struggle with. The Ashtavakra Gita teaches that you are the witness of your thoughts. The Hans Gita has verses on staying calm when insulted. The Vishnu Gita repeats the Bhagavad Gita's warning (3.34) against being ruled by attraction and aversion." } },
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
            Dozens of Sanskrit texts are called Gita. Here are verses from seven of them, the Ashtavakra, Avadhuta, Ram, Hans, Shakti, Shambhu and Vishnu Gitas, on fear, anger, grief and the restless mind.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Topic Guide · 7 Gitas</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~12 min read</span>
          </div>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
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
          <figcaption>Many texts in the Sanskrit tradition are called Gita.</figcaption>
        </figure>

        <p className="lead">
          Most people who turn to Indian scripture for peace of mind start and end with the Bhagavad Gita. The Sanskrit tradition has at least a dozen other texts called &ldquo;Gita&rdquo; (song), each a teaching given by a sage or deity to a particular listener. Many of them take up the same questions: how to bear suffering, how to know yourself, and how to stop being ruled by fear and desire. This is a reading of seven.
        </p>

        <div className="gita-index">
          <h3>Gitas in this article</h3>
          <ol>
            <li><strong>Ashtavakra Gita</strong>: the sage Ashtavakra&apos;s teaching to King Janaka on awareness and identity</li>
            <li><strong>Avadhuta Gita</strong>: Dattatreya&apos;s first-person song of freedom</li>
            <li><strong>Ram Gita</strong>: Rama&apos;s teaching to Lakshmana on the witness-self</li>
            <li><strong>Hans Gita</strong>: the swan&apos;s teaching on anger and tolerance</li>
            <li><strong>Shakti Gita</strong>: the Goddess on consciousness in motion and in stillness</li>
            <li><strong>Shambhu Gita</strong>: Shiva on how fear and desire fall away</li>
            <li><strong>Vishnu Gita</strong>: Vishnu on ignorance as the cause of fear</li>
          </ol>
        </div>

        <p>
          None of these texts require you to be a Sanskrit scholar. What they share is attention to how the mind works: how suffering arises, where fear comes from, and how a person can stand apart from their own thoughts and moods.
        </p>

        {/* ── ASHTAVAKRA GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">1 of 7</span>
          <h2 className="gita-title">Ashtavakra Gita: You Are the Witness</h2>
        </div>

        <p>
          The Ashtavakra Gita has almost no story, no ritual, and very little metaphor. It is a dialogue between the sage Ashtavakra and King Janaka, and its argument is short: you are the awareness that witnesses body, mind, emotions and social role. For Ashtavakra, seeing this ends the search.
        </p>
        <p>
          Applied to everyday life, the teaching leaves your worry and grief real while placing you as the one who watches them arise and pass.
        </p>

                <ShlokaCard
          verseRef="Ashtavakra Gita 1.5"
          sanskrit="न त्वं विप्रादिको वर्णो नाश्रमी नाक्षगोचरः ।{'\n'}असङ्गोऽसि निराकारो विश्वसाक्षी सुखी भव ॥"
          iast="na tvaṃ viprādiko varṇo nāśramī nākṣagocaraḥ |asaṅgo'si nirākāro viśvasākṣī sukhī bhava ||"
          meaningLabel="Translation"
          meaning="You are not any caste or stage of life. You are not perceived by the senses. You are unattached, formless, the witness of the entire universe. Knowing this, be happy."
          insightLabel="What This Says"
          insight="Ashtavakra sets aside the labels of his day, caste (varna) and stage of life (ashrama), and the modern ones work the same way: profession, status, age. Janaka is asked to recognise what witnesses all of them, and then simply to be happy (sukhī bhava)."
          essence="You are no caste or stage of life; you are the witness of all. Be happy."
        />

                <ShlokaCard
          verseRef="Ashtavakra Gita 1.17"
          sanskrit="निरपेक्षो निर्विकारो निर्भरः शीतलाशयः ।{'\n'}अगाधबुद्धिरक्षुब्धो भव चिन्मात्रवासनः ॥"
          iast="nirapekṣo nirvikāro nirbharaḥ śītalāśayaḥ |agādhabuddhirakṣubdho bhava cinmātravāsanaḥ ||"
          meaningLabel="Translation"
          meaning="Be without expectation, without modification, self-sufficient, with a cool heart. Be of unfathomable intelligence, undisturbed, established in pure awareness alone."
          insightLabel="What This Says"
          insight="The verse is a list of qualities: free of expectation, unchanging, self-sufficient, cool-hearted, of unfathomable understanding, undisturbed. Experiences still arise and pass through such a person, and none of them shake the base."
          essence="Be free of expectation, cool-hearted, undisturbed, resting in awareness alone."
        />

        {/* ── AVADHUTA GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">2 of 7</span>
          <h2 className="gita-title">Avadhuta Gita: Why Do You Weep?</h2>
        </div>

        <p>
          The Avadhuta Gita is attributed to Dattatreya, the wandering sage who lived outside social convention. Where the Ashtavakra Gita is a dialogue, the Avadhuta Gita is mostly a declaration in the first person, and chapter 3 keeps returning to one refrain: &ldquo;I am the nectar of wisdom, the same everywhere, like the sky.&rdquo;
        </p>
        <p>
          The text gives little advice. It describes, again and again, a self that suffering, the mind and the ego do not reach.
        </p>

                <ShlokaCard
          verseRef="Avadhuta Gita 3.15"
          sanskrit="सन्तापदुःखजनको न विधिः कदाचित्{'\n'}सन्तापयोगजनितं न मनः कदाचित् ।{'\n'}यस्मादहङ्कृतिरियं न च मे कदाचित्{'\n'}ज्ञानामृतं समरसं गगनोपमोऽहम् ॥"
          meaningLabel="Translation"
          meaning="I am not fate that causes suffering, nor the mind born from suffering; this ego is not mine. I am the nectar of wisdom, steady and like the sky."
          insightLabel="What This Says"
          insight="Dattatreya sets aside three things a person in pain tends to identify with: the fate that caused it, the mind shaped by it, and the ego that makes it personal. What he says remains is jñānāmṛtam, the nectar of wisdom, the same everywhere, like the sky."
          essence="I am not fate, the suffering mind or the ego; I am wisdom, like the sky."
        />

                <ShlokaCard
          verseRef="Avadhuta Gita 3.34"
          sanskrit="किं नाम रोदिषि सखे न जरा न मृत्युः{'\n'}किं नाम रोदिषि सखे न च जन्म दुःखम् ।{'\n'}किं नाम रोदिषि सखे न च ते विकारो{'\n'}ज्ञानामृतं समरसं गगनोपमोऽहम् ॥"
          meaningLabel="Translation"
          meaning="Why do you weep, friend? You have no old age, no death, no birth, no suffering, no faults. I am the nectar of wisdom, pure and like the infinite sky beyond all."
          insightLabel="What This Says"
          insight="Dattatreya asks the question three times: why do you weep, friend? The list that follows, no old age, no death, no birth, no change, describes the self as he sees it, apart from the life story the mind keeps telling."
          essence="Why weep, friend? You have no old age, death or birth."
        />

        

        {/* ── RAM GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">3 of 7</span>
          <h2 className="gita-title">Ram Gita: The Self as Witness</h2>
        </div>

        <p>
          The Ram Gita appears in the Uttara Kanda of the Adhyatma Ramayana. The war with Ravana is over and Rama rules in Ayodhya when Lakshmana asks him about liberation, and Rama answers. The setting is quieter than Kurukshetra: two brothers talking in peacetime.
        </p>

                <ShlokaCard
          verseRef="Ram Gita · Verse 55"
          sanskrit="आदौ च मध्ये च तथैव चान्ततो भवं विदित्वा भयशोककारणम् ।{'\n'}हित्वा समस्तं विधिवादचोदितं भजेत्स्वमात्मानमथाखिलात्मनाम् ॥"
          meaningLabel="Translation"
          meaning="Knowing that worldly existence is the cause of fear and sorrow at its beginning, middle and end, give up all actions prompted by ritual injunctions and worship your own self, the self of all beings."
          insightLabel="What This Says"
          insight="Rama says worldly existence (bhava) brings fear and sorrow at every stage: at the beginning, in the middle and at the end. Someone who accepts this is less surprised by suffering. His instruction is to set aside ritual action and turn to the self, which he calls the self of all beings."
          essence="Worldly life breeds fear and sorrow throughout; turn to the self of all."
        />

                <ShlokaCard
          verseRef="Ram Gita · Verse 40"
          sanskrit="अनाद्यविद्योद्भवबुद्धिबिम्बितो जीवप्रकाशोऽयमितीर्यते चितः ।{'\n'}आत्माधियः साक्षितया पृथक्स्थितो बुध्द्यापरिच्छिन्नपरः स एव हि ॥"
          meaningLabel="Translation"
          meaning="The living being is the light of consciousness reflected in intellect born from beginningless ignorance; the true self is separate from intellect as its witness and beyond its distinctions."
          insightLabel="What This Says"
          insight="Overthinking, the loop of what-if and why-did-I, belongs to the intellect. Rama compares the jiva to consciousness reflected in the intellect, and places the self apart from it as its witness. If you identify with the thoughts, every swing of the mind feels like a swing in who you are. The witness Rama describes stays still."
          essence="The self stands apart from the intellect as its witness."
        />

        {/* ── HANS GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">4 of 7</span>
          <h2 className="gita-title">Hans Gita: Calm Under Harsh Words</h2>
        </div>

        <p>
          The Hans Gita (Hamsa Gita) is a discourse in the Shanti Parva of the Mahabharata, in which a swan, a symbol of discernment, teaches a group of sages about virtue. Its focus is practical: how a person behaves when insulted or provoked.
        </p>

                <ShlokaCard
          verseRef="Hans Gita · Verse 10"
          sanskrit="परश्चेदेनमति वादबानैर्भृशं विध्येच्छम एवेह कार्यः ।{'\n'}संरोष्यमाणः प्रतिहृष्यते यः स आदत्ते सुकृतं वै परस्य ॥"
          meaningLabel="Translation"
          meaning="If others fiercely attack the wise person with harsh words like arrows, he remains calm. One who stays inwardly pleased despite another's anger inherits that person's goodness."
          insightLabel="What This Says"
          insight="The verse describes staying calm when someone attacks you with words, and even feeling glad. Its claim is that the one who stays calm takes the merit of the one who attacks."
          essence="Stay calm when attacked with harsh words; the attacker&apos;s merit passes to you."
        />

                <ShlokaCard
          verseRef="Hans Gita · Verse 15"
          sanskrit="अक्रोधनः क्रुध्यतां वै विशिष्टस्तथा तितिक्षुरतितिक्षोर्विशिष्टः ।{'\n'}अमानुषान्मानुषो वै विशिष्टस् तथा ज्ञानाज्ज्ञानवान्वै प्रधानः ॥"
          meaningLabel="Translation"
          meaning="One free of anger surpasses the angry, and the patient surpass the impatient. Humans surpass non-humans, and those with knowledge surpass those without it."
          insightLabel="What This Says"
          insight="The swan ranks people by inner capacity. The one who stays calm among the angry ranks above them, the patient above the impatient, and the wise above the ignorant. Your response is placed in your own hands, whatever state the other person is in."
          essence="The calm surpass the angry; the patient surpass the impatient."
        />

        <div className="highlight-box">
          <h3>What the Hans Gita Says About Anger</h3>
          <p>
            The text treats anger as a test. Those who answer anger with more anger are at one level, and those who can bear it without being consumed are at another. In the swan&apos;s account, quick reaction shows a person who is not yet steady, and steadiness comes with practice.
          </p>
        </div>

        {/* ── SHAKTI GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">5 of 7</span>
          <h2 className="gita-title">Shakti Gita: Movement and Stillness</h2>
        </div>

        <p>
          The Shakti Gita is the Goddess&apos;s own teaching, and it sees the divine in every form of existence. Its point for daily life is that the energy in your restlessness and the steadiness in your stillness come from the same consciousness.
        </p>

                <ShlokaCard
          verseRef="Shakti Gita 1.80"
          sanskrit="कार्यब्रह्मस्वरूपेत्र विश्वास्मिन जङ्गमे मम ।{'\n'}वर्त्तते चिद्विलासस्तु स्थावरे सद्विलासिता ॥"
          meaningLabel="Translation"
          meaning="In this universe shaped as the active and the supreme, my conscious play exists in whatever moves, and my true presence in whatever is still."
          insightLabel="What This Says"
          insight="The Goddess says she is present in both what moves and what stands still. People often picture peace as the end of activity, arriving once the worried thoughts stop. In this verse, the consciousness in a busy, scattered day is the same consciousness present in a quiet one."
          essence="My play of consciousness is in what moves, my being in what is still."
        />

        {/* ── SHAMBHU GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">6 of 7</span>
          <h2 className="gita-title">Shambhu Gita: Fear Returns to Its Source</h2>
        </div>

        <p>
          The Shambhu Gita is Shiva&apos;s teaching. Shiva, lord of dissolution, describes what happens to fear and desire in a person who is liberated while alive (jivanmukta).
        </p>

                <ShlokaCard
          verseRef="Shambhu Gita 6.135"
          sanskrit="भयमैथुनरूपिण्यो जीवन्मुक्तौ घटत्तयः ।{'\n'}राजसिक्यो विलीयन्ते स्वीयेषु कारणेवलम् ॥"
          meaningLabel="Translation"
          meaning="In the liberated being, the fear and passion-like rajasic tendencies dissolve completely, merging back into their own source."
          insightLabel="What This Says"
          insight="Shiva says that in the liberated person, fear and sexual desire, which he classes as rajasic tendencies, dissolve back into their own causes. He describes no struggle and no act of will; they return to where they came from."
          essence="In the liberated, fear and desire dissolve back into their own source."
        />

        

        {/* ── VISHNU GITA ── */}
        <div className="gita-header">
          <span className="gita-badge">7 of 7</span>
          <h2 className="gita-title">Vishnu Gita: Ignorance as the Cause of Fear</h2>
        </div>

        <p>
          The Vishnu Gita is Vishnu&apos;s teaching, addressed to the gods, on suffering, liberation and how the senses bind the mind. It speaks to anyone caught between craving some outcomes and pushing others away.
        </p>

                <ShlokaCard
          verseRef="Vishnu Gita 1.75"
          sanskrit="अज्ञानदेव भीतीनामुत्पत्तिजायते सुरा : ।{'\n'}अज्ञानमेव जन्तूनां हेतुस्तापत्रयस्य वै ॥"
          meaningLabel="Translation"
          meaning="O divine beings, ignorance alone gives rise to fear. Ignorance alone is the cause of the threefold suffering."
          insightLabel="What This Says"
          insight="Vishnu names ignorance as the root of fear and of the threefold suffering, ahead of circumstance, bad luck or other people. If ignorance is the cause, then understanding is the remedy, and each moment of self-understanding counts."
          essence="Ignorance alone gives rise to fear and the threefold suffering."
        />

                <ShlokaCard
          verseRef="Vishnu Gita 4.76"
          sanskrit="इन्द्रियम्येन्द्रियस्यार्थे रागद्वेषौ व्यवस्थितौ ।{'\n'}तयोर्न वशमागच्छेत्तौ ह्यस्य परिपन्थिनौ ॥"
          meaningLabel="Translation"
          meaning="Every sense has attachment for its own objects and aversion for the opposite. Let no one fall under their sway, for these two are the obstacles on the path."
          insightLabel="What This Says"
          insight="The same verse appears in the Bhagavad Gita as 3.34. Attraction and aversion sit in every sense and its objects, and the instruction is to stay out of their control. The verse calls them paripanthinau, two highwaymen waiting on the road."
          essence="Attraction and aversion lie in every sense; do not fall under their sway."
        />

        <h2>What All These Gitas Share</h2>
        <p>
          Seven texts with seven different speakers come back to a shared idea: suffering comes from taking yourself to be your circumstances, mood, role, thoughts or fears, and relief begins when you recognise something in you that these do not touch.
        </p>
        <p>
          Circumstances still matter in these texts. The Ram Gita says outright that worldly life brings fear and sorrow, and the Hans Gita takes anger seriously enough to rank people by how they meet it. Each draws a line between the part of you in pain and the part that can witness the pain.
        </p>

        <div className="highlight-box">
          <h3>One Verse Per Day</h3>
          <p>
            These texts reward slow reading. One verse a day, read carefully and kept in mind through an ordinary day, gives a teaching time to settle.
          </p>
          </div> <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the setting of the Ram Gita (Uttara Kanda, after the war) and the translation of its verse 55, noted that Vishnu Gita 4.76 matches Bhagavad Gita 3.34, removed unverified source claims for the Vishnu, Shakti and Shambhu Gitas, and removed therapy comparisons; copy edited.</p>
      </div>

      {/* FAQ */}

      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What is the Ashtavakra Gita and how is it different from the Bhagavad Gita?</strong>
          <p>The Ashtavakra Gita is a dialogue between the sage Ashtavakra and King Janaka. The Bhagavad Gita covers duty, action and devotion; the Ashtavakra Gita keeps to one teaching, that you are pure awareness, the witness of body and mind. It has almost no story, no ritual and no gradual path, and it is one of the best-known Advaita texts.</p>
        </div>

        <div className="faq-item">
          <strong>What is the Avadhuta Gita about?</strong>
          <p>The Avadhuta Gita is attributed to Dattatreya. An &ldquo;avadhuta&rdquo; is a person who has renounced all social conventions and lives beyond prescribed roles. The Gita is Dattatreya&apos;s song of liberation, a first-person declaration of what it is like to be free from identification with the mind, ego, and circumstances. Chapter 3 repeats the refrain &ldquo;I am the nectar of wisdom, the same everywhere, like the sky.&rdquo;</p>
        </div>

        <div className="faq-item">
          <strong>What does the Ram Gita say about fear and mental peace?</strong>
          <p>The Ram Gita is Rama&apos;s teaching to Lakshmana in the Uttara Kanda of the Adhyatma Ramayana. Rama says worldly existence brings fear and sorrow at its beginning, middle and end. He tells Lakshmana to turn inward and recognise the self as the witness of the intellect, separate from its changes.</p>
        </div>

        <div className="faq-item">
          <strong>How many Gitas are there in Hindu philosophy?</strong>
          <p>The tradition contains dozens of texts called &ldquo;Gita.&rdquo; The Bhagavad Gita is the best known, and others include the Ashtavakra Gita, Avadhuta Gita, Uddhava Gita, Ram Gita, Hans Gita, Guru Gita, Shakti Gita, Shambhu Gita, Vishnu Gita, Ganesha Gita, Devi Gita, Ribhu Gita, and several more. Each is distinct in its philosophical orientation and intended audience.</p>
        </div>

        <div className="faq-item">
          <strong>Are the lesser-known Gitas good for mental health?</strong>
          <p>These are philosophical texts and no replacement for treatment. Several of them speak to states of mind people struggle with. The Ashtavakra Gita teaches that you are the witness of your thoughts. The Hans Gita has verses on staying calm when insulted. The Vishnu Gita repeats the Bhagavad Gita&apos;s warning (3.34) against being ruled by attraction and aversion. If you are struggling, please also talk to a professional.</p>
        </div>

        <div className="faq-item">
          <strong>Where can I read the Ashtavakra Gita in English?</strong>
          <p>Several English translations are available. John Richards&apos; translation is freely available online and is widely read. Thomas Byrom&apos;s rendering, titled &ldquo;The Heart of Awareness,&rdquo; is more poetic and less literal. Swami Nityaswarupananda&apos;s commentary edition is thorough for those who want deeper study.</p>
        </div>
      </div>

      {/* APP CTA */}
      <div className="content">
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Beyond Bhagavad Gita Quotes"} />
      </div>

      <footer>
        <p>© 2026 Wisdom App. Bhagavad Gita, tuned to your life.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href={appStoreUrl('web_blog_footer')} target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="Beyond Bhagavad Gita Quotes" />
    </>
  )
}
