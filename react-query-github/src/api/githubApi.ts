import axios from "axios";

const API_GITHUB_REACT = "https://api.github.com/repos/facebook/react";

export const githubApi = axios.create({
  baseURL: API_GITHUB_REACT,
  headers: {
    Authorization: `Bearer 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`,
  },
});
