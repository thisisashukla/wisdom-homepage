import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'
import { appStoreUrl } from '@/lib/app'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 17 Summary – Key Verses & Meaning (Shraddhatraya Yoga)",
  description: "Bhagavad Gita Chapter 17 (Shraddhatraya Vibhaga Yoga), 28 verses on the three kinds of faith, sattvic food, austerity, giving, and the meaning of Om Tat Sat.",
  keywords: "bhagwat geeta chapter 17, bhagavad gita shraddhatraya vibhaga yoga, bhagwat geeta adhyay 17, three kinds of faith gita, sattvic rajasic tamasic food, shraddha bhagavad gita, austerity of body speech mind, om tat sat, Shraddhatraya Vibhaga Yoga meaning, three kinds of faith Bhagavad Gita, sattvic rajasic tamasic food Bhagavad Gita, Bhagavad Gita 17.3 shraddha mayo ayam purushah, Om Tat Sat meaning Bhagavad Gita, three austerities Bhagavad Gita body speech mind",
  openGraph: {
    title: "Bhagavad Gita Chapter 17 Summary – Key Verses & Meaning (Shraddhatraya Yoga)",
    description: "Bhagavad Gita Chapter 17: a person is made of their faith (17.3), the three kinds of faith, and Om Tat Sat.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter17.webp", width: 1200, height: 675, alt: "Three lamps of different intensities, sattvic, rajasic, tamasic, illuminating the quality of faith, food, austerity, and giving. Chapter 17 of the Bhagavad Gita, Shraddhatraya Vibhaga Yoga." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 17 Summary – Key Verses & Meaning (Shraddhatraya Yoga)",
    description: "Bhagavad Gita Chapter 17: a person is made of their faith (17.3), the three kinds of faith, and Om Tat Sat.",
    images: ["https://wisdomquotes.in/assets/chapter17.webp"],
  },
  alternates: {
    canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17",
    languages: { 'x-default': "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17" },
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-18" },
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
        content: "अध्याय १७";
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
      .app-cta::before { content: "श्रद्धा"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 17 — Shraddhatraya Vibhaga Yoga: You Are What You Trust",
    "description": "Bhagavad Gita Chapter 17 — Shraddhatraya Vibhaga Yoga. All 28 verses on the three kinds of faith, sattvic food, austerity, giving, and Om Tat Sat.",
    "alternativeHeadline": "Bhagavad Gita Chapter 17 (Three Kinds of Faith) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter17.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17"
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
    "keywords": "bhagwat geeta chapter 17, bhagavad gita shraddhatraya vibhaga yoga, bhagwat geeta adhyay 17, three kinds of faith gita, sattvic rajasic tamasic food, shraddha bhagavad gita, austerity of body speech mind, om tat sat, Shraddhatraya Vibhaga Yoga meaning, three kinds of faith Bhagavad Gita, sattvic rajasic tamasic food Bhagavad Gita, Bhagavad Gita 17.3 shraddha mayo ayam purushah, Om Tat Sat meaning Bhagavad Gita, three austerities Bhagavad Gita body speech mind",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2678,
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
        "name": "Bhagavad Gita Chapter 17 — Shraddhatraya Vibhaga Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 17 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 17, called Shraddhatraya Vibhaga Yoga (the Yoga of the Threefold Faith), applies the three gunas to ordinary life. Krishna teaches that śraddhā (trust or faith) comes in three qualities — sattvic, rajasic, tamasic — and that this underlying quality shapes every ordinary action: food, sacrifice, austerity, giving. The chapter contains the famous claim of 17.3: 'A person is made of trust; whatever one trusts, that is what one becomes' , and ends by naming Om Tat Sat as the three designations of the supreme reality."
        }
      },
      {
        "@type": "Question",
        "name": "What does shraddha mean in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Śraddhā is usually translated as 'faith,' but 'trust' captures more of its meaning. It is what you put your weight on, what you rely on when you act without thinking. Verse 17.3 says: 'A person is made of trust; whatever trust they hold, that is what they become.' "
        }
      },
      {
        "@type": "Question",
        "name": "What are the three kinds of food in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 17.7-10 describe three categories. Sattvic food: increases life, strength, health and cheer; savoury, rich and substantial. Rajasic food: bitter, sour, salty, very hot, pungent — causing pain, grief and disease. Tamasic food: stale, tasteless, putrid, left over, impure. The chapter treats food preference as one sign of a person's nature, alongside sacrifice, austerity and giving."
        }
      },
      {
        "@type": "Question",
        "name": "What are the three austerities in Bhagavad Gita 17.14-17?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Krishna describes austerity at three layers. Austerity of body: reverence, cleanliness, straightforwardness, celibacy, non-violence (17.14). Austerity of speech: words that do not agitate, that are true, pleasant, and beneficial, plus study (17.15). Austerity of mind: serenity, gentleness, silence, self-control, purity of feeling (17.16). Verses 17.17–19 then sort austerity into sattvic, rajasic and tamasic kinds."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 17.20 say about giving?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 17.20 defines sattvic giving as a gift offered with the conviction that giving is right, to a worthy recipient, at the right place and time, and to one who cannot return the favour (anupakāriṇe). Verse 17.21 calls a gift made in hope of a return rajasic, and 17.22 calls a gift given with contempt, or to the unworthy, tamasic."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'Om Tat Sat' mean in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 17.23, Krishna names three traditional designations of Brahman, the supreme reality: Oṃ, Tat, Sat. Verses 17.24–27 explain each word. Followers of the Veda begin sacrifice, giving and austerity with Om; those who want liberation say Tat and act without aiming at the fruit; Sat is used for what is real and good, and for steadiness in sacrifice, austerity and giving."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.3",
    "text": "Each person's trust matches their inner nature, Arjuna. A person is made of trust — whatever one trusts, that is what one becomes.",
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
      "name": "Bhagavad Gita, Chapter 17, Verse 3"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत । / श्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः ॥",
      "sattvānurūpā sarvasya śraddhā bhavati bhārata | / śraddhā-mayo'yaṃ puruṣo yo yac-chraddhaḥ sa eva saḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.3"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.8",
    "text": "Foods that increase longevity, clarity, strength, health, ease, and warmth — that are tasty, smooth, substantial, and heart-pleasing — are dear to the sattvic person.",
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
      "name": "Bhagavad Gita, Chapter 17, Verse 8"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः । / रस्याः स्निग्धाः स्थिरा हृद्या आहाराः सात्त्विकप्रियाः ॥",
      "āyuḥ-sattva-balārogya-sukha-prīti-vivardhanāḥ | / rasyāḥ snigdhāḥ sthirā hṛdyā āhārāḥ sāttvika-priyāḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.8"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.15",
    "text": "Speech that does not agitate, that is truthful, pleasant, and beneficial, together with study and practice of the sacred — this is called the austerity of speech.",
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
      "name": "Bhagavad Gita, Chapter 17, Verse 15"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत् । / स्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते ॥",
      "anudvega-karaṃ vākyaṃ satyaṃ priya-hitaṃ ca yat | / svādhyāyābhyasanaṃ caiva vāṅmayaṃ tapa ucyate ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.15"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.16",
    "text": "Serenity of mind, gentleness, silence, self-control, and purity of feeling — this is called the austerity of the mind.",
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
      "name": "Bhagavad Gita, Chapter 17, Verse 16"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः । / भावसंशुद्धिरित्येतत्तपो मानसमुच्यते ॥",
      "manaḥ-prasādaḥ saumyatvaṃ maunam ātma-vinigrahaḥ | / bhāva-saṃśuddhir ity etat tapo mānasam ucyate ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.16"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.20",
    "text": "A gift given with the conviction that giving is right, to one who cannot return the gift, in the right place, at the right time, to a worthy recipient — that is called sattvic giving.",
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
      "name": "Bhagavad Gita, Chapter 17, Verse 20"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "दातव्यमिति यद्दानं दीयतेऽनुपकारिणे । / देशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ॥",
      "dātavyam iti yad dānaṃ dīyate'nupakāriṇe | / deśe kāle ca pātre ca tad dānaṃ sāttvikaṃ smṛtam ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.20"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.23",
    "text": "Om, Tat, Sat — these are the three names by which the supreme reality is designated. By that, the brāhmaṇas, the Vedas, and the sacrifices were established at the very beginning.",
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
      "name": "Bhagavad Gita, Chapter 17, Verse 23"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः । / ब्राह्मणास्तेन वेदाश्च यज्ञाश्च विहिताः पुरा ॥",
      "oṃ tat sad iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ | / brāhmaṇās tena vedāś ca yajñāś ca vihitāḥ purā ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-17#verse-17.23"
  }
]

