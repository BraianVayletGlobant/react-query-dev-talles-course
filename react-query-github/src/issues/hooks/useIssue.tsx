import { UseQueryResult, useQuery } from "@tanstack/react-query";
import React from "react";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../../interfaces";
import { sleep } from "../../helpers/sleep";
import { Comments } from "../../interfaces/issue";

// types
interface InputProps {
  issueNumber: number;
}

interface OutputProps {
  issueQuery: UseQueryResult<Issue, unknown>;
  commentsQuery: UseQueryResult<Issue[], unknown>;
}

// fetcher
export const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

export const getIssueComment = async (
  issueNumber: number
): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

// hook
export const useIssue = ({ issueNumber }: InputProps): OutputProps => {
  const issueQuery = useQuery(["issue", issueNumber], () =>
    getIssue(issueNumber)
  );

  const commentsQuery = useQuery(
    ["issue", issueNumber, "comments"],
    () => getIssueComment(issueQuery.data?.number ?? issueNumber),
    {
      enabled: issueQuery.data !== undefined,
    }
  );

  return { issueQuery, commentsQuery };
};

export default useIssue;
