import type { Filter, Task } from '../types';

export const TASK_ITEM_TEMPDATA: Task[] = [
  {
    id: 1,
    title: 'Finish React Components',
    description: 'Complete the statistics and task list sections.',
    status: 'incomplete',
  },
  {
    id: 2,
    title: 'Review Project Requirements',
    description: 'Check all required features before submission.',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Update Documentation',
    description: 'Add setup and usage instructions.',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Test Task Filtering',
    description: 'Verify all, active, and inactive filters work.',
    status: 'incomplete',
  },
] as const;

export const filters: Filter[] = [
  {
    label: 'All',
    value: 'all',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
] as const;
