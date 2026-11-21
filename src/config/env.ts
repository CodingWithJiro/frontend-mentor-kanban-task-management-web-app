import { envSchema } from '@/schemas/env.schema';

const env = envSchema.parse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
});
export const API_URL = env.NEXT_PUBLIC_API_URL;
