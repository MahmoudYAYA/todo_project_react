import type { Priority } from "../types/todo.types";

type TodoFormProps = {
  input: string;
  priority: Priority;
  deadline: string;
  onInputChange: (value: string) => void;
  onPriorityChange: (value: Priority) => void;
  onDeadlineChange: (value: string) => void;
  onSubmit: () => void;
};

export const TodoForm = ({
  input,
  priority,
  deadline,
  onInputChange,
  onPriorityChange,
  onDeadlineChange,
  onSubmit,
}: TodoFormProps) => {
  return (
    <div className="flex gap-4 flex-wrap">
      <input
        type="text"
        className="input w-full flex-1"
        placeholder="Ajouter une tâche..."
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && onSubmit()}
      />
      <input
        type="date"
        className="input w-fit"
        value={deadline}
        onChange={(e) => onDeadlineChange(e.target.value)}
      />
      <select
        className="select w-40"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as Priority)}>
        <option value="Urgent">Urgent</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Basse">Basse</option>
      </select>
      <button onClick={onSubmit} className="btn btn-primary">
        Ajouter
      </button>
    </div>
  );
};
