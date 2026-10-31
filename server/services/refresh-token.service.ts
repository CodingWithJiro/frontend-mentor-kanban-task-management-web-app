import type { Prisma } from "../../generated/prisma/client.ts";
import type { StringValue } from "ms";
import ms from "ms";
import { createHash, randomBytes } from "node:crypto";
import { REFRESH_TOKEN_EXPIRES_IN } from "../config/env.ts";
import prisma from "../../src/lib/prisma.ts";

type PrismaClientOrTransaction = typeof prisma | Prisma.TransactionClient;

export function getRefreshToken() {
  return randomBytes(32).toString("hex");
}

function getRefreshTokenHash(refreshToken: string) {
  return createHash("sha256").update(refreshToken).digest("hex");
}

export function getRefreshTokenMaxAge() {
  return ms(REFRESH_TOKEN_EXPIRES_IN as StringValue);
}

export async function saveRefreshToken(
  db: PrismaClientOrTransaction,
  refreshToken: string,
  userId: number,
  expiresAt: Date,
) {
  await db.refreshToken.create({
    data: {
      tokenHash: getRefreshTokenHash(refreshToken),
      userId,
      expiresAt,
    },
  });
}
