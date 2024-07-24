import { NextFunction, Request, Response } from "express";
import ErrorResponses from "./ErrorResponses";
import { JsonWebTokenError } from "jsonwebtoken";

const appError = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  if (err instanceof ErrorResponses) {
    return res.status(err.statusCode).json({
      status: "error",
      operational: true,
      message: err.message,
    });
  }

  // Mongo Validation Error Handler
  if (err.name === "ValidationError") {
    const mongoError: any = err;
    const validationError: any = Object.values(mongoError.errors);
    return res.status(403).json({
      status: "error",
      operational: true,
      message: validationError[0].message,
    });
  }

  // JSON Web Token Error Handler
  if (err instanceof JsonWebTokenError) {
    return res.status(401).json({
      status: "error",
      operational: true,
      message: "Unauthorized access restricted",
    });
  }

  // Unexpected error handler
  console.log("Unexpected Error: ", err);
  return res.status(500).json({
    status: "error",
    operational: false,
    message: "Something went wrong!",
  });
};

export default appError;
