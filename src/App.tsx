import { useState } from "react";
import type { Priority, Todo } from "./types/todo.types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { useTheme } from "./hooks/useTheme";
import { countCloseDeadlines, calculateCompletion } from "./utils/todoUtils";
import { ThemeToggle } from "./components/ThemeToggle";
import { ProgressBar } from "./components/ProgressBar";
import { DeadlineAlert } from "./components/DeadlineAlert";
import { TodoForm } from "./components/TodoForm";
import { FilterButtons } from "./components/FilterButtons";
import { TodoItem } from "./components/TodoItem";
import { EmptyState } from "./components/EmptyState";

function App() {
  // Custom hooks
  const [todos, setTodos] = useLocalStorage<Todo[]>("todos", []);
  const { theme, toggleTheme } = useTheme();

  // États locaux
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState<Priority>("Moyenne");
  const [deadline, setDeadline] = useState("");
  const [filter, setFilter] = useState<Priority | "Tous">("Tous");
  const [selectedTodos, setSelectedTodos] = useState<Set<number>>(new Set());

  // Fonctions
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
    deadline?: string
  ) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text, priority, deadline } : todo
      )
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

  // Calculs
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
    selectedTodos.size
  );
  const closeDeadlinesCount = countCloseDeadlines(todos);

  return (
    <div className="flex justify-center min-h-screen py-10">
      <div className="w-11/12 max-w-4xl flex flex-col gap-4 bg-base-300 p-6 rounded-2xl shadow-xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-3xl font-bold">Ma Todo List</h1>
            <DeadlineAlert count={closeDeadlinesCount} />
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>

        {/* Progression */}
        {counts.total > 0 && (
          <ProgressBar
            percentage={completionPercentage}
            selected={selectedTodos.size}
            total={counts.total}
          />
        )}

        {/* Formulaire */}
        <TodoForm
          input={input}
          priority={priority}
          deadline={deadline}
          onInputChange={setInput}
          onPriorityChange={setPriority}
          onDeadlineChange={setDeadline}
          onSubmit={addTodo}
        />

        {/* Filtres et actions */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <FilterButtons
            filter={filter}
            onFilterChange={setFilter}
            counts={counts}
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={finishSelected}
            disabled={selectedTodos.size === 0}>
            Terminer ({selectedTodos.size})
          </button>
        </div>

        {/* Liste */}
        {filteredTodos.length > 0 ? (
          <ul className="divide-y divide-primary/20">
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
  );
}

export default App;
