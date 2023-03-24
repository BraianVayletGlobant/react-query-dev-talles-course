import { githubApi } from "../../api/githubApi";
import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { Issue, State } from "../../interfaces";
import { useEffect, useState } from "react";

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

// hook
export const useIssues = ({ state, labels }: InputProps): OutputProps => {
  const [page, setPage] = useState(1);

  useEffect(() => setPage(1), [state, labels]);

  const issuesQuery = useQuery(["issues", { state, labels, page }], getIssues);

  const nextPage = () => {
    if (issuesQuery.data?.length === 0) return;
    if (page >= issuesQuery.data!.length) return;
    setPage(page + 1);
  };

  const prevPage = () => {
    if (issuesQuery.data?.length === 0) return;
    if (page <= 1) return;
    setPage(page - 1);
  };

  return {
    // Properties
    issuesQuery,
    // Getter
    page: issuesQuery.isFetching ? "Loading..." : page.toString(),
    // Methods
    nextPage,
    prevPage,
  };
};

export default useIssues;
