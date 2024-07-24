import UserModel from "../models/UserModel";
import { IGitHubUser, IUser } from "../interfaces/user";
import { createFriendsService } from "./github.service";
import ErrorResponses from "../error/ErrorResponses";

export const searchSingleUserService = async (username: string) => {
  const existingUser = await UserModel.findOne({
    login: { $regex: username, $options: "i" },
  });

  if (existingUser) {
    if (existingUser.isDeleted == "true") {
      throw ErrorResponses.noUserFound(username);
    }
    return {
      status: "success",
      data: existingUser,
      message: "User found successfully",
    };
  }

  return null;
};

export const searchUsersService = async (queryObj: { [key: string]: any }) => {
  const options: { [key: string]: string | Object } = { ...queryObj };

  for (const filter in options) {
    options[filter] = {
      $regex: options[filter],
      $options: "i",
    };
  }

  const usersResult = await UserModel.find({ ...options, isDeleted: false });

  return {
    status: "success",
    data: usersResult,
    message: "Users found successfully",
  };
};

export const newUserService = async (userData: IGitHubUser) => {
  const friends = await createFriendsService(userData.login);
  const newUserData = new UserModel({ ...userData, friends });
  await newUserData.save();
  return {
    status: "success",
    data: newUserData,
    message: "User added successfully",
  };
};

export const deleteUserService = async (username: string) => {
  await UserModel.findOneAndUpdate(
    { login: { $regex: username, $options: "i" } },
    { isDeleted: true }
  );
  return {
    status: "success",
    message: "User deleted successfully",
  };
};

export const updateUserService = async (userData: IUser) => {
  const updatedUserData = await UserModel.findOneAndUpdate(
    {
      login: userData.login,
      isDeleted: false,
    },
    userData,
    { new: true }
  );
  if (!updatedUserData) {
    throw ErrorResponses.noUserFound(userData.login);
  }
  return {
    status: "success",
    data: updatedUserData,
    message: "User updated successfully",
  };
};

export const fetchAllUsersService = async (sortObj: { [key: string]: any }) => {
  const options: { [key: string]: any } = {
    [sortObj?.sortBy || "id"]: sortObj?.order ? +sortObj.order : -1,
  };
  const sortedUsers = await UserModel.find({ isDeleted: false }).sort(options);
  return {
    status: "success",
    data: sortedUsers,
    message: "All users fetched successfully",
  };
};
