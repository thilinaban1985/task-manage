
import { useState, type FormEvent } from "react";
import type { Task, Priority } from "../types/task";

interface TaskFormProps {
  onSave: (task: Task) => void;
  editingTask: Task | null;
  onCancel: () => void;
}

function TaskForm({
  onSave,
  editingTask,
  onCancel,
}: TaskFormProps) {
  const [title, setTitle] = useState(
    editingTask?.title ?? ""
  );
  const [description, setDescription] = useState(
    editingTask?.description ?? ""
  );
  const [priority, setPriority] = useState<Priority>(
    editingTask?.priority ?? "Medium"
  );
  const [dueDate, setDueDate] = useState(
    editingTask?.dueDate ?? ""
  );
  const [error, setError] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim()) {
      setError("Title is required.");
      return;
    }

    const task: Task = {
      id: editingTask?.id ?? crypto.randomUUID(),
      title: title.trim(),
      description: description.trim(),
      priority,
      dueDate,
      status: editingTask?.status ?? "Active",
    };

    onSave(task);

    setTitle("");
    setDescription("");
    setPriority("Medium");
    setDueDate("");
    setError("");
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>{editingTask ? "Edit Task" : "Add New Task"}</h2>

      <label htmlFor="title">Title *</label>
      <input
        id="title"
        value={title}
        onChange={(e) => {
          setTitle(e.target.value);
          setError("");
        }}
        placeholder="Enter task title"
      />

      {error && <p role="alert">{error}</p>}

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Enter task description"
      />

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value as Priority)
        }
      >
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>

      <label htmlFor="dueDate">Due Date (optional)</label>
      <input
        id="dueDate"
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />

      <button type="submit">
        {editingTask ? "Save Changes" : "Add Task"}
      </button>

      {editingTask && (
        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      )}
    </form>
  );
}

export default TaskForm;

