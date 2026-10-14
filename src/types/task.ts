export type Priority = "Low" | "Medium" | "High";

export type TaskStatus = "Active" | "Completed";

export interface Task {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: TaskStatus;
}