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
}

export interface EditTaskFormProps {
  task: Task;
}

export interface TaskForm {
  title: string;
  description?: string;
}

export interface TaskStore {
  tasks: Task[];

  search: string;
  filter: TaskFilter;

  editTaskId: number | null;
  deleteTaskId: number | null;

  isLoading: boolean;
  isCreating: boolean;
  isUpdating: boolean;
  isDeleting: boolean;

  getTasks: () => Promise<void>;
  createTask: (task: TaskForm) => Promise<void>;
  updateTask: (id: number, task: TaskForm) => Promise<void>;
  deleteTask: (id: number) => Promise<void>;

  setEditTaskId: (id: number | null) => void;
  setDeleteTaskId: (id: number | null) => void;
  setSearch: (search: string) => void;
  setFilter: (filter: TaskFilter) => void;

  toggleTaskStatus: (task: Task) => Promise<void>;
}
