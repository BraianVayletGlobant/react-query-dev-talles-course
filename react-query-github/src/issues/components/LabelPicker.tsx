import { FC } from "react";
import LoadingIcon from "../../share/components/LoadingIcon";
import { useLabels } from "../hooks";

interface LabelPickerProps {
  selectedLabels: string[];
  onChanges: (labelName: string) => void;
}

export const LabelPicker: FC<LabelPickerProps> = ({
  selectedLabels,
  onChanges,
}) => {
  const { labelsQuery } = useLabels();
  console.log("labelsQuery", labelsQuery);

  if (labelsQuery) {
    if (labelsQuery.isLoading) {
      return <LoadingIcon />;
    } else {
      return (
        <>
          {labelsQuery.data?.map((label) => (
            <span
              key={label.id}
              className={`badge rounded-pill m-1 label-picker ${
                selectedLabels.includes(label.name) ? "label-active" : ""
              }`}
              onClick={() => onChanges(label.name)}
              style={{
                border: `1px solid #${label.color}`,
                color: `#${label.color}`,
              }}
            >
              {label.name}
            </span>
          ))}
        </>
      );
    }
  } else {
    return <div>Not found</div>;
  }
};
