import { Link, Navigate, useParams } from "react-router-dom";
import { IssueComment } from "../components/IssueComment";
import { useIssue } from "../hooks";
import LoadingIcon from "../../share/components/LoadingIcon";

export const IssueView = () => {
  const params = useParams<{ id: string }>();
  const { id = 0 } = params;
  const { issueQuery, commentsQuery } = useIssue({ issueNumber: +id });

  if (issueQuery.isLoading) {
    return <LoadingIcon />;
  }

  if (!issueQuery.data) {
    return <Navigate to="./issues/list" />;
  }

  if (issueQuery.data) {
    return (
      <div className="row mb-5">
        <div className="col-12 mb-3">
          <Link to="./issues/list">Go Back</Link>
        </div>

        {/* Primer comentario */}
        <IssueComment issue={issueQuery.data!} />

        {/* Comentario de otros */}
        {commentsQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          commentsQuery.data?.map((comment) => (
            <IssueComment key={comment.id} issue={comment} />
          ))
        )}
      </div>
    );
  }

  return <div></div>;
};

export default IssueView;
