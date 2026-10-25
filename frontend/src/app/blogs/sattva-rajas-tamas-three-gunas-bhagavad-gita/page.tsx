import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Sattva, Rajas, Tamas: The Three Gunas of the Bhagavad Gita Explained",
  description: "Sattva (clarity), rajas (drive), tamas (inertia) — the three gunas of the Bhagavad Gita explained in plain English. What each one feels like, how they show up in your food, work and moods, which one is dominant in you right now, and how Chapter 14 says to move beyond them.",
  keywords: "sattva rajas tamas meaning, three gunas bhagavad gita, sattva rajas tamas explained, what are the three gunas, gunatraya bhagavad gita, sattva guna meaning, rajas guna meaning, tamas guna meaning, gunatita state, bhagavad gita chapter 14, three gunas in daily life",
  openGraph: {
    title: "Sattva, Rajas, Tamas: The Three Gunas of the Bhagavad Gita Explained",
    description: "Sattva (clarity), rajas (drive) and tamas (inertia) — the three gunas of the Gita explained simply, with Chapter 14 verses and how to read your own state right now.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: 'https://wisdomquotes.in/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Sattva, Rajas, Tamas: The Three Gunas of the Bhagavad Gita Explained",
    description: "Sattva (clarity), rajas (drive) and tamas (inertia) — the three gunas of the Gita, and how to read your own state right now.",
    images: ['https://wisdomquotes.in/og-image.jpg'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita",
    languages: {
      'x-default': "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita",
      'en': "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita",
      'en-IN': "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita",
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
            content: "गुण";
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

        }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    "headline": "Sattva, Rajas, Tamas: The Three Gunas of the Bhagavad Gita Explained",
    "description": "The Gita says three qualities (gunas) make up all of nature, including your personality and moods. Sattva is clarity, rajas is drive, tamas is inertia.",
    "alternativeHeadline": "Three Gunas of the Bhagavad Gita — Sattva, Rajas, Tamas Explained",
    "datePublished": "2026-06-12",
    "dateModified": "2026-06-12",
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": ["https://x.com/sansearchapp"]
    },
    "publisher": {
      "@type": "Organization",
      "name": "Wisdom",
      "url": "https://wisdomquotes.in",
      "logo": { "@type": "ImageObject", "url": "https://wisdomquotes.in/assets/new-light-logo.webp" }
    },
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/og-image.jpg", "width": 1200, "height": 630 },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita" },
    "mentions": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" }
    ],
    "keywords": "sattva rajas tamas meaning, three gunas bhagavad gita, sattva rajas tamas explained, gunatraya bhagavad gita, sattva guna meaning, rajas guna meaning, tamas guna meaning, gunatita state, bhagavad gita chapter 14",
    "articleSection": "Bhagavad Gita",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "learningResourceType": "Article",
    "educationalLevel": "General",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".lead", ".shloka-meaning", ".shloka-essence"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wisdom", "item": "https://wisdomquotes.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://wisdomquotes.in/blogs/" },
      { "@type": "ListItem", "position": 3, "name": "Sattva, Rajas, Tamas — The Three Gunas of the Bhagavad Gita", "item": "https://wisdomquotes.in/blogs/sattva-rajas-tamas-three-gunas-bhagavad-gita" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What are sattva rajas and tamas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sattva, rajas, and tamas are the three gunas, qualities or forces that the Bhagavad Gita says make up all of prakriti (nature). Sattva is the quality of clarity, lightness, and knowledge. Rajas is the quality of activity, desire, and restlessness. Tamas is the quality of inertia, heaviness, and delusion. They are present in everything and everyone in varying combinations."
        }
      },
      {
        "@type": "Question",
        "name": "What is sattva guna?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sattva guna is the quality of clarity, purity, and knowledge. In the Bhagavad Gita (BG 14.6), sattva is described as pure and illuminating — free of impurity. When sattva is strong, you feel clear, calm, alert, and interested in learning without craving or aversion. The Gita warns that even sattva binds through attachment to happiness and knowledge — it is the guna to cultivate, but not the final goal."
        }
      },
      {
        "@type": "Question",
        "name": "What is rajas guna?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Rajas guna is the quality of activity, desire, and restlessness. In BG 14.7, rajas is described as the source of craving and attachment — it binds the atman through the compulsion to act. When rajas dominates you feel driven, ambitious, agitated, and unable to sit still. Rajas drives the world's work, and BG 14.12 links it to greed, restless activity and craving."
        }
      },
      {
        "@type": "Question",
        "name": "What is tamas guna?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Tamas guna is the quality of inertia, heaviness, and delusion. In BG 14.8, tamas is described as born of ignorance — it binds the atman through negligence, laziness, and sleep. When tamas dominates you feel heavy, unmotivated, confused, or emotionally shut down. Like the other gunas, tamas shifts with food, rest and activity."
        }
      },
      {
        "@type": "Question",
        "name": "What are the three gunas in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The three gunas in the Bhagavad Gita are sattva (clarity), rajas (activity), and tamas (inertia). Together they form the entire fabric of prakriti (nature), including your body, mind, food, work, and current mood. Chapter 14 (Gunatraya Vibhaga Yoga) is dedicated to them, and Chapters 17 and 18 apply the framework to food, worship, sacrifice, action, knowledge, and duty."
        }
      },
      {
        "@type": "Question",
        "name": "How do the three gunas affect daily life?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The gunas shape your mental and physical states from moment to moment. When sattva is strong, you feel clear, focused, and interested in learning. When rajas dominates, you feel driven, restless, or anxious. When tamas is high, you feel heavy, unmotivated, or confused. These states fluctuate based on diet, sleep, what you consume mentally, and your activities."
        }
      },
      {
        "@type": "Question",
        "name": "Can you change your guna?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes. In BG 14.10 the gunas compete, with one overpowering the others for a time, so the balance can shift. Food, sleep, what you read, how you spend your time, your company, and your practices all affect which guna predominates at any given time. The Gita describes specific foods, worship styles, and types of action associated with each guna in Chapters 17 and 18."
        }
      },
      {
        "@type": "Question",
        "name": "What is the gunatita state?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Gunatita means beyond the gunas. In BG 14.20, Krishna describes someone who has transcended all three gunas as free from the pains of birth, aging, and death. The Gita treats this state, rather than perfect sattva, as the goal. BG 14.26 says undivided devotion (avyabhicharina bhakti) is the path to this state."
        }
      },
      {
        "@type": "Question",
        "name": "What guna should I aim for according to the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The Gita recommends cultivating sattva as a working condition, because it supports clarity and the capacity for knowledge. But it explicitly warns against becoming attached even to sattva (BG 14.6). The Gita's final direction is to go beyond all three, to the gunatita state (BG 14.20, 14.25)."
        }
      }
    ]
  }
]

