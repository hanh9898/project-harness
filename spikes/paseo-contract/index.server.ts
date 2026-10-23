import type { PluginServerContext } from '@getpaseo/plugin/server';
import { createPaseoClient } from '@getpaseo/client';
import { join } from 'node:path';
import { atomicJson,readJson } from './server/journal';
import { reconcile } from './server/runtime';
import { spikeRoot } from './server/paths';
import { statusRpc } from './shared/status';
export default function contribute(server:PluginServerContext){
 const statePath=join(spikeRoot,'.spike/work.json'),loadsPath=join(spikeRoot,'.spike/plugin-loads.json');
 const client=createPaseoClient({url:'ws://127.0.0.1:6767/ws'});
 const boot=(async()=>{await client.connect();const loads=await readJson<unknown[]>(loadsPath)??[];loads.push({at:new Date().toISOString(),pid:process.pid});await atomicJson(loadsPath,loads);console.log('SPIKE_LOAD',loads.length);console.log('SPIKE_RECONCILE',JSON.stringify(await reconcile(client,statePath)));})().catch(e=>console.error('SPIKE_BOOT_FAILED',String(e)));
 server.handle(statusRpc,async(_,context)=>{const {config}=await context.paseo.config.get();return {report:JSON.stringify({profiles:config.agentProfiles??[],work:await readJson(statePath),loads:await readJson(loadsPath)},null,2)};});
 return async()=>{await boot;await client.close();};
}
