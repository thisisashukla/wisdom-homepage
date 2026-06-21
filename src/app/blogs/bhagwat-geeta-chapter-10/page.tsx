import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import ShlokaCard from '@/components/gita/ShlokaCard'

export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 10 Summary – Key Verses & Meaning (Vibhuti Yoga)",
  description: "Bhagavad Gita Chapter 10 (Vibhuti Yoga), 42 verses on divine manifestations, sparks of the Divine, and the universe held in a single fragment ('ekamshena sthito jagat').",
  keywords: "bhagwat geeta chapter 10, bhagavad gita vibhuti yoga, bhagwat geeta adhyay 10, ekamshena sthito jagat, aham atma gudakesha, lamp of knowledge gita, sparks of divine bhagavad gita, divine manifestations gita, Vibhuti Yoga meaning, Bhagavad Gita 10.20 aham atma gudakesha, Bhagavad Gita 10.41 vibhutimat sattvam, Bhagavad Gita 10.42 ekamshena sthito jagat, what are vibhutis in Bhagavad Gita, divine manifestations Krishna",
  openGraph: {
    title: "Bhagavad Gita Chapter 10 Summary – Key Verses & Meaning (Vibhuti Yoga)",
    description: "Bhagavad Gita Chapter 10, sparks of the Divine. Where to look for God in everything that shines.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter10.webp", width: 1200, height: 675, alt: "Sparks of divine radiance scattered across the manifest world, Chapter 10 of the Bhagavad Gita, Vibhuti Yoga, teaches that every form of greatness in creation is a fragment of one source." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 10 Summary – Key Verses & Meaning (Vibhuti Yoga)",
    description: "Bhagavad Gita Chapter 10, sparks of the Divine. Where to look for God in everything that shines.",
    images: ["https://wisdomquotes.in/assets/chapter10.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10" },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-9", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-11" },
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
        content: "अध्याय १०";
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
      .app-cta::before { content: "विभूति"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 10 — Vibhuti Yoga: Sparks of the Divine",
    "description": "Bhagavad Gita Chapter 10 — Vibhuti Yoga. All 42 verses on divine manifestations, sparks of the Divine, and the universe held in a single fragment.",
    "alternativeHeadline": "Bhagavad Gita Chapter 10 (Vibhuti Yoga) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter10.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10"
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
    "keywords": "bhagwat geeta chapter 10, bhagavad gita vibhuti yoga, bhagwat geeta adhyay 10, ekamshena sthito jagat, aham atma gudakesha, lamp of knowledge gita, sparks of divine bhagavad gita, divine manifestations gita, Vibhuti Yoga meaning, Bhagavad Gita 10.20 aham atma gudakesha, Bhagavad Gita 10.41 vibhutimat sattvam, Bhagavad Gita 10.42 ekamshena sthito jagat, what are vibhutis in Bhagavad Gita, divine manifestations Krishna",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2514,
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
        "name": "Bhagavad Gita Chapter 10 — Vibhuti Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 10 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 10, called Vibhuti Yoga (the Yoga of Divine Manifestations), is the Gita's training in where to look for the Divine. After Chapter 9 established that the Divine holds everything, Chapter 10 gives Arjuna a long list of where that holding becomes visible — in the sun, the moon, the heart of every being, the silence among secrets, every form of brilliance in creation. The chapter closes with 10.42: the entire universe is sustained by a single fragment of the Divine."
        }
      },
      {
        "@type": "Question",
        "name": "What is vibhuti in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Vibhuti means divine power, glory, or manifestation. In the context of Chapter 10, it refers to specific forms in which the Divine becomes especially visible: the supreme example of any category. Krishna gives Arjuna dozens of these examples. The deeper teaching is the pattern: wherever you encounter the highest expression of any quality (strength, beauty, knowledge, restraint) you are encountering a spark of one source."
        }
      },
      {
        "@type": "Question",
        "name": "What is the meaning of Bhagavad Gita 10.11?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 10.11 says, 'Out of compassion for them, dwelling in their own being, I destroy the darkness born of ignorance with the shining lamp of knowledge.' The verse places the lamp inside the devotee — ātma-bhāva-stho. The Divine is not lighting them from outside; the Divine has lit a lamp from within them. The image is intimate: the work of clearing inner darkness is not yours alone to do, because a light has already been placed inside you."
        }
      },
      {
        "@type": "Question",
        "name": "What does 'aham atma' mean in Gita 10.20?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 10.20 says, 'aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ' — 'I am the Self, Arjuna, seated in the heart of all beings.' It is the centre verse of Chapter 10. After many verses about external splendour, Krishna turns inward and names the most important manifestation: the Divine is in the heart of every being. The teaching reframes every other manifestation as a consequence of this one."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 10.41 mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 10.41 — 'Whatever being or thing is endowed with splendour, beauty, or power — know it to be born from a spark of my radiance' — is the portable summary of Chapter 10. It states the rule: wherever you see brilliance, the brilliance is borrowed. Trace it back and you reach the source. The verse turns the entire chapter into a practice: when you encounter greatness, ask where it came from."
        }
      },
      {
        "@type": "Question",
        "name": "What is the significance of Gita 10.42?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 10.42, the final verse of Chapter 10, says, 'Or, Arjuna, what need is there to know all this in such detail? I support this entire universe with a single fragment of myself.' The verse retires the long catalogue with a breathtaking reduction. Whatever you have seen, the unseen is incalculably greater. The whole universe rests on one fragment. The chapter ends in awe and sets up Arjuna's request in Chapter 11 to see the cosmic form directly."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.8",
    "text": "I am the source of all; from me everything proceeds. Knowing this, the wise worship me with wholehearted feeling.",
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
      "name": "Bhagavad Gita, Chapter 10, Verse 8"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते । / इति मत्वा भजन्ते मां बुधा भावसमन्विताः ॥",
      "ahaṃ sarvasya prabhavo mattaḥ sarvaṃ pravartate | / iti matvā bhajante māṃ budhā bhāva-samanvitāḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.8"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.10",
    "text": "To those who are constantly united with me, who worship me with love, I give the yoga of discernment by which they come to me.",
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
      "name": "Bhagavad Gita, Chapter 10, Verse 10"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम् । / ददामि बुद्धियोगं तं येन मामुपयान्ति ते ॥",
      "teṣāṃ satata-yuktānāṃ bhajatāṃ prīti-pūrvakam | / dadāmi buddhi-yogaṃ taṃ yena mām upayānti te ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.10"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.11",
    "text": "Out of compassion for them, dwelling in their own being, I destroy the darkness born of ignorance with the shining lamp of knowledge.",
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
      "name": "Bhagavad Gita, Chapter 10, Verse 11"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "तेषामेवानुकम्पार्थमहमज्ञानजं तमः । / नाशयाम्यात्मभावस्थो ज्ञानदीपेन भास्वता ॥",
      "teṣām evānukampārtham aham ajñāna-jaṃ tamaḥ | / nāśayāmy ātma-bhāva-stho jñāna-dīpena bhāsvatā ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.11"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.20",
    "text": "I am the Self, Arjuna, seated in the heart of all beings. I am the beginning, the middle, and the end of all beings.",
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
      "name": "Bhagavad Gita, Chapter 10, Verse 20"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अहमात्मा गुडाकेश सर्वभूताशयस्थितः । / अहमादिश्च मध्यं च भूतानामन्त एव च ॥",
      "aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ | / aham ādiś ca madhyaṃ ca bhūtānām anta eva ca ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.20"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.41",
    "text": "Whatever being or thing has splendour, beauty, or power — know it to be born from a spark of my radiance.",
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
      "name": "Bhagavad Gita, Chapter 10, Verse 41"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा । / तत्तदेवावगच्छ त्वं मम तेजोंऽशसंभवम् ॥",
      "yad yad vibhūtimat sattvaṃ śrīmad ūrjitam eva vā | / tat tad evāvagaccha tvaṃ mama tejo'ṃśa-sambhavam ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.41"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.42",
    "text": "Or, Arjuna, what need is there to know all this in such detail? I support this entire universe with a single fragment of myself.",
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
      "name": "Bhagavad Gita, Chapter 10, Verse 42"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अथवा बहुनैतेन किं ज्ञातेन तवार्जुन । / विष्टभ्याहमिदं कृत्स्नमेकांशेन स्थितो जगत् ॥",
      "athavā bahunaitena kiṃ jñātena tavārjuna | / viṣṭabhyāham idaṃ kṛtsnam ekāṃśena sthito jagat ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-10#verse-10.42"
  }
]

