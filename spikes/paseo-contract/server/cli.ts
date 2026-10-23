import { createPaseoClient } from '@getpaseo/client';
import { parseArgs } from 'node:util';
import { dirname,resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { run,reconcile } from './runtime';
import { atomicJson } from './journal';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const {values,positionals}=parseArgs({allowPositionals:true,options:{url:{type:'string',default:'ws://127.0.0.1:6767/ws'},profile:{type:'string'},skill:{type:'string'},cwd:{type:'string'},request:{type:'string',default:'native-skill-r1'}}});
const client=createPaseoClient({url:values.url});
try{await client.connect();
 const path=resolve(root,'.spike/work.json');
 if(positionals[0]==='probe'){
  const {config}=await client.config.get();
  const c=config as typeof config&{agentProfiles?:Array<{id:string,name:string,provider:string,model?:string,notes?:string}>};
  const report={at:new Date().toISOString(),endpoint:values.url,profiles:c.agentProfiles??[],pluginsEnabled:(config as Record<string,unknown>).pluginsEnabled??false};
  await atomicJson(resolve(root,'.spike/probe.json'),report);console.log(JSON.stringify(report,null,2));
 }else if(positionals[0]==='run'){
  if(!values.profile||!values.skill||!values.cwd)throw Error('run requires --profile <native-id> --skill <absolute-SKILL.md> --cwd <directory>');
  console.log(JSON.stringify(await run(client,path,{requestId:values.request!,profileId:values.profile,skill:values.skill,cwd:values.cwd}),null,2));
 }else if(positionals[0]==='reconcile')console.log(JSON.stringify(await reconcile(client,path),null,2));
 else throw Error('Use probe | run | reconcile');
}finally{await client.close();}
