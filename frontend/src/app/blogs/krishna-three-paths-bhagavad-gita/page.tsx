import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Karma, Jnana & Bhakti Yoga: Krishna's Three Paths in the Gita",
  description: "Karma Yoga (2.47), Jnana Yoga (4.34), Bhakti Yoga (9.22): what each of Krishna's three paths asks of you, and which one suits your temperament.",
  keywords: "krishna three paths, karma yoga, jnana yoga, bhakti yoga, bhagavad gita three paths, three yogas of bhagavad gita, paths of yoga, karm pradhan bisva kari rakha, hoihi soi jo rama rachi rakha, ramcharitmanas karma, tulsidas surrender, gita on devotion, gita on knowledge, gita on action, which path is mine bhagavad gita, krishna teachings on yoga, jnana karma bhakti difference, sarva dharman parityajya, nimitta matra arjuna, nishkama karma, jnani bhakta gita 7.17, kshetra kshetrajna, gita and mental health, ACT therapy bhagavad gita, attachment science bhakti, witness consciousness gita, why three paths in gita, which yoga is best",
  authors: [{ name: 'Ankur Shukla', url: 'https://wisdomquotes.in/about' }],
  creator: 'Ankur Shukla',
  publisher: 'Wisdom',
  category: 'Hindu Philosophy',
  openGraph: {
    title: "Karma, Jnana & Bhakti Yoga: Krishna's Three Paths in the Gita",
    description: "Karma Yoga (2.47), Jnana Yoga (4.34), Bhakti Yoga (9.22): what each of Krishna's three paths asks of you, and which one suits your temperament.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita",
    siteName: 'Wisdom',
    locale: 'en_IN',
    publishedTime: '2026-05-24T00:00:00.000Z',
    modifiedTime: '2026-05-24T00:00:00.000Z',
    authors: ['https://wisdomquotes.in/about'],
    section: 'Bhagavad Gita',
    tags: ['Bhagavad Gita', 'Karma Yoga', 'Jnana Yoga', 'Bhakti Yoga', 'Three Paths', 'Krishna', 'Tulsidas', 'Hindu Philosophy', 'Mental Health'],
    images: [
      { url: 'https://wisdomquotes.in/assets/3paths.webp', width: 1536, height: 1024, alt: "Krishna's three paths, Wisdom, Action, Devotion, converging on Krishna as the supreme reality" },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Karma, Jnana & Bhakti Yoga: Krishna's Three Paths in the Gita",
    description: "Karma Yoga (2.47), Jnana Yoga (4.34), Bhakti Yoga (9.22): what each of Krishna's three paths asks of you, and which one suits your temperament.",
    images: ['https://wisdomquotes.in/assets/3paths.webp'],
    creator: '@thisisashukla',
    site: '@sansearchapp',
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita",
    languages: {
      'en': "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita",
      'en-IN': "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita",
      'x-default': "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita",
    },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
  other: {
    "article:published_time": "2026-05-24T00:00:00.000Z",
    "article:modified_time": "2026-05-24T00:00:00.000Z",
    "article:author": "Ankur Shukla",
    "article:section": "Bhagavad Gita",
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

        .breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
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

        .article-hero {
            background: var(--bg-warm);
            padding: 64px 28px 56px;
            border-bottom: 1px solid var(--border);
            position: relative;
            overflow: hidden;
        }
        .article-hero::before {
            content: "त्रिमार्ग";
            position: absolute;
            right: -10px;
            bottom: -30px;
            font-family: "Noto Sans Devanagari", serif;
            font-size: 180px;
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
            width: 5px; height: 5px; border-radius: 50%;
            background: var(--gold); box-shadow: 0 0 6px var(--gold); flex-shrink: 0;
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

        .chapter-image {
            margin: 32px 0 36px;
            border-radius: 14px;
            overflow: hidden;
            border: 1px solid var(--border);
            box-shadow: 0 4px 32px rgba(0,0,0,0.4);
        }
        .chapter-image img {
            width: 100%; height: auto; display: block; object-fit: cover;
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

        .path-header {
            display: flex;
            align-items: center;
            gap: 1rem;
            margin: 3rem 0 1.5rem;
        }
        .path-badge {
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
        .path-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.6rem;
            font-weight: 700;
            color: var(--gold);
            border-bottom: 2px solid var(--gold-dim);
            padding-bottom: 0.75rem;
            flex: 1;
            margin: 0;
        }

        .pull-quote {
            border-left: 4px solid var(--gold);
            padding-left: 2rem;
            margin: 2.5rem 0;
            font-size: 1.15rem;
            color: var(--gold-light);
            font-style: italic;
            line-height: 1.8;
        }

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

        .tulsidas-card {
            background: linear-gradient(160deg, rgba(60,18,18,0.45) 0%, rgba(26,6,6,0.35) 100%);
            border: 1px solid rgba(200,136,30,0.25);
            border-radius: 10px;
            padding: 1.75rem 2rem;
            margin: 2rem 0;
        }
        .tulsidas-card .source-label {
            font-size: 0.75rem;
            color: var(--gold);
            text-transform: uppercase;
            font-weight: 600;
            letter-spacing: 0.12em;
            margin-bottom: 0.85rem;
        }
        .tulsidas-card .awadhi {
            font-family: 'Noto Sans Devanagari', sans-serif;
            font-size: 1.05rem;
            color: var(--gold-light);
            line-height: 1.8;
            margin-bottom: 0.85rem;
        }
        .tulsidas-card .roman {
            font-size: 0.9rem;
            font-style: italic;
            color: var(--text-dimmer);
            line-height: 1.6;
            margin-bottom: 0.85rem;
        }
        .tulsidas-card .gloss {
            color: var(--text);
            line-height: 1.7;
            font-size: 0.97rem;
        }

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

        /* Path comparison grid */
        .paths-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
            margin: 2rem 0;
        }
        .path-card {
            background: var(--bg-card);
            border: 1px solid var(--gold-dim);
            border-radius: 10px;
            padding: 1.25rem 1.1rem;
        }
        .path-card .glyph {
            font-family: "Noto Sans Devanagari", serif;
            font-size: 1.5rem;
            color: var(--gold);
            margin-bottom: 0.5rem;
        }
        .path-card .name {
            font-family: 'Playfair Display', serif;
            font-size: 1.05rem;
            font-weight: 700;
            color: var(--gold-light);
            margin-bottom: 0.35rem;
        }
        .path-card .sub {
            font-size: 0.8rem;
            color: var(--text-dimmer);
            letter-spacing: 0.05em;
            text-transform: uppercase;
            margin-bottom: 0.85rem;
        }
        .path-card .body { font-size: 0.92rem; color: var(--text-dim); line-height: 1.55; }
        @media (max-width: 720px) {
            .paths-grid { grid-template-columns: 1fr; }
        }

        /* FAQ */
        .faq-section { max-width: var(--max); margin: 3rem auto; padding: 0 2rem; }
        .faq-item { margin-bottom: 2rem; border-bottom: 1px solid var(--border); padding-bottom: 2rem; }
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
          content: "त्रिमार्ग";
          position: absolute;
          top: -14px;
          right: -8px;
          font-family: "Noto Sans Devanagari", sans-serif;
          font-size: 110px;
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
          max-width: 520px;
          margin: 0 auto 22px;
        }
        .app-cta-features {
          display: flex;
          gap: 6px 18px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 28px;
        }
        .app-cta-features span { font-size: 13px; color: var(--gold-light); opacity: 0.85; }
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
            .path-title { font-size: 1.35rem; }
            .app-cta { padding: 32px 24px 28px; }
            .tulsidas-card { padding: 1.35rem 1.4rem; }
        }
`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": ["Article", "LearningResource"],
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#article",
    "headline": "Krishna's Three Paths — Karma, Jnana, Bhakti and Why the Gita Offers Three Roads to the Same Reality",
    "alternativeHeadline": "The Three Yogas of the Bhagavad Gita — Action, Knowledge, Devotion",
    "description": "In the Bhagavad Gita, Krishna lays out three paths — Karma Yoga (action), Jnana Yoga (knowledge), and Bhakti Yoga (devotion). Each is shaped for a different temperament. All three converge on the same supreme reality. With parallels from Tulsidas's Ramcharitmanas.",
    "image": {
      "@type": "ImageObject",
      "url": "https://wisdomquotes.in/assets/3paths.webp",
      "width": 1536,
      "height": 1024,
      "caption": "Three paths: Wisdom, Action, Devotion, converging on Krishna as the supreme reality"
    },
    "datePublished": "2026-05-24",
    "dateModified": "2026-05-24",
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
      "logo": {
        "@type": "ImageObject",
        "url": "https://wisdomquotes.in/assets/new-light-logo.webp"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita"
    },
    "about": [
      { "@type": "Book", "name": "Bhagavad Gita", "author": { "@type": "Person", "name": "Ved Vyasa" }, "url": "https://wisdomquotes.in/gita" },
      { "@type": "Book", "name": "Ramcharitmanas", "author": { "@type": "Person", "name": "Goswami Tulsidas" }, "url": "https://en.wikipedia.org/wiki/Ramcharitmanas" },
      { "@type": "Person", "name": "Krishna", "url": "https://en.wikipedia.org/wiki/Krishna" },
      { "@type": "Person", "name": "Arjuna", "url": "https://en.wikipedia.org/wiki/Arjuna" },
      { "@type": "Person", "name": "Tulsidas", "url": "https://en.wikipedia.org/wiki/Tulsidas" },
      { "@type": "Thing", "name": "Karma Yoga", "url": "https://en.wikipedia.org/wiki/Karma_yoga" },
      { "@type": "Thing", "name": "Jnana Yoga", "url": "https://en.wikipedia.org/wiki/Jnana_yoga" },
      { "@type": "Thing", "name": "Bhakti Yoga", "url": "https://en.wikipedia.org/wiki/Bhakti_yoga" }
    ],
    "mentions": [
      { "@type": "CreativeWork", "name": "Bhagavad Gita 2.47", "url": "https://wisdomquotes.in/gita/chapter/2#verse-47" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 3.19", "url": "https://wisdomquotes.in/gita/chapter/3#verse-19" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 3.30", "url": "https://wisdomquotes.in/gita/chapter/3#verse-30" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 4.11", "url": "https://wisdomquotes.in/gita/chapter/4#verse-11" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 4.34", "url": "https://wisdomquotes.in/gita/chapter/4#verse-34" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 4.38", "url": "https://wisdomquotes.in/gita/chapter/4#verse-38" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 7.16", "url": "https://wisdomquotes.in/gita/chapter/7#verse-16" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 7.17", "url": "https://wisdomquotes.in/gita/chapter/7#verse-17" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 9.22", "url": "https://wisdomquotes.in/gita/chapter/9#verse-22" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 9.26", "url": "https://wisdomquotes.in/gita/chapter/9#verse-26" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 11.33", "url": "https://wisdomquotes.in/gita/chapter/11#verse-33" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 12.5", "url": "https://wisdomquotes.in/gita/chapter/12#verse-5" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 12.8", "url": "https://wisdomquotes.in/gita/chapter/12#verse-8" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 12.12", "url": "https://wisdomquotes.in/gita/chapter/12#verse-12" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 13.24", "url": "https://wisdomquotes.in/gita/chapter/13#verse-24" },
      { "@type": "CreativeWork", "name": "Bhagavad Gita 18.66", "url": "https://wisdomquotes.in/gita/chapter/18#verse-66" }
    ],
    "keywords": "krishna three paths, karma yoga, jnana yoga, bhakti yoga, bhagavad gita three paths, three yogas of bhagavad gita, karm pradhan bisva kari rakha, hoihi soi jo rama rachi rakha, ramcharitmanas tulsidas, sarva dharman parityajya, nimitta matra, nishkama karma, jnani bhakta, kshetra kshetrajna, gita and mental health, ACT therapy, attachment science, witness consciousness, which yoga is best",
    "articleSection": "Bhagavad Gita · Topic Guide · The Three Yogas",
    "wordCount": 4200,
    "timeRequired": "PT18M",
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "learningResourceType": "Article",
    "educationalLevel": "General",
    "audience": { "@type": "Audience", "audienceType": "Readers of the Gita, students of Hindu philosophy" },
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [".lead", ".shloka-card .meaning-text", ".shloka-card .essence", ".tulsidas-card .gloss", ".highlight-box p", "h2", "h3"]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Wisdom", "item": "https://wisdomquotes.in/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://wisdomquotes.in/blogs" },
      { "@type": "ListItem", "position": 3, "name": "Krishna's Three Paths — Karma, Jnana, Bhakti", "item": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita" }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question", "name": "What are the three paths Krishna teaches in the Bhagavad Gita?", "acceptedAnswer": { "@type": "Answer", "text": "Krishna teaches three converging paths: Karma Yoga — the path of selfless action; Jnana Yoga — the path of knowledge and self-inquiry; and Bhakti Yoga — the path of devotion and surrender. All three lead to the same supreme reality, but each is shaped for a different temperament." } },
      { "@type": "Question", "name": "Why does Krishna give three paths instead of one?", "acceptedAnswer": { "@type": "Answer", "text": "Because human beings differ. Some are restless doers, some are restless thinkers, and some are restless feelers. Krishna meets each person where they are. In 4.11 he says: 'In whatever way people approach me, in that way I respond to them.'" } },
      { "@type": "Question", "name": "Which of the three paths is the highest?", "acceptedAnswer": { "@type": "Answer", "text": "Krishna does not establish a flat hierarchy. In 12.12 he names a sequence: practice, then knowledge, then meditation, then renunciation of the fruit of action — and from that renunciation, peace follows immediately. In 7.17 he calls the jnani-bhakta — the wise lover — dearest. In 18.64–66 he calls this teaching sarva-guhyatamam, the most hidden of all. The paths complement each other." } },
      { "@type": "Question", "name": "How does Tulsidas's 'karm pradhan' verse relate to the Gita's Karma Yoga?", "acceptedAnswer": { "@type": "Answer", "text": "Tulsidas writes: 'karam pradhan bisva kari rakha, jo jas karai so tas phalu chakha' — 'the world is governed by action; whatever you do, that is the fruit you taste.' This is the law of karma in Awadhi. Krishna builds on the same law in 2.47: the action is yours to do, and the fruit is not yours to claim." } },
      { "@type": "Question", "name": "What does 'hoihi soi jo Rama rachi rakha' mean and how does it connect to surrender in the Gita?", "acceptedAnswer": { "@type": "Answer", "text": "Tulsidas writes: 'hoihi soi jo rama rachi rakha, ko kari tarka badhavai sakha' — 'only that will happen which Rama has scripted; who can extend the branches of argument?' Shiva says it after failing to persuade Sati, and then turns to Hari's name. Readers often compare it with 11.33, 'they have already been killed by me; become only the instrument', and 18.66, 'take refuge in me alone.'" } },
      { "@type": "Question", "name": "How do the three paths connect to modern mental health?", "acceptedAnswer": { "@type": "Answer", "text": "Loosely. Karma Yoga's split between effort and outcome resembles the values-over-goals idea in Acceptance and Commitment Therapy. Jnana Yoga's watcher resembles the practice of noticing a thought as a thought. Bhakti offers the experience of being held. These are resemblances; the Gita's own aim is liberation (moksha)." } },
      { "@type": "Question", "name": "How do I know which path is mine?", "acceptedAnswer": { "@type": "Answer", "text": "Notice what your restlessness wants. If you cannot sit still and need to do — your path likely begins with action. If you cannot stop questioning and need to understand — your path begins with knowledge. If you feel deeply and need to be in relationship — your path begins with devotion." } }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-2-47",
    "text": "You have a right to action alone, never to its fruits. Do not become the cause of the result, and do not cling to inaction.",
    "spokenByCharacter": { "@type": "Person", "name": "Krishna" },
    "creator": { "@type": "Person", "name": "Krishna" },
    "isPartOf": { "@type": "Book", "name": "Bhagavad Gita, Chapter 2, Verse 47" },
    "inLanguage": ["sa", "en"],
    "alternateName": [
      "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
      "karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalahetur bhūr mā te saṅgo'stvakarmaṇi ||"
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-2-47"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-3-30",
    "text": "Surrender all actions to me with the disciplined mind. Free from desire, possessiveness, and sorrow — fight.",
    "spokenByCharacter": { "@type": "Person", "name": "Krishna" },
    "creator": { "@type": "Person", "name": "Krishna" },
    "isPartOf": { "@type": "Book", "name": "Bhagavad Gita, Chapter 3, Verse 30" },
    "inLanguage": ["sa", "en"],
    "alternateName": [
      "मयि सर्वाणि कर्माणि संन्यस्याध्यात्मचेतसा । निराशीर्निर्ममो भूत्वा युध्यस्व विगतज्वरः ॥",
      "mayi sarvāṇi karmāṇi saṃnyasyādhyātmacetasā | nirāśīrnirmamo bhūtvā yudhyasva vigatajvaraḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-3-30"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-4-34",
    "text": "Know that by prostration, by sincere questioning, and by service. The wise who see reality will teach you that knowledge.",
    "spokenByCharacter": { "@type": "Person", "name": "Krishna" },
    "creator": { "@type": "Person", "name": "Krishna" },
    "isPartOf": { "@type": "Book", "name": "Bhagavad Gita, Chapter 4, Verse 34" },
    "inLanguage": ["sa", "en"],
    "alternateName": [
      "तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया । उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥",
      "tadviddhi praṇipātena paripraśnena sevayā | upadekṣyanti te jñānaṃ jñāninastattvadarśinaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-4-34"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-7-17",
    "text": "Among these four, the wise devotee — ever united, one-pointed — is distinguished. For I am exceedingly dear to the wise one, and the wise one is dear to me.",
    "spokenByCharacter": { "@type": "Person", "name": "Krishna" },
    "creator": { "@type": "Person", "name": "Krishna" },
    "isPartOf": { "@type": "Book", "name": "Bhagavad Gita, Chapter 7, Verse 17" },
    "inLanguage": ["sa", "en"],
    "alternateName": [
      "तेषां ज्ञानी नित्ययुक्त एकभक्तिर्विशिष्यते । प्रियो हि ज्ञानिनोऽत्यर्थमहं स च मम प्रियः ॥",
      "teṣāṃ jñānī nityayukta ekabhaktirviśiṣyate | priyo hi jñānino'tyarthamahaṃ sa ca mama priyaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-7-17"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-9-22",
    "text": "Those who think of me alone and worship me with unwavering focus — I carry their welfare and security.",
    "spokenByCharacter": { "@type": "Person", "name": "Krishna" },
    "creator": { "@type": "Person", "name": "Krishna" },
    "isPartOf": { "@type": "Book", "name": "Bhagavad Gita, Chapter 9, Verse 22" },
    "inLanguage": ["sa", "en"],
    "alternateName": [
      "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥",
      "ananyāścintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmyaham ||"
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-9-22"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-18-66",
    "text": "Abandon all duties and take refuge in me alone. I will free you from all wrongdoing; do not grieve.",
    "spokenByCharacter": { "@type": "Person", "name": "Krishna" },
    "creator": { "@type": "Person", "name": "Krishna" },
    "isPartOf": { "@type": "Book", "name": "Bhagavad Gita, Chapter 18, Verse 66" },
    "inLanguage": ["sa", "en"],
    "alternateName": [
      "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
      "sarvadharmān parityajya mām ekaṃ śaraṇaṃ vraja | ahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#verse-18-66"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#tulsidas-karm-pradhan",
    "text": "The world is governed by action; whoever does whatever, tastes the fruit accordingly.",
    "spokenByCharacter": { "@type": "Person", "name": "Tulsidas" },
    "creator": { "@type": "Person", "name": "Tulsidas" },
    "isPartOf": { "@type": "Book", "name": "Ramcharitmanas, Ayodhya Kand, Doha 218" },
    "inLanguage": ["awa", "en"],
    "alternateName": [
      "करम प्रधान बिस्व करि राखा। जो जस करइ सो तस फलु चाखा॥",
      "karam pradhāna bisva kari rākhā, jo jasa karai so tasa phalu chākhā."
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#tulsidas-karm-pradhan"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#tulsidas-hoihi-soi",
    "text": "Only that will happen which Rama has already scripted; who can extend the branches of argument?",
    "spokenByCharacter": { "@type": "Person", "name": "Shiva" },
    "creator": { "@type": "Person", "name": "Tulsidas" },
    "isPartOf": { "@type": "Book", "name": "Ramcharitmanas, Bal Kand, chaupai before Doha 52" },
    "inLanguage": ["awa", "en"],
    "alternateName": [
      "होइहि सोइ जो राम रचि राखा। को करि तर्क बढ़ावै साखा॥",
      "hoihi soi jo rāma rachi rākhā, ko kari tarka ba.dhāvai sākhā."
    ],
    "url": "https://wisdomquotes.in/blogs/krishna-three-paths-bhagavad-gita#tulsidas-hoihi-soi"
  }
]

export default function KrishnaThreePathsPage() {
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
          Krishna&apos;s Three Paths
        </div>
      </div>

      <article itemScope itemType="https://schema.org/Article">
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Topic Guide · The Three Yogas
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Krishna&apos;s Three Paths:<br />
            <em>Karma, Jnana, Bhakti and Why the Gita Offers Three Roads to the Same Reality</em>
          </h1>
          <p className="article-subtitle">
            Krishna lays out three ways to live (Action, Wisdom, Devotion) and treats each as a road to him. This guide goes through the verses for each path, with parallels from Tulsidas&apos;s Ramcharitmanas.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Topic Guide · Three Yogas</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~18 min read</span>
          </div>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
        </div>
      </div>

      <div className="content">
        <figure className="chapter-image">
          <img
            src="/assets/3paths.webp"
            alt="Krishna at the summit: the three paths of Wisdom, Action and Devotion converge on the supreme reality"
            width={1536}
            height={1024}
            loading="eager"
            fetchPriority="high"
          />
          <figcaption>Karma, jnana and bhakti, drawn as three roads up one mountain.</figcaption>
        </figure>

        <p className="lead">
          On the field of Kurukshetra, Arjuna asks Krishna to tell him plainly what he should do (2.7). The question is about the war, and it is also the question of how a person should live: how thinking, doing and feeling fit together. Krishna&apos;s answer takes eighteen chapters and lays out three paths.
        </p>

        <p>
          The Gita presents these paths as different doors into the same room, and a reader starts with the one that fits their nature. Krishna calls them <strong>Karma Yoga</strong> (the path of action, the focus of <a href="/blogs/bhagwat-geeta-chapter-3" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Chapter 3</a>); <strong>Jnana Yoga</strong> (the path of knowledge, the focus of <a href="/blogs/bhagwat-geeta-chapter-4" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Chapter 4</a>); and <strong>Bhakti Yoga</strong> (the path of devotion, given its most compressed expression in <a href="/blogs/bhagwat-geeta-chapter-12" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Chapter 12</a>). Chapter 13 has a related but different list: <em>some see the Self through meditation, some through Sankhya yoga, and some through karma yoga</em> (13.25 in our numbering, 13.24 in most editions). Bhakti is missing from that list; it gets chapter 12 to itself.
        </p>

        <div className="paths-grid">
          <div className="path-card">
            <div className="glyph">कर्म</div>
            <div className="name">Karma Yoga</div>
            <div className="sub">The Path of Action</div>
            <div className="body">For those who cannot sit still. Do your work, fully, but stop demanding that life pay you for it.</div>
          </div>
          <div className="path-card">
            <div className="glyph">ज्ञान</div>
            <div className="name">Jnana Yoga</div>
            <div className="sub">The Path of Knowledge</div>
            <div className="body">For those who cannot stop asking. Set aside everything you can observe, and what remains is the self.</div>
          </div>
          <div className="path-card">
            <div className="glyph">भक्ति</div>
            <div className="name">Bhakti Yoga</div>
            <div className="sub">The Path of Devotion</div>
            <div className="body">For those who feel deeply. Stop carrying yourself. Hand it over to something larger and let it carry you.</div>
          </div>
        </div>

        <p>
          The premise underneath all three is the same. The names are different (Krishna, Brahman, Atman, the Supreme) but the destination is one. What changes is the road, because the people walking are different. The Gita accepts that people differ: some lean toward work, some toward questions, some toward love. Krishna asks each of them to start from where they already are.
        </p>

        <div className="gita-index">
          <h3>What this article covers</h3>
          <ol>
            <li><strong>Karma Yoga</strong>: action without attachment, and the surprising relief of not owning the result</li>
            <li><strong>Jnana Yoga</strong>: knowledge of the field and its knower, from chapters 4 and 13</li>
            <li><strong>Bhakti Yoga</strong>: devotion, and why chapter 12 treats it as the easier road</li>
            <li><strong>Where they meet</strong>: the four kinds of devotees (7.16), 4.11 and 12.12</li>
            <li><strong>Which path is yours</strong>: a rough guide by temperament</li>
          </ol>
        </div>

        {/* ── KARMA YOGA ── */}
        <div className="path-header">
          <span className="path-badge">Path 1 of 3</span>
          <h2 className="path-title" id="karma-yoga">Karma Yoga, Act, but Stop Owning the Outcome</h2>
        </div>

        <p>
          The best-known verse of this path comes in chapter 2. Arjuna has dropped his bow (1.47) and told Krishna he refuses to fight (2.9). Krishna keeps him in the fight and changes how he is to hold it:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 2.47"
          sanskrit="कर्मण्येवाधिकारस्ते मा फलेषु कदाचन । मा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥"
          iast="karmaṇyevādhikāraste mā phaleṣu kadācana | mā karmaphalahetur bhūr mā te saṅgo'stvakarmaṇi ||"
          meaningLabel="Translation"
          meaning="You have a right to action alone, never to its fruits. Do not become the cause of the result, and do not cling to inaction."
          insightLabel="What the verse says"
          insight="Krishna gives Arjuna authority over one thing, the act, and none over a second thing, the fruit. The fruit depends on many causes, and your effort is only one of them. The second line closes the other exit: do not make the fruit your motive, and do not fall back on doing nothing."
          essence="Your right is to the work, never to its results."
        />

        <p>
          Most of us work for outcomes and expect a return in proportion to the effort. When the return comes late, comes small or never comes, we blame ourselves or others and lose heart. Krishna asks for full care about the work and no claim on the result. He repeats the point in chapter 3:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.19"
          sanskrit="तस्मादसक्तः सततं कार्यं कर्म समाचर । असक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥"
          iast="tasmādasaktaḥ satataṃ kāryaṃ karma samācara | asakto hyācarankarma paramāpnoti pūruṣaḥ ||"
          meaningLabel="Translation"
          meaning="Therefore, always perform your duty without attachment; by acting without attachment, a person reaches the supreme."
          insightLabel="Unattached action as the path itself"
          insight="Krishna says that a person who acts without attachment reaches the supreme (param apnoti). Unattached action is a road to the goal in its own right. A mason who shapes a temple stone without needing to see the temple finished is doing the same inner work as the renunciant."
          essence="Do the work that is yours without attachment, and you reach the highest."
        />

        <p>
          Eleven verses later, Krishna asks Arjuna to offer every action to him:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 3.30"
          sanskrit="मयि सर्वाणि कर्माणि संन्यस्याध्यात्मचेतसा । निराशीर्निर्ममो भूत्वा युध्यस्व विगतज्वरः ॥"
          iast="mayi sarvāṇi karmāṇi saṃnyasyādhyātmacetasā | nirāśīrnirmamo bhūtvā yudhyasva vigatajvaraḥ ||"
          meaningLabel="Translation"
          meaning="Surrender all actions to me with the disciplined mind. Free from desire, possessiveness, and sorrow, fight."
          insightLabel="Vigata-jvara: the fever has left"
          insight="The last word, vigatajvarah, means with the fever gone. Jvara is fever, and Krishna uses it for the anxious heat of acting for yourself. His remedy is to keep acting and to offer the act to him. Arjuna still fights, without hope of gain, without the sense of mine, and without that heat."
          essence="Offer every action to Krishna and fight, free of craving, ownership and fever."
        />

        <h3>Tulsidas, centuries later, in Awadhi</h3>

        <p>
          The same idea reached Hindi-speaking India through Tulsidas, who wrote the Ramcharitmanas in Awadhi in the sixteenth century. One of his chaupais, still recited across northern India, states it this way. (We have a separate piece on <a href="/blogs/bhagavad-gita-karma-meaning" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>what karma actually means in the Gita</a>. It covers the popular misreadings.)
        </p>

        <div className="tulsidas-card" id="tulsidas-karm-pradhan">
          <div className="source-label">Ramcharitmanas · Ayodhya Kand · 2.218</div>
          <div className="awadhi">करम प्रधान बिस्व करि राखा।{'\n'}जो जस करइ सो तस फलु चाखा॥</div>
          <div className="roman">karam pradhāna bisva kari rākhā,{'\n'}jo jasa karai so tasa phalu chākhā.</div>
          <div className="gloss">
            <strong>The world is governed by action; whoever does whatever, tastes the fruit accordingly.</strong> The line states the law of karma: what you do comes back to you as fruit. Krishna builds on the same law in 2.47. Since the action is yours to do, do it well, and leave the fruit alone.
          </div>
        </div>

        <p>
          In the Gita, karma is cause and effect, and it leaves room for choice. Your actions shape what comes back, though the form and the timing may surprise you. Karma Yoga&apos;s teaching is what you do with that fact: you take it seriously enough to act well, and you take it gently enough not to obsess over the receipt.
        </p>

        <h3>Modern parallel, the value-driven life</h3>

        <p>
          Acceptance and Commitment Therapy (ACT), a form of psychotherapy developed from the late 1980s, makes a similar split between <em>goals</em>, which can be reached and ticked off, and <em>values</em>, which guide action whether a goal is met or missed. The resemblance to 2.47 is close, though the Gita&apos;s aim is liberation (moksha), and ACT&apos;s is a livable life.
        </p>

        <div className="highlight-box">
          <h3>Karma Yoga in one sentence</h3>
          <p>
            Do the work fully, offer it to Krishna, and leave the result alone (2.47, 3.19, 3.30).
          </p>
        </div>

        {/* ── JNANA YOGA ── */}
        <div className="path-header">
          <span className="path-badge">Path 2 of 3</span>
          <h2 className="path-title" id="jnana-yoga">Jnana Yoga, Knowledge as the Fire That Burns Confusion</h2>
        </div>

        <p>
          The second path suits a different temperament. The karma yogi wants to act; the jnana yogi wants to understand. For this person, relief comes from seeing clearly what is real. Krishna makes a large claim for this knowledge in chapter 4:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 4.38"
          sanskrit="न हि ज्ञानेन सदृशं पवित्रमिह विद्यते । तत्स्वयं योगसंसिद्धः कालेनात्मनि विन्दति ॥"
          iast="na hi jñānena sadṛśaṃ pavitramiha vidyate | tatsvayaṃ yogasaṃsiddhaḥ kālenātmani vindati ||"
          meaningLabel="Translation"
          meaning="No purifier compares to knowledge in this world. The one perfected in yoga finds that knowledge within the self, in time."
          insightLabel="Knowledge as a purifier"
          insight="Jnana here means direct understanding of what is real and what is appearance, including who you are beneath your conditioning. It removes confusion more than it adds information. That is why Krishna calls it pavitra, a purifier, and says the one perfected in yoga finds it within, in time."
          essence="Nothing purifies like knowledge, and the yogi finds it within, in time."
        />

        <p>
          Four verses earlier, Krishna says how this knowledge is to be sought:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 4.34"
          sanskrit="तद्विद्धि प्रणिपातेन परिप्रश्नेन सेवया । उपदेक्ष्यन्ति ते ज्ञानं ज्ञानिनस्तत्त्वदर्शिनः ॥"
          iast="tadviddhi praṇipātena paripraśnena sevayā | upadekṣyanti te jñānaṃ jñāninastattvadarśinaḥ ||"
          meaningLabel="Translation"
          meaning="Know that by prostration, by sincere questioning, and by service. The wise who see reality will teach you that knowledge."
          insightLabel="Bowing, questioning, serving"
          insight="The verse names three things a student brings to a teacher: pranipata (bowing), pariprashna (sincere, repeated questioning) and seva (service). Humility comes before the question. A student who still needs to be right tends to ask the wrong question, and the answer has nowhere to land."
          essence="Learn from those who have seen the truth, through humility, questions and service."
        />

        <p>
          What the jnani comes to see is set out most fully in chapter 13. There Krishna distinguishes between <em>kshetra</em> (the field: the body, the mind, the emotions, all observable experience) and <em>kshetrajna</em> (the knower of the field: the awareness that watches). Most of what we suffer over belongs to the field.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.24"
          sanskrit="य एवं वेत्ति पुरुषं प्रकृतिं च गुणैःसह । सर्वथा वर्तमानोऽपि न स भूयोऽभिजायते ॥"
          iast="ya evaṃ vetti puruṣaṃ prakṛtiṃ ca guṇaiḥsaha | sarvathā vartamāno'pi na sa bhūyo'bhijāyate ||"
          meaningLabel="Translation"
          meaning="Whoever thus knows the purusha and prakriti together with the qualities is not born again, even while living and acting in every way."
          insightLabel="Liberation that doesn&apos;t require renunciation"
          insight="The key phrase is sarvatha vartamano'pi: even while living and acting in every way. Krishna does not ask the jnani to leave the world. Once you have seen the difference between the field and the knower, you can work, raise children or fight a war and still not be born again."
          essence="Whoever knows purusha and prakriti is not born again, however they live."
        />

        <h3>The Upanishadic root, neti, neti</h3>

        <p>
          Krishna inherited this path from the Upanishads, whose method of <em>neti, neti</em> (&ldquo;not this, not this&rdquo;) is the classic jnana practice. The sage Yajnavalkya in the Brihadaranyaka Upanishad teaches that the self cannot be grasped as an object, because it is what is doing the grasping. You proceed by eliminating: you are not the body, because you can observe the body. You are not the mind, because you can observe the mind. What remains, when everything you can observe has been set aside, is what you have been all along. The <a href="/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ashtavakra Gita, the Avadhuta Gita, and other lesser-known Gitas</a> carry the method further. Chapter 13 compresses it into the field and its knower, a scheme a householder can use.
        </p>

        <h3>Modern parallel, metacognition and the witness</h3>

        <p>
          Several modern therapies train people to <em>watch</em> a thought as an event in the mind, instead of taking it as a fact about the world. That resembles the split between kshetra and kshetrajna, though the Gita goes further and says the watcher is your real self.
        </p>

        <p className="pull-quote">
          A thought arises in you, and you can watch it arise. In chapter 13&apos;s terms, the thought belongs to the field and you are its knower.
        </p>

        {/* ── BHAKTI YOGA ── */}
        <div className="path-header">
          <span className="path-badge">Path 3 of 3</span>
          <h2 className="path-title" id="bhakti-yoga">Bhakti Yoga, Devotion as the Easier Road</h2>
        </div>

        <p>
          The third path begins where the second ends. Jnana Yoga asks you to see clearly, and Krishna admits in chapter 12 that this is hard:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 12.5"
          sanskrit="क्लेशोऽधिकतरस्तेषामव्यक्तासक्तचेतसाम् । अव्यक्ता हि गतिर्दुःखं देहवद्भिरवाप्यते ॥"
          iast="kleśo'dhikatarasteṣāmavyaktāsaktacetasām | avyaktā hi gatirduḥkhaṃ dehavadbhiravāpyate ||"
          meaningLabel="Translation"
          meaning="For those whose minds cling to the unmanifest, the struggle is greater. The unmanifest path is hard to reach for embodied beings."
          insightLabel="Krishna&apos;s honesty about the abstract"
          insight="Meditation on the formless, unmanifest reality is possible, but Krishna calls it harder for anyone who lives in a body, because bodies relate to forms. He blames no one for finding the abstract path difficult, and he offers a path through feeling, form and relationship."
          essence="The path to the unmanifest is harder for those who live in a body."
        />

        <p>
          That alternative is Bhakti. Jnana asks <em>what is real?</em>; Bhakti asks <em>whom do I love?</em> Both arrive at the Supreme by different routes. Bhakti works with what is already in the heart, the capacity for attachment, longing and surrender, and turns it toward one object instead of a hundred small ones.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 12.8"
          sanskrit="मय्येव मन आधत्स्व मयि बुद्धिं निवेशय । निवसिष्यसि मय्येव अत ऊर्ध्वं न संशयः ॥"
          iast="mayyeva mana ādhatsva mayi buddhiṃ niveśaya | nivasiṣyasi mayyeva ata ūrdhvaṃ na saṃśayaḥ ||"
          meaningLabel="Translation"
          meaning="Fix your mind on me alone. Place your discerning mind in me, and you will live in me, beyond doubt."
          insightLabel="Mind and intellect in one place"
          insight="Krishna asks for two things: fix the mind (manas) on him, and settle the buddhi, the discerning intellect, in him. Feeling and judgement both go to one place. The promise follows at once: you will live in me, without doubt."
          essence="Fix your mind and intellect on Krishna, and you will live in him."
        />

        <p>
          In chapter 9 Krishna makes the promise that sits under the whole path:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 9.22"
          sanskrit="अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥"
          iast="ananyāścintayanto māṃ ye janāḥ paryupāsate | teṣāṃ nityābhiyuktānāṃ yogakṣemaṃ vahāmyaham ||"
          meaningLabel="Translation"
          meaning="Those who think of me alone and worship me with unwavering focus, I carry their welfare and security."
          insightLabel="Yoga-kshema: getting and keeping"
          insight="Yoga-kshema has two halves. Yoga is getting what you do not yet have; kshema is keeping what you have. Krishna takes on both for those who worship him with undivided attention. The verse promises a shared load, which is different from an easy life."
          essence="For those devoted to him alone, Krishna provides what they lack and keeps what they have."
        />

        <p>
          Bhakti asks for a small offering and no qualification. Krishna says so directly:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 9.26"
          sanskrit="पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति । तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥"
          iast="patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati | tadahaṃ bhaktyupahṛtamaśnāmi prayatātmanaḥ ||"
          meaningLabel="Translation"
          meaning="Whoever offers me a leaf, a flower, a fruit, or water with devotion, I accept that devoted offering from the pure-hearted."
          insightLabel="It is the devotion, not the object"
          insight="A leaf, a flower, a fruit, water: things anyone can find. The list makes clear that bhakti needs no wealth, ritual or learning. Krishna accepts the devotion in the offering, so a glass of water given with love counts for more than a large ceremony done from duty."
          essence="Krishna accepts a leaf, flower, fruit or water offered with devotion."
        />

        <h3>Tulsidas, surrender in Awadhi verse</h3>

        <p>
          Tulsidas has a second line that readers often set beside the Gita&apos;s teaching on surrender. Shiva says it in the Bal Kand, after Sati ignores his advice and goes to test Rama:
        </p>

        <div className="tulsidas-card" id="tulsidas-hoihi-soi">
          <div className="source-label">Ramcharitmanas · Bal Kand · before Doha 52</div>
          <div className="awadhi">होइहि सोइ जो राम रचि राखा।{'\n'}को करि तर्क बढ़ावै साखा॥</div>
          <div className="roman">hoihi soi jo rāma rachi rākhā,{'\n'}ko kari tarka ba.dhāvai sākhā.</div>
          <div className="gloss">
            <strong>Only that will happen which Rama has already scripted; who can extend the branches of argument?</strong> Shiva has argued with Sati and failed, so he stops arguing and begins repeating Hari&apos;s name. Readers often compare the line with 11.33 (<em>they have already been killed by me; you become only the instrument</em>) and with 18.66, Krishna&apos;s last instruction: <em>take refuge in me alone</em>.
          </div>
        </div>

                <ShlokaCard
          verseRef="Bhagavad Gita 11.33"
          sanskrit="तस्मात्त्वमुत्तिष्ठ यशो लभस्व ... मयैवैते निहताः पूर्वमेव निमित्तमात्रं भव सव्यसाचिन् ॥"
          iast="tasmāttvamuttiṣṭha yaśo labhasva ... mayaivaite nihatāḥ pūrvameva nimittamātraṃ bhava savyasācin ||"
          meaningLabel="Translation"
          meaning="Therefore rise and win fame. They have already been slain by me; become only the instrument, Arjuna."
          insightLabel="Karma Yoga and Bhakti Yoga, fused in one verse"
          insight="Here action and devotion meet. Krishna tells Arjuna to rise (uttishtha) and fight, and at the same time lifts from him the burden of being the doer. Nimitta-matra means only the instrument: Arjuna brings the bow, and Krishna, speaking as time in 11.32, has already decided the outcome. Readers often hear the same note in Tulsidas's hoihi soi jo rama rachi rakha."
          essence="Rise and fight; the outcome is already decided, and you are the instrument."
        />

        <p>
          Krishna prefaces 18.66 in 18.64 by calling it <em>sarva-guhyatamam</em>, the most secret of all:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 18.66: the last instruction"
          sanskrit="सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज । अहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥"
          iast="sarvadharmān parityajya mām ekaṃ śaraṇaṃ vraja | ahaṃ tvā sarvapāpebhyo mokṣayiṣyāmi mā śucaḥ ||"
          meaningLabel="Translation"
          meaning="Abandon all duties and take refuge in me alone. I will free you from all wrongdoing; do not grieve."
          insightLabel="Ma shuchah: do not grieve"
          insight="After the frameworks and yogas of the earlier chapters, Krishna's last instruction is short: give up every other support and take refuge in him alone. The last two words, ma shuchah, mean do not grieve. Krishna's teaching opened in 2.11 by telling Arjuna he grieves for those who should not be grieved for, and its last instruction closes on the same word."
          essence="Take refuge in Krishna alone, and do not grieve."
        />

        

        <div className="highlight-box">
          <h3>Why Bhakti is the easier road</h3>
          <p>
            In 12.5 Krishna says the path to the unmanifest is harder for embodied beings, and in 8.14 he says he is easy to reach for one who remembers him constantly. Bhakti asks for no renunciation, silence or scholarship first. It asks you to keep turning toward what you love, and 9.26 sets the price of entry at a leaf, a flower, a fruit or some water.
          </p>
        </div>

        {/* ── CONVERGENCE ── */}
        <h2 id="where-three-paths-meet">Where the Three Paths Meet</h2>

        <p>
          Are the three paths separate, or three sides of one thing? The Gita treats them as both. A person starts with the one that fits their nature, and the further they go, the more the other two show up in their practice.
        </p>

        <p>
          Chapter 7 shows this when Krishna describes the four kinds of people who turn toward him:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.16"
          sanskrit="चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन । आर्तो जिज्ञासुरर्थार्थी ज्ञानी च भरतर्षभ ॥"
          iast="caturvidhā bhajante māṃ janāḥ sukṛtino'rjuna | ārto jijñāsurarthārthī jñānī ca bharatarṣabha ||"
          meaningLabel="Translation"
          meaning="Four kinds of virtuous people worship me, Arjuna: the distressed, the seeker of knowledge, the one who wants material good, and the wise one, best of the Bharatas."
          insightLabel="All four count"
          insight="Krishna names four kinds of people who come to him: the one in distress (arta), the one who wants to know (jijnasu), the one who wants some gain (artharthi), and the wise one (jnani). All four are called sukritinah, people of good deeds, and he turns none of them away."
          essence="Four kinds of good people turn to Krishna: the distressed, the curious, the wanting and the wise."
        />

        <p>
          In 7.18 Krishna adds that all four are noble. In 7.17 he names the dearest of them, the wise one who is also a devotee:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.17"
          sanskrit="तेषां ज्ञानी नित्ययुक्त एकभक्तिर्विशिष्यते । प्रियो हि ज्ञानिनोऽत्यर्थमहं स च मम प्रियः ॥"
          iast="teṣāṃ jñānī nityayukta ekabhaktirviśiṣyate | priyo hi jñānino'tyarthamahaṃ sa ca mama priyaḥ ||"
          meaningLabel="Translation"
          meaning="Among these four, the wise devotee, ever united, one-pointed, is distinguished. For I am exceedingly dear to the wise one, and the wise one is dear to me."
          insightLabel="Jnani-bhakta: the wise lover"
          insight="The verse joins jnani (the wise one) with ekabhakti (devoted to one). In this person, knowledge and devotion have become a single disposition. Krishna presents it as the place where knowledge and devotion lead, rather than as a fourth path."
          essence="Deep knowing and devoted love become a mutual bond."
        />

        <p>
          In chapter 4 Krishna says he meets people on whatever road they take:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 4.11"
          sanskrit="ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम् । मम वर्त्मानुवर्तन्ते मनुष्याः पार्थ सर्वशः ॥"
          iast="ye yathā māṃ prapadyante tāṃstathaiva bhajāmyaham | mama vartmānuvartante manuṣyāḥ pārtha sarvaśaḥ ||"
          meaningLabel="Translation"
          meaning="As people approach me, so I respond to them. All people, in every way, follow my path."
          insightLabel="The path adapts to the person"
          insight="Krishna answers each person in the way they approach him. Someone who comes through thought meets him as insight; someone who comes through love meets him as presence; someone who comes through work finds the work teaching them. The second line adds that all people follow his path, in every way."
          essence="As people approach Krishna, so he receives them."
        />

        <p>
          And in chapter 12, a verse that some read as a ranking and others as a sequence:
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 12.12"
          sanskrit="श्रेयो हि ज्ञानमभ्यासाज्ज्ञानाद्ध्यानं विशिष्यते । ध्यानात्कर्मफलत्यागस्त्यागाच्छान्तिरनन्तरम् ॥"
          iast="śreyo hi jñānamabhyāsājjñānāddhyānaṃ viśiṣyate | dhyānātkarmaphalatyāgastyāgācchāntiranantaram ||"
          meaningLabel="Translation"
          meaning="Knowledge is better than mere practice; meditation is better than knowledge. Better than meditation is renouncing the fruits of action. From that renunciation, peace follows at once."
          insightLabel="All three paths in one verse"
          insight="Krishna moves from abhyasa (practice) to jnana (knowledge) to dhyana (meditation) to karma-phala-tyaga, giving up the fruit of action. The last step is karma yoga in its ripest form, and from it comes shanti anantaram: peace, at once."
          essence="Giving up the fruit of action ranks above meditation, and peace follows at once."
        />

        <p className="pull-quote">
          A path you can walk is worth more than one that only sounds impressive. Krishna lays out three, and in 4.11 he says each one leads to him.
        </p>

        {/* ── MODERN MENTAL HEALTH ── */}
        <h2 id="modern-mental-health">Three Paths, Three Kinds of Trouble</h2>

        <p>
          People differ, so what goes wrong in them differs too. Each path answers one kind of trouble.
        </p>

        <p>
          <strong>Karma Yoga answers worry about outcomes</strong>: the low-grade fever of needing the next thing to go well. Krishna asks you to care about the work and leave the result to him. Later commentators call this <em>nishkama karma</em>, action without desire for its fruit, and 3.30 asks Arjuna to fight without the fever.
        </p>

        <p>
          <strong>Jnana Yoga answers the looping mind</strong>: the habit of going over the same thoughts and attacking yourself with them. The jnana practice is to recognise the one who watches the thoughts. Krishna calls that watcher the <em>kshetrajna</em> (the knower of the field), and in 13.24 he says this knowing frees you while life goes on.
        </p>

        <p>
          <strong>Bhakti Yoga answers loneliness</strong>: the sense of being on your own in the universe. Bhakti is the experience of being held. In 9.22 Krishna offers <em>yogakshema vahami aham</em> (&ldquo;I carry their welfare and security&rdquo;) to those who worship him with undivided attention. (For a focused reading on what the Gita says about <a href="/blogs/bhagavad-gita-anxiety-mental-peace" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>anxiety and mental peace</a>, we have a separate piece.)
        </p>

        <p>
          The Gita does not rank these troubles. A common mistake, in religion and outside it, is to give everyone the same answer, and Krishna gives three, depending on who is asking.
        </p>

        {/* ── WHICH PATH IS YOURS ── */}
        <h2 id="which-path-is-yours">Which Path Is Yours?</h2>

        <p>
          A rough guide: notice what your restlessness wants.
        </p>

        <p>
          If your restlessness wants to <em>do</em>, if sitting still is the hardest thing, if your relief comes from solving something, building something, finishing something, your path likely begins with <strong>Karma Yoga</strong>. The discipline is to keep doing, fully, while letting go of the part of you that demands a particular result. The verse to live with is 2.47.
        </p>

        <p>
          If your restlessness wants to <em>understand</em>, if you cannot put a question down until it has been answered properly, if your relief comes from a model that finally fits, from a piece of language that finally lands, your path likely begins with <strong>Jnana Yoga</strong>. The discipline is to keep questioning, but to turn the question inward at the questioner. The verse to live with is 13.24.
        </p>

        <p>
          If your restlessness wants to <em>belong</em>, if you feel deeply, if connection is what makes you feel real, if you are most yourself when you are in love with something or someone, your path likely begins with <strong>Bhakti Yoga</strong>. The discipline is to refine that love until it rests on something that can hold it. The verse to live with is 9.22.
        </p>

        <p>
          Teachers in this tradition say the paths meet with time: work becomes contemplative, clarity becomes tender, and love becomes wise. The wise devotee of 7.17 is one picture of that meeting.
        </p>

        <VerseFunnelCTA variant="chapter" locale="en" pageName={"Krishna Three Paths"} />

        <h2>A Closing Thought</h2>

        <p>
          The three paths are meant to be practised, and the Gita&apos;s promise for each is the same: Krishna receives the one who walks it (4.11) and carries what they cannot (9.22).
        </p>

        <p>
          Tulsidas gives the devotee&apos;s side of it in Shiva&apos;s words, <em>hoihi soi jo Rama rachi rakha</em>: what Rama has ordained will happen. The Gita pairs surrender with a full duty to act (3.19, 11.33).
        </p>

        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected Tulsidas&apos;s date relative to the Gita, the description of 18.66 as Krishna&apos;s last instruction (introduced in 18.64), the chapter 13 citation (13.25, which lists meditation, Sankhya and karma yoga), the setting of Shiva&apos;s line in the Bal Kand, and removed unsupported claims about neuroscience and therapy; copy edited.</p>

        <h2 id="related-reading">Related Reading on the Three Paths</h2>
        <p>If you want to go deeper into any one of the three paths individually, the long-form chapter studies and topic guides below pick up where this overview leaves off.</p>
        <ul style={{ listStyle: 'none', padding: 0, marginBottom: '2rem' }}>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/bhagwat-geeta-chapter-3" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Bhagavad Gita Chapter 3, Karma Yoga, &ldquo;Why You Cannot Run&rdquo;</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>The full chapter on action: yajna, lokasamgraha, and why desire is the real enemy.</span>
          </li>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/bhagwat-geeta-chapter-4" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Bhagavad Gita Chapter 4, Jnana Yoga, &ldquo;The Fire That Burns Karma&rdquo;</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>Knowledge as the highest offering, and the Gita&apos;s model for how to learn from a real teacher.</span>
          </li>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/bhagwat-geeta-chapter-12" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Bhagavad Gita Chapter 12, Bhakti Yoga, &ldquo;How a Devotee Actually Lives&rdquo;</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>A short, practical chapter. The four-step ladder for when meditation is too hard.</span>
          </li>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/bhagwat-geeta-chapter-18" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Bhagavad Gita Chapter 18, Moksha Sannyasa Yoga</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>The closing chapter, including 18.66, Krishna&apos;s last instruction on surrender.</span>
          </li>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/bhagavad-gita-karma-meaning" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>What Karma Actually Means in the Bhagavad Gita</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>Karma doesn&apos;t mean &ldquo;what goes around comes around.&rdquo; Here is the real definition.</span>
          </li>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/bhagavad-gita-anxiety-mental-peace" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>What the Gita Says About Anxiety &amp; Mental Peace</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>A focused reading for those approaching the Gita through the door of anxiety and worry.</span>
          </li>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/beyond-bhagavad-gita-quotes-mental-spiritual-health" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Beyond the Bhagavad Gita, 7 Lesser-Known Gitas on Inner Peace</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>Ashtavakra, Avadhuta, Ram Gita and more: the wider Jnana tradition the chapter above draws from.</span>
          </li>
          <li style={{ padding: '0.7rem 0', borderBottom: '1px solid var(--border)' }}>
            <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>The Bhagavad Gita as a Story, How Krishna Builds His Argument</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>The structural arc of all 18 chapters, how the three paths unfold across the text.</span>
          </li>
          <li style={{ padding: '0.7rem 0' }}>
            <a href="/blogs/bhagavad-gita-for-beginners" style={{ color: 'var(--gold-light)', fontWeight: 600 }}>Bhagavad Gita for Beginners, Where to Start</a>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.92rem', display: 'block', marginTop: '0.25rem' }}>700 verses, 18 chapters. A no-nonsense guide for the first-time reader.</span>
          </li>
        </ul>
      </div>

      </article>

      {/* FAQ */}

      <FeedbackWidget pageType="blog" />
      <section className="faq-section" itemScope itemType="https://schema.org/FAQPage" aria-labelledby="faq-heading">
        <h2 id="faq-heading">Frequently Asked Questions</h2>

        <div className="faq-item">
          <strong>What are the three paths Krishna teaches in the Bhagavad Gita?</strong>
          <p>Krishna lays out three converging paths: <em>Karma Yoga</em> (the path of selfless action); <em>Jnana Yoga</em> (the path of knowledge and self-inquiry); and <em>Bhakti Yoga</em> (the path of devotion and surrender). All three lead to the same supreme reality, but each is shaped for a different temperament. </p>
        </div>

        <div className="faq-item">
          <strong>Why does Krishna give three paths instead of one?</strong>
          <p>Because human beings differ. Some are restless doers, some restless thinkers, some restless feelers. Krishna meets each person where they are. In 4.11 he says: <em>in whatever way people approach me, in that way I respond to them</em>.</p>
        </div>

        <div className="faq-item">
          <strong>Which of the three paths is the highest?</strong>
          <p>Krishna does not establish a flat hierarchy. In 12.12 he names a sequence (practice, knowledge, meditation, renunciation of fruit) and says peace follows immediately from that renunciation. In 7.17 he calls the <em>jnani-bhakta</em>, the wise lover, dearest. In 18.64–66 he calls this teaching sarva-guhyatamam, the most hidden of all. The paths complement each other.</p>
        </div>

        <div className="faq-item">
          <strong>How does Tulsidas&apos;s &ldquo;karm pradhan&rdquo; verse relate to the Gita&apos;s Karma Yoga?</strong>
          <p>Tulsidas writes <em>karam pradhan bisva kari rakha, jo jas karai so tas phalu chakha</em>: the world is governed by action; whoever does what, tastes the fruit accordingly. This is the law of karma in Awadhi. Krishna builds on the same law in 2.47: the action is yours to do, and the fruit is not yours to claim.</p>
        </div>

        <div className="faq-item">
          <strong>What does &ldquo;hoihi soi jo Rama rachi rakha&rdquo; mean and how does it connect to surrender in the Gita?</strong>
          <p>Tulsidas writes <em>hoihi soi jo rama rachi rakha, ko kari tarka badhavai sakha</em>: only that will happen which Rama has scripted; who can extend the branches of argument? Shiva says it after failing to persuade Sati, and then turns to Hari&apos;s name. Readers often compare it with 11.33 (<em>they have already been killed by me; become only the instrument</em>) and 18.66, <em>take refuge in me alone</em>.</p>
        </div>

        <div className="faq-item">
          <strong>How do the three paths connect to modern mental health?</strong>
          <p>Loosely. Karma Yoga&apos;s split between effort and outcome resembles the values-over-goals idea in Acceptance and Commitment Therapy. Jnana Yoga&apos;s watcher resembles the practice of noticing a thought as a thought. Bhakti offers the experience of being held. These are resemblances; the Gita&apos;s own aim is liberation (moksha).</p>
        </div>

        <div className="faq-item">
          <strong>How do I know which path is mine?</strong>
          <p>Notice what your restlessness wants. If you cannot sit still and need to <em>do</em>, your path likely begins with action. If you cannot stop questioning and need to <em>understand</em>, your path begins with knowledge. If you feel deeply and need to be in <em>relationship</em>, your path begins with devotion. As you go further, the other two tend to open up as well.</p>
        </div>
      </section>

      <SiteFooter />

      <BlogTracker pageName="Krishna Three Paths" />
    </>
  )
}
