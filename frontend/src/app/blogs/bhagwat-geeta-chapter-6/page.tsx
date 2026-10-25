import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 6 Summary – Key Verses & Meaning (Dhyana Yoga)",
  description: "Arjuna says the mind is as hard to hold as the wind (6.34). Bhagavad Gita Chapter 6 (Dhyana Yoga): Krishna on meditation, the restless mind, and the lamp in a windless place (6.19).",
  keywords: "bhagwat geeta chapter 6, bhagavad gita dhyana yoga, bhagwat geeta adhyay 6, lamp in windless place gita, uddharedatmanatmanam, abhyasa vairagya meaning, gita on meditation, restless mind gita, how to meditate bhagavad gita, Dhyana Yoga summary, Bhagavad Gita 6.5 meaning, Bhagavad Gita 6.34 the mind is like the wind, abhyasa vairagya meaning, lamp in windless place Bhagavad Gita, how to meditate according to Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 6 Summary – Key Verses & Meaning (Dhyana Yoga)",
    description: "Bhagavad Gita Chapter 6: meditation, the restless mind, and the lamp that does not flicker.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter6.webp", width: 1200, height: 675, alt: "A yogi seated in meditation at the edge of dawn, the mind, lamp-like, no longer flickers. Chapter 6 of the Bhagavad Gita teaches Dhyana Yoga, the path of meditation." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 6 Summary – Key Verses & Meaning (Dhyana Yoga)",
    description: "Bhagavad Gita Chapter 6: meditation, the restless mind, and the lamp that does not flicker.",
    images: ["https://wisdomquotes.in/assets/chapter6.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6", languages: { 'x-default': 'https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6' } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-5", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7" },
}

