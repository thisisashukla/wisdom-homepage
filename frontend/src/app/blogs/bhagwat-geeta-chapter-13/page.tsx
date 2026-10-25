import type { Metadata } from 'next'
import BlogTracker from '@/components/BlogTracker'
import FeedbackWidget from '@/components/FeedbackWidget'
import ShlokaCard from '@/components/gita/ShlokaCard'
import VerseFunnelCTA from '@/components/funnel/VerseFunnelCTA'

import SiteFooter from '@/components/SiteFooter'
export const metadata: Metadata = {
  title: "Bhagavad Gita Chapter 13 Summary – Key Verses & Meaning (Kshetra Kshetrajna Yoga)",
  description: "Bhagavad Gita Chapter 13 (Kshetra Kshetrajna Vibhaga Yoga), 35 verses on the field and the knower of the field, purusha-prakriti, and the witness self.",
  keywords: "bhagwat geeta chapter 13, bhagavad gita kshetra kshetrajna yoga, bhagwat geeta adhyay 13, field and knower of the field, qualities of knowledge gita, purusha prakriti gita, non-doer self gita, 13.8 amanitvam adambhitvam, Kshetra Kshetrajna Vibhaga Yoga meaning, field and knower of the field Bhagavad Gita, Bhagavad Gita 13.8 amanitvam adambhitvam, Bhagavad Gita 13.30 prakrtyaiva ca karmani, purusha prakriti Bhagavad Gita, self as witness Bhagavad Gita",
  openGraph: {
    title: "Bhagavad Gita Chapter 13 Summary – Key Verses & Meaning (Kshetra Kshetrajna Yoga)",
    description: "Bhagavad Gita Chapter 13, the field and the knower of the field. Body, mind and reactions as the field; awareness as its knower.",
    type: 'article',
    url: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13",
    siteName: 'Wisdom',
    locale: 'en_IN',
    images: [{ url: "https://wisdomquotes.in/assets/chapter13.webp", width: 1200, height: 675, alt: "The field and the knower of the field, a meditator observing the play of body, sensation, and thought without being captured by it. Chapter 13 of the Bhagavad Gita." }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Bhagavad Gita Chapter 13 Summary – Key Verses & Meaning (Kshetra Kshetrajna Yoga)",
    description: "Bhagavad Gita Chapter 13, the field and the knower of the field. Body, mind and reactions as the field; awareness as its knower.",
    images: ["https://wisdomquotes.in/assets/chapter13.webp"],
  },
  alternates: { canonical: "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13", languages: { 'x-default': 'https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13' } },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1 },
  },
  other: { "rel=prev": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-12", "rel=next": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-14" },
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
        content: "अध्याय १३";
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
      .app-cta::before { content: "क्षेत्र"; position: absolute; top: -14px; right: -8px;
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
    "headline": "Bhagavad Gita Chapter 13 — Kshetra Kshetrajna Vibhaga Yoga: The Field and the Knower",
    "description": "Bhagavad Gita Chapter 13 — Kshetra Kshetrajna Vibhaga Yoga. All 35 verses on the field and the knower, with Sanskrit, meaning, and modern relevance.",
    "alternativeHeadline": "Bhagavad Gita Chapter 13 (Field & Knower) — All Verses",
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
      "url": "https://wisdomquotes.in/assets/chapter13.webp",
      "width": 1200,
      "height": 675
    },
    "datePublished": "2026-05-18",
    "dateModified": "2026-05-18",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13"
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
    "keywords": "bhagwat geeta chapter 13, bhagavad gita kshetra kshetrajna yoga, bhagwat geeta adhyay 13, field and knower of the field, qualities of knowledge gita, purusha prakriti gita, non-doer self gita, 13.8 amanitvam adambhitvam, Kshetra Kshetrajna Vibhaga Yoga meaning, field and knower of the field Bhagavad Gita, Bhagavad Gita 13.8 amanitvam adambhitvam, Bhagavad Gita 13.30 prakrtyaiva ca karmani, purusha prakriti Bhagavad Gita, self as witness Bhagavad Gita",
    "articleSection": "Bhagavad Gita",
    "wordCount": 2840,
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
        "name": "Bhagavad Gita Chapter 13 — Kshetra Kshetrajna Vibhaga Yoga",
        "item": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13"
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "What is Bhagavad Gita Chapter 13 about?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Chapter 13, called Kshetra Kshetrajna Vibhaga Yoga (the Yoga of the Distinction Between the Field and the Knower of the Field), is careful metaphysical work. Krishna teaches that the body, mind, and reactions are the field (kṣetra), and the awareness that observes them is the knower of the field (kṣetrajña). The chapter then describes the qualities of true knowledge (13.8-12), the supreme reality that is both near and far (13.16), and the freedom that comes from seeing the self as the non-doer (13.30)."
        }
      },
      {
        "@type": "Question",
        "name": "What is the field and the knower of the field in the Bhagavad Gita?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 13.2, Krishna says: 'This body is called the field. The one who knows it is the knower of the field.' The body, mind, emotions, and reactions are all the field — they are what is observed. The knower is the awareness that does the observing. On this reading, much suffering comes from confusing the observer with what is observed."
        }
      },
      {
        "@type": "Question",
        "name": "What are the qualities of knowledge in Bhagavad Gita 13.8-12?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verses 13.8 through 13.12 list about twenty qualities, depending on how you count: humility, unpretentiousness, non-violence, patience, uprightness, service to the teacher, purity, steadiness, self-control; dispassion toward sense objects, absence of ego, seeing the pain in birth, death, old age and sickness; non-attachment, not clinging to children, wife and home, even-mindedness in wanted and unwanted events; unwavering devotion to Krishna, a liking for solitary places, no taste for crowds; constant attention to knowledge of the Self, and insight into the goal of knowing the truth. The list is about character, with no ritual in it."
        }
      },
      {
        "@type": "Question",
        "name": "What does Bhagavad Gita 13.16 mean?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 13.16 describes the supreme reality as outside and within beings, moving and unmoving, too subtle to be known, and 'far away and near at hand' (dūra-sthaṃ ca antike ca). The teaching is that what is everywhere cannot be located in any particular place, and is therefore, in one sense, far (because it is not localised) and in another sense, near (because it is not absent from anywhere)."
        }
      },
      {
        "@type": "Question",
        "name": "What does it mean to see oneself as the non-doer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "In verse 13.30, Krishna says, 'One who sees all actions as performed by nature, and sees the self as the non-doer, sees rightly.' You keep responsibility for your actions. Actions happen through the body and mind, which belong to prakriti; the awareness witnesses them. The verse removes one kind of suffering: the belief that you alone are the cause of everything that happens through you."
        }
      },
      {
        "@type": "Question",
        "name": "What is the sun and field image in Bhagavad Gita 13.34?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Verse 13.34 says, 'As one sun illuminates the whole world, so the knower of the field illuminates the entire field.' The image puts the chapter into one comparison. The sun is not affected by what it lights — dust does not make it dusty, cold does not make it cold. The same is true of awareness: it lights up everything in the field of experience, but is not stained by what it observes. Grief is fully seen; the awareness seeing it remains as it was."
        }
      }
    ]
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.2",
    "text": "The Blessed One said: this body, Arjuna, is called the field. The one who knows it — the knowers call the knower of the field.",
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
      "name": "Bhagavad Gita, Chapter 13, Verse 2"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "श्रीभगवानुवाच / इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते । / एतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः ॥",
      "śrī bhagavān uvāca | / idaṃ śarīraṃ kaunteya kṣetram ity abhidhīyate | / etad yo vetti taṃ prāhuḥ kṣetrajña iti tad-vidaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.2"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.7",
    "text": "Desire, aversion, pleasure, pain, the body, consciousness, steadiness — this field, with its modifications, is briefly described.",
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
      "name": "Bhagavad Gita, Chapter 13, Verse 7"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "इच्छा द्वेषः सुखं दुःखं सङ्घातश्चेतनाधृतिः । / एतत्क्षेत्रं समासेन सविकारमुदाहृतम् ॥",
      "icchā dveṣaḥ sukhaṃ duḥkhaṃ saṅghātaś cetanā dhṛtiḥ | / etat kṣetraṃ samāsena sa-vikāram udāhṛtam ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.7"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.8",
    "text": "Absence of pride, absence of pretence, non-violence, patience, simplicity, service to the teacher, cleanliness, steadiness, self-control.",
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
      "name": "Bhagavad Gita, Chapter 13, Verse 8"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम् । / आचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः ॥",
      "amānitvam adambhitvam ahiṃsā kṣāntir ārjavam | / ācāryopāsanaṃ śaucaṃ sthairyam ātma-vinigrahaḥ ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.8"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.16",
    "text": "Outside and within beings, unmoving and moving, too subtle to be known — that supreme is both far away and near at hand.",
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
      "name": "Bhagavad Gita, Chapter 13, Verse 16"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "बहिरन्तश्च भूतानामचरं चरमेव च । / सूक्ष्मत्वात्तदविज्ञेयं दूरस्थं चान्तिके च तत् ॥",
      "bahir antaś ca bhūtānām acaraṃ caram eva ca | / sūkṣmatvāt tad avijñeyaṃ dūra-sthaṃ cāntike ca tat ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.16"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.30",
    "text": "The one who sees that all actions are performed by nature alone, and sees the self as the non-doer — that one sees rightly.",
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
      "name": "Bhagavad Gita, Chapter 13, Verse 30"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "प्रकृत्यैव च कर्माणि क्रियमाणानि सर्वशः । / यः पश्यति तथाऽऽत्मानमकर्तारं स पश्यति ॥",
      "prakṛtyaiva ca karmāṇi kriyamāṇāni sarvaśaḥ | / yaḥ paśyati tathātmānam akartāraṃ sa paśyati ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.30"
  },
  {
    "@context": "https://schema.org",
    "@type": "Quotation",
    "@id": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.34",
    "text": "As one sun illuminates this whole world, so the knower of the field illuminates the entire field, Arjuna.",
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
      "name": "Bhagavad Gita, Chapter 13, Verse 34"
    },
    "inLanguage": [
      "sa",
      "en"
    ],
    "alternateName": [
      "यथा प्रकाशयत्येकः कृत्स्नं लोकमिमं रविः । / क्षेत्रं क्षेत्री तथा कृत्स्नं प्रकाशयति भारत ॥",
      "yathā prakāśayaty ekaḥ kṛtsnaṃ lokam imaṃ raviḥ | / kṣetraṃ kṣetrī tathā kṛtsnaṃ prakāśayati bhārata ||"
    ],
    "url": "https://wisdomquotes.in/blogs/bhagwat-geeta-chapter-13#verse-13.34"
  }
]

