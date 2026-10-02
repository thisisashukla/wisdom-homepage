-- Seed: Purpose node quotes (8 quotes from purpose_node_quotes.json)
-- Note: Sanskrit text uses Devanagari Unicode. Paste actual Devanagari in production.

DO $$
DECLARE
  purpose_node_id UUID;
  letting_go_id   UUID;
  effort_id       UUID;
  clarity_id      UUID;
  discipline_id   UUID;
  duty_id         UUID;
BEGIN

SELECT id INTO purpose_node_id FROM nodes WHERE slug = 'purpose';
SELECT id INTO letting_go_id   FROM nodes WHERE slug = 'letting_go';
SELECT id INTO effort_id       FROM nodes WHERE slug = 'effort';
SELECT id INTO clarity_id      FROM nodes WHERE slug = 'clarity';
SELECT id INTO discipline_id   FROM nodes WHERE slug = 'discipline';
SELECT id INTO duty_id         FROM nodes WHERE slug = 'duty';

-- ── BG 2:47 ──────────────────────────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'bg_2_47', 'bhagavad_gita', '2', '47', 'Krishna', 'Krishna',
  'karmanye vadhikaraste ma phaleshu kadachana | ma karma-phala-hetur bhur ma te sango stv akarmani ||',
  'You have the right to do your work. You do not have the right to its results. Do not make the outcome the reason you act — but do not use that as an excuse to stop acting.',
  'The reason effort feels exhausting is not the effort itself. It is the weight of outcomes you have tied to it. Put the work down. Pick up just the doing.',
  'Krishna is speaking to Arjuna, who has frozen in the middle of a battlefield because the stakes feel too high and the results too uncertain. His answer is not motivational — it is structural. He points out that Arjuna has made a category error: he has confused what he controls, his action, with what he does not control, what happens because of it. The verse does not say outcomes do not matter. It says outcomes are not yours to claim. Your claim is only ever the doing.',
  'You refresh the metrics. You check if the email landed. You measure every output against an invisible scoreboard nobody else can see. This is the trapped feeling — not the work itself, but the constant auditing of whether the work is producing the right numbers. This verse is the direct antidote. Not stop caring. Stop making the caring about the result.',
  'Psychological research distinguishes process goals from outcome goals. People with process goals — I will write for one hour — consistently outperform and outlast people with outcome goals — I will get published. Krishna articulated this twenty-five centuries before the research. The action is yours. The fruit belongs to the field.',
  'Do the work completely. Own nothing but the doing.',
  'You own the action. Never the outcome.',
  '[
    {"template_type": "action_truth", "quote_text": "Do the work fully. Release what follows."},
    {"template_type": "realization_reminder", "quote_text": "The outcome was never yours to carry. That was always the weight you chose."},
    {"template_type": "philosophical", "quote_text": "Action belongs to you. Results belong to life."},
    {"template_type": "divine_identity", "quote_text": "You are the one who acts. You are not the one who decides what that action earns."},
    {"template_type": "metaphor", "quote_text": "The farmer plants with full effort and releases the rain to the sky. That is not weakness. That is wisdom."},
    {"template_type": "encouragement", "quote_text": "Give it everything. Then let it go. That is the whole instruction."},
    {"template_type": "timeless", "quote_text": "What you do is yours. What comes from it never was."}
  ]',
  true, purpose_node_id,
  ARRAY[letting_go_id, effort_id], true,
  'philosophical', 'grounding', 'standalone',
  ARRAY['stuck']::entry_point_type[], 'surface'
);

