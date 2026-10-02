"""Opt-in live API/database smoke test. Creates and removes its own test accounts.

Run from backend: .venv/bin/python scripts/smoke_practice_loop.py --run-live
Requires the configured local backend to be listening on port 8000.
"""
import argparse
from datetime import date, timedelta
from pathlib import Path
import os
import sys
from uuid import uuid4

import httpx
from dotenv import load_dotenv
from supabase import create_client


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('--run-live', action='store_true')
    parser.add_argument('--env-file', default='.env')
    parser.add_argument('--base-url', default='http://127.0.0.1:8000')
    parser.add_argument('--generate', action='store_true', help='Also generate one real reflection using the configured model.')
    args = parser.parse_args()
    if not args.run_live: parser.error('--run-live is required')
    load_dotenv(Path(__file__).parents[1] / args.env_file)
    sb = create_client(os.environ['SUPABASE_URL'], os.environ['SUPABASE_SERVICE_ROLE_KEY'])
    accounts = []
    try:
        tokens = []
        for _ in range(2):
            email = f'wisdom-loop-test-{uuid4().hex}@example.com'
            password = uuid4().hex + 'Aa1!'
            user = sb.auth.admin.create_user({'email': email, 'password': password, 'email_confirm': True}).user
            accounts.append(user.id)
            isolated = create_client(os.environ['SUPABASE_URL'], os.environ['SUPABASE_SERVICE_ROLE_KEY'])
            tokens.append(isolated.auth.sign_in_with_password({'email': email, 'password': password}).session.access_token)
        yesterday = (date.today() - timedelta(days=1)).isoformat()
        cycle = sb.table('reflection_cycles').insert({'user_id': accounts[0], 'starts_on': yesterday, 'ends_on': (date.today() + timedelta(days=5)).isoformat(), 'timezone': 'UTC'}).execute().data[0]
        practice = 'Pause for one breath before replying.'
        reflection = sb.table('daily_reflections').insert({'user_id': accounts[0], 'cycle_id': cycle['id'], 'local_date': yesterday, 'client_request_id': f'smoke-{uuid4()}', 'input_mode': 'text', 'status': 'ready', 'practice': practice, 'theme': 'Patience', 'transcript': 'Synthetic integration test: a difficult work call.'}).execute().data[0]
        with httpx.Client(base_url=args.base_url, timeout=120) as api:
            auth = {'Authorization': f'Bearer {tokens[0]}'}
            other = {'Authorization': f'Bearer {tokens[1]}'}
            pending = api.get('/api/v1/app/practice-follow-up?timezone=UTC', headers=auth)
            assert pending.status_code == 200, f'Follow-up returned {pending.status_code}'
            assert pending.json()['pending']['id'] == reflection['id']
            endpoint = f"/api/v1/app/reflections/{reflection['id']}/practice-feedback"
            body = {'practice': practice, 'outcome': 'did_not_help', 'note': 'Breathing made me more distracted. Writing things down usually helps.', 'timezone': 'UTC'}
            saved = api.put(endpoint, headers=auth, json=body)
            assert saved.status_code == 200, f'Save returned {saved.status_code}'
            assert api.get('/api/v1/app/practice-follow-up?timezone=UTC', headers=auth).json()['pending'] is None
            assert api.put(endpoint, headers=other, json=body).status_code == 404
            assert api.get('/api/v1/app/practice-follow-up?timezone=UTC', headers=other).json()['recentFeedback'] == []
            history = api.get('/api/v1/app/reflections/history', headers=auth)
            assert history.status_code == 200
            assert history.json()['reflections'][0]['practice_feedback']['outcome'] == 'did_not_help'
            changed = api.put(endpoint, headers=auth, json={**body, 'outcome': 'not_tried', 'note': 'Correcting my answer: I did not try it.'})
            assert changed.status_code == 200
            assert changed.json()['feedback']['id'] == saved.json()['feedback']['id']
            # Restore the original outcome before optional live generation.
            assert api.put(endpoint, headers=auth, json=body).status_code == 200
            if args.generate:
                result = api.post('/api/v1/app/reflections/process', headers=auth, json={'transcript': 'I got defensive during a work call again today. I want to respond more thoughtfully next time.', 'localDate': date.today().isoformat(), 'timezone': 'UTC', 'inputMode': 'text', 'clientRequestId': f'smoke-generation-{uuid4()}'})
                assert result.status_code == 200, f'Generation returned {result.status_code}'
                current = result.json()['reflection']
                assert current['practice'].strip() and current['quote']['id']
                print('Live generated practice:', current['practice'])
                print('Live explanation:', current['meaning'])
        print('PASS: live save, reload, edit, history, ownership and pending selection.')
    finally:
        for user_id in accounts:
            sb.auth.admin.delete_user(user_id)
        print('Removed all synthetic test accounts and their cascading test records.')

if __name__ == '__main__': main()
