import { useState } from "react";
import type { Priority, Todo } from "./types/todo.types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { countCloseDeadlines, calculateCompletion } from "./utils/todoUtils";
import { ProgressBar } from "./components/ProgressBar";
import { DeadlineAlert } from "./components/DeadlineAlert";
import { TodoForm } from "./components/TodoForm";
import { FilterButtons } from "./components/FilterButtons";
import { TodoItem } from "./components/TodoItem";
import { EmptyState } from "./components/EmptyState";

function App() {
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);

  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  const addTodo = () => {
    if (input.trim() === "") return;
    const newTodo: Todo = {
      id: Date.now(),
      text: input.trim(),
      priority,
      deadline: deadline || undefined,
    };
    setTodos([newTodo, ...todos]);
    setInput("");
    setPriority("Moyenne");
    setDeadline("");
  };

  const deleteTodo = (id: number) => {
    if (window.confirm("Voulez-vous vraiment supprimer cette tâche ?")) {
      setTodos(todos.filter((todo) => todo.id !== id));
    }
  };

  const editTodo = (
    id: number,
    text: string,
    priority: Priority,
    deadline?: string,
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, priority, deadline } : todo,
      ),
    );
  };

  function toggleSelectTodo(id: number) {
    const newSelect = new Set(selectedTodos);
    if (newSelect.has(id)) {
      newSelect.delete(id);
    } else {
      newSelect.add(id);
    }
    setSelectedTodos(newSelect);
  }

  const finishSelected = () => {
    setTodos(todos.filter((todo) => !selectedTodos.has(todo.id)));
    setSelectedTodos(new Set());
  };

  const filteredTodos =
    filter === "Tous" ? todos : todos.filter((t) => t.priority === filter);
  const counts = {
    total: todos.length,
    urgent: todos.filter((t) => t.priority === "Urgent").length,
    medium: todos.filter((t) => t.priority === "Moyenne").length,
    low: todos.filter((t) => t.priority === "Basse").length,
  };
  const completionPercentage = calculateCompletion(
    counts.total,
    selectedTodos.size,
  );
  const closeDeadlinesCount = countCloseDeadlines(todos);

  return (
    /* Desktop background */
    <div
      style={{ minHeight: "100vh", background: "#008080", padding: "24px" }}
      className="flex justify-center items-start"
    >
      {/* Window chrome */}
      <div
        className="win-window"
        style={{ width: "100%", maxWidth: "780px" }}
      >
        {/* Title bar */}
        <div className="win-titlebar">
          {/* App icon placeholder */}
          <img
            src="/favicon.ico"
            alt=""
            style={{ width: 16, height: 16, imageRendering: "pixelated" }}
          />
          <span className="win-titlebar-text">
            Gestionnaire de tâches – Ma Todo List
          </span>
          {/* Window control buttons */}
          <button className="win-title-btn" title="Réduire" aria-label="Réduire">_</button>
          <button className="win-title-btn" title="Agrandir" aria-label="Agrandir">□</button>
          <button
            className="win-title-btn"
            title="Fermer"
            aria-label="Fermer"
            style={{ marginLeft: 2, fontWeight: "bold" }}
          >
            ✕
          </button>
        </div>

        {/* Menu bar */}
        <div className="win-toolbar">
          <span style={{ fontSize: 11, padding: "2px 8px", cursor: "default" }}>Fichier</span>
          <span style={{ fontSize: 11, padding: "2px 8px", cursor: "default" }}>Édition</span>
          <span style={{ fontSize: 11, padding: "2px 8px", cursor: "default" }}>Affichage</span>
          <span style={{ fontSize: 11, padding: "2px 8px", cursor: "default" }}>Aide</span>
        </div>

        {/* Body */}
        <div style={{ padding: "8px", display: "flex", flexDirection: "column", gap: "6px", background: "#d4d0c8" }}>

          {/* Deadline Alert */}
          <DeadlineAlert count={closeDeadlinesCount} />

          {/* Progress section */}
          {counts.total > 0 && (
            <ProgressBar
              percentage={completionPercentage}
              selected={selectedTodos.size}
              total={counts.total}
            />
          )}

          {/* Add task group box */}
          <fieldset className="win-groupbox" style={{ margin: 0 }}>
            <legend style={{ fontSize: 11, padding: "0 4px", fontWeight: "bold" }}>
              Nouvelle tâche
            </legend>
            <TodoForm
              input={input}
              priority={priority}
              deadline={deadline}
              onInputChange={setInput}
              onPriorityChange={setPriority}
              onDeadlineChange={setDeadline}
              onSubmit={addTodo}
            />
          </fieldset>

          {/* Filter + action toolbar */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "4px",
              borderBottom: "1px solid #808080",
              paddingBottom: "4px",
            }}
          >
            <FilterButtons
              filter={filter}
              onFilterChange={setFilter}
              counts={counts}
            />
            <button
              className="win-btn"
              onClick={finishSelected}
              disabled={selectedTodos.size === 0}
            >
              ✔ Terminer ({selectedTodos.size})
            </button>
          </div>

          {/* Todo list */}
          <div
            className="win-inset"
            style={{
              background: "#ffffff",
              minHeight: "120px",
              maxHeight: "480px",
              overflowY: "auto",
              padding: 0,
            }}
          >
            {filteredTodos.length > 0 ? (
              <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                {filteredTodos.map((todo) => (
                  <TodoItem
                    key={todo.id}
                    todo={todo}
                    isSelected={selectedTodos.has(todo.id)}
                    onDelete={() => deleteTodo(todo.id)}
                    onToggleSelect={toggleSelectTodo}
                    onEdit={editTodo}
                  />
                ))}
              </ul>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>

        {/* Status bar */}
        <div className="win-statusbar">
          <div className="win-statusbar-panel">
            {counts.total} tâche{counts.total !== 1 ? "s" : ""} au total
          </div>
          <div className="win-statusbar-panel" style={{ flex: "0 0 auto" }}>
            {selectedTodos.size} sélectionnée{selectedTodos.size !== 1 ? "s" : ""}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
