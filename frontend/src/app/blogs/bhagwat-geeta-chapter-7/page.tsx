import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 7 Summary – Key Verses & Meaning (Jnana Vijnana Yoga)",
  description: "Bhagavad Gita Chapter 7 (Jnana Vijnana Yoga): 30 verses on knowledge and realization, the pearls-on-a-thread teaching, maya, and the four kinds of devotees.",
  keywords: "bhagwat geeta chapter 7, bhagavad gita jnana vijnana yoga, bhagwat geeta adhyay 7, pearls on a thread gita, four types of devotees gita, maya in bhagavad gita, vasudeva sarvam iti, jnana vs vijnana, Jnana Vijnana Yoga meaning, Bhagavad Gita 7.7 pearls on a thread, Bhagavad Gita 7.8 taste in water, Vasudeva sarvam iti meaning, four types of devotees Bhagavad Gita, what is maya in Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 7 Summary – Key Verses & Meaning (Jnana Vijnana Yoga)",
    description: "All 30 verses of Bhagavad Gita Chapter 7: pearls strung on a thread, four kinds of devotees, and the rare realization 'Vasudeva is everything.'",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter7.webp", width: 1200, height: 675, alt: "Krishna teaching Arjuna about the two natures, the visible and the imperishable. Chapter 7 of the Bhagavad Gita, Jnana Vijnana Yoga, opens the middle six chapters." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 7 Summary – Key Verses & Meaning (Jnana Vijnana Yoga)",
    description: "All 30 verses of Bhagavad Gita Chapter 7: pearls strung on a thread, four kinds of devotees, and the rare realization 'Vasudeva is everything.'",
    images: ["https://wisdomquotes.in/assets/chapter7.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7", languages: { 'x-default': 'https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7' } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-6", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8" },
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
        content: "अध्याय ७";
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
      .toc-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase;
        font-weight: 700; color: var(--gold); margin-bottom: 12px; }
      .toc-list { list-style: none; display: flex; flex-direction: column; gap: 7px; counter-reset: toc-counter; }
      .toc-list li { counter-increment: toc-counter; display: flex; align-items: baseline; gap: 10px; }
      .toc-list li::before { content: counter(toc-counter); font-family: "Inter", sans-serif;
        font-size: 10px; font-variant-numeric: tabular-nums; color: var(--text-dimmer); min-width: 14px; }
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
      .section-divider-label { font-size: 10px; letter-spacing: 0.18em; text-transform: uppercase;
        color: var(--text-dimmer); white-space: nowrap; font-weight: 600; }

      .highlight-box { background: rgba(200, 136, 30, 0.05); border: 1px solid var(--border);
        border-left: 3px solid var(--gold); border-radius: 0 10px 10px 0;
        padding: 20px 24px; margin: 28px 0; }
      .highlight-box p { font-size: 15px; line-height: 1.7; color: var(--text-dim); }
      .highlight-box strong { color: var(--gold-light); }

      .verse-table { width: 100%; border-collapse: collapse; font-size: 13.5px;
        margin: 28px 0 40px; border: 1px solid var(--border); border-radius: 10px; overflow: hidden; }
      .verse-table thead tr { background: rgba(200, 136, 30, 0.08); }
      .verse-table thead th { text-align: left; padding: 12px 16px; font-size: 9.5px;
        letter-spacing: 0.15em; text-transform: uppercase; color: var(--gold); font-weight: 700; }
      .verse-table tbody td { padding: 10px 16px; border-bottom: 1px solid var(--border);
        vertical-align: top; line-height: 1.55; color: var(--text-dim); }
      .verse-table tbody tr:last-child td { border-bottom: none; }
      .verse-table tbody tr:hover { background: var(--bg-card); }
      .verse-table td:first-child { font-size: 12px; color: var(--gold); font-weight: 600; white-space: nowrap; }

      .faq-section { background: var(--bg-card); border: 1px solid var(--border);
        border-top: 2px solid var(--gold); border-radius: 14px; overflow: hidden; margin: 48px 0; }
      .faq-header { padding: 28px 32px 20px; border-bottom: 1px solid var(--border); }
      .faq-header-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
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
      .related-reading-label { font-size: 10px; letter-spacing: 0.2em; text-transform: uppercase;
        color: var(--gold); font-weight: 700; margin-bottom: 6px; }
      .related-reading h2 { font-family: "Playfair Display", serif; font-size: 22px; font-weight: 700;
        color: var(--gold-light); line-height: 1.3; margin: 0 0 18px; }
      .related-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
      .related-card { display: block; background: var(--bg); border: 1px solid var(--border);
        border-radius: 10px; padding: 14px 18px; transition: border-color 0.15s, background 0.15s, transform 0.15s; }
      .related-card:hover { border-color: var(--gold); background: var(--bg-card-hover); transform: translateY(-2px); }
      .related-card-label { font-size: 10px; letter-spacing: 0.15em; text-transform: uppercase;
        color: var(--text-dimmer); font-weight: 600; margin-bottom: 4px; }
      .related-card-title { font-size: 14px; font-weight: 600; color: var(--text); line-height: 1.4; }

      .app-cta { background: linear-gradient(160deg, #2d0a0a 0%, #1a0606 100%);
        border: 1px solid rgba(200, 136, 30, 0.25); border-top: 3px solid var(--gold);
        border-radius: 20px; padding: 44px 48px 40px; margin: 48px 0 60px;
        text-align: center; position: relative; overflow: hidden; }
      .app-cta::before { content: "ज्ञान"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 7: Jnana Vijnana Yoga",
    "description": "Bhagavad Gita Chapter 7 — Jnana Vijnana Yoga. All 30 verses on knowledge and realization, the pearls-on-a-thread teaching, and the four kinds of devotees.",
    "alternativeHeadline": "Bhagavad Gita Chapter 7 (Jnana Vijnana Yoga) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter7.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7"
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
    "keywords": "bhagwat geeta chapter 7, bhagavad gita jnana vijnana yoga, bhagwat geeta adhyay 7, pearls on a thread gita, four types of devotees gita, maya in bhagavad gita, vasudeva sarvam iti, jnana vs vijnana, Jnana Vijnana Yoga meaning, Bhagavad Gita 7.7 pearls on a thread, Bhagavad Gita 7.8 taste in water, Vasudeva sarvam iti meaning, four types of devotees Bhagavad Gita, what is maya in Bhagavad Gita",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2470,
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
        "name": "Bhagavad Gita Chapter 7 — Jnana Vijnana Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 7 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 7, called Jnana Vijnana Yoga, begins the Gita's middle six chapters. Chapters 1–6 dealt mostly with Arjuna's own discipline. From Chapter 7 Krishna talks about his own nature: his lower and higher natures (7.4–5), his presence in everything (the pearls on a thread, 7.7), the four kinds of devotees (7.16–17), and the rare recognition vāsudevaḥ sarvam iti, Vasudeva is all this (7.19)."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'pearls on a thread' mean in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 7.7, Krishna says, 'All this is strung on me as pearls are strung on a thread.' The image says that every separate thing, object, person or event, is held together by Krishna the way pearls are held by a thread. The thread is hidden inside the pearls, and it is what makes them one necklace."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between jnana and vijnana?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jnana is knowledge: what you have read, heard or understood. Vijnana is realization: knowledge that has become part of how you see and live. In 7.2 Krishna promises Arjuna both, after which nothing more remains to be known."
        }
      },
      {
        "@type": "Question",
        "name": "Who are the four kinds of devotees mentioned in Chapter 7?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 7.16–17 name four kinds of devotees: the distressed (ārta), the one who wants to know (jijñāsu), the one who wants wealth (arthārthī), and the wise (jñānī). Krishna calls all four noble (7.18), but says the wise one, who wants nothing from him except him, is dearest."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'Vasudevah sarvam iti' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 7.19, Krishna says that after many lifetimes the wise one surrenders to him, recognising vāsudevaḥ sarvam iti — 'Vasudeva (the Divine) is everything.' Read with 7.7 and 7.12, the line says the world rests in Krishna and has its being from him. The Gita calls such a person rare, su-durlabhaḥ, and places the recognition at the end of many births."
        }
      },
      {
        "@type": "Question",
        "name": "Why does Krishna say the divine is hidden by maya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 7.25 says Krishna, veiled by his yoga-māyā, is not seen by everyone, and the deluded world doesn't know him as unborn and imperishable. In 7.13–14 the veil is the three gunas, and those who take refuge in him get past it."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.3",
    "text": "Among thousands of people, one may strive for perfection. Among those striving, perhaps one knows me in truth.",
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
      "name": "Bhagavad Gita, Chapter 7, Verse 3"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये । / यततामपि सिद्धानां कश्चिन्मां वेत्ति तत्त्वतः ॥",
      "manuṣyāṇāṃ sahasreṣu kaścid yatati siddhaye | / yatatām api siddhānāṃ kaścin māṃ vetti tattvataḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.3"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.7",
    "text": "There is nothing higher than me, Arjuna. All this is strung on me, as pearls are strung on a thread.",
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
      "name": "Bhagavad Gita, Chapter 7, Verse 7"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय । / मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥",
      "mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya | / mayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.7"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.8",
    "text": "I am the taste in water, Arjuna. I am the light in the moon and the sun. I am the sound of Om in every Veda, the sound in space, and the courage in human beings.",
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
      "name": "Bhagavad Gita, Chapter 7, Verse 8"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः । / प्रणवः सर्ववेदेषु शब्दः खे पौरुषं नृषु ॥",
      "raso'ham apsu kaunteya prabhāsmi śaśi-sūryayoḥ | / praṇavaḥ sarva-vedeṣu śabdaḥ khe pauruṣaṃ nṛṣu ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.8"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.17",
    "text": "Of these, the wise one — steady, single-pointed in devotion — is the best. For I am exceedingly dear to the wise one, and that one is dear to me.",
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
      "name": "Bhagavad Gita, Chapter 7, Verse 17"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "तेषां ज्ञानी नित्ययुक्त एकभक्तिर्विशिष्यते । / प्रियो हि ज्ञानिनोऽत्यर्थमहं स च मम प्रियः ॥",
      "teṣāṃ jñānī nitya-yukta eka-bhaktir viśiṣyate | / priyo hi jñānino'tyartham ahaṃ sa ca mama priyaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.17"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.19",
    "text": "After many lifetimes, the wise one surrenders to me, recognising — Vāsudeva is everything. Such a mahātmā, a great soul, is very rare.",
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
      "name": "Bhagavad Gita, Chapter 7, Verse 19"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते । / वासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥",
      "bahūnāṃ janmanām ante jñānavān māṃ prapadyate | / vāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7#verse-7.19"
  }
]

