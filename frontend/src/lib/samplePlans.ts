/**
 * Real week-1 plans from POST /api/v1/recommend/plan, 19 Oct 2026: one call per
 * situation, no note (exactly what a visitor gets after one tap). Lines are as
 * returned; "forYou" is the first sentence of Day 1's for_you. Day 1 Sanskrit is
 * the first half of the shloka, speaker label removed.
 * 25 Oct 2026: three lines edited by hand for the copy review (relationship and
 * grief forYou, the Valmiki story line); the page says "lightly edited".
 * Regenerate with lp/scripts/sample_plans.py when the library changes.
 */
export type SampleDay = {
  day: number
  phase: string
  source: string
  href: string | null
  sanskrit: string | null
  line: string
  forYou: string | null
}
export type SamplePlan = { id: string; label: string; situation: string; title: string; days: SampleDay[] }

export const SAMPLE_PLANS_DATE = '19 Oct 2026'

export const SAMPLE_PLANS: SamplePlan[] = [
  {
    "id": "overthinking",
    "label": "Overthinking",
    "situation": "overthinking",
    "title": "The restless mind",
    "days": [
      {
        "day": 1,
        "phase": "See it",
        "source": "Gita 6.33",
        "href": "/gita/chapter/6/verse/33",
        "sanskrit": "योऽयं योगस्त्वया प्रोक्तः साम्येन मधुसूदन",
        "line": "This calm you describe, Krishna, I can't see it lasting. My mind is too restless.",
        "forYou": "Your mind is running, and you are tired of chasing it."
      },
      {
        "day": 2,
        "phase": "See it",
        "source": "Maha Upanishad 3.18",
        "href": null,
        "sanskrit": null,
        "line": "The mind runs here and there for nothing, wandering far like a stray village dog.",
        "forYou": null
      },
      {
        "day": 3,
        "phase": "Steady it",
        "source": "Maha Upanishad 4.29",
        "href": null,
        "sanskrit": null,
        "line": "Sorrow, craving and unbearable anxiety all vanish in a calm mind, like darkness before the sun.",
        "forYou": null
      },
      {
        "day": 4,
        "phase": "Steady it",
        "source": "Gita 6.19",
        "href": "/gita/chapter/6/verse/19",
        "sanskrit": null,
        "line": "Like a lamp in a windless place that doesn't flicker: that's a settled mind.",
        "forYou": null
      },
      {
        "day": 5,
        "phase": "Act on it",
        "source": "Swami Vivekananda",
        "href": null,
        "sanskrit": null,
        "line": "Let the monkey jump as much as he can; you simply wait and watch.",
        "forYou": null
      },
      {
        "day": 6,
        "phase": "Act on it",
        "source": "Yoga Vasishtha",
        "href": null,
        "sanskrit": null,
        "line": "Raise your mind like a child: gently, patiently, little by little, never by force.",
        "forYou": null
      },
      {
        "day": 7,
        "phase": "A story",
        "source": "Yoga Vasishtha",
        "href": null,
        "sanskrit": null,
        "line": "One spring morning, a king out for a walk overheard a song that he could not stop thinking about.",
        "forYou": null
      }
    ]
  },
  {
    "id": "result",
    "label": "It didn't work out",
    "situation": "didnt_work_out",
    "title": "Carrying the ending",
    "days": [
      {
        "day": 1,
        "phase": "See it",
        "source": "Gita 6.34",
        "href": "/gita/chapter/6/verse/34",
        "sanskrit": "चञ्चलं हि मनः कृष्ण प्रमाथि बलवद्दृढम्",
        "line": "The mind is restless, stormy, stubborn and strong. Holding it feels like holding the wind.",
        "forYou": "When you replay the failed project in your head, you are trying to hold the wind."
      },
      {
        "day": 2,
        "phase": "See it",
        "source": "Yoga Vasishtha",
        "href": null,
        "sanskrit": null,
        "line": "The mind pounces on a task like a bird on food, then drops it like a bored child's toy.",
        "forYou": null
      },
      {
        "day": 3,
        "phase": "Steady it",
        "source": "Bhartrihari · Niti Shatakam",
        "href": null,
        "sanskrit": null,
        "line": "A ball knocked down bounces back up. For good people, setbacks rarely last.",
        "forYou": null
      },
      {
        "day": 4,
        "phase": "Steady it",
        "source": "Gita 2.48",
        "href": "/gita/chapter/2/verse/48",
        "sanskrit": null,
        "line": "Do the work steadily, letting go of clinging. Stay the same in success and failure; that balance is yoga.",
        "forYou": null
      },
      {
        "day": 5,
        "phase": "Act on it",
        "source": "Gita 6.23",
        "href": "/gita/chapter/6/verse/23",
        "sanskrit": null,
        "line": "Yoga is unhooking from sorrow. Practise it with resolve and a heart that doesn't lose hope.",
        "forYou": null
      },
      {
        "day": 6,
        "phase": "Act on it",
        "source": "Yoga Vasishtha",
        "href": null,
        "sanskrit": null,
        "line": "Raise your mind like a child: gently, patiently, little by little, never by force.",
        "forYou": null
      },
      {
        "day": 7,
        "phase": "A story",
        "source": "Ramayana · Sundara Kanda",
        "href": null,
        "sanskrit": null,
        "line": "Hanuman had searched every palace in Lanka by moonlight, and she was nowhere.",
        "forYou": null
      }
    ]
  },
  {
    "id": "breakup",
    "label": "My relationship",
    "situation": "partner",
    "title": "The quiet unease",
    "days": [
      {
        "day": 1,
        "phase": "See it",
        "source": "Gita 2.6",
        "href": "/gita/chapter/2/verse/6",
        "sanskrit": "न चैतद्विद्मः कतरन्नो गरीयो यद्वा जयेम यदि वा नो जयेयुः",
        "line": "I can't tell which is better, or even what winning would look like.",
        "forYou": "Like Arjuna, you may not know yet what you want from this, and that is a fair place to start."
      },
      {
        "day": 2,
        "phase": "See it",
        "source": "Gita 2.63",
        "href": "/gita/chapter/2/verse/63",
        "sanskrit": null,
        "line": "Anger clouds judgement, clouded judgement loses memory, lost memory wrecks reason, and then you fall.",
        "forYou": null
      },
      {
        "day": 3,
        "phase": "Steady it",
        "source": "Maha Upanishad 4.30",
        "href": null,
        "sanskrit": null,
        "line": "Everyone, gentle or fierce, comes to trust a calm person, the way we trust a mother.",
        "forYou": null
      },
      {
        "day": 4,
        "phase": "Steady it",
        "source": "Yoga Vasishtha",
        "href": null,
        "sanskrit": null,
        "line": "There is no trouble that good people's company can't ease, as moonlight eases the night.",
        "forYou": null
      },
      {
        "day": 5,
        "phase": "Act on it",
        "source": "Ramcharitmanas · Kishkindha Kand",
        "href": null,
        "sanskrit": null,
        "line": "A friend steers you off the wrong path, speaks of your strengths, and keeps your faults private.",
        "forYou": null
      },
      {
        "day": 6,
        "phase": "Act on it",
        "source": "Yoga Vasishtha, Vairagya 11.37",
        "href": null,
        "sanskrit": null,
        "line": "Say freely what is on your heart, blameless one. These sorrows need not keep wounding you.",
        "forYou": null
      },
      {
        "day": 7,
        "phase": "A story",
        "source": "Ramayana · Ayodhya Kanda",
        "href": null,
        "sanskrit": null,
        "line": "He came to tell her he was leaving for fourteen years; she told him she was coming.",
        "forYou": null
      }
    ]
  },
  {
    "id": "lost",
    "label": "Someone I lost",
    "situation": "someone_lost",
    "title": "The ache of loss",
    "days": [
      {
        "day": 1,
        "phase": "See it",
        "source": "Gita 2.8",
        "href": "/gita/chapter/2/verse/8",
        "sanskrit": "न हि प्रपश्यामि ममापनुद्याद्यच्छोकमुच्छोषणमिन्द्रियाणाम्",
        "line": "Even winning everything wouldn't touch this grief that's drying me up inside.",
        "forYou": "Arjuna says nothing he could win would ease his grief (2.8), and Krishna's answer begins from there."
      },
      {
        "day": 2,
        "phase": "See it",
        "source": "Mahabharata · Shanti Parva",
        "href": null,
        "sanskrit": null,
        "line": "In grief, ask: where did I come from, where am I going, who am I? Let that steady you.",
        "forYou": null
      },
      {
        "day": 3,
        "phase": "Steady it",
        "source": "Surdas · Sursagar",
        "href": null,
        "sanskrit": null,
        "line": "In the hardest days he walked beside me and kept me as the eyelid keeps the eye.",
        "forYou": null
      },
      {
        "day": 4,
        "phase": "Steady it",
        "source": "Ramcharitmanas · Ayodhya Kand",
        "href": null,
        "sanskrit": null,
        "line": "Gain and loss, meeting and parting come like day and night. The steady hold both alike.",
        "forYou": null
      },
      {
        "day": 5,
        "phase": "Act on it",
        "source": "Ramayana · Aranya Kanda",
        "href": null,
        "sanskrit": null,
        "line": "Find a friend who knows your kind of trouble. You won't get through this alone.",
        "forYou": null
      },
      {
        "day": 6,
        "phase": "Act on it",
        "source": "Yoga Vasishtha",
        "href": null,
        "sanskrit": null,
        "line": "Even at your lowest and most helpless, don't let go of good company.",
        "forYou": null
      },
      {
        "day": 7,
        "phase": "A story",
        "source": "Ramayana · Bala Kanda",
        "href": null,
        "sanskrit": null,
        "line": "On the bank of the Tamasa, a poet watched a hunter shoot a bird, and his grief came out as the first shloka.",
        "forYou": null
      }
    ]
  }
]
