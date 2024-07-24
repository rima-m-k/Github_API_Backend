import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";
import { verifyToken } from "../utils/manageToken";
import { IToken } from "../interfaces/token";

// Middleware to verify token
export const checkAuth = (inputRole: "user" | "admin") =>
  asyncHandler(async (req, res, next) => {
    if (!req.headers?.authorization)
      throw ErrorResponses.unauthorized("Authorization required");
    const token = req.headers.authorization.replace("Bearer ", "");
    const { username, role } = verifyToken(token) as IToken;
    if (role !== inputRole)
      throw ErrorResponses.unauthorized("Authorization required");
    req.authUser = { username, role: inputRole };
    next();
  });