export default function ChapterPage10() {
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
          Bhagavad Gita Chapter 10
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 10 · 42 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 10 (Adhyay 10):<br />
            <em>Vibhuti Yoga</em>
          </h1>
          <p className="article-subtitle">
            Where to look for God: in everything that shines. The lamp of knowledge inside the heart. The Self at the beginning, middle, and end. And the single fragment that holds the whole universe.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">42 verses · Vibhuti Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~13 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 10 of 18</span>
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
              src="/assets/chapter10.webp"
              alt="Sparks of divine radiance scattered across the manifest world — Chapter 10 of the Bhagavad Gita, Vibhuti Yoga, teaches that every form of greatness in creation is a fragment of one source."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 10 is a chapter about where to look. After Chapter 9 establishes that the Divine holds everything, Chapter 10 turns the next, more practical question, if the Divine is in everything, how do I begin to see it? Krishna's answer is unexpectedly concrete. He gives Arjuna a long list of specifics. Look at the sun. Look at the moon. Look at consciousness inside living beings. Look at the silence among secrets. Look at greatness wherever you find it, in art, in courage, in beauty, in restraint, and recognise it as a spark of one radiance.
        </p>

        <p>
          This is the chapter most often misread as a mere catalogue. It is not. The list is a training in attention. Most people, most of the time, look at the world and see only itself, a sun, a person, a kind word. Chapter 10 is asking you to look again and notice the second layer. Behind every form of brilliance, the Gita says, is the same source. Once you start seeing this pattern, you cannot easily unsee it. The chapter is not asking you to believe anything. It is asking you to look, with a slightly different question in mind.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#source-of-all">I am the source of all, 10.8</a></li>
            <li><a href="#lamp-inside">The lamp of knowledge, 10.10 and 10.11</a></li>
            <li><a href="#self-in-heart">I am the Self in the heart of all beings, 10.20</a></li>
            <li><a href="#look-at-greatness">How to read a long list of manifestations</a></li>
            <li><a href="#silence-power">Silence among secrets, and what true power looks like</a></li>
            <li><a href="#spark">A spark of radiance, 10.41</a></li>
            <li><a href="#single-fragment">One fragment holds the universe, 10.42</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 10.7–10.8 · The Source
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="source-of-all">Where Everything Comes From</h2>

        <p>
          Chapter 10 opens by establishing what the rest of the chapter will illustrate. Verse 10.8 is the structural claim: <em>I am the source of all; from me, everything proceeds. Knowing this, the wise worship me with wholehearted feeling.</em> The verse is doing two things at once. Metaphysically, it locates the origin of everything in a single point. Practically, it explains why the wise person responds to that knowledge with devotion. When you really know where everything comes from, the response is not analysis. It is reverence.
        </p>

        <p>
          Notice the chain. First the recognition (<em>iti matvā</em>, knowing this). Then the response (<em>bhajante</em>, they worship). Then the quality of the response (<em>bhāva-samanvitāḥ</em>, full of feeling). The Gita is not asking for an intellectual concession. It is describing what understanding actually feels like when it lands. The mind sees the source. The heart turns toward it. The two are not separate moves.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 10.8"
          speaker="Krishna"
          sanskrit="अहं सर्वस्य प्रभवो मत्तः सर्वं प्रवर्तते । इति मत्वा भजन्ते मां बुधा भावसमन्विताः ॥"
          iast="ahaṃ sarvasya prabhavo mattaḥ sarvaṃ pravartate | iti matvā bhajante māṃ budhā bhāva-samanvitāḥ ||"
          essence="Knowing the source turns understanding into devotion."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 10.10–10.11 · The Lamp Inside
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="lamp-inside">The Lamp of Knowledge Lit From Within</h2>

        <p>
          Verses 10.10 and 10.11 are a pair, and together they describe what happens to a person whose devotion has become continuous. Krishna says: to those who are always united with me, who worship with love, I give the <em>buddhi-yoga</em> (the yoga of discernment) by which they come to me. And then he goes further: out of compassion for them, I destroy the darkness born of ignorance, dwelling in their own being, with the shining lamp of knowledge.
        </p>

        <p>
          Look closely at where the lamp is. It is <em>ātma-bhāva-stho</em>, placed in their own being. The Divine is not lighting the lamp from outside, illuminating them. The Divine is lighting a lamp from inside them. The image is intimate. The conditions for the lamp's lighting are simple (continuous devotion, love), and the result is the most reassuring promise in the Gita: the darkness in you is not yours alone to fight. It is dispelled by a light that has been placed inside you.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 10.10"
          speaker="Krishna"
          sanskrit="तेषां सततयुक्तानां भजतां प्रीतिपूर्वकम् । ददामि बुद्धियोगं तं येन मामुपयान्ति ते ॥"
          iast="teṣāṃ satata-yuktānāṃ bhajatāṃ prīti-pūrvakam | dadāmi buddhi-yogaṃ taṃ yena mām upayānti te ||"
          essence="Steady devotion itself draws forth the understanding that reaches the divine."
        />

        <div className="pull-quote">
          <blockquote>
            "Out of compassion, dwelling in your own being, I destroy the darkness with the shining lamp of knowledge."
          </blockquote>
          <cite>Bhagavad Gita 10.11</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 10.20 · The Self in the Heart
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="self-in-heart">I Am the Self Seated in the Heart of All Beings</h2>

        <p>
          Verse 10.20 is the moment in Chapter 10 where the long list of manifestations gets a personal centre. Krishna says: I am the Self, Arjuna, seated in the heart of all beings. I am the beginning, the middle, and the end of all beings. After many verses about external splendour, among radiant beings I am Indra, among rivers I am the Ganga, the verse turns inward. The most important manifestation is not outside. It is in the heart of every being you will ever meet.
        </p>

        <p>
          This is the verse that the rest of the chapter's list exists to support. If you only read the external list, the Gita can sound like a celebration of greatness. Read with 10.20 at the centre, the chapter reverses direction. Yes, the Divine is in the brilliant. The Divine is also in the heart of the unremarkable person sitting next to you on the train. The two manifestations are the same manifestation, in different clothing. The chapter is teaching you to see both with the same recognition.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 10.20"
          speaker="Krishna"
          sanskrit="अहमात्मा गुडाकेश सर्वभूताशयस्थितः । अहमादिश्च मध्यं च भूतानामन्त एव च ॥"
          iast="aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ | aham ādiś ca madhyaṃ ca bhūtānām anta eva ca ||"
          essence="Everything that exists is held within one enduring presence."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 10.21–10.37 · The Long List
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="look-at-greatness">How to Read the Long Catalogue of Manifestations</h2>

        <p>
          Beginning at verse 10.21 and continuing for about fifteen verses, Krishna gives Arjuna a long catalogue. Among the suns, I am Vishnu. Among the rivers, the Ganga. Among the months, Margashirsha. Among letters, the letter A. Modern readers sometimes find this section tedious, a list of mostly culturally specific examples. That is to misread the section's purpose. The catalogue is not asking you to memorise it. It is training you in a way of seeing.
        </p>

        <p>
          Notice the structure of every entry. Krishna names a category, the senses, the seasons, the rivers, and within that category, he names what is supreme. The lesson is portable. Whenever you encounter a category, look for its highest expression, and recognise that expression as the Divine. The list teaches a habit: look at the best of something, see the spark, repeat. After enough repetitions, you start seeing it everywhere. The chapter is, in this sense, a perception training disguised as a hymn.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 10.22"
          speaker="Krishna"
          sanskrit="वेदानां सामवेदोऽस्मि देवानामस्मि वासवः । इन्द्रियाणां मनश्चास्मि भूतानामस्मि चेतना ॥"
          iast="vedānāṃ sāma-vedo'smi devānām asmi vāsavaḥ | indriyāṇāṃ manaś cāsmi bhūtānām asmi cetanā ||"
        />
          </div>
          <div className="shloka-essence">
            "The divine is not elsewhere; it is the awareness within everything."
          </div>
        </div>

        <div className="highlight-box">
          <p>
            <strong>How to actually use Chapter 10's catalogue:</strong> Pick any category in your life (books, music, kinds of conversations, types of meals, kinds of weather). Identify, honestly, what its supreme example is, for you. Then sit with the recognition that what you are admiring is a spark. The admiration was already half-spiritual. The chapter is just asking you to notice the second half.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 10.38 · The Quietest Power
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="silence-power">Silence Among Secrets, Restraint Among Powers</h2>

        <p>
          Verse 10.38 is one of the chapter's surprising moments. Krishna says: among enforcers, I am the rod of punishment; among those seeking victory, I am wise policy; among secrets, I am silence; among the wise, I am knowledge. The first two are conventional. The third is the verse's quiet bombshell. The deepest secret is not a hidden word. It is silence itself.
        </p>

        <p>
          This contradicts most assumptions about spiritual depth. We tend to imagine the highest teaching as a sentence that, once spoken, would unlock everything. The Gita says the opposite. The highest teaching has already been spoken. What is hidden, what is most worth protecting, is the silence underneath the words. Real power, the verse adds, is not volume. It is restraint and timing, knowing what to say, when, and what to leave unsaid. The most important spiritual capacity, by this reading, is the capacity to be quiet when speaking would be easier.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 10.38"
          speaker="Krishna"
          sanskrit="दण्डो दमयतामस्मि नीतिरस्मि जिगीषताम् । मौनं चैवास्मि गुह्यानां ज्ञानं ज्ञानवतामहम् ॥"
          iast="daṇḍo damayatām asmi nītir asmi jigīṣatām | maunaṃ caivāsmi guhyānāṃ jñānaṃ jñānavatām aham ||"
          essence="True power is measured by restraint, silence, and clear understanding."
        />

        <div className="pull-quote">
          <blockquote>
            "Among secrets, I am silence. Among the wise, I am knowledge."
          </blockquote>
          <cite>Bhagavad Gita 10.38</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 10.41–10.42 · The Closing Reveal
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="spark">Every Form of Brilliance Is a Spark</h2>

        <p>
          Chapter 10 closes with two of its most important verses. Verse 10.41 says: whatever being or thing is endowed with splendour, beauty, or power, know that to have arisen from a spark of my radiance. The verse retrofits everything that came before. Now you understand why Krishna spent so long enumerating examples of greatness. He was showing you, again and again, what a spark looks like.
        </p>

        <p>
          Then comes verse 10.42, the chapter's final word: <em>or, Arjuna, what need is there to know all this in such detail? I sustain this entire universe with a single fragment of myself.</em> The Gita ends the catalogue by admitting that the catalogue is, in the end, unnecessary. You did not need every example. The point of every example was the same. The Divine is in the brilliant, in the ordinary, in the supreme, in the small, and after all of it, the Divine has not been exhausted. A single fragment holds the universe. Everything you have seen is a smaller fragment of that fragment.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 10.41"
          speaker="Krishna"
          sanskrit="यद्यद्विभूतिमत्सत्त्वं श्रीमदूर्जितमेव वा । तत्तदेवावगच्छ त्वं मम तेजोंऽशसंभवम् ॥"
          iast="yad yad vibhūtimat sattvaṃ śrīmad ūrjitam eva vā | tat tad evāvagaccha tvaṃ mama tejo'ṃśa-sambhavam ||"
          essence="Every genuine greatness is only a spark of my radiance."
        />
          </div>
          <div className="faq-item">
            <div className="faq-q">What is vibhuti in the Bhagavad Gita?</div>
            <div className="faq-a">
              <em>Vibhuti</em> means divine power, glory, or manifestation. In the context of Chapter 10, it refers to specific forms in which the Divine becomes especially visible: the supreme example of any category. Krishna gives Arjuna dozens of these examples. The deeper teaching is the pattern: wherever you encounter the highest expression of any quality (strength, beauty, knowledge, restraint) you are encountering a spark of one source.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the meaning of Bhagavad Gita 10.11?</div>
            <div className="faq-a">
              Verse 10.11 says, 'Out of compassion for them, dwelling in their own being, I destroy the darkness born of ignorance with the shining lamp of knowledge.' The verse places the lamp inside the devotee (<em>ātma-bhāva-stho</em>). The Divine is not lighting them from outside; the Divine has lit a lamp from within them. The image is intimate: the work of clearing inner darkness is not yours alone to do, because a light has already been placed inside you.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does 'aham atma' mean in Gita 10.20?</div>
            <div className="faq-a">
              Verse 10.20 says: '<em>aham ātmā guḍākeśa sarva-bhūtāśaya-sthitaḥ</em>' ('I am the Self, Arjuna, seated in the heart of all beings.'). It is the centre verse of Chapter 10. After many verses about external splendour, Krishna turns inward and names the most important manifestation: the Divine is in the heart of every being. The teaching reframes every other manifestation as a consequence of this one.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 10.41 mean?</div>
            <div className="faq-a">
              Verse 10.41, 'Whatever being or thing is endowed with splendour, beauty, or power, know it to be born from a spark of my radiance', is the portable summary of Chapter 10. It states the rule: wherever you see brilliance, the brilliance is borrowed. Trace it back and you reach the source. The verse turns the entire chapter into a practice: when you encounter greatness, ask where it came from.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the significance of Gita 10.42?</div>
            <div className="faq-a">
              Verse 10.42, the final verse of Chapter 10, says, 'Or, Arjuna, what need is there to know all this in such detail? I support this entire universe with a single fragment of myself.' The verse retires the long catalogue with a breathtaking reduction. Whatever you have seen, the unseen is incalculably greater. The whole universe rests on one fragment. The chapter ends in awe and sets up Arjuna's request in Chapter 11 to see the cosmic form directly.
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
          <a href="/blogs/bhagwat-geeta-chapter-9" className="related-card">
            <div className="related-card-label">Chapter 9</div>
            <div className="related-card-title">Raja Vidya Raja Guhya Yoga, The Royal Secret</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-11" className="related-card">
            <div className="related-card-label">Chapter 11</div>
            <div className="related-card-title">Vishwarupa Darshana Yoga, The Cosmic Vision</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-15" className="related-card">
            <div className="related-card-label">Chapter 15</div>
            <div className="related-card-title">Purushottama Yoga, Cut the Tree, Find the Source</div>
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

      <BlogTracker pageName="Bhagwat Geeta Chapter 10" />
    </>
  )
}
