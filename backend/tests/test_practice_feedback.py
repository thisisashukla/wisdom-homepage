"""Exercise HTTP validation, ownership, persistence and prompt wiring without providers."""
from datetime import date, timedelta
import asyncio
from contextlib import ExitStack
import importlib
import json
from types import SimpleNamespace
import unittest
from unittest.mock import patch
from uuid import uuid4

from fastapi import FastAPI
from fastapi.testclient import TestClient
from common.auth import AuthenticatedUser, require_user
from server import practice_feedback as module


class Query:
    def __init__(self, db, table):
        self.db, self.table = db, table
        self.filters, self.orders, self.take, self.value = [], [], None, None
        self.operation = 'read'
    def select(self, *args, **kwargs): return self
    def eq(self, key, value): self.filters.append(lambda r: str(r.get(key)) == str(value)); return self
    def lt(self, key, value): self.filters.append(lambda r: str(r.get(key)) < value); return self
    def gte(self, key, value): self.filters.append(lambda r: str(r.get(key)) >= value); return self
    def order(self, key, desc=False): self.orders.append((key, desc)); return self
    def limit(self, value): self.take = value; return self
    def upsert(self, value, **kwargs): self.value = value; return self
    def update(self, value): self.value = value; self.operation = 'update'; return self
    def execute(self):
        rows = self.db.data.setdefault(self.table, [])
        selected = [r for r in rows if all(f(r) for f in self.filters)]
        if self.value is not None:
            if self.operation == 'update':
                for row in selected: row.update(self.value)
                return SimpleNamespace(data=selected)
            match = next((r for r in rows if (r.get('reflection_id'), r.get('practice_key')) == (self.value.get('reflection_id'), self.value.get('practice_key'))), None)
            if match: match.update(self.value)
            else:
                match = {'id': str(uuid4()), **self.value}; rows.append(match)
            return SimpleNamespace(data=[match])
        for key, desc in reversed(self.orders): selected.sort(key=lambda r: r.get(key, ''), reverse=desc)
        return SimpleNamespace(data=selected[:self.take])

class Database:
    def __init__(self, reflections): self.data = {'daily_reflections': reflections}
    def table(self, name): return Query(self, name)

