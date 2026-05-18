import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import MobileNavToggle from '@/components/MobileNavToggle'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 9 (Raja Vidya Yoga) — Summary",
  description: "Bhagavad Gita Chapter 9 — Raja Vidya Raja Guhya Yoga. All 34 verses on the king of knowledge, leaf-flower-fruit-water, and 'my devotee never perishes.'",
  keywords: "bhagwat geeta chapter 9, bhagavad gita raja vidya raja guhya yoga, bhagwat geeta adhyay 9, patram pushpam phalam toyam, my devotee never perishes, 9.22 yogakshemam vahamyaham, sudurachara gita, easy bhakti gita, Raja Vidya Raja Guhya Yoga meaning, patram pushpam phalam toyam meaning, Bhagavad Gita 9.22 yoga kshema vahamy aham, Bhagavad Gita 9.30 sudurachara meaning, my devotee never perishes Bhagavad Gita, sarva dharman parityajya mam ekam",
  openGraph: {
    title: "Bhagavad Gita Chapter 9 (Raja Vidya Raja Guhya) — All Verses",
    description: "Bhagavad Gita Chapter 9 — the royal secret. Leaf, flower, fruit, water. And 'my devotee never perishes' (9.31).",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter9.webp", width: 1200, height: 675, alt: "A simple offering — leaf, flower, fruit, water — held with devotion. Chapter 9 of the Bhagavad Gita, Raja Vidya Raja Guhya Yoga, teaches that the highest knowledge is also the most accessible." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 9 (Raja Vidya Raja Guhya) — All Verses",
    description: "Bhagavad Gita Chapter 9 — the royal secret. Leaf, flower, fruit, water. And 'my devotee never perishes' (9.31).",
    images: ["https://wisdomquotes.in/assets/chapter9.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-8", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10" },
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
        content: "अध्याय ९";
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
      .app-cta::before { content: "गुह्य"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 9 — Raja Vidya Raja Guhya Yoga: The Royal Secret",
    "description": "Bhagavad Gita Chapter 9 — Raja Vidya Raja Guhya Yoga. All 34 verses on the king of knowledge, leaf-flower-fruit-water, and 'my devotee never perishes.'",
    "alternativeHeadline": "Bhagavad Gita Chapter 9 (Raja Vidya Raja Guhya) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter9.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9"
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
    "keywords": "bhagwat geeta chapter 9, bhagavad gita raja vidya raja guhya yoga, bhagwat geeta adhyay 9, patram pushpam phalam toyam, my devotee never perishes, 9.22 yogakshemam vahamyaham, sudurachara gita, easy bhakti gita, Raja Vidya Raja Guhya Yoga meaning, patram pushpam phalam toyam meaning, Bhagavad Gita 9.22 yoga kshema vahamy aham, Bhagavad Gita 9.30 sudurachara meaning, my devotee never perishes Bhagavad Gita, sarva dharman parityajya mam ekam",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2942,
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
        "name": "Bhagavad Gita Chapter 9 — Raja Vidya Raja Guhya Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 9 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 9, called Raja Vidya Raja Guhya Yoga (the Yoga of the Royal Knowledge and Royal Secret), is the Gita's pivot into bhakti — devotion. Krishna announces that he is now going to reveal the king of all knowledge and king of all secrets, and then surprises Arjuna by describing this highest teaching as supremely easy to practice. The chapter contains 'I hold everything but am not held by anything' (9.4), the leaf-flower-fruit-water teaching (9.26), 'whatever you do, offer it to me' (9.27), and the famous promise — 'my devotee never perishes' (9.31)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the meaning of patram pushpam phalam toyam (Gita 9.26)?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 9.26 says, 'Whoever offers me a leaf, a flower, a fruit, or water with devotion, I accept that devoted offering from one whose heart is pure.' The verse is one of the most democratising teachings in any religious text. The object of the offering — leaf, flower, fruit, water — is humble on purpose. What matters is not the cost, but the love. A person of any economic state, in any place, can fulfil the entire condition. The Gita is rejecting any model where access to the Divine requires wealth or ritual complexity."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'my devotee never perishes' mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 9.31, Krishna tells Arjuna to declare publicly — na me bhaktaḥ praṇaśyati — my devotee never perishes. The promise is that one who has wholeheartedly turned toward the Divine cannot be finally destroyed by their past, their circumstances, or their fear. The verse is preceded by 9.30, which says even a person of very poor conduct who turns with undivided devotion is to be considered righteous. The two verses together form the Gita's most generous statement on spiritual access."
        }
      },
      {
        "@type": "Question",
        "name": "What is yoga-kshema in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 9.22, Krishna says, 'For those whose minds are wholly on me, I carry their yoga-kshema.' Yoga here means acquisition — bringing what is not yet present. Kshema means preservation — protecting what already is. Together they cover the whole of material concern. The verse is saying that the mind that is undivided is met with a kind of providential support — what is needed is brought, what is held is preserved."
        }
      },
      {
        "@type": "Question",
        "name": "Why does Chapter 9 say the highest knowledge is 'easy to practice'?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 9.2 calls this teaching su-sukhaṃ kartum — supremely easy to practice — alongside calling it the king of knowledge and the king of secrets. The Gita is making a structural claim: the highest truth is not difficult because it is hidden. It is difficult because the noise has to be turned down enough to hear it. Once the orientation shifts, the practice becomes natural rather than effortful. Chapter 9 is the chapter where this becomes most explicit."
        }
      },
      {
        "@type": "Question",
        "name": "What does the four-imperative verse (9.34) mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 9.34 — man-manā bhava mad-bhakto mad-yājī māṃ namaskuru — gives four imperatives that cover thought, feeling, action, and posture. Fix the mind on me. Be devoted to me. Worship me. Bow to me. The Gita repeats this verse, nearly word-for-word, at 18.65, making it the book's signature closing instruction. The teaching is about total orientation — when attention, love, action, and respect all point one way, the path is already being walked."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.2",
    "text": "This is the king of knowledge, the king of secrets, supremely pure. It is directly knowable, in accord with dharma, supremely easy to practice, and imperishable.",
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
      "name": "Bhagavad Gita, Chapter 9, Verse 2"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "राजविद्या राजगुह्यं पवित्रमिदमुत्तमम् । / प्रत्यक्षावगमं धर्म्यं सुसुखं कर्तुमव्ययम् ॥",
      "rāja-vidyā rāja-guhyaṃ pavitram idam uttamam | / pratyakṣāvagamaṃ dharmyaṃ susukhaṃ kartum avyayam ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.2"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.22",
    "text": "For those whose minds are wholly on me, who worship me always — those who are constantly united with me — I bear their yoga and kshema. I bring them what they lack; I preserve what they have.",
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
      "name": "Bhagavad Gita, Chapter 9, Verse 22"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते । / तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥",
      "ananyāś cintayanto māṃ ye janāḥ paryupāsate | / teṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.22"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.26",
    "text": "Whoever offers me a leaf, a flower, a fruit, or water with devotion — I accept that devoted offering from one whose heart is pure.",
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
      "name": "Bhagavad Gita, Chapter 9, Verse 26"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति । / तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥",
      "patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati | / tad ahaṃ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.26"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.27",
    "text": "Whatever you do, whatever you eat, whatever you offer, whatever you give, whatever discipline you practice — Arjuna, do it as an offering to me.",
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
      "name": "Bhagavad Gita, Chapter 9, Verse 27"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् । / यत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् ॥",
      "yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat | / yat tapasyasi kaunteya tat kuruṣva mad-arpaṇam ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.27"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.31",
    "text": "Such a person quickly becomes a soul of dharma and attains lasting peace. Arjuna, declare it openly — my devotee never perishes.",
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
      "name": "Bhagavad Gita, Chapter 9, Verse 31"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "क्षिप्रं भवति धर्मात्मा शश्वच्छान्तिं निगच्छति । / कौन्तेय प्रतिजानीहि न मे भक्तः प्रणश्यति ॥",
      "kṣipraṃ bhavati dharmātmā śaśvac-chāntiṃ nigacchati | / kaunteya pratijānīhi na me bhaktaḥ praṇaśyati ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.31"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.34",
    "text": "Fix your mind on me, be devoted to me, worship me, bow to me. United with me in this way, fully oriented toward me, you will come to me.",
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
      "name": "Bhagavad Gita, Chapter 9, Verse 34"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु । / मामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः ॥",
      "man-manā bhava mad-bhakto mad-yājī māṃ namaskuru | / mām evaiṣyasi yuktvaivam ātmānaṃ mat-parāyaṇaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9#verse-9.34"
  }
]

