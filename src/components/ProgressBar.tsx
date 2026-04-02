type ProgressBarProps = {
  percentage: number;
  selected: number;
  total: number;
};

export const ProgressBar = ({
  percentage,
  selected,
  total,
}: ProgressBarProps) => {
  return (
    <div className="mb-4">
      <div className="flex justify-between text-sm mb-2">
        <span className="font-semibold">Progression</span>
        <span className="font-bold">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-300 rounded-full h-4 overflow-hidden">
        <div
          className="bg-primary h-full transition-all duration-500 flex items-center justify-center text-xs text-white font-bold"
          style={{ width: `${percentage}%` }}>
          {percentage > 10 && `${percentage}%`}
        </div>
      </div>
      <p className="text-xs text-center mt-1 opacity-70">
        {selected} / {total} tâches sélectionnées
      </p>
    </div>
  );
};
