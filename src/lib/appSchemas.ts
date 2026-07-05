// Structured data for /app — Wisdom for iPhone (daily practice app).
const appSchemas = [
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MobileApplication',
        name: 'Wisdom — Daily Shloka & Bhagavad Gita App',
        operatingSystem: 'iOS',
        applicationCategory: 'LifestyleApplication',
        description:
          'Wisdom is a daily practice app for iPhone rooted in the Bhagavad Gita. Receive one Sanskrit shloka each day with English meaning, deeper explanation, modern relevance, journaling, home screen widgets, and personalised spiritual paths (Wisdom, Action, Devotion).',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.9',
          ratingCount: '42',
        },
        url: 'https://apps.apple.com/us/app/wisdom-app-quotes-widget/id6747684125',
        publisher: {
          '@type': 'Organization',
          name: 'Wisdom',
          url: 'https://wisdomquotes.in',
        },
        screenshot: [
          'https://wisdomquotes.in/assets/home-screen-quote1.webp',
          'https://wisdomquotes.in/assets/app-wisdom-practice.webp',
          'https://wisdomquotes.in/assets/app-action-practice.webp',
          'https://wisdomquotes.in/assets/app-devotion-practice.webp',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best Bhagavad Gita app for daily reading?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wisdom is designed specifically for daily Bhagavad Gita reading. It delivers one shloka a day with Sanskrit text, English meaning, deeper explanation, modern relevance, and a private journal — making it easy to build a sustainable daily practice.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does Wisdom include Sanskrit shlokas with meaning?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every shloka in Wisdom includes the original Sanskrit text, a simple English meaning, a deeper explanation drawn from traditional commentary, and a section on modern relevance.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the app include journaling and reminders?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Wisdom includes a private journal tied to each shloka, daily reminders at your chosen time, and home screen widgets so the verse stays with you throughout the day.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Wisdom available on iPhone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Wisdom is available on the App Store for iPhone. It is free to download.',
            },
          },
        ],
      },
    ],
  },
]
export default appSchemas
