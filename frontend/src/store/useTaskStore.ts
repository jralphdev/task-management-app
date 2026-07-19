import { create } from 'zustand';
import type { Task, TaskStatus, TaskStore } from '../types';
import { axiosInstance } from '../lib/axios';

export const useTaskStore = create<TaskStore>((set, get) => ({
  tasks: [],
  statistics: {
    total: 0,
    statuses: {
      incomplete: 0,
      completed: 0,
    },
  },

  search: '',
  filter: 'all',
  page: 1,
  totalPages: 1,

  editTaskId: null,
  deleteTaskId: null,

  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,

  getTasks: async (page) => {
    set({ isLoading: true });

    try {
      const { search, filter } = get();

      const { data } = await axiosInstance.get('/tasks', {
        params: {
          page,
          search,
          filter,
        },
      });

      set({
        tasks: data.tasks,
        page: Math.min(page, data.totalPages),
        totalPages: data.totalPages,
        statistics: data.statistics,
      });
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      set({ isLoading: false });
    }
  },
  createTask: async (task) => {
    set({ isCreating: true });

    try {
      const { page } = get();
      const { data } = await axiosInstance.post('/tasks/create', task);

      set((state) => ({ tasks: [data, ...state.tasks] }));

      await get().getTasks(page);
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
      const { page } = get();
      await axiosInstance.delete(`/tasks/${id}`);

      set((state) => ({
        tasks: state.tasks.filter((task) => task.id !== id),
      }));

      await get().getTasks(page);
    } catch (error) {
      console.error('Failed to update task:', error);
    } finally {
      set({ isDeleting: false });
    }
  },

  setEditTaskId: (id) => set({ editTaskId: id }),
  setDeleteTaskId: (id) => set({ deleteTaskId: id }),
  setSearch: (search) => set({ search, page: 1 }),
  setFilter: (filter) => set({ filter, page: 1 }),
  setPage: (page) => set({ page }),

  toggleTaskStatus: async (task: Task) => {
    const { filter, page } = get();

    const status: TaskStatus = task.status === 'completed' ? 'incomplete' : 'completed';

    // instant update UI
    set((state) => ({
      tasks: state.tasks
        .map((existingTask) =>
          existingTask.id === task.id ? { ...existingTask, status } : existingTask,
        )
        .filter((task) => filter === 'all' || task.status === filter),
    }));

    try {
      await axiosInstance.put(`/tasks/${task.id}`, { status });

      await get().getTasks(page);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);

      // rollback if fails
      set((state) => ({
        tasks: state.tasks.map((existingTask) =>
          existingTask.id === task.id ? task : existingTask,
        ),
      }));
    }
  },
}));