-- ── BG 3:35 ──────────────────────────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'bg_3_35', 'bhagavad_gita', '3', '35', 'Krishna', 'Krishna',
  'shreyan svadharmo vigunah paradharmat sv-anushthitat | svadharme nidhanam shreyah paradharmo bhayavahah ||',
  'Your own path, even walked imperfectly, is better than someone else''s path walked perfectly. It is better to struggle on your own road than to succeed on a road that was never yours.',
  'The reason you feel stuck might not be that you are failing. It might be that you are on someone else''s path and some part of you already knows it.',
  'Krishna is addressing one of the most common forms of suffering — the person who has built a life according to a blueprint that was never theirs. Svadharma means your own dharma, your specific nature, your particular duty, the path that fits the shape of who you actually are. Paradharma is the duty of another. Krishna is not saying other paths are bad. He is saying they are dangerous for you specifically, because walking them requires you to perform a version of yourself that is not true.',
  'You took the job because it was stable. You stayed because leaving felt irresponsible. You optimized the wrong thing for long enough that now you do not know what the right thing would feel like. This verse is not telling you to quit. It is asking you a harder question: whose life are you living, and when did you last check?',
  'The Svadharma principle maps onto what psychologists call authentic self-expression — the degree to which your daily actions reflect your actual values rather than performed values. Research consistently shows that the gap between authentic and performed self is one of the primary sources of chronic low-level dissatisfaction — the stuck feeling that has no single cause you can point to.',
  'An imperfect life that is truly yours will always outlast a perfect life that never was.',
  'Your imperfect path beats their perfect one.',
  '[
    {"template_type": "action_truth", "quote_text": "Walk your own road imperfectly. That is worth more than perfecting someone else''s."},
    {"template_type": "realization_reminder", "quote_text": "You are not failing. You may be succeeding at the wrong thing."},
    {"template_type": "philosophical", "quote_text": "The life that fits you, even imperfectly worn, is better than one tailored for someone else."},
    {"template_type": "divine_identity", "quote_text": "You were not made to walk another''s road. Your path has a shape only you can fill."},
    {"template_type": "metaphor", "quote_text": "A key that fits imperfectly still opens your door. Someone else''s perfect key opens nothing for you."},
    {"template_type": "encouragement", "quote_text": "Stop perfecting the wrong path. Start walking the right one, however rough."},
    {"template_type": "timeless", "quote_text": "Better to struggle toward your own truth than to succeed at someone else''s."}
  ]',
  true, purpose_node_id,
  ARRAY[duty_id], false,
  'philosophical', 'clarifying', 'standalone',
  ARRAY['stuck', 'lost']::entry_point_type[], 'medium'
);

-- ── BG 3:8 ───────────────────────────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'bg_3_8', 'bhagavad_gita', '3', '8', 'Krishna', 'Krishna',
  'niyatam kuru karma tvam karma jyayo hy akarmanah | sharira-yatrapi cha te na prasiddhyed akarmanah ||',
  'Do your prescribed work. Action is always better than inaction. Even keeping your own body alive requires you to act.',
  'Waiting to feel ready is itself a choice. And it is rarely the one that moves anything forward.',
  'This verse comes just before Krishna explains the deeper philosophy of desireless action. But here he is purely practical. Arjuna has paralyzed himself with thinking. Krishna''s response is almost blunt — act. Not because action guarantees results, but because inaction guarantees nothing and costs you even the basics of being present in your own life. The word niyatam means prescribed or required — the work that is specifically yours to do today.',
  'You have been thinking about the pivot, the project, the conversation you need to have, for months now. The thinking has produced a refined understanding of all the reasons it might not work. The Gita would call this sophisticated inaction. The smallest real step outweighs any amount of careful waiting.',
  'Behavioral activation — the practice of doing before feeling ready — is one of the most well-validated interventions in psychology. Mood follows action far more reliably than action follows mood. The stuck feeling feeds on inaction. The smallest act begins to dissolve it.',
  'Action, however small, is always better than the paralysis of waiting to feel ready.',
  'Act now. Feeling ready comes after.',
  '[
    {"template_type": "action_truth", "quote_text": "Begin. The clarity you are waiting for arrives through action, not before it."},
    {"template_type": "realization_reminder", "quote_text": "You have been waiting to feel ready. Ready is something you become by starting."},
    {"template_type": "philosophical", "quote_text": "Even the smallest action is worth more than the most perfectly planned inaction."},
    {"template_type": "divine_identity", "quote_text": "You are someone who acts. That is your nature. Stillness has its time, but this is not it."},
    {"template_type": "metaphor", "quote_text": "A lamp gives no light until it is lit. Your potential works the same way."},
    {"template_type": "encouragement", "quote_text": "Do the one thing. Not everything. The one thing that is actually yours to do today."},
    {"template_type": "timeless", "quote_text": "Action is always better. Even the body knows this."}
  ]',
  true, purpose_node_id,
  ARRAY[effort_id, discipline_id], false,
  'motivational', 'direct', 'standalone',
  ARRAY['stuck']::entry_point_type[], 'surface'
);