export default function ChapterPage17() {
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
          Bhagavad Gita Chapter 17
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 17 · 28 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 17 (Adhyay 17):<br />
            <em>Shraddhatraya Vibhaga Yoga</em>
          </h1>
          <p className="article-subtitle">
            The chapter that says a person is made of their faith (17.3). Food, sacrifice, austerity and giving each come in three kinds, matched to the faith underneath them.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">28 verses · Shraddhatraya Vibhaga Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~12 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 17 of 18</span>
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
              src="/assets/chapter17.webp"
              alt="Three lamps of different intensities — sattvic, rajasic, tamasic — illuminating the quality of faith, food, austerity, and giving. Chapter 17 of the Bhagavad Gita, Shraddhatraya Vibhaga Yoga."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 17 applies the three gunas to ordinary life. Arjuna opens it with a practical question (17.1): what is the standing of people who set the scriptural rules aside but still worship with faith? Krishna answers by talking about <em>śraddhā</em> (faith, or trust) before he talks about action. The quality of an action, the chapter argues, follows the quality of the faith underneath it. The same outward act (a meal, a sacrifice, a gift, a discipline) is sattvic, rajasic or tamasic depending on the faith and motive behind it.
        </p>

        <p>
          Then comes 17.3: <em>Śraddhā-mayo'yaṃ puruṣaḥ, yo yac-chraddhaḥ sa eva saḥ</em>. The person is made of trust; whatever trust they hold, that is what they become. On this reading, a person is shaped by what they put their weight on more than by what they say they believe. The rest of the chapter works this out for food, sacrifice, austerity and giving.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#you-are-trust">You are what you trust, 17.3</a></li>
            <li><a href="#food">Three kinds of food, three kinds of life</a></li>
            <li><a href="#austerity-three">Austerity of body, speech, and mind</a></li>
            <li><a href="#speech">The discipline of speech, 17.15</a></li>
            <li><a href="#giving">Three kinds of giving, 17.20 to 17.22</a></li>
            <li><a href="#om-tat-sat">Om, Tat, Sat, the three names</a></li>
            <li><a href="#without-trust">What action without trust amounts to</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 17.2–17.3 · You Are Made of Trust
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="you-are-trust">You Are Made of Trust, and It Becomes What You Trust</h2>

        <p>
          Krishna's first answer, in 17.2, is that <em>śraddhā</em> (faith, or trust) comes in three kinds, sattvic, rajasic and tamasic, matching the three gunas of Chapter 14, and that each person's faith is born of their nature. Verse 17.4 shows the difference in what people worship: the sattvic worship the gods, the rajasic worship yakṣas and rākṣasas, and the tamasic worship ghosts and spirits.
        </p>

        <p>
          Verse 17.3 then says <em>śraddhā-mayo'yaṃ puruṣaḥ</em>, the person is made of trust, and <em>yo yac-chraddhaḥ sa eva saḥ</em>, whatever a person trusts, that is what they become. The word <em>-maya</em> means &quot;made of&quot;, so the sentence describes a person as consisting of their trust, which is a stronger claim than having it.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 17.3"
          speaker="Krishna"
          sanskrit="सत्त्वानुरूपा सर्वस्य श्रद्धा भवति भारत । श्रद्धामयोऽयं पुरुषो यो यच्छ्रद्धः स एव सः ॥"
          iast="sattvānurūpā sarvasya śraddhā bhavati bhārata | śraddhā-mayo'yaṃ puruṣo yo yac-chraddhaḥ sa eva saḥ ||"
          insightLabel="What trust means here"
          insight="One practical reading: your trust is what you turn to when something goes wrong, whatever you say you believe. The verse says each person's faith follows their nature, and that a person becomes what they trust."
          essence="Each person's faith matches their nature; whatever one trusts, that one becomes."
        />

        <div className="pull-quote">
          <blockquote>
            "A person is made of trust. Whatever one trusts, that is what one becomes."
          </blockquote>
          <cite>Bhagavad Gita 17.3</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 17.7–17.10 · Food as Diagnostic
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="food">What You Eat Reveals What You Trust</h2>

        <p>
          After the opening, Krishna turns to food. Each kind of food, he says, is dear to a different kind of person (17.7). Sattvic people like food that increases life, strength, health and cheerfulness, food that is savoury, rich, substantial and agreeable (17.8). Rajasic people like food that is bitter, sour, salty, very hot, pungent, dry and burning, and it brings pain, grief and disease (17.9). Tamasic people like food that is stale, tasteless, putrid, left over and impure (17.10).
        </p>

        <p>
          Modern readers sometimes find it surprising that a text about duty and liberation stops to discuss meals. The chapter treats food as one more place where a person's nature shows, alongside sacrifice, austerity and giving. On this reading, what you reach for when you are hungry says something about your state.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 17.8"
          speaker="Krishna"
          sanskrit="आयुःसत्त्वबलारोग्यसुखप्रीतिविवर्धनाः । रस्याः स्निग्धाः स्थिरा हृद्या आहाराः सात्त्विकप्रियाः ॥"
          iast="āyuḥ-sattva-balārogya-sukha-prīti-vivardhanāḥ | rasyāḥ snigdhāḥ sthirā hṛdyā āhārāḥ sāttvika-priyāḥ ||"
          essence="Food that increases life, strength, health and cheer, savoury and substantial, is dear to the sattvic."
        />

        <div className="highlight-box">
          <p>
            <strong>How the chapter is built:</strong> food, sacrifice, austerity and giving each get the same threefold analysis, as announced in 17.7. Sacrifice comes in 17.11–13, austerity in 17.14–19 and giving in 17.20–22.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 17.14–17.17 · Three Austerities
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="austerity-three">Austerity of Body, Speech, and Mind</h2>

        <p>
          Verses 17.14 through 17.16 define <em>tapas</em> (austerity) in three layers. Austerity of body: reverence for the gods, the twice-born, teachers and the wise, along with cleanliness, straightforwardness, celibacy and non-violence. Austerity of speech: words that do not agitate, that are true, pleasant, beneficial, and the practice of study. Austerity of mind: serenity, gentleness, silence, self-control, purity of feeling. Verses 17.17–19 then sort austerity by the three gunas: practised with faith and no desire for reward, for honour and show, or out of foolish stubbornness to torture oneself or harm another.
        </p>

        <p>
          Many traditional disciplines begin with the body, since bodily practices are the easiest to start, and work toward speech and mind.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 17.16"
          speaker="Krishna"
          sanskrit="मनःप्रसादः सौम्यत्वं मौनमात्मविनिग्रहः । भावसंशुद्धिरित्येतत्तपो मानसमुच्यते ॥"
          iast="manaḥ-prasādaḥ saumyatvaṃ maunam ātma-vinigrahaḥ | bhāva-saṃśuddhir ity etat tapo mānasam ucyate ||"
          essence="Serenity, gentleness, silence, self-control and a pure heart are austerity of the mind."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 17.15 · The Discipline of Speech
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="speech">Words That Do Not Agitate, That Are True, That Help</h2>

        <p>
          Verse 17.15 defines austerity of speech. The words should be <em>anudvega-karam</em>, causing no agitation; <em>satya</em>, true; and <em>priya-hita</em>, pleasant and beneficial. The verse adds the regular recitation of scripture (<em>svādhyāya</em>).
        </p>

        <p>
          The verse asks for truth and care together. A hard truth can still be said in a way that does not agitate the listener, and a pleasant remark still has to be true.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 17.15"
          speaker="Krishna"
          sanskrit="अनुद्वेगकरं वाक्यं सत्यं प्रियहितं च यत् । स्वाध्यायाभ्यसनं चैव वाङ्मयं तप उच्यते ॥"
          iast="anudvega-karaṃ vākyaṃ satyaṃ priya-hitaṃ ca yat | svādhyāyābhyasanaṃ caiva vāṅmayaṃ tapa ucyate ||"
          essence="Speech that does not agitate and is true, pleasant and helpful, with study, is austerity of speech."
        />

        <div className="pull-quote">
          <blockquote>
            "Speech that does not agitate, that is true, pleasant, and beneficial, this is the austerity of speech."
          </blockquote>
          <cite>Bhagavad Gita 17.15</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 17.20–17.22 · Three Kinds of Giving
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="giving">The Quality of a Gift Is in the Giving, Not the Object</h2>

        <p>
          Verses 17.20 through 17.22 turn to giving (<em>dāna</em>). Like food, like austerity, giving comes in three forms. Sattvic giving is offered with the feeling that giving is a duty, to a worthy person, at the right place and time, to someone who cannot repay it. Rajasic giving is offered for a return, with an eye on reward, or reluctantly. Tamasic giving is offered at the wrong place, wrong time, to undeserving people, or with contempt and disrespect.
        </p>

        <p>
          None of the three verses mentions the size of the gift. What sorts a gift is the giver's motive and manner, and the fit of place, time and recipient.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 17.20"
          speaker="Krishna"
          sanskrit="दातव्यमिति यद्दानं दीयतेऽनुपकारिणे । देशे काले च पात्रे च तद्दानं सात्त्विकं स्मृतम् ॥"
          iast="dātavyam iti yad dānaṃ dīyate'nupakāriṇe | deśe kāle ca pātre ca tad dānaṃ sāttvikaṃ smṛtam ||"
          meaning="A gift given with the conviction that giving is right, to one who cannot return the gift, in the right place, at the right time, to a worthy recipient, that is called sattvic giving."
          insightLabel="To one who cannot repay"
          insight="Anupakāriṇe means to one who has done you no favour and will not return one. In the sattvic gift, the recipient is someone who cannot pay it back. The next verse calls a gift made for a return rajasic."
          essence="A gift given as duty, to one who cannot repay, at the right place and time, is sattvic."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 17.23–17.27 · Om Tat Sat
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="om-tat-sat">Om, Tat, Sat, Why Sacred Action Has a Naming</h2>

        <p>
          Toward the end of the chapter, Krishna names a formula: <em>Oṃ Tat Sat</em>. These are the three designations of Brahman, the supreme reality, and by them, 17.23 says, the brāhmaṇas, the Vedas and the sacrifices were ordained long ago.
        </p>

        <p>
          The next verses explain each word. Followers of the Veda begin acts of sacrifice, giving and austerity with <em>Oṃ</em> (17.24). Those who want liberation say <em>Tat</em> and perform these acts without aiming at their fruit (17.25). <em>Sat</em> is used for what is real and good and for praiseworthy acts (17.26), and steadiness in sacrifice, austerity and giving is also called <em>sat</em> (17.27).
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 17.23"
          speaker="Krishna"
          sanskrit="ॐ तत्सदिति निर्देशो ब्रह्मणस्त्रिविधः स्मृतः । ब्राह्मणास्तेन वेदाश्च यज्ञाश्च विहिताः पुरा ॥"
          iast="oṃ tat sad iti nirdeśo brahmaṇas tri-vidhaḥ smṛtaḥ | brāhmaṇās tena vedāś ca yajñāś ca vihitāḥ purā ||"
          meaning="Om, Tat, Sat, these are the three names by which the supreme reality is designated. By that, the brāhmaṇas, the Vedas, and the sacrifices were established at the very beginning."
          insightLabel="Three names for Brahman"
          insight="Om, Tat and Sat are three ways of pointing to Brahman. The verses after this one tie each word to how sacrifice, giving and austerity are begun and done."
          essence="Om, Tat, Sat are the three names of Brahman, by which the Vedas and sacrifices were ordained."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 17.28 · The Closing Verse
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="without-trust">Without Trust, Even the Right Action Is Empty</h2>

        <p>
          The chapter closes with a hard sentence. Verse 17.28 says: any sacrifice, gift, or austerity performed without <em>śraddhā</em> (without trust) is called <em>asat</em>, unreal. Its fruit exists neither here nor hereafter. The verse closes the loop that opened in 17.3. If a person is made of their trust, action without trust counts for nothing.
        </p>

        <p>
          <em>Aśraddhayā hutaṃ</em> means offered without trust. The verse covers rites performed for show or out of habit by someone who does not believe in them, and says they bear no fruit in this life or the next.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 17.28"
          speaker="Krishna"
          sanskrit="अश्रद्धया हुतं दत्तं तपस्तप्तं कृतं च यत् । असदित्युच्यते पार्थ न च तत्प्रेत्य नो इह ॥"
          iast="aśraddhayā hutaṃ dattaṃ tapas taptaṃ kṛtaṃ ca yat | asad ity ucyate pārtha na ca tat pretya no iha ||"
          meaning="Whatever is offered, given, or done as austerity, performed without trust, is called unreal, Arjuna. It bears no fruit, neither here nor hereafter."
          insightLabel="Action without faith"
          insight="The verse names sacrifice, giving and austerity, the three acts the chapter has been sorting. Done without faith, all three are called asat, unreal. The word links back to sat in 17.26–27."
          essence="Sacrifice, giving or austerity done without faith is called asat and bears no fruit."
        />

        <div className="highlight-box">
          <p>
            <strong>Where this leads:</strong> Chapter 18 opens with Arjuna asking about sannyāsa and tyāga, renunciation and relinquishment, and takes up the same threefold sorting for knowledge, action, the doer, intelligence, resolve and happiness.
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
            <tr><td>17.1</td><td>Arjuna</td><td>Those who set scripture aside but worship with faith: are they sattvic, rajasic or tamasic?</td></tr>
            <tr><td>17.2</td><td>Krishna</td><td>Faith is of three kinds, sattvic, rajasic and tamasic, born of each person's nature</td></tr>
            <tr><td>17.3</td><td>Krishna</td><td>Each person's faith matches their nature; whatever one trusts, that one becomes</td></tr>
            <tr><td>17.4</td><td>Krishna</td><td>The sattvic worship gods, the rajasic yakṣas and rākṣasas, the tamasic ghosts and spirits</td></tr>
            <tr><td>17.5</td><td>Krishna</td><td>Some practise fierce austerities not taught in scripture, driven by hypocrisy, ego, desire and force</td></tr>
            <tr><td>17.6</td><td>Krishna</td><td>Such people torment the body and Krishna who dwells within it; know them as demonic</td></tr>
            <tr><td>17.7</td><td>Krishna</td><td>Food, sacrifice, austerity and giving are each of three kinds; hear the difference</td></tr>
            <tr><td>17.8</td><td>Krishna</td><td>Food that increases life, strength, health and cheer, savoury and substantial, is dear to the sattvic</td></tr>
            <tr><td>17.9</td><td>Krishna</td><td>Bitter, sour, salty, very hot, pungent and dry food, dear to the rajasic, brings pain and disease</td></tr>
            <tr><td>17.10</td><td>Krishna</td><td>Stale, tasteless, putrid, left-over and impure food is dear to the tamasic</td></tr>
            <tr><td>17.11</td><td>Krishna</td><td>Sacrifice made as scripture directs, as a duty, with no desire for reward, is sattvic</td></tr>
            <tr><td>17.12</td><td>Krishna</td><td>Sacrifice made for reward or for show is rajasic</td></tr>
            <tr><td>17.13</td><td>Krishna</td><td>Sacrifice without scriptural rule, food given out, mantras, fees or faith is tamasic</td></tr>
            <tr><td>17.14</td><td>Krishna</td><td>Reverence for gods, teachers and the wise, purity, straightforwardness, celibacy and non-violence are bodily austerity</td></tr>
            <tr><td>17.15</td><td>Krishna</td><td>Speech that does not agitate and is true, pleasant and helpful, with study, is austerity of speech</td></tr>
            <tr><td>17.16</td><td>Krishna</td><td>Serenity, gentleness, silence, self-control and a pure heart are austerity of the mind</td></tr>
            <tr><td>17.17</td><td>Krishna</td><td>This threefold austerity, practised with faith and no desire for reward, is sattvic</td></tr>
            <tr><td>17.18</td><td>Krishna</td><td>Austerity for respect, honour and show is rajasic, unstable and fleeting</td></tr>
            <tr><td>17.19</td><td>Krishna</td><td>Austerity from foolish stubbornness, torturing oneself or meant to harm another, is tamasic</td></tr>
            <tr><td>17.20</td><td>Krishna</td><td>A gift given as duty, to one who cannot repay, at the right place and time, is sattvic</td></tr>
            <tr><td>17.21</td><td>Krishna</td><td>A gift given for a return, for reward, or reluctantly is rajasic</td></tr>
            <tr><td>17.22</td><td>Krishna</td><td>A gift at the wrong place or time, to the unworthy, or given with contempt is tamasic</td></tr>
            <tr><td>17.23</td><td>Krishna</td><td>Om, Tat, Sat are the three names of Brahman, by which the Vedas and sacrifices were ordained</td></tr>
            <tr><td>17.24</td><td>Krishna</td><td>So followers of the Veda always begin sacrifice, giving and austerity with Om</td></tr>
            <tr><td>17.25</td><td>Krishna</td><td>Those who want liberation say Tat and perform these acts without aiming at their fruit</td></tr>
            <tr><td>17.26</td><td>Krishna</td><td>Sat is used for what is real and good, and for praiseworthy acts</td></tr>
            <tr><td>17.27</td><td>Krishna</td><td>Steadiness in sacrifice, austerity and giving is called sat, and so is action for that purpose</td></tr>
            <tr><td>17.28</td><td>Krishna</td><td>Sacrifice, giving or austerity done without faith is called asat and bears no fruit</td></tr>
          </tbody>
        </table>

        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected Arjuna's opening question (17.1), the food lists (17.8–10), the austerity and giving verses, and the account of Om Tat Sat (17.23–27); removed a made-up order of priority in 17.15 and an unsourced comparison to modern research; copy edited.</p>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-16" className="ch-nav-title">Chapter 16, Daivasura Sampad Vibhaga Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-18" className="ch-nav-title">Chapter 18, Moksha Sannyasa Yoga</a>
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
            <div className="faq-q">What is Bhagavad Gita Chapter 17 about?</div>
            <div className="faq-a">
              Chapter 17, called Shraddhatraya Vibhaga Yoga (the Yoga of the Threefold Faith), applies the three gunas to ordinary life. Krishna teaches that <em>śraddhā</em> (trust or faith) comes in three qualities (sattvic, rajasic, tamasic) and that this underlying quality shapes every ordinary action: food, sacrifice, austerity, giving. The chapter contains the famous claim of 17.3: 'A person is made of trust; whatever one trusts, that is what one becomes' , and ends by naming Om Tat Sat as the three designations of the supreme reality.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does shraddha mean in the Bhagavad Gita?</div>
            <div className="faq-a">
              <em>Śraddhā</em> is usually translated as 'faith,' but 'trust' captures more of its meaning. It is what you put your weight on, what you rely on when you act without thinking. Verse 17.3 says: 'A person is made of trust; whatever trust they hold, that is what they become.' 
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are the three kinds of food in the Bhagavad Gita?</div>
            <div className="faq-a">
              Verses 17.7-10 describe three categories. Sattvic food: increases life, strength, health and cheer; savoury, rich and substantial. Rajasic food: bitter, sour, salty, very hot, pungent, causing pain, grief and disease. Tamasic food: stale, tasteless, putrid, left over, impure. The chapter treats food preference as one sign of a person's nature, alongside sacrifice, austerity and giving.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are the three austerities in Bhagavad Gita 17.14-17?</div>
            <div className="faq-a">
              Krishna describes austerity at three layers. Austerity of body: reverence, cleanliness, straightforwardness, celibacy, non-violence (17.14). Austerity of speech: words that do not agitate, that are true, pleasant, and beneficial, plus study (17.15). Austerity of mind: serenity, gentleness, silence, self-control, purity of feeling (17.16). Verses 17.17–19 then sort austerity into sattvic, rajasic and tamasic kinds.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 17.20 say about giving?</div>
            <div className="faq-a">
              Verse 17.20 defines sattvic giving as a gift offered with the conviction that giving is right, to a worthy recipient, at the right place and time, and to one who cannot return the favour (<em>anupakāriṇe</em>). Verse 17.21 calls a gift made in hope of a return rajasic, and 17.22 calls a gift given with contempt, or to the unworthy, tamasic.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'Om Tat Sat' mean in the Bhagavad Gita?</div>
            <div className="faq-a">
              In verse 17.23, Krishna names three traditional designations of Brahman, the supreme reality: <em>Oṃ</em>, <em>Tat</em>, <em>Sat</em>. Verses 17.24–27 explain each word. Followers of the Veda begin sacrifice, giving and austerity with <em>Om</em>; those who want liberation say <em>Tat</em> and act without aiming at the fruit; <em>Sat</em> is used for what is real and good, and for steadiness in sacrifice, austerity and giving.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Karma, what it actually means in the Gita</div>
          </a>
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Mental peace through right action</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-14" className="related-card">
            <div className="related-card-label">Chapter 14</div>
            <div className="related-card-title">Gunatraya Vibhaga, The Three Forces</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-16" className="related-card">
            <div className="related-card-label">Chapter 16</div>
            <div className="related-card-title">Daivasura Sampad, Two Kinds of Inner Wealth</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-18" className="related-card">
            <div className="related-card-label">Chapter 18</div>
            <div className="related-card-title">Moksha Sannyasa Yoga, The Final Teaching</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 17"} />

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
          that tunes the Bhagavad Gita to your life, one verse a day. Made with reverence.
        </p>
        <p style={{ marginTop: '8px' }}>
          <a href="/">wisdomquotes.in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:work.ankurshukla@gmail.com">Support</a>
        </p>
      </footer>

      <BlogTracker pageName="Bhagwat Geeta Chapter 17" />
    </>
  )
}
