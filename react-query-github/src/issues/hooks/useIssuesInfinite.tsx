import React from "react";
import { Issue, State } from "../../interfaces";
import { UseQueryResult } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";

// types
interface InputProps {
  state?: State;
  labels: string[];
}

interface QueryKeyProps extends InputProps {
  page?: number;
}

interface OutputProps {
  issuesQuery: UseQueryResult<Issue[], unknown>;
  page: string;
  nextPage: () => void;
  prevPage: () => void;
}

// fetcher
const getIssues = async (args: any): Promise<Issue[]> => {
  const { queryKey } = args;
  const { state, labels, page = 1 }: QueryKeyProps = queryKey[1];

  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) params.append("labels", labels.join(","));
  params.append("page", page.toString());
  params.append("per_page", "5");

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = () => {
  return {};
};

export default useIssuesInfinite;
