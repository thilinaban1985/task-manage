
import { useEffect, useState } from "react";
import type { Task } from "./types/task";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import SearchBar from "./components/SearchBar";
import TaskFilter, {
  type TaskFilterValue,
} from "./components/TaskFilter";

const STORAGE_KEY = "task-manager-tasks";

function loadTasks(): Task[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    if (!saved) return [];

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) return [];

    return parsed.filter(
      (item): item is Task =>
        typeof item === "object" &&
        item !== null &&
        typeof item.id === "string" &&
        typeof item.title === "string" &&
        typeof item.description === "string" &&
        ["Low", "Medium", "High"].includes(item.priority) &&
        ["Active", "Completed"].includes(item.status) &&
        typeof item.dueDate === "string"
    );
  } catch {
    return [];
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>(loadTasks);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<TaskFilterValue>("All");
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  function saveTask(task: Task) {
    setTasks((current) => {
      const exists = current.some((item) => item.id === task.id);

      if (exists) {
        return current.map((item) =>
          item.id === task.id ? task : item
        );
      }

      return [task, ...current];
    });

    setEditingTask(null);
  }

  function toggleTask(id: string) {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? {
              ...task,
              status:
                task.status === "Active"
                  ? "Completed"
                  : "Active",
            }
          : task
      )
    );
  }

  function deleteTask(id: string) {
    setTasks((current) =>
      current.filter((task) => task.id !== id)
    );

    if (editingTask?.id === id) {
      setEditingTask(null);
    }
  }

  const visibleTasks = tasks.filter((task) => {
    const searchText = search.trim().toLowerCase();

    const matchesSearch =
      task.title.toLowerCase().includes(searchText) ||
      task.description.toLowerCase().includes(searchText);

    const matchesFilter =
      filter === "All" || task.status === filter;

    return matchesSearch && matchesFilter;
  });

  return (
    <main className="app-container">
      <header className="app-header">
        <h1>Task Manager</h1>
        <p>Organize your day. Get things done.</p>
      </header>

      <TaskForm
        key={editingTask?.id ?? "new-task"}
        onSave={saveTask}
        editingTask={editingTask}
        onCancel={() => setEditingTask(null)}
      />

      <section className="tasks-section">
        <h2>My Tasks ({visibleTasks.length})</h2>

        <SearchBar search={search} onSearch={setSearch} />

        <TaskFilter
          filter={filter}
          onFilterChange={setFilter}
        />

        <TaskList
          tasks={visibleTasks}
          onToggle={toggleTask}
          onEdit={setEditingTask}
          onDelete={deleteTask}
        />
      </section>
    </main>
  );
}

export default App;
