import { Router } from "express";
import {
  deleteUserController,
  fetchUserController,
  searchUsersController,
  updateUserController,
  fetchAllUsersController,
} from "../controllers/user";
import { validate } from "../middlewares/validateClientData";
import {
  existingUserSchema,
  githubUsernameSchema,
  searchUserSchema,
  sortBySchema,
} from "../utils/yupSchema";

const userRoutes = Router();

// All users
userRoutes.get("/", validate("query", sortBySchema), fetchAllUsersController);


// Search users
userRoutes.get(
  "/search",
  validate("query", searchUserSchema),
  searchUsersController
);

// User CRUD
userRoutes
  .route("/:username")
  .get(validate("params", githubUsernameSchema), fetchUserController)
  .put(
    validate("params", githubUsernameSchema),
    validate("body", existingUserSchema),
    updateUserController
  )
  .patch(validate("params", githubUsernameSchema), deleteUserController);

export default userRoutes;
