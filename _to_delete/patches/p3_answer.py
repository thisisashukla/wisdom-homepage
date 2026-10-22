import sys, os
os.chdir(sys.argv[1])
p='components/funnel/YourVerse.tsx'; s=open(p).read()
if 'const [answer, setAnswer]' not in s:
    s=s.replace("  const [stage, setStage] = useState<Stage>('intro')","  const [stage, setStage] = useState<Stage>('intro')\n  const [answer, setAnswer] = useState<string | null>(null)")
    s=s.replace("    trackEvent('Hook Situation Picked', props({ answer: a.id, situation: a.situation ?? null, feeling: a.feeling }))","    setAnswer(a.id === 'else' ? null : a.label)\n    trackEvent('Hook Situation Picked', props({ answer: a.id, situation: a.situation ?? null, feeling: a.feeling }))")
    s=s.replace("A 7-day plan for {situationById(situation)?.label.toLowerCase() ?? 'what is keeping you up'}","A 7-day plan for {(answer ?? situationById(situation)?.label ?? 'what is keeping you up').toLowerCase()}")
    open(p,'w').write(s)
print('answer patched', 'answer ??' in s)
