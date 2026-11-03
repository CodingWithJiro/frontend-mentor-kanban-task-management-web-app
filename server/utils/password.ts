import bcrypt from "bcryptjs";
import { BCRYPT_SALT_ROUNDS } from "../config/env.ts";

export function getPasswordHash(password: string) {
  const passwordHash = bcrypt.hash(password, BCRYPT_SALT_ROUNDS);
  return passwordHash;
}

export function comparePassword(password: string, passwordHash: string) {
  return bcrypt.compare(password, passwordHash);
}
