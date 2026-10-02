"""Runtime tests for source selection, remembered corrections and resumed discussions."""
import json
import unittest
from contextlib import ExitStack
from datetime import date
from types import SimpleNamespace
from unittest.mock import Mock, patch
from uuid import uuid4

from fastapi import FastAPI
from fastapi.testclient import TestClient
from common.auth import AuthenticatedUser, require_user
from common.models import RagRequest, VerseResult
from ai import conversation
from ai.episodes import episode_context, EPISODES
from server import reflections, rag
from test_practice_feedback import Database, Query

VERSE = {'script_ref':'bhagwad_gita::267', 'scripture':'bhagwad_gita', 'orig_ref':'6,34',
         'verse_text':'चञ्चलं हि मनः कृष्ण', 'english_translation':'The mind is restless.',
         'simple_meaning':'Arjuna finds the mind difficult to restrain.'}
PLAN = {'move':'answer', 'retrievalQuery':'', 'sourcePurpose':'', 'safetyRoute':'standard', 'state':{}}

class MemoryTests(unittest.TestCase):
    def test_state_rejects_invented_evidence_and_retains_actual_correction(self):
        raw = {**PLAN, 'state':{'constraints':[{'text':'Cannot lose pay', 'evidence':"I can't afford a day off."},
                                             {'text':'Abusive boss', 'evidence':'My boss is abusive'}],
                              'rejectedInterpretations':[{'text':'Boss is unkind', 'evidence':"He's kind."}]}}
        with patch.object(conversation, 'get_sarvam', return_value=SimpleNamespace(generate_json=lambda *a,**k:raw)):
            result = conversation.plan_turn("I can't afford a day off.", [], {'rejectedInterpretations':[{'text':'Boss is unkind','evidence':"He's kind."}]})
        self.assertEqual(len(result['state']['constraints']), 1)
        self.assertEqual(result['state']['rejectedInterpretations'][0]['text'], 'Boss is unkind')

    def test_no_retrieval_when_unneeded_or_supportive(self):
        with patch.object(conversation, 'get_embedder') as embedder:
            self.assertEqual(conversation.retrieve_for_turn(PLAN), [])
            self.assertEqual(conversation.retrieve_for_turn({**PLAN, 'retrievalQuery':'grief', 'safetyRoute':'supportive'}), [])
            embedder.assert_not_called()

    def test_weak_or_unavailable_sources_are_optional(self):
        with patch.object(conversation, 'get_embedder', return_value=SimpleNamespace(embed=lambda q:[])), patch.object(conversation, 'get_index', return_value=SimpleNamespace(search=lambda *a,**k:[{'verse':VERSE,'sim':0.1}])):
            self.assertEqual(conversation.retrieve_for_turn({**PLAN, 'retrievalQuery':'something'}), [])
        with patch.object(conversation, 'get_embedder', side_effect=RuntimeError):
            self.assertEqual(conversation.retrieve_for_turn({**PLAN, 'retrievalQuery':'something'}), [])

    def test_unknown_selection_never_falls_back(self):
        self.assertEqual(conversation.selected_sources([], [VERSE]), [])
        with self.assertRaises(ValueError): conversation.selected_sources(['fabricated'], [VERSE])
        with self.assertRaises(ValueError): rag._parse_segments({'segments':[{'type':'text','content':'As the source says...'}, {'type':'verse','uid':'fabricated'}]}, {VERSE['script_ref']})

    def test_quote_only_reply_cannot_replace_a_conversational_answer(self):
        with self.assertRaisesRegex(ValueError, "Missing conversational"):
            rag._parse_segments({'segments':[{'type':'verse','uid':VERSE['script_ref']}]}, {VERSE['script_ref']})

    def test_scripture_aliases_are_normalized_before_filtering(self):
        with patch.object(conversation,'get_sarvam',return_value=SimpleNamespace(generate_json=lambda *a,**k:{**PLAN,'scriptureFilter':['Bhagavad Gita']})):
            self.assertEqual(conversation.plan_turn('Only the Gita, please',[])['scriptureFilter'], ['bhagwad_gita'])

    def test_story_names_cannot_bypass_grounding_with_empty_citations(self):
        with patch.object(conversation,'get_sarvam',return_value=SimpleNamespace(generate_json=lambda *a,**k:{'supported':True,'sourceIds':[], 'claims':[]})):
            with self.assertRaisesRegex(ValueError,'Named scriptural'):
                conversation.verify_grounding('Nachiketa accepted a kingdom from Yama.', [], [])

    def test_explicit_scripture_request_overrides_wrong_planner_filter(self):
        with patch.object(conversation,'get_sarvam',return_value=SimpleNamespace(generate_json=lambda *a,**k:{**PLAN,'retrievalQuery':'anger','scriptureFilter':['katha_upanishad']})):
            self.assertEqual(conversation.plan_turn('Tell me a Gita story about anger.',[])['scriptureFilter'], ['bhagwad_gita'])

    def test_practical_wording_requests_get_a_draft_before_questions(self):
        with self.assertRaisesRegex(ValueError, 'ready-to-use draft'):
            conversation.validate_direct_answer('Help me say something to my manager.', 'What tone would you like?')
        conversation.validate_direct_answer('Help me say something to my manager.', 'You could say: "I would like to discuss my contribution."')
        self.assertFalse(conversation.requests_wording("I don't want a draft. Just listen."))

    def test_no_scripture_preference_disables_retrieval(self):
        with patch.object(conversation,'get_sarvam',return_value=SimpleNamespace(generate_json=lambda *a,**k:{**PLAN,'allowScripture':False,'retrievalQuery':'anger'})):
            self.assertEqual(conversation.plan_turn('No scripture, please.',[])['retrievalQuery'],'')

    def test_episode_fails_closed_if_one_passage_is_missing(self):
        self.assertEqual(episode_context('restless mind', SimpleNamespace(get_verse=lambda uid:None)), ([], []))

    def test_grounding_recovers_prose_citations_and_rejects_unsupported_claims(self):
        provider = SimpleNamespace(generate_json=Mock(return_value={'supported':True,'sourceIds':[VERSE['script_ref']], 'claims':[{'claim':'Arjuna describes a restless mind.', 'uid':VERSE['script_ref'], 'evidence':'The mind is restless.'}]}))
        with patch.object(conversation,'get_sarvam',return_value=provider):
            self.assertEqual(conversation.verify_grounding('Arjuna describes a restless mind.', [VERSE], []), [VERSE['script_ref']])
            provider.generate_json.return_value={'supported':False,'sourceIds':[]}
            with self.assertRaises(ValueError):
                conversation.verify_grounding('Krishna promises you a promotion.', [VERSE], [])


