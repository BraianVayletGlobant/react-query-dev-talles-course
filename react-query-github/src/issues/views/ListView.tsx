import { useState } from "react";
import { IssueList } from "../components/IssueList";
import { LabelPicker } from "../components/LabelPicker";

export const ListView = () => {
  const [selectedLabels, setSelectedLabels] = useState<string[]>([]);

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
        <IssueList />
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
