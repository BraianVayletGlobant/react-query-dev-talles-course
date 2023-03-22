import { FiInfo, FiMessageSquare, FiCheckCircle } from "react-icons/fi";
import { Issue, State } from "../../interfaces";
import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { getIssue, getIssueComment } from "../hooks/useIssue";

interface IssueItemProps {
  issue: Issue;
}

export const IssueItem: FC<IssueItemProps> = ({ issue }) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  // Optimización opción1: prefetch data
  // prefetchQuery() hace una petición a la API y guarda la data en el cache
  const preFetchData = () => {
    queryClient.prefetchQuery(
      ["issue", issue.number],
      async () => await getIssue(issue.number)
    );
    queryClient.prefetchQuery(
      ["issue", issue.number, "comments"],
      async () => await getIssueComment(issue.number)
    );
  };

  // Optimización opción2: set data
  // setQueryData() no hace una petición a la API, solo actualiza el estado de la query
  const preSetData = () => {
    queryClient.setQueryData(["issue", issue.number], issue);
  };

  // Optimización opción3: updatedAt
  // La data se considerara fresca hasta 10 segundos después de la última actualización
  const preSetDataWithUpdatedAt = () => {
    queryClient.setQueryData(["issue", issue.number], issue, {
      updatedAt: new Date().getTime() + 10000, // 10 seconds from now
    });
  };

  return (
    <div
      className="card mb-2 issue"
      onClick={() => navigate(`/issues/issue/${issue.number}`)}
      // onMouseEnter={preFetchData} // optimización: prefetch data
      onMouseEnter={preSetData} // optimización: set data
    >
      <div className="card-body d-flex align-items-center">
        {issue.state === State.Open ? (
          <FiInfo size={30} color="red" />
        ) : (
          <FiCheckCircle size={30} color="green" />
        )}

        <div className="d-flex flex-column flex-fill px-2">
          <span>{issue.title}</span>
          <span className="issue-subinfo">
            #{issue.number} opened 2 days ago by{" "}
            <span className="fw-bold">{issue.user.login}</span>
          </span>
        </div>

        <div className="d-flex align-items-center">
          <img
            src={issue.user.avatar_url}
            alt={issue.user.login + " avatar"}
            className="avatar"
          />
          <span className="px-2">{issue.comments}</span>
          <FiMessageSquare />
        </div>
      </div>
    </div>
  );
};
