import axios from "axios";

const API_GITHUB_REACT = "https://api.github.com/repos/facebook/react";

export const githubApi = axios.create({
  baseURL: API_GITHUB_REACT,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
});
