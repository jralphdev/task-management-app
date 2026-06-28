import { useShallow } from 'zustand/shallow';
import { useTaskStore } from '../store/useTaskStore';
import TaskItem from './TaskItem';
import { LoaderCircleIcon } from 'lucide-react';

const TaskList = () => {
  const { tasks, search, filter, isLoading } = useTaskStore(
    useShallow((state) => ({
      tasks: state.tasks,
      search: state.search,
      filter: state.filter,
      isLoading: state.isLoading,
    })),
  );

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title.toLowerCase().includes(search.toLowerCase());

    const matchesFilter =
      filter === 'all' ||
      (filter === 'active' && task.status === 'incomplete') ||
      (filter === 'inactive' && task.status === 'completed');

    return matchesSearch && matchesFilter;
  });

  if (isLoading) {
    return (
      <div className='flex items-center justify-center text-white pt-10'>
        <LoaderCircleIcon className='size-10 animate-spin' />
      </div>
    );
  }

  return (
    <section className='task-container'>
      {filteredTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </section>
  );
};

export default TaskList;
