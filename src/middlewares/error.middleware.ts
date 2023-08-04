import { NextFunction, Request, Response } from "express";
import { HttpException } from "../exceptions/HttpException";

export const errorMiddleware = (
  error: HttpException,
  _: Request,
  res: Response,
  next: NextFunction
) => {
  if (res.headersSent) {
    next(error);
  }
  const status = error.status || 500;
  const message = error.message || "Something went wrong";
  return res.status(status).json({ error: message });
};
