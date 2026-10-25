import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind",
  description: "Sthitaprajna is the Gita's word for a person whose wisdom is steady. BG 2.55-2.72 lists the qualities, from the tortoise image (2.58) to the ocean that rivers fill without moving it (2.70).",
  keywords: "sthitaprajna meaning, sthitaprajna bhagavad gita, sthitaprajna lakshana, sthita prajna definition, steady minded person bhagavad gita, bhagavad gita 2.55 meaning, bhagavad gita equanimity, wise person gita qualities, sthita dhi",
  openGraph: {
    title: "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind | Wisdom",
    description: "Sthitaprajna is the Gita's word for a person whose wisdom is steady. BG 2.55-2.72 lists the qualities, from the tortoise image (2.58) to the ocean that rivers fill without moving it (2.70).",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/sthitaprajna-bhagavad-gita",
    siteName: 'Wisdom',
    images: [{ url: 'https://wisdomquotes.in/og-image.webp', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@sansearchapp',
    creator: '@thisisashukla',
    title: "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind | Wisdom",
    description: "Sthitaprajna is the Gita's word for a person whose wisdom is steady. BG 2.55-2.72 lists the qualities, from the tortoise image (2.58) to the ocean that rivers fill without moving it (2.70).",
    images: ['https://wisdomquotes.in/og-image.webp'],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/sthitaprajna-bhagavad-gita",
    languages: { 'x-default': "https://wisdomquotes.in/blogs/sthitaprajna-bhagavad-gita" },
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
            content: "स्थित";
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

        /* Quick reference list */
        .verse-reference-list {
            margin: 2rem 0;
            display: grid;
            gap: 0.6rem;
        }
        .verse-ref-item {
            display: grid;
            grid-template-columns: 90px 1fr;
            gap: 1rem;
            align-items: start;
            padding: 0.85rem 1rem;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 6px;
            font-size: 0.92rem;
        }
        .verse-ref-item:hover {
            background: var(--bg-card-hover);
        }
        .verse-ref-num {
            color: var(--gold);
            font-weight: 700;
            font-size: 0.82rem;
            letter-spacing: 0.05em;
            padding-top: 1px;
        }
        .verse-ref-essence {
            color: var(--text-dim);
            line-height: 1.5;
        }

        /* Cascade diagram */
        .cascade-chain {
            margin: 2rem 0;
            display: flex;
            flex-direction: column;
            gap: 0;
        }
        .cascade-step {
            display: flex;
            align-items: center;
            gap: 1rem;
            padding: 0.75rem 1rem;
            background: var(--bg-card);
            border: 1px solid var(--border);
            border-radius: 6px;
            margin-bottom: 2px;
            font-size: 0.95rem;
            color: var(--text-dim);
        }
        .cascade-step .step-num {
            width: 24px;
            height: 24px;
            border-radius: 50%;
            background: var(--gold-dim);
            border: 1px solid var(--gold-border);
            color: var(--gold-light);
            font-size: 0.75rem;
            font-weight: 700;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-shrink: 0;
        }
        .cascade-arrow {
            text-align: center;
            color: var(--gold);
            opacity: 0.5;
            font-size: 1.2rem;
            margin: 2px 0;
            line-height: 1;
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
            .verse-ref-item { grid-template-columns: 70px 1fr; }
        }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind | Wisdom",
    "description": "Sthitaprajna is the Gita's word for a person whose wisdom is steady. BG 2.55-2.72 lists the qualities, from the tortoise image (2.58) to the ocean that rivers fill without moving it (2.70).",
    "datePublished": "2026-06-12",
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
      "name": "Wisdom App",
      "url": "https://wisdomquotes.in"
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wisdom", "item": "https://wisdomquotes.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://wisdomquotes.in/blogs/" },
      { "@type": "ListItem", "position": 3, "name": "Sthitaprajna: The Bhagavad Gita's 18-Verse Portrait of an Unshakeable Mind", "item": "https://wisdomquotes.in/blogs/sthitaprajna-bhagavad-gita" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What does sthitaprajna mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Sthitaprajna is a Sanskrit compound: sthita means steady or established, prajna means wisdom or discernment. Together it means one whose wisdom is steady, or a person of steady intellect. "
        }
      },
      {
        "@type": "Question",
        "name": "Which verses describe sthitaprajna in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The sthitaprajna description spans BG 2.55 to 2.72, eighteen consecutive verses in Chapter 2. It begins after Arjuna's question in verse 2.54, where he asks Krishna to describe the marks of a person of steady wisdom."
        }
      },
      {
        "@type": "Question",
        "name": "What are the sthitaprajna lakshana, the marks of steady wisdom?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The key marks include: abandoning all desires from the mind and being content within oneself (2.55), not being disturbed by sorrow or excited by pleasure (2.56), remaining unattached everywhere (2.57), withdrawing the senses from objects when needed like a tortoise withdrawing its limbs (2.58), staying steady even when sense objects are present (2.59-2.61), and being like an ocean that receives all rivers without overflowing (2.70)."
        }
      },
      {
        "@type": "Question",
        "name": "Is sthitaprajna the same as being emotionless?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "No. BG 2.56 says the sthitaprajna is not shaken by sorrow and does not crave pleasure, which assumes they meet both. BG 2.65 describes the outcome as prasada, a state of serenity and clarity."
        }
      },
      {
        "@type": "Question",
        "name": "What is the significance of the tortoise image in BG 2.58?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "BG 2.58 compares withdrawing the senses to a tortoise (kūrma) pulling in its limbs. A tortoise puts its limbs out again when it is safe, so the image describes a withdrawal the person controls. The yoga tradition calls this pratyahara, the ability to disengage attention at will."
        }
      }
    ]
  }
]

