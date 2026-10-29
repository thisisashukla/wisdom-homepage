import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita on Anxiety — 9 Verses That Directly Address Fear, Worry & Overthinking",
  description: "In chapter 1 Arjuna trembles, his mouth goes dry and his bow slips. Verses on fear, worry and the restless mind, with Sanskrit, English meaning and what Krishna tells him to do.",
  keywords: "bhagavad gita on anxiety, what does bhagavad gita say about anxiety, bhagavad gita verses for anxiety, bhagavad gita stress, bhagavad gita on fear, bhagavad gita mental health, bhagavad gita on worry, bhagavad gita restless mind, bhagavad gita depression",
  openGraph: {
    title: "Bhagavad Gita on Anxiety — 9 Verses That Directly Address Fear, Worry & Overthinking",
    description: "In chapter 1 Arjuna trembles and his bow slips from his hand. Verses on fear, worry and the restless mind, with Sanskrit and English meaning.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Bhagavad Gita on Anxiety — 9 Verses That Directly Address Fear, Worry & Overthinking",
    description: "In chapter 1 Arjuna trembles and his bow slips from his hand. Verses on fear, worry and the restless mind, with Sanskrit and English meaning.",
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety",
    languages: {
      'en': "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety",
      'en-IN': "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety",
      'x-default': "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety",
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
            content: "शान्ति";
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

        /* Chain sequence */
        .chain-sequence {
            background: var(--bg-alt);
            border: 1px solid var(--border);
            border-radius: 8px;
            padding: 1.5rem 2rem;
            margin: 2rem 0;
        }
        .chain-sequence h3 {
            color: var(--gold);
            font-size: 0.85rem;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            margin-bottom: 1rem;
        }
        .chain-step {
            display: flex;
            align-items: center;
            gap: 12px;
            margin-bottom: 0.6rem;
        }
        .chain-step-label {
            color: var(--text-dim);
            font-size: 0.95rem;
        }
        .chain-arrow {
            color: var(--gold);
            font-size: 0.85rem;
            opacity: 0.6;
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
            h2 { font-size: 1.5rem; }
            .app-cta { padding: 32px 24px 28px; }
        }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What the Bhagavad Gita Says About Anxiety: 9 Verses That Help",
    "description": "The Bhagavad Gita opens with Arjuna trembling and unable to fight. Here are the verses on fear, worry and the restless mind.",
    "datePublished": "2026-06-12",
    "dateModified": "2026-08-01",
    "image": { "@type": "ImageObject", "url": "https://wisdomquotes.in/og-image.webp", "width": 1200, "height": 630 },
    "mainEntityOfPage": { "@type": "WebPage", "@id": "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety" },
    "author": {
      "@type": "Person",
      "name": "Ankur Shukla",
      "url": "https://wisdomquotes.in/about",
      "sameAs": [
        "https://www.linkedin.com/in/thisisashukla/",
        "https://x.com/thisisashukla"
      ]
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
      { "@type": "ListItem", "position": 3, "name": "Bhagavad Gita on Anxiety — 9 Verses That Directly Address Fear, Worry & Overthinking", "item": "https://wisdomquotes.in/blogs/bhagavad-gita-on-anxiety" }
    ]
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
          "text": "The Gita is a philosophical text, not medical advice, but it begins with a man overwhelmed by fear and grief. In chapter 1 Arjuna trembles, his mouth goes dry and he cannot stand (1.29–30). Krishna replies with, among other things, a chain from dwelling on objects to attachment, desire, anger and the loss of judgment (BG 2.62–63)."
        }
      },
      {
        "@type": "Question",
        "name": "What does Krishna say about fear in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In BG 2.14 Krishna tells Arjuna that pleasant and painful experiences come and go and should be borne with patience. In BG 2.56 he describes the steady-minded person as free from attachment, fear and anger (vīta-rāga-bhaya-krodha). The Gita names fear alongside attachment, so its practice works on the attachment."
        }
      },
      {
        "@type": "Question",
        "name": "What are the best Bhagavad Gita verses for mental peace?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 2.65 says that in serenity (prasada) all sorrow ends. BG 6.5 says a person must lift themselves up and is their own friend and enemy. BG 6.35 admits the mind is restless and says practice and detachment can steady it. BG 12.15 describes a person who neither troubles others nor is troubled by them."
        }
      },
      {
        "@type": "Question",
        "name": "Is the Bhagavad Gita relevant for modern anxiety?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Many readers find that it is. The chain in BG 2.62–63, from dwelling on an object to attachment, desire, anger and lost judgment, describes a pattern people still recognise. The Gita offers an account of why the mind gets disturbed and what steadies it, and it is no substitute for professional care."
        }
      },
      {
        "@type": "Question",
        "name": "What is prasada in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Prasada in BG 2.65 means clarity or serenity. In 2.64 it comes to a person who moves among sense objects without attraction or aversion. When prasada arises, the verse says, all sorrow ends and the intellect soon becomes steady."
        }
      }
    ]
  }
]

