import { sign, JwtPayload, verify } from "jsonwebtoken";
import { ObjectId } from "mongoose";

// Sign Token
export const signToken = (username: ObjectId): JwtPayload | string => {
  return sign({ username }, process.env.JWT_SECRET as string, {
    expiresIn: "1d",
  });
};

// Verify token
export const verifyToken = (token: string) =>
  verify(token, process.env.JWT_SECRET as string);
