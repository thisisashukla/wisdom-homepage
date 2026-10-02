-- Seed: Path of Action nodes
-- ring 0=center, 1=pillar, 2=L1, 3=L2, 4=mastery

INSERT INTO nodes (slug, display_name, sanskrit_term, sanskrit_transliteration, path, ring, position_angle, description, connection_text, depth_to_show_sanskrit)
VALUES
(
  'purpose',
  'Purpose',
  'Svadharma',
  'Svadharma',
  'action',
  2,
  270,
  'Why am I here? Purpose is not a destination you find. It is a quality of attention you bring to what is already in front of you. This node is about finding meaning behind your work that lives deeper than status, money, or anyone else''s approval.',
  'Purpose connects forward to Discipline — once you know why you are here, building the habits that express it becomes possible. It also connects across to Clarity on the Path of Mind. Purpose and self-knowledge feed each other.',
  30
),
(
  'discipline',
  'Discipline',
  'Tapas',
  'Tapas',
  'action',
  2,
  300,
  'The practice of consistent effort. Discipline is not punishment — it is the container that lets your purpose take form. Without it, purpose remains an idea.',
  'Discipline connects to Effort on the outer ring and loops back to reinforce Purpose. The more you act from your own dharma, the more naturally consistent effort becomes.',
  30
),
(
  'duty',
  'Duty',
  'Dharma',
  'Dharma',
  'action',
  2,
  240,
  'What is yours to do, right now. Not in some ideal future. In the conditions you are actually in. Duty is purpose made concrete.',
  'Duty connects to Purpose at the same ring and feeds into Patience — knowing what is yours to do makes it easier to wait for it to unfold.',
  30
),
(
  'effort',
  'Effort',
  'Purushartha',
  'Puruṣārtha',
  'action',
  3,
  270,
  'Right effort — not striving, not straining, but the complete and full investment in what is yours to do. Effort is what Purpose looks like in motion.',
  'Effort connects outward to Letting Go. You give everything and then release. That sequence is the whole practice.',
  40
),
(
  'patience',
  'Patience',
  'Kshama',
  'Kṣamā',
  'action',
  3,
  300,
  'Patience is not passive waiting. It is active trust in a timeline you do not control. Patience is the practice of continuing without requiring results to confirm you.',
  'Patience connects back to Discipline and forward to Karma Mastery. The ability to stay in the practice without confirmation is the hallmark of the integrated practitioner.',
  40
),
(
  'letting_go',
  'Letting Go',
  'Vairagya',
  'Vairāgya',
  'action',
  3,
  240,
  'The art of releasing what you cannot hold. Not giving up — releasing what was never yours to keep. Vairagya is detachment from outcome without detachment from action.',
  'Letting Go connects across to the Heart path''s Surrender node — the deepest cross-path resonance in the mandala. Detachment and devotion turn out to be the same thing approached from different directions.',
  40
),
(
  'karma_mastery',
  'Karma Mastery',
  'Karma Yoga',
  'Karma Yoga',
  'action',
  4,
  270,
  'The complete integration of action, purpose, and release. You act without needing the world to confirm you. The work is its own reward. This is not an achievement — it is a recognition.',
  'Karma Mastery is the completion of the Path of Action. From here you can see all three paths clearly. The connections to Mind and Heart become visible.',
  50
);

-- Seed Path of Mind nodes (faint outlines in MVP — content filled in Stage 5)
INSERT INTO nodes (slug, display_name, sanskrit_term, sanskrit_transliteration, path, ring, position_angle, description, depth_to_show_sanskrit)
VALUES
(
  'stillness',
  'Stillness',
  'Shanti',
  'Śānti',
  'mind',
  2,
  90,
  'The mind that does not react is not empty. It is full. Stillness is the ground state of clear seeing.',
  30
),
(
  'clarity',
  'Clarity',
  'Viveka',
  'Viveka',
  'mind',
  2,
  60,
  'The capacity to tell the real from the performed — in the world and in yourself.',
  30
),
(
  'detachment',
  'Detachment',
  'Vairagya',
  'Vairāgya',
  'mind',
  3,
  90,
  'Seeing clearly without being caught. Detachment is not coldness — it is the freedom to care without being controlled by what you care about.',
  40
);

-- Seed Path of Heart nodes (faint outlines in MVP)
INSERT INTO nodes (slug, display_name, sanskrit_term, sanskrit_transliteration, path, ring, position_angle, description, depth_to_show_sanskrit)
VALUES
(
  'gratitude',
  'Gratitude',
  'Kritajna',
  'Kṛtajña',
  'heart',
  2,
  180,
  'Gratitude is not a response to good things. It is a stance toward existence itself.',
  30
),
(
  'surrender',
  'Surrender',
  'Prapatti',
  'Prapatti',
  'heart',
  3,
  180,
  'Surrender is not defeat. It is the recognition that love does not require control.',
  40
);

-- Node connections: Path of Action vertical chain
INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'vertical', 'Purpose is the seed. Discipline is how it grows.'
FROM nodes f, nodes t
WHERE f.slug = 'purpose' AND t.slug = 'discipline';

INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'vertical', 'Duty is Purpose expressed in the conditions you actually face.'
FROM nodes f, nodes t
WHERE f.slug = 'purpose' AND t.slug = 'duty';

INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'vertical', 'Discipline practiced long enough becomes Effort — the full investment without resistance.'
FROM nodes f, nodes t
WHERE f.slug = 'discipline' AND t.slug = 'effort';

INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'vertical', 'Duty practiced with full presence becomes Patience — you stop checking whether the results arrived.'
FROM nodes f, nodes t
WHERE f.slug = 'duty' AND t.slug = 'patience';

INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'vertical', 'Complete effort makes Letting Go natural — there is nothing left to hold.'
FROM nodes f, nodes t
WHERE f.slug = 'effort' AND t.slug = 'letting_go';

INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'vertical', 'All three outer nodes feed into Karma Mastery — the integration of action, patience, and release.'
FROM nodes f, nodes t
WHERE f.slug = 'letting_go' AND t.slug = 'karma_mastery';

-- Cross-path connections (visible at paywall trigger point)
INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'cross_path', 'Purpose and Clarity feed each other. The clearer you see yourself, the more naturally purpose emerges. The more purposeful your action, the clearer your self-knowledge becomes.'
FROM nodes f, nodes t
WHERE f.slug = 'purpose' AND t.slug = 'clarity';

INSERT INTO node_connections (from_node_id, to_node_id, connection_type, resonance_description)
SELECT f.id, t.id, 'cross_path', 'Letting Go and Surrender are the same movement approached from different directions. Action releases through effort. Heart releases through love.'
FROM nodes f, nodes t
WHERE f.slug = 'letting_go' AND t.slug = 'surrender';
