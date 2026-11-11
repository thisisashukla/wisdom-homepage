/**
 * Answer-first blocks for the scene pages: the question as people search it, a one or two
 * sentence answer drawn from the scene's own copy (scenes.json `quick`, `arc`), and the key of
 * the line in lines.json the answer rests on. `heroLine` names the hero verse when the default
 * hero line is the answer's own source, so the same line is not set twice.
 */
export type SceneAnswer = { question: string; answer: string; line: string; heroLine?: string }

export const SCENE_ANSWERS: Record<string, SceneAnswer> = {
  ahalya: {
    question: 'Did Ahalya turn to stone in Valmiki’s Ramayana?',
    answer:
      'No. Valmiki’s Gautama curses Ahalya to live unseen in the hermitage, living on air, until Ram arrives; the stone body comes from Tulsidas’s Ramcharitmanas.',
    line: 'vr-1-48-23',
    heroLine: 'vr-1-49-15',
  },
  'sita-swayamvar-bow': {
    question: 'Did kings compete for Sita at a swayamvar?',
    answer:
      'Not in Valmiki. There Janaka says suitors came over the years and none could lift Shiva’s bow, and Ram breaks it when Janaka has it brought; the assembly of ten thousand kings is Tulsidas’s.',
    line: 'vr-1-66-13',
    heroLine: 'vr-1-67-14',
  },
  'kaikeyi-boons': {
    question: 'What were Kaikeyi’s two boons?',
    answer:
      'Kaikeyi asked Dasharatha to crown Bharata and to send Ram to live in the Dandaka forest as an ascetic for fourteen years. Dasharatha had granted her two boons long before, when she carried him wounded from battle.',
    line: 'vr-2-11-23',
    heroLine: 'rcm-2-29-1',
  },
  kevat: {
    question: 'Who washed Ram’s feet before the Ganga crossing?',
    answer:
      'The boatman in Tulsidas’s Ramcharitmanas, who will not take Ram aboard until he has washed his feet, and asks no fare. In Valmiki, Guha has a strong boat brought, and Ram, Sita and Lakshman cross.',
    line: 'rcm-2-98-ch1',
  },
  'bharat-refuses-the-throne': {
    question: 'Did Bharat accept the throne of Ayodhya?',
    answer:
      'No. In Valmiki, Bharata tells the ministers that Ram, the eldest, will be king, and at Chitrakoot he asks Ram for his sandals; Tulsidas tells the same refusal at length.',
    line: 'vr-2-79-7',
    heroLine: 'vr-2-112-21',
  },
  'sita-into-the-fire': {
    question: 'Did Ravana carry off the real Sita?',
    answer:
      'In Valmiki, yes: Ravana carries off Sita herself. Only Tulsidas’s Ramcharitmanas has Ram ask Sita to stay within the fire, leaving her reflection in her place.',
    line: 'rcm-3-20-1',
    heroLine: 'rcm-3-20-2',
  },
  'golden-deer': {
    question: 'Who was the golden deer in the Ramayana?',
    answer:
      'The golden deer was the rakshasa Maricha in disguise. In Valmiki, Lakshman warns Ram that it is Maricha, Sita asks for the deer, and Ram goes after it.',
    line: 'vr-3-43-4',
  },
  'sita-words-to-lakshman': {
    question: 'What did Sita say to Lakshman?',
    answer:
      'When Lakshman would not leave her after the false cry, Sita accused him at length and told him she would not live a single moment on this earth without Ram. He then went, placing her in the care of the forest spirits.',
    line: 'vr-3-45-20',
    heroLine: 'vr-3-45-25',
  },
  'lakshman-rekha': {
    question: 'Did Lakshman draw a line for Sita?',
    answer:
      'Not in Valmiki: there Lakshman leaves Sita with a blessing, that the spirits of the forest keep her safe. Tulsidas mentions a line once, later in Lanka Kand, when Mandodari taunts Ravana for failing to cross the small line Lakshman drew.',
    line: 'vr-3-45-25',
    heroLine: 'rcm-6-36-1',
  },
  jatayu: {
    question: 'What did Jatayu say to Ravana?',
    answer:
      'Jatayu told Ravana that he was old and Ravana young and armed, yet he would not let him carry Sita off unharmed. He fought him, and Ram later cremated him as he would his own kin.',
    line: 'vr-3-50-18',
    heroLine: 'vr-3-68-27',
  },
  shabari: {
    question: 'Did Shabari give Ram berries she had tasted?',
    answer:
      'Neither Valmiki nor Tulsidas says so. In the Ramcharitmanas she brings roots, bulbs and fruit, and Ram eats them with love, praising them again and again.',
    line: 'rcm-3-30-d1',
  },
}