class RagTests(unittest.TestCase):
    def test_no_sources_and_history_reach_writer(self):
        req = RagRequest(query='No, he is kind.', history=[{'role':'user','content':'I hate my boss.'}])
        with patch.object(rag, 'plan_turn', return_value=PLAN), patch.object(rag, 'get_index') as index:
            _, payload, ids, _, sources, _ = rag._prepare(req)
        index.assert_not_called()
        self.assertFalse(ids)
        self.assertEqual(json.loads(payload)['conversation'][0]['content'], 'I hate my boss.')

    def test_client_cannot_rewrite_canonical_translation(self):
        fake = VerseResult(uid=VERSE['script_ref'], scripture='fake', scripture_slug='fake', verse_id='1', verse_sanskrit='fake', verse_hindi='', english_translation='INJECTED', essence='', simple_meaning='', insight='', modern_relevance='', speaker='', tags=[], score=1,intent='mind')
        with patch.object(rag, 'plan_turn', return_value={**PLAN,'retrievalQuery':'mind'}), patch.object(rag, 'get_index', return_value=SimpleNamespace(get_verse=lambda uid:VERSE)):
            _, payload, _, _, sources, _ = rag._prepare(RagRequest(query='mind', verses=[fake]))
        self.assertNotIn('INJECTED', payload)
        self.assertEqual(sources[0].english_translation, VERSE['english_translation'])

class ConversationQuery(Query):
    def insert(self, value): self.value=value;self.operation='insert';return self
    def execute(self):
        if self.operation == 'insert':
            values = self.value if isinstance(self.value,list) else [self.value]
            rows = [{'id':str(uuid4()),'created_at':'now',**v} for v in values]
            self.db.data.setdefault(self.table,[]).extend(rows)
            return SimpleNamespace(data=rows)
        return super().execute()
class ConversationDB(Database):
    def table(self,name): return ConversationQuery(self,name)

