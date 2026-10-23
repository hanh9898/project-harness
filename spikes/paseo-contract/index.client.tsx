import type { PluginClientContext } from '@getpaseo/plugin/client';
import { StatusScreen } from './client/status';
export default function contribute(client:PluginClientContext){client.addScreen({id:'contract',title:'Harness contract spike',Component:StatusScreen});client.addCommandCenterItem({id:'contract',title:'Harness contract spike',icon:'FlaskConical',context:'global',onSelect:({openScreen})=>openScreen({screenId:'contract'})});return ()=>{};}
