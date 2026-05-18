const ts = require('typescript')
const fs = require('fs')
const path = require('path')
const root = '/sessions/hopeful-zen-goldberg/mnt/wisdom-homepage'
const files = [6,7,8,9,10,11,12,13,14,15,16,17,18].map(n => 
  path.join(root, 'src/app/blogs/bhagwat-geeta-chapter-'+n+'/page.tsx'))
let ok=0, errors=[]
for (const f of files) {
  const code = fs.readFileSync(f, 'utf8')
  const result = ts.transpileModule(code, {
    compilerOptions: { 
      target: ts.ScriptTarget.ES2020, 
      module: ts.ModuleKind.ESNext, 
      jsx: ts.JsxEmit.ReactJSX,
      esModuleInterop: true,
      strict: false,
    },
    reportDiagnostics: true,
  })
  const diag = result.diagnostics || []
  if (diag.length === 0) ok++
  else {
    errors.push(`${path.basename(path.dirname(f))}: ${diag.length} diagnostics`)
    diag.slice(0,3).forEach(d => {
      const msg = ts.flattenDiagnosticMessageText(d.messageText, '\n')
      const pos = d.start != null ? ts.getLineAndCharacterOfPosition(d.file || ts.createSourceFile('x', code, ts.ScriptTarget.ES2020, false, ts.ScriptKind.TSX), d.start) : null
      errors.push(`  line ${pos ? pos.line+1 : '?'}: ${msg}`)
    })
  }
}
console.log(`ok=${ok}/${files.length}`)
errors.forEach(e => console.log(e))
