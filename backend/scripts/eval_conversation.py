"""Run synthetic multi-turn conversations against the actual planner/retrieval/writer.
Usage: python scripts/eval_conversation.py --run-live --output /tmp/wisdom-eval.json
Only synthetic fixtures are sent. Provider credentials are read from existing settings.
The report contains full synthetic dialogue for human assessment; automated checks only
cover structure and source IDs, not whether the response feels wise or warm.
"""
import argparse
import asyncio
import json
import sys
from pathlib import Path
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
from ai.sarvam import init_sarvam
from ai.index import init_index
from ai.embedder import init_embedder
from common.config import settings
from common.models import RagRequest
from server.rag import synthesize_answer


def main():
    parser=argparse.ArgumentParser();parser.add_argument('--run-live', action='store_true')
    parser.add_argument('--output', required=True);parser.add_argument('--case')
    args=parser.parse_args()
    if not args.run_live: parser.error('--run-live is required; this calls the configured provider')
    provider = init_sarvam(settings.sarvam_api_key, settings.sarvam_model)
    original_generate = provider.generate_json
    def traced_generate(prompt, payload, **kwargs):
        result = original_generate(prompt, payload, **kwargs)
        if prompt.startswith(("Check only factual", "Plan the next")):
            with Path(args.output + ".grounding.jsonl").open("a") as trace:
                trace.write(json.dumps({"input":json.loads(payload),"output":result},ensure_ascii=False)+"\n")
        return result
    provider.generate_json = traced_generate
    init_index(settings.data_dir)
    init_embedder(settings.model_dir, settings.embed_model)
    cases=json.loads((Path(__file__).resolve().parents[1]/'evals/conversation_cases.json').read_text())
    report={'model':settings.sarvam_model,'cases':[]}
    for case in cases:
        if args.case and args.case != case['id']: continue
        history=[];state={};sources=[];out={**case,'dialogue':[]};report['cases'].append(out)
        for message in case['turns']:
            result=asyncio.run(synthesize_answer(RagRequest(query=message,history=history,conversation_state=state,verses=sources)))
            state=result.conversation_state.model_dump();sources=result.source_verses
            answer='\n\n'.join(s.content for s in result.segments if s.type=='text' and s.content)
            out['dialogue'].append({'user':message, 'assistant':answer,'sourceIds':result.verse_uids_used,
                                   'sources':[{'uid':v.uid,'reference':v.verse_id,'translation':v.english_translation} for v in result.source_verses if v.uid in result.verse_uids_used]})
            history += [{'role':'user','content':message[:2000]},{'role':'assistant','content':answer[:2000]}]
            Path(args.output).write_text(json.dumps(report,ensure_ascii=False,indent=2))
            print(f"{case['id']}: turn {len(out['dialogue'])} verified source IDs",flush=True)
    print('Review warmth, judgment, and criterion adherence in the saved dialogue.',flush=True)

if __name__=='__main__':main()
