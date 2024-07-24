import asyncHandler from "express-async-handler";
import { getUserFromGH } from "../service/github.service";
import {
  deleteUserService,
  fetchAllUsersService,
  newUserService,
  searchSingleUserService,
  searchUsersService,
  updateUserService,
} from "../service/user.service";
import ErrorResponses from "../error/ErrorResponses";

// Read or Create User
export const fetchUserController = asyncHandler(async (req, res) => {
  const inputUsername = req.params.username;
  const existingUser = await searchSingleUserService(inputUsername);
  if (existingUser) {
    res.send(existingUser);
  } else {
    const githubUser = await getUserFromGH(inputUsername);
    const newUserData = await newUserService(githubUser);
    res.send(newUserData);
  }
});

// Soft Delete user
export const deleteUserController = asyncHandler(async (req, res) => {
  const inputUsername = req.params.username;
  const validUser = await searchSingleUserService(inputUsername);
  if (!validUser) {
    throw ErrorResponses.noUserFound(inputUsername);
  }
  const deletedResponse = await deleteUserService(inputUsername);
  res.send(deletedResponse);
});

// Search Users
export const searchUsersController = asyncHandler(async (req, res) => {
  const existingUser = await searchUsersService(req.query);
  res.send(existingUser);
});

// Update user
export const updateUserController = asyncHandler(async (req, res) => {
  const updatedUser = await updateUserService(req.body);
  res.send(updatedUser);
});

// All users in DB
export const fetchAllUsersController = asyncHandler(async (req, res) => {
  const allUsers = await fetchAllUsersService(req.query);
  res.send(allUsers);
});
