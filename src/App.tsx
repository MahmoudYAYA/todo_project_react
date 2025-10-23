import { useEffect, useState } from "react";
import { Construction, Trash, Edit2, Check, X } from "lucide-react";

// typ priority peux avoir pluesieurs valeurs
type Priority = "Urgent" | "Moyenne" | "Basse";

type Todo = {
  id: number;
  text: string;
  priority: Priority;
  deadline?: string;
};

// ============================================
// NOUVEAU COMPOSANT TodoItem avec édition
// ============================================
type TodoItemProps = {
  todo: Todo;
  onDelete: () => void;
  isSelected: boolean;
  onToggleSelect: (id: number) => void;
  onEdit: (
    id: number,
    newText: string,
    newPriority: Priority,
    newDeadline?: string
  ) => void; // NOUVELLE PROP
};

const TodoItem = ({
  todo,
  onDelete,
  isSelected,
  onToggleSelect,
  onEdit, // NOUVELLE PROP
}: TodoItemProps) => {
  // États pour gérer le mode édition
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editPriority, setEditPriority] = useState(todo.priority);
  const [editDeadline, setEditDeadline] = useState(todo.deadline || "");

  // Fonction pour sauvegarder les modifications
  const handleSave = () => {
    if (editText.trim() === "") return;
    onEdit(todo.id, editText.trim(), editPriority, editDeadline || undefined);
    setIsEditing(false);
  };

  // Fonction pour annuler l'édition
  const handleCancel = () => {
    setEditText(todo.text);
    setEditPriority(todo.priority);
    setEditDeadline(todo.deadline || "");
    setIsEditing(false);
  };

  return (
    <li className="p-3">
      <div className="flex justify-between align-items-center gap-2">
        <div className="flex items-center gap-2 flex-1">
          <input
            type="checkbox"
            className="checkbox checkbox-primary checkbox-sm"
            checked={isSelected}
            onChange={() => onToggleSelect(todo.id)}
            disabled={isEditing} // Désactiver pendant l'édition
          />

          {/* MODE NORMAL : Affichage */}
          {!isEditing ? (
            <>
              <span className="text-md flex items-center gap-2 font-bold">
                <span>{todo.text}</span>
                <span
                  className={`badge badge-sm badge-soft
                     ${
                       todo.priority === "Urgent"
                         ? "badge-error"
                         : todo.priority === "Moyenne"
                         ? "badge-warning"
                         : "badge-success"
                     }`}>
                  {todo.priority}
                </span>
              </span>
              {todo.deadline && (
                <span
                  className={`badge font-bold px-3 py-4 rounded-md text-white ${
                    new Date(todo.deadline) < new Date()
                      ? "bg-red-400"
                      : "bg-green-400"
                  }`}
                  title={`Tâche à finir avant le : ${todo.deadline}`}>
                  Avant la date &nbsp;:{" "}
                  {new Date(todo.deadline).toLocaleDateString("fr-FR")}
                </span>
              )}
            </>
          ) : (
            /* MODE ÉDITION : Formulaire inline */
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

        {/* BOUTONS D'ACTION */}
        <div className="flex gap-2">
          {!isEditing ? (
            <>
              {/* Bouton Éditer */}
              <button
                className="btn btn-primary btn-soft btn-sm"
                onClick={() => setIsEditing(true)}
                title="Modifier">
                <Edit2 className="w-4 h-4" />
              </button>
              {/* Bouton Supprimer */}
              <button
                className="btn btn-error btn-soft btn-sm"
                onClick={onDelete}
                title="Supprimer">
                <Trash className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              {/* Bouton Valider */}
              <button
                className="btn btn-success btn-soft btn-sm"
                onClick={handleSave}
                title="Sauvegarder">
                <Check className="w-4 h-4" />
              </button>
              {/* Bouton Annuler */}
              <button
                className="btn btn-ghost btn-sm"
                onClick={handleCancel}
                title="Annuler">
                <X className="w-4 h-4" />
              </button>
            </>
          )}
        </div>
      </div>
    </li>
  );
};

// ============================================
// COMPOSANT APP (code de base + fonction editTodo)
// ============================================
function App() {
  const [input, setInput] = useState<string>("");
  const [priority, setPriority] = useState<Priority>("Moyenne");

  const saveTodos = localStorage.getItem("todos");
  const initialTodos = saveTodos ? JSON.parse(saveTodos) : [];
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  function addTodo() {
    if (input.trim() == "") {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority: priority,
      deadline: deadline || undefined,
    };
    const newTodos = [newTodo, ...todos];
    setTodos(newTodos);
    setInput("");
    setPriority("Moyenne");
    setDeadline("");
    console.log(newTodos);
  }

  let filteredTodos: Todo[] = [];

  if (filter === "Tous") {
    filteredTodos = todos;
  } else {
    filteredTodos = todos.filter((todos) => todos.priority === filter);
  }

  const urgentConut = todos.filter((t) => t.priority === "Urgent").length;
  const mediumConut = todos.filter((t) => t.priority === "Moyenne").length;
  const lowConut = todos.filter((t) => t.priority === "Basse").length;
  const totalCounts = todos.length;

  function deleteTodo(id: number) {
    const isConfirmed = window.confirm(
      "Voulez-vous vraiment supprimer cette tâche ?"
    );

    if (!isConfirmed) return;

    const newTodos = todos.filter((todo) => todo.id !== id);
    setTodos(newTodos);
  }

  const [selectedTodos, SetSelectedTodos] = useState<Set<number>>(new Set());
  const [deadline, setDeadline] = useState<string>("");

  function toggleSelectTodo(id: number) {
    const newSelect = new Set(selectedTodos);
    if (newSelect.has(id)) {
      newSelect.delete(id);
    } else {
      newSelect.add(id);
    }
    SetSelectedTodos(newSelect);
  }

  function finishSelected() {
    const newTodos = todos.filter((todo) => {
      if (selectedTodos.has(todo.id)) {
        return false;
      } else {
        return true;
      }
    });
    setTodos(newTodos);
    SetSelectedTodos(new Set());
  }

  // ============================================
  // NOUVELLE FONCTION : Éditer une tâche
  // ============================================
  function editTodo(
    id: number,
    newText: string,
    newPriority: Priority,
    newDeadline?: string
  ) {
    // On parcourt le tableau de todos
    const updatedTodos = todos.map((todo) => {
      // Si on trouve la tâche à modifier
      if (todo.id === id) {
        // On retourne une copie de la tâche avec les nouvelles valeurs
        return {
          ...todo,
          text: newText,
          priority: newPriority,
          deadline: newDeadline,
        };
      }
      // Sinon on retourne la tâche telle quelle
      return todo;
    });
    // On met à jour l'état avec le nouveau tableau
    setTodos(updatedTodos);
  }

  return (
    <div className="flex justify-center">
      <div className="w-3/4 flex flex-col gap-4 my-15 bg-base-300 p-5 rounded-2xl">
        <div className="flex gap-4">
          <input
            type="text"
            className="input w-full"
            placeholder="Ajouter une tache"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <input
            type="date"
            className="input w-fit"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />

          <select
            className="select w-full"
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}>
            <option value="Urgent">Urgent</option>
            <option value="Moyenne">Moyenne</option>
            <option value="Basse">Basse</option>
          </select>
          <button onClick={addTodo} className="btn btn-primary">
            Ajouter
          </button>
        </div>
        <div className="espace-y-2 flex-1 h-fit ">
          <div className="flex items-center justify-between">
            <div className="flex flex-wrap gap-4">
              <button
                className={`btn btn-soft ${
                  filter === "Tous" ? "btn btn-primary" : ""
                }`}
                onClick={() => setFilter("Tous")}>
                Tous {totalCounts}
              </button>

              <button
                className={`btn btn-soft ${
                  filter === "Urgent" ? "btn btn-primary" : ""
                }`}
                onClick={() => setFilter("Urgent")}>
                Urgent {urgentConut}
              </button>

              <button
                className={`btn btn-soft ${
                  filter === "Moyenne" ? "btn btn-primary" : ""
                }`}
                onClick={() => setFilter("Moyenne")}>
                Moyenne {mediumConut}
              </button>

              <button
                className={`btn btn-soft bg ${
                  filter === "Basse" ? "btn btn-primary" : ""
                }`}
                onClick={() => setFilter("Basse")}>
                Basse : {lowConut}
              </button>
            </div>
            <button
              className="btn btn-primary"
              onClick={finishSelected}
              disabled={selectedTodos.size == 0}>
              Finir la sélection {selectedTodos.size}
            </button>
          </div>

          {filteredTodos.length > 0 ? (
            <ul className="divide-y divide-primary/20">
              {filteredTodos.map((todo) => (
                <li key={todo.id}>
                  <TodoItem
                    todo={todo}
                    isSelected={selectedTodos.has(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                    onToggleSelect={toggleSelectTodo}
                    onEdit={editTodo} // NOUVELLE PROP passée au composant
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center flex-col p-5">
              <div>
                <Construction
                  strokeWidth={1}
                  className="w-20 h-20 text-primary"
                />
              </div>
              <p className="text-sm">Aucune Tache pour ce filtre </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
