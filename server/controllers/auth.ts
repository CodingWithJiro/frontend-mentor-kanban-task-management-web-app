import type { Request, Response } from "express";
import prisma from "../../src/lib/prisma.ts";
import bcrypt from "bcryptjs";
import { SignJWT } from "jose";
import { registerSchema } from "../schemas/register.schema.ts";

export async function registerAccount(req: Request, res: Response) {
  const validationResult = registerSchema.safeParse(req.body);
  const isInvalid = !validationResult.success;
  if (isInvalid) {
    return res.status(400).json({
      message: "Invalid registration data.",
      errors: validationResult.error.issues,
    });
  }

  const { name, username, email, password } = validationResult.data;

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }],
    },
    select: {
      username: true,
      email: true,
    },
  });

  const isUsernameAlreadyInUse = existingUser?.username === username;
  if (isUsernameAlreadyInUse) {
    return res.status(409).json({
      message: "Username is already in use.",
    });
  }

  const isEmailAlreadyInUse = existingUser?.email === email;
  if (isEmailAlreadyInUse) {
    return res.status(409).json({
      message: "Email is already in use.",
    });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await prisma.user.create({
    data: {
      name,
      username,
      email,
      passwordHash,
    },
  });

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const token = await new SignJWT({})
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(String(user.id))
    .setIssuedAt()
    .setExpirationTime("1h")
    .sign(secret);

  return res.status(201).json({
    token,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
    message: "New user registered successfully.",
  });
}

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
