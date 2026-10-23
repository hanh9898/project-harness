import type { PaseoAgentConfig } from '@getpaseo/client';
import { z } from 'zod';
export const Profile = z.object({id:z.string(), name:z.string(), provider:z.string(), model:z.string().optional(), modeId:z.string().optional(), thinkingOptionId:z.string().optional(), featureValues:z.record(z.string(),z.unknown()).optional(), notes:z.string().optional()});
export function resolveProfile(config:unknown,id:string):{profile:z.infer<typeof Profile>,execution:PaseoAgentConfig}{
  const c=z.object({agentProfiles:z.array(Profile).default([])}).parse(config);
  const p=c.agentProfiles.find(p=>p.id===id);if(!p)throw Error('NATIVE_PROFILE_MISSING: tạo/chọn native profile trong Paseo trước.');
  if(!p.model?.trim())throw Error('PROFILE_MODEL_REQUIRED: spike không tự chọn model ngoài native profile.');
  return {profile:p,execution:{provider:p.provider+'/'+p.model,...(p.modeId?{modeId:p.modeId}:{}),...(p.thinkingOptionId?{thinkingOptionId:p.thinkingOptionId}:{}),...(p.featureValues?{featureValues:p.featureValues}:{})}};
}
