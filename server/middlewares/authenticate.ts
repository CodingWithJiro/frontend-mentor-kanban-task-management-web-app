import type { Request, Response, NextFunction } from "express";
import { jwtVerify } from "jose";

export async function authenticate(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const authorization = req.headers.authorization;

  if (!authorization) {
    return res.status(401).json({ message: "Not authorized." });
  }

  const [scheme, token] = authorization.split(" ");
  const isInvalid = scheme !== "Bearer" || !token;

  if (isInvalid) {
    return res.status(401).json({ message: "Not authorized." });
  }

  const secret = new TextEncoder().encode(process.env.JWT_SECRET);

  try {
    const { payload } = await jwtVerify(token, secret);

    const isMissingId = !payload.sub;
    if (isMissingId) {
      return res.status(401).json({ message: "Not authorized." });
    }

    const userId = Number(payload.sub);

    const isInvalidUserId = !Number.isInteger(userId) || userId <= 0;
    if (isInvalidUserId) {
      return res.status(401).json({ message: "Not authorized." });
    }

    req.userId = userId;
    next();
  } catch {
    return res.status(401).json({ message: "Not authorized." });
  }
}