const pageCSS = `

      :root {
        --maroon: #3d0c0c;
        --maroon-mid: #5c1a1a;
        --gold: #c8881e;
        --gold-light: #f5c96a;
        --gold-pale: #fdf3dc;
        --gold-border: #e8c97a;
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
        --bg-card-hover: rgba(255, 255, 255, 0.07);
        --max: 780px;
      }

      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      html { scroll-behavior: smooth; scroll-padding-top: 88px; }

      body {
        font-family: "Inter", system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--text);
        line-height: 1.7;
        -webkit-font-smoothing: antialiased;
      }

      a { color: inherit; text-decoration: none; }
      img { display: block; max-width: 100%; }

      .breadcrumb { background: var(--bg-alt); border-bottom: 1px solid var(--border); }
      .breadcrumb-inner { max-width: 1100px; margin: 0 auto; padding: 10px 28px;
        font-size: 12px; color: var(--text-dimmer); display: flex; gap: 8px; align-items: center; }
      .breadcrumb-inner a { color: var(--text-dimmer); transition: color 0.15s; }
      .breadcrumb-inner a:hover { color: var(--gold-light); }
      .bc-sep { opacity: 0.4; }

      .article-hero {
        background: var(--bg-warm); padding: 64px 28px 56px;
        border-bottom: 1px solid var(--border); position: relative; overflow: hidden;
      }
      .article-hero::before {
        content: "अध्याय ६";
        position: absolute; right: -10px; bottom: -20px;
        font-family: "Noto Sans Devanagari", serif; font-size: 180px;
        color: rgba(200, 136, 30, 0.04); line-height: 1; pointer-events: none; user-select: none;
      }
      .article-hero-inner { max-width: 1100px; margin: 0 auto; position: relative; z-index: 2; }

      .chapter-badge { display: inline-flex; align-items: center; gap: 8px;
        background: rgba(200, 136, 30, 0.1); border: 1px solid rgba(200, 136, 30, 0.28);
        color: var(--gold-light); font-size: 11px; font-weight: 700; letter-spacing: 0.12em;
        text-transform: uppercase; padding: 5px 14px; border-radius: 100px; margin-bottom: 20px; }
      .chapter-badge-dot { width: 5px; height: 5px; border-radius: 50%; background: var(--gold);
        box-shadow: 0 0 6px var(--gold); flex-shrink: 0; }
      .article-title { font-family: "Playfair Display", Georgia, serif;
        font-size: clamp(28px, 4vw, 48px); font-weight: 700; color: var(--gold-light);
        line-height: 1.15; letter-spacing: -0.5px; margin-bottom: 12px; }
      .article-title em { font-style: italic; color: #fff; }
      .article-subtitle { font-size: 17px; color: var(--text-dim); font-weight: 300;
        margin-bottom: 32px; line-height: 1.65; max-width: 580px; }
      .article-meta { display: flex; align-items: center; gap: 16px; flex-wrap: wrap; }
      .meta-item { font-size: 12px; color: var(--text-dimmer); letter-spacing: 0.04em; }
      .meta-sep { color: var(--border); }

      .article-wrap { max-width: var(--max); margin: 0 auto; padding: 60px 28px 80px; }

      .chapter-image {
        margin: 0 0 36px;
        border-radius: 14px;
        overflow: hidden;
        border: 1px solid var(--border);
        background: var(--bg-warm);
        box-shadow: 0 24px 48px rgba(0, 0, 0, 0.4);
      }
      .chapter-image img { display: block; width: 100%; height: auto; aspect-ratio: 16 / 9; object-fit: cover; }

      .prose h2 { font-family: "Playfair Display", Georgia, serif; font-size: 26px; font-weight: 700;
        color: var(--gold-light); margin: 52px 0 16px; line-height: 1.25; }
      .prose h2[id], .faq-section[id], .related-reading[id] { scroll-margin-top: 88px; }
      .prose h2 em { font-style: italic; color: #fff; }

      .prose h3 { font-family: "Playfair Display", Georgia, serif; font-size: 19px; font-weight: 700;
        color: var(--text); margin: 32px 0 12px; }

      .prose p { font-size: 16.5px; line-height: 1.78; color: var(--text-dim); margin-bottom: 20px; }
      .prose p:last-child { margin-bottom: 0; }
      .prose strong { font-weight: 600; color: var(--text); }
      .prose em { font-style: italic; }
      .lead { font-size: 19px; line-height: 1.7; color: var(--text); font-weight: 300; margin-bottom: 28px; }

      .toc { background: var(--bg-card); border: 1px solid var(--border);
        border-left: 3px solid var(--gold); border-radius: 0 12px 12px 0;
        padding: 20px 24px; margin: 36px 0 40px; }
      .toc-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
        font-weight: 700; color: var(--gold); margin-bottom: 12px; }
      .toc-list { list-style: none; display: flex; flex-direction: column; gap: 7px; counter-reset: toc-counter; }
      .toc-list li { counter-increment: toc-counter; display: flex; align-items: baseline; gap: 10px; }
      .toc-list li::before { content: counter(toc-counter); font-family: "Inter", sans-serif;
        font-size: 11px; font-variant-numeric: tabular-nums; color: var(--text-dimmer); min-width: 14px; }
      .toc-list a { font-size: 13.5px; color: var(--text-dim); line-height: 1.4; transition: color 0.15s; }
      .toc-list a:hover { color: var(--gold-light); }

      .pull-quote { margin: 40px 0; padding: 28px 32px; border-left: 3px solid var(--gold);
        background: rgba(200, 136, 30, 0.05); border-radius: 0 12px 12px 0; }
      .pull-quote blockquote { font-family: "Playfair Display", serif; font-size: 21px;
        font-style: italic; color: var(--gold-light); line-height: 1.5; margin-bottom: 10px; }
      .pull-quote cite { font-size: 12px; letter-spacing: 0.1em; text-transform: uppercase;
        color: var(--gold); font-style: normal; font-weight: 600; }

      .section-divider { display: flex; align-items: center; gap: 16px; margin: 56px 0 40px; }
      .section-divider-line { flex: 1; height: 1px; background: var(--border); }
      .section-divider-label { font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase;
        color: var(--text-dimmer); white-space: nowrap; font-weight: 600; }

      .highlight-box { background: rgba(200, 136, 30, 0.05); border: 1px solid var(--border);
        border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0;
        padding: 20px 24px; margin: 28px 0; }
      .highlight-box p { font-size: 15px; line-height: 1.7; color: var(--text-dim); }
      .highlight-box strong { color: var(--gold-light); }

      .verse-table { width: 100%; border-collapse: collapse; font-size: 13.5px;
        margin: 28px 0 40px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
      .verse-table thead tr { background: rgba(200, 136, 30, 0.08); }
      .verse-table thead th { text-align: left; padding: 12px 16px; font-size: 11px;
        letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); font-weight: 700; }
      .verse-table tbody td { padding: 10px 16px; border-bottom: 1px solid var(--border);
        vertical-align: top; line-height: 1.55; color: var(--text-dim); }
      .verse-table tbody tr:last-child td { border-bottom: none; }
      .verse-table tbody tr:hover { background: var(--bg-card); }
      .verse-table td:first-child { font-size: 12px; color: var(--gold); font-weight: 600; white-space: nowrap; }

      .faq-section { background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px; overflow: hidden; margin: 48px 0; }
      .faq-header { padding: 28px 32px 20px; border-bottom: 1px solid var(--border); }
      .faq-header-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .faq-header h2 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700;
        color: var(--gold-light); line-height: 1.3; margin: 0; }
      .faq-item { padding: 22px 32px; border-bottom: 1px solid var(--border); }
      .faq-item:last-child { border-bottom: none; }
      .faq-q { font-size: 15px; font-weight: 600; color: var(--text); margin-bottom: 10px; line-height: 1.4; }
      .faq-a { font-size: 14.5px; line-height: 1.72; color: var(--text-dim); }

      .related-reading { background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px; padding: 28px 32px;
        margin: 48px 0; }
      .related-reading-label { font-size: 11px; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .related-reading h2 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700;
        color: var(--gold-light); line-height: 1.3; margin: 0 0 18px; }
      .related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .related-card { display: block; background: var(--bg); border: 1px solid var(--border);
        border-radius: 10px; padding: 14px 18px; transition: border-color 0.15s, background 0.15s, transform 0.15s; }
      .related-card:hover { border-color: var(--gold); background: var(--bg-card-hover); transform: translateY(-2px); }
      .related-card-label { font-size: 11px; letter-spacing: 0.15em; text-transform: uppercase;
        color: var(--text-dimmer); font-weight: 600; margin-bottom: 4px; }
      .related-card-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; }

      .app-cta { background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
        border: 1px solid rgba(200, 136, 30, 0.25); border-top: 3px solid var(--gold);
        border-radius: 20px; padding: 44px 48px 40px; margin: 48px 0 60px;
        text-align: center; position: relative; overflow: hidden; }
      .app-cta::before { content: "ध्यान"; position: absolute; top: -14px; right: -8px;
        font-family: "Noto Sans Devanagari", sans-serif; font-size: 130px;
        color: rgba(200, 136, 30, 0.05); line-height: 1; pointer-events: none; user-select: none; }
      .app-cta-eyebrow { display: inline-flex; align-items: center; background: rgba(200, 136, 30, 0.12);
        border: 1px solid rgba(200, 136, 30, 0.35); color: var(--gold-light); font-size: 11px;
        font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; padding: 5px 14px;
        border-radius: 20px; margin-bottom: 20px; }
      .app-cta-headline { font-family: "Playfair Display", serif;
        font-size: clamp(22px, 3vw, 30px); font-weight: 700; color: var(--text);
        line-height: 1.25; margin-bottom: 14px; }
      .app-cta-desc { font-size: 15px; color: var(--text-dim); line-height: 1.7;
        max-width: 480px; margin: 0 auto 22px; }
      .app-cta-features { display: flex; gap: 6px 18px; justify-content: center;
        flex-wrap: wrap; margin-bottom: 28px; }
      .app-cta-features span { font-size: 13px; color: var(--gold-light); opacity: 0.8; }
      .app-cta-btn { display: inline-flex; align-items: center; gap: 10px;
        background: var(--gold); color: #120505; text-decoration: none;
        padding: 15px 34px; border-radius: 12px; font-size: 16px; font-weight: 700;
        letter-spacing: -0.01em; transition: all 0.2s;
        box-shadow: 0 4px 22px rgba(200, 136, 30, 0.3); }
      .app-cta-btn:hover { background: var(--gold-light); transform: translateY(-2px);
        box-shadow: 0 8px 32px rgba(200, 136, 30, 0.5); }
      .app-cta-sub { font-size: 12px; color: rgba(245, 232, 204, 0.35); margin-top: 14px; letter-spacing: 0.04em; }

      .chapter-nav { display: flex; justify-content: space-between; align-items: center;
        gap: 16px; padding: 20px 0; border-top: 1px solid var(--border);
        border-bottom: 1px solid var(--border); margin: 0 0 40px; }
      .ch-nav-label { font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
        color: var(--text-dimmer); font-weight: 600; margin-bottom: 4px; }
      .ch-nav-title { font-size: 14px; font-weight: 600; color: var(--text); }

      footer { background: var(--bg-alt); border-top: 1px solid var(--border);
        padding: 32px 28px; text-align: center; font-size: 12px;
        letter-spacing: 0.06em; color: var(--text-dimmer); }
      footer a { color: var(--text-dimmer); transition: color 0.15s; }
      footer a:hover { color: var(--gold-light); }
      footer span { color: var(--gold); }

      @media (max-width: 700px) {
        .article-hero { padding: 44px 20px 40px; }
        .article-wrap { padding: 40px 20px 60px; }
        .app-cta { padding: 32px 24px; }
        .pull-quote { padding: 22px 24px; }
        .faq-header, .faq-item { padding-left: 20px; padding-right: 20px; }
        .related-grid { grid-template-columns: 1fr; }
      }

`

