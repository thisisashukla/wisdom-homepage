#!/usr/bin/env python3
"""Prints the line-by-line review table for lp/funnels/ramayana/REVIEW.md (showcase lines first)."""
import json
import os

FE = os.path.abspath(os.path.join(os.path.dirname(__file__), '..', '..', '..'))
C = os.path.join(FE, 'src', 'content', 'funnels', 'ramayana')
lines = json.load(open(os.path.join(C, 'lines.json'), encoding='utf-8'))
scenes = json.load(open(os.path.join(C, 'scenes.json'), encoding='utf-8'))
diwali = json.load(open(os.path.join(C, 'diwali.json'), encoding='utf-8'))
plan = json.load(open(os.path.join(C, 'plan.json'), encoding='utf-8'))
cards = json.load(open(os.path.join(C, 'cards.json'), encoding='utf-8'))

order, where = [], {}
def add(k, label):
    if k not in where:
        order.append(k)
        where[k] = []
    where[k].append(label)

for s in scenes:
    for lamp in ('valmiki', 'tulsidas'):
        for k in s['lamps'][lamp].get('lines', []):
            add(k, f"scene {s['slug']} ({lamp})")
for sec in diwali['sections']:
    for k in sec['lines']:
        add(k, f"diwali {sec['id']}")
for d in plan:
    if d['verse']['text'] != 'bg':
        add(d['verse']['key'], f"plan day {d['day']}")
for c in cards:
    add(c['lineKey'], f"card {c['id']}")

def esc(t):
    return t.replace('|', '\\|').replace('\n', ' ')

print('| # | Line id (corpus) | Shown original | Reference shown | Wisdom English | Wisdom Hindi | Used on | Check |')
print('|---|---|---|---|---|---|---|---|')
for i, k in enumerate(order, 1):
    L = lines[k]
    check = []
    if not L['refVerified']:
        check.append(f"GP doha number not shown; computed guess {L.get('gpGuess')} (Bal: likely +1)")
    for f in L.get('fixes', []):
        check.append(f"corpus text fixed: {f['from']} to {f['to']}")
    print(f"| {i} | {L['corpusId']} | {esc(L['sa'])} | {esc(L['ref']['en'])} | {esc(L['meaning']['en'])} | {esc(L['meaning']['hi'])} | {'; '.join(where[k])} | {'; '.join(check) or 'speaker, wording'} |")
