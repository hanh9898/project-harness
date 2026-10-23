// Keep prototype.html self-contained; source model remains independently testable.
const fs=require('node:fs');
const path=require('node:path');
const target=path.join(__dirname,'prototype.html');
const source=fs.readFileSync(path.join(__dirname,'prototype-model.js'),'utf8');
const html=fs.readFileSync(target,'utf8');
const start='// BEGIN PROTOTYPE MODEL\n',end='// END PROTOTYPE MODEL';
const a=html.indexOf(start),b=html.indexOf(end,a);
if(a<0||b<0)throw new Error('Missing embedded model markers');
const updated=html.slice(0,a)+start+source+html.slice(b);
if(process.argv.includes('--check')){
 if(updated!==html)throw new Error('Embedded prototype model differs from source; run node docs/design/build-prototype-model.cjs');
 console.log('Embedded prototype model matches source');
}else fs.writeFileSync(target,updated);
