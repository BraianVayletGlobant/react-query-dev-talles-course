import { useQuery } from "@tanstack/react-query";
import React from "react";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../../interfaces";
import { sleep } from "../../helpers/sleep";

interface UseIssueType {
  issueNumber: number;
}

const getIssue = async (issueNumber: number): Promise<Issue> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComment = async (issueNumber: number): Promise<Issue[]> => {
  await sleep(2);
  const { data } = await githubApi.get<Issue[]>(
    `/issues/${issueNumber}/comments`
  );
  return data;
};

export const useIssue = ({ issueNumber }: UseIssueType) => {
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