export default function GitaOnAnxietyPage() {
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
          Gita on Anxiety
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Mental Peace
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            The Bhagavad Gita on Anxiety:<br />
            <em>What Krishna Says</em>
          </h1>
          <p className="article-subtitle">
            In chapter 1 Arjuna trembles, his mouth goes dry and his bow slips from his hand. The rest of the Gita is Krishna&apos;s reply to him.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Mental Peace · Chapters 2, 6 &amp; 12</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~8 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/chapter1.webp"
            alt="Arjuna and Krishna on the battlefield of Kurukshetra, the setting of the Bhagavad Gita's teaching on anxiety and the restless mind"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Arjuna and Krishna at Kurukshetra</figcaption>
        </figure>

        <p className="lead">
          The Bhagavad Gita begins on a battlefield. Arjuna looks across at teachers, cousins and elders he has known all his life, and his body gives way: his limbs fail, his mouth dries, his skin burns and his bow slips from his hand (1.29–30). At the end of chapter 1 he sits down in the chariot, overcome with grief (1.47). In 2.7 he admits he no longer knows what is right and asks Krishna to teach him.
        </p>
        <p>
          Krishna never tells Arjuna that everything will be fine. Over the next seventeen chapters he explains where the disturbance comes from, how the mind builds it, what lets it settle, and what a steady person looks like.
        </p>

        <h2>Arjuna in Chapter 1</h2>
        <p>
          Arjuna is a famous archer, the man who won Draupadi&apos;s hand by hitting a target few could reach. The people arrayed against him include his teacher Drona and his grandfather Bhishma. He has asked Krishna to drive the chariot between the armies so he can see them, and he does.
        </p>
        <p>
          His body fails first: limbs, mouth, skin, the grip on his bow. Then his reasons pile up. He says he wants no victory, kingdom or pleasure bought with his kinsmen&apos;s lives (1.32), and that killing them will destroy families and their traditions (1.39–44).
        </p>
        <p>
          The Gita is sometimes read as abstract philosophy, but every chapter after this one is addressed to the man sitting in that chariot.
        </p>

        <h2>Bearing What Passes: 2.14</h2>
        <p>
          One of Krishna&apos;s first teachings points Arjuna to how sensations behave.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.14"
          sanskrit="मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः । आगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥"
          iast="mātrāsparśāstu kaunteya śītoṣṇasukhaduḥkhadāḥ | āgamāpāyino'nityāstāṃstitikṣasva bhārata ||"
          meaningLabel="Translation"
          meaning="The things you feel through your senses, like hot and cold or comfort and discomfort, come and go and do not last. Arjuna, bear them patiently."
          insightLabel="What This Teaches"
          insight="Krishna observes that sensations of heat and cold, pleasure and pain arrive and depart, and asks Arjuna to bear them. The word is titikṣasva, from titiksha, patient endurance. A stressful meeting or an argument works the same way: the discomfort is real, and it passes."
          essence="Heat and cold, pleasure and pain come and go. Bear them patiently."
        />

        <p>
          Titiksha means to bear something with patience. The fear is allowed to be there; Arjuna is asked to carry it without being carried off by it.
        </p>

        <h2>The Cascade from Attachment to Ruin</h2>
        <p>
          In 2.62–63 Krishna describes how the mind moves from dwelling on something to losing its judgment entirely. Each step follows from the last.
        </p>

        <div className="chain-sequence">
          <h3>From Dwelling to Ruin (BG 2.62–63)</h3>
          <div className="chain-step">
            <span className="chain-step-label">Dwelling on sense objects (turning something over and over in the mind)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Attachment forms (you need things to go a specific way)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Desire intensifies (craving for that outcome)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Anger arises when desire is frustrated (or fear of frustration)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Delusion (you can no longer think clearly about the situation)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Memory fails (you cannot access what you know about yourself and your values)</span>
          </div>
          <div className="chain-step">
            <span className="chain-arrow">↓</span>
          </div>
          <div className="chain-step">
            <span className="chain-step-label">Buddhi (discernment) is destroyed, and the person is ruined</span>
          </div>
        </div>

        <p>
          Krishna states the chain about desire and anger in general, but it fits Arjuna in chapter 1. He has been dwelling on the faces across the field and on what the battle will cost. By 2.7 he says his mind is confused about dharma. Much of the dialogue that follows is Krishna restoring his buddhi so he can decide.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.65"
          sanskrit="प्रसादे सर्वदुःखानां हानिरस्योपजायते । प्रसन्नचेतसो ह्याशु बुद्धिः पर्यवतिष्ठते ॥"
          iast="prasāde sarvaduḥkhānāṃ hānirasyopajāyate | prasannacetaso hyāśu buddhiḥ paryavatiṣṭhate ||"
          meaningLabel="Translation"
          meaning="When the mind is serene, all sorrow ends, and the intellect of the serene person soon becomes steady."
          insightLabel="What This Teaches"
          insight="In the previous verse, 2.64, Krishna describes a person who moves among sense objects without attraction or aversion and gains prasada, serenity. Here he says what prasada does: sorrow ends, and the buddhi, the faculty that judges, settles quickly."
          essence="In serenity all sorrow ends, and the intellect soon becomes steady."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 2.66"
          sanskrit="नास्ति बुद्धिरयुक्तस्य न चायुक्तस्य भावना । न चाभावयतः शान्तिरशान्तस्य कुतः सुखम् ॥"
          iast="nāsti buddhirayuktasya na cāyuktasya bhāvanā | na cābhāvayataḥ śāntiraśāntasya kutaḥ sukham ||"
          meaningLabel="Translation"
          meaning="If you do not have control over your senses and mind, your thinking is unclear, you cannot develop true intention, and without this, you will not find peace or lasting happiness."
          insightLabel="What This Teaches"
          insight="Krishna gives a sequence: without discipline there is no clear understanding, without that no steady contemplation, without contemplation no peace (shanti), and without peace no happiness (sukha). He states it as cause and effect."
          essence="Without peace, how can there be happiness? Peace needs a disciplined mind."
        />

        <h2>You Are Your Own Friend and Enemy</h2>
        <p>
          Worry often feels like something that happens to you. In chapter 6 Krishna puts the responsibility for lifting the mind on the person who has it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 6.5"
          sanskrit="उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥"
          iast="uddharedātmanā''tmānaṃ nātmānamavasādayet | ātmaiva hyātmano bandhurātmaiva ripurātmanaḥ ||"
          meaningLabel="Translation"
          meaning="Uplift yourself through your own actions and thoughts. Do not let yourself fall, because you alone are your own friend and also your own enemy."
          insightLabel="What This Teaches"
          insight="Krishna uses forms of the word atman seven times in two lines: lift the self by the self, do not let the self sink, for the self is its own friend and its own enemy. The next verse, 6.6, adds that the self is a friend to one who has mastered it, and an enemy to one who has not."
          essence="Lift yourself by yourself. You are your own friend and your own enemy."
        />

        <p>
          The verse is about agency. The same mind that produces worry can produce steadiness, and in the Gita&apos;s framing a person can both lose and recover their own clarity.
        </p>

        <h2>Prasada: What the Gita Calls Serenity</h2>
        <p>
          The word prasada appears in BG 2.65 and is often translated as serenity or grace. In 2.64 it is what comes to a person whose senses are free of attraction and aversion. When craving and aversion both settle, what remains is prasada.
        </p>
        <p>
          
        </p>
        <p>
          BG 12.15 describes a person who has that kind of steadiness.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 12.15"
          sanskrit="यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः । हर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः ॥"
          iast="yasmānnodvijate loko lokānnodvijate ca yaḥ | harṣāmarṣabhayodvegairmukto yaḥ sa ca me priyaḥ ||"
          meaningLabel="Translation"
          meaning="One by whom the world is not disturbed, who is not disturbed by the world, and who is free from elation, envy, fear and agitation, is dear to me."
          insightLabel="What This Teaches"
          insight="Krishna names four states the devotee is free of: harsha (elation), amarsha (envy or intolerance), bhaya (fear) and udvega (agitation). He also gives a test that works in both directions: this person does not trouble others and is not troubled by them."
          essence="One who neither troubles the world nor is troubled by it is dear to me."
        />

        <h2>Krishna Agrees the Mind Is Hard: 6.35</h2>
        <p>
          In 6.33–34 Arjuna complains that the mind is restless and as hard to hold as the wind. Krishna agrees with him.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 6.35"
          sanskrit="श्री भगवानुवाच असंशयं महाबाहो मनो दुर्निग्रहं चलं । अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥"
          iast="śrī bhagavānuvāca asaṃśayaṃ mahābāho mano durnigrahaṃ calaṃ | abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||"
          meaningLabel="Translation"
          meaning="Shri Krishna says: Yes, Arjuna, you are right. The mind is restless and hard to control. But it can be brought under control through regular practice (abhyasa) and detachment (vairagya)."
          insightLabel="What This Teaches"
          insight="Krishna begins with asaṃśayam, &quot;without doubt&quot;: the mind is restless and hard to control. Then he names two means, abhyasa (practice) and vairagya (detachment). Regular meditation, steady study, and doing one&apos;s work without clinging to results are all forms of abhyasa."
          essence="The mind is restless, but practice and detachment bring it under control."
        />

        <p>
          Abhyasa means returning to the practice again and again. Vairagya means loosening the grip of craving. Krishna makes no promise about speed.
        </p>

        <h2>Two Common Misreadings</h2>
        <p>
          Two misreadings make the teaching seem either impossible or useless.
        </p>

        <div className="highlight-box">
          <h3>Steady Is Different from Unfeeling</h3>
          <p>
            Krishna does tell Arjuna that he grieves for those who should not be grieved for (2.11). His argument is about the reasons for the grief, and the instruction in 2.14 is to bear what comes and goes.
          </p>
          <p>
            The steady-minded person in BG 2.56 stays unshaken in sorrow and free of craving in pleasure. A mind that sorrow cannot shake is one that still meets sorrow.
          </p>
          <p>
            Arjuna also takes a long time to move from grief to action. Krishna answers his arguments over many chapters before Arjuna says his confusion is gone (18.73).
          </p>
        </div>

        <h2>On the Specific Anxiety About Outcomes</h2>
        <p>
          Much everyday worry is about outcomes: whether something will work, and what people will think if it fails. The Gita speaks to this directly.
        </p>
        <p>
          BG 2.47 says your right is to the action, never to its fruits. Outcomes still matter. The trouble starts when the expected result becomes the reason for acting and the measure of your worth, because then you depend on something you cannot fully control, and the work turns into constant checking on whether the result is still on track.
        </p>
        <p>
          BG 2.38 gives the instruction: treat pleasure and pain, gain and loss, victory and defeat alike, and then fight. Krishna is asking for an even mind while acting, which lets Arjuna act without being ruled by what might happen.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.38"
          sanskrit="सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ । ततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि ॥"
          iast="sukhaduḥkhe same kṛtvā lābhālābhau jayājayau | tato yuddhāya yujyasva naivaṃ pāpamavāpsyasi ||"
          meaningLabel="Translation"
          meaning="Treat pleasure and pain, gain and loss, victory and defeat alike, then engage in battle. This way you will incur no sin."
          insightLabel="What This Teaches"
          insight="Krishna lists three pairs, pleasure and pain, gain and loss, victory and defeat, and asks Arjuna to hold them alike before he acts. This evenness is samatva, which 2.48 defines as yoga. At work, it means doing the job well without letting each win or loss decide your mood."
          essence="Hold gain and loss, victory and defeat alike, then act."
        />

        <p>
          Samatva has to be practised. Krishna does not promise that Arjuna will feel fine at once. He gives him a different way to hold the situation and then spends the rest of the Gita giving the reasons for it.
        </p>
        <p>
          At the end, Arjuna says his delusion is gone, his memory restored, and that he will do as Krishna says (18.73). He is the same man who sat down in chapter 1. What has changed is how he understands what he is about to do.</p> <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the claim that Krishna does not tell Arjuna to stop grieving (see 2.11), narrowed the dwelling-to-ruin chain to 2.62–63, removed details not in 1.28–30, corrected the translations of 2.38, 2.65 and 12.15, and removed medical framing; copy edited.
        </p>
      </div>


      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>Does the Bhagavad Gita help with anxiety?</strong>
          <p>
            The Gita is a philosophical text, not medical advice, but it begins with a man overwhelmed by fear and grief. In chapter 1 Arjuna trembles, his mouth goes dry and he cannot stand (1.29–30). Krishna replies with, among other things, a chain from dwelling on objects to attachment, desire, anger and the loss of judgment (BG 2.62–63).
          </p>
        </div>

        <div className="faq-item">
          <strong>What does Krishna say about fear in the Bhagavad Gita?</strong>
          <p>
            In BG 2.14 Krishna tells Arjuna that pleasant and painful experiences come and go and should be borne with patience. In BG 2.56 he describes the steady-minded person as free from attachment, fear and anger. The Gita names fear alongside attachment, so its practice works on the attachment.
          </p>
        </div>

        <div className="faq-item">
          <strong>What are the best Bhagavad Gita verses for mental peace?</strong>
          <p>
            BG 2.65 says that in serenity (prasada) all sorrow ends. BG 6.5 says a person must lift themselves up and is their own friend and enemy. BG 6.35 admits the mind is restless and says practice and detachment can steady it. BG 12.15 describes a person who neither troubles others nor is troubled by them.
          </p>
        </div>

        <div className="faq-item">
          <strong>Is the Bhagavad Gita relevant for modern anxiety?</strong>
          <p>
            Many readers find that it is. The chain in BG 2.62–63, from dwelling on an object to attachment, desire, anger and lost judgment, describes a pattern people still recognise. The Gita offers an account of why the mind gets disturbed and what steadies it, and it is no substitute for professional care.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is prasada in the Bhagavad Gita?</strong>
          <p>
            Prasada in BG 2.65 means clarity or serenity. In 2.64 it comes to a person who moves among sense objects without attraction or aversion. When prasada arises, the verse says, all sorrow ends and the intellect soon becomes steady.
          </p>
        </div>
      </div>

      <div className="content" style={{ paddingTop: 0 }}>
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagavad Gita On Anxiety"} />
      </div>

      <SiteFooter />

      <BlogTracker pageName="Bhagavad Gita On Anxiety" />
    </>
  )
}
