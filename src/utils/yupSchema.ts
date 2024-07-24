import * as yup from "yup";

// GitHub Username Schema
export const githubUsernameSchema = yup.object().shape({
  username: yup
    .string()
    .trim()
    .required()
    .test("isValidGitHubUsername", "Invalid GitHub username", (arg) =>
      /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(arg)
    ),
});

const stringSchema = (label = "value") =>
  yup
    .string()
    .trim()
    .matches(/^[a-zA-Z\s\d]{4,20}$/, `Invalid ${label}`);

// Search User schema
export const searchUserSchema = yup.lazy((value) => {
  return yup.object().shape({
    login: yup
      .string()
      .trim()
      .matches(
        /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i,
        "Invalid GitHub username"
      ),
    location: stringSchema("location"),
    company: stringSchema("company"),
    blog: yup.string().url("Invalid URL"),
  });
});

// Existing user schema
export const existingUserSchema = yup.object().shape({
  login: yup.string().trim().required(),
  id: yup.number().required(),
  avatar_url: yup.string().trim().required(),
  gravatar_id: yup.string().trim(),
  url: yup.string().trim().required(),
  html_url: yup.string().trim().required(),
  followers_url: yup.string().trim().required(),
  following_url: yup.string().trim().required(),
  gists_url: yup.string().trim().required(),
  starred_url: yup.string().trim().required(),
  subscriptions_url: yup.string().trim().required(),
  organizations_url: yup.string().trim().required(),
  repos_url: yup.string().trim().required(),
  events_url: yup.string().trim().required(),
  received_events_url: yup.string().trim().required(),
  type: yup.string().trim().required(),
  site_admin: yup.boolean().required(),
  name: yup.string().trim(),
  company: yup.string().trim(),
  blog: yup.string().trim().nullable(),
  location: yup.string().trim(),
  email: yup.string().trim().email().nullable(),
  hireable: yup.boolean().nullable(),
  bio: yup.string().trim(),
  twitter_username: yup.string().trim().nullable(),
  public_repos: yup.number().required(),
  public_gists: yup.number().required(),
  followers: yup.number().required(),
  following: yup.number().required(),
  created_at: yup.string().trim().required(),
  updated_at: yup.string().trim().required(),
  friends: yup.array().of(yup.string().trim()).required(),
});

// Sort All users
export const sortBySchema = yup.object().shape({
  sortBy: yup
    .string()
    .oneOf([
      "public_repos",
      "public_gists",
      "followers",
      "following",
      "created_at",
    ]),
  order: yup.string().oneOf(["1", "-1"]),
});
