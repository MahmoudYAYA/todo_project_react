import { Bell } from "lucide-react";

type DeadlineAlertProps = {
  count: number;
};

export const DeadlineAlert = ({ count }: DeadlineAlertProps) => {
  if (count === 0) return null;

  return (
    <p className="text-sm text-orange-500 flex items-center gap-1 mt-1">
      <Bell className="w-4 h-4" />
      {count} tâche{count > 1 ? "s" : ""} avec deadline proche !
    </p>
  );
};
