import { NextFunction, Request, Response } from "express";

export function errorMiddleware(
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) {
  const message = error.message || "Something went wrong";
  response.status(500).json({
    message,
  });
}
