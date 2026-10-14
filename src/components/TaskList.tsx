
import type { Task } from "../types/task";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onToggle: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

function TaskList({
  tasks,
  onToggle,
  onEdit,
  onDelete,
}: TaskListProps) {
  if (tasks.length === 0) {
    return <p className="empty-state">No tasks found.</p>;
  }

  return (
    <section className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </section>
  );
}

export default TaskList;
