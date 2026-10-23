import type { PaseoApi } from '@getpaseo/client';
import { readFile,realpath } from 'node:fs/promises';
import { z } from 'zod';
import { dirname } from 'node:path';
import { atomicJson,digest,exclusive,readJson } from './journal';
import { resolveProfile } from './profile';
export const Result=z.object({skillName:z.string().min(1),sourcePath:z.string().min(1),quote:z.string().min(15),application:z.string().min(30)}).strict();
export type Work={version:1,requestId:string,inputDigest:string,status:'prepared'|'created'|'completed'|'invalid'|'unresolved',createdAt:string,profile:ReturnType<typeof resolveProfile>,skill:{path:string,digest:string},agentId?:string,workspaceId?:string|null,output?:z.infer<typeof Result>,reason?:string};
export function parseResult(raw:string){let text=raw.trim();if(text.startsWith('---\n'))text=text.slice(4).trim();const fence=text.match(/^```(?:json)?\s*\n([\s\S]*?)\n```$/);if(fence)text=fence[1];return Result.parse(JSON.parse(text));}
export async function validateResult(raw:string,work:Work){const result=parseResult(raw);const source=await readFile(work.skill.path,'utf8');if(digest(source)!==work.skill.digest)throw Error('SKILL_SOURCE_CHANGED');if(result.sourcePath!==work.skill.path||!source.includes(result.quote))throw Error('SKILL_EVIDENCE_MISMATCH');return result;}
export async function run(api:PaseoApi,path:string,input:{requestId:string,profileId:string,skill:string,cwd:string}){
 return exclusive(path,async()=>{
  const skill=await realpath(input.skill),cwd=await realpath(input.cwd),inputDigest=digest(JSON.stringify({...input,skill,cwd}));
  const prior=await readJson<Work>(path);if(prior){if(prior.requestId!==input.requestId||prior.inputDigest!==inputDigest)throw Error('REQUEST_CONFLICT: dùng journal mới cho work khác.');return prior;}
  const {config}=await api.config.get();const profile=resolveProfile(config,input.profileId),source=await readFile(skill,'utf8');
  if(profile.profile.provider==='codex')profile.execution.options={sandbox_mode:'read-only',approval_policy:'never',web_search:'disabled'};
  else if(profile.profile.provider==='claude')profile.execution.options={additionalDirectories:[dirname(skill)],allowedTools:['Read','Grep','Glob'],disallowedTools:['Bash','Write','Edit','NotebookEdit','WebFetch','WebSearch','Task','Agent']};
  else throw Error('UNSUPPORTED_PROVIDER: read-only role adapter only covers claude/codex in this spike.');
  const work:Work={version:1,requestId:input.requestId,inputDigest,status:'prepared',createdAt:new Date().toISOString(),profile,skill:{path:skill,digest:digest(source)}};
  await atomicJson(path,work); // intent before creation; an ambiguous create is never retried automatically
  const prompt='Read the actual skill file at '+skill+'. Apply its guidance to this tiny design: a workflow facade hides persistence ordering, retries and reconciliation from UI callers. Do not modify files, create agents, or use network. Return JSON with skillName, sourcePath (the exact absolute path), quote (15-150 characters copied EXACTLY from the skill body, preserving Markdown asterisks and punctuation), and application (a concrete assessment applying the skill to this design). Your final answer must be only one JSON object, without a heading, separator or code fence.';
  try{
   const agent=await api.agents.create({config:{...profile.execution,systemPrompt:'Bounded read-only harness contract experiment. Use only the supplied skill as instructions for this assessment.'},cwd,title:'Harness contract spike',labels:{harness_spike:input.requestId},idempotencyKey:'harness-spike-'+digest(input.requestId),outputSchema:{type:'object',additionalProperties:false,required:['skillName','sourcePath','quote','application'],properties:{skillName:{type:'string'},sourcePath:{type:'string'},quote:{type:'string'},application:{type:'string'}}},prompt});
   work.agentId=agent.id;work.workspaceId=agent.workspaceId;work.status='created';await atomicJson(path,work);return work;
  }catch(e){work.status='unresolved';work.reason=String(e);await atomicJson(path,work);throw e;}
 });
}
export async function reconcile(api:PaseoApi,path:string){
 return exclusive(path,async()=>{
  const work=await readJson<Work>(path);if(!work)return {status:'empty'};
  // Unknown create outcome must be investigated by correlation/creation identity; this spike never respawns.
  if(!work.agentId)return {...work,reason:'Creation unresolved; inspect by correlation. No automatic retry.'};
  const agent=api.agents.ref(work.agentId);await agent.refresh();
  if(work.status==='completed')return {...work,observedStatus:agent.status};
  if(agent.status!=='idle')return {...work,observedStatus:agent.status};
  const result=await agent.waitForFinish(1000);
  if(result.status==='idle'&&result.lastMessage){try{work.output=await validateResult(result.lastMessage,work);work.status='completed';delete work.reason;}catch(e){work.status='invalid';work.reason=String(e);}await atomicJson(path,work);}
  return {...work,observedStatus:agent.status};
 });
}
