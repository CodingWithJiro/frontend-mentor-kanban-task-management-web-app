import type { Request, Response, NextFunction } from "express";
import type { ZodType } from "zod";

export function validateRequest(schema: ZodType) {
  return (req: Request, res: Response, next: NextFunction) => {
    const validationResult = schema.safeParse(req.body);
    const isInvalid = !validationResult.success;
    if (isInvalid) {
      return res.status(400).json({
        message: "Invalid request data.",
        errors: validationResult.error.issues,
      });
    }
    req.body = validationResult.data;
    next();
  };
}
