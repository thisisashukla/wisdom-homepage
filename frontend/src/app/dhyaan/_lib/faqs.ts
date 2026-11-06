/**
 * FAQ bank. Each answer opens with the direct answer in one sentence (that sentence is
 * what search and assistants quote), then adds detail. `home` marks the ones shown on
 * the home page; /faq shows all of them, grouped.
 */
export type Faq = { q: string; a: string[]; group: 'about' | 'measure' | 'devices' | 'practice' | 'privacy'; home?: boolean }

export const FAQS: Faq[] = [
  {
    group: 'about',
    home: true,
    q: 'What is Dhyaan?',
    a: [
      'Dhyaan is a silent meditation app for iPhone and Apple Watch that shows when you settled, how steady you held and how your heart calmed. There is no voice guiding you and no grade at the end.',
      'You sit in silence until the bell. Dhyaan first asks how the sit felt, in your words. Only then does it show what the sensors saw.',
    ],
  },
  {
    group: 'about',
    home: true,
    q: 'When is Dhyaan launching?',
    a: [
      'Dhyaan opens to the public in early 2027 on the App Store, with a TestFlight beta for people on the waitlist before then.',
      'Join the waitlist and you’ll get one email when the beta opens and one at launch. Each friend who joins with your link moves you up 10 places.',
    ],
  },
  {
    group: 'about',
    home: true,
    q: 'Is Dhyaan free?',
    a: [
      'Yes, every sit is free, forever. An optional Plus subscription will add longer history, weekly patterns and exports.',
      'We will never put the sit itself behind a paywall.',
    ],
  },
  {
    group: 'about',
    q: 'Is Dhyaan a guided meditation app?',
    a: [
      'No. Dhyaan is for unguided, silent practice: breath awareness, open awareness, japa, or whatever practice you already do.',
      'If you want a voice talking you through every minute, Headspace, Calm or Insight Timer will suit you better. Dhyaan is for people who want to sit on their own and still see what happened.',
    ],
  },
  {
    group: 'about',
    q: 'Why is it called Dhyaan?',
    a: [
      'Dhyāna (ध्यान) is the Sanskrit word for meditation: sustained, unbroken attention. It is the seventh limb in Patañjali’s Yoga Sūtras, and the subject of the sixth chapter of the Bhagavad Gita, Dhyāna Yoga.',
      'The app’s image comes from that chapter (6.19): a lamp in a windless place does not flicker. Dhyaan is rooted in that tradition without being tied to any one guru or sect.',
    ],
  },
  {
    group: 'measure',
    home: true,
    q: 'Can an app really tell if my meditation is working?',
    a: [
      'Not completely, and Dhyaan doesn’t pretend to. No single body signal has been validated as a measure of “good meditation”.',
      'What sensors can show honestly is narrower and still useful: how long it took you to settle, how still you stayed, how your heart rate changed, and how often you drifted and came back. Dhyaan shows those next to your own words about the sit, and compares you only with yourself.',
    ],
  },
  {
    group: 'measure',
    home: true,
    q: 'Is there a meditation score?',
    a: [
      'There is no grade and no single number for how well you meditated. You get a reading: when you arrived, how often you came back, the longest you held still, how your heart settled, and a steadiness reading called Sthir that is compared only with your own past sits.',
      'A grade becomes the target. In a practice built on not striving, chasing one teaches you to sit rigidly to win. Grades also mislead. When a consumer EEG headband was tested in a randomised trial, its scores did not track people’s progress. A number that stays flat while you improve tells you to quit. So Dhyaan describes your sit instead of grading it.',
    ],
  },
  {
    group: 'measure',
    q: 'What does Dhyaan measure?',
    a: [
      'Arrival (how long until you were still for a full minute), steadiness once you had arrived, how your heart rate settled from start to finish, how many times you moved and came back, and whether you drifted towards restlessness or towards drowsiness.',
      'Every number is shown with its coverage, so you know how much of the sit the sensors actually saw.',
    ],
  },
  {
    group: 'measure',
    q: 'Does Dhyaan measure HRV?',
    a: [
      'Not during a sit. Heart-rate variability during a sit mostly reflects how slowly you are breathing, so an HRV “boost” usually means you breathed slowly, not that you meditated well.',
      'Apple Watch also doesn’t give apps live beat-to-beat intervals during a session, so Dhyaan shows an honest heart-rate trend instead. If you allow Apple Health, it can show the HRV history your Watch already records.',
    ],
  },
  {
    group: 'measure',
    q: 'Can Dhyaan tell if I fell asleep?',
    a: [
      'It can flag likely drowsiness. Being very still is not always being very present: someone nodding off is still too, breathes slowly and has a falling heart rate.',
      'Dhyaan watches for head nods from AirPods and the pattern of a dozing sit, and shows that as a lean towards heaviness rather than counting it as a great sit.',
    ],
  },
  {
    group: 'devices',
    home: true,
    q: 'Do I need an Apple Watch?',
    a: [
      'No. With only an iPhone, hold it in your palms or rest it on your lap and Dhyaan reads your stillness through the phone’s motion sensors.',
      'Apple Watch adds heart rate and haptic breath cues on your wrist. AirPods (Pro, 3rd generation or later, or Max) add head stillness and nod detection.',
    ],
  },
  {
    group: 'devices',
    q: 'Can I meditate with only my Apple Watch, without my iPhone?',
    a: [
      'Yes. Dhyaan’s Watch app runs a full sit on its own, with a haptic bell and optional haptic breath pacing, and syncs to your iPhone later.',
    ],
  },
  {
    group: 'devices',
    q: 'Does Dhyaan work on Android?',
    a: ['Not at launch. Dhyaan is built for iPhone, Apple Watch and AirPods first. Join the waitlist and tell us your device; if enough Android sitters ask, it moves up the list.'],
  },
  {
    group: 'devices',
    q: 'Does Dhyaan write to Apple Health?',
    a: ['Yes. Each sit is saved as Mindful Minutes in Apple Health, so it also counts towards your Mindfulness history on iPhone and Apple Watch.'],
  },
  {
    group: 'practice',
    home: true,
    q: 'What happens if I miss a day?',
    a: [
      'Nothing breaks. Instead of a streak, you set a weekly sankalpa (intention): how many days a week you want to sit, from 3 to 7.',
      'Research on hundreds of thousands of app sessions found that sitting most days of the week mattered more than session length, so Dhyaan counts kept weeks, not unbroken days.',
    ],
  },
  {
    group: 'practice',
    q: 'How long should I meditate?',
    a: [
      'Any sit of a minute or more counts in Dhyaan. In studies, ten minutes and twenty minutes raised mindfulness by about the same amount, and doing it regularly mattered more than doing it for longer.',
      'A good starting point is 10 minutes, four days a week.',
    ],
  },
  {
    group: 'practice',
    q: 'Does Dhyaan support japa (mantra counting)?',
    a: ['Yes. Japa mode counts a 108-bead mala on the Apple Watch’s Digital Crown, so you can count without beads or looking at a screen.'],
  },
  {
    group: 'practice',
    q: 'Can I sit with my family in another country?',
    a: [
      'Yes. Saath lets you send a link to sit at the same time as someone far away, such as parents in India while you are in London or Seattle. Each of you sits on your own device; nothing about your sit is shared unless you choose to share it.',
    ],
  },
  {
    group: 'practice',
    q: 'Is Dhyaan religious?',
    a: [
      'Dhyaan is dharmik in its roots, not denominational. The words and images come from the Indian traditions that named meditation, glossed in plain English. You don’t need to be Hindu, Buddhist or anything else to use it, and it works with any silent practice.',
    ],
  },
  {
    group: 'privacy',
    home: true,
    q: 'Does Dhyaan need an account? Where does my data go?',
    a: [
      'No account. Your practice data stays on your devices. Raw motion is discarded once per-second features are extracted, and nothing about your sits goes to our servers.',
      'The waitlist on this site stores only your email, the devices you tick and where you heard about us, so we can email you about the beta and launch.',
    ],
  },
  {
    group: 'privacy',
    q: 'Is Dhyaan a medical device?',
    a: ['No. Dhyaan is a general wellness app for meditation practice. It doesn’t diagnose, treat or prevent any condition. Heart-rate and breath readings are estimates for your own reflection.'],
  },
]

export const FAQ_GROUPS: Record<Faq['group'], string> = {
  about: 'About Dhyaan',
  measure: 'What it measures',
  devices: 'iPhone, Apple Watch & AirPods',
  practice: 'Practice',
  privacy: 'Privacy & safety',
}

export const faqLd = (items: Faq[]) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({ '@type': 'Question', name: f.q, acceptedAnswer: { '@type': 'Answer', text: f.a.join(' ') } })),
})
