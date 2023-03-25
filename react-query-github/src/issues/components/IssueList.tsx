import { FC } from "react";
import { Issue, State } from "../../interfaces";
import { IssueItem } from "./IssueItem";
import { PaginationMethodsProps } from "../../interfaces/pagination";
import { PAGINATION_METHODS } from "../../helpers";

interface IssueListProps {
  issues: Issue[];
  state?: State;
  onStateChange: (state?: State) => void;
}

export const IssueList: FC<IssueListProps> = ({
  issues,
  state,
  onStateChange,
}) => {
  const handleActiveClass = {
    All: state === undefined ? "active" : "",
    Open: state === State.Open ? "active" : "",
    Closed: state === State.Close ? "active" : "",
  };

  return (
    <div className="card border-white">
      <div className="card-header bg-dark">
        <ul className="nav nav-pills card-header-pills">
          <li className="nav-item">
            <a
              onClick={() => onStateChange()}
              className={`nav-link ${handleActiveClass.All}`}
            >
              All
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => onStateChange(State.Open)}
              className={`nav-link ${handleActiveClass.Open}`}
            >
              Open
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() => onStateChange(State.Close)}
              className={`nav-link ${handleActiveClass.Closed}`}
            >
              Closed
            </a>
          </li>
        </ul>
      </div>
      <div className="card-body text-dark">
        {issues.map((issue) => (
          <IssueItem key={issue.id} issue={issue} />
        ))}
      </div>
    </div>
  );
};
