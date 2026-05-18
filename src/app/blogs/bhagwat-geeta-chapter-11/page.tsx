import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 11 (Vishwarupa Yoga) — Summary",
  description: "Bhagavad Gita Chapter 11 — Vishwarupa Darshana Yoga. All 55 verses on the cosmic form, the thousand suns, and 'I am Time, the destroyer of worlds.'",
  keywords: "bhagwat geeta chapter 11, bhagavad gita vishwarupa darshana yoga, bhagwat geeta adhyay 11, kaloasmi loka kshaya krit pravriddho, thousand suns gita, cosmic form bhagavad gita, I am time the destroyer of worlds, nimitta matram bhava, Vishwarupa Darshana Yoga meaning, Bhagavad Gita 11.12 thousand suns, Bhagavad Gita 11.32 kalo asmi loka kshaya krit, I am Time the destroyer of worlds meaning, Bhagavad Gita 11.33 nimitta matram bhava, Krishna cosmic form Bhagavad Gita, Oppenheimer Bhagavad Gita quote",
  openGraph: {
    title: "Bhagavad Gita Chapter 11 (Vishwarupa Darshana) — All Verses",
    description: "Bhagavad Gita Chapter 11 — the cosmic vision. A thousand suns. 'I am Time, the destroyer of worlds.' (11.32)",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter11.webp", width: 1200, height: 675, alt: "The cosmic form revealed — a vast, blinding vision that exceeds the human eye. Chapter 11 of the Bhagavad Gita, Vishwarupa Darshana Yoga, contains the most famous theophany in any scripture." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 11 (Vishwarupa Darshana) — All Verses",
    description: "Bhagavad Gita Chapter 11 — the cosmic vision. A thousand suns. 'I am Time, the destroyer of worlds.' (11.32)",
    images: ["https://wisdomquotes.in/assets/chapter11.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12" },
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
        content: "अध्याय ११";
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
      .app-cta::before { content: "विश्व"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 11 — Vishwarupa Darshana Yoga: The Vision That Cannot Be Looked At",
    "description": "Bhagavad Gita Chapter 11 — Vishwarupa Darshana Yoga. All 55 verses on the cosmic form, the thousand suns, and 'I am Time, the destroyer of worlds.'",
    "alternativeHeadline": "Bhagavad Gita Chapter 11 (Vishwarupa Darshana) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter11.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11"
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
    "keywords": "bhagwat geeta chapter 11, bhagavad gita vishwarupa darshana yoga, bhagwat geeta adhyay 11, kaloasmi loka kshaya krit pravriddho, thousand suns gita, cosmic form bhagavad gita, I am time the destroyer of worlds, nimitta matram bhava, Vishwarupa Darshana Yoga meaning, Bhagavad Gita 11.12 thousand suns, Bhagavad Gita 11.32 kalo asmi loka kshaya krit, I am Time the destroyer of worlds meaning, Bhagavad Gita 11.33 nimitta matram bhava, Krishna cosmic form Bhagavad Gita, Oppenheimer Bhagavad Gita quote",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2783,
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
        "name": "Bhagavad Gita Chapter 11 — Vishwarupa Darshana Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 11 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 11, called Vishwarupa Darshana Yoga (the Yoga of the Vision of the Cosmic Form), is the dramatic climax of the Bhagavad Gita. Arjuna asks to see Krishna's universal form. Krishna grants him divine sight and shows him the cosmic body — a vision of infinite arms, infinite mouths, beings being consumed by time. The chapter contains the famous 'thousand suns' verse (11.12), the line 'I am Time, the destroyer of worlds' (11.32), and the closing teaching that only undivided devotion can reach this vision (11.53-55)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the meaning of Bhagavad Gita 11.32?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 11.32 — kālo'smi loka-kṣaya-kṛt pravṛddhaḥ — translates as 'I am Time, grown mighty, the destroyer of worlds.' Krishna identifies himself as Time itself, the most absolute reaping force. The verse goes on to say that even without Arjuna, the warriors arrayed against him will not survive. The teaching, beyond the war context, is that whatever you fear losing is already loosening from your grip — not because of failure, but because Time is what Time is."
        }
      },
      {
        "@type": "Question",
        "name": "What is the 'thousand suns' verse in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 11.12 says, 'If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self.' The verse is Arjuna's attempt to describe the cosmic form and his admission that even the maximum comparison ordinary imagination can produce does not reach. The verse is famously known outside the tradition because Robert Oppenheimer reached for it when describing the first atomic bomb detonation."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'nimitta matram bhava' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 11.33, Krishna tells Arjuna, 'nimitta-mātraṃ bhava savya-sācin' — 'become only the instrument, Arjuna.' The teaching is that Arjuna is not the originator of what is going to unfold on the battlefield. The war is already decided by a larger order. His task is to be a clean instrument — present, accountable, attentive — through which the unfolding moves. The verse extends beyond the war context to every difficult action: the work is yours; the outcome was never yours to own."
        }
      },
      {
        "@type": "Question",
        "name": "What is the universal form (Vishwarupa) in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The vishwarupa or universal form is Krishna's cosmic body — the form in which the entire universe is contained. Arjuna sees it in Chapter 11 after asking for direct vision. The form has infinite arms, infinite eyes, mouths like blazing fire, and contains all beings within it. It is the Gita's most overwhelming theophany. The form cannot be perceived with ordinary eyes — Krishna gives Arjuna divine sight specifically to behold it."
        }
      },
      {
        "@type": "Question",
        "name": "Why did Arjuna apologise to Krishna in Chapter 11?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "After the cosmic vision, in verses 11.41-44, Arjuna apologises for having treated Krishna with casual familiarity — calling him by name, joking with him, eating with him — without realising who he truly was. He asks Krishna to forgive him as a father forgives a son, as a friend forgives a friend, as a lover forgives a beloved. The teaching is that real reverence does not destroy relationship; the friendship was always real, and the cosmic vision only enlarged what it had been holding all along."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.12",
    "text": "If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self.",
    "spokenByCharacter": {
      "@type": "Person",
      "name": "Arjuna"
    },
    "creator": {
      "@type": "Person",
      "name": "Arjuna"
    },
    "isPartOf": {
      "@type": "Book",
      "name": "Bhagavad Gita, Chapter 11, Verse 12"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता । / यदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः ॥",
      "divi sūrya-sahasrasya bhaved yugapad-utthitā | / yadi bhāḥ sadṛśī sā syād bhāsas tasya mahātmanaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.12"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.32",
    "text": "The Blessed One said: I am Time, grown mighty, destroyer of worlds, here to consume beings. Even without you, none of these warriors arrayed against you will survive.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 32"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रीभगवानुवाच / कालोऽस्मि लोकक्षयकृत्प्रवृद्धोलोकान्समाहर्तुमिह प्रवृत्तः । / ऋतेऽपि त्वां न भविष्यन्ति सर्वेयेऽवस्थिताः प्रत्यनीकेषु योधाः ॥",
      "śrī bhagavān uvāca | / kālo'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ | / ṛte'pi tvāṃ na bhaviṣyanti sarve ye'vasthitāḥ pratyanīkeṣu yodhāḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.32"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.33",
    "text": "Therefore — rise. Win fame. Conquer the foes and enjoy a flourishing kingdom. They have already been slain by me. Become only the instrument, Arjuna.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 33"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "तस्मात्त्वमुत्तिष्ठ यशो लभस्वजित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम् । / मयैवैते निहताः पूर्वमेवनिमित्तमात्रं भव सव्यसाचिन् ॥",
      "tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṃ samṛddham | / mayaivaite nihatāḥ pūrvam eva nimitta-mātraṃ bhava savya-sācin ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.33"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.53",
    "text": "Not by the Vedas, not by austerity, not by charity, not by ritual sacrifice can I be seen in this form as you have just seen me.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 53"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "नाहं वेदैर्न तपसा न दानेन न चेज्यया । / शक्य एवंविधो द्रष्टुं दृष्टवानसि मां यथा ॥",
      "nāhaṃ vedair na tapasā na dānena na cejyayā | / śakya evaṃ-vidho draṣṭuṃ dṛṣṭavān asi māṃ yathā ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.53"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.55",
    "text": "The one who works for me, takes me as the supreme, is devoted to me, is free from attachment, and bears no hostility toward any being — that one comes to me, Pandava.",
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
      "name": "Bhagavad Gita, Chapter 11, Verse 55"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः । / निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥",
      "mat-karma-kṛn mat-paramo mad-bhaktaḥ saṅga-varjitaḥ | / nirvairaḥ sarva-bhūteṣu yaḥ sa mām eti pāṇḍava ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11#verse-11.55"
  }
]

