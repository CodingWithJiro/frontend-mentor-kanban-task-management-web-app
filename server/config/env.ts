import { envSchema } from "../schemas/env.schema.ts";

const env = envSchema.parse(process.env);

export const PORT = env.PORT;
export const JWT_SECRET = new TextEncoder().encode(env.JWT_SECRET);
export const ACCESS_TOKEN_EXPIRES_IN = env.ACCESS_TOKEN_EXPIRES_IN;
export const REFRESH_TOKEN_EXPIRES_IN = env.REFRESH_TOKEN_EXPIRES_IN;
export const BCRYPT_SALT_ROUNDS = env.BCRYPT_SALT_ROUNDS;