const schemas = [
  {
    "@context": "https://schema.org",
    "@type": [
      "Article",
      "LearningResource"
    ],
    "headline": "Bhagavad Gita Chapter 6: Dhyana Yoga",
    "description": "Bhagavad Gita Chapter 6, Dhyana Yoga (Meditation): key verses with Sanskrit, transliteration and meaning, including the lamp in a windless place.",
    "alternativeHeadline": "Bhagavad Gita Chapter 6 (Dhyana Yoga) — Summary & Verses",
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
      "logo": {
        "@type": "ImageObject",
        "url": "https://wisdomquotes.in/assets/new-light-logo.webp"
      }
    },
    "image": {
      "@type": "ImageObject",
      "url": "https://wisdomquotes.in/assets/chapter6.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6"
    },
    "about": [
      {
        "@type": "Book",
        "name": "Bhagavad Gita",
        "author": {
          "@type": "Person",
          "name": "Ved Vyasa"
        },
        "url": "https://wisdomquotes.in/gita"
      },
      {
        "@type": "Person",
        "name": "Krishna",
        "url": "https://en.wikipedia.org/wiki/Krishna"
      },
      {
        "@type": "Person",
        "name": "Arjuna",
        "url": "https://en.wikipedia.org/wiki/Arjuna"
      }
    ],
    "keywords": "bhagwat geeta chapter 6, bhagavad gita dhyana yoga, bhagwat geeta adhyay 6, lamp in windless place gita, uddharedatmanatmanam, abhyasa vairagya meaning, gita on meditation, restless mind gita, how to meditate bhagavad gita, Dhyana Yoga summary, Bhagavad Gita 6.5 meaning, Bhagavad Gita 6.34 the mind is like the wind, abhyasa vairagya meaning, lamp in windless place Bhagavad Gita, how to meditate according to Bhagavad Gita",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2820,
    "inLanguage": "en",
    "isAccessibleForFree": true,
    "learningResourceType": "Article",
    "educationalLevel": "General",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".lead",
        ".shloka-meaning",
        ".shloka-essence"
      ]
    }
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Wisdom",
        "item": "https://wisdomquotes.in/"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Blog",
        "item": "https://wisdomquotes.in/blogs"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": "Bhagavad Gita Chapter 6 — Dhyana Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 6 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 6, called Dhyana Yoga (the Yoga of Meditation), is Krishna's instruction on meditation. Across 47 verses he tells Arjuna where to sit and how (6.11–14), how much to eat and sleep (6.16–17), and what to do when the mind wanders (6.26). It contains the lamp in a windless place (6.19), Arjuna's objection that the mind is like the wind (6.34), and Krishna's reply that it is held by practice and detachment, abhyāsa and vairāgya (6.35)."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 6.5 mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 6.5 says, 'Lift yourself by yourself; do not let yourself fall. The self alone is the friend of the self, and the self alone is its enemy.' The verse puts the work on the person: the same self that can lift you can drag you down. In 6.6 Krishna adds that the self is a friend to one who has mastered it and an enemy to one who has not."
        }
      },
      {
        "@type": "Question",
        "name": "What is the lamp in a windless place metaphor?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 6.19 Krishna compares the controlled mind of a yogi in meditation to a lamp in a place with no wind: its flame does not flicker. The image is of stillness that comes once the wind, the pull of desire, has dropped."
        }
      },
      {
        "@type": "Question",
        "name": "What did Arjuna object to in Chapter 6?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verses 6.33 and 6.34, Arjuna says he can't see how this yoga of evenness could last: the mind is restless, strong and stubborn, and as hard to hold as the wind. Krishna agrees in 6.35 that the mind is hard to control, and says it is held by abhyāsa (practice) and vairāgya (detachment)."
        }
      },
      {
        "@type": "Question",
        "name": "What happens if you fail at yoga according to Chapter 6?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In 6.37–39 Arjuna asks what becomes of someone who has faith but falls away from yoga. Krishna answers in 6.40–45 that no one who does good comes to a bad end. Such a person is born again into a good family or a family of yogis, regains the understanding of the earlier life, and strives again (6.43)."
        }
      },
      {
        "@type": "Question",
        "name": "Is meditation in the Bhagavad Gita similar to modern meditation practice?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "There is overlap. Noticing when the mind wanders and bringing it back is what verse 6.26 describes. The Gita's frame is wider: it trains the whole person toward steadiness, equal vision (6.29) and devotion, and in 6.47 Krishna ranks the yogi who worships him with faith above all others."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.5",
    "text": "Lift yourself by yourself; do not let yourself fall. The self alone is the friend of the self, and the self alone is its enemy.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 6, Verse 5"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत् । / आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
      "uddhared ātmanā''tmānaṃ nātmānam avasādayet | / ātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.5"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.19",
    "text": "As a lamp in a windless place does not flicker — that is the comparison given for the disciplined mind of a yogi united in meditation.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 6, Verse 19"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यथा दीपो निवातस्थो नेङ्गते सोपमा स्मृता । / योगिनो यतचित्तस्य युञ्जतो योगमात्मनः ॥",
      "yathā dīpo nivāta-stho neṅgate sopamā smṛtā | / yogino yatacittasya yuñjato yogam ātmanaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.19"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.26",
    "text": "Whenever the restless, unsteady mind wanders out, from wherever it has gone, bring it back under the authority of the self.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 6, Verse 26"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम् । / ततस्ततो नियम्यैतदात्मन्येव वशं नयेत् ॥",
      "yato yato niścarati manaścañcalam asthiram | / tatas tato niyamyaitad ātmany eva vaśaṃ nayet ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.26"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.35",
    "text": "The Blessed One said: Undoubtedly, mighty-armed one, the mind is restless and hard to restrain. But by practice and detachment, it is held.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 6, Verse 35"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रीभगवानुवाच / असंशयं महाबाहो मनो दुर्निग्रहं चलं । / अभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥",
      "śrī bhagavān uvāca | / asaṃśayaṃ mahābāho mano durnigrahaṃ calam | / abhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.35"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.47",
    "text": "Among all yogis, the one whose inner self has come to rest in me, who worships me with trust — that one I consider the most fully integrated.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Krishna"
    },
    "creator": {
      "@type": "Person",
      "name": "Krishna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 6, Verse 47"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "योगिनामपि सर्वेषां मद्गतेनान्तरात्मना । / श्रद्धावान्भजते यो मां स मे युक्ततमो मतः ॥",
      "yoginām api sarveṣāṃ madgatenāntar-ātmanā | / śraddhāvān bhajate yo māṃ sa me yuktatamo mataḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6#verse-6.47"
  }
]