export default function ThreeGunasPage() {
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
        Three Gunas: Sattva, Rajas, Tamas
      </div>
    </div>

    <div className="article-hero">
      <div className="article-hero-inner">
        <div className="chapter-badge">
          <div className="chapter-badge-dot"></div>
          Bhagavad Gita · Chapter 14
          <div className="chapter-badge-dot"></div>
        </div>
        <h1 className="article-title">
          Sattva, Rajas, Tamas:<br />
          <em>The Three Qualities of Everything</em>
        </h1>
        <p className="article-subtitle">
          The Gita says these three gunas make up all of prakriti, including your personality, your food, your worship, and your current mood. 
        </p>
        <div className="article-meta">
          <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">Chapter 14 · Gunatraya Vibhaga Yoga</span>
          <span className="meta-sep">·</span>
          <span className="meta-item">~6 min read</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>
    </div>

    <div className="content">
      <figure className="chapter-image">
        <img
          src="/assets/chapter14.webp"
          alt="The three gunas of prakriti in the Bhagavad Gita: sattva, rajas, tamas"
          width="1200"
          height="675"
          loading="eager"
          fetchPriority="high"
        />
        <figcaption>Chapter 14: The three strands woven through all of nature</figcaption>
      </figure>

      <p className="lead">
        <strong>Sattva, rajas and tamas</strong> are the three gunas — the three fundamental qualities — that the Bhagavad Gita says make up all of nature, including your personality, your food, your work, and your current mood. <strong>Sattva</strong> is clarity and knowledge. <strong>Rajas</strong> is activity and desire. <strong>Tamas</strong> is inertia and confusion. Chapter 14 lays out the framework in 27 verses. Some mornings you wake up clear, focused, ready to think — that is sattva rising. Other mornings you wake up irritable, scattered, restless — that is rajas. Some days you cannot move at all — that is tamas.
      </p>

      <h2>Why the Gunas Matter</h2>
      <p>
        Chapter 14 can sound theoretical: it sorts everything in nature into three qualities. The practical use is that you start reading your own states more accurately, and you can treat a low period or a high one as a condition that will change.
      </p>
      <p>
        From verse 14.5, Chapter 14 describes the gunas as the way prakriti (nature) binds the atman (the unchanging inner self) to the body.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.5"
        sanskrit="सत्त्वं रजस्तम इति गुणाः प्रकृतिसंभवाः । निबध्नन्ति महाबाहो देहे देहिनमव्ययम् ॥"
        iast="sattvaṃ rajastama iti guṇāḥ prakṛtisaṃbhavāḥ | nibadhnanti mahābāho dehe dehinamavyayam ||"
        meaningLabel="Translation"
        meaning="The qualities of nature, sattva (clarity), rajas (activity), and tamas (inertia), tie the unchanging atman (inner self) to the body."
        insightLabel="What This Teaches"
        insight="The embodied self (dehin) is called avyaya, imperishable. The gunas leave it unchanged and bind it to the body, so it experiences itself as caught in whatever state predominates."
        essence="Sattva, rajas and tamas, born of nature, bind the imperishable embodied self to the body."
      />

      <h2>What &quot;Guna&quot; Means</h2>
      <p>
        The word guna literally means &quot;strand&quot; or &quot;quality.&quot; Think of a rope made of three twisted strands. The three gunas are like three strands present in everything at all times, in shifting proportions.
      </p>
      <p>
        Chapter 14 describes one guna predominating at a time by overpowering the others (14.10), so the balance can shift within a day. Chapters 17 and 18 also describe a person&apos;s faith, action and character by their dominant guna.
      </p>

      <h2>Sattva: Clarity, Knowledge, Balance</h2>
      <p>
        Sattva is the quality of light, purity, and knowing. When sattva is high, you think clearly, you feel interested in learning, you&apos;re not chasing or avoiding anything particular. There is a kind of lightness. You can sit with a problem without urgency. You read something and it goes in.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.6"
        sanskrit="तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् । सुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ ॥"
        iast="tatra sattvaṃ nirmalatvātprakāśakamanāmayam | sukhasaṅgena badhnāti jñānasaṅgena cānagha ||"
        meaningLabel="Translation"
        meaning="Sattva is the pure and clear quality within us that brings light, peace, and knowledge, but even these good things can create attachment and keep us tied to the world."
        insightLabel="What This Teaches"
        insight="Sattva is stainless (nirmala), illuminating and free of affliction, yet it binds too: through attachment to happiness and to knowledge. Treat it as a working condition and watch for attachment to your own calm or clarity."
        essence="Sattva is clear and illuminating, yet it binds through attachment to happiness and knowledge."
      />

      <p>
        In daily life, a sattvic day might look like this: eating moderately, doing focused work without checking your phone every few minutes, and taking real interest in what you&apos;re doing. You don&apos;t manufacture this state. You create conditions that make it more likely: sleep, food, what you consume mentally, who you spend time with.
      </p>

      <h2>Rajas: Activity, Desire, Restlessness</h2>
      <p>
        Rajas is the quality of activity, drive, and craving. Without rajas nothing gets done; goals, projects and competitions all run on it. The problem is the attachment it creates: the need for the outcome, the agitation when things don&apos;t move, the constant planning and wanting.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.7"
        sanskrit="रजो रागात्मकं विद्धि तृष्णासङ्गसमुद्भवम् । तन्निबध्नाति कौन्तेय कर्मसङ्गेन देहिनम् ॥"
        iast="rajo rāgātmakaṃ viddhi tṛṣṇāsaṅgasamudbhavam | tannibadhnāti kaunteya karmasaṅgena dehinam ||"
        meaningLabel="Translation"
        meaning="Rajas, born of desire and attachment, ties the embodied self to action through constant craving and clinging to what it does."
        insightLabel="What This Teaches"
        insight="Rajas is rāga, passion. It grows from tṛṣṇā (craving) and saṅga (attachment), and it binds through attachment to action: you get caught in the activity as well as the result."
        essence="Rajas is passion born of craving and attachment, and binds the embodied self through attachment to action."
      />

      <p>
        A heavily rajasic day has a particular texture: you feel busy, slightly agitated, productive in bursts, but with a background hum of anxiety. You get things done but the satisfaction doesn&apos;t quite arrive. You finish one thing and immediately move to the next.
      </p>

      <h2>Tamas: Inertia, Delusion, Heaviness</h2>
      <p>
        Tamas is the quality of heaviness, inertia, and delusion. It binds through negligence, laziness, and sleep. At its root is ajnana, ignorance, specifically the inability to see clearly what is happening or what needs to be done.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.8"
        sanskrit="तमस्त्वज्ञानजं विद्धि मोहनं सर्वदेहिनाम् । प्रमादालस्यनिद्राभिस्तन्निबध्नाति भारत ॥"
        iast="tamastvajñānajaṃ viddhi mohanaṃ sarvadehinām | pramādālasyanidrābhistannibadhnāti bhārata ||"
        meaningLabel="Translation"
        meaning="Tamas comes from ignorance and deludes every living being. It binds through carelessness, laziness, and excessive sleep."
        insightLabel="What This Teaches"
        insight="Mohanam means that which deludes. Tamas binds through pramāda (carelessness), ālasya (laziness) and nidrā (sleep). In 14.9 Krishna adds that tamas covers knowledge."
        essence="Tamas, born of ignorance, deludes all beings and binds through carelessness, laziness and sleep."
      />

      <p>
        The verse names sleep, and 6.16–17 shows what the Gita objects to: yoga fails for one who sleeps too much or too little, and works for one who is moderate in sleep and waking.
      </p>

      <h2>How They Interact</h2>
      <p>
        The gunas compete. At any moment one predominates, but the other two are present and shifting. When sattva rises, it suppresses rajas and tamas. When rajas surges, it overtakes sattva&apos;s calm and tamas&apos;s inertia. This is why you can go from clarity to agitation within the same afternoon.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.10"
        sanskrit="रजस्तमश्चाभिभूय सत्त्वं भवति भारत । रजः सत्त्वं तमश्चैव तमः सत्त्वं रजस्तथा ॥"
        iast="rajastamaścābhibhūya sattvaṃ bhavati bhārata | rajaḥ sattvaṃ tamaścaiva tamaḥ sattvaṃ rajastathā ||"
        meaningLabel="Translation"
        meaning="At any time, one quality, clarity (sattva), activity (rajas), or inertia (tamas), becomes stronger by overcoming the others. These forces in us are always shifting."
        insightLabel="What This Teaches"
        insight="Sattva rises by overpowering rajas and tamas, rajas by overpowering sattva and tamas, and tamas by overpowering sattva and rajas."
        essence="Each guna rises by overpowering the other two, so the balance between them keeps shifting."
      />

      <h2>How to Read Your Own Gunas Right Now</h2>
      <p>
        Here is a simple self-check, based on the signs Krishna lists in 14.11–13:
      </p>

      <div className="highlight-box">
        <h3>A Guna Self-Diagnostic</h3>
        <p>
          Sattva is present when: you feel clear without effort, you can sit quietly, you feel genuine interest in something, you feel neither heavy nor agitated.
        </p>
        <p>
          Rajas is present when: you feel driven but slightly anxious,  you feel productive but not at peace, satisfaction arrives briefly after completing something and then the craving for the next thing begins immediately.
        </p>
        <p>
          Tamas is present when: you feel heavy, unmotivated, slightly confused about what you want, drawn to more sleep or more passive distraction, unable to start things you know you need to do.
        </p>
        <p>
          The aim is to see the state accurately. Once seen, you can ask: what conditions produced this? What would shift it?
        </p>
      </div>

      <h2>Food, Worship, and Action</h2>
      <p>
        The Gita extends the guna framework far beyond personality. Chapter 17 classifies food by guna. Sattvic food is juicy, nourishing, and promotes life, strength and health (17.8). Rajasic food is too bitter, sour, salty, hot or pungent, and brings pain and illness (17.9). Tamasic food is stale, tasteless, putrid or left over (17.10).
      </p>
      <p>
        The same classification applies to sacrifice (yajña): sattvic sacrifice is offered without desire for reward (17.11); rajasic sacrifice is done for results or for show (17.12); tamasic sacrifice ignores the rules and is done without faith (17.13). Charity is classified too: sattvic charity is given at the right time and place, to a worthy person, without expecting anything back (17.20).
      </p>

      <p className="pull-quote">
        In Chapter 17 the same act, a sacrifice or a gift, can be sattvic, rajasic or tamasic depending on the motive and manner behind it.
      </p>

      <h2>Gunatita: Beyond All Three</h2>
      <p>
        The Gita&apos;s goal goes past sattva: the aim is to go beyond all three gunas. Someone in that state is called guṇātīta (14.25). Verse 14.20 describes the result.
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.20"
        sanskrit="गुणानेतानतीत्य त्रीन्देही देहसमुद्भवान् । जन्ममृत्युजरादुःखैर्विमुक्तोऽमृतमश्नुते ॥"
        iast="guṇānetānatītya trīndehī dehasamudbhavān | janmamṛtyujarāduḥkhairvimukto'mṛtamaśnute ||"
        meaningLabel="Translation"
        meaning="When a person rises above the three qualities that create the body, they become free from the pains of birth, aging, and death, and experience a state that is undying."
        insightLabel="What This Teaches"
        insight="The goal is to go beyond all three gunas. Sattva is useful as a working condition, and the aim past it is a state where you are not compelled by rajas, not darkened by tamas, and not attached to sattva either."
        essence="Going beyond the three gunas, the embodied self is freed from birth, death, old age and sorrow and attains the immortal."
      />

      <p>
        How does one reach this state? Verse 14.26 answers:
      </p>

            <ShlokaCard
        verseRef="Bhagavad Gita 14.26"
        sanskrit="मां च योऽव्यभिचारेण भक्तियोगेन सेवते । स गुणान्समतीत्यैतान् ब्रह्मभूयाय कल्पते ॥"
        iast="māṃ ca yo'vyabhicāreṇa bhaktiyogena sevate | sa guṇānsamatītyaitān brahmabhūyāya kalpate ||"
        meaningLabel="Translation"
        meaning="Anyone who serves the Supreme with single-minded, undivided devotion can rise above all the natural qualities and become fit for union with the Supreme Truth."
        insightLabel="What This Teaches"
        insight="Avyabhicāreṇa means without wavering. The means Krishna gives here is devotion that does not divide its attention. The gunas pull in several directions; this devotion pulls in one."
        essence="Whoever serves Krishna with unwavering devotion goes beyond the gunas and becomes fit for Brahman."
      />
    <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the Chapter 17 food descriptions (17.8–10), the worship examples (17.11–13 classify sacrifice), where Chapter 14 introduces the gunas, and the verse summary lines; removed the claim that sleep after exertion is sattvic; copy edited.</p>
    </div>
      <FeedbackWidget pageType="blog" />
    <div className="faq-section">
      <h2>Frequently Asked Questions</h2>

      <div className="faq-item">
        <strong>What are sattva, rajas, and tamas?</strong>
        <p>
          Sattva, rajas, and tamas are the three gunas, the three fundamental qualities that the Bhagavad Gita says make up all of prakriti (nature). Sattva is clarity, lightness, and knowledge. Rajas is activity, desire, and restlessness. Tamas is inertia, heaviness, and delusion. They are present in everything and everyone in varying combinations.
        </p>
      </div>

      <div className="faq-item">
        <strong>What is sattva guna?</strong>
        <p>
          Sattva guna is the quality of clarity, purity, and knowledge. In BG 14.6 sattva is described as pure and illuminating — free of impurity. When sattva is strong, you feel clear, calm, alert, and interested in learning without craving or aversion. The Gita warns that even sattva binds through attachment to happiness and knowledge — it is the guna to cultivate, but not the final goal.
        </p>
      </div>

      <div className="faq-item">
        <strong>What is rajas guna?</strong>
        <p>
          Rajas guna is the quality of activity, desire, and restlessness. In BG 14.7 rajas is described as the source of craving and attachment — it binds the atman through the compulsion to act. When rajas dominates you feel driven, ambitious, agitated, and unable to sit still. Rajas drives the world&apos;s work, and BG 14.12 links it to greed, restless activity and craving.
        </p>
      </div>

      <div className="faq-item">
        <strong>What is tamas guna?</strong>
        <p>
          Tamas guna is the quality of inertia, heaviness, and delusion. In BG 14.8 tamas is described as born of ignorance — it binds through negligence, laziness, and sleep. When tamas dominates you feel heavy, unmotivated, confused, or emotionally shut down. Like the other gunas, tamas shifts with food, rest and activity.
        </p>
      </div>

      <div className="faq-item">
        <strong>What are the three gunas in the Bhagavad Gita?</strong>
        <p>
          The three gunas in the Bhagavad Gita are sattva (clarity), rajas (activity), and tamas (inertia). Together they form the entire fabric of prakriti (nature) — including your body, mind, food, work and current mood. Chapter 14 (Gunatraya Vibhaga Yoga) is dedicated to them, and Chapters 17 and 18 apply the framework to food, worship, sacrifice, action, knowledge and duty.
        </p>
      </div>

      <div className="faq-item">
        <strong>How do the gunas affect daily life?</strong>
        <p>
          The gunas shape your mental states from moment to moment. When sattva is strong, you feel clear and focused. When rajas dominates, you feel driven but anxious. When tamas is high, you feel heavy, unmotivated, or confused. Diet, sleep, company, media consumption, and physical activity all influence which guna is currently predominating. 
        </p>
      </div>

      <div className="faq-item">
        <strong>Can you change your guna?</strong>
        <p>
          Yes. In BG 14.10 the gunas compete, with one overpowering the others for a time, so the balance can shift. The Gita describes specific foods, activities, and modes of worship associated with each guna in Chapters 17 and 18. Wholesome, nourishing food supports sattva (17.8). Working with excessive attachment feeds rajas. Excessive sleep and neglect increases tamas. The conditions you create shift the balance over time.
        </p>
      </div>

      <div className="faq-item">
        <strong>What is the gunatita state?</strong>
        <p>
          Gunatita means beyond the gunas. BG 14.20 describes this state as freedom from birth, aging, and death. It goes beyond sattva as well as rajas and tamas. BG 14.26 points to undivided devotion as the means. In practical terms, gunatita is described as equanimity: the ability to remain steady whether sattva, rajas, or tamas is arising, without being moved or controlled by any of them.
        </p>
      </div>

      <div className="faq-item">
        <strong>What guna should I aim for according to the Bhagavad Gita?</strong>
        <p>
          The Gita recommends cultivating sattva as a working condition. It supports clarity and makes spiritual practice possible. But the Gita explicitly warns against becoming attached even to sattva: BG 14.6 says sattva binds through attachment to happiness and knowledge. The final direction is to go beyond all three (14.20).
        </p>
      </div>
    </div>

    <div className="content">
      <VerseFunnelCTA variant="chapter" locale="en" pageName={"Three Gunas Sattva Rajas Tamas"} />
    </div>

    <SiteFooter />

    <BlogTracker pageName="Three Gunas Sattva Rajas Tamas" />
    </>
  )
}