-- ── BG 6:5 ───────────────────────────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'bg_6_5', 'bhagavad_gita', '6', '5', 'Krishna', 'Krishna',
  'uddhared atmanatmanam natmanam avasadayet | atmaiva hy atmano bandhur atmaiva ripur atmanah ||',
  'Lift yourself up by your own effort. Do not let yourself fall. Your own mind is your greatest friend and your own mind is your worst enemy.',
  'The voice telling you that you are stuck is coming from the same place that could get you unstuck. Which one you listen to is the actual choice available to you right now.',
  'Krishna makes a statement here that is radical even by modern standards — the self is both the problem and the solution. The mind that spirals into stuckness is the same mind that, directed properly, finds the way forward. This is not a call to positive thinking. It is a precise observation that the source of your limitation and the source of your liberation are the same faculty.',
  'You have read the books, listened to the podcasts, taken the courses. Some of it helped temporarily. But the stuck feeling returned because the mind that consumes solutions is the same mind generating the problem. This verse is not telling you to stop seeking. It is telling you that what you seek is already inside the seeker.',
  'Internal locus of control — the belief that your actions and responses genuinely influence your outcomes — is one of the strongest psychological predictors of resilience. The Gita frames this not as a personality trait to develop but as a truth to recognize.',
  'Your mind is the only thing that can free you and the only thing that can keep you trapped.',
  'Your mind is both the lock and the key.',
  '[
    {"template_type": "action_truth", "quote_text": "Raise yourself. No one else can do this particular part."},
    {"template_type": "realization_reminder", "quote_text": "The voice saying you are stuck and the voice that knows better — both are yours. Choose carefully which one leads."},
    {"template_type": "philosophical", "quote_text": "The mind that imprisons you is the same mind that holds the key."},
    {"template_type": "divine_identity", "quote_text": "Within you is the one who limits and the one who liberates. You decide which one leads today."},
    {"template_type": "metaphor", "quote_text": "A river can flood its banks or carve a canyon. The same water. The direction is everything."},
    {"template_type": "encouragement", "quote_text": "You have already survived the hardest parts. What is ahead needs the same one who got you here."},
    {"template_type": "timeless", "quote_text": "You are your own best friend and your own worst enemy. Decide today which one shows up."}
  ]',
  true, purpose_node_id,
  ARRAY[clarity_id, discipline_id], true,
  'philosophical', 'empowering', 'standalone',
  ARRAY['stuck', 'lost', 'anxious']::entry_point_type[], 'medium'
);

-- ── BG 18:46 ─────────────────────────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'bg_18_46', 'bhagavad_gita', '18', '46', 'Krishna', 'Krishna',
  'yatah pravrittir bhutanam yena sarvam idam tatam | sva-karmana tam abhyarchya siddhim vindati manavah ||',
  'By performing your own work with full dedication — as an offering to the source from which all life comes — a person finds fulfillment.',
  'What if your daily work, done completely and given fully, was itself the practice? Not the obstacle to a meaningful life. The path into one.',
  'This verse sits near the very end of the Gita, after all the philosophy has been laid out. Krishna brings everything back to this: your work. Not meditation in a cave, not pilgrimage, not scholarship. Your specific, ordinary, daily work — done as an act of devotion to the source of all existence. The word abhyarchya means to worship through. Your work is the worship. The ordinary is the sacred.',
  'You have been treating your work as the thing you do before your real life begins. The side project, the spiritual practice, the morning routine — these feel more real than the spreadsheet, the meeting, the email. This verse disagrees. The spreadsheet, done fully and given completely, is the practice.',
  'Csikszentmihalyi spent decades studying what makes people feel most alive and found that flow — complete absorption in a challenging task — produces the same neurological markers as deep meditation. Sacred and ordinary are the same thing. The difference is the quality of attention brought to them.',
  'Your ordinary work, done with full devotion, is itself the path to fulfillment.',
  'Your work, done fully, is the whole practice.',
  '[
    {"template_type": "action_truth", "quote_text": "Do your work completely, as an offering. That is the whole practice."},
    {"template_type": "realization_reminder", "quote_text": "You have been waiting for the meaningful thing to begin. It began with your very next action."},
    {"template_type": "philosophical", "quote_text": "Fulfillment is not found after the work. It lives inside the work done fully."},
    {"template_type": "divine_identity", "quote_text": "When you work with your whole self, you touch the source of everything. That is not a metaphor."},
    {"template_type": "metaphor", "quote_text": "The candle does not wait to be appreciated before it gives its light. It simply burns completely."},
    {"template_type": "encouragement", "quote_text": "The work in front of you right now is not beneath you. Done fully, nothing is."},
    {"template_type": "timeless", "quote_text": "What you do with full attention becomes sacred. Every time."}
  ]',
  true, purpose_node_id,
  ARRAY[effort_id, letting_go_id], true,
  'philosophical', 'elevating', 'standalone',
  ARRAY['stuck', 'empty']::entry_point_type[], 'deep'
);