export default function ChapterPage13() {
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
          Bhagavad Gita Chapter 13
        </div>
      </div>

      {/* ── HERO ── */}
      <div className="article-hero">
        <div className="article-hero-inner">
          <div className="chapter-badge">
            <div className="chapter-badge-dot"></div>
            Bhagavad Gita · Adhyay 13 · 35 Verses
            <div className="chapter-badge-dot"></div>
          </div>
          <h1 className="article-title">
            Bhagavad Gita Chapter 13 (Adhyay 13):<br />
            <em>Kshetra Kshetrajna Vibhaga Yoga</em>
          </h1>
          <p className="article-subtitle">
            Chapter 13 separates the seer from the seen: your body, reactions and moods are the field, and the one who knows them is the knower of the field.
          </p>
          <div className="article-meta">
            <span className="meta-item">By <a href="/about" rel="author" data-mp-location="byline_author" style={{ color: 'var(--gold-light)', borderBottom: '1px solid rgba(200,136,30,0.35)' }}>Ankur Shukla</a></span>
          <span className="meta-sep">·</span>
          <span className="meta-item">35 verses · Kshetra Kshetrajna Vibhaga Yoga</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">~13 min read</span>
            <span className="meta-sep">·</span>
            <span className="meta-item">Chapter 13 of 18</span>
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
              src="/assets/chapter13.webp"
              alt="The field and the knower of the field — a meditator observing the play of body, sensation, and thought without being captured by it. Chapter 13 of the Bhagavad Gita."
              width="1200"
              height="675"
              loading="eager"
            />
          </figure>

        <p className="lead">
          Chapter 13 is careful metaphysical work, and a quiet chapter. It has no single famous verse the way Chapter 2 or Chapter 11 does. What it has is a useful distinction: the difference between the <em>kṣetra</em>, the field, and the <em>kṣetrajña</em>, the knower of the field. The body, the mind, the emotions, the conditioned reactions: all of these are the field. The awareness that observes them, that does not change as they change, is the knower.
        </p>

        <p>
          Once you grasp this distinction, much of the Gita's earlier teaching becomes clearer. The non-attachment of Chapter 2, the witness-self of Chapter 5, the steady mind of Chapter 6, all lean on this distinction. You learn to recognize what is observed and what does the observing, and you stop identifying with what is observed. Chapter 13 works through the implications verse by verse.
        </p>

        <nav className="toc" aria-label="Table of contents">
          <div className="toc-label">In this article</div>
          <ol className="toc-list">
            <li><a href="#body-as-field">The body is the field, 13.1 and 13.2</a></li>
            <li><a href="#reactions-are-field">Your reactions belong to the field</a></li>
            <li><a href="#qualities-of-knowledge">What knowledge looks like, 13.8–12</a></li>
            <li><a href="#near-and-far">What is far away and yet within everything</a></li>
            <li><a href="#attachment-binds">Why attachment to qualities keeps the cycle going</a></li>
            <li><a href="#non-doer">Seeing oneself as the non-doer</a></li>
            <li><a href="#sun-image">The awareness that lights everything, 13.34</a></li>
            <li><a href="#all-verses">All verses at a glance</a></li>
            <li><a href="#faq">Frequently asked questions</a></li>
            <li><a href="#related-reading">Related reading</a></li>
          </ol>
        </nav>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 13.1–13.2 · The Foundational Distinction
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="body-as-field">The Body Is the Field. You Are the One Who Knows It.</h2>

        <p>
          In the editions that number Arjuna&apos;s question as 13.1, the chapter opens with him asking for definitions: prakriti and purusha, the field and its knower, knowledge and what is to be known. Krishna&apos;s reply in verse 13.2 is short: <em>idaṃ śarīraṃ kṣetram ity abhidhīyate</em>: this body is called the field. The one who knows it is the knower of the field.
        </p>

        <p>
          Read it slowly. The body is the field, and you are the one who knows it. The same distinction applies, by extension, to the mind, the thoughts, the moods, the desires. All of these are the field: they are what is observed. The knower is what does the observing. Much suffering, on this reading, comes from confusing the observer with what is observed. Chapter 13 unpicks that confusion slowly.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.2"
          speaker="Krishna"
          sanskrit="श्रीभगवानुवाच इदं शरीरं कौन्तेय क्षेत्रमित्यभिधीयते । एतद्यो वेत्ति तं प्राहुः क्षेत्रज्ञ इति तद्विदः ॥"
          iast="śrī bhagavān uvāca | idaṃ śarīraṃ kaunteya kṣetram ity abhidhīyate | etad yo vetti taṃ prāhuḥ kṣetrajña iti tad-vidaḥ ||"
          essence="This body is called the field; the one who knows it is called the knower of the field."
        />

        <div className="pull-quote">
          <blockquote>
            "This body is called the field. The one who knows it is the knower of the field."
          </blockquote>
          <cite>Bhagavad Gita 13.2</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 13.7 · The Reactions Belong to the Field
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="reactions-are-field">Your Reactions Belong to the Field</h2>

        <p>
          Verse 13.7 extends the distinction further than most readers expect. Krishna lists what belongs to the field: desire, aversion, pleasure, pain, the body, consciousness in its organized form, and resolve. All of these, he says, are the field with its modifications.
        </p>

        <p>
          Read this list and you will recognize most of what you have been calling your inner life: wanting, not wanting, pleasant and unpleasant sensations. The Gita places all of it in the field. On this account, the reaction that just took hold of you is something you can observe, and so belongs to the field rather than to the knower.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.7"
          speaker="Krishna"
          sanskrit="इच्छा द्वेषः सुखं दुःखं सङ्घातश्चेतनाधृतिः । एतत्क्षेत्रं समासेन सविकारमुदाहृतम् ॥"
          iast="icchā dveṣaḥ sukhaṃ duḥkhaṃ saṅghātaś cetanā dhṛtiḥ | etat kṣetraṃ samāsena sa-vikāram udāhṛtam ||"
          meaning="Desire, aversion, pleasure, pain, the body, consciousness, steadiness, this field, with its modifications, is briefly described."
          insightLabel="What this verse moves out of &quot;you&quot;"
          insight="Desire, aversion, pleasure, pain and resolve are what most of us call our identity. The verse files all of them under the field. You still have the desire, and you can also watch it."
          essence="Desire, aversion, pleasure, pain, the body, consciousness, resolve: this is the field with its changes."
        />

        <div className="highlight-box">
          <p>
            <strong>A small experiment:</strong> The next time you feel angry or afraid, notice that you are watching it, the way 13.7 lists desire and aversion among the things the knower sees. The feeling is still there; you are also the one who sees it.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verses 13.8–13.12 · The Qualities of Knowledge
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="qualities-of-knowledge">What Knowledge Looks Like in a Person</h2>

        <p>
          Verses 13.8 through 13.12 describe knowledge as a quality of character. The list of qualities in 13.8–12 runs to about twenty items, depending on how you count, and it is grounded: humility, unpretentiousness, non-violence, patience, uprightness, service to the teacher, purity, steadiness, self-control; dispassion toward sense objects, absence of ego, seeing the pain in birth, death, old age and sickness; non-attachment, not clinging to children, wife and home, even-mindedness in wanted and unwanted events; unwavering devotion to Krishna, a liking for solitary places, no taste for crowds; constant attention to knowledge of the Self, and insight into the goal of knowing the truth.
        </p>

        <p>
          The Gita has just drawn the line between field and knower. The list describes a person who lives by that line: someone who has stopped needing to perform, who does not react to every provocation, and who looks at old age and death without flinching.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.8"
          speaker="Krishna"
          sanskrit="अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम् । आचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः ॥"
          iast="amānitvam adambhitvam ahiṃsā kṣāntir ārjavam | ācāryopāsanaṃ śaucaṃ sthairyam ātma-vinigrahaḥ ||"
          meaning="Absence of pride, absence of pretence, non-violence, patience, simplicity, service to the teacher, cleanliness, steadiness, self-control."
          insightLabel="The first nine qualities, and what they share"
          insight="Several of these qualities are stated as absences in Sanskrit: amānitvam (no pride), adambhitvam (no pretence), ahiṃsā (no violence). The portrait is mostly about what drops away."
          essence="Humility, unpretentiousness, non-violence, patience, uprightness, serving the teacher, purity, steadiness, self-control."
        />

                <ShlokaCard
          verseRef="Bhagavad Gita 13.12"
          speaker="Krishna"
          sanskrit="अध्यात्मज्ञाननित्यत्वं तत्त्वज्ञानार्थदर्शनम् । एतज्ज्ञानमिति प्रोक्तमज्ञानं यदतोऽन्यथा ॥"
          iast="adhyātma-jñāna-nityatvaṃ tattva-jñānārtha-darśanam | etaj jñānam iti proktam ajñānaṃ yad ato'nyathā ||"
          meaning="Constant awareness of the inner reality, and seeing the supreme reality as the meaning, this is called knowledge. Whatever is contrary to this is ignorance."
          insightLabel="Where the list ends"
          insight="The list ends with constant knowledge of the Self and insight into the purpose of knowing the truth. The earlier items read as the conditions for these two, and Krishna calls the whole list knowledge, so character and insight go together."
          essence="Constant knowledge of the Self and insight into the goal of truth; the opposite is ignorance."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 13.16 · Near and Far
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="near-and-far">What Is Subtle Cannot Be Located, and Therefore Is Everywhere</h2>

        <p>
          Verse 13.16 is poetic and also exact. Krishna describes the supreme reality as inside and outside all beings, moving and unmoving, subtle and therefore unknowable, far away and near at hand. The phrase that catches readers is the last one: <em>dūra-sthaṃ ca antike ca</em>, far away and near at hand at once.
        </p>

        <p>
          Why this paradox? Because what is everywhere cannot be located. What cannot be located is, in one sense, far, because it is not in any particular place you can point to. And in another sense, near, because there is no place it is not. The verse names what it is like to look for the Divine: you cannot point to it, and you cannot be anywhere it is absent, including the place you are searching from.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.16"
          speaker="Krishna"
          sanskrit="बहिरन्तश्च भूतानामचरं चरमेव च । सूक्ष्मत्वात्तदविज्ञेयं दूरस्थं चान्तिके च तत् ॥"
          iast="bahir antaś ca bhūtānām acaraṃ caram eva ca | sūkṣmatvāt tad avijñeyaṃ dūra-sthaṃ cāntike ca tat ||"
          meaning="Outside and within beings, unmoving and moving, too subtle to be known, that supreme is both far away and near at hand."
          insightLabel="The grammar of omnipresence"
          insight="Notice the verse pairs opposites, inside/outside, moving/unmoving, far/near. The Gita often does this when describing the Divine, since neither side of a pair is enough alone. By its grammar the verse tells you not to expect the Divine in one place and not another."
          essence="Outside and within beings, unmoving and moving, too subtle to know, it is far away and near."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 13.22 · What Keeps the Cycle Turning
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="attachment-binds">Attachment to Qualities Is What Keeps Pulling You Back</h2>

        <p>
          Verse 13.22 explains, in one sentence, why people keep ending up in the same patterns life after life, or, read within one life, year after year. The verse says: the inner being, situated in nature, experiences the qualities born of nature. Attachment to those qualities is what causes rebirth in good and bad situations.
        </p>

        <p>
          Read in a personal register, the verse locates the trap in your attachment to the qualities (the gunas), your investment in being a certain kind of person, your craving for the kind of state you prefer, your aversion to the kind of state you don't. Drop the attachment and the qualities still appear, but they have less to hold on to. The Gita&apos;s bet is to work on the attachment rather than trying to change the qualities first.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.22"
          speaker="Krishna"
          sanskrit="पुरुषः प्रकृतिस्थो हि भुङ्क्ते प्रकृतिजान्गुणान् । कारणं गुणसङ्गोऽस्य सदसद्योनिजन्मसु ॥"
          iast="puruṣaḥ prakṛti-stho hi bhuṅkte prakṛti-jān guṇān | kāraṇaṃ guṇa-saṅgo'sya sad-asad-yoni-janmasu ||"
          meaning="The inner being, situated within nature, experiences the qualities born of nature. Attachment to those qualities is the cause of birth in good and bad situations."
          insightLabel="The cause is attachment"
          insight="The qualities themselves are inevitable: the inner being situated in nature experiences them. The cause the verse names is guṇa-saṅgaḥ, attachment to the qualities: the gripping of the wanting and the insistence on more pleasure."
          essence="Purusha, seated in prakriti, experiences its gunas; attachment to them causes birth in good and bad wombs."
        />

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 13.30 · The Non-Doer
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="non-doer">Seeing Oneself as the Non-Doer</h2>

        <p>
          Verse 13.30 runs against intuition. Krishna says: one who sees all actions as being performed by nature alone, and sees the self as the non-doer, sees rightly.
        </p>

        <p>
          Many modern readers resist this verse at first, because it can sound like a denial of responsibility. Read carefully, the claim is narrower: the body acts, the mind decides, the personality reacts, and all of this is nature in motion. The deepest <em>self</em> (the knower) is the witness of all this happening. You keep responsibility for your actions; what the verse asks you to drop is the identification with the doer that causes suffering. You can act fully and well and still see that prakriti, not the knower, is moving.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.30"
          speaker="Krishna"
          sanskrit="प्रकृत्यैव च कर्माणि क्रियमाणानि सर्वशः । यः पश्यति तथाऽऽत्मानमकर्तारं स पश्यति ॥"
          iast="prakṛtyaiva ca karmāṇi kriyamāṇāni sarvaśaḥ | yaḥ paśyati tathātmānam akartāraṃ sa paśyati ||"
          meaning="The one who sees that all actions are performed by nature alone, and sees the self as the non-doer, that one sees rightly."
          insightLabel="How the verse can be misread, and how to read it right"
          insight="Consequences still follow; karma still applies; responsibility still attaches. What changes is the inner story: you stop telling yourself that you alone are the cause of what happens through you. The work still gets done."
          essence="Whoever sees all action done by prakriti alone, and the Self as non-doer, sees rightly."
        />

        <div className="pull-quote">
          <blockquote>
            "All actions are done by nature alone. The one who sees the self as the non-doer, sees rightly."
          </blockquote>
          <cite>Bhagavad Gita 13.30</cite>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            Verse 13.34 · The Sun and the Field
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="sun-image">As One Sun Lights the Whole World</h2>

        <p>
          In the second-last verse of the chapter, Krishna gives an image. He says: as one sun illuminates the whole world, so the knower of the field illuminates the whole field. The verse puts the chapter into one comparison. The sun is far away from what it lights, and yet what it lights is wholly seen by it. The sun is not affected by what it lights, the dust it shines on does not make the sun dusty, the cold of the morning does not make the sun cold.
        </p>

        <p>
          The same is true of the knower. Awareness lights up the whole field, body, mind, emotions, sensations, and is not stained by any of it.  In this image the knower is the sun, and the field is what its light makes visible.
        </p>

                <ShlokaCard
          verseRef="Bhagavad Gita 13.34"
          speaker="Krishna"
          sanskrit="यथा प्रकाशयत्येकः कृत्स्नं लोकमिमं रविः । क्षेत्रं क्षेत्री तथा कृत्स्नं प्रकाशयति भारत ॥"
          iast="yathā prakāśayaty ekaḥ kṛtsnaṃ lokam imaṃ raviḥ | kṣetraṃ kṣetrī tathā kṛtsnaṃ prakāśayati bhārata ||"
          meaning="As one sun illuminates this whole world, so the knower of the field illuminates the entire field, Arjuna."
          insightLabel="The sun and what it lights"
          insight="The sun does not become what it lights. Awareness does not become what it observes. The grief is fully witnessed; the awareness witnessing it remains as it was. That is what makes Chapter 13&apos;s distinction useful: whatever appears in the field, however intense, does not turn into the seer."
          essence="As one sun lights this whole world, so the knower of the field lights the whole field."
        />

        <div className="highlight-box">
          <p>
            <strong>How Chapter 13 connects to earlier chapters:</strong> The non-attachment of Chapter 2, the witness of Chapter 5, the steady mind of Chapter 6 and the equanimity of Chapter 12 all lean on the field-knower distinction, even though Chapter 13 is quoted less often.
          </p>
        </div>

        {/* DIVIDER */}
        <div className="section-divider">
          <div className="section-divider-line"></div>
          <div className="section-divider-label">
            All 35 Verses At a Glance
          </div>
          <div className="section-divider-line"></div>
        </div>

        <h2 id="all-verses">The Complete Verse Reference</h2>

        <table className="verse-table">
          <thead>
            <tr><th>Verse</th><th>Speaker</th><th>Teaching Essence</th></tr>
          </thead>
          <tbody>
            <tr><td>13.1</td><td>Arjuna</td><td>I want to know prakriti and purusha, the field and its knower, knowledge and what is to be known</td></tr>
            <tr><td>13.2</td><td>Krishna</td><td>This body is called the field; the one who knows it is called the knower of the field</td></tr>
            <tr><td>13.3</td><td>Krishna</td><td>Know me as the knower in every field; knowing field and knower is true knowledge</td></tr>
            <tr><td>13.4</td><td>Krishna</td><td>Hear briefly what the field is, what it is like, how it changes, and who its knower is</td></tr>
            <tr><td>13.5</td><td>Krishna</td><td>Sages have sung this in many ways, in hymns and in the reasoned verses of the Brahma Sutras</td></tr>
            <tr><td>13.6</td><td>Krishna</td><td>The great elements, ego, intellect, the unmanifest, the ten senses, the mind, and the five sense objects</td></tr>
            <tr><td>13.7</td><td>Krishna</td><td>desire, aversion, pleasure, pain, the body, consciousness, resolve: this is the field with its changes</td></tr>
            <tr><td>13.8</td><td>Krishna</td><td>Humility, unpretentiousness, non-violence, patience, uprightness, serving the teacher, purity, steadiness, self-control</td></tr>
            <tr><td>13.9</td><td>Krishna</td><td>Dispassion toward sense objects, absence of ego, seeing the pain in birth, death, old age and sickness</td></tr>
            <tr><td>13.10</td><td>Krishna</td><td>Non-attachment, no clinging to children, wife and home, even-mindedness in wanted and unwanted events</td></tr>
            <tr><td>13.11</td><td>Krishna</td><td>Unwavering devotion to me, a liking for solitary places, and no taste for crowds</td></tr>
            <tr><td>13.12</td><td>Krishna</td><td>Constant knowledge of the Self and insight into the goal of truth; the opposite is ignorance</td></tr>
            <tr><td>13.13</td><td>Krishna</td><td>I will describe what is to be known: beginningless Brahman, called neither being nor non-being</td></tr>
            <tr><td>13.14</td><td>Krishna</td><td>With hands, feet, eyes, heads and mouths everywhere, it stands enveloping everything</td></tr>
            <tr><td>13.15</td><td>Krishna</td><td>It shines through every sense yet has none; unattached, it supports all; beyond the gunas, it experiences them</td></tr>
            <tr><td>13.16</td><td>Krishna</td><td>Outside and within beings, unmoving and moving, too subtle to know, it is far away and near</td></tr>
            <tr><td>13.17</td><td>Krishna</td><td>Undivided, it seems divided among beings; it sustains, devours and creates them</td></tr>
            <tr><td>13.18</td><td>Krishna</td><td>The light of lights, beyond darkness; knowledge, the known and its goal, seated in every heart</td></tr>
            <tr><td>13.19</td><td>Krishna</td><td>Field, knowledge and the knowable are told in brief; my devotee who knows this reaches my state</td></tr>
            <tr><td>13.20</td><td>Krishna</td><td>Know prakriti and purusha both as beginningless; changes and gunas arise from prakriti</td></tr>
            <tr><td>13.21</td><td>Krishna</td><td>Prakriti causes body, senses and action; purusha causes the experience of pleasure and pain</td></tr>
            <tr><td>13.22</td><td>Krishna</td><td>Purusha, seated in prakriti, experiences its gunas; attachment to them causes birth in good and bad wombs</td></tr>
            <tr><td>13.23</td><td>Krishna</td><td>The supreme purusha in this body is called witness, permitter, sustainer, experiencer, great lord, supreme Self</td></tr>
            <tr><td>13.24</td><td>Krishna</td><td>Whoever knows purusha, and prakriti with its gunas, is not born again, however they live</td></tr>
            <tr><td>13.25</td><td>Krishna</td><td>Some see the Self in themselves by meditation, some by the path of knowledge, some by the yoga of action</td></tr>
            <tr><td>13.26</td><td>Krishna</td><td>Others, not knowing this, worship by hearing from others, and they too cross beyond death</td></tr>
            <tr><td>13.27</td><td>Krishna</td><td>Whatever is born, moving or unmoving, comes from the union of the field and its knower</td></tr>
            <tr><td>13.28</td><td>Krishna</td><td>Whoever sees the supreme Lord present equally in every being, undying among the dying, sees rightly</td></tr>
            <tr><td>13.29</td><td>Krishna</td><td>Seeing the same Lord everywhere, they do not harm the Self by the self, and reach the highest goal</td></tr>
            <tr><td>13.30</td><td>Krishna</td><td>Whoever sees all action done by prakriti alone, and the Self as non-doer, sees rightly</td></tr>
            <tr><td>13.31</td><td>Krishna</td><td>When one sees separate beings resting in the One and spreading out from it, one reaches Brahman</td></tr>
            <tr><td>13.32</td><td>Krishna</td><td>Beginningless and beyond the gunas, this imperishable Self neither acts nor is stained, though in the body</td></tr>
            <tr><td>13.33</td><td>Krishna</td><td>As all-pervading space, being subtle, is not stained, so the Self in the body is not stained</td></tr>
            <tr><td>13.34</td><td>Krishna</td><td>As one sun lights this whole world, so the knower of the field lights the whole field</td></tr>
            <tr><td>13.35</td><td>Krishna</td><td>Those who see with the eye of knowledge the field, its knower, and release from prakriti reach the supreme</td></tr>
          </tbody>
        </table>

        <div className="chapter-nav">
          <div>
            <div className="ch-nav-label">Previous</div>
            <a href="/blogs/bhagwat-geeta-chapter-12" className="ch-nav-title">Chapter 12, Bhakti Yoga</a>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="ch-nav-label">Next</div>
            <a href="/blogs/bhagwat-geeta-chapter-14" className="ch-nav-title">Chapter 14, Gunatraya Vibhaga Yoga</a>
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


        <p className="errata-note" style={{ fontSize: '13px', fontStyle: 'italic', opacity: 0.7 }}>Revised October 2026: corrected the count of qualities in 13.8–12 (about twenty, not eighteen) and made the body and FAQ lists match, and noted that 13.34 is the chapter&apos;s second-last verse, not its last; copy edited.</p>

        <div className="faq-section" id="faq">
          <div className="faq-header">
            <div className="faq-header-label">Common questions</div>
            <h2>Frequently Asked Questions</h2>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is Bhagavad Gita Chapter 13 about?</div>
            <div className="faq-a">
              Chapter 13, called Kshetra Kshetrajna Vibhaga Yoga (the Yoga of the Distinction Between the Field and the Knower of the Field), is careful metaphysical work. Krishna teaches that the body, mind, and reactions are the <em>field</em> (<em>kṣetra</em>), and the awareness that observes them is the <em>knower of the field</em> (<em>kṣetrajña</em>). The chapter then describes the qualities of true knowledge (13.8-12), the supreme reality that is both near and far (13.16), and the freedom that comes from seeing the self as the non-doer (13.30).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the field and the knower of the field in the Bhagavad Gita?</div>
            <div className="faq-a">
              In verse 13.2, Krishna says: 'This body is called the field. The one who knows it is the knower of the field.' The body, mind, emotions, and reactions are all the field, they are what is observed. The knower is the awareness that does the observing. On this reading, much suffering comes from confusing the observer with what is observed.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What are the qualities of knowledge in Bhagavad Gita 13.8-12?</div>
            <div className="faq-a">
              Verses 13.8 through 13.12 list about twenty qualities, depending on how you count: humility, unpretentiousness, non-violence, patience, uprightness, service to the teacher, purity, steadiness, self-control; dispassion toward sense objects, absence of ego, seeing the pain in birth, death, old age and sickness; non-attachment, not clinging to children, wife and home, even-mindedness in wanted and unwanted events; unwavering devotion to Krishna, a liking for solitary places, no taste for crowds; constant attention to knowledge of the Self, and insight into the goal of knowing the truth. The list is about character, with no ritual in it.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does Bhagavad Gita 13.16 mean?</div>
            <div className="faq-a">
              Verse 13.16 describes the supreme reality as outside and within beings, moving and unmoving, too subtle to be known, and 'far away and near at hand' (<em>dūra-sthaṃ ca antike ca</em>). The teaching is that what is everywhere cannot be located in any particular place, and is therefore, in one sense, far (because it is not localised) and in another sense, near (because it is not absent from anywhere).
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What does it mean to see oneself as the non-doer?</div>
            <div className="faq-a">
              In verse 13.30, Krishna says, 'One who sees all actions as performed by nature, and sees the self as the non-doer, sees rightly.' You keep responsibility for your actions. Actions happen through the body and mind, which belong to prakriti; the awareness witnesses them. The verse removes one kind of suffering: the belief that you alone are the cause of everything that happens through you.
            </div>
          </div>
          <div className="faq-item">
            <div className="faq-q">What is the sun and field image in Bhagavad Gita 13.34?</div>
            <div className="faq-a">
              Verse 13.34 says, 'As one sun illuminates the whole world, so the knower of the field illuminates the entire field.' The image puts the chapter into one comparison. The sun is not affected by what it lights, dust does not make it dusty, cold does not make it cold. The same is true of awareness: it lights up everything in the field of experience, but is not stained by what it observes. Grief is fully seen; the awareness seeing it remains as it was.
            </div>
          </div>
        </div>

        <div className="related-reading" id="related-reading">
          <div className="related-reading-label">Continue reading</div>
          <h2>Related Reading</h2>
          <div className="related-grid">
          <a href="/blogs/bhagavad-gita-anxiety-mental-peace" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">What the Gita says about anxiety & mental peace</div>
          </a>
          <a href="/blogs/bhagavad-gita-for-beginners" className="related-card">
            <div className="related-card-label">Topic Guide</div>
            <div className="related-card-title">Bhagavad Gita for beginners</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-14" className="related-card">
            <div className="related-card-label">Chapter 14</div>
            <div className="related-card-title">Gunatraya Vibhaga, The Three Forces</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-15" className="related-card">
            <div className="related-card-label">Chapter 15</div>
            <div className="related-card-title">Purushottama Yoga, Cut the Tree, Find the Source</div>
          </a>
          <a href="/blogs/bhagwat-geeta-chapter-6" className="related-card">
            <div className="related-card-label">Chapter 6</div>
            <div className="related-card-title">Dhyana Yoga, The Lamp That Does Not Flicker</div>
          </a>
          </div>
        </div>

          <VerseFunnelCTA variant="chapter" locale="en" pageName={"Bhagwat Geeta Chapter 13"} />

        </article>
      </div>

      {/* FOOTER */}
      <SiteFooter />

      <BlogTracker pageName="Bhagwat Geeta Chapter 13" />
    </>
  )
}
