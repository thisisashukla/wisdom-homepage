import type { FeelingId } from './app'

/**
 * "Gita for life" landing pages: /gita-for/<slug>.
 * Targets problem-intent searches ("bhagavad gita on overthinking", "… on
 * death of loved ones", "… on fear of failure") found in keyword research
 * (Google Autocomplete IN/US, 19 Oct 2026). Verse text and meanings render
 * from the site's own verse files; `why` is our short, faithful pointer.
 */

export type GitaForVerse = { chapter: number; verse: number; why: string }
export type GitaForPage = {
  slug: string
  label: string
  title: string
  description: string
  h1: string
  keywords: string[]
  intro: string
  feeling: FeelingId
  situation?: string
  verses: GitaForVerse[]
  note?: string
}

export const GITA_FOR: GitaForPage[] = [
  {
    slug: 'overthinking',
    label: 'Overthinking & anxiety',
    title: 'Bhagavad Gita on Overthinking & Anxiety: 7 Verses',
    description:
      'What Krishna says about a mind that will not stop. Seven Bhagavad Gita verses on overthinking and anxiety, in Sanskrit, Hindi and English, with meaning.',
    h1: 'Bhagavad Gita on overthinking and anxiety',
    keywords: ['bhagavad gita on overthinking', 'bhagavad gita on anxiety', 'gita quotes on overthinking in hindi', 'bhagavad gita on worry'],
    intro:
      'Arjuna said it first: the mind is restless, stormy and stubborn, as hard to hold as the wind. Krishna did not tell him to stop thinking. He agreed, and then gave him two things to practise. These are the verses where that conversation happens, and the ones around it that explain why a mind replays what it cannot control.',
    feeling: 'quiet',
    situation: 'overthinking',
    verses: [
      { chapter: 6, verse: 34, why: 'Arjuna names the problem honestly: the mind feels impossible to hold.' },
      { chapter: 6, verse: 35, why: 'Krishna agrees, then gives the method: steady practice and letting go.' },
      { chapter: 2, verse: 14, why: 'Feelings arrive and leave. You are asked to bear them, not to solve every one.' },
      { chapter: 2, verse: 47, why: 'Your part is the action. The outcome you keep replaying was never yours to hold.' },
      { chapter: 2, verse: 48, why: 'Evenness of mind, in success and failure, is what the Gita calls yoga.' },
      { chapter: 6, verse: 5, why: 'Lift yourself by yourself. The mind can be your friend as well as your enemy.' },
      { chapter: 2, verse: 56, why: 'The steady person: not shaken by sorrow, not chasing pleasure, free of fear and anger.' },
    ],
  },
  {
    slug: 'grief',
    label: 'Grief & losing someone',
    title: 'Bhagavad Gita on Death of a Loved One: Verses for Grief',
    description:
      'What the Bhagavad Gita says when someone you love has died. Krishna’s verses on the atman, death and grief, in Sanskrit, Hindi and English.',
    h1: 'Bhagavad Gita on the death of a loved one',
    keywords: ['bhagavad gita on death of loved ones', 'bhagavad gita on grief', 'gita on losing someone', 'bhagavad gita on death in sanskrit'],
    intro:
      'The Gita begins with grief. Arjuna sits down in his chariot unable to face the people he loves, and Krishna’s first teaching is about death: what ends, and what does not. These verses do not ask you to stop missing someone. They describe the self, the atman, that was never born and does not die.',
    feeling: 'faith',
    situation: 'someone_lost',
    verses: [
      { chapter: 2, verse: 11, why: 'Krishna’s first words of teaching, spoken to a man overwhelmed by grief.' },
      { chapter: 2, verse: 13, why: 'As the body moves through childhood, youth and age, the self moves on at death.' },
      { chapter: 2, verse: 20, why: 'The atman is never born and never dies. It is not killed when the body is.' },
      { chapter: 2, verse: 22, why: 'Like setting aside worn clothes for new ones: the Gita’s best-known image of death.' },
      { chapter: 2, verse: 27, why: 'Death is certain for the born. Grief for what cannot be avoided is met with understanding.' },
      { chapter: 2, verse: 28, why: 'Beings are unseen before birth and after death, and seen only in between.' },
    ],
    note:
      'Grief is not a failure of understanding. If it is making daily life hard for a long time, talking to someone helps. In India you can call Tele-MANAS on 14416, free and confidential.',
  },
  {
    slug: 'fear-of-failure',
    label: 'Fear of failure',
    title: 'Bhagavad Gita on Fear of Failure: Verses for Exams & Work',
    description:
      'Afraid you will fail? What the Bhagavad Gita says about effort, results, success and failure. Verses for students, exams and work, with meaning.',
    h1: 'Bhagavad Gita on fear of failure',
    keywords: ['bhagavad gita on failure', 'bhagavad gita on fear of failure', 'gita quotes for students exam', 'bhagavad gita quotes on failure'],
    intro:
      'Arjuna’s crisis is a fear of what his action will lead to. Krishna’s answer is the most quoted teaching in the Gita: you have a right to the work, never to its fruit. Read together, these verses separate the effort you control from the result you do not, and say that no honest effort is ever wasted.',
    feeling: 'nerve',
    situation: 'didnt_work_out',
    verses: [
      { chapter: 2, verse: 47, why: 'Karmanye vadhikaraste: the work is yours, the result never was.' },
      { chapter: 2, verse: 48, why: 'Act steadily, the same in success and failure.' },
      { chapter: 2, verse: 38, why: 'Treat gain and loss, victory and defeat alike, and act.' },
      { chapter: 2, verse: 40, why: 'On this path no effort is lost, and even a little of it protects you.' },
      { chapter: 6, verse: 40, why: 'One who does good never comes to a bad end, in this life or the next.' },
      { chapter: 3, verse: 8, why: 'Do the work in front of you. Action is better than not acting.' },
    ],
  },
  {
    slug: 'stress',
    label: 'Stress',
    title: 'Bhagavad Gita on Stress: Shlokas to Calm the Mind',
    description:
      'Bhagavad Gita shlokas for stress and tension: how Krishna describes a calm mind in a hard situation. Sanskrit, Hindi and English with meaning.',
    h1: 'Bhagavad Gita on stress',
    keywords: ['bhagavad gita on stress', 'gita shlok for stress', 'bhagavad gita for tension', 'gita quotes to calm the mind'],
    intro:
      'The Gita is spoken on a battlefield, minutes before a war. It is a text about staying clear under pressure. These verses describe the person who can stand in the middle of it all: like a lotus leaf that water does not cling to, like an ocean that rivers keep filling and never disturb.',
    feeling: 'quiet',
    situation: 'anxious',
    verses: [
      { chapter: 2, verse: 14, why: 'Heat and cold, pleasure and pain come and go. Endure them.' },
      { chapter: 5, verse: 10, why: 'Act without clinging, like a lotus leaf untouched by water.' },
      { chapter: 2, verse: 70, why: 'Desires flow in like rivers into the ocean, and it stays still.' },
      { chapter: 6, verse: 17, why: 'Balance in eating, sleeping, work and rest ends sorrow.' },
      { chapter: 2, verse: 48, why: 'Evenness of mind is yoga.' },
      { chapter: 18, verse: 66, why: 'Krishna’s last word: set it all down and take refuge. Do not grieve.' },
    ],
  },
  {
    slug: 'anger',
    label: 'Anger',
    title: 'Bhagavad Gita on Anger: What Krishna Says (2.62–63)',
    description:
      'How anger starts and how it ends, in Krishna’s words. The Bhagavad Gita’s verses on anger (2.62–63, 3.37, 16.21) in Sanskrit, Hindi and English.',
    h1: 'Bhagavad Gita on anger',
    keywords: ['bhagavad gita on anger', 'gita sloka on anger', 'bhagavad gita anger management', 'krishna on anger'],
    intro:
      'The Gita gives one of the clearest accounts of anger anywhere: it starts with dwelling on something, grows into wanting it, and turns to anger when the wanting is blocked. From anger comes confusion, and from confusion we lose the very judgement that would have stopped us. These are the verses.',
    feeling: 'replay',
    verses: [
      { chapter: 2, verse: 62, why: 'Dwelling on something becomes attachment, then desire, then anger.' },
      { chapter: 2, verse: 63, why: 'Anger clouds the mind, memory fails, and judgement is lost.' },
      { chapter: 3, verse: 37, why: 'Desire and anger, born of rajas, are the real enemy here.' },
      { chapter: 16, verse: 21, why: 'Lust, anger and greed: three gates to ruin. Leave all three.' },
      { chapter: 5, verse: 23, why: 'One who can bear the push of desire and anger, here and now, is happy.' },
      { chapter: 2, verse: 56, why: 'The steady mind is free of attachment, fear and anger.' },
    ],
  },
  {
    slug: 'toxic-people',
    label: 'Difficult people',
    title: 'Bhagavad Gita on Dealing With Toxic People (Work & Home)',
    description:
      'A difficult boss, relative or colleague? Bhagavad Gita verses on staying steady with people who hurt you, without becoming like them.',
    h1: 'Bhagavad Gita on dealing with difficult people',
    keywords: ['bhagavad gita on dealing with toxic people', 'gita on toxic people', 'bhagavad gita on toxic boss', 'gita on enemies'],
    intro:
      'The Gita’s whole setting is a conflict with people Arjuna knows well. It never tells him to pretend the harm is not real. It asks him to see clearly, to stay even towards friend and enemy, to do his own duty well, and not to take on the qualities he is facing.',
    feeling: 'replay',
    situation: 'boss',
    verses: [
      { chapter: 6, verse: 9, why: 'Equal-minded towards friends, enemies and those in between.' },
      { chapter: 12, verse: 13, why: 'The one dear to Krishna hates no being and is friendly and kind.' },
      { chapter: 16, verse: 4, why: 'Arrogance, harshness and anger: naming the qualities so you can see them.' },
      { chapter: 3, verse: 35, why: 'Do your own duty, even imperfectly, rather than living someone else’s.' },
      { chapter: 2, verse: 38, why: 'Hold victory and defeat alike, then act.' },
    ],
  },
  {
    slug: 'losing-hope',
    label: 'Losing hope',
    title: 'Bhagavad Gita for Losing Hope & Tough Times',
    description:
      'When nothing seems to be working: Bhagavad Gita verses for tough times and losing hope, from Krishna’s words to a man who had given up.',
    h1: 'Bhagavad Gita for when you are losing hope',
    keywords: ['bhagavad gita on losing hope', 'bhagavad gita for tough times', 'bhagavad gita on depression', 'gita quotes for hard times'],
    intro:
      'The Gita opens with a man who has given up. Arjuna drops his bow and says he will not go on. Krishna does not lecture him about positivity. He reminds him who he is, promises that nothing done in good faith is wasted, and tells him he is carried.',
    feeling: 'faith',
    verses: [
      { chapter: 2, verse: 3, why: 'Krishna’s first push: do not give in to this weakness. Stand up.' },
      { chapter: 6, verse: 5, why: 'Raise yourself by yourself. Do not let yourself sink.' },
      { chapter: 6, verse: 40, why: 'One who does good never comes to ruin.' },
      { chapter: 9, verse: 22, why: 'To those who turn to him, Krishna brings what they lack and keeps what they have.' },
      { chapter: 18, verse: 66, why: 'Take refuge. I will free you. Do not grieve.' },
    ],
    note:
      'If you have felt low for weeks, or have thoughts of harming yourself, please talk to a doctor or someone you trust. In India, Tele-MANAS is free and confidential on 14416.',
  },
  {
    slug: 'money-stress',
    label: 'Money worries',
    title: 'Bhagavad Gita on Money, Greed & Financial Worry',
    description:
      'What the Bhagavad Gita says about money, wanting more, and worrying about security. Verses with Sanskrit, Hindi and English meaning.',
    h1: 'Bhagavad Gita on money and financial worry',
    keywords: ['bhagavad gita on money', 'bhagavad gita on greed', 'gita on wealth', 'bhagavad gita on financial stress'],
    intro:
      'The Gita is not against earning. It is against being run by wanting. These verses separate honest work from the restless craving that is never satisfied, and include Krishna’s promise about security to those who rely on him.',
    feeling: 'nerve',
    situation: 'money_tight',
    verses: [
      { chapter: 2, verse: 47, why: 'Do the work well. Its fruit is not yours to control.' },
      { chapter: 9, verse: 22, why: 'Yoga-kshemam vahamyaham: Krishna carries the security of those who rely on him.' },
      { chapter: 16, verse: 21, why: 'Greed is one of the three gates to ruin.' },
      { chapter: 2, verse: 70, why: 'Peace belongs to the one who is not a slave to every desire.' },
      { chapter: 3, verse: 8, why: 'Keep doing your work. Even the body needs action to be maintained.' },
    ],
  },
  {
    slug: 'guilt',
    label: 'Guilt & past mistakes',
    title: 'Bhagavad Gita on Guilt & Past Mistakes',
    description:
      'Carrying something you did? Bhagavad Gita verses on guilt, past mistakes and starting again, in Sanskrit, Hindi and English with meaning.',
    h1: 'Bhagavad Gita on guilt and past mistakes',
    keywords: ['bhagavad gita on guilt', 'bhagavad gita on past mistakes', 'gita on forgiveness', 'gita quotes on guilt'],
    intro:
      'The Gita is unusually direct about the past. Krishna says that even the worst wrongdoer can cross over on the raft of knowledge, and that one who turns around with a sincere heart should be counted among the good. Guilt is meant to turn you, not to hold you.',
    feeling: 'replay',
    situation: 'guilt',
    verses: [
      { chapter: 4, verse: 36, why: 'Even the worst of wrongdoers crosses over on the raft of knowledge.' },
      { chapter: 4, verse: 37, why: 'As fire turns wood to ash, knowledge burns up past action.' },
      { chapter: 9, verse: 30, why: 'Whoever turns sincerely, whatever they did before, is to be counted good.' },
      { chapter: 9, verse: 31, why: 'They soon become righteous and find lasting peace.' },
      { chapter: 6, verse: 5, why: 'Lift yourself. Do not let yourself sink.' },
    ],
  },
  {
    slug: 'family-problems',
    label: 'Family & in-laws',
    title: 'Bhagavad Gita on Family Problems & In-Laws',
    description:
      'The Gita begins with a family conflict. Verses on family problems, in-laws and duty to people you love, in Sanskrit, Hindi and English.',
    h1: 'Bhagavad Gita on family problems',
    keywords: ['bhagavad gita on family problems', 'gita on in-laws', 'bhagavad gita on family relationships', 'bhagavad gita on marriage in hindi'],
    intro:
      'The Mahabharata is a family story, and the Gita is spoken at its worst moment, with Arjuna facing his own relatives. Krishna’s teaching on duty, fairness and steadiness was given for exactly this: the people closest to you, when it goes wrong.',
    feeling: 'replay',
    situation: 'in_laws',
    verses: [
      { chapter: 1, verse: 28, why: 'Arjuna sees his own family on the other side, and his strength leaves him.' },
      { chapter: 6, verse: 9, why: 'Even-minded towards well-wishers, the hostile and relatives alike.' },
      { chapter: 3, verse: 35, why: 'Your own duty, done imperfectly, over someone else’s done well.' },
      { chapter: 12, verse: 13, why: 'Without hatred, friendly and compassionate to all.' },
      { chapter: 2, verse: 47, why: 'Do your part. You cannot control how they respond.' },
    ],
  },
  {
    slug: 'comparison',
    label: 'Comparison & self-worth',
    title: 'Bhagavad Gita on Comparison & Self-Worth',
    description:
      'Feel like everyone is ahead of you? Bhagavad Gita verses on comparison, your own path (svadharma) and self-worth, with meaning.',
    h1: 'Bhagavad Gita on comparison and self-worth',
    keywords: ['bhagavad gita on comparison', 'bhagavad gita on self worth', 'gita on low self esteem', 'bhagavad gita on confidence'],
    intro:
      'The Gita has a word for the life that is yours to live: svadharma. Twice Krishna says it is better to walk your own path imperfectly than someone else’s perfectly. These verses are about measuring yourself by your own work, not by anyone’s results.',
    feeling: 'nerve',
    situation: 'everyone_ahead',
    verses: [
      { chapter: 3, verse: 35, why: 'Better your own duty imperfectly than another’s done well.' },
      { chapter: 18, verse: 47, why: 'Krishna says it again near the end, so it is not missed.' },
      { chapter: 6, verse: 5, why: 'You can be your own friend or your own enemy.' },
      { chapter: 6, verse: 6, why: 'For one who has mastered the mind, the mind is a friend.' },
      { chapter: 2, verse: 47, why: 'The work is yours. The result is not a measure of you.' },
    ],
  },
  {
    slug: 'cant-sleep',
    label: 'Sleep & a restless mind',
    title: 'Bhagavad Gita on Sleep & a Restless Mind',
    description:
      'Lying awake replaying the day? What the Bhagavad Gita says about sleep, balance and a restless mind at night.',
    h1: 'Bhagavad Gita on sleep and a restless mind',
    keywords: ['bhagavad gita on sleep', 'gita verse for sleep', 'bhagavad gita restless mind', 'gita before sleep'],
    intro:
      'Krishna mentions sleep directly: yoga is not for one who sleeps too much or too little. The verses around it are about the mind that will not settle, which is usually what keeps us awake.',
    feeling: 'quiet',
    situation: 'cant_sleep',
    verses: [
      { chapter: 6, verse: 16, why: 'Not too much sleep, not too little.' },
      { chapter: 6, verse: 17, why: 'Balance in food, rest, work and sleep removes sorrow.' },
      { chapter: 6, verse: 34, why: 'The mind is as hard to hold as the wind.' },
      { chapter: 6, verse: 35, why: 'Practice and letting go train it.' },
      { chapter: 2, verse: 69, why: 'What is night for all beings, the steady one is awake to.' },
    ],
  },
  {
    slug: 'decision-making',
    label: 'Confusion & hard decisions',
    title: 'Bhagavad Gita on Confusion & Hard Decisions',
    description:
      'Stuck on a decision? The Gita is a conversation about one. Verses on confusion, clarity and choosing well, in Sanskrit, Hindi and English.',
    h1: 'Bhagavad Gita on confusion and hard decisions',
    keywords: ['bhagavad gita on decision making', 'bhagavad gita on confusion', 'gita on choices', 'bhagavad gita when confused'],
    intro:
      'The whole Gita is a response to one undecided man. Arjuna admits he does not know what is right and asks for help. Eighteen chapters later, Krishna does not decide for him: he says reflect on all of it fully, then do as you choose.',
    feeling: 'nerve',
    situation: 'decision',
    verses: [
      { chapter: 2, verse: 7, why: 'Arjuna admits his confusion and asks to be taught. That is where clarity starts.' },
      { chapter: 2, verse: 41, why: 'A resolute mind is one-pointed. The irresolute one branches endlessly.' },
      { chapter: 18, verse: 30, why: 'Clear understanding knows what to do and what not to, what to fear and what not to.' },
      { chapter: 3, verse: 35, why: 'Choose your own path, even if it is harder.' },
      { chapter: 18, verse: 63, why: 'Reflect on this fully, then do as you wish.' },
    ],
  },
  {
    slug: 'loneliness',
    label: 'Loneliness & homesickness',
    title: 'Bhagavad Gita for Loneliness & Homesickness',
    description:
      'Far from home or feeling alone? Bhagavad Gita verses on loneliness and the presence that does not leave, in Sanskrit, Hindi and English.',
    h1: 'Bhagavad Gita for loneliness and being far from home',
    keywords: ['bhagavad gita on loneliness', 'gita for homesickness', 'bhagavad gita feeling alone', 'gita quotes on loneliness'],
    intro:
      'The Gita’s answer to loneliness is not a crowd. It is a presence: Krishna says he lives in the heart of every being, and that one who sees him everywhere is never lost to him. For anyone far from family, these verses are a way home.',
    feeling: 'faith',
    situation: 'far_from_home',
    verses: [
      { chapter: 6, verse: 30, why: 'Whoever sees me everywhere is never lost to me, nor I to them.' },
      { chapter: 18, verse: 61, why: 'The Lord dwells in the heart of every being.' },
      { chapter: 9, verse: 29, why: 'Those who turn to me with love are in me, and I in them.' },
      { chapter: 5, verse: 29, why: 'Knowing him as the friend of all beings, one finds peace.' },
      { chapter: 9, verse: 22, why: 'Krishna carries what you lack and keeps what you have.' },
    ],
  },
]

export const gitaForBySlug = (slug: string) => GITA_FOR.find((p) => p.slug === slug)
