import { create } from 'zustand';
import type { Task, TaskStatus, TaskStore } from '../types';
import { axiosInstance } from '../lib/axios';

export const useTaskStore = create<TaskStore>((set) => ({
  tasks: [],

  search: '',
  filter: 'all',

  editTaskId: null,
  deleteTaskId: null,

  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  getTasks: async () => {
    set({ isLoading: true });

    try {
      const { data } = await axiosInstance.get('/tasks');

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

  updateTask: async (id, task) => {
    set({ isUpdating: true });

    try {
      const { data } = await axiosInstance.put(`/tasks/${id}`, task);

      set((state) => ({
        tasks: state.tasks.map((current) => (current.id === id ? data : current)),
      }));
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      set({ isUpdating: false });
    }
  },

  deleteTask: async (id) => {
    set({ isDeleting: true });

    try {
      await axiosInstance.delete(`/tasks/${id}`);

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      set({ isDeleting: false });
    }
  },

  setEditTaskId: (id) => {
    set({ editTaskId: id });
  },

  setDeleteTaskId: (id) => {
    set({ deleteTaskId: id });
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
