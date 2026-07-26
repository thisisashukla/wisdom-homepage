import { transformFileSync } from '@swc/core'
const root = process.argv[2]
const files = [6,7,8,9,10,11,12,13,14,15,16,17,18].map(n=>`${root}/src/app/blogs/bhagwat-geeta-chapter-${n}/page.tsx`)
let ok=0, fail=[]
for(const f of files){
  try{
    transformFileSync(f,{jsc:{parser:{syntax:'typescript',tsx:true},target:'es2020'},module:{type:'es6'}})
    ok++
  }catch(e){
    fail.push(`${f}: ${(e.message||'').split('\n').slice(0,3).join(' | ')}`)
  }
}
console.log(`ok=${ok} fail=${fail.length}`)
fail.forEach(x=>console.log(x))
process.exit(fail.length?1:0)
