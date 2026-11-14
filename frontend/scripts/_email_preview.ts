import { dayEmail, welcomeEmail } from '../src/lib/server/email'
const d = (day:number, beat:string, line:string, extra:any={}) => ({ day, beat, phase:'', ref:null, sanskrit:null, line, meaning:null, forYou:null, story:null, ...extra })
const days:any = [
 d(1,'hook','You have the right to your work, never to its fruits.',{sanskrit:'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।',ref:'Bhagavad Gita 2.47',forYou:'The outcome you keep rehearsing at night is not yours to hold. Today, hold only the next step.'}),
 d(2,'diagnose','The restless mind is hard to hold, yet practice steadies it.'),
 d(3,'diagnose','What you dwell on, you become attached to.'),
 d(4,'steady','The one who is the same in praise and blame is at peace.'),
 d(5,'act','Do your own work, even imperfectly.'),
 d(6,'story','Arjuna lays down his bow',{story:{title:'Arjuna lays down his bow',summary:null,lesson:null}}),
 d(7,'steady','Lift yourself by your own self.'),
]
// npx tsx scripts/_email_preview.ts <out-dir>: the welcome email and two morning emails, as HTML files.
const token = '0'.repeat(48)
const fs = require('fs')
const out = process.argv[2] || '.'
fs.writeFileSync(`${out}/welcome.html`, welcomeEmail(days, 'Letting go of the outcome', 'Ankur Shukla', token).html)
fs.writeFileSync(`${out}/day2.html`, dayEmail(2, days, 'Letting go of the outcome', 'Ankur Shukla', token)!.html)
fs.writeFileSync(`${out}/day6.html`, dayEmail(6, days, 'Letting go of the outcome', 'Ankur Shukla', token)!.html)
