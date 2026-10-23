import { defineRpc } from '@getpaseo/plugin';
import { z } from 'zod';
export const statusRpc=defineRpc({name:'contract.status',input:z.object({}),output:z.object({report:z.string()})});
