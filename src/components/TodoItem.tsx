import { useState } from "react";
import type { Todo, Priority } from "../types/todo.types";
import { isDeadlineClose } from "../utils/todoUtils";

type TodoItemProps = {
  todo: Todo;
  onDelete: () => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (
    id: number,
    text: string,
    priority: Priority,
    deadline?: string
  ) => void;
};

export const TodoItem = ({
  todo,
  onDelete,
  isSelected,
  onToggleSelect,
  onEdit,
}: TodoItemProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");

  const handleSave = () => {
    if (editText.trim() === "") return;
    onEdit(todo.id, editText.trim(), editPriority, editDeadline || undefined);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDeadline(todo.deadline || "");
    setIsEditing(false);
  };

  const isClose = isDeadlineClose(todo.deadline);
  const isOverdue = todo.deadline && new Date(todo.deadline) < new Date();

  const priorityBadgeClass =
    todo.priority === "Urgent"
      ? "win-badge win-badge-red"
      : todo.priority === "Moyenne"
      ? "win-badge win-badge-yellow"
      : "win-badge win-badge-green";

  return (
    <li
      className={`win-list-item${isSelected ? " selected" : ""}`}
      style={{ display: "flex", alignItems: "center", gap: "6px", padding: "4px 6px" }}
    >
      <input
        type="checkbox"
        className="win-checkbox"
        checked={isSelected}
        onChange={() => onToggleSelect(todo.id)}
        disabled={isEditing}
      />

      {!isEditing ? (
        <>
          {/* Text + badges */}
          <span style={{ flex: 1, display: "flex", alignItems: "center", gap: "6px", flexWrap: "wrap", fontSize: 11 }}>
            <span style={{ fontWeight: isSelected ? "normal" : "bold" }}>{todo.text}</span>
            <span className={priorityBadgeClass}>{todo.priority}</span>
            {isClose && (
              <span className="win-badge win-badge-orange" title="Deadline proche !">
                ⚠ Urgent
              </span>
            )}
            {todo.deadline && (
              <span
                className={`win-badge ${isOverdue ? "win-badge-red" : isClose ? "win-badge-orange" : "win-badge-green"}`}
                title={`Tâche à finir avant le : ${todo.deadline}`}
                style={{ fontWeight: "normal" }}
              >
                📅 {new Date(todo.deadline).toLocaleDateString("fr-FR")}
              </span>
            )}
          </span>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            <button className="win-btn" onClick={() => setIsEditing(true)} style={{ padding: "1px 7px", minHeight: 20, fontSize: 10 }}>
              ✎ Modifier
            </button>
            <button
              className="win-btn"
              onClick={onDelete}
              style={{ padding: "1px 7px", minHeight: 20, fontSize: 10 }}
            >
              ✕ Suppr.
            </button>
          </div>
        </>
      ) : (
        /* Edit mode */
        <>
          <div style={{ flex: 1, display: "flex", gap: "4px", alignItems: "center", flexWrap: "wrap" }}>
            <input
              type="text"
              className="win-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              autoFocus
              style={{ flex: 1, minWidth: "140px" }}
              onKeyDown={(e) => e.key === "Enter" && handleSave()}
            />
            <select
              className="win-select"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value as Priority)}
              style={{ width: "90px" }}
            >
              <option value="Urgent">Urgent</option>
              <option value="Moyenne">Moyenne</option>
              <option value="Basse">Basse</option>
            </select>
            <input
              type="date"
              className="win-input"
              value={editDeadline}
              onChange={(e) => setEditDeadline(e.target.value)}
              style={{ width: "116px" }}
            />
          </div>
          <div style={{ display: "flex", gap: "3px", flexShrink: 0 }}>
            <button
              className="win-btn"
              onClick={handleSave}
              style={{ padding: "1px 7px", minHeight: 20, fontSize: 10 }}
            >
              ✔ OK
            </button>
            <button
              className="win-btn"
              onClick={handleCancel}
              style={{ padding: "1px 7px", minHeight: 20, fontSize: 10 }}
            >
              Annuler
            </button>
          </div>
        </>
      )}
    </li>
  );
};
