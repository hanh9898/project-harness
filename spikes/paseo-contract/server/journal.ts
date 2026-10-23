import { mkdir,readFile,writeFile,rename,open,unlink } from 'node:fs/promises';
import { dirname } from 'node:path';
import { createHash,randomUUID } from 'node:crypto';
export const digest=(text:string)=>createHash('sha256').update(text).digest('hex');
export async function readJson<T>(path:string):Promise<T|null>{try{return JSON.parse(await readFile(path,'utf8'));}catch(e){if((e as NodeJS.ErrnoException).code==='ENOENT')return null;throw e;}}
export async function atomicJson(path:string,value:unknown){await mkdir(dirname(path),{recursive:true});const temp=path+'.'+randomUUID()+'.tmp';const f=await open(temp,'wx',0o600);try{await f.writeFile(JSON.stringify(value,null,2)+'\n');await f.sync();}finally{await f.close();}await rename(temp,path);}
// Fail closed on an existing lock. Crash recovery is explicit; never delete a lock on an age guess.
export async function exclusive<T>(path:string,fn:()=>Promise<T>):Promise<T>{await mkdir(dirname(path),{recursive:true});const lock=await open(path+'.lock','wx',0o600);await lock.writeFile(JSON.stringify({pid:process.pid}));try{return await fn();}finally{await lock.close();await unlink(path+'.lock');}}
