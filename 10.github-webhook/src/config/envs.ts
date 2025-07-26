import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  WEB_HOOK_TOKEN: get('WEB_HOOK_TOKEN').required().asString(),
  PORT: get('PORT').required().asPortNumber(),
}