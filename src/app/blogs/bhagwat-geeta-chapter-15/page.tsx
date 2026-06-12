import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 15 Summary – Key Verses & Meaning (Purushottama Yoga)",
  description: "The Gita describes existence as an upside-down tree — roots in heaven, branches below. Chapter 15 (Purushottama Yoga) explains the spark of divine within you (15.7) and how to cut free. 20 verses in Sanskrit, Hindi and English.",
  keywords: "bhagwat geeta chapter 15, bhagavad gita purushottama yoga, bhagwat geeta adhyay 15, inverted ashvattha tree, sword of detachment gita, purushottama meaning, spark of divine bhagavad gita 15.7, ksharah aksharah purushottamah, Purushottama Yoga meaning, ashvattha tree Bhagavad Gita, Bhagavad Gita 15.7 mamaiva amsho, Bhagavad Gita 15.14 vaishvanaro, Bhagavad Gita 15.15 sarvasya chaham hridi, Purushottama meaning Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 15 Summary – Key Verses & Meaning (Purushottama Yoga)",
    description: "Bhagavad Gita Chapter 15, the upside-down tree, the sword of detachment, and the Supreme Self beyond change and changelessness.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter15.webp", width: 1200, height: 675, alt: "An inverted ashvattha tree, roots above, branches below, being cut by the sword of detachment. Chapter 15 of the Bhagavad Gita, Purushottama Yoga, names the Supreme Self beyond both the changing and the unchanging." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 15 Summary – Key Verses & Meaning (Purushottama Yoga)",
    description: "Bhagavad Gita Chapter 15, the upside-down tree, the sword of detachment, and the Supreme Self beyond change and changelessness.",
    images: ["https://wisdomquotes.in/assets/chapter15.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-16" },
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
        content: "अध्याय १५";
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
      .app-cta::before { content: "पुरुषोत्तम"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 15 — Purushottama Yoga: Cut the Tree, Find the Source",
    "description": "Bhagavad Gita Chapter 15 — Purushottama Yoga. All 20 verses on the inverted ashvattha tree, the sword of detachment, and the Supreme Self.",
    "alternativeHeadline": "Bhagavad Gita Chapter 15 (Purushottama Yoga) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter15.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15"
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
    "keywords": "bhagwat geeta chapter 15, bhagavad gita purushottama yoga, bhagwat geeta adhyay 15, inverted ashvattha tree, sword of detachment gita, purushottama meaning, spark of divine bhagavad gita 15.7, ksharah aksharah purushottamah, Purushottama Yoga meaning, ashvattha tree Bhagavad Gita, Bhagavad Gita 15.7 mamaiva amsho, Bhagavad Gita 15.14 vaishvanaro, Bhagavad Gita 15.15 sarvasya chaham hridi, Purushottama meaning Bhagavad Gita",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2843,
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
        "name": "Bhagavad Gita Chapter 15 — Purushottama Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 15 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 15, called Purushottama Yoga (the Yoga of the Supreme Self), is one of the Gita's most condensed and ambitious chapters. In just twenty verses, Krishna teaches the image of the inverted ashvattha tree (15.1-2), the sword of non-attachment that cuts it down (15.3), the spark of the Divine in every being (15.7), the Divine as the fire that digests food and dwells in every heart (15.14-15), and finally names himself as Purushottama — the Supreme Self beyond both the perishable and the imperishable (15.18)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the inverted ashvattha tree in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.1 describes the world as an ashvattha tree with its roots above and its branches below. The image is borrowed from older Upanishadic literature. The teaching is that the source of the world you experience is not visible from inside the world. The branches — visible circumstances, body, relationships — are downstream. The roots are in a reality you cannot point to from where the branches grow. Understanding this inversion is the beginning of true understanding."
        }
      },
      {
        "@type": "Question",
        "name": "What is the sword of detachment in Bhagavad Gita 15.3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.3 says, 'Cut down this deeply rooted ashvattha tree with the strong sword of non-attachment (asaṅga-śastra).' The sword does not cut the world. It cuts the grasping that keeps consciousness tied to result-driven existence. After the cut, the same world is still there, but the cycle no longer renews itself from your clinging, because the clinging was what was feeding the roots."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 15.7 mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.7 says, 'A part of myself, eternal, has become the living being in this world.' The Sanskrit word is aṃśa — fragment, portion. Each conscious being is, at the deepest level, a fragment of the Divine. The teaching is the metaphysical basis for compassion: every being you meet is made of the same source you are made of. The verse changes the regard you can hold for any other person in the room."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Purushottama in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Purushottama means 'the Supreme Self' or 'the Highest Person.' In verses 15.16-18, Krishna names two kinds of beings: the perishable (everything that changes) and the imperishable (the steady witness). Then he says there is a third, higher than both. That third is the Supreme Self, who enters all worlds and sustains them. Krishna claims this title for himself in 15.18, the only place in the Gita where he uses this specific name."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 15.15 mean about memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.15 says, 'I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt.' The teaching is that the remembering, the understanding, and the dissolving of confusion are not purely your achievements. They are gifts from the Divine already seated at the centre of your own awareness. The verse rewrites the architecture of inner life: you have always had a collaborator; most of us have just not noticed."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.3",
    "text": "Its real form is not perceived here, nor its beginning, end, or foundation. With the strong sword of non-attachment, cut down this deeply rooted ashvattha tree.",
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
      "name": "Bhagavad Gita, Chapter 15, Verse 3"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "न रूपमस्येह तथोपलभ्यते नान्तो न चादिर्न च सम्प्रतिष्ठा । / अश्वत्थमेनं सुविरूढमूलमसङ्गशस्त्रेण दृढेन छित्त्वा ॥",
      "na rūpam asyeha tathopalabhyate nānto na cādir na ca sampratiṣṭhā | / aśvattham enaṃ su-virūḍha-mūlam asaṅga-śastreṇa dṛḍhena chittvā ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.3"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.6",
    "text": "Neither sun, nor moon, nor fire illumines that place. Having reached it, beings do not return. That is my supreme abode.",
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
      "name": "Bhagavad Gita, Chapter 15, Verse 6"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "न तद्भासयते सूर्यो न शशाङ्को न पावकः । / यद्गत्वा न निवर्तन्ते तद्धाम परमं मम ॥",
      "na tad bhāsayate sūryo na śaśāṅko na pāvakaḥ | / yad gatvā na nivartante tad dhāma paramaṃ mama ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.6"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.7",
    "text": "A part of myself, eternal, has become the living being in this world. It draws to itself the five senses and the mind, which rest in nature.",
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
      "name": "Bhagavad Gita, Chapter 15, Verse 7"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "ममैवांशो जीवलोके जीवभूतः सनातनः । / मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥",
      "mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ | / manaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.7"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.14",
    "text": "I become the digestive fire in the bodies of living beings, joined with the in-breath and the out-breath, and I digest the four kinds of food.",
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
      "name": "Bhagavad Gita, Chapter 15, Verse 14"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अहं वैश्वानरो भूत्वा प्राणिनां देहमाश्रितः । / प्राणापानसमायुक्तः पचाम्यन्नं चतुर्विधम् ॥",
      "ahaṃ vaiśvānaro bhūtvā prāṇināṃ deham āśritaḥ | / prāṇāpāna-samāyuktaḥ pacāmy annaṃ catur-vidham ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.14"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.15",
    "text": "I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt. I am what is to be known through all the Vedas; I am the maker of Vedanta and the knower of the Vedas.",
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
      "name": "Bhagavad Gita, Chapter 15, Verse 15"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च । / वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥",
      "sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca | / vedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.15"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.18",
    "text": "Because I am beyond the perishable, and higher than even the imperishable — therefore, in the world and in the Vedas, I am celebrated as Purushottama, the Supreme Self.",
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
      "name": "Bhagavad Gita, Chapter 15, Verse 18"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यस्मात्क्षरमतीतोऽहमक्षरादपि चोत्तमः । / अतोऽस्मि लोके वेदे च प्रथितः पुरुषोत्तमः ॥",
      "yasmāt kṣaram atīto'ham akṣarād api cottamaḥ | / ato'smi loke vede ca prathitaḥ puruṣottamaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.18"
  }
]

