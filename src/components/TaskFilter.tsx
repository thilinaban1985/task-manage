
export type TaskFilterValue =
  | "All"
  | "Active"
  | "Completed";

interface TaskFilterProps {
  filter: TaskFilterValue;
  onFilterChange: (filter: TaskFilterValue) => void;
}

function TaskFilter({
  filter,
  onFilterChange,
}: TaskFilterProps) {
  const filters: TaskFilterValue[] = [
    "All",
    "Active",
    "Completed",
  ];

  return (
    <div className="filters">
      {filters.map((item) => (
        <button
          key={item}
          type="button"
          className={filter === item ? "selected" : ""}
          aria-pressed={filter === item}
          onClick={() => onFilterChange(item)}
        >
          {item}
        </button>
      ))}
    </div>
  );
}

export default TaskFilter;
