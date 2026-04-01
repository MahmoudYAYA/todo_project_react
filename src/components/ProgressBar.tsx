type ProgressBarProps = {
  percentage: number;
  selected: number;
  total: number;
};

export const ProgressBar = ({ percentage, selected, total }: ProgressBarProps) => {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: 11 }}>
      <span style={{ whiteSpace: "nowrap", fontWeight: "bold", minWidth: 80 }}>
        Progression :
      </span>
      <div className="win-progress-track" style={{ flex: 1 }}>
        <div
          className="win-progress-fill"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span style={{ whiteSpace: "nowrap", minWidth: 40, textAlign: "right" }}>
        {percentage}%
      </span>
      <span style={{ whiteSpace: "nowrap", color: "#444" }}>
        ({selected}/{total})
      </span>
    </div>
  );
};