class DiscussionTests(unittest.TestCase):
    def setUp(self):
        self.user=AuthenticatedUser(str(uuid4()))
        self.ref={'id':str(uuid4()),'user_id':self.user.id,'status':'ready','transcript':'I need help at work.',
                  'mirror':'Work is difficult.', 'meaning':'', 'practice':'', 'verse_uid':None,'analysis':{},'local_date':date.today().isoformat()}
        self.thread={'id':str(uuid4()),'user_id':self.user.id,'reflection_id':self.ref['id'],'status':'completed','turn_count':3,'conversation_state':{'constraints':[{'text':'Needs wages','evidence':'I need the pay.'}]}}
        self.db=ConversationDB([self.ref]);self.db.data['reflection_threads']=[self.thread]
        self.db.data['reflection_messages']=[{'thread_id':self.thread['id'],'user_id':self.user.id,'role':'user','content':'I need the pay.','turn_index':3,'created_at':'a'}]
        self.provider=SimpleNamespace(generate_json=Mock(return_value={'response':'You can ask to change shifts while keeping your hours.','nextQuestion':'','complete':True,'sourceIds':[]}))
        self.stack=ExitStack();self.addCleanup(self.stack.close)
        self.planner=self.stack.enter_context(patch.object(reflections,'plan_turn',return_value=PLAN))
        self.stack.enter_context(patch.object(reflections,'verify_grounding',side_effect=lambda text, candidates, ids: [v['script_ref'] for v in conversation.selected_sources(ids,candidates)]))
        self.retrieval=self.stack.enter_context(patch.object(reflections,'retrieve_for_turn',return_value=[]))
        for name,value in {'get_supabase':self.db,'get_sarvam':self.provider,'_access':{'allowed':True,'isPro':True,'isPreview':False},'recent_feedback':[]}.items():
            self.stack.enter_context(patch.object(reflections,name,return_value=value))
        app=FastAPI();app.include_router(reflections.router,prefix='/api/v1');app.dependency_overrides[require_user]=lambda:self.user
        self.app=app;self.client=TestClient(app);self.url=f"/api/v1/app/reflections/{self.ref['id']}/discuss"

    def test_fourth_turn_and_continuation_after_suggested_pause(self):
        response=self.client.post(self.url,json={'transcript':"I can't take a day off."})
        self.assertEqual(response.status_code,200,response.text)
        self.assertEqual(response.json()['turnCount'],4)
        self.assertEqual(response.json()['nextQuestion'],'')
        self.assertIsNone(response.json()['maxTurns'])
        self.assertEqual(self.thread['status'],'active')
        self.assertIn('Needs wages',str(self.planner.call_args.args[2]))
        self.assertEqual(self.client.post(self.url,json={'transcript':'Can we keep going?'}).json()['turnCount'],5)
        saved=self.client.get(self.url.replace('/discuss','/discussion')).json()['replies']
        self.assertEqual([v['turnCount'] for v in saved],[4,5])

    def test_followup_sources_are_grounded_and_restored(self):
        self.retrieval.return_value=[VERSE]
        self.provider.generate_json.return_value={'response':'Arjuna also describes a restless mind.','sourceIds':[VERSE['script_ref']]}
        with patch.object(reflections,'get_index',return_value=SimpleNamespace(get_verse=lambda uid:VERSE)):
            response=self.client.post(self.url,json={'transcript':'What does the Gita say about this?'})
            self.assertEqual(response.status_code,200,response.text)
            self.assertEqual(response.json()['sources'][0]['chapter'],'6')
            self.assertEqual(self.client.get(self.url.replace('/discuss','/discussion')).json()['replies'][0]['sources'][0]['id'],VERSE['script_ref'])
        payload=json.loads(self.provider.generate_json.call_args.args[1])
        self.assertEqual(payload['candidates'][0]['translation'],VERSE['english_translation'])

    def test_invalid_source_does_not_save_any_turn(self):
        self.provider.generate_json.return_value={'response':'Wrong source','sourceIds':['invented']}
        response=self.client.post(self.url,json={'transcript':'Tell me more.'})
        self.assertEqual(response.status_code,502)
        self.assertEqual(self.thread['turn_count'],3)
        self.assertEqual(len(self.db.data['reflection_messages']),1)

    def test_duplicate_question_is_only_returned_once(self):
        self.provider.generate_json.return_value={'response':'You can be direct. What matters most?', 'nextQuestion':'What matters most?', 'sourceIds':[]}
        response=self.client.post(self.url,json={'transcript':'How can I raise this?'}).json()
        self.assertEqual(response['response'],'You can be direct.')
        self.assertEqual(response['nextQuestion'],'What matters most?')

    def test_grounding_repairs_once_before_persistence(self):
        self.provider.generate_json.side_effect=[{'response':'A made-up source', 'sourceIds':['invented']}, {'response':'You could ask for clear criteria.', 'sourceIds':[]}]
        response=self.client.post(self.url,json={'transcript':'What should I ask?'} )
        self.assertEqual(response.status_code,200,response.text)
        self.assertEqual(response.json()['response'],'You could ask for clear criteria.')
        self.assertEqual(self.provider.generate_json.call_count,2)

    def test_other_user_and_auth_cannot_read_or_write(self):
        self.ref['user_id']='other';self.thread['user_id']='other'
        self.assertEqual(self.client.post(self.url,json={'transcript':'Private?'}).status_code,404)
        self.assertEqual(self.client.get(self.url.replace('/discuss','/discussion')).json()['replies'],[])
        self.app.dependency_overrides.clear()
        self.assertEqual(self.client.get(self.url.replace('/discuss','/discussion')).status_code,401)

    def test_daily_reflection_can_have_no_verse_no_practice_no_question(self):
        self.provider.generate_json.side_effect=[{'mirror':'An evening worth keeping.','meaning':'','practice':'','selectedQuoteId':None,'discussionTeaser':''}]
        with patch.object(reflections,'_get_or_create_cycle',return_value={'id':'cycle'}), patch.object(reflections,'_remembered_patterns',return_value=[]), patch.object(reflections,'_refresh_cycle',return_value=(1,'active')), patch.object(reflections,'get_index') as index:
            response=self.client.post('/api/v1/app/reflections/process',json={'transcript':'Cooking with dad was lovely.','inputMode':'text','localDate':date.today().isoformat(),'timezone':'UTC','clientRequestId':'test-1234'})
        self.assertEqual(response.status_code,200,response.text)
        index.assert_not_called()
        self.assertIsNone(response.json()['reflection']['quote'])
        self.assertEqual(response.json()['reflection']['practice'],'')
        self.assertEqual(response.json()['reflection']['discussion_teaser'],'')

if __name__=='__main__':unittest.main()
