// Structured data for /app — Wisdom for iPhone (daily practice app).
const appSchemas = [
  {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'MobileApplication',
        name: 'Wisdom: Bhagavad Gita, tuned to your life',
        operatingSystem: 'iOS',
        applicationCategory: 'HealthApplication',
        description:
          'Wisdom is an iPhone app that tunes the Bhagavad Gita to your life, one verse a day. Say how you feel and what is going on; Wisdom picks the verse that speaks to it and builds a 7-day plan (see it, steady it, act on it, then a story), read aloud, with today’s shloka on your Home Screen and Lock Screen.',
        offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
        url: 'https://apps.apple.com/app/id6747684125',
        publisher: {
          '@type': 'Organization',
          name: 'Wisdom',
          url: 'https://wisdomquotes.in',
        },
        screenshot: [
          'https://wisdomquotes.in/assets/app-v3/store-1.webp',
          'https://wisdomquotes.in/assets/app-v3/store-2.webp',
          'https://wisdomquotes.in/assets/app-v3/store-3.webp',
          'https://wisdomquotes.in/assets/app-v3/store-4.webp',
        ],
      },
      {
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is the best Bhagavad Gita app for iPhone?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Wisdom is built for reading the Gita for your own life. You say how you feel and what is going on, and it picks one verse a day for it, with the Sanskrit, the meaning and what it says for you, read aloud. It builds a 7-day plan around your situation and puts today’s shloka on your Lock Screen.',
            },
          },
          {
            '@type': 'Question',
            name: 'Does the Wisdom app have audio?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes. Every day of a plan is read aloud, with the Sanskrit shloka woven into the story: Arjuna said, Krishna replied. Audio stories also come from the Ramayana and Mahabharata.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Wisdom free?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Week 1 of your plan is free. Wisdom Pro opens weeks 2 and 3, which go from your situation to the pattern underneath it and then to who you are beyond it.',
            },
          },
          {
            '@type': 'Question',
            name: 'Is Wisdom available on Android?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'The app is on iPhone. On Android or a computer you can get your verse at wisdomquotes.in and build a 7-day plan on the web.',
            },
          },
        ],
      },
    ],
  },
]
export default appSchemas