class PracticeFeedbackTests(unittest.TestCase):
    def setUp(self):
        self.user = AuthenticatedUser(str(uuid4()))
        self.yesterday = (date.today() - timedelta(days=1)).isoformat()
        self.reflection = {'id': str(uuid4()), 'user_id': self.user.id, 'local_date': self.yesterday, 'status': 'ready', 'theme': 'Patience', 'practice': 'Pause for one breath before replying.'}
        self.db = Database([self.reflection])
        self.patch = patch.object(module, 'get_supabase', return_value=self.db); self.patch.start(); self.addCleanup(self.patch.stop)
        app = FastAPI(); app.include_router(module.router, prefix='/api/v1/app')
        app.dependency_overrides[require_user] = lambda: self.user
        self.app, self.client = app, TestClient(app)
        self.url = f"/api/v1/app/reflections/{self.reflection['id']}/practice-feedback"
    def save(self, outcome='helped', **overrides):
        return self.client.put(self.url, json={'practice': self.reflection['practice'], 'outcome': outcome, 'note': '  During a difficult call.  ', **overrides})
    def pending(self): return self.client.get('/api/v1/app/practice-follow-up?timezone=UTC')

    def test_save_reload_edit_and_no_duplicate(self):
        self.assertEqual(self.pending().json()['pending']['id'], self.reflection['id'])
        saved = self.save(); self.assertEqual(saved.status_code, 200)
        self.assertEqual(saved.json()['feedback']['note'], 'During a difficult call.')
        self.assertIsNone(self.pending().json()['pending'])
        updated = self.save('did_not_help', note='Actually it did not help.')
        self.assertEqual(updated.json()['feedback']['id'], saved.json()['feedback']['id'])
        self.assertEqual(len(self.db.data['reflection_practice_feedback']), 1)
        self.assertEqual(self.pending().json()['recentFeedback'][0]['outcome'], 'did_not_help')

    def test_all_outcomes_and_optional_note(self):
        for outcome in ('helped', 'did_not_help', 'not_tried'):
            with self.subTest(outcome=outcome): self.assertEqual(self.save(outcome, note='').status_code, 200)

    def test_other_users_cannot_read_or_write(self):
        self.reflection['user_id'] = str(uuid4())
        self.assertIsNone(self.pending().json()['pending'])
        self.assertEqual(self.save().status_code, 404)
        self.db.data['reflection_practice_feedback'] = [{'user_id': self.reflection['user_id'], 'reflection_date': self.yesterday, 'updated_at': '', 'note': 'private'}]
        self.assertEqual(self.pending().json()['recentFeedback'], [])

    def test_auth_is_required(self):
        self.app.dependency_overrides.clear()
        self.assertEqual(self.pending().status_code, 401)
        self.assertEqual(self.save().status_code, 401)

    def test_cannot_rate_today_future_or_failed_practice(self):
        for day in (date.today(), date.today() + timedelta(days=1)):
            self.reflection['local_date'] = day.isoformat()
            self.assertEqual(self.save().status_code, 409)
            self.assertIsNone(self.pending().json()['pending'])
        self.reflection['local_date'] = self.yesterday; self.reflection['status'] = 'failed'
        self.assertEqual(self.save().status_code, 409)

    def test_stale_practice_rejected_and_old_snapshot_preserved(self):
        old_practice = self.reflection['practice']; self.save()
        self.reflection['practice'] = 'Take a short walk.'
        self.assertEqual(self.save(practice=old_practice).status_code, 409)
        self.assertEqual(self.pending().json()['pending']['practice'], 'Take a short walk.')
        self.save('not_tried')
        self.assertEqual(len(self.db.data['reflection_practice_feedback']), 2)
        attached = module.attach_feedback([self.reflection], module.recent_feedback(self.user.id))
        self.assertEqual(attached[0]['practice_feedback']['outcome'], 'not_tried')

    def test_validation_and_timezone(self):
        for changes in ({'outcome': 'excellent'}, {'note': 'x' * 501}, {'practice': ''}, {'practice': 'x' * 401}):
            self.assertEqual(self.save(**changes).status_code, 422)
        self.assertEqual(self.save(timezone='not/a/zone').status_code, 400)
        self.assertEqual(self.client.get('/api/v1/app/practice-follow-up?timezone=not/a/zone').status_code, 400)

    def test_only_recent_unanswered_practices_are_offered(self):
        self.reflection['local_date'] = (date.today() - timedelta(days=15)).isoformat()
        self.assertIsNone(self.pending().json()['pending'])
        self.reflection['local_date'] = self.yesterday; self.reflection['practice'] = '  '
        self.assertIsNone(self.pending().json()['pending'])

    def test_answering_latest_does_not_surface_a_backlog(self):
        self.db.data['daily_reflections'].append({**self.reflection, 'id': str(uuid4()), 'local_date': (date.today() - timedelta(days=2)).isoformat()})
        self.save()
        self.assertIsNone(self.pending().json()['pending'])

    def test_next_reflection_passes_saved_outcome_into_generation(self):
        from server import reflections
        self.save('did_not_help', note='Breathing made me more distracted.')
        verse = {'script_ref': 'gita::2_47', 'scripture': 'bhagwad_gita', 'orig_ref': '2.47', 'simple_meaning': 'Act with care.'}
        provider = SimpleNamespace(generate_json=unittest.mock.Mock(side_effect=[
            {'selectedQuoteId': verse['script_ref'], 'mirror': 'A difficult call.', 'meaning': 'Try a different approach.', 'practice': 'Write one thing you can do next.', 'discussionTeaser': 'What matters?'}
        ]))
        index = SimpleNamespace(search=lambda *args, **kw: [{'verse': verse}], get_verse=lambda key: verse)
        with ExitStack() as stack:
            for target, value in {
                'get_supabase': self.db, 'get_sarvam': provider, 'get_index': index,
                'plan_turn': {'state': {}, 'retrievalQuery': 'Careful action', 'safetyRoute': 'standard'},
                'retrieve_for_turn': [verse],
                'verify_grounding': [verse['script_ref']],
                'get_embedder': SimpleNamespace(embed=lambda text: [0.0]),
                '_get_or_create_cycle': {'id': str(uuid4())},
                '_access': {'allowed': False, 'isPro': False, 'isPreview': False},
                '_remembered_patterns': [], '_ensure_verse_reference': None, '_refresh_cycle': (1, 'active'),
            }.items(): stack.enter_context(patch.object(reflections, target, return_value=value))
            result = asyncio.run(reflections.process_reflection(reflections.ProcessRequest(
                transcript='A difficult call at work again.', localDate=date.today(), timezone='UTC', inputMode='text', clientRequestId='test-next-day'), self.user))
        self.assertEqual(result['reflection']['practice'], 'Write one thing you can do next.')
        prompt, payload = provider.generate_json.call_args_list[0].args
        self.assertIn('change the approach instead of', prompt)
        evidence = json.loads(payload)['practiceFeedback'][0]
        self.assertEqual(evidence['outcome'], 'did_not_help')
        self.assertEqual(evidence['note'], 'Breathing made me more distracted.')
        self.assertEqual(evidence['practice'], 'Pause for one breath before replying.')

    def test_feedback_context_preserves_user_evidence_without_identifiers(self):
        self.save('not_tried')
        context = module.feedback_context(module.recent_feedback(self.user.id))
        self.assertEqual(set(context[0]), {'reflection_date', 'practice', 'outcome', 'note'})
        self.assertEqual(context[0]['outcome'], 'not_tried')

if __name__ == '__main__': unittest.main()
