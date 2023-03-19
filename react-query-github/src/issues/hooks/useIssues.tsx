import { githubApi } from "../../api/githubApi";
import { useQuery } from "@tanstack/react-query";
import { Issue } from "../../interfaces";

const getLabels = async (): Promise<Issue[]> => {
  const { data } = await githubApi.get("/issues");
  return data;
};

export const useIssues = () => {
  const issuesQuery = useQuery(["issues"], getLabels, {
    staleTime: 1000 * 60 * 60,
  });
  return { issuesQuery };
};

export default useIssues;
