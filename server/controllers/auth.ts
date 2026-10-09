import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";

export async function loginAccount(req: Request, res: Response) {
  const { identifier, password } = req.body;

  const user =
    (await prisma.user.findUnique({
      where: { email: identifier },
    })) ??
    (await prisma.user.findUnique({
      where: { username: identifier },
    }));

  const isMissingUser = !user;
  if (isMissingUser) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const isInvalidPassword = !(await bcrypt.compare(
    password,
    user.passwordHash,
  ));
  if (isInvalidPassword) {
    return res.status(401).json({ message: "Invalid credentials." });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return res.status(200).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
  });
}
