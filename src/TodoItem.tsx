import {Trash } from "lucide-react";

type Priority = 'Urgent' | 'Moyenne' | 'Basse';

type Todo = {
  id: number;
  text: string;
  priority: Priority;
  deadline?: string;
 }


 type Props = {
    todo: Todo
    onDelete: () => void
    isSelected: boolean
    onToggleSelect: (id: number) => void
 }


const TodoItem = ({todo, onDelete, isSelected, onToggleSelect} : Props) => {
    return (
        <li className="p-3">
            <div className="flex justify-between align-items-center">
                <div className="flex items-center gap-2">
                    
                    <input type="checkbox"  className="checkbox checkbox-primary checkbox-sm" 
                    checked={isSelected} 
                    onChange={() => onToggleSelect(todo.id)}
                    />
                    <span className="text-md flex items-center gap-2 font-bold">
                        <span>
                            {todo.text}
                        </span>
                        <span className={`badge badge-sm badge-soft
                            ${todo.priority === "Urgent" ? "badge-error" : todo.priority === "Moyenne" ? "badge-warning" : "badge-success"}`}>
                            {todo.priority}
                        </span>
                    </span>
                    {todo.deadline && (
                        <span
                        className={`badge badge-sm badge-soft font-bold  px-2 py-1 rounded-md text-white font-bold bg-red-500${
                            new Date(todo.deadline) < new Date() ? "badge-error" : "badge-ghost"
                        }`}
                        title={`Tache à finire avant le  exacte : ${todo.deadline}`}
                        >
                        Échéance&nbsp;:{" "}
                        {new Date(todo.deadline).toLocaleDateString("fr-FR")}
                        </span>
                    )}
                </div>
                <button className="btn btn-error btn-soft
                " onClick={onDelete}>
                     <Trash className="w-4 h-4" />
                </button>
            </div>
        </li>
    )
}

export default TodoItem 