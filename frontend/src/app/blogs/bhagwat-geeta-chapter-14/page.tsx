import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 14 Summary – Key Verses & Meaning (Three Gunas Yoga)",
  description: "Bhagavad Gita Chapter 14 (Gunatraya Vibhaga Yoga), 27 verses on the three gunas, sattva, rajas, tamas, and the gunatita state that lies beyond all three.",
  keywords: "bhagwat geeta chapter 14, bhagavad gita gunatraya vibhaga yoga, bhagwat geeta adhyay 14, three gunas explained, sattva rajas tamas, gunatita state, transcending gunas gita, psychology of mood gita, three gunas Bhagavad Gita explained, sattva rajas tamas meaning, Gunatraya Vibhaga Yoga summary, Bhagavad Gita 14.5 sattvam rajas tama, Bhagavad Gita 14.26 transcending gunas, what is gunatita state",
  openGraph: {
    title: "Bhagavad Gita Chapter 14 Summary – Key Verses & Meaning (Three Gunas Yoga)",
    description: "Bhagavad Gita Chapter 14, the three gunas, sattva, rajas and tamas, and the state beyond all three.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter14.webp", width: 1200, height: 675, alt: "Three streams of inner weather, clarity, restlessness, and dullness, flowing through one steady awareness. Chapter 14 of the Bhagavad Gita, Gunatraya Vibhaga Yoga, names the three forces shaping every mood." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 14 Summary – Key Verses & Meaning (Three Gunas Yoga)",
    description: "Bhagavad Gita Chapter 14, the three gunas, sattva, rajas and tamas, and the state beyond all three.",
    images: ["https://wisdomquotes.in/assets/chapter14.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14", languages: { 'x-default': 'https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14' } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15" },
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
        content: "अध्याय १४";
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
      .app-cta::before { content: "गुण"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 14 — Gunatraya Vibhaga Yoga: The Three Forces of Inner Weather",
    "description": "Bhagavad Gita Chapter 14 — Gunatraya Vibhaga Yoga. All 27 verses on the three gunas (sattva, rajas, tamas) and the state beyond them.",
    "alternativeHeadline": "Bhagavad Gita Chapter 14 (Three Gunas) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter14.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14"
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
    "keywords": "bhagwat geeta chapter 14, bhagavad gita gunatraya vibhaga yoga, bhagwat geeta adhyay 14, three gunas explained, sattva rajas tamas, gunatita state, transcending gunas gita, psychology of mood gita, three gunas Bhagavad Gita explained, sattva rajas tamas meaning, Gunatraya Vibhaga Yoga summary, Bhagavad Gita 14.5 sattvam rajas tama, Bhagavad Gita 14.26 transcending gunas, what is gunatita state",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2652,
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
        "name": "Bhagavad Gita Chapter 14 — Gunatraya Vibhaga Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 14 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 14, called Gunatraya Vibhaga Yoga (the Yoga of the Three Gunas), is the Gita's account of mood and inner state. Krishna explains that all of nature is composed of three forces — sattva (clarity), rajas (passion), and tamas (dullness) — and that each of these binds the inner self through identification. The chapter gives the signs of each, describes the person who has gone beyond all three (guṇātīta), and names unwavering devotion as the way through."
        }
      },
      {
        "@type": "Question",
        "name": "What are sattva, rajas, and tamas in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The three gunas are the three forces of nature that compose all inner experience. Sattva is clarity, lightness, understanding — it binds through attachment to happiness and knowledge. Rajas is passion, craving, restlessness — it binds through attachment to action. Tamas is dullness, ignorance, inertia — it binds through heedlessness, laziness, and sleep. Sattva ranks highest of the three (14.6, 14.17–18), but even sattva binds when grasped, and the goal is to go beyond all three."
        }
      },
      {
        "@type": "Question",
        "name": "How can I tell which guna is active in me?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 14.11-13 give the signs. Sattva: clarity in every sense, lightness, ease of understanding. Rajas: restlessness, many projects, much wanting, no settling. Tamas: fog, drowsiness, the inability to start. Verse 14.17 sums them up: sattva produces knowledge; rajas produces greed; tamas produces negligence and delusion. You can read your day backwards from the outputs."
        }
      },
      {
        "@type": "Question",
        "name": "What is gunatita in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Guṇātīta means 'beyond the gunas.' Verses 14.22-25 describe this state. The person beyond the gunas does not hate light, activity, or confusion when they arise; does not long for them when they pass. They remain equal in pleasure and pain, in praise and blame, in gain and loss. The gunas still appear in their experience. What has dropped is the reactive identification with them."
        }
      },
      {
        "@type": "Question",
        "name": "Why does Krishna say even sattva binds?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 14.6 makes a point that is easy to miss. Sattva, being pure and luminous, binds through attachment to happiness and to knowledge. This is the trap of the spiritually advancing person — you become clearer, you start to crave the clarity, the craving is itself binding. Sattva is the highest of the three, but the goal the Gita sets is freedom from capture by any state, sattva included."
        }
      },
      {
        "@type": "Question",
        "name": "How does one go beyond the three gunas?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 14.26, Krishna says: 'The one who serves me with unwavering devotion goes beyond these gunas and becomes fit for union with Brahman.' The bridge is bhakti-yoga — unwavering devotion. Devotion, rather than analysis, gives the mind a centre outside the field of the gunas. When attention rests there, the gunas continue to come and go, but the centre of identification has shifted. The states still arise; the capture by them has dropped."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.5",
    "text": "Sattva, rajas, and tamas — the three qualities born of nature — bind the imperishable self to the body, Arjuna.",
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
      "name": "Bhagavad Gita, Chapter 14, Verse 5"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः । / निबध्नन्ति महाबाहो देहे देहिनमव्ययम् ॥",
      "sattvaṃ rajas tama iti guṇāḥ prakṛti-sambhavāḥ | / nibadhnanti mahā-bāho dehe dehinam avyayam ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.5"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.11",
    "text": "When light and clear understanding arise in every gate of this body, know that sattva has grown strong.",
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
      "name": "Bhagavad Gita, Chapter 14, Verse 11"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "सर्वद्वारेषु देहेऽस्मिन्प्रकाश उपजायते । / ज्ञानं यदा तदा विद्याद्विवृद्धं सत्त्वमित्युत ॥",
      "sarva-dvāreṣu dehe'smin prakāśa upajāyate | / jñānaṃ yadā tadā vidyād vivṛddhaṃ sattvam ity uta ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.11"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.17",
    "text": "From sattva comes knowledge; from rajas, greed; from tamas, heedlessness, delusion, and ignorance.",
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
      "name": "Bhagavad Gita, Chapter 14, Verse 17"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "सत्त्वात्सञ्जायते ज्ञानं रजसो लोभ एव च । / प्रमादमोहौ तमसो भवतोऽज्ञानमेव च ॥",
      "sattvāt sañjāyate jñānaṃ rajaso lobha eva ca | / pramāda-mohau tamaso bhavato'jñānam eva ca ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.17"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.22",
    "text": "The Blessed One said: light, activity, and confusion — when they arise, the one beyond the gunas does not hate them; when they pass, does not long for them.",
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
      "name": "Bhagavad Gita, Chapter 14, Verse 22"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रीभगवानुवाच / प्रकाशं च प्रवृत्तिं च मोहमेव च पाण्डव । / न द्वेष्टि सम्प्रवृत्तानि न निवृत्तानि काङ्क्षति ॥",
      "śrī bhagavān uvāca | / prakāśaṃ ca pravṛttiṃ ca moham eva ca pāṇḍava | / na dveṣṭi sampravṛttāni na nivṛttāni kāṅkṣati ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.22"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.24",
    "text": "Equal in pleasure and pain, self-settled, equal to a clod of earth, a stone, and gold; equal in liked and disliked; steady; equal in blame and in praise of himself.",
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
      "name": "Bhagavad Gita, Chapter 14, Verse 24"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "समदुःखसुखः स्वस्थः समलोष्टाश्मकाञ्चनः । / तुल्यप्रियाप्रियो धीरस्तुल्यनिन्दात्मसंस्तुतिः ॥",
      "sama-duḥkha-sukhaḥ svasthaḥ sama-loṣṭāśma-kāñcanaḥ | / tulya-priyāpriyo dhīras tulya-nindātma-saṃstutiḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.24"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.26",
    "text": "The one who serves me with unwavering devotion goes beyond these gunas and becomes fit for union with Brahman.",
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
      "name": "Bhagavad Gita, Chapter 14, Verse 26"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मां च योऽव्यभिचारेण भक्ितयोगेन सेवते । / स गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते ॥",
      "māṃ ca yo'vyabhicāreṇa bhakti-yogena sevate | / sa guṇān samatītyaitān brahma-bhūyāya kalpate ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14#verse-14.26"
  }
]

