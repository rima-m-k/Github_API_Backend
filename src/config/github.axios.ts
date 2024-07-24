import axios, { AxiosInstance } from "axios";

export const githubApiInstance: AxiosInstance = axios.create({
  baseURL: "https://api.github.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export default githubApiInstance;
