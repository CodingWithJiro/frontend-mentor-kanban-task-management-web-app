import type { Request, Response } from "express";
import bcrypt from "bcryptjs";
import prisma from "../../src/lib/prisma.ts";
import {
  getRefreshToken,
  getRefreshTokenMaxAge,
  saveRefreshToken,
} from "../services/refresh-token.service.ts";
import { generateAccessToken } from "../services/access-token.service.ts";
import { setRefreshTokenCookie } from "../utils/cookies.ts";

export async function registerAccount(req: Request, res: Response) {
  const { name, username, email, password } = req.body;
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
  const refreshToken = getRefreshToken();
  const refreshTokenMaxAge = getRefreshTokenMaxAge();
  try {
    const user = await prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          name,
          username,
          email,
          passwordHash,
        },
      });
      await saveRefreshToken(
        tx,
        refreshToken,
        newUser.id,
        new Date(Date.now() + refreshTokenMaxAge),
      );
      return newUser;
    });
    const accessToken = await generateAccessToken(user.id);
    setRefreshTokenCookie(res, refreshToken, refreshTokenMaxAge);
    return res.status(201).json({
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
      },
      message: "New user registered successfully.",
    });
  } catch (err) {
    const isPrismaDuplicateError =
      typeof err === "object" &&
      err !== null &&
      "code" in err &&
      err.code === "P2002";
    if (isPrismaDuplicateError) {
      return res.status(409).json({
        message: "Username or email is already in use.",
      });
    }
    throw err;
  }
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
  const refreshToken = getRefreshToken();
  const refreshTokenMaxAge = getRefreshTokenMaxAge();
  await saveRefreshToken(
    prisma,
    refreshToken,
    user.id,
    new Date(Date.now() + refreshTokenMaxAge),
  );
  const accessToken = await generateAccessToken(user.id);
  setRefreshTokenCookie(res, refreshToken, refreshTokenMaxAge);
  return res.status(200).json({
    accessToken,
    user: {
      id: user.id,
      name: user.name,
      username: user.username,
      email: user.email,
    },
  });
}
