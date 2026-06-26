export type TaskStatus = 'active' | 'inactive';

export interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
}
