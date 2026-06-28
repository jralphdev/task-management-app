export type TaskStatus = 'completed' | 'incomplete';
export type TaskFilter = 'all' | 'active' | 'inactive';

export interface Filter {
  label: string;
  value: TaskFilter;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  createdAt?: string;
  updatedAt?: string;
}

export interface TaskItemProps {
  task: Task;
  isEditing: boolean;
  onEdit: () => void;
}

export interface CreateTaskForm {
  title: string;
  description?: string;
}

export interface TaskStore {
  tasks: Task[];

  search: string;
  filter: TaskFilter;

  isLoading: boolean;
  isCreating: boolean;

  getTasks: () => Promise<void>;
  createTask: (task: CreateTaskForm) => Promise<void>;
  setSearch: (search: string) => void;
  setFilter: (filter: TaskFilter) => void;
  toggleTaskStatus: (task: Task) => Promise<void>;
}
