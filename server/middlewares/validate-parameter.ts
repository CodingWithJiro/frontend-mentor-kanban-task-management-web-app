import type { NextFunction, Request, Response } from "express";
import { isInvalidId } from "../utils/validate-id";

export function validateParameterIds(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const params = req.params;
  for (const param in params) {
    const isId = param.endsWith("Id");
    if (isId) {
      const idName = param;
      const idNumber = Number(params[param]);
      if (isInvalidId(idNumber)) {
        return res.status(400).json({
          message: `Invalid ${idName}.`,
        });
      }
    }
  }
  next();
}
