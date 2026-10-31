import { SignJWT } from "jose";
import { JWT_SECRET } from "../config/env.ts";

export async function generateAccessToken(userId: number) {
  return new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(userId))
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(JWT_SECRET);
}
