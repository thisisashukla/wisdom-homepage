"""Print a K. M. Ganguli section (public domain, Project Gutenberg 15474 to 15477) as a crib. Usage: ganguli.py BOOK ROMAN [maxlines]"""
import os, re, sys
SRC = os.path.expanduser('~/mbh_src')
FILES = {1: '15474', 2: '15474', 3: '15474', 4: '15475', 5: '15475', 6: '15475', 7: '15475', 8: '15476', 9: '15476', 10: '15476', 11: '15476', 12: '15476', 13: '15477', 14: '15477'}
book, sec = int(sys.argv[1]), sys.argv[2]
mx = int(sys.argv[3]) if len(sys.argv) > 3 else 400
lines = open(os.path.join(SRC, FILES[book] + '.txt'), encoding='utf8').read().split('\n')
start = None
for i, l in enumerate(lines):
    if l.strip() == f'BOOK {book}':
        start = i
        break
out, on = [], False
for l in lines[start:]:
    if re.match(r'^BOOK \d+$', l.strip()) and l.strip() != f'BOOK {book}':
        break
    if l.strip().startswith('SECTION '):
        if on:
            break
        on = l.strip() == f'SECTION {sec}'
    if on:
        out.append(l)
print('\n'.join(out[:mx]))
