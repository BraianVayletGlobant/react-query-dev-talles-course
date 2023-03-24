import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";
import { useIssues } from "../hooks";
import LoadingIcon from "../../share/components/LoadingIcon";
import { State } from "../../interfaces";
import { PaginationMethodsProps } from "../../interfaces/pagination";
import { PAGINATION_METHODS } from "../../helpers";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);
  const [filterState, setFilterState] = useState<State>();
  const [paginationMethod, setPaginationMethod] =
    useState<PaginationMethodsProps>(PAGINATION_METHODS.BUTTONS);
  const { issuesQuery, page, nextPage, prevPage } = useIssues({
    state: filterState,
    labels: selectedLabels,
  });

  const onLabelChange = (labelName: string) => {
    if (selectedLabels.includes(labelName)) {
      setSelectedLabels(selectedLabels.filter((label) => label !== labelName));
    } else {
      setSelectedLabels([...selectedLabels, labelName]);
    }
  };

  return (
    <div className="row mt-5">
      <div className="col-8">
        {issuesQuery.isLoading ? (
          <LoadingIcon />
        ) : (
          <IssueList
            issues={issuesQuery.data! || []}
            state={filterState}
            onStateChange={(newState?: State) => setFilterState(newState)}
            paginationMethod={paginationMethod}
            onPaginationMethodChange={(
              newPaginationMethod: PaginationMethodsProps
            ) => setPaginationMethod(newPaginationMethod)}
          />
        )}

        {/* Example with infinite Scroll */}
        {paginationMethod === PAGINATION_METHODS.INFINITE && (
          <div className="d-flex mt-2 justify-content-between align-items-center">
            <button
              className="btn btn-outline-primary"
              // onClick={prevPage}
              disabled={issuesQuery.isFetching}
            >
              Load More...
            </button>
          </div>
        )}

        {/* Example with pagination */}
        {paginationMethod === PAGINATION_METHODS.BUTTONS && (
          <div className="d-flex mt-2 justify-content-between align-items-center">
            <button
              className="btn btn-outline-primary"
              onClick={prevPage}
              disabled={issuesQuery.isFetching}
            >
              Prev
            </button>
            <span>{page}</span>
            <button
              className="btn btn-outline-primary"
              onClick={nextPage}
              disabled={issuesQuery.isFetching}
            >
              Next
            </button>
          </div>
        )}
      </div>

      <div className="col-4">
        <LabelPicker
          selectedLabels={selectedLabels}
          onChanges={(labelName) => onLabelChange(labelName)}
        />
      </div>
    </div>
  );
};
