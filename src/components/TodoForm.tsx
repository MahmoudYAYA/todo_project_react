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
    <div style={{ display: "flex", gap: "4px", flexWrap: "wrap", alignItems: "center" }}>
      <input
        type="text"
        className="win-input"
        placeholder="Ajouter une tâche..."
        value={input}
        onChange={(e) => onInputChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onSubmit()}
        style={{ flex: 1, minWidth: "180px" }}
      />
      <label style={{ fontSize: 11, marginLeft: 2, whiteSpace: "nowrap" }}>
        Échéance :
      </label>
      <input
        type="date"
        className="win-input"
        value={deadline}
        onChange={(e) => onDeadlineChange(e.target.value)}
        style={{ width: "120px" }}
      />
      <select
        className="win-select"
        value={priority}
        onChange={(e) => onPriorityChange(e.target.value as Priority)}
        style={{ width: "100px" }}
      >
        <option value="Urgent">Urgent</option>
        <option value="Moyenne">Moyenne</option>
        <option value="Basse">Basse</option>
      </select>
      <button onClick={onSubmit} className="win-btn" style={{ paddingLeft: 14, paddingRight: 14 }}>
        Ajouter
      </button>
    </div>
  );
};
