import ApiError from "../error/ApiError";
import express, { NextFunction } from "express";

export function errorHandlingMiddleware(
  err: any,
  req: express.Request,
  res: express.Response,
  next: NextFunction
) {
  if (err instanceof ApiError) {
    return res.status(err.status).json({ message: err.message });
  }
  return res.status(500).json({ message: "Unforeseen mistake!" });
}