export default function ChapterPage9() {
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
          Bhagavad Gita Chapter 9
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 9 · 34 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 9 (Adhyay 9) —<br />
            <em>Raja Vidya Raja Guhya Yoga</em>
          </h1>
          <p className="article-subtitle">
            The chapter where Krishna pulls the curtain back. The king of knowledge, the king of secrets. Pure, livable, immediate. The leaf, the flower, the fruit, the water. And the most generous claim in the Gita: my devotee never perishes.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">34 verses · Raja Vidya Raja Guhya Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~13 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 9 of 18</span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <div className="article-wrap">
        <article className="prose">
          <figure className="chapter-image">
            <img
              src="/assets/chapter9.webp"
              alt="A simple offering — leaf, flower, fruit, water — held with devotion. Chapter 9 of the Bhagavad Gita, Raja Vidya Raja Guhya Yoga, teaches that the highest knowledge is also the most accessible."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 9 is the chapter where the Bhagavad Gita pulls the curtain back. After eight chapters of philosophical preparation — duty, renunciation, action, meditation, the metaphysics of the two natures, the imperishable Brahman — Krishna now turns to Arjuna and says, in effect: now I will tell you the royal secret. <em>Rāja-vidyā, rāja-guhya</em>. The king of all knowledge, the king of all secrets. And then he describes that secret in a way that surprises everyone who has been bracing for difficulty. The royal secret is not complicated. It is not reserved for the highly trained. It is, in his exact words, <em>su-sukhaṃ kartum</em> — supremely easy to practice.
        </p>

        <p>
          This is the structural pivot of the Gita. Chapter 8 ended with a quiet redirection away from transactional spiritual merit. Chapter 9 follows immediately with the simplest practice in the entire book — bring me a leaf, a flower, a fruit, water, offered with love, and I will accept it. Across thirty-four verses, Krishna will say things that have shaped Hindu devotional life for two thousand years. That he holds everything but is held by nothing. That undivided devotion is met by unwavering protection. That even a flawed person who turns wholeheartedly toward the Divine is to be considered righteous. And finally, the line that has consoled more sufferers than possibly any other in the book: <em>my devotee never perishes</em>.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#royal-secret">The royal secret — supremely easy</a></li>
            <li><a href="#holds-not-held">Holding everything, held by nothing — 9.4</a></li>
            <li><a href="#plain-form">Why ordinary form hides the supreme</a></li>
            <li><a href="#yoga-kshema">What I bear for my devotee — 9.22</a></li>
            <li><a href="#simple-offering">Leaf, flower, fruit, water — 9.26</a></li>
            <li><a href="#everything-offering">Whatever you do — make it an offering</a></li>
            <li><a href="#devotee-never-perishes">Even the flawed one, even the broken one</a></li>
            <li><a href="#man-mana">Fix the mind on me — the chapter's final word</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 9.1–9.2 · The Royal Secret
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="royal-secret">The Highest Knowledge Is Also the Easiest to Live</h2>

        <p>
          Chapter 9 begins with a promise that quietly upends a lot of received spiritual culture. Krishna calls this teaching the king of all knowledge — and then he describes it with words that no other tradition typically uses for highest truth. He says it is <em>pavitram</em> — pure. <em>Pratyakṣa-avagamam</em> — directly knowable, immediately experienceable. <em>Dharmyam</em> — aligned with right living. <em>Su-sukhaṃ kartum</em> — supremely easy to practice. And <em>avyayam</em> — imperishable.
        </p>

        <p>
          Notice what Krishna is doing with this list. He is dismantling, in advance, every argument for why the deepest truth must be hard, hidden, reserved for the long-disciplined. The Gita's most exalted teaching is announced as the most accessible. This is not anti-discipline — the previous chapter spent twenty-eight verses on training the mind. It is a statement that the destination of the discipline, once reached, turns out to have been close to home all along.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.2</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            राजविद्या राजगुह्यं पवित्रमिदमुत्तमम् ।<br />प्रत्यक्षावगमं धर्म्यं सुसुखं कर्तुमव्ययम् ॥
          </div>
          <div className="shloka-iast">
            rāja-vidyā rāja-guhyaṃ pavitram idam uttamam |<br />pratyakṣāvagamaṃ dharmyaṃ susukhaṃ kartum avyayam ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                This is the king of knowledge, the king of secrets, supremely pure. It is directly knowable, in accord with dharma, supremely easy to practice, and imperishable.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Five qualities that change the conversation</div>
              <div className="shloka-insight">
                Three of the five adjectives are the surprise. <em>Pratyakṣa-avagamam</em> — you can verify this in your own experience. <em>Dharmyam</em> — it does not contradict your duties. <em>Su-sukhaṃ kartum</em> — it is easy to practice. The Gita's highest teaching is not a hidden esoteric. It is what becomes available once the noise has been turned down enough to hear it.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The highest truth is both profound and simple to live."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "The king of knowledge, the king of secrets — pure, directly knowable, and supremely easy to practice."
          </blockquote>
          <cite>Bhagavad Gita 9.2</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 9.4 · Holding, Not Held
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="holds-not-held">I Hold the Universe, But the Universe Doesn't Hold Me</h2>

        <p>
          Verse 9.4 contains a metaphysical claim that takes most readers two or three rereadings to understand. Krishna says: all this universe is pervaded by my unmanifest form. All beings dwell in me. <em>But I do not dwell in them.</em> The grammar is the surprise. The verse asserts immanence — beings are in the Divine — and immediately denies the reverse. The Divine is not contained in beings, even though they are contained in the Divine.
        </p>

        <p>
          Western theological categories struggle with this. It is not pantheism (God = everything). It is not classical theism (God is separate from everything). It is what the Vaishnava tradition would later call <em>achintya-bheda-abheda</em> — inconceivable simultaneous difference and non-difference. The image is asymmetric. The container is in you, but you are not in the container. Practically, this lets the Gita say two things that other traditions have to choose between: everything is sacred, and the sacred is not exhausted by everything.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.4</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            मया ततमिदं सर्वं जगदव्यक्तमूर्तिना ।<br />मत्स्थानि सर्वभूतानि न चाहं तेष्ववस्थितः ॥
          </div>
          <div className="shloka-iast">
            mayā tatam idaṃ sarvaṃ jagad avyakta-mūrtinā |<br />mat-sthāni sarva-bhūtāni na cāhaṃ teṣv avasthitaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                All this world is pervaded by my unmanifest form. All beings dwell in me. But I am not contained in them.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What the asymmetry buys us</div>
              <div className="shloka-insight">
                If God were exhausted by the world, the world's suffering would be God's defeat. If God were entirely separate from the world, the world's suffering would not be God's concern. The Gita's asymmetric position lets the Divine be intimate with all suffering without being defeated by it. Every being is held. Nothing held diminishes the holder.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The supreme reality holds everything without being held by anything."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 9.11 · The Plain Form
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="plain-form">Why People Miss the Supreme: Because the Supreme Looks Ordinary</h2>

        <p>
          Verse 9.11 is one of the Gita's most psychologically realistic moments. Krishna says, with a kind of resigned honesty: fools dismiss me when I take a human form, not knowing my higher nature. The verse is not just about Krishna's particular incarnation. It is a general observation about how perception works. We dismiss the ordinary because it is ordinary. We expect the sacred to be unmistakable — accompanied by signs, framed by formality, evidently special. When the sacred shows up looking like a slightly tired man in a chariot, we miss it.
        </p>

        <p>
          This is the Gita's reply to the persistent human appetite for spiritual spectacle. The Divine is not failing to appear. It is appearing in forms our perception has trained itself to ignore. The teacher in the next room. The grieving parent in the elevator. The slightly worn-out friend who keeps showing up. Verse 9.11 is asking you, with some patience, to look again at the ordinary, because the ordinary is where the Divine has chosen to live.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.11</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            अवजानन्ति मां मूढा मानुषीं तनुमाश्रितम् ।<br />परं भावमजानन्तो मम भूतमहेश्वरम् ॥
          </div>
          <div className="shloka-iast">
            avajānanti māṃ mūḍhā mānuṣīṃ tanum āśritam |<br />paraṃ bhāvam ajānanto mama bhūta-maheśvaram ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Fools dismiss me when I am clothed in human form, not knowing my higher nature as the great Lord of all beings.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The verse is about you, not about Krishna</div>
              <div className="shloka-insight">
                The accusation in this verse is not at people two thousand years ago who missed Krishna in person. It is at every reader who is currently mistaking the ordinary surface of their life for the whole of it. The Divine is not hiding. We are looking at it without recognising it.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Ordinary appearance can hide the highest reality."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>What this looks like in practice:</strong> You decide a person isn't worth your full attention because they look unremarkable. You decide a task isn't worth your full presence because it isn't important enough. You decide a moment isn't worth your full awareness because it's just a Wednesday afternoon. The Gita says each of these decisions is a small loss. The Wednesday afternoon is what you were given. The unremarkable person is who showed up.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 9.22 · What I Bear for My Devotee
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="yoga-kshema">Yoga-kshema: The Most Tender Promise in the Gita</h2>

        <p>
          Verse 9.22 is, depending on the reader, either the most consoling or the most distrusted verse in the Gita. Krishna says: those who think of me alone, who worship with unwavering focus — for them, I carry both <em>yoga</em> (what they don't have) and <em>kṣema</em> (what they already have). I bring them what they need; I preserve what they hold.
        </p>

        <p>
          Modern readers often hesitate at this verse. It can sound like a transactional promise — believe hard enough, and the universe will provide. That is not the verse's structure. The condition is not belief. The condition is undivided attention. <em>Ananyāś cintayanto</em> — those who think of me without thinking of anything else. This is rare. Most prayer is hedged with backup plans. The verse is describing the unhedged state — and saying that, in that state, the providing happens. Whether it is a metaphysical promise or a psychological observation, the verse names something real: the mind that is not splitting itself between God and Plan B is met differently than the one that is.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.22</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते ।<br />तेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥
          </div>
          <div className="shloka-iast">
            ananyāś cintayanto māṃ ye janāḥ paryupāsate |<br />teṣāṃ nityābhiyuktānāṃ yoga-kṣemaṃ vahāmy aham ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                For those whose minds are wholly on me, who worship me always — those who are constantly united with me — I bear their yoga and kshema. I bring them what they lack; I preserve what they have.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The two words that carry the verse</div>
              <div className="shloka-insight">
                <em>Yoga</em> here means acquisition — bringing what is not yet present. <em>Kṣema</em> means protection — preserving what already is. Together they cover the whole of material concern. The verse is saying: when the mind is undivided, the part of you that was anxiously managing acquisition and preservation can rest. Something else takes over the carrying.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Unwavering devotion is met by unwavering support."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "For those whose minds rest entirely in me — I carry what they lack and preserve what they hold."
          </blockquote>
          <cite>Bhagavad Gita 9.22</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 9.26 · The Simple Offering
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="simple-offering">Leaf, Flower, Fruit, Water — The Cheapest Offering Wins</h2>

        <p>
          Verse 9.26 has shaped two thousand years of Hindu devotional life. Krishna says: whoever offers me a leaf, a flower, a fruit, or water — with devotion — I accept it from the pure-hearted. The list is deliberately humble. Leaf. Flower. Fruit. Water. Things any person, anywhere, in any economic state, can find. The Gita is making an inclusivity claim long before anyone called it that. Devotion is not a luxury good.
        </p>

        <p>
          Notice the structure of the verse. The object offered is almost irrelevant. The qualifier is everything. <em>Bhaktyā prayacchati</em> — offered with devotion. <em>Prayatātmanaḥ</em> — from a sincere heart. The cost is measured in love, not in the value of the item. A glass of water given with full presence is more complete, in this scheme, than an elaborate ritual performed mechanically. The verse is a permanent rebuke to spiritual showmanship.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.26</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति ।<br />तदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥
          </div>
          <div className="shloka-iast">
            patraṃ puṣpaṃ phalaṃ toyaṃ yo me bhaktyā prayacchati |<br />tad ahaṃ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Whoever offers me a leaf, a flower, a fruit, or water with devotion — I accept that devoted offering from one whose heart is pure.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Why this verse democratised Indian spirituality</div>
              <div className="shloka-insight">
                Before this verse, complex Vedic rituals were the prevailing model of religious access. After this verse, the model widens. The widow in a small village offering a flower is engaged in the same act, with the same standing, as the priest performing the elaborate sacrifice. The cost is leveled. The Divine is reachable through what is at hand.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "A small offering becomes complete when devotion fills it."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 9.27 · Make Everything an Offering
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="everything-offering">Whatever You Do — Offer It</h2>

        <p>
          If verse 9.26 widens the door, verse 9.27 widens it further. Krishna says: whatever you do, whatever you eat, whatever you offer, whatever you give, whatever austerity you perform — offer all of it to me. The verse closes any remaining gap between sacred action and ordinary action. There is no longer a category of activity outside the field of offering. Everything goes in.
        </p>

        <p>
          Read literally, this is a transformation of how a life can feel. The work email is an offering. The meal is an offering. The difficult conversation is an offering. None of these become magically pleasant by being offered. But they stop being yours alone. The weight changes. You are no longer carrying the day to extract benefit from it; you are passing it through your hands toward something larger. This is the practical content of <em>karma yoga</em>, and Chapter 9 is where the practice gets named most directly.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.27</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            यत्करोषि यदश्नासि यज्जुहोषि ददासि यत् ।<br />यत्तपस्यसि कौन्तेय तत्कुरुष्व मदर्पणम् ॥
          </div>
          <div className="shloka-iast">
            yat karoṣi yad aśnāsi yaj juhoṣi dadāsi yat |<br />yat tapasyasi kaunteya tat kuruṣva mad-arpaṇam ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Whatever you do, whatever you eat, whatever you offer, whatever you give, whatever discipline you practice — Arjuna, do it as an offering to me.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The shift from doing to offering</div>
              <div className="shloka-insight">
                <em>Mad-arpaṇam</em> — "offered to me." The verse does not change the activity. It changes the direction. Same email, same meal, same conversation — but the question is no longer just what will it get me. The question is also who is this for. A life directed outside itself stops feeling like a chase and starts feeling like a service.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Every action becomes complete when it is offered."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>A working practice from 9.27:</strong> Before the next task, take three seconds to mentally say — I do this as an offering. Then do it as you would have done it anyway. After a week, the practice becomes unnecessary because the orientation has shifted. The doing has quietly become offering. The day starts being lighter.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 9.30–9.31 · Even the Flawed One
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="devotee-never-perishes">Even the Person of Bad Conduct — If They Turn</h2>

        <p>
          Verses 9.30 and 9.31 are some of the most generous in the entire Gita, and they are sometimes the most controversial. Krishna says: even a person of very bad conduct, if they worship me with undivided devotion, is to be considered righteous, because their resolve is rightly made. They quickly become a person of dharma, and they attain lasting peace. And then comes the line: <em>na me bhaktaḥ praṇaśyati</em> — my devotee never perishes.
        </p>

        <p>
          Read carelessly, this can sound like a cheap absolution. Read carefully, it is one of the most morally serious claims in the book. The verse is not saying past conduct doesn't matter. It is saying the direction of the soul matters more than its history. A clean turning — not a cleaner past — is what is required. The verse is the Gita's most explicit rejection of the idea that anyone is too far gone to begin. The door is open from where you are now.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.30</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            अपि चेत्सुदुराचारो भजते मामनन्यभाक् ।<br />साधुरेव स मन्तव्यः सम्यग्व्यवसितो हि सः ॥
          </div>
          <div className="shloka-iast">
            api cet sudurācāro bhajate mām ananya-bhāk |<br />sādhur eva sa mantavyaḥ samyag vyavasito hi saḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Even if a person of very poor conduct turns to me with undivided devotion, they are to be regarded as righteous — for their resolve is rightly placed.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What the verse is and isn't saying</div>
              <div className="shloka-insight">
                The verse is not saying conduct doesn't matter. It is saying that a wholehearted turn outranks accumulated wrong. The condition is <em>ananya-bhāk</em> — undivided, not partial, not strategic. The verse rewards orientation, not history. This is good news for anyone who has ever wondered if they are too late.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Undivided devotion can outweigh even a deeply flawed life."
          </div>
        </div>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.31</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            क्षिप्रं भवति धर्मात्मा शश्वच्छान्तिं निगच्छति ।<br />कौन्तेय प्रतिजानीहि न मे भक्तः प्रणश्यति ॥
          </div>
          <div className="shloka-iast">
            kṣipraṃ bhavati dharmātmā śaśvac-chāntiṃ nigacchati |<br />kaunteya pratijānīhi na me bhaktaḥ praṇaśyati ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Such a person quickly becomes a soul of dharma and attains lasting peace. Arjuna, declare it openly — my devotee never perishes.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The line that carries the chapter</div>
              <div className="shloka-insight">
                <em>Na me bhaktaḥ praṇaśyati.</em> My devotee never perishes. The verb is in the present tense. It is a structural claim about how the universe is set up. The one who has turned wholeheartedly toward the Divine cannot be finally destroyed — by their past, by their circumstances, by their fear. The Gita asks Arjuna to <em>declare</em> this — to take it seriously enough to say out loud.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Devotion quickly changes a person and protects them from ruin."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "Declare it openly, Arjuna — my devotee never perishes."
          </blockquote>
          <cite>Bhagavad Gita 9.31</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 9.34 · The Closing Instruction
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="man-mana">Fix the Mind, Be Devoted, Worship, Bow — The Total Orientation</h2>

        <p>
          Chapter 9 ends with the verse that becomes the Gita's signature closing instruction. It will be repeated, almost word for word, at the very end of the book in 18.65. <em>Man-manā bhava mad-bhakto mad-yājī māṃ namaskuru</em>. Fix the mind on me. Be devoted to me. Worship me. Bow to me. Four imperatives, all pointing in one direction. The verse asks for total orientation — attention, feeling, action, posture — all aligned.
        </p>

        <p>
          Why does this become the closing of so many of the Gita's chapters? Because it is the Gita's compressed practice. Strip away the philosophy, the metaphysics, the long debates about action and renunciation — and what remains is this. Where is your attention going? Where is your love going? Where are your actions going? Where is your respect going? If all four are pointing one way, the rest follows. The royal secret of Chapter 9 is, finally, this orientation.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 9.34</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            मन्मना भव मद्भक्तो मद्याजी मां नमस्कुरु ।<br />मामेवैष्यसि युक्त्वैवमात्मानं मत्परायणः ॥
          </div>
          <div className="shloka-iast">
            man-manā bhava mad-bhakto mad-yājī māṃ namaskuru |<br />mām evaiṣyasi yuktvaivam ātmānaṃ mat-parāyaṇaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Fix your mind on me, be devoted to me, worship me, bow to me. United with me in this way, fully oriented toward me, you will come to me.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Four imperatives, one direction</div>
              <div className="shloka-insight">
                Most spiritual instructions are about specific techniques. This verse is about direction. The four verbs cover thought (<em>manā</em>), feeling (<em>bhakta</em>), action (<em>yājī</em>), and posture (<em>namaskuru</em>). If all four are aligned, the path is already being walked. The Gita is condensing eighteen chapters into one verse — and it does so by pointing at orientation, not at technique.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Total orientation toward the divine becomes the way to reach the divine."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 34 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>9.1</td><td>Krishna</td><td>The deepest truth frees only a heart that does not resist it</td></tr>
            <tr><td>9.2</td><td>Krishna</td><td>The highest truth is both profound and simple to live</td></tr>
            <tr><td>9.3</td><td>Krishna</td><td>Without trust, the highest teaching cannot carry you beyond repetition</td></tr>
            <tr><td>9.4</td><td>Krishna</td><td>The supreme reality holds everything without being held by anything</td></tr>
            <tr><td>9.5</td><td>Krishna</td><td>The supreme reality sustains all beings without being contained by them</td></tr>
            <tr><td>9.6</td><td>Krishna</td><td>What moves everywhere still rests in the divine</td></tr>
            <tr><td>9.7</td><td>Krishna</td><td>What seems like ending is only a return before another beginning</td></tr>
            <tr><td>9.8</td><td>Krishna</td><td>Life unfolds through a power larger than individual will</td></tr>
            <tr><td>9.9</td><td>Krishna</td><td>Action can continue without leaving a chain behind</td></tr>
            <tr><td>9.10</td><td>Krishna</td><td>Change is not chaotic; it unfolds within a higher order</td></tr>
            <tr><td>9.11</td><td>Krishna</td><td>Ordinary appearance can hide the highest reality</td></tr>
            <tr><td>9.12</td><td>Krishna</td><td>A confused mind turns even hope, effort, and learning into waste</td></tr>
            <tr><td>9.13</td><td>Krishna</td><td>True devotion begins when the mind recognises the imperishable source</td></tr>
            <tr><td>9.14</td><td>Krishna</td><td>Steady devotion becomes a life of continual remembrance</td></tr>
            <tr><td>9.15</td><td>Krishna</td><td>The same reality can be approached as one, many, or all-encompassing</td></tr>
            <tr><td>9.16</td><td>Krishna</td><td>All sacred action is already filled with the divine presence</td></tr>
            <tr><td>9.17</td><td>Krishna</td><td>All sources of life and meaning are gathered in Krishna</td></tr>
            <tr><td>9.18</td><td>Krishna</td><td>Everything rests in one imperishable source</td></tr>
            <tr><td>9.19</td><td>Krishna</td><td>Opposites do not stand outside the divine; they flow from it</td></tr>
            <tr><td>9.20</td><td>Krishna</td><td>Rewarded devotion still keeps you bound to return</td></tr>
            <tr><td>9.21</td><td>Krishna</td><td>What is won by wanting is lost by time</td></tr>
            <tr><td>9.22</td><td>Krishna</td><td>Unwavering devotion is met by unwavering support</td></tr>
            <tr><td>9.23</td><td>Krishna</td><td>All sincere worship reaches the one reality, even when the form is confused</td></tr>
            <tr><td>9.24</td><td>Krishna</td><td>Every offering matters only when you know who receives it</td></tr>
            <tr><td>9.25</td><td>Krishna</td><td>Devotion does not stay abstract; it carries you to its chosen end</td></tr>
            <tr><td>9.26</td><td>Krishna</td><td>A small offering becomes complete when devotion fills it</td></tr>
            <tr><td>9.27</td><td>Krishna</td><td>Every action becomes complete when it is offered</td></tr>
            <tr><td>9.28</td><td>Krishna</td><td>Freedom begins when even the result is no longer yours to carry</td></tr>
            <tr><td>9.29</td><td>Krishna</td><td>Equality is universal; intimacy is born through devotion</td></tr>
            <tr><td>9.30</td><td>Krishna</td><td>Undivided devotion can outweigh even a deeply flawed life</td></tr>
            <tr><td>9.31</td><td>Krishna</td><td>Devotion quickly changes a person and protects them from ruin</td></tr>
            <tr><td>9.32</td><td>Krishna</td><td>No birth or status can block one who takes refuge</td></tr>
            <tr><td>9.33</td><td>Krishna</td><td>What does not last cannot finally satisfy; turn your life toward the divine</td></tr>
            <tr><td>9.34</td><td>Krishna</td><td>Total orientation toward the divine becomes the way to reach the divine</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-8" className="ch-nav-title">Chapter 8 — Akshara Brahma Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-10" className="ch-nav-title">Chapter 10 — Vibhuti Yoga</a>
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
            <div className="faq-q">What is Bhagavad Gita Chapter 9 about?</div>
            <div className="faq-a">
              Chapter 9, called Raja Vidya Raja Guhya Yoga (the Yoga of the Royal Knowledge and Royal Secret), is the Gita's pivot into bhakti — devotion. Krishna announces that he is now going to reveal the king of all knowledge and king of all secrets, and then surprises Arjuna by describing this highest teaching as supremely easy to practice. The chapter contains 'I hold everything but am not held by anything' (9.4), the leaf-flower-fruit-water teaching (9.26), 'whatever you do, offer it to me' (9.27), and the famous promise — 'my devotee never perishes' (9.31).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the meaning of patram pushpam phalam toyam (Gita 9.26)?</div>
            <div className="faq-a">
              Verse 9.26 says, 'Whoever offers me a leaf, a flower, a fruit, or water with devotion, I accept that devoted offering from one whose heart is pure.' The verse is one of the most democratising teachings in any religious text. The object of the offering — leaf, flower, fruit, water — is humble on purpose. What matters is not the cost, but the love. A person of any economic state, in any place, can fulfil the entire condition. The Gita is rejecting any model where access to the Divine requires wealth or ritual complexity.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'my devotee never perishes' mean?</div>
            <div className="faq-a">
              In verse 9.31, Krishna tells Arjuna to declare publicly — <em>na me bhaktaḥ praṇaśyati</em> — my devotee never perishes. The promise is that one who has wholeheartedly turned toward the Divine cannot be finally destroyed by their past, their circumstances, or their fear. The verse is preceded by 9.30, which says even a person of very poor conduct who turns with undivided devotion is to be considered righteous. The two verses together form the Gita's most generous statement on spiritual access.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is yoga-kshema in the Bhagavad Gita?</div>
            <div className="faq-a">
              In verse 9.22, Krishna says, 'For those whose minds are wholly on me, I carry their yoga-kshema.' <em>Yoga</em> here means acquisition — bringing what is not yet present. <em>Kshema</em> means preservation — protecting what already is. Together they cover the whole of material concern. The verse is saying that the mind that is undivided is met with a kind of providential support — what is needed is brought, what is held is preserved.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Why does Chapter 9 say the highest knowledge is 'easy to practice'?</div>
            <div className="faq-a">
              Verse 9.2 calls this teaching <em>su-sukhaṃ kartum</em> — supremely easy to practice — alongside calling it the king of knowledge and the king of secrets. The Gita is making a structural claim: the highest truth is not difficult because it is hidden. It is difficult because the noise has to be turned down enough to hear it. Once the orientation shifts, the practice becomes natural rather than effortful. Chapter 9 is the chapter where this becomes most explicit.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does the four-imperative verse (9.34) mean?</div>
            <div className="faq-a">
              Verse 9.34 — <em>man-manā bhava mad-bhakto mad-yājī māṃ namaskuru</em> — gives four imperatives that cover thought, feeling, action, and posture. Fix the mind on me. Be devoted to me. Worship me. Bow to me. The Gita repeats this verse, nearly word-for-word, at 18.65, making it the book's signature closing instruction. The teaching is about total orientation — when attention, love, action, and respect all point one way, the path is already being walked.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-karma-meaning" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Karma — what it actually means in the Gita</div>
          </a>
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about anxiety</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-7" className="related-card">
            <div className="related-card-label">Chapter 7</div>
            <div className="related-card-title">Jnana Vijnana Yoga — Knowing About vs. Knowing Through</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-10" className="related-card">
            <div className="related-card-label">Chapter 10</div>
            <div className="related-card-title">Vibhuti Yoga — Sparks of the Divine</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-12" className="related-card">
            <div className="related-card-label">Chapter 12</div>
            <div className="related-card-title">Bhakti Yoga — How a Devotee Actually Lives</div>
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

      <BlogTracker pageName="Bhagwat Geeta Chapter 9" />
    </>
  )
}