export default function ChapterPage15() {
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
          Bhagavad Gita Chapter 15
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 15 · 20 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 15 (Adhyay 15):<br />
            <em>Purushottama Yoga</em>
          </h1>
          <p className="article-subtitle">
            The Gita's strangest image: a tree growing upside down. The sword of detachment. The spark of the eternal in every embodied being. And the name Krishna finally claims, Purushottama, the Self beyond every other self.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">20 verses · Purushottama Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~11 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 15 of 18</span>
          <span className="meta-sep">·</span>
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed June 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
          </div>
        </div>
      </div>

      {/* ── ARTICLE ── */}
      <div className="article-wrap">
        <article className="prose">
          <figure className="chapter-image">
            <img
              src="/assets/chapter15.webp"
              alt="An inverted ashvattha tree — roots above, branches below — being cut by the sword of detachment. Chapter 15 of the Bhagavad Gita, Purushottama Yoga, names the Supreme Self beyond both the changing and the unchanging."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 15 is one of the strangest and most precise chapters in the Bhagavad Gita. It opens with an image that no other scripture quite uses, a tree with its roots above and its branches below. Krishna calls this the imperishable ashvattha. The image is deliberately disorienting, because the truth it points to is also disorienting. The world you experience as solid and obvious is actually inverted. The source is above. What looks like the source, your body, your needs, your social position, is downstream. The tree is the world. Its true roots are not where you have been looking.
        </p>

        <p>
          Then Krishna does something even more unusual. He says: cut this tree. Cut it with the sword of detachment. The image is not gentle. The Gita has spent fourteen chapters explaining how the world appears, why it traps, how to live within it skillfully. Chapter 15 says: with all this preparation, you can finally take a sword to its roots. The aim is not violence against the world. It is the precise cutting of the one binding that keeps consciousness tied to the cycle. After the cutting, Krishna offers a series of images of the Divine within ordinary life, and finally names himself, for the first time in the book, as <em>Puruṣottama</em>: the Supreme Self, beyond both the perishable and the imperishable.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#inverted-tree">The upside-down tree, 15.1 and 15.2</a></li>
            <li><a href="#sword">Cut it down, the sword of detachment</a></li>
            <li><a href="#highest-home">The home beyond return, 15.6</a></li>
            <li><a href="#spark">A spark of the Divine in every embodied being</a></li>
            <li><a href="#fire-of-life">The fire that digests your food, 15.14</a></li>
            <li><a href="#in-the-heart">I dwell in the hearts of all beings, 15.15</a></li>
            <li><a href="#purushottama">The name Krishna finally claims, 15.18</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 15.1–15.2 · The Upside-Down Tree
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="inverted-tree">A Tree With Its Roots Above and Its Branches Below</h2>

        <p>
          Verse 15.1 begins the chapter with an image so unusual that medieval commentators wrote whole books explaining it. The world, Krishna says, is like an imperishable ashvattha tree, but it grows upside down. Its roots are above. Its branches spread below. The leaves are the Vedas. The one who understands this tree understands the Vedas. The image is borrowed from the older Upanishadic literature, but Chapter 15 sharpens it.
        </p>

        <p>
          What does "roots above" mean? It means the source of the world you experience is not in the world. The visible branches, your circumstances, your body, your relationships, the things you can touch, are not what hold the world together. The roots are above, in a reality not visible from where the branches grow. Verse 15.2 then explains how the visible branches behave. They grow in all directions, nourished by the three gunas, with sense-objects as their fresh shoots. Action-bound roots descend into the human world, tying everything to results. The tree is the cycle of bound existence. It grows endlessly, because each new desire becomes a new shoot.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 15.1</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            श्रीभगवानुवाच<br />ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् ।<br />छन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ॥
          </div>
          <div className="shloka-iast">
            śrī bhagavān uvāca |<br />ūrdhva-mūlam adhaḥ-śākham aśvatthaṃ prāhur avyayam |<br />chandāṃsi yasya parṇāni yas taṃ veda sa veda-vit ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                The Blessed One said: they speak of the imperishable ashvattha tree, with roots above and branches below. Its leaves are the sacred verses. The one who knows this tree knows the Vedas.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Why the inversion is the point</div>
              <div className="shloka-insight">
                If the roots were below, as in any normal tree, you could imagine reaching them by digging deeper into ordinary experience. The Gita's image refuses this. The source is not below. It is above. You will not find it by going further into the visible. You find it by recognizing that the visible is dangling from somewhere you cannot point at.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "Understanding the world-tree is the beginning of true understanding."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 15.3 · The Sword of Detachment
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="sword">Cut It Down, With the Strong Sword of Detachment</h2>

        <p>
          Verse 15.3 contains one of the Gita's most striking instructions. The tree, Krishna says, cannot be perceived in its true form from inside the world. It has no apparent beginning, no apparent end, no fixed base. <em>Therefore</em> (and the therefore matters): cut down this deeply rooted ashvattha with the strong sword of non-attachment. <em>Asaṅga-śastreṇa dṛḍhena chittvā</em>. The strong sword. Non-attachment.
        </p>

        <p>
          Modern readers sometimes hear this verse as ascetic. It is not. The Gita has spent the previous fourteen chapters arguing against world-rejection. The tree is not the world itself; it is the binding pattern of grasping that keeps consciousness tied to result-driven existence. The sword does not cut down trees, relationships, jobs, or pleasures. It cuts the grasping that turns each of these into another root holding you in the same cycle. After the cut, the same world is still there. Your relationship to it has changed. The cycle no longer renews itself from your grasping, because the grasping is what was feeding the roots.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 15.3</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            न रूपमस्येह तथोपलभ्यते नान्तो न चादिर्न च सम्प्रतिष्ठा ।<br />अश्वत्थमेनं सुविरूढमूलमसङ्गशस्त्रेण दृढेन छित्त्वा ॥
          </div>
          <div className="shloka-iast">
            na rūpam asyeha tathopalabhyate nānto na cādir na ca sampratiṣṭhā |<br />aśvattham enaṃ su-virūḍha-mūlam asaṅga-śastreṇa dṛḍhena chittvā ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Its real form is not perceived here, nor its beginning, end, or foundation. With the strong sword of non-attachment, cut down this deeply rooted ashvattha tree.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What asanga actually cuts</div>
              <div className="shloka-insight">
                <em>Asaṅga</em>: non-clinging. The sword is not violence. It is the willingness to stop clutching the results. Every time you act without gripping the outcome, you cut a root. The Gita is not asking for a single dramatic act. It is asking for repeated, accurate cuts: the daily reduction of grasping, until the cycle no longer has fuel.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "What traps you has no fixed form; detachment cuts it cleanly."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "Cut down this deeply rooted tree with the strong sword of non-attachment."
          </blockquote>
          <cite>Bhagavad Gita 15.3</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 15.6 · The Highest Home
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="highest-home">Where the Sun and Moon Cannot Reach</h2>

        <p>
          Verse 15.6 names the destination of the chapter. The place Krishna is pointing to is not lit by the sun, the moon, or fire. The verse is making a structural claim: ordinary light cannot reach the source. The source is what makes light visible. To experience it requires a different mode of seeing, what the Upanishads call <em>the eye of knowledge</em>. From outside, this can sound mystical. From inside the chapter, it is just precise. The light source for everything visible cannot itself be one more visible thing.
        </p>

        <p>
          And then the verse closes with the now-familiar promise: <em>yad gatvā na nivartante</em>: having reached it, beings do not return. That is Krishna's supreme abode. The destination is the same one Chapter 8 named, the same one Chapter 11 hinted at after the cosmic vision. Chapter 15 is just giving it a slightly different angle, framed this time as the source of all visible light. The destination is where the light has been coming from all along.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 15.6</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            न तद्भासयते सूर्यो न शशाङ्को न पावकः ।<br />यद्गत्वा न निवर्तन्ते तद्धाम परमं मम ॥
          </div>
          <div className="shloka-iast">
            na tad bhāsayate sūryo na śaśāṅko na pāvakaḥ |<br />yad gatvā na nivartante tad dhāma paramaṃ mama ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Neither sun, nor moon, nor fire illumines that place. Having reached it, beings do not return. That is my supreme abode.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The source of light cannot be lit by light</div>
              <div className="shloka-insight">
                The verse is teaching, with its very grammar, that the deepest reality is not one more visible thing alongside other visible things. It is the conditioning ground of visibility itself. You cannot search for it with the same eyes that search for objects. The seeing has to deepen before the seen can change.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The highest home is beyond every ordinary light and beyond return."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 15.7 · The Spark
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="spark">The Spark of the Divine in Every Embodied Being</h2>

        <p>
          Verse 15.7 contains one of the most personally generous teachings in the Gita. Krishna says: a fragment of myself, eternal, has become the living being in this world. <em>Mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ</em>. Each conscious being is, at the deepest level, a fragment of the Divine. The Sanskrit word is <em>aṃśa</em>, meaning part, portion, fragment. The verse is saying that what you most fundamentally are is not your body, not your personality, not your story. It is a piece of something eternal that has temporarily taken up residence in a body.
        </p>

        <p>
          Read carefully, this verse changes how you can look at every other person. Each of them is, by the same teaching, a fragment of the same source. The arrogant colleague. The kind stranger. The difficult relative. Every one of them, in their innermost being, is exactly what you are. The recognition does not erase the difficulty of dealing with them. It changes the regard you hold for the being underneath the difficulty. This is the Gita's working basis for compassion, not a moral injunction, but a metaphysical fact about who is in the room.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 15.7</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            ममैवांशो जीवलोके जीवभूतः सनातनः ।<br />मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥
          </div>
          <div className="shloka-iast">
            mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ |<br />manaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                A part of myself, eternal, has become the living being in this world. It draws to itself the five senses and the mind, which rest in nature.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">What this verse changes in how you see others</div>
              <div className="shloka-insight">
                Every conscious being you encounter is, at the core, the same fragment-of-the-eternal that you are. This is the structural reason compassion is rational, not just kind. You are not being asked to manufacture warmth toward people who do not deserve it. You are being asked to recognize what they are made of, the same thing you are made of, and to let that recognition shape how you treat them.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "What is eternal gets pulled around by what changes."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>Why this verse is more radical than it looks:</strong> If every being is a fragment of the same Divine, then social hierarchies, judgments of worth, and competitive ranking are all built on a misperception. The being in front of you is not less than you. The being in front of you is, in some real sense, you, wearing a different costume, having a different day. This is not sentimentality. It is the Gita's structural claim about what is actually present when two people meet.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 15.12–15.14 · The Divine Inside Daily Life
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="fire-of-life">The Light of the Sun, the Sweetness of Plants, the Fire That Digests Your Food</h2>

        <p>
          Verses 15.12 through 15.14 are some of the most viscerally embodied verses in the Gita. Krishna names where his presence is operating right now, in your body. The light of the sun, the moon, and fire: mine. Entering the earth, sustaining all beings with energy: me. Becoming the moon that nourishes plants: me. And then the most extraordinary one: <em>I become the digestive fire in the bodies of living beings, joined with the in-breath and the out-breath, and I digest the four kinds of food</em>.
        </p>

        <p>
          Read this slowly. The metabolism that is, even as you read, processing your last meal, Krishna is naming that as his presence. The breath moving in and out, his presence. The Gita does not put the Divine in temples and step away from the body. The Gita puts the Divine inside the body, in the most mundane physiological processes, and asks you to recognize it. This is the chapter's quiet inversion: you have been searching for the sacred elsewhere; the sacred has been digesting your dinner.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 15.14</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            अहं वैश्वानरो भूत्वा प्राणिनां देहमाश्रितः ।<br />प्राणापानसमायुक्तः पचाम्यन्नं चतुर्विधम् ॥
          </div>
          <div className="shloka-iast">
            ahaṃ vaiśvānaro bhūtvā prāṇināṃ deham āśritaḥ |<br />prāṇāpāna-samāyuktaḥ pacāmy annaṃ catur-vidham ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                I become the digestive fire in the bodies of living beings, joined with the in-breath and the out-breath, and I digest the four kinds of food.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The Divine inside your physiology</div>
              <div className="shloka-insight">
                If you wanted to undermine every form of body-rejecting spirituality in one verse, this is the verse. The fire that digests your dinner is named as the Divine. Your body is not a problem to escape. It is the local apparatus through which the sacred is currently operating. The Gita is consistent about this, the body is the equipment, and the equipment is, in this verse, given the highest possible compliment.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The divine is already working inside your body as life itself."
          </div>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 15.15 · The Heart
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="in-the-heart">I Sit in the Heart of All Beings, and Give You Memory</h2>

        <p>
          Verse 15.15 is the chapter's centre of intimacy. Krishna says: I dwell in the hearts of all beings. From me come memory, knowledge, and the removal of doubt. The verse is doing two things at once. First, the placement, the Divine is not somewhere far. It is in the heart of every being, including yours, right now. Second, the function, what you call memory, what you call understanding, what you call the relief when a confusion finally clears, all of these are not your accomplishments. They are arrivals from the source already seated in your heart.
        </p>

        <p>
          Notice the implication. Every time you have remembered something just when you needed to. Every time a confused situation suddenly became clear. Every time a stubborn doubt finally dissolved. These were not pure mechanism. The verse is naming them as small acts of the Divine, operating from the centre of your own awareness. The chapter is reframing the architecture of inner life. You are not the lone author of your understanding. There is, the verse says, a contributor.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 15.15</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च ।<br />वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥
          </div>
          <div className="shloka-iast">
            sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca |<br />vedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt. I am what is to be known through all the Vedas; I am the maker of Vedanta and the knower of the Vedas.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">Where memory comes from</div>
              <div className="shloka-insight">
                The verse is gently rewriting what you thought was personal effort. The remembering, the knowing, the clarifying, they are gifts from the centre already inside you. You did not produce them alone. The recognition does not make you less competent. It makes you less alone. You have always had a collaborator. Most of us have just not noticed who.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The deepest knowing comes from the one already dwelling within every heart."
          </div>
        </div>

        <div className="pull-quote">
          <blockquote>
            "I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt."
          </blockquote>
          <cite>Bhagavad Gita 15.15</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 15.16–15.18 · The Name
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="purushottama">Beyond the Changing and the Unchanging, Purushottama</h2>

        <p>
          The chapter's last metaphysical move comes in verses 15.16-18. Krishna names two kinds of beings: the perishable (everything that changes) and the imperishable (the steady witness). Most spiritual traditions stop at the imperishable. The Gita does not. It says there is a third, higher than both. Higher than the changing and higher than the unchanging. That third is the Supreme Self, who enters the three worlds and sustains them. That, Krishna says, is what I am. That is why I am known, in the world and in the Vedas, as <em>Puruṣottama</em>, the Supreme Person, the Self beyond every other self.
        </p>

        <p>
          This is the only place in the Gita where Krishna names himself by this specific title. The chapter is called Purushottama Yoga because of this naming. The teaching is not just metaphysical taxonomy. It is the answer to anyone who would stop at impersonal absolute awareness and call that the highest reality. The Gita's claim is that there is something higher even than impersonal awareness, and that higher thing is what was speaking to Arjuna all along. The intimacy of the friendship, the personalness of the teaching, the love that Krishna keeps directing at Arjuna, all of this is real, because what is being expressed through Krishna is not less than the impersonal absolute. It is more.
        </p>

        <div className="shloka-card">
          <div className="shloka-header">
            <span className="shloka-ref">Bhagavad Gita 15.18</span>
            <span className="shloka-speaker">Speaker: Krishna</span>
          </div>
          <div className="shloka-sanskrit" lang="sa">
            यस्मात्क्षरमतीतोऽहमक्षरादपि चोत्तमः ।<br />अतोऽस्मि लोके वेदे च प्रथितः पुरुषोत्तमः ॥
          </div>
          <div className="shloka-iast">
            yasmāt kṣaram atīto'ham akṣarād api cottamaḥ |<br />ato'smi loke vede ca prathitaḥ puruṣottamaḥ ||
          </div>
          <div className="shloka-body">
            <div>
              <div className="shloka-col-label">Meaning</div>
              <div className="shloka-meaning">
                Because I am beyond the perishable, and higher than even the imperishable, therefore, in the world and in the Vedas, I am celebrated as Purushottama, the Supreme Self.
              </div>
            </div>
            <div>
              <div className="shloka-col-label">The name Krishna finally claims</div>
              <div className="shloka-insight">
                Across fifteen chapters, Krishna has been called many things: friend, teacher, Lord, supreme person. This is the only verse where he claims a specific title for himself. <em>Puruṣottama</em>. The Supreme Self. The naming matters because of the structural claim it carries: there is a reality higher than impersonal absolute awareness, and that reality is what has been speaking. The closeness of the conversation is not a downgrade from the highest. It is the highest, in conversation.
              </div>
            </div>
          </div>
          <div className="shloka-essence">
            "The highest reality lies beyond both change and permanence."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>Why this chapter is shorter than its weight:</strong> Only twenty verses. But within them, the Gita does some of its most ambitious metaphysical work. The tree of bound existence. The sword of non-attachment. The spark in every being. The fire in every body. And the naming of the Supreme Self beyond both change and changelessness. The chapter compresses what other chapters spread out. It rewards rereading.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 20 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>15.1</td><td>Krishna</td><td>Understanding the world-tree is the beginning of true understanding</td></tr>
            <tr><td>15.2</td><td>Krishna</td><td>Craving and action keep the world-tree growing in every direction</td></tr>
            <tr><td>15.3</td><td>Krishna</td><td>What traps you has no fixed form; detachment cuts it cleanly</td></tr>
            <tr><td>15.4</td><td>Krishna</td><td>The final refuge is a state where return itself stops</td></tr>
            <tr><td>15.5</td><td>Krishna</td><td>Freedom begins when pride, craving, and inner division fall away</td></tr>
            <tr><td>15.6</td><td>Krishna</td><td>The highest home is beyond every ordinary light and beyond return</td></tr>
            <tr><td>15.7</td><td>Krishna</td><td>What is eternal gets pulled around by what changes</td></tr>
            <tr><td>15.8</td><td>Krishna</td><td>The body changes, but the carried pattern moves on</td></tr>
            <tr><td>15.9</td><td>Krishna</td><td>Experience passes through mind and senses; it does not define the true self</td></tr>
            <tr><td>15.10</td><td>Krishna</td><td>What changes is seen by the wise; the true self is not what moves</td></tr>
            <tr><td>15.11</td><td>Krishna</td><td>Seeing the supreme reality depends on inner purification, not effort alone</td></tr>
            <tr><td>15.12</td><td>Krishna</td><td>Every brightness in the world points back to one source</td></tr>
            <tr><td>15.13</td><td>Krishna</td><td>Life is nourished from within by the same presence that holds it together</td></tr>
            <tr><td>15.14</td><td>Krishna</td><td>The divine is already working inside your body as life itself</td></tr>
            <tr><td>15.15</td><td>Krishna</td><td>The deepest knowing comes from the one already dwelling within every heart</td></tr>
            <tr><td>15.16</td><td>Krishna</td><td>What changes is not the whole of you</td></tr>
            <tr><td>15.17</td><td>Krishna</td><td>Even the imperishable witness is not the final reality</td></tr>
            <tr><td>15.18</td><td>Krishna</td><td>The highest reality lies beyond both change and permanence</td></tr>
            <tr><td>15.19</td><td>Krishna</td><td>Clear seeing of the Supreme Self becomes total devotion</td></tr>
            <tr><td>15.20</td><td>Krishna</td><td>Secret knowledge makes a person complete</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-14" className="ch-nav-title">Chapter 14, Gunatraya Vibhaga Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-16" className="ch-nav-title">Chapter 16, Daivasura Sampad Vibhaga Yoga</a>
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
            <div className="faq-q">What is Bhagavad Gita Chapter 15 about?</div>
            <div className="faq-a">
              Chapter 15, called Purushottama Yoga (the Yoga of the Supreme Self), is one of the Gita's most condensed and ambitious chapters. In just twenty verses, Krishna teaches the image of the inverted ashvattha tree (15.1-2), the sword of non-attachment that cuts it down (15.3), the spark of the Divine in every being (15.7), the Divine as the fire that digests food and dwells in every heart (15.14-15), and finally names himself as Purushottama, the Supreme Self beyond both the perishable and the imperishable (15.18).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the inverted ashvattha tree in the Bhagavad Gita?</div>
            <div className="faq-a">
              Verse 15.1 describes the world as an ashvattha tree with its roots above and its branches below. The image is borrowed from older Upanishadic literature. The teaching is that the source of the world you experience is not visible from inside the world. The branches, visible circumstances, body, relationships, are downstream. The roots are in a reality you cannot point to from where the branches grow. Understanding this inversion is the beginning of true understanding.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the sword of detachment in Bhagavad Gita 15.3?</div>
            <div className="faq-a">
              Verse 15.3 says, 'Cut down this deeply rooted ashvattha tree with the strong sword of non-attachment (<em>asaṅga-śastra</em>).' The sword does not cut the world. It cuts the grasping that keeps consciousness tied to result-driven existence. After the cut, the same world is still there, but the cycle no longer renews itself from your clinging, because the clinging was what was feeding the roots.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 15.7 mean?</div>
            <div className="faq-a">
              Verse 15.7 says, 'A part of myself, eternal, has become the living being in this world.' The Sanskrit word is <em>aṃśa</em>, meaning fragment, portion. Each conscious being is, at the deepest level, a fragment of the Divine. The teaching is the metaphysical basis for compassion: every being you meet is made of the same source you are made of. The verse changes the regard you can hold for any other person in the room.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Who is Purushottama in the Bhagavad Gita?</div>
            <div className="faq-a">
              <em>Purushottama</em> means 'the Supreme Self' or 'the Highest Person.' In verses 15.16-18, Krishna names two kinds of beings: the perishable (everything that changes) and the imperishable (the steady witness). Then he says there is a third, higher than both. That third is the Supreme Self, who enters all worlds and sustains them. Krishna claims this title for himself in 15.18, the only place in the Gita where he uses this specific name.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 15.15 mean about memory?</div>
            <div className="faq-a">
              Verse 15.15 says, 'I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt.' The teaching is that the remembering, the understanding, and the dissolving of confusion are not purely your achievements. They are gifts from the Divine already seated at the centre of your own awareness. The verse rewrites the architecture of inner life: you have always had a collaborator; most of us have just not noticed.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-complete-structure-all-chapters" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">All 18 chapters, the full arc</div>
          </a>
          <a href="/blogs/bhagavad-gita-for-beginners" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Bhagavad Gita for beginners</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-13" className="related-card">
            <div className="related-card-label">Chapter 13</div>
            <div className="related-card-title">Kshetra Kshetrajna, The Field and the Knower</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-14" className="related-card">
            <div className="related-card-label">Chapter 14</div>
            <div className="related-card-title">Gunatraya Vibhaga, The Three Forces</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-10" className="related-card">
            <div className="related-card-label">Chapter 10</div>
            <div className="related-card-title">Vibhuti Yoga, Sparks of the Divine</div>
          </a>
          </div>
        </div>

          {/* ── APP CTA ── */}
          <div className="app-cta">
            <div className="app-cta-eyebrow">Free iOS App</div>
            <div className="app-cta-headline">One shloka a morning.<br />Let it stay with you all day.</div>
            <p className="app-cta-desc">
              The Wisdom app delivers one Bhagavad Gita verse each day, Devanagari script, transliteration, meaning, and how it applies right now. 700 verses. Home screen widget. Free.
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

      <BlogTracker pageName="Bhagwat Geeta Chapter 15" />
    </>
  )
}
