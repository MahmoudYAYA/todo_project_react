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
  const tabs: { label: string; value: Priority | "Tous"; count: number }[] = [
    { label: "Tous", value: "Tous", count: counts.total },
    { label: "Urgent", value: "Urgent", count: counts.urgent },
    { label: "Moyenne", value: "Moyenne", count: counts.medium },
    { label: "Basse", value: "Basse", count: counts.low },
  ];

  return (
    <div style={{ display: "flex", gap: "3px", flexWrap: "wrap" }}>
      {tabs.map((tab) => (
        <button
          key={tab.value}
          className={`win-tab${filter === tab.value ? " active" : ""}`}
          onClick={() => onFilterChange(tab.value)}
        >
          {tab.label} ({tab.count})
        </button>
      ))}
    </div>
  );
};
