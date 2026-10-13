import type { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (res.headersSent) return next(err);

  return res.status(500).json({
    message: "Internal server error.",
  });
};
