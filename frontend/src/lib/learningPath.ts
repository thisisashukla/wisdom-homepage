/**
 * The Gita learning path: twelve core ideas, in an order that builds understanding.
 * Every slug is a published topic hub (src/content/gita/topics.json); EN and HI hubs share slugs.
 * Shown as PathNav at the end of each topic hub on the path, and listed in full on
 * /gita/key-ideas (EN) and /hi/gita/mool-shabd (HI).
 *
 * `plan` is the matching seven-verse reading plan under /gita-for (src/lib/themePlans.ts), or null.
 * Intros follow the traditional commentaries (Shankaracharya, Ramanujacharya, Gita Press);
 * verse numbers follow the site's own verse files.
 */

import topicsJson from '@/content/gita/topics.json'
import { topicUrl as gitaTopicUrl } from '@/lib/gitaUrls'
import topicNamesHi from '@/content/gita/topic-names-hi.json'
import { THEME_SLUGS } from './themePlans'

// Client safe: no import from ./gita (it reads the filesystem).
const TOPIC_SLUGS = new Set((topicsJson as { slug: string }[]).map((t) => t.slug))
const topicUrl = (slug: string, lang: PathLang) => gitaTopicUrl(slug, lang)
/** Hindi tag names shared across the site; the hand-set `title.hi` is the fallback. */
const HI_NAMES = topicNamesHi as Record<string, string>
const planOk = (href: string) => THEME_SLUGS.includes(href.replace('/gita-for/', ''))

export type PathLang = 'en' | 'hi'

export type LearningStep = {
  slug: string
  title: { en: string; hi: string }
  /** The Sanskrit term, in Devanagari. */
  term: string
  /** One line: why this idea comes at this point on the path. */
  why: { en: string; hi: string }
  /** Two sentences introducing the idea, for the key-ideas pages. */
  intro: { en: string; hi: string }
  /** Seven-verse reading plan that fits this idea, or null. */
  plan: { href: string; label: { en: string; hi: string } } | null
}

