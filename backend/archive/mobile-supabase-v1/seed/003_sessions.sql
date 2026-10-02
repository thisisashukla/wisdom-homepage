-- Seed: Day 1 session for "I feel stuck" entry point
-- Screen content is verbatim from session_day1_screens in purpose_node_quotes.json

DO $$
DECLARE
  purpose_node_id UUID;
BEGIN

SELECT id INTO purpose_node_id FROM nodes WHERE slug = 'purpose';

INSERT INTO sessions (slug, entry_point, session_index, session_type, title, estimated_minutes, node_id, screens)
VALUES (
  'stuck_day1',
  'stuck',
  0,
  'onboarding',
  'Finding the weight',
  8,
  purpose_node_id,
  '[
    {
      "screen_index": 0,
      "screen_type": "mirror",
      "heading": null,
      "body_text": "You are not lazy. You are not broken.\n\nYou are working hard and nothing seems to move.\n\nThat specific kind of tired — where effort feels pointless — has a name in Hindu philosophy.\n\nAnd more importantly, it has a way through.",
      "word_by_word": false,
      "input_type": "none",
      "depth_award": 0
    },
    {
      "screen_index": 1,
      "screen_type": "verse",
      "heading": null,
      "body_text": "You have the right to act.\nYou do not have the right to the fruit of your action.",
      "verse_text": "karmanye vadhikaraste ma phaleshu kadachana",
      "verse_id": "bg_2_47",
      "sanskrit_term": "Nishkama Karma",
      "sanskrit_label": "the yoga of desireless action",
      "reframe_text": "The reason you feel stuck is not that you are failing.\nIt is that you have been measuring your effort by outcomes you cannot control.\nThe Gita calls this the root of suffering.\nAnd the moment you see it, something loosens.",
      "word_by_word": true,
      "input_type": "none",
      "depth_award": 2
    },
    {
      "screen_index": 2,
      "screen_type": "practice",
      "heading": "The Weight Audit",
      "body_text": "Think of the one thing you have been working hardest on.\n\nWhen you imagine it succeeding — what specifically do you picture?",
      "input_prompt": "Write it in one sentence. Don''t edit it.",
      "input_type": "long_text",
      "submit_label": "Done",
      "post_submit_text": "Now read what you wrote.\n\nThat thing you pictured — that is what you have been carrying.\n\nThat is not your goal. That is your attachment.\n\nThey feel identical from the inside.\nThey are completely different things.",
      "word_by_word": false,
      "depth_award": 10
    },
    {
      "screen_index": 3,
      "screen_type": "naming",
      "heading": null,
      "body_text": "You just named your attachment.\n\nMost people carry it their whole life without ever seeing it.\n\nThat seeing — that is called Viveka.\nDiscernment. The ability to tell the real from the performed.\n\nYou have been on the Path of Action your whole life.\n\nYou just found its philosophy.",
      "word_by_word": false,
      "input_type": "none",
      "depth_award": 3
    },
    {
      "screen_index": 4,
      "screen_type": "unlock",
      "heading": null,
      "body_text": "Your first node is unlocked.\n\nNot because you read something.\nBecause you saw something.",
      "node_unlocked": "purpose",
      "word_by_word": false,
      "input_type": "none",
      "depth_award": 5
    }
  ]'
);

-- Re-entry session for stuck path
INSERT INTO sessions (slug, entry_point, session_index, session_type, title, estimated_minutes, node_id, screens)
VALUES (
  'stuck_reentry',
  'stuck',
  99,
  'reentry',
  'Coming back',
  3,
  purpose_node_id,
  '[
    {
      "screen_index": 0,
      "screen_type": "mirror",
      "heading": null,
      "body_text": "You were here before.\n\nSomething pulled you away. That is normal.\n\nThe practice does not require consistency to begin again.\nIt only requires that you begin again.",
      "word_by_word": false,
      "input_type": "none",
      "depth_award": 0
    },
    {
      "screen_index": 1,
      "screen_type": "practice",
      "heading": "One thing",
      "body_text": "What is the one thing in front of you right now that you have been avoiding?",
      "input_prompt": "Name it. One sentence.",
      "input_type": "long_text",
      "submit_label": "Named it",
      "post_submit_text": "That is the work.\n\nNot everything. That one thing.\n\nThat is enough for today.",
      "word_by_word": false,
      "depth_award": 5
    }
  ]'
);

END $$;
