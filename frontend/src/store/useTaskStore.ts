import { create } from 'zustand';
import type { Task, TaskStatus, TaskStore } from '../types';
import { axiosInstance } from '../lib/axios';

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],

  search: '',
  filter: 'all',

  isLoading: false,
  isCreating: false,

  getTasks: async () => {
    set({ isLoading: true });

    try {
      const { search, filter } = get();

      let status: TaskStatus | undefined;

      if (filter === 'active') status = 'incomplete';
      if (filter === 'inactive') status = 'completed';

      const { data } = await axiosInstance.get('/tasks', {
        params: {
          search: search || undefined,
          status,
        },
      });

      set({ tasks: data });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      set({ isLoading: false });
    }
  },

  createTask: async (task) => {
    set({ isCreating: true });

    try {
      const { data } = await axiosInstance.post('/tasks/create', task);

      set((state) => ({ tasks: [data, ...state.tasks] }));
    } catch (error) {
      console.error('Failed to create task:', error);
    } finally {
      set({ isCreating: false });
    }
  },

  setSearch: (search) => {
    set({ search });
  },

  setFilter: (filter) => {
    set({ filter });
  },

  toggleTaskStatus: async (task: Task) => {
    const status: TaskStatus = task.status === 'completed' ? 'incomplete' : 'completed';

    try {
      await axiosInstance.put(`/tasks/${task.id}`, { status });

      set((state) => ({
        tasks: state.tasks.map((current) =>
          current.id === task.id ? { ...current, status } : current,
        ),
      }));
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    }
  },
}));
