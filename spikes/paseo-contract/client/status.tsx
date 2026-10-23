import { useState } from 'react';
import { Text,View,Pressable } from 'react-native';
import { useRpc,type PluginScreenProps } from '@getpaseo/plugin/client';
import { statusRpc } from '../shared/status';
export function StatusScreen({theme}:PluginScreenProps){
 const read=useRpc(statusRpc);const [report,setReport]=useState('Chưa đọc host. Native profile phải tạo trong Paseo trước.');
 return <View style={{padding:20,gap:16,backgroundColor:theme.colors.surface0}}><Text style={{color:theme.colors.foreground}}>Harness contract spike · read-only status</Text><Pressable accessibilityRole="button" onPress={()=>{read({}).then(r=>setReport(r.report)).catch(e=>setReport(String(e)));}} style={{padding:12,backgroundColor:theme.colors.accent}}><Text style={{color:theme.colors.accentForeground}}>Đọc native profiles / journal</Text></Pressable><Text selectable style={{color:theme.colors.foreground}}>{report}</Text></View>;
}