export default function ChapterPage7() {
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
          Bhagavad Gita Chapter 7
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 7 · 30 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 7 (Adhyay 7):<br />
            <em>Jnana Vijnana Yoga</em>
          </h1>
          <p className="article-subtitle">
            Krishna turns to his own nature: the world strung on him like pearls (7.7), the four kinds of devotees (7.16), and the difference between knowing and realizing.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">30 verses · Jnana Vijnana Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~12 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 7 of 18</span>
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
              src="/assets/chapter7.webp"
              alt="Krishna teaching Arjuna about the two natures, the visible and the imperishable. Chapter 7 of the Bhagavad Gita, Jnana Vijnana Yoga, opens the middle six chapters."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 7 begins the Gita&apos;s middle six chapters. Chapters 1–6 were mostly about Arjuna&apos;s own conduct: duty, renunciation, meditation. From Chapter 7 the question becomes <em>what is real</em>, and Krishna talks openly about his own nature. The chapter has thirty verses.
        </p>

        <p>
          The chapter&apos;s title, <em>Jnana Vijnana Yoga</em>, rests on a distinction that English blurs. <em>Jnana</em> is knowledge: what you can read, hear, memorise and argue for. <em>Vijnana</em> is realization: knowledge that has become part of how you see. Verse 7.3 says bluntly that of those who strive, very few arrive.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#two-natures">How rare real knowing is, 7.3</a></li>
            <li><a href="#pearls">Pearls strung on a thread: 7.7</a></li>
            <li><a href="#ordinary-sacred">Krishna in ordinary things: 7.8</a></li>
            <li><a href="#maya-refuge">Crossing maya by refuge: 7.14</a></li>
            <li><a href="#four-seekers">The four kinds of devotees: 7.16–18</a></li>
            <li><a href="#vasudeva">Vasudeva sarvam iti: 7.19</a></li>
            <li><a href="#veiled">Why Krishna stays veiled: 7.25</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 7.1–7.3 · How Few Arrive
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="two-natures">How Rare Real Knowing Is</h2>

        <p>
          Chapter 7 opens with Krishna setting expectations. He is about to teach Arjuna something few people reach. Verse 7.3 says: among thousands of people, one strives for perfection; among those who strive and succeed, perhaps one knows Krishna as he is.
        </p>

        <p>
          If your reading has piled up while your seeing has stayed the same, this verse names the gap. The remaining chapters of the Gita work on closing it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.3"
          speaker="Krishna"
          sanskrit="मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये । यततामपि सिद्धानां कश्चिन्मां वेत्ति तत्त्वतः ॥"
          iast="manuṣyāṇāṃ sahasreṣu kaścid yatati siddhaye | yatatām api siddhānāṃ kaścin māṃ vetti tattvataḥ ||"
          meaning="Among thousands of people, one may strive for perfection. Among those striving, perhaps one knows me in truth."
          insightLabel="What this verse does"
          insight="Krishna is setting expectations. Effort and arrival are far apart: people measure progress in books read and hours sat, while the verse measures it by knowing Krishna tattvataḥ, as he really is."
          essence="Among thousands, one strives for perfection; of those who succeed, perhaps one knows Krishna as he is."
        />

        <div className="highlight-box">
          <p>
            <strong>Reading 7.3 kindly:</strong> The verse can be a relief. Many people who have practised all their lives still seem unsettled, and the verse says that is the normal case.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 7.7 · Pearls on a Thread
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="pearls">Pearls Strung on a Thread</h2>

        <p>
          Verse 7.7 has a simple image. On a string of pearls, each pearl is separate and in its place, and what holds them in a line is a thread you can&apos;t see from outside. Without the thread the pearls scatter.
        </p>

        <p>
          Krishna says the world is built the same way. Each person, object and event is a pearl, and he is the thread. The thread is usually out of sight, but it holds the pearls together. The Gita asks you to keep the pearls and notice the thread.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.7"
          speaker="Krishna"
          sanskrit="मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय । मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥"
          iast="mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya | mayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva ||"
          meaning="There is nothing higher than me, Arjuna. All this is strung on me, as pearls are strung on a thread."
          insightLabel="Why the image helps"
          insight="&quot;Bhagavan is everywhere&quot; can sound abstract. This verse gives you a picture to hold. Each pearl stays distinct, and the thread runs through all of them. The thread doesn&apos;t change how a pearl looks; it decides whether the pearl belongs to the necklace."
          essence="Nothing is higher than Krishna; all this is strung on him like pearls on a thread."
        />

        <div className="pull-quote">
          <blockquote>
            "All this is strung on me, as pearls are strung on a thread."
          </blockquote>
          <cite>Bhagavad Gita 7.7</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 7.8 · The Sacred in the Ordinary
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="ordinary-sacred">Taste in Water, Light in the Sun: the Divine in Ordinary Things</h2>

        <p>
          Right after the pearls, Krishna gets specific about where the thread can be found. He says he is the taste in water, the light of the sun and moon, the sound in space, and the strength in human beings (7.8). The list has no temple or ritual object in it; it starts with ordinary things you taste, see and hear.
        </p>

        <p>
          So the sacred is close at hand, in the glass of water you drank this morning. Finding Krishna, on this verse, means paying closer attention to ordinary life without leaving it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.8"
          speaker="Krishna"
          sanskrit="रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः । प्रणवः सर्ववेदेषु शब्दः खे पौरुषं नृषु ॥"
          iast="raso'ham apsu kaunteya prabhāsmi śaśi-sūryayoḥ | praṇavaḥ sarva-vedeṣu śabdaḥ khe pauruṣaṃ nṛṣu ||"
          meaning="I am the taste in water, Arjuna. I am the light in the moon and the sun. I am the sound of Om in every Veda, the sound in space, and the courage in human beings."
          insightLabel="The ordinary as sacred"
          insight="The verse says &quot;I am&quot; the taste in water (raso &apos;ham apsu). Krishna is the essential quality of each thing he lists: the taste of water, the light of the sun, the strength of a man."
          essence="Krishna is the taste in water, the light of moon and sun, Om in the Vedas, strength in men."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 7.14 · The Way Through Illusion
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="maya-refuge">Maya, and Why You Cannot Think Your Way Out</h2>

        <p>
          Halfway through the chapter Krishna says: my divine māyā, made of the three qualities of nature, is hard to cross. Those who take refuge in me cross it (7.14).
        </p>

        <p>
          The verse names refuge as the way through. More reading, practice or discipline isn&apos;t on the list, which will bother anyone whose spiritual self-image rests on independence. The reasoning is that some confusion can&apos;t be cleared by your own effort, because the effort is happening inside the confusion.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.14"
          speaker="Krishna"
          sanskrit="दैवी ह्येषा गुणमयी मम माया दुरत्यया । मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥"
          iast="daivī hyeṣā guṇa-mayī mama māyā duratyayā | mām eva ye prapadyante māyām etāṃ taranti te ||"
          meaning="This divine māyā of mine, woven of the three qualities, is hard to cross. Only those who take refuge in me cross beyond it."
          insightLabel="Why refuge"
          insight="A confused mind trying to escape its confusion is still the confused mind. Refuge means admitting this and resting your weight on Krishna (mām eva ye prapadyante, &quot;those who take refuge in me alone&quot;)."
          essence="This divine maya made of the gunas is hard to cross; those who take refuge in Krishna cross it."
        />

        <div className="highlight-box">
          <p>
            <strong>If you have tried to think your way out of a loop:</strong> This verse speaks to that. At this level, Krishna says, more thinking won&apos;t help, and the way out is to put the weight down.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 7.16–7.17 · The Four Kinds of Devotees
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="four-seekers">The Four Kinds of Devotees, and Why Krishna Loves the Last One</h2>

        <p>
          In verses 7.16 and 7.17 Krishna says four kinds of people turn to him: the person in distress, the person who wants to understand, the person who wants wealth, and the wise person, the <em>jnani</em>, who wants nothing in particular and turns to Krishna for his own sake.
        </p>

        <p>
          All four are welcome; Krishna calls them all noble (udārāḥ, 7.18). Someone who prays in a crisis, someone who reads scripture because a question won&apos;t leave them, someone who asks for help with a job, none is turned away. But Krishna says the fourth, who wants nothing from him but him, is dearest. The first three want something through Krishna, and the fourth wants Krishna.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.16"
          speaker="Krishna"
          sanskrit="चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन । आर्तो जिज्ञासुरर्थार्थी ज्ञानी च भरतर्षभ ॥"
          iast="catur-vidhā bhajante māṃ janāḥ sukṛtino'rjuna | ārto jijñāsur arthārthī jñānī ca bharatarṣabha ||"
          meaning="Four kinds of good people turn toward me, Arjuna: the distressed, the one who wants knowledge, the one who wants wealth, and the wise one, best of the Bharatas."
          insightLabel="The door is open to all"
          insight="The verse asks for direction, without requiring a pure motive. The person who comes in pain and the person who comes from wisdom use different doors into the same house. Nobody has to become &quot;more spiritual&quot; before they can pray."
          essence="Four kinds of good people worship Krishna: the distressed, the curious, those wanting wealth, the wise."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 7.17"
          speaker="Krishna"
          sanskrit="तेषां ज्ञानी नित्ययुक्त एकभक्तिर्विशिष्यते । प्रियो हि ज्ञानिनोऽत्यर्थमहं स च मम प्रियः ॥"
          iast="teṣāṃ jñānī nitya-yukta eka-bhaktir viśiṣyate | priyo hi jñānino'tyartham ahaṃ sa ca mama priyaḥ ||"
          meaning="Of these, the wise one, steady, single-pointed in devotion, is the best. For I am exceedingly dear to the wise one, and that one is dear to me."
          insightLabel="A two-way bond"
          insight="The verse is symmetrical: Krishna is dear to the wise one, and the wise one is dear to Krishna. In 7.18 he goes further and calls the wise one his own self (ātmaiva)."
          essence="Of these the wise one, always steady and devoted to him alone, is best; they are dear to each other."
        />

        <div className="pull-quote">
          <blockquote>
            "I am dear to the wise one, and the wise one is dear to me."
          </blockquote>
          <cite>Bhagavad Gita 7.17</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 7.19 · Vasudeva Sarvam Iti
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="vasudeva">After Many Lifetimes: Vasudeva Is All</h2>

        <p>
          Verse 7.19 says: after many lifetimes, the wise one surrenders, recognising that <em>vāsudevaḥ sarvam iti</em>, Bhagavan is all this. That recognition, Krishna says, makes the person a mahātmā, a great soul, and very rare.
        </p>

        <p>
          The traditional reading takes &quot;many lifetimes&quot; literally. Some modern readers also take it as a description of how the recognition feels within one life, as if it came after a long road. Either way, what is recognised is stated plainly: <em>Bhagavan is all this</em>, here, in what is in front of you.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.19"
          speaker="Krishna"
          sanskrit="बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते । वासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥"
          iast="bahūnāṃ janmanām ante jñānavān māṃ prapadyate | vāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ ||"
          meaning="After many lifetimes, the wise one surrenders to me, recognising, Vāsudeva is everything. Such a mahātmā, a great soul, is very rare."
          insightLabel="The three words that matter"
          insight="Vāsudevaḥ sarvam iti: &quot;Vasudeva is all this.&quot; The grammar is a plain identity, with no &quot;in&quot; or &quot;behind&quot;. Krishna calls the person who sees this a mahātmā and very rare."
          essence="After many births the wise one takes refuge in Krishna, knowing Vasudeva is all; such a soul is rare."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 7.24–7.25 · The Veil
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="veiled">Why the Divine Stays Hidden in Plain Sight</h2>

        <p>
          Chapter 7 closes with a question: if Krishna runs through everything like a thread, why does almost no one see him? His answer is that the seeing is distorted. The veil is on the seer&apos;s side.
        </p>

        <p>
          If the problem is distorted seeing, the practice is to clear the seeing. Much of the rest of the Gita works on that through devotion, equanimity, service and trust.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 7.25"
          speaker="Krishna"
          sanskrit="नाहं प्रकाशः सर्वस्य योगमायासमावृतः । मूढोऽयं नाभिजानाति लोको मामजमव्ययम् ॥"
          iast="nāhaṃ prakāśaḥ sarvasya yoga-māyā-samāvṛtaḥ | mūḍho'yaṃ nābhijānāti loko mām ajam avyayam ||"
          meaning="Veiled by yoga-māyā, I am hidden from many. The deluded world does not recognise me as unborn and imperishable."
          insightLabel="The veil is on our side"
          insight="The veil, yoga-māyā, keeps Krishna from being seen by everyone. Since the problem lies in how we see, it can change, and the Gita spends much of its length training that seeing."
          essence="Veiled by his yoga-maya, Krishna is hidden from many; the deluded world fails to know him as unborn."
        />

        <div className="highlight-box">
          <p>
            <strong>How Chapter 7 sets up the rest of the Gita:</strong> From here the Gita works more on how you see than on adding information. The pearls have always been on a thread, and the remaining eleven chapters train you to notice it.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 30 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>7.1</td><td>Krishna</td><td>Krishna tells Arjuna how, mind fixed on him and practising yoga, he will know him fully</td></tr>
            <tr><td>7.2</td><td>Krishna</td><td>Krishna will teach knowledge with realization, after which nothing more remains to be known</td></tr>
            <tr><td>7.3</td><td>Krishna</td><td>Among thousands, one strives for perfection; of those who succeed, perhaps one knows Krishna as he is</td></tr>
            <tr><td>7.4</td><td>Krishna</td><td>Earth, water, fire, air, space, mind, intellect and ego form the eightfold lower nature of Krishna</td></tr>
            <tr><td>7.5</td><td>Krishna</td><td>Beyond this lower nature is his higher one, the life-principle (jiva) that sustains the world</td></tr>
            <tr><td>7.6</td><td>Krishna</td><td>All beings come from these two natures; Krishna is the origin and dissolution of the whole world</td></tr>
            <tr><td>7.7</td><td>Krishna</td><td>Nothing is higher than Krishna; all this is strung on him like pearls on a thread</td></tr>
            <tr><td>7.8</td><td>Krishna</td><td>Krishna is the taste in water, the light of moon and sun, Om in the Vedas, strength in men</td></tr>
            <tr><td>7.9</td><td>Krishna</td><td>He is the pure fragrance of earth, the heat in fire, the life in beings, the austerity of ascetics</td></tr>
            <tr><td>7.10</td><td>Krishna</td><td>Krishna is the eternal seed of all beings, the intelligence of the wise, the splendour of the splendid</td></tr>
            <tr><td>7.11</td><td>Krishna</td><td>He is the strength of the strong, free of craving, and desire that does not go against dharma</td></tr>
            <tr><td>7.12</td><td>Krishna</td><td>Sattva, rajas and tamas come from Krishna, but he is not in them; they are in him</td></tr>
            <tr><td>7.13</td><td>Krishna</td><td>Deluded by the three gunas, the world fails to know Krishna, who is beyond them and imperishable</td></tr>
            <tr><td>7.14</td><td>Krishna</td><td>This divine maya made of the gunas is hard to cross; those who take refuge in Krishna cross it</td></tr>
            <tr><td>7.15</td><td>Krishna</td><td>Evildoers and the deluded, their knowledge taken by maya, do not take refuge in him</td></tr>
            <tr><td>7.16</td><td>Krishna</td><td>Four kinds of good people worship Krishna: the distressed, the curious, those wanting wealth, the wise</td></tr>
            <tr><td>7.17</td><td>Krishna</td><td>Of these the wise one, always steady and devoted to him alone, is best; they are dear to each other</td></tr>
            <tr><td>7.18</td><td>Krishna</td><td>All four are noble, but Krishna regards the wise one as his own self</td></tr>
            <tr><td>7.19</td><td>Krishna</td><td>After many births the wise one takes refuge in Krishna, knowing Vasudeva is all; such a soul is rare</td></tr>
            <tr><td>7.20</td><td>Krishna</td><td>Those whose judgment is taken by desires turn to other gods and their rites, led by their nature</td></tr>
            <tr><td>7.21</td><td>Krishna</td><td>Whatever form a devotee wishes to worship with faith, Krishna makes that faith steady</td></tr>
            <tr><td>7.22</td><td>Krishna</td><td>Worshipping with that faith, he gets what he desires, though Krishna is the one who grants it</td></tr>
            <tr><td>7.23</td><td>Krishna</td><td>Such fruit is finite; worshippers of the gods go to the gods, and his devotees come to him</td></tr>
            <tr><td>7.24</td><td>Krishna</td><td>The unwise think the unmanifest Krishna has merely taken a form, not knowing his higher nature</td></tr>
            <tr><td>7.25</td><td>Krishna</td><td>Veiled by his yoga-maya, Krishna is hidden from many; the deluded world fails to know him as unborn</td></tr>
            <tr><td>7.26</td><td>Krishna</td><td>Krishna knows all beings past, present and future, but no one knows him</td></tr>
            <tr><td>7.27</td><td>Krishna</td><td>From birth all beings fall into delusion through the pairs of opposites born of desire and aversion</td></tr>
            <tr><td>7.28</td><td>Krishna</td><td>Those whose sin has ended, freed from that delusion, worship him with firm resolve</td></tr>
            <tr><td>7.29</td><td>Krishna</td><td>Those who take refuge in him to be free of old age and death come to know Brahman, the self and action</td></tr>
            <tr><td>7.30</td><td>Krishna</td><td>Those who know him with adhibhuta, adhidaiva and adhiyajna know him even at the time of death</td></tr>
          </tbody>
        </table>
        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected &quot;great atman&quot; to mahātmā (7.19), the description of Chapter 7 as opening the second half of the Gita (it opens the middle six chapters), and the verse summaries in the table; copy edited.</p>
        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-6" className="ch-nav-title">Chapter 6, Dhyana Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-8" className="ch-nav-title">Chapter 8, Akshara Brahma Yoga</a>
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
            <div className="faq-q">What is Bhagavad Gita Chapter 7 about?</div>
            <div className="faq-a">
              Chapter 7, called Jnana Vijnana Yoga, begins the Gita&apos;s middle six chapters. Chapters 1–6 dealt mostly with Arjuna&apos;s own discipline. From Chapter 7 Krishna talks about his own nature: his lower and higher natures (7.4–5), his presence in everything (the pearls on a thread, 7.7), the four kinds of devotees (7.16–17), and the rare recognition <em>vāsudevaḥ sarvam iti</em>, Vasudeva is all this (7.19).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'pearls on a thread' mean in the Bhagavad Gita?</div>
            <div className="faq-a">
              In verse 7.7, Krishna says, 'All this is strung on me as pearls are strung on a thread.' The image says that every separate thing, object, person or event, is held together by Krishna the way pearls are held by a thread. The thread is hidden inside the pearls, and it is what makes them one necklace.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the difference between jnana and vijnana?</div>
            <div className="faq-a">
              <em>Jnana</em> is knowledge: what you have read, heard or understood. <em>Vijnana</em> is realization: knowledge that has become part of how you see and live. In 7.2 Krishna promises Arjuna both, after which nothing more remains to be known.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Who are the four kinds of devotees mentioned in Chapter 7?</div>
            <div className="faq-a">
              Verses 7.16–17 name four kinds of devotees: the distressed (ārta), the one who wants to know (jijñāsu), the one who wants wealth (arthārthī), and the wise (jñānī). Krishna calls all four noble (7.18), but says the wise one, who wants nothing from him except him, is dearest.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'Vasudevah sarvam iti' mean?</div>
            <div className="faq-a">
              In verse 7.19, Krishna says that after many lifetimes the wise one surrenders to him, recognising <em>vāsudevaḥ sarvam iti</em>, 'Vasudeva (the Divine) is everything.' Read with 7.7 and 7.12, the line says the world rests in Krishna and has its being from him. The Gita calls such a person rare, <em>su-durlabhaḥ</em>, and places the recognition at the end of many births.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Why does Krishna say the divine is hidden by maya?</div>
            <div className="faq-a">
              Verse 7.25 says Krishna, veiled by his yoga-māyā, is not seen by everyone, and the deluded world doesn&apos;t know him as unborn and imperishable. In 7.13–14 the veil is the three gunas, and those who take refuge in him get past it.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-for-beginners" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Bhagavad Gita for beginners: where to start</div>
          </a>
          <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">How the Bhagavad Gita&apos;s 18 chapters fit together</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-8" className="related-card">
            <div className="related-card-label">Chapter 8</div>
            <div className="related-card-title">Akshara Brahma Yoga, What the Mind Has Practiced</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-9" className="related-card">
            <div className="related-card-label">Chapter 9</div>
            <div className="related-card-title">Raja Vidya Raja Guhya Yoga, The Royal Secret</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-10" className="related-card">
            <div className="related-card-label">Chapter 10</div>
            <div className="related-card-title">Vibhuti Yoga, Sparks of the Divine</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 7"} />

        </article>
      </div>

      {/* FOOTER */}
      <footer>
        <p>
          Wisdom © 2026. Part of a{' '}
          <a
            href={appStoreUrl('web_blog_footer')}
            target="_blank"
            rel="noopener"
            data-mp-location="footer"
          >free iPhone app</a>{' '}
          that tunes the Bhagavad Gita to your life, one verse a day.
        </p>
        <p style={{ marginTop: '8px' }}>
          <a href="/">wisdomquotes.in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:work.ankurshukla@gmail.com">Support</a>
        </p>
      </footer>

      <BlogTracker pageName="Bhagwat Geeta Chapter 7" />
    </>
  )
}
