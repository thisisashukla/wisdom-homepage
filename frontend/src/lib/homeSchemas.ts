// Structured data for the homepage — the free Bhagavad Gita web reader.
// The MobileApplication schema has moved to appSchemas.ts (used on /app).
const schemas = [
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        name: 'Wisdom: Bhagavad Gita, 700 Verses in Sanskrit with Meaning',
        url: 'https://wisdomquotes.in',
        description:
          'All 700 verses of the Bhagavad Gita in Sanskrit with meaning: 18 chapters in Sanskrit, Hindi and English, free, with no login. One verse per page with simple meaning and detailed commentary, and a new verse every day.',
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
          'The Bhagavad Gita: 18 chapters, 700 verses spoken by Krishna to Arjuna on the battlefield of Kurukshetra. Available here in Sanskrit Devanagari, Hindi anuvad, and English translation with detailed commentary. Free to read online.',
      },
      {
        '@type': 'Organization',
        name: 'Wisdom',
        url: 'https://wisdomquotes.in',
        logo: 'https://wisdomquotes.in/assets/new-light-logo.webp',
        description:
          'Wisdom tunes the Bhagavad Gita to your life. The website has every verse in Sanskrit, Hindi and English with meaning and commentary, and picks a verse for how you feel today. The iPhone app builds a 7-day audio plan around your situation.',
        sameAs: [
          'https://apps.apple.com/app/id6747684125',
          'https://www.instagram.com/wisdomquoteapp/',
          'https://wisdomquotes.in',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: "Can I read all 700 verses of the Bhagavad Gita free?",
            acceptedAnswer: { '@type': 'Answer', text: "Yes. All 18 chapters and 700 verses are free on wisdomquotes.in, each with the Sanskrit shloka, Hindi anuvad, an English translation and commentary. No login and no ads. To read the whole text, begin at 1.1: Arjuna's despair in chapter 1 is where Krishna's teaching starts." },
          },
          {
            '@type': 'Question',
            name: "Which Bhagavad Gita translation should I read? Is this ISKCON?",
            acceptedAnswer: { '@type': 'Answer', text: "No, it isn't ISKCON. Read one that shows you the Sanskrit and doesn't tie you to a single sect. Wisdom's English is its own, checked against Shankara, Ramanuja and modern acharyas. For a side-by-side look at Gita Press, Prabhupada, Easwaran and others, see wisdomquotes.in/blogs/best-bhagavad-gita-translation." },
          },
          {
            '@type': 'Question',
            name: "Is there a Bhagavad Gita verse for today?",
            acceptedAnswer: { '@type': 'Answer', text: "Yes. A new verse goes up every morning on wisdomquotes.in, with the Sanskrit, its meaning and audio. On iPhone, the Wisdom app can put it on your Lock Screen." },
          },
          {
            '@type': 'Question',
            name: "How does the Wisdom 7-day plan work?",
            acceptedAnswer: { '@type': 'Answer', text: "Answer a few questions about you and what's going on. Wisdom picks seven verses for it, one a day, starting with the Gita and drawing on the Upanishads, Ramayana and Mahabharata. Each comes with the Sanskrit and what it means for you. Week 1 is free: on iPhone in the app, and on Android and computers right here, after you sign in with Google." },
          },
          {
            '@type': 'Question',
            name: "Is the Bhagavad Gita available in Hindi?",
            acceptedAnswer: { '@type': 'Answer', text: "Yes. Every verse has a Hindi-first page at wisdomquotes.in/hi/gita with the shloka, Hindi anuvad and vistrit arth." },
          },
          {
            '@type': 'Question',
            name: "What does Wisdom cost?",
            acceptedAnswer: { '@type': 'Answer', text: "Reading is free. Week 1 of a plan is free, on the web and on iPhone. On iPhone, Pro opens weeks 2 and 3." },
          },
          {
            '@type': 'Question',
            name: "Is this a substitute for therapy?",
            acceptedAnswer: { '@type': 'Answer', text: "No. Many people read the Gita alongside therapy. If you're thinking about harming yourself, please call Tele-MANAS on 14416 (India, free, 24×7) or your local emergency number." },
          },
        ],
      },
    ],
  },
]
export default schemas
