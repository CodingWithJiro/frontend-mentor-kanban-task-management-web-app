import { z } from "zod";

export const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3001),
  JWT_SECRET: z
    .string()
    .regex(
      /^[0-9a-f]{64}$/i,
      "JWT_SECRET must be 32 random bytes encoded as hex",
    ),
  ACCESS_TOKEN_EXPIRES_IN: z
    .string()
    .regex(
      /^\d+\s*(s|m|h)$/i,
      "Invalid access token expiration format. Use seconds (s), minutes (m), or hours (h).",
    )
    .default("1h"),
  REFRESH_TOKEN_EXPIRES_IN: z
    .string()
    .regex(/^\d+\s*(s|m|h|d|w|y)$/i, "Invalid refresh token expiration format")
    .default("7d"),
});
