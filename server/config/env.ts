import { envSchema } from "../schemas/env.schema.ts";

const env = envSchema.parse(process.env);

export const PORT = env.PORT;
export const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);
export const REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN;
