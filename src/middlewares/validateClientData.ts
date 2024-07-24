import { RequestHandler } from "express";
import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";

// Validating and Sanitising client data middleware with provided schema
export const validate = (
  type: "query" | "body" | "params",
  schema: any
): RequestHandler =>
  asyncHandler(async (req, res, next) => {
    try {
      req[type] = await schema.validate(req[type], { stripUnknown: true });
      next();
    } catch (err: any) {
      throw ErrorResponses.invalidUsername(err.errors?.[0]);
    }
  });