export default function ChapterPage11() {
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
          Bhagavad Gita Chapter 11
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 11 · 55 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 11 (Adhyay 11) —<br />
            <em>Vishwarupa Darshana Yoga</em>
          </h1>
          <p className="article-subtitle">
            Arjuna asks to see. He gets what he asked for. A thousand suns. Mouths like fire. Time, the destroyer of worlds. And the chapter's hardest teaching: the truly devastating thing is not what is ending — it is that you were never holding it in the first place.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">55 verses · Vishwarupa Darshana Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~16 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 11 of 18</span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <div className="article-wrap">
        <article className="prose">
          <figure className="chapter-image">
            <img
              src="/assets/chapter11.webp"
              alt="The cosmic form revealed — a vast, blinding vision that exceeds the human eye. Chapter 11 of the Bhagavad Gita, Vishwarupa Darshana Yoga, contains the most famous theophany in any scripture."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 11 is the climax of the Gita. After ten chapters of teaching, after the catalogue of manifestations in Chapter 10 — among rivers I am the Ganga, among letters I am A — Arjuna does what readers across two thousand years have wanted to do. He asks to see. Not as analogy. Not as inference. As direct vision. He says: I believe everything you have said, but show me. <em>Draṣṭum icchāmi te rūpam aiśvaram</em> — I want to see your sovereign form.
        </p>

        <p>
          Krishna agrees, gives Arjuna a divine eye (because ordinary eyes are not equipped for this), and then the chapter delivers what is probably the most overwhelming passage in any scripture. A thousand suns blazing at once. Infinite mouths. Bodies of beings rushing into those mouths and being destroyed. The narrator, Sanjaya, has to break in to describe it — Arjuna himself has lost the capacity to speak. And then, at the centre of the vision, comes a line that has echoed beyond the chapter, beyond the book, into the conscience of the twentieth century: <em>kālo'smi loka-kṣaya-kṛt pravṛddhaḥ</em>. I am Time. The great destroyer of worlds.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#ask-to-see">Arjuna asks for the vision — and what asking means</a></li>
            <li><a href="#thousand-suns">If a thousand suns rose at once — 11.12</a></li>
            <li><a href="#overwhelmed">The vision exceeds what Arjuna can hold</a></li>
            <li><a href="#time">I am Time — 11.32</a></li>
            <li><a href="#instrument">Become an instrument — 11.33</a></li>
            <li><a href="#forgiveness">Arjuna's humbling — and the request for forgiveness</a></li>
            <li><a href="#devotion">The chapter's gentle ending — only devotion sees this</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.3–11.4 · The Request
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="ask-to-see">Arjuna Asks to See — And What It Means to Ask</h2>

        <p>
          Chapter 11 begins with one of the most psychologically honest moments in the Gita. Arjuna says: I believe everything you have told me. Every word is true. <em>And yet I want to see</em>. There is no contradiction in this. It is exactly how belief in something enormous actually works — you can hold the proposition and still need a direct encounter to make it real for you. The Gita does not treat Arjuna's request as a failure of faith. It treats it as the natural next step of faith.
        </p>

        <p>
          What is also remarkable: Arjuna asks softly. <em>If you think I am capable of seeing it, then show me.</em> The asker is not demanding. He recognizes that the seeing may not be in his control — that the asking itself is a kind of surrender. This is what makes the request work. The Gita does not give cosmic vision to anyone who insists. It gives it to one who has acknowledged that the seeing is a gift, not an entitlement.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.3</span>
            <span className="shloka-speaker">Speaker: Arjuna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            एवमेतद्यथात्थ त्वमात्मानं परमेश्वर ।<br />द्रष्टुमिच्छामि ते रूपमैश्वरं पुरुषोत्तम ॥
          </div>
          <div className="shloka-iast">
            evam etad yathāttha tvam ātmānaṃ parameśvara |<br />draṣṭum icchāmi te rūpam aiśvaraṃ puruṣottama ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Everything you have said about yourself is true, Supreme Lord. And yet — I wish to see your sovereign form, O Supreme Person.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Belief and seeing are not opposites</div>
              <div className="shloka-insight">
                Arjuna's request is not a failure of trust. It is the natural progression of trust. You can completely believe the report from a friend and still need to see for yourself. The verse honors that. The Gita does not require blind belief. It anticipates that real belief eventually wants to see.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Belief becomes complete only when it wants to see."
          </div>
        </div>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.4</span>
            <span className="shloka-speaker">Speaker: Arjuna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            मन्यसे यदि तच्छक्यं मया द्रष्टुमिति प्रभो ।<br />योगेश्वर ततो मे त्वं दर्शयाऽऽत्मानमव्ययम् ॥
          </div>
          <div className="shloka-iast">
            manyase yadi tac chakyaṃ mayā draṣṭum iti prabho |<br />yogeśvara tato me tvaṃ darśayātmānam avyayam ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                If you think I am able to behold that form, Lord — Master of yoga, show me your imperishable Self.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The qualifier that earns the vision</div>
              <div className="shloka-insight">
                <em>If you think I am able</em>. Arjuna does not assume he is ready. He defers to Krishna's judgement. This single qualifier is what makes the request a real request rather than a demand. It is also the deeper psychological move: he has stopped trying to control even what he is asking for.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Real vision begins when control gives way to asking."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 11.12 · The Comparison That Fails
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="thousand-suns">If a Thousand Suns Rose at Once</h2>

        <p>
          Krishna gives Arjuna the divine eye and reveals the cosmic form. Arjuna immediately reaches for a comparison — and the comparison breaks. He says: if a thousand suns rose in the sky at the same moment, their light might begin to approach the radiance of this Great Being. The point of the verse is not the number. The point is the failure of measurement itself. Even the maximum the imagination can stretch to does not reach. The vision has exceeded scale.
        </p>

        <p>
          This is one of the most cited verses in the Gita, partly because Robert Oppenheimer reached for it when he watched the first atomic bomb detonate. The instinct was correct. When ordinary language fails — when the event you are witnessing has overflowed every comparison — Sanskrit's reach for a thousand suns has a precision that ordinary English does not. The verse names the experience of confronting something so large that the act of seeing it changes you. Not just intellectually. Existentially.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.12</span>
            <span className="shloka-speaker">Speaker: Arjuna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            दिवि सूर्यसहस्रस्य भवेद्युगपदुत्थिता ।<br />यदि भाः सदृशी सा स्याद्भासस्तस्य महात्मनः ॥
          </div>
          <div className="shloka-iast">
            divi sūrya-sahasrasya bhaved yugapad-utthitā |<br />yadi bhāḥ sadṛśī sā syād bhāsas tasya mahātmanaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Why this verse keeps being quoted</div>
              <div className="shloka-insight">
                Comparison fails. The verse names that failure with the most generous comparison ordinary imagination can produce — and admits even that does not reach. The Gita is teaching, through Arjuna's mouth, what to do when language runs out. You name the failure. The naming itself is a kind of accuracy.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Even the brightest familiar light cannot measure the cosmic form's radiance."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "If a thousand suns rose at once in the sky — their light might begin to compare with the radiance of that Great Self."
          </blockquote>
          <cite>Bhagavad Gita 11.12</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.15–11.24 · Beyond What Can Be Held
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="overwhelmed">When the Vision Exceeds the One Who Asked For It</h2>

        <p>
          What follows is sustained overwhelm. Arjuna sees infinite arms, infinite mouths, the gods themselves bowing in awe, the cosmos itself trembling. By verse 11.19, Arjuna is no longer describing what he sees as a calm observer. He is being undone by it. He says: I see you scorching this world with your own radiance. By 11.24, he confesses — I cannot find composure. I have no peace. The vision he asked for has obliterated the asker.
        </p>

        <p>
          This is the Gita's honesty about religious experience. The encounter with the absolute is not pleasant. It is not the soft comfort that contemporary spirituality often promises. It is the meeting of finite consciousness with infinite reality, and finite consciousness does not survive the meeting intact. Arjuna does not collapse into bliss. He collapses into terror, then into reverence. The chapter is teaching that the highest experience is not the most pleasant one — and that the difference matters.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.19</span>
            <span className="shloka-speaker">Speaker: Arjuna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            अनादिमध्यान्तमनन्तवीर्यमनन्तबाहुं शशिसूर्यनेत्रम् ।<br />पश्यामि त्वां दीप्तहुताशवक्त्रंस्वतेजसा विश्वमिदं तपन्तम् ॥
          </div>
          <div className="shloka-iast">
            anādi-madhyāntam ananta-vīryam ananta-bāhuṃ śaśi-sūrya-netram |<br />paśyāmi tvāṃ dīpta-hutāśa-vaktraṃ sva-tejasā viśvam idaṃ tapantam ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                I see you — without beginning, middle, or end, of infinite power, with infinite arms, eyes like sun and moon, mouths like blazing fire, scorching this entire world with your own radiance.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The vision exceeds the seer</div>
              <div className="shloka-insight">
                The verse uses negations to describe what positive language cannot — no beginning, no middle, no end. Each negation widens what cannot be held. By the end of the verse, the seer is being scorched by what he is seeing. The vision is not gentle. The vision is the truth, and the truth is more than a human eye was meant to hold all at once.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "What overwhelms the mind can also dissolve its resistance."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>Why the chapter does not feel comforting:</strong> Because comfort was never the point. Chapter 11 is not selling tranquility. It is showing Arjuna — and through Arjuna, every reader who has wanted direct contact with the absolute — what direct contact actually feels like. It is not bliss first. It is dismantling first. The bliss comes later, on the other side of the dismantling, if you survive it.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 11.32 · Time, the Destroyer
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="time">I Am Time — the Sentence That Has Outlived Its Chapter</h2>

        <p>
          Then comes the line. Arjuna asks who this overwhelming form is, and Krishna's reply is one of the most quoted sentences in any sacred text. <em>Kālo'smi loka-kṣaya-kṛt pravṛddhaḥ</em>. I am Time, grown great, the destroyer of worlds. The verse continues: even without you, all these warriors arranged in hostile ranks will not survive. The war is already decided. The destroying force is not Krishna in any local sense. It is Time — the most patient and most absolute reaper there is.
        </p>

        <p>
          Read the verse outside of the war context, and it widens. The relationship is already changing. The job is already ending. The body is already aging. Whatever you are gripping is already loosening, not because you are doing anything wrong but because Time is what Time is. The verse is unsparing. But it is also, paradoxically, freeing. The thing you fear losing is not yours to keep. Knowing this is not despair. It is accuracy — and accuracy is the precondition for clean action.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.32</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            श्रीभगवानुवाच<br />कालोऽस्मि लोकक्षयकृत्प्रवृद्धोलोकान्समाहर्तुमिह प्रवृत्तः ।<br />ऋतेऽपि त्वां न भविष्यन्ति सर्वेयेऽवस्थिताः प्रत्यनीकेषु योधाः ॥
          </div>
          <div className="shloka-iast">
            śrī bhagavān uvāca |<br />kālo'smi loka-kṣaya-kṛt pravṛddho lokān samāhartum iha pravṛttaḥ |<br />ṛte'pi tvāṃ na bhaviṣyanti sarve ye'vasthitāḥ pratyanīkeṣu yodhāḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                The Blessed One said: I am Time, grown mighty, destroyer of worlds, here to consume beings. Even without you, none of these warriors arrayed against you will survive.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Why this verse will not let go of readers</div>
              <div className="shloka-insight">
                The truthfulness is the reason. Time is the one fact every human being eventually meets, and no metaphysics can be honest without naming it. The Gita names it here, in the loudest possible way, and uses the naming to do something therapeutic — to remove the illusion that any of us are holding the world together by gripping it.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "What is ending was never in your hands to preserve."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "I am Time, grown great, destroyer of worlds. Even without you, they will not survive."
          </blockquote>
          <cite>Bhagavad Gita 11.32</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 11.33 · Become an Instrument
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="instrument">Nimitta-matram Bhava — Become the Instrument</h2>

        <p>
          If 11.32 is the chapter's hardest verse, 11.33 is its most practical. Krishna says: therefore, rise. Win fame. Conquer your enemies. Enjoy a flourishing kingdom. <em>They have already been slain by me. Become only the instrument, Arjuna.</em> The Sanskrit is <em>nimitta-mātraṃ bhava savya-sācin</em> — be only the instrument.
        </p>

        <p>
          Read this verse outside the immediate war context, and it becomes a working principle for every difficult act. You are not the originator of what is going to happen. You are not the final cause. You are the instrument — present, accountable, attentive — through which a larger pattern moves. This is one of the Gita's most freeing teachings, because it dissolves the most exhausting illusion in adult life: the illusion that you are personally responsible for outcomes you do not control. The work is still yours to do. The outcome was never yours to own.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.33</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            तस्मात्त्वमुत्तिष्ठ यशो लभस्वजित्वा शत्रून् भुङ्क्ष्व राज्यं समृद्धम् ।<br />मयैवैते निहताः पूर्वमेवनिमित्तमात्रं भव सव्यसाचिन् ॥
          </div>
          <div className="shloka-iast">
            tasmāt tvam uttiṣṭha yaśo labhasva jitvā śatrūn bhuṅkṣva rājyaṃ samṛddham |<br />mayaivaite nihatāḥ pūrvam eva nimitta-mātraṃ bhava savya-sācin ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Therefore — rise. Win fame. Conquer the foes and enjoy a flourishing kingdom. They have already been slain by me. Become only the instrument, Arjuna.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The most freeing sentence in the chapter</div>
              <div className="shloka-insight">
                <em>Nimitta-mātraṃ bhava</em> — be only the instrument. This is not a small responsibility. It is, properly understood, almost all the responsibility you can actually carry. The work — done cleanly, attentively, accountably — is yours. The outcome belongs to the larger pattern. Holding both ends of that distinction, at the same time, is the whole spiritual life condensed.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Act fully, but let the larger order carry the result."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.41–11.44 · The Humbling
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="forgiveness">Arjuna's Humbling — and the Request for Forgiveness</h2>

        <p>
          After the vision, Arjuna does something unusual. He apologises. In verses 11.41 to 11.44, he confesses that he had treated Krishna as a friend — calling him casually, joking with him, eating with him — without realizing who Krishna really was. He says: forgive what I have done, as a father forgives a son, as a friend forgives a friend, as a lover forgives a beloved.
        </p>

        <p>
          The honesty here is unusual in spiritual literature. Most religious texts establish the supremacy of the Divine and stop there. The Gita lets Arjuna feel embarrassed about the prior familiarity. Then it does something even more important — it makes clear that the familiarity was not wrong. Krishna will, by the end of the chapter, take back his cosmic form and reappear as the human friend. The vision does not replace the friendship. It enlarges what the friendship has always contained.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.44</span>
            <span className="shloka-speaker">Speaker: Arjuna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            तस्मात्प्रणम्य प्रणिधाय कायंप्रसादये त्वामहमीशमीड्यम् ।<br />पितेव पुत्रस्य सखेव सख्युःप्रियः प्रियायार्हसि देव सोढुम् ॥
          </div>
          <div className="shloka-iast">
            tasmāt praṇamya praṇidhāya kāyaṃ prasādaye tvām aham īśam īḍyam |<br />piteva putrasya sakheva sakhyuḥ priyaḥ priyāyārhasi deva soḍhum ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Therefore, bowing my body down, I seek to please you, the worthy Lord. As a father forgives a son, as a friend forgives a friend, as a lover the beloved — Lord, forgive me.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Real reverence does not erase relationship</div>
              <div className="shloka-insight">
                The three analogies Arjuna reaches for — father, friend, lover — are all intimate. The verse does not say <em>now that I have seen who you really are, I will treat you with distance</em>. It says, please forgive me as someone close to me would forgive me. The cosmic vision does not destroy the closeness. The closeness was always real.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "True reverence asks forgiveness without excuses."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>What the apology models for any reader:</strong> When you have done something that, in hindsight, looks worse than it felt at the time — the move is the same. Bow. Acknowledge. Ask forgiveness without manufacturing reasons. The Gita rewards this exact posture with restoration. Krishna does not punish Arjuna's prior familiarity. He returns to it.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 11.53–11.55 · The Closing
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="devotion">The Final, Gentler Reveal: Only Devotion Sees This</h2>

        <p>
          The chapter ends with a quieter, almost confessional teaching. Krishna says: this form — what you have just seen — cannot be reached by study of the Vedas, by austerity, by charity, or by ritual. It can be reached only by undivided devotion. The verse is, in some ways, a deflation of every transactional path the tradition had offered before. Knowledge alone does not earn this. Discipline alone does not earn this. Generosity alone does not earn this. Only love, undivided, makes the seeing possible.
        </p>

        <p>
          And then comes the verse that ends the chapter, and ends, in some sense, the central teaching of the entire Gita. <em>The one who works for me, takes me as the supreme, is devoted to me, free from attachment, without hatred for any being — comes to me.</em> That is the formula. Work, oriented toward the Divine. Devotion. Non-attachment to outcomes. Non-hatred toward beings. Four ingredients, simple to list, hard to hold together — but together they are the complete recipe. Everything the Gita has been teaching, finally, reduces to this verse.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.53</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            नाहं वेदैर्न तपसा न दानेन न चेज्यया ।<br />शक्य एवंविधो द्रष्टुं दृष्टवानसि मां यथा ॥
          </div>
          <div className="shloka-iast">
            nāhaṃ vedair na tapasā na dānena na cejyayā |<br />śakya evaṃ-vidho draṣṭuṃ dṛṣṭavān asi māṃ yathā ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Not by the Vedas, not by austerity, not by charity, not by ritual sacrifice can I be seen in this form as you have just seen me.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The Gita retires the merit economy</div>
              <div className="shloka-insight">
                Every accumulative path — study, austerity, charity, ritual — is here explicitly named and explicitly insufficient. This is not the Gita rejecting those practices. It is the Gita placing them in their proper rank. They prepare the ground. They do not, by themselves, produce the vision. Only one thing produces the vision, and Krishna names it in the next verse.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The deepest vision comes through devotion, not mere accomplishment."
          </div>
        </div>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 11.55</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            मत्कर्मकृन्मत्परमो मद्भक्तः सङ्गवर्जितः ।<br />निर्वैरः सर्वभूतेषु यः स मामेति पाण्डव ॥
          </div>
          <div className="shloka-iast">
            mat-karma-kṛn mat-paramo mad-bhaktaḥ saṅga-varjitaḥ |<br />nirvairaḥ sarva-bhūteṣu yaḥ sa mām eti pāṇḍava ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                The one who works for me, takes me as the supreme, is devoted to me, is free from attachment, and bears no hostility toward any being — that one comes to me, Pandava.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The five-part formula</div>
              <div className="shloka-insight">
                Work for the Divine. Hold the Divine as supreme. Be devoted. Drop attachment. Hold no enmity. The five elements form a complete spiritual program. Notice that they are not exotic — they are five orientations of an ordinary working life. The Gita's most radical claim, at the end of its most overwhelming chapter, is that the path is not complicated. It is just rare.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Devotion matures into freedom when attachment and hostility are gone."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "Work for me. Take me as supreme. Be devoted. Drop attachment. Hold no enmity. That one comes to me."
          </blockquote>
          <cite>Bhagavad Gita 11.55</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 55 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>11.1</td><td>Arjuna</td><td>Clarity arrives when hidden teaching is finally heard as personal grace</td></tr>
            <tr><td>11.2</td><td>Arjuna</td><td>All change is clear only beside what does not change</td></tr>
            <tr><td>11.3</td><td>Arjuna</td><td>Belief becomes complete only when it wants to see</td></tr>
            <tr><td>11.4</td><td>Arjuna</td><td>Real vision begins when control gives way to asking</td></tr>
            <tr><td>11.5</td><td>Krishna</td><td>The divine cannot be contained in one shape</td></tr>
            <tr><td>11.6</td><td>Krishna</td><td>The familiar universe is only a small part of what Krishna reveals</td></tr>
            <tr><td>11.7</td><td>Krishna</td><td>Everything you seek is already gathered in the divine form</td></tr>
            <tr><td>11.8</td><td>Krishna</td><td>Ordinary sight cannot hold the infinite; grace must widen the eye</td></tr>
            <tr><td>11.9</td><td>Sanjaya</td><td>The answer is not a theory; it arrives as a vision</td></tr>
            <tr><td>11.10</td><td>Sanjaya</td><td>The divine form cannot be held inside one human image</td></tr>
            <tr><td>11.11</td><td>Arjuna</td><td>The divine presence is beautiful, boundless, and impossible to face from one side</td></tr>
            <tr><td>11.12</td><td>Arjuna</td><td>Even the brightest familiar light cannot measure the cosmic form's radiance</td></tr>
            <tr><td>11.13</td><td>Arjuna</td><td>One form can contain the whole universe</td></tr>
            <tr><td>11.14</td><td>Arjuna</td><td>A glimpse of the vast can turn shock into surrender</td></tr>
            <tr><td>11.15</td><td>Arjuna</td><td>The many forms of existence appear within one vast body</td></tr>
            <tr><td>11.16</td><td>Arjuna</td><td>The largest reality has no edge the mind can grasp</td></tr>
            <tr><td>11.17</td><td>Arjuna</td><td>What is most real cannot be fully held by sight</td></tr>
            <tr><td>11.18</td><td>Arjuna</td><td>What appears overwhelming is actually the world's deepest support</td></tr>
            <tr><td>11.19</td><td>Arjuna</td><td>What overwhelms the mind can also dissolve its resistance</td></tr>
            <tr><td>11.20</td><td>Arjuna</td><td>One vision can overwhelm every boundary you thought was real</td></tr>
            <tr><td>11.21</td><td>Arjuna</td><td>Even the highest beings bow when the vast form appears</td></tr>
            <tr><td>11.22</td><td>Arjuna</td><td>Even the highest beings stand astonished before Krishna's vastness</td></tr>
            <tr><td>11.23</td><td>Arjuna</td><td>A vision of total vastness can shake every observer at once</td></tr>
            <tr><td>11.24</td><td>Arjuna</td><td>A true vision can shatter the mind before it can steady it</td></tr>
            <tr><td>11.25</td><td>Arjuna</td><td>True awe ends control and turns the heart toward surrender</td></tr>
            <tr><td>11.26</td><td>Arjuna</td><td>Even the greatest warriors are swallowed by what exceeds them</td></tr>
            <tr><td>11.27</td><td>Arjuna</td><td>All fighters are already being consumed by time</td></tr>
            <tr><td>11.28</td><td>Arjuna</td><td>All motion is already rushing toward its end</td></tr>
            <tr><td>11.29</td><td>Arjuna</td><td>Blind desire runs straight into its own ruin</td></tr>
            <tr><td>11.30</td><td>Arjuna</td><td>Total power leaves no room for control</td></tr>
            <tr><td>11.31</td><td>Arjuna</td><td>Fear bows first, then asks to know what stands before it</td></tr>
            <tr><td>11.32</td><td>Krishna</td><td>What is ending was never in your hands to preserve</td></tr>
            <tr><td>11.33</td><td>Krishna</td><td>Act fully, but let the larger order carry the result</td></tr>
            <tr><td>11.34</td><td>Krishna</td><td>The battle is already decided; your task is only to act</td></tr>
            <tr><td>11.35</td><td>Sanjaya</td><td>Awe can break speech before it becomes prayer</td></tr>
            <tr><td>11.36</td><td>Arjuna</td><td>The divine name can turn fear into devotion and disorder into reverence</td></tr>
            <tr><td>11.37</td><td>Arjuna</td><td>What exceeds all categories naturally draws surrender</td></tr>
            <tr><td>11.38</td><td>Arjuna</td><td>The one you seek is the ground that already holds everything</td></tr>
            <tr><td>11.39</td><td>Arjuna</td><td>All powers and forces bow inside the one you face</td></tr>
            <tr><td>11.40</td><td>Arjuna</td><td>Total awe ends the illusion of separation</td></tr>
            <tr><td>11.41</td><td>Arjuna</td><td>Familiarity without recognition becomes disrespect; awe restores right relation</td></tr>
            <tr><td>11.42</td><td>Arjuna</td><td>Familiarity can hide greatness until awe breaks through</td></tr>
            <tr><td>11.43</td><td>Arjuna</td><td>Recognition of the highest power dissolves all comparison</td></tr>
            <tr><td>11.44</td><td>Arjuna</td><td>True reverence asks forgiveness without excuses</td></tr>
            <tr><td>11.45</td><td>Arjuna</td><td>A vision can awaken joy and fear at once</td></tr>
            <tr><td>11.46</td><td>Arjuna</td><td>The infinite can overwhelm; devotion asks for a form the heart can bear</td></tr>
            <tr><td>11.47</td><td>Krishna</td><td>What is most sacred is seen only by grace</td></tr>
            <tr><td>11.48</td><td>Krishna</td><td>The highest vision cannot be forced; it arrives only through grace</td></tr>
            <tr><td>11.49</td><td>Krishna</td><td>Fear must drop before the deeper vision can be seen</td></tr>
            <tr><td>11.50</td><td>Sanjaya</td><td>A vision can shake you; compassion brings you back</td></tr>
            <tr><td>11.51</td><td>Arjuna</td><td>Gentleness restores the mind after overwhelming awe</td></tr>
            <tr><td>11.52</td><td>Krishna</td><td>The vision Arjuna saw is beyond ordinary access, even for radiant beings</td></tr>
            <tr><td>11.53</td><td>Krishna</td><td>The deepest vision comes through devotion, not mere accomplishment</td></tr>
            <tr><td>11.54</td><td>Krishna</td><td>Undivided devotion reaches what effort cannot</td></tr>
            <tr><td>11.55</td><td>Krishna</td><td>Devotion matures into freedom when attachment and hostility are gone</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-10" className="ch-nav-title">Chapter 10 — Vibhuti Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-12" className="ch-nav-title">Chapter 12 — Bhakti Yoga</a>
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
            <div className="faq-q">What is Bhagavad Gita Chapter 11 about?</div>
            <div className="faq-a">
              Chapter 11, called Vishwarupa Darshana Yoga (the Yoga of the Vision of the Cosmic Form), is the dramatic climax of the Bhagavad Gita. Arjuna asks to see Krishna's universal form. Krishna grants him divine sight and shows him the cosmic body — a vision of infinite arms, infinite mouths, beings being consumed by time. The chapter contains the famous 'thousand suns' verse (11.12), the line 'I am Time, the destroyer of worlds' (11.32), and the closing teaching that only undivided devotion can reach this vision (11.53-55).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the meaning of Bhagavad Gita 11.32?</div>
            <div className="faq-a">
              Verse 11.32 — <em>kālo'smi loka-kṣaya-kṛt pravṛddhaḥ</em> — translates as 'I am Time, grown mighty, the destroyer of worlds.' Krishna identifies himself as Time itself, the most absolute reaping force. The verse goes on to say that even without Arjuna, the warriors arrayed against him will not survive. The teaching, beyond the war context, is that whatever you fear losing is already loosening from your grip — not because of failure, but because Time is what Time is.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the 'thousand suns' verse in the Bhagavad Gita?</div>
            <div className="faq-a">
              Verse 11.12 says, 'If a thousand suns were to rise at once in the sky, their light might begin to compare with the radiance of that Great Self.' The verse is Arjuna's attempt to describe the cosmic form and his admission that even the maximum comparison ordinary imagination can produce does not reach. The verse is famously known outside the tradition because Robert Oppenheimer reached for it when describing the first atomic bomb detonation.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'nimitta matram bhava' mean?</div>
            <div className="faq-a">
              In verse 11.33, Krishna tells Arjuna, '<em>nimitta-mātraṃ bhava savya-sācin</em>' — 'become only the instrument, Arjuna.' The teaching is that Arjuna is not the originator of what is going to unfold on the battlefield. The war is already decided by a larger order. His task is to be a clean instrument — present, accountable, attentive — through which the unfolding moves. The verse extends beyond the war context to every difficult action: the work is yours; the outcome was never yours to own.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the universal form (Vishwarupa) in the Bhagavad Gita?</div>
            <div className="faq-a">
              The <em>vishwarupa</em> or universal form is Krishna's cosmic body — the form in which the entire universe is contained. Arjuna sees it in Chapter 11 after asking for direct vision. The form has infinite arms, infinite eyes, mouths like blazing fire, and contains all beings within it. It is the Gita's most overwhelming theophany. The form cannot be perceived with ordinary eyes — Krishna gives Arjuna divine sight specifically to behold it.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Why did Arjuna apologise to Krishna in Chapter 11?</div>
            <div className="faq-a">
              After the cosmic vision, in verses 11.41-44, Arjuna apologises for having treated Krishna with casual familiarity — calling him by name, joking with him, eating with him — without realising who he truly was. He asks Krishna to forgive him as a father forgives a son, as a friend forgives a friend, as a lover forgives a beloved. The teaching is that real reverence does not destroy relationship; the friendship was always real, and the cosmic vision only enlarged what it had been holding all along.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about fear, death and impermanence</div>
          </a>
          <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">The Gita as a story — the climax</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-10" className="related-card">
            <div className="related-card-label">Chapter 10</div>
            <div className="related-card-title">Vibhuti Yoga — Sparks of the Divine</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-12" className="related-card">
            <div className="related-card-label">Chapter 12</div>
            <div className="related-card-title">Bhakti Yoga — How a Devotee Actually Lives</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-15" className="related-card">
            <div className="related-card-label">Chapter 15</div>
            <div className="related-card-title">Purushottama Yoga — Cut the Tree, Find the Source</div>
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

      <BlogTracker pageName="Bhagwat Geeta Chapter 11" />
    </>
  )
}
