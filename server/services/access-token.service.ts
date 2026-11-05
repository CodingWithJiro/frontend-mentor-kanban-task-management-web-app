import { SignJWT } from "jose";
import { JWT_SECRET, ACCESS_TOKEN_EXPIRES_IN } from "../config/env.ts";

export async function generateAccessToken(userId: number) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime(ACCESS_TOKEN_EXPIRES_IN)
    .sign(JWT_SECRET);
}
