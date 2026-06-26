export type TaskStatus = 'active' | 'inactive';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}

export interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onEdit: () => void;
}
