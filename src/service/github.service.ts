import ErrorResponses from "../error/ErrorResponses";
import githubApiInstance from "../config/github.axios";
import { IShortGitHubUser } from "../interfaces/user";

export const getUserFromGH = async (username: string) => {
  try {
    const response = await githubApiInstance.get(`/users/${username}`);
    return response.data;
  } catch (error: any) {
    throw ErrorResponses.noUserFound(username);
  }
};

export const getUserFollowersFromGH = async (username: string) => {
  try {
    const response = await githubApiInstance.get(
      `/users/${username}/followers`
    );
    return response.data;
  } catch (error: any) {
    throw ErrorResponses.noUserFound(username);
  }
};

export const getUserFollowingFromGH = async (username: string) => {
  try {
    const response = await githubApiInstance.get(
      `/users/${username}/following`
    );
    return response.data;
  } catch (error: any) {
    throw ErrorResponses.noUserFound(username);
  }
};

export const createFriendsService = async (username: string) => {
  const [followers, following] = await Promise.all([
    getUserFollowersFromGH(username),
    getUserFollowingFromGH(username),
  ]);

  if (!followers?.length || !following?.length) {
    return [];
  }

  const followersLogins = new Set(
    followers.map((follower: IShortGitHubUser) => follower.login)
  );

  const friends = following
    .filter((followee: IShortGitHubUser) => followersLogins.has(followee.login))
    .map((followee: IShortGitHubUser) => followee.login);

  return friends;
};

export const getUserReposFromGH = async (username: string) => {
  try {
    const response = await githubApiInstance.get(`/users/${username}/repos`);
    return response.data;
  } catch (error: any) {
    throw ErrorResponses.noUserFound(username);
  }
};
