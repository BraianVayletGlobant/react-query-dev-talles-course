import { FC } from "react";
import { Issue, State } from "../../interfaces";
import { IssueItem } from "./IssueItem";
import { PaginationMethodsProps } from "../../interfaces/pagination";
import { PAGINATION_METHODS } from "../../helpers";

interface IssueListProps {
  issues: Issue[];
  state?: State;
  onStateChange: (state?: State) => void;
  paginationMethod: PaginationMethodsProps;
  onPaginationMethodChange: (
    newPaginationMethod: PaginationMethodsProps
  ) => void;
}

export const IssueList: FC<IssueListProps> = ({
  issues,
  state,
  onStateChange,
  paginationMethod,
  onPaginationMethodChange,
}) => {
  const handleActiveClass = {
    All: state === undefined ? "active" : "",
    Open: state === State.Open ? "active" : "",
    Closed: state === State.Close ? "active" : "",
    PgMethodInfinite:
      paginationMethod === PAGINATION_METHODS.INFINITE ? "active" : "",
    PgMethodButtons:
      paginationMethod === PAGINATION_METHODS.BUTTONS ? "active" : "",
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
          <li className="nav-item">
            <span className="nav-link"> | </span>
          </li>
          <li className="nav-item">
            <a
              onClick={() =>
                onPaginationMethodChange(PAGINATION_METHODS.INFINITE)
              }
              className={`nav-link ${handleActiveClass.PgMethodInfinite}`}
            >
              {PAGINATION_METHODS.INFINITE.toUpperCase()}
            </a>
          </li>
          <li className="nav-item">
            <a
              onClick={() =>
                onPaginationMethodChange(PAGINATION_METHODS.BUTTONS)
              }
              className={`nav-link ${handleActiveClass.PgMethodButtons}`}
            >
              {PAGINATION_METHODS.BUTTONS.toUpperCase()}
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
