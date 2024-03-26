import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";

export const handleFileNotFoundError = (res: Response) => {
  return res.status(404).json({ status: "ERROR", message: "File not found" });
};

export const handleUnauthorizedError = (res: Response) => {
  return res
    .status(401)
    .json({ status: "ERROR", message: "Unauthorized access" });
};

export const handleFileNotFoundAtPath = (res: Response) => {
  return res
    .status(404)
    .json({ status: "ERROR", message: "File not found at path" });
};

export const handleInvalidIdError = (res: Response, error: Error) => {
  console.log(error);
  return res.status(400).json({ status: "ERROR", message: "Invalid ID" });
};

export const handleInternalServerError = (res: Response, error: Error) => {
  console.error("Internal server error:", error.message);
  return res
    .status(500)
    .json({ status: "ERROR", message: "Internal server error" });
};

export const handleUnknownError = (res: Response, error: any) => {
  console.error("Unknown error occurred:", error);
  return res
    .status(500)
    .json({ status: "ERROR", message: "Internal server error" });
};

const errorHandlers: Record<string, (res: Response) => Response> = {
  "File not found": handleFileNotFoundError,
  "Unauthorized access": handleUnauthorizedError,
  "File not found at path": handleFileNotFoundAtPath,
};

export const errorHandlerMiddleware = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof mongoose.Error.CastError && error.path === "_id") {
    return handleInvalidIdError(res, error);
  }

  if (error instanceof Error) {
    const handler = errorHandlers[error.message];
    if (handler) {
      return handler(res);
    }
    return handleInternalServerError(res, error);
  }

  return handleUnknownError(res, error);
};
