import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
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
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15", languages: { 'x-default': 'https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15' } },
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
          "text": "Chapter 15, called Purushottama Yoga (the Yoga of the Supreme Self), is short and dense. In twenty verses, Krishna teaches the image of the inverted ashvattha tree (15.1-2), the sword of non-attachment that cuts it down (15.3), the spark of the Divine in every being (15.7), the Divine as the fire that digests food and dwells in every heart (15.14-15), and finally names himself as Purushottama — the Supreme Self beyond both the perishable and the imperishable (15.18)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the inverted ashvattha tree in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.1 describes the world as an ashvattha tree with its roots above and its branches below. The image is borrowed from the Katha Upanishad (6.1). The teaching is that the source of the world you experience cannot be seen from inside it. The branches — visible circumstances, body, relationships — are downstream. The roots are in a reality you cannot point to from where the branches grow. "
        }
      },
      {
        "@type": "Question",
        "name": "What is the sword of detachment in Bhagavad Gita 15.3?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.3 says, 'Cut down this firmly rooted ashvattha tree with the strong sword of non-attachment (asaṅga-śastra).' The sword cuts the grasping that keeps consciousness tied to result-driven existence. After the cut, the same world is still there, but the cycle no longer renews itself from your clinging, since the clinging was feeding the roots."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 15.7 mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.7 says, 'A part of myself, eternal, has become the living being in this world.' The Sanskrit word is aṃśa — fragment, portion. Each conscious being is, at the deepest level, a fragment of the Divine. On this teaching, every being you meet is made of the same source you are made of, which gives compassion a basis."
        }
      },
      {
        "@type": "Question",
        "name": "Who is Purushottama in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Purushottama means 'the Supreme Self' or 'the Highest Person.' In verses 15.16-18, Krishna names two kinds of beings: the perishable (everything that changes) and the imperishable (the steady witness). Then he says there is a third, higher than both. That third is the Supreme Self, who enters all worlds and sustains them. Krishna claims this title for himself in 15.18; Arjuna had used it to address him earlier (8.1, 10.15, 11.3)."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 15.15 mean about memory?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 15.15 says, 'I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt.' On this verse, remembering, understanding and the clearing of confusion come partly from the Divine seated at the centre of your own awareness, so you are not their sole author."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-15#verse-15.3",
    "text": "Its real form is not perceived here, nor its beginning, end, or foundation. With the strong sword of non-attachment, cut down this firmly rooted ashvattha tree.",
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
    "text": "Because I am beyond the perishable, and higher than even the imperishable — therefore, among people and in the Vedas, I am celebrated as Purushottama, the Supreme Self.",
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
            A tree growing upside down, the sword of detachment that cuts it, the spark of the eternal in every embodied being, and the name Krishna claims for himself in 15.18: Purushottama, the highest Person.
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
          <span className="meta-item" style={{ fontStyle: 'italic' }}>Wisdom translation, edited by Ankur Shukla. Commentary AI-drafted, human-reviewed. Reviewed October 2026. <a href="/methodology" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.3)' }}>Methodology →</a></span>
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
          Chapter 15 opens with a tree that has its roots above and its branches below. Krishna calls it the imperishable ashvattha (the sacred fig). The image comes from the Katha Upanishad (6.1), and it is meant to disorient. The tree is the world of bound existence, samsara, and it hangs from a source above. What looks like the source, your body, your needs, your social position, is downstream.
        </p>

        <p>
          Then Krishna says: cut this tree with the sword of detachment. The Gita has spent fourteen chapters on how the world appears, why it traps, and how to live in it skillfully. Here it takes a sword to the binding that keeps a person tied to the cycle, and leaves the world itself standing. After that, Krishna gives a series of images of the Divine within ordinary life, and in 15.18 he names himself <em>Puruṣottama</em>: the Supreme Person, beyond both the perishable and the imperishable. Arjuna had used the word to address him before (8.1, 10.15, 11.3).
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
            <li><a href="#purushottama">The name Krishna claims, 15.18</a></li>
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
          Verse 15.1 begins the chapter with the image. The world of bound existence, Krishna says, is like an imperishable ashvattha tree, but it grows upside down. Its roots are above. Its branches spread below. The leaves are the Vedas. The one who understands this tree understands the Vedas. The image is borrowed from the Katha Upanishad (6.1), which also describes an eternal ashvattha with roots above and branches below. Chapter 15 adds the instruction to cut it.
        </p>

        <p>
          &quot;Roots above&quot; means the source of the world you experience lies outside it. The visible branches, your circumstances, your body, your relationships, hang from roots in a reality you cannot see from where the branches grow. Verse 15.2 then explains how the visible branches behave. They spread downward and upward, nourished by the three gunas, with sense-objects as their fresh shoots. Action-bound roots descend into the human world, tying everything to results. The tree keeps growing, because each new desire becomes a new shoot.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.1"
          speaker="Krishna"
          sanskrit="श्रीभगवानुवाच ऊर्ध्वमूलमधःशाखमश्वत्थं प्राहुरव्ययम् । छन्दांसि यस्य पर्णानि यस्तं वेद स वेदवित् ॥"
          iast="śrī bhagavān uvāca | ūrdhva-mūlam adhaḥ-śākham aśvatthaṃ prāhur avyayam | chandāṃsi yasya parṇāni yas taṃ veda sa veda-vit ||"
          meaning="The Blessed One said: they speak of the imperishable ashvattha tree, with roots above and branches below. Its leaves are the sacred verses. The one who knows this tree knows the Vedas."
          insightLabel="Why the inversion is the point"
          insight="If the roots were below, as in an ordinary tree, you could imagine reaching them by digging deeper into ordinary experience. The Gita puts them above: you find the source by seeing that the visible hangs from somewhere you cannot point at."
          essence="They speak of an undying ashvattha, roots above, branches below, hymns for leaves; who knows it knows the Vedas."
        />

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
          Verse 15.3 gives a striking instruction. The tree, Krishna says, cannot be perceived in its true form from inside the world. It has no apparent beginning, no apparent end, no fixed base. <em>Therefore</em> (and the therefore matters): cut down this firmly rooted ashvattha with the strong sword of non-attachment. <em>Asaṅga-śastreṇa dṛḍhena chittvā</em>: with the strong sword of non-attachment.
        </p>

        <p>
          Modern readers sometimes hear this verse as ascetic, though the Gita has argued against abandoning action since Chapter 3. The tree is the world as samsara, held in place by grasping. The sword leaves relationships, jobs and pleasures standing. It cuts the grasping that turns each of these into another root holding you in the same cycle. After the cut, the same world is still there, and the cycle no longer renews itself from your grasping.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.3"
          speaker="Krishna"
          sanskrit="न रूपमस्येह तथोपलभ्यते नान्तो न चादिर्न च सम्प्रतिष्ठा । अश्वत्थमेनं सुविरूढमूलमसङ्गशस्त्रेण दृढेन छित्त्वा ॥"
          iast="na rūpam asyeha tathopalabhyate nānto na cādir na ca sampratiṣṭhā | aśvattham enaṃ su-virūḍha-mūlam asaṅga-śastreṇa dṛḍhena chittvā ||"
          meaning="Its real form is not perceived here, nor its beginning, end, or foundation. With the strong sword of non-attachment, cut down this firmly rooted ashvattha tree."
          insightLabel="What asanga cuts"
          insight="Asaṅga means non-clinging. The sword is the willingness to stop clutching the results. Each time you act without gripping the outcome, you cut a root, and the cutting can happen a little each day."
          essence="Its form, beginning, end and base are not seen here; cut this firmly rooted tree with the sword of detachment."
        />

        <div className="pull-quote">
          <blockquote>
            "Cut down this firmly rooted tree with the strong sword of non-attachment."
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
          Verse 15.6 names the destination of the chapter. The place Krishna is pointing to is not lit by the sun, the moon, or fire. Ordinary light cannot reach it; 15.12 says the light of sun, moon and fire comes from Krishna in the first place. Seeing it takes what 15.10 calls <em>the eye of knowledge</em>.
        </p>

        <p>
          And then the verse closes with the now-familiar promise: <em>yad gatvā na nivartante</em>: having reached it, beings do not return. That is Krishna&apos;s supreme abode, the same one 8.21 describes in nearly the same words.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.6"
          speaker="Krishna"
          sanskrit="न तद्भासयते सूर्यो न शशाङ्को न पावकः । यद्गत्वा न निवर्तन्ते तद्धाम परमं मम ॥"
          iast="na tad bhāsayate sūryo na śaśāṅko na pāvakaḥ | yad gatvā na nivartante tad dhāma paramaṃ mama ||"
          meaning="Neither sun, nor moon, nor fire illumines that place. Having reached it, beings do not return. That is my supreme abode."
          insightLabel="Beyond sun, moon and fire"
          insight="The verse places that abode outside the reach of every light we know. You cannot search for it with the eyes that search for objects."
          essence="Neither sun, moon nor fire lights it; those who go there do not return; that is my supreme abode."
        />

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
          Verse 15.7 is generous. Krishna says: a fragment of myself, eternal, has become the living being in this world. <em>Mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ</em>. Each conscious being is, at the deepest level, a fragment of the Divine. The Sanskrit word is <em>aṃśa</em>, meaning part, portion, fragment. On this verse, what you most fundamentally are is a piece of something eternal that has taken up residence in a body for a while.
        </p>

        <p>
          Read carefully, this verse changes how you can look at other people. Each of them, by the same teaching, is a fragment of the same source, including a relative you find difficult. Dealing with them stays hard, and the regard you hold for the person underneath changes. Compassion here rests on a claim about who is in the room, more than on a rule.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.7"
          speaker="Krishna"
          sanskrit="ममैवांशो जीवलोके जीवभूतः सनातनः । मनःषष्ठानीन्द्रियाणि प्रकृतिस्थानि कर्षति ॥"
          iast="mamaivāṃśo jīva-loke jīva-bhūtaḥ sanātanaḥ | manaḥ-ṣaṣṭhānīndriyāṇi prakṛti-sthāni karṣati ||"
          meaning="A part of myself, eternal, has become the living being in this world. It draws to itself the five senses and the mind, which rest in nature."
          insightLabel="How this verse affects how you see others"
          insight="Every conscious being you meet is, at the core, a fragment of the same eternal source. You are asked to recognise what others are made of, the same thing you are made of, and to let that shape how you treat them."
          essence="An eternal fragment of me becomes the living being and draws to itself the mind and the five senses."
        />

        <div className="highlight-box">
          <p>
            <strong>What follows from this verse:</strong> If every being is a fragment of the same Divine, then judgments of worth between people rest on a misperception. The person in front of you is made of what you are made of, wearing a different body and having a different day.
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
          Verses 15.12 through 15.14 are physical. Krishna names where his presence is at work, including in your body. The light of the sun, the moon, and fire: mine. Entering the earth, sustaining all beings with energy: me. Becoming the moon that nourishes plants: me. And then: <em>I become the digestive fire in the bodies of living beings, joined with the in-breath and the out-breath, and I digest the four kinds of food</em>.
        </p>

        <p>
          Read this slowly. The digestion of your last meal and the breath moving in and out are, on this verse, Krishna&apos;s presence. The Gita places the Divine inside the body, in its most ordinary workings, as well as in temples.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.14"
          speaker="Krishna"
          sanskrit="अहं वैश्वानरो भूत्वा प्राणिनां देहमाश्रितः । प्राणापानसमायुक्तः पचाम्यन्नं चतुर्विधम् ॥"
          iast="ahaṃ vaiśvānaro bhūtvā prāṇināṃ deham āśritaḥ | prāṇāpāna-samāyuktaḥ pacāmy annaṃ catur-vidham ||"
          meaning="I become the digestive fire in the bodies of living beings, joined with the in-breath and the out-breath, and I digest the four kinds of food."
          insightLabel="The Divine inside the body"
          insight="This verse sits badly with any spirituality that treats the body as a problem to escape. The fire that digests food is named as Krishna himself, Vaishvanara."
          essence="As the digestive fire in living bodies, joined with the in-breath and out-breath, I digest the four kinds of food."
        />

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
          Verse 15.15 is the chapter&apos;s most intimate. Krishna says: I dwell in the hearts of all beings. From me come memory, knowledge, and the removal of doubt. The verse does two things. It places the Divine in the heart of every being, including yours. And it traces memory, understanding and the relief when a confusion clears back to that source rather than to you alone.
        </p>

        <p>
          So when you remember something just as you need it, or a stubborn doubt clears, the verse names that as Krishna at work from the centre of your own awareness. You are not the sole author of your understanding.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.15"
          speaker="Krishna"
          sanskrit="सर्वस्य चाहं हृदि सन्निविष्टो मत्तः स्मृतिर्ज्ञानमपोहनं च । वेदैश्च सर्वैरहमेव वेद्यो वेदान्तकृद्वेदविदेव चाहम् ॥"
          iast="sarvasya cāhaṃ hṛdi sanniviṣṭo mattaḥ smṛtir jñānam apohanaṃ ca | vedaiś ca sarvair aham eva vedyo vedānta-kṛd veda-vid eva cāham ||"
          meaning="I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt. I am what is to be known through all the Vedas; I am the maker of Vedanta and the knower of the Vedas."
          insightLabel="Where memory comes from"
          insight="Remembering, knowing and clarifying are, on this verse, given from the centre already inside you. You did not produce them alone, which takes nothing from your competence."
          essence="I am seated in every heart; from me come memory, knowledge and the removal of doubt; I am known through the Vedas."
        />

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
          The chapter&apos;s last argument comes in verses 15.16-18. Krishna names two kinds of beings: the perishable (everything that changes) and the imperishable (the steady witness). Then he names a third, higher than both the changing and the unchanging. That third is the Supreme Self, who enters the three worlds and sustains them. That, Krishna says, is what I am. That is why I am known, among people and in the Vedas, as <em>Puruṣottama</em>, the Supreme Person, the Self beyond every other self.
        </p>

        <p>
          Arjuna has called Krishna Purushottama before (8.1, 10.15, 11.3); here Krishna claims the title himself, and the chapter is named for it. Devotional commentators read 15.16–18 as an answer to anyone who would call impersonal awareness the highest reality: on their reading, what is higher is the Person who has been talking with Arjuna all along, and so the friendship and the love in the dialogue are real.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 15.18"
          speaker="Krishna"
          sanskrit="यस्मात्क्षरमतीतोऽहमक्षरादपि चोत्तमः । अतोऽस्मि लोके वेदे च प्रथितः पुरुषोत्तमः ॥"
          iast="yasmāt kṣaram atīto'ham akṣarād api cottamaḥ | ato'smi loke vede ca prathitaḥ puruṣottamaḥ ||"
          meaning="Because I am beyond the perishable, and higher than even the imperishable, therefore, among people and in the Vedas, I am celebrated as Purushottama, the Supreme Self."
          insightLabel="The name Krishna claims"
          insight="Across fifteen chapters Arjuna has called Krishna friend, teacher and Lord, and has addressed him as Puruṣottama. Here Krishna takes the title for himself, and gives the reason: he is beyond the perishable and higher than the imperishable."
          essence="Since I am beyond the perishable and higher than the imperishable, I am called Purushottama."
        />

        <div className="highlight-box">
          <p>
            <strong>A short chapter:</strong> Chapter 15 has twenty verses, and covers the tree of bound existence, the sword of non-attachment, the spark in every being, the fire in every body, and the Supreme Person beyond both change and changelessness. It rewards rereading.
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
            <tr><td>15.1</td><td>Krishna</td><td>They speak of an undying ashvattha, roots above, branches below, hymns for leaves; who knows it knows the Vedas</td></tr>
            <tr><td>15.2</td><td>Krishna</td><td>Its branches spread up and down, fed by the gunas, sense objects their shoots; below, its roots bind people to action</td></tr>
            <tr><td>15.3</td><td>Krishna</td><td>Its form, beginning, end and base are not seen here; cut this firmly rooted tree with the sword of detachment</td></tr>
            <tr><td>15.4</td><td>Krishna</td><td>Then seek the place from which none return, taking refuge in the primal Person from whom all activity flowed</td></tr>
            <tr><td>15.5</td><td>Krishna</td><td>Free of pride, delusion and attachment, desires gone, beyond pleasure and pain, the undeluded reach that undying state</td></tr>
            <tr><td>15.6</td><td>Krishna</td><td>Neither sun, moon nor fire lights it; those who go there do not return; that is my supreme abode</td></tr>
            <tr><td>15.7</td><td>Krishna</td><td>An eternal fragment of me becomes the living being and draws to itself the mind and the five senses</td></tr>
            <tr><td>15.8</td><td>Krishna</td><td>When the lord of the body takes a body or leaves it, it carries these along, as the wind carries scents</td></tr>
            <tr><td>15.9</td><td>Krishna</td><td>Presiding over ear, eye, touch, taste, smell and mind, it enjoys the objects of the senses</td></tr>
            <tr><td>15.10</td><td>Krishna</td><td>The deluded do not see it leaving, staying or enjoying; those with the eye of knowledge see it</td></tr>
            <tr><td>15.11</td><td>Krishna</td><td>Striving yogis see it within themselves; the unprepared and thoughtless do not, even when they strive</td></tr>
            <tr><td>15.12</td><td>Krishna</td><td>The light of the sun that lights the world, and the light of the moon and fire, know it as mine</td></tr>
            <tr><td>15.13</td><td>Krishna</td><td>Entering the earth, I sustain beings with my energy; becoming the moon, I nourish all plants</td></tr>
            <tr><td>15.14</td><td>Krishna</td><td>As the digestive fire in living bodies, joined with the in-breath and out-breath, I digest the four kinds of food</td></tr>
            <tr><td>15.15</td><td>Krishna</td><td>I am seated in every heart; from me come memory, knowledge and the removal of doubt; I am known through the Vedas</td></tr>
            <tr><td>15.16</td><td>Krishna</td><td>There are two persons in this world, the perishable and the imperishable: beings perish, the unchanging does not</td></tr>
            <tr><td>15.17</td><td>Krishna</td><td>But there is another, the highest Person, called the supreme Self, the undying Lord who sustains the three worlds</td></tr>
            <tr><td>15.18</td><td>Krishna</td><td>Since I am beyond the perishable and higher than the imperishable, I am called Purushottama</td></tr>
            <tr><td>15.19</td><td>Krishna</td><td>Whoever, undeluded, knows me as Purushottama knows all and worships me with their whole being</td></tr>
            <tr><td>15.20</td><td>Krishna</td><td>I have told you this secret teaching; knowing it, a person becomes wise and has done what is to be done</td></tr>
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

      <FeedbackWidget pageType="blog" />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Frequently Asked Questions
          </div>
          <div className="section-divider-line"></div>
        </div>


        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the claim that the inverted-tree image is unique to the Gita (it comes from Katha Upanishad 6.1), made the description of the tree consistent (samsara, the world of bound existence), noted that Arjuna addresses Krishna as Purushottama before 15.18, and attributed &ldquo;the eye of knowledge&rdquo; to 15.10; copy edited.</p>

        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 15 about?</div>
            <div className="faq-a">
              Chapter 15, called Purushottama Yoga (the Yoga of the Supreme Self), is short and dense. In twenty verses, Krishna teaches the image of the inverted ashvattha tree (15.1-2), the sword of non-attachment that cuts it down (15.3), the spark of the Divine in every being (15.7), the Divine as the fire that digests food and dwells in every heart (15.14-15), and finally names himself as Purushottama, the Supreme Self beyond both the perishable and the imperishable (15.18).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the inverted ashvattha tree in the Bhagavad Gita?</div>
            <div className="faq-a">
              Verse 15.1 describes the world as an ashvattha tree with its roots above and its branches below. The image is borrowed from the Katha Upanishad (6.1). The teaching is that the source of the world you experience cannot be seen from inside it. The branches, visible circumstances, body, relationships, are downstream. The roots are in a reality you cannot point to from where the branches grow. 
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the sword of detachment in Bhagavad Gita 15.3?</div>
            <div className="faq-a">
              Verse 15.3 says, 'Cut down this firmly rooted ashvattha tree with the strong sword of non-attachment (<em>asaṅga-śastra</em>).' The sword cuts the grasping that keeps consciousness tied to result-driven existence. After the cut, the same world is still there, but the cycle no longer renews itself from your clinging, since the clinging was feeding the roots.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 15.7 mean?</div>
            <div className="faq-a">
              Verse 15.7 says, 'A part of myself, eternal, has become the living being in this world.' The Sanskrit word is <em>aṃśa</em>, meaning fragment, portion. Each conscious being is, at the deepest level, a fragment of the Divine. On this teaching, every being you meet is made of the same source you are made of, which gives compassion a basis.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">Who is Purushottama in the Bhagavad Gita?</div>
            <div className="faq-a">
              <em>Purushottama</em> means 'the Supreme Self' or 'the Highest Person.' In verses 15.16-18, Krishna names two kinds of beings: the perishable (everything that changes) and the imperishable (the steady witness). Then he says there is a third, higher than both. That third is the Supreme Self, who enters all worlds and sustains them. Krishna claims this title for himself in 15.18; Arjuna had used it to address him earlier (8.1, 10.15, 11.3).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 15.15 mean about memory?</div>
            <div className="faq-a">
              Verse 15.15 says, 'I am seated in the hearts of all beings. From me come memory, knowledge, and the removal of doubt.' On this verse, remembering, understanding and the clearing of confusion come partly from the Divine seated at the centre of your own awareness, so you are not their sole author.
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

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 15"} />

        </article>
      </div>

      {/* FOOTER */}
      <SiteFooter />

      <BlogTracker pageName="Bhagwat Geeta Chapter 15" />
    </>
  )
}
