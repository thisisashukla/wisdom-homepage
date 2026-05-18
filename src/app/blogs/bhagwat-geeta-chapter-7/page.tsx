import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 7 (Jnana Vijnana Yoga) — Summary",
  description: "Bhagavad Gita Chapter 7 — Jnana Vijnana Yoga. All 30 verses on knowledge vs. realization, the pearls-on-a-thread teaching, and the four kinds of seekers.",
  keywords: "bhagwat geeta chapter 7, bhagavad gita jnana vijnana yoga, bhagwat geeta adhyay 7, pearls on a thread gita, four types of devotees gita, maya in bhagavad gita, vasudeva sarvam iti, jnana vs vijnana, Jnana Vijnana Yoga meaning, Bhagavad Gita 7.7 pearls on a thread, Bhagavad Gita 7.8 taste in water, Vasudeva sarvam iti meaning, four types of devotees Bhagavad Gita, what is maya in Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 7 (Jnana Vijnana Yoga) — All Verses",
    description: "All 30 verses of Bhagavad Gita Chapter 7 — pearls strung on a thread, four seekers, and the rare realization 'Vasudeva is everything.'",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter7.webp", width: 1200, height: 675, alt: "Krishna teaching Arjuna about the two natures — the visible and the imperishable. Chapter 7 of the Bhagavad Gita opens the second half of the text with Jnana Vijnana Yoga: the difference between knowing about something and knowing it through." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 7 (Jnana Vijnana Yoga) — All Verses",
    description: "All 30 verses of Bhagavad Gita Chapter 7 — pearls strung on a thread, four seekers, and the rare realization 'Vasudeva is everything.'",
    images: ["https://wisdomquotes.in/assets/chapter7.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-7" },
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

      body > nav {
        position: sticky; top: 0; z-index: 200;
        background: rgba(18, 5, 5, 0.92);
        backdrop-filter: blur(18px); -webkit-backdrop-filter: blur(18px);
        border-bottom: 1px solid var(--border);
      }
      .nav-inner { max-width: 1100px; margin: 0 auto; padding: 0 28px; height: 60px;
        display: flex; align-items: center; justify-content: space-between; }
      .logo { display: flex; align-items: center; gap: 9px;
        font-family: "Playfair Display", Georgia, serif; font-size: 21px; font-weight: 700;
        color: var(--gold-light); text-decoration: none; }
      .logo-mark { width: 36px; height: 36px; border-radius: 50%; overflow: hidden;
        border: 1.5px solid rgba(200, 136, 30, 0.4); flex-shrink: 0; }
      .logo-mark img { width: 100%; height: 100%; object-fit: cover; display: block; }
      .nav-links { display: flex; align-items: center; gap: 28px; list-style: none; }
      .nav-links a { font-size: 14px; font-weight: 500; color: var(--text-dim); transition: color 0.18s; }
      .nav-links a:hover, .nav-links a.active { color: var(--gold-light); }
      .btn-nav { background: var(--gold) !important; color: #1a0606 !important;
        padding: 8px 18px; border-radius: 8px; font-weight: 700; transition: opacity 0.18s; }
      .btn-nav:hover { opacity: 0.88; }

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

      .shloka-card { background: var(--bg-card); border: 1px solid var(--border);
        border-radius: 14px; overflow: hidden; margin: 36px 0; }
      .shloka-header { display: flex; align-items: center; justify-content: space-between;
        padding: 12px 22px; border-bottom: 1px solid var(--border);
        background: rgba(200, 136, 30, 0.05); }
      .shloka-ref { font-size: 11px; color: var(--gold); letter-spacing: 0.12em;
        text-transform: uppercase; font-weight: 600; }
      .shloka-speaker { font-size: 11px; color: var(--text-dimmer); letter-spacing: 0.06em; }
      .shloka-sanskrit { padding: 24px 22px 16px; font-family: "Noto Sans Devanagari", serif;
        font-size: 20px; line-height: 1.75; color: var(--gold-light);
        border-bottom: 1px solid var(--border); }
      .shloka-iast { padding: 12px 22px 16px; font-size: 12.5px; line-height: 1.7;
        color: var(--text-dimmer); border-bottom: 1px solid var(--border); font-style: italic; }
      .shloka-body { padding: 20px 22px 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
      .shloka-col-label { font-size: 9.5px; letter-spacing: 0.18em; text-transform: uppercase;
        font-weight: 700; color: var(--text-dimmer); margin-bottom: 8px; }
      .shloka-meaning { font-size: 14px; line-height: 1.7; color: var(--text-dim); }
      .shloka-insight { font-size: 14px; line-height: 1.7; color: var(--gold-light); }
      .shloka-essence { padding: 14px 22px; background: rgba(200, 136, 30, 0.06);
        border-top: 1px solid var(--border); font-family: "Playfair Display", serif;
        font-style: italic; font-size: 15px; color: var(--text-dim); }

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
        .nav-inner { padding: 0 20px; }
        .nav-links { gap: 16px; }
        .nav-links li:not(:last-child) { display: none; }
        .mobile-nav-toggle { display: flex; }
        .shloka-body { grid-template-columns: 1fr; }
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
    "headline": "Bhagavad Gita Chapter 7 — Jnana Vijnana Yoga: Knowing About vs. Knowing Through",
    "description": "Bhagavad Gita Chapter 7 — Jnana Vijnana Yoga. All 30 verses on knowledge vs. realization, the pearls-on-a-thread teaching, and the four kinds of seekers.",
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
        "url": "https://wisdomquotes.in/assets/male-logo-dark.webp"
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
          "text": "Chapter 7, called Jnana Vijnana Yoga, marks the seam in the Bhagavad Gita. The first six chapters focused on the seeker's inner discipline. From Chapter 7 onward, Krishna shifts to revealing the nature of reality itself — the two levels of nature, the divine immanence in all things (the pearls-on-a-thread image in 7.7), the four kinds of seekers (7.16-17), and the rare recognition that Vāsudevaḥ sarvam iti — God is everything (7.19)."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'pearls on a thread' mean in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 7.7, Krishna says, 'All this is strung on me as pearls are strung on a thread.' The image describes how every separate thing in the universe — every object, person, event — is held together by the Divine the way pearls are held by a thread. The thread is invisible from outside but it is what makes the collection a unity. It is the Gita's most accessible image of divine immanence."
        }
      },
      {
        "@type": "Question",
        "name": "What is the difference between jnana and vijnana?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Jnana is knowledge — what you have read, heard, or intellectually understood. Vijnana is realization — knowledge that has actually arrived in you, that has become part of how you see and live. The Gita's interest is in the crossing from one to the other. Most spiritual study stalls at jnana. Chapter 7 is named for this distinction because it teaches not new facts but a new way of perceiving facts you already had."
        }
      },
      {
        "@type": "Question",
        "name": "Who are the four kinds of devotees mentioned in Chapter 7?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 7.16-17 describe four kinds of seekers: the distressed (ārta), the curious or knowledge-seeking (jijñāsu), the seeker of material gain (arthārthī), and the wise (jñānī). All four are welcomed. But Krishna calls the wise one — whose devotion is no longer instrumental — the dearest. The verse is generous about who can begin and clear about where the journey leads."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'Vasudevah sarvam iti' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 7.19, Krishna says that after many lifetimes the wise one surrenders to him, recognising vāsudevaḥ sarvam iti — 'Vasudeva (the Divine) is everything.' This is not pantheism in the simple sense. It is the realization that the Divine does not merely contain or pervade the world but is the very being of the world. The Gita calls this realization rare — su-durlabhaḥ — and the destination of long spiritual maturation."
        }
      },
      {
        "@type": "Question",
        "name": "Why does Krishna say the divine is hidden by maya?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 7.25 says the Divine, veiled by yoga-māyā, is not perceptible to everyone. The deluded mistake the visible form for the whole reality. The teaching is that the problem is not the world's structure but the seer's perception. The veil is on our side, not on reality's side. This is good news, because perception can be trained — and the rest of the Gita is, in many ways, that training."
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
    "text": "I am the taste in water, Arjuna. I am the light in the moon and the sun. I am the sound of Om in all the Vedas, the sound in space, and the courage in human beings.",
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
    "text": "Of these, the wise one — steady, single-pointed in devotion — is the highest. For I am exceedingly dear to the wise one, and that one is dear to me.",
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
    "text": "After many lifetimes, the wise one surrenders to me, recognising — Vāsudeva is everything. Such a great soul is exceedingly rare.",
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

      {/* ── NAV ── */}
      <nav>
        <div className="nav-inner">
          <a href="/" className="logo">
            <div className="logo-mark">
              <img src="/assets/male-logo-dark.webp" alt="Wisdom" />
            </div>
            Wisdom
          </a>
          <MobileNavToggle />
          <ul className="nav-links">
            <li><a href="/#features">Features</a></li>
            <li><a href="/#how-it-works">How it works</a></li>
            <li><a href="/#topics">Topics</a></li>
            <li><a href="/blogs" className="active">Blog</a></li>
            <li>
              <a
                href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
                target="_blank"
                rel="noopener"
                className="btn-nav"
                data-mp-location="nav"
              >Download Free</a>
            </li>
          </ul>
        </div>
      </nav>

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
            Bhagavad Gita Chapter 7 (Adhyay 7) —<br />
            <em>Jnana Vijnana Yoga</em>
          </h1>
          <p className="article-subtitle">
            The chapter that changes the whole conversation. The world strung like pearls. Four kinds of seekers. And the difference between information and recognition.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">30 verses · Jnana Vijnana Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~12 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 7 of 18</span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <div className="article-wrap">
        <article className="prose">
          <figure className="chapter-image">
            <img
              src="/assets/chapter7.webp"
              alt="Krishna teaching Arjuna about the two natures — the visible and the imperishable. Chapter 7 of the Bhagavad Gita opens the second half of the text with Jnana Vijnana Yoga: the difference between knowing about something and knowing it through."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 7 is the seam in the Bhagavad Gita. The first six chapters were largely about you — your duty, your renunciation, your meditation, your inner climb. Beginning with Chapter 7, the camera pulls back. The teaching shifts from <em>how do I act</em> to <em>what is actually going on</em>. Krishna stops being primarily a coach and becomes, more openly, a metaphysical disclosure. The chapter is short, only thirty verses, but it changes the temperature of the whole book.
        </p>

        <p>
          The chapter's title — <em>Jnana Vijnana Yoga</em> — is built on a distinction that English flattens. <em>Jnana</em> is knowledge: the part you can read, hear, memorise, defend in conversation. <em>Vijnana</em> is realization: the part that has actually arrived in you, that is no longer theory, that you can no longer un-see. Most spiritual ambition stalls at jnana. The Gita's interest is in the rare crossing into vijnana. Verse 7.3 says, with characteristic bluntness, that of those who strive, almost none arrive. That is not pessimism. It is calibration. The Gita is telling you: this is harder than you think, and the difficulty is not where you assumed it was.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#two-natures">The two natures — what changes and what doesn't</a></li>
            <li><a href="#pearls">Pearls strung on a thread — 7.7</a></li>
            <li><a href="#ordinary-sacred">The sacred hiding in ordinary things — 7.8</a></li>
            <li><a href="#maya-refuge">The way through illusion is not force, but refuge — 7.14</a></li>
            <li><a href="#four-seekers">The four kinds of seekers — and which one Krishna prefers</a></li>
            <li><a href="#vasudeva">Vasudeva sarvam iti — the rarest realization</a></li>
            <li><a href="#veiled">Why the divine remains veiled to most</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 7.1–7.3 · The Calibration
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="two-natures">How Rare Is What You're Actually Looking For</h2>

        <p>
          Chapter 7 opens with Krishna setting expectations. He is about to teach Arjuna something most people never reach. Not because it is hidden, but because most people stop earlier than they realize. Verse 7.3 contains one of the most quietly devastating sentences in the Gita: among thousands who try, one perhaps strives sincerely; among those who strive, one perhaps actually knows. This is not the bragging of an exclusive club. It is the Gita being honest about how far the journey actually goes.
        </p>

        <p>
          If you have ever felt that your spiritual reading has accumulated but your spiritual seeing has not, this verse names the gap. The Gita is going to spend the next twelve chapters trying to close that gap. But the closing requires a different posture than the one most readers bring — less acquisition, more recognition.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.3</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            मनुष्याणां सहस्रेषु कश्चिद्यतति सिद्धये ।<br />यततामपि सिद्धानां कश्चिन्मां वेत्ति तत्त्वतः ॥
          </div>
          <div className="shloka-iast">
            manuṣyāṇāṃ sahasreṣu kaścid yatati siddhaye |<br />yatatām api siddhānāṃ kaścin māṃ vetti tattvataḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Among thousands of people, one may strive for perfection. Among those striving, perhaps one knows me in truth.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What this verse is actually doing</div>
              <div className="shloka-insight">
                Krishna is calibrating the conversation. He is not threatening. He is saying: the ratio between effort and arrival is not what you think. You have probably been measuring success in books read, practices logged, hours sat. The Gita's measurement is different — and the gap between the two is the work of the next twelve chapters.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "True knowing is rarer than striving, even among the successful."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>The honest reading of 7.3:</strong> This is not a verse to feel discouraged by. It is a verse to feel relieved by. If realization were easy, you would have to wonder why so many people who have practiced their whole lives still seem unsettled. The verse explains. The difficulty is not unique to you.
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

        <h2 id="pearls">Pearls Strung on a Thread — the Gita's Image for Everything</h2>

        <p>
          Verse 7.7 contains an image so simple it can be missed. Imagine a string of pearls. The pearls are distinct, beautiful, each in its place. But what holds them in a single line is something you cannot see from the outside — a thread, threaded through every pearl. Without the thread, the pearls scatter. With the thread, they are a necklace.
        </p>

        <p>
          Krishna's claim is that reality is the same shape. Every thing you see — each person, each object, each event — is the pearl. The Divine is the thread. The thread is not louder than the pearls. It is not even visible most of the time. But it is what makes the collection of pearls into something coherent. The Gita is not asking you to abandon the world of pearls. It is asking you to notice the thread.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.7</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            मत्तः परतरं नान्यत्किञ्चिदस्ति धनञ्जय ।<br />मयि सर्वमिदं प्रोतं सूत्रे मणिगणा इव ॥
          </div>
          <div className="shloka-iast">
            mattaḥ parataraṃ nānyat kiñcid asti dhanañjaya |<br />mayi sarvam idaṃ protaṃ sūtre maṇi-gaṇā iva ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                There is nothing higher than me, Arjuna. All this is strung on me, as pearls are strung on a thread.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Why this image lasts</div>
              <div className="shloka-insight">
                Other scriptures make divine immanence sound abstract — God is everywhere, God is in all things. This verse gives you a picture you can hold. Pearls are individual, distinguishable, and beautiful. They are also, structurally, not separate. The thread changes nothing about how a pearl looks. It only changes whether it belongs.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Everything is held in one sustaining reality."
          </div>
        </div>

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
          Right after the pearls-on-a-thread image, Krishna does something extraordinary. He gets specific. He names where exactly the thread is — and the list is not where you would expect. He says: I am the taste in water. The light in the sun and moon. The sound in space. The strength in human beings. Notice what the list is not. There is no temple. No ritual object. No abstract metaphysical category. The Gita's first inventory of divine presence is in the simplest sensory experiences.
        </p>

        <p>
          This is the Gita's quiet, persistent counter-argument to every form of spiritual escapism. The sacred is not somewhere else. It is in the glass of water you drank this morning. The sunlight on your wall. The sound of a conversation in the next room. You do not have to leave your life to find the Divine. You have to notice your life more carefully.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.8</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            रसोऽहमप्सु कौन्तेय प्रभास्मि शशिसूर्ययोः ।<br />प्रणवः सर्ववेदेषु शब्दः खे पौरुषं नृषु ॥
          </div>
          <div className="shloka-iast">
            raso'ham apsu kaunteya prabhāsmi śaśi-sūryayoḥ |<br />praṇavaḥ sarva-vedeṣu śabdaḥ khe pauruṣaṃ nṛṣu ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                I am the taste in water, Arjuna. I am the light in the moon and the sun. I am the sound of Om in all the Vedas, the sound in space, and the courage in human beings.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The Gita's anti-escapism</div>
              <div className="shloka-insight">
                Notice the verse does not say <em>I am behind</em> these things. It says <em>I am</em> these things. The taste of water is not a sign pointing to the Divine. The taste is the Divine, expressed through your tongue. The verse refuses any separation between sacred and ordinary. It places the entire weight of the sacred on the ordinary's shoulder.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The sacred is already inside ordinary experience."
          </div>
        </div>

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
          Halfway through the chapter comes one of the Gita's most psychologically honest verses. Krishna says: my divine māyā, made of the three qualities of nature, is hard to cross. Those who take refuge in me, they cross it. Everyone else stays inside.
        </p>

        <p>
          Note what the verse does not say. It does not say you can <em>think</em> your way out of māyā. It does not say more reading, more practice, more discipline alone can do it. It says the way through illusion is refuge. Not effort. Refuge. This will be controversial to anyone whose spiritual self-image is built on independence. The Gita is making a structural claim: there is a layer of confusion that no amount of self-generated effort can clear, because the effort itself is happening inside the confusion. The only way out is to lean on something outside the system.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.14</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            दैवी ह्येषा गुणमयी मम माया दुरत्यया ।<br />मामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥
          </div>
          <div className="shloka-iast">
            daivī hyeṣā guṇa-mayī mama māyā duratyayā |<br />mām eva ye prapadyante māyām etāṃ taranti te ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                This divine māyā of mine, woven of the three qualities, is hard to cross. Only those who take refuge in me cross beyond it.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Why "refuge" and not "effort"</div>
              <div className="shloka-insight">
                The mind that is trying to escape its own confusion is the confused mind doing the escaping. It cannot succeed because it is the problem. Refuge is the act of admitting this — and resting your weight on something that is not the confused mind. The Gita names that something. But the structural point is wider: at some level of difficulty, leaning is the only working move.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The way beyond the veil is not force, but refuge."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>If you have ever lain awake at 2 a.m. trying to think yourself out of a loop:</strong> This is the verse for that experience. The Gita is saying — at this level, more thinking will not work. You have already tried that. The way out is a different kind of move altogether: putting the weight down.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 7.16–7.17 · The Four Kinds of Seekers
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="four-seekers">The Four Kinds of Seekers — and Why Krishna Loves the Last One</h2>

        <p>
          Verses 7.16 and 7.17 contain one of the Gita's most generous and most pointed teachings. Krishna says four kinds of people turn to the Divine. The person in distress. The person seeking understanding. The person seeking wealth or material good. And the wise person — the <em>jnani</em> — who has stopped needing anything in particular and turns toward the Divine for the Divine itself.
        </p>

        <p>
          What is generous about this list: all four are welcomed. The person who prays after a panic attack, the person who reads scripture because they cannot let go of the question, the person who asks for help with a job interview — none of them are turned away. What is pointed: Krishna says the fourth — the wise devotee whose love is no longer instrumental — is dearest. The hierarchy is not moral. It is structural. The first three loves something through the Divine. The fourth loves the Divine. They are different relationships.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.16</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            चतुर्विधा भजन्ते मां जनाः सुकृतिनोऽर्जुन ।<br />आर्तो जिज्ञासुरर्थार्थी ज्ञानी च भरतर्षभ ॥
          </div>
          <div className="shloka-iast">
            catur-vidhā bhajante māṃ janāḥ sukṛtino'rjuna |<br />ārto jijñāsur arthārthī jñānī ca bharatarṣabha ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Four kinds of good people turn toward me, Arjuna: the distressed, the seeker of knowledge, the seeker of fortune, and the wise one, best of the Bharatas.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The door is open to all</div>
              <div className="shloka-insight">
                The Gita does not require purity of motive to begin. It requires only direction. The person who comes from pain is not lesser than the person who comes from wisdom. They are entering through different doors of the same house. The verse is a permission slip for anyone who has thought they needed to be "more spiritual" before they could pray.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Different needs can still lead to one real turning toward the divine."
          </div>
        </div>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.17</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            तेषां ज्ञानी नित्ययुक्त एकभक्तिर्विशिष्यते ।<br />प्रियो हि ज्ञानिनोऽत्यर्थमहं स च मम प्रियः ॥
          </div>
          <div className="shloka-iast">
            teṣāṃ jñānī nitya-yukta eka-bhaktir viśiṣyate |<br />priyo hi jñānino'tyartham ahaṃ sa ca mama priyaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Of these, the wise one — steady, single-pointed in devotion — is the highest. For I am exceedingly dear to the wise one, and that one is dear to me.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">When the relationship reverses direction</div>
              <div className="shloka-insight">
                Notice the symmetry. The wise one finds the Divine dear, <em>and</em> the Divine finds the wise one dear. The relationship becomes mutual. This is a quiet but radical shift — the seeker is no longer just seeking. The seeker is also being sought. The conversation is two-way.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Deep knowing and devoted love become a mutual bond."
          </div>
        </div>

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

        <h2 id="vasudeva">After Many Lifetimes: The Recognition That Ends Searching</h2>

        <p>
          Verse 7.19 is one of the most quietly weighty verses in the entire book. It says: after many lifetimes, the wise one surrenders, recognising that <em>vāsudevaḥ sarvam iti</em> — God is all this. That recognition, Krishna says, makes the person a great soul, and very rare.
        </p>

        <p>
          The verse can be read in two ways. The traditional reading is literal — many lifetimes, real ones, before the recognition arrives. The psychological reading is that this is what it feels like even within a single life: that the recognition seems to arrive after enormous distance has been crossed. Either way, the destination is the same and is named clearly: <em>God is all this</em>. Not God is somewhere, beyond. God is here, as this. The thread is the pearls, seen finally as the thread.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.19</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            बहूनां जन्मनामन्ते ज्ञानवान्मां प्रपद्यते ।<br />वासुदेवः सर्वमिति स महात्मा सुदुर्लभः ॥
          </div>
          <div className="shloka-iast">
            bahūnāṃ janmanām ante jñānavān māṃ prapadyate |<br />vāsudevaḥ sarvam iti sa mahātmā su-durlabhaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                After many lifetimes, the wise one surrenders to me, recognising — Vāsudeva is everything. Such a great soul is exceedingly rare.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The five words that matter</div>
              <div className="shloka-insight">
                <em>Vāsudevaḥ sarvam iti</em> — God is everything. Not God is in everything. Not God includes everything. <em>God is</em> everything. The grammar removes the last layer of distance. The realization of this verse is the destination of every other verse in the book.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Deep seeing ends in surrender to the one reality in all things."
          </div>
        </div>

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
          Chapter 7 closes with a recurring question: if the Divine is everywhere — strung through everything like a thread — why does almost no one see it? Krishna's answer is honest and unflinching. The Divine is not absent. The seeing is distorted. The veil is on the seer, not on the world.
        </p>

        <p>
          This matters for how we live. If the problem were absence, we would need to search. The problem being distorted seeing, we need to clean the seeing. Different verb, different practice. The rest of the Gita is, in many ways, a long instruction on how to clean the seeing — through devotion, through equanimity, through service, through trust. Chapter 7 ends by naming the problem precisely. Chapter 8 onward begins to answer it.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 7.25</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            नाहं प्रकाशः सर्वस्य योगमायासमावृतः ।<br />मूढोऽयं नाभिजानाति लोको मामजमव्ययम् ॥
          </div>
          <div className="shloka-iast">
            nāhaṃ prakāśaḥ sarvasya yoga-māyā-samāvṛtaḥ |<br />mūḍho'yaṃ nābhijānāti loko mām ajam avyayam ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Veiled by yoga-māyā, I am not visible to everyone. The deluded world does not recognise me as unborn and imperishable.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The problem is the seer, not the seen</div>
              <div className="shloka-insight">
                The Divine is not playing hide-and-seek. The veil is on our side. This is good news, philosophically. If the problem were the world's structure, we would be stuck. The problem being our perception, the perception can change. The Gita's pedagogical strategy assumes this — it spends most of its time training perception, not arguing metaphysics.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The hidden divine is missed by confused seeing, not by absence."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>How Chapter 7 sets up the rest of the Gita:</strong> By Chapter 7, the Gita has stopped trying to give you new information. It is now trying to change what information you can perceive. The pearls have always been on a thread. You are being trained to see it. That training continues for the remaining eleven chapters.
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
            <tr><td>7.1</td><td>Krishna</td><td>Refuge and practice open the way to complete knowing</td></tr>
            <tr><td>7.2</td><td>Krishna</td><td>Real knowing leaves no unfinished hunger for more</td></tr>
            <tr><td>7.3</td><td>Krishna</td><td>True knowing is rarer than striving, even among the successful</td></tr>
            <tr><td>7.4</td><td>Krishna</td><td>What changes is not the whole of what you are</td></tr>
            <tr><td>7.5</td><td>Krishna</td><td>What sustains the world is subtler than what the senses first show</td></tr>
            <tr><td>7.6</td><td>Krishna</td><td>Everything that appears rises from one source and returns there</td></tr>
            <tr><td>7.7</td><td>Krishna</td><td>Everything is held in one sustaining reality</td></tr>
            <tr><td>7.8</td><td>Krishna</td><td>The sacred is already inside ordinary experience</td></tr>
            <tr><td>7.9</td><td>Krishna</td><td>The sacred is already inside nature, vitality, and discipline</td></tr>
            <tr><td>7.10</td><td>Krishna</td><td>All brilliance is borrowed from the same source</td></tr>
            <tr><td>7.11</td><td>Krishna</td><td>Strength becomes clean when desire no longer fights dharma</td></tr>
            <tr><td>7.12</td><td>Krishna</td><td>All qualities arise in the divine, yet the divine is not bound by any</td></tr>
            <tr><td>7.13</td><td>Krishna</td><td>Three qualities can hide the imperishable reality from plain sight</td></tr>
            <tr><td>7.14</td><td>Krishna</td><td>The way beyond the veil is not force, but refuge</td></tr>
            <tr><td>7.15</td><td>Krishna</td><td>A corrupted mind cannot recognise what would free it</td></tr>
            <tr><td>7.16</td><td>Krishna</td><td>Different needs can still lead to one real turning toward the divine</td></tr>
            <tr><td>7.17</td><td>Krishna</td><td>Deep knowing and devoted love become a mutual bond</td></tr>
            <tr><td>7.18</td><td>Krishna</td><td>Deep knowing turns devotion into identity</td></tr>
            <tr><td>7.19</td><td>Krishna</td><td>Deep seeing ends in surrender to the one reality in all things</td></tr>
            <tr><td>7.20</td><td>Krishna</td><td>Desire clouds judgment and sends the mind toward smaller refuges</td></tr>
            <tr><td>7.21</td><td>Krishna</td><td>Faith becomes firm where the devotee turns</td></tr>
            <tr><td>7.22</td><td>Krishna</td><td>Faith draws the result, but the deeper order grants it</td></tr>
            <tr><td>7.23</td><td>Krishna</td><td>Finite worship brings finite results; devotion returns you to Krishna</td></tr>
            <tr><td>7.24</td><td>Krishna</td><td>Form can hide the imperishable reality beneath it</td></tr>
            <tr><td>7.25</td><td>Krishna</td><td>The hidden divine is missed by confused seeing, not by absence</td></tr>
            <tr><td>7.26</td><td>Krishna</td><td>Everything is visible to the divine; the divine remains unseen to ordinary minds</td></tr>
            <tr><td>7.27</td><td>Krishna</td><td>Desire and aversion turn clear seeing into confusion</td></tr>
            <tr><td>7.28</td><td>Krishna</td><td>Clear hearts stop wavering and move toward the divine with resolve</td></tr>
            <tr><td>7.29</td><td>Krishna</td><td>Refuge in the divine opens total understanding of reality, inner life, and action</td></tr>
            <tr><td>7.30</td><td>Krishna</td><td>Complete understanding remains steady even at the moment of departure</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-6" className="ch-nav-title">Chapter 6 — Dhyana Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-8" className="ch-nav-title">Chapter 8 — Akshara Brahma Yoga</a>
          </div>
        </div>

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
              Chapter 7, called Jnana Vijnana Yoga, marks the seam in the Bhagavad Gita. The first six chapters focused on the seeker's inner discipline. From Chapter 7 onward, Krishna shifts to revealing the nature of reality itself — the two levels of nature, the divine immanence in all things (the pearls-on-a-thread image in 7.7), the four kinds of seekers (7.16-17), and the rare recognition that <em>Vāsudevaḥ sarvam iti</em> — God is everything (7.19).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'pearls on a thread' mean in the Bhagavad Gita?</div>
            <div className="faq-a">
              In verse 7.7, Krishna says, 'All this is strung on me as pearls are strung on a thread.' The image describes how every separate thing in the universe — every object, person, event — is held together by the Divine the way pearls are held by a thread. The thread is invisible from outside but it is what makes the collection a unity. It is the Gita's most accessible image of divine immanence.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the difference between jnana and vijnana?</div>
            <div className="faq-a">
              <em>Jnana</em> is knowledge — what you have read, heard, or intellectually understood. <em>Vijnana</em> is realization — knowledge that has actually arrived in you, that has become part of how you see and live. The Gita's interest is in the crossing from one to the other. Most spiritual study stalls at jnana. Chapter 7 is named for this distinction because it teaches not new facts but a new way of perceiving facts you already had.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Who are the four kinds of devotees mentioned in Chapter 7?</div>
            <div className="faq-a">
              Verses 7.16-17 describe four kinds of seekers: the distressed (ārta), the curious or knowledge-seeking (jijñāsu), the seeker of material gain (arthārthī), and the wise (jñānī). All four are welcomed. But Krishna calls the wise one — whose devotion is no longer instrumental — the dearest. The verse is generous about who can begin and clear about where the journey leads.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'Vasudevah sarvam iti' mean?</div>
            <div className="faq-a">
              In verse 7.19, Krishna says that after many lifetimes the wise one surrenders to him, recognising <em>vāsudevaḥ sarvam iti</em> — 'Vasudeva (the Divine) is everything.' This is not pantheism in the simple sense. It is the realization that the Divine does not merely contain or pervade the world but <em>is</em> the very being of the world. The Gita calls this realization rare — <em>su-durlabhaḥ</em> — and the destination of long spiritual maturation.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Why does Krishna say the divine is hidden by maya?</div>
            <div className="faq-a">
              Verse 7.25 says the Divine, veiled by yoga-māyā, is not perceptible to everyone. The deluded mistake the visible form for the whole reality. The teaching is that the problem is not the world's structure but the seer's perception. The veil is on our side, not on reality's side. This is good news, because perception can be trained — and the rest of the Gita is, in many ways, that training.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-for-beginners" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Bhagavad Gita for beginners — where to start</div>
          </a>
          <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">The Bhagavad Gita as a story — how the argument builds</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-8" className="related-card">
            <div className="related-card-label">Chapter 8</div>
            <div className="related-card-title">Akshara Brahma Yoga — What the Mind Has Practiced</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-9" className="related-card">
            <div className="related-card-label">Chapter 9</div>
            <div className="related-card-title">Raja Vidya Raja Guhya Yoga — The Royal Secret</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-10" className="related-card">
            <div className="related-card-label">Chapter 10</div>
            <div className="related-card-title">Vibhuti Yoga — Sparks of the Divine</div>
          </a>
          </div>
        </div>

          {/* ── APP CTA ── */}
          <div className="app-cta">
            <div className="app-cta-eyebrow">Free iOS App</div>
            <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
            <p className="app-cta-desc">
              The Wisdom app delivers one Bhagavad Gita verse each day — Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
            </p>
            <div className="app-cta-features">
              <span>✦ Daily shloka in Sanskrit</span>
              <span>✦ Meaning &amp; modern context</span>
              <span>✦ Home screen widget</span>
            </div>
            <a
              href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
              target="_blank"
              rel="noopener"
              className="app-cta-btn"
              data-mp-location="cta"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/></svg>
              Download on the App Store
            </a>
            <div className="app-cta-sub">Free · iPhone · No account needed</div>
          </div>

        </article>
      </div>

      {/* FOOTER */}
      <footer>
        <p>
          Wisdom © 2026. Part of a{' '}
          <a
            href="https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125"
            target="_blank"
            rel="noopener"
            data-mp-location="footer"
          >free iPhone app</a>{' '}
          that delivers daily Bhagavad Gita shlokas. Made with reverence.
        </p>
        <p style={{ marginTop: '8px' }}>
          <a href="/">wisdomquotes.in</a> · <a href="/privacy">Privacy</a> · <a href="/terms">Terms</a> · <a href="mailto:work.ankurshukla@gmail.com">Support</a>
        </p>
      </footer>

      <BlogTracker pageName="Bhagwat Geeta Chapter 7" />
    </>
  )
}