-- ── BG 3:19 ──────────────────────────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'bg_3_19', 'bhagavad_gita', '3', '19', 'Krishna', 'Krishna',
  'tasmad asaktah satatam karyam karma samachara | asakto hy acharan karma param apnoti purushah ||',
  'Always perform the work that must be done, but without attachment to its outcome. The person who acts without attachment reaches what is highest.',
  'There is a version of working hard that exhausts you and a version that frees you. The difference is not the effort. It is what you need the effort to prove.',
  'The word asaktah means without attachment — not without care, not without full investment. The distinction Krishna is drawing is precise. You can work hard and care deeply about the work while being completely released from what the work is supposed to prove about you. The person who works to prove their worth is enslaved by every outcome. The person who works because the work itself is the right action is free regardless of what results.',
  'The stuck feeling has two common sources. Either you are not doing the work — inaction. Or you are doing the work but making it carry the weight of your self-worth. Every project becomes a referendum on whether you are enough. This verse is for the second kind. You are already enough. The work does not have to keep proving it.',
  'Attachment to outcomes triggers what psychologists call evaluative threat — the mind moves from creative mode into defensive mode. Paradoxically, releasing attachment to outcomes consistently produces better performance and more creative output.',
  'Work without needing the result to define you. That is both the practice and the freedom.',
  'Do the work. Don''t need it to prove anything.',
  '[
    {"template_type": "action_truth", "quote_text": "Act fully. Need nothing from the outcome. That is the highest form of effort."},
    {"template_type": "realization_reminder", "quote_text": "The work does not have to prove your worth. It never did. That was always the heaviest weight."},
    {"template_type": "philosophical", "quote_text": "The person who acts without needing the result is the freest person in any room."},
    {"template_type": "divine_identity", "quote_text": "You are not the sum of your outcomes. Act from that truth and see what changes."},
    {"template_type": "metaphor", "quote_text": "The river does not wonder if it is reaching the ocean correctly. It moves. That is its nature."},
    {"template_type": "encouragement", "quote_text": "Do it without needing it to go a certain way. That is the version of you that can actually do anything."},
    {"template_type": "timeless", "quote_text": "Act without attachment. That is not detachment from life. It is the deepest form of living it."}
  ]',
  true, purpose_node_id,
  ARRAY[letting_go_id], true,
  'philosophical', 'liberating', 'standalone',
  ARRAY['stuck']::entry_point_type[], 'medium'
);

-- ── BG 4:38 ──────────────────────────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'bg_4_38', 'bhagavad_gita', '4', '38', 'Krishna', 'Krishna',
  'na hi jnanena sadrisham pavitram iha vidyate | tat svayam yoga-samsiddhah kalenatmani vindati ||',
  'Nothing in this world purifies like self-knowledge. The one who masters their practice finds this knowledge within themselves, in time.',
  'The clarity you are looking for outside yourself will only be found by going further inside. And it arrives on its own schedule, not yours.',
  'The key word here is kalenatmani — within oneself, in time. The knowledge that resolves the stuck feeling is not information. It is not the right book or the right mentor. It is something that emerges through sustained practice. Yoga-samsiddhah means one who is perfected through consistent work. The timeline is not yours to control. The practice is.',
  'You have been trying to think your way to clarity. Every framework, every journaling prompt, every thoughtful conversation — circling the same question without quite landing. This verse says the clarity is not in the information. It is already in you and will surface through the practice itself.',
  'Incubation — the phenomenon where the unconscious continues processing a problem after conscious effort stops — reliably produces breakthroughs that direct analysis cannot. The knowledge is already in you. It surfaces when the conditions are right. The conditions are created by the practice.',
  'The clarity you need is already inside you. Consistent practice is how you find it.',
  'The answer is in you. Practice brings it forward.',
  '[
    {"template_type": "action_truth", "quote_text": "Keep the practice. The clarity it produces cannot be rushed but it always arrives."},
    {"template_type": "realization_reminder", "quote_text": "You have been looking outside for what only lives inside. The practice is the way in."},
    {"template_type": "philosophical", "quote_text": "Nothing clears the path like knowing yourself. That knowing comes through practice, not thinking."},
    {"template_type": "divine_identity", "quote_text": "Everything you need to understand is already in you. The practice is just how you find your way there."},
    {"template_type": "metaphor", "quote_text": "Still water shows you your reflection. A mind settled by practice shows you the same."},
    {"template_type": "encouragement", "quote_text": "Stay with the practice a little longer. The knowledge you need is on its way up."},
    {"template_type": "timeless", "quote_text": "Self-knowledge is the only thing that truly clears the path. It grows from within, in time."}
  ]',
  true, purpose_node_id,
  ARRAY[clarity_id, discipline_id], true,
  'philosophical', 'patient', 'standalone',
  ARRAY['stuck', 'lost']::entry_point_type[], 'deep'
);

