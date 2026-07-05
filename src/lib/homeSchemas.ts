// Structured data for the homepage — the free Bhagavad Gita web reader.
// The MobileApplication schema has moved to appSchemas.ts (used on /app).
const schemas = [
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Wisdom — Bhagavad Gita Online',
        url: 'https://wisdomquotes.in',
        description:
          'Read the complete Bhagavad Gita online — all 18 chapters, 700 verses in Sanskrit, Hindi and English. Free. No login. One verse per page with simple meaning and detailed commentary.',
        publisher: {
          '@type': 'Organization',
          name: 'Wisdom',
          url: 'https://wisdomquotes.in',
          logo: 'https://wisdomquotes.in/assets/new-light-logo.webp',
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: 'https://wisdomquotes.in/gita?q={search_term_string}',
          'query-input': 'required name=search_term_string',
        },
      },
      {
        '@type': 'Book',
        name: 'Bhagavad Gita',
        alternateName: ['Bhagavat Gita', 'Bhagwat Geeta', 'भगवद्गीता'],
        author: { '@type': 'Person', name: 'Vyasa' },
        inLanguage: ['sa', 'hi', 'en'],
        numberOfPages: 700,
        bookFormat: 'https://schema.org/EBook',
        isAccessibleForFree: true,
        url: 'https://wisdomquotes.in/gita',
        description:
          'The Bhagavad Gita — 18 chapters, 700 verses spoken by Krishna to Arjuna on the battlefield of Kurukshetra. Available here in Sanskrit Devanagari, Hindi anuvad, and English translation with detailed commentary. Free to read online.',
      },
      {
        '@type': 'Organization',
        name: 'Wisdom',
        url: 'https://wisdomquotes.in',
        logo: 'https://wisdomquotes.in/assets/new-light-logo.webp',
        description:
          'Wisdom is a free online Bhagavad Gita reader — every verse in Sanskrit, Hindi and English with simple meaning and detailed commentary. An accompanying iOS app offers a daily practice.',
        sameAs: [
          'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125',
          'https://wisdomquotes.in',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'Where can I read the complete Bhagavad Gita online for free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'You can read every verse of the Bhagavad Gita free at wisdomquotes.in/gita. All 18 chapters and 700 verses are available in Sanskrit Devanagari, Hindi and English. No login. No paywall. One verse per page with a simple meaning and detailed commentary.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the Wisdom Gita reader include Sanskrit and Hindi?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every verse includes the original Sanskrit in Devanagari, a Hindi anuvad, and an English translation. Hindi readers can start at wisdomquotes.in/hi/gita for the Hindi-first layout.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is a login or download required to read the Gita on Wisdom?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'No. The Bhagavad Gita reader is a free website. No sign-up, no download, no paywall. If you want a daily practice on your phone, there is an optional iOS app at wisdomquotes.in/app.',
            },
          },
          {
            '@type': 'Question',
            name: 'How is the Wisdom Gita translation done?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Sanskrit and Hindi text are drawn from traditional sources. English translations are Wisdom editorial. Detailed commentary is AI-drafted from traditional commentaries (Shankara, Ramanuja, modern acharyas) and human-reviewed. Every verse links to a methodology page.',
            },
          },
          {
            '@type': 'Question',
            name: 'Which verse of the Bhagavad Gita should I read first?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Most readers start with BG 2.47 — Karmanye vadhikaraste — the most quoted verse in the Gita on doing your duty without attachment to results. Chapter 2 (Sankhya Yoga) is where Krishna begins the teaching in earnest. Chapter 1 is the setup.',
            },
          },
        ],
      },
    ],
  },
]
export default schemas
