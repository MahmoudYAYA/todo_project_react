import { useState } from "react";
import { Trash, Edit2, Check, X, Bell } from "lucide-react";
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

  return (
    <li className="p-3">
      <div className="flex justify-between align-items-center gap-2">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            checked={isSelected}
            onChange={() => onToggleSelect(todo.id)}
            disabled={isEditing}
          />

          {!isEditing ? (
            <>
              <span className="text-md flex items-center gap-2 font-bold">
                <span>{todo.text}</span>
                <span
                  className={`badge badge-sm badge-soft ${
                    todo.priority === "Urgent"
                      ? "badge-error"
                      : todo.priority === "Moyenne"
                      ? "badge-warning"
                      : "badge-success"
                  }`}>
                  {todo.priority}
                </span>
                {isClose && (
                  <span
                    className="badge badge-sm bg-orange-500 text-white flex items-center gap-1"
                    title="Deadline proche !">
                    <Bell className="w-3 h-3" />
                    Urgent
                  </span>
                )}
              </span>
              {todo.deadline && (
                <span
                  className={`badge font-bold px-3 py-4 rounded-md text-white ${
                    new Date(todo.deadline) < new Date()
                      ? "bg-red-400"
                      : isClose
                      ? "bg-orange-400"
                      : "bg-green-400"
                  }`}
                  title={`Tâche à finir avant le : ${todo.deadline}`}>
                  {new Date(todo.deadline).toLocaleDateString("fr-FR")}
                </span>
              )}
            </>
          ) : (
            <div className="flex gap-2 flex-1 items-center">
              <input
                type="text"
                className="input input-sm flex-1"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                autoFocus
              />
              <select
                className="select select-sm w-32"
                value={editPriority}
                onChange={(e) => setEditPriority(e.target.value as Priority)}>
                <option value="Urgent">Urgent</option>
                <option value="Moyenne">Moyenne</option>
                <option value="Basse">Basse</option>
              </select>
              <input
                type="date"
                className="input input-sm w-36"
                value={editDeadline}
                onChange={(e) => setEditDeadline(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!isEditing ? (
            <>
              <button
                className="btn btn-primary btn-soft btn-sm"
                onClick={() => setIsEditing(true)}>
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                className="btn btn-error btn-soft btn-sm"
                onClick={onDelete}>
                <Trash className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                className="btn btn-success btn-soft btn-sm"
                onClick={handleSave}>
                <Check className="w-4 h-4" />
              </button>
              <button className="btn btn-ghost btn-sm" onClick={handleCancel}>
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};
