import type { Priority } from "../types/todo.types";

type FilterButtonsProps = {
  filter: Priority | "Tous";
  onFilterChange: (filter: Priority | "Tous") => void;
  counts: {
    total: number;
    urgent: number;
    medium: number;
    low: number;
  };
};

export const FilterButtons = ({
  filter,
  onFilterChange,
  counts,
}: FilterButtonsProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        className={`btn btn-sm ${
          filter === "Tous" ? "btn-primary" : "btn-soft"
        }`}
        onClick={() => onFilterChange("Tous")}>
        Tous ({counts.total})
      </button>
      <button
        className={`btn btn-sm ${
          filter === "Urgent" ? "btn-primary" : "btn-soft"
        }`}
        onClick={() => onFilterChange("Urgent")}>
        Urgent ({counts.urgent})
      </button>
      <button
        className={`btn btn-sm ${
          filter === "Moyenne" ? "btn-primary" : "btn-soft"
        }`}
        onClick={() => onFilterChange("Moyenne")}>
        Moyenne ({counts.medium})
      </button>
      <button
        className={`btn btn-sm ${
          filter === "Basse" ? "btn-primary" : "btn-soft"
        }`}
        onClick={() => onFilterChange("Basse")}>
        Basse ({counts.low})
      </button>
    </div>
  );
};