-- ── Ramcharitmanas: Hanuman Leap ──────────────────────────────────────────────
INSERT INTO quotes (
  verse_id, source, chapter, verse_number, speaker, deity,
  transliteration, simple_meaning, simple_insight,
  detailed_meaning, modern_relevance, insight, essence, widget_quote,
  quote_variants, is_standalone_quote, primary_node_id,
  secondary_node_ids, is_bridge_quote, category, tone, content_mode,
  target_entry_points, depth_tier
) VALUES (
  'rc_hanuman_leap', 'ramcharitmanas', 'Sundarkand', 'doha_1', 'Tulsidas', 'Hanuman',
  'jamavant ke bachan suhae | suni hanumant hriday harasae ||',
  'When Jamvant reminded Hanuman of his true strength, Hanuman''s heart filled with joy. He had forgotten what he was capable of. Being reminded, he remembered — and then he leapt.',
  'You are not stuck because you lack capability. You may have simply forgotten what you are actually capable of.',
  'This is one of the most psychologically precise moments in Indian literature. Hanuman — capable of leaping oceans and moving mountains — has forgotten his own strength. He sits with the other monkeys at the shore, looking at the water, believing the task impossible. It takes Jamvant, the wise elder, to simply remind him. Not to teach him anything new. Not to give him new power. Just to remind him of what was always his. The moment Hanuman hears it, his heart fills with joy. Recognition, not acquisition. He already had everything needed. He needed only to remember.',
  'The stuck feeling often has nothing to do with capability. You have solved harder problems than this. You have navigated worse uncertainty. You have done things that seemed impossible before you did them. Something — stress, comparison, accumulated self-doubt — has made you forget. This is the Hanuman moment. You do not need more capability. You need to remember that you already have it.',
  'Self-efficacy — the belief in your specific capacity to accomplish a specific task — is the single strongest psychological predictor of whether someone will attempt something difficult. Self-efficacy is rebuilt through remembering past successes. Jamvant is self-efficacy. Hanuman''s leap is what follows when it is restored.',
  'You have not lost your strength. You have only forgotten it. Let something remind you.',
  'You have not lost your strength. Just forgotten it.',
  '[
    {"template_type": "action_truth", "quote_text": "Remember what you have already crossed. Then look at what is in front of you now."},
    {"template_type": "realization_reminder", "quote_text": "You are not stuck because you lack what is needed. You have forgotten that you already have it."},
    {"template_type": "philosophical", "quote_text": "The strength was never missing. Only the memory of it."},
    {"template_type": "divine_identity", "quote_text": "Like Hanuman at the ocean''s edge — you already carry within you everything this moment requires."},
    {"template_type": "metaphor", "quote_text": "Hanuman sat at the shore believing the ocean uncrossable. Reminded of himself, he flew. You are at that shore right now."},
    {"template_type": "encouragement", "quote_text": "Someone needs to remind you what you are capable of. Let this be that reminder."},
    {"template_type": "timeless", "quote_text": "The leap was always possible. You just needed to remember who is doing the leaping."}
  ]',
  true, purpose_node_id,
  ARRAY[effort_id], false,
  'motivational', 'warm', 'standalone',
  ARRAY['stuck', 'alone']::entry_point_type[], 'surface'
);

END $$;