const STEPS: LearningStep[] = [
  {
    slug: 'dharma',
    title: { en: 'Dharma', hi: 'धर्म' },
    term: 'धर्म',
    why: {
      en: 'The Gita opens with a man unsure of his duty, so the path starts where Arjuna does.',
      hi: 'गीता ऐसे मनुष्य से शुरू होती है जिसे अपना कर्तव्य नहीं सूझ रहा, इसलिए यह मार्ग वहीं से शुरू होता है जहाँ अर्जुन खड़े हैं।',
    },
    intro: {
      en: 'Dharma is the duty that fits your nature and your place in life, and the Gita opens on the field of dharma (1.1) with Arjuna unsure of his. Krishna answers that your own dharma, done imperfectly, is better than another’s done well (3.35).',
      hi: 'धर्म वह कर्तव्य है जो आपके स्वभाव और जीवन में आपके स्थान के अनुकूल है, और गीता धर्मक्षेत्र (1.1) से शुरू होती है, जहाँ अर्जुन अपने धर्म को लेकर उलझे हुए हैं। कृष्ण कहते हैं कि अपना धर्म, गुणरहित होकर भी, दूसरे के भली भाँति निभाए धर्म से श्रेष्ठ है (3.35)।',
    },
    plan: { href: '/gita-for/comparison', label: { en: 'Comparison and self-worth', hi: 'तुलना और आत्म सम्मान' } },
  },
  {
    slug: 'karma',
    title: { en: 'Karma', hi: 'कर्म' },
    term: 'कर्म',
    why: {
      en: 'Once you know your duty, the next question is action itself, and the Gita says no one can stay without acting.',
      hi: 'कर्तव्य समझ आने के बाद प्रश्न कर्म का उठता है, और गीता कहती है कि कोई भी बिना कर्म किए नहीं रह सकता।',
    },
    intro: {
      en: 'Karma means action, and the Gita says no one can remain even for a moment without acting, because the gunas of nature move every being to act (3.5). Action done as yajna, as an offering, does not bind; it is action done for anything else that binds (3.9).',
      hi: 'कर्म का अर्थ है क्रिया, और गीता कहती है कि कोई भी क्षण भर भी कर्म किए बिना नहीं रह सकता, क्योंकि प्रकृति के गुण हर प्राणी से कर्म करवाते हैं (3.5)। यज्ञ के लिए, यानी अर्पण के भाव से किया गया कर्म नहीं बाँधता; उसके अतिरिक्त किया गया कर्म ही बंधन बनता है (3.9)।',
    },
    plan: { href: '/gita-for/new-beginnings', label: { en: 'New beginnings', hi: 'नई शुरुआत' } },
  },
  {
    slug: 'karma-yoga',
    title: { en: 'Karma yoga', hi: 'कर्मयोग' },
    term: 'कर्मयोग',
    why: {
      en: 'If action cannot be avoided, Krishna turns it into a practice: full effort, with attachment to results set down.',
      hi: 'जब कर्म छोड़ा ही नहीं जा सकता, तो कृष्ण उसे साधना बना देते हैं: पूरी लगन से काम, और फल की आसक्ति का त्याग।',
    },
    intro: {
      en: 'Karma yoga is doing your work fully while giving up attachment to its results, with an even mind in success and failure (2.48). Shankaracharya reads it as the practice that clears the mind for knowledge, and Ramanujacharya as a path that can itself lead to seeing the Self.',
      hi: 'कर्मयोग का अर्थ है पूरी लगन से अपना काम करना और उसके फल की आसक्ति छोड़ देना, सफलता और असफलता में मन को सम रखते हुए (2.48)। शंकराचार्य इसे चित्त शुद्ध करने वाली साधना मानते हैं जो ज्ञान के योग्य बनाती है, और रामानुजाचार्य इसे ऐसा मार्ग मानते हैं जो स्वयं आत्म साक्षात्कार तक ले जा सकता है।',
    },
    plan: { href: '/gita-for/stress', label: { en: 'Stress and heavy days', hi: 'तनाव और भारी दिन' } },
  },
  {
    slug: 'nishkama-karma',
    title: { en: 'Nishkama karma', hi: 'निष्काम कर्म' },
    term: 'निष्काम कर्म',
    why: {
      en: 'Karma yoga rests on one inner attitude, acting without desire for the fruit, which 2.47 states in a single line.',
      hi: 'कर्मयोग का आधार एक भीतरी भाव है, फल की इच्छा के बिना कर्म, जिसे श्लोक 2.47 एक पंक्ति में कह देता है।',
    },
    intro: {
      en: 'Nishkama karma is action done without desire for its fruit, stated in 2.47: your right is to the work alone, never to its results. The same verse asks you not to cling to inaction either, so the teaching is full effort with a quiet mind about the outcome.',
      hi: 'निष्काम कर्म फल की इच्छा के बिना किया गया कर्म है, जिसे 2.47 कहता है: तुम्हारा अधिकार केवल कर्म पर है, फल पर कभी नहीं। उसी श्लोक में कृष्ण कहते हैं कि कर्म न करने में भी आसक्ति न हो, यानी प्रयत्न पूरा हो और परिणाम को लेकर मन शांत रहे।',
    },
    plan: { href: '/gita-for/fear-of-failure', label: { en: 'Fear of failure', hi: 'असफलता का डर' } },
  },
  {
    slug: 'prakriti',
    title: { en: 'Prakriti', hi: 'प्रकृति' },
    term: 'प्रकृति',
    why: {
      en: 'To act without craving you need to see who is acting, and the Gita says it is nature, prakriti, that moves body and mind.',
      hi: 'बिना कामना के कर्म करने के लिए यह देखना ज़रूरी है कि कर्म कौन कर रहा है; गीता कहती है कि शरीर और मन को प्रकृति चलाती है।',
    },
    intro: {
      en: 'Prakriti is material nature, the source of the body, the senses, the mind and the three gunas, and the Gita sets it apart from purusha, the conscious knower (13.20). All actions are done by the gunas of prakriti, Krishna says, and only one deluded by ego thinks “I am the doer” (3.27).',
      hi: 'प्रकृति वह भौतिक स्वभाव है जिससे शरीर, इन्द्रियाँ, मन और तीनों गुण उत्पन्न होते हैं, और गीता इसे पुरुष, यानी चेतन ज्ञाता, से अलग बताती है (13.20)। कृष्ण कहते हैं कि सब कर्म प्रकृति के गुणों द्वारा होते हैं, और अहंकार से मोहित मनुष्य ही स्वयं को कर्ता मानता है (3.27)।',
    },
    plan: null,
  },
  {
    slug: 'gunas',
    title: { en: 'The three gunas', hi: 'त्रिगुण' },
    term: 'त्रिगुण',
    why: {
      en: 'Prakriti works through three gunas, sattva, rajas and tamas, and they explain the pull you feel behind each choice.',
      hi: 'प्रकृति तीन गुणों, सत्त्व, रजस् और तमस्, से काम करती है, और यही हर निर्णय के पीछे के खिंचाव को समझाते हैं।',
    },
    intro: {
      en: 'The three gunas, sattva, rajas and tamas, are born of prakriti and bind the embodied self to the body (14.5). Sattva binds through attachment to happiness and knowledge, rajas through attachment to action, and tamas through heedlessness and sleep (14.6 to 14.8); Krishna asks Arjuna to rise above all three (2.45).',
      hi: 'सत्त्व, रजस् और तमस्, ये तीनों गुण प्रकृति से उत्पन्न होते हैं और देही को देह में बाँधते हैं (14.5)। सत्त्व सुख और ज्ञान की आसक्ति से, रजस् कर्म की आसक्ति से, और तमस् प्रमाद और निद्रा से बाँधता है (14.6 से 14.8); कृष्ण अर्जुन से तीनों से ऊपर उठने को कहते हैं (2.45)।',
    },
    plan: { href: '/gita-for/anger', label: { en: 'Anger', hi: 'क्रोध' } },
  },
  {
    slug: 'manas',
    title: { en: 'Manas, the mind', hi: 'मन' },
    term: 'मनस्',
    why: {
      en: 'The gunas show first in the mind, which Arjuna himself calls as hard to hold as the wind.',
      hi: 'गुणों का असर सबसे पहले मन पर दिखता है, जिसे अर्जुन स्वयं वायु की तरह रोकना कठिन बताते हैं।',
    },
    intro: {
      en: 'Manas is the mind, the restless seat of thought and desire, which Arjuna says is as hard to hold as the wind (6.34). Krishna agrees, and says it is held through steady practice and dispassion, abhyasa and vairagya (6.35).',
      hi: 'मन विचार और इच्छा का चंचल स्थान है, जिसे अर्जुन वायु की तरह रोकना कठिन बताते हैं (6.34)। कृष्ण यह मानते हैं, और कहते हैं कि अभ्यास और वैराग्य से यह वश में होता है (6.35)।',
    },
    plan: { href: '/gita-for/overthinking', label: { en: 'Overthinking', hi: 'बहुत ज़्यादा सोचना' } },
  },
  {
    slug: 'buddhi',
    title: { en: 'Buddhi, the intellect', hi: 'बुद्धि' },
    term: 'बुद्धि',
    why: {
      en: 'Above the restless mind sits buddhi, the power to discern, which the Gita asks you to make steady.',
      hi: 'चंचल मन से ऊपर बुद्धि है, विवेक करने वाली शक्ति, जिसे गीता स्थिर करने को कहती है।',
    },
    intro: {
      en: 'Buddhi is the intellect, the power that discerns and decides, and the Gita places it above the senses and the mind (3.42). Krishna asks for a buddhi that is resolute and one-pointed (2.41), and describes the person of steady wisdom, the sthitaprajna, at the close of chapter 2 (2.55 to 2.72).',
      hi: 'बुद्धि विवेक करने और निर्णय लेने वाली शक्ति है, और गीता इसे इन्द्रियों और मन से ऊपर रखती है (3.42)। कृष्ण निश्चयात्मिका, एकाग्र बुद्धि माँगते हैं (2.41), और दूसरे अध्याय के अंत में स्थितप्रज्ञ, यानी स्थिर बुद्धि वाले मनुष्य, का वर्णन करते हैं (2.55 से 2.72)।',
    },
    plan: { href: '/gita-for/decision-making', label: { en: 'Hard decisions', hi: 'कठिन निर्णय' } },
  },
  {
    slug: 'atman',
    title: { en: 'Atman, the Self', hi: 'आत्मा' },
    term: 'आत्मन्',
    why: {
      en: 'Beyond even buddhi is the Self, the atman, which the Gita says is never born and never dies.',
      hi: 'बुद्धि से भी परे आत्मा है, जिसके बारे में गीता कहती है कि वह न कभी जन्मता है, न मरता है।',
    },
    intro: {
      en: 'Atman is the Self, the conscious reality in every being, which is never born, never dies, and is not slain when the body is slain (2.20). Krishna’s teaching to the grieving Arjuna begins here (2.11 to 2.30), and Shankaracharya reads it this way: grief and delusion end with knowledge of the Self.',
      hi: 'आत्मा हर प्राणी में स्थित चेतन सत्य है, जो न कभी जन्मता है, न मरता है, और शरीर के मारे जाने पर भी नहीं मारा जाता (2.20)। शोक में डूबे अर्जुन को कृष्ण का उपदेश यहीं से शुरू होता है (2.11 से 2.30), और शंकराचार्य के अनुसार शोक और मोह आत्मज्ञान से ही मिटते हैं।',
    },
    plan: { href: '/gita-for/grief', label: { en: 'Grief', hi: 'शोक' } },
  },
  {
    slug: 'vairagya',
    title: { en: 'Vairagya', hi: 'वैराग्य' },
    term: 'वैराग्य',
    why: {
      en: 'Knowing the Self as lasting makes it easier to loosen your grip on what passes, and that loosening is vairagya.',
      hi: 'आत्मा को नित्य जान लेने पर जो बीत जाने वाला है उसकी पकड़ ढीली करना आसान होता है; यही वैराग्य है।',
    },
    intro: {
      en: 'Vairagya is dispassion, a loosening of craving for sense objects, and the Gita pairs it with practice as the way to hold the mind (6.35). Krishna also says that pleasures born of contact with objects have a beginning and an end, so the wise do not delight in them (5.22).',
      hi: 'वैराग्य विषयों की लालसा का ढीला पड़ना है, और गीता इसे अभ्यास के साथ मन को वश में करने का उपाय बताती है (6.35)। कृष्ण यह भी कहते हैं कि विषयों के संयोग से मिलने वाले भोग आदि और अंत वाले हैं, इसलिए बुद्धिमान उनमें नहीं रमता (5.22)।',
    },
    plan: { href: '/gita-for/joy', label: { en: 'Lasting joy', hi: 'स्थायी आनंद' } },
  },
  {
    slug: 'bhakti',
    title: { en: 'Bhakti', hi: 'भक्ति' },
    term: 'भक्ति',
    why: {
      en: 'With the grip loosened, the heart turns toward God, and Krishna calls the one who worships him with faith the most steadfast in yoga.',
      hi: 'पकड़ ढीली होने पर हृदय भगवान की ओर मुड़ता है, और कृष्ण श्रद्धा से भजने वाले को सबसे श्रेष्ठ योगी कहते हैं।',
    },
    intro: {
      en: 'Bhakti is loving devotion to God, and Krishna says that by undivided devotion alone he can be truly known, seen and entered (11.54). Ramanujacharya reads the Gita’s teaching as leading to this devotion, with action and knowledge as its supports.',
      hi: 'भक्ति ईश्वर के प्रति प्रेमपूर्ण समर्पण है, और कृष्ण कहते हैं कि अनन्य भक्ति से ही उन्हें तत्त्व से जाना, देखा और उनमें प्रवेश किया जा सकता है (11.54)। रामानुजाचार्य गीता के उपदेश को इसी भक्ति की ओर ले जाने वाला मानते हैं, जिसमें कर्म और ज्ञान सहायक हैं।',
    },
    plan: { href: '/gita-for/devotion', label: { en: 'Love and devotion', hi: 'प्रेम और भक्ति' } },
  },
  {
    slug: 'moksha',
    title: { en: 'Moksha', hi: 'मोक्ष' },
    term: 'मोक्ष',
    why: {
      en: 'The Gita ends at freedom: in 18.66 Krishna asks for complete refuge and promises release from all sin.',
      hi: 'गीता मुक्ति पर पूरी होती है: 18.66 में कृष्ण पूरी शरण माँगते हैं और सब पापों से छुड़ाने का वचन देते हैं।',
    },
    intro: {
      en: 'Moksha is liberation from the cycle of birth and death, which the Gita describes as reaching the supreme abode from which there is no return (8.21, 15.6). The teaching closes on it in 18.66: give up all dharmas and take refuge in me alone, Krishna says, and I will free you from all sins.',
      hi: 'मोक्ष जन्म और मृत्यु के चक्र से मुक्ति है, जिसे गीता उस परम धाम की प्राप्ति कहती है जहाँ से लौटना नहीं होता (8.21, 15.6)। उपदेश 18.66 पर पूरा होता है: सब धर्मों को छोड़कर केवल मेरी शरण में आ, कृष्ण कहते हैं, मैं तुझे सब पापों से मुक्त कर दूँगा।',
    },
    plan: { href: '/gita-for/guilt', label: { en: 'Guilt and past mistakes', hi: 'अपराध बोध और पुरानी भूलें' } },
  },
]

export const LEARNING_PATH: LearningStep[] = STEPS
  .filter((s) => TOPIC_SLUGS.has(s.slug))
  .map((s) => ({
    ...s,
    title: { ...s.title, hi: HI_NAMES[s.slug] ?? s.title.hi },
    plan: s.plan && planOk(s.plan.href) ? s.plan : null,
  }))

export const PATH_LENGTH = LEARNING_PATH.length

/** Hub pages that list the whole path. */
export const PATH_HUB: Record<PathLang, string> = { en: '/gita/key-ideas', hi: '/hi/gita/mool-shabd' }

export type PathPosition = {
  step: LearningStep
  /** 1-based position on the path. */
  position: number
  prev: LearningStep | null
  next: LearningStep | null
}

/** Where a topic sits on the path, or null when the topic is not on it. */
export function pathPosition(slug: string): PathPosition | null {
  const i = LEARNING_PATH.findIndex((s) => s.slug === slug)
  if (i < 0) return null
  return { step: LEARNING_PATH[i], position: i + 1, prev: LEARNING_PATH[i - 1] ?? null, next: LEARNING_PATH[i + 1] ?? null }
}

export const stepUrl = (step: LearningStep, lang: PathLang) => topicUrl(step.slug, lang)
