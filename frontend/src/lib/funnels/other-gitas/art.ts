/**
 * One illustration per Gita on /gitas, in the same painted style as the blog chapter images.
 * Files live in public/assets/gitas/<slug>.webp (1200 x 800). A card shows its image only once
 * the file exists, so the page ships safely while the set is being made.
 * Prompts for the set: marketing/gitas-image-prompts-2026-11-11.md
 */
export type GitaArt = { src: string; alt: string }

const at = (slug: string) => `/assets/gitas/${slug}.webp`

export const GITA_ART: Record<string, GitaArt> = {
  bhagavad: { src: '/assets/chapter1.webp', alt: 'Krishna stands in the chariot beside Arjuna, who sits with his head bowed before the battle at Kurukshetra.' },
  ashtavakra: { src: at('ashtavakra'), alt: 'The young sage Ashtavakra, his body bent in eight places, speaks to King Janaka in the royal court of Mithila.' },
  avadhuta: { src: at('avadhuta'), alt: 'Dattatreya sits at peace beneath a great tree with his cow and four dogs.' },
  anu: { src: at('anu'), alt: 'After the war, Krishna and Arjuna sit together in the great assembly hall, and Arjuna asks to hear the teaching again.' },
  brahmana: { src: at('brahmana'), alt: 'A Brahmin and his wife talk quietly by an oil lamp in their small hermitage.' },
  vyadha: { src: at('vyadha'), alt: 'The righteous meat-seller of Mithila welcomes a proud young ascetic into his home, where he cares for his aged parents.' },
  'hamsa-mbh': { src: at('hamsa-mbh'), alt: 'A golden swan speaks to the Sadhyas, celestial sages, beside a still lake.' },
  uddhava: { src: at('uddhava'), alt: 'Krishna, seated beneath a great tree, gives his last teaching to his friend Uddhava.' },
  'hamsa-bhag': { src: at('hamsa-bhag'), alt: 'Krishna appears as a radiant swan before Brahma and the four sages led by Sanaka.' },
  bhikshu: { src: at('bhikshu'), alt: 'An old mendicant from Avanti walks calmly through a village with his staff and bowl as people mock him.' },
  kapila: { src: at('kapila'), alt: 'The sage Kapila teaches his mother Devahuti at a hermitage beside a lotus lake.' },
  gopi: { src: at('gopi'), alt: 'The gopis of Vrindavan walk along the moonlit Yamuna, searching for Krishna.' },
  guru: { src: at('guru'), alt: 'Shiva teaches Parvati on the snowy heights of Kailasa.' },
  ribhu: { src: at('ribhu'), alt: 'The sage Ribhu teaches his disciple Nidagha on a Himalayan slope near Kedara.' },
  devi: { src: at('devi'), alt: 'The Goddess appears in radiant form before Himavan, king of the mountains.' },
  ganesha: { src: at('ganesha'), alt: 'Ganesha, as Gajanana, teaches King Varenya in a palace hall.' },
  shiva: { src: at('shiva'), alt: 'Shiva appears to Rama at a forest hermitage during his exile.' },
  ishvara: { src: at('ishvara'), alt: 'Shiva teaches the sages gathered at Badarikashrama, in the Himalaya beside a mountain river.' },
  rama: { src: at('rama'), alt: 'Rama, seated in the palace at Ayodhya, teaches his brother Lakshmana.' },
  pandava: { src: at('pandava'), alt: 'The Pandavas with Draupadi, Kunti and Vidura stand together in prayer.' },
  mahamandal: { src: at('mahamandal'), alt: 'A young seeker sits before an old teacher at dawn, a palm-leaf manuscript and five lamps between them.' },
}
