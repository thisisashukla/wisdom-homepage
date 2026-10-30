/** The eighteen books. `held`: we have the Sanskrit for this book on the site. */
export type Parva = { n: number; name: string; hi: string; summary: string; held?: boolean; gita?: boolean; href?: string }

export const PARVAS: Parva[] = [
  { n: 1, name: 'Adi Parva', hi: 'आदि पर्व', summary: 'Beginnings: Shantanu and Ganga, Bhishma\'s vow, the births of the Kauravas and Pandavas, the house of lac, Draupadi\'s svayamvara.' },
  { n: 2, name: 'Sabha Parva', hi: 'सभा पर्व', summary: 'The assembly hall: Yudhishthira\'s royal sacrifice, the game of dice, Draupadi\'s question to the hall, and the exile.' },
  { n: 3, name: 'Vana Parva', hi: 'वन पर्व', summary: 'Twelve years in the forest. Draupadi and Yudhishthira argue about action and patience. Nala, Savitri, and the Yaksha\'s questions at the lake.', held: true, href: '/mahabharata/yaksha-prashna' },
  { n: 4, name: 'Virata Parva', hi: 'विराट पर्व', summary: 'The thirteenth year, lived in disguise at King Virata\'s court.' },
  { n: 5, name: 'Udyoga Parva', hi: 'उद्योग पर्व', summary: 'Getting ready for war. Vidura\'s night of counsel, Krishna\'s peace mission, Kunti\'s visit to Karna.', held: true, href: '/mahabharata/vidura-niti' },
  { n: 6, name: 'Bhishma Parva', hi: 'भीष्म पर्व', summary: 'The first ten days of the war, with Bhishma in command. The Bhagavad Gita is here, before the first arrow.', gita: true, href: '/mahabharata/where-is-the-gita' },
  { n: 7, name: 'Drona Parva', hi: 'द्रोण पर्व', summary: 'Days eleven to fifteen under Drona. Abhimanyu dies inside the chakravyuha.' },
  { n: 8, name: 'Karna Parva', hi: 'कर्ण पर्व', summary: 'Days sixteen and seventeen under Karna, who falls to Arjuna.', href: '/mahabharata/characters/karna' },
  { n: 9, name: 'Shalya Parva', hi: 'शल्य पर्व', summary: 'The eighteenth day under Shalya. Bhima breaks Duryodhana\'s thigh.' },
  { n: 10, name: 'Sauptika Parva', hi: 'सौप्तिक पर्व', summary: 'Ashwatthama\'s night raid on the sleeping camp, and the curse that follows.' },
  { n: 11, name: 'Stri Parva', hi: 'स्त्री पर्व', summary: 'The women of both sides on the battlefield. Gandhari\'s grief.' },
  { n: 12, name: 'Shanti Parva', hi: 'शांति पर्व', summary: 'Yudhishthira, crushed by the war, wants to leave the throne. Bhishma, on his bed of arrows, teaches him kingship, hard times and release.', held: true },
  { n: 13, name: 'Anushasana Parva', hi: 'अनुशासन पर्व', summary: 'More of Bhishma\'s teaching, then his death.', held: true },
  { n: 14, name: 'Ashvamedhika Parva', hi: 'आश्वमेधिक पर्व', summary: 'Yudhishthira\'s horse sacrifice. Arjuna asks to hear the Gita again; Krishna answers with the Anugita.', held: true, href: '/mahabharata/where-is-the-gita#after-the-war' },
  { n: 15, name: 'Ashramavasika Parva', hi: 'आश्रमवासिक पर्व', summary: 'Dhritarashtra, Gandhari, Kunti and Vidura go to live in the forest.' },
  { n: 16, name: 'Mausala Parva', hi: 'मौसल पर्व', summary: 'The Yadavas destroy one another. Krishna leaves the world.' },
  { n: 17, name: 'Mahaprasthanika Parva', hi: 'महाप्रस्थानिक पर्व', summary: 'The Pandavas and Draupadi walk north toward the mountains, a dog following them.' },
  { n: 18, name: 'Svargarohana Parva', hi: 'स्वर्गारोहण पर्व', summary: 'Yudhishthira at the gate of heaven, and the end of the story.' },
]
