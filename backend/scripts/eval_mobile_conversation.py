"""Exercise real mobile prompts/planner/retrieval with synthetic, in-memory storage.
No live user, Supabase rows, or audio calls are involved.
"""
import asyncio
import json
import sys
from contextlib import ExitStack
from datetime import date
from pathlib import Path
from unittest.mock import patch
from uuid import uuid4
sys.path[:0]=[str(Path(__file__).resolve().parents[1]),str(Path(__file__).resolve().parents[1]/'tests')]
from test_conversation_harness import ConversationDB
from ai.sarvam import init_sarvam
from ai.index import init_index
from ai.embedder import init_embedder
from common.config import settings
from common.auth import AuthenticatedUser
from server import reflections

async def main():
    if '--run-live' not in sys.argv: raise SystemExit('Pass --run-live to call the configured provider with synthetic fixtures.')
    output=Path(sys.argv[sys.argv.index('--output')+1])
    provider=init_sarvam(settings.sarvam_api_key,settings.sarvam_model)
    original_generate=provider.generate_json
    def traced_generate(prompt,payload,**kwargs):
        result=original_generate(prompt,payload,**kwargs)
        with Path(str(output)+'.trace.jsonl').open('a') as trace:
            trace.write(json.dumps({'promptKind':prompt[:100],'result':result},ensure_ascii=False)+'\n')
        return result
    provider.generate_json=traced_generate
    init_index(settings.data_dir);init_embedder(settings.model_dir,settings.embed_model)
    user=AuthenticatedUser(str(uuid4()));db=ConversationDB([])
    with ExitStack() as stack:
        for name,value in {'get_supabase':db,'_get_or_create_cycle':{'id':'cycle'},'_access':{'allowed':True,'isPro':True,'isPreview':False},'_remembered_patterns':[],'recent_feedback':[],'_ensure_verse_reference':None,'_refresh_cycle':(1,'active')}.items():
            stack.enter_context(patch.object(reflections,name,return_value=value))
        first=await reflections.process_reflection(reflections.ProcessRequest(transcript='I worked hard on a project and my colleague got the credit. I need this job, but I am furious.',localDate=date.today(),timezone='UTC',inputMode='text',clientRequestId='synthetic-eval'),user)
        ref=first['reflection']['id'];db.data['reflection_threads']=[{'id':str(uuid4()),'user_id':user.id,'reflection_id':ref,'status':'active','turn_count':0,'conversation_state':{}}]
        report={'model':settings.sarvam_model,'initial':first['reflection'],'dialogue':[]}
        output.write_text(json.dumps(report,ensure_ascii=False,indent=2));print('Mobile initial reflection validated',flush=True)
        for text in ['I do not want a breathing exercise. Help me say something to my manager.',
                     'Actually, my colleague did not take credit. My manager just forgot to mention me.',
                     'Can a Gita story help me think about my anger without telling me to stop caring?',
                     'How would I apply that while still asking for credit?',
                     'That is enough for tonight, thank you.']:
            reply=await reflections.discuss_reflection(ref,reflections.DiscussRequest(transcript=text),user)
            report['dialogue'].append(reply);output.write_text(json.dumps(report,ensure_ascii=False,indent=2))
            print(f"Mobile discussion turn {reply['turnCount']} validated",flush=True)

if __name__=='__main__':asyncio.run(main())
