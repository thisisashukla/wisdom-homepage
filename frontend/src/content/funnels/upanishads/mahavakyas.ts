/** The four great sentences, one from each Veda. reviewed: false. */
export type Mahavakya = {
  sa: string
  iast: string
  en: string
  ref: string
  upanishad: string
  veda: string
  kind: string
  passage: string
  check: string
  href: string
  note: string
  reviewed: false
}

export const MAHAVAKYAS: Mahavakya[] = [
  {
    sa: 'प्रज्ञानं ब्रह्म',
    iast: 'prajñānaṃ brahma',
    en: 'Consciousness is Brahman.',
    ref: 'Aitareya Upanishad 3.1.3',
    upanishad: 'Aitareya',
    veda: 'Rig Veda',
    kind: 'A definition: what Brahman is',
    passage: 'aitareya.3.1.3',
    check: 'प्रज्ञानं ब्रह्म',
    href: '/upanishads/mahavakyas#prajnanam-brahma',
    note: 'The Aitareya lists everything there is, gods, elements, every kind of creature, and says all of it is guided by consciousness and rests in it. Then it names that consciousness as Brahman. (Older numbering calls this 5.3.)',
    reviewed: false,
  },
  {
    sa: 'अहं ब्रह्मास्मि',
    iast: 'ahaṃ brahmāsmi',
    en: 'I am Brahman.',
    ref: 'Brihadaranyaka Upanishad 1.4.10',
    upanishad: 'Brihadaranyaka',
    veda: 'Shukla Yajur Veda',
    kind: 'Recognition: said by the one who knows',
    passage: 'brihadaranyaka.1.4.10',
    check: 'हं ब्रह्मास्म',
    href: '/upanishads/aham-brahmasmi',
    note: 'In the beginning Brahman knew itself as "I am Brahman" and so became all; whoever knows it the same way, then or now, becomes all of this.',
    reviewed: false,
  },
  {
    sa: 'तत्त्वमसि',
    iast: 'tat tvam asi',
    en: 'You are that.',
    ref: 'Chandogya Upanishad 6.8.7',
    upanishad: 'Chandogya',
    veda: 'Sama Veda',
    kind: 'Teaching: said by the teacher to the student',
    passage: 'chandogya.6.8.7',
    check: 'तत्त्वमसि',
    href: '/upanishads/tat-tvam-asi',
    note: 'Uddalaka says it to his son Shvetaketu nine times, after nine plain examples, from 6.8.7 to 6.16.3.',
    reviewed: false,
  },
  {
    sa: 'अयमात्मा ब्रह्म',
    iast: 'ayam ātmā brahma',
    en: 'This Self is Brahman.',
    ref: 'Mandukya Upanishad 2',
    upanishad: 'Mandukya',
    veda: 'Atharva Veda',
    kind: 'Practice: held in contemplation',
    passage: 'mandukya.2',
    check: 'यमात्मा ब्रह्म',
    href: '/upanishads/mandukya#v2',
    note: 'The second verse of the Mandukya. The rest of the Upanishad maps this Self through waking, dream, deep sleep and the fourth.',
    reviewed: false,
  },
]
