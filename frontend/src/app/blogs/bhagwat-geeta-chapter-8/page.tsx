import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 8 Summary – Key Verses & Meaning (Akshara Brahma Yoga)",
  description: "Whatever you remember at the moment of death, to that state you go (8.6). Bhagavad Gita Chapter 8 on death, rebirth, and the imperishable Brahman. All 28 verses in Sanskrit, Hindi and English.",
  keywords: "bhagwat geeta chapter 8, bhagavad gita akshara brahma yoga, bhagwat geeta adhyay 8, death in bhagavad gita, brahma kalpa days nights, supreme abode gita, antakale ca mam eva smaran, mind at the moment of death gita, Akshara Brahma Yoga meaning, Bhagavad Gita 8.5 anta kale ca mam eva smaran, Bhagavad Gita 8.6 meaning, what is the supreme abode in Bhagavad Gita, Brahma's day and night Bhagavad Gita, om iti ekaksharam brahma",
  openGraph: {
    title: "Bhagavad Gita Chapter 8 Summary – Key Verses & Meaning (Akshara Brahma Yoga)",
    description: "Bhagavad Gita Chapter 8, what the mind has practiced, the moment of death, and the imperishable destination.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter8.webp", width: 1200, height: 675, alt: "Light dispersing into the eternal, Chapter 8 of the Bhagavad Gita teaches Akshara Brahma Yoga: the imperishable, the moment of death, and what the mind has practiced." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 8 Summary – Key Verses & Meaning (Akshara Brahma Yoga)",
    description: "Bhagavad Gita Chapter 8, what the mind has practiced, the moment of death, and the imperishable destination.",
    images: ["https://wisdomquotes.in/assets/chapter8.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8", languages: { 'x-default': 'https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8' } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9" },
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
        content: "अध्याय ८";
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
      .app-cta::before { content: "अक्षर"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 8: Akshara Brahma Yoga",
    "description": "Bhagavad Gita Chapter 8 — Akshara Brahma Yoga. All 28 verses on the imperishable Brahman, the state at death, Brahma's day, and the path beyond return.",
    "alternativeHeadline": "Bhagavad Gita Chapter 8 (Akshara Brahma Yoga) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter8.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8"
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
    "keywords": "bhagwat geeta chapter 8, bhagavad gita akshara brahma yoga, bhagwat geeta adhyay 8, death in bhagavad gita, brahma kalpa days nights, supreme abode gita, antakale ca mam eva smaran, mind at the moment of death gita, Akshara Brahma Yoga meaning, Bhagavad Gita 8.5 anta kale ca mam eva smaran, Bhagavad Gita 8.6 meaning, what is the supreme abode in Bhagavad Gita, Brahma's day and night Bhagavad Gita, om iti ekaksharam brahma",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2407,
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
        "name": "Bhagavad Gita Chapter 8 — Akshara Brahma Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 8 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 8 (Akshara Brahma Yoga) is the Gita's chapter on death, and so also on how to live before it. Krishna answers Arjuna's questions about six terms and about the time of death (8.1–4), then teaches that the state of mind at the end of life comes from what the mind has practised. The chapter contains 8.6: whatever state a person remembers at the end is the state they reach. It also introduces Brahma's day and night, the imperishable destination from which one does not return, and the two paths after death."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 8.6 mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 8.6 says, 'Whatever state of being one remembers when leaving the body, that state one attains, because the mind has long been shaped by it.' The verse is about training. The mind at the end is the mind you have trained by what it has kept returning to in life (sadā tad-bhāva-bhāvitaḥ, always shaped by that state)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the meaning of antakale ca mam eva smaran?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "This is the opening phrase of verse 8.5 — 'at the end, remembering me alone.' Krishna says one who departs while remembering him reaches his state. The next verse adds that what one remembers at the end depends on what the mind has long been shaped by, and 8.7 says to remember Krishna at all times. The teaching is about a lifetime of practice."
        }
      },
      {
        "@type": "Question",
        "name": "What are Brahma's day and night in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verses 8.17-19, Krishna describes Brahma's day as lasting a thousand yugas, and his night as lasting another thousand. At the start of Brahma's day, all beings emerge from the unmanifest. At nightfall, they dissolve back. In 8.19 Krishna says the same host of beings comes forth and dissolves again and again, and in 8.16 that even Brahma's world is subject to return."
        }
      },
      {
        "@type": "Question",
        "name": "What is the supreme abode (paramam dhama) in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 8.21 calls the supreme abode the unmanifest, the imperishable — and says those who reach it are free of return. It is described as Krishna's own home (tad dhāma paramaṃ mama). The phrase refers to liberation from the cycle of rebirth. In 8.15 Krishna says those who reach him are not born again into this passing home of sorrow."
        }
      },
      {
        "@type": "Question",
        "name": "Is Chapter 8 saying we should only think of Bhagavan at death?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Read carefully, no. Verse 8.7 says to remember Krishna at all times while doing your work, and 8.14 speaks of remembering him constantly. The state at death is the one the mind has been trained into over a lifetime."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.5",
    "text": "Whoever remembers me at the end, leaving the body — reaches my state. There is no doubt in this.",
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
      "name": "Bhagavad Gita, Chapter 8, Verse 5"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् । / यः प्रयाति स मद्भावं याति नास्त्यत्र संशयः ॥",
      "anta-kāle ca mām eva smaran muktvā kalevaram | / yaḥ prayāti sa mad-bhāvaṃ yāti nāsty atra saṃśayaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.5"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.6",
    "text": "Whatever state a person remembers as they leave the body, that state they reach — because the mind has long been shaped by it.",
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
      "name": "Bhagavad Gita, Chapter 8, Verse 6"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम् । / तं तमेवैति कौन्तेय सदा तद्भावभावितः ॥",
      "yaṃ yaṃ vāpi smaran bhāvaṃ tyajaty ante kalevaram | / taṃ tam evaiti kaunteya sadā tad-bhāva-bhāvitaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.6"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.8",
    "text": "With a mind disciplined by the yoga of practice, not wandering anywhere else, the one who departs while remembering the supreme divine person reaches that supreme being, Partha.",
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
      "name": "Bhagavad Gita, Chapter 8, Verse 8"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अभ्यासयोगयुक्तेन चेतसा नान्यगामिना । / परमं पुरुषं दिव्यं याति पार्थानुचिन्तयन् ॥",
      "abhyāsa-yoga-yuktena cetasā nānya-gāminā | / paramaṃ puruṣaṃ divyaṃ yāti pārthānucintayan ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.8"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.14",
    "text": "For the yogi whose mind is undivided, who remembers me constantly, always united with me — I am easy to reach, Partha.",
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
      "name": "Bhagavad Gita, Chapter 8, Verse 14"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अनन्यचेताः सततं यो मां स्मरति नित्यशः । / तस्याहं सुलभः पार्थ नित्ययुक्तस्य योगिनः ॥",
      "ananya-cetāḥ satataṃ yo māṃ smarati nityaśaḥ | / tasyāhaṃ sulabhaḥ pārtha nitya-yuktasya yoginaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.14"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.21",
    "text": "That which is called the unmanifest, the imperishable — they call it the supreme destination. Having reached it, beings do not return. That is my supreme abode.",
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
      "name": "Bhagavad Gita, Chapter 8, Verse 21"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अव्यक्तोऽक्षर इत्युक्तस्तमाहुः परमां गतिम् । / यं प्राप्य न निवर्तन्ते तद्धाम परमं मम ॥",
      "avyakto'kṣara ity uktas tam āhuḥ paramāṃ gatim | / yaṃ prāpya na nivartante tad dhāma paramaṃ mama ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8#verse-8.21"
  }
]