export default function ChapterPage14() {
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
          Bhagavad Gita Chapter 14
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 14 · 27 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 14 (Adhyay 14):<br />
            <em>Gunatraya Vibhaga Yoga</em>
          </h1>
          <p className="article-subtitle">
            Why some days are clear, some restless, and some you cannot get off the couch. Krishna names three forces, sattva, rajas and tamas, and describes a steadiness that sees all three without being ruled by any.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">27 verses · Gunatraya Vibhaga Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~12 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 14 of 18</span>
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
              src="/assets/chapter14.webp"
              alt="Three streams of inner weather — clarity, restlessness, and dullness — flowing through one steady awareness. Chapter 14 of the Bhagavad Gita, Gunatraya Vibhaga Yoga, names the three forces shaping every mood."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          After Chapter 13 separated the knower from the field, Chapter 14 turns to the field itself and asks the next question: what is the field made of? Krishna&apos;s answer is the doctrine of the three <em>guṇas</em>, which runs through Sankhya, Yoga and Ayurveda as well. <em>Sattva</em>: clarity, lightness, the felt sense of inner brightness. <em>Rajas</em>: passion, restlessness, the engine of wanting and doing. <em>Tamas</em>: dullness, inertia, the heaviness that pulls you under.
        </p>

        <p>
          The doctrine is useful partly because all three bind. Sattva ranks highest, but each force has a function and each holds you in its own way. The chapter's project is to name them clearly enough that you can recognize which one is operating in you, in any given moment, without confusing the force with yourself. Near the end, Krishna describes the state called <em>guṇātīta</em>, beyond the gunas: the person in it still has feelings, and is no longer captured by whichever one is present.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#three-forces">The three forces, 14.5</a></li>
            <li><a href="#sattva-binds">Even clarity can bind, 14.6</a></li>
            <li><a href="#rajas-binds">How restlessness chains you, 14.7</a></li>
            <li><a href="#tamas-binds">The pull of dullness, 14.8</a></li>
            <li><a href="#signs">How to tell which guna is operating</a></li>
            <li><a href="#beyond">Going beyond the three, 14.22 to 14.25</a></li>
            <li><a href="#devotion-transcends">The bridge across, 14.26</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 14.5 · The Three Forces
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="three-forces">Sattva, Rajas, Tamas, the Three Forces of Inner Life</h2>

        <p>
          Verse 14.5 introduces the framework. Sattva, rajas, and tamas (three qualities arising from <em>prakṛti</em>, nature) bind the imperishable inner self to the body. Each is a different way the field holds the knower, and each works by identification: you feel clear and take yourself to be the clarity; you feel driven and take yourself to be the drive. The chapter trains you out of that habit.
        </p>

        <p>
          The Gita does rank the three. Sattva is the highest: it is pure and luminous (14.6), its fruit is knowledge (14.17), and those established in it rise (14.18). But Krishna warns in the same breath that sattva binds too, and the chapter&apos;s goal is to go beyond all three, including the most pleasant one.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 14.5"
          speaker="Krishna"
          sanskrit="सत्त्वं रजस्तम इति गुणाः प्रकृतिसम्भवाः । निबध्नन्ति महाबाहो देहे देहिनमव्ययम् ॥"
          iast="sattvaṃ rajas tama iti guṇāḥ prakṛti-sambhavāḥ | nibadhnanti mahā-bāho dehe dehinam avyayam ||"
          essence="Sattva, rajas and tamas, born of nature, bind the imperishable embodied self to the body."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 14.6 · The Trap of Sattva
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="sattva-binds">Even Clarity Binds</h2>

        <p>
          Verse 14.6 is easy to miss. Krishna says sattva, clarity, binds through attachment to happiness and to knowledge. The warning is aimed at someone making progress: you meditate, become clearer, feel lighter, and then start to crave that clarity. The craving is rajas dressed up as sattva.
        </p>

        <p>
          A pleasant state can turn into a project: you plan your days around producing more of it, and the producing becomes its own worry. The state was real; the grasping is what binds. The same applies to knowledge. You learn something true and start defining yourself by knowing it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 14.6"
          speaker="Krishna"
          sanskrit="तत्र सत्त्वं निर्मलत्वात्प्रकाशकमनामयम् । सुखसङ्गेन बध्नाति ज्ञानसङ्गेन चानघ ॥"
          iast="tatra sattvaṃ nirmalatvāt prakāśakam anāmayam | sukha-saṅgena badhnāti jñāna-saṅgena cānagha ||"
          essence="Sattva, pure and luminous, binds through attachment to happiness and to knowledge."
        />

        <div className="pull-quote">
          <blockquote>
            "Even sattva binds, through attachment to happiness, and through attachment to knowledge."
          </blockquote>
          <cite>Bhagavad Gita 14.6</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 14.7 · The Trap of Rajas
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="rajas-binds">How Restlessness Chains You</h2>

        <p>
          Verse 14.7 names rajas with precision: born of craving and attachment, it binds through attachment to action. Much of modern working life runs on rajas: it keeps you moving and rarely lets you ask whether the motion is what you want.
        </p>

        <p>
          What is hard about rajas is that it looks productive. Sattva looks calm; tamas looks lazy; rajas looks like getting things done. From outside, a rajasic life can look like a successful one. The Gita&apos;s point is that the craving is doing the driving. Stopping is not its answer, since the Gita is for action; its answer is to act while seeing that the gunas are the ones moving (14.19).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 14.7"
          speaker="Krishna"
          sanskrit="रजो रागात्मकं विद्धि तृष्णासङ्गसमुद्भवम् । तन्निबध्नाति कौन्तेय कर्मसङ्गेन देहिनम् ॥"
          iast="rajo rāgātmakaṃ viddhi tṛṣṇā-saṅga-samudbhavam | tan nibadhnāti kaunteya karma-saṅgena dehinam ||"
          essence="Rajas, born of craving and attachment, binds the embodied self through attachment to action."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 14.8 · The Trap of Tamas
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="tamas-binds">The Pull of Heaviness</h2>

        <p>
          Verse 14.8 names tamas with equal precision: born of ignorance, it deludes all embodied beings, binding them through heedlessness, laziness, and sleep. The three forms, <em>pramāda</em>, <em>ālasya</em> and <em>nidrā</em>, are gentle rather than dramatic. Heedlessness: the slow drift of not paying attention. Laziness: the comfortable refusal to make the necessary move. Sleep: both literal and the metaphorical sleep of going through life without questioning it.
        </p>

        <p>
          Tamas does not announce itself. It feels like rest, or like &quot;I&apos;ll start tomorrow.&quot; It pulls so softly that you go along with it. Each time you postpone a necessary conversation in favour of comfort, that is tamas at work, and naming it is the first step in stopping it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 14.8"
          speaker="Krishna"
          sanskrit="तमस्त्वज्ञानजं विद्धि मोहनं सर्वदेहिनाम् । प्रमादालस्यनिद्राभिस्तन्निबध्नाति भारत ॥"
          iast="tamas tv ajñāna-jaṃ viddhi mohanaṃ sarva-dehinām | pramādālasya-nidrābhis tan nibadhnāti bhārata ||"
          meaning="Know tamas as born of ignorance, deluding all embodied beings. It binds them through heedlessness, laziness, and sleep, Arjuna."
          insightLabel="Three gentle traps"
          insight="Heedlessness, laziness and sleep each feel like a small kindness to yourself rather than a fall. Added up over years, they are how a life drifts."
          essence="Tamas, born of ignorance, deludes embodied beings and binds through heedlessness, laziness and sleep."
        />

        <div className="highlight-box">
          <p>
            <strong>A working diagnostic from Chapter 14:</strong> Three times today, ask: what is operating in me right now? If everything looks clear and I am grasping it, that is sattva turning sticky. If I am driven and restless, rajas. If I am drifting, postponing, sleepy without being tired, tamas. Naming it is half the work.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 14.11–14.17 · The Signs
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="signs">How to Tell Which Guna Is Operating</h2>

        <p>
          Verses 14.11 through 14.17 give the signs of each guna. Sattva shows up as inner light, clarity in every sense, openness, understanding. Rajas shows up as restless activity, many projects, much wanting, no settling. Tamas shows up as fog, confusion, drowsiness, the inability to start. The list is practical: it lets you tell, in a given hour, which force is strongest.
        </p>

        <p>
          Verse 14.17 sums up the signs: from sattva comes knowledge; from rajas, greed; from tamas, negligence and delusion. Each force produces its characteristic outputs. Once you know the outputs, you can read backwards from your day. A day of clear seeing points to sattva; a day of wanting and rushing, to rajas; a day where nothing got done and nothing felt important, to tamas.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 14.11"
          speaker="Krishna"
          sanskrit="सर्वद्वारेषु देहेऽस्मिन्प्रकाश उपजायते । ज्ञानं यदा तदा विद्याद्विवृद्धं सत्त्वमित्युत ॥"
          iast="sarva-dvāreṣu dehe'smin prakāśa upajāyate | jñānaṃ yadā tadā vidyād vivṛddhaṃ sattvam ity uta ||"
          meaning="When light and clear understanding arise in every gate of this body, know that sattva has grown strong."
          insightLabel="What sattva feels like"
          insight="Sattva feels like clear-eyed availability more than a spiritual high. Decisions come easier, and things that would have upset you yesterday land and pass. When you notice it, treat it as a passing state, and enjoy it without gripping it."
          essence="When light and understanding shine through every gate of the body, sattva has grown strong."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 14.17"
          speaker="Krishna"
          sanskrit="सत्त्वात्सञ्जायते ज्ञानं रजसो लोभ एव च । प्रमादमोहौ तमसो भवतोऽज्ञानमेव च ॥"
          iast="sattvāt sañjāyate jñānaṃ rajaso lobha eva ca | pramāda-mohau tamaso bhavato'jñānam eva ca ||"
          meaning="From sattva comes knowledge; from rajas, greed; from tamas, heedlessness, delusion, and ignorance."
          insightLabel="Read your day backwards"
          insight="If today produced clarity, sattva was strong. If today produced grasping and overwork, rajas led. If today produced fog and avoidance, tamas held the floor. You can read the inner state from what the day produced."
          essence="From sattva comes knowledge, from rajas greed, from tamas heedlessness, delusion and ignorance."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 14.22–14.25 · Beyond the Three
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="beyond">Going Beyond the Three: What Gunatita Looks Like</h2>

        <p>
          In 14.21 Arjuna asks the obvious question: what marks the person who has gone beyond the three gunas, and how do they behave? Krishna answers in verses 14.22 through 14.25. The <em>guṇātīta</em> (the one beyond the gunas) does not hate light, activity or confusion when they appear, and does not crave them when they go. Such a person sits as if indifferent, unmoved, knowing that only the gunas are moving (14.23).
        </p>

        <p>
          The portrait never says the gunas stop appearing. The person still has clear, restless and dull hours; what has dropped is the reaction to their coming and going. You can have a tamasic afternoon without being defeated by it, and a sattvic morning without chasing it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 14.22"
          speaker="Krishna"
          sanskrit="श्रीभगवानुवाच प्रकाशं च प्रवृत्तिं च मोहमेव च पाण्डव । न द्वेष्टि सम्प्रवृत्तानि न निवृत्तानि काङ्क्षति ॥"
          iast="śrī bhagavān uvāca | prakāśaṃ ca pravṛttiṃ ca moham eva ca pāṇḍava | na dveṣṭi sampravṛttāni na nivṛttāni kāṅkṣati ||"
          meaning="The Blessed One said: light, activity, and confusion, when they arise, the one beyond the gunas does not hate them; when they pass, does not long for them."
          insightLabel="The two halves of the portrait"
          insight="Na dveṣṭi … na kāṅkṣati: does not hate, does not long for. The portrait is built on these two negations: the states arise and you do not push them away; they pass and you do not chase them. Beyond, here, means no longer captured by any of the three."
          essence="Such a person does not hate light, activity or delusion when present, nor long for them when gone."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 14.24"
          speaker="Krishna"
          sanskrit="समदुःखसुखः स्वस्थः समलोष्टाश्मकाञ्चनः । तुल्यप्रियाप्रियो धीरस्तुल्यनिन्दात्मसंस्तुतिः ॥"
          iast="sama-duḥkha-sukhaḥ svasthaḥ sama-loṣṭāśma-kāñcanaḥ | tulya-priyāpriyo dhīras tulya-nindātma-saṃstutiḥ ||"
          meaning="Equal in pleasure and pain, self-settled, equal to a clod of earth, a stone, and gold; equal in liked and disliked; steady; equal in blame and in praise of himself."
          insightLabel="An outward test"
          insight="The Gita gives you an external check. Watch how a person reacts to praise and to blame. Watch how they handle gain and loss. If they stay equally steady across both, they have moved beyond reactive attachment to the gunas. The test looks at behaviour, not beliefs. Few people pass it, but the direction is recognisable."
          essence="Even in pain and pleasure, self-settled, clod, stone and gold alike, steady in blame and praise."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 14.26 · The Bridge
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="devotion-transcends">How You Cross: Unwavering Devotion</h2>

        <p>
          Verse 14.26 answers the last part of Arjuna&apos;s question, how one goes beyond the three gunas. Krishna answers: by serving me with unwavering devotion. The one who does this, he says, transcends the gunas and becomes fit for union with the supreme reality.
        </p>

        <p>
          Why devotion? Because devotion gives the mind something to rest on that is outside the gunas. The gunas operate on what is inside the field, clarity, restlessness, dullness, but devotion is directed toward what is outside the field altogether. When attention rests on the Divine, the gunas keep coming and going, but you no longer identify with them. The chapter has just analysed the gunas at length, and still names devotion as the way through.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 14.26"
          speaker="Krishna"
          sanskrit="मां च योऽव्यभिचारेण भक्ितयोगेन सेवते । स गुणान्समतीत्यैतान्ब्रह्मभूयाय कल्पते ॥"
          iast="māṃ ca yo'vyabhicāreṇa bhakti-yogena sevate | sa guṇān samatītyaitān brahma-bhūyāya kalpate ||"
          meaning="The one who serves me with unwavering devotion goes beyond these gunas and becomes fit for union with Brahman."
          insightLabel="Why analysis is not enough"
          insight="You can study the gunas for years and still be captured by them. The verse names devotion that does not waver (avyabhicāreṇa) as the way out, and the word for unwavering carries weight: it is steady attention that does the work."
          essence="Whoever serves me with unwavering devotion goes beyond the gunas and is fit to become Brahman."
        />

        <div className="pull-quote">
          <blockquote>
            "The one who serves me with unwavering devotion goes beyond these forces and becomes fit for union."
          </blockquote>
          <cite>Bhagavad Gita 14.26</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 27 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>14.1</td><td>Krishna</td><td>I will teach again the highest knowledge, by which the sages reached perfection</td></tr>
            <tr><td>14.2</td><td>Krishna</td><td>Those who take refuge in it share my nature; they are not born at creation or shaken at dissolution</td></tr>
            <tr><td>14.3</td><td>Krishna</td><td>Great Brahman is my womb; I place the seed in it, and from it all beings are born</td></tr>
            <tr><td>14.4</td><td>Krishna</td><td>Whatever forms are born in any womb, Brahman is their great womb and I the father who gives the seed</td></tr>
            <tr><td>14.5</td><td>Krishna</td><td>Sattva, rajas and tamas, born of nature, bind the imperishable embodied self to the body</td></tr>
            <tr><td>14.6</td><td>Krishna</td><td>Sattva, pure and luminous, binds through attachment to happiness and to knowledge</td></tr>
            <tr><td>14.7</td><td>Krishna</td><td>Rajas, born of craving and attachment, binds the embodied self through attachment to action</td></tr>
            <tr><td>14.8</td><td>Krishna</td><td>Tamas, born of ignorance, deludes embodied beings and binds through heedlessness, laziness and sleep</td></tr>
            <tr><td>14.9</td><td>Krishna</td><td>Sattva attaches you to happiness, rajas to action; tamas veils knowledge and attaches you to heedlessness</td></tr>
            <tr><td>14.10</td><td>Krishna</td><td>Each guna rises by overpowering the other two: sattva over rajas and tamas, and so on</td></tr>
            <tr><td>14.11</td><td>Krishna</td><td>When light and understanding shine through every gate of the body, sattva has grown strong</td></tr>
            <tr><td>14.12</td><td>Krishna</td><td>Greed, busyness, new undertakings, restlessness and craving arise when rajas grows strong</td></tr>
            <tr><td>14.13</td><td>Krishna</td><td>Darkness, inertia, heedlessness and delusion arise when tamas grows strong</td></tr>
            <tr><td>14.14</td><td>Krishna</td><td>Dying when sattva prevails, one goes to the pure worlds of those who know the highest</td></tr>
            <tr><td>14.15</td><td>Krishna</td><td>Dying in rajas, one is born among those attached to action; dying in tamas, among the deluded</td></tr>
            <tr><td>14.16</td><td>Krishna</td><td>The fruit of good action is pure and sattvic; the fruit of rajas is pain, of tamas ignorance</td></tr>
            <tr><td>14.17</td><td>Krishna</td><td>From sattva comes knowledge, from rajas greed, from tamas heedlessness, delusion and ignorance</td></tr>
            <tr><td>14.18</td><td>Krishna</td><td>Those in sattva rise, those in rajas stay in the middle, those in tamas sink</td></tr>
            <tr><td>14.19</td><td>Krishna</td><td>When the seer sees no doer but the gunas and knows what is beyond them, he reaches my being</td></tr>
            <tr><td>14.20</td><td>Krishna</td><td>Going beyond the three gunas, the embodied one is freed from birth, death, old age and sorrow</td></tr>
            <tr><td>14.21</td><td>Arjuna</td><td>What marks the one beyond the three gunas, how do they live, and how do they go beyond them?</td></tr>
            <tr><td>14.22</td><td>Krishna</td><td>Such a person does not hate light, activity or delusion when present, nor long for them when gone</td></tr>
            <tr><td>14.23</td><td>Krishna</td><td>Sitting as if indifferent, unshaken by the gunas, knowing that only the gunas move, they stay steady</td></tr>
            <tr><td>14.24</td><td>Krishna</td><td>Even in pain and pleasure, self-settled, clod, stone and gold alike, steady in blame and praise</td></tr>
            <tr><td>14.25</td><td>Krishna</td><td>Alike in honour and dishonour, to friend and foe, dropping self-started projects: beyond the gunas</td></tr>
            <tr><td>14.26</td><td>Krishna</td><td>Whoever serves me with unwavering devotion goes beyond the gunas and is fit to become Brahman</td></tr>
            <tr><td>14.27</td><td>Krishna</td><td>For I am the ground of Brahman, of the undying, of eternal dharma and of absolute happiness</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-13" className="ch-nav-title">Chapter 13, Kshetra Kshetrajna Vibhaga Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-15" className="ch-nav-title">Chapter 15, Purushottama Yoga</a>
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


        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the claim that the Gita ranks no guna above another (it ranks sattva highest, 14.6 and 14.17–18, while asking you to go beyond all three) and the translation of 14.24 (praise of oneself, not self-praise); copy edited.</p>

        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 14 about?</div>
            <div className="faq-a">
              Chapter 14, called Gunatraya Vibhaga Yoga (the Yoga of the Three Gunas), is the Gita's account of mood and inner state. Krishna explains that all of nature is composed of three forces (<em>sattva</em>, clarity; <em>rajas</em>, passion; <em>tamas</em>, dullness) and that each of these binds the inner self through identification. The chapter gives the signs of each, describes the person who has gone beyond all three (<em>guṇātīta</em>), and names unwavering devotion as the way through.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are sattva, rajas, and tamas in the Bhagavad Gita?</div>
            <div className="faq-a">
              The three gunas are the three forces of nature that compose all inner experience. <em>Sattva</em> is clarity, lightness, understanding: it binds through attachment to happiness and knowledge. <em>Rajas</em> is passion, craving, restlessness: it binds through attachment to action. <em>Tamas</em> is dullness, ignorance, inertia: it binds through heedlessness, laziness, and sleep. Sattva ranks highest of the three (14.6, 14.17–18), but even sattva binds when grasped, and the goal is to go beyond all three.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How can I tell which guna is active in me?</div>
            <div className="faq-a">
              Verses 14.11-13 give the signs. Sattva: clarity in every sense, lightness, ease of understanding. Rajas: restlessness, many projects, much wanting, no settling. Tamas: fog, drowsiness, the inability to start. Verse 14.17 sums them up: sattva produces knowledge; rajas produces greed; tamas produces negligence and delusion. You can read your day backwards from the outputs.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is gunatita in the Bhagavad Gita?</div>
            <div className="faq-a">
              <em>Guṇātīta</em> means 'beyond the gunas.' Verses 14.22-25 describe this state. The person beyond the gunas does not hate light, activity, or confusion when they arise; does not long for them when they pass. They remain equal in pleasure and pain, in praise and blame, in gain and loss. The gunas still appear in their experience. What has dropped is the reactive identification with them.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Why does Krishna say even sattva binds?</div>
            <div className="faq-a">
              Verse 14.6 makes a point that is easy to miss. Sattva, being pure and luminous, binds through attachment to happiness and to knowledge. This is the trap of the spiritually advancing person, you become clearer, you start to crave the clarity, the craving is itself binding. Sattva is the highest of the three, but the goal the Gita sets is freedom from capture by any state, sattva included.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">How does one go beyond the three gunas?</div>
            <div className="faq-a">
              In verse 14.26, Krishna says: 'The one who serves me with unwavering devotion goes beyond these gunas and becomes fit for union with Brahman.' The bridge is bhakti-yoga, unwavering devotion. Devotion, rather than analysis, gives the mind a centre outside the field of the gunas. When attention rests there, the gunas continue to come and go, but the centre of identification has shifted. The states still arise; the capture by them has dropped.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about mood and inner states</div>
          </a>
          <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Karma, what it actually means in the Gita</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-13" className="related-card">
            <div className="related-card-label">Chapter 13</div>
            <div className="related-card-title">Kshetra Kshetrajna, The Field and the Knower</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-17" className="related-card">
            <div className="related-card-label">Chapter 17</div>
            <div className="related-card-title">Shraddhatraya Vibhaga, You Are What You Trust</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-18" className="related-card">
            <div className="related-card-label">Chapter 18</div>
            <div className="related-card-title">Moksha Sannyasa Yoga, The Final Teaching</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 14"} />

        </article>
      </div>

      {/* FOOTER */}
      <SiteFooter />

      <BlogTracker pageName="Bhagwat Geeta Chapter 14" />
    </>
  )
}
