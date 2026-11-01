import type { Response } from "express";

export function setRefreshTokenCookie(
  res: Response,
  refreshToken: string,
  refreshTokenMaxAge: number,
) {
  res.cookie("refreshToken", refreshToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
    maxAge: refreshTokenMaxAge,
  });
}

export function clearRefreshTokenCookie(res: Response) {
  return res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/api/auth",
  });
}
