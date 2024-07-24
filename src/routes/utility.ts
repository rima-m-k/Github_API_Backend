import asyncHandler from "express-async-handler";
import ErrorResponses from "../error/ErrorResponses";

// Handling 404 endpoints
export const endPointNotFound = asyncHandler(async (req, res) => {
  throw ErrorResponses.endPointNotFound(req.originalUrl);
});
