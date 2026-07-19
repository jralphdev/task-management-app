export type TaskStatus = 'completed' | 'incomplete';
export type TaskFilter = 'all' | 'completed' | 'incomplete';

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
}

export interface EditTaskFormProps {
  task: Task;
}

export interface TaskForm {
  title: string;
  description?: string;
}

export interface Statistics {
  total: number;
  statuses: Record<TaskStatus, number>;
}

export interface TaskStore {
  tasks: Task[];
  statistics: Statistics;

  search: string;
  filter: TaskFilter;

  editTaskId: number | null;
  deleteTaskId: number | null;
  page: number;
  totalPages: number;

  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  getTasks: (page: number) => Promise<void>;
  createTask: (task: TaskForm) => Promise<void>;
  updateTask: (id: number, task: TaskForm) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;

  setEditTaskId: (id: number | null) => void;
  setDeleteTaskId: (id: number | null) => void;
  setSearch: (search: string) => void;
  setFilter: (filter: TaskFilter) => void;
  setPage: (page: number) => void;

  toggleTaskStatus: (task: Task) => Promise<void>;
}