export default function SthitaprajnaPage() {
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
          Sthitaprajna Bhagavad Gita
        </div>
      </div>

      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Chapter 2, Verses 55 to 72
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Sthitaprajna: What the Gita Calls<br />
            <em>an Unshakeable Mind</em>
          </h1>
          <p className="article-subtitle">
            In Chapter 2 verse 54, Arjuna asks Krishna: &ldquo;What are the marks of a person of steady wisdom?&rdquo; Krishna answers across 18 consecutive verses, 2.55 to 2.72. This guide goes through what those verses say.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Concept Guide · Chapter 2</span>
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
            src="/assets/chapter2.webp"
            alt="Chapter 2 of the Bhagavad Gita, where Krishna describes the sthitaprajna across 18 verses"
            width="1200"
            height="675"
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>BG 2.55 to 2.72: Krishna&apos;s portrait of a steady mind</figcaption>
        </figure>

        <p className="lead">
          The word <em>sthitaprajna</em> appears for the first time in BG 2.54, when Arjuna asks how to recognize a person of steady wisdom. How do they speak, how do they sit, how do they move? Krishna&apos;s response is eighteen consecutive verses, verse 2.55 through verse 2.72. 
        </p>

        <h2>Arjuna&apos;s Question</h2>
        <p>
          The question in verse 2.54 is worth quoting before anything else: sthitaprajnasya ka bhasha samadhisthasya kesava. &ldquo;O Krishna, what is the description of one who has steady wisdom, who is established in samadhi? How does such a person speak? How do they sit? How do they walk?&rdquo;
        </p>
        <p>
          The question is concrete. Arjuna wants to know what he would see if he stood next to this person, and what he would hear if they spoke: the outward signs of an inner state.
        </p>
        <p>
          Krishna&apos;s answer works on two levels at once. It describes what the sthitaprajna is like from the outside, and it also serves as a guide for the person who wants to cultivate that state. Each quality is both a description and an instruction.
        </p>
        <p>
          The compound word itself: sthita means established, rooted, steady. Prajna means wisdom, discernment, the faculty that sees clearly. Sthitaprajna is the person whose discernment is rooted, whose clarity does not come and go with circumstances. 
        </p>

        <h2>The First Mark: Abandoned Desires</h2>
        <p>
          Krishna starts with something inward: what the person has let go of.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.55"
          sanskrit="प्रजहाति यदा कामान् सर्वान् पार्थ मनोगतान् । आत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥"
          iast="prajahāti yadā kāmān sarvān pārtha manogatān | ātmanyevātmanā tuṣṭaḥ sthitaprajñastadocyate ||"
          meaningLabel="Translation"
          meaning="When a person gives up all desires that come from the mind, and is satisfied within themselves by their own self, that person is called one of steady wisdom."
          insightLabel="What This Means"
          insight="Krishna names two marks: the desires that arise in the mind are given up, and the person is content in the self, by the self."
          essence="When you let go of every desire in the mind and are content in yourself, by yourself, you are steady (2.55)."
        />

        <p>
          The word manogatān means &ldquo;residing in the mind&rdquo;. The verse locates desire in the mind, and the world keeps offering things to want. What the sthitaprajna has given up is the mind&apos;s habit of producing wants by default, which is why the state does not depend on circumstances.
        </p>
        <p>
          The second half of the verse, ātmany evātmanā tuṣṭaḥ, means satisfied in the self, by the self. The person&apos;s sense of being complete needs no outside input, so they can engage with the world without desperation.
        </p>

        <h2>The Tortoise (Kachhua) Verse</h2>
        <p>
          Three verses later, in 2.58, Krishna compares the steady person to a tortoise (kūrma).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.58"
          sanskrit="यदा संहरते चायं कूर्मोऽङ्गानीव सर्वशः । इन्द्रियाणीन्द्रियार्थेभ्यस्तस्य प्रज्ञा प्रतिष्ठिता ॥"
          iast="yadā saṃharate cāyaṃ kūrmo'ṅgānīva sarvaśaḥ | indriyāṇīndriyārthebhyastasya prajñā pratiṣṭhitā ||"
          meaningLabel="Translation"
          meaning="When you pull your senses away from outside attractions, like a tortoise pulls in its limbs, your understanding becomes steady and calm."
          insightLabel="What This Means"
          insight="Steady understanding belongs to the one who can draw the senses back from their objects, as a tortoise draws in its limbs."
          essence="Like a tortoise drawing in its limbs, the steady person draws the senses back from their objects."
        />

        <p>
          A tortoise pulls its limbs in when threatened and puts them out again when it is safe. The verse applies that ability to the senses. The yoga tradition calls it pratyāhāra: disengaging attention from sense objects at will.
        </p>
        <p>
          In practice: someone says something provocative and you feel the pull to react at once. The tortoise skill is noticing that pull, letting it pass, and then choosing whether and how to respond.
        </p>

        <div className="pull-quote">
          The tortoise keeps its limbs and puts them out when it chooses. That separates the sthitaprajna from someone who is numb or disconnected.
        </div>

        <h2>The Cascade</h2>
        <p>
          After describing the positive qualities of steady wisdom, verses 2.62 and 2.63 describe the opposite: what happens when you do not exercise this withdrawal. Krishna lays out a sequence in which each step follows from the one before.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.62"
          sanskrit="ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते । सङ्गात् संजायते कामः कामात्क्रोधोऽभिजायते ॥"
          iast="dhyāyato viṣayānpuṃsaḥ saṅgasteṣūpajāyate | saṅgāt saṃjāyate kāmaḥ kāmātkrodho'bhijāyate ||"
          meaningLabel="Translation"
          meaning="When you constantly think about objects and pleasures, you become attached to them. This attachment creates desire, which leads to anger if unfulfilled."
          insightLabel="What This Teaches"
          insight="The chain starts with dwelling on objects. Dwelling breeds attachment, attachment breeds desire, and thwarted desire turns into anger."
          essence="Dwelling on objects breeds attachment, attachment breeds desire, and desire breeds anger."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 2.63"
          sanskrit="क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः । स्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥"
          iast="krodhādbhavati saṃmohaḥ saṃmohātsmṛtivibhramaḥ | smṛtibhraṃśād buddhināśo buddhināśātpraṇaśyati ||"
          meaningLabel="Translation"
          meaning="Anger leads to confusion, then loss of memory and understanding, and finally a person falls from their true path."
          insightLabel="What This Teaches"
          insight="The chain continues: anger brings delusion, delusion confuses memory, lost memory destroys discernment, and without discernment a person is ruined."
          essence="From anger comes delusion, then confused memory, lost discernment, and ruin."
        />

        <p>
          Written out in sequence, the cascade across 2.62 and 2.63 is:
        </p>

        <div className="cascade-chain">
          <div className="cascade-step"><span className="step-num">1</span>Dwelling on sense objects (dhyayato vishayan)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">2</span>Attachment forms (sanga)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">3</span>Desire arises from attachment (kama)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">4</span>Anger when desire is blocked (krodha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">5</span>Confusion, delusion (sammoha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">6</span>Loss of memory and discernment (smriti-bhramsha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">7</span>Destruction of intellect (buddhi-nasha)</div>
          <div className="cascade-arrow">↓</div>
          <div className="cascade-step"><span className="step-num">8</span>Ruin (pranashyati)</div>
        </div>

        <p>
          The sequence starts with something that seems harmless: turning an object over in your mind, without doing anything about it. In the Gita&apos;s account, desire and anger come later. The chain begins with where you place your attention.
        </p>
        <p>
          This connects back to the tortoise verse (2.58). Withdrawing attention from an object is an intervention at step one, before steps two through eight can start. By the time you are at anger, much of the cascade has already happened. The time to act is much earlier, at the level of where you are placing your mind.
        </p>

        <h2>What Sthitaprajna Is Not</h2>
        <p>
          The qualities described across 2.55 to 2.72 are easy to misread as a portrait of someone emotionally flat, someone who has achieved stability by cutting off their emotional range. The verses do not support that reading.
        </p>
        <p>
          BG 2.56 says the sthitaprajna is not shaken by sorrow and does not crave pleasure, which assumes they meet both. Sorrow reaches them; it does not knock them off their footing.
        </p>
        <p>
          BG 2.65 gives the clearest counter to the numbness interpretation:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.65"
          sanskrit="प्रसादे सर्वदुःखानां हानिरस्योपजायते । प्रसन्नचेतसो ह्याशु बुद्धिः पर्यवतिष्ठते ॥"
          iast="prasāde sarvaduḥkhānāṃ hānirasyopajāyate | prasannacetaso hyāśu buddhiḥ paryavatiṣṭhate ||"
          meaningLabel="Translation"
          meaning="When the mind and heart are pure and steady, all sorrow disappears, and your intelligence quickly becomes steady."
          insightLabel="What This Means"
          insight="Once the mind is clear and settled (prasāda), sorrows end, and the intellect soon becomes steady."
          essence="When the mind settles into clarity, sorrow ends and understanding quickly steadies."
        />

        <p>
          The key word in this verse is prasāda, often translated as serenity or grace, with a sense of brightness and clarity. The verse says that once prasāda is established, all sorrow falls away and the intellect settles. That is the outcome of steady wisdom, and it is the opposite of numbness.
        </p>

        <h2>The Tortoise and the Ocean</h2>
        <p>
          Near the end of the sthitaprajna section, Krishna gives a second extended image. If the tortoise verse describes a capacity (voluntary withdrawal of attention), the ocean verse describes a quality (what that capacity makes possible over time).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.70"
          sanskrit="आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत् । तद्वत्कामा यं प्रविशन्ति सर्वे स शान्तिमाप्नोति न कामकामी ॥"
          iast="āpūryamāṇamacalapratiṣṭhaṃ samudramāpaḥ praviśanti yadvat | tadvatkāmā yaṃ praviśanti sarve sa śāntimāpnoti na kāmakāmī ||"
          meaningLabel="Translation"
          meaning="Just as the ocean stays steady and is not disturbed even when many rivers flow into it, a person who stays balanced and calm amidst all desires and pleasures attains real shanti. The person who constantly chases desires does not find true peace."
          insightLabel="What This Means"
          insight="Desires enter the steady person the way rivers enter the ocean, which stays full and unmoved. That person finds peace; the one who chases desires does not."
          essence="Desires flow in like rivers into the ocean, and the steady person stays unmoved and at peace."
        />

        <p>
          The ocean takes in every river and its level stays the same. Where the tortoise withdraws, the ocean receives: here the sthitaprajna is open to experience, desires arrive, and the person stays steady.
        </p>
        <p>
          Together, the two images give a more complete picture. The tortoise is about active management of where attention goes: a skill you practice, a choice you make. The ocean is about what that practice builds over time: a settled quality of being that is not disturbed even when you are fully open and engaged.
        </p>

        <h2>Steadiness in Ordinary Life</h2>
        <p>
          Most people have plenty they want to do. What they often lack is the stability to pursue it without being thrown by outcomes, by other people&apos;s reactions, or by not knowing whether it will work out.
        </p>
        <p>
          When something does not go as expected, there is a habitual question: what does this mean about me? If the result is bad, maybe I am not good enough. If I am not recognized, maybe my effort was worthless. These questions pull you into the chain that 2.62 and 2.63 describe, and the cost is clarity: you lose the ability to think straight about what to do next.
        </p>
        <p>
          In practical terms, sthitaprajna is the ability to take in a setback or bad feedback without collapsing under it, the way the ocean takes in a river. That steadiness lets you act well when the situation is hard.
        </p>

        <h2>All 18 Qualities: Quick Reference</h2>
        <p>
          Here is a one-line summary of each verse in the sequence, 2.55 to 2.72:
        </p>

        <div className="verse-reference-list">
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.55</span>
            <span className="verse-ref-essence">When you let go of every desire in the mind and are content in yourself, by yourself, you are steady (2.55).</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.56</span>
            <span className="verse-ref-essence">Unshaken in sorrow, free of craving in pleasure, free of attachment, fear and anger: that is the sage of steady mind.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.57</span>
            <span className="verse-ref-essence">Unattached everywhere, neither delighting in good fortune nor hating bad, their wisdom is steady.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.58</span>
            <span className="verse-ref-essence">Like a tortoise drawing in its limbs, the steady person draws the senses back from their objects.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.59</span>
            <span className="verse-ref-essence">Fasting turns the senses from their objects, but the taste for them stays until the Supreme is seen.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.60</span>
            <span className="verse-ref-essence">The turbulent senses can carry off the mind even of a wise person who is striving.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.61</span>
            <span className="verse-ref-essence">Restrain the senses and sit absorbed in Krishna; whoever controls the senses has steady wisdom.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.62</span>
            <span className="verse-ref-essence">Dwelling on objects breeds attachment, attachment breeds desire, and desire breeds anger.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.63</span>
            <span className="verse-ref-essence">From anger comes delusion, then confused memory, lost discernment, and ruin.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.64</span>
            <span className="verse-ref-essence">Moving among objects free of attraction and aversion, with the senses controlled, one reaches prasāda.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.65</span>
            <span className="verse-ref-essence">When the mind settles into clarity, sorrow ends and understanding quickly steadies.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.66</span>
            <span className="verse-ref-essence">The undisciplined have no wisdom and no peace, and without peace there is no happiness.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.67</span>
            <span className="verse-ref-essence">A mind that follows the roaming senses loses its wisdom, like a boat carried off by wind on water.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.68</span>
            <span className="verse-ref-essence">Whoever holds the senses back from their objects on every side has steady wisdom.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.69</span>
            <span className="verse-ref-essence">What is night for all beings, the self-controlled are awake to; where beings are awake is night for the sage.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.70</span>
            <span className="verse-ref-essence">Desires flow in like rivers into the ocean, and the steady person stays unmoved and at peace.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.71</span>
            <span className="verse-ref-essence">Whoever gives up all desires and lives without craving, possessiveness or ego attains peace.</span>
          </div>
          <div className="verse-ref-item">
            <span className="verse-ref-num">BG 2.72</span>
            <span className="verse-ref-essence">This is the brahmī sthiti; reaching it one is no longer deluded, and holding it even at death one attains brahma-nirvāṇa.</span>
          </div>
        </div>

        <p>
          The sequence has a shape. It begins with the internal condition (let go of desire, be content within), moves to the skills of sense management (the tortoise, the chain from dwelling to ruin, the watchfulness), describes the outcome (prasāda), and closes with the ocean (2.70) and the brahmī sthiti of verse 2.72.
        </p>

        <div className="highlight-box">
          <h3>A Note on the Word &ldquo;Steady&rdquo;</h3>
          <p>
            Prajna is sometimes translated as wisdom, sometimes as intellect, sometimes as discernment. The Sanskrit carries all three: it is the faculty that sees clearly, that distinguishes real from apparent, lasting from temporary. When the Gita calls the sthitaprajna someone whose prajna is established (sthita), it means this faculty of clear seeing is no longer a temporary visitor. It is the stable ground of the person&apos;s functioning. Most people have moments of clarity; for the sthitaprajna, clarity is the baseline.
          </p>
        </div>
      <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the one-line verse summaries to match what each verse says (including 2.55, which no longer adds atman), the order of the tortoise verse (2.58) relative to 2.62, the transliteration of 2.55, and the 2.65 translation; copy edited.</p>
      </div>

      <FeedbackWidget pageType="blog" />
      <div className="faq-section">
        <h2>Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What does sthitaprajna mean?</strong>
          <p>
            Sthitaprajna is a Sanskrit compound: sthita means steady or established, prajna means wisdom or discernment. Together it describes a person whose wisdom is steady and whose clarity does not come and go with circumstances.
          </p>
        </div>

        <div className="faq-item">
          <strong>Which verses describe sthitaprajna in the Bhagavad Gita?</strong>
          <p>
            The full sthitaprajna description spans BG 2.55 to 2.72, eighteen consecutive verses in Chapter 2. It begins after Arjuna&apos;s question in verse 2.54, where he asks Krishna to describe the marks of a person of steady wisdom.
          </p>
        </div>

        <div className="faq-item">
          <strong>What are the sthitaprajna lakshana, the marks of steady wisdom?</strong>
          <p>
            The key marks described across BG 2.55 to 2.72 include: abandoning desires from the mind and being content within oneself (2.55), not being disturbed by sorrow or excited by pleasure (2.56), remaining unattached across all situations (2.57), being able to withdraw senses from objects like a tortoise withdraws its limbs (2.58), the positive quality of prasada, serenity (2.65), and being like an ocean that receives all rivers without overflowing (2.70).
          </p>
        </div>

        <div className="faq-item">
          <strong>Is sthitaprajna the same as being emotionless?</strong>
          <p>
            No. BG 2.56 describes someone who meets both sorrow and pleasure without being shaken by either. BG 2.65 describes the outcome as prasada, a state of serenity and clarity.
          </p>
        </div>

        <div className="faq-item">
          <strong>What is the significance of the tortoise image in BG 2.58?</strong>
          <p>
            BG 2.58 compares withdrawing the senses to a tortoise (kūrma) pulling in its limbs. A tortoise puts its limbs out again when it is safe, so the image describes a withdrawal the person controls. The yoga tradition calls this pratyahara, the ability to disengage attention at will.
          </p>
        </div>
      </div>

      <div className="content">
        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Sthitaprajna Bhagavad Gita"} />
      </div>

      <footer>
        <p>© 2026 Wisdom App. Bhagavad Gita, tuned to your life.</p>
        <p><a href="https://wisdomquotes.in">Home</a> — <a href="https://wisdomquotes.in/blogs">Blog</a> — <a href={appStoreUrl('web_blog_footer')} target="_blank" rel="noopener" data-mp-location="footer">Download</a></p>
      </footer>

      <BlogTracker pageName="Sthitaprajna Bhagavad Gita" />
    </>
  )
}