export default function ChapterPage6() {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: pageCSS }} />
      {schemas.map((s, i) => (
        <script key={i} type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(s) }} />
      ))}

      {/* ── BREADCRUMB ── */}
      <div className="breadcrumb">
        <div className="breadcrumb-inner">
          <a href="/">Wisdom</a>
          <span className="bc-sep">/</span>
          <a href="/blogs">Blog</a>
          <span className="bc-sep">/</span>
          Bhagavad Gita Chapter 6
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 6 · 47 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 6 (Adhyay 6):<br />
            <em>Dhyana Yoga</em>
          </h1>
          <p className="article-subtitle">
            Krishna on training a mind that won&apos;t sit still: the self as its own friend and enemy (6.5–6), the lamp in a windless place (6.19), and what happens to someone who tries and falls short (6.40).
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">47 verses · Dhyana Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~14 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 6 of 18</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <div className="article-wrap">
        <article className="prose">
          <figure className="chapter-image">
            <img
              src="/assets/chapter6.webp"
              alt="A yogi seated in meditation at dawn. Chapter 6 of the Bhagavad Gita teaches Dhyana Yoga, the path of meditation."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          In Chapter 6 Krishna gives instructions for meditation: a clean place, a seat neither too high nor too low, body and head held straight (6.11–13), and moderation in food and sleep (6.16–17). He also deals with the point where most attempts break down, when you try to be still and can&apos;t.
        </p>

        <p>
          In 6.34 Arjuna objects that the mind is as hard to hold as the wind. Krishna agrees that it is restless, and says it is held by abhyāsa and vairāgya, practice and detachment (6.35): coming back again and again, while caring less about the result.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#lift-yourself">Lift yourself by yourself, 6.5</a></li>
            <li><a href="#highest-yogi">The chapter's final word, trust</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 6.5–6.6 · Self as Friend, Self as Enemy
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="lift-yourself">Lift Yourself by Yourself: The Self as Friend and Enemy</h2>

        <p>
          Chapter 6 opens by saying who counts as a renouncer: one who does his duty without depending on its fruit (6.1). Then, in verse 5, Krishna says plainly: lift yourself by yourself; do not let yourself sink. The same self that can carry you upward can also drag you down.
        </p>

        <p>
          The verse puts the responsibility on you, including when you are tired, ashamed or stuck. Nobody else can do the lifting, and the verse also says you have what it takes to do it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 6.5"
          speaker="Krishna"
          sanskrit="उद्धरेदात्मनाऽऽत्मानं नात्मानमवसादयेत् । आत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥"
          iast="uddhared ātmanā''tmānaṃ nātmānam avasādayet | ātmaiva hyātmano bandhur ātmaiva ripur ātmanaḥ ||"
          essence="Lift yourself by yourself and don't let yourself sink; the self is its own friend and enemy."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 6.6"
          speaker="Krishna"
          sanskrit="बन्धुरात्माऽऽत्मनस्तस्य येनात्मैवात्मना जितः । अनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ॥"
          iast="bandhur ātmā''tmanas tasya yenātmaivātmanā jitaḥ | anātmanas tu śatrutve vartetātmaiva śatruvat ||"
          essence="The self is a friend to one who has mastered it, an enemy to one who has not."
        />

        <div className="highlight-box">
          <p>
            <strong>What if you fall short:</strong> Many people quit a practice because it doesn&apos;t seem to be working. In 6.37–39 Arjuna asks what happens to someone who tries and falls away. Krishna answers that no one who does good comes to a bad end (6.40), and that such a person later regains the understanding they had and strives again (6.43).
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 6.47 · The Final Hierarchy
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="highest-yogi">The Chapter's Surprising Final Word: Trust</h2>

        <p>
          After 46 verses on meditation, posture, balance and discipline, Krishna names the highest yogi: the one whose inner self rests in him and who worships him with faith. Devotion, bhakti, ranks above discipline.
        </p>

        <p>
          This sets up Chapters 7 to 12, which deal with devotion and with Krishna&apos;s own nature. The meditation chapter ends by giving the mind somewhere to rest as well as ways to control it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 6.47"
          speaker="Krishna"
          sanskrit="योगिनामपि सर्वेषां मद्गतेनान्तरात्मना । श्रद्धावान्भजते यो मां स मे युक्ततमो मतः ॥"
          iast="yoginām api sarveṣāṃ madgatenāntar-ātmanā | śraddhāvān bhajate yo māṃ sa me yuktatamo mataḥ ||"
          essence="Of all yogis, the one who worships Krishna with faith, inner self resting in him, is most united."
        />

        <div className="pull-quote">
          <blockquote>
            "Among all yogis, the one whose inner self rests in me, with trust, that one is the most fully united."
          </blockquote>
          <cite>Bhagavad Gita 6.47</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 47 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>6.1</td><td>Krishna</td><td>One who does his duty without depending on its fruit is a renouncer and a yogi</td></tr>
            <tr><td>6.2</td><td>Krishna</td><td>What is called renunciation is yoga; no one becomes a yogi without giving up selfish intent</td></tr>
            <tr><td>6.3</td><td>Krishna</td><td>For one climbing to yoga, action is the means; for one who has reached it, stillness is</td></tr>
            <tr><td>6.4</td><td>Krishna</td><td>One attached neither to sense objects nor to actions, giving up all intent, has reached yoga</td></tr>
            <tr><td>6.5</td><td>Krishna</td><td>Lift yourself by yourself and do not let yourself sink; the self is its own friend and enemy</td></tr>
            <tr><td>6.6</td><td>Krishna</td><td>The self is a friend to one who has mastered it, an enemy to one who has not</td></tr>
            <tr><td>6.7</td><td>Krishna</td><td>The calm, self-controlled person stays steady in cold and heat, pleasure and pain, honour and insult</td></tr>
            <tr><td>6.8</td><td>Krishna</td><td>Content in knowledge, senses mastered, the yogi sees a clod, a stone and gold as the same</td></tr>
            <tr><td>6.9</td><td>Krishna</td><td>He regards friends, enemies, the neutral, relatives, the good and the sinful with an equal mind</td></tr>
            <tr><td>6.10</td><td>Krishna</td><td>The yogi should practise alone in a quiet place, mind controlled, free of hope and possessions</td></tr>
            <tr><td>6.11</td><td>Krishna</td><td>Set a firm seat in a clean place, neither too high nor too low, with cloth, deerskin and kusha grass</td></tr>
            <tr><td>6.12</td><td>Krishna</td><td>Seated there, mind on one point, thought and senses controlled, practise yoga to purify the self</td></tr>
            <tr><td>6.13</td><td>Krishna</td><td>Hold body, head and neck straight and still, gazing at the tip of the nose</td></tr>
            <tr><td>6.14</td><td>Krishna</td><td>Calm and fearless, keeping the vow of celibacy, the yogi sits with mind fixed on Krishna</td></tr>
            <tr><td>6.15</td><td>Krishna</td><td>Practising this way, the yogi with a controlled mind reaches the peace that rests in Krishna</td></tr>
            <tr><td>6.16</td><td>Krishna</td><td>Yoga is not for one who eats too much or too little, or sleeps too much or too little</td></tr>
            <tr><td>6.17</td><td>Krishna</td><td>Yoga ends sorrow for one moderate in food, recreation, effort, sleep and waking</td></tr>
            <tr><td>6.18</td><td>Krishna</td><td>When the controlled mind rests in the self alone, free of craving, one is called yukta</td></tr>
            <tr><td>6.19</td><td>Krishna</td><td>The controlled mind of a yogi is like a lamp in a windless place: it does not flicker</td></tr>
            <tr><td>6.20</td><td>Krishna</td><td>When the mind, stilled by yoga, comes to rest, one sees the self by the self and is content</td></tr>
            <tr><td>6.21</td><td>Krishna</td><td>Settled in that boundless joy, known by the intellect beyond the senses, he does not waver</td></tr>
            <tr><td>6.22</td><td>Krishna</td><td>Having gained it, he values no gain above it, and even heavy sorrow does not move him</td></tr>
            <tr><td>6.23</td><td>Krishna</td><td>Yoga is the breaking of contact with sorrow; practise it with determination</td></tr>
            <tr><td>6.24</td><td>Krishna</td><td>Give up all desires born of intention and restrain the senses on every side with the mind</td></tr>
            <tr><td>6.25</td><td>Krishna</td><td>Little by little, with a steady intellect, fix the mind on the self and think of nothing else</td></tr>
            <tr><td>6.26</td><td>Krishna</td><td>Wherever the restless mind wanders, bring it back and settle it in the self</td></tr>
            <tr><td>6.27</td><td>Krishna</td><td>The highest joy comes to the yogi whose mind is calm and passion stilled, who has become Brahman</td></tr>
            <tr><td>6.28</td><td>Krishna</td><td>Practising this, the sinless yogi easily reaches the boundless joy of contact with Brahman</td></tr>
            <tr><td>6.29</td><td>Krishna</td><td>The yogi sees the self in every being and every being in the self, with equal vision everywhere</td></tr>
            <tr><td>6.30</td><td>Krishna</td><td>Krishna is never lost to one who sees him everywhere and all in him, nor is that person lost to him</td></tr>
            <tr><td>6.31</td><td>Krishna</td><td>One who worships Krishna as dwelling in every being lives in him, however he lives</td></tr>
            <tr><td>6.32</td><td>Krishna</td><td>The best yogi judges pleasure and pain in others by the same measure as in himself</td></tr>
            <tr><td>6.33</td><td>Arjuna</td><td>Arjuna says he cannot see how this yoga of evenness can last, the mind being so restless</td></tr>
            <tr><td>6.34</td><td>Arjuna</td><td>Arjuna says the mind is restless and strong, as hard to hold as the wind</td></tr>
            <tr><td>6.35</td><td>Krishna</td><td>Krishna agrees the mind is restless, but says it is held by practice and detachment</td></tr>
            <tr><td>6.36</td><td>Krishna</td><td>Yoga is hard for the undisciplined but reachable by the self-controlled who strive by right means</td></tr>
            <tr><td>6.37</td><td>Arjuna</td><td>Arjuna asks what becomes of one with faith who strays from yoga before reaching its goal</td></tr>
            <tr><td>6.38</td><td>Arjuna</td><td>Arjuna asks whether such a person, lost from both paths, perishes like a scattered cloud</td></tr>
            <tr><td>6.39</td><td>Arjuna</td><td>Arjuna asks Krishna to remove this doubt, since no one else can</td></tr>
            <tr><td>6.40</td><td>Krishna</td><td>No one who does good comes to a bad end, in this world or the next</td></tr>
            <tr><td>6.41</td><td>Krishna</td><td>The fallen yogi lives long in the worlds of the virtuous, then is born into a pure, prosperous family</td></tr>
            <tr><td>6.42</td><td>Krishna</td><td>Or he is born into a family of wise yogis, a birth very hard to obtain</td></tr>
            <tr><td>6.43</td><td>Krishna</td><td>There he regains the understanding of his past life and strives again for perfection</td></tr>
            <tr><td>6.44</td><td>Krishna</td><td>His earlier practice carries him on even against his will</td></tr>
            <tr><td>6.45</td><td>Krishna</td><td>Striving hard over many lives, purified, the yogi reaches the highest goal</td></tr>
            <tr><td>6.46</td><td>Krishna</td><td>The yogi is greater than ascetics, scholars and ritual workers; so be a yogi, Arjuna</td></tr>
            <tr><td>6.47</td><td>Krishna</td><td>Of all yogis, the one who worships Krishna with faith, inner self resting in him, is most united</td></tr>
          </tbody>
        </table>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the account of 6.40–45 (the fallen yogi resumes in a later birth, 6.43) and the verse summaries in the table; removed unsupported comparisons with other scriptures; copy edited.</p>
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-5" className="ch-nav-title">Chapter 5, Karma Sanyasa Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-7" className="ch-nav-title">Chapter 7, Jnana Vijnana Yoga</a>
          </div>
        </div>

      <FeedbackWidget pageType="blog" />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Frequently Asked Questions
          </div>
          <div className="section-divider-line"></div>
        </div>


        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 6 about?</div>
            <div className="faq-a">
              Chapter 6, called Dhyana Yoga (the Yoga of Meditation), is Krishna&apos;s instruction on meditation. Across 47 verses he tells Arjuna where to sit and how (6.11–14), how much to eat and sleep (6.16–17), and what to do when the mind wanders (6.26). It contains the lamp in a windless place (6.19), Arjuna&apos;s objection that the mind is like the wind (6.34), and Krishna&apos;s reply that it is held by practice and detachment, abhyāsa and vairāgya (6.35).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 6.5 mean?</div>
            <div className="faq-a">
              Verse 6.5 says, 'Lift yourself by yourself; do not let yourself fall. The self alone is the friend of the self, and the self alone is its enemy.' The verse puts the work on the person: the same self that can lift you can drag you down. In 6.6 Krishna adds that the self is a friend to one who has mastered it and an enemy to one who has not.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the lamp in a windless place metaphor?</div>
            <div className="faq-a">
              In verse 6.19 Krishna compares the controlled mind of a yogi in meditation to a lamp in a place with no wind: its flame does not flicker. The image is of stillness that comes once the wind, the pull of desire, has dropped.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What did Arjuna object to in Chapter 6?</div>
            <div className="faq-a">
              In verses 6.33 and 6.34, Arjuna says he can&apos;t see how this yoga of evenness could last: the mind is restless, strong and stubborn, and as hard to hold as the wind. Krishna agrees in 6.35 that the mind is hard to control, and says it is held by abhyāsa (practice) and vairāgya (detachment).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What happens if you fail at yoga according to Chapter 6?</div>
            <div className="faq-a">
              In 6.37–39 Arjuna asks what becomes of someone who has faith but falls away from yoga. Krishna answers in 6.40–45 that no one who does good comes to a bad end. Such a person is born again into a good family or a family of yogis, regains the understanding of the earlier life, and strives again (6.43).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Is meditation in the Bhagavad Gita similar to modern meditation practice?</div>
            <div className="faq-a">
              There is overlap. Noticing when the mind wanders and bringing it back is what verse 6.26 describes. The Gita&apos;s frame is wider: it trains the whole person toward steadiness, equal vision (6.29) and devotion, and in 6.47 Krishna ranks the yogi who worships him with faith above all others.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about anxiety & mental peace</div>
          </a>
          <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Karma: what it means in the Gita</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-5" className="related-card">
            <div className="related-card-label">Chapter 5</div>
            <div className="related-card-title">Karma Sanyasa Yoga, Acting Without Being Touched</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-12" className="related-card">
            <div className="related-card-label">Chapter 12</div>
            <div className="related-card-title">Bhakti Yoga: How a Devotee Lives</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-14" className="related-card">
            <div className="related-card-label">Chapter 14</div>
            <div className="related-card-title">Gunatraya Vibhaga, The Three Forces</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 6"} />

        </article>
      </div>

      {/* FOOTER */}
      <SiteFooter />

      <BlogTracker pageName="Bhagwat Geeta Chapter 6" />
    </>
  )
}