export default function ChapterPage8() {
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
          Bhagavad Gita Chapter 8
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 8 · 28 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 8 (Adhyay 8):<br />
            <em>Akshara Brahma Yoga</em>
          </h1>
          <p className="article-subtitle">
            Krishna on the imperishable Brahman, the moment of death, and the practice that shapes it: whatever the mind has long rehearsed is what it holds at the end (8.6).
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">28 verses · Akshara Brahma Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~11 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 8 of 18</span>
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
              src="/assets/chapter8.webp"
              alt="Light spreading outward. Chapter 8 of the Bhagavad Gita, Akshara Brahma Yoga, on the imperishable, the moment of death, and what the mind has practised."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 8 is about death, and so also about how to live before it. Arjuna opens with seven questions: what are Brahman, adhyatma, karma, adhibhuta, adhidaiva and adhiyajna, and how is Krishna known at the time of death (8.1–2)? Krishna&apos;s first answers are short and technical. Then the chapter turns to a practical question: what state of mind will I be in at the end?
        </p>

        <p>
          Many readers find the question morbid. The Gita uses it to get clear about how to live, because the state of mind at the end comes from what the mind has practised. Verse 8.6 says: <em>whatever state of being you remember at the end, you reach that state, because the mind has been shaped by it</em>. So the practice that shapes the end is happening now.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#seven-terms">Seven questions: Krishna gets technical</a></li>
            <li><a href="#end-state">The state at the end: 8.5 and 8.6</a></li>
            <li><a href="#what-rehearsed">You leave with what you rehearsed</a></li>
            <li><a href="#easy-reach">Constant remembrance: 8.14</a></li>
            <li><a href="#cosmic-time">Cosmic time: the day and night of Brahma</a></li>
            <li><a href="#beyond-return">The path beyond return</a></li>
            <li><a href="#two-paths">The chapter&apos;s closing: beyond merit</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 8.1–8.4 · The Definitions
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="seven-terms">Krishna Gets Technical: Seven Questions</h2>

        <p>
          Arjuna opens Chapter 8 with a string of questions. What is Brahman? What is the inner self? What is action? What is the realm of beings? What is the divine? Who is the lord of sacrifice in the body? And how is Krishna known at the moment of death? Krishna answers in two verses, almost like a glossary (8.3–4), before going on.
        </p>

        <p>
          Many readers skip these verses to get to the better-known teaching, but the definitions show that the Gita uses its terms carefully. <em>Brahman</em> is the imperishable, the supreme. <em>Adhyatma</em> is one&apos;s own nature. <em>Karma</em> is the creative act that brings beings into existence.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 8.3"
          speaker="Krishna"
          sanskrit="श्रीभगवानुवाच अक्षरं ब्रह्म परमं स्वभावोऽध्यात्ममुच्यते । भूतभावोद्भवकरो विसर्गः कर्मसंज्ञितः ॥"
          iast="śrī bhagavān uvāca | akṣaraṃ brahma paramaṃ svabhāvo'dhyātmam ucyate | bhūta-bhāvodbhava-karo visargaḥ karma-saṃjñitaḥ ||"
          insightLabel="Why precise definitions matter here"
          insight="The claims about death that follow depend on these terms. Three things are kept apart: the imperishable (Brahman), your own nature (adhyatma), and action (karma)."
          essence="Brahman is the imperishable; adhyatma is one&apos;s own nature; karma is the creative act behind beings."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 8.5–8.6 · The State at the End
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="end-state">Whatever You Remember at the End, That You Become</h2>

        <p>
          After the definitions, Krishna says that the state of mind you hold as you leave the body shapes what follows. At first this can read like a final exam. Read again, it describes how attention works.
        </p>

        <p>
          Verse 8.6 says: whatever state a person remembers at the end, that state they reach, because the mind has been shaped by it. The Sanskrit phrase is <em>sadā tad-bhāva-bhāvitaḥ</em>, always conditioned by that state. It is a plain claim about habit: whatever the mind has been trained to return to is where it goes when everything else falls away at death.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 8.5"
          speaker="Krishna"
          sanskrit="अन्तकाले च मामेव स्मरन्मुक्त्वा कलेवरम् । यः प्रयाति स मद्भावं याति नास्त्यत्र संशयः ॥"
          iast="anta-kāle ca mām eva smaran muktvā kalevaram | yaḥ prayāti sa mad-bhāvaṃ yāti nāsty atra saṃśayaḥ ||"
          essence="Whoever leaves the body remembering Krishna at the end reaches his state."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 8.6"
          speaker="Krishna"
          sanskrit="यं यं वापि स्मरन्भावं त्यजत्यन्ते कलेवरम् । तं तमेवैति कौन्तेय सदा तद्भावभावितः ॥"
          iast="yaṃ yaṃ vāpi smaran bhāvaṃ tyajaty ante kalevaram | taṃ tam evaiti kaunteya sadā tad-bhāva-bhāvitaḥ ||"
          meaning="Whatever state a person remembers as they leave the body, that state they reach, because the mind has long been shaped by it."
          insightLabel="The hinge phrase: sadā tad-bhāva-bhāvitaḥ"
          insight="&quot;Always shaped by that state.&quot; What one remembers at the end comes from what the mind has practised returning to, more than from a decision made in the moment."
          essence="Whatever one remembers on leaving the body, one goes to, having long been shaped by it."
        />

        <div className="pull-quote">
          <blockquote>
            "Whatever state one remembers on leaving the body, to that state one goes."
          </blockquote>
          <cite>Bhagavad Gita 8.6</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 8.7–8.8 · Practice
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="what-rehearsed">Remember Me, and Fight</h2>

        <p>
          After 8.6, Krishna draws the practical conclusion in 8.7: therefore remember me at all times, and fight. The verb is fight. Remembering Krishna goes on inside Arjuna&apos;s work, alongside it.
        </p>

        <p>
          Verse 8.8 says that a mind trained by practice (<em>abhyāsa-yoga</em>), straying nowhere else, reaches the supreme person. <em>Abhyāsa</em>, repetition, also appears in 6.35 and 12.9. So the useful question is what you practise every day, when no one is watching.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 8.8"
          speaker="Krishna"
          sanskrit="अभ्यासयोगयुक्तेन चेतसा नान्यगामिना । परमं पुरुषं दिव्यं याति पार्थानुचिन्तयन् ॥"
          iast="abhyāsa-yoga-yuktena cetasā nānya-gāminā | paramaṃ puruṣaṃ divyaṃ yāti pārthānucintayan ||"
          meaning="With a mind disciplined by the yoga of practice, not wandering anywhere else, the one who departs while remembering the supreme divine person reaches that supreme being, Partha."
          insightLabel="A mind trained by practice"
          insight="Abhyāsa-yoga-yuktena cetasā: by a mind joined to the yoga of practice. What the mind holds at the end has been built up from every earlier choice about where to put attention."
          essence="With a mind trained by practice and not straying, one reaches the supreme divine person."
        />

        <div className="highlight-box">
          <p>
            <strong>For a modern reader:</strong> Whatever you give your attention to most often is where the mind will tend to go at the end. Krishna presents this as information, and the remedy he gives is to remember him at all times (8.7).
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 8.14 · The Easy Reach
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="easy-reach">Krishna Is Easy to Reach</h2>

        <p>
          After the teaching on death, Krishna lightens the tone. For the one whose mind is wholly on him, who remembers him constantly, he is easy to reach. The Sanskrit word is <em>sulabhaḥ</em>, easy to obtain.
        </p>

        <p>
          The verse is a consolation. The remembrance described so far gets easier once it becomes a habit. The condition is continuity: the mind has to stay with Krishna constantly (satataṃ, nityaśaḥ).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 8.14"
          speaker="Krishna"
          sanskrit="अनन्यचेताः सततं यो मां स्मरति नित्यशः । तस्याहं सुलभः पार्थ नित्ययुक्तस्य योगिनः ॥"
          iast="ananya-cetāḥ satataṃ yo māṃ smarati nityaśaḥ | tasyāhaṃ sulabhaḥ pārtha nitya-yuktasya yoginaḥ ||"
          meaning="For the yogi whose mind is undivided, who remembers me constantly, always united with me, I am easy to reach, Partha."
          insightLabel="The word that turns the chapter"
          insight="Sulabhaḥ, easy. The verse asks for continuity of attention (ananya-cetāḥ, an undivided mind), and for that yogi Krishna says reaching him is easy."
          essence="For the yogi who remembers him constantly with undivided mind, Krishna is easy to reach."
        />

        <div className="pull-quote">
          <blockquote>
            "For the one whose mind is undivided and remembers me constantly, I am easy to reach."
          </blockquote>
          <cite>Bhagavad Gita 8.14</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 8.17–8.19 · Cosmic Time
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="cosmic-time">Brahma&apos;s Day and Brahma&apos;s Night</h2>

        <p>
          Halfway through Chapter 8 the scale changes. Krishna describes Brahma&apos;s day as a thousand <em>yuga</em>s long, and his night the same (8.17). At daybreak all beings come out of the unmanifest, and at nightfall they dissolve back into it (8.18).
        </p>

        <p>
          The passage is cosmology, and it also puts ordinary life in proportion, the way a night sky can. A deadline or an argument with a friend still matters, but beside a thousand yugas it is small.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 8.17"
          speaker="Krishna"
          sanskrit="सहस्रयुगपर्यन्तमहर्यद्ब्रह्मणो विदुः । रात्रिं युगसहस्रान्तां तेऽहोरात्रविदो जनाः ॥"
          iast="sahasra-yuga-paryantam ahar yad brahmaṇo viduḥ | rātriṃ yuga-sahasrāntāṃ te'ho-rātra-vido janāḥ ||"
          meaning="Those who know that Brahma's day lasts a thousand yugas, and his night lasts a thousand yugas, they know day and night as they are."
          insightLabel="The use of scale"
          insight="The verse asks only that you know this: those who know Brahma&apos;s day and night, it says, really know day and night. The scale sets a human life and its worries in a much larger frame."
          essence="Those who know Brahma&apos;s day and night, each a thousand yugas long, know day and night."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 8.21 · The Supreme Abode
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="beyond-return">The Path That Does Not Return</h2>

        <p>
          After the cosmology, Krishna names the destination. He calls it <em>akṣara</em>, the imperishable, and says those who reach it do not return: <em>yaṃ prāpya na nivartante</em>. Liberation here means the end of rebirth, as opposed to a better next life.
        </p>

        <p>
          Some modern readers find this troubling: doesn&apos;t &quot;not coming back&quot; mean losing everything? In the chapter, what ends is rebirth into &quot;this passing home of sorrow&quot; (8.15), and the place reached is Krishna&apos;s own abode.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 8.21"
          speaker="Krishna"
          sanskrit="अव्यक्तोऽक्षर इत्युक्तस्तमाहुः परमां गतिम् । यं प्राप्य न निवर्तन्ते तद्धाम परमं मम ॥"
          iast="avyakto'kṣara ity uktas tam āhuḥ paramāṃ gatim | yaṃ prāpya na nivartante tad dhāma paramaṃ mama ||"
          meaning="That which is called the unmanifest, the imperishable, they call it the supreme destination. Having reached it, beings do not return. That is my supreme abode."
          insightLabel="What completion means here"
          insight="The phrase tad dhāma paramaṃ mama, &quot;that is my supreme home&quot;, is personal. Krishna points to where he himself lives, so the destination is a relationship as much as a place."
          essence="That imperishable unmanifest is the highest goal, his home; those who reach it are free of return."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 8.28 · The Closing Word
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="two-paths">Beyond Merit: The Chapter's Final Word</h2>

        <p>
          Chapter 8 ends with a verse that puts the earlier talk of merit in its place. Krishna says: the yogi who knows the two paths (of light and of darkness, of returning and of not returning) <em>goes beyond all the fruits of Vedas, sacrifices, austerities, and gifts</em>. The yogi attains the primal supreme abode.
        </p>

        <p>
          Krishna has spent the chapter on practice and remembrance. At the end he says the yogi who understands this goes beyond the merit gained from Vedas, sacrifices, austerities and gifts. Practice still matters, but it isn&apos;t a way of piling up merit points.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 8.28"
          speaker="Krishna"
          sanskrit="वेदेषु यज्ञेषु तपःसु चैव दानेषु यत्पुण्यफलं प्रदिष्टम् । अत्येति तत्सर्वमिदं विदित्वा योगी परं स्थानमुपैति चाद्यम् ॥"
          iast="vedeṣu yajñeṣu tapaḥsu caiva dāneṣu yat puṇya-phalaṃ pradiṣṭam | atyeti tat sarvam idaṃ viditvā yogī paraṃ sthānam upaiti cādyam ||"
          meaning="Whatever merit is promised in the Vedas, in sacrifices, in austerities, and in gifts, the yogi who knows this transcends all of it, and reaches the primal supreme abode."
          insightLabel="Why the Gita undercuts merit at the end"
          insight="Merit is a useful frame for beginners, but at some point collecting it becomes another form of clinging. The yogi who has understood the two paths (8.27) no longer needs it, and the verse sets merit aside without dismissing it."
          essence="The yogi who knows this passes beyond the merit of Vedas, sacrifice, austerity and gifts, to the primal abode."
        />

        <div className="highlight-box">
          <p>
            <strong>How Chapter 8 ends:</strong> The last verse points away from merit. The yogi who has understood the chapter no longer needs the ladder of merit, because the end depends on what the mind has become.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 28 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>8.1</td><td>Arjuna</td><td>Arjuna asks what Brahman, adhyatma, karma, adhibhuta and adhidaiva are</td></tr>
            <tr><td>8.2</td><td>Arjuna</td><td>Arjuna asks who adhiyajna is, and how the self-controlled know Krishna at death</td></tr>
            <tr><td>8.3</td><td>Krishna</td><td>Brahman is the imperishable; adhyatma is one&apos;s own nature; karma is the creative act behind beings</td></tr>
            <tr><td>8.4</td><td>Krishna</td><td>Adhibhuta is perishable existence, adhidaiva the cosmic person; Krishna in the body is adhiyajna</td></tr>
            <tr><td>8.5</td><td>Krishna</td><td>Whoever leaves the body remembering Krishna at the end reaches his state</td></tr>
            <tr><td>8.6</td><td>Krishna</td><td>Whatever one remembers on leaving the body, one goes to, having long been shaped by it</td></tr>
            <tr><td>8.7</td><td>Krishna</td><td>So remember Krishna at all times and fight; mind fixed on him, you will reach him</td></tr>
            <tr><td>8.8</td><td>Krishna</td><td>With a mind trained by practice and not straying, one reaches the supreme divine person</td></tr>
            <tr><td>8.9</td><td>Krishna</td><td>Meditate on the all-knowing, ancient ruler, subtler than the subtle, bright as the sun</td></tr>
            <tr><td>8.10</td><td>Krishna</td><td>At death, with steady mind and devotion, breath fixed between the brows, one reaches him</td></tr>
            <tr><td>8.11</td><td>Krishna</td><td>Krishna will briefly describe the imperishable that ascetics free of passion enter</td></tr>
            <tr><td>8.12</td><td>Krishna</td><td>Closing the gates of the body, mind held in the heart, breath in the head, one holds to yoga</td></tr>
            <tr><td>8.13</td><td>Krishna</td><td>Saying Om and remembering Krishna as one leaves the body, one reaches the highest goal</td></tr>
            <tr><td>8.14</td><td>Krishna</td><td>For the yogi who remembers him constantly with undivided mind, Krishna is easy to reach</td></tr>
            <tr><td>8.15</td><td>Krishna</td><td>Great souls who reach Krishna are not reborn into this passing home of sorrow</td></tr>
            <tr><td>8.16</td><td>Krishna</td><td>Every world up to Brahma&apos;s returns to rebirth; one who reaches Krishna is not reborn</td></tr>
            <tr><td>8.17</td><td>Krishna</td><td>Those who know Brahma&apos;s day and night, each a thousand yugas long, know day and night</td></tr>
            <tr><td>8.18</td><td>Krishna</td><td>At Brahma&apos;s daybreak all things come from the unmanifest; at nightfall they dissolve into it</td></tr>
            <tr><td>8.19</td><td>Krishna</td><td>The same host of beings comes forth again and again, dissolving helplessly at nightfall</td></tr>
            <tr><td>8.20</td><td>Krishna</td><td>Beyond that unmanifest is another, eternal one that survives when all beings perish</td></tr>
            <tr><td>8.21</td><td>Krishna</td><td>That imperishable unmanifest is the highest goal, his home; those who reach it are free of return</td></tr>
            <tr><td>8.22</td><td>Krishna</td><td>That supreme person, in whom all beings dwell, is reached by undivided devotion</td></tr>
            <tr><td>8.23</td><td>Krishna</td><td>Krishna will describe the times of departure at which yogis return or do not return</td></tr>
            <tr><td>8.24</td><td>Krishna</td><td>Departing in fire, light, day, the bright fortnight and the northern half-year, knowers of Brahman go to Brahman</td></tr>
            <tr><td>8.25</td><td>Krishna</td><td>Departing in smoke, night, the dark fortnight and the southern half-year, the yogi reaches lunar light and returns</td></tr>
            <tr><td>8.26</td><td>Krishna</td><td>These two paths, light and dark, are eternal; by one there is no return, by the other one returns</td></tr>
            <tr><td>8.27</td><td>Krishna</td><td>Knowing these two paths, the yogi is free of delusion; so be steady in yoga at all times</td></tr>
            <tr><td>8.28</td><td>Krishna</td><td>The yogi who knows this passes beyond the merit of Vedas, sacrifice, austerity and gifts, to the primal abode</td></tr>
          </tbody>
        </table>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the opening questions (six terms plus the time of death, 8.1–2), the 8.6 pull quote, and the verse summaries in the table; copy edited.</p>
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-7" className="ch-nav-title">Chapter 7, Jnana Vijnana Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-9" className="ch-nav-title">Chapter 9, Raja Vidya Raja Guhya Yoga</a>
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
            <div className="faq-q">What is Bhagavad Gita Chapter 8 about?</div>
            <div className="faq-a">
              Chapter 8 (Akshara Brahma Yoga) is the Gita&apos;s chapter on death, and so also on how to live before it. Krishna answers Arjuna&apos;s questions about six terms and about the time of death (8.1–4), then teaches that the state of mind at the end of life comes from what the mind has practised. The chapter contains 8.6: whatever state a person remembers at the end is the state they reach. It also introduces Brahma's day and night, the imperishable destination from which one does not return, and the two paths after death.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 8.6 mean?</div>
            <div className="faq-a">
              Verse 8.6 says, 'Whatever state of being one remembers when leaving the body, that state one attains, because the mind has long been shaped by it.' The verse is about training. The mind at the end is the mind you have trained by what it has kept returning to in life (sadā tad-bhāva-bhāvitaḥ, always shaped by that state).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the meaning of antakale ca mam eva smaran?</div>
            <div className="faq-a">
              This is the opening phrase of verse 8.5, 'at the end, remembering me alone.' Krishna says one who departs while remembering him reaches his state. The next verse adds that what one remembers at the end depends on what the mind has long been shaped by, and 8.7 says to remember Krishna at all times. The teaching is about a lifetime of practice.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are Brahma's day and night in the Bhagavad Gita?</div>
            <div className="faq-a">
              In verses 8.17-19, Krishna describes Brahma's day as lasting a thousand yugas, and his night as lasting another thousand. At the start of Brahma's day, all beings emerge from the unmanifest. At nightfall, they dissolve back. In 8.19 Krishna says the same host of beings comes forth and dissolves again and again, and in 8.16 that even Brahma&apos;s world is subject to return.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the supreme abode (paramam dhama) in the Bhagavad Gita?</div>
            <div className="faq-a">
              Verse 8.21 calls the supreme abode the unmanifest, the imperishable, and says those who reach it are free of return. It is described as Krishna's own home (tad dhāma paramaṃ mama). The phrase refers to liberation from the cycle of rebirth. In 8.15 Krishna says those who reach him are not born again into this passing home of sorrow.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Is Chapter 8 saying we should only think of Bhagavan at death?</div>
            <div className="faq-a">
              Read carefully, no. Verse 8.7 says to remember Krishna at all times while doing your work, and 8.14 speaks of remembering him constantly. The state at death is the one the mind has been trained into over a lifetime.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about anxiety & death</div>
          </a>
          <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">How the 18 chapters fit together</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-7" className="related-card">
            <div className="related-card-label">Chapter 7</div>
            <div className="related-card-title">Jnana Vijnana Yoga: Knowledge and Realization</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-9" className="related-card">
            <div className="related-card-label">Chapter 9</div>
            <div className="related-card-title">Raja Vidya Raja Guhya Yoga, The Royal Secret</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-15" className="related-card">
            <div className="related-card-label">Chapter 15</div>
            <div className="related-card-title">Purushottama Yoga, Cut the Tree, Find the Source</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 8"} />

        </article>
      </div>

      {/* FOOTER */}
      <SiteFooter />

      <BlogTracker pageName="Bhagwat Geeta Chapter 8" />
    </>
  )
}
