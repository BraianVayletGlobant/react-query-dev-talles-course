import React, { useState } from "react";
import { Issue, State } from "../../interfaces";
import {
  UseInfiniteQueryResult,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { sleep } from "../../helpers";

// types
interface InputProps {
  state?: State;
  labels: string[];
}

interface OutputProps {
  issuesQuery: UseInfiniteQueryResult<unknown, unknown>;
}

interface QueryKeyProps extends InputProps {
  page?: number;
}

// fetcher
const getIssues = async ({
  pageParam = 1,
  queryKey,
}: any): Promise<Issue[]> => {
  const [, , args] = queryKey;
  const { state, labels } = args as QueryKeyProps;

  const params = new URLSearchParams();
  if (state) params.append("state", state);
  if (labels.length > 0) params.append("labels", labels.join(","));
  params.append("page", pageParam.toString());

  const { data } = await githubApi.get<Issue[]>("/issues", { params });
  return data;
};

export const useIssuesInfinite = ({
  state,
  labels,
}: InputProps): OutputProps => {
  const issuesQuery = useInfiniteQuery(
    ["issues", "infinite", { state, labels }],
    getIssues,
    {
      getNextPageParam: (lastPage, pages) => {
        if (lastPage.length === 0) return;

        return pages.length + 1;
      },
    }
  );
  return {
    issuesQuery,
  };
};

export default useIssuesInfinite;
