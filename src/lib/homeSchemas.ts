const schemas = [
  {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "MobileApplication",
        "name": "Wisdom \u2014 Daily Shloka & Bhagavad Gita App",
        "operatingSystem": "iOS",
        "applicationCategory": "LifestyleApplication",
        "description": "Wisdom is a Bhagavad Gita and daily shloka app for iPhone. Receive one Sanskrit shloka each day with English meaning, deeper explanation, modern relevance, journaling, home screen widgets, and personalised spiritual themes.",
        "offers": {
          "@type": "Offer",
          "price": "0",
          "priceCurrency": "USD"
        },
        "url": "https://apps.apple.com/us/app/wisdom-eternal-quotes/id6747684125",
        "publisher": {
          "@type": "Organization",
          "name": "Wisdom",
          "url": "https://wisdomquotes.in"
        },
        "screenshot": [
          "https://wisdomquotes.in/assets/IMG_6942.webp",
          "https://wisdomquotes.in/assets/IMG_6946.webp",
          "https://wisdomquotes.in/assets/IMG_6947.webp",
          "https://wisdomquotes.in/assets/IMG_6938.webp"
        ]
      },
      {
        "@type": "Organization",
        "name": "Wisdom",
        "url": "https://wisdomquotes.in",
        "logo": "https://wisdomquotes.in/assets/male-logo-dark.webp",
        "description": "Wisdom builds daily spiritual practice apps rooted in the Bhagavad Gita and Hindu scriptures.",
        "sameAs": [
          "https://apps.apple.com/us/app/wisdom-eternal-quotes/id6747684125",
          "https://wisdomquotes.in"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is the best Bhagavad Gita app for daily reading?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wisdom is designed specifically for daily Bhagavad Gita reading. It delivers one shloka a day with Sanskrit text, English meaning, deeper explanation, modern relevance, and a private journal \u2014 making it easy to build a sustainable daily practice."
            }
          },
          {
            "@type": "Question",
            "name": "Does Wisdom include Sanskrit shlokas with meaning?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Every shloka in Wisdom includes the original Sanskrit text, a simple English meaning, a deeper explanation drawn from traditional commentary, and a section on modern relevance."
            }
          },
          {
            "@type": "Question",
            "name": "Can I use Wisdom as a daily spiritual practice app?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Wisdom is built around a one-shloka-a-day format designed to become a sustainable daily spiritual practice. You choose your delivery time, pick spiritual themes, and reflect in a private journal after each verse."
            }
          },
          {
            "@type": "Question",
            "name": "Does the app include journaling and reminders?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Wisdom includes a private journal tied to each shloka, daily reminders at your chosen time, and home screen widgets so the verse stays with you throughout the day."
            }
          },
          {
            "@type": "Question",
            "name": "Is Wisdom only for the Bhagavad Gita or other scriptures too?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Wisdom draws primarily from the Bhagavad Gita but also includes shlokas from other Hindu scriptures. The content is curated and personalised to the spiritual themes you choose."
            }
          },
          {
            "@type": "Question",
            "name": "Is Wisdom available on iPhone?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Yes. Wisdom is available on the App Store for iPhone. It is free to download."
            }
          }
        ]
      }
    ]
  }
]
export default schemas
