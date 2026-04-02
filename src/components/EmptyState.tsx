import { Construction } from "lucide-react";

export const EmptyState = () => {
  return (
    <div className="flex justify-center items-center flex-col p-10">
      <Construction
        strokeWidth={1}
        className="w-20 h-20 text-primary opacity-50"
      />
      <p className="text-sm mt-4 opacity-70">Aucune tâche pour ce filtre</p>
    </div>
  );
};
