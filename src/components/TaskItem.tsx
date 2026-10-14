
import type { Task } from "../types/task";

interface TaskItemProps {
  task: Task;
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskItem({
  task,
  onToggle,
  onEdit,
  onDelete,
}: TaskItemProps) {
  return (
    <article
      className={`task-card ${
        task.status === "Completed" ? "completed" : ""
      }`}
    >
      <h3>{task.title}</h3>

      <p>{task.description || "No description provided."}</p>

      <p>Priority: {task.priority}</p>

      <p>
        Due:{" "}
        {task.dueDate
          ? new Date(
              `${task.dueDate}T00:00:00`
            ).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "long",
              year: "numeric",
            })
          : "No due date"}
      </p>

      <p>Status: {task.status}</p>

      <div className="task-actions">
        <button onClick={() => onToggle(task.id)}>
          {task.status === "Active" ? "Complete" : "Active"}
        </button>

        <button onClick={() => onEdit(task)}>
          Edit
        </button>

        <button onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

export default TaskItem;
