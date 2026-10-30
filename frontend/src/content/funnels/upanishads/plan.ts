/**
 * "Who am I": a 7-verse plan (web page /upanishads/who-am-i).
 * Refs checked against passages.json / texts/*.json by scripts/funnels/upanishads/check.py.
 * English is Wisdom's own; reviewed: false.
 */
export type PlanDay = {
  day: number
  title: string
  passage: string
  ref: string
  en: string
  sit: string
  gita?: { c: number; v: number; note: string }
  href?: string
  reviewed: false
}

export const WHO_AM_I: PlanDay[] = [
  {
    day: 1,
    title: 'Who sends the mind',
    passage: 'kena.1.1',
    ref: 'Kena Upanishad 1.1',
    en: 'By whom is the mind sent out, to land where it lands? Who sets the first breath going? By whom is this speech sent, that people speak? Which god puts the eye and the ear to work?',
    sit: 'Notice one thought arrive today. Before you follow it, ask the Kena’s question: what knew that it came? You need no answer yet. The Upanishad starts with the question too.',
    reviewed: false,
  },
  {
    day: 2,
    title: 'Two birds on one tree',
    passage: 'mundaka.3.1.1',
    ref: 'Mundaka Upanishad 3.1.1',
    en: 'Two birds, close companions, cling to the same tree. One of them eats the sweet fruit. The other eats nothing and watches.',
    sit: 'All day there is the one who tastes, wanting and worrying, and the one who watches. Catch the watcher once today, for one breath. It has been there the whole time.',
    reviewed: false,
  },
  {
    day: 3,
    title: 'Never born',
    passage: 'katha.1.2.18',
    ref: 'Katha Upanishad 1.2.18',
    en: 'The knowing Self is not born and does not die. It did not come from anything, and nothing came from it. Unborn, lasting, always, first, it is not killed when the body is killed.',
    sit: 'Death himself says this, to a boy who asked what happens after death. Read it slowly. Then read Gita 2.20, where Krishna says nearly the same words to Arjuna.',
    gita: { c: 2, v: 20, note: 'Krishna to Arjuna, in almost the same words.' },
    href: '/upanishads/katha#v1-2-18',
    reviewed: false,
  },
  {
    day: 4,
    title: 'Every being in the Self',
    passage: 'isha.6',
    ref: 'Isha Upanishad 6',
    en: 'One who sees every being in the Self, and the Self in every being, shrinks from no one after that.',
    sit: 'Pick one person you find hard and read the verse with them in mind. It describes how someone sees who knows the same Self looks out from that face too.',
    gita: { c: 6, v: 29, note: 'Krishna: the one joined in yoga sees the Self in all beings and all beings in the Self.' },
    href: '/upanishads/isha#v6',
    reviewed: false,
  },
  {
    day: 5,
    title: 'This Self is Brahman',
    passage: 'mandukya.2',
    ref: 'Mandukya Upanishad 2',
    en: 'All of this is Brahman. This Self is Brahman. This Self has four quarters.',
    sit: 'Waking, dreaming, deep sleep: you pass through all three every day. Tonight, as you fall asleep, notice that something is present through all three.',
    href: '/upanishads/mandukya#v2',
    reviewed: false,
  },
  {
    day: 6,
    title: 'Salt in water',
    passage: 'chandogya.6.8.7',
    ref: 'Chandogya Upanishad 6.8.7',
    en: 'That finest essence: all of this has it as its Self. That is the real. That is the Self. You are that, Shvetaketu.',
    sit: 'Uddalaka taught this with salt left overnight in water: you cannot see it, and every sip tastes of it. Stir a pinch into a glass tonight and taste from the top, the middle and the bottom.',
    href: '/upanishads/tat-tvam-asi',
    reviewed: false,
  },
  {
    day: 7,
    title: 'I am Brahman',
    passage: 'brihadaranyaka.1.4.10',
    ref: 'Brihadaranyaka Upanishad 1.4.10',
    en: 'In the beginning this was Brahman. It knew only itself: "I am Brahman." So it became all. Even now, whoever knows "I am Brahman" becomes all of this.',
    sit: 'Shankara says knowing this adds nothing new; it takes a mistake away. Read all seven lines again, in order, out loud.',
    href: '/upanishads/aham-brahmasmi',
    reviewed: false,
  },
]
